export interface internal_AutoScalerOptions {
  Enabled: boolean;
  Cooldown: number;
  PollerMinCount: number;
  PollerMaxCount: number;
  PollerInitCount: number;
  PollerWaitTimeUpperBound: number;
  PollerWaitTimeLowerBound: number;
}

/**
 * defaultPollerScalerCooldownInSeconds
 */
export const defaultInitPollerSize = 2;

/**
 * defaultPollerScalerCooldownInSeconds
 */
export const defaultMaxPollerSize = 20;

/**
 * defaultPollerScalerCooldownInSeconds
 */
export const defaultMinPollerSize = 2;

/**
 * defaultPollerScalerCooldownInSeconds
 */
export const defaultPollerAutoScalerCooldown = 10000000000;

/**
 * defaultPollerScalerCooldownInSeconds
 */
export const defaultPollerAutoScalerWaitTimeLowerBound = 16000000;

/**
 * defaultPollerScalerCooldownInSeconds
 */
export const defaultPollerAutoScalerWaitTimeUpperBound = 256000000;
