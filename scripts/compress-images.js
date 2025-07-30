import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets');
const backupDir = path.join(__dirname, '../src/assets/backup');

// 백업 폴더 생성
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// 이미지 파일들 찾기
const imageFiles = fs.readdirSync(assetsDir)
  .filter(file => /\.(webp|jpg|jpeg|png)$/i.test(file))
  .filter(file => !file.includes('react.svg'));

console.log('🔍 Found image files:');
imageFiles.forEach(file => {
  const filePath = path.join(assetsDir, file);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(1);
  console.log(`  ${file}: ${sizeInMB}MB`);
});

console.log('\n🚀 Starting compression...\n');

// 각 이미지 압축
for (const file of imageFiles) {
  const inputPath = path.join(assetsDir, file);
  const backupPath = path.join(backupDir, file);
  
  try {
    // 원본 파일 백업
    fs.copyFileSync(inputPath, backupPath);
    
    // 파일 확장자 확인
    const ext = path.extname(file).toLowerCase();
    
    // 압축 설정
    let compressedImage;
    
    if (ext === '.webp') {
      compressedImage = await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      compressedImage = await sharp(inputPath)
        .jpeg({ quality: 80, progressive: true })
        .toBuffer();
    } else if (ext === '.png') {
      compressedImage = await sharp(inputPath)
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer();
    }
    
    // 압축된 파일 저장
    fs.writeFileSync(inputPath, compressedImage);
    
    // 크기 비교
    const originalSize = fs.statSync(backupPath).size;
    const compressedSize = fs.statSync(inputPath).size;
    const savedMB = ((originalSize - compressedSize) / (1024 * 1024)).toFixed(1);
    const reductionPercent = ((1 - compressedSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ ${file}: ${(originalSize / (1024 * 1024)).toFixed(1)}MB → ${(compressedSize / (1024 * 1024)).toFixed(1)}MB (${savedMB}MB saved, ${reductionPercent}% reduction)`);
    
  } catch (error) {
    console.log(`❌ Failed to compress ${file}:`, error.message);
  }
}

console.log('\n🎉 Compression complete!');
console.log(`📁 Original files backed up to: ${backupDir}`);
console.log('💡 If you want to restore original files, copy them back from the backup folder.'); 