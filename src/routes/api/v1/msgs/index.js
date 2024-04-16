import { Router } from "express";
import { createOneMsg, deleteOneMsg, getAllMsg } from "./handlers.js";

const router = Router();
router.get(`/`, getAllMsg);
router.post(`/create`, createOneMsg);
router.post(`/delete`, deleteOneMsg);
export default router;
