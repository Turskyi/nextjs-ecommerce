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
          primary: '#f4aa3a',
          secondary: '#f4f4a1',
          accent: '#1be885',
          neutral: '#f3d3c9',
          'base-100': '#ffffff',
          info: '#778ad4',
          success: '#23b893',
          warning: '#f79926',
          error: '#ea535a',
          body: {
            'background-color': '#f5f1f5', // This way we can add a dark theme with a different background color.
            color: '#442B2D',
          },
        },
      },
    ],
  },
};
export default config;
