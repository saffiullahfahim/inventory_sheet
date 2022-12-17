const preparationPopUp = `\`<body>
    <style>
      form {
        font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-weight: 600;
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
        margin-bottom: 15px;
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
        margin-top: 10px;
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
      <input placeholder="Phone No." autocomplete="off" list="phoneLists" id="phone">
      <datalist id="phoneLists"></datalist>
      <input placeholder="Order No." autocomplete="off" required list="orderLists" id="order">
      <datalist id="orderLists"></datalist>
      <button type="submit">SUBMIT</button>
      <div class="time" id="scriptTime"></div>
      <div class="time" id="time"></div>
    </form>

    <script>
      const data = \${data};
      const OrderData = {};
      const onlyOrders = [];
      const phoneNumbers = [];
      const phoneNumbersWiseOrder = {};
      const form = document.forms["form"];
      const button = document.querySelector("button");
      const order = document.querySelector("#order");
      const phone = document.querySelector("#phone");
      const time = document.querySelector("#time");
      const scriptTime = document.querySelector("#scriptTime");
      const orderLists = document.querySelector("#orderLists");
      const phoneLists = document.querySelector("#phoneLists");

      console.log(data)
      
      for(let x in data){
        phoneNumbers.push(x);
        if(x != "phone") phoneNumbersWiseOrder[x] = [];
        for(let y in data[x]){
          onlyOrders.push("#" + y);
          OrderData["#" + y] = data[x][y];
          OrderData["#" + y].phone = x;
          if(x != "phone") phoneNumbersWiseOrder[x].push("#" + y);
        }
      }

      const orderChange = () => {
        let orderData_ = [];
        for(let mobile of phoneNumbers){
          if(String(mobile).indexOf(phone.value) >= 0){
            orderData_ = [...orderData_, ...phoneNumbersWiseOrder[mobile]]
          }
        }

        if(orderData_.length){
          orderLists.innerHTML = "<option>"+ orderData_.join("</option><option>") +"</option>";
          if(orderData_.indexOf(order.value) == -1){
            order.value = "";
          }
        } else {
          order.value = "";
          orderLists.innerHTML = "";
        }

        if(phone.value == ""){
          orderLists.innerHTML = "<option>"+ onlyOrders.join("</option><option>") +"</option>";
        }
      }

      orderLists.innerHTML = "<option>"+ onlyOrders.join("</option><option>") +"</option>";
      phoneLists.innerHTML = "<option>"+ phoneNumbers.join("</option><option>") +"</option>";

      phone.oninput = orderChange;

      phone.onchange = orderChange;

      let start;
      let status = false;
      let timeout;

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
        scriptTime.innerText = "";
        button.innerText = "PROCESSING...";
        button.disabled = true;
        const data = {...OrderData[order.value.trim()], order: order.value.trim(), type: '\${type}'};
        google.script.run
          .withSuccessHandler(closePopup)
          .pickup_or_return(order.value.trim(), JSON.stringify(data), '\${type}', OrderData[order.value.trim()]);
        status = false;
        setTime();
      };
    </script>
  </body>\``;



const pickupReturnPopUpWithData = `\`
<style>
    body {
      user-select: none;
      margin: 0;
      margin-right: 10px;
    }

    table tr:nth-child(odd) {
      background-color: rgb(243, 243, 243);
    }

    table tr td:nth-child(2) {
      width: 270px;
    }

    table td:nth-child(1):first-letter {
      text-transform: uppercase
    }

    button {
      width: 130px;
      padding: 10px 5px;
      border: 1px solid #000;
      outline: none;
      transition: all 0.3s;
      background: white;
      color: #000;
      margin-top: 20px;
      cursor: pointer;
      float: right;
      margin-top: 20px;
      position: absolute;
      right: 10px;
    }

    button:hover {
      background: #000;
      color: white;
    }

    button:disabled {
      cursor: not-allowed;
    }

    .time{
      margin-top: 20px;
      font-size: 11px;
      text-align: center;
      font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
      font-size: 11px;
      font-weight: 600;
    }

    select{
      width: 100%;
      outline: none;
      border: none;
      background: transparent;
    }
  </style>
  <body><div></div></body>
  <script>
    
    const html = \\\`\\\\\\\`
<style>
      table tr td:nth-child(2) {
        width: 270px;
      }
    </style>
    <div id="dataTable">
    <table
      cellspacing="0"
      cellpadding="0"
      dir="ltr"
      style="
        table-layout: fixed;
        font-size: 10pt;
        font-family: Arial;
        width: 100%;
        border-collapse: collapse;
        border: none;
      "
    >
      <tbody>
        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(0, 0, 0) rgb(0, 0, 0) rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(189, 189, 189);
              font-size: 9pt;
              font-weight: bold;
              text-align: center;
            "
          >
            event
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(0, 0, 0) rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
              outline: none;
            "
            spell-check="false"
            id="eventDiv"
          >
            \\\\\\\${event}
          </td>
          <td
            colspan="2"
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(0, 0, 0) rgb(0, 0, 0) rgb(204, 204, 204)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
            "
          ></td>
        </tr>
        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(189, 189, 189);
              font-size: 9pt;
              font-weight: bold;
              text-align: center;
            "
          >
            customer name
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
              outline: none;
            "
            id="custDiv"
          >
            \\\\\\\${cust}
          </td>
          <td
            colspan="2"
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(204, 204, 204)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(255, 255, 255);
            "
          ></td>
        </tr>
        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(189, 189, 189);
              font-size: 9pt;
              font-weight: bold;
              text-align: center;
            "
          >
            phone #
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
              outline: none;
            "
            id="phoneDiv"
          >
            \\\\\\\${phone}
          </td>
          <td
            colspan="2"
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(0, 0, 0)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
            "
          ></td>
        </tr>
        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(189, 189, 189);
              font-size: 9pt;
              font-weight: bold;
              text-align: center;
            "
          >
            pickup date
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
            "
          >
            \\\\\\\${pickupDate}
          </td>
          <td
            colspan="2"
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(204, 204, 204)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(255, 255, 255);
              font-size: 9pt;
              outline: none;
            "
            id="pickupMethod"
          >
            \\\\\\\${pickupMethod}
          </td>
        </tr>
        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(189, 189, 189);
              font-size: 9pt;
              font-weight: bold;
              text-align: center;
            "
          >
            event date
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
            "
          >
            \\\\\\\${eventDate}
          </td>
          <td
            colspan="2"
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(204, 204, 204)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
            "
          ></td>
        </tr>
        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(189, 189, 189);
              font-size: 9pt;
              font-weight: bold;
              text-align: center;
            "
          >
            return date
          </td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
              border-bottom-color: #000;
            "
            id="returnDateDiv"
          >
            \\\\\\\${returnDate}
          </td>
          <td
            colspan="2"
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(204, 204, 204)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(255, 255, 255);
              font-size: 9pt;
              border-bottom-color: #000;
              outline: none;
            "
            id="returnMethod"
          >
            \\\\\\\${returnMethod}
          </td>
        </tr>
        <tr style="height: 21px">
          <td
            colspan="4"
            style="
              border-width: 1px;
              border-style: solid;
              border-color: transparent;
              border-image: initial;
              overflow: hidden;
              padding: 0;
              vertical-align: bottom;
              border-bottom-color: #000;
              background-color: #fff;
            "
          >
            <button id="yesForAllBtn" style="position: relative;
              margin-top: 15px;
              margin-bottom: 10px;
              font-size: 14px;
              padding: 5px;
              margin-right: 0;
              float: right;
              right: 0;">
                Yes For All
            </button>
          </td>
        </tr>
        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
            "
          ></td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
            "
          ></td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
            "
          >
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(0, 0, 0)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              font-size: 10pt;
              font-weight: bold;
              text-align: center;
            "
          >
            \\\\\\\${typeOfMethod}
          </td>
        </tr>

        \\\\\\\${itemsRow}

        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(0, 0, 0);
              border-image: initial;
              color: rgb(0, 0, 0);
              font-family: Arial;
              font-size: 13.3333px;
              font-style: normal;
              font-variant-ligatures: normal;
              font-variant-caps: normal;
              font-weight: 400;
              letter-spacing: normal;
              orphans: 2;
              text-align: start;
              text-indent: 0px;
              text-transform: none;
              white-space: normal;
              widows: 2;
              word-spacing: 0px;
              -webkit-text-stroke-width: 0px;
              text-decoration-thickness: initial;
              text-decoration-style: initial;
              text-decoration-color: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
            "
          ></td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              color: rgb(0, 0, 0);
              font-family: Arial;
              font-size: 13.3333px;
              font-style: normal;
              font-variant-ligatures: normal;
              font-variant-caps: normal;
              font-weight: 400;
              letter-spacing: normal;
              orphans: 2;
              text-align: start;
              text-indent: 0px;
              text-transform: none;
              white-space: normal;
              widows: 2;
              word-spacing: 0px;
              -webkit-text-stroke-width: 0px;
              text-decoration-thickness: initial;
              text-decoration-style: initial;
              text-decoration-color: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
            "
          >
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              color: rgb(0, 0, 0);
              font-family: Arial;
              font-style: normal;
              font-variant-ligatures: normal;
              font-variant-caps: normal;
              letter-spacing: normal;
              orphans: 2;
              text-indent: 0px;
              text-transform: none;
              white-space: normal;
              widows: 2;
              word-spacing: 0px;
              -webkit-text-stroke-width: 0px;
              text-decoration-thickness: initial;
              text-decoration-style: initial;
              text-decoration-color: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              font-size: 13pt;
              font-weight: bold;
              text-align: right;
              background-color: #fff;
              min-width: 150px;
            "
          >
            TOTAL DEPOSIT
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(204, 204, 204) rgb(0, 0, 0);
              border-image: initial;
              border-right-color: #000;
              color: rgb(0, 0, 0);
              font-family: Arial;
              font-size: 13.3333px;
              font-style: normal;
              font-variant-ligatures: normal;
              font-variant-caps: normal;
              font-weight: 400;
              letter-spacing: normal;
              orphans: 2;
              text-align: start;
              text-indent: 0px;
              text-transform: none;
              white-space: normal;
              widows: 2;
              word-spacing: 0px;
              -webkit-text-stroke-width: 0px;
              text-decoration-thickness: initial;
              text-decoration-style: initial;
              text-decoration-color: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
              font-weight: bold;
              text-align: right;
              font-size: 13pt;
            "
          >\\\\\\\${totalDeposit}</td>
        </tr>
      </tbody>
    </table>

    <button id="confirmBtn" type="button">Confirm \\\\\\\${typeOfMethod_}</button>
    </div>

    <div class="time" id="scriptTime"></div>
    <div class="time" id="time"></div>
\\\\\\\`\\\`;

const data = \${orderData};
const preparationData = \${preparationData};

let itemsRow = "", event = "", cust = "", phone = "", pickupDate = "", pickupMethod = "",  eventDate = "", returnDate = "", returnMethod = "", totalDeposit = "", typeOfMethod = "Returned", typeOfMethod_ = "Return", finalData = [], timeout, start, status = false;

if(preparationData.type == "pickup"){
  typeOfMethod = "Picked Up";
  typeOfMethod_ = "Pickup";
}

if(data){
  event = data[1];
  cust = data[2];
  phone = data[3].substr(0);

  pickupDate = data[4];
  eventDate = data[6];
  returnDate = data[7];
  pickupMethod = data[5];
  returnMethod = data[8];
  totalDeposit = data[14].split(",")[0];

  const itemsNo = Number(data[15]);
  for(let i = 16; i < data.length; i++){
    let arr = data[i].split(",");
    if(preparationData.data[arr[0].trim()]){
      arr[2] = preparationData.data[arr[0].trim()][1];
    }
    finalData.push(arr);
  }

} else{
  for(let item in preparationData.data){
    let note = preparationData.data[item][0].replace(RegExp( preparationData.order), "").replace("[]", "").trim().replace(RegExp(preparationData.phone), "")
    console.log(note)
    if(preparationData.type == "return"){
      note = note.replace("-", "");
    }
    finalData.push([item, note, preparationData.data[item][1]])
  }

  phone = preparationData.phone;

  if(preparationData.type == "return"){
    returnDate = preparationData.date;
  } else pickupDate = preparationData.date;
}


for (let i = 0; i < finalData.length; i++) {
    itemsRow += \\\`
<tr style="height: 21px">
  <td
    style="
      border-width: 1px;
      border-style: solid;
      border-color: rgb(204, 204, 204) rgb(0, 0, 0);
      border-image: initial;
      overflow: hidden;
      padding: 2px 3px;
      vertical-align: bottom;
      font-size: 9pt;
      font-weight: bold;
      text-align: center;
      background-color: rgb(189, 189, 189);
    "
  >
    item \\\${i + 1}
  </td>
  <td
    style="
      border: 1px solid rgb(204, 204, 204);
      overflow: hidden;
      padding: 2px 3px;
      vertical-align: bottom;
      text-align: left;
    "
  >
    \\\${finalData[i][0]}
  </td>
  <td
    style="
      border: 1px solid rgb(204, 204, 204);
      overflow: hidden;
      padding: 2px 3px;
      vertical-align: bottom;
      text-align: left;
      outline: none;
    "
    spell-check="false"
    note="note"
  >
    \\\${finalData[i][1]}
  </td>
  <td
    style="
      border: 1px solid rgb(204, 204, 204);
      overflow: hidden;
      padding: 2px 3px;
      vertical-align: bottom;
      border-right-color: #000;
      text-align: right;
      outline: none;
    "
    spell-check="false"
  >
    <select type="condition">
      <option>Yes</option>
      <option>No</option>
    </select>
  </td>
</tr>
\\\`;
}

document.querySelector("div").innerHTML = eval(html);

const confirmBtn = document.querySelector("#confirmBtn");
const time = document.querySelector("#time");
const scriptTime = document.querySelector("#scriptTime");
const yesForAllBtn = document.querySelector("#yesForAllBtn");

const conditions = document.querySelectorAll("[type='condition']");
for(let i = 0; i < conditions.length; i++){
  conditions[i].value = finalData[i][2]
}

const setTime = () => {
  if (status == false) {
    time.innerText = "Total Time: " + (new Date() - start) + " ms";
    timeout = setTimeout(setTime, 0);
  }
};

const closePopup = (s_time) => {
  status = true;
  clearTimeout(timeout);
  scriptTime.innerText = "Script Time: " + s_time + " ms";
  time.innerText = "Total Time: " + (new Date() - start) + " ms";
  setTimeout(() => {google.script.host.close()}, 500);
}

yesForAllBtn.onclick = () => {
  for(let i = 0; i < conditions.length; i++){
    conditions[i].value = "Yes";
  }
}

confirmBtn.onclick = () => {
  start = new Date();
  scriptTime.innerText = "";
  confirmBtn.innerHTML = "Porcessing..";
  confirmBtn.disabled = true;

  const submitResult = {};

  for(let i = 0; i < finalData.length; i++){
    submitResult[finalData[i][0].trim()] = conditions[i].value;
  }

  console.log(preparationData.order.substr(1), submitResult, preparationData.type);

  google.script.run
    .withSuccessHandler(closePopup)
    .pickup_or_return_submit(preparationData.order.substr(1), submitResult, preparationData.type);
  

  status = false;
  setTime();
}

</script>
\``

const openPreparationPopup = (type , title) => {
  let data =  getPreparationData(type);
  let htmlOutput = HtmlService
    .createHtmlOutput(eval(preparationPopUp))
    .setWidth(250)
    .setHeight(210);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, title);
}

const openPickup = () => {
  openPreparationPopup("pickup", "Pickup")
}

const openRetrun = () => {
  openPreparationPopup("return", "Return");
}


const pickup_or_return = (orderNo, preparationData, type, condition) => {
  let time = new Date();
  if (condition == undefined) {
    showAlart("Please enter a correct Order No.");
    return new Date() - time;
  }
  let order = Number(orderNo.substr(1)) - 1003000 + 2;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logs = ss.getSheetByName('Logs');
  const lastLogs = logs.getLastRow();

  let orderData = "''";

  if(order > 1 & order <= lastLogs){
    let orderLast = logs.getRange(`R${order}`).getValue();
    orderData = JSON.stringify(logs.getRange(order, 3, 1, 16 + orderLast).getDisplayValues()[0]);
  }

  let title = "Return";
  if(type == "pickup"){
    title = "Pick Up";
  }

  let htmlOutput = HtmlService
    .createHtmlOutput(eval(pickupReturnPopUpWithData))
    .setWidth(856)
    .setHeight(1200);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, title + " Order No. " + orderNo);

  return new Date() - time;
}

