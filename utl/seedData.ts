// seed.ts
import { faker } from "@faker-js/faker";
import db from "../lib/prisma";

async function main() {
  console.log("Seeding database with fake data...");

  try {
    // Clear existing data (optional)
    console.log("Clearing existing data...");
    await db.supplier.deleteMany();
    await db.product.deleteMany();
    await db.order.deleteMany();
    await db.user.deleteMany();
    await db.driver.deleteMany();
    await db.promotion.deleteMany();
    console.log("Existing data cleared successfully.");

    // Generate fake suppliers
    console.log("Generating fake suppliers...");
    const suppliers: { id: string }[] = [];
    for (let i = 0; i < 5; i++) {
      const supplier = await db.supplier.create({
        data: {
          name: faker.company.name(),
          logo: faker.image.url(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
        },
      });
      suppliers.push({ id: supplier.id });
    }
    console.log(`Generated ${suppliers.length} fake suppliers.`);

    // Generate fake products
    console.log("Generating fake products...");
    const products: { id: string }[] = [];
    for (let i = 0; i < 10; i++) {
      const supplier = faker.helpers.arrayElement(suppliers);
      const product = await db.product.create({
        data: {
          name: faker.commerce.productName(),
          supplierId: supplier.id,
          price: parseFloat(faker.commerce.price()),
          size: faker.helpers.arrayElement(["1L", "500ml", "250ml"]),
          imageUrl: faker.image.url(),
          outOfStock: faker.datatype.boolean(),
        },
      });
      products.push({ id: product.id });
    }
    console.log(`Generated ${products.length} fake products.`);

    // Generate fake users (customers)
    console.log("Generating fake users...");
    const users: { id: string }[] = [];
    for (let i = 0; i < 5; i++) {
      const user = await db.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(), // In production, hash passwords!
          role: faker.helpers.arrayElement(["customer", "admin"]),
        },
      });
      users.push({ id: user.id });
    }
    console.log(`Generated ${users.length} fake users.`);

    // Generate fake drivers
    console.log("Generating fake drivers...");
    const drivers: { id: string }[] = [];
    for (let i = 0; i < 3; i++) {
      const driver = await db.driver.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          vehicleType: faker.helpers.arrayElement(["Truck", "Van"]),
          licensePlate: faker.vehicle.vrm(),
          currentLocation: {
            latitude: parseFloat(faker.location.latitude().toString()),
            longitude: parseFloat(faker.location.longitude().toString()),
          },
        },
      });
      drivers.push({ id: driver.id });
    }
    console.log(`Generated ${drivers.length} fake drivers.`);

    // Generate fake orders
    console.log("Generating fake orders...");
    for (let i = 0; i < 10; i++) {
      const customer = faker.helpers.arrayElement(users);
      const driver = faker.helpers.arrayElement(drivers);

      const items = faker.helpers.multiple(
        () => ({
          productId: faker.helpers.arrayElement(products).id.toString(), // Ensure productId is a string
          quantity: faker.number.int({ min: 1, max: 5 }),
        }),
        { count: faker.number.int({ min: 1, max: 3 }) }
      );

      await db.order.create({
        data: {
          customerId: customer.id,
          driverId: driver.id,
          status: faker.helpers.arrayElement([
            "Pending",
            "Delivered",
            "In Transit",
          ]),
          items: items as any, // Ensure this matches your JSON structure
        },
      });
    }
    console.log("Generated 10 fake orders.");

    // Generate fake promotions
    console.log("Generating fake promotions...");
    for (let i = 0; i < 3; i++) {
      const productIds = faker.helpers.multiple(
        () => faker.helpers.arrayElement(products).id.toString(), // Ensure product ID is a string
        { count: faker.number.int({ min: 1, max: 3 }) }
      );

      await db.promotion.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          startDate: faker.date.past(),
          endDate: faker.date.future(),
          discount: parseFloat(
            faker.number.float({ min: 5, max: 50 }).toFixed(2)
          ), // Fixed discount field
          active: faker.datatype.boolean(),
          productIds: productIds,
        },
      });
    }
    console.log("Generated 3 fake promotions.");

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}
main();
