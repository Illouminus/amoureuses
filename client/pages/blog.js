import React, { useState } from "react";
import axios from "axios";
import { MainNavbar } from "../components/Navbars/MainNavbar/MainNavbar";
import { MainFooter } from "../components/Footers/MainFooter/MainFooter";
import {ArticleCard} from "../components/Blog/ArticleCard/ArticleCard";
import cls from "../styles/blog.module.scss";
import Head from "next/head";

const Blog = ({ blogs }) => {
    const [articles, setArticles] = useState(blogs);
    const [active, setActive] = useState(false);

    const deleteArticle = async (id) => {
        try {
           const response =  await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/delete/${id}`
            );
           if (response.status === 200) {
               setArticles(articles.filter((article) => article._id !== id));
               alert(`L'article à bien été supprime`)
           }

        } catch (error) {
            alert(`Une erréur est surevenue lors de la suppresion de l'article`)
        }
    };

    return (
        <>
            <Head>
                <title>Blog Les Amoureuses - Conseils, astuces et actualités sur le vin</title>
                <meta name="description" content="Découvrez le blog de Les Amoureuses, votre bar à vin à Paris, où nous partageons des conseils, astuces et actualités sur le monde du vin, la dégustation et les accords mets et vins." />
                <meta name="keywords" content="blog Les Amoureuses, bar à vin Paris, conseils vin, astuces vin, actualités vin, dégustation de vin, accords mets et vins, vins naturels, vins biodynamiques, vinification, cave à vin" />
                <meta charSet="utf-8"/>
            </Head>
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

export async function getStaticProps() {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/get-blogs`
    );
    const blogs = await res.data;
    return {
        props: {
            blogs,
        },
        revalidate: 60,
    };
}

export default Blog;
