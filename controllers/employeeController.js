const Employee = require('../models/NewEmployees');

const getAllEmployee = async (req,res) => {
    const employees = await Employee.find();
    if (!employees) return res.sendStatus(204);
    res.send(employees)
};
const createEmployee = async (req,res) => {
    if (!req.body.firstname || !req.body.lastname ){
        return res.status(400).json({'message': 'require firstname and lastname'}); 
    }
    
    try {
        const result =  await Employee.create({
           firstname: req.body.firstname,
           lastname : req.body.lastname 
        })
        console.log(result);
        res.status(201).json({'success':`New employee ${req.body.firstname} have been added.`})
     } catch (err) {
        res.status(500).json({'message': err.message})
     }

};
const updateEmployee = async (req,res) => {
    if (!req.body.id) {
        return res.status(400).json({'message': 'id is required'});
    } 
    try {
        const employee = await Employee.findOne({ _id: req.body.id }).exec();
        if (req?.body?.firstname) employee.firstname = req.body.firstname
        if (req?.body?.lastname) employee.lastname = req.body.lastname
        const reslut = await employee.save();
        res.json(reslut);
    } catch (err) {
        res.status(500).json({ 'Error': err.message });
        console.log(err.stack);
    }
};
const deleteEmployee = async (req,res) => {
    if (!req?.body?.id) return res.status(400).json({'message': 'id is required'});
    try {
        const employee = await Employee.findOne({ _id: req.body.id }).exec()
        const result = await employee.deleteOne();
        res.json(result)
    } catch (err) {
        res.status(500).json({ 'Error': err.message });
        console.log(err.stack);    }
};
const getEmployee = async (req,res) => {
    if (!req?.params?.id) return res.status(400).json({'message': 'Employee ID is required.'});
    try {
        const employee = await Employee.findOne({ _id: req.params.id }).exec()
        if (!employee) return res.status(204).json({ 'message': `No employee id match ID: ${req.params.id}`});
        res.json(employee) 
    } catch (err) {
        res.status(500).json({ 'Error': err.message });
        console.log(err.stack);
    }
};


module.exports = {
    getAllEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
};