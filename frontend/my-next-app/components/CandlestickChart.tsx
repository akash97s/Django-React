import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CandlestickChartProps {
    data: {
        data: {
            x: string;
            open: number;
            high: number;
            low: number;
            close: number;
        }[];
    };
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
    // console.log("candle stick chart data ", data)
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        // Clear any previous chart
        d3.select(chartRef.current).selectAll('*').remove();

        const svg = d3.select(chartRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.data.map(d => d.x))
            .range([0, width - margin.left - margin.right])
            .padding(0.2);

        const y = d3.scaleLinear()
            .domain([
                d3.min(data.data, d => d.low)!,
                d3.max(data.data, d => d.high)!
            ] as [number, number])
            .range([height - margin.top - margin.bottom, 0]);

        // Add X axis
        svg.append('g')
            .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        svg.append('g')
            .call(d3.axisLeft(y));

        // Draw the candlestick sticks (high-low lines)
        svg.selectAll('line.stem')
            .data(data.data)
            .enter()
            .append('line')
            .attr('class', 'stem')
            .attr('x1', d => x(d.x)! + x.bandwidth() / 2)
            .attr('x2', d => x(d.x)! + x.bandwidth() / 2)
            .attr('y1', d => y(d.high))
            .attr('y2', d => y(d.low))
            .attr('stroke', 'black');

        // Draw the candlestick bodies (rectangles)
        svg.selectAll('rect.candle')
            .data(data.data)
            .enter()
            .append('rect')
            .attr('class', 'candle')
            .attr('x', d => x(d.x)!)
            .attr('y', d => y(Math.max(d.open, d.close)))
            .attr('width', x.bandwidth())
            .attr('height', d => Math.abs(y(d.open) - y(d.close)))
            .attr('fill', d => (d.open > d.close ? 'red' : 'green'));

        // Add labels for each candlestick
        svg.selectAll('text.label')
            .data(data.data)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', d => x(d.x)! + x.bandwidth() / 2)
            .attr('y', d => y(d.high) - 5)
            .attr('text-anchor', 'middle')
            .text(d => d.x)
            .style('font-size', '10px')
            .style('fill', '#000');

    }, [data]);

    return <svg ref={chartRef} />;
};

export default CandlestickChart;
