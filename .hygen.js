const fs = require('fs');

module.exports = {
  helpers: (locals, config) => ({
    unlessExists: (path, ...s) => {
      try {
        fs.statSync(path);
        config.logger.warn(`     skipped: ${path}`)
        return null;
      } catch (error) {
        return path;
      }
    },
    toPrefixUpper: s => s.toUpperCase(),
    toPrefixLower: s => s.toLowerCase(),
  }),
};
