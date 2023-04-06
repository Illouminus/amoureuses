import {MainFooter} from "../Footers/MainFooter/MainFooter";
import React, {useState} from "react";
import {useSession} from "next-auth/react";
import {MainNavbar} from "../Navbars/MainNavbar/MainNavbar";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import cls from './Carte.module.scss'
export const Carte = () => {

    const {status, data} = useSession()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1)
    const path = '/carte/Carte.pdf'
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }




    //<embed src="/carte/Carte.pdf" width="100%" height="1200px" type="application/pdf" />
    return (
        <div className={cls.container}>
            <Document
                file={path}
                onLoadSuccess={onDocumentLoadSuccess}
            >
            {Array.from(
                new Array(numPages),
                (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        customTextRenderer={false}
                        className={cls.page}
                    />
                ),
            )}
            </Document>
        </div>
    )
}


