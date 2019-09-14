import { injectable } from "inversify";
import { Component } from "./component";

@injectable()
export class AppComponent extends Component {

    constructor() {
      super();
    }

    init() {
      this.setHtml(`
        <h3>Hello World</h3>
      `);
    }
}