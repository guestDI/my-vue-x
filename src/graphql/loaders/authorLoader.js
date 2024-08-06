import DataLoader from 'dataloader';
import { prisma } from "../server.js";

const batchUsers = async (ids) => {
  const authors = await prisma.author.findMany({
    where: {
      recordId: {
        in: ids
      }
    }
  })

  const authorsMap = {};
  authors.forEach(author => {
    authorsMap[author.recordId] = author;
  })

  return ids.map(id => authorsMap[id])
}

export const authorLoader = new DataLoader(batchUsers)