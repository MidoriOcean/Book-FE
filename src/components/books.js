import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookService from "../services/book.service.js";
import { withRouter } from '../common/with-router.js';

class Books extends Component {

  constructor(props) {
    super(props);
    this.findAllBooks = this.findAllBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
  

    this.state = {
      books: [],
      currentBook: null,
      currentIndex: -1
    };
  }

  componentDidMount() {

  this.findAllBooks();

  }

  findAllBooks() {

   
    BookService.findAllBooks()
      .then(response => {
        this.setState({
          books: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.findAllBooks();
    this.setState({
      currentBook: null,
      currentIndex: -1
    });
  }

  setActiveBook(book, index) {
    this.setState({
      currentBook: book,
      currentIndex: index
    });
  }

  render() {
    const {books,book,currentBook,currentIndex} = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
          </div>
        </div>
        <div className="col-md-6">
          <h4>Books</h4>

          <ul className="list-group">
            {books &&
              books.map((book, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBook(book, index)}
                  key={index}
                >
                  {book.title}
                </li>
              ))}
          </ul>

        
        </div>
        <div className="col-md-6">
          {currentBook ? (
            <div>
              <h4>Book</h4>
              <div>
                <label>
                  <strong>id:</strong>
                </label>{" "}
                {currentBook.id}
              </div>
              <div>
                <label>
                  <strong>title:</strong>
                </label>{" "}
                {currentBook.title}
              </div>
              <div>
                <label>
                  <strong>author:</strong>
                </label>{" "}
                {currentBook.author}
              </div>
              
              <Link
                to={"/books/" + currentBook.id}
                className="btn btn-success"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Book...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Books);
