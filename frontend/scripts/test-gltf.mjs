import * as THREE from 'three';
import fs from 'fs';

if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class FileReader {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        if (this.onload) this.onload({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      });
    }
    readAsDataURL(blob) {
      blob.arrayBuffer().then((buf) => {
        const base64 = Buffer.from(buf).toString('base64');
        this.result = `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
        if (this.onload) this.onload({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      });
    }
  };
}

import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const scene = new THREE.Scene();
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3, metalness: 0.7 })
);
box.name = 'test_box';
scene.add(box);

const exporter = new GLTFExporter();
try {
  const gltf = await exporter.parseAsync(scene, { binary: true });
  fs.writeFileSync('public/models/hero/test.glb', Buffer.from(gltf));
  console.log('Successfully exported test.glb! Size:', Buffer.from(gltf).length, 'bytes');
} catch (err) {
  console.error('Error during parseAsync:', err);
}
