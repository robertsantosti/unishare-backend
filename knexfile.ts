import path from "path";

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
      directory: path.resolve(__dirname, "src", "database", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds")
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
      directory: path.resolve(__dirname, "src", "database", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds")
    }
  },

  production: {
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
      directory: path.resolve(__dirname, "src", "database", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds")
    }
  }
};
