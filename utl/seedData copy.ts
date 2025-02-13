// seed.ts
import { faker } from "@faker-js/faker";
import db from "../lib/prisma";

// Helper function to parse command-line arguments
function getArgValue(argName: string, defaultValue: number): number {
  const arg = process.argv.find((arg) => arg.startsWith(`--${argName}=`));
  if (arg) {
    const value = parseInt(arg.split("=")[1], 10);
    if (!isNaN(value) && value > 0) {
      return value;
    }
  }
  return defaultValue;
}

async function main() {
  console.log("Seeding database with fake data...");

  try {
    // Parse command-line arguments for customizable seed sizes
    const supplierCount = getArgValue("suppliers", 5); // Default: 5 suppliers
    const productCount = getArgValue("products", 10); // Default: 10 products
    const userCount = getArgValue("users", 5); // Default: 5 users
    const driverCount = getArgValue("drivers", 3); // Default: 3 drivers
    const orderCount = getArgValue("orders", 10); // Default: 10 orders
    const promotionCount = getArgValue("promotions", 3); // Default: 3 promotions

    console.log(
      `Custom seed sizes: Suppliers=${supplierCount}, Products=${productCount}, Users=${userCount}, Drivers=${driverCount}, Orders=${orderCount}, Promotions=${promotionCount}`
    );

    // Clear existing data (optional)
    console.log("Clearing existing data...");
    await db.orderItem.deleteMany(); // Delete OrderItems
    await db.order.deleteMany(); // Delete Orders
    await db.locationHistory.deleteMany(); // Delete LocationHistory
    await db.driver.deleteMany(); // Delete Drivers
    await db.promotion.deleteMany(); // Delete Promotions
    await db.product.deleteMany(); // Delete Products
    await db.supplier.deleteMany(); // Delete Suppliers
    await db.user.deleteMany(); // Delete Users
    console.log("Existing data cleared successfully.");

    // Generate fake suppliers
    console.log("Generating fake suppliers...");
    const suppliers: { id: string }[] = [];
    for (let i = 0; i < supplierCount; i++) {
      const supplier = await db.supplier.create({
        data: {
          name: faker.company.name(),
          logo: faker.image.url(),
          publicId: faker.string.uuid(), // Add publicId for Cloudinary
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
    for (let i = 0; i < productCount; i++) {
      const supplier = faker.helpers.arrayElement(suppliers);
      const product = await db.product.create({
        data: {
          name: faker.commerce.productName(),
          supplierId: supplier.id,
          price: parseFloat(faker.commerce.price()),
          size: faker.helpers.arrayElement(["1L", "500ml", "250ml"]),
          imageUrl: faker.image.url(),
          published: faker.datatype.boolean(), // Add published field
        },
      });
      products.push({ id: product.id });
    }
    console.log(`Generated ${products.length} fake products.`);

    // Generate fake users (customers)
    console.log("Generating fake users...");
    const users: { id: string }[] = [];
    for (let i = 0; i < userCount; i++) {
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
    for (let i = 0; i < driverCount; i++) {
      const driver = await db.driver.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          imageUrl: faker.image.url(), // Add imageUrl for the driver
        },
      });
      drivers.push({ id: driver.id });

      // Add current location history for the driver
      await db.locationHistory.create({
        data: {
          driverId: driver.id,
          latitude: parseFloat(faker.location.latitude().toString()),
          longitude: parseFloat(faker.location.longitude().toString()),
        },
      });
    }
    console.log(`Generated ${drivers.length} fake drivers.`);

    // Generate fake orders
    console.log("Generating fake orders...");
    for (let i = 0; i < orderCount; i++) {
      const customer = faker.helpers.arrayElement(users);
      const driver = faker.helpers.arrayElement(drivers);

      // Create the order
      const order = await db.order.create({
        data: {
          customerId: customer.id,
          driverId: driver.id,
          status: faker.helpers.arrayElement([
            "Pending",
            "Delivered",
            "In Transit",
          ]),
        },
      });

      // Add order items
      const items = faker.helpers.multiple(
        () => ({
          productId: faker.helpers.arrayElement(products).id,
          quantity: faker.number.int({ min: 1, max: 5 }),
        }),
        { count: faker.number.int({ min: 1, max: 3 }) }
      );
      for (const item of items) {
        await db.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
          },
        });
      }
    }
    console.log(`Generated ${orderCount} fake orders.`);

    // Generate fake promotions
    console.log("Generating fake promotions...");
    for (let i = 0; i < promotionCount; i++) {
      const productIds = faker.helpers.multiple(
        () => faker.helpers.arrayElement(products).id,
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
          ),
          active: faker.datatype.boolean(),
          productIds: productIds,
        },
      });
    }
    console.log(`Generated ${promotionCount} fake promotions.`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
