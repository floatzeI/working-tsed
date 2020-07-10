import * as Express from "express";
import { ServerLoader, ServerSettings } from "@tsed/common";
// import "@tsed/ajv"; // import ajv ts.ed module
import "@tsed/swagger"; // import swagger Ts.ED module
import Path = require("path");
// @ts-ignore
import cons = require('consolidate');


let rootDir = Path.resolve(__dirname);
@ServerSettings({
    rootDir,
    viewsDir: "${rootDir}/views",
    acceptMimes: ["application/json"],
    mount: {
        "/": `${rootDir}/controllers/*.ts`
    },
    swagger: [
        {
            path: "/api-docs",
        }
    ],
    // validationModelStrict: true,
})
export class Server extends ServerLoader {
    public $onInit(): void {

    }
    /**
     * This method let you configure the middleware required by your application to work.
     * @returns {Server} 
     */
    public $beforeRoutesInit(): void | Promise<any> {

        const cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override');

        // Add middleware
        this
            // Cookie parse
            .use(cookieParser())
            // Json Parse
            .use(bodyParser.json())
            // URL Encode Parse
            .use(bodyParser.urlencoded({
                extended: true
            }))
        // Setup Middleware
        this
            // .use(GlobalAcceptMimesMiddleware)
            .use(compress({}))
            .use(methodOverride())

        // Dev env specific setup
        if (process.env.NODE_ENV === 'development') {
            this
                // Serve static on dev only (we use nginx for static serve in production)
                .use(Express.static(Path.join(__dirname, './public/'), {
                    maxAge: '5000' // uses milliseconds per docs
                }))
        }
    }

    public $afterRoutesInit() {
        
    }

    public $onReady() {
        console.log('Server started...');
    }

    public $onServerInitError(err: Error) {
        console.error(err);
    }
}

new Server().start();