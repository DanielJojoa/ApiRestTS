"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet = require("helmet");
var indexRoutes_1 = __importDefault(require("./src/routes/indexRoutes"));
var mongoose_1 = __importDefault(require("mongoose"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        var MONGO_URL = 'mongodb://localhost/restapit';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(function () { console.log('mongo is connected'); })
            .catch(function () {
            console.log('no connected');
        });
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(helmet());
    };
    Server.prototype.routes = function () {
        this.app.use(indexRoutes_1.default);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log(' server on port ', _this.app.get('port'));
        });
    };
    return Server;
}());
var server = new Server();
server.start();
