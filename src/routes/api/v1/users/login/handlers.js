import { user } from "../../../../../../../frontend/src/services/user.js";
import { prisma } from "../../../../../adapters.js";
import fs from 'fs';
import path from 'path';


async function findUserByUsernameAndPassword(username, password) {
    return prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
    });
  }

export async function login(req, res) {
    console.log("login data");
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    findUserByUsernameAndPassword(username, password)
    .then((user) => {
        if (user) {
        console.log('Account found:', user);

        return res.status(201).json(user);
        } else {
        console.log('Account not found');
        return res.status(400).json(user);
        }
    })
    .catch((error) => {
        console.error('Something wrong for finding account:', error);
    });
  }