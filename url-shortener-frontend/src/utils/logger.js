// src/utils/logger.js

const LOG_LEVELS = {
  info: {
    style: "color: #2196F3; font-weight: bold;",
    label: "INFO",
  },
  warn: {
    style: "color: #FF9800; font-weight: bold;",
    label: "WARN",
  },
  error: {
    style: "color: #F44336; font-weight: bold;",
    label: "ERROR",
  },
  debug: {
    style: "color: #9C27B0; font-weight: bold;",
    label: "DEBUG",
  },
};

/**
 * Logger function for React apps.
 * @param {'info'|'warn'|'error'|'debug'} level
 * @param {string} message
 * @param {string} [context] - Optional context (e.g., 'API', 'Redux')
 * @param {any} [meta] - Optional extra data to log
 */
function logger(level, message, context = "", meta = null) {
  // Disable logger in production
  //   if (process.env.NODE_ENV === "production") return;

  const { style, label } = LOG_LEVELS[level] || LOG_LEVELS.info;
  const timestamp = new Date().toLocaleTimeString();

  let formatted = `%c[${label}]%c${
    context ? " [" + context + "]" : ""
  } ${timestamp} - ${message}`;

  if (meta !== null) {
    console.log(formatted, style, "color: inherit;", meta);
  } else {
    console.log(formatted, style, "color: inherit;");
  }
}

export default logger;

// import logger from '../utils/logger';

// Info log
// logger('info', 'User logged in', 'Auth');

// Warn log
// logger('warn', 'Token is expired, refreshing...', 'API');

// Error log (with error object)
// logger('error', 'Failed to shorten URL', 'ShortenService', err);

// Debug log (with meta data)
// logger('debug', 'Redux state changed', 'Redux', state);
