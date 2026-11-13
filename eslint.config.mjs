import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook';
import nextTs from 'eslint-config-next/typescript';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // https://typescript-eslint.io/rules/no-empty-object-type/
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends',
        },
      ],
      // https://typescript-eslint.io/rules/no-unused-vars/
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      // eslint-plugin-react-hooks v7 promotes this rule to error. The mount and
      // prop-sync effects in boot, hero, layout, logo, scrambled-text,
      // typewriter and use-intro set state deliberately (SSR-safe hydration
      // gating and animation state machines), so keep it as a warning.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  // https://github.com/prettier/eslint-plugin-prettier
  eslintPluginPrettierRecommended,
  // For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
  ...storybook.configs['flat/recommended'],
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'storybook-static/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
