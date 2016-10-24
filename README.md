# React Native FoldView [![CircleCI](https://img.shields.io/circleci/project/jmurzy/react-native-foldview/master.svg?style=flat-square)](https://circleci.com/gh/jmurzy/react-native-foldview) [![npm version](https://img.shields.io/npm/v/react-native-foldview.svg?style=flat-square)](https://www.npmjs.com/package/react-native-foldview) [![npm](https://img.shields.io/npm/l/react-native-foldview.svg?style=flat-square)](https://github.com/jmurzy/react-native-foldview/blob/master/LICENSE.md) [![Medium](https://img.shields.io/badge/blog-medium-brightgreen.svg)](https://commitocracy.com/)

FoldingCell impl in JavaScript.

### Read it on Medium

This project was inspired by the FoldingCell animation seen on [Behance](https://www.behance.net/gallery/22981559/Mobile-Interaction-Design).
To learn more, check out the article on Medium: [Implementing FoldView in React Native](https://commitocracy.com/).

#### Questions?
Feel free to reach out to me on Twitter [@jmurzy](https://twitter.com/jmurzy).

### Example
The example app from the GIF in the README can be found at `examples/Simple`. You can also [view it with Exponent](https://exp.host/@jmurzy/react-native-foldview-simple).

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

```javascript
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

The following props can only be set on the root `FoldView`.

| Prop | Type | Description |
|---|---|---|
|**`collapse`**|`?(foldviews: Array<FoldView>) => Promise`|Called when FoldView should collapse allowing you to have control over which FoldViews(s) to collapse. Default behavior is to wait until a FoldView is collapsed before collapsing the next one.|
|**`expand`**|`?(foldviews: Array<FoldView>) => Promise`|Called when FoldView should expand allowing you to have control over which FoldView(s) to expand. Default behavior is to wait until a FoldView is expanded before expanding the next one.|
|**`expanded`**|`boolean`|Allows you to expand and collapse the FoldView content.|
|**`onAnimatationEnd`**|`?() => void`|Called when a collapse animation ends.|
|**`onAnimatationStart`**|`?() => void`|Called before an expand animation starts.|
|**`perspective`**|`?number`|Defines the space within which the 3D animation occurs.|

### Platform Support
This library heavily depends on the `overflow` style property. Unfortunately, `overflow` defaults to `hidden` on Android and cannot be changed. Although it looks like a [possible fix](https://github.com/facebook/react-native/issues/3198#issuecomment-241867280) is in the making, currently, FoldingView is only supported on iOS.


### Contributing
Contributions are very welcome: bug fixes, features, documentation, tests. Just make sure the CI is 👌.

<a name="hacking"/>
#### Hacking

Unfortunately, React Native packager does not support symlinking so you cannot use [`npm link`](https://docs.npmjs.com/cli/link) when hacking on this library. You can learn more about that, [here](https://productpains.com/post/react-native/symlink-support-for-packager/).

The library code is specified as a [local dependency](local dependency) in the example's `package.json`. In order to hack on the library code, you need to sync it into `examples/Simple/node_modules`. To do so, run:

```js
npm run watch
```

This will automatically watch the `src` directory and sync your changes into `examples/Simple/node_modules` every time something changes.

<a name="license"/>
#### License
All pull requests that get merged will be made available under [the MIT license](https://github.com/jmurzy/react-router-native/blob/master/LICENSE.md), as the rest of the repository.
