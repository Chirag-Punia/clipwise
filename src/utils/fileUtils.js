import * as PDFJS from "pdfjs-dist";

export async function readFileContent(file) {
  return new Promise((resolve, reject) => {
    if (file.type === "application/pdf") {
      return readPdfContent(file).then(resolve).catch(reject);
    }

    if (file.type.startsWith("image/")) {
      resolve(`[Image content from: ${file.name}]`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

async function readPdfContent(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
  let content = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    content += textContent.items.map((item) => item.str).join(" ") + "\n";
  }

  return content;
}
