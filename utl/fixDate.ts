// db-maintenance.ts
import db from "../lib/prisma";

/**
 * Backfills `createdAt` and `updatedAt` fields for a specific model.
 * @param modelName - The name of the model to update.
 */
async function backfillTimestampsForModel(modelName: string): Promise<void> {
  const now = new Date();
  console.log(`[${modelName}] Starting timestamp backfill...`);

  try {
    // Fetch all records for the model
    const records = await (db[modelName as keyof typeof db] as any).findMany({
      where: {}, // No filter, fetch all records
    });

    // Filter records with missing `createdAt`
    const recordsToUpdate = records.filter((record: any) => !record.createdAt);

    if (recordsToUpdate.length === 0) {
      console.log(`[${modelName}] No records need timestamp backfill.`);
      return;
    }

    console.log(
      `[${modelName}] Found ${recordsToUpdate.length} records with missing timestamps.`
    );

    // Update each record individually
    for (const record of recordsToUpdate) {
      await (db[modelName as keyof typeof db] as any).update({
        where: { id: record.id }, // Use the record's unique ID
        data: { createdAt: now, updatedAt: now },
      });
    }

    console.log(`[${modelName}] Timestamps backfilled successfully.`);
  } catch (error: any) {
    console.error(
      `[${modelName}] Failed to backfill timestamps:`,
      error.message
    );
  }
}

/**
 * Runs database maintenance tasks.
 */
async function runMaintenance() {
  console.log("Starting database maintenance...");

  try {
    // List of models to process
    const models = [
      "supplier",
      "product",
      "order",
      "orderItem",
      "user",
      "driver",
      "locationHistory",
      "promotion",
    ];

    // Process each model one by one
    for (const model of models) {
      await backfillTimestampsForModel(model);
    }

    console.log("Database maintenance completed successfully.");
  } catch (error: any) {
    console.error("Database maintenance failed:", error.message);
  } finally {
    // Disconnect from the database
    await db.$disconnect();
    console.log("Disconnected from the database.");
  }
}

// Run the maintenance script
runMaintenance();
