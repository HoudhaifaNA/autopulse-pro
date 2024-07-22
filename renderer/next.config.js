module.exports = {
  compiler: {
    styledComponents: true,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }

    return config;
  },

  images: {
    unoptimized: true,
  },
};
