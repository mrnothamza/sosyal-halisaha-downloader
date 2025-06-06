import express from 'express';
import logger from './logger.ts';
import AppConfig from './config/app.config.ts'
import VideoScraper from './scraper/video.scraper.ts';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/pages'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response) => {
    res.render('index');
});



app.post('/download', async (req: express.Request, res: express.Response) => {
    const videoUrl = req.body?.videoUrl;
    if (!videoUrl) return void res.status(400).json({ message: 'Video URL is required' });

    const videoScraper = new VideoScraper(videoUrl);
    const scrapedData = await videoScraper.scrape();

    if (scrapedData.error)
        return void res.status(500).render('error', {
            error: scrapedData.error
        });


    return void res.render('download', {
        data: scrapedData
    });
});


app.listen(AppConfig.port, () => {
    logger.info(`Server is running on ${AppConfig.port} port`);
}); 