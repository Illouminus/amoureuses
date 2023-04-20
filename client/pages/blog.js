import React, { useState } from "react";
import axios from "axios";
import { MainNavbar } from "../components/Navbars/MainNavbar/MainNavbar";
import { MainFooter } from "../components/Footers/MainFooter/MainFooter";
import {ArticleCard} from "../components/Blog/ArticleCard/ArticleCard";
import cls from "../styles/blog.module.scss";

const Blog = ({ blogs }) => {
    const [articles, setArticles] = useState(blogs);
    const [active, setActive] = useState(false);


    const deleteArticle = async (id) => {
        console.log('ID FOR DELETING FRONT', id)
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/delete/${id}`
            );
            setArticles(articles.filter((article) => article._id !== id));
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    return (
        <>
            <MainNavbar active={active} setActive={setActive} />
            <h1 className={cls.title}>Le blog</h1>
            <div className={cls.container}>
                <div className={cls.containerArticle}>
                    {articles.map((article) => (
                        <ArticleCard
                            key={article._id}
                            article={article}
                            onDelete={deleteArticle}
                        />
                    ))}
                </div>

            </div>
            <MainFooter />
        </>
    );
};

export async function getServerSideProps() {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/get-blogs`
    );
    const blogs = await res.data;
    return {
        props: {
            blogs,
        },
    };
}

export default Blog;
