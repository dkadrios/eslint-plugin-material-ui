module.exports = context => {
  return {
    ImportDeclaration(node) {
      const { source } = node
      const folders = source.value.split('/')
      if (
        folders.length > 1 &&
        folders[0] === '@material-ui' &&
        folders[1] === 'styles'
      ) {
        context.report({
          node,
          message: `Don't import from @material-ui/styles. Use @material-ui/core/styles instead.`
        })
      }
    }
  }
}
