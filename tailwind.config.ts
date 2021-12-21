import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  theme: {
    extend: {
      colors: {
        accent: 'rgb(28, 179, 255)',
        secondary: '#0e0e0e'
      },
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
