# eslint-plugin-material-ui

Custom eslint rules for Material-UI.

## List of supported rules

- `docgen-ignore-before-comment`
- `no-hardcoded-labels`
- `restricted-path-imports`

- `no-importing-act`
- `no-importing-styles`
- `no-styled-from-core`
- `tree-shakeable-imports`
- `import-alias-index`

### docgen-ignore-before-comment

Enforce correct usage of `@ignore` in the prop-types block comments.

### no-hardcoded-labels

Prevent the usage of hardcoded labels.
The docs are translated via crowdin, we prefer to use `t` from the redux store.

### restricted-path-imports

Prevent the import of modules at a level depth strictly over 1.

### no-importing-act

If act is defined in global scope, then discourage manual imports which may be grabbing the wrong version.

### no-importing-styles

Import from @material-ui/core/styles and not from @material-ui/styles

### no-styled-from-core

Import 'styled' from @material-ui/core/styles and not from @material-ui/core

### tree-shakeable-imports

Only allow default imports, never named. Using named imports defeats tree-shaking by the bundler.

### import-alias-index

Not really related to Material. This rule just prevents importing from the root of known aliased folders. Doing so is indistinguishable from importing from a global package and can confuse Parcel.
