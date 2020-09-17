/* eslint-disable global-require */

module.exports.rules = {
  'docgen-ignore-before-comment': require('./rules/docgen-ignore-before-comment'),
  'no-hardcoded-labels': require('./rules/no-hardcoded-labels'),
  'no-importing-act': require('./rules/no-importing-act'),
  'no-importing-styles': require('./rules/no-importing-styles'),
  'no-styled-from-core': require('./rules/no-styled-from-core'),
  'restricted-path-imports': require('./rules/restricted-path-imports'),
  'tree-shakeable-imports': require('./rules/tree-shakeable-imports'),
  'import-alias-index': require('./rules/import-alias-index'),
}
