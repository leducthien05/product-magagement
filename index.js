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
const moment = require('moment');

database.connect();


//Tinymce
app.use('/tinymce', 
  express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);

//Flash
app.use(flash());

//Cookie and Session
app.use(cookieParser("thienle25"));
app.use(session({
  secret: 'chuoi_bi_mat_bat_ky', // nên đưa vào biến môi trường
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 // 1 giờ
  }
}));


//App Locals Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
app.use(express.static(`${__dirname}/public`));

//Method and Req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//Cấu hình PUG vào dự án
    //deploy 
    app.set('views', `${__dirname}/views`);// truy cập vào folder tên là views. Thư mục chứa các file template
    app.set('view engine', 'pug');// loại template engine là: pug

//Router
router(app);
routeradmin(app);
  
//Lắng nghe sự thay đổi của dự án
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});