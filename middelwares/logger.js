const logger = (req, res, next) => {
          console.log(`${req.method} ${req.protocol}://${req.host}${req.url}`), next();
        }

        module.exports = logger;