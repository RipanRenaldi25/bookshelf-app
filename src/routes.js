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
import { createBook, getAllBooks, getSpecifiedBook } from './handler.js';

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
];

export default apiRoutes;
