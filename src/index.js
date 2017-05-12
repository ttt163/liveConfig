/**
 * Created by Administrator on 2016/9/7.
 */
import '../node_modules/bootstrap/scss/bootstrap.scss';
import 'babel-polyfill'
import '../node_modules/es5-shim/es5-shim.js'
import '../node_modules/es5-shim/es5-sham.js'
import React from 'react';
import { Router, Route, hashHistory,IndexRoute,browserHistory } from 'react-router';
import {render} from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import About from './containers/About.js'
import Login from './containers/Login.js'
import todoApp from './reducers/reducers.js'
import { normalize, Schema, arrayOf } from 'normalizr';


let store = createStore(todoApp)
let rootElement = document.getElementById('app')

var article = new Schema('articles'),
    tutorial = new Schema('tutorials'),
    articleOrTutorial = { articles: article, tutorials: tutorial },
    input;

input = [{
    id: 1,
    type: 'articles',
    title: 'Some Article'
}, {
    id: 1,
    type: 'tutorials',
    title: 'Some Tutorial'
}];

Object.freeze(input);
var data=normalize(input, arrayOf(articleOrTutorial, { schemaAttribute: 'type' }))
//console.log(data);
function hasLogin(){
    return store.getState().isLogin;
}
function requireAuth(nextState, replaceState) {
    //console.log(hasLogin());
    if (!hasLogin()) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
}


//console.log(store);
render(
    <Provider store={store}>
        {/*  <App />*/}
        <Router history={hashHistory}>
            <Route onEnter={requireAuth} path="/" component={App} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
        </Router>
    </Provider>,
    rootElement
)
