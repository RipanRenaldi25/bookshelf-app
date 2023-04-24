// {
//     "name": string,
//     "year": number,
//     "author": string,
//     "summary": string,
//     "publisher": string,
//     "pageCount": number,
//     "readPage": number,
//     "reading": boolean
// }
import {
  createBook, deleteBook, getAllBooks, getSpecifiedBook, updateSpecifiedBook,
} from './handler.js';

const apiRoutes = [
  {
    method: 'post',
    path: '/books',
    handler: createBook,
  },
  {
    method: 'get',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'get',
    path: '/books/{bookId}',
    handler: getSpecifiedBook,
  },
  {
    method: 'put',
    path: '/books/{bookId}',
    handler: updateSpecifiedBook,
  },
  {
    method: 'delete',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

export default apiRoutes;
