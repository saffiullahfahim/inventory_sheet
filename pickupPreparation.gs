const refreshWindow = `\`<body><style>

  body{
    font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
    margin: 0;
    width: 100%;
    flex-direction: column;
  }

.time{
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}
</style>
<div id="Status" class="time">\${status}</div>
<br>
<div class="time" id="scriptTime"></div>
<div class="time" id="time"></div>
<script>
      const time = document.querySelector("#time");
      const Status = document.querySelector("#Status");
      const scriptTime = document.querySelector("#scriptTime");

      let start;
      let status = false;
      let timeout;

      const Finised2 = (s_time) => {
        scriptTime.innerText = "Script Time: " + s_time + " ms";
        time.innerText = "Total Time: " + (new Date() - start) + " ms";
        Status.innerText = "Booking...";
        google.script.run
          .withSuccessHandler(closePopup)
          .Book(\${value});
      }

      const closePopup = (s_time) => {
        status = true;
        clearTimeout(timeout);
        scriptTime.innerText = "Script Time: " + s_time + " ms";
        time.innerText = "Total Time: " + (new Date() - start) + " ms";
        setTimeout(() => {google.script.host.close()}, 500);
      }

      const setTime = () => {
        if(status == false){
          time.innerText = "Total Time: " + (new Date() - start) + " ms";
          timeout = setTimeout(setTime, 0);
        }
      }

      window.onload = (e) => {
        e.preventDefault();
        start = new Date();
        google.script.run.withSuccessHandler(\${successFun})
          .\${type}(\${value});
        // google.script.run
        //   .withSuccessHandler(closePopup)
        //   .pickupPreparation();
        status = false;
        setTime();
      };
    </script>
    </body>
\``;


const openNewWindow = (status, successFun, type, value, dialog) => {
  let htmlOutput = HtmlService
    .createHtmlOutput(eval(refreshWindow))
    .setWidth(250)
    .setHeight(150);
  console.log(htmlOutput)
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, dialog);
}

const openPickupPreparation = () => {
  openNewWindow("Refreshing Pickup Preparation..", "closePopup", "pickupPreparation", "", "Refresh Pickup")
  // let htmlOutput = HtmlService
  //   .createHtmlOutput(refreshWindow)
  //   .setWidth(250)
  //   .setHeight(150);
  //   console.log(htmlOutput)
  // SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Refresh Pickup");
}

const getDate = (date) => {
  let date_ = new Date(date);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return String(date_.getDate()).padStart(2, "0") + months[date_.getMonth()] + date_.getFullYear().toString().slice(-2)
}

const getColor = (date) => {
  let currentDate = new Date(date);
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  let weekNumber = Math.ceil(days / 7);
  // Logger.log(weekNumber)
  return (weekNumber % 2) ? "#f4cccc" : "#d9d2e9";
}

const GetOrderNO = (data) => {
  let order = data.substr(0, data.indexOf("]") + 1);
  // order = order.slice(0, order.indexOf("]"));

  return order;
}

const GetOrderNoOnly = (data) => {
  return Number(GetOrderNO(String(data).trim()).replace("-", "").replace("#", "").replace("[", "").replace("]", "").trim())
}

const pickupPreparation = () => {
  let time = new Date()
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const inventoryOrder = ss.getSheetByName('inventory and order');
  const preparationSheet = ss.getSheetByName("Pickup preparation");
  const inventoryOrderLast = inventoryOrder.getLastRow();
  let preparationLast = preparationSheet.getLastRow();
  if (preparationLast == 0) preparationLast = 1;
  const startDate$ = inventoryOrder.getRange("D1").getDisplayValue();
  const now = new Date().toLocaleDateString();

  const preWithNow = new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)).toLocaleDateString();

  let startDate = (new Date(preWithNow) - new Date(startDate$)) / (24 * 60 * 60 * 1000);

  // rule
  let range = ss.getSheetByName("Template").getRange(`J2:J11`);
  let rule = SpreadsheetApp.newDataValidation().requireValueInRange(range).build();


  // inventory data
  const Data = inventoryOrder.getRange(3, 3, inventoryOrderLast - 2, 31 + startDate + 1).getDisplayValues();

  // preparation data

  const PreparationRange = preparationSheet.getRange(4, 1, preparationLast, 14 * 3);
  const PreparationValues = PreparationRange.getDisplayValues();

  const PreviousData = {};

  const PreviousStored = {};

  const PreviousReturnDate = {};

  if (PreparationValues[0][0] != "") {
    for (let date = 0; date < PreparationValues[0].length; date += 3) {
      let date_ = new Date(PreparationValues[0][date] + new Date().getFullYear()).toLocaleDateString();
      if (new Date(PreparationValues[0][date]).getFullYear() == new Date().getFullYear() || new Date(PreparationValues[0][date]).getFullYear() == new Date().getFullYear() - 1) {
        date_ = new Date(PreparationValues[0][date]).toLocaleDateString();
      }
      // console.log(date_)
      PreviousData[date_] = {};
      PreviousStored[date_] = {};
      PreviousStored[date_].data = [];
      PreviousStored[date_].color = [];
      PreviousStored[date_].rule = [];
      PreviousStored[date_].wrap = [];
      PreviousStored[date_].align = [];
      PreviousStored[date_].font = [];

      let blankTime;
      let blankTimeDate;
      let nowDate;
      if (date == 0) {
        blankTime = 0;
        blankTimeDate = 1;
        nowDate = date_;
      }
      for (let i = 1; i < PreparationValues.length; i++) {
        // console.log(PreparationValues[i]);
        // console.log(date_)
        if (String(PreparationValues[i][date + 1]).trim() == "") {
          // console.log(blankTime)
          if (date == 0 && blankTime < 5 && blankTimeDate <= 3) {
            blankTime++;
            continue;
          } else {
            break;
          }
        }

        if (date == 0 & blankTime == 5 && blankTimeDate <= 3) {
          date_ = new Date(new Date(nowDate).getTime() - (blankTimeDate * 24 * 60 * 60 * 1000)).toLocaleDateString();
          PreviousStored[date_] = {};
          PreviousStored[date_].data = [];
          PreviousStored[date_].color = [];
          PreviousStored[date_].rule = [];
          PreviousStored[date_].wrap = [];
          PreviousStored[date_].align = [];
          PreviousStored[date_].font = [];
          blankTimeDate++;
          blankTime = 0;
        }

        PreviousData[String(PreparationValues[i][date]).trim() + GetOrderNO(String(PreparationValues[i][date + 1]).trim())] = String(PreparationValues[i][date + 2]).trim();

        if (String(PreparationValues[i][date + 1]).trim().indexOf("-") >= 0 && GetOrderNO(String(PreparationValues[i][date + 1]).trim())[0] == "-" && isNaN(GetOrderNoOnly(PreparationValues[i][date + 1])) == false) {
          if (String(PreparationValues[i][date + 1]).trim().toLowerCase().indexOf("alter") >= 0) {
            PreviousStored[date_].color.push(["#ffffff", "#B7E1CD", "#ffffff"]);
          } else {
            PreviousStored[date_].color.push(["#ffffff", "#ffffff", "#ffffff"]);
          }
          PreviousStored[date_].rule.push([rule]);
          PreviousStored[date_].wrap.push([true, true, false]);
          PreviousStored[date_].align.push(["middle", "middle", "middle"]);
          PreviousStored[date_].font.push(["bold", "bold", "bold"]);
          PreviousStored[date_].data.push([String(PreparationValues[i][date]).trim(), String(PreparationValues[i][date + 1]).trim(), String(PreparationValues[i][date + 2]).trim()]);
          if(String(PreparationValues[i][date + 2]).trim().toLowerCase() != "returned"){
            if(PreviousReturnDate[String(PreparationValues[i][date]).trim()]) PreviousReturnDate[String(PreparationValues[i][date]).trim()].push(date_);
            else PreviousReturnDate[String(PreparationValues[i][date]).trim()] = [date_];
          }
        } else if (String(PreparationValues[i][date + 1]).trim().indexOf("#") >= 0 && isNaN(GetOrderNoOnly(PreparationValues[i][date + 1])) == false) {
          if (String(PreparationValues[i][date + 1]).trim().toLowerCase().indexOf("alter") >= 0) {
            PreviousStored[date_].color.push(["#ffffff", "#B7E1CD", "#ffffff"]);
          } else {
            PreviousStored[date_].color.push(["#ffffff", "#ffffff", "#ffffff"]);
          }
          PreviousStored[date_].rule.push([rule]);
          PreviousStored[date_].wrap.push([true, true, false])
          PreviousStored[date_].align.push(["middle", "middle", "middle"])
          PreviousStored[date_].font.push(["bold", "bold", "bold"]);
          PreviousStored[date_].data.push([String(PreparationValues[i][date]).trim(), String(PreparationValues[i][date + 1]).trim(), String(PreparationValues[i][date + 2]).trim()]);
        }
      }
    }
  }

  // Logger.log(PreviousData)

  let startTime = new Date(startDate$).getTime();

  const DateWise = {
    data: {},
    color: {},
    rule: {},
    wrap: {},
    align: {},
    font: {},
    date: []
  };

  Data.forEach((v, i) => {
    for (let i = 0; i < 17; i++) {
      let dateNo = startDate + i;
      // console.log(dateNo)
      let date = new Date(startTime + (24 * 60 * 60 * 1000 * dateNo)).toLocaleDateString();
      // console.log(date)
      let previousData = "";
      let previousByColor = "#fff";

      // if(now == date) console.log(PreviousData[date])
      if (PreviousData[String(v[0]).trim() + GetOrderNO(String(v[dateNo + 1]).trim())]) {
        // console.log(String(v[0]).trim())
        previousData = PreviousData[String(v[0]).trim() + GetOrderNO(String(v[dateNo + 1]).trim())];
        // console.log(String(v[0]).trim() + GetOrderNO(String(v[dateNo + 1]).trim()) + " " + previousData);
      }

      if(GetOrderNO(String(v[dateNo + 1]).trim())[0] != "-" && previousData.toLowerCase() != "returned" && PreviousReturnDate[String(v[0]).trim()]){
        const PreviousReturnDateData = PreviousReturnDate[String(v[0]).trim()];
        let presentDate = new Date(date);
        for(let PreviousReturnDateDataValue of PreviousReturnDateData){
          let returnDate = new Date(PreviousReturnDateDataValue);
          let months  = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          if(presentDate.getTime() - 24 * 60 * 60 * 1000 == returnDate.getTime()){
            previousData = "b2b";
            previousByColor = "#f00";
          } else if(presentDate.getTime() > returnDate.getTime()){
            previousData = String(returnDate.getDate())  + months[returnDate.getMonth()] + returnDate.getFullYear().toString().slice(-2);
            if(returnDate.getFullYear() == presentDate.getFullYear()){
              previousData = String(returnDate.getDate())  + months[returnDate.getMonth()];
            }

            previousData += " return";
            previousByColor = "#f00";
          }
        }
      }

      // previousData = ""
      if (DateWise.data[date] == undefined) {
        DateWise.data[date] = {
          pickup: [],
          return: []
        }

        DateWise.color[date] = {
          pickup: [],
          return: []
        }

        DateWise.rule[date] = {
          pickup: [],
          return: []
        }

        DateWise.wrap[date] = {
          pickup: [],
          return: []
        }

        DateWise.font[date] = {
          pickup: [],
          return: []
        }

        DateWise.align[date] = {
          pickup: [],
          return: []
        }
      }

      if (dateNo >= 0) {
        if (v[dateNo + 1].indexOf("-") >= 0 && GetOrderNO(String(v[dateNo + 1]).trim())[0] == "-" && isNaN(GetOrderNoOnly(v[dateNo + 1])) == false) {
          DateWise.data[date].return.push([String(v[0]).trim(), String(v[dateNo + 1]).trim(), previousData]);
          // console.log(date + " " +String(v[dateNo + 1]).trim().toLowerCase())
          if (String(v[dateNo + 1]).trim().toLowerCase().indexOf("alter") >= 0) {
            // console.log("789")
            DateWise.color[date].return.push(["#ffffff", "#B7E1CD", "#ffffff", GetOrderNoOnly(v[dateNo + 1])]);
          } else DateWise.color[date].return.push(["#ffffff", "#ffffff", "#ffffff", GetOrderNoOnly(v[dateNo + 1])]);
          DateWise.rule[date].return.push([rule]);
          DateWise.wrap[date].return.push([true, true, false]);
          DateWise.align[date].return.push(["middle", "middle", "middle"])
          DateWise.font[date].return.push(["bold", "bold", "bold"]);
        } else if (v[dateNo + 1].indexOf("#") >= 0 && isNaN(GetOrderNoOnly(v[dateNo + 1])) == false) {
          // console.log(date + " " +String(v[dateNo + 1]).trim().toLowerCase())
          DateWise.data[date].pickup.push([String(v[0]).trim(), String(v[dateNo + 1]).trim(), previousData]);
          //DateWise.color[date].pickup.push(["#6aa84f", "#6aa84f", "#6aa84f"]);
          if (String(v[dateNo + 1]).toLowerCase().indexOf("alter") >= 0) {
            DateWise.color[date].pickup.push(["#ffffff", "#B7E1CD", previousByColor, GetOrderNoOnly(v[dateNo + 1])]);
          } else DateWise.color[date].pickup.push(["#ffffff", "#ffffff", previousByColor, GetOrderNoOnly(v[dateNo + 1])]);
          DateWise.rule[date].pickup.push([rule]);
          DateWise.wrap[date].pickup.push([true, true, false]);
          DateWise.align[date].pickup.push(["middle", "middle", "middle"])
          DateWise.font[date].pickup.push(["bold", "bold", "bold"]);
        }
      } else {
        DateWise.data[date].pickup = [["", "", ""]];
        DateWise.color[date].pickup = [["#ffffff", "#ffffff", "#ffffff"]];
        DateWise.rule[date].pickup = [[rule]];
        DateWise.wrap[date].pickup = [[true, true, false]];
        DateWise.align[date].pickup = [["middle", "middle", "middle"]]
        DateWise.font[date].pickup = [["bold", "bold", "bold"]];
      }

      // if (dateNo >= 0 && DateWise.data[date]) {
      //   if (v[dateNo + 1].indexOf("-") >= 0) {
      //     DateWise.data[date].push([String(v[0]).trim(), String(v[dateNo + 1]).trim(), previousData]);
      //     DateWise.color[date].push(["#ffffff", "#ffffff", "#ffffff"]);
      //     DateWise.rule[date].push([rule]);
      //     DateWise.wrap[date].push([true, true, false]);
      //     DateWise.align[date].push(["middle", "middle", "middle"])
      //     DateWise.font[date].push(["normal", "normal", "normal"]);
      //   } else if (v[dateNo + 1].indexOf("#") >= 0) {
      //     DateWise.data[date].push([String(v[0]).trim(), String(v[dateNo + 1]).trim(), previousData]);
      //     DateWise.color[date].push(["#6aa84f", "#6aa84f", "#6aa84f"]);
      //     DateWise.rule[date].push([rule]);
      //     DateWise.wrap[date].push([true, true, false]);
      //     DateWise.align[date].push(["middle", "middle", "middle"])
      //     DateWise.font[date].push(["normal", "normal", "normal"]);
      //   }
      // } else if (dateNo >= 0) {
      //   if (v[dateNo + 1].indexOf("-") >= 0) {
      //     DateWise.data[date] = [[String(v[0]).trim(), String(v[dateNo + 1]).trim(), previousData]];
      //     DateWise.color[date] = [["#ffffff", "#ffffff", "#ffffff"]];
      //     DateWise.rule[date] = [[rule]];
      //     DateWise.wrap[date] = [[true, true, false]];
      //     DateWise.align[date] = [["middle", "middle", "middle"]]
      //     DateWise.font[date] = [["normal", "normal", "normal"]];
      //   } else if (v[dateNo + 1].indexOf("#") >= 0) {
      //     DateWise.data[date] = [[String(v[0]).trim(), String(v[dateNo + 1]).trim(), previousData]];
      //     DateWise.color[date] = [["#6aa84f", "#6aa84f", "#6aa84f"]];
      //     DateWise.rule[date] = [[rule]];
      //     DateWise.wrap[date] = [[true, true, false]];
      //     DateWise.align[date] = [["middle", "middle", "middle"]]
      //     DateWise.font[date] = [["normal", "normal", "normal"]];
      //   }
      // } else {
      //   DateWise.data[date] = [["", "", ""]];
      //   DateWise.color[date] = [["#ffffff", "#ffffff", "#ffffff"]];
      //   DateWise.rule[date] = [[rule]];
      //   DateWise.wrap[date] = [[true, true, false]];
      //   DateWise.align[date] = [["middle", "middle", "middle"]]
      //   DateWise.font[date] = [["normal", "normal", "normal"]];
      // }
      if (DateWise.date.indexOf(date) == -1) DateWise.date.push(date)
    }
  });

  // PreparationRange.clearFormat();
  preparationSheet.getRange(3, 1, 4000, 14 * 3).setBorder(false, false, false, false, false, false).setBackground("white").clearDataValidations().clear({ contentsOnly: true })

  const blankFourRow = [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]];
  const blankFourRule = [[rule], [rule], [rule], [rule]];
  const blankFourWrap = [[false, false, false], [false, false, false], [false, false, false], [false, false, false]];
  const blankFourAlign = [["middle", "middle", "middle"], ["middle", "middle", "middle"], ["middle", "middle", "middle"], ["middle", "middle", "middle"]];

  const blankFourFont = [["normal", "normal", "normal"], ["normal", "normal", "normal"], ["normal", "normal", "normal"], ["normal", "normal", "normal"]]

  let index = 1;
  for (let date of DateWise.date) {
    let getColor_ = getColor(date);
    if(new Date(date).getTime() < new Date(now).getTime()){
      getColor_ = "#A9A9A9";
    }
    //console.log(getDate(date));
    DateWise.data[date].pickup.sort((a, b) => {
      return GetOrderNoOnly(a[1]) - GetOrderNoOnly(b[1]);
    })

    DateWise.data[date].return.sort((a, b) => {
      return GetOrderNoOnly(a[1]) - GetOrderNoOnly(b[1]);
    })

    DateWise.color[date].pickup.sort((a, b) => {
      return a[3] - b[3];
    })

    DateWise.color[date].return.sort((a, b) => {
      return a[3] - b[3];
    })

    DateWise.color[date].pickup.forEach((v, i, arr) => {
      v.pop()
      arr[i] = v;
    })

    DateWise.color[date].return.forEach((v, i, arr) => {
      v.pop()
      arr[i] = v;
    })


    let dateWiseData = [[getDate(date), "", ""], ...DateWise.data[date].pickup, ...DateWise.data[date].return];
    let dateWiseColor = [[getColor_, getColor_, getColor_], ...DateWise.color[date].pickup, ...DateWise.color[date].return];
    let dateWiseRule = [...DateWise.rule[date].pickup, ...DateWise.rule[date].return];
    let dateWiseWrap = [[false, false, false], ...DateWise.wrap[date].pickup, ...DateWise.wrap[date].return];
    let dateWiseAlign = [["middle", "middle", "middle"], ...DateWise.align[date].pickup, ...DateWise.align[date].return];
    let dateWiseFont = [["bold", "normal", "normal"], ...DateWise.font[date].pickup, ...DateWise.font[date].return];

    if(new Date(date).getTime() < new Date(now).getTime()) {
      PreviousStored[date] = {
        data: dateWiseData,
        color: dateWiseColor,
        rule:  dateWiseRule,
        wrap: dateWiseWrap,
        align: dateWiseAlign,
        font: dateWiseFont
      }

      // console.log(PreviousStored[date].wrap.length)
      continue;
    }
    if (date == now) {
      for (let preDate = 1; preDate <= 3; preDate++) {
        let previous = new Date(new Date(date).getTime() - (preDate * 24 * 60 * 60 * 1000)).toLocaleDateString();
        if (PreviousStored[previous]) {
          dateWiseData = [...dateWiseData, ...blankFourRow, ...PreviousStored[previous].data];
          dateWiseColor = [...dateWiseColor, ...blankFourRow, ...PreviousStored[previous].color];
          dateWiseRule = [...dateWiseRule, [rule], ...blankFourRule, ...PreviousStored[previous].rule];
          dateWiseWrap = [...dateWiseWrap, ...blankFourWrap, ...PreviousStored[previous].wrap];
          dateWiseAlign = [...dateWiseAlign, ...blankFourAlign, ...PreviousStored[previous].align];
          dateWiseFont = [...dateWiseFont, ...blankFourFont, ...PreviousStored[previous].font];
        }
      }
    }

    // console.log(date + " | " + dateWiseRule.length)


    if (dateWiseRule.length) {
      const ruleRange = preparationSheet.getRange(5, index + 2, dateWiseRule.length, 1);
      ruleRange.setDataValidations(dateWiseRule);
    }
    const range = preparationSheet.getRange(4, index, dateWiseData.length, 3);

    /// preparationSheet.getRange(1, index, preparationLast, 3).setBorder(false, false, false, false, false, false);
    // console.log(range.getA1Notation())
    range.setValues(dateWiseData).setBackgrounds(dateWiseColor).setVerticalAlignment("middle").setFontWeight("bold").setFontSize(8);
    // range.setWrapStrategy();
    range.setBorder(true, true, true, true, false, false);
    if (dateWiseData.length - 1 > 0) preparationSheet.getRange(5, index, dateWiseData.length - 1, 3).setBorder(true, true, true, true, false, false);
    index += 3;
  }

  preparationSheet.setActiveRange(preparationSheet.getRange("A1"))

  return new Date() - time;
}


const testWeek = () => {
  Logger.log("1 : " + GetOrderNO("[#2001655] Alter back waist 1 SUB Beauty Halloween Wynon Ho 0123284868"))
}
