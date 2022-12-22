const popUpTemplateBook = `\`
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
    const data = \${orderData};

    let selesAdvisorLists_ = \${selesAdvisorLists};
    const selesAdvisorLists = [];

    selesAdvisorLists_.forEach((value) => {
      if(value[0]){
        selesAdvisorLists.push(value[0]);
      }
    })

    const inventoryOrderData = \${inventoryOrderData};

    const inventoryOrderObj = {};

    inventoryOrderData.forEach((value, index, arr) => {
      inventoryOrderObj[value[1].trim()] = {
        price: Number(value[0]),
        index
      }
    })

    const startDate = "\${startDate}";
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
            contenteditable
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
            contenteditable
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
            contenteditable
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
          >
            <select id="returnMethod"></select>
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

    <button id="bookBtn" type="button">BOOK</button>
    </div>

    <div id="finalDiv" style="display: none">
       <button id="copyBtn" style="top: 0;margin-top: 0;" type="button">Copy</button>
       <div style="user-select: all; font-family: monospace;" id="finalMessage"></div>
    </div>

    <div class="time" id="scriptTime"></div>
    <div class="time" id="time"></div>
\\\\\\\`\\\`;

    let itemsRow = "";

    const event = data[0][0];
    const cust = data[1][0];
    const phone = data[2][0];

    const pickupDate = data[0][2];
    const eventDate = data[1][2];
    const returnDate = data[2][2];

    let index = 0;
    let subTotal = \${subTotal};

    const finalData = JSON.parse(\\\`\${finalData}\\\`);
    const finalData_ = JSON.parse(\\\`\${finalData_}\\\`);

    for (let i = 0; i < finalData.length; i++) {
      if(inventoryOrderObj[finalData[i][0].trim()] && isNaN(inventoryOrderObj[finalData[i][0].trim()].price) == false){
        finalData[i][4] = inventoryOrderObj[finalData[i][0].trim()].price;
      } else{
        finalData[i][4] = "";
      }
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
      contenteditable
      spell-check="false"
      note="note"
    >
      \\\${finalData[i][2]}
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
      \\\${finalData[i][4]}
    </td>
  </tr>
  \\\`;
    }
    
  (() => {
    // if(condition == false){
    //   google.script.run
    //       .withSuccessHandler(() => {google.script.host.close()})
    //       .showAlart("Please check your order");
    //   return;
    // }
    document.querySelector("div").innerHTML = eval(html);

    let Total = subTotal;
    const dataTable = document.querySelector("#dataTable");
    const finalDiv = document.querySelector("#finalDiv");
    const copyBtn = document.querySelector("#copyBtn");
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

    const options = {
      pickupMethod: ["Pickup (Weekday 12PM-8PM Weekend PH 10AM-6PM)", "Post out (Weekday 12PM-8PM Weekend PH 10AM-6PM)", "Early Pickup 10AM", "Lalamove (Weekday 12PM-8PM Weekend PH 10AM-6PM)"],
      returnMethod: ["Return", "Return post back by any courier except poslaju skynet", "Return by Midnight"],
      saleAdvisor1: selesAdvisorLists,
      saleAdvisor2: ["", ...selesAdvisorLists],
      saleAdvisor3:["", ...selesAdvisorLists],
      totalDeposit: ["RM300", "RM400", "RM600", "RM800", "RM900", "RM1200"]
    }

    for(let x in options){
      let options_ = options[x];
      let optionsData = "";
      for(let option of options_){
        optionsData += "<option>" + option + "</option>"
      }
      eval(x).innerHTML = optionsData;
    }

    let start;
    let status = false;
    let timeout;

    const setTime = () => {
      if(status == false){
        time.innerText = "Total Time: " + (new Date() - start) + " ms";
        timeout = setTimeout(setTime, 0);
      }
    }

    const computeTotal = () => {
      let subTotal = 0;
      for (let p = 0; p < pricesDiv.length; p++) {
        subTotal += Number(pricesDiv[p].innerText);
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

    computeTotal();

    if(new Date(pickupDate).toISOString() == new Date(new Date().toLocaleDateString()).toISOString()){
      totalDepositDropDown.value = "Pay Now";
      totalDepositDropDown.disabled = true;
    }

    returnMethod.onchange = (e) => {
      if(e.target.value == "Return post back by any courier except poslaju skynet" && (new Date(returnDate).getTime() - 5 * 24 * 60 * 60 * 1000) < new Date(eventDate).getTime()){
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
      if(e.key == "Enter") e.preventDefault();
    }

    const stringDisable = (e) => {
      if(isNaN(Number(e.key)) && e.key != "Backspace") e.preventDefault();
    }

    eventDiv.onkeydown = enterDisable;
    custDiv.onkeydown = enterDisable;
    phoneDiv.onkeydown = enterDisable;

    for(let n of notesDiv){
      n.onkeydown = enterDisable;
    }

    for(let p of pricesDiv){
      p.onkeydown = stringDisable;
      p.onkeyup = computeTotal;
    }

    others.onkeydown = stringDisable;
    others.onkeyup = computeTotal;
    previouslyPaid.onkeydown = stringDisable;
    previouslyPaid.onkeyup = computeTotal;

    if(eventDiv.innerText.trim().toLowerCase() == "(postage)"){
      pickupMethod.value = "Post out (Weekday 12PM-8PM Weekend PH 10AM-6PM)";
    }

    eventDiv.oninput = () => {
      if(eventDiv.innerText.trim().toLowerCase() == "(postage)"){
        pickupMethod.value = "Post out (Weekday 12PM-8PM Weekend PH 10AM-6PM)";
      }
    }

    const Finised = ({time: s_time, data, orderNo}) => {
      let itemsData = "";
      let totalStr = [];
      let TotalStr = "";
      data.forEach((v, i, a) => {
        itemsData += v[0];
        if(String(v[1]).trim() != ""){
          itemsData += "<br>" + v[1];
        }
        if(String(v[2]).trim() != "" && eventDiv.innerText.toLowerCase().trim() != "(fitting)"){
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
      let picupM1 = pickupDate;
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
      let pickupTime = new Date(pickupDate).toLocaleDateString();

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

      	
    if(TotalStr == "=RM0<br><br>" || TotalStr == "RM0(Previously paid RM)<br><br>"){
        TotalStr = "<br>";
    
    }
    
    let saleAdvisor = saleAdvisor1.value;
    if(saleAdvisor2.value){
      saleAdvisor += " " + saleAdvisor2.value;
    }

    if(saleAdvisor3.value){
      saleAdvisor += " " + saleAdvisor3.value;
    }

    const getDate = (date) => {
      let date_ = new Date(date);
      let months  = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return String(date_.getDate())  + months[date_.getMonth()] + date_.getFullYear().toString().slice(-2)
    }

    let returnDateValue = returnDate;
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
      \\\${picupM1} Lalamove<br>\\\${eventDate} Event<br>\\\${returnDateValue} \\\${returnMethod.value} (Weekday 12PM-8PM Weekend PH 10AM-6PM)<br><br>
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
      \\\${picupM1} \\\${pickupMethod.value}<br>\\\${eventDate} Event<br>\\\${returnDateValue} \\\${returnMethod.value}<br><br>
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

    copyBtn.onclick = () => {
      navigator.clipboard.writeText(finalMessage.innerText);
      copyBtn.innerText = "Copied";
    }

    bookBtn.onclick = () => {
      start = new Date();
      scriptTime.innerText = "";
      bookBtn.innerHTML = "BOOKING..";
      bookBtn.disabled = true;

      for(let i = 0; i < finalData_.length; i++){
        finalData_[i] = [finalData[i][0].trim(), inventoryOrderObj[finalData_[i][0].trim()].index, notesDiv[i].innerText, pricesDiv[i].innerText]
      }

      const saleAdvisor = [saleAdvisor1.value, saleAdvisor2.value, saleAdvisor3.value].toString()

      const logs = [
        eventDiv.innerText,
        custDiv.innerText,
        "'" + phoneDiv.innerText,
        pickupDate,
        pickupMethod.value,
        eventDate,
        returnDate,
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
          .addBook(orderNo, pickupDate, eventDate, returnDate, logs, finalData_);
      status = false;
      setTime();
    };
  })();
  </script>
\`
`