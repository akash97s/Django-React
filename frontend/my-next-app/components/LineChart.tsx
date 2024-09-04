import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface LineChartProps {
    data: {
        labels: string[];
        data: number[];
    };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    // console.log("line chart data ", data)
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

        const x = d3.scalePoint()
            .domain(data.labels)
            .range([0, width - margin.left - margin.right]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data.data) || 0])
            .range([height - margin.top - margin.bottom, 0]);

        const line = d3.line<number>()
            .x((d, i) => x(data.labels[i])!)
            .y(d => y(d))
            .curve(d3.curveMonotoneX);

        // Add the X Axis
        svg.append('g')
            .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append('g')
            .call(d3.axisLeft(y));

        // Add the line path
        svg.append('path')
            .datum(data.data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line);

        // Add circles for each data point
        svg.selectAll('circle')
            .data(data.data)
            .enter()
            .append('circle')
            .attr('cx', (d, i) => x(data.labels[i])!)
            .attr('cy', d => y(d))
            .attr('r', 4)
            .attr('fill', 'steelblue');

        // Add labels for each data point
        svg.selectAll('text.label')
            .data(data.data)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', (d, i) => x(data.labels[i])!)
            .attr('y', d => y(d) - 10)
            .attr('text-anchor', 'middle')
            .text((d, i) => `${data.labels[i]}: ${d}`)
            .style('font-size', '12px')
            .style('fill', '#000'); // Ensure text is visible

    }, [data]);

    return <svg ref={chartRef} />;
};

export default LineChart;

