async function buildPlot() {
    // console.log("Heeey");
    const data = await d3.json("my_weather_data.json");   
    // console.table(data);
    const dateParser = d3.timeParse("%Y-%m-%d");
    const yAccessor = (d) => d.temperatureMin;
    const yhAccessor = (d) => d.temperatureMax;
    // const yMaxAccessor = (d) => d.temperatureMin - d.temperatureMin
    const xAccessor = (d) => dateParser(d.date);
    // Functions for incapsualtion to access data column values

    var dimention = {
        width: window.innerWidth*0.9,
        height: 400,
        margin: {
            top: 15,
            left: 15,
            bottom: 15,
            right: 15,
        }
    };

    dimention.boundedWidth = dimention.width - dimention.margin.left - dimention.margin.right;
    dimention.boundedHeight = dimention.height - dimention.margin.top - dimention.margin.bottom;

    const wrapper = d3.select("#wrapper");
    const svg = wrapper.append("svg"); // graph 
    svg.attr("height", dimention.height);
    svg.attr("width", dimention.width);
    // const bounded = svg.append("g");
    svg.style("transform", `translate(${dimention.margin.left}px, ${dimention.margin.top})`);

    const yScaler = d3.scaleLinear()
        .domain(d3.extent(data, yAccessor))  // min-max values
        .range([dimention.boundedHeight, 0])
        svg.append("g")
            .call(d3.axisLeft(yScaler));
    
    const yhScaler = d3.scaleLinear()
        .domain(d3.extent(data, yhAccessor))  // min-max values
        .range([dimention.boundedHeight, 0])
    
    const xScaler = d3.scaleTime()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimention.boundedWidth])
        svg.append("g")
            .attr("transform", "translate(0," + dimention.height + ")")
            .call(d3.axisBottom(xScaler));

    var lineGenerator = d3.line()
        .x(d => xScaler(xAccessor(d)))
        .y(d => yScaler(yAccessor(d)));

    var secondLineGenerator = d3.line()
        .x(d => xScaler(xAccessor(d)))
        .y(d => yhScaler(yhAccessor(d)));

    // Add the line
    svg.append("path")
        // .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5) // the line width
        .attr("d", lineGenerator(data));
    
    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "lightgrey")
        .attr("stroke-width", 1.5) // the line width  TemperatureHigh
        .attr("d", secondLineGenerator(data));
    

}

buildPlot()
