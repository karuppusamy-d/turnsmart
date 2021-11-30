/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");

const isProd = process.env.NODE_ENV === "production";

module.exports = withPWA({
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  pwa: {
    dest: "public",
    disable: !isProd,
    // TODO:Temporary Fix for PWA
    buildExcludes: [/middleware-manifest\.json$/],
  },
});
