import * as d3 from "d3";

export function barChart(){
	var width = 1000,
		barHeight = 25,
		numBars = 10,
		barMargin = 35,
		thumbWidth = 25,
		title = "Chart",
		type = "popularity",
		chartMargin = {
			top: 20,
			left: 20,
			bottom: 70,
			right: 20	      
		};

	function chart(selection){
		selection.each(function(data){
			numBars = data.length;

			var ratings = data.map(function(d){
				return Number(d[type]);
			});

			var height = (barHeight + barMargin) * numBars,
				outerHeight = height + chartMargin.top + chartMargin.bottom,
				outerWidth = width + chartMargin.left + chartMargin.right;


			var svg = d3.select(this)
				.attr('width',width)
				.attr('viewBox', '0 0 ' + outerWidth + ' ' + outerHeight)
				.append('g')
				.attr('transform', 'translate(' + chartMargin.left + ',' + chartMargin.top + ')');

			var x = d3.scaleLinear()
				.domain([0, d3.max(ratings)])
				.range([0, width]);

			var bars = svg.append('svg')
				.attr('height', height)
				.attr('class', 'bars');

			var bar = bars.selectAll('.movie')
				.data(data)
				.enter().append('g')
				.attr('class', 'movie')
				.attr('fill', 'url(#coolGradient)')
				.attr('transform', function(d, i){
					return 'translate(0, ' + i * (barHeight + barMargin) + ')';
				});

			bar.append('rect')
				.attr('width', function(d){
					return x(d[type]);
				})
				.attr('height', barHeight)
				.attr('transform', 'translate(0,' + barMargin/4 + ')');

			bar.append('image')
				.attr('width', thumbWidth)
				.attr('height', thumbWidth)
				.attr('y', barMargin/4)
				.attr('xlink:href', function(d){
					const image = "http://image.tmdb.org/t/p/w500/" + d.poster_path + ".jpg";
					console.log(image);
					return image; 
				});

			var barText = bar.append('text')
				.attr('x', function(d){
					return x(d[type]);
				})
				.attr('y', barMargin/4 + barHeight)
				.attr('dy', '1em')
				.attr('x', 3);

			barText.append('tspan')
				.attr('class', 'bar_title')
				.attr('dx', 10)
				.text(function(d){
					return d.title;
				});

			var xAxis = d3.axisBottom()
				.scale(x)
				.tickSize(5, 1)
				.tickPadding(5);


			svg.append('g')
				.attr('class', 'x axis')
				.call(xAxis)
				.attr('transform', 'translate(0,' + height + ')');

			svg.selectAll('.y.axis .tick text')
				.attr('dy', '0');

			svg.append('text')
				.attr('class','axisLabel')
				.attr('y', height)
				.attr('x', width/2)
				.attr('dy', '3em')
				.attr('text-anchor', 'middle')
				.text(title);	    
		});
	}

	chart.orderByRank = function() {
		d3.selectAll('.movie')
			.transition(700)
			.attr('fill', 'url(#warmGradient)')
			.attr('transform', function(d){
				return 'translate(0,' + (d.rank - 1) * (barHeight + barMargin) + ')';	    
			});
		return chart;
	};

	chart.orderByPlayCount = function() {
		d3.selectAll('.movie')
			.transition(700)
			.attr('fill', 'url(#coolGradient)')
			.attr('transform', function(d, i){
				return 'translate(0,' + i * (barHeight + barMargin) + ')';	    
			});
		return chart;	  
	};

	chart.chartTitle = function(value) {
		if (!arguments.length) {
			return title;
		}
		title = value;
		return chart;
	};

	chart.chartType = function(value) {
		if(!arguments.length) {
			return type;
		}
		type = value;
		return chart;
	}

	return chart;
}
