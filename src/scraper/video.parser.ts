import { JSDOM } from "jsdom";
import type { IVideoResponse } from "../domain/video/video.type.ts";

class VideoParser {
    private readonly videoRegex = /const\s+videoSrc\s*=\s*(\[.*?\]);/;
    private readonly clearRegex = /([{,]\s*)(\w+)\s*:/g;

    /**
     * Parses the HTML to extract video information.
     * @param html - The HTML content of the video page.
     * @returns {IVideoResponse} - An object containing the video data or an error message.
     * @protected 
     */
    protected parseVideoPage(html: string): IVideoResponse {
        const { document } = new JSDOM(html).window;
        const scriptContent = document.querySelector(".video-player Script")?.innerHTML;
        if (!scriptContent) return { error: "Script content not found" };

        const match = RegExp(this.videoRegex).exec(scriptContent);
        if (!match) return { error: "Video script not found" };
        let jsonStr = match[1];
        jsonStr = jsonStr.replace(this.clearRegex, '$1"$2":').replace(/'/g, '"');
        const [video] = JSON.parse(jsonStr);

        const pageTitle = document.querySelector(".title h3")?.textContent;
        const videoOwner = document.querySelector(".owner a")?.textContent;
        const thumbnail = (document.querySelector("picture img") as HTMLImageElement | null)?.src;

        return {
            video: {
                videoUrl: video?.url,
                title: pageTitle?.trim() || "No Title Found",
                videOwner: videoOwner?.trim() || "No Uploader Found",
                thumbnail: thumbnail || "No Thumbnail Found"
            }
        };
    }
}

export default VideoParser;


