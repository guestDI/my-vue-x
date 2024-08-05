import { PrismaClient } from '@prisma/client';
import db from '../src/db.js'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.author.deleteMany()
    console.log('Deleted records in author table')


    await prisma.tweet.deleteMany()
    console.log('Deleted records in tweet table')


    // await prisma.$queryRaw`ALTER TABLE Author AUTO_INCREMENT = 1`
    // console.log('reset product auto increment to 1')
    //
    //
    // await prisma.$queryRaw`ALTER TABLE Tweet AUTO_INCREMENT = 1`
    // console.log('reset category auto increment to 1')


    await prisma.author.createMany({
      data: db.authors
    })
    console.log('Added author data')


    await prisma.tweet.createMany({
      data: db.tweets
    })
    console.log('Added tweet data')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })