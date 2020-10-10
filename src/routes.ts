import express from "express";
import RoomsController from "./controllers/RoomsController";
import UsersController from "./controllers/UsersControllers";
import UserTypesController from "./controllers/UserTypesController";

const routes = express.Router();
const userTypesController = new UserTypesController();
const usersController = new UsersController();
const roomsController = new RoomsController();

/** User Types Routes */
routes
  .route("/user_types")
  .get(userTypesController.index)
  .post(userTypesController.store);

routes
  .route("/user_types/:type_id")
  .get(userTypesController.show)
  .put(userTypesController.update)
  .delete(userTypesController.delete);

routes.get("/user_types/:type_id/status", userTypesController.status);

/** User Routes */
routes
  .route("/users")
  .get(usersController.index)
  .post(usersController.store);

routes
  .route("/users/:user_id")
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);


/** Room Routes */
routes
  .route("/rooms")
  .get(roomsController.index)
  .post(roomsController.store);

routes
  .route("/rooms/:room_id")
  .get(roomsController.show)
  .put(roomsController.update)
  .delete(roomsController.delete);


export default routes;
