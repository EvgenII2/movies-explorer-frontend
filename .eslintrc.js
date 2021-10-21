module.exports = {
  "env": {
    browser: true
  },
  "extends": [
    "react-app",
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],

  "plugins": ["jsx-a11y", "prettier"],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
}
