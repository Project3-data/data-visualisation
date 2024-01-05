# Data-Visualisation
Ron Whiting, Diya Patel, Wilian Ushca, Justin Shilling

# Pages Link
https://project3-data.github.io/data-visualisation/stock.html
Note that we must add the stock.html to the end of the link as the initial pages link doesn't include this portion.


# Group 3 Project Proposal:

## Analysis of Top Ten Tech Companies in the Stock Market with 2024 Prediction 

Datasets to be Used: [Yahoo! Finance API ( ‘yfinance’ )](https://finance.yahoo.com/)

## Task Breakdowns:

- Look through and gather the top ten tech stocks data to relate it to the question

- Analyze data using yahoo finance, pandas, matplotlib, d3js, canvasjs and other tools

- Create 1-2 visualizations each

- Clean, process and align the data to ensure compatibility for analysis

- Create interactive visualization to present the trends

### Workload Distribution

Ron:
- Created Dropdown Menu which updated stocks (similar to bellybutton biodiversity assignment)
- Created Stock Closing Prices Chart
- Created Tech Stock Sentiment Scores Chart
- Added Full Screen Toggle Button

Diya:
- Created Lowest Closing Price for Each Stock Chart

Justin:
- Created Stock Info Text Box which includes info about the stock chosen from the dropdown menu (similar to bellybutton biodiversity assignment)
- Worked on condensing the code Ron/Diya/Justin originally wrote to make it cleaner
- Combined code from Ron/Diya's individual merges into 1 common repository
- Worked on final edits of readme file
- Worked on github pages deployment

Willian:
- Wrote outline of original readme file

All:
- All of us worked on formatting of our own sections in the CSS/html/JS files. For the functions we worked on, we each handled our own customization in the CSS and making sure we included it in the html file
- Contributed citations where they are needed in the readme
	
## Question:

- How did the stock prices of the top ten tech companies fluctuate during the COVID-19 pandemic, and what trends emerged?

## Project Overview

The stock market has shown significant fluctuations throughout its history and recent years have been no different. Our group has decided to create a page that visualizes these fluctuations amongst tech companies since right before the start of the COVID-19 pandemic. The purpose of our project is to prove that the current events at the time had a direct negative effect on the top tech companies's stock prices and since then, most of the top tech stocks are in tremendous shape. Looking the data we utilized, our findings seem to bolster our initial hypotheses.

To begin, our stock info includes data from some of the most popular tech company stocks we could find. Our group handpicked these companies as they are mostly very well known and could be a good representation of the popular tech companies nationwide. The project we built is highly interactive and allows the user to see many aspects of the top tech stocks that are relevant in determining the overall success of the stock. We have a dropdown menu which allows the user to click on the stock they desire to get specified data for that stock. Upon clicking on the desired stock, the graph/stock info text box will display updated/accurate data for each stock. By hovering over the graph, we can see the exact dates and closing prices for each stock. Scrolling down, we have another interactive graph which shows each tech stock's sentiment score. This value tells the user how much each stock is preferred, with the higher values being more preferable. Lastly, we have a graph that shows the lowest closing price for each stock within the 3 year period of data. We determined this was an important metric so we can see which stocks never wound up dipping too low.

Overall, our page tells a story on the common trends that occurred for most tech stocks during and after the pandemic. Most of the stocks took an initial dip at the onset of the pandemic, but afterwards, many of these stocks have risen to a value which is now considered to be their all time high. Though the initial effects of the pandemic were devastating, tech companies have seemed to recouperate quite nicely.

Our group made several ethical considerations when working on this project. We wanted to choose interactive displays which accurately and effectively displayed how the current events of the time effected the stock prices of generally all tech stocks. We did have to consider the fact that there could be many other external factors that could effect certain dips and highs, but overall the trends seemed to remain fairly constant throughout. We didn't want to unfairly nitpick data, which is why we looked at data from a variety of stocks over an extended period of time. This allowed us to fairly asses that there was a trend and not put false blame on a potential outlier.


## Citations
### Justin
- Utilized d3 library learned in class. Used class assignments to help understand how to properly use library.

- Professor helped provide sorting function within my StockInfoContainer() function to select the proper stock from the stock_data.json file.

- Professor gave direction as to provide id's for each aspect of the stock we want to analyze in our report.

- TA provided help with sizing of info box. Used "div class="col-md-4"" to make the info box smaller.

- Used bootstrap CSS for styling purposes. HTML reference was found in bellybutton diversity assignment. Utilized following line of code:
"link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css""


### Diya
- Utilized [d3 library](https://d3js.org)

### Ron
- Utilized [Open BB](https://docs.openbb.co/sdk/data-available/stocks/comparison-analysis) documentation

- Utilized [Finbrain](https://docs.finbrain.tech/#get-market-predictions) documentation
