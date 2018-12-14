
import { Request, Response, Router} from 'express'

class IndexRoutes{
    public router: Router;
    static router: any;
    constructor(){
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.get('/', (req, res) => {
            res.send('hola mundo');
        })
    }
}
const indexRoutes =new IndexRoutes();
indexRoutes.routes();
export default IndexRoutes.router;
