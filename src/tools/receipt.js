// IMPORTS
import { storage } from "../tools/storage.js";

// RECEIPT GENERATION FUNCTIONS
async function downloadPDF(orderNumber, invoiceRef) {
	const html2pdf = (await import("html2pdf.js")).default;
	const element = invoiceRef.current;
	if (!element) return;

	await new Promise((resolve) => setTimeout(resolve, 100));

	const opt = {
		filename: `chroot_receipt_${orderNumber}.pdf`,
		image: { type: "jpeg", quality: 0.98 },
		html2canvas: {
			scale: 2,
			useCORS: true,
			logging: true,
			windowWidth: 1200,
		},
		jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
	};

	await html2pdf().set(opt).from(element).save();
}

export async function printReceipt(orderNumber, invoiceRef) {
	await downloadPDF(orderNumber, invoiceRef);
	storage.remove("orderNumber");
	storage.remove("orderMessage");
	storage.remove("committed");
	return true;
}
