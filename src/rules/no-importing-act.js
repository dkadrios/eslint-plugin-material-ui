module.exports = {
  meta: {
    docs: {},
    fixable: 'code',
    schema: []
  },

  create: context => ({
    ImportDeclaration(node) {
      const { specifiers } = node

      const found =
        specifiers.filter(({ imported }) => imported && imported.name === 'act')
          .length > 0

      if (found) {
        context.report({
          node,
          message: `Don't import other versions of act directly.  The correct one is available in global scope.`,
          fix: fixer => fixer.replaceText(node, '')
        })
      }
    }
  })
}
