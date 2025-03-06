import { config } from 'dotenv';
import {
    GameFunction,
    ExecutableGameFunctionResponse,
    ExecutableGameFunctionStatus,
} from "@virtuals-protocol/game";
import axios from 'axios';
import { BraveWebResponse } from '../types';

config();

export const searchWeb = new GameFunction({
    name: "search_web",
    description: "Searches Web for the given query",
    args: [
        {
            name: 'query',
            description: 'Query to search'
        }
    ] as const,
    executable: async (args, logger) => {
        try {
            const resp = await axios.get<BraveWebResponse>(`https://api.search.brave.com/res/v1/web/search`, {
                params: {
                    q: args.query,
                    count: 1,
                    result_filter: 'web',
                    freshness: 'pw'
                },
                headers: {
                    'X-Subscription-Token': process.env.BRAVE_API_KEY,
                    'Accept': "application/json",
                    "Accept-Encoding": "gzip"
                }
            })
    
            const results = resp.data.web?.results || []
    
            const searches: string[] = []
    
            for (let result of results) {
                const searchContent: string = `
                Title: ${result.title}
    
                Short Description: ${result.description}
    
                Date: ${result.page_age?.substring(0, 10)}
    
                Author: ${result.profile.name}
    
                Age: ${result.age}
    
                Description: ${result.extra_snippets?.join('\n') || ''}
    
                --------------------------------------------------
                `
    
                searches.push(searchContent)
            }

            logger(`Retrieved Web Results: ${results.length}`);
            
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