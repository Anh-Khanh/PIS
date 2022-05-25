import "reflect-metadata"
import mysql2 from "mysql2"
export const datasouce1 = {
  user: "ANHKHANH",
  password: "anhkhanh6540",
  database: "HR",
  server: "localhost",
  port:1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
};

export const datasouce2 = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "payroll",
  password:"240501",
  port: 3306,
});