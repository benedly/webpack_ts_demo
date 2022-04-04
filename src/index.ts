// add lodash
import * as _ from 'lodash';

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML = getMsg()

    return element;
}

const getMsg = () => 'Hello Babel'

document.body.appendChild(component());