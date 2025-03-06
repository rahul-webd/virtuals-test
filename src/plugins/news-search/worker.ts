import { GameWorker } from "@virtuals-protocol/game";
import { searchNews } from "./function";

export const newsSearchWorker = new GameWorker({
    id: "news_searcher",
    name: "News Searcher",
    description: "Gets information from the news related to a query",
    functions: [
        searchNews
    ]
}); 