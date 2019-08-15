const hasPunctuator = (node, char) => {
  return (
    node.parent.tokens
      .filter(({ type }) => type === 'Punctuator')
      .filter(({ value }) => value === char).length > 0
  )
}

module.exports = {
  meta: {
    docs: {},
    fixable: 'code',
    schema: []
  },

  create: context => ({
    ImportDeclaration(node) {
      const { source } = node
      const folders = source.value.split('/')
      if (folders[0] === '@material-ui') {
        if (hasPunctuator(node, '{') && hasPunctuator(node, '}')) {
          const preferredImport = source.value

          if (node.specifiers.length && node.specifiers[0].imported) {
            const moduleName = node.specifiers[0].imported.name
            context.report({
              node,
              message: `Only default exported imports are allowed here. Try import ${moduleName} from '${preferredImport}/${moduleName}'.`,
              fix: fixer =>
                fixer.replaceText(
                  node,
                  `import ${moduleName} from '${preferredImport}/${moduleName}'`
                )
            })
          }
        }
      }
    }
  })
}
