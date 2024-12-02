import express from 'express';
import multer from 'multer';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import storage from '../config/firebaseStorage.js';

const UploadRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})

UploadRouter.post("/", upload.single("file"), async (req, res) => {
    try{

        //get file from request
        const file = req.file;
        if (file) {
            const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

            const blob = storage.file(fileName);
            const blobStream = blob.createWriteStream({
                resumable: false,
                metadata: {
                    contentType: file.mimetype
                },
            });
            blobStream.on("error", (error) => {
                console.error(error);
                res.status(400).json({message:error.message});
            });
            blobStream.on("finish", () => {
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${encodeURIComponent(fileName)}?alt=media`;
                res.status(200).json({publicUrl});
            });
            blobStream.end(file.buffer);
        } else {
            res.status(400).json({message: "PLease update a file"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

export default UploadRouter;