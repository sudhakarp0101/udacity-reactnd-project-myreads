import React, { Component } from "react";
import PropTypes from "prop-types";

class RenderBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelves: PropTypes.func.isRequired,
  };
  handleChange = (event, book) => {
    console.log("****" + JSON.stringify(book));
    console.log("Event: " + event.target.value);
    this.setState({ value: event.target.value });
    this.props.changeShelves(book, event.target.value);
  };

  render() {
    // const changeShelves = this.props.changeShelves;
    //if (Array.isArray(this.props.books) && this.props.books.length) {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                    }}
                  />
                  <div className="book-shelf-changer">
                    {console.log(
                      book.hasOwnProperty("shelf") !== undefined
                        ? book.shelf
                        : "none"
                    )}
                    <select
                      value={book.hasOwnProperty("shelf") ? book.shelf : "none"}
                      onChange={(e) => this.handleChange(e, book)}
                    >
                      <option value="move" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
    // }
    // else return (<div></div>)
  }
}
export default RenderBooks;
