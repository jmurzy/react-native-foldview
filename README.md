# React Native FoldView [![Medium](https://img.shields.io/badge/blog-medium-brightgreen.svg)](https://commitocracy.com/implementing-foldview-in-react-native-e970011f98b8) [![CircleCI](https://img.shields.io/circleci/project/jmurzy/react-native-foldview/master.svg?style=flat-square)](https://circleci.com/gh/jmurzy/react-native-foldview) [![npm version](https://img.shields.io/npm/v/react-native-foldview.svg?style=flat-square)](https://www.npmjs.com/package/react-native-foldview) [![npm](https://img.shields.io/npm/l/react-native-foldview.svg?style=flat-square)](https://github.com/jmurzy/react-native-foldview/blob/master/LICENSE.md)

FoldingCell implementation in JavaScript. This project was inspired by the folding cell animation seen on [Dribbble](https://dribbble.com/shots/2121350-Delivery-Card).


<img align="right" width="360px" src="https://raw.githubusercontent.com/jmurzy/react-native-foldview/master/.github/screenshot.gif">

#### Questions?
Feel free to reach out to me on Twitter [@jmurzy](https://twitter.com/jmurzy).

### Read it on Medium
To learn more about how FoldView was implemented, check out the article on Medium: [Implementing FoldView in React Native](https://commitocracy.com/implementing-foldview-in-react-native-e970011f98b8).

### Example
The demo app from the GIF can be found at `examples/Simple`.

To build and run the example app:

```bash
git clone https://github.com/jmurzy/react-native-foldview

cd react-native-foldview/examples/Simple
npm install
```

To deploy to iOS simulator:

```bash
npm run ios
```

### Installation

#### Using npm:

```sh
$ npm install --save react-native-foldview
```

#### Using yarn:

```sh
$ yarn add react-native-foldview
```

### Usage

```jsx
import React, { Component } from 'react';

import FoldView from 'react-native-foldview';

const Frontface = (props) => (/*...*/);
const Backface = (props) => (/*...*/);
const Base = (props) => (/*...*/);

export default class Row extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  componentWillMount() {
    this.flip = this.flip.bind(this);
  }

  flip() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  renderFrontface() {
    return (
      <Frontface />
    );
  }

  renderBackface() {
    /**
     * You can nest <FoldView>s here to achieve the folding effect shown in the GIF above.
     * A reference implementation can be found in examples/Simple.
     */
    return (
      <Backface />
    );
  }

  render() {
    return (
      <FoldView
        expanded={this.state.expanded}
        renderBackface={this.renderBackface}
        renderFrontface={this.renderFrontface}
      >
        <Base />
      </FoldView>
    );
  }
}

```

#### Props

| Prop | Type | Description |
|---|---|---|
|**`children`**|`ReactElement<any>`|React Element(s) to render.|
|**`flipDuration`**|`?number`|Length of flip animation in milliseconds. _Default 280._|
|**`renderBackface`**|`() => ReactElement<any>`|Callback that renders a backface.|
|**`renderFrontface`**|`() => ReactElement<any>`|Callback that renders a frontface.|
|**`renderLoading`**|`?() => ReactElement<any>`|Callback that renders a temporary view to display before base layout occurs. If not provided, `renderFrontface` is used instead.|

#### Root-only Props

FoldViews can be nested. The following props can only be set on the root `FoldView`.

| Prop | Type | Description |
|---|---|---|
|**`collapse`**|`?(foldviews: Array<IFoldView>) => Promise`|Called when FoldView should collapse allowing you to have control over which FoldViews(s) to collapse. Default behavior is to wait until a FoldView is collapsed before collapsing the next one.|
|**`expand`**|`?(foldviews: Array<IFoldView>) => Promise`|Called when FoldView should expand allowing you to have control over which FoldView(s) to expand. Default behavior is to wait until a FoldView is expanded before expanding the next one.|
|**`expanded`**|`boolean`|Allows you to expand and collapse the FoldView content.|
|**`onAnimationEnd`**|`?(duration: number, height: number) => void`|Called when a collapse animation ends.|
|**`onAnimationStart`**|`?(duration: number, height: number) => void`|Called before an expand animation starts.|
|**`perspective`**|`?number`|Defines the space within which the 3D animation occurs.|

### Advanced Usage
You can customize the behavior of expand and collapse animations using the `expand` and `collapse` props on the root `FoldView`. For example, it's very much possible to collapse all FoldViews in a given stack altogether rather than one by one. You can do so as follows:

```jsx
const collapse = async (foldViews) => {
  /**
   * Internally, FoldView turns off rasterization when collapsed as an optimization to decrease
   * memory usage. It's important to wrap your calls in a `Promise` here to avoid early disabling
   * of rasterization.
   */
  await Promise.all(foldViews.map(foldView => foldView.collapse()));
}

<FoldView
  collapse={collapse}
  renderBackface={/* ... */}
  renderFrontface={/* ... */}
>
  { /* ... */ }
</FoldView>
```

### Platform Support
This library heavily depends on the `overflow` style property. Unfortunately, `overflow` defaults to `hidden` on Android and cannot be changed. Although it looks like a [possible](https://github.com/facebook/react-native/issues/3198#issuecomment-241867280) [fix](https://github.com/facebook/react-native/tree/master/ReactAndroid/src/main/java/com/facebook/react/flat) is in the making, currently, FoldingView is only supported on iOS.

### Contributing
Contributions are very welcome: bug fixes, features, documentation, tests. Just make sure the CI is 👌.

#### Hacking

Unfortunately, React Native packager does not support symlinking so you cannot use [`npm link`](https://docs.npmjs.com/cli/link) when hacking on this library. You can learn more about that, [here](https://productpains.com/post/react-native/symlink-support-for-packager/).

The library code is specified as a [local dependency](local dependency) in the example's `package.json`. In order to hack on the library code, you need to sync it into `examples/Simple/node_modules`. To do so, run:

```js
npm run watch
```

This will automatically watch the `src` directory and sync your changes into `examples/Simple/node_modules` every time something changes.

#### License

All pull requests that get merged will be made available under [the MIT license](https://github.com/jmurzy/react-native-foldview/blob/master/LICENSE.md), as the rest of the repository.
