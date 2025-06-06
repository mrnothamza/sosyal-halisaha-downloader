export class ScraperConfig {
    private readonly baseUserAgent: string;
    public baseHeaders: { [key: string]: string };
    /**
    * I removed this part bc it can be misunderstood as a list of allowed domains.
    * Like we're targeting them specifically. But nope.
    */
    // public allowedDomains: string[];

    constructor() {
        this.baseUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36";
        this.baseHeaders = {
            'User-Agent': this.baseUserAgent,
            "Sec-Ch-Ua": "\"Not.A/Brand\";v=\"99\", \"Chromium\";v=\"136\"",
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "\"Windows\"",
            "Accept-Language": "en-US,en;q=0.9",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-User": "?1",
            "Sec-Fetch-Dest": "document",
            "Accept-Encoding": "gzip, deflate, br",
            "Priority": "u=0, i",
            "Connection": "keep-alive"
        }


        /* this.allowedDomains = [
        ...
         ];*/

    }
}

export default new ScraperConfig();