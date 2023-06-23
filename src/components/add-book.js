import React, { Component } from "react";
import BookService from "../services/book.service.js";
import { withRouter } from '../common/with-router.js';

class AddBook extends Component {

  constructor(props) {

    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeYearOfPubblication = this.onChangeYearOfPubblication.bind(this);
    this.saveBook = this.saveBook.bind(this);


    this.state = {
      title: "",
      author: "",
      genre: "",
      yearOfPubblication: 0
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value
    });
  }

  onChangeYearOfPubblication(e) {
    this.setState({
      yearOfPubblication: e.target.value
    });
  }



  saveBook() {
    var data = {
      title: this.state.title,
      author: this.state.author,
      genre: this.state.genre,
      yearOfPubblication: this.state.yearOfPubblication
    };

    BookService.saveBook(data)
      .then(response => {
        this.setState({
          title: response.data.title,
          author: response.data.author,
          genre: response.data.genre,
          yearOfPubblication: response.data.yearOfPubblication

        });

        console.log(response.data);
        this.props.router.navigate('/books');

      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    return (
      <div className="submit-form">
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={this.state.title}
              onChange={this.onChangeTitle}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={this.state.author}
              onChange={this.onChangeAuthor}
              name="author"
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              required
              value={this.state.genre}
              onChange={this.onChangeGenre}
              name="genre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearOfPubblication">Year of Publication</label>
            <input
              type="number"
              className="form-control"
              id="yearOfPubblication"
              required
              value={this.state.yearOfPubblication}
              onChange={this.onChangeYearOfPubblication}
              name="yearOfPubblication"
            />
          </div>


          <button onClick={this.saveBook} className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(AddBook);
