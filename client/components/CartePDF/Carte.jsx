import React, {Suspense, useState} from "react";
import {useSession} from "next-auth/react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import cls from './Carte.module.scss'

const path = '/carte/Carte.pdf'
export const CarteComponent = () => {

    const {status, data} = useSession()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1)
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }


    return (
        <Suspense >
        <div className={cls.container} >
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
                        customTextRenderer={() => false}
                        className={cls.page}

                    />
                ),
            )}
            </Document>
        </div>
        </Suspense>
    )
}


