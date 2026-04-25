import * as THREE from 'three';
import { themeColors } from '@/config/theme';

/** Reusable Three.js materials matching the brand palette. */

export const brandMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(themeColors.brand),
  roughness: 0.35,
  metalness: 0.1,
});

export const accentMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(themeColors.accent),
  roughness: 0.4,
  metalness: 0.2,
});
