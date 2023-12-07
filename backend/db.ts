import { Response } from "express";

export interface IDecodedUser {
  id: number;
}

const users = [
  { id: 1, email: "nisargbaxi@gmail.com", password: "123" },
  { id: 2, email: "sam_fisher@gmail.com", password: "123" },
];

export const foodDb = [
  {
    id: 0,
    name: "Sushi",
    description: "Sushi is a traditional Japanese dish.",
  },
  {
    id: 1,
    name: "Dal",
    description:
      "Dal contains onions, tomatoes and various spices which may be added",
  },
  {
    id: 2,
    name: "Pierogi",
    description:
      "Pierogi involve wrapping dough around a savoury or sweet filling",
  },
  {
    id: 3,
    name: "Kebab",
    description: "Kebab is a popular meal of skewered meat.",
  },
  {
    id: 4,
    name: "Dim sum",
    description:
      "Dim sum is a variety of smaller dishes that can be enjoyed both during lunch or dinner",
  },
];

export const addReceipe = (receipe: any) => {
  foodDb.push(receipe);
};

export const findReceipe = (name: string) => {
  return foodDb.filter((item) => item.name.toLowerCase().match(name));
};

export const findReceipeById = (id: number) => {
  return foodDb.filter((item) => item.id === id);
};

export const verifyUser = (email: string, password: string) => {
  const user = users.find((user) => {
    return user.email === email && user.password === password;
  });
  if (!user) throw new Error("User not found");
  return user;
};

export const findUserById = (id: number) => {
  const user = users.find((user) => user.id === id);
  if (!user) throw new Error("User not found");
  return user;
};

export const parseToken = (authHeader: string | undefined, res: Response) => {
  if (!authHeader) {
    res.status(403).send("Header does not exist");
    return "";
  }
  return authHeader.split(" ")[1];
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
