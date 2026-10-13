import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

async function snapshotInvoice(element: HTMLElement) {
  await document.fonts.ready;
  const host = document.createElement('div');
  host.className = 'invoice-export-host';
  const clone = element.cloneNode(true) as HTMLElement;
  clone.removeAttribute('id');
  host.appendChild(clone);
  document.body.appendChild(host);
  try {
    return await html2canvas(clone, { scale: 2, useCORS: true, backgroundColor: null, windowWidth: 1100, scrollX: 0, scrollY: 0 });
  } finally {
    host.remove();
  }
}

export async function downloadInvoice(element: HTMLElement, filename: string) {
  const canvas = await snapshotInvoice(element);
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
  const width = 190;
  const pageHeight = 277;
  const pixelsPerPage = Math.floor(canvas.width * pageHeight / width);
  for (let offset = 0; offset < canvas.height; offset += pixelsPerPage) {
    if (offset > 0) pdf.addPage();
    const part = document.createElement('canvas');
    part.width = canvas.width;
    part.height = Math.min(pixelsPerPage, canvas.height - offset);
    const context = part.getContext('2d');
    if (!context) throw new Error('Canvas unavailable');
    context.drawImage(canvas, 0, offset, canvas.width, part.height, 0, 0, canvas.width, part.height);
    pdf.addImage(part.toDataURL('image/png'), 'PNG', 10, 10, width, part.height * width / canvas.width);
  }
  pdf.save(`${filename}.pdf`);
}

export async function printInvoice(element: HTMLElement) {
  const canvas = await snapshotInvoice(element);
  const frame = document.createElement('iframe');
  frame.className = 'invoice-print-frame';
  frame.title = 'چاپ فاکتور';
  document.body.appendChild(frame);
  const doc = frame.contentDocument;
  const win = frame.contentWindow;
  if (!doc || !win) { frame.remove(); throw new Error('Print unavailable'); }
  const style = doc.createElement('style');
  style.textContent = '@page{size:A4;margin:10mm} body{margin:0} img{width:100%;height:auto;display:block}';
  doc.head.appendChild(style);
  const image = doc.createElement('img');
  image.alt = 'فاکتور';
  image.src = canvas.toDataURL('image/png');
  doc.body.appendChild(image);
  await image.decode();
  win.addEventListener('afterprint', () => frame.remove(), { once: true });
  win.focus();
  win.print();
  // Some browsers do not emit afterprint for iframes.
  window.setTimeout(() => frame.remove(), 120000);
}