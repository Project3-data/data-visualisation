let stockData = {};
let chart = null;
let tooltip;

window.onload = function() {
    // Initialize tooltip
    tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    fetch('json/stock_data.json')
        .then(response => response.json())
        .then(data => {
            stockData = data;
            updateChart(); // Initial chart display
        });
};

function updateChart() {
    var selectedStock = document.getElementById("stockSelector").value;
    var dataPoints = stockData[selectedStock].map((dataPoint) => {
        return { x: new Date(dataPoint.date), y: dataPoint.close };
    });

    chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // Try "light1", "dark1", "dark2"
        animationEnabled: true, // Enable animation
        exportEnabled: true, // Enable export feature
        title: {
            text: selectedStock + " Stock Closing Prices",
            fontColor: "#333", // Dark grey color for title
            fontFamily: "tahoma", // Set the font family for the title
            fontSize: 24 // Increase the font size for better visibility
        },
        toolTip: {
            shared: true,
            contentFormatter: function(e) {
                var content = "Date: " + CanvasJS.formatDate(e.entries[0].dataPoint.x, "YYYY-MM-DD");
                e.entries.forEach(function(entry) {
                    content += "<br/>" + entry.dataSeries.name + ": $" + entry.dataPoint.y.toFixed(2);
                });
                return content;
            }
        },
        zoomEnabled: true,
        panEnabled: true,
        axisX: {
            title: "Date",
            valueFormatString: "YYYY-MM-DD"
        },
        axisY: {
            title: "Price in USD",
            includeZero: false,
            valueFormatString: "#0.##"
        },
        data: [{
            type: "line", // Change this type dynamically with the buttons
            name: selectedStock,
            xValueType: "dateTime",
            xValueFormatString: "YYYY-MM-DD",
            yValueFormatString: "$#,##0.##",
            showInLegend: true,
            legendMarkerColor: "grey",
            legendText: selectedStock,
            dataPoints: dataPoints
        }]
    });
    chart.render();

// Render D3 chart
renderD3BarChart(selectedStock);
}

// Function to change chart type
function changeChartType(type) {
    if (chart) {
        chart.options.data[0].type = type;
        chart.render();
    }
}
function toggleFullScreenMode() {
    var chartContainer = document.getElementById('chartContainer');
    if (!document.fullscreenElement) {
        chartContainer.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
// Bar Chart
function renderD3BarChart() {
     

    d3.select("#d3ChartContainer").selectAll("*").remove();

    // Extract the lowest closing price for each stock
    let lowestPrices = Object.keys(stockData).map(stock => {
        return {
            stock: stock,
            lowestPrice: d3.min(stockData[stock].map(d => d.close))
        };
    }).filter(stock => ['AAPL', 'MSFT', 'NVDA', 'AVGO', 'ORCL', 'ADBE', 'CRM', 'AMD', 'ACN', 'CSCO'].includes(stock.stock));

    // Sort the data in descending order based on lowest price
    lowestPrices.sort((a, b) => b.lowestPrice - a.lowestPrice); // Note the change here for descending order

    // Set dimensions and margins
    const barHeight = 40; // Height of each bar
    const margin = { top: 50, right: 20, bottom: 80, left: 100 };
    const width = 960 - margin.left - margin.right; // Adjust width if necessary
    const height = lowestPrices.length * barHeight + margin.top + margin.bottom;
    
    // Append SVG object to the div
    const svg = d3.select("#d3ChartContainer")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

   // Chart Header
   svg.append("text")
       .attr("x", 0)
       .attr("y", -20) // Adjusted for spacing above the chart
       .attr("text-anchor", "start")
       .style("font-size", "20px") // Slightly larger text for the header
       .style("font-weight", "bold")
       .text("The Lowest Closing Price for Each Stock");

    // Find the maximum value from the lowestPrices array
       const maxValue = d3.max(lowestPrices, d => d.lowestPrice);
       
    // X axis with grid lines
       const x = d3.scaleLinear()
       .domain([0, maxValue * 1.018 ]) 
       .range([0, width]);
 svg.append("g")
   .attr("class", "grid")
   .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
   .call(d3.axisBottom(x)
       .tickSize(-height + margin.top + margin.bottom) // This creates horizontal grid lines
       .tickFormat(d3.format("d")) // Optional: Format the tick labels on the X axis
   );
    // Add label for the x-axis
svg.append("text")
    .attr("class", "x-axis-label")
    .attr("x", width / 2)
    .attr("y", height - margin.top - margin.bottom + margin.bottom / 2) // Adjust position to be at the bottom of the x-axis
    .style("text-anchor", "middle")
    .text("Closing Price"); 

   // Y axis with grid lines
   const y = d3.scaleBand()
   .range([0, height - margin.top - margin.bottom])
   .domain(lowestPrices.map(d => d.stock))
   .padding(0.1);

 svg.append("g")
   .attr("class", "grid")
   .call(d3.axisLeft(y)
       .tickSize(-width) // This creates vertical grid lines
   );

 // Add label for the y-axis
 svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left)
     .attr("x", 0 - (height / 2))
     .attr("dy", "3em")
     .style("text-anchor", "middle")
     .text("Stocks"); 

 // Bars
 let bars = svg.selectAll("myRect")
 .data(lowestPrices)
 .join("rect")
   .attr("x", 0)
   .attr("y", d => y(d.stock))
   .attr("width", 0) // Start with width 0
   .attr("height", y.bandwidth())
   .attr("fill", "#69b3a2");
   // Add transition
   bars.transition()
   .delay((d, i) => i * 100) // Delay each bar's animation start by 100ms times its index
   .duration(800) // Duration of the transition in milliseconds
   .attr("width", d => x(d.lowestPrice)); // Animate to final width

// Add tooltip event handlers
bars.on("mouseover", function(event, d) {
    // Get the bounding box of the bar
    let bbox = this.getBoundingClientRect();  // Use getBoundingClientRect for position relative to viewport

    // Calculate the position for the tooltip
    // The x position is the bounding box's left plus half its width
    // The y position is the bounding box's top
    let xPosition = bbox.left + bbox.width / 2;
    let yPosition = bbox.top;

    tooltip.transition().duration(200).style("opacity", .9);
    tooltip.html("Stock: " + d.stock + "<br/>Lowest Price: $" + d.lowestPrice.toFixed(2))
      .style("left", xPosition + "px")
      .style("top", yPosition + "px");
  })
  .on("mouseout", function() {
    tooltip.transition().duration(500).style("opacity", 0);
  });

}

