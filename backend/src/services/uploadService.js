import multer from "multer";
import Video from "../models/uploadSchema.js";
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, 
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('video/')) {
            return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
    }
});
export const uploadMiddleware = (req, res, next) => {
    upload.single('video')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Video upload failed', error: err.message });
        }
        next();
    });
};

export const handleVideoUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        console.log('Uploaded file:', req.file); 
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }

        const newVideo = new Video({
            title: req.body.title, 
            filename: req.file.filename, 
            uploadDate: req.file.uploadDate || Date.now() 
        });

        await newVideo.save();

        res.status(201).json({ data: newVideo, message: 'Video uploaded successfully!' });
    } catch (error) {
        console.error('Error during video upload:', error);
        res.status(500).json({ message: 'Video upload failed.', error: error.message });
    }
};



