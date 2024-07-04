const asyncHandler = require("express-async-handler");
const Expense = require("../models/expensesModel");

//@desc Get all expenses
//@route GET /api/expenses
//@access public
const getExpenses = asyncHandler(async (req,res) => {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
});

//@desc Create new expence
//@route POST /api/expences
//@access public
const createExpense = asyncHandler(async (req,res) => {
    console.log("The request body is :" , req.body);
    const { title, category, description, amount, date } = req.body;
    if (!title || !category || !amount || !date){
        res.status(400);
        throw new Error("Complete required fields");
    }

    try{
        const expense = await Expense.create({
            title,
            category,
            description,
            amount,
            date
         });
    return res.status(201).json(expense);


    }
    catch(error){
        res.status(error.status || 500);
        throw new Error(error.message);
    }
  

});

//@desc Get expence by id
//@route GET /api/expences/:id
//@access public
const getExpense = asyncHandler(async (req,res) => {
    try{
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            res.status(404);
            throw new Error("Expense not found");         
        }
        res.status(200).json(expense);

    }
    catch(error){
        res.status(404
        );
        throw new Error(error.message);
    }
   
});

//@desc Update expence by id
//@route PUT /api/expences/:id
//@access public
const updateExpense = asyncHandler(async (req,res) => {
   try{ const expense = await Expense.findById(req.params.id);
    if (!expense) {
        res.status(404);
        throw new Error("Expense not found");         
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body, 
        { new: true }
    );
    res.status(200).json(updatedExpense);}
    catch(error){
        res.status(error.status || 500);
        throw new Error(error.message);
    }
});

//@desc Delete expence by id
//@route DELETE /api/expences/:id
//@access public
const deleteExpense = asyncHandler(async (req,res) => {
    try{
    
        await Expense.findByIdAndDelete(req.params.id);
    
    res.status(200).json({msg : "Expense deleted sucessfully"});}
    catch(error){
        res.status(error.status || 500);
        throw new Error(error.message);
    }
});


module.exports = {
    getExpenses,
    createExpense,
    getExpense,
    updateExpense,
    deleteExpense
};