// utils/download.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const downloadExcel = (submissions) => {
  if (!submissions || submissions.length === 0) {
    alert("No data available to download");
    return;
  }

  // Prepare data rows for Excel
  const excelData = submissions.map((s, index) => ({
    "#": index + 1,
    Student: `${s?.student?.firstname || ""} ${
      s?.student?.lastname || ""
    }`.trim(),
    Email: s?.student?.email || "-",
    Quiz: s?.quiz?.subject || "N/A",
    Score: `${s?.obtainedMarks ?? "-"} / ${s?.totalMarks ?? "-"}`,
    Percentage:
      s?.obtainedMarks && s?.totalMarks
        ? `${((s.obtainedMarks / s.totalMarks) * 100).toFixed(1)}%`
        : "-",
    Submitted: s?.createdAt ? new Date(s.createdAt).toLocaleString() : "N/A",
  }));

  // Create worksheet & workbook
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Answer Scripts");

  // Write workbook to buffer
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Save file
  const fileData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(fileData, `Students_Exam_Record.xlsx`);
};

export default downloadExcel;
