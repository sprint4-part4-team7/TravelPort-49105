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
          1: '#fcfcfc',
          2: '#f5f5f5',
          3: '#f0f0f0',
          4: '#d9d9d9',
          5: '#bfbfbf',
          6: '#8c8c8c',
          7: '#595959',
          8: '#454545',
          9: '#262626',
          10: '#1f1f1f',
          11: '#141414',
          12: '#000000',
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
        mobile: { min: '375px', max: '767px' }, // 모바일은 최대 767px까지
        tablet: { min: '768px', max: '1199px' }, // 태블릿은 768px 이상 1199px 이하
        desktop: { min: '1200px' }, // 데스크탑은 1200px 이상
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        plexSans: ['plex_sansKR', 'sans-serif'],
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
