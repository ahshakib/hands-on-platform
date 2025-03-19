import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCertificate = async (user, hours) => {
  const canvas = createCanvas(600, 400);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 600, 400);
  
  ctx.fillStyle = '#000';
  ctx.font = '36px Arial';
  ctx.fillText('Certificate of Completion', 100, 150);
  ctx.font = '24px Arial';
  ctx.fillText(`Awarded to: ${user.name}`, 100, 200);
  ctx.fillText(`Total Hours: ${hours}`, 100, 250);

  const filePath = path.join(__dirname, '..', 'certificates', `${user.id}_certificate.png`);
  fs.writeFileSync(filePath, canvas.toBuffer());

  return filePath;
};
