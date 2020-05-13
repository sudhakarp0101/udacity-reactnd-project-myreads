import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import RenderBooks from "./RenderBooks";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      books: [],
    };
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }));
  };
  clearQuery = () => {
    this.updateQuery("");
  };
  componentDidUpdate() {
    if (this.setState.query !== "") {
      BooksAPI.search(this.state.query).then((data) => {
        console.log(data);
        if (data !== undefined) {
          if (Array.isArray(data)) {
            this.setState(() => ({
              books: data
                .filter((book) => book.hasOwnProperty("imageLinks"))
                .filter((book) => book.hasOwnProperty("authors")),
            }));
          } else {
            this.setState(() => ({
              query: "",
              books: [],
            }));
          }
        } else {
          this.setState(() => ({
            books: [],
          }));
        }
      });
    }
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close{" "}
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <RenderBooks
            books={this.state.books.map(
              (obj) => this.props.books.find((o) => o.id === obj.id) || obj
            )}
            changeShelves={this.props.searchForBooks}
          />
        </div>
      </div>
    );
  }
}

export default Search;
