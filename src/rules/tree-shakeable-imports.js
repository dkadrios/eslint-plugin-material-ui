const hasPunctuator = (node, char) => {
  return (
    node.parent.tokens
      .filter(({ type }) => type === 'Punctuator')
      .filter(({ value }) => value === char).length > 0
  )
}

module.exports = context => {
  return {
    ImportDeclaration(node) {
      const { source } = node
      const folders = source.value.split('/')
      if (folders[0] === '@material-ui') {
        const shouldRestrictImportPathLength =
          !source.value.startsWith('@material-ui/core/test-utils') &&
          !source.value.startsWith('@material-ui/core/styles')

        if (shouldRestrictImportPathLength) {
          // @namespace/packageName is first level
          const level = source.value.split('/').length - 1

          if (level > 2) {
            const preferredImport = folders.slice(0, 3).join('/')
            context.report({
              node,
              message: `Only second level path imports are allowed. Prefer to import from '${preferredImport}'.`
            })
          } else {
            if (folders.length > 1 && folders[1] === 'styles') {
              context.report({
                node,
                message: `Don't import from @material-ui/styles. Use @material-ui/core/styles instead.`
              })
            }
          }
        }

        if (hasPunctuator(node, '{') && hasPunctuator(node, '}')) {
          // console.log(node.parent)

          const preferredImport = source.value

          if (node.specifiers.length && node.specifiers[0].imported) {
            const moduleName = node.specifiers[0].imported.name
            context.report({
              node,
              message: `Only default exported imports are allowed here. Try import ${moduleName} from '${preferredImport}/${moduleName}'.`
            })
          }
        }
      }
    }
  }
}
