const eslint = require('eslint')
const rule = require('./tree-shakeable-imports')

const ruleTester = new eslint.RuleTester({
  parserOptions: { sourceType: 'module' }
})
ruleTester.run('tree-shakeable-imports', rule, {
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
      code: "import { Button } from '@material-ui/core'",
      errors: [
        {
          message:
            "Only default exported imports are allowed here. Try import Button from '@material-ui/core/Button'."
        }
      ]
    },
    {
      code: "import { withStyles } from '@material-ui/core/styles'",
      errors: [
        {
          message:
            "Only default exported imports are allowed here. Try import withStyles from '@material-ui/core/styles/withStyles'."
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
