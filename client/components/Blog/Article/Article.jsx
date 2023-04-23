import React, { useState, useEffect } from 'react';
import cls from './Article.module.scss';

export const Article = ({ article }) => {
    const [localArticle, setLocalArticle] = useState(null);

    useEffect(() => {
        setLocalArticle(article);
    }, []);

    return (
        <div className={cls.containerBog}>
            <div className={cls.container}>
                {localArticle && localArticle.blocks.map((block) => {
                    switch (block.type) {
                        case 'title':
                            return (
                                <React.Fragment key={block.id}>
                                    <h1 className={cls.title}>{block.content}</h1>
                                </React.Fragment>
                            );
                        case 'text':
                            return (
                                <React.Fragment key={block.id}>
                                    <p className={cls.textBlock} dangerouslySetInnerHTML={{ __html: block.content }} />
                                </React.Fragment>
                            );
                        case 'subTitle':
                            return (
                                <React.Fragment key={block.id}>
                                    <h2 className={cls.subtitle}> {block.content}</h2>
                                </React.Fragment>
                            );
                        case 'image':
                            return (
                                <React.Fragment key={block.id}>
                                    <div className={cls.blockImage}>
                                        <img src={block.src} alt={block.alt} />
                                    </div>
                                </React.Fragment>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};
