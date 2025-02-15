import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

// Define Order Item Type
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

// Define Order Type
interface Order {
  id: string;
  orderNumber: string;
  customerName?: string | null;
  amount: number;
  items: OrderItem[];
}

// Generate Invoice PDF
export async function generateInvoicePDF(order: Order): Promise<Blob> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // **Company Header**
  doc.setFontSize(18);
  doc.text("Invoice", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text("Company Name: Amwag Co.", 14, 35);
  doc.text("Email: support@amwag.com", 14, 45);
  doc.text("Phone: +966 555 123 456", 14, 55);

  // **Order Details**
  doc.text(`Order Number: ${order.orderNumber}`, 14, 70);
  doc.text(`Customer: ${order.customerName || "Unknown"}`, 14, 80);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 90);

  // **Order Items Table**
  const items = order.items.map((item, index) => [
    index + 1,
    item.productName,
    item.quantity,
    `${item.price.toFixed(2)} SAR`,
    `${(item.quantity * item.price).toFixed(2)} SAR`,
  ]);

  autoTable(doc, {
    startY: 100,
    head: [["#", "Product", "Qty", "Price", "Total"]],
    body: items,
  });

  // **Tax & Total**
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const lastTableY = (doc as any).lastAutoTable.finalY || 120;
  doc.text(`Subtotal: ${subtotal.toFixed(2)} SAR`, 14, lastTableY + 10);
  doc.text(`VAT (15%): ${tax.toFixed(2)} SAR`, 14, lastTableY + 20);
  doc.setFontSize(14);
  doc.text(`Total: ${total.toFixed(2)} SAR`, 14, lastTableY + 35);

  // **QR Code Generation**
  try {
    const qrCodeData = `https://amwag.com/orders/${order.id}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    doc.addImage(qrCodeImage, "PNG", pageWidth - 50, lastTableY + 10, 40, 40);
  } catch (error) {
    console.error("Error generating QR Code:", error);
  }

  // **Return as Blob instead of saving the file**
  return new Promise((resolve) => {
    const pdfOutput = doc.output("blob"); // Generate PDF as Blob
    resolve(pdfOutput);
  });
}
