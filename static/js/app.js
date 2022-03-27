// from data.js
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
    Object.values(dataRow).forEach((val) => {
    // appends the data into the table and then adds the values
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.

    // 4b. Save the value that was changed as a variable.
    let changedElement = d3.select(this);
    let elementRevised =changedElement.property("value");
    console.log(elementRevised)
    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = changedElement.attr("id");
    console.log(filterId);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementRevised){
      filters[filterId] = elementRevised;
    }
    else {
      delete filters[filterId];
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let updateFilters = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.keys(filters).forEach((key)=>{
      let userInput = d3.select("#"+key).property("value");
      if (userInput){ 
      updateFilters = updateFilters.filter(row => row[key] === userInput)};
      
    });
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(updateFilters)
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change",updateFilters)
  
  // Build the table when the page loads
  buildTable(tableData);