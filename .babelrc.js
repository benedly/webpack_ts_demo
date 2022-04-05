module.exports = (api) => {
  const mode = process.env.NODE_ENV === "production";

  // This caches the Babel config by environment.
  api.cache.using(() => mode);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: "> 0.25%, not dead",
          // targets: {"chrome": "58", "ie": "11"},
          useBuiltIns: "usage",
          corejs: 3,
          shippedProposals: true,
          modules: false,
        },
      ],
      "@babel/preset-typescript",
    ],
    plugins: ["@babel/plugin-proposal-class-properties"],
  };
};
