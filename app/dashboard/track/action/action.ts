"use server";

import db from "../../../../lib/prisma";

export const fetchTrackInfo = async (orderid: string) => {
  console.log(orderid);
  const latAndlong = await db.orderInWay.findUnique({
    where: { orderId: orderid },
    include: { order: true, driver: true },
  });
  console.log(latAndlong);
  return latAndlong;
};
