import express from 'express';
import morgan from 'morgan';
import helmet = require('helmet');
import IndexRoutes from './src/routes/indexRoutes';
import { Mongoose } from 'mongoose';

class Server{
    app: express.Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        const MONGO_URL = 'mongodb://localhost/restapit';
        Mongoose.connect(MONGO_URL,{});
        this.app.set('port',process.env.PORT||3000);
        this.app.use(morgan('dev'));
        this.app.use(helmet());
    }
    routes (){
        this.app.use(IndexRoutes.router)
    }
    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log(' server on port ',this.app.get('port'));
            
        })
    }
}

const server = new Server();
server.start();