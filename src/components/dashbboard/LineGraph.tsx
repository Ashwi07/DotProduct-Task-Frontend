import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

type Props = {
  title: string;
  data: { date: string; amount: number }[]; // ISO date strings
};

const LineGraph: React.FC<Props> = ({ title, data }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 20, bottom: 80, left: 50 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const parseDate = d3.timeParse("%Y-%m-%d");
    const formatDate = d3.timeFormat("%b %d");

    // Parse and sort dates
    const parsedData = data
      .map((d) => ({
        date: parseDate(d.date) as Date,
        amount: d.amount,
      }))
      .sort((a, b) => +a.date - +b.date);

    // x-axis scale (dates)
    const x = d3
      .scaleTime()
      .domain(d3.extent(parsedData, (d) => d.date) as [Date, Date])
      .range([0, width]);

    // y-axis scale (amount)
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(parsedData, (d) => d.amount) as number])
      .nice()
      .range([height, 0]);

    // Line generator for expenses
    const line = d3
      .line<{ date: Date; amount: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.amount));

    const g = svg
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(formatDate as any))
      .selectAll("text")
      .style("font-size", "12px")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em");

    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("font-size", "12px");

    // Cumulative expense line
    g.append("path")
      .datum(parsedData)
      .attr("fill", "none")
      .attr("stroke", "#1890ff")
      .attr("stroke-width", 2.5)
      .attr("d", line);
  }, [data]);

  return (
    <div style={{ padding: "1rem" }}>
      <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>{title}</h3>
      <svg ref={ref} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default LineGraph;
