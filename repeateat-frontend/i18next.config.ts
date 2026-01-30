import { defineConfig } from 'i18next-cli'

export default defineConfig({
  locales: ['en', 'fi'],
  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',
    outputFormat: 'ts',
  },
})
