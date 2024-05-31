/** @type {import('tailwindcss').Config} */

const rem0_10 = { ...Array.from(Array(11)).map((_, i) => `${i / 10}rem`) };
const rem0_100 = { ...Array.from(Array(101)).map((_, i) => `${i / 10}rem`) };
const rem0_1200 = { ...Array.from(Array(1201)).map((_, i) => `${i / 10}rem`) };

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      borderWidth: rem0_10,
      borderRadius: rem0_100,
      fontSize: rem0_100,
      lineHeight: rem0_100,
      minWidth: rem0_1200,
      minHeight: rem0_1200,
      spacing: rem0_1200,
      colors: {
        white: '#ffffff',
        black: {
          modal: 'rgba(0, 0, 0, 0.5)',
          1: '#ffffff',
          2: '#fcfcfc',
          3: '#f5f5f5',
          4: '#f0f0f0',
          5: '#d9d9d9',
          6: '#bfbfbf',
          7: '#8c8c8c',
          8: '#595959',
          9: '#454545',
          10: '#262626',
          11: '#1f1f1f',
          12: '#141414',
          13: '#000000',
        },
        blue: {
          1: '#eaf0fd',
          2: '#cddaf9',
          3: '#a6bdf5',
          4: '#7d9ef1',
          5: '#5581ec',
          6: '#3065e8',
          7: '#2956c5',
          8: '#2248a5',
          9: '#1b3a84',
          10: '#162d68',
        },
        system: {
          success: '#52c41a',
          'success-bg': '#cff2be',
          warning: '#faad14',
          'warning-bg': '#fbe2ae',
          error: '#ff4d4f',
          'error-bg': '#ffaeaf',
          complete: '#1890ff',
          'complete-bg': '#abd6fe',
        },
        secondary: {
          magenta: '#ff35d3',
          cyan: '#35ff92',
          green: '#beff35',
          red: '#ff3535',
          orange: '#ff6635',
          yellow: '#fbff35',
        },
      },
      screens: {
        tablet: { min: '1199px' },
        mobile: { min: '767px' },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      zIndex: {
        DEFAULT: '1',
        dropdown: '200',
        sticky: '400',
        popover: '600',
        overlay: '800',
        modal: '1000',
        toast: '1200',
      },
    },
  },
  plugins: [],
};
