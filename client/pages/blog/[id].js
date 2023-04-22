import * as React from 'react';
import axios from "axios";
import {Article} from "../../components/Blog/Article/Article";
import {MainNavbar} from "../../components/Navbars/MainNavbar/MainNavbar";
import {useState} from "react";
import {MainFooter} from "../../components/Footers/MainFooter/MainFooter";


const SinglePost = ({ article }) => {
    console.log('ARTICLE INTO BLOG', article)
    const [active, setActive] = useState(false);

    return (
        <>
            <title>Accueil</title>
            <MainNavbar active={active} setActive={setActive} />
            <Article article={article}/>
            <MainFooter />
        </>

    );
};

export default SinglePost;

export async function getStaticPaths() {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/get-blogs`
    );
    const blogs = await res.data;
    const paths = blogs.map((post) => ({
        params: { id: post._id },
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({params}) {

    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/get-article?id=${params.id}`
    );
    const article = await res.data;

    return {
        props: {
            article,
        },
    };
}
