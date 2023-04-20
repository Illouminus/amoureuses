import * as React from 'react';
import axios from "axios";
import {Article} from "../../components/Blog/Article/Article";
import {MainNavbar} from "../../components/Navbars/MainNavbar/MainNavbar";
import {useState} from "react";
import {MainFooter} from "../../components/Footers/MainFooter/MainFooter";
import cls from '../../styles/blog.module.scss'

const SinglePost = ({ article }) => {
    const [active, setActive] = useState(false);
    return (
        <>
            <MainNavbar active={active} setActive={setActive} />
            <Article article={article}/>
            <MainFooter />
        </>

    );
};

export default SinglePost;

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/get-article?id=${id}`
    );
    const article = await res.data;

    return {
        props: {
            article,
        },
    };
}
