import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Configured GLTF loader with Draco compression. Use for loading .glb assets
 * from `public/models`. Draco decoder is loaded from a CDN by default.
 */
export function createGltfLoader() {
  const draco = new DRACOLoader();
  draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);
  return loader;
}
