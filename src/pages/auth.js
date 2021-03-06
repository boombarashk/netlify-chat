import Button from "../components/button.js";
import InputFieldset from "../components/inputfieldset.js";


window.initApp().then( ({rootNode, registerBlocks}) => {

    registerBlocks([
        {name:'button', url: '/src/views/partials/components/button.hbs'},
        {name:'fieldset', url: '/src/views/partials/components/inputfieldset.hbs'},
    ]).then(templates => {

        const button = new Button({
            text: 'Click me',
            selfClassName: 'button',// button__aqua form-button
            template: templates['button'],
        });
        const fieldset = new InputFieldset({
            selfClassName: 'fieldset',
            namePage: 'auth', //fixme
            label: 'Password',
            nameField: 'password',
            typeField: 'password',
            mod: 'aqua',
            template: templates['fieldset'],
        });

        rootNode.insertAdjacentElement('beforeend', button.getContent());
        rootNode.insertAdjacentElement('beforeend', fieldset.getContent());

    })

})


