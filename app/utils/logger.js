import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log directory
const logDirectory = path.join(__dirname, '../../logs');

// Configure rotating file transport
const transport = new winston.transports.DailyRotateFile({
  filename: `${logDirectory}/app-%DATE%.log`, // Log file format
  datePattern: 'YYYY-MM-DD', // New file each day
  maxSize: '10m', // Max file size (10MB)
  maxFiles: '14d', // Keep logs for 14 days
  zippedArchive: true, // Compress old logs
});

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Create logger instance
const logger = winston.createLogger({
  level: 'info', // Default log level (can be 'debug', 'warn', 'error', etc.)
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat // Use the custom format
  ),
  transports: [
    transport, // Save logs to rotating files
    new winston.transports.Console({ format: winston.format.simple() }), // Also log to console
    new winston.transports.File({
      filename: `${logDirectory}/error.log`,
      level: 'error',
    }), // Separate error logs
  ],
});

// Log uncaught exceptions and unhandled rejections
logger.exceptions.handle(
  new winston.transports.File({ filename: `${logDirectory}/exceptions.log` })
);

export default logger;
