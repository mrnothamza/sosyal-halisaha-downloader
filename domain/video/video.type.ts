export interface IVideo {
    videoUrl?: string;
    title?: string;
    videOwner?: string;
    thumbnail?: string;
}

export interface IVideoResponse {
    error?: string;
    video?: IVideo;
}