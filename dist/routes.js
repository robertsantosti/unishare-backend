"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoomsController_1 = __importDefault(require("./controllers/RoomsController"));
const UsersControllers_1 = __importDefault(require("./controllers/UsersControllers"));
const UserTypesController_1 = __importDefault(require("./controllers/UserTypesController"));
const routes = express_1.default.Router();
const userTypesController = new UserTypesController_1.default();
const usersController = new UsersControllers_1.default();
const roomsController = new RoomsController_1.default();
/** Index */
routes
    .get('/', (req, res) => {
    return res.json({ message: 'Bem vindo' });
});
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
exports.default = routes;
