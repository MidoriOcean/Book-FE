import React, { Component } from "react";
import BookService from "../services/book.service.js";
import { withRouter } from '../common/with-router.js';

class Book extends Component {

  constructor(props) {

    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeYearOfPubblication = this.onChangeYearOfPubblication.bind(this);
    this.findBookById = this.findBookById.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.removeBook = this.removeBook.bind(this);

    this.state = {
      currentBook: {
        title: "",
        author: "",
        genre: "",
        yearOfPubblication: 0
      }
    };
  }

  componentDidMount() {

   
    this.findBookById(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          title: title
        }
      };
    });
  }

  onChangeAuthor(e) {
    const author = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        author: author
      }
    }));
  }

  onChangeGenre(e) {
    const genre = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        genre: genre
      }
    }));
  }

  onChangeYearOfPubblication(e) {
    const yearOfPubblication = e.target.value;
    
    this.setState(prevState => ({
      currentBook: {
        ...prevState.currentBook,
        yearOfPubblication: yearOfPubblication
      }
    }));
  }

  

  findBookById(id) {
   
    BookService.findBookById(id)
      .then(response => {
        this.setState({
          currentBook: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      title: this.state.currentBook.title,
      author: this.state.currentBook.author,
      genre: this.state.currentBook.genre,
      yearOfPubblication: this.state.currentBook.yearOfPubblication
      
    };

    BookService.updateBook(data)
      .then(response => {
        this.setState(prevState => ({
          currentBook: {
            ...prevState.currentBook,
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBook() {

    BookService.updateBook(
      
      this.state.currentBook
    )
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/books');
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeBook() {    
    BookService.removeBook(this.state.currentBook.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/books');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBook} = this.state;

    return (
      <div>
        {currentBook ? (
          <div className="edit-form">
            <h4>Book</h4>
            <form>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBook.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={currentBook.author}
                  onChange={this.onChangeAuthor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  id="genre"
                  value={currentBook.genre}
                  onChange={this.onChangeGenre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="yearOfPubblication">Year of Publication</label>
                <input
                  type="number"
                  className="form-control"
                  id="yearOfPubblication"
                  value={currentBook.yearOfPubblication}
                  onChange={this.onChangeYearOfPubblication}
                />
              </div>

              
            </form>

            
            <br/>
            <button
              className="btn btn-danger"
              onClick={this.removeBook}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateBook}
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Book);
