import app from './app.js';


const HTTP_PORT = process.env.PORT || 3000;

/* case 1 */
app.listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${HTTP_PORT}`);
})