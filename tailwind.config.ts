import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"', 'sans-serif']
      },
      typography: {
        DEFAULT: {
          css: {
            button: {
              fontFamily: 'inherit'
            }
          }
        }
      }
    },
    fontFamily: {
      code: ['"Source Code Pro"', 'monospace'],
      roboto: ['"Roboto"', 'sans-serif']
    }
  }
});
