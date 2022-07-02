import mysql from "mysql2/promise";
import Connection from "mysql2/typings/mysql/lib/Connection";

const connectMysql = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "root",
      port: 3306,
      database: "BlazeBOT",
    });
    console.log("Database connected!!!");
    return { connection: connection };
  } catch (err) {
    console.log("Database connection error: " + err);
    return { connection: null };
  }
};

export { connectMysql };
