import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';

import {
  View,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';

import invariant from 'invariant';

import transformUtil from './transformUtil';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  face: {
    backfaceVisibility: 'hidden',
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});

/* eslint-disable no-restricted-syntax, no-await-in-loop */
const rootDefaultProps = {
  collapse: async (foldViews) => {
    const reversedFoldViews = [...foldViews].reverse();
    for (const foldView of reversedFoldViews) {
      await foldView.collapse();
    }
  },
  expand: async (foldViews) => {
    for (const foldView of foldViews) {
      await foldView.expand();
    }
  },
  perspective: 1000,
};
/* eslint-enable */

export default class FoldingCell extends Component {

  static childContextTypes = {
    registerComponent: PropTypes.func,
  };

  static contextTypes = {
    registerComponent: PropTypes.func,
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
    flipDuration: PropTypes.number,
    renderBackface: PropTypes.func.isRequired,
    renderFrontface: PropTypes.func.isRequired,
    renderLoading: PropTypes.func,
    /* Root-only props */
    collapse: PropTypes.func,
    expand: PropTypes.func,
    expanded: PropTypes.bool,
    onAnimationEnd: PropTypes.func,
    onAnimationStart: PropTypes.func,
    perspective: PropTypes.number,
  };

  static defaultProps = {
    flipDuration: 280,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      rotateXfront: new Animated.Value(0),
      rotateXback: new Animated.Value(-180),
      baseLayout: null,
      rasterize: false,
    };

    this.isRoot = !context.registerComponent;
    this.managedComponents = [];
  }

  getChildContext(): Object {
    return {
      registerComponent: (pseudoRef) => {
        if (this.isRoot) {
          this.managedComponents.push(pseudoRef);
        } else {
          // Forward `ref` until it reaches root
          this.context.registerComponent(pseudoRef);
        }
      },
    };
  }

  componentWillMount() {
    this.collapse = this.collapse.bind(this);
    this.expand = this.expand.bind(this);
    this.getBaseHeight = this.getBaseHeight.bind(this);
    this.getFlipDuration = this.getFlipDuration.bind(this);
    this.handleBaseLayout = this.handleBaseLayout.bind(this);
    this.rasterize = this.rasterize.bind(this);
    this.renderBackface = this.renderBackface.bind(this);
    this.renderBase = this.renderBase.bind(this);
    this.renderFrontface = this.renderFrontface.bind(this);
    this.setBackFaceRef = this.setBackFaceRef.bind(this);
    this.setBaseRef = this.setBaseRef.bind(this);
    this.setFrontFaceRef = this.setFrontFaceRef.bind(this);


    if (!this.isRoot) {
      const blacklistedProps = [
        'collapse',
        'expand',
        'expanded',
        'onAnimationEnd',
        'onAnimationStart',
        'perspective',
      ];

      const invalidProps = blacklistedProps.reduce((invalid, key) => {
        if (this.props[key]) {
          invalid.push(key);
        }
        return invalid;
      }, []);

      invariant(
        invalidProps.length === 0,
        `${invalidProps.join(', ')} cannot be set on a nested FoldView`,
      );
    }
  }

  componentDidMount() {
    this.state.rotateXfront.addListener(({ value }) => {
      this.flushTransform(this.frontFaceRef, value, this.state.frontFaceOriginY);
    });

    this.state.rotateXback.addListener(({ value }) => {
      this.flushTransform(this.backFaceRef, value, this.state.backFaceOriginY);
    });

    // Only expose a subset of self `ref`
    const pseudoRef = {
      expand: this.expand,
      collapse: this.collapse,
      rasterize: this.rasterize,
      getBaseHeight: this.getBaseHeight,
      getFlipDuration: this.getFlipDuration,
    };

    if (this.isRoot) {
      this.managedComponents.push(pseudoRef);
    } else {
      this.context.registerComponent(pseudoRef);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isRoot) {
      if (nextProps.expanded !== this.props.expanded) {
        this.flip(nextProps.expanded);
      }
    }
  }

  componentWillUnmount() {
    // FIXME(jmurzy) Possible memory leak in the very unlikely case where non-root FoldViews
    // unmount independently of the root. If so, they should remove themselves from
    // `managedComponents`.
    this.managedComponents = null;
  }

  setFrontFaceRef(ref) {
    this.frontFaceRef = ref;
  }

  setBackFaceRef(ref) {
    this.backFaceRef = ref;
  }

  setBaseRef(ref) {
    this.baseRef = ref;
  }

  getBaseHeight() {
    const baseLayout = this.state.baseLayout;
    if (!baseLayout) {
      return 0;
    }

    return baseLayout.height;
  }

  getFlipDuration() {
    return this.props.flipDuration;
  }

  flushTransform(ref, dx, y) {
    // Matrix multiplication is not commutative
    const matrix = transformUtil.createIdentityMatrix();
    const rotate = transformUtil.rotateX(dx);
    transformUtil.origin(matrix, { x: 0, y, z: 0 });
    transformUtil.applyPerspective(
      matrix,
      this.props.perspective || rootDefaultProps.perspective,
    );
    transformUtil.multiplyInto(matrix, matrix, rotate);

    ref.setNativeProps({
      style: {
        transform: [
          {
            matrix,
          },
        ],
      },
    });
  }

  expand() {
    const duration = this.props.flipDuration;

    const animations = Animated.parallel([
      Animated.timing(this.state.rotateXfront, {
        toValue: 180,
        duration,
      }),
      Animated.timing(this.state.rotateXback, {
        toValue: 0,
        duration,
      }),
    ]);

    return new Promise(resolve => animations.start(resolve));
  }

  collapse() {
    const duration = this.props.flipDuration;

    const animations = Animated.parallel([
      Animated.timing(this.state.rotateXfront, {
        toValue: 0,
        duration,
      }),
      Animated.timing(this.state.rotateXback, {
        toValue: -180,
        duration,
      }),
    ]);

    return new Promise(resolve => animations.start(resolve));
  }

  rasterize(shouldRasterize) {
    return new Promise(resolve => {
      this.setState({
        rasterize: shouldRasterize,
      }, resolve);
    });
  }

  async flip(expanded) {
    if (!this.isRoot) {
      return;
    }

    const totalDuration = this.managedComponents.reduce(
      (total, pseudoRef) => total + pseudoRef.getFlipDuration(),
      0,
    );

    let height = this.state.baseLayout.height;
    if (expanded) {
      height = this.managedComponents.reduce(
        (total, pseudoRef) => total + pseudoRef.getBaseHeight(),
        height,
      );
    }

    if (this.props.onAnimationStart) {
      this.props.onAnimationStart(totalDuration, height);
    }

    if (expanded) {
      /* eslint-disable no-restricted-syntax, no-await-in-loop */
      for (const pseudoRef of this.managedComponents) {
        await pseudoRef.rasterize(true);
      }
      /* eslint-enable */

      const expand = this.props.expand || rootDefaultProps.expand;
      await expand(this.managedComponents);
    } else {
      const collapse = this.props.collapse || rootDefaultProps.collapse;
      await collapse(this.managedComponents);

      // Conserve memory by turning off rasterization on collapse
      /* eslint-disable no-restricted-syntax, no-await-in-loop */
      for (const pseudoRef of this.managedComponents) {
        await pseudoRef.rasterize(false);
      }
      /* eslint-enable */
    }

    if (this.props.onAnimationEnd) {
      this.props.onAnimationEnd(totalDuration, height);
    }
  }

  handleBaseLayout(e) {
    const layout = e.nativeEvent.layout;

    this.setState({
      baseLayout: layout,
      frontFaceOriginY: layout.height / 2,
      backFaceOriginY: -layout.height / 2,
    }, () => {
      this.flushTransform(
        this.frontFaceRef,
        /* eslint-disable no-underscore-dangle */
        this.state.rotateXfront.__getValue(),
        /* eslint-enable */
        this.state.frontFaceOriginY,
      );

      this.flushTransform(
        this.backFaceRef,
        /* eslint-disable no-underscore-dangle */
        this.state.rotateXback.__getValue(),
        /* eslint-enable */
        this.state.backFaceOriginY,
      );
    });
  }

  renderFrontface() {
    if (this.state.baseLayout) {
      const { height, width, y, x } = this.state.baseLayout;
      const faceStyle = {
        height,
        width,
        top: y,
        left: x,
        ...Platform.select({
          ios: {
            zIndex: 0,
          },
        }),
      };

      const pointerEvents = this.props.expanded ? 'box-none' : 'auto';

      return (
        <Animated.View
          ref={this.setFrontFaceRef}
          style={[styles.face, faceStyle]}
          pointerEvents={pointerEvents}
        >
          {
            this.props.renderFrontface()
          }
        </Animated.View>
      );
    }

    return null;
  }

  renderBackface() {
    if (this.state.baseLayout) {
      const { height, width, y, x } = this.state.baseLayout;
      const faceStyle = {
        height,
        width,
        top: y + height,
        left: x,
        ...Platform.select({
          ios: {
            zIndex: 1,
          },
        }),
      };

      const rasterize = this.state.rasterize;

      let pointerEvents = this.props.expanded ? 'auto' : 'box-none';

      if (this.isRoot) {
        pointerEvents = this.props.expanded ? 'auto' : 'none';
      }

      return (
        <Animated.View
          ref={this.setBackFaceRef}
          shouldRasterizeIOS={rasterize}
          renderToHardwareTextureAndroid={rasterize}
          style={[styles.face, faceStyle]}
          pointerEvents={pointerEvents}
        >
          {
            this.props.renderBackface()
          }
        </Animated.View>
      );
    }

    return null;
  }

  renderBase() {
    let children = this.props.children;

    if (this.isRoot && !this.state.baseLayout) {
      // Unless `renderLoading` is provided, temporarily render `frontFace` as placeholder
      // to avoid shutter when layout is done.
      const renderPlaceholder = this.props.renderLoading || this.props.renderFrontface;
      if (renderPlaceholder) {
        children = renderPlaceholder();
      }
    }

    const baseStyle = this.state.baseLayout ? {
      height: this.state.baseLayout.height,
      flex: 1,
    } : styles.base;

    return (
      <View
        ref={this.setBaseRef}
        onLayout={this.handleBaseLayout}
        style={baseStyle}
      >
        {children}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderBase()}
        {this.renderBackface()}
        {this.renderFrontface()}
      </View>
    );
  }
}
