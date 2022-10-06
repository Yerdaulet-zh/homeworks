async function buildBarPlot() {
    const data = await d3.csv("preprocessed.csv"); // read the data
    // console.table(data);

    const TemperatureLow = [
        {columns: ">40", value: 231},
        {columns: "<40", value: 89},
        {columns: "<30", value: 32},
        {columns: "<20", value: 10},
        {columns: "<10", value: 3}
    ];

    const TemperatureHigh = [
        {columns: ">40", value: 311},
        {columns: "<40", value: 42},
        {columns: "<30", value: 8},
        {columns: "<20", value: 4},
        {columns: "<10", value: 0}
    ];

    const TemperatureMin = [
        {columns: ">40", value: 219},
        {columns: "<40", value: 91},
        {columns: "<30", value: 38},
        {columns: "<20", value: 13},
        {columns: "<10", value: 4}
    ];

    const TemperatureMax = [
        {columns: ">40", value: 315},
        {columns: "<40", value: 40},
        {columns: "<30", value: 6},
        {columns: "<20", value: 4},
        {columns: "<10", value: 0}
    ];


    const width = 600;
    let dimensions = {
      width: width,
      height: width * 0.8,
      margin: {
        top: 20,
        right: 30,
        bottom: 20,
        left: 30,
      },
    };


    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    function handleClick(event){
        update(event.target.id);
    };

    var div = d3.select("#d3-container").append("div").attr('id', 'd3-buttons');
    
    function addButton(text, id_){
        div.append("button")
                .attr("id", id_)
                .attr("onClick", id_)
                .on('click', handleClick)
                .text(text);
    };
    addButton("Temperature Low", "TemperatureLow");
    addButton("Temperature High", "TemperatureHigh");
    addButton("Temperature Min", "TemperatureMin");
    addButton("Temperature Max", "TemperatureMax");

    var svg = d3.select("#d3-container")
        .append('svg')
        .attr('width', dimensions.boundedWidth)
        .attr('height', dimensions.boundedHeight + 100)
        .append('g')
        .attr('transform', "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");
    
    // X axis
    var x = d3.scaleBand()
        .range([0, dimensions.boundedWidth])
        .domain(TemperatureLow.map(function(d) {return d.columns}))
        .padding(0.2);
    svg.append('g')
        .attr('transform', 'translate(0,' + dimensions.boundedHeight + ')')
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 300])
        .range([dimensions.boundedHeight, 0])
    svg.append('g')
        .attr('class', 'myYaxis')
        .call(d3.axisLeft(y));

    function update(data) {
        console.table(data);
        var u = svg.selectAll('rect')
                .data(data);

        u.enter()
                .append("rect")
                        .attr("x", function(d) { return x(d.columns); })
                        .attr("y", function(d) { return y(d.value); })
                        .attr("width", x.bandwidth())
                        .attr("height", function(d) {return dimensions.boundedHeight - y(d.value);})
                        .attr("fill", "#3498DB")
    
        };

    update(TemperatureLow);
}

buildBarPlot()
