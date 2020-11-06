const app = require('./app/App');
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`[petful-server] Listening on ${port}.`);
});