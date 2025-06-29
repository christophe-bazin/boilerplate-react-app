/**
 * User Settings Service
 * Handles all user settings operations with Supabase
 */

// Local imports
import { supabase } from './supabaseClient';

export class UserSettingsService {
  // Get user settings
  static async getUserSettings(userId) {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user settings:', error);
      return null;
    }
  }

  // Save or update user settings
  static async saveUserSettings(userId, settings) {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .upsert(
          {
            user_id: userId,
            ...settings,
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
      console.error('Error saving user settings:', error);
      return null;
    }
  }

  // Theme-specific methods
  static async updateTheme(userId, theme) {
    return this.saveUserSettings(userId, { theme });
  }

  // Language-specific methods
  static async updateLanguage(userId, language) {
    return this.saveUserSettings(userId, { language });
  }

  // Delete user settings
  static async deleteUserSettings(userId) {
    try {
      const { error } = await supabase
        .from('user_settings')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting user settings:', error);
      return false;
    }
  }
}
