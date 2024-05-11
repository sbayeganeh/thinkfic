import prisma from "../../lib/prisma";
import { createUser, findUserByEmail } from "./user";

export const fetchPosts = async () => {
  return await prisma.post.findMany({
    include: { author: true },
  });
};

export const fetchPostsForUser = async (id: string) => {
  return await prisma.post.findMany({
    where: { authorId: Number(id) },
    include: { author: true },
  });
};

export const findPost = async (id: string) => {
  return await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });
};

export const createPost = async (email: string, name: string,title: string, content: string, sentiment: string) => {
  let userFound = await findUserByEmail(email);
  let authorId;

  if(!userFound){
    const user = await createUser(email, name)
    authorId = user.id;
  }else{
    authorId = userFound.id;
  }

  return await prisma.post.create({
    data: {
      authorId,
      title,
      content,
      createdAt: new Date().toString(),
      sentiment
    },
  });
};
