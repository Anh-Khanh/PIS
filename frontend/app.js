const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const content = $(".content");
const Previous = $(".Previous");
const mainhome = $(".mainhome");
const bang = document.querySelector(".bang");
const tables = document.createElement("table");
const table1 = document.createElement("table");
const table2 = document.createElement("table");
const table3 = document.createElement("table");
const table4 = document.createElement("table");
const table5 = document.createElement("table");

tables.classList.add("tables");
table1.classList.add("tables");
table2.classList.add("tables");
table3.classList.add("tables");
table4.classList.add("tables");
table5.classList.add("tables");

bang.appendChild(tables);
bang.appendChild(table1);
bang.appendChild(table2);
bang.appendChild(table3);
bang.appendChild(table4);
bang.appendChild(table5);

// func
const information = $(".information");
const Salary = $(".Salary");
const Notifications = $(".Notification");
//
const info = $(".infos");
const sala = $(".sala");
const noti = $(".noti");
const fuc_all = $(".fuc_all");
const add = $(".add");
const update = $(".update");
const deletes = $(".delete");
const view = $(".view");

Previous.onclick = () => {
  mainhome.style.display = "block";
  Previous.style.display = "none";
  info.style.display = "none";
  sala.style.display = "none";
  noti.style.display = "none";
  fuc_all.style.display = "none";
  bang.style.display = "none";
};
information.onclick = () => {
  mainhome.style.display = "none";
  info.style.display = "block";
  Previous.style.display = "block";
  fuc_all.style.display = "block";
  bang.style.display = "none";
  add.classList.add("addinfo");
  update.classList.add("updateinfo");
  deletes.classList.add("deleteinfo");
  view.classList.add("viewinfo");
  view.classList.remove("viewsalary");
  add.classList.remove("addsalary");
  update.classList.remove("updatesalary");
  deletes.classList.remove("deletesalary");
  table2.style.display = "block";
  table3.style.display = "block";
  table4.style.display = "block";
  table5.style.display = "block";
};
Salary.onclick = () => {
  mainhome.style.display = "none";
  sala.style.display = "block";
  Previous.style.display = "block";
  fuc_all.style.display = "block";
  bang.style.display = "none";
  view.classList.remove("viewinfo");
  add.classList.remove("addinfo");
  update.classList.remove("updateinfo");
  deletes.classList.remove("deleteinfo");
  view.classList.add("viewsalary");
  add.classList.add("addsalary");
  update.classList.add("updatesalary");
  deletes.classList.add("deletesalary");
  table2.style.display = "none";
  table3.style.display = "none";
  table4.style.display = "none";
  table5.style.display = "none";
};
Notifications.onclick = () => {
  mainhome.style.display = "none";
  noti.style.display = "block";
  Previous.style.display = "block";
  fuc_all.style.display = "none";
};

const uesername = $(".uesername");
const password = $(".password");
const submit = $(".submit");
const login = $(".login-box");
const main = $(".main");
const thongtinname = $(".thongtin_name");
const thongtinposition = $(".thongtin_position");
const hiden = $$(".hiden");
// sqlerver
const apiuser = "http://localhost:5000/getuser";
const apigetpersonal = "http://localhost:5000/getpersonal";
const apihistory = "http://localhost:5000/getjobhistory";
const apiemployment = "http://localhost:5000/getemployment";
const apiconact = "http://localhost:5000/getemergencycontacts";
const apibenefitplan = "http://localhost:5000/getbenefitplans";
const apiMigrationHistory = "http://localhost:5000/getMigrationHistory";
// sql
const apiemployee = "http://localhost:5000/getemployee";
const apipayrates = "http://localhost:5000/getpayrates";

const content_form = $$(".content_form");

const logins = () => {
  fetch(apiuser)
    .then((json) => json.json())
    .then((datalogin) => {
      submit.onclick = () => {
        const check = datalogin.some((element) => {
          if (
            element.User_Name == uesername.value &&
            element.Password == password.value
          ) {
            localStorage.setItem(
              "Active",
              JSON.stringify({
                active: element.Active,
                Name: element.User_Name,
              })
            );
            return true;
          }
        });
        const str = JSON.parse(localStorage.getItem("Active"));
        if (check) {
          login.style.display = "none";
          main.style.display = "block";
          thongtinname.innerText = str.Name;
          if (str.active === 1) {
            thongtinposition.innerText = "Phòng ban";
          } else if (str.active === 2) {
            thongtinposition.innerText = "Quản lý";
            content_form[0].style.display = "none";
            content_form[1].style.display = "none";
          } else if (str.active === 3) {
            thongtinposition.innerText = "Cổ đông";
            content_form[0].style.display = "none";
            content_form[1].style.display = "none";
          }
        } else {
          alert("Tài khoàn mật khẩu bạn nhập sai!!!");
        }
      };
    });
};

const Viewperson = () => {
  fetch(apigetpersonal)
    .then((json) => json.json())
    .then((data) => {
      const value = data
        .map((ele, index) => {
          return `<tr>
            <td>${ele.Employee_ID}</td>
            <td>${ele.First_Name}</td>
            <td>${ele.Last_Name}</td>
            <td>${ele.Middle_Initial}</td>
            <td>${ele.Address1}</td>
             <td>${ele.Address2}</td>
            <td>${ele.City}</td>
            <td>${ele.State}</td>
            <td>${ele.Zip}</td>
            <td>${ele.Email}</td>
             <td>${ele.Phone_Number}</td>
            <td>${ele.Social_Security_Number}</td>
            <td>${ele.Drivers_License}</td>
            <td>${ele.Marital_Status}</td>
            <td>${ele.Gender}</td>
            <td>${ele.Shareholder_Status}</td>
            <td>${ele.Benefit_Plans}</td>
            <td>${ele.Ethnicity}</td>
            </tr>`;
        })
        .join("");
      tables.innerHTML = `
        <h2>personal</h2>
        <tr>
        <th>Employee_ID</th> 
        <th>First_Name</th>
        <th>Last_Name</th>
        <th>Middle_Initial</th>
         <th>Address1</th>
         <th>Address2</th>
         <th>City</th>
         <th>State</th>
         <th>Zip</th>
          <th>Email</th>
         <th>Phone_Number</th>
         <th>Social_Security_Number</th>
         <th>Drivers_License</th>
         <th>Marital_Status</th>
           <th>Gender</th>
         <th>Shareholder_Status</th>
         <th>Benefit_Plans</th>
         <th>Ethnicity</th>
         </tr> 
        ${value}`;
      bang.style.display = "block";
      sala.style.display = "none";
      info.style.display = "none";
    });
};

const Viewhistory = () => {
  fetch(apihistory)
    .then((json) => json.json())
    .then((data) => {
      const value = data
        .map((ele, index) => {
          return `<tr>
            <td>${ele.ID}</td>
            <td>${ele.Employee_ID}</td>
            <td>${ele.Department}</td>
            <td>${ele.Division}</td>
            <td>${ele.Start_Date}</td>
            <td>${ele.End_Date}</td>
             <td>${ele.Job_Title}</td>
            <td>${ele.Supervisor}</td>
            <td>${ele.Job_Category}</td>
            <td>${ele.Location}</td>
            <td>${ele.Departmen_Code}</td>
             <td>${ele.Salary_Type}</td>
            <td>${ele.Pay_Period}</td>
            <td>${ele.Hours_per_Week}</td>
            <td>${ele.Hazardous_Training}</td>
            </tr>`;
        })
        .join("");
      table1.innerHTML = `<h2>History</h2>
        <tr>
        <th>ID</th>
        <th>Employee_ID</th> 
        <th>Department</th>
        <th>Division</th>
        <th>Start_Date</th>
         <th>End_Date</th>
         <th>Job_Title</th>
         <th>Supervisor</th>
         <th>Job_Category</th>
         <th>Location</th>
          <th>Departmen_Code</th>
         <th>Salary_Type</th>
         <th>Pay_Period</th>
         <th>Hours_per_Week</th>
         <th>Hazardous_Training</th>
         </tr> 
        ${value}`;
      bang.style.display = "block";
      sala.style.display = "none";
      info.style.display = "none";
    });
};
const Viewelement = () => {
  fetch(apiemployment)
    .then((json) => json.json())
    .then((data) => {
      const value = data
        .map((ele, index) => {
          return `<tr>
            <td>${ele.Employee_ID}</td>
            <td>${ele.Employment_Status}</td>
            <td>${ele.Hire_Date}</td>
            <td>${ele.Workers_Comp_Code}</td>
            <td>${ele.Termination_Date}</td>
            <td>${ele.Rehire_Date}</td>
             <td>${ele.Last_Review_Date}</td>
            </tr>`;
        })
        .join("");
      table2.innerHTML = `
      <h2>Employment</h2>
        <tr>
        <th>Employee_ID</th>
        <th>Employment_Status</th> 
        <th>Hire_Date</th>
        <th>Workers_Comp_Code</th>
        <th>Termination_Date</th>
         <th>Rehire_Date</th>
         <th>Last_Review_Date</th>
         </tr> 
        ${value}`;
      bang.style.display = "block";
      sala.style.display = "none";
      info.style.display = "none";
    });
};

const Viewemergencycontacts = () => {
  fetch(apiconact)
    .then((json) => json.json())
    .then((data) => {
      const value = data
        .map((ele, index) => {
          return `
          <tr>
            <td>${ele.Employee_ID}</td>
            <td>${ele.Emergency_Contact_Name}</td>
            <td>${ele.Phone_Number}</td>
            <td>${ele.Relationship}</td>
            </tr>`;
        })
        .join("");
      table3.innerHTML = `
      <h2>Viewemergencycontacts</h2>
        <tr>
        <th>Employee_ID</th>
        <th>Emergency_Contact_Name</th> 
        <th>Phone_Number</th>
        <th>Relationship</th>
         </tr> 
        ${value}`;
      bang.style.display = "block";
      sala.style.display = "none";
      info.style.display = "none";
    });
};

const Viewbenefitplan = () => {
  fetch(apibenefitplan)
    .then((json) => json.json())
    .then((data) => {
      const value = data
        .map((ele, index) => {
          return `<tr>
            <td>${ele.Benefit_Plan_ID}</td>
            <td>${ele.Plan_Name}</td>
            <td>${ele.Deductable}</td>
            <td>${ele.Percentage_CoPay}</td>
            </tr>`;
        })
        .join("");
      table4.innerHTML = `
      <h2>getbenefitplans</h2>
        <tr>
        <th>Benefit_Plan_ID</th>
        <th>Plan_Name</th> 
        <th>Deductable</th>
        <th>Percentage_CoPay</th>
         </tr> 
        ${value}`;
      bang.style.display = "block";
      sala.style.display = "none";
      info.style.display = "none";
    });
};

const viewMigrationHistory = () => {
  fetch(apiMigrationHistory)
    .then((json) => json.json())
    .then((data) => {
      const value = data
        .map((ele, index) => {
          return `<tr>
            <td>${ele.MigrationId}</td>
            <td>${ele.ContextKey}</td>
            <td>${ele.Model}</td>
            <td>${ele.ProductVersion}</td>
            </tr>`;
        })
        .join("");
      table5.innerHTML = `
      <h2>viewMigrationHistory</h2>
        <tr>
        <th>MigrationId</th>
        <th>ContextKey</th> 
        <th>Model</th>
        <th>ProductVersion</th>
         </tr> 
        ${value}`;
      bang.style.display = "block";
      sala.style.display = "none";
      info.style.display = "none";
    });
};

const viewemployee = () => {
  fetch(apiemployee)
    .then((json) => json.json())
    .then((data) => {
      const value = data
        .map((ele, index) => {
          return `<tr>
            <td>${ele.Employee_Number}</td>
            <td>${ele.idEmployee}</td>
            <td>${ele.Last_Name}</td>
            <td>${ele.First_Name}</td>
            <td>${ele.SSN}</td>
            <td>${ele.Pay_Rate}</td>
            <td>${ele.PayRates_id}</td>
            <td>${ele.Vacation_Days}</td>
             <td>${ele.Paid_To_Date}</td>
            <td>${ele.Paid_Last_Year}</td>
            </tr>`;
        })
        .join("");
      tables.innerHTML = `
      <h2>employee</h2>
        <tr>
        <th>Employee_Number</th>
        <th>idEmployee</th> 
        <th>Last_Name</th>
        <th>First_Name</th>
        <th>SSN</th>
        <th>Pay_Rate</th> 
        <th>PayRates_id</th>
        <th>Vacation_Days</th>
        <th>Paid_To_Date</th>
        <th>Paid_Last_Year</th>
         </tr> 
        ${value}`;
      bang.style.display = "block";
      sala.style.display = "none";
      info.style.display = "none";
    });
};
const viewpayrates = () => {
  fetch(apipayrates)
    .then((json) => json.json())
    .then((data) => {
      const value = data
        .map((ele, index) => {
          return `<tr>
            <td>${ele.idPay_Rates}</td>
            <td>${ele.Pay_Rate_Name}</td>
            <td>${ele.Value}</td>
            <td>${ele.Tax_Percentage}</td>
            <td>${ele.Pay_Type}</td>
            <td>${ele.Pay_Amount}</td>
            <td>${ele.PT_Level_C}</td>
            </tr>`;
        })
        .join("");
      table1.innerHTML = `
      <h2>payrates</h2>
        <tr>
        <th>idPay_Rates</th>
        <th>Pay_Rate_Name</th> 
        <th>Value</th>
        <th>Tax_Percentage</th>
        <th>Pay_Type</th>
        <th>Pay_Amount</th> 
        <th>PT_Level_C</th>
         </tr> 
        ${value}`;
      bang.style.display = "block";
      sala.style.display = "none";
      info.style.display = "none";
    });
};

logins();
let viewinfo;

const myinfo = setInterval(() => {
  viewinfo = $(".view.viewinfo");
  if (viewinfo !== null) {
    viewinfo.onclick = () => {
      Viewperson();
      Viewhistory();
      Viewelement();
      Viewemergencycontacts();
      Viewbenefitplan();
      viewMigrationHistory();
      clearInterval(myinfo);
    };
  }
}, 500);

const mysalary = setInterval(() => {
  let viewsalary = $(".view.viewsalary");
  if (viewsalary !== null) {
    viewsalary.onclick = () => {
      viewemployee();
      viewpayrates();
      clearInterval(mysalary);
    };
  }
}, 500);

const inputtext = $$(".inputtext");
const inputtextsalary = $$(".inputtextsalary");
function checked(element) {
  let boole;
  element.forEach((ele) => {
    if (ele.checked == true) {
      boole = ele;
    }
  });
  return boole;
}
const apibenefitplans = "http://localhost:5000/getbenefitplans";

const apiall = "http://localhost:5000/postall";

function themthongtin(){
  let inputinfo;
  let radioinfo;
  const myaddinfo = setInterval(() => {
    const addinfo = $(".add.addinfo");
    if (addinfo !== null) {
      addinfo.onclick = () => {
        const Gender = $$(".Gender");
        const Shareholder_Status = $$(".Shareholder_Status");
        const Hazardous_Training = $$(".Hazardous_Training");
        const arr = [
          checked(Gender),
          checked(Shareholder_Status),
          checked(Hazardous_Training),
        ];
        radioinfo = arr.reduce((prev, next) => {
          return { ...prev, [next.className]: Boolean(next.value) };
        }, {});
        inputinfo = [...inputtext].reduce((prev, next) => {
          return {
            ...prev,
            [next.id]: next.classList.contains("datetime")
              ? new Date(next.value).toLocaleDateString("en-US")
              : next.value,
          };
        }, {});
        console.log(inputinfo);
        fetch(apiall, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ ...inputinfo, ...radioinfo }),
        })
          .then((json) => json.json())
          .then((data) => {
            console.log(data);
          });
        clearInterval(myaddinfo);
      };
    }
  }, 500);
}
themthongtin();
const beplanid = "http://localhost:5000/getbenefitplanid";
const Benefit_Plans = $("#Benefit_Plans");

const salarydefau = $$(".salary");
const salaryemployee = $(".salaryemployee");
function autoloadsalaryemployee(){
  fetch("http://localhost:5000/getemployee")
    .then((json) => json.json())
    .then((data) => {
      salaryemployee.onblur = () => {
        data.forEach((data) => {
          if (salaryemployee.value == data.Employee_Number) {
            salarydefau[0].value = data.idEmployee;
            salarydefau[1].value = data.Last_Name;
            salarydefau[2].value = data.First_Name;
            salarydefau[3].value = data.SSN;
          }
        });
      };
      salaryemployee.onfocus = () => {
        data.forEach((data) => {
          if (salaryemployee.value == data.Employee_Number) {
            salarydefau[0].value = "";
            salarydefau[1].value = "";
            salarydefau[2].value = "";
            salarydefau[3].value = "";
          }
        });
      };
    });
}
autoloadsalaryemployee();
const txtinputsalary = $$(".inputtextsalary");
const apiupdatesalary = "http://localhost:5000/postsalary";

function themluong(){
  const myaddsalary = setInterval(() => {
  const addsalary = $(".add.addsalary");
  if (addsalary !== null) {
    addsalary.onclick = () => {
      inputsalary = [...txtinputsalary].reduce((prev, next) => {
        return { ...prev, [next.id]: next.value };
      }, {});
      console.log(inputsalary);
      fetch(apiupdatesalary, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputsalary }),
      })
        .then((json) => json.json())
        .then((data) => {
          console.log(data);
        });
      clearInterval(myaddsalary);
    };
  }
}, 500);
}
themluong();
// thong bao
const dayoffsala = $(".dayoffsala");
function songaynghi(){
  fetch(apiemployee)
    .then((json) => json.json())
    .then((data) => {
      const Vacation = data.map((value, index) => {
        if (value.Vacation_Days > 7) {
          return `<div class="dayoff">
                    <div class="dayoffimg"><img src="https://www.freeiconspng.com/thumbs/warning-icon-png/sign-warning-icon-png-7.png" alt=""></div>
                    <div class="name_dayoff">
                        <h3>${value.First_Name} ${value.Last_Name}</h3>
                        <h2>Mã nhân viên:${value.idEmployee}</h2>
                        <span>Số ngày nghỉ: <span>${value.Vacation_Days}</span></span>
                    </div>
                  </div>`;
        }
      });
      dayoffsala.innerHTML = "<h2>Cảnh báo ngày nghỉ</h2>"+Vacation.join("");
    });
}
songaynghi()
const apianniversary = "http://localhost:5000/getday";
const work_anniversary = $(".work_anniversary");
function kiniem(){
  fetch(apianniversary)
    .then((josn) => josn.json())
    .then((data) => {
      const birt = data.map((value) => {
        const date = new Date();
        const year = date.getUTCFullYear();
        return `
         <div class="infomation">
            <h2>Mã nhân viên:${value.Employee_ID}</h2>
            <h3>Kỉ niêm ${year - Number(value.Hire_Date.slice(0, 4))}</h3>
            <span>Kỉ niệm ngày làm việc: <span>${value.Hire_Date.slice(
              0,
              10
            )}</span></span>
          </div> 
        `;
      });
      work_anniversary.innerHTML = "<h2>Kỉ niệm ngày làm việc</h2>"+birt.join("");
    });
}
kiniem();

const btn_db = $(".btn_db");
const btn_link = $(".btn_db a");

btn_db.onclick = () => {
  btn_link.href = "./dashboard.html";
};
let Thanhtien=0;
const apiele = "http://localhost:5000/getemployee";
const apipay = "http://localhost:5000/getpayrates";
const apihis = "http://localhost:5000/getjobhistory";
const paytoday = "http://localhost:5000/putsotienthuc";

function updatetienthang(){
  fetch(apihis)
    .then((json) => json.json())
    .then((data) => {
      data.forEach((his) => {
        fetch(apiele)
          .then((json) => json.json())
          .then((data) => {
            data.forEach((ele) => {
              if (his.ID == ele.Employee_Number) {
                fetch(apipay)
                  .then((json) => json.json())
                  .then((data) => {
                    data.forEach((pay) => {
                      if (his.Department == pay.Pay_Rate_Name) {
                        var a = Number(pay.Pay_Amount);
                        var b = Number(pay.Tax_Percentage) / 100;
                        var c = Number(ele.Pay_Rate);
                         Thanhtien = a * (c - b);
                        if (Thanhtien)
                          fetch(paytoday, {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              "Thanhtien": Thanhtien,
                              "idsotienthuc": ele.Employee_Number,
                            }),
                          })
                            .then((json) => json.json())
                            .then((data) => {
                              console.log(data);
                            });
                      }
                    });
                  });
              }
            });
          });
      });
    });

}

const sotienthuc = "http://localhost:5000/getsotienthuc";
const salarytoday= "http://localhost:5000/putsalarytodate"

// setInterval(() => {
//   fetch(sotienthuc)
//     .then((json) => json.json())
//     .then((data) => {
//       data.forEach((value) => {
//         fetch(apiele)
//           .then((json) => json.json())
//           .then((data) => {
//             data.forEach((ele) => {
//               fetch(apipay)
//                 .then((json) => json.json())
//                 .then((data) => {
//                   data.forEach((pay) => {
//                     if (
//                       ele.Pay_Rate !== 0 &&
//                       pay.Pay_Amount !== 0 &&
//                       pay.Tax_Percentage !== 0 &&
//                       value.idsotienthuc == ele.Employee_Number
//                     ) {
                     
//                       updatetienthang(); 
//                       const st= setInterval(()=>{
//                         if(Thanhtien!=0 && value.idsotienthuc == ele.Employee_Number)
//                         var sum=0
//                           sum =sum+ Number(value.Thanhtien)+Thanhtien;
//                           console.log(sum);
//                           fetch(salarytoday, {
//                             method: "PUT",
//                             headers: {
//                               "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify({
//                               "Paid_To_Date": sum,
//                               "Employee_Number": value.idsotienthuc,
//                             }),
//                           })
//                             .then((json) => json.json())
//                             .then((data) => {
//                               console.log(data);
//                             });
//                             clearInterval(st)
//                     },1000)
                      
//                     }
//                   });
//                 });
//             });
//           });
//       });
//     });

// }, 3000);


