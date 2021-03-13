const sql = require("./db.js");

// constructor
const UserMaster = function(user) {
  this.company_id = user.company_id;
  this.user_id = user.user_id;
  this.user_name = user.user_name;
  this.user_password = user.user_password;
  this.user_phone = user.user_phone;
  this.user_email = user.user_email;
  this.user_address = user.user_address;
  this.registration_date = user.registration_date;
  this.status = user.status;
};

UserMaster.create = (newUserMaster, result) => {
  sql.query("INSERT INTO user_master SET ?", newUserMaster, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUserMaster });
    result(null, { id: res.insertId, ...newUserMaster });
  });
};

UserMaster.findById = (userId, result) => {
  sql.query(`SELECT * FROM user_master WHERE user_id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found UserMaster with the id
    result({ kind: "not_found" }, null);
  });
};

UserMaster.getAll = result => {
  sql.query("SELECT * FROM user_master", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user_master: ", res);
    result(null, res);
  });
};

UserMaster.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user_master SET company_id = ?, user_id = ?, user_name = ?, user_password = ?, user_phone = ?, user_email = ?, user_address = ?, registration_date = ?, status = ? WHERE user_id = ?",
    [user.company_id, user.user_id, user.user_name, user.user_password, user.user_phone, user.user_email, user.user_address, user.registration_date, user.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found UserMaster with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

UserMaster.remove = (id, result) => {
  sql.query("DELETE FROM user_master WHERE user_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found UserMaster with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

UserMaster.removeAll = result => {
  sql.query("DELETE FROM user_master", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user_master`);
    result(null, res);
  });
};

module.exports = UserMaster;