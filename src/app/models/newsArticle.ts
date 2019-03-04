import { NewsArticleSource } from './newsArticleSource';

export class NewsArticle {
    counter: number;
    id: string;
    source: NewsArticleSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
