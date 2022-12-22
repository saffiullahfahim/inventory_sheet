const openUpdate = () => {
  // Update("#1003000", ["#1003000"])
  // return;
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const logs = ss.getSheetByName('Logs');
  const logsLast = logs.getLastRow();
  let logsData = [];
  if (logsLast != 1) {
    let _logsData = logs.getRange(`B2:C${logsLast}`).getValues();
    _logsData.forEach((value, index, arr) => {
      if(value[0].toString().toUpperCase() != "COMPLETED"){
        logsData.push(value[1]);
      }
    })
    logsData = JSON.stringify(logsData).replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").split(",");
  }
  openPopUp("Update", "Update/Edit", "closePopup", "", 210, JSON.stringify(logsData));
}

const Update = (orderNo, orderLists) => {
  let time = new Date();

  if (orderLists.indexOf(orderNo) == -1) {
    showAlart("Please enter a valid or uncompleted Order No.");
    return new Date() - time;
  }
  let order = Number(orderNo.substr(1)) - 1003000 + 2;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logs = ss.getSheetByName('Logs');
  const inventoryOrder = ss.getSheetByName('inventory and order');
  const inventoryOrderLast = inventoryOrder.getLastRow();
  const startDate = inventoryOrder.getRange("E1").getDisplayValue();
  let inventoryOrderData = JSON.stringify(inventoryOrder.getRange(`C3:D${inventoryOrderLast}`).getValues());
  let orderLast = logs.getRange(`R${order}`).getValue();

  let orderData = logs.getRange(order, 3, 1, 16 + orderLast).getDisplayValues()[0];

  orderData = JSON.stringify(orderData);

  const templateSheet = ss.getSheetByName("Template");
  const templateSheetLastRow = templateSheet.getLastRow();
  const selesAdvisorLists = JSON.stringify(templateSheet.getRange(`M2:M${templateSheetLastRow}`).getDisplayValues());
  const totalDepositLists = JSON.stringify(templateSheet.getRange(`H2:H${templateSheetLastRow}`).getDisplayValues());

  let htmlOutput = HtmlService
    .createHtmlOutput(eval(popUpTemplateUpdate))
    .setWidth(836)
    .setHeight(1200);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Update Order No. " + orderNo);

  return new Date() - time;
}

// const doUpdate = (...data) => {
//   return {
//     time: new Date().getTime(),
//     data: {

//     },
//     orderNo: "",
//     finalData_: [],
//     result: data
//   }
// }


const doUpdate = (orderNo__, orderNo, pickupDate_, eventDate_, returnDate_, logs, finalData_, itemsNo) => {
  try {
    let time = new Date();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const logsSheet = ss.getSheetByName('logs');
    const inventoryOrder = ss.getSheetByName('inventory and order');
    logs = [orderNo__, ...logs]

    const startDate = inventoryOrder.getRange("E1").getDisplayValue();
    let pickupDate = ((new Date(pickupDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
    let returnDate = ((new Date(returnDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;

    const testRange = [];
    const Data = [];

    logs.push(finalData_.length);

    finalData_.forEach((v, i) => {
      const orderNo_ = "[" + logs[0] + "] " + v[2] + " " + orderNo;
      const orderNo_2 = "[" + logs[0] + "] " + orderNo;
      const {
        color_fill: color,
        data_fill: data,
        wrap_fill: wrap,
        color_blank: blankColor,
        data_blank: blankData
      } = createDateRange(orderNo_, orderNo_2, pickupDate_, eventDate_, returnDate_);

      let inventoryOrderIndex = v[1] + 1;
      let range = inventoryOrder.getRange(inventoryOrderIndex + 2, (pickupDate + 4), 1, (returnDate - pickupDate + 1));
      testRange.push(range.getA1Notation());
      if (v[0]) {
        let data__ = [v[0], v[2], v[3]];
        range.setValues([data]);
        logs.push(data__.toString());
        Data.push(data__);
      } else {
        range.setValues([blankData]).setBackgrounds([blankColor]);
      }
    })
    logs[15] = Data.length;

    let order = Number(logs[0].substr(1)) - 1003000 + 2;
    logsSheet.getRange(order, 1, 1, 16 + itemsNo).clear();
    logsSheet.getRange(order, 1, 1, 16 + Data.length).setValues([logs])
    return {
      time: new Date() - time,
      data: {
        finalData_, testRange
      },
      orderNo: logs[0],
      finalData_: Data
    }
  } catch (err) {
    return {
      result: err
    }
  }
}

const checkAvailabilityForUpdate = (pickupDate_, returnDate_, finalData_, oldPickupDate_, oldReturnDate_) => {
  let time = new Date();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const inventoryOrder = ss.getSheetByName('inventory and order');

  const startDate = inventoryOrder.getRange("E1").getDisplayValue();
  let pickupDate = ((new Date(pickupDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
  let returnDate = ((new Date(returnDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
  // let oldPickupDate = ((new Date(oldPickupDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
  // let oldReturnDate =  ((new Date(oldReturnDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;

  const availability = [];
  const tooltipData = [];

  finalData_.forEach((v, i) => {
    if (v == -1) {
      availability.push("")
      tooltipData.push("")
    } else {
      let inventoryOrderIndex = v + 1;
      let range = inventoryOrder.getRange(inventoryOrderIndex + 2, (pickupDate + 4), 1, (returnDate - pickupDate + 1));
      let backgrounds = range.getBackgrounds()[0].join("");
      if (backgrounds.indexOf("#6aa84f") >= 0 || backgrounds.indexOf("#00ffff") >= 0) {
        availability.push("NOT AVAILABLE");
        let p = (pickupDate + 4) - 5;
        if(p <= 4){
          p = 5;
        }
        let len = returnDate - p + 1 + 5;
        let range = inventoryOrder.getRange(inventoryOrderIndex + 2, p, 1, (returnDate - p + 1 + 5 + 4));
        let backgrounds = range.getBackgrounds()[0];
        let data = range.getDisplayValues()[0];
        tooltipData.push([backgrounds, data,p, (pickupDate + 4), (returnDate - pickupDate + 1)])
      }
      else {
        availability.push("AVAILABLE");
        tooltipData.push("")
      };
    }
  })

  return {
    time: new Date() - time,
    availability: availability,
    tooltipData: tooltipData
  }
}


const bookForUpdate = (orderNo__, orderNo, pickupDate_, eventDate_, returnDate_, logs, finalData_, itemsNo, oldFinalData, oldPickupDate_, oldReturnDate_) => {
  // try {
    let time = new Date();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const logsSheet = ss.getSheetByName('logs');
    const inventoryOrder = ss.getSheetByName('inventory and order');
    logs = [orderNo__, ...logs]

    const startDate = inventoryOrder.getRange("E1").getDisplayValue();
    let pickupDate = ((new Date(pickupDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
    let returnDate = ((new Date(returnDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
    let oldPickupDate = ((new Date(oldPickupDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
    let oldReturnDate = ((new Date(oldReturnDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;

    const testRange = [];
    const Data = [];

    logs.push(finalData_.length);

    for(let i = 0; i < itemsNo; i++){
      const {
        color_blank: blankColor,
        data_blank: blankData
      } = createDateRange("", "", oldPickupDate_, oldReturnDate_, oldReturnDate_);
      let inventoryOrderIndex = oldFinalData[i] + 1;
      if(oldPickupDate >= 0 & oldReturnDate >= 0){
        inventoryOrder.getRange(inventoryOrderIndex + 2, (oldPickupDate + 4), 1, (oldReturnDate - oldPickupDate + 1)).setBackgrounds([blankColor]).setValues([blankData]);
      }
    }

    finalData_.forEach((v, i) => {
      const orderNo_ = "[" + logs[0] + "] " + v[2] + " " + orderNo;
      const orderNo_2 = "[" + logs[0] + "] " + orderNo;
      const {
        color_fill: color,
        data_fill: data,
        wrap_fill: wrap,
        color_blank: blankColor,
        data_blank: blankData
      } = createDateRange(orderNo_, orderNo_2, pickupDate_, eventDate_, returnDate_);

      let inventoryOrderIndex = v[1] + 1;
      let range = inventoryOrder.getRange(inventoryOrderIndex + 2, (pickupDate + 4), 1, (returnDate - pickupDate + 1));
      testRange.push(range.getA1Notation());
      let data__ = [v[0], v[2], v[3]];
      range.setValues([data]);
      range.setBackgrounds([color]);
      range.setWraps([wrap])
      logs.push(data__.toString());
      Data.push(data__);
    })
    logs[15] = Data.length;

    let order = Number(logs[0].substr(1)) - 1003000 + 2;
    logsSheet.getRange(order, 1, 1, 16 + itemsNo).clear();
    logsSheet.getRange(order, 1, 1, 18 + Data.length).setValues([[new Date().toISOString(), "UPDATED", ...logs]])
    return {
      time: new Date() - time,
      data: {
        finalData_, testRange
      },
      orderNo: logs[0],
      finalData_: Data
    }
  // } catch (err) {
  //   return {
  //     result: err
  //   }
  // }
}

const cancelBook = (orderNo, itemsNo, oldFinalData, oldPickupDate_, oldReturnDate_) => {
  // try {
    let time = new Date();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const logsSheet = ss.getSheetByName('logs');
    const inventoryOrder = ss.getSheetByName('inventory and order');
  
    const startDate = inventoryOrder.getRange("E1").getDisplayValue();
    let oldPickupDate = ((new Date(oldPickupDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
    let oldReturnDate = ((new Date(oldReturnDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;

    for(let i = 0; i < itemsNo; i++){
      const {
        color_blank: blankColor,
        data_blank: blankData
      } = createDateRange("", "", oldPickupDate_, oldReturnDate_, oldReturnDate_);
      let inventoryOrderIndex = oldFinalData[i] + 1;
      if(oldPickupDate >= 0 & oldReturnDate >= 0){
        inventoryOrder.getRange(inventoryOrderIndex + 2, (oldPickupDate + 4), 1, (oldReturnDate - oldPickupDate + 1)).setBackgrounds([blankColor]).setValues([blankData]);
      }
    }
  
    let order = Number(orderNo.substr(1)) - 1003000 + 2;
    
    logsSheet.getRange(order, 1, 1, 2).setValues([[new Date().toISOString(), "CANCELLED"]])
   
    return new Date() - time;
}

const testFun = () => {
  let data = JSON.parse("[\"#1003000\",\"abcd Fahim 12345678\",\"27Oct22\",\"29Oct22\",\"30Oct22\",[\"abcd\",\"Fahim\",\"12345678\",\"27Oct22\",\"Pickup (Weekday 12PM-8PM Weekend PH 10AM-6PM)\",\"29Oct22\",\"30Oct22\",\"Return\",\"200\",\"\",\"210\",\"0\",\"Skyly\",\"RM300\"],[[\"V-neck Wedding Gown / Round neck\",0,\"NOTE 1\",\"10\"],[\"Gwen wedding (zipper back)\",1,\"NOTE 22\",\"20\"],[\"Gwen wedding (Corset back)\",2,\"NOTE 3\",\"30\"],[\"Gwen wedding floral print\",3,\"NOTE 4\",\"40\"],[\"Windsor Off Shoulder Bridal Ballgown (regal)\",7,\"NOTE 5\",\"100\"]],5,[0,1,2,3,7],\"12Oct22\",\"18Oct22\"]");

  Logger.log(bookForUpdate(...data))
}
