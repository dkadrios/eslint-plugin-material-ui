const eslint = require('eslint')
const rule = require('./no-importing-act')

const ruleTester = new eslint.RuleTester({
  parserOptions: { sourceType: 'module' }
})
ruleTester.run('no-importing-act', rule, {
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
      code: "import { act } from '@testing-library/react'",
      errors: [
        {
          message:
            "Don't import other versions of act directly.  The correct one is available in global scope."
        }
      ]
    },
    {
      code: "import { act } from 'react-test-renderer'",
      errors: [
        {
          message:
            "Don't import other versions of act directly.  The correct one is available in global scope."
        }
      ]
    },
    {
      code: "import { act } from 'react-dom/test-utils'",
      errors: [
        {
          message:
            "Don't import other versions of act directly.  The correct one is available in global scope."
        }
      ]
    }
  ]
})
