module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}", 
    './src/**/*.{js,jsx,ts,tsx}',
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
