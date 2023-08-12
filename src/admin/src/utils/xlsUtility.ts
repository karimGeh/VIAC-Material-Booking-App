import { saveAs } from "file-saver";

export default function downloadXls(fileBytes: string, fileName?: string) {
  const byteCharacters = atob(fileBytes);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  if (!fileName) {
    fileName = "ManageReports.xlsx";
  }
  saveAs(blob, `${fileName}`);
}
