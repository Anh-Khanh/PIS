var ctx = document.getElementById("myChart").getContext("2d");
var today = document.getElementById("today").getContext("2d");

const mygender = document.getElementById("mygender").getContext("2d");

const apiele = "http://localhost:5000/getemployee";
const apipay = "http://localhost:5000/getpayrates";
const apihis = "http://localhost:5000/getjobhistory";
const paytoday = "http://localhost:5000/putemployee";
fetch(apiele)
  .then(json=>json.json())
  .then(data=>{
    let paytoday=0;
    let paylastyear = 0;

    data.forEach(value=>{
      paytoday += Number(value.Paid_To_Date);
      paylastyear += Number(value.Paid_Last_Year);
    })
    console.log(paytoday, paylastyear);
     new Chart(today, {
       type: "bar",
       data: {
         labels: ["Paid_To_Date", "Paid_Last_Year"],
         datasets: [
           {
             label: "# of Votes",
             data: [paytoday, paylastyear],
             backgroundColor: [
               "rgba(255, 99, 132, 0.2)",
               "rgba(54, 162, 235, 0.2)",
             ],
             borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
             borderWidth: 1,
           },
         ],
       },
       options: {
         scales: {
           yAxes: [
             {
               ticks: {
                 beginAtZero: true,
               },
             },
           ],
         },
       },
     });
  })



// fetch(apihis)
//   .then((json) => json.json())
//   .then((data) => {
//     data.forEach(his=>{
//       fetch(apiele)
//       .then((json) => json.json())
//       .then((data)=>{
//         data.forEach(ele=>{
//           if(his.ID == ele.Employee_Number){
//            fetch(apipay).then((json) => json.json())
//            .then(data=>{
//              data.forEach(pay=>{
//                if(his.Department == pay.Pay_Rate_Name){
//                  var a = Number(pay.Pay_Amount);
//                  var b = Number(pay.Tax_Percentage)/100;
//                  var c = Number(ele.Pay_Rate);
//                  const Paid_To_Date = a*(c-b);
//                  console.log(Paid_To_Date);
//                  if (Paid_To_Date)
//                    fetch(paytoday, {
//                      method: "PUT",
//                      headers: {
//                        "Content-Type": "application/json",
//                      },
//                      body: JSON.stringify({
//                        "Paid_To_Date": Paid_To_Date,
//                        "Employee_Number": ele.Employee_Number,
//                      }),
//                    })
//                      .then((json) => json.json())
//                      .then((data) => {
//                        console.log(data);
//                      });
//                }
//              })
//            })
            
//           }
//         })

//       })
//     })
   
//   });



const spidepa = "http://localhost:5000/getjobhistory";
fetch(spidepa)
  .then(json=>json.json())
  .then((datas)=>{
    var xyz = datas.map((value) => {
      return value.Department;
    });

    var ab = xyz.reduce((prev, next) => {
      return {...prev, [next]: [...prev[next] || [], next]}
    }, {})

    for (const i in ab) {
      ab[i] = ab[i].length
    }
    let name= [];
    let dem =[];
   for(const i in ab){
     name.push(i)
    //  console.log(ab[i]);
    dem.push(ab[i])
   }


    // console.log(xyz, ab);
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: name,
        datasets: [
          {
            label: "# of Votes",
            data: dem,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  })


  
const pernal = "http://localhost:5000/getpersonal";
fetch(pernal)
  .then((json)=>json.json())
  .then(data=>{
    let nam=0;
    let nu =0;
    data.forEach(element => {
        if(element.Gender == true){
            nam++;
        }
        else {
          nu++;
        }
    });
    new Chart(mygender, {
      type: "pie",
      data: {
        labels: ["Nam", "Nữ"],
        datasets: [
          {
            label: "My First Dataset",
            data: [nam,nu],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)"
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  })


