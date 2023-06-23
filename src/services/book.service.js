import http from "../http-commons.js";

class BookService {

  findAllBooks() {

    return http.get(``);
  }

  findBookById(id) {
    
    return http.get(`/book-id/${id}`);

  }

  saveBook(book) {

    console.log(book);

    return http.post(``, book);
  }

  updateBook(book) {
    
    return http.put(``, book);
  }

  removeBook(id) {

    return http.delete(`/book-id/${id}`);
    
  }

}

export default new BookService();
