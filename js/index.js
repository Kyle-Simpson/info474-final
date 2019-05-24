'use strict';

(function () {
  let data = "no data";
  let svgLinePlot = ""; // keep SVG reference in global scope

  // load data and make scatter plot after window loads
  window.onload = function () {
    svgLinePlot = d3.select('body')
      .append('svg')
      .attr('width', 500)
      .attr('height', 500);
    // d3.csv is basically fetch but it can be be passed a csv file as a parameter
    d3.csv("./data/exports.csv")
      .then((csvData) => {
        data = csvData
        makeLinePlot(data);
      });
  }

  // make scatter plot with trend line
  function makeLinePlot(csvData) {
    data = csvData // assign data as global variable

    const dropdownData = Array.from(new Set(data.map(s => s["Country"])))
      .map(Country => {
        return {
          Country: data.find(s => s["Country"] === Country)["Country"]
        }
      })

    var dropDown = d3.select('body').append('select')
      .attr('name', 'country-list')
    var options = dropDown.selectAll('option')
      .data(dropdownData)
      .enter()
      .append('option')
    options.text(function (d) { return d.Country })
      .attr('value', function (d) { return d.Country })

    var data_by_year = data.filter(s => s["Country"] == "Afghanistan, I.R. of")

    let temp = [Number(parseFloat(data_by_year[0][`2009`].replace(/,/, '')).toFixed([2])), Number(parseFloat(data_by_year[0][`2010`].replace(/,/, '')).toFixed([2])),
      Number(parseFloat(data_by_year[0][`2011`].replace(/,/, '')).toFixed([2])), Number(parseFloat(data_by_year[0][`2012`].replace(/,/, '')).toFixed([2])),
      Number(parseFloat(data_by_year[0][`2013`].replace(/,/, '')).toFixed([2])), Number(parseFloat(data_by_year[0][`2014`].replace(/,/, '')).toFixed([2])),
      Number(parseFloat(data_by_year[0][`2015`].replace(/,/, '')).toFixed([2])), Number(parseFloat(data_by_year[0][`2016`].replace(/,/, '')).toFixed([2])),
      Number(parseFloat(data_by_year[0][`2017`].replace(/,/, '')).toFixed([2])), Number(parseFloat(data_by_year[0][`2018`].replace(/,/, '')).toFixed([2]))]

    let dat = [
      { "year": 2009, "expense": Number(parseFloat(data_by_year[0][`2009`].replace(/,/, '')).toFixed([2])) },
      { "year": 2010, "expense": Number(parseFloat(data_by_year[0][`2010`].replace(/,/, '')).toFixed([2])) },
      { "year": 2011, "expense": Number(parseFloat(data_by_year[0][`2011`].replace(/,/, '')).toFixed([2])) },
      { "year": 2012, "expense": Number(parseFloat(data_by_year[0][`2012`].replace(/,/, '')).toFixed([2])) },
      { "year": 2013, "expense": Number(parseFloat(data_by_year[0][`2013`].replace(/,/, '')).toFixed([2])) },
      { "year": 2014, "expense": Number(parseFloat(data_by_year[0][`2014`].replace(/,/, '')).toFixed([2])) },
      { "year": 2015, "expense": Number(parseFloat(data_by_year[0][`2015`].replace(/,/, '')).toFixed([2])) },
      { "year": 2016, "expense": Number(parseFloat(data_by_year[0][`2016`].replace(/,/, '')).toFixed([2])) },
      { "year": 2017, "expense": Number(parseFloat(data_by_year[0][`2017`].replace(/,/, '')).toFixed([2])) },
      { "year": 2018, "expense": Number(parseFloat(data_by_year[0][`2018`].replace(/,/, '')).toFixed([2])) },
    ]

    dropDown.on("change", function () {
      var selected = this.value;
      data_by_year = csvData.filter(s => s["Country"] == selected)
      temp = [Number(parseFloat(data_by_year[0][`2009`].replace(/,/, '')).toFixed([2])), Number(parseFloat(data_by_year[0][`2010`].replace(/,/, '')).toFixed([2])),
        Number(parseFloat(data_by_year[0][`2011`].replace(/,/, '')).toFixed([2])), Number(parseFloat(data_by_year[0][`2012`].replace(/,/, '')).toFixed([2])),
        Number(parseFloat(data_by_year[0][`2013`].replace(/,/, '')).toFixed([2])), Number(parseFloat(data_by_year[0][`2014`].replace(/,/, '')).toFixed([2])),
        Number(parseFloat(data_by_year[0][`2015`].replace(/,/, '')).toFixed([2])), Number(parseFloat(data_by_year[0][`2016`].replace(/,/, '')).toFixed([2])),
        Number(parseFloat(data_by_year[0][`2017`].replace(/,/, '')).toFixed([2])), Number(parseFloat(data_by_year[0][`2018`].replace(/,/, '')).toFixed([2]))]
      svgLinePlot.selectAll("*").remove()

      // find data limits
      axesLimits = findMinMax([2009, 2018], temp);

      // draw axes and return scaling + mapping functions
      mapFunctions = drawAxes(axesLimits, "year", "expense", svgLinePlot, { min: 50, max: 450 }, { min: 50, max: 450 });

      dat = [
        {"year": 2009, "expense" : Number(parseFloat(data_by_year[0][`2009`].replace(/,/, '')).toFixed([2]))},
        {"year": 2010, "expense" : Number(parseFloat(data_by_year[0][`2010`].replace(/,/, '')).toFixed([2]))},
        {"year": 2011, "expense" : Number(parseFloat(data_by_year[0][`2011`].replace(/,/, '')).toFixed([2]))},
        {"year": 2012, "expense" : Number(parseFloat(data_by_year[0][`2012`].replace(/,/, '')).toFixed([2]))},
        {"year": 2013, "expense" : Number(parseFloat(data_by_year[0][`2013`].replace(/,/, '')).toFixed([2]))},
        {"year": 2014, "expense" : Number(parseFloat(data_by_year[0][`2014`].replace(/,/, '')).toFixed([2]))},
        {"year": 2015, "expense" : Number(parseFloat(data_by_year[0][`2015`].replace(/,/, '')).toFixed([2]))},
        {"year": 2016, "expense" : Number(parseFloat(data_by_year[0][`2016`].replace(/,/, '')).toFixed([2]))},
        {"year": 2017, "expense" : Number(parseFloat(data_by_year[0][`2017`].replace(/,/, '')).toFixed([2]))},
        {"year": 2018, "expense" : Number(parseFloat(data_by_year[0][`2018`].replace(/,/, '')).toFixed([2]))},
      ]
      // plot data as points and add tooltip functionality
      plotData(mapFunctions, dat);

      // draw title and axes labels
      makeLabels();
    })
    data = data_by_year

    // find data limits
    let axesLimits = findMinMax([2009, 2018], temp);

    // draw axes and return scaling + mapping functions
    let mapFunctions = drawAxes(axesLimits, "year", "expense", svgLinePlot, { min: 50, max: 450 }, { min: 50, max: 450 });

    // plot data as points and add tooltip functionality
    plotData(mapFunctions, dat);

    // draw title and axes labels
    makeLabels();
  }

  // make title and axes labels
  function makeLabels() {
    svgLinePlot.append('text')
      .attr('x', 150)
      .attr('y', 40)
      .style('font-size', '14pt')
      .text("Export Revenue by Country");

    svgLinePlot.append('text')
      .attr('x', 225)
      .attr('y', 490)
      .style('font-size', '10pt')
      .text('Year');

    svgLinePlot.append('text')
      .attr('transform', 'translate(10, 350)rotate(-90)')
      .style('font-size', '10pt')
      .text('Revenue (US Dollars, Millions)');
  }

  // plot all the data points on the SVG
  // and add tooltip functionality
  function plotData(map, dataToUse) {
    // mapping functions
    let xMap = map.x;
    let yMap = map.y;

    // Line Graph
    let line = d3.line()
      .x((d) => xMap(d))
      .y((d) => yMap(d));

    svgLinePlot.append('path')
      .datum(dataToUse)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 4)
      .attr("d", line)
  }


  // draw the axes and ticks
  function drawAxes(limits, x, y, svg, rangeX, rangeY) {

    // return x value from a row of data
    let xValue = function (d) { return +d[x]; }

    // function to scale x value
    let xScale = d3.scaleLinear()
      .domain([limits.xMin, limits.xMax]) // give domain buffer room
      .range([rangeX.min, rangeX.max]);

    // xMap returns a scaled x value from a row of data
    let xMap = function (d) { return xScale(xValue(d)); };

    // plot x-axis at bottom of SVG
    let xAxis = d3.axisBottom().scale(xScale);
    svg.append("g")
      .attr('transform', 'translate(0, ' + rangeY.max + ')')
      .call(xAxis);

    // return y value from a row of data
    let yValue = function (d) { return +d[y] }

    // function to scale y
    let yScale = d3.scaleLinear()
      .domain([limits.yMax, limits.yMin]) // give domain buffer
      .range([rangeY.min, rangeY.max]);

    // yMap returns a scaled y value from a row of data
    let yMap = function (d) { return yScale(yValue(d)); };

    // plot y-axis at the left of SVG
    let yAxis = d3.axisLeft().scale(yScale);
    svg.append('g')
      .attr('transform', 'translate(' + rangeX.min + ', 0)')
      .call(yAxis);

    // return mapping and scaling functions
    return {
      x: xMap,
      y: yMap,
      xScale: xScale,
      yScale: yScale
    };
  }

  // find min and max for arrays of x and y
  function findMinMax(x, y) {

    // get min/max x values
    let xMin = d3.min(x);
    let xMax = d3.max(x);

    // get min/max y values
    let yMin = d3.min(y);
    let yMax = d3.max(y);

    // return formatted min/max data as an object
    return {
      xMin: xMin,
      xMax: xMax,
      yMin: yMin,
      yMax: yMax
    }
  }
})();