const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const { createCanvas, Image } = canvas;

const app = express();
const upload = multer({ dest: 'uploads/' });

// Inisialisasi face-api.js
const { Canvas, Image: FaceImage, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image: FaceImage, ImageData });

app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Load model
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('models');

    // Read image
    const img = await canvas.loadImage(req.file.path);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Detect faces
    const detections = await faceapi.detectAllFaces(canvas).withFaceLandmarks();

    // Blur faces
    detections.forEach(detection => {
      const { x, y, width, height } = detection.detection.box;
      ctx.filter = 'blur(10px)';
      ctx.drawImage(canvas, x, y, width, height, x, y, width, height);
      ctx.filter = 'none';
    });

    // Save result
    const outputPath = path.join('uploads', `blurred_${req.file.filename}.jpg`);
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createJPEGStream();
    stream.pipe(out);
    out.on('finish', () => {
      res.download(outputPath, 'blurred_image.jpg', (err) => {
        if (err) {
          console.error('Error downloading file:', err);
        }
        // Clean up temporary files
        fs.unlinkSync(req.file.path);
        fs.unlinkSync(outputPath);
      });
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
})
