import axios from 'axios';
import ScraperConfig from './config/scraper.config.ts'

const axiosAdapter = axios.create({
    timeout: 60_000,
    headers: ScraperConfig.baseHeaders
});

export default axiosAdapter;