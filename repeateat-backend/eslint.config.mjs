import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import nodePlugin from 'eslint-plugin-node'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
      node: nodePlugin,
    },
    rules: {
      // Node / backend safety
      'node/no-process-exit': 'off',
      'node/no-unsupported-features/es-syntax': 'off',

      // Imports
      'unused-imports/no-unused-imports': 'error',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],

      // TS
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Express patterns
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  },
]
