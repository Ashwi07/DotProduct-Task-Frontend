import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type ChartData = {
  category: string;
  Budget: number;
  Expense: number;
};

type Props = {
  title: string;
  data: ChartData[];
};

const DoubleBarChart: React.FC<Props> = ({ title, data }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 20, bottom: 80, left: 50 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const subgroups = ["Budget", "Expense"];
    const groups = data.map((d) => d.category);

    const x0 = d3.scaleBand().domain(groups).range([0, width]).padding(0.2);
    const x1 = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.Budget, d.Expense))! * 1.1])
      .range([height, 0]);

    const color = d3
      .scaleOrdinal<string>()
      .domain(subgroups)
      .range(["#1890ff", "#fa541c"]);

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0).tickSize(0))
      .selectAll("text")
      .style("font-size", "12px")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-40)")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em");

    // Y Axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("font-size", "12px");

    // Bars
    g.append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d) => `translate(${x0(d.category) || 0},0)`)
      .selectAll("rect")
      .data((d) =>
        subgroups.map((key) => ({ key, value: d[key as keyof ChartData] }))
      )
      .join("rect")
      .attr("x", (d) => x1(d.key)!)
      .attr("y", (d) => y(Number(d.value)))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => height - y(Number(d.value)))
      .attr("fill", (d) => color(d.key) as string);

    // Legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 80}, ${margin.top - 30})`);

    subgroups.forEach((key, i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 20})`);

      legendRow
        .append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", color(key) as string);

      legendRow
        .append("text")
        .attr("x", 18)
        .attr("y", 10)
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .text(key);
    });
  }, [data]);

  return (
    <div style={{ padding: "1rem" }}>
      <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>{title}</h3>
      <svg ref={ref} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default DoubleBarChart;
