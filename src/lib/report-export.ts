export function csvText(headers: string[], rows: (string | number)[][]) {
  const cell = (v: string | number) => {
    let text = String(v);
    if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  };
  return (
    "\uFEFF" +
    [headers, ...rows].map((row) => row.map(cell).join(",")).join("\r\n")
  );
}
export function downloadText(
  filename: string,
  text: string,
  mime = "text/plain;charset=utf-8",
) {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function downloadCsv(
  filename: string,
  headers: string[],
  rows: (string | number)[][],
) {
  downloadText(filename, csvText(headers, rows), "text/csv;charset=utf-8");
}
export function printReport(
  title: string,
  headers: string[],
  rows: string[][],
  fa: boolean,
  preview = false,
) {
  const win = window.open("", "_blank", "width=1000,height=800");
  if (!win) throw Error("Popup blocked");
  win.document.documentElement.dir = fa ? "rtl" : "ltr";
  win.document.title = title;
  const style = win.document.createElement("style");
  style.textContent =
    "@page{size:A4;margin:15mm}body{font:13px Tahoma,Arial;color:#172554}table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid #ddd;padding:12px;text-align:start}th{background:#eff6ff}h1{color:#2563eb}tr{break-inside:avoid}img{width:200px}";
  win.document.head.appendChild(style);
  const logo = win.document.createElement("img");
  logo.alt = "NovinVDS";
  win.document.body.appendChild(logo);
  const heading = win.document.createElement("h1");
  heading.textContent = title;
  win.document.body.appendChild(heading);
  if (preview) {
    const p = win.document.createElement("p");
    p.textContent = fa
      ? "گزارش نمونه / غیرواقعی"
      : "Sample report / not account data";
    win.document.body.appendChild(p);
  }
  const table = win.document.createElement("table");
  [headers, ...rows].forEach((row, index) => {
    const tr = win.document.createElement("tr");
    row.forEach((v) => {
      const c = win.document.createElement(index ? "td" : "th");
      c.textContent = v;
      tr.appendChild(c);
    });
    table.appendChild(tr);
  });
  win.document.body.appendChild(table);
  logo.onload = () => {
    win.focus();
    win.print();
  };
  logo.onerror = () => win.print();
  logo.src = location.origin + "/brand/novinvds-logo.png";
}
