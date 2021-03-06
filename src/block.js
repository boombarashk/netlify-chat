import EventBus from "./event-bus.js";

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_UPD: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _template = null;
    _element = null;
    _meta = null;

    constructor(tagName = "div", props = {}) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);

    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_UPD, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        const { selfClassName } = this.props;
        this._element = this._createDocumentElement(tagName, selfClassName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this._template = this.props.template;
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount(oldProps) {
    }

    _componentDidUpdate(oldProps, newProps) {
        this.componentDidUpdate();
    }

    componentDidUpdate(oldProps, newProps) {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        return true;
    }

    setProps = nextProps => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        // Это небезопасный метод для упрощения логики
        this._element.innerHTML = block;
    }

    // Переопределяется пользователем. Необходимо вернуть разметку
    render() {
        return ''
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props) {
        const self = this;

        props = new Proxy(props, {
            set(target, key, value) {
                target[key] = value

                self._componentDidUpdate(target, {[key]:value})
                return true
            },
            deleteProperty(){
                throw new Error("Нет прав");
            },
        })

        return props;
    }

    _createDocumentElement(tagName, selfClassName) {
        const element = document.createElement(tagName);
        if (typeof selfClassName !== 'undefined') {
            element.className = selfClassName
        }
        return element
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}

export default Block;
