import { fileURLToPath } from 'url'
import { dirname } from 'path'
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function Multer(folder) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + "/public/images/" + folder)
        },
        filename: (req, file, cb) => {
            file.originalname = file.originalname.split(" ").join("")
            cb(null, Date.now()+"-"+file.originalname)
        }
    })

    const uploader = multer({ storage });
    return uploader;
}

export const uploaderProducts = Multer("products")
export const uploaderUsers = Multer("users")

export default __dirname;