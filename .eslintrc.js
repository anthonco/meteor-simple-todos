module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",

    "env": {
      "browser": true,
      "jest": true
    },

    "rules": {
      "react/jsx-filename-extension": [
        2,
        {
          "extensions": [".js", ".jsx"]
        }
      ],
      "no-underscore-dangle": [0],
      "react/require-default-props": [0],
      "react/forbid-prop-types": [0],
      "react/static-property-placement": [0],
    },
  };