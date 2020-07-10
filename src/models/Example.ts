import { Required } from "@tsed/common";

export class TestModel200 {
    @Required()
    exampleItem: number;
}

export class TestModel400 {
    @Required()
    error: boolean;
}

export class TestModel500 {
    @Required()
    error: boolean;
}