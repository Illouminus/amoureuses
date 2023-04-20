// components/ArticleCard.js
import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useSession} from "next-auth/react";

export const ArticleCard = ({ article, onDelete}) => {
    const titleBlock = article.blocks.find((block) => block.type === "title");
    const textBlock = article.blocks.find((block) => block.type === "text");
    const imageBlock = article.blocks.find((block) => block.type === "image");
    const {status, data} = useSession()
    const login = status === "authenticated"

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };
    const handleDelete = () => {
        onDelete(article._id);
    };
    return (
        <Card sx={{ maxWidth: 345, minWidth: 345, marginBottom: 4, margin: "40px" }}>
            {imageBlock && (
                <CardMedia
                    sx={{ height: 200 }}
                    image={imageBlock.src}
                    title={imageBlock.content}
                />
            )}
            <CardContent>
                {titleBlock && (
                    <Typography gutterBottom variant="h5" component="div">
                        {titleBlock.content}
                    </Typography>
                )}
                {textBlock && (
                    <Typography variant="body2" color="text.secondary">
                        {truncateText(textBlock.content, 200)}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    <Link href={`/blog/${article._id}`} passHref>
                        <Typography variant="body2" color="primary">
                            Lire la suite...
                        </Typography>
                    </Link>
                    {login &&<DeleteOutlineIcon onClick={handleDelete} cursor={"pointer"}/>}
                </div>
            </CardActions>
        </Card>
    );
};


