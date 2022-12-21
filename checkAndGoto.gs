const popUpTemplate = `\`<body>
    <style>
      form {
        font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-weight: 600;
        margin-top: 30px;
      }

      form select, input {
        width: 100%;
        padding: 10px 5px;
        border: 1px solid #eee;
        outline: none;
        transition: all 0.3s;
      }

      form input{
        width: calc(100% - 12px);
        display: none;
      }

      form select:focus, form input:focus {
        border-color: #000;
      }

      form button {
        width: 100%;
        padding: 10px 5px;
        border: 1px solid #000;
        outline: none;
        transition: all 0.3s;
        background: white;
        color: #000;
        margin-top: 20px;
        cursor: pointer;
      }

      form button:hover {
        background: #000;
        color: white;
      }

      form button:disabled {
        cursor: not-allowed;
      }

      form .time{
        margin-top: 20px;
        font-size: 14px;
        text-align: center;
      }
    </style>
    <form name="form">
      <select required id="select">
        <option value="">Select an Order</option>
        <option value="1">ORDER 1</option>
        <option value="2">ORDER 2</option>
        <option value="3">ORDER 3</option>
        <option value="4">ORDER 4</option>
        <option value="5">ORDER 5</option>
        <option value="6">ORDER 6</option>
        <option value="7">ORDER 7</option>
        <option value="8">ORDER 8</option>
        <option value="9">ORDER 9</option>
        <option value="10">ORDER 10</option>
        <option value="11">ORDER 11</option>
        <option value="12">ORDER 12</option>
        <option value="13">ORDER 13</option>
        <option value="14">ORDER 14</option>
        <option value="15">ORDER 15</option>
        <option value="16">ORDER 16</option>
      </select>
      <input placeholder="Order No." autocomplete="off" required list="orderLists" id="select">
      <datalist id="orderLists"></datalist>
      <button type="submit">SUBMIT</button>
      <div class="time" style="display: none" id="\${checkAb}"></div>
      <div class="time" id="\${checkAb}scriptTime"></div>
      <div class="time" id="time"></div>
    </form>

    <script>
      const orders = \${orderNoLists};
      const form = document.forms["form"];
      const button = document.querySelector("button");
      let select = document.querySelector("select");
      const time = document.querySelector("#time");
      const scriptTime = document.querySelector("#scriptTime");
      const checkAb = document.querySelector("#checkAb");
      const checkAbScriptTime = document.querySelector("#checkAbscriptTime");
      const orderLists = document.querySelector("#orderLists");
      //let ordersOptions = "<option value=''>Select an Order No. </option>";
      if(orders){
        // for(let i = 0; i < orders.length; i++){
        //   ordersOptions += "<option value='"+ orders[i].substr(1) +"'>"+ orders[i] +"</option>";
        // }
        orderLists.innerHTML = "<option>"+ orders.join("</option><option>") +"</option>";
        select.remove();
        select = document.querySelector("input");
        select.style.display = "inline"
      } else{
        document.querySelector("input").remove();
        select.value = "\${order}"
      }

      let start;
      let status = false;
      let timeout;

      const Finised = (s_time) => {
        status = true;
        clearTimeout(timeout);
        scriptTime.innerText = "Script Time: " + s_time + " ms";
        time.innerText = "Total Time: " + (new Date() - start) + " ms";
        button.innerText = "SUBMIT";
        button.disabled = false;
        select.value = "";
      }

      const Finised2 = (s_time) => {
        checkAbScriptTime.innerText = "Script Time: " + s_time + " ms";
        time.innerText = "Total Time: " + (new Date() - start) + " ms";
        checkAb.innerText = "Booking...";
        google.script.run
          .withSuccessHandler(closePopup)
          .Book(select.value);
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

      form.onsubmit = (e) => {
        e.preventDefault();
        start = new Date();
        if(checkAb){
          checkAb.innerText = "Checking Availability...";
          checkAb.style.display = "block";
        } else{
          scriptTime.innerText = "";
        }
        button.innerText = "PROCESSING...";
        button.disabled = true;
        google.script.run
          .withSuccessHandler(\${successFun})
          .\${type}(select.value, orders);
        status = false;
        setTime();
      };
    </script>
  </body>\``;


const openPopUp = (type, title, successFun = "Finised", checkAb = "", width = 210, orderNoLists = "''", order = "") => {
  let htmlOutput = HtmlService
    .createHtmlOutput(eval(popUpTemplate))
    .setWidth(250)
    .setHeight(width);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, title);
}

const openCheckAvailability = () => {
  //CheckAvailability(1)
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const orderSheet = ss.getSheetByName('Open order');
  const cell = orderSheet.getCurrentCell();
  const orderStart = getOrderNo(cell.getRow());
  const cellColumn = cell.getColumn();
  let order = "";
  if (cellColumn >= 2 && cellColumn <= 7) {
    order = orderStart + 1;
  } else if (cellColumn >= 9 && cellColumn <= 14) {
    order = orderStart + 2;
  }
  openNewWindow("Processing..", "closePopup", "CheckAvailability", order, "Check Availability " + order)
  //openPopUp("CheckAvailability", "Check Availability", "Finised", "", 210, "''", order);
}

const CheckAvailabilityObj = {};

const openResetPopUp = () => {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const orderSheet = ss.getSheetByName('Open order');
  const cell = orderSheet.getCurrentCell();
  const orderStart = getOrderNo(cell.getRow());
  const cellColumn = cell.getColumn();
  let order = "";
  if (cellColumn >= 2 && cellColumn <= 7) {
    order = orderStart + 1;
  } else if (cellColumn >= 9 && cellColumn <= 14) {
    order = orderStart + 2;
  }
  // openPopUp("Reset", "Reset", "Finised", "", 210, "''", order);
  openNewWindow("Processing..", "closePopup", "Reset", order, "Reset " + order)
}

const openResetAll = () => {
  openNewWindow("Processing..", "closePopup", "ResetAll", "", "Reset All")
}

const CheckAvailability = (order) => {
  CheckAvailabilityObj[order] = order

  let time = new Date();
  let evenOrOdd = order % 2;
  if (order % 2 == 0) order--;

  const orderStart = Math.floor(Number(order / 2)) * 33 + 5;

  const eventDateColumn = (evenOrOdd == 1) ? "E" : "L";
  const dataColumn = (evenOrOdd == 1) ? "C" : "J";
  const abialityColumn = (evenOrOdd == 1) ? "D" : "K";

  const pickupDateRange = eventDateColumn + (orderStart + 1);
  const eventDateRange = eventDateColumn + (orderStart + 2);
  const returnDateRange = eventDateColumn + (orderStart + 3);

  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const orderSheet = ss.getSheetByName('Open order');
  const inventoryOrder = ss.getSheetByName('inventory and order');

  const pickupValue = orderSheet.getRange(pickupDateRange).getDisplayValue();
  const eventValue = orderSheet.getRange(eventDateRange).getDisplayValue();
  const returnValue = orderSheet.getRange(returnDateRange).getDisplayValue();

  if (isNaN(new Date(String(pickupValue).trim()))) {
    showAlart("Pickup Date required.");
    return new Date() - time;
  }

  if (isNaN(new Date(String(eventValue).trim()))) {
    showAlart("Event Date required.");
    return new Date() - time;
  }

  if (isNaN(new Date(String(returnValue).trim()))) {
    showAlart("Return Date required.");
    return new Date() - time;
  }

  const startDate = inventoryOrder.getRange("E1").getDisplayValue();
  const inventoryOrderLast = inventoryOrder.getLastRow();
  const inventoryOrderData = JSON.stringify(inventoryOrder.getRange(`D1:D${inventoryOrderLast}`).getValues()).replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").split(",");

  let pickupDate = ((new Date(pickupValue) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
  let eventDate = ((new Date(eventValue) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
  let returnDate = ((new Date(returnValue) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;

  if (pickupDate > eventDate) {
    showAlart("Pickup Date is earlier than Event Date");
    return new Date() - time;
  }

  if (pickupDate > returnDate) {
    showAlart("Pickup Date is earlier than Return Date");
    return new Date() - time;
  }

  if (eventDate > returnDate) {
    showAlart("Event Date is earlier than Return Date");
    return new Date() - time;
  }

  let dataList = orderSheet.getRange(`${dataColumn + (orderStart + 4 + 1)}:${dataColumn + (orderStart + 4 + 25)}`).getValues();
  let inventoryOrderDataColors = inventoryOrder.getRange(1, (pickupDate + 4), inventoryOrderLast, (returnDate - pickupDate + 1)).getBackgrounds();

  // console.log(inventoryOrderDataColors)

  for (let i = 0; i < 25; i++) {
    let data = dataList[i][0];
    if (data == "") {
      dataList[i][1] = "";
      continue;
    }

    let inventoryOrderIndex = inventoryOrderData.indexOf(data);

    let inventoryOrderDataColor = inventoryOrderDataColors[inventoryOrderIndex].join("");

    if (inventoryOrderDataColor.indexOf("#6aa84f") >= 0 || inventoryOrderDataColor.indexOf("#00ffff") >= 0) dataList[i][1] = "NOT AVAILABLE";
    else dataList[i][1] = "AVAILABLE";
  }

  // console.log(dataList)

  orderSheet.getRange(`${dataColumn + (orderStart + 4 + 1)}:${abialityColumn + (orderStart + 4 + 25)}`).setValues(dataList);

  return new Date() - time;
}


const ResetAll = () => {
  let time = new Date();
  for (let order = 1; order <= 16; order++) {
    Reset(order);
  }
  return new Date() - time;
}

const Reset = (order) => {
  const Order = order;
  delete CheckAvailabilityObj[order];
  let time = new Date();
  let evenOrOdd = order % 2;
  if (order % 2 == 0) order--;

  const orderStart = Math.floor(Number(order / 2)) * 33 + 5;

  const DateColumn = (evenOrOdd == 1) ? "E" : "L";
  const dataColumn = (evenOrOdd == 1) ? "C" : "J";
  const abialityColumn = (evenOrOdd == 1) ? "G" : "N";
  const orderStartColumn = (evenOrOdd == 1) ? "B" : "I";
  const startNum = (evenOrOdd == 1) ? 2 : 9;

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const orderSheet = ss.getSheetByName('Open order');
  const template = ss.getSheetByName("Template");

  const range = orderSheet.getRange(orderStart, startNum);
  const range_ = orderSheet.getRange(orderStart, startNum, 31, 6);
  range_.clearDataValidations()
  range_.clear();

  template.getRange("B2:G32").copyTo(range);
  //template.getRange("A1:H28").copyTo(orderSheet.getRange(orderStart - 1, startNum - 1))
  range.setValue("ORDER " + Order);
  range_.setBorder(true, true, true, true, null, null)

  // orderSheet.getRange(`${dataColumn + (orderStart + 1)}:${dataColumn + (orderStart + 3)}`).clearContent();
  // orderSheet.getRange(`${DateColumn + (orderStart)}:${abialityColumn + (orderStart + 4)}`).clearContent();
  // orderSheet.getRange(`${dataColumn + (orderStart + 4 + 1)}:${abialityColumn + (orderStart + 4 + 20)}`).clearContent();

  return new Date() - time;
}

const getOrderNo = (row) => {
  let order;

  for (let i = 0; i <= 16; i += 2) {
    const orderStart = Math.floor(Number(i / 2)) * 33 + 5;
    if (row < orderStart) {
      break;
    }
    order = i;
  }

  return order;
}

const getOrder = (row) => {
  let order;

  for (let i = 0; i <= 16; i += 2) {
    const orderStart = Math.floor(Number(i / 2)) * 33 + 5;
    if (row < orderStart) {
      break;
    }
    order = orderStart;
  }

  return order;
}

const goToInventory = () => {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const orderSheet = ss.getSheetByName('Open order');
  const inventoryOrder = ss.getSheetByName('inventory and order');
  const startDate = inventoryOrder.getRange("E1").getDisplayValue();

  const cell = orderSheet.getCurrentCell();

  const orderStart = getOrder(cell.getRow());

  const cellColumn = cell.getColumn();
  const data = cell.getDisplayValue();

  const eventDateColumn = (cellColumn == 3) ? "E" : "L";
  const dataColumn = (cellColumn == 3) ? "C" : "J";
  const abialityColumn = (cellColumn == 3) ? "D" : "K";

  const pickupDateRange = eventDateColumn + (orderStart + 1);
  const returnDateRange = eventDateColumn + (orderStart + 3);

  const inventoryOrderLast = inventoryOrder.getLastRow();
  const inventoryOrderData = JSON.stringify(inventoryOrder.getRange(`D1:D${inventoryOrderLast}`).getValues()).replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").split(",");

  let pickupDate = ((new Date(orderSheet.getRange(pickupDateRange).getDisplayValue()) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
  let returnDate = ((new Date(orderSheet.getRange(returnDateRange).getDisplayValue()) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;

  let inventoryOrderIndex = inventoryOrderData.indexOf(data); // row;

  let range = inventoryOrder.getRange(inventoryOrderIndex + 1, (pickupDate + 4), 1, (returnDate - pickupDate + 1));

  inventoryOrder.setActiveRange(range)

}

const t = () => {

  Logger.log(CheckAvailability(1))
}


