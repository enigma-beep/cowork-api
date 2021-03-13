const Company = require("../models/company_master.model.js");

// Create and Save a new company
exports.create = (req, res) => {
  
};

// Retrieve all companies from the database.
exports.findAll = (req, res) => {
  
};

// Find a single company with a companyId
exports.findOne = (req, res) => {
  
};

// Update a company identified by the companyId in the request
exports.update = (req, res) => {
  
};

// Delete a company with the specified companyId in the request
exports.delete = (req, res) => {
  
};

// Delete all companies from the database.
exports.deleteAll = (req, res) => {
  
};


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a company
    const company = new Company({
      id: req.body.id,
      company_id: req.body.company_id,
      company_website: req.body.company_website,
      company_name: req.body.company_name,
      company_address: req.body.company_address,
      company_gst_no: req.body.company_gst_no,
      branch_id: req.body.branch_id,
      is_approved: req.body.is_approved,
    });
  
    // Save company in the database
    Company.create(company, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the company."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    Company.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving companies."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Company.findById(req.params.companyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found company with id ${req.params.companyId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving company with id " + req.params.companyId
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Company.updateById(
      req.params.companyId,
      new Company(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found company with id ${req.params.companyId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating company with id " + req.params.companyId
            });
          }
        } else res.send(data);
      }
    );
  };


  exports.delete = (req, res) => {
    Company.remove(req.params.companyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found company with id ${req.params.companyId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete company with id " + req.params.companyId
          });
        }
      } else res.send({ message: `company was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Company.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all companies."
        });
      else res.send({ message: `All companies were deleted successfully!` });
    });
  };