export class AppConfig {
    public port: number;

    constructor() {
        this.port = parseInt(process.env.PORT ?? '3000');
    }
}

export default new AppConfig();