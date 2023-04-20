import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import axios from "axios";
import cls from "./ArticleForm.module.scss";
import { ButtonProfile } from "../../ButtonProfile/ButtonProfile";
import {DraggableBlock} from "./Blocs/DraggableBlock";

export const ArticleForm = () => {
    const [blocks, setBlocks] = useState([]);
    console.log('СМОТРИМ НА БЛОКИ', blocks)
    const BUCKET_URL = "https://les-amoureuses.s3.eu-west-3.amazonaws.com/";

    const addBlock = (type) => {
        const newBlock = {
            id: Date.now(),
            type,
            content: "",
            alt: type === "image" ? "" : undefined,
        };

        setBlocks([...blocks, newBlock]);
    };

    const moveBlock = (dragIndex, hoverIndex) => {
        const draggedBlock = blocks[dragIndex];
        setBlocks(
            update(blocks, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, draggedBlock],
                ],
            })
        );
    };

    const removeBlock = (id) => {
        setBlocks(blocks.filter((block) => block.id !== id));
    };

    const handleImageUpload = async (acceptedFiles) => {
        try {
            let { data } = await axios.post("/api/tasting/upload-photo", {
                name: acceptedFiles[0].name,
                type: acceptedFiles[0].type,
            });
            const url = data.url;
            const imageUrl = BUCKET_URL + acceptedFiles[0].name;

            await axios.put(url, acceptedFiles[0], {
                headers: {
                    "Content-type": acceptedFiles[0].type,
                    "Access-Control-Allow-Origin": "*",
                },
            });

            return imageUrl;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const updateBlock = (id, { content, src, alt }) => {
        setBlocks(
            blocks.map((block) =>
                block.id === id
                    ? { ...block, content: content ?? block.content, src: src ?? block.src, alt: alt ?? block.alt  }
                    : block
            )
        );
    };

    const handleSubmit = async() => {
        const response = await axios.post('/api/blog/add', {blocks})
    }

    return (
        <>
            <h2 className={cls.title}>Créer un article</h2>
            <div className={cls.container}>
                <div className={cls.containerAdding}>
                    <ButtonProfile
                        onClick={() => addBlock("title")}
                        text={"Ajouter un bloc Title"}
                        width={"300px"}
                    />
                    <ButtonProfile
                        onClick={() => addBlock("subTitle")}
                        text={"Ajouter un bloc SubTitle"}
                        width={"300px"}
                    />
                    <ButtonProfile
                        onClick={() => addBlock("text")}
                        text={"Ajouter un bloc de texte"}
                        width={"300px"}
                    />
                    <ButtonProfile
                        onClick={() => addBlock("image")}
                        text={"Ajouter un bloc photo"}
                        width={"300px"}
                    />
                    <ButtonProfile
                        onClick={handleSubmit}
                        text={"Envoyer"}
                        marginTop={"100px"}
                        width={"300px"}
                    />
                </div>
                <DndProvider backend={HTML5Backend}>
                    <div className={cls.containerRender}>
                        {blocks.map((block, index) => (
                            <DraggableBlock
                                key={block.id}
                                block={block}
                                index={index}
                                moveBlock={moveBlock}
                                updateBlock={updateBlock}
                                handleImageUpload={handleImageUpload}
                                removeBlock={removeBlock}
                                isAlt={block.type === "alt"}
                            />
                        ))}
                    </div>
                </DndProvider>
            </div>
        </>
    );
};
