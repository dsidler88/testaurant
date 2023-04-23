/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontSize:{
      "2xsm": "10px",
      "xsm": "12px",
      "sm": "14px",
      "reg": "16px",
      "lg": "18px",
      "xlg": "20px",
      "2xlg": "22px",
      "3xlg": "25px",
      "4xlg": "32px",
      "5xlg": "40px",
      "6xlg": "50px",
      "7xlg": "70px",
    }
  },
  plugins: [],
}
