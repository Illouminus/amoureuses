import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
const Test = () => {

    const { quill, quillRef } = useQuill();
    console.log("!");
    useEffect(() => {
        // console.log(quill, quillRef);
        console.log("!");
        if (quill) quill.setText("123");
    });

    return (
        <div style={{ width: "600px", height: "300px" }}>
            <div ref={quillRef} />
        </div>
    )
}

export default Test
