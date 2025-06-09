import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'ts/consistent-type-definitions': ['off'],
    'jsonc/sort-keys': ['off'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
  },
})
