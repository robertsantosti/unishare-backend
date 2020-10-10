"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            host: "127.0.0.1",
            user: "postgres",
            password: "root",
            database: "unishare"
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, "dist", "database", "migrations")
        },
        seeds: {
            directory: path_1.default.resolve(__dirname, "dist", "database", "seeds")
        }
    },
    staging: {
        client: "postgresql",
        connection: {
            database: "d136cbjgoaf989",
            user: "ngsapnchvtveqk",
            password: "9687577f77b4aab681ef4cc9ebfe6ffa037326470c8f3f50cfed1eb7db8b91ea"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, "src", "database", "migrations")
        },
        seeds: {
            directory: path_1.default.resolve(__dirname, "src", "database", "seeds")
        }
    },
    production: {
        client: "postgresql",
        connection: {
            host: "ec2-52-21-247-176.compute-1.amazonaws.com",
            database: "d136cbjgoaf989",
            user: "ngsapnchvtveqk",
            password: "9687577f77b4aab681ef4cc9ebfe6ffa037326470c8f3f50cfed1eb7db8b91ea"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path_1.default.resolve(__dirname, "src", "database", "migrations")
        },
        seeds: {
            directory: path_1.default.resolve(__dirname, "src", "database", "seeds")
        }
    }
};
