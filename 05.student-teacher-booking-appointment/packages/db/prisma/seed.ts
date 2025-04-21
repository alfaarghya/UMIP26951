import prisma from "../index";
import bcrypt from "bcrypt";

// Hashing passwords
const hashPassword = async (plain: string) => await bcrypt.hash(plain, 10);

async function main() {

  // Create 2 admins
  const admin1 = await prisma.user.upsert({
    where: { email: "arghya.admin@stba.com" },
    update: {},
    create: {
      name: "admin 1",
      email: "admin1@stba.com",
      role: "ADMIN",
      password: await hashPassword("admin123"),
      status: "APPROVED",
    },
  });
  const admin2 = await prisma.user.upsert({
    where: { email: "alfaarghyaadmin@stba.com" },
    update: {},
    create: {
      name: "alfaarghya",
      email: "alfaarghya.admin@stba.com",
      role: "ADMIN",
      password: await hashPassword("admin456"),
      status: "APPROVED",
    },
  });
  console.log("=> Admin successfully seeded ✅");


  // Create 3 active teachers (with password)
  const teacher1 = await prisma.user.upsert({
    where: { email: "teacher1@stba.com" },
    update: {},
    create: {
      name: "Teacher One",
      email: "teacher1@stba.com",
      role: "TEACHER",
      status: "APPROVED",
      subject: "Mathematics",
      department: "Science",
      password: await hashPassword("teach123"),
    },
  });

  const teacher2 = await prisma.user.upsert({
    where: { email: "teacher2@stba.com" },
    update: {},
    create: {
      name: "Teacher Two",
      email: "teacher2@stba.com",
      role: "TEACHER",
      status: "APPROVED",
      subject: "Physics",
      department: "Science",
      password: await hashPassword("teach456"),
    },
  });

  const teacher3 = await prisma.user.upsert({
    where: { email: "teacher3@stba.com" },
    update: {},
    create: {
      name: "Teacher Three",
      email: "teacher3@stba.com",
      role: "TEACHER",
      status: "APPROVED",
      subject: "English",
      department: "Arts",
      password: await hashPassword("teach789"),
    },
  });

  // Create 2 pending teachers (without password)
  const teacher4 = await prisma.user.upsert({
    where: { email: "teacher4@stba.com" },
    update: {},
    create: {
      name: "Teacher Four",
      email: "teacher4@stba.com",
      role: "TEACHER",
      status: "APPROVED",
      subject: "History",
      department: "Arts",
      password: null,
    },
  });

  const teacher5 = await prisma.user.upsert({
    where: { email: "teacher5@stba.com" },
    update: {},
    create: {
      name: "Teacher Five",
      email: "teacher5@stba.com",
      role: "TEACHER",
      status: "APPROVED",
      subject: "Biology",
      department: "Science",
      password: null,
    },
  });
  console.log("=> Teachers successfully seeded ✅");


  // Create 10 students with mixed status
  const student1 = await prisma.user.upsert({
    where: { email: "student1@stba.com" },
    update: {},
    create: {
      name: "Student One",
      email: "student1@stba.com",
      role: "STUDENT",
      password: await hashPassword("student123"),
      status: "APPROVED",
    },
  });

  const student2 = await prisma.user.upsert({
    where: { email: "student2@stba.com" },
    update: {},
    create: {
      name: "Student Two",
      email: "student2@stba.com",
      role: "STUDENT",
      password: await hashPassword("student456"),
      status: "APPROVED",
    },
  });

  const student3 = await prisma.user.upsert({
    where: { email: "student3@stba.com" },
    update: {},
    create: {
      name: "Student Three",
      email: "student3@stba.com",
      role: "STUDENT",
      password: await hashPassword("student789"),
      status: "APPROVED",
    },
  });

  const student4 = await prisma.user.upsert({
    where: { email: "student4@stba.com" },
    update: {},
    create: {
      name: "Student Four",
      email: "student4@stba.com",
      role: "STUDENT",
      password: await hashPassword("student000"),
      status: "APPROVED",
    },
  });

  const student5 = await prisma.user.upsert({
    where: { email: "student5@stba.com" },
    update: {},
    create: {
      name: "Student Five",
      email: "student5@stba.com",
      role: "STUDENT",
      password: await hashPassword("student321"),
      status: "APPROVED",
    },
  });

  const student6 = await prisma.user.upsert({
    where: { email: "student6@stba.com" },
    update: {},
    create: {
      name: "Student Six",
      email: "student6@stba.com",
      role: "STUDENT",
      password: await hashPassword("student654"),
      status: "PENDING",
    },
  });

  const student7 = await prisma.user.upsert({
    where: { email: "student7@stba.com" },
    update: {},
    create: {
      name: "Student Seven",
      email: "student7@stba.com",
      role: "STUDENT",
      password: await hashPassword("student987"),
      status: "PENDING",
    },
  });

  const student8 = await prisma.user.upsert({
    where: { email: "student8@stba.com" },
    update: {},
    create: {
      name: "Student Eight",
      email: "student8@stba.com",
      role: "STUDENT",
      password: await hashPassword("student111"),
      status: "PENDING",
    },
  });

  const student9 = await prisma.user.upsert({
    where: { email: "student9@stba.com" },
    update: {},
    create: {
      name: "Student Nine",
      email: "student9@stba.com",
      role: "STUDENT",
      password: await hashPassword("student222"),
      status: "DENIED",
    },
  });

  const student10 = await prisma.user.upsert({
    where: { email: "student10@stba.com" },
    update: {},
    create: {
      name: "Student Ten",
      email: "student10@stba.com",
      role: "STUDENT",
      password: await hashPassword("student333"),
      status: "DENIED",
    },
  });
  console.log("=> Admin successfully seeded ✅");


  // Create Appointments
  const appointments = await prisma.appointment.createMany({
    data: [
      {
        studentId: student1.id,
        teacherId: teacher1.id,
        date: new Date("2025-05-20T10:00:00Z"),
        status: "PENDING",
      },
      {
        studentId: student4.id,
        teacherId: teacher1.id,
        date: new Date("2025-05-20T10:00:00Z"),
        status: "PENDING",
      },
      {
        studentId: student5.id,
        teacherId: teacher1.id,
        date: new Date("2025-05-20T10:00:00Z"),
        status: "PENDING",
      },
      {
        studentId: student1.id,
        teacherId: teacher1.id,
        date: new Date("2025-05-20T10:00:00Z"),
        status: "APPROVED",
      },
      {
        studentId: student2.id,
        teacherId: teacher1.id,
        date: new Date("2025-05-22T10:00:00Z"),
        status: "APPROVED",
      },
      {
        studentId: student1.id,
        teacherId: teacher1.id,
        date: new Date("2025-05-20T10:00:00Z"),
        status: "CANCELLED",
      },
      {
        studentId: student3.id,
        teacherId: teacher1.id,
        date: new Date("2025-05-21T10:00:00Z"),
        status: "CANCELLED",
      },
      {
        studentId: student2.id,
        teacherId: teacher2.id,
        date: new Date("2025-05-16T14:00:00Z"),
        status: "APPROVED",
      },
      {
        studentId: student3.id,
        teacherId: teacher3.id,
        date: new Date("2025-05-18T11:30:00Z"),
        status: "CANCELLED",
      },
      {
        studentId: student4.id,
        teacherId: teacher4.id,
        date: new Date("2025-05-20T16:00:00Z"),
        status: "PENDING",
      },
      {
        studentId: student5.id,
        teacherId: teacher5.id,
        date: new Date("2025-05-21T09:00:00Z"),
        status: "PENDING",
      },
      {
        studentId: student1.id,
        teacherId: teacher3.id,
        date: new Date("2025-05-21T13:00:00Z"),
        status: "APPROVED",
      }
    ]
  });
  console.log("=> Appointment successfully seeded ✅");

  // Fetch created appointments to add messages
  const existingAppointments = await prisma.appointment.findMany({
    include: { student: true, teacher: true }
  });
  // Add messages (only from teacher to student)
  for (const appointment of existingAppointments) {
    // only add message if appointment is APPROVED or PENDING
    if (appointment.status !== "CANCELLED" && appointment.status !== "PENDING") {
      await prisma.message.create({
        data: {
          senderId: appointment.teacherId,
          receiverId: appointment.studentId,
          appointmentId: appointment.id,
          content: `Hello ${appointment.student.name}, your appointment on ${appointment.date.toDateString()} is being processed.`,
        }
      });
    }
  }
  console.log("=> messages successfully seeded ✅");
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
