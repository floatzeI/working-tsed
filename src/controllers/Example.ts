import { Controller, Get } from "@tsed/common";
import * as ExampleModel from '../models/Example';
import { Returns } from "@tsed/swagger";

@Controller('/example')
export class ExampleController {
    @Get('/')
    // This shows up in swagger
    @Returns(200, {type: ExampleModel.TestModel200})
    // This also shows up in swagger
    @Returns(400, {type: ExampleModel.TestModel400})
    // This also shows up in swagger
    @Returns(500, {type: ExampleModel.TestModel500})
    public async exampleControllerMethod() {
        return {
            exampleItem: 1,
        }
    }
}