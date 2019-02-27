import { NewsArticleSource } from './newsArticleSource';

export class NewsArticle {
    id: number;
    source: NewsArticleSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
