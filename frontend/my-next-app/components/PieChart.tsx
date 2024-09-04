import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface PieChartProps {
    data: {
        labels: string[];
        data: number[];
    };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    // console.log("pie chart data ", data)
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        // Clear any previous chart
        d3.select(chartRef.current).selectAll('*').remove();

        const svg = d3.select(chartRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal<string>()
            .domain(data.labels)
            .range(d3.schemeCategory10);

        const pie = d3.pie<number>()
            .value(d => d)
            .sort(null);

        const arc = d3.arc<d3.PieArcDatum<number>>()
            .innerRadius(0)
            .outerRadius(radius);

        const arcs = svg.selectAll('arc')
            .data(pie(data.data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.toString()));

        // Add labels on the slices
        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .text((d, i) => data.labels[i])
            .style('font-size', '14px')
            .style('fill', '#fff'); // Change color for better contrast if needed

        // Add a legend for better understanding
        const legend = svg.append('g')
            .attr('transform', `translate(${width / 2 + 20}, -${height / 2})`);

        data.labels.forEach((label, i) => {
            const legendRow = legend.append('g')
                .attr('transform', `translate(0, ${i * 20})`);

            legendRow.append('rect')
                .attr('width', 18)
                .attr('height', 18)
                .attr('fill', color(label));

            legendRow.append('text')
                .attr('x', 24)
                .attr('y', 9)
                .attr('dy', '.35em')
                .text(label)
                .style('font-size', '14px')
                .style('text-anchor', 'start');
        });
    }, [data]);

    return <svg ref={chartRef} />;
};

export default PieChart;
