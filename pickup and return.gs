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
              date: getDate(date_),
              data: { [String(PreparationValues[i][date]).trim()]: data }
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
              date: getDate(date_),
              data: { [String(PreparationValues[i][date]).trim()]: data }
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
  let rowStart_ = 0;
  let columnStart_ = 0;
  const finalData = [];
  const finalColor = [];
  const finalData_ = { color: [], data: [], cell: [] };
  let condition = true;

  const PreviousReturnDate = {};

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

        if (String(PreparationValues[i][date + 1]).trim().indexOf("-") >= 0 && GetOrderNO(String(PreparationValues[i][date + 1]).trim())[0] == "-" && isNaN(GetOrderNoOnly(PreparationValues[i][date + 1])) == false && data[PreparationValues[i][date]] && String(PreparationValues[i][date + 2]).trim().toLowerCase() != "returned") {
          if (data[PreparationValues[i][date]] == "Yes") PreviousReturnDate[String(PreparationValues[i][date]).trim()] = { date: date_, condition: true };
          else PreviousReturnDate[String(PreparationValues[i][date]).trim()] = { date: date_, condition: false };

        }

        if (String(PreparationValues[i][date + 1]).trim().indexOf("-") >= 0 && GetOrderNO(String(PreparationValues[i][date + 1]).trim())[0] == "-" && isNaN(GetOrderNoOnly(PreparationValues[i][date + 1])) == false && type == "return" && GetOrderNoOnly(PreparationValues[i][date + 1]) == order) {
          console.log(PreparationValues[i][date].trim() + " " + data[PreparationValues[i][date].trim()])
          if (data[PreparationValues[i][date].trim()] == "Yes") PreparationValues[i][date + 2] = "returned";
          else if (String(PreparationValues[i][date + 2]).trim().toLowerCase() == "returned") PreparationValues[i][date + 2] = "";
          if (rowStart == 0) rowStart = i + 4;
          if (columnStart == 0) columnStart = date + 1;
          finalData.push([PreparationValues[i][date], PreparationValues[i][date + 1], PreparationValues[i][date + 2]]);

        } else if (String(PreparationValues[i][date + 1]).trim().indexOf("#") >= 0 && GetOrderNO(String(PreparationValues[i][date + 1]).trim())[0] != "-" && isNaN(GetOrderNoOnly(PreparationValues[i][date + 1])) == false && type == "pickup" && GetOrderNoOnly(PreparationValues[i][date + 1]) == order) {
          let color = "#eaeb07";
          if (data[PreparationValues[i][date]] == "Yes") PreparationValues[i][date + 2] = "pickup ady";
          else {
            if (String(PreparationValues[i][date + 2]).trim().toLowerCase() == "pickup ady") {
              PreparationValues[i][date + 2] = "";
              color = "#fff";
            }
            let previousData = String(PreparationValues[i][date + 2]).trim();
            let previousByColor = "#fff";
            if (previousData.toLowerCase().indexOf("return") >= 0) {
              let presentDate = new Date(previousData.toLowerCase().replace("return", "").trim() + new Date().getFullYear()).toLocaleDateString();
              if (new Date(previousData.toLowerCase().replace("return", "").trim()).getFullYear() == new Date().getFullYear() || new Date(previousData.toLowerCase().replace("return", "").trim()).getFullYear() == new Date().getFullYear() - 1) {
                presentDate = new Date(previousData.toLowerCase().replace("return", "").trim()).toLocaleDateString();
              }
              let previousDate = new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)).toLocaleDateString();
              if (new Date(presentDate) <= new Date(previousDate)) {
                previousByColor = "#f00";
              } else {
                previousData = "";
                previousByColor = "#fff";
              }
            }

            if (previousData.toLowerCase().indexOf("b2b") >= 0) {
              previousData = "";
              previousByColor = "#fff";
            }

            PreparationValues[i][date + 2] = previousData;
            color = previousByColor;
          }

          if (rowStart == 0) rowStart = i + 4;
          if (columnStart == 0) columnStart = date + 1;
          finalData.push([PreparationValues[i][date], PreparationValues[i][date + 1], PreparationValues[i][date + 2]]);
          finalColor.push([color]);
        }


        if (String(PreparationValues[i][date + 1]).trim().indexOf("#") >= 0 && GetOrderNO(String(PreparationValues[i][date + 1]).trim())[0] != "-" && isNaN(GetOrderNoOnly(PreparationValues[i][date + 1])) == false && PreviousReturnDate[String(PreparationValues[i][date]).trim()]) {
          let PreviousReturnDateData = PreviousReturnDate[String(PreparationValues[i][date]).trim()]
          let presentDate = new Date(date_);
          let previousData = PreparationValues[i][date + 2];
          let previousByColor = "#fff";
          let returnDate = new Date(PreviousReturnDateData.date);
          let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          if (PreviousReturnDateData.condition == false) {
            if (presentDate.getTime() - 24 * 60 * 60 * 1000 == returnDate.getTime()) {
              previousData = "b2b";
              previousByColor = "#f00";
            } else if (presentDate.getTime() > returnDate.getTime()) {
              previousData = String(returnDate.getDate()) + months[returnDate.getMonth()] + returnDate.getFullYear().toString().slice(-2);
              if (returnDate.getFullYear() == presentDate.getFullYear()) {
                previousData = String(returnDate.getDate()) + months[returnDate.getMonth()];
              }

              previousData += " return";
              previousByColor = "#f00";
            }
          } else {
            if (previousData.toLowerCase().indexOf("return") >= 0) {
              previousData = "";
            }
          }

          // if(String(PreparationValues[i][date + 2]).trim().toLowerCase() == "pickup ady"){
          //   continue;
          // }

          finalData_.data.push(previousData);
          finalData_.color.push(previousByColor);
          finalData_.cell.push({ row: i + 4, column: date + 3 });
        }
      }
    }
  }

  for (let x in data) {
    if (data[x] == "No") {
      condition = false;
      break;
    }
  }

  const range = preparationSheet.getRange(rowStart, columnStart, finalData.length, 3);
  range.setValues(finalData);

  if(type == "pickup"){
    preparationSheet.getRange(rowStart, columnStart + 2, finalColor.length, 1).setBackgrounds(finalColor);
  }

  console.log(finalData_)

  for (let i_ = 0; i_ < finalData_.data.length; i_++) {
    const cell = preparationSheet.getRange(finalData_.cell[i_].row, finalData_.cell[i_].column);
    cell.setValue(finalData_.data[i_]).setBackground(finalData_.color[i_]);
  }

  if (type == "return") {
    const logs = ss.getSheetByName('Logs');
    const lastLogs = logs.getLastRow();
    let orderNo = Number(order) - 1003000 + 2;
    console.log(orderNo)

    if (orderNo > 1 & orderNo <= lastLogs) {
      console.log(orderNo)
      let orderRange = logs.getRange(orderNo, 1, 1, 2);

      if (condition) {
        orderRange.setValues([[new Date().toISOString(), "COMPLETED"]]);
      } else {
        orderRange.setValues([[new Date().toISOString(), "UPDATED"]]);
      }
    }
  }



  preparationSheet.setActiveRange(range);

  return new Date() - start;
}


const test0000 = () => {
  Logger.log(pickup_or_return_submit(1003009,{"S Brunnera Trickled Beads OS Ruffle Gown":"Yes","Black Swan ruffled hi low gown":"Yes","CD Angela Puffy Sleeves White ":"Yes","Estella Glitter Off Shoulder Bridal Ballgown":"Yes","Tarik Ediz Coralie Pink":"Yes"},"return"))
}


