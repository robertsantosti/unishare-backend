"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const connection = knex_1.default({
    client: "postgresql",
    connection: {
      host: "ec2-52-21-247-176.compute-1.amazonaws.com",
      database: "d136cbjgoaf989",
      user: "ngsapnchvtveqk",
      password: "9687577f77b4aab681ef4cc9ebfe6ffa037326470c8f3f50cfed1eb7db8b91ea"
    },
});
exports.default = connection;
