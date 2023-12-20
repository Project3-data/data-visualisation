let stockData = {};
let chart = null;

window.onload = function() {
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