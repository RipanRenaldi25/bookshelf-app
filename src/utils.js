export const filterBooksByName = (books, query) => {
  if (query.name) {
    return books.filter((book) => book.name.toLowerCase().includes(query.name.toLowerCase()));
  }
  return books;
};

export const filterBooksByReading = (books, query) => {
  if (query.reading === '1') {
    return books.filter((book) => book.finished === query.finished);
  }
  return books;
};

export const filterBooksByFinished = (books, query) => {
  if (query.finished === '1') {
    return books.filter((book) => book.finished === query.finished);
  }
  return books;
};

export const filterBooks = (books, query) => {
  let bookCloned = [...structuredClone(books)];
  bookCloned = filterBooksByName(bookCloned, query);
  bookCloned = filterBooksByReading(bookCloned, query);
  bookCloned = filterBooksByFinished(bookCloned, query);
  return bookCloned;
};
