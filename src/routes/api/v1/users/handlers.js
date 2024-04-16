import { prisma } from "../../../../adapters.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


export async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createOneUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const filename = req.file.filename;
  const path=`${req.protocol}://${req.get('host')}`+'/api/v1/users/img/'+filename;
  if (!filename.match(/\.(jpg|png)$/)){
    return res.status(400).json({msg: "Please upload png or jpg"});
  }

  const user = await prisma.user.findFirst({where: {username: username },});
  if (!user){
    console.log("Account sige up success.")
    const user = await prisma.user.create({ data: { username: username, password: password, filename: path } });  // save to db
    return res.status(201).json({msg: "Account sign up successful."});
  } else{
    console.log("Account already exists.")
    return res.status(400).json({msg: "Account already exists."});
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getOneUser(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const user = await prisma.user.findUnique({ where: { id } });
  if (user === null) return res.status(404).json({ error: "Not Found" });
  return res.json(user);
}

export async function getFile(req, res) {
  const filename = req.params.img;

  // Get the directory path of the current module file
  const currentDir = path.dirname(fileURLToPath(import.meta.url));

  // console.log("filename");
  // console.log(filename);

  // Construct the image path
  const imagePath = path.join(currentDir, '../../../../../public/Images/', filename);
  // console.log("imagePath");
  // console.log(imagePath);
  //const imagePathnew = path.normalize(imagePath);

 if (fs.existsSync(imagePath)) {
     //File exists, send the image file to the client
     return res.sendFile(imagePath);
  } else {
    // File doesn't exist, return a 404 error
    return res.status(504).json({ error: 'File not found' });
  }
}