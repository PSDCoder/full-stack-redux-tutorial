import React from 'react';
import Router from 'react-router';
import routes from './routes';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';


const socket = io(`${location.protocol}//${location.hostname}:8090`);
const createStoreWithMiddleware = compose(
    applyMiddleware(remoteActionMiddleware(socket)),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state => {
    store.dispatch(setState(state));
});

Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(
        <div>
            <Provider store={store}>
                {() => <Root />}
            </Provider>
            <DebugPanel top right bottom>
                <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        </div>,
        document.getElementById('app')
    );
});

