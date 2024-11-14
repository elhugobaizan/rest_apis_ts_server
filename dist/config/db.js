"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//const db = new Sequelize(process.env.DB_URL!);
const db = new sequelize_1.Sequelize(process.env.DB_URL || 'postgresql://postgres:postgres@localhost:5432/rest_api_node_ts', {
    models: ['/../models/**/*'],
    logging: false
});
exports.default = db;
//# sourceMappingURL=db.js.map