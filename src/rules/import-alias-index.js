module.exports = {
  meta: {
    docs: {},
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          aliases: {
            type: 'array',
            items: {
              oneOf: [
                {
                  type: 'string',
                },
              ],
            },
          },
        },
      },
    ],
  },

  create: (context) => ({
    ImportDeclaration(node) {
      console.log(context.options[0])
      const options = context.options[0] || {}
      const aliases = options.aliases || []
      const { source, specifiers } = node

      const package = String(source.value).replace(/\//g, '')

      if (aliases.includes(package)) {
        context.report({
          node,
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
          fix: (fixer) => {
            if (specifiers[0].type === 'ImportDefaultSpecifier') {
              // Importing the module default
              return fixer.replaceText(
                node,
                `import ${specifiers[0].local.name} from ${package}/index`
              )
            } else {
              // Using one or more named imports
              const items = specifiers
                .map(({ imported, local }) => [imported.name, local.name])
                .map(([imported, local]) => {
                  return imported === local
                    ? imported
                    : `${imported} as ${local}`
                })
              return fixer.replaceText(
                node,
                `import { ${items.join(', ')} } from ${package}/index`
              )
            }
          },
        })
      }
    },
  }),
}
