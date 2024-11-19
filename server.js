const path = require("path");
const express = require("express");
const connectDB = require("../baithigiuaki/config/database.config"); // đường dẫn tới file database.config.js
const EmployeeRouters = require("../baithigiuaki/routes/employee.routes"); //đường dẫn đén file routers

//khởi tạo ứng dụng express
const app = express();

//kết nối MongoDB
connectDB();

//cấu hình middlewra để xử lí dữ liệu từ form (POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //nếu bạn sử dụng Json trong các API
app.use(express.static("public"));

//Cấu Hình view engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //Định nghĩa đường dẫn tới thư mục views

//Sử dụng Router cho người (CRUD)
app.use("/", EmployeeRouters);

//Khởi tạo server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port");
});
