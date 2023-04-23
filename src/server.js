import hapi from '@hapi/hapi';
import apiRoutes from './routes.js';

const main = async () => {
  try {
    const server = hapi.server({
      host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
      port: 9000,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });
    server.route(apiRoutes);
    await server.start();
    console.log('Server Running on PORT 9000');
  } catch (e) {
    console.log(`Cannot start sever: ${e.message}`);
  }
};
export default main;
