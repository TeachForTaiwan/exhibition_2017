module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "env": {
    "browser": true,
    "es6": true,
  },
  "rules": {
    "no-plusplus": 0,
    "no-param-reassign": [2, {
      "props": false,
    }],
  }
};
