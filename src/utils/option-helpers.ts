/**
 * ======================
 * OPTION HELPER FUNCTIONS
 * ======================
 * 
 * Utility functions for working with options and their translations.
 */

import { OPTIONS_CONFIG, type OptionType } from '@/schemas/options.schema';

/**
 * Translates an option value to its localized text.
 * 
 * @param optionType - The type of option (e.g., 'position', 'contractType')
 * @param value - The option value to translate
 * @param tOptions - Translation function for options namespace
 * @param fallback - Optional fallback value if translation fails
 * @returns The translated text or the original value if not found
 * 
 * @example
 * ```tsx
 * const positionText = translateOption('position', user.job.position, tOptions);
 * const contractText = translateOption('contractType', user.job.contractType, tOptions, 'N/A');
 * ```
 */
export function translateOption(
  optionType: OptionType,
  value: string | undefined | null,
  tOptions: (key: string) => string,
  fallback?: string
): string {
  if (!value) {
    return fallback ?? '';
  }

  const config = OPTIONS_CONFIG[optionType];
  
  // Check if the value is a valid option
  const values = config.values as readonly string[];
  if (values.includes(value)) {
    const translationKey = `${config.translationKey}.${value}`;
    try {
      const translated = tOptions(translationKey);
      // If translation returns the key itself, it means translation is missing
      if (translated === translationKey) {
        return fallback ?? value;
      }
      return translated;
    } catch {
      // If translation fails, return fallback or original value
      return fallback ?? value;
    }
  }

  // If value is not in the config, return fallback or value
  return fallback ?? value;
}

/**
 * Gets all valid values for an option type.
 * 
 * @param optionType - The type of option
 * @returns Array of valid option values
 * 
 * @example
 * ```tsx
 * const positions = getOptionValues('position');
 * // ['frontend', 'backend', 'designer', 'other']
 * ```
 */
export function getOptionValues<T extends OptionType>(
  optionType: T
): readonly string[] {
  return OPTIONS_CONFIG[optionType].values;
}

/**
 * Checks if a value is valid for a given option type.
 * 
 * @param optionType - The type of option
 * @param value - The value to check
 * @returns True if the value is valid
 * 
 * @example
 * ```tsx
 * if (isValidOptionValue('position', 'frontend')) {
 *   // Valid position
 * }
 * ```
 */
export function isValidOptionValue(
  optionType: OptionType,
  value: string
): boolean {
  const config = OPTIONS_CONFIG[optionType];
  const values = config.values as readonly string[];
  return values.includes(value);
}

/**
 * Gets the translation key for an option value.
 * 
 * @param optionType - The type of option
 * @param value - The option value
 * @returns The translation key (e.g., 'options.position.frontend')
 * 
 * @example
 * ```tsx
 * const key = getOptionTranslationKey('position', 'frontend');
 * // 'options.position.frontend'
 * ```
 */
export function getOptionTranslationKey(
  optionType: OptionType,
  value: string
): string {
  const config = OPTIONS_CONFIG[optionType];
  return `${config.translationKey}.${value}`;
}

