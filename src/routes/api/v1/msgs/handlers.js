import { prisma } from "../../../../adapters.js";


export async function getAllMsg(req, res) {
  const allmsgs = await prisma.msg.findMany({orderBy: {
    id: 'desc', 
  }});
  return res.json(allmsgs);
  }

 export async function createOneMsg(req, res) {
  console.log("createOneMsg");
  console.log(req.body);
  const user_id =req.body.user_id;
  const username =req.body.username;
  const filename =req.body.filename;
  const msgContent = req.body.msg;

  const msg = await prisma.msg.create({ data: { user_id: user_id, username: username, filename: filename , msg: msgContent}});
  console.log(msg)
  return res.status(201).json({msg});
  }

export async function deleteOneMsg(req, res) {
  const user_id =req.body.user_id;
  const msg_id=req.body.msg_id;
  const msg= await prisma.msg.findFirst({where:{id:msg_id,user_id:user_id},select:{id:true}});
  if (msg === null) return res.status(404).json({ error: "msg cannot delete" });
  const result = await prisma.msg.delete({where:{id:msg_id}});
  console.log(result);
  if (result === null) return res.status(404).json({ error: "msg cannot delete" });
    return res.status(201).json(result);
  }

