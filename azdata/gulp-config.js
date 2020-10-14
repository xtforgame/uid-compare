import path from 'path';
import { GulpConfig } from 'az-gulp-env-lite';

const projRoot = path.resolve(__dirname, '..');
const config = {
  projRoot,
  base: projRoot,
  submodules: {
    commonLibrary: {
      prefix: 'common',
      entry: {
        dir: 'src/common',
        js: {
          glob: '**/*.{js,ts}',
        },
        ts: {
          tsconfig: 'tsconfig.build.json',
          glob: '**/*.ts',
        },
      },
      output: {
        default: {
          js: {},
        },
      },
    },
    reactRoot: {
      prefix: 'react-root',
      devUseSsr: true,
      prodUseSsr: true,
      entry: {
        dir: 'src/react-root',
        js: {
          glob: '**/*.{js,ts}',
        },
        ts: {
          tsconfig: 'tsconfig.build.json',
          glob: '**/*.ts',
        },
      },
      output: {
        default: {
          js: {},
        },
      },
    },
    server: {
      prefix: 'server',
      useCommonLibrary: {
        relativePath: 'common',
      },
      reloadDelay: 1500,
      entry: {
        dir: 'src/server',
        js: {
          glob: '**/*.{js,ts}',
        },
        ts: {
          tsconfig: 'tsconfig.build.json',
          glob: '**/*.ts',
        },
      },
      output: {
        default: {
          dir: 'dist/server',
          js: {
            filename: 'assets/js/index.js',
          },
        },
        // dev: {},
        // dist: {},
      },
      options: {
        default: {
          babel: {},
          nodemon: {
            ext: 'js,html,ts',
          },
        },
        // dev: {},
        // dist: {},
      },
    },
    frontEnd: {
      prefix: 'frontEnd',
      useCommonLibrary: {
        relativePath: 'common',
      },
      entry: {
        js: {
          dir: 'src/front-end',
          glob: '**/*.{js,ts}',
          filename: 'app.js',
        },
        ts: {
          tsconfig: 'tsconfig.build.json',
          glob: '**/*.ts',
        },
        static: {
          dir: 'public',
          filename: '**/*.*',
        },
      },
      output: {
        dir: 'dist',
        default: {
          dir: 'front-end',
        },
        // dev: {},
        // dist: {},
      },
    },
  },
};

export default new GulpConfig(config);
