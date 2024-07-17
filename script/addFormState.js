/* eslint-disable no-undef */
import { readFile, writeFile } from "fs/promises";
import path from "path";
import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt untuk nama file
rl.question(
  "Masukkan nama file yang ingin Anda perbarui: ",
  async (fileName) => {
    try {
      await generateFormState(fileName);
      await editFileIndexPage(fileName);
      createFolderStructure(fileName);
    } catch (error) {
      console.error("Error:", error);
      rl.close();
    }
  }
);

const generateFormState = async (fileName) => {
  const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.resolve(
    currentFileDir,
    `../src/app/store/model/index.ts`
  );

  let fieldName = fileName;
  fieldName = capitalcase(fileName);

  try {
    // Baca isi file TypeScript yang sudah ada
    let data = await readFile(filePath, "utf8");

    // Tambahkan import statement jika belum ada
    let newData = data;

    // Tambahkan atau perbarui impor interface FormState
    const importRegex = /import\s+\{([\s\S]*?)\}\s+from\s+"@\/pages";/;
    newData = newData.replace(importRegex, (match, p1) => {
      if (!p1.includes(`${fieldName}Dto, initial${fieldName}`)) {
        return `import {\n  ${p1.trim()},\n  ${fieldName}Dto, initial${fieldName}\n} from "@/pages";`;
      }
      return match;
    });

    // Tambahkan field baru ke interface FormState jika belum ada
    const interfaceRegex = /export\s+interface\s+FormState\s+{([\s\S]*?)\}/;
    newData = newData.replace(interfaceRegex, (match, p1) => {
      // Pastikan properti fieldName belum ada sebelumnya
      if (!p1.includes(`${fieldName}: ${fieldName}Dto`)) {
        return `export interface FormState {\n  ${p1.trim()}\n  ${fieldName}: ${fieldName}Dto\n}`;
      }
      return match;
    });

    // Tambahkan nilai initial ke initialState jika belum ada
    const initialStateRegex =
      /export\s+const\s+initialState\s*:\s*FormState\s*=\s*{([\s\S]*?)\};/;
    newData = newData.replace(initialStateRegex, (match, p1) => {
      // Pastikan properti fieldName belum ada dalam initialState
      if (!p1.includes(`${fieldName}: initial${fieldName},`)) {
        return `export const initialState: FormState = {\n  ${p1.trim()},\n  ${fieldName}: initial${fieldName}\n}`;
      }
      return match;
    });

    // Tulis perubahan kembali ke file TypeScript yang sudah ada
    await writeFile(filePath, newData, "utf8");
    console.log("File updated successfully.");

    rl.close(); // Tutup readline setelah selesai
  } catch (err) {
    console.error("Error:", err);
    rl.close(); // Tutup readline jika terjadi kesalahan
  }
};
const createFolderStructure = (folderName) => {
  const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
  const baseFolderPath = path.resolve(
    currentFileDir,
    `../src/pages/${folderName}`
  );
  folderName = capitalcase(folderName);

  const foldersToCreate = ["redux", "service", "model", "ui"];

  try {
    // Buat folder utama
    if (!fs.existsSync(baseFolderPath)) {
      fs.mkdirSync(baseFolderPath, { recursive: true });
    }

    // Buat subfolder dan file index.ts
    foldersToCreate.forEach((subFolder) => {
      const subFolderPath = path.join(baseFolderPath, subFolder);
      if (!fs.existsSync(subFolderPath)) {
        fs.mkdirSync(subFolderPath, { recursive: true });
      }

      const indexPath = path.join(subFolderPath, "index.ts");
      if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, ``, "utf8");
      }

      // Tambahkan file request.dto.ts dan response.dto.ts di folder model
      if (subFolder === "model") {
        const requestDtoPath = path.join(subFolderPath, "request.dto.ts");
        const responseDtoPath = path.join(subFolderPath, "response.dto.ts");
        if (!fs.existsSync(requestDtoPath)) {
          fs.writeFileSync(
            requestDtoPath,
            `export interface ${folderName}Dto {\n  name: string;\n}\n\nexport const initial${folderName}: ${folderName}Dto = {\n  name: ""\n};\n`,
            "utf8"
          );
        }
        if (!fs.existsSync(responseDtoPath)) {
          fs.writeFileSync(
            responseDtoPath,
            `export interface Response${folderName}Dto {\n  name: string;\n}\n`,
            "utf8"
          );
        }
        const modelIndexPath = path.join(subFolderPath, "index.ts");
        fs.writeFileSync(
          modelIndexPath,
          `export * from "./request.dto";\nexport * from "./response.dto";\n`,
          "utf8"
        );
      }
      if (subFolder === "redux") {
        const typePathRedux = path.join(subFolderPath, "type.ts");
        if (!fs.existsSync(typePathRedux)) {
          const typeContent = `import { Response${folderName}Dto } from "../model";\nexport interface Get${folderName}Dto {\n  data: Response${folderName}Dto[];\n  count: number;\n}\n\nexport interface ${folderName} {\n  get${folderName}: Get${folderName}Dto;\n}\n\nexport const initialState: ${folderName} = {\n  get${folderName}: {\n    data: [],\n    count: 0\n  }\n};\n`;
          fs.writeFileSync(typePathRedux, typeContent, "utf8");
        }
        const reduxIndex = path.join(subFolderPath, "index.ts");
        const indexReduxContent = `import { createSlice, PayloadAction } from "@reduxjs/toolkit";\nimport { Get${folderName}Dto, initialState } from "./type";\n\nconst ${folderName}Reducer = createSlice({\n  name: "${folderName}",\n  initialState,\n  reducers: {\n    set${folderName}(state, action: PayloadAction<Get${folderName}Dto>) {\n      state.get${folderName} = action.payload;\n    }\n  }\n});\n\nconst { set${folderName} } = ${folderName}Reducer.actions;\n\nexport { set${folderName} };\n\nexport default ${folderName}Reducer.reducer;\n`;
        fs.writeFileSync(reduxIndex, indexReduxContent, "utf8");
      }

      if (subFolder === "service") {
        const serviceIndex = path.join(subFolderPath, "index.ts");
        const serviceIndexContent = `import { AppDispatch, AppThunk, utilityActions } from "@/app";\nimport { apiInstance, urlApi } from "@/shared";\nimport { Response${folderName}Dto } from "../model";\nimport { set${folderName} } from "../redux";\n\nexport const service${folderName} = () => {\n  const get${folderName} = (): AppThunk => {\n    return async (dispatch: AppDispatch) => {\n      dispatch(utilityActions.setLoading({ table: true }));\n      try {\n        const response = await apiInstance.get<Response${folderName}Dto[]>(\n          urlApi.${camelCase(
          folderName
        )}\n        );\n        dispatch(set${folderName}({ data: response.data, count: response.count }));\n      } catch (error) {\n        dispatch(set${folderName}({ data: [], count: 0 }));\n      } finally {\n        dispatch(utilityActions.stopLoading());\n      }\n    };\n  };\n  return {\n    get${folderName}\n  };\n};\n\n`;
        fs.writeFileSync(serviceIndex, serviceIndexContent, "utf8");
      }

      if (subFolder === "ui") {
        const uiIndex = path.join(subFolderPath, "index.ts");
        fs.writeFileSync(
          uiIndex,
          `import ${folderName} from "./form${folderName}";\nexport * from "./form";\nexport { ${folderName} };\n`,
          "utf8"
        );

        const formFolderPath = path.join(subFolderPath, "form");
        const tableFolderPath = path.join(subFolderPath, "table");
        if (!fs.existsSync(formFolderPath)) {
          fs.mkdirSync(formFolderPath, { recursive: true });
        }
        if (!fs.existsSync(tableFolderPath)) {
          fs.mkdirSync(tableFolderPath, { recursive: true });
        }

        // Buat file index.tsx di dalam folder form
        const formIndexPath = path.join(formFolderPath, "index.tsx");
        fs.writeFileSync(
          formIndexPath,
          `import { Button, cn, FormPanel, RenderField } from "@/shared";\nimport { useAppSelector } from "@/app";\nimport { validate${folderName} } from "./validate";\n\nconst ${folderName} = () => {\n  const utility = useAppSelector((state) => state.utility);\n  const formValues = useAppSelector((state) => state.form.${capitalcase(
            folderName
          )});\n\n  function onSubmit() {}\n\n  return (\n    <div className={cn("grid gap-6")}>\n      <FormPanel\n        formName={"${capitalcase(
            folderName
          )}"}\n        onSubmit={onSubmit}\n        validate={validate${folderName}}\n        initialValues={formValues}\n      >\n        {({ form }) => (\n          <>\n            <div className="grid gap-2">\n              <RenderField\n                control={form.control}\n                label="Name"\n                placeholder="Masukan Name"\n                name="name"\n              />\n\n              <Button\n                type="submit"\n                className="mt-2"\n                loading={utility.getLoading.button}\n              >\n                Login\n              </Button>\n            </div>\n          </>\n        )}\n      </FormPanel>\n    </div>\n  );\n};\n\nexport default ${folderName};\n`,
          "utf8"
        );

        // Buat file index.tsx di dalam folder table
        const tableIndexPath = path.join(tableFolderPath, "index.tsx");
        fs.writeFileSync(
          tableIndexPath,
          `export { default } from "./table${folderName}";\n`,
          "utf8"
        );

        // Buat file column.tsx di dalam folder table
        const tableColumnPath = path.join(tableFolderPath, "column.tsx");
        fs.writeFileSync(
          tableColumnPath,
          `import { Column } from "react-table";\n\nexport const columns: Column[] = [\n  { Header: "Name", accessor: "name" }\n];\n`,
          "utf8"
        );
        const formData = path.join(subFolderPath, `form${folderName}.tsx`);
        const masterFormIndex = `import { ModalGlobal, PanelAdmin } from "@/shared";\nimport Form${folderName} from "./form";\nimport { useAppSelector } from "@/app";\nimport Table${folderName} from "./table";\n\nconst ${folderName} = () => {\n  const modal = useAppSelector((state) => state.utility.getModal);\n\n  return (\n    <PanelAdmin>\n      <Table${folderName} />\n      <ModalGlobal\n        title={\`\${modal.isEdit ? "Edit" : "Tambah"} Data\`}\n        size="medium"\n        namaForm={"${folderName}"}\n      >\n        <Form${folderName} />\n      </ModalGlobal>\n    </PanelAdmin>\n  );\n};\n\nexport default ${folderName};\n`;
        fs.writeFileSync(formData, masterFormIndex, "utf8");
      }
    });

    // Buat file index.ts di dalam folder utama
    const mainIndexPath = path.join(baseFolderPath, "index.ts");
    if (!fs.existsSync(mainIndexPath)) {
      fs.writeFileSync(
        mainIndexPath,
        `export * from "./model";\nexport * from "./redux";\nexport * from "./ui";\nexport * from "./service";`,
        "utf8"
      );
    }
    const urlApiPath = path.resolve(
      currentFileDir,
      "../src/shared/urlApi/index.ts"
    );
    if (fs.existsSync(urlApiPath)) {
      const urlApiContent = fs.readFileSync(urlApiPath, "utf8");
      const updatedUrlApiContent = urlApiContent.replace(
        /};\s*$/,
        `,\n  ${folderName.toLowerCase()}:"${folderName.toLowerCase()}",\n};`
      );
      fs.writeFileSync(urlApiPath, updatedUrlApiContent, "utf8");
    }
    console.log(`Folder structure for ${folderName} created successfully.`);
    rl.close();
  } catch (err) {
    console.error("Error:", err);
    rl.close();
  }
};
const editFileIndexPage = async (folderName) => {
  // const indexPath = path.resolve(__dirname, "../src/pages/index.ts");
  const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
  const indexPath = path.resolve(currentFileDir, `../src/pages/index.ts`);

  try {
    // Baca isi file index.ts
    let data = await readFile(indexPath, "utf8");

    // Tambahkan export statement jika belum ada
    let newData = data;

    // Periksa apakah sudah ada ekspor dari foldername
    const regex = new RegExp(
      `export\\s*\\*\\s*from\\s*"\\.\\/(${folderName})";`,
      "g"
    );
    if (!regex.test(newData)) {
      // Tambahkan ekspor baru
      newData += `export * from "./${folderName}";\n`;

      // Tulis perubahan kembali ke file index.ts
      await writeFile(indexPath, newData, "utf8");
      console.log(`Export to ${folderName} added successfully.`);
    } else {
      console.log(`Export to ${folderName} already exists.`);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

function capitalcase(str) {
  if (typeof str !== "string") {
    throw new Error("Input harus berupa string");
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function camelCase(str) {
  if (typeof str !== "string") {
    throw new Error("Input harus berupa string");
  }

  // Pisahkan kata-kata berdasarkan spasi atau underscore
  let words = str.split(/[\s_]+/);

  // Ubah huruf pertama setiap kata kecil ke huruf kapital kecuali kata pertama
  let camelCasedString = words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase(); // Huruf pertama kata pertama tetap kecil
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");

  return camelCasedString;
}
