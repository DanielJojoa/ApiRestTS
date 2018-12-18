import express from 'express';
import morgan from 'morgan';
import helmet = require('helmet');
import indexRoutes from './src/routes/indexRoutes';
import postRoutes from './src/routes/postRoutes';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
;
class Server{
    app: express.Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        const MONGO_URL = 'mongodb://localhost/restapit';
        mongoose.set('useFindAndModify',true);
        mongoose.connect(MONGO_URL,{
            useNewUrlParser:true,
            useCreateIndex: true
        })
        .then(()=>{ console.log('mongo is connected')})
        .catch(()=>{console.log('no connected');});

        this.app.set('port',process.env.PORT||3000);
        this.app.use(morgan('dev'));
        this.app.use(express.json);
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(helmet());
        this.app.use(compression);
        this.app.use(cors);

    }
    routes (){
        this.app.use(indexRoutes);
        this.app.use(postRoutes);
    }
    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log(' server on port ',this.app.get('port'));
            
        })
    }
}

const server = new Server();
server.start();