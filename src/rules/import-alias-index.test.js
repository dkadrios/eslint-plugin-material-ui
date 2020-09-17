const eslint = require('eslint')
const rule = require('../rules/import-alias-index')

const aliases = [
  '@config',
  '@data',
  '@mocks',
  '@questions',
  '@reducers',
  '@reviews',
  'core',
  'fp',
  'hoc',
  'hooks',
  'images',
  'locale',
  'projections',
  'reducers',
  'routing',
  'sagas',
  'selectors',
  'styles',
  'views',
]

const ruleTester = new eslint.RuleTester({
  parserOptions: { sourceType: 'module' },
})
ruleTester.run('import-alias-index', rule, {
  valid: [
    { code: "import PropTypes from 'prop-types'", options: [{ aliases }] },
    {
      code: "import { selector1 } from 'selectors/index'",
      options: [{ aliases }],
    },
    {
      code: "import { selector1, selector2 } from 'selectors/index'",
      options: [{ aliases }],
    },
    {
      code:
        "import { selector1 as tree1, selector2 as tree2 } from 'selectors/index'",
      options: [{ aliases }],
    },
    {
      code: "import defaultSelector from 'selectors/index'",
      options: [{ aliases }],
    },
    {
      code: "import { selector1 } from 'selectors/userAssignments'",
      options: [{ aliases }],
    },
    {
      code: "import { selector1, selector2 } from 'selectors/userAssignments'",
      options: [{ aliases }],
    },
    {
      code: "import defaultSelector from 'selectors/userAssignments'",
      options: [{ aliases }],
    },
  ],
  invalid: [
    {
      code: "import { selector1 } from 'selectors'",
      options: [{ aliases }],
      errors: [
        {
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
        },
      ],
    },
    {
      code: "import { selector1, selector2 } from 'selectors'",
      options: [{ aliases }],
      errors: [
        {
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
        },
      ],
    },
    {
      code: "import { selector1, selector2 } from 'selectors/'",
      options: [{ aliases }],
      errors: [
        {
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
        },
      ],
    },
    {
      code: "import defaultSelector from 'selectors'",
      options: [{ aliases }],
      errors: [
        {
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
        },
      ],
    },
    {
      code: "import defaultSelector from 'selectors/'",
      options: [{ aliases }],
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
      options: [{ aliases }],
      errors: [
        {
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
        },
      ],
    },
    {
      code:
        "import { selector1 as tree1, selector2 as tree2, selector3 } from 'selectors/'",
      options: [{ aliases }],
      errors: [
        {
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
        },
      ],
    },
  ],
})
