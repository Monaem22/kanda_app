const express = require("express");
const app = express();
const dbConnection = require("./config/DB_connection");
const dotenv = require("dotenv");
const Routes = require("./routes");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const compression = require('compression')


const port = 4444;
dotenv.config();
dbConnection();
const limiter = rateLimiter({
	windowMs: 5 * 60 * 1000, 
	limit: 300, 
  validate: {xForwardedForHeader: false}
})

app.use(cors({
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression())
app.use(limiter);
app.use("/", Routes);

app.all('*', (req, res) => {
  res.status(404).send('Not Found routes');
})
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error',err.message);
});


app.listen(port, () => {
  console.log(`the server is running on port : ${port} on  http://localhost:${port}`);
});
