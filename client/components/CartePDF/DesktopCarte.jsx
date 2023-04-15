import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import cls from "./Carte.module.scss";
import {Loader} from "../Loader/Loader";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const path = "/carte/Carte.pdf";

export const DesktopCarte = () => {
    const [numPages, setNumPages] = React.useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const renderPages = (numPages) => {
        const pages = [];
        for (let i = 1; i <= numPages; i++) {
            pages.push(
                <Page
                    key={`page_${i}`}
                    pageNumber={i}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    customTextRenderer={() => false}
                    className={cls.page}
                />
            );
        }
        return pages;
    };

    return (
        <div className={cls.container}>
            <Document file={path} onLoadSuccess={onDocumentLoadSuccess} loading={<Loader />}>
                <div className={cls.pages}>{numPages && renderPages(numPages)}</div>
            </Document>
        </div>
    );
};
