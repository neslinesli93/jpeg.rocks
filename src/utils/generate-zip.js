import JsZip from "jszip";
import FileSaver from "file-saver";
import { v4 as uuidv4 } from "uuid";

export default async function exportZip(files) {
  const zip = JsZip();

  const uniqueFilenames = generateUniqueFilenames(files);
  uniqueFilenames.forEach(({ name, blob }) => {
    zip.file(name, blob);
  });

  const zipFile = await zip.generateAsync({ type: "blob" });
  const fileName = "optimized_jpeg.zip";
  return FileSaver.saveAs(zipFile, fileName);
}

function generateUniqueFilenames(files) {
  const filenames = [];

  return files.map((f) => {
    if (filenames.includes(f.name)) {
      const fname = f.name;
      const rawFilename = fname.substr(0, fname.lastIndexOf(".")) || fname;
      const newFilename = `${rawFilename}_${uuidv4()}.jpg`;
      filenames.push(newFilename);

      return { ...f, name: newFilename };
    }

    filenames.push(f.name);
    return f;
  });
}
