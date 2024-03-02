import { Injectable, Logger, Scope } from '@nestjs/common';
import { AppLoggerLevel } from '../index';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends Logger {
  private static STATIC_APP_LOGGER_LEVEL: AppLoggerLevel = AppLoggerLevel.OFF;
  private readonly APP_LOGGER_LEVEL: AppLoggerLevel;

  constructor() {
    super();
    AppLogger.setLoggerLevel(AppLoggerLevel.ERROR);
  }

  static setLoggerLevel(debugLevel: AppLoggerLevel) {
    AppLogger.STATIC_APP_LOGGER_LEVEL = debugLevel;
  }

  getLoggerLevel(): AppLoggerLevel {
    return this.APP_LOGGER_LEVEL || AppLogger.STATIC_APP_LOGGER_LEVEL;
  }

  logDebug(functionName: string, props?: any, context?: string) {
    if (this.getLoggerLevel() >= AppLoggerLevel.EXTENDED_DEBUG) {
      const message = `${functionName}, ${JSON.stringify(props)}`;
      this.debug(message, context);
    }
  }

  logExtendedDebugError(
    functionName: string,
    error: any,
    props?: any,
    context?: string,
  ) {
    if (this.getLoggerLevel() >= AppLoggerLevel.EXTENDED_DEBUG) {
      const message = `${functionName} debug-error-extended: ${JSON.stringify(
        error,
      )}`;
      this.logDebug(message, props, context);
    }
  }

  logError(functionName: string, error: any, props?: any) {
    const errorMessage = `${functionName} Error: ${JSON.stringify(
      error,
    )}, ${JSON.stringify(props)}`;
    if (this.getLoggerLevel() >= AppLoggerLevel.ERROR) {
      this.error(errorMessage);
    }
  }

  logWarn(functionName: string, warn?: any, props?: any, context?: string) {
    const warnningMessage = `${functionName} Warning: ${JSON.stringify(
      warn,
    )}, ${JSON.stringify(props)}`;
    if (this.getLoggerLevel() >= AppLoggerLevel.WARN) {
      this.warn(warnningMessage, context);
    }
  }
}
