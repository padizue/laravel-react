import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import MovieList from './MovieList';
import CrudGenre from './CrudGenre';
import CrudMovie from './CrudMovie';

export default class App extends Component {
      render () {
        return (
          <BrowserRouter>
            <div>
              <Header />
              <Switch>
                <Route exact path='/' component={MovieList} />
                <Route exact path='/crud-genre' component={CrudGenre} />
                <Route exact path="/crud-movie" component={CrudMovie} />
              </Switch>
            </div>
          </BrowserRouter>
        )
      }
}

ReactDOM.render(<App />, document.getElementById('app'))
