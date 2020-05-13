import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Search from "./SearchComponent";
import Shelves from "./ShelvesComponent";
import { Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.changeShelves = this.changeShelves.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  changeShelves(book, shelve) {
    BooksAPI.update(book, shelve);
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Shelves
              books={this.state.books}
              searchForBooks={this.changeShelves}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              books={this.state.books}
              searchForBooks={this.changeShelves}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
