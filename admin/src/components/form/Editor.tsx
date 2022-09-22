import React, { useEffect, useRef, useState } from "react";
type Props = {
  onChange:any;
  editorLoaded?:boolean;
  name:String;
  value:any
};

function Editor({ onChange, editorLoaded, name, value }:Props) {
  const editorRef:any = useRef();
  const [loaded,setLoaded]=useState(false);
  const { CKEditor, ClassicEditor }:any = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
      
    };
  }, []);
  
  useEffect(()=>{
    setLoaded(true);
  })
  return (
    <div>
      {loaded ? (
        <CKEditor
          type=""
          config={ {
            /*plugins: [ Paragraph, Bold, Italic, Essentials ],*/
            toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
        } }
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor:any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      ) : (
        <div>Chargement ...</div>
      )}
    </div>
  );
}

export default Editor;
