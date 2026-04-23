import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongodb.config.js";
import User from "./models/user.model.js";

console.log(ENVIRONMENT.MONGO_DB_CONENECTION_STRING);

connectMongoDB();
