const popUpTemplateUpdate = `\`
<link
    rel="stylesheet"
    href="https://unpkg.com/js-datepicker@5.18.1/dist/datepicker.min.css"
  />
  <script src="https://unpkg.com/js-datepicker@5.18.1/dist/datepicker.min.js"></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/tippy.js/6.3.7/svg-arrow.min.css"
  />
  <script src="https://unpkg.com/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
  <script src="https://unpkg.com/tippy.js@6.3.7/dist/tippy-bundle.umd.js"></script>
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

    .buttonDiv{
      position: absolute;
      right: 10px;
      width: 100%;
    }

    button {
      min-width: 130px;
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
      text-transform: uppercase;
      margin-left: 20px;
    }

    button:hover {
      background: #000;
      color: white;
    }

    #cancelBtn{
      border: 1px solid red;
      color: red;
      float: left;
      margin-left: 10px;
    }

    #cancelBtn:hover {
      background: red;
      color: white;
    }

    button:disabled {
      cursor: not-allowed;
    }

    .time{
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
      font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 600;
      margin-left: -150px;
    }

    select, .dataInput{
      width: 100%;
      outline: none;
      border: none;
      background: transparent;
    }

  .tooltipTable tr td {
    background-color: #fff;
    padding: 5px;
    border: 1px solid #ddd;
    color: #000;
  }

  .tooltipTable {
    margin: 0;
    border-collapse: collapse;
    text-align: center;
  }

  .tippy-box {
    background-color: #fff;
    color: #555;
    border: 1px solid;
    border-radius: 4px;
    padding: 0;
    font-family: Arial;
    max-width: max-content !important;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }

  .tippy-content{
    padding: 5px;
  }

  .svg-content {
    fill: #fff;
  }

  .svg-arrow {
    fill: #555;
  }
  </style>
  <body><div></div></body>
  <script>
    const data = \${orderData};

    let selesAdvisorLists_ = \${selesAdvisorLists};

    const selesAdvisorLists = [];

    selesAdvisorLists_.forEach((value) => {
      if(value[0]){
        selesAdvisorLists.push(value[0]);
      }
    })

    let totalDepositLists_ = \${totalDepositLists};
    const totalDepositLists = [];
    totalDepositLists_.forEach((value) => {
      if(value[0]){
        totalDepositLists.push("RM" + value[0]);
      }
    })

    const inventoryOrderData = \${inventoryOrderData};

    const inventoryOrderObj = {};
    const inventoryOrderDataOnly = [];

    inventoryOrderData.forEach((value, index, arr) => {
      inventoryOrderDataOnly.push(value[1].trim());
      inventoryOrderObj[value[1].trim()] = {
        price: Number(value[0]),
        index
      }
    });

    const inventoryOrderDataOption = "<option>" + inventoryOrderDataOnly.join("</option><option>") + "</option>";

    const startDate = "\${startDate}";
    const html = \\\`\\\\\\\`
  <style>

      table tr td:nth-child(2) {
        width: 280px;
      }

      table tr td:nth-child(1){
        width: 130px;
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
            contenteditable
            spell-check="false"
            id="eventDiv"
          >
            \\\\\\\${event}
          </td>
          <td
            colspan="3"
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
            contenteditable
            id="custDiv"
          >
            \\\\\\\${cust}
          </td>
          <td
            colspan="3"
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
            contenteditable
            id="phoneDiv"
          >
            \\\\\\\${phone}
          </td>
          <td
            colspan="3"
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
            id="pickupDateDiv"
          >
            \\\\\\\${pickupDate}
          </td>
          <td
            colspan="3"
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
          >
            <select id="pickupMethod"></select>
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
            id="eventDateDiv"
          >
            \\\\\\\${eventDate}
          </td>
          <td
            colspan="3"
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
            colspan="3"
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
          >
            <select id="returnMethod"></select>
          </td>
        </tr>
        <tr style="height: 21px">
          <td
            colspan="5"
            style="
              border-width: 1px;
              border-style: solid;
              border-color: transparent;
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              border-bottom-color: #000;
              background-color: #fff;
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
            NOTE
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
              font-size: 9pt;
              font-weight: bold;
            "
          >
            PRICE
          </td>
        </tr>
        \\\\\\\${itemsRow}

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
              background-color: rgb(243, 243, 243);
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
              font-weight: bold;
              text-align: right;
            "
          >
            SUB TOTAL
          </td>
          <td
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
              font-weight: bold;
              text-align: right;
            "
            id="subTotalDiv"
          >
            \\\\\\\${subTotal}
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
              background: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              font-weight: bold;
              text-align: right;
              background: #fff;
            "
          >
            OTHER (POSTAGE)
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(204, 204, 204)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              outline: none;
              background: #fff;
              font-weight: bold;
              text-align: right;
            "
            contenteditable
            id="others"
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
              background-color: rgb(243, 243, 243);
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
            "
          ></td>
           <td
            style="
              /* border: 1px solid rgb(204, 204, 204); */
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: rgb(243, 243, 243);
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
              background-color: rgb(243, 243, 243);
              font-weight: bold;
              text-align: right;
            "
          >
            PREVIOUSLY PAID
          </td>
          <td
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
              outline: none;
              font-weight: bold;
              text-align: right;
            "
            id="previouslyPaid"
            contenteditable
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
              background-color: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
              border-color: rgb(0, 0, 0) rgb(204, 204, 204);
            "
          >
              <select style="font-weight: bold;" id="totalDropDown">
                <option>Pay Now</option>
                <option>Pay Later</option>
              </select>
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
              background-color: #fff;
              font-size: 13pt;
              font-weight: bold;
              text-align: right;
            "
          >
            TOTAL
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
              background-color: #fff;
              font-size: 13pt;
              font-weight: bold;
              text-align: right;
            "
            id="totalAmount"
          >\\\\\\\${subTotal}</td>
        </tr>

        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) #000;
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
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
              border-color: rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
              font-weight: bold;
              text-align: right;
              font-size: 11pt;
            "
          >
            Sale Advisor
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(204, 204, 204)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
              outline: none;
              font-weight: bold;
              text-align: right;
            "
          ><select style="font-weight: bold;
              text-align: right;font-size: 11pt;" id="saleAdvisor1"></select></td>
        </tr>
       
        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) #000;
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
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
              border-color: rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
              font-weight: bold;
              text-align: right;
              font-size: 11pt;
            "
          >
            Sale Advisor
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(204, 204, 204)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
              outline: none;
              font-weight: bold;
              text-align: right;
            "
          ><select style="font-weight: bold;
              text-align: right;font-size: 11pt;" id="saleAdvisor2"></select></td>
        </tr>
        <tr style="height: 21px">
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) #000;
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
            "
          ></td>
          <td
            style="
              border: 1px solid rgb(204, 204, 204);
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
              border-color: rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
              font-weight: bold;
              text-align: right;
              font-size: 11pt;
            "
          >
            Sale Advisor
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-color: rgb(204, 204, 204) rgb(0, 0, 0) rgb(204, 204, 204)
                rgb(204, 204, 204);
              border-image: initial;
              overflow: hidden;
              padding: 2px 3px;
              vertical-align: bottom;
              background-color: #fff;
              outline: none;
              font-weight: bold;
              text-align: right;
            "
          ><select style="font-weight: bold;
              text-align: right;font-size: 11pt;" id="saleAdvisor3"></select></td>
        </tr>
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
            <select style="font-weight: bold;" id="totalDepositDropDown">
              <option>Pay Later</option>
              <option>Pay Now</option>
            </select>
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
          ><select style="font-family: Arial;
              font-weight: bold;
              text-align: right;
              font-size: 13pt;" id="totalDeposit"></select></td>
        </tr>
      </tbody>
    </table>

    <datalist id="allItemsList"></datalist>

    <div class="buttonDiv">
      <button id="bookBtn" fun="checkAvailability" type="button">Check Availability</button>
      <button id="duplicateBtn" type="button">Duplicate for Fitting</button>
      <button id="cancelBtn" type="button">Cancel This Order</button>
    </div>
    </div>

    <div id="finalDiv" style="display: none">
       <button id="copyBtn" style="top: 0;margin-top: 0;" type="button">Copy</button>
       <div style="user-select: all; font-family: monospace;" id="finalMessage"></div>
    </div>

    <div class="time" id="scriptTime"></div>
    <div class="time" id="time"></div>
\\\\\\\`\\\`;

    let itemsRow = "";

    const event = data[1];
    const cust = data[2];
    const phone = data[3].substr(0);

    const pickupDate = data[4];
    const eventDate = data[6];
    const returnDate = data[7];

    let index = 0;
    let subTotal = data[9];

    const finalData = [];

    const itemsNo = Number(data[15]);
    for(let i = 16; i < 41; i++){
      if(data[i]){
        // let data_ = data[i].split(",");
        // data_[2] = inventoryOrderObj[data_[0].trim()].price;
        finalData.push(data[i].split(","));
      } else{
        finalData.push(["", "", ""])
      }
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
        text-align: center;
      "
    >
      <input list="allItemsList" class="dataInput" data="\\\${finalData[i][0]}" value="\\\${finalData[i][0]}">
    </td>
    <td
      style="
        border: 1px solid rgb(204, 204, 204);
        overflow: hidden;
        padding: 2px 3px;
        vertical-align: bottom;
        text-align: center;
        width: 92px;
      "
      class="allAvaliablity"
    ></td>
    <td
      style="
        border: 1px solid rgb(204, 204, 204);
        overflow: hidden;
        padding: 2px 3px;
        vertical-align: bottom;
        text-align: left;
        outline: none;
      "
      contenteditable
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
      contenteditable
      spell-check="false"
      price="price"
    >
      \\\${finalData[i][2]}
    </td>
  </tr>
  \\\`;
    }

  const getDate = (date) => {
    let date_ = new Date(date);
    let months  = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return String(date_.getDate())  + months[date_.getMonth()] + date_.getFullYear().toString().slice(-2)
  }

  let timeout;
  let start;
  // finised function
  const Finised = ({time: s_time, data, orderNo, finalData_, result}) => {
    console.log(result, finalData_)
    let itemsData = "";
    let totalStr = [];
    let TotalStr = "";
    finalData_.forEach((v, i, a) => {
      itemsData += v[0];
      if(String(v[1]).trim() != ""){
        itemsData += "<br>" + v[1];
      }
      if(String(v[2]).trim() != "" && Number(String(v[2]).trim()) != 0 && eventDiv.innerText.toLowerCase().trim() != "(fitting)"){
         if(totalDropDown.value == "Pay Later" && totalStr.length == 0 && a.length - 1 == i && Number(String(v[2]).trim()) != 0 && Number(others.innerText) == 0){
            itemsData += "<br>Balance RM" + String(v[2]).trim();
          }
          else itemsData += "<br>RM" + String(v[2]).trim();
          totalStr.push("RM" + v[2]);
      }
      // itemsData += \\\`\\\${v[0]}<br>\\\${v[1]}<br>\\\${v[2]}<br><br>\\\`;
      itemsData += "<br>";
    })

    let creditM = "";
    let picupM1 = pickupDateDiv.innerText;
    let depositPlasText = "";
    if(totalDropDown.value == "Pay Later") depositPlasText = " + Balance RM" + totalAmount.innerText;

    let pickupM2 = \\\`Upon pickup to pay another refundable deposit \\\${totalDeposit.value} in cash\\\${depositPlasText}<br><br>Please display this order summary/message upon collection\\\`;

    if(totalDepositDropDown.value == "Pay Now"){
      pickupM2 = \\\`Refundable deposit \\\${totalDeposit.value} \\\${depositPlasText}\\\`;
    }
    
    if(Number(totalAmount.innerText) == 0){
      TotalStr = "RM" + (Number(totalAmount.innerText) + Number(previouslyPaid.innerText)) + "(Previously paid RM" + previouslyPaid.innerText + ")";
    }
    else if(Number(totalAmount.innerText) < 0) {
      creditM = \\\`Credit balance RM\\\${-Number(totalAmount.innerText)} valid until \\\${returnDate}<br><br>\\\`;
      TotalStr = "RM" + (Number(totalAmount.innerText) + Number(previouslyPaid.innerText)) + "(Previously paid RM" + previouslyPaid.innerText + ")";
    } else{
      if(totalDropDown.value == "Pay Later"){
        TotalStr = "-(Previously paid RM" + previouslyPaid.innerText + ")=Balance RM" + totalAmount.innerText;
      } else{
        TotalStr = "-(Previously paid RM" + previouslyPaid.innerText + ")=RM" + totalAmount.innerText;
      }
    }

    let nowTime = new Date().toLocaleDateString();
    let pickupTime = new Date(pickupDateDiv.innerText).toLocaleDateString();

    if(nowTime == pickupTime){
      pickupM2 = \\\`Deposit \\\${totalDeposit.value}\\\`;
      // picupM1 = "";
    }

    let PreviouslyPaid = Number(previouslyPaid.innerText);
    if(PreviouslyPaid == 0){
      if(totalDropDown.value == "Pay Later"){
        TotalStr = "Balance RM" + totalAmount.innerText;
      } else{
        TotalStr = "RM" + totalAmount.innerText;
      }
    }

    let PostCost = Number(others.innerText);
    if(PostCost != 0){
      itemsData += "Postage RM" + others.innerText + "<br>";
      totalStr.push("RM" + others.innerText);
    }

    let totalStr_ = totalStr.join("+");

    if(TotalStr.indexOf("=") >= 0){
      if(totalStr.length != 1 ){
        TotalStr = totalStr_ + TotalStr + "<br><br>";
      } else if(Number(totalAmount.innerText) <= 0){
        TotalStr = TotalStr + "<br><br>";
      } else{
        TotalStr = totalStr_ + TotalStr + "<br><br>";
      }
    } else{
      if(totalStr.length != 1 ){
        TotalStr = totalStr_ + "=" + TotalStr + "<br><br>";
      }  else if(Number(totalAmount.innerText) <= 0){
        itemsData = itemsData.slice(0, -4)
        TotalStr = "(Previously paid RM" + previouslyPaid.innerText + ")" + "<br><br>";
      } else{
        TotalStr = "<br>";
      }
    }

    if(TotalStr == "=RM0<br><br>"){
      TotalStr = "<br>";
    }

    console.log(totalStr, TotalStr, "123456")
    
    let saleAdvisor = saleAdvisor1.value;
    if(saleAdvisor2.value){
      saleAdvisor += " " + saleAdvisor2.value;
    }

    if(saleAdvisor3.value){
      saleAdvisor += " " + saleAdvisor3.value;
    }

    let returnDateValue = returnDateDiv.innerText;
    if(returnMethod.value == "Return post back by any courier except poslaju skynet"){
      returnDateValue = getDate(new Date(returnDateValue).getTime() - 5 * 24 * 60 * 60 * 1000);
    }

    if(pickupMethod.value == "Post out (Weekday 12PM-8PM Weekend PH 10AM-6PM)"){
      if(totalDepositDropDown.value == "Pay Now"){
        pickupM2 = \\\`Refundable deposit \\\${totalDeposit.value} paid \\\${depositPlasText}\\\`;
      }
      else pickupM2 = \\\`Before postage to bank in another refundable deposit \\\${totalDeposit.value} \\\${depositPlasText}\\\`;
    }

      if(eventDiv.innerText.toLowerCase().trim() == "(fitting)"){
      finalMessage.innerHTML = \\\`
      <p>\\\${orderNo} [\\\${saleAdvisor}]<br>(FITTING) \\\${custDiv.innerText} \\\${phoneDiv.innerText}
      <br>
      \\\${picupM1} \\\${pickupMethod.value.replace("Pickup", "")}<br><br>
      \\\${itemsData}
      </p>
      \\\`;
      }

      else if(eventDiv.innerText.toLowerCase().trim() == "(lalamove)"){
      pickupM2 = \\\`Deposit \\\${totalDeposit.value}\\\`;
      finalMessage.innerHTML = \\\`
      <p>\\\${orderNo} [\\\${saleAdvisor}]<br>(LALAMOVE) \\\${custDiv.innerText} \\\${phoneDiv.innerText}
      <br>
      \\\${picupM1} Lalamove<br>\\\${eventDateDiv.innerText} Event<br>\\\${returnDateValue} \\\${returnMethod.value} (Weekday 12PM-8PM Weekend PH 10AM-6PM)<br><br>
      \\\${itemsData}\\\${TotalStr}
      \\\${creditM}
      \\\${pickupM2}</p>
      </p>
      \\\`;
      }

      else if(eventDiv.innerText.toLowerCase().trim() == "(studio)"){
      finalMessage.innerHTML = \\\`
      <p>\\\${orderNo} [\\\${saleAdvisor}]<br>(STUDIO) \\\${custDiv.innerText} \\\${phoneDiv.innerText}
      <br>
      \\\${picupM1} STUDIO \\\<br><br>
      \\\${itemsData}
      </p>
      \\\`;
      }

      else{
      finalMessage.innerHTML = \\\`
      <p>\\\${orderNo} [\\\${saleAdvisor}]<br>\\\${eventDiv.innerText} \\\${custDiv.innerText} \\\${phoneDiv.innerText}
      <br>
      \\\${picupM1} \\\${pickupMethod.value}<br>\\\${eventDateDiv.innerText} Event<br>\\\${returnDateValue} \\\${returnMethod.value}<br><br>
      \\\${itemsData}\\\${TotalStr}
      \\\${creditM}
      \\\${pickupM2}</p>
      \\\`;
      }

    dataTable.style.display = "none";
    finalDiv.style.display = "block";
    status = true;
    clearTimeout(timeout);
    scriptTime.innerText = "Script Time: " + s_time + " ms";
    time.innerText = "Total Time: " + (new Date() - start) + " ms"; 
  }
    
  // start funtion 
  (() => {
      document.querySelector("div").innerHTML = eval(html);
      document.querySelector("#allItemsList").innerHTML = inventoryOrderDataOption;
  
      let Total = subTotal;
      const dataTable = document.querySelector("#dataTable");
      const finalDiv = document.querySelector("#finalDiv");
      const copyBtn = document.querySelector("#copyBtn");
      const pickupDateDiv = document.querySelector("#pickupDateDiv");
      const eventDateDiv = document.querySelector("#eventDateDiv");
      const returnDateDiv = document.querySelector("#returnDateDiv");
      const finalMessage = document.querySelector("#finalMessage");
      const pickupMethod = document.querySelector("#pickupMethod");
      const returnMethod = document.querySelector("#returnMethod");
      const others = document.querySelector("#others");
      const previouslyPaid = document.querySelector("#previouslyPaid");
      const totalAmount = document.querySelector("#totalAmount");
      const saleAdvisor1 = document.querySelector("#saleAdvisor1");
      const saleAdvisor2 = document.querySelector("#saleAdvisor2");
      const saleAdvisor3 = document.querySelector("#saleAdvisor3");
      const totalDeposit = document.querySelector("#totalDeposit");
      const bookBtn = document.querySelector("#bookBtn");
      const cancelBtn = document.querySelector("#cancelBtn");
      const duplicateBtn = document.querySelector("#duplicateBtn");
      const time = document.querySelector("#time");
      const scriptTime = document.querySelector("#scriptTime");
      const eventDiv = document.querySelector("#eventDiv");
      const custDiv = document.querySelector("#custDiv");
      const phoneDiv = document.querySelector("#phoneDiv");
      const notesDiv = document.querySelectorAll("[note='note']");
      const pricesDiv = document.querySelectorAll("[price='price']");
      const subTotalDiv = document.querySelector("#subTotalDiv");
      const totalDropDown = document.querySelector("#totalDropDown");
      const totalDepositDropDown = document.querySelector("#totalDepositDropDown");
  
      const dataInputs = document.querySelectorAll(".dataInput");
      const allAvaliablity = document.querySelectorAll(".allAvaliablity");

      pickupDateDiv.style.cursor = "pointer";
      eventDateDiv.style.cursor = "pointer";
      returnDateDiv.style.cursor = "pointer";
  
      const editEnable = () => {
        if (pickupDateDiv.innerText != pickupDate) {
          editEnableFun();
          return;
        }
  
        if (eventDateDiv.innerText != eventDate) {
          editEnableFun();
          return;
        }
  
        if (returnDateDiv.innerText != returnDate) {
          editEnableFun();
          return;
        }

        let con = true;
        for (let i = 0; i < dataInputs.length; i++) {
          const input = dataInputs[i];
          let data = input.getAttribute("data");
          if(input.value == ""){
            if(data != ""){
              let d = input.getAttribute("delete");
              if(d){
                input.removeAttribute("delete");
                input.setAttribute("delete", "yes")
              } else{
                input.setAttribute("delete", "yes")
              }
            }
            notesDiv[i].innerText = "";
            pricesDiv[i].innerText = "";
            // console.log(i, notesDiv[i], pricesDiv[i])
          } else{
            input.removeAttribute("delete");
          }
          
          if (input.value != data && input.value != "") {
            con = false;
          }
        }

        if(con) editEnableFun(1);
        else editEnableFun();
        computeTotal();
      };
    
      const editEnableFun = (type = "") => {
        bookBtn.removeAttribute("fun");
        bookBtn.setAttribute("fun", "checkAvailability");
        bookBtn.innerText = "Check Availability";
        // if (type) {
        //   bookBtn.removeAttribute("fun");
        //   bookBtn.setAttribute("fun", "updateFun");
        //   bookBtn.innerText = "Update";
        // } else {
        //   bookBtn.removeAttribute("fun");
        //   bookBtn.setAttribute("fun", "checkAvailability");
        //   bookBtn.innerText = "Check Availability";
        // }
      };
  
      const options = {
        pickupMethod: [
          "Pickup (Weekday 12PM-8PM Weekend PH 10AM-6PM)",
          "Post out (Weekday 12PM-8PM Weekend PH 10AM-6PM)",
          "Early Pickup 10AM",
          "Lalamove (Weekday 12PM-8PM Weekend PH 10AM-6PM)",
        ],
        returnMethod: [
          "Return",
          "Return post back by any courier except poslaju skynet",
          "Return by Midnight",
        ],
        saleAdvisor1: selesAdvisorLists,
        saleAdvisor2: ["", ...selesAdvisorLists],
        saleAdvisor3:["", ...selesAdvisorLists],
        totalDeposit: totalDepositLists,
      };
  
      for (let x in options) {
        let options_ = options[x];
        let optionsData = "";
        for (let option of options_) {
          optionsData += "<option>" + option + "</option>";
        }
        eval(x).innerHTML = optionsData;
      }

      if(eventDiv.innerText.trim().toLowerCase() == "(postage)"){
        pickupMethod.value = "Post out (Weekday 12PM-8PM Weekend PH 10AM-6PM)";
      }

      eventDiv.oninput = () => {
        if(eventDiv.innerText.trim().toLowerCase() == "(postage)"){
          pickupMethod.value = "Post out (Weekday 12PM-8PM Weekend PH 10AM-6PM)";
        }
      }

      const saleAdvisorObj = data[13].split(",");
      pickupMethod.value = data[5];
      returnMethod.value = data[8];
      saleAdvisor1.value = saleAdvisorObj[0];
      saleAdvisor2.value = saleAdvisorObj[1];
      saleAdvisor3.value = saleAdvisorObj[2];
      const totalDepositData = data[14].split(",");
      totalDepositDropDown.value = totalDepositData[1];
      if(new Date(pickupDateDiv.innerText).toISOString() == new Date(new Date().toLocaleDateString()).toISOString()){
        totalDepositDropDown.value = "Pay Now";
        totalDepositDropDown.disabled = true;
      }
      totalDeposit.value = totalDepositData[0];
      others.innerText = data[10];
      const totalAmountData = data[12].split(",");
      const previouslyPaidCount = Number(totalAmountData[0]) + Number(data[11]);
      previouslyPaid.innerText = (previouslyPaidCount >= 0) ? previouslyPaidCount : -previouslyPaidCount;
      console.log(subTotal, typeof subTotal)
      totalAmount.innerText = Number(others.innerText) + Number(subTotal) -  Number(previouslyPaid.innerText);

      for (let i = 0; i < dataInputs.length; i++)  {
        let input = dataInputs[i];
        input.oninput = editEnable;
        input.onchange = () => {
          if(inventoryOrderObj[input.value.trim()] && isNaN(inventoryOrderObj[input.value.trim()].price) == false){
            pricesDiv[i].innerText = inventoryOrderObj[input.value.trim()].price;
          }
          editEnable();
        };
        input.focus = () => {
          input.select();
          input.setSelectionRange(0, input.value.length);
        }
        input.onclick = () => {
          input.select();
          input.setSelectionRange(0, input.value.length);
        }
      }
  
      let pickupDatePicker = datepicker("#pickupDateDiv", {
        onSelect: (i, date) => {
          if (date) {
            document.querySelector("#pickupDateDiv").innerText =
              getDate(date);
            if(new Date(eventDateDiv.innerText).getTime() < new Date(pickupDateDiv.innerText).getTime()){
              eventDateDiv.innerText = getDate(date)
              eventDatePicker.setDate(new Date(getDate(date)))
            }
            if(new Date(returnDateDiv.innerText).getTime() < new Date(eventDateDiv.innerText).getTime()){
              returnDateDiv.innerText = getDate(date);
              returnDatePicker.setDate(new Date(getDate(date)))
            }

            eventDatePicker.setMin(new Date(getDate(date)));
            returnDatePicker.setMin(new Date(getDate(date)));
            editEnable();
            if(new Date(pickupDateDiv.innerText).toISOString() == new Date(new Date().toLocaleDateString()).toISOString()){
              totalDepositDropDown.value = "Pay Now";
              totalDepositDropDown.disabled = true;
            } else{
              totalDepositDropDown.value = "Pay Later";
              totalDepositDropDown.disabled = false;
            }
          }
        },
        id: 1,
        dateSelected: new Date(pickupDateDiv.innerText),
      });
  
      let eventDatePicker = datepicker("#eventDateDiv", {
        onSelect: (i, date) => {
          if (date) {
            document.querySelector("#eventDateDiv").innerText = getDate(date);
            if(new Date(returnDateDiv.innerText).getTime() < new Date(eventDateDiv.innerText).getTime()){
              returnDateDiv.innerText = getDate(date);
              returnDatePicker.setDate(new Date(getDate(date)))
            }

            returnDatePicker.setMin(new Date(getDate(date)));
            editEnable();
          }
        },
        id: 2,
        dateSelected: new Date(eventDateDiv.innerText),
      });
  
      let returnDatePicker = datepicker("#returnDateDiv", {
        onSelect: (i, date) => {
          if (date) {
            if(new Date(getDate(date)).getTime() < new Date(eventDateDiv.innerText).getTime()){
              returnDateDiv.innerText = eventDateDiv.innerText;
              returnDatePicker.setDate(new Date(eventDateDiv.innerText))
            } else{
              document.querySelector("#returnDateDiv").innerText =
                getDate(date);
            }
            editEnable();
            if(returnMethod.value == "Return post back by any courier except poslaju skynet" && (new Date(returnDateDiv.innerText).getTime() - 5 * 24 * 60 * 60 * 1000) < new Date(eventDateDiv.innerText).getTime()){
              returnDateDiv.style.background = "#ffb6b6";
              bookBtn.disabled = true;
              bookBtn.style.background = "#eee";
              bookBtn.style.color = "#888";
              bookBtn.style.borderColor = "#aaa";
            } else{
              returnDateDiv.style.background = "rgb(243, 243, 243)";
              bookBtn.disabled = false;
              bookBtn.style.background = "";
              bookBtn.style.color = "";
              bookBtn.style.borderColor = "";
            }
          }
        },
        id: 3,
        dateSelected: new Date(returnDateDiv.innerText),
      });

      eventDatePicker.setMin(new Date(pickupDateDiv.innerText));
      returnDatePicker.setMin(new Date(pickupDateDiv.innerText));
  
      let status = false;
  
      const setTime = () => {
        if (status == false) {
          time.innerText = "Total Time: " + (new Date() - start) + " ms";
          timeout = setTimeout(setTime, 0);
        }
      };
  
      const computeTotal = () => {
        let subTotal = 0;
        for (let p = 0; p < pricesDiv.length; p++) {
          if(dataInputs[p].value != "" && inventoryOrderObj[dataInputs[p].value.trim()]) subTotal += Number(pricesDiv[p].innerText);
        }
  
        subTotalDiv.innerText = subTotal;
        totalAmount.innerText =
          Number(others.innerText) +
          subTotal -
          Number(previouslyPaid.innerText);

          console.log(totalDropDown)
        if(Number(totalAmount.innerText) <= 0){
          totalDropDown.disabled = true;
          totalDropDown.value = "";
        } else{
          totalDropDown.disabled = false;
          totalDropDown.value = "Pay Now";
        }
      };

      computeTotal()

      totalDropDown.value = totalAmountData[1];

      returnMethod.onchange = (e) => {
        if(e.target.value == "Return post back by any courier except poslaju skynet" && (new Date(returnDateDiv.innerText).getTime() - 5 * 24 * 60 * 60 * 1000) < new Date(eventDateDiv.innerText).getTime()){
          returnDateDiv.style.background = "#ffb6b6";
          bookBtn.disabled = true;
          bookBtn.style.background = "#eee";
          bookBtn.style.color = "#888";
          bookBtn.style.borderColor = "#aaa";
        } else{
          returnDateDiv.style.background = "rgb(243, 243, 243)";
          bookBtn.disabled = false;
          bookBtn.style.background = "";
          bookBtn.style.color = "";
          bookBtn.style.borderColor = "";
        }
      }
  
      const enterDisable = (e) => {
        if (e.key == "Enter") e.preventDefault();
      };
  
      const stringDisable = (e) => {
        if (isNaN(Number(e.key)) && e.key != "Backspace") e.preventDefault();
      };
  
      eventDiv.onkeydown = enterDisable;
      custDiv.onkeydown = enterDisable;
      phoneDiv.onkeydown = enterDisable;
  
      for (let n of notesDiv) {
        n.onkeydown = enterDisable;
      }
  
      for (let p of pricesDiv) {
        p.onkeydown = stringDisable;
        p.onkeyup = computeTotal;
      }
  
      others.onkeydown = stringDisable;
      others.onkeyup = computeTotal;
      previouslyPaid.onkeydown = stringDisable;
      previouslyPaid.onkeyup = computeTotal;
  
    
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(finalMessage.innerText);
        copyBtn.innerText = "Copied";
      };
  
      bookBtn.onclick = () => {
        eval(bookBtn.getAttribute("fun"))();
      };
  
      const updateFun = () => {
        start = new Date();
        scriptTime.innerText = "";
        bookBtn.innerHTML = "Updating..";
        bookBtn.disabled = true;
  
        let finalData_ = [];
  
        for (let input of dataInputs) {
          let d = input.getAttribute("delete");
          let data = input.getAttribute("data");
          if(d){
            finalData_.push(["", inventoryOrderObj[data.trim()].index])
          }
          if(input.value != ""){
            finalData_.push([input.value, inventoryOrderObj[data.trim()].index])
          }
        }
  
        for (let i = 0; i < finalData_.length; i++) {
          finalData_[i][2] = notesDiv[i].innerText;
        }
  
        for (let i = 0; i < finalData_.length; i++) {
          finalData_[i][3] = pricesDiv[i].innerText;
        }
  
        const logs = [
          eventDiv.innerText,
          custDiv.innerText,
          "'" + phoneDiv.innerText,
          pickupDateDiv.innerText,
          pickupMethod.value,
          eventDateDiv.innerText,
          returnDateDiv.innerText,
          returnMethod.value,
          subTotalDiv.innerText,
          others.innerText,
          previouslyPaid.innerText,
          totalAmount.innerText,
                    saleAdvisor.value,
          totalDeposit.value,
        ];
  
        let orderNo = eventDiv.innerText + " " + custDiv.innerText + " " + phoneDiv.innerText;
  
        google.script.run
          .withSuccessHandler(Finised)
          .doUpdate(data[0], orderNo, pickupDateDiv.innerText, eventDateDiv.innerText, returnDateDiv.innerText, logs, finalData_, itemsNo);
  
        status = false;
        setTime();
      }
      
      const createTooltip = (background, data, diff, id, app) => {
        let startDate = new Date(pickupDateDiv.innerText).getTime() - diff * 24 * 60 * 60 * 1000;

        let dateRow = "";
        let dataRow = "";
        let dataDiv  = "";
        for(let i = 0; i < background.length; i++){
          let date_ = new Date(startDate + i *  24 * 60 * 60 * 1000);
          let day = date_.getDay();
          let date = date_.getDate();
          dateRow += "<td style='background:"+ ((day == 0 || day == 6) ? "#f3f3f3" : "#fff" )+"; width: max-content;'>" + date + "</td>";
          if(data[i].indexOf("-") >= 0){
            dataRow += "<td style='background:"+ background[i] +"; width: max-content;'><span style='cursor: pointer;' class='span' data-template='"+(id + i)+"'>-</span></td>";
            dataDiv += "<div id='"+(id + i)+"'><strong style='color: #000;'>"+ data[i] + "</strong></div>"
          }else if(data[i].indexOf("#") >= 0){
            dataRow += "<td style='background:"+ background[i] +"; width: max-content;'><span style='cursor: pointer;' class='span' data-template='"+(id + i)+"'>[#</span></td>";
            dataDiv += "<div id='"+(id + i)+"'><strong style='color: #000;'>"+ data[i] + "</strong></div>"
          } else{
            dataRow += "<td style='background:"+ background[i] +"; width: max-content;'></td>";
          }
        } 
        const div = document.createElement("div");
        div.style.display = "none";
        div.innerHTML = "<div id='" + id + "'><table class='tooltipTable'><tr>" + dateRow + "</tr><tr>" + dataRow + "</tr></table></div>" + dataDiv;
        app.appendChild(div);
        // const div2 = document.createElement("div");
        // div2.style.display = "none";
        // div2.innerHTML = dataDiv;
        // app.appendChild(div2);
      }

      const Finised2 = ({time: s_time, availability, tooltipData}) => {
        console.log(tooltipData, availability);

        let condition = true;

        let pickupDate_ = ((new Date(pickupDate) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1 + 4;
        let returnDate_ = ((new Date(returnDate) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1 + 4;

        const oldFinalData = [];
  
        for (let input of dataInputs) {
          let data = input.getAttribute("data");
          if(data != ""){
            oldFinalData.push(String(data).trim())
          }
        }

        for (let i = 0; i < dataInputs.length; i++) {
          let input = dataInputs[i];
          let data = input.getAttribute("data");
          if(availability[i] == "NOT AVAILABLE"){
            let s = tooltipData[i][3] - tooltipData[i][2];
            // if(data == input.value && data != ""){
            if(oldFinalData.indexOf(String(input.value).trim()) >= 0 && input.value != ""){
              console.log(s, s + tooltipData[i][4])
              let con = true;
              for(let j = s; j < s + tooltipData[i][4]; j++){
                let date = j + tooltipData[i][2];
                //console.log(data, date, pickupDate_, returnDate_)
                if(date >= pickupDate_ && date <= returnDate_){
                  allAvaliablity[i].innerText = "Overwrite";
                } else if(tooltipData[i][0][j] == "#6aa84f" || tooltipData[i][0][j] == "#00ffff"){
                  if(condition){
                    condition = false;
                  }
                  if(con){
                    con = false;
                  }
                  allAvaliablity[i].innerText = availability[i];
                }
              }
              if(con){
                allAvaliablity[i].innerText = "AVAILABLE";
              } else{
                let id = new Date().getTime() + "" + i;
                allAvaliablity[i].innerHTML = "<span class='span' style='cursor: pointer;' data-template='"+ id +"'>NOT AVAILBLE</span>";
                createTooltip(tooltipData[i][0], tooltipData[i][1], s, id , allAvaliablity[i])
                
              }
            } else {
              if(condition){
                condition = false;
              }

              let id = new Date().getTime() + "" + i;
              allAvaliablity[i].innerHTML = "<span class='span' style='cursor: pointer;' data-template='"+ id +"'>NOT AVAILBLE</span>";
              createTooltip(tooltipData[i][0], tooltipData[i][1], s, id , allAvaliablity[i])
              
            }
          } else{
            allAvaliablity[i].innerText = availability[i];
          }
          // if(pickupDateDiv.innerText == pickupDate && returnDateDiv.innerText == returnDate && data == input.value && data != ""){
          //   allAvaliablity[i].innerText = "Overwrite";
          // } else{
          //   allAvaliablity[i].innerText = availability[i];
          //   if(condition && availability[i] == "NOT AVAILABLE"){
          //     condition = false;
          //   }
          // }

        }

        status = true;
        clearTimeout(timeout);
        scriptTime.innerText = "Script Time: " + s_time + " ms";
        time.innerText = "Total Time: " + (new Date() - start) + " ms";
        
        if(condition == false){
          bookBtn.innerText = "Check Availability";
          cancelBtn.disabled = false;
          duplicateBtn.disabled = false;
          // duplicateBtn.style.display = "none";
        } else{
          bookBtn.innerText = "Book";
          bookBtn.removeAttribute("fun");
          bookBtn.setAttribute("fun", "bookFun");
          cancelBtn.disabled = false;
          duplicateBtn.disabled = false;
          // duplicateBtn.style.display = "";
        }
        bookBtn.disabled = false;


        const initializeTippy = () => {
          return tippy(".tooltipTable .span", {
            content(reference) {
              const id = reference.getAttribute("data-template");
              const template = document.getElementById(id);
              console.log(template)
              return template.innerHTML;
            },
            allowHTML: true,
            // trigger: "click",
            appendTo: document.body,
            interactive: false,
            placement: 'bottom',
            arrow: '<svg id="svg"width="16" height="6"><path class="svg-arrow" d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"/><path class="svg-content" d="m0 7s2 0 5-4c1-1 2-2 3-2 1 0 2 1 3 2 3 4 5 4 5 4h-16z"/></svg>',
          });
        };

        let tippys = tippy(".span", {
          content(reference) {
            const id = reference.getAttribute("data-template");
            const template = document.getElementById(id);
            console.log(template)
            return template.innerHTML;
          },
          allowHTML: true,
         // trigger: "click",
          // appendTo: "parent",
          interactive: true,
          onShown(instance) {
           console.log(initializeTippy())
          },
          placement: 'bottom',
          arrow: '<svg id="svg"width="16" height="6"><path class="svg-arrow" d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"/><path class="svg-content" d="m0 7s2 0 5-4c1-1 2-2 3-2 1 0 2 1 3 2 3 4 5 4 5 4h-16z"/></svg>',
        });
      
        console.log(tippys)
      }

      const checkAvailability = () => {
        start = new Date();
        scriptTime.innerText = "";
        bookBtn.innerHTML = "Porcessing..";
        bookBtn.disabled = true;
        cancelBtn.disabled = true;
        duplicateBtn.disabled = true;
  
        let finalData_ = [];
  
        for (let input of dataInputs) {
          let data = input.value;
          if(String(data).trim() == ""){
            finalData_.push(-1)
          }
          else finalData_.push(inventoryOrderObj[data.trim()].index)
        }
  
        google.script.run
          .withSuccessHandler(Finised2)
          .checkAvailabilityForUpdate(pickupDateDiv.innerText, returnDateDiv.innerText, finalData_);
  
        status = false;
        setTime();
      };

      const bookFun = () => {
        start = new Date();
        scriptTime.innerText = "";
        bookBtn.innerHTML = "Booking..";
        bookBtn.disabled = true;
        cancelBtn.disabled = true;
        duplicateBtn.disabled = true;
  
        let finalData_ = [];
        const oldFinalData = [];

        let index = 0;
        for (let input of dataInputs) {
          let data = input.getAttribute("data");
          if(data != ""){
            oldFinalData.push(inventoryOrderObj[data.trim()].index)
          }
          if(input.value != "" && inventoryOrderObj[input.value.trim()]){
            finalData_.push([input.value, inventoryOrderObj[input.value.trim()].index, notesDiv[index].innerText, pricesDiv[index].innerText])
          }

          index++;
        }
  
        // for (let i = 0; i < finalData_.length; i++) {
        //   finalData_[i][2] = notesDiv[i].innerText;
        // }
  
        // for (let i = 0; i < finalData_.length; i++) {
        //   finalData_[i][3] = pricesDiv[i].innerText;
        // }

        const saleAdvisor = [saleAdvisor1.value, saleAdvisor2.value, saleAdvisor3.value].toString()

        const logs = [
          eventDiv.innerText,
          custDiv.innerText,
         "'" + phoneDiv.innerText,
          pickupDateDiv.innerText,
          pickupMethod.value,
          eventDateDiv.innerText,
          returnDateDiv.innerText,
          returnMethod.value,
          subTotalDiv.innerText,
          others.innerText,
          previouslyPaid.innerText,
          [totalAmount.innerText, totalDropDown.value].toString(),
          saleAdvisor,
          [totalDeposit.value, totalDepositDropDown.value].toString(),
        ];
  
        let orderNo = eventDiv.innerText + " " + custDiv.innerText + " " + phoneDiv.innerText;
  
        google.script.run
          .withSuccessHandler(Finised)
          .bookForUpdate(data[0], orderNo, pickupDateDiv.innerText, eventDateDiv.innerText, returnDateDiv.innerText, logs, finalData_, itemsNo,oldFinalData, pickupDate, returnDate);
  
        status = false;
        setTime();
      }

      const closePopup = (s_time) => {
        status = true;
        clearTimeout(timeout);
        scriptTime.innerText = "Script Time: " + s_time + " ms";
        time.innerText = "Total Time: " + (new Date() - start) + " ms";
        setTimeout(() => {google.script.host.close()}, 500);
      }

      cancelBtn.onclick = () => {
        start = new Date();
        scriptTime.innerText = "";
        cancelBtn.innerHTML = "Porcessing..";
        cancelBtn.disabled = true;
        bookBtn.disabled = true;
        duplicateBtn.disabled = true;
  
        let finalData_ = [];
        const oldFinalData = [];
  
        for (let input of dataInputs) {
          let data = input.getAttribute("data");
          if(data != ""){
            oldFinalData.push(inventoryOrderObj[data.trim()].index);
          }
          if(input.value != "" && inventoryOrderObj[input.value.trim()]){
            finalData_.push([input.value, inventoryOrderObj[input.value.trim()].index])
          }
        }
  
        for (let i = 0; i < finalData_.length; i++) {
          finalData_[i][2] = notesDiv[i].innerText;
        }
  
        for (let i = 0; i < finalData_.length; i++) {
          finalData_[i][3] = pricesDiv[i].innerText;
        }
  
        // const logs = [
        //   eventDiv.innerText,
        //   custDiv.innerText,
        //   "x" + phoneDiv.innerText,
        //   pickupDateDiv.innerText,
        //   pickupMethod.value,
        //   eventDateDiv.innerText,
        //   returnDateDiv.innerText,
        //   returnMethod.value,
        //   subTotalDiv.innerText,
        //   others.innerText,
        //   previouslyPaid.innerText,
        //   totalAmount.innerText,
        //   saleAdvisor.value,
        //   totalDeposit.value,
        // ];
  
        let orderNo = eventDiv.innerText + " " + custDiv.innerText + " " + phoneDiv.innerText;
  
        google.script.run
          .withSuccessHandler(closePopup)
          .cancelBook(data[0], itemsNo, oldFinalData, pickupDate, returnDate);
  
        status = false;
        setTime();
      }

      duplicateBtn.onclick = () => {
        start = new Date();
        scriptTime.innerText = "";
        duplicateBtn.innerHTML = "Processing..";
        bookBtn.disabled = true;
        cancelBtn.disabled = true;
        duplicateBtn.disabled = true;
  
        let finalData_ = [];

        let index = 0;
        for (let input of dataInputs) {
          if(input.value != "" && inventoryOrderObj[input.value.trim()]){
            finalData_.push([input.value, notesDiv[index].innerText, pricesDiv[index].innerText])
          }

          index++;
        }

        const saleAdvisor = [saleAdvisor1.value, saleAdvisor2.value, saleAdvisor3.value]

        const logs = [
          finalData_,
          eventDiv.innerText,
          custDiv.innerText,
          "'" + phoneDiv.innerText,
          pickupDateDiv.innerText,
          eventDateDiv.innerText,
          returnDateDiv.innerText,
          subTotalDiv.innerText,
          saleAdvisor,
        ];
  
        google.script.run
          .withSuccessHandler(closePopup)
          .Duplicate_For_Fitting(data[0], logs);
  
        status = false;
        setTime();
      }
    })();
  </script>
\`
`
