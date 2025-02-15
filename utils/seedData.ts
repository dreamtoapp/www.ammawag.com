// scripts/seed.ts
import { faker } from "@faker-js/faker";
import db from "../lib/prisma";
import { generateOrderNumber } from "../utils/orderNumber";

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
    await db.company.deleteMany(); // Delete Companies
    await db.shift.deleteMany(); // Delete Shifts
    console.log("Existing data cleared successfully.");

    // Generate fake shifts
    console.log("Generating fake shifts...");
    const dayShift = await db.shift.create({
      data: {
        name: "صباح",
        startTime: "06:00",
        endTime: "18:00",
      },
    });

    const nightShift = await db.shift.create({
      data: {
        name: "مساء",
        startTime: "18:00",
        endTime: "06:00",
      },
    });

    console.log("Generated 2 fake shifts (Day and Night).");

    // Generate fake companies
    console.log("Generating fake companies...");
    const company = await db.company.create({
      data: {
        fullName: "John Doe & Co.",
        email: "john.doe@example.com",
        phoneNumber: faker.phone.number(),
        profilePicture: faker.image.url(),
        bio: "We are a software development company.",
        taxNumber: "1234567890", // Tax number
        taxQrImage: "https://example.com/tax-qr.png", // Tax QR image
        twitter: "https://twitter.com/company",
        linkedin: "https://linkedin.com/company",
        instagram: "https://instagram.com/company",
        facebook: "https://facebook.com/company",
        github: "https://github.com/company",
        website: "https://example.com",
        defaultShiftId: dayShift.id, // Link to Day Shift
      },
    });

    console.log("Generated 1 fake company.");

    // Generate fake suppliers
    console.log("Generating fake suppliers...");
    for (let i = 0; i < supplierCount; i++) {
      await db.supplier.create({
        data: {
          name: faker.company.name(),
          logo: faker.image.url(),
          publicId: faker.string.uuid(), // Add publicId for Cloudinary
          email: faker.internet.email(),
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
        },
      });
    }
    console.log(`Generated ${supplierCount} fake suppliers.`);

    // Generate fake products
    console.log("Generating fake products...");
    const allSuppliers = await db.supplier.findMany({ select: { id: true } }); // Fetch all supplier IDs
    if (allSuppliers.length === 0) {
      throw new Error("No suppliers available to assign to products.");
    }

    for (let i = 0; i < productCount; i++) {
      const supplier = faker.helpers.arrayElement(allSuppliers); // Randomly select a supplier
      await db.product.create({
        data: {
          name: faker.commerce.productName(),
          supplierId: supplier.id,
          price: parseFloat(faker.commerce.price()),
          size: faker.helpers.arrayElement(["1L", "500ml", "250ml"]),
          imageUrl: faker.image.url(),
          published: faker.datatype.boolean(), // Add published field
        },
      });
    }
    console.log(`Generated ${productCount} fake products.`);

    // Generate fake users (customers)
    console.log("Generating fake users...");
    for (let i = 0; i < userCount; i++) {
      await db.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(), // In production, hash passwords!
          role: faker.helpers.arrayElement(["customer", "admin"]),
        },
      });
    }
    console.log(`Generated ${userCount} fake users.`);

    // Generate fake drivers
    console.log("Generating fake drivers...");
    for (let i = 0; i < driverCount; i++) {
      const driver = await db.driver.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          imageUrl: faker.image.url(), // Add imageUrl for the driver
        },
      });

      // Add current location history for the driver
      await db.locationHistory.create({
        data: {
          driverId: driver.id,
          latitude: parseFloat(faker.location.latitude().toString()),
          longitude: parseFloat(faker.location.longitude().toString()),
        },
      });
    }
    console.log(`Generated ${driverCount} fake drivers.`);

    // Generate fake orders
    console.log("Generating fake orders...");
    const allUsers = await db.user.findMany({ select: { id: true } });
    const allDrivers = await db.driver.findMany({ select: { id: true } });
    const allProducts = await db.product.findMany({
      select: { id: true, price: true }, // Fetch product IDs and prices
    });

    if (allUsers.length === 0 || allProducts.length === 0) {
      throw new Error("Not enough users or products to create orders.");
    }

    for (let i = 0; i < orderCount; i++) {
      const customer = faker.helpers.arrayElement(allUsers);
      const driver = faker.helpers.arrayElement(allDrivers);

      // Generate a unique order number
      const orderNumber = await generateOrderNumber();

      // Create order items and calculate the total amount
      const items = faker.helpers.multiple(
        () => {
          const product = faker.helpers.arrayElement(allProducts);
          const quantity = faker.number.int({ min: 1, max: 5 });
          const price = product.price; // Use the current price of the product
          return {
            productId: product.id,
            quantity,
            price,
            subtotal: price * quantity, // Calculate subtotal for this item
          };
        },
        { count: faker.number.int({ min: 1, max: 3 }) }
      );

      // Calculate the total amount for the order
      const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

      // Create the order with the total amount
      const order = await db.order.create({
        data: {
          orderNumber,
          customerId: customer.id,
          driverId: driver.id,
          status: faker.helpers.arrayElement([
            "Pending",
            "Delivered",
            "In Transit",
          ]),
          amount: totalAmount, // Store the total amount
          shiftId: faker.helpers.arrayElement([dayShift.id, nightShift.id]), // Assign a random shift
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price, // Store the historical price
            })),
          },
        },
      });

      console.log(`Generated order: ${order.orderNumber}`);
    }
    console.log(`Generated ${orderCount} fake orders.`);

    // Generate fake promotions
    console.log("Generating fake promotions...");
    for (let i = 0; i < promotionCount; i++) {
      const productIds = faker.helpers.multiple(
        () => faker.helpers.arrayElement(allProducts).id,
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
