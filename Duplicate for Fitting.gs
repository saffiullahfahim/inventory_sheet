
const Duplicate_For_Fitting = (Order, logs) => {
  let time = new Date();
  logs = JSON.stringify(logs);
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const inventoryOrder = ss.getSheetByName('inventory and order');
  const inventoryOrderLast = inventoryOrder.getLastRow();
  const startDate = inventoryOrder.getRange("D1").getDisplayValue();
  let inventoryOrderData = JSON.stringify(inventoryOrder.getRange(`C3:C${inventoryOrderLast}`).getValues()).replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").split(",");

  let inventoryOrderDataAll = JSON.stringify(inventoryOrderData);
  inventoryOrderData = "<option>" + inventoryOrderData.join("</option><option>") + "</option>";

  let htmlOutput = HtmlService
    .createHtmlOutput(eval(popUpTemplateDuplicate_For_Fitting))
    .setWidth(836)
    .setHeight(1200);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "Duplicate for Fitting " + Order);
  return new Date() - time;
}


const bookForDuplicate_For_Fitting = (orderNo, pickupDate_, eventDate_, returnDate_, logs, finalData_) => {
  // try {
  let time = new Date();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logsSheet = ss.getSheetByName('logs');
  const inventoryOrder = ss.getSheetByName('inventory and order');
  const logsLast = logsSheet.getLastRow();
  logs = ["#" + (1003000 + logsLast - 1), ...logs]

  const startDate = inventoryOrder.getRange("D1").getDisplayValue();
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
    let range = inventoryOrder.getRange(inventoryOrderIndex + 2, (pickupDate + 3), 1, (returnDate - pickupDate + 1));
    testRange.push(range.getA1Notation());
    let data__ = [v[0], v[2], v[3]];
    range.setValues([data]);
    range.setBackgrounds([color]);
    range.setWraps([wrap])
    logs.push(data__.toString());
    Data.push(data__);
  })
  logs[15] = Data.length;

  logsSheet.appendRow([new Date().toISOString(), "BOOKED", ...logs]);

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