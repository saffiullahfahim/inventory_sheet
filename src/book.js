const openBook = () => {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const orderSheet = ss.getSheetByName('Open order');
  const cell = orderSheet.getCurrentCell();
  const orderStart = getOrderNo(cell.getRow());
  const cellColumn = cell.getColumn();
  let order = "";
  if(cellColumn >= 2 && cellColumn <= 7){
    order = orderStart + 1;
  } else if(cellColumn >= 9 && cellColumn <= 14){
    order = orderStart + 2;
  }
  // openPopUp("CheckAvailability", "Book/Payment", "Finised2", "checkAb", 250, "''", order);

  openNewWindow("Checking Availability...", "Finised2", "CheckAvailability", order, "Book/Payment " + order)
}

const showAlart = (message) => {
  let ui = SpreadsheetApp.getUi();
  ui.alert('Alert', message, ui.ButtonSet.OK);
}

const Book = (order) => {
  let Order = order;
  let time = new Date();
  let evenOrOdd = order % 2;
  if (order % 2 == 0) order--;

  const orderStart = Math.floor(Number(order / 2)) * 33 + 5;

  const startColumn = (evenOrOdd == 1) ? "C" : "J";
  const endColumn = (evenOrOdd == 1) ? "G" : "N";
  const setBookingStart = (evenOrOdd == 1) ? "E" : "L";
  const setBookingEnd = (evenOrOdd == 1) ? "F" : "M";

  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const orderSheet = ss.getSheetByName('Open order');
  const inventoryOrder = ss.getSheetByName('inventory and order');
  const startDate = inventoryOrder.getRange("E1").getDisplayValue();
  const inventoryOrderLast = inventoryOrder.getLastRow();

  let inventoryOrderData = JSON.stringify(inventoryOrder.getRange(`C3:D${inventoryOrderLast}`).getDisplayValues());

  let orderData = orderSheet.getRange(`${startColumn}${orderStart + 1}:${endColumn}${orderStart + 29}`).getDisplayValues();

  let subTotal = 0;
  let condition = true;

  let finalData = [];
  let finalData_ = [];

  for (let i = 4; i < orderData.length; i++) {
    if(String(orderData[i][0]).trim() != "" && orderData[i][1] == "AVAILABLE"){
      finalData.push(orderData[i]);
      finalData_.push([orderData[i][0]]);
      subTotal += Number(orderData[i][4]);
    } else if(String(orderData[i][0]).trim() != "" && orderData[i][1] != "AVAILABLE" && condition){
      condition = false;
      break;
    }
    // if (orderData[i][1] == "AVAILBLE") {
      
    //   if(String(orderData[i][4]).trim() == "" && condition) condition = false;
    // }
    // if(String(orderData[i][1]).trim() != "" && orderData[i][1] != "AVAILBLE" && condition){
    //   condition = false;
    // }
  }

  if(condition == false){
    showAlart("Please check your order");
    return new Date() - time;
  }

  orderData = JSON.stringify(orderData);
  finalData = JSON.stringify(finalData);
  finalData_ = JSON.stringify(finalData_);

  const templateSheet = ss.getSheetByName("Template");
  const templateSheetLastRow = templateSheet.getLastRow();
  const selesAdvisorLists = JSON.stringify(templateSheet.getRange(`M2:M${templateSheetLastRow}`).getDisplayValues());
  const totalDepositLists = JSON.stringify(templateSheet.getRange(`H2:H${templateSheetLastRow}`).getDisplayValues());

  let htmlOutput = HtmlService
    .createHtmlOutput(eval(popUpTemplateBook))
    .setWidth(756)
    .setHeight(1200);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Book Order " + Order);

  let setBooking = orderSheet.getRange(`${setBookingStart + (orderStart)}:${setBookingEnd + orderStart}`);
  setBooking.setValues([[new Date().toLocaleTimeString(), "BOOKING"]]).setFontSizes([[9, 9]]).setFontWeights([["bold", "bold"]]).setHorizontalAlignments([["center", "left"]])
  return new Date() - time;
}


const createDateRange = (data, data2, pickupDate, eventDate, returnDate) => {
  let pickup_date = new Date(pickupDate);
  let event_date = new Date(eventDate);
  let return_date = new Date(returnDate);

  let pickup_d = pickup_date.getTime();
  let return_d = return_date.getTime();
  let event_d = event_date.getTime();

  let Obj = {
    color_blank: [],
    color_fill: [],
    data_blank: [],
    data_fill: [],
    wrap_blank: [],
    wrap_fill: []
  };

  for (let date = pickup_d; date <= return_d; date += 86400000) {
    let day = new Date(date).getDay();

    if(day == 0 || day == 6) Obj.color_blank.push("#f3f3f3");
    else Obj.color_blank.push("");
    Obj.data_blank.push("");

    let backgroundColor;
    if (date == event_d) {
      backgroundColor = "#00ffff";
    } else {
      backgroundColor = "#6aa84f";
    }

    Obj.color_fill.push(backgroundColor);

    if (date == pickup_d) {
      Obj.data_fill.push(data);
      Obj.wrap_fill.push(false);
    }
    else if (date == return_d) {
      Obj.data_fill.push("- " + data2);
      Obj.wrap_fill.push(true);
    }
    else {
      Obj.data_fill.push("");
      Obj.wrap_fill.push(false);
    }
  }

  return Obj;
}

const addBook = (orderNo, pickupDate_, eventDate_, returnDate_, logs, finalData_) => {
  let time = new Date();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logsSheet = ss.getSheetByName('logs');
  const inventoryOrder = ss.getSheetByName('inventory and order');
  // const inventoryOrderLast = inventoryOrder.getLastRow();
  const logsLast = logsSheet.getLastRow();
  logs = ["#" + (1003000 + logsLast - 1), ...logs]

  // orderNo = "[" + logs[0] + "] "  + orderNo;

  const startDate = inventoryOrder.getRange("E1").getDisplayValue();
  let pickupDate = ((new Date(pickupDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
  let returnDate = ((new Date(returnDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;

  // const inventoryOrderRange = inventoryOrder.getRange(`C3:C${inventoryOrderLast}`);

  // const inventoryOrderData = JSON.stringify(inventoryOrderRange.getValues()).replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").split(",");

  //   const {
  //   color_fill: color,
  //   data_fill: data,
  //   wrap_fill: wrap
  // } = createDateRange(orderNo, pickupDate_, eventDate_, returnDate_);

  const testRange = []
  logs.push(finalData_.length);
  const finalData__ = [];

  finalData_.forEach((v, i) => {
    const orderNo_ = "[" + logs[0] + "]  " + v[2] + " "  + orderNo;
    const orderNo_2 = "[" + logs[0] + "] " + orderNo;
    const {
      color_fill: color,
      data_fill: data,
      wrap_fill: wrap
    } = createDateRange(orderNo_, orderNo_2, pickupDate_, eventDate_, returnDate_);

    let inventoryOrderIndex = v[1] + 1;
    let range = inventoryOrder.getRange(inventoryOrderIndex + 2, (pickupDate + 4), 1, (returnDate - pickupDate + 1));
    testRange.push(range.getA1Notation())
    range.setValues([data]).setBackgrounds([color]).setWraps([wrap]);
    let data__ = [v[0], v[2], v[3]];
    finalData__.push(data__);
    logs.push(data__.toString());
  })

  logsSheet.appendRow([new Date().toISOString(), "BOOKED", ...logs]);


  return {
    time: new Date() - time,
    data: finalData__,
    orderNo: logs[0]
  }
}

