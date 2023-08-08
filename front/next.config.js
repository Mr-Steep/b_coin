const dotenv = require('dotenv-webpack');
const {Fragment} = require("react");
const {Dialog, Transition} = require("@headlessui/react");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(new dotenv({ silent: true }));
    return config;
  },
}


module.exports = nextConfig