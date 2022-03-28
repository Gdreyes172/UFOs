// import the data from data.js
const tableData = data;

// Create the table and format referencing to our HTML file
var tbody = d3.select("tbody");

// Clear out any existing data
function buildTable(data) {
  tbody.html("");

  // Next, loop through data and add to the body of table
  data.forEach((dataRow) => {
    let row = tbody.append("tr");
    // loop that selects one object and assigns it to as one value per data row.
    // appends the data into the table and then adds the values
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}
// funtion that handles the selecte data for date
// and stores it as a value
function handleClick() {
    let date = d3.select("#datetime").property("value");
    // Variable for the filtered data to be refrenced from our data file.    
    let filteredData = tableData;

    // Check to see if a date was entered and filter the
    // data using that date.
  if (date) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.datetime === date);
  };

    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
  buildTable(filteredData);
};

// Listen for clicks
// by adding .on("click", handleClick);, we're telling D3 to execute our handleClick()
// function when the button with an id of filter-btn is clicked.
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);