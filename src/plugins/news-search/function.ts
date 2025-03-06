import { config } from 'dotenv';
import {
    GameFunction,
    ExecutableGameFunctionResponse,
    ExecutableGameFunctionStatus,
} from "@virtuals-protocol/game";
import axios from 'axios';
import { BraveNewsResponse } from '../types';

config();

export const searchNews = new GameFunction({
    name: "search_news",
    description: "Searches News for the given query",
    args: [
        {
            name: 'query',
            description: 'Query to search'
        }
    ] as const,
    executable: async (args, logger) => {
        try {
            const resp = await axios.get<BraveNewsResponse>(`https://api.search.brave.com/res/v1/news/search`, {
                params: {
                    q: args.query,
                    count: 1,
                    result_filter: 'news',
                    freshness: 'pw'
                },
                headers: {
                    'X-Subscription-Token': process.env.BRAVE_API_KEY,
                    'Accept': "application/json",
                    "Accept-Encoding": "gzip"
                }
            })
        
            const results = resp.data?.results || []
    
            const searches: string[] = []
    
            for (let result of results) {
                const searchContent: string = `
                Title: ${result.title}
    
                Short Description: ${result.description}
    
                Date: ${result.page_age?.substring(0, 10)}
    
                Author: ${result.meta_url.netloc}
    
                Age: ${result.age}
    
                Description: ${result.extra_snippets?.join('\n') || ''}
    
                --------------------------------------------------
                `
    
                searches.push(searchContent)
            }
    
            logger(`Retrieved News Results: ${results.length}`);
            
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Done,
                JSON.stringify(searches)
            );
        } catch (e) {
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Failed,
                `Failed to fetch location data: ${e instanceof Error ? e.message : 'Unknown error'}`
            );
        }
    }
});