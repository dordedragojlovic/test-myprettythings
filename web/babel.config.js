module.exports = {
  presets: [
    "next/babel",
    "@zeit/next-typescript/babel",
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
};
