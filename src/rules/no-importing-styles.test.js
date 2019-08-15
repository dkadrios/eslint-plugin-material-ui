const eslint = require('eslint')
const rule = require('./no-importing-styles')

const ruleTester = new eslint.RuleTester({
  parserOptions: { sourceType: 'module' }
})
ruleTester.run('no-importing-styles', rule, {
  valid: [
    "import Button from '@material-ui/core/Button'",
    "import describeConformance from '@another/core/test-utils/describeConformance'",
    "import makeStyles from '@material-ui/core/styles/makeStyles'",
    "import CssBaseline from '@material-ui/core/CssBaseline'",
    "import { Titled } from 'react-titled'",
    "import makeStyles from '@material-ui/core/styles/makeStyles'"
  ],
  invalid: [
    {
      code: "import { withStyles } from '@material-ui/styles'",
      errors: [
        {
          message:
            "Don't import from @material-ui/styles. Use @material-ui/core/styles instead."
        }
      ]
    },
    {
      code: "import makeStyles from '@material-ui/styles/makeStyles'",
      errors: [
        {
          message:
            "Don't import from @material-ui/styles. Use @material-ui/core/styles instead."
        }
      ]
    }
  ]
})
