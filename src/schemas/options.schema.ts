/**
 * ======================
 * OPTIONS CONFIGURATION
 * ======================
 * 
 * Centralized configuration for all option types used in the application.
 * This ensures consistency and makes it easy to add new options or modify existing ones.
 */

export const OPTIONS_CONFIG = {
  position: {
    values: ['frontend', 'backend', 'designer', 'other'] as const,
    translationKey: 'options.position',
  },
  contractType: {
    values: ['fulltime', 'parttime', 'freelancer', 'project', 'hourly'] as const,
    translationKey: 'options.contractType',
  },
  location: {
    values: ['tehran', 'mashhad', 'remote', 'other'] as const,
    translationKey: 'options.location',
  },
  degree: {
    values: ['diploma', 'associate', 'bachelor', 'master', 'phd'] as const,
    translationKey: 'options.degree',
  },
  gender: {
    values: ['male', 'female', 'none'] as const,
    translationKey: 'options.gender',
  },
  maritalStatus: {
    values: ['single', 'married', 'other'] as const,
    translationKey: 'options.maritalStatus',
  },
} as const;

/**
 * ======================
 * TYPE DEFINITIONS
 * ======================
 */

export type PositionValue = typeof OPTIONS_CONFIG.position.values[number];
export type ContractTypeValue = typeof OPTIONS_CONFIG.contractType.values[number];
export type LocationValue = typeof OPTIONS_CONFIG.location.values[number];
export type DegreeValue = typeof OPTIONS_CONFIG.degree.values[number];
export type GenderValue = typeof OPTIONS_CONFIG.gender.values[number];
export type MaritalStatusValue = typeof OPTIONS_CONFIG.maritalStatus.values[number];

export type OptionType = keyof typeof OPTIONS_CONFIG;

/**
 * ======================
 * HELPER TYPES
 * ======================
 */

export type OptionValue<T extends OptionType> = typeof OPTIONS_CONFIG[T]['values'][number];

