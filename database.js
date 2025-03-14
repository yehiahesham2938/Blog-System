const { Pool } = require("pg");
const mongoose = require("mongoose");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blog_system",
  password: "yehia",
  port: 5432,
  idleTimeoutMillis: 300,
});

const connectPostgres = async () => {
  try {
    await pool.connect();
    console.log("Postgres database Connected ");
  } catch (error) {
    console.error("Postgre Connection Failed", error);
    process.exit(1);
  }
};


const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo database connected ");
  } catch (error) {
    console.error("Mongo Connection Failed", error);
    process.exit(1);
  }
};

module.exports = { connectPostgres, connectMongo };
