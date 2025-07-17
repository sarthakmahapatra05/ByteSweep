/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E2EFF', // Indigo Blue
        accent1: '#1DB954', // Bright Green
        accent2: '#FF9900', // Soft Orange
        background: '#F9FAFB', // Light Gray
        text: '#111827', // Rich Dark Gray
        alert: '#FF3B30', // Soft Red
        secondary: '#6B7280', // Muted Gray
      },
    },
  },
  plugins: [],
};
