import React from 'react'; //for react router
import {Route, DefaultRoute} from 'react-router';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

export default (
    <Route handler={App}>
        <Route name="results" handler={ResultsContainer} />
        <DefaultRoute handler={VotingContainer} />
    </Route>
);
