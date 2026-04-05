import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

async function run() {
  try {
    console.log("Removing background...");
    const blob = await removeBackground('./public/hero-portrait.png');
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync('./public/hero-portrait-clean.png', buffer);
    console.log("Success! Clean image saved.");
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
