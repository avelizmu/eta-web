module.exports = function override(config, env) {
    config.externals = {
        config: JSON.stringify(require('./config.json'))
    };

    return config;
};
