import * as THREE from 'three';
import fs from 'fs';
import path from 'path';

// Node.js FileReader polyfill for GLTFExporter
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

const exporter = new GLTFExporter();

async function exportScene(scene, outputPath) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const gltf = await exporter.parseAsync(scene, { binary: true });
  fs.writeFileSync(outputPath, Buffer.from(gltf));
  console.log(`✓ Exported: ${outputPath} (${(Buffer.from(gltf).length / 1024).toFixed(1)} KB)`);
}

// Reusable Material Palette
const materials = {
  // Metals & Gloss
  darkTitanium: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 }),
  silverChrome: new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.15, metalness: 0.9 }),
  goldAccent: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.85 }),
  copperPcb: new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.35, metalness: 0.8 }),

  // Club Colors
  aiPurple: new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.2, metalness: 0.5, emissive: 0x4c1d95, emissiveIntensity: 0.3 }),
  aiGlow: new THREE.MeshStandardMaterial({ color: 0xc084fc, roughness: 0.1, metalness: 0.2, emissive: 0x9333ea, emissiveIntensity: 0.8 }),
  
  programmingBlue: new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.25, metalness: 0.6, emissive: 0x1e40af, emissiveIntensity: 0.3 }),
  codeCyan: new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.3, emissive: 0x0284c7, emissiveIntensity: 0.7 }),
  
  cyberGreen: new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2, metalness: 0.7, emissive: 0x047857, emissiveIntensity: 0.4 }),
  matrixGreen: new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.1, metalness: 0.2, emissive: 0x059669, emissiveIntensity: 0.9 }),
  
  iotOrange: new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.25, metalness: 0.6, emissive: 0xc2410c, emissiveIntensity: 0.35 }),
  iotGlow: new THREE.MeshStandardMaterial({ color: 0xfb923c, roughness: 0.15, metalness: 0.2, emissive: 0xea580c, emissiveIntensity: 0.8 }),

  // Glass & Translucent
  glassHolo: new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.7 }),
  glassDark: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.9 }),
  screenGlow: new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.2, metalness: 0.1, emissive: 0x3b82f6, emissiveIntensity: 0.6 }),

  // Matte Body
  whiteChassis: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.2 }),
  accentCyan: new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.2, metalness: 0.7 })
};

// ==========================================
// 1. AI CLUB 3D MODEL
// ==========================================
function buildAiClubModel() {
  const scene = new THREE.Scene();
  scene.name = 'AI_Club_Scene';

  // Root interactive group
  const root = new THREE.Group();
  root.name = 'ai_root';
  scene.add(root);

  // 1. Robot Entity
  const robot = new THREE.Group();
  robot.name = 'robot';
  
  // Head
  const headGeo = new THREE.BoxGeometry(0.7, 0.6, 0.55);
  const head = new THREE.Mesh(headGeo, materials.whiteChassis);
  head.position.set(0, 0.5, 0);
  
  // Visor
  const visorGeo = new THREE.BoxGeometry(0.55, 0.2, 0.1);
  const visor = new THREE.Mesh(visorGeo, materials.aiGlow);
  visor.position.set(0, 0.52, 0.28);
  
  // Antenna
  const antPoleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3);
  const antPole = new THREE.Mesh(antPoleGeo, materials.darkTitanium);
  antPole.position.set(0, 0.9, 0);
  const antTipGeo = new THREE.SphereGeometry(0.08, 16, 16);
  const antTip = new THREE.Mesh(antTipGeo, materials.aiGlow);
  antTip.position.set(0, 1.05, 0);

  // Body
  const bodyGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.8, 16);
  const body = new THREE.Mesh(bodyGeo, materials.darkTitanium);
  body.position.set(0, -0.2, 0);

  // Chest Core
  const coreGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.05, 16);
  coreGeo.rotateX(Math.PI / 2);
  const core = new THREE.Mesh(coreGeo, materials.aiGlow);
  core.position.set(0, -0.15, 0.42);

  // Arms
  const armGeo = new THREE.CapsuleGeometry(0.1, 0.45, 8, 16);
  const leftArm = new THREE.Mesh(armGeo, materials.whiteChassis);
  leftArm.position.set(-0.55, -0.15, 0);
  leftArm.rotation.z = Math.PI / 8;
  const rightArm = new THREE.Mesh(armGeo, materials.whiteChassis);
  rightArm.position.set(0.55, -0.15, 0);
  rightArm.rotation.z = -Math.PI / 8;

  robot.add(head, visor, antPole, antTip, body, core, leftArm, rightArm);
  robot.position.set(-0.9, 0.1, 0.2);
  root.add(robot);

  // 2. Holographic AI Brain
  const brain = new THREE.Group();
  brain.name = 'brain';
  
  const brainLobeGeo = new THREE.IcosahedronGeometry(0.4, 2);
  const leftLobe = new THREE.Mesh(brainLobeGeo, materials.aiGlow);
  leftLobe.scale.set(1.1, 0.9, 0.8);
  leftLobe.position.set(-0.25, 0, 0);
  const rightLobe = new THREE.Mesh(brainLobeGeo, materials.aiGlow);
  rightLobe.scale.set(1.1, 0.9, 0.8);
  rightLobe.position.set(0.25, 0, 0);

  // Neural Ring
  const ringGeo = new THREE.TorusGeometry(0.65, 0.02, 16, 64);
  const ring1 = new THREE.Mesh(ringGeo, materials.glassHolo);
  ring1.rotation.x = Math.PI / 3;
  const ring2 = new THREE.Mesh(ringGeo, materials.silverChrome);
  ring2.rotation.y = Math.PI / 4;

  brain.add(leftLobe, rightLobe, ring1, ring2);
  brain.position.set(0.9, 0.5, 0.3);
  root.add(brain);

  // 3. AI Processor Chip
  const aiChip = new THREE.Group();
  aiChip.name = 'ai_chip';
  const chipBaseGeo = new THREE.BoxGeometry(0.6, 0.1, 0.6);
  const chipBase = new THREE.Mesh(chipBaseGeo, materials.darkTitanium);
  const chipCoreGeo = new THREE.BoxGeometry(0.35, 0.06, 0.35);
  const chipCore = new THREE.Mesh(chipCoreGeo, materials.goldAccent);
  chipCore.position.set(0, 0.06, 0);

  // Chip Pins
  for (let i = -0.25; i <= 0.25; i += 0.12) {
    const pinGeo = new THREE.BoxGeometry(0.04, 0.02, 0.12);
    const pinNorth = new THREE.Mesh(pinGeo, materials.goldAccent);
    pinNorth.position.set(i, 0, 0.34);
    const pinSouth = new THREE.Mesh(pinGeo, materials.goldAccent);
    pinSouth.position.set(i, 0, -0.34);
    aiChip.add(pinNorth, pinSouth);
  }
  aiChip.add(chipBase, chipCore);
  aiChip.position.set(0.1, -0.6, 0.4);
  aiChip.rotation.x = 0.35;
  aiChip.rotation.y = -0.2;
  root.add(aiChip);

  // 4. DNA Helix & Synapse Nodes
  const dnaGroup = new THREE.Group();
  dnaGroup.name = 'dna_helix';
  for (let i = 0; i < 8; i++) {
    const t = i * 0.4;
    const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), materials.aiPurple);
    s1.position.set(Math.sin(t) * 0.3, t * 0.25 - 0.9, Math.cos(t) * 0.3);
    const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), materials.codeCyan);
    s2.position.set(-Math.sin(t) * 0.3, t * 0.25 - 0.9, -Math.cos(t) * 0.3);
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.6), materials.silverChrome);
    bar.position.set(0, t * 0.25 - 0.9, 0);
    bar.rotation.z = Math.PI / 2;
    bar.rotation.y = -t;
    dnaGroup.add(s1, s2, bar);
  }
  dnaGroup.position.set(1.8, -0.1, -0.1);
  root.add(dnaGroup);

  // 5. Floating Synapses / Octahedrons
  for (let i = 0; i < 6; i++) {
    const oct = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), materials.aiGlow);
    const angle = (i / 6) * Math.PI * 2;
    oct.position.set(Math.cos(angle) * 1.8, Math.sin(angle) * 1.0, (Math.random() - 0.5) * 0.8);
    oct.name = `floating_node_${i}`;
    root.add(oct);
  }

  return scene;
}

// ==========================================
// 2. PROGRAMMING CLUB 3D MODEL
// ==========================================
function buildProgrammingClubModel() {
  const scene = new THREE.Scene();
  scene.name = 'Programming_Club_Scene';

  const root = new THREE.Group();
  root.name = 'programming_root';
  scene.add(root);

  // 1. Laptop Entity
  const laptop = new THREE.Group();
  laptop.name = 'laptop';

  // Base
  const baseGeo = new THREE.BoxGeometry(1.2, 0.06, 0.85);
  const base = new THREE.Mesh(baseGeo, materials.silverChrome);
  // Keyboard Area
  const kbGeo = new THREE.BoxGeometry(1.0, 0.02, 0.5);
  const kb = new THREE.Mesh(kbGeo, materials.darkTitanium);
  kb.position.set(0, 0.04, 0.08);
  // Trackpad
  const tpGeo = new THREE.BoxGeometry(0.35, 0.01, 0.22);
  const tp = new THREE.Mesh(tpGeo, materials.darkTitanium);
  tp.position.set(0, 0.04, -0.24);

  // Screen Lid
  const lid = new THREE.Group();
  lid.position.set(0, 0.03, 0.42);
  const screenBackGeo = new THREE.BoxGeometry(1.2, 0.8, 0.04);
  const screenBack = new THREE.Mesh(screenBackGeo, materials.silverChrome);
  screenBack.position.set(0, 0.4, 0);
  const displayGeo = new THREE.BoxGeometry(1.1, 0.72, 0.01);
  const display = new THREE.Mesh(displayGeo, materials.screenGlow);
  display.position.set(0, 0.4, -0.025);
  lid.add(screenBack, display);
  lid.rotation.x = -0.35; // 110 deg open

  laptop.add(base, kb, tp, lid);
  laptop.position.set(-0.3, -0.35, 0.35);
  laptop.rotation.set(0.2, 0.4, -0.05);
  root.add(laptop);

  // 2. Floating Code Terminal Window
  const codeWindow = new THREE.Group();
  codeWindow.name = 'code_window';
  const winFrameGeo = new THREE.BoxGeometry(1.4, 0.9, 0.04);
  const winFrame = new THREE.Mesh(winFrameGeo, materials.darkTitanium);
  const winScreenGeo = new THREE.BoxGeometry(1.32, 0.78, 0.02);
  const winScreen = new THREE.Mesh(winScreenGeo, materials.programmingBlue);
  winScreen.position.set(0, -0.02, 0.02);

  // Window Controls (Red, Yellow, Green dots)
  const dot1 = new THREE.Mesh(new THREE.CircleGeometry(0.03, 16), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  dot1.position.set(-0.58, 0.36, 0.03);
  const dot2 = new THREE.Mesh(new THREE.CircleGeometry(0.03, 16), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
  dot2.position.set(-0.50, 0.36, 0.03);
  const dot3 = new THREE.Mesh(new THREE.CircleGeometry(0.03, 16), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
  dot3.position.set(-0.42, 0.36, 0.03);

  // Code Lines in 3D
  for (let i = 0; i < 5; i++) {
    const lineW = 0.4 + (i % 3) * 0.25;
    const lineGeo = new THREE.BoxGeometry(lineW, 0.03, 0.01);
    const lineMesh = new THREE.Mesh(lineGeo, i % 2 === 0 ? materials.codeCyan : materials.silverChrome);
    lineMesh.position.set(-0.45 + lineW / 2, 0.22 - i * 0.1, 0.03);
    codeWindow.add(lineMesh);
  }

  codeWindow.add(winFrame, winScreen, dot1, dot2, dot3);
  codeWindow.position.set(0.9, 0.4, -0.1);
  codeWindow.rotation.set(-0.1, -0.3, 0.05);
  root.add(codeWindow);

  // 3. Language & Tech Badges (Python, JS, C++, Git)
  const badgesGroup = new THREE.Group();
  badgesGroup.name = 'tech_badges';

  // Python Dual Cylinder Capsule
  const pyBadge = new THREE.Group();
  pyBadge.name = 'python_badge';
  const pyBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24), materials.goldAccent);
  pyBase.rotation.x = Math.PI / 2;
  const pyCore = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), materials.programmingBlue);
  pyBadge.add(pyBase, pyCore);
  pyBadge.position.set(-1.4, 0.6, 0.2);
  badgesGroup.add(pyBadge);

  // JS Tech Tile
  const jsBadge = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.08), materials.goldAccent);
  jsBadge.name = 'js_badge';
  jsBadge.position.set(-1.1, -0.6, 0.1);
  jsBadge.rotation.set(0.2, 0.3, 0.1);
  badgesGroup.add(jsBadge);

  // C++ Shield Badge
  const cppBadge = new THREE.Mesh(new THREE.OctahedronGeometry(0.25, 0), materials.codeCyan);
  cppBadge.name = 'cpp_badge';
  cppBadge.position.set(1.6, -0.4, 0.3);
  badgesGroup.add(cppBadge);

  // Git Branch node
  const gitBadge = new THREE.Group();
  gitBadge.name = 'git_node';
  const g1 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), materials.iotOrange);
  g1.position.set(0, -0.15, 0);
  const g2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), materials.iotOrange);
  g2.position.set(0, 0.15, 0);
  const g3 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), materials.codeCyan);
  g3.position.set(0.2, 0.05, 0);
  gitBadge.add(g1, g2, g3);
  gitBadge.position.set(1.5, 1.0, 0.1);
  badgesGroup.add(gitBadge);

  root.add(badgesGroup);

  // 4. Code Tokens (Brackets { } </>)
  const t1 = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 12, 32, Math.PI), materials.codeCyan);
  t1.position.set(-0.2, 0.9, 0.1);
  t1.rotation.z = Math.PI / 2;
  root.add(t1);

  return scene;
}

// ==========================================
// 3. CYBERSECURITY CLUB 3D MODEL
// ==========================================
function buildCybersecurityClubModel() {
  const scene = new THREE.Scene();
  scene.name = 'Cybersecurity_Club_Scene';

  const root = new THREE.Group();
  root.name = 'cyber_root';
  scene.add(root);

  // 1. Cyber Defense Shield
  const shield = new THREE.Group();
  shield.name = 'shield';

  const shieldOuterGeo = new THREE.CylinderGeometry(0.85, 0.65, 0.12, 6);
  shieldOuterGeo.rotateX(Math.PI / 2);
  const shieldOuter = new THREE.Mesh(shieldOuterGeo, materials.darkTitanium);

  const shieldInnerGeo = new THREE.CylinderGeometry(0.72, 0.52, 0.16, 6);
  shieldInnerGeo.rotateX(Math.PI / 2);
  const shieldInner = new THREE.Mesh(shieldInnerGeo, materials.cyberGreen);

  const shieldCoreGeo = new THREE.OctahedronGeometry(0.28, 0);
  const shieldCore = new THREE.Mesh(shieldCoreGeo, materials.matrixGreen);
  shieldCore.position.set(0, 0, 0.12);

  shield.add(shieldOuter, shieldInner, shieldCore);
  shield.position.set(-0.7, 0.1, 0.3);
  shield.rotation.set(-0.1, 0.3, -0.05);
  root.add(shield);

  // 2. Cyber Padlock
  const lock = new THREE.Group();
  lock.name = 'lock';

  // Body
  const lockBodyGeo = new THREE.BoxGeometry(0.6, 0.5, 0.25);
  const lockBody = new THREE.Mesh(lockBodyGeo, materials.goldAccent);

  // Shackle (Torus)
  const shackleGeo = new THREE.TorusGeometry(0.22, 0.06, 16, 32, Math.PI);
  const shackle = new THREE.Mesh(shackleGeo, materials.silverChrome);
  shackle.position.set(0, 0.25, 0);

  // Keyhole
  const keyholeGeo = new THREE.CylinderGeometry(0.06, 0.03, 0.08, 16);
  keyholeGeo.rotateX(Math.PI / 2);
  const keyhole = new THREE.Mesh(keyholeGeo, materials.darkTitanium);
  keyhole.position.set(0, -0.05, 0.12);

  lock.add(lockBody, shackle, keyhole);
  lock.position.set(0.8, -0.3, 0.4);
  lock.rotation.set(0.15, -0.25, 0.1);
  root.add(lock);

  // 3. Blade Server Rack Unit
  const server = new THREE.Group();
  server.name = 'server';

  const rackGeo = new THREE.BoxGeometry(1.2, 0.8, 0.5);
  const rack = new THREE.Mesh(rackGeo, materials.darkTitanium);

  for (let i = 0; i < 3; i++) {
    const slotGeo = new THREE.BoxGeometry(1.1, 0.18, 0.05);
    const slot = new THREE.Mesh(slotGeo, materials.glassDark);
    slot.position.set(0, 0.24 - i * 0.24, 0.25);
    
    // Status LEDs
    const led1 = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), materials.matrixGreen);
    led1.position.set(-0.45, 0, 0.04);
    const led2 = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), materials.matrixGreen);
    led2.position.set(-0.38, 0, 0.04);
    slot.add(led1, led2);

    server.add(slot);
  }
  server.add(rack);
  server.position.set(0.9, 0.6, -0.2);
  server.rotation.set(-0.1, -0.35, 0.05);
  root.add(server);

  // 4. Biometric Radar Globe & Firewall Grid
  const cyberGlobe = new THREE.Group();
  cyberGlobe.name = 'cyber_globe';
  const sphereGeo = new THREE.SphereGeometry(0.45, 16, 16);
  const sphereWire = new THREE.Mesh(sphereGeo, new THREE.MeshStandardMaterial({
    color: 0x10b981,
    wireframe: true,
    transparent: true,
    opacity: 0.6
  }));
  const ringHolo = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.6, 32), materials.matrixGreen);
  ringHolo.rotation.x = Math.PI / 2;
  cyberGlobe.add(sphereWire, ringHolo);
  cyberGlobe.position.set(-1.4, -0.5, 0.1);
  root.add(cyberGlobe);

  return scene;
}

// ==========================================
// 4. IOT CLUB 3D MODEL
// ==========================================
function buildIotClubModel() {
  const scene = new THREE.Scene();
  scene.name = 'IoT_Club_Scene';

  const root = new THREE.Group();
  root.name = 'iot_root';
  scene.add(root);

  // 1. IoT Microcontroller Board (ESP32 style)
  const board = new THREE.Group();
  board.name = 'iot_board';

  // PCB substrate
  const pcbGeo = new THREE.BoxGeometry(1.3, 0.06, 0.9);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.4, metalness: 0.3 }); // Green/Dark PCB
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);

  // MCU Metallic Shield
  const mcuGeo = new THREE.BoxGeometry(0.45, 0.08, 0.4);
  const mcu = new THREE.Mesh(mcuGeo, materials.silverChrome);
  mcu.position.set(-0.25, 0.06, 0);

  // WiFi Antenna Track
  const antGeo = new THREE.BoxGeometry(0.2, 0.02, 0.35);
  const ant = new THREE.Mesh(antGeo, materials.goldAccent);
  ant.position.set(-0.52, 0.04, 0);

  // MicroUSB / Type-C Port
  const usbGeo = new THREE.BoxGeometry(0.18, 0.1, 0.2);
  const usb = new THREE.Mesh(usbGeo, materials.silverChrome);
  usb.position.set(-0.64, 0.05, 0);

  // GPIO Header Pins
  for (let z = -0.38; z <= 0.38; z += 0.08) {
    const pinTop = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.04), materials.goldAccent);
    pinTop.position.set(0.55, 0.08, z);
    const pinBottom = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.04), materials.goldAccent);
    pinBottom.position.set(-0.05, 0.08, z);
    board.add(pinTop, pinBottom);
  }

  // Status LEDs
  const ledPower = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), materials.iotGlow);
  ledPower.position.set(0.35, 0.05, 0.25);
  const ledData = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), materials.codeCyan);
  ledData.position.set(0.35, 0.05, -0.25);

  board.add(pcb, mcu, ant, usb, ledPower, ledData);
  board.position.set(-0.4, -0.2, 0.35);
  board.rotation.set(0.35, 0.4, -0.1);
  root.add(board);

  // 2. Smart Home Isometric Node
  const smartHome = new THREE.Group();
  smartHome.name = 'smart_home';

  // Base Walls
  const houseWallsGeo = new THREE.BoxGeometry(0.7, 0.5, 0.7);
  const houseWalls = new THREE.Mesh(houseWallsGeo, materials.whiteChassis);
  // Roof Pyramid
  const roofGeo = new THREE.ConeGeometry(0.65, 0.4, 4);
  roofGeo.rotateY(Math.PI / 4);
  const roof = new THREE.Mesh(roofGeo, materials.iotOrange);
  roof.position.set(0, 0.45, 0);

  // Solar Panel
  const solarGeo = new THREE.BoxGeometry(0.35, 0.02, 0.3);
  const solar = new THREE.Mesh(solarGeo, materials.glassDark);
  solar.position.set(0.18, 0.48, 0.18);
  solar.rotation.set(0.4, 0, 0.4);

  // Signal Rings
  const sigRing = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.02, 8, 24, Math.PI), materials.iotGlow);
  sigRing.position.set(0, 0.8, 0);
  sigRing.rotation.x = -Math.PI / 2;

  smartHome.add(houseWalls, roof, solar, sigRing);
  smartHome.position.set(1.0, 0.35, 0.1);
  smartHome.rotation.set(0.1, -0.35, 0);
  root.add(smartHome);

  // 3. Sensor Modules (Ultrasonic Eyes)
  const ultrasonic = new THREE.Group();
  ultrasonic.name = 'ultrasonic_sensor';
  const uPcb = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.25, 0.04), materials.programmingBlue);
  const eye1 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.12, 16), materials.silverChrome);
  eye1.rotateX(Math.PI / 2);
  eye1.position.set(-0.12, 0, 0.08);
  const eye2 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.12, 16), materials.silverChrome);
  eye2.rotateX(Math.PI / 2);
  eye2.position.set(0.12, 0, 0.08);
  ultrasonic.add(uPcb, eye1, eye2);
  ultrasonic.position.set(-1.3, 0.6, 0.2);
  ultrasonic.rotation.set(-0.2, 0.3, 0.1);
  root.add(ultrasonic);

  return scene;
}

// ==========================================
// 5. HERO 3D MASTER SCENE
// ==========================================
function buildHeroMasterScene() {
  const scene = new THREE.Scene();
  scene.name = 'Hero_Master_Scene';

  const root = new THREE.Group();
  root.name = 'hero_root';
  scene.add(root);

  // 1. Central Innovation Core
  const coreGroup = new THREE.Group();
  coreGroup.name = 'central_core';

  const innerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 2), materials.aiGlow);
  
  // Gyro Ring 1 (AI / Purple)
  const gyro1 = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.04, 16, 64), materials.aiPurple);
  // Gyro Ring 2 (Code / Blue)
  const gyro2 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.04, 16, 64), materials.programmingBlue);
  gyro2.rotation.x = Math.PI / 3;
  // Gyro Ring 3 (Cyber / Green)
  const gyro3 = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.04, 16, 64), materials.cyberGreen);
  gyro3.rotation.y = Math.PI / 4;
  // Gyro Ring 4 (IoT / Orange)
  const gyro4 = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.04, 16, 64), materials.iotOrange);
  gyro4.rotation.x = -Math.PI / 4;
  gyro4.rotation.y = Math.PI / 3;

  coreGroup.add(innerCore, gyro1, gyro2, gyro3, gyro4);
  root.add(coreGroup);

  // 2. The 4 Club Satellite Nodes
  const aiSat = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), materials.aiGlow);
  aiSat.name = 'satellite_ai';
  aiSat.position.set(-1.8, 1.2, 0.4);

  const progSat = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), materials.codeCyan);
  progSat.name = 'satellite_programming';
  progSat.position.set(1.9, 1.1, 0.5);

  const cyberSat = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.1, 6), materials.matrixGreen);
  cyberSat.name = 'satellite_cybersecurity';
  cyberSat.position.set(-1.7, -1.2, 0.3);

  const iotSat = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), materials.iotGlow);
  iotSat.name = 'satellite_iot';
  iotSat.position.set(1.8, -1.1, 0.4);

  root.add(aiSat, progSat, cyberSat, iotSat);

  // 3. Floating Data Particles
  for (let i = 0; i < 16; i++) {
    const p = new THREE.Mesh(new THREE.TetrahedronGeometry(0.06, 0), materials.glassHolo);
    const rad = 2.0 + Math.random() * 0.8;
    const ang = (i / 16) * Math.PI * 2;
    p.position.set(Math.cos(ang) * rad, Math.sin(ang) * (rad * 0.7), (Math.random() - 0.5) * 1.2);
    p.name = `particle_${i}`;
    root.add(p);
  }

  return scene;
}

// ==========================================
// 6. ABOUT EXPLORE MODEL
// ==========================================
function buildAboutExploreModel() {
  const scene = new THREE.Scene();
  scene.name = 'About_Explore_Scene';

  const root = new THREE.Group();
  root.name = 'explore_root';
  scene.add(root);

  // Discovery Telescope / Lens
  const scope = new THREE.Group();
  scope.name = 'telescope';
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 1.0, 16), materials.darkTitanium);
  barrel.rotateZ(Math.PI / 4);
  const lens = new THREE.Mesh(new THREE.CircleGeometry(0.34, 24), materials.codeCyan);
  lens.position.set(0.36, 0.36, 0.01);
  lens.rotateZ(-Math.PI / 4);
  lens.rotateY(Math.PI / 2);
  scope.add(barrel, lens);
  root.add(scope);

  // Orbital Constellation Rings
  const orbit1 = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.02, 12, 48), materials.glassHolo);
  orbit1.rotation.x = Math.PI / 3;
  const star1 = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), materials.aiGlow);
  star1.position.set(0.75, 0, 0);
  root.add(orbit1, star1);

  return scene;
}

// ==========================================
// 7. ABOUT CREATE MODEL
// ==========================================
function buildAboutCreateModel() {
  const scene = new THREE.Scene();
  scene.name = 'About_Create_Scene';

  const root = new THREE.Group();
  root.name = 'create_root';
  scene.add(root);

  // 3D Geometric Blueprint Cube
  const cubeWire = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    wireframe: true
  }));
  cubeWire.name = 'blueprint_cube';

  const solidCore = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), materials.programmingBlue);

  // Maker Gear
  const gear = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.08, 8), materials.goldAccent);
  gear.position.set(0.5, -0.4, 0.2);
  gear.rotation.x = Math.PI / 3;

  root.add(cubeWire, solidCore, gear);
  return scene;
}

// ==========================================
// 8. ABOUT COLLABORATE MODEL
// ==========================================
function buildAboutCollaborateModel() {
  const scene = new THREE.Scene();
  scene.name = 'About_Collaborate_Scene';

  const root = new THREE.Group();
  root.name = 'collaborate_root';
  scene.add(root);

  // Central Collaborative Network Hub
  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), materials.cyberGreen);
  hub.name = 'network_hub';

  // 3 Connecting Member Nodes
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 1), materials.aiGlow);
    node.position.set(Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 0);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8), materials.glassHolo);
    beam.position.set(Math.cos(angle) * 0.4, Math.sin(angle) * 0.4, 0);
    beam.rotation.z = angle + Math.PI / 2;
    root.add(node, beam);
  }
  root.add(hub);
  return scene;
}

// ==========================================
// 9. REGISTRATION MODEL
// ==========================================
function buildRegistrationModel() {
  const scene = new THREE.Scene();
  scene.name = 'Registration_Scene';

  const root = new THREE.Group();
  root.name = 'registration_root';
  scene.add(root);

  // 3D Clipboard
  const board = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 0.06), materials.darkTitanium);
  board.name = 'clipboard';

  // Gold Clip at top
  const clip = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.12, 0.1), materials.goldAccent);
  clip.position.set(0, 0.58, 0.04);

  // Paper sheet
  const paper = new THREE.Mesh(new THREE.BoxGeometry(0.78, 1.05, 0.02), materials.whiteChassis);
  paper.position.set(0, -0.02, 0.04);

  // 3D Checkmarks
  for (let i = 0; i < 3; i++) {
    const check = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), materials.cyberGreen);
    check.position.set(-0.25, 0.3 - i * 0.25, 0.08);
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.03, 0.01), materials.silverChrome);
    line.position.set(0.05, 0.3 - i * 0.25, 0.08);
    root.add(check, line);
  }

  // Floating Stylus Pen
  const pen = new THREE.Group();
  pen.name = 'stylus_pen';
  const penBody = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.7, 12), materials.programmingBlue);
  const penTip = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.12, 12), materials.silverChrome);
  penTip.position.set(0, -0.4, 0);
  pen.add(penBody, penTip);
  pen.position.set(0.6, 0.1, 0.3);
  pen.rotation.set(0.2, 0, -Math.PI / 6);

  root.add(board, clip, paper, pen);
  return scene;
}

// ==========================================
// BATCH EXECUTION & EXPORT
// ==========================================
async function main() {
  console.log('🚀 Starting 3D Asset Generation Pipeline...');

  await exportScene(buildHeroMasterScene(), 'public/models/hero/hero-scene.glb');
  await exportScene(buildAiClubModel(), 'public/models/clubs/ai/ai-club.glb');
  await exportScene(buildProgrammingClubModel(), 'public/models/clubs/programming/programming-club.glb');
  await exportScene(buildCybersecurityClubModel(), 'public/models/clubs/cybersecurity/cybersecurity-club.glb');
  await exportScene(buildIotClubModel(), 'public/models/clubs/iot/iot-club.glb');
  await exportScene(buildAboutExploreModel(), 'public/models/about/explore.glb');
  await exportScene(buildAboutCreateModel(), 'public/models/about/create.glb');
  await exportScene(buildAboutCollaborateModel(), 'public/models/about/collaborate.glb');
  await exportScene(buildRegistrationModel(), 'public/models/registration/registration.glb');

  console.log('🎉 All 3D models generated and exported successfully to public/models/!');
}

main().catch(console.error);
