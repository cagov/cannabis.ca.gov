// Github: https://github.com/cagov/cannabis.ca.gov/src/js/charts/cannabis-legal-access/utilities/airtable-to-html-table/index.js"

// Set up an object for the field.
const field = (field) => {
  // let data = {
  //   id: field.id,
  //   name: field.name,
  //   type: field.type,
  //   isComputed: field.isComputed,
  //   options: field.options,
  //   description: escapeNewLines(field.description),
  // };
  let data = field.name;
  return data;
};

/**
 * Airtable field definitions can include new line spaces, which Markdown editors can have a diffcult time parse.
 * Let's escape those values.
 * @param {*} value
 */
const escapeNewLines = (value) => {
  if (value !== undefined && value !== null) {
    return value.replace("\n", "   ");
  }
};

const htmlTable = (fields, records) => {
  if (
    fields !== undefined &&
    fields !== null &&
    fields.length > 0 &&
    records.length > 0
  ) {
    // Outputs this basic HTML table structure:
    /**
     * <table>
     *    <thead>
     *       <th>Column 1</th>
     *       <th>Column 2</th>
     *    </thead>
     *    <tbody>
     *      <tr>
     *        <td>Row 1 Value 1</td>
     *        <td>Row 1 Value 2</td>
     *      </tr>
     *      <tr>
     *        <td>Row 2 Value 1</td>
     *        <td>Row 2 Value 2</td>
     *      </tr>
     * </table>
     */
    let tableData = [];
    // console.log(fields);

    for (let record of queryResult.records) {
      let data = {};

      Object.keys(fields).map((field) => {
        // console.log(fields[field]);
        data[field] = record.getCellValueAsString(fields[field]);
      });
      tableData.push(data);
    }

    // Get table header

    // Get the data for the table rows.
    let tableRows = tableData.slice(0, tableData.length);
    let thValues = Object.keys(fields).map((key) => {
      if (key !== "0" && key !== "2" && key !== "3" && key !== "5") {
        let fieldLabel = fields[key];
        if (fields[key] === "Distributor") {
          fieldLabel = "Distribution";
        } else if (fields[key] === "Retail: Storefront") {
          fieldLabel = "Retail (storefront)";
        } else if (fields[key] === "Retail: Non-Storefront") {
          fieldLabel = "Retail (delivery)";
        } else if (fields[key] === "Manufacturer") {
          fieldLabel = "Manufacture";
        }
        return `<th d="${key}">${fieldLabel}</th>`;
      }
    });
    let rows = tableRows.map((row) => {
      // console.log(row);
      let tdValues = Object.keys(row).map((rowValue) => {
        if (
          rowValue !== "0" &&
          rowValue !== "2" &&
          rowValue !== "3" &&
          rowValue !== "5"
        ) {
          let rowValueKey = "";

          if (row[rowValue] === "Prohibited") {
            rowValueKey = "0";
          } else if (row[rowValue] === "Limited") {
            rowValueKey = "1";
          } else if (row[rowValue] === "Limited-Medical Only") {
            rowValueKey = "2";
          } else if (row[rowValue] === "Allowed") {
            rowValueKey = "3";
          } else if (row[rowValue] === "County label" && row[5] === "County") {
            rowValueKey = "County-wide";
          }
          if (rowValueKey !== "") {
            return `<td d="${rowValue}" l="${rowValueKey}">${row[rowValue]}</td>`;
          }

          return `<td d="${rowValue}">${row[rowValue]}</td>`;
        }
      });
      return `<tr data-geoid="${row[2]}" 
        k="${row[0]}" 
        j="${row[5]}" 
        c="${row[3]}">${tdValues.join("")}</tr>`;
    });
    let tableMarkup = `
        <table>
           <thead>
              ${thValues.join("")}
           </thead>
           <tbody>
              ${rows.join("")}
            </tbody>
        </table>
        `;

    //// ${rows.join("")}
    return output.text(tableMarkup);
  }
};

// Get Airtable fields data.
const field_data = (fields) => {
  let data = [];
  for (const fieldMetadata of fields) {
    data.push(field(fieldMetadata));
  }
  return data;
};

let table = base.getTable("cannabis-legal-access");
let view = table.getView("Flat Dataset");

let queryResult = await view.selectRecordsAsync();

let records = queryResult.records;

let fields = [
  "CA Places Key",
  "Place",
  "GEOID",
  "County",
  "County label",
  "Jurisdiction Type",
  "Retail: Storefront",
  "Retail: Non-Storefront",
  "Distributor",
  "Testing",
  "Manufacturer",
  "Cultivation",
  "Are all CCA activites prohibited?",
  "Is all retail prohibited?",
  "CCA Prohibited by County",
];
htmlTable(fields, records);
