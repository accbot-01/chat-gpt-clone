/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-bg': '#F7F7F8',
        'user-msg': '#F4F4F4',
        'assistant-msg': '#FFFFFF',
        'sidebar-bg': '#FFFFFF',
        'text-primary': '#0D0D0D',
        'text-secondary': '#6E6E80',
        'accent': '#10A37F',
        'border': '#E5E5E5',
      },
    },
  },
  plugins: [],
}
