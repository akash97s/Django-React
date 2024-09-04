import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
    data: {
        labels: string[];
        data: number[];
    };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    // console.log("bar chart data ", data)
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };

        // Clear any previous chart
        d3.select(chartRef.current).selectAll('*').remove();

        const svg = d3.select(chartRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.labels)
            .range([0, width - margin.left - margin.right])
            .padding(0.2);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data.data)!])
            .range([height - margin.top - margin.bottom, 0]);

        // Add X axis
        svg.append('g')
            .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        svg.append('g')
            .call(d3.axisLeft(y));

        // Draw the bars
        svg.selectAll('rect.bar')
            .data(data.data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d, i) => x(data.labels[i])!)
            .attr('y', d => y(d))
            .attr('width', x.bandwidth())
            .attr('height', d => height - margin.top - margin.bottom - y(d))
            .attr('fill', 'steelblue');

        // Add labels on bars
        svg.selectAll('text.bar-label')
            .data(data.data)
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', (d, i) => x(data.labels[i])! + x.bandwidth() / 2)
            .attr('y', d => y(d) - 5)
            .attr('text-anchor', 'middle')
            .text((d, i) => `${data.labels[i]}: ${d}`)
            .style('font-size', '10px')
            .style('fill', '#000');

    }, [data]);

    return <svg ref={chartRef} />;
};

export default BarChart;
