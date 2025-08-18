const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

const videoUrl = 'https://www.youtube.com/watch?v=itvR7TQnWl0';
const outputPath = path.join(__dirname, 'public', 'video-scrubber', 'youtube-video.mp4');

// Ensure the directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log('Downloading YouTube video...');
console.log('URL:', videoUrl);
console.log('Output:', outputPath);

ytdl(videoUrl, {
  quality: 'highest',
  filter: 'videoandaudio'
})
.pipe(fs.createWriteStream(outputPath))
.on('finish', () => {
  console.log('Download completed successfully!');
})
.on('error', (error) => {
  console.error('Download failed:', error);
});

