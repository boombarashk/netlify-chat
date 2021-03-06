import Block from "../block.js";

export default class InputFieldset extends Block {
    constructor(props) {
        super("fieldset", props);
    }

    render() {
        const _html = Handlebars.compile(`${this._template}`)({...this.props})

        return _html;
    }
}
