const express = require("express");
const { EmployeeModel } = require("../models/employee.model");
const { auth } = require("../middleware/auth.middleware");

const employeeRouter = express.Router();

employeeRouter.use(auth);

employeeRouter.get("/", async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

employeeRouter.post("/add", async (req, res) => {
  try {
    const employee = new EmployeeModel(req.body);
    await employee.save();
    res
      .status(200)
      .json({ msg: "New employee has beed added", employee: req.body });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

employeeRouter.patch("/update/:employeeID", async (req, res) => {
  const { employeeID } = req.params;
  const payload = req.body;
  try {
    await EmployeeModel.findByIdAndUpdate({ _id: employeeID }, payload);
    const updatedEmployee = await EmployeeModel.find({ _id: employeeID });
    res
      .status(200)
      .json({ msg: "employee has been updated", employee: updatedEmployee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

employeeRouter.delete("/delete/:employeeID", async (req, res) => {
  const { employeeID } = req.params;
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(employeeID);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ msg: "Employee has been deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  employeeRouter,
};
