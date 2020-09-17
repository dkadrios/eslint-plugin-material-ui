const eslint = require('eslint')
const rule = require('../rules/import-alias-index')

const ruleTester = new eslint.RuleTester({
  parserOptions: { sourceType: 'module' },
})
ruleTester.run('import-alias-index', rule, {
  valid: [
    "import PropTypes from 'prop-types'",
    "import { selector1 } from 'selectors/index'",
    "import { selector1, selector2 } from 'selectors/index'",
    "import { selector1 as tree1, selector2 as tree2 } from 'selectors/index'",
    "import defaultSelector from 'selectors/index'",
    "import { selector1 } from 'selectors/userAssignments'",
    "import { selector1, selector2 } from 'selectors/userAssignments'",
    "import defaultSelector from 'selectors/userAssignments'",
  ],
  invalid: [
    {
      code: "import { selector1 } from 'selectors'",
      errors: [
        {
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
        },
      ],
    },
    {
      code: "import { selector1, selector2 } from 'selectors'",
      errors: [
        {
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
        },
      ],
    },
    {
      code: "import defaultSelector from 'selectors'",
      errors: [
        {
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
        },
      ],
    },
    {
      code:
        "import { selector1 as tree1, selector2 as tree2, selector3 } from 'selectors'",
      errors: [
        {
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
        },
      ],
    },
  ],
})
