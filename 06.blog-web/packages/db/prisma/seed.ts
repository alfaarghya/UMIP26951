import prisma from "../index";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const hashPassword = async (plain: string) => await bcrypt.hash(plain, 10);

async function main() {
  // 1. Create 10 users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          username: faker.internet.username(),
          password: await hashPassword("password12345"),
        },
      })
    )
  );
  console.log("=> users successfully seeded ✅");

  // 2. Create 30 blog posts
  const blogs = await Promise.all(
    Array.from({ length: 30 }).map(() => {
      const randomAuthor = faker.helpers.arrayElement(users);
      return prisma.blog.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(5),
          authorId: randomAuthor.id,
        },
      });
    })
  );
  console.log("=> blogs successfully seeded ✅");

  // 3. Add 2-5 comments per blog
  for (const blog of blogs) {
    const numComments = faker.number.int({ min: 2, max: 5 });

    await Promise.all(
      Array.from({ length: numComments }).map(() => {
        const randomUser = faker.helpers.arrayElement(users);
        return prisma.comment.create({
          data: {
            comment: faker.lorem.sentences(),
            blogId: blog.id,
            userId: randomUser.id,
          },
        });
      })
    );
  }
  console.log("=> comments successfully seeded ✅");

}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("🌱 Database seeded successfully!");
    await prisma.$disconnect();
  });