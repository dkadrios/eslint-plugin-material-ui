module.exports = {
  meta: {
    docs: {},
    fixable: 'code',
    schema: [],
  },

  create: (context) => ({
    ImportDeclaration(node) {
      const { source, specifiers } = node

      if (
        source.value === '@material-ui/core' &&
        specifiers[0].local.name === 'styled'
      ) {
        context.report({
          node,
          message:
            "Import 'styled' from @material-ui/core/styles, not @material-ui/core",
          fix: (fixer) =>
            fixer.replaceText(
              node,
              "import styled from '@material-ui/core/styles/styled'"
            ),
        })
      }
    },
  }),
}
