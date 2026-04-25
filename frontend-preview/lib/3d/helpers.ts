import * as THREE from 'three';

/** Map a value from one numeric range to another. Useful for scroll-driven animations. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return THREE.MathUtils.mapLinear(value, inMin, inMax, outMin, outMax);
}

/** Linear interpolation. */
export const lerp = THREE.MathUtils.lerp;
