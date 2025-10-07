// utils/logger.js
const logger = {
  info: (msg, data) => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(msg, data);
    }
  },
  warn: (msg, data) => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.warn(msg, data);
    }
  },
  error: (msg, data) => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(msg, data);
    }
  },
};

export default logger;
