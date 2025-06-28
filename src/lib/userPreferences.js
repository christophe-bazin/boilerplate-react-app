import { supabase } from './supabaseClient';

/**
 * User Preferences Service
 * Handles all user preference operations with Supabase
 */
export class UserPreferencesService {
  /**
   * Get user preferences from Supabase
   * @param {string} userId - The user ID
   * @returns {Promise<Object|null>} User preferences or null if not found
   */
  static async getUserPreferences(userId) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No row found, return default preferences
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      return null;
    }
  }

  /**
   * Create or update user preferences
   * @param {string} userId - The user ID
   * @param {Object} preferences - The preferences to save
   * @param {string} preferences.theme - Theme preference ('light' | 'dark')
   * @param {string} preferences.language - Language preference ('fr' | 'en')
   * @returns {Promise<Object|null>} Updated preferences or null if error
   */
  static async saveUserPreferences(userId, preferences) {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert(
          {
            user_id: userId,
            ...preferences,
            updated_at: new Date().toISOString()
          },
          {
            onConflict: 'user_id'
          }
        )
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error saving user preferences:', error);
      return null;
    }
  }

  /**
   * Update only the theme preference
   * @param {string} userId - The user ID
   * @param {string} theme - Theme preference ('light' | 'dark')
   * @returns {Promise<Object|null>} Updated preferences or null if error
   */
  static async updateTheme(userId, theme) {
    return this.saveUserPreferences(userId, { theme });
  }

  /**
   * Update only the language preference
   * @param {string} userId - The user ID
   * @param {string} language - Language preference ('fr' | 'en')
   * @returns {Promise<Object|null>} Updated preferences or null if error
   */
  static async updateLanguage(userId, language) {
    return this.saveUserPreferences(userId, { language });
  }

  /**
   * Delete user preferences
   * @param {string} userId - The user ID
   * @returns {Promise<boolean>} Success status
   */
  static async deleteUserPreferences(userId) {
    try {
      const { error } = await supabase
        .from('user_preferences')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting user preferences:', error);
      return false;
    }
  }
}
