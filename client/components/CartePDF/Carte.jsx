import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Document, Page, pdfjs } from "react-pdf";
import cls from "./Carte.module.scss";
import {Loader} from "../Loader/Loader";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const CarteComponent = () => {
    const { data } = useSession();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const path = "/carte/Carte.pdf";


    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const renderPages = () => {
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
                    loading={<Loader />}
                />
            );
        }
        return pages;
    };

    return (
        <div className={cls.container}>
            <Document
                file={path}
                renderMode="canvas"
                loading={<Loader />}
                onLoadSuccess={onDocumentLoadSuccess}
                error={"Failed to load PDF file."}
            >
            {numPages && renderPages()}
            </Document>
        </div>
    );
};


