const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");

router.get("/", employeeController.list);
router.get("/add", employeeController.showAddForm);
router.post("/add", employeeController.add);
router.get("/edit/:id", employeeController.showEditForm);
router.post("/edit/:id", employeeController.edit);
router.get("/delete/:id", employeeController.del);

router.get("/edit/:id", async (req, res, next) => {
  if (!req.params.id) {
    return res.status(404).send({ message: "ID không tồn tại" });
  }
  next(); // Tiếp tục xử lý trong controller
});

module.exports = router;
