import { ServerLoader, ServerSettings } from "@tsed/common";
import "@tsed/swagger"; // import swagger Ts.ED module
import Path = require("path");


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
            .use(compress({}))
            .use(methodOverride())

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