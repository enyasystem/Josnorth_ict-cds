const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generate() {
  const svgPath = path.join(__dirname, '..', 'public', 'og-image.svg');
  const outPath = path.join(__dirname, '..', 'public', 'og-image.png');

  if (!fs.existsSync(svgPath)) {
    console.error('SVG not found at', svgPath);
    process.exit(1);
  }

  const svg = fs.readFileSync(svgPath);

  try {
    await sharp(svg)
      .resize(1200, 630, { fit: 'contain' })
      .png({ quality: 90 })
      .toFile(outPath);

    console.log('Generated', outPath);
  } catch (err) {
    console.error('Failed to generate PNG:', err);
    process.exit(1);
  }
}

generate();
