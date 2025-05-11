import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

type Props = {
  title: string;
  budget: number;
  dailyExpenses: { date: string; amount: number }[]; // ISO date strings
};

const CumulativeExpenseLineChart: React.FC<Props> = ({
  title,
  budget,
  dailyExpenses,
}) => {
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
    const parsedData = dailyExpenses
      .map((d) => ({
        date: parseDate(d.date) as Date,
        amount: d.amount,
      }))
      .sort((a, b) => +a.date - +b.date);

    // Compute cumulative expense
    let cumulative = 0;
    const cumulativeData = parsedData.map((d) => {
      cumulative += d.amount;
      return { ...d, cumulative };
    });

    // x-axis scale (dates)
    const x = d3
      .scaleTime()
      .domain(d3.extent(cumulativeData, (d) => d.date) as [Date, Date])
      .range([0, width]);

    // y-axis scale (percentage of budget)
    const y = d3
      .scaleLinear()
      .domain([0, budget * 1.5]) // gives 10% headroom above budget
      .nice()
      .range([height, 0]);

    // Line generator for cumulative expense
    const line = d3
      .line<{ date: Date; cumulative: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.cumulative));

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

    // Budget line (constant at 100%)
    g.append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", y(budget))
      .attr("y2", y(budget))
      .attr("stroke", "#52c41a")
      .attr("stroke-width", 2)
      .style("stroke-dasharray", "4");

    // Cumulative expense line
    g.append("path")
      .datum(cumulativeData)
      .attr("fill", "none")
      .attr("stroke", "#1890ff")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    // Add legend
    const legend = g
      .append("g")
      .attr("transform", `translate(${width - 120}, 0)`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "#52c41a");
    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 10)
      .text("Budget")
      .style("font-size", "12px");

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "#1890ff");
    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 30)
      .text("Cumulative Expense")
      .style("font-size", "12px");
  }, [dailyExpenses, budget]);

  return (
    <div style={{ padding: "1rem" }}>
      <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>{title}</h3>
      <svg ref={ref} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default CumulativeExpenseLineChart;
