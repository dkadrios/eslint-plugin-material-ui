const eslint = require('eslint')
const rule = require('./no-styled-from-core')

const ruleTester = new eslint.RuleTester({
  parserOptions: { sourceType: 'module' },
})
ruleTester.run('no-styled-from-core', rule, {
  valid: ["import styled from '@material-ui/core/styles/styled'"],
  invalid: [
    {
      code: "import { styled } from '@material-ui/core'",
      errors: [
        {
          message:
            "Import 'styled' from @material-ui/core/styles, not @material-ui/core",
        },
      ],
    },
  ],
})
