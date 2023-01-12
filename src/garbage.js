const addBook0 = (orderNo, pickupDate_, eventDate_, returnDate_, logs, finalData_) => {
  let time = new Date();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logsSheet = ss.getSheetByName('logs');
  const inventoryOrder = ss.getSheetByName('inventory and order');
  const inventoryOrderLast = inventoryOrder.getLastRow();

  const startDate = inventoryOrder.getRange("D1").getDisplayValue();
  let pickupDate = ((new Date(pickupDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
  let returnDate = ((new Date(returnDate_) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;

  const inventoryOrderRange = inventoryOrder.getRange(`C3:C${inventoryOrderLast}`);

  const inventoryOrderData = JSON.stringify(inventoryOrderRange.getValues()).replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").split(",");

  const inventoryOrderRange_ = inventoryOrder.getRange(3, (pickupDate + 3), inventoryOrderLast, (returnDate - pickupDate + 1));

  const inventoryOrderData_ = inventoryOrderRange_.getDisplayValues();

  const inventoryOrderWrap_ = inventoryOrderRange_.getWraps();

  const inventoryOrderBackground_ = inventoryOrderRange_.getBackgrounds();


  let finalAll = {
    data: inventoryOrderData_,
    color: inventoryOrderBackground_,
    wrap: inventoryOrderWrap_,
  }

  const Obj = createDateRange(orderNo, pickupDate_, eventDate_, returnDate_);

  inventoryOrderData.forEach((v, i) => {
    if (finalData_.indexOf(v) >= 0) {
      finalAll.data[i] = Obj.data_fill;
      finalAll.color[i] = Obj.color_fill;
      finalAll.wrap[i] = Obj.wrap_fill;
    }
  })

  const { data, color, wrap } = finalAll;

  inventoryOrderRange_.setValues(data).setBackgrounds(color).setWraps(wrap);
  logsSheet.appendRow(logs);

  return {
    time: new Date() - time,
    data: finalAll
  }
}
