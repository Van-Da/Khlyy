const Employee = require("../models/employee.model");

//Lấy danh sách người dùng và render ra view index.ejs
const list = async (req, res) => {
  try {
    const employee = await Employee.find(); //Lấy tất cả người dùng từ MongoDB
    res.render("index", { employee }); //Render ra view.ejs vaf truyền danh sách users
  } catch (err) {
    res.status(500).send({ message: "404. lỗi khi lấy danh sách người dùng " });
  }
};

//Hiển thị form thêm người dùng mới (add.ejs)
const showAddForm = (req, res) => {
  res.render("add"); //Render ra view add.ejs
};

//Thêm người dùng vào CSDL
const add = async (req, res) => {
  const { name, email, position, salary } = req.body;
  const newEmployee = new Employee({ name, email, position, salary });

  try {
    await newEmployee.save(); //Lưu người dùng mới vào MongoDB
    res.redirect("/"); //Lưu khi thêm xong, quay về trang danh sách
  } catch (err) {
    res.status(500).send({ message: "404 lỗi xảy ra thêm người dùng " });
  }
};

//Hiển thị form chỉnh sửa người dùng (eidt.ejs)
const showEditForm = async (req, res) => {
  const employeeID = req.params.id; //Lấy id của người dùng từ URL
  try {
    const employee = await Employee.findById(employeeID);
    if (!employee)
      return res.status(404).send({ message: "Người dùng không tồn tại" });
    res.render("edit", { employee }); //Render ra view.ejs với thông tin người dùng
  } catch (err) {
    res
      .status(400)
      .send({ message: "Có lỗi xảy ra khi hiển thị form chỉnh sửa" });
  }
};
//Cập nhật thông tin người dùng
const edit = async (req, res) => {
  const employeeID = req.params.id; // Lấy ID của người dùng từ URL
  const { name, email, position, salary } = req.body;
  try {
    const updateEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, position, salary },
      { new: true } // Đảm bảo trả về document sau khi cập nhật
    );
    if (!updateEmployee)
      return res.status(404).send({ message: "Người dùng không tồn tại" });
    res.redirect("/"); //sau khi cập nhật xong, quay về danh sách
  } catch (err) {
    res.status(500).send({ message: "Có lỗi xảy ra khi cập nhật người dùng" });
  }
};

const del = async (req, res) => {
  const employeeID = req.params.id; //Lấy id của người dùng từ URL
  try {
    const deleteEmployee = await Employee.findByIdAndDelete(employeeID);
    if (!deleteEmployee)
      return res.status(404).send({ message: "Người dùng không tồn tại" });
    res.redirect("/"); //sau khi xóa xong, quay về danh sách
  } catch (err) {
    res.status(400).send({ message: "Có lỗi xảy ra khi xóa người dùng" });
  }
};

module.exports = { list, showAddForm, add, showEditForm, edit, del };
