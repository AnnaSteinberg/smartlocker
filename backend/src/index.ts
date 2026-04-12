import dotenv from "dotenv";
dotenv.config();

import {createApp} from "./app";
import {config} from "./config";
import {logger} from "./lib/logger";


const app=createApp();
const PORT=config.port;





app.listen(PORT, ()=>{
    logger.info(`Server is running on http://localhost:${PORT}`);
});
