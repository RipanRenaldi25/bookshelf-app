import { nanoid } from 'nanoid';
import books from './books.js';

export const createBook = (request, h) => {
  // name, year, author summary, publisher, readPage, reading, insertedAt, updatedAt
  const {
    name, year, author, summary, publisher, readPage, reading, pageCount,
  } = request.payload;
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal Menambahkan Buku. Mohon isi nama buku',
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
  const response = h.response({
    status: 'success',
    data: {
      books,
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
