import "reflect-metadata"
import express from "express"
import mssql from "mssql"
import { datasouce1 } from "./src/data-source.js"
import { datasouce2 } from "./src/data-source.js"
import cors from "cors"
const sqlser = mssql;
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json())
const port = 5000;
app.use(cors());
app.all("*",  (req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})

// mysql
app.get("/getuser",async (req,res)=>{
    datasouce2.promise()
      .query("SELECT * from users")
      .then(([rows]) => {
        return res.status(200).json(rows);
      })
      .catch(console.log);
})
app.get("/getemployee", async (req, res) => {
  datasouce2
    .promise()
    .query("SELECT * from employee")
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch(console.log);
});
app.get("/getsotienthuc", async (req, res) => {
  datasouce2
    .promise()
    .query("SELECT * from sotienthuc")
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch(console.log);
});
app.get("/getpayrates", async (req, res) => {
  datasouce2
    .promise()
    .query("SELECT * from pay_rates")
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch(console.log);
});
app.post("/postemployee", (req, res) => {
  datasouce2.query(
    `insert into employee values(${req.body.Employee_Number},${req.body.idEmployee} ,${req.body.First_Name},${req.body.Last_Name},${req.body.SSN},${req.body.Pay_Rate},${req.body.PayRates_id},${req.body.Vacation_Days},${req.body.Paid_To_Date},${req.body.Paid_Last_Year})`
  );
  return res.status(200).json("Done");
});
app.post("/postuser", (req, res) => {
  datasouce2.query(
    `insert into users values(${req.body.User_Name},${req.body.Password} ,${req.body.Email},${req.body.Active})`
  );
  return res.status(200).json("Done");
});
app.post("/postpayrates", (req, res) => {
  datasouce2.query(
    `insert into pay_rates values(${req.body.idPay_Rates},${req.body.Pay_Rate_Name} ,${req.body.Value},${req.body.Tax_Percentage},${req.body.Pay_Type},${req.body.Pay_Amount},${req.body.PT_Level_C})`
  );
  return res.status(200).json("Done");
});
app.put("/postsalary", (req, res) => {
  datasouce2.query(`update employee SET  idEmployee = ${req.body.idEmployee} ,Last_Name = '${req.body.Last_Name}', First_Name = '${req.body.First_Name}' ,SSN = ${req.body.SSN},Pay_Rate = ${req.body.Pay_Rate}, PayRates_id = ${req.body.PayRates_id}, Vacation_Days = ${req.body.Vacation_Days},Paid_To_Date = ${req.body.Paid_To_Date},Paid_Last_Year = ${req.body.Paid_Last_Year} where Employee_Number = ${req.body.Employee_Number}`
  );
  return res.status(200).json("Done");
});
app.put("/putsotienthuc", (req, res) => {
  datasouce2.query( `update sotienthuc SET Thanhtien = ${req.body.Thanhtien} where idsotienthuc = ${req.body.idsotienthuc}`
  );
  return res.status(200).json("done");
});
app.put("/putsalarytodate", (req, res) => {
  const rr = datasouce2.query(
    `update employee SET Paid_To_Date = ${req.body.Paid_To_Date} where Employee_Number = ${req.body.Employee_Number}`
  );
  return res.status(200).json(rr);
});


// sql server
app.get("/getpersonal",async(req,res)=>{
    await sqlser.connect(datasouce1)
    const result = await sqlser.query`select * from Personal`
    const {recordset} = result
    return res.status(200).json(recordset);
})
app.get("/getjobhistory", async (req, res) => {
  await sqlser.connect(datasouce1);
  const result =
    await sqlser.query`select * from Job_History`;
  const { recordset } = result;
  return res.status(200).json(recordset);
});
app.get("/getbenefitplanid", async (req, res) => {
  await sqlser.connect(datasouce1);
  const result = await sqlser.query`select Benefit_Plan_ID from Benefit_Plans`;
  const { recordset } = result;

  return res.status(200).json();
});
app.get("/getemployment", async (req, res) => {
  await sqlser.connect(datasouce1);
  const result = await sqlser.query`select * from Employment`;
  const { recordset } = result;
  return res.status(200).json(recordset);
});
app.get("/getemergencycontacts", async (req, res) => {
  await sqlser.connect(datasouce1);
  const result = await sqlser.query`select * from Emergency_Contacts`;
  const { recordset } = result;
  return res.status(200).json(recordset);
});
app.get("/getbenefitplans", async (req, res) => {
  await sqlser.connect(datasouce1);
  const result = await sqlser.query`select * from Benefit_Plans`;
  const { recordset } = result;
  return res.status(200).json(recordset);
});
app.get("/getMigrationHistory", async (req, res) => {
  await sqlser.connect(datasouce1);
  const result = await sqlser.query`select * from __MigrationHistory`;
  const { recordset } = result;
  return res.status(200).json(recordset);
});
app.get("/getday", async (req, res) => {
  const date = new Date()
  var day = date.getUTCDate();
  var month = date.getUTCMonth()+1
  var year = date.getUTCFullYear();
  const dmy = `${year}-${month}-${day}`;
  await sqlser.connect(datasouce1);
  const result =
    await sqlser.query`  SELECT *  FROM Employment where month(Hire_Date) = ${month} and day(Hire_Date) = ${day}`;
  const { recordset } = result;
  return res.status(200).json(recordset);
});
app.post("/postpersonal", async(req,res)=>{
       await sqlser.connect(datasouce1);
       sqlser.query`insert into Personal values(${req.body.Employee_ID},${req.body.First_Name},${req.body.Last_Name},${req.body.Middle_Initial},${req.body.Address1},${req.body.Address2},${req.body.City},${req.body.State},${req.body.Zip},${req.body.Email},${req.body.Phone_Number},${req.body.Social_Security_Number},${req.body.Drivers_License},${req.body.Marital_Status},${req.body.Gender},${req.body.Shareholder_Status},${req.body.Benefit_Plans},${req.body.Ethnicity})`;
       return res.status(200).json("Done");
})


app.post("/postjobhistory", async (req, res) => {
  await sqlser.connect(datasouce1);
  sqlser.query`insert into Job_History values(${req.body.Employee_ID},${req.body.Department},${req.body.Division},${req.body.Start_Date},${req.body.End_Date},${req.body.Job_Title},${req.body.Supervisor},${req.body.Job_Category},${req.body.Location},${req.body.Departmen_Code},${req.body.Salary_Type},${req.body.Pay_Period},${req.body.Hours_per_Week},${req.body.Hazardous_Training})`;
  return res.status(200).json("Done");
});

app.post("/postemergencycontacts", async (req, res) => {
  await sqlser.connect(datasouce1);
  sqlser.query`insert into Emergency_Contacts values(${req.body.Employee_ID},${req.body.Emergency_Contact_Name},${req.body.Phone_Number},${req.body.Relationship})`;
  return res.status(200).json("Done");
});

app.post("/postbenefitplans", async (req, res) => {
  await sqlser.connect(datasouce1);
  sqlser.query`insert into Benefit_Plans values(${req.body.Plan_Name},${req.body.Deductable},${req.body.Percentage_CoPay})`;
  return res.status(200).json("Done");
});

app.post("/postmigrationHistory", async (req, res) => {
  await sqlser.connect(datasouce1);
  sqlser.query`insert into __MigrationHistory values(${req.body.MigrationId},${req.body.ContextKey},${req.body.Model},${req.body.ProductVersion})`;
  return res.status(200).json("Done");
});
app.post("/postemployment", async (req, res) => {
  await sqlser.connect(datasouce1);
  sqlser.query`insert into Employment values(${req.body.Employee_ID},${req.body.Employment_Status},${req.body.Hire_Date},${req.body.Workers_Comp_Code},${req.body.Termination_Date},${req.body.Rehire_Date},${req.body.Last_Review_Date})`;
  return res.status(200).json("Done");
});
app.post("/postall", async (req, res) => {
  await sqlser.connect(datasouce1);
  await sqlser.query`insert into Benefit_Plans values(${req.body.Plan_Name},${req.body.Deductable},${req.body.Percentage_CoPay})`;
   const Benefit = await sqlser.query`select Benefit_Plan_ID from Benefit_Plans where  Benefit_Plan_ID = (SELECT MAX(Benefit_Plan_ID) FROM Benefit_Plans)`;
  await sqlser.query`insert into Personal values(${req.body.Employee_ID},${req.body.First_Name},${req.body.Last_Name},${req.body.Middle_Initial},${req.body.Address1},${req.body.Address2},${req.body.City},${req.body.State},${req.body.Zip},${req.body.Email},${req.body.Phone_Number},${req.body.Social_Security_Number},${req.body.Drivers_License},${req.body.Marital_Status},${req.body.Gender},${req.body.Shareholder_Status},${Benefit.recordset[0].Benefit_Plan_ID},${req.body.Ethnicity})`;
  await sqlser.query`insert into Emergency_Contacts values(${req.body.Employee_ID},${req.body.Emergency_Contact_Name},${req.body.Phone_Number},${req.body.Relationship})`;
  await sqlser.query`insert into Job_History values(${req.body.Employee_ID},${req.body.Department},${req.body.Division},${req.body.Start_Date},${req.body.End_Date},${req.body.Job_Title},${req.body.Supervisor},${req.body.Job_Category},${req.body.Location},${req.body.Departmen_Code},${req.body.Salary_Type},${req.body.Pay_Period},${req.body.Hours_per_Week},${req.body.Hazardous_Training})`;
  await sqlser.query`insert into Employment values(${req.body.Employee_ID},${req.body.Employment_Status},${req.body.Hire_Date},${req.body.Workers_Comp_Code},${req.body.Termination_Date},${req.body.Rehire_Date},${req.body.Last_Review_Date})`;
  await sqlser.query`insert into __MigrationHistory values(${req.body.MigrationId},${req.body.ContextKey},${req.body.Model},${req.body.ProductVersion})`;
  const result=  await sqlser.query`select ID from Job_History where  ID = (SELECT MAX(ID) FROM Job_History)`;
  const { recordset } = result;
  datasouce2.query(`insert into employee values(${recordset[0].ID},${req.body.Employee_ID} ,'${req.body.Last_Name}','${req.body.First_Name}',${req.body.Social_Security_Number},null,0,0,0,0)`
  );
   datasouce2.query(`insert into sotienthuc values(${recordset[0].ID},0)`);
  return res.status(200).json("Done");
});



// app.delete("/delete/:id", async (req, res) => {
//   await sqlser.connect(datasouce1);
//    const user = req.params.id;
//   console.log(user);
//   sqlser.query`delete FROM __MigrationHistory where MigrationId = ${user}`;
//   return res.status(200).json("Done");
// });

// app.delete("/delete", async (req, res) => {
//   try{
//     await sqlser.connect(datasouce1);
//     sqlser.query`delete FROM Personal where Employee_ID < 1000000`;
//     sqlser.query`delete FROM Benefit_Plans where Percentage_CoPay < 1000000`;
//     sqlser.query`delete FROM Employment where Employee_ID < 1000000`;
//   // sqlser.query`delete FROM Emergency_Contacts where Employee_ID < 10000000`;
//   // sqlser.query`delete FROM Job_History where Employee_ID < 1000000`;
//   // sqlser.query`delete FROM __MigrationHistory where MigrationId < 100000`;

//   return res.status(200).json("Done");
//   }
//   catch(err){
//     console.log(err)
//   }
// });
