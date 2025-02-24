import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Editor({ value, setValue }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const content = editor.getData();
const decodedContent = content
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/\\"/g, '"')
  .replace(/&apos;/g, "'");
console.log(decodedContent);
setValue(decodedContent); 
      }}
      config={{
        licenseKey:"eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDEzMDU1OTksImp0aSI6ImEyYzI1MmNjLTk0ZTQtNDlhOC1iODY3LTZlODJkOGM1YjEyNiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjE1MTVjNzRjIn0.m3LKofPD3B2bHJdFzti-cwJSnRwo9g3tt53ILXYTI_8auQQTGyDoruq8cIhcWnh3zK1Vduh6gLktY-1gwRAMmA",
        contentFilter: false,
        entities: false,      // Prevent escaping HTML entities
        basicEntities: false,
        enterMode: 'div', // You can also use 'br' to break lines
        shiftEnterMode: 'br', // Prevent escaping basic HTML entities
      }}
    />
  );
}
