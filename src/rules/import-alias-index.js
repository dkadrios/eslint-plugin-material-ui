const knownAliases = [
  '@config',
  '@data',
  '@mocks',
  '@questions',
  '@reducers',
  '@reviews',
  'core',
  'fp',
  'hoc',
  'hooks',
  'images',
  'locale',
  'projections',
  'reducers',
  'routing',
  'sagas',
  'selectors',
  'styles',
  'views',
]

module.exports = {
  meta: {
    docs: {},
    fixable: 'code',
    schema: [],
  },

  create: (context) => ({
    ImportDeclaration(node) {
      const { source, specifiers } = node

      if (knownAliases.includes(source.value)) {
        context.report({
          node,
          message:
            "Use 'index.js' to import from the root of an alias, otherwise it's indistinguishable from a global package",
          fix: (fixer) => {
            if (specifiers[0].type === 'ImportDefaultSpecifier') {
              // Importing the module default
              return fixer.replaceText(
                node,
                `import ${specifiers[0].local.name} from ${source.value}/index`
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
                `import { ${items.join(', ')} } from ${source.value}/index`
              )
            }
          },
        })
      }
    },
  }),
}
