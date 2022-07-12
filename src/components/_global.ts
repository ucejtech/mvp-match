// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from 'vue';

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  //look in subdirectories
  true,
  // Only include "_base-" prefixed .vue files
  /_base-[\w+]+\.(vue|js)$/
);

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  // Get the PascalCase version of the component name
  const fileNameInSubDirectory = fileName.split('/');
  const componentName = fileNameInSubDirectory[
    fileNameInSubDirectory.length - 1
  ] // check and remove ./_ from file name
    .replace(/^_/, '')
    // check and remove .[any word character] from file name
    .replace(/\.\w+$/, '')
    // split prev result by -
    .split('-')
    // make initial character upperCase
    .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // construct componentName
    .join('');

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});
