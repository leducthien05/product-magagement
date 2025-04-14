const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const router = require("./router/client/index.router");
const routeradmin = require("./router/admin/index.router");
const database  = require("./config/database");
const env = require("dotenv").config();
const port = process.env.PORT;
mongoose.connect(process.env.Database);

const systemConfig = require("./config/systems");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

//Tinymce
app.use('/tinymce', 
  express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);
//Flash
app.use(cookieParser("thienle25"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//local systemConfig variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
database.connect();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
//Cấu hình PUG vào dự án
    //deploy 
    app.set('views', `${__dirname}/views`);// truy cập vào folder tên là views. Thư mục chứa các file template
    app.set('view engine', 'pug');// loại template engine là: pug
    
    router(app);
    routeradmin(app);
  
//Deploy
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});