module.exports = app => {
    const company = require("../controllers/company_master.controller.js");
  
    // Create a new Customer
    app.post("/company", company.create);
  
    // Retrieve all Customers
    app.get("/company", company.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/company/:companyId", company.findOne);
  
    // Update a Customer with customerId
    app.put("/company/:companyId", company.update);
  
    // Delete a Customer with customerId
    app.delete("/company/:companyId", company.delete);
  
    // Create a new Customer
    app.delete("/company", company.deleteAll);
  };