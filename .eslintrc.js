module.exports = {
    "extends": "airbnb",

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
    },
  };