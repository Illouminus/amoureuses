// DraggableBlock.js
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import {TextBlock} from "./TextBlock";
import {ImageBlock} from "./ImageBlock";
import {TitleBlock} from "./TitleBlock";
import {SubtitleBlock} from "./SubtitleBlock";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AltBlock } from "./AltBlock";
export const DraggableBlock = ({ block, index, moveBlock, updateBlock, handleImageUpload, removeBlock }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "block",
        item: { id: block.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "block",
        hover(item, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveBlock(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const handleRemoveBlock = () => {
        removeBlock(block.id);
    };
    const handleAltChange = (value) => {
        updateBlock(block.id, { content: value });
    };

    const renderBlock = (block) => {
        switch (block.type) {
            case "text":
                return (
                    <TextBlock
                        content={block.content}
                        onChange={(content) => updateBlock(block.id, { content })}
                    />
                );
            case "image":
                return (
                    <ImageBlock
                        src={block.src}
                        alt={block.alt}
                        onDrop={async (acceptedFiles) => {
                            const imageUrl = await handleImageUpload(acceptedFiles);
                            updateBlock(block.id, { src: imageUrl });
                        }}
                        onAltChange={(alt) => updateBlock(block.id, { alt })}
                    />
                );
            case "title":
                return (
                    <TitleBlock
                        content={block.content}
                        onChange={(content) => updateBlock(block.id, { content })}
                    />
                );
            case "subTitle":
                return (
                    <SubtitleBlock
                        content={block.content}
                        onChange={(content) => updateBlock(block.id, { content })}
                    />
                );
            case "alt":
                return (
                    <AltBlock
                        content={block.content}
                        onChange={handleAltChange}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {renderBlock(block)}
                <DeleteOutlineIcon onClick={handleRemoveBlock} cursor={"pointer"}/>
        </div>
    );
};


