const getPreparationData = (type) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const preparationSheet = ss.getSheetByName("Pickup preparation");
  let preparationLast = preparationSheet.getLastRow();
  const PreparationRange = preparationSheet.getRange(4, 1, preparationLast, 14 * 3);
  const PreparationValues = PreparationRange.getDisplayValues();

  const PreparationData = {
    pickup: {

    },
    return: {

    }
  };

  if (PreparationValues[0][0] != "") {
    for (let date = 0; date < PreparationValues[0].length; date += 3) {
      let date_ = new Date(PreparationValues[0][date] + new Date().getFullYear()).toLocaleDateString();
      if (new Date(PreparationValues[0][date]).getFullYear() == new Date().getFullYear() || new Date(PreparationValues[0][date]).getFullYear() == new Date().getFullYear() - 1) {
        date_ = new Date(PreparationValues[0][date]).toLocaleDateString();
      }
      // console.log(date_)

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
          blankTimeDate++;
          blankTime = 0;
        }

        let mobileNo = String(PreparationValues[i][date + 1]).trim().match(/[+]?\d+$/);
        if (mobileNo) {
          mobileNo = mobileNo[0];
        } else {
          mobileNo = "phone";
        }

        const data = [String(PreparationValues[i][date + 1]).trim()]

        if (String(PreparationValues[i][date + 1]).trim().indexOf("-") >= 0 && GetOrderNO(String(PreparationValues[i][date + 1]).trim())[0] == "-" && isNaN(GetOrderNoOnly(PreparationValues[i][date + 1])) == false) {
          let option = "No";
          if (String(PreparationValues[i][date + 2]).trim().toLowerCase() == "returned") {
            option = "Yes";
          }

          data.push(option);

          if (PreparationData.return[mobileNo] == undefined) {
            PreparationData.return[mobileNo] = {}
          }
          if (PreparationData.return[mobileNo][GetOrderNoOnly(PreparationValues[i][date + 1])]) {
            PreparationData.return[mobileNo][GetOrderNoOnly(PreparationValues[i][date + 1])].data[String(PreparationValues[i][date]).trim()] = data;
          } else {
            PreparationData.return[mobileNo][GetOrderNoOnly(PreparationValues[i][date + 1])] = {
              date: date_,
              data: {[String(PreparationValues[i][date]).trim()] : data}
            }
          }
        } else if (String(PreparationValues[i][date + 1]).trim().indexOf("#") >= 0 && isNaN(GetOrderNoOnly(PreparationValues[i][date + 1])) == false) {
          let option = "No";
          if (String(PreparationValues[i][date + 2]).trim().toLowerCase() == "pickup ady") {
            option = "Yes";
          }

          data.push(option);
          if (PreparationData.pickup[mobileNo] == undefined) {
            PreparationData.pickup[mobileNo] = {}
          }
          if (PreparationData.pickup[mobileNo][GetOrderNoOnly(PreparationValues[i][date + 1])]) {
            PreparationData.pickup[mobileNo][GetOrderNoOnly(PreparationValues[i][date + 1])].data[String(PreparationValues[i][date]).trim()] = data;
          } else {
            PreparationData.pickup[mobileNo][GetOrderNoOnly(PreparationValues[i][date + 1])] = {
              date: date_,
              data: {[String(PreparationValues[i][date]).trim()] : data}
            }
          }
        }
      }
    }
  }

  return JSON.stringify(PreparationData[type]);
}

const pickup_or_return_submit = (order, data, type) => {
  let start = new Date();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const preparationSheet = ss.getSheetByName("Pickup preparation");
  let preparationLast = preparationSheet.getLastRow();
  const PreparationRange = preparationSheet.getRange(4, 1, preparationLast, 14 * 3);
  const PreparationValues = PreparationRange.getDisplayValues();
  let rowStart = 0;
  let columnStart = 0;
  const finalData = [];
  let condition = true;

  if (PreparationValues[0][0] != "") {
    for (let date = 0; date < PreparationValues[0].length; date += 3) {
      let date_ = new Date(PreparationValues[0][date] + new Date().getFullYear()).toLocaleDateString();
      if (new Date(PreparationValues[0][date]).getFullYear() == new Date().getFullYear() || new Date(PreparationValues[0][date]).getFullYear() == new Date().getFullYear() - 1) {
        date_ = new Date(PreparationValues[0][date]).toLocaleDateString();
      }
      // console.log(date_)

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
          blankTimeDate++;
          blankTime = 0;
        }

        if (String(PreparationValues[i][date + 1]).trim().indexOf("-") >= 0 && GetOrderNO(String(PreparationValues[i][date + 1]).trim())[0] == "-" && isNaN(GetOrderNoOnly(PreparationValues[i][date + 1])) == false && type == "return" && GetOrderNoOnly(PreparationValues[i][date + 1]) == order) {
          if(data[PreparationValues[i][date]] == "Yes") PreparationValues[i][date + 2] = "returned";
          else if(String(PreparationValues[i][date + 2]).trim().toLowerCase() == "returned") PreparationValues[i][date + 2] = "";
          rowStart = i + 4;
          columnStart = date + 1;
          finalData.push([PreparationValues[i][date], PreparationValues[i][date + 1], PreparationValues[i][date + 2]]);
        } else if (String(PreparationValues[i][date + 1]).trim().indexOf("#") >= 0 && GetOrderNO(String(PreparationValues[i][date + 1]).trim())[0] != "-" && isNaN(GetOrderNoOnly(PreparationValues[i][date + 1])) == false && type == "pickup" && GetOrderNoOnly(PreparationValues[i][date + 1]) == order) {
          if(data[PreparationValues[i][date]] == "Yes") PreparationValues[i][date + 2] = "pickup ady";
          else if (String(PreparationValues[i][date + 2]).trim().toLowerCase() == "pickup ady") PreparationValues[i][date + 2] = "";

          rowStart = i + 4;
          columnStart = date + 1;
          finalData.push([PreparationValues[i][date], PreparationValues[i][date + 1], PreparationValues[i][date + 2]]);
        }
      }
    }
  }


  const range = preparationSheet.getRange(rowStart, columnStart, finalData.length, 3);
  range.setValues(finalData);

  for(let x in data){
    if(data[x] == "No"){
      condition = false;
      break;
    }
  }

  if(type == "return"){
    const logs = ss.getSheetByName('Logs');
    const lastLogs = logs.getLastRow();
    let orderNo = Number(order) - 1003000 + 2;
    console.log(orderNo)

    if(orderNo > 1 & orderNo <= lastLogs){
      console.log(orderNo)
      let orderRange = logs.getRange(orderNo, 1, 1, 2);

      if(condition){
        orderRange.setValues([[new Date().toISOString(), "COMPLETED"]]);
      } else{
        orderRange.setValues([[new Date().toISOString(), "UPDATED"]]);
      }
    }
  }

  preparationSheet.setActiveRange(range);

  return new Date() - start;
}


const test0000 = () => {
  Logger.log(pickup_or_return_submit(1003004 , {"Gwen wedding floral print": 'Yes'}, "return"))
}


