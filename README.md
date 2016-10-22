# React Native FoldView [![CircleCI](https://img.shields.io/circleci/project/jmurzy/react-native-foldview/master.svg?style=flat-square)](https://circleci.com/gh/jmurzy/react-native-foldview) [![npm version](https://img.shields.io/npm/v/react-native-foldview.svg?style=flat-square)](https://www.npmjs.com/package/react-native-foldview) [![npm](https://img.shields.io/npm/l/react-native-foldview.svg?style=flat-square)](https://github.com/jmurzy/react-native-foldview/blob/master/LICENSE.md) [![Medium](https://img.shields.io/badge/blog-medium-brightgreen.svg)](https://commitocracy.com/)

FoldingCell impl in JavaScript.

#### Read it on Medium

This project was inspired by the FoldingCell animation seen on [Behance](https://www.behance.net/gallery/22981559/Mobile-Interaction-Design).
To learn more, check out the article on Medium: [Implementing FoldView in React Native](https://commitocracy.com/).

### Example
The example app from the GIF in the README can be found at `examples/Simple`. You can also [view it with Exponent](https://exp.host/@jmurzy/react-native-foldview-simple).

### Installation

#### Using npm:

```sh
$ npm install --save react-native-foldview
```

— or —

```sh
$ yarn add react-native-foldview
```

### Usage

```javascript
```

### Platform Support
This library heavily depends on the `overflow` style property. Unfortunately, `overflow` defaults to `hidden` on Android and cannot be changed. Although it looks like a [possible fix](https://github.com/facebook/react-native/issues/3198#issuecomment-241867280) is in the making, currently, FoldingView is only supported on iOS.

### Contributing
Contributions are very welcome: bug fixes, features, documentation, tests. Just make sure the CI is 👌.

### Questions?

Feel free to reach out to me on Twitter [@jmurzy](https://twitter.com/jmurzy).
