import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import Row from '../components/Row';
import Col from '../components/Col';
import Card from '../components/Card';
import { searchGoogleBooks, saveBook, getSavedBooks } from '../utils/API';

class Search extends Component {
  state = {
    searchTerm: '',
    bookList: [],
    savedBookIds: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    searchGoogleBooks(this.state.searchTerm)
      .then(({ data: { items: bookList } }) => {
        const bookListCleaned = bookList.map(book => {
          return {
            bookId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''
          };
        });
        return this.setState({ bookList: bookListCleaned });
      })
      .then(this.retrieveSavedBooks)
      .catch(err => console.log(err));
  };

  handleSaveBook = bookId => {
    const book = this.state.bookList.find(book => book.bookId === bookId);

    saveBook(book).then(() => {
      const savedBookIds = [...this.state.savedBookIds, bookId];
      this.setState({ savedBookIds });
    });
  };

  retrieveSavedBooks = () => {
    getSavedBooks().then(({ data: dbSavedBooks }) => {
      const savedBookIds = dbSavedBooks.map(({ bookId }) => bookId);
      this.setState({ savedBookIds });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Jumbotron fluid bg={'dark'} color={'light'} pageTitle={'Search For Books'} />
        <div className="container-fluid">
          <Row>
            <Col xs={12} md={4}>
              <Card title="Search for a book">
                <form onSubmit={this.handleFormSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for a book"
                    onChange={this.handleInputChange}
                    value={this.state.searchTerm}
                    name="searchTerm"
                  />
                  <button type="submit" className="btn btn-block btn-dark">
                    Search For Books
                  </button>
                </form>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <Row>
                {!this.state.bookList.length
                  ? <h2 className="text-center">Search for books to begin.</h2>
                  : this.state.bookList.map(book => {
                      return (
                        <Col key={book.id} md={6}>
                          <Card title={book.title} image={book.image ? book.image : undefined}>
                            <small className="text-muted">
                              {`By: ${book.authors.join(", ")}`}
                            </small>
                            <p>{book.description}</p>

                            <button
                              disabled={this.state.savedBookIds.includes(book.bookId) ? true : undefined}
                              onClick={() => this.handleSaveBook(book.bookId)}
                              className="btn btn-success btn-sm">
                              Save Book
                            </button>

                          </Card>
                        </Col>
                      );
                    })}
              </Row>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
