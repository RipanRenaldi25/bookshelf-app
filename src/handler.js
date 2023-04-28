import { nanoid } from 'nanoid';
import books from './books.js';
import { filterBooks } from './utils.js';

export const createBook = (request, h) => {
  // name, year, author summary, publisher, readPage, reading, insertedAt, updatedAt
  const {
    name, year, author, summary, publisher, readPage, reading, pageCount,
  } = request.payload;
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }
  const createdAt = new Date().toISOString();
  const id = nanoid(12);
  const finished = pageCount === readPage;

  books.push({
    id,
    name,
    author,
    year,
    summary,
    publisher,
    readPage,
    reading,
    pageCount,
    insertedAt: createdAt,
    updatedAt: createdAt,
    finished,
  });
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

export const getAllBooks = (request, h) => {
  const { query } = request;
  const response = h.response({
    status: 'success',
    data: {
      books: filterBooks(books, query),
    },
  });
  response.code(200);
  return response;
};

export const getSpecifiedBook = (request, h) => {
  const { bookId } = request.params;
  const searchedBookIndex = books.findIndex((book) => book.id === bookId);
  // If Book not Found, should return error
  if (searchedBookIndex < 0) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }
  const response = h.response({
    status: 'success',
    data: {
      book: books[searchedBookIndex],
    },
  });
  response.code(200);
  return response;
};

export const updateSpecifiedBook = (request, h) => {
  const {
    name, year, author, summary, publisher, readPage, reading, pageCount,
  } = request.payload;
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }
  const { bookId } = request.params;
  const searchedBookIndex = books.findIndex((book) => book.id === bookId);
  if (searchedBookIndex < 0) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }
  const updatedAt = new Date().toISOString();
  books[searchedBookIndex] = {
    ...books[searchedBookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    reading,
    readPage,
    pageCount,
    updatedAt,
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

export const deleteBook = (request, h) => {
  const { bookId } = request.params;
  const searchedBookIndex = books.findIndex((book) => book.id === bookId);
  if (searchedBookIndex < 0) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }
  books.splice(searchedBookIndex, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};
