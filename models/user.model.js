// Require DB connection
import sql from "./db.js";

class User {
  // Constructor
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
  }

  // Create method
  static create(newUser, result) {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  }

  // Find By ID Method
  static findById(userId, result) {
    sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
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
      // User ID was not found in the database
      result({ kind: "not_found" }, null);
    });
  }

  // Get all method
  static getAll(result) {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null, res);
    });
  }

  // Update by ID method
  static updateById(id, user, result) {
    sql.query(
      "UPDATE users SET name = ? WHERE id = ?",
      [user.name, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // User ID was not found in the database
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  }

  // Remove method
  static remove(id, result) {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // User ID was not found in the database
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  }

  // Remove All method
  static removeAll(result) {
    sql.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  }
}

export default User;