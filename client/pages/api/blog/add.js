import dbConnect from "../../../utils/mangoDB";
import Article from "../../../models/Article";


const extractKeywords = (blocks) => {
    // Объединяем текстовые блоки в одну строку
    const textContent = blocks
        .filter((block) => block.type === "text")
        .map((block) => block.content)
        .join(" ");

    // Удаляем знаки препинания и преобразуем текст в массив слов
    const words = textContent
        .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, "")
        .toLowerCase()
        .split(" ");

    // Создаем объект для хранения частоты слов
    const wordFrequency = {};

    // Подсчитываем частоту каждого слова
    words.forEach((word) => {
        if (word.length >= 3) {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
    });

    // Сортируем слова по частоте и выбираем первые N слов
    const sortedWords = Object.keys(wordFrequency).sort(
        (a, b) => wordFrequency[b] - wordFrequency[a]
    );
    const topWords = sortedWords.slice(0, 10);

    // Возвращаем ключевые слова, разделенные запятой
    return topWords.join(", ");
};


const extractSubTitles = (blocks) => {
    // Фильтруем блоки подзаголовков и извлекаем их содержимое
    const subTitles = blocks
        .filter((block) => block.type === "subTitle")
        .map((block) => block.content);

    // Объединяем подзаголовки через разделитель
    return subTitles.join(" | ");
};

const extractTitle = (blocks) => {
    // Ищем блок с типом 'title' и возвращаем его содержимое
    const titleBlock = blocks.find((block) => block.type === "title");

    return titleBlock ? titleBlock.content : "";
};

async function handler(req, res) {
    try {
        const {  blocks } = req.body;
        const client = await dbConnect();

        if (client) {
            const title = extractTitle(blocks);
            const description = extractSubTitles(blocks);
            const keywords = extractKeywords(blocks);

            const article = new Article({
                blocks,
                title,
                description,
                keywords,
            });

            const savedArticle = await article.save();

            if (savedArticle) {
                res.status(200).json(article);
            } else {
                res.status(500).json({ message: "Server Error" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Error processing data" });
    }
}

export default handler;
