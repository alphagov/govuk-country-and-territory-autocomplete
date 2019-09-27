module.exports = {
  presets: [
    ['@babel/preset-env', {
      corejs: 3,
      shippedProposals: true,
      useBuiltIns: 'usage',
      loose: true
    }]
  ],
  plugins: [
    // Improve legacy IE compatibility
    ['@babel/plugin-transform-modules-commonjs', { loose: true }],
    '@babel/plugin-transform-member-expression-literals',
    '@babel/plugin-transform-property-literals'
  ]
};
