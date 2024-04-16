import { Router } from "express";
import { getAllUsers, getOneUser, createOneUser, getFile } from "./handlers.js";
import multer from "multer";


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      return cb(null, "./public/Images")
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`)
    }
  })

const upload = multer({storage,});


const router = Router();
router.get(`/`, getAllUsers);
router.post(`/`, upload.single('image'), createOneUser);
router.get(`/:id`, getOneUser);
router.get(`/img/:img`, getFile);

export default router;
