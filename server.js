const express = require("express");
const app = express();
const dbConnection = require("./config/DB_connection");
const dotenv = require("dotenv");
const Routes = require("./routes");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const compression = require('compression')
const path = require("path");

const port = 4444;
dotenv.config();
dbConnection();
const limiter = rateLimiter({
	windowMs: 5 * 60 * 1000, 
	limit: 300, 
  validate: {xForwardedForHeader: false}
})

app.use(cors({
  // origin: ['http://localhost:5173', 'https://your-production-domain.com'], ,
  origin: 'http://localhost:5173' ,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression())
app.use(limiter);
app.use("/admin", express.static("./upload_image"));
app.use(express.static("dist"));
app.use("/", Routes);

// app.all('*', (req, res) => {
//   res.status(404).send('Not Found routes');
// })
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Or 'build'
});
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error',err.message);
});


app.listen(port, () => {
  console.log(`the server is running on port : ${port} on  http://localhost:${port}`);
});
