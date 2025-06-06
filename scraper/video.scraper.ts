import axios from '../http.client.ts';
import VideoParser from './video.parser.ts';
import logger from '../logger.ts';
import type { IVideoResponse } from '../domain/video/video.type.ts';

class VideoScraper extends VideoParser {

    private readonly videoUrl: string;

    /**
     * Creates an instance of VideoScraper.
     * @param {string} videoUrl - The URL of the video to scrape.
     */
    constructor(videoUrl: string) {
        super();
        this.videoUrl = videoUrl;
    }

    /**
     * 
     * @returns {boolean} - Returns true if the URL is valid, false otherwise.
     */
    private validateUrl(): boolean {
        /**
         * I removed the domain validation check because of probable misunderstooding. I don't wanna target any website bc of legal reasons in this project, its just for personal use.
         * If you want to add it back, uncomment the code below.
         */
        // const { host } = new URL(this.videoUrl);
        // if (ScraperConfig.allowedDomains.includes(host)) return true;
        if (!this.videoUrl.startsWith("https://")) return false;
        return true;
    }


    /**
     * Scrapes the video page and returns the video data.
     * @returns {Promise<IVideoResponse>} - Returns a promise that resolves to an object containing the video data or an error message.
     */
    public async scrape(): Promise<IVideoResponse> {
        try {
            if (!this.validateUrl()) return { error: "Invalid URL" };
            const pageResponse = await axios.get(this.videoUrl);
            const scrapedData = this.parseVideoPage(pageResponse.data);
            return scrapedData;
        }
        catch (error) {
            logger.error("Error scraping video URL: ", this.videoUrl, " :: Error: ", error);
            return { error: error instanceof Error ? error.message : "Unknown error occurred" };
        }
    }

}

export default VideoScraper;