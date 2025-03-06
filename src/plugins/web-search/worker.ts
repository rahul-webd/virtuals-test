import { GameWorker } from "@virtuals-protocol/game";
import { searchWeb } from "./functions";

export const webSearchWorker = new GameWorker({
    id: "web_searcher",
    name: "Web Searcher",
    description: "Gets information from the web related to a query",
    functions: [
        searchWeb
    ]
}); 