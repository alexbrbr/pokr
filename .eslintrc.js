module.exports = {
  extends: "sparkle",
  globals: {
    require: true,
    module: true,
    test: true,
    expect: true,
    Set: true
  },
  rules: {
    "guard-for-in": [0],
    "no-nested-ternary": [0],
    semi: [0]
  }
};
