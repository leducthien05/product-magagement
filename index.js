// Load biến môi trường trước tiên
require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Config & Router
const database = require("./config/database");
const systemConfig = require("./config/systems");
const clientRouter = require("./router/client/index.router");
const adminRouter = require("./router/admin/index.router");

// Middleware
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;

// -------------------- Database --------------------
database.connect(); 
// Hoặc nếu muốn kết nối trực tiếp: mongoose.connect(process.env.DATABASE_URL);

// -------------------- Static & Public --------------------
// Tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// Public assets
app.use(express.static(path.join(__dirname, 'public')));

// -------------------- Middleware --------------------
// Flash messages
app.use(flash());

// Cookie + Session
app.use(cookieParser(process.env.COOKIE_SECRET || "default_secret"));
app.use(session({
  secret: process.env.SESSION_SECRET || "default_session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 // 1 giờ
  }
}));

// Parse form data
app.use(express.urlencoded({ extended: true }));
// Override method (PUT, DELETE)
app.use(methodOverride('_method'));

// -------------------- App Locals --------------------
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// -------------------- View Engine --------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// -------------------- Router --------------------
clientRouter(app);
adminRouter(app);
app.get("*", (req, res)=>{
  res.render("client/page/error/404", {
    title: "404 Not Found"
  })
})

// -------------------- Server --------------------
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
