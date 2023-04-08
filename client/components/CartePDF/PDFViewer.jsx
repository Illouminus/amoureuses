import React from "react";
import { isMobile } from "react-device-detect";

const PDFViewer = ({ src }) => {
    if (isMobile) {
        return (
            <div>
                <p>
                    To view the PDF on a mobile device, please download it:{" "}
                    <a href={src} download style={{
                        margin: '500px',
                        height: '400px',
                        fontWeight: '90px'
                    }}>
                        Download PDF
                    </a>
                </p>
            </div>
        );
    } else {
        return (
            <embed
                src={src}
                type="application/pdf"
                style={{
                    width: "100%",
                    height: "100vh",
                }}
            />
        );
    }
};

export default PDFViewer;
