const sql = require("./db.js");

// constructor
const CompanyMaster = function(company) {
  this.id = company.id;
  this.company_id = company.company_id;
  this.company_website = company.company_website;
  this.company_name = company.company_name;
  this.company_address = company.company_address;
  this.company_gst_no = company.company_gst_no;
  this.branch_id = company.branch_id;
  this.is_approved = company.is_approved;
};

CompanyMaster.create = (newCompanyMaster, result) => {
  sql.query("INSERT INTO company_master SET ?", newCompanyMaster, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created company: ", { id: res.insertId, ...newCompanyMaster });
    result(null, { id: res.insertId, ...newCompanyMaster });
  });
};

CompanyMaster.findById = (companyId, result) => {
  sql.query(`SELECT * FROM company_master WHERE id = ${companyId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found company: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found CompanyMaster with the id
    result({ kind: "not_found" }, null);
  });
};

CompanyMaster.getAll = result => {
  sql.query("SELECT * FROM company_master", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("company_master: ", res);
    result(null, res);
  });
};

CompanyMaster.updateById = (id, company, result) => {
  sql.query(
    "UPDATE company_master SET id = ?, company_id = ?, company_website = ?, company_name = ?, company_address = ?, company_gst_no = ?, branch_id = ?, is_approved = ? WHERE id = ?",
    [company.id, company.company_id, company.company_website, company.company_name, company.company_address, company.company_gst_no, company.branch_id, company.is_approved, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found CompanyMaster with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated company: ", { id: id, ...company });
      result(null, { id: id, ...company });
    }
  );
};

CompanyMaster.remove = (id, result) => {
  sql.query("DELETE FROM company_master WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found CompanyMaster with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted company with id: ", id);
    result(null, res);
  });
};

CompanyMaster.removeAll = result => {
  sql.query("DELETE FROM company_master", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} company_master`);
    result(null, res);
  });
};

module.exports = CompanyMaster;