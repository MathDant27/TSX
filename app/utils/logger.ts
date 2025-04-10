// Enum para níveis de log
export enum LogLevel {
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
  }
  
  // Classe para logging
  export class Logger {
    private static instance: Logger;
    private logLevel: LogLevel = LogLevel.INFO;
  
    private constructor() {}
  
    // Padrão Singleton
    static getInstance(): Logger {
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }
  
    setLogLevel(level: LogLevel): void {
      this.logLevel = level;
    }
  
    private log(level: LogLevel, message: string, data?: any): void {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level}] ${message}`;
      
      switch (level) {
        case LogLevel.ERROR:
          console.error(logMessage, data || '');
          break;
        case LogLevel.WARNING:
          console.warn(logMessage, data || '');
          break;
        case LogLevel.INFO:
          console.info(logMessage, data || '');
          break;
        case LogLevel.DEBUG:
          console.debug(logMessage, data || '');
          break;
      }
    }
  
    info(message: string, data?: any): void {
      this.log(LogLevel.INFO, message, data);
    }
  
    warning(message: string, data?: any): void {
      this.log(LogLevel.WARNING, message, data);
    }
  
    error(message: string, data?: any): void {
      this.log(LogLevel.ERROR, message, data);
    }
  
    debug(message: string, data?: any): void {
      if (this.logLevel === LogLevel.DEBUG) {
        this.log(LogLevel.DEBUG, message, data);
      }
    }
  }
  