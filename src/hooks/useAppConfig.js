/**
 * useAppConfig hook
 * Provides access to application configuration settings
 */

// Local imports
import appConfig from '../config/app.json';

export function useAppConfig() {
  return appConfig;
}
