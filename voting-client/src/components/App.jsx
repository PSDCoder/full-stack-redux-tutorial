import React from 'react';
import {RouteHandler} from 'react-router';
import {List, Map} from 'immutable';

require('../style.css');

export default React.createClass({
    render: function () {
        return <RouteHandler />;
    }
})