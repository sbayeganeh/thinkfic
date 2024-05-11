import prisma from "../../lib/prisma";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

export const findUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};

export const createUser = async (email: string, name: string) => {
  return await prisma.user.create({
    data:{
      email,
      name
    }
  })
};


