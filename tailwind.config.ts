import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: '#FBB8AC',
          secondary: '#FEEAE6',
          accent: '#1be885',
          neutral: '#FEDBD0',
          'base-100': '#ffffff',
          info: '#778ad4',
          success: '#23b893',
          warning: '#f79926',
          error: '#C5032B',
          body: {
            'background-color': '#FFF4F2', // This way we can add a dark theme with a different background color.
            color: '#442C2E',
          },
        },
      },
    ],
  },
};
export default config;
