import { Injectable, OnModuleInit } from "@nestjs/common";
import TwitterPlugin, { TwitterClient } from "@virtuals-protocol/game-twitter-plugin";
import { GameAgent } from "@virtuals-protocol/game";
import { ConfigService } from "@nestjs/config";
import { webSearchWorker } from "./plugins/web-search/worker";
import { newsSearchWorker } from "./plugins/news-search/worker";

@Injectable()
export class AppService implements OnModuleInit {
    constructor() {}

    private readonly configService = new ConfigService()

    async onModuleInit() {
        await this.startAgent()
    }

    async startAgent() {
        const game = new TwitterClient({
          apiKey: this.configService.get('TWITTER_API_KEY'),
          apiSecretKey: this.configService.get('TWITTER_API_SECRET'),
          accessToken: this.configService.get('TWITTER_ACCESS_TOKEN'),
          accessTokenSecret: this.configService.get('TWITTER_ACCESS_TOKEN_SECRET')
        })

        const twitterPlugin = game ? new TwitterPlugin({
            twitterClient: game
        }) : undefined

        const gameAgent = twitterPlugin ? new GameAgent(this.configService.get('GAME_API_KEY') as string, {
            name: 'Tester',
            goal: `
                1) Get a random article or news from the web
                2) Summarize it and tweet about it
            `,
            description: `
                AgendsAI Twitter Bot - Personality:

                Smart & Curious: Always learning and sharing.
                Friendly & Helpful: Explains AI marketing clearly.
                Witty & Engaging: Uses humor and conversation.
                Reliable & Positive: A trusted source of AI insights.
            `,
            workers: [
                twitterPlugin.getWorker(),
                webSearchWorker,
                newsSearchWorker
            ]
        }) : undefined

        await gameAgent.init()

        await gameAgent.run(30, {
            verbose: true
        })
    }
}