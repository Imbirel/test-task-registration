import { defineConfig } from 'orval';

export default defineConfig({
  registrationApi: {
    input: 'http://localhost:3000/api/docs-json',
    output: {
      mode: 'tags-split',
      target: './src/shared/api/generated/api.ts',
      schemas: './src/shared/api/generated/model',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: './src/shared/api/instance.ts',
          name: 'instance',
        },
        header: (info) => {
          const headerLines = Array.isArray(info.header) ? info.header : [];
          return ['/* eslint-disable */', '// @ts-nocheck', ...headerLines, ''].join('\n');
        },
      },
      clean: true,
    },
    // hooks: {
    //   afterAllFilesWrite: 'prettier --write',
    // },
  },
});
