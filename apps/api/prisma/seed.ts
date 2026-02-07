import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const employees = [
  {
    firstName: "Alice",
    lastName: "Chen",
    email: "alice@company.com",
    department: "Engineering",
    phone: "+1-555-0101",
  },
  {
    firstName: "Bob",
    lastName: "Smith",
    email: "bob@company.com",
    department: "Sales",
    phone: "+1-555-0102",
  },
  {
    firstName: "Carol",
    lastName: "Wu",
    email: "carol@company.com",
    department: "Design",
    phone: "+1-555-0103",
  },
  {
    firstName: "David",
    lastName: "Park",
    email: "david@company.com",
    department: "Engineering",
    phone: "+1-555-0104",
  },
  {
    firstName: "Emma",
    lastName: "Jones",
    email: "emma@company.com",
    department: "HR",
    phone: null,
  },
  {
    firstName: "Frank",
    lastName: "Martinez",
    email: "frank@company.com",
    department: "Marketing",
    phone: "+1-555-0106",
  },
  {
    firstName: "Grace",
    lastName: "Lee",
    email: "grace@company.com",
    department: "Finance",
    phone: "+1-555-0107",
  },
  {
    firstName: "Henry",
    lastName: "Taylor",
    email: "henry@company.com",
    department: "Engineering",
    phone: "+1-555-0108",
  },
  {
    firstName: "Iris",
    lastName: "Anderson",
    email: "iris@company.com",
    department: "Sales",
    phone: null,
  },
  {
    firstName: "Jack",
    lastName: "Wilson",
    email: "jack@company.com",
    department: "Design",
    phone: "+1-555-0110",
  },
  {
    firstName: "Karen",
    lastName: "Brown",
    email: "karen@company.com",
    department: "Engineering",
    phone: "+1-555-0111",
  },
  {
    firstName: "Leo",
    lastName: "Garcia",
    email: "leo@company.com",
    department: "Marketing",
    phone: null,
  },
  {
    firstName: "Maya",
    lastName: "Rodriguez",
    email: "maya@company.com",
    department: "HR",
    phone: "+1-555-0113",
  },
  {
    firstName: "Nathan",
    lastName: "Kim",
    email: "nathan@company.com",
    department: "Finance",
    phone: "+1-555-0114",
  },
  {
    firstName: "Olivia",
    lastName: "Nguyen",
    email: "olivia@company.com",
    department: "Engineering",
    phone: null,
  },
  {
    firstName: "Peter",
    lastName: "Johnson",
    email: "peter@company.com",
    department: "Sales",
    phone: "+1-555-0116",
  },
  {
    firstName: "Quinn",
    lastName: "Davis",
    email: "quinn@company.com",
    department: "Design",
    phone: "+1-555-0117",
  },
  {
    firstName: "Rachel",
    lastName: "Miller",
    email: "rachel@company.com",
    department: "Marketing",
    phone: null,
  },
  {
    firstName: "Sam",
    lastName: "White",
    email: "sam@company.com",
    department: "Engineering",
    phone: "+1-555-0119",
  },
  {
    firstName: "Tina",
    lastName: "Lopez",
    email: "tina@company.com",
    department: "HR",
    phone: "+1-555-0120",
  },
  {
    firstName: "Uma",
    lastName: "Patel",
    email: "uma@company.com",
    department: "Finance",
    phone: null,
  },
  {
    firstName: "Victor",
    lastName: "Chang",
    email: "victor@company.com",
    department: "Sales",
    phone: "+1-555-0122",
  },
  {
    firstName: "Wendy",
    lastName: "Thompson",
    email: "wendy@company.com",
    department: "Engineering",
    phone: "+1-555-0123",
  },
  {
    firstName: "Xavier",
    lastName: "Harris",
    email: "xavier@company.com",
    department: "Design",
    phone: null,
  },
];

async function main() {
  console.log("Seeding database...");

  for (const employee of employees) {
    await prisma.employee.upsert({
      where: { email: employee.email },
      update: employee,
      create: employee,
    });
  }

  console.log(`Seeded ${employees.length} employees`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
