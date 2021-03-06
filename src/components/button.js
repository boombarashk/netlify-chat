import Block from "../block.js";

export default class Button extends Block {
    constructor(props) {
        super("button", props);
    }

    render() {
        return Handlebars.compile(`${this._template}`)({textValue: this.props.text});
    }
}
