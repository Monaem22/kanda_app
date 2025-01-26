
const multer = require("multer");
const path = require("path");

const multerFilter = function (req, file, cb) {
    if (file.mimetype === "application/pdf" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    } else { 
        // cb(null, false);
        return cb('Invalid file type. Only images (JPEG, PNG) and PDFs are allowed.');
    }
};

const img_Uploading = () => {
    try {
        var imgStorage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "upload_image");
            },
            filename: function (req, file, cb) {
                const extantion = path.extname(file.originalname);
                const uniqueString =
                    file.fieldname + "_" + Date.now() + extantion;
                cb(null, uniqueString);
            },
            limits: { fileSize: 1000000 } // Set a file size limit which is 1 Megabyte.(optional)
        });

        const uploading = multer({
            storage: imgStorage,
            fileFilter: multerFilter,
        });
        return uploading;

    } catch (error) {
        throw error.message
    }
};


module.exports = { img_Uploading};



