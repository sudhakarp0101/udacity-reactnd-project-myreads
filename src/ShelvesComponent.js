import React from "react";
import { Link } from "react-router-dom";
import RenderBooks from "./RenderBooks";

function Shelves(props) {
  const shelves = {
    currentlyReading: ["Currently Reading", "currentlyReading"],
    wantToRead: ["Want to Read", "wantToRead"],
    read: ["Read", "read"],
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {Object.entries(shelves).map(([k, v]) => (
          <div key={k} className="bookshelf">
            <h2 className="bookshelf-title">{v[0]}</h2>
            <RenderBooks
              books={props.books.filter((book) => book.shelf === v[1])}
              changeShelves={props.searchForBooks}
            />
          </div>
        ))}
      </div>
      <Link to="/search" className="open-search-link">
        Add a book
      </Link>
    </div>
  );
}
export default Shelves;
