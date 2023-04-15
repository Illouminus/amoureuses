import React from "react";
import { styled } from "@mui/system";

const ModalOverlay = styled("div")({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
});

const ModalContent = styled("div")({
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "2rem",
    maxWidth: "80%",
    maxHeight: "80%",
    overflowY: "auto",
});

const ModalWindow = ({ children, onClose }) => {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>{children}</ModalContent>
        </ModalOverlay>
    );
};

export default ModalWindow;
