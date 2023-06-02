const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controllers/userController");
const {
  verifyToken,
  isAdmin,
  isAdminOrOwnUser,
} = require("../Middlewares/authJWT");

module.exports = function (app) {
  app.post("/crm/api/v1/users", createUser);
  app.get("/crm/api/v1/users", [verifyToken, isAdmin], getAllUsers);
  app.get("/crm/api/v1/users/:id",[verifyToken, isAdminOrOwnUser],getUserById);
  app.put("/crm/api/v1/users/:id", [verifyToken, isAdmin], updateUser);
  app.post("/crm/api/vi/users/:id",[(verifyToken, isAdmin)], deleteUser);
};
