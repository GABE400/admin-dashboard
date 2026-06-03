import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

function generateDemoData() {
  console.log("Generating mockup demo data sets...");

  // 1. Generate 100 realistic contacts
  const contacts = Array.from({ length: 100 }).map((_, i) => {
    const gender = faker.person.sexType();
    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    return {
      id: `c-${i + 1}`,
      name: fullName,
      email: faker.internet.email({ firstName, lastName }),
      company: faker.company.name(),
      phone: faker.phone.number(),
      status: faker.helpers.arrayElement(["active", "lead", "customer"]),
      lastContact: faker.date.recent({ days: 30 }).toISOString().split("T")[0],
      avatar: `https://images.unsplash.com/photo-${faker.helpers.arrayElement([
        "1534528741775-53994a69daeb",
        "1507003211169-0a1dd7228f2d",
        "1494790108377-be9c29b29330",
        "1500648767791-00dcc994a43e",
        "1539571696357-5a69c17a67c6",
        "1524504388940-b1c1722653e1",
      ])}?q=80&w=128&auto=format&fit=crop`,
    };
  });

  // 2. Generate 50 Kanban board project tasks
  const projects = Array.from({ length: 50 }).map((_, i) => {
    const comments = faker.number.int({ min: 0, max: 12 });
    const assigneeCount = faker.number.int({ min: 1, max: 3 });
    const assignees = Array.from({ length: assigneeCount }).map(() => 
      `https://images.unsplash.com/photo-${faker.helpers.arrayElement([
        "1534528741775-53994a69daeb",
        "1507003211169-0a1dd7228f2d",
        "1494790108377-be9c29b29330",
        "1500648767791-00dcc994a43e",
        "1539571696357-5a69c17a67c6",
        "1524504388940-b1c1722653e1",
      ])}?q=80&w=128&auto=format&fit=crop`
    );

    return {
      id: `p-${i + 1}`,
      title: faker.hacker.phrase(),
      description: faker.lorem.sentence({ min: 6, max: 12 }),
      column: faker.helpers.arrayElement(["backlog", "in-progress", "review", "done"]),
      priority: faker.helpers.arrayElement(["low", "medium", "high"]),
      dueDate: faker.date.soon({ days: 15 }).toISOString().split("T")[0],
      comments,
      assignees,
    };
  });

  // 3. Generate 200 transaction log metrics
  const transactions = Array.from({ length: 200 }).map((_, i) => {
    const name = faker.person.fullName();
    return {
      id: `tx-${faker.string.alphanumeric(8).toUpperCase()}`,
      name,
      email: faker.internet.email({ firstName: name.split(" ")[0] }),
      avatar: `https://images.unsplash.com/photo-${faker.helpers.arrayElement([
        "1534528741775-53994a69daeb",
        "1507003211169-0a1dd7228f2d",
        "1494790108377-be9c29b29330",
        "1500648767791-00dcc994a43e",
        "1539571696357-5a69c17a67c6",
        "1524504388940-b1c1722653e1",
      ])}?q=80&w=128&auto=format&fit=crop`,
      amount: parseFloat(faker.finance.amount({ min: 10, max: 1500, dec: 2 })),
      status: faker.helpers.arrayElement(["paid", "pending", "failed"]),
      date: faker.date.recent({ days: 45 }).toISOString().split("T")[0],
    };
  });

  const outputData = {
    contacts,
    projects,
    transactions,
  };

  const fileURI = path.join(__dirname, "demo-data.json");
  fs.writeFileSync(fileURI, JSON.stringify(outputData, null, 2), "utf-8");
  console.log(`Successfully generated demo data. File saved to: ${fileURI}`);
}

generateDemoData();
