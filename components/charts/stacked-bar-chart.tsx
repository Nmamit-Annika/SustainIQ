"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface StackedBarChartProps {
  entries: Array<{ date: string; emissions: number; category: string }>
}

export default function StackedBarChart({ entries }: StackedBarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !entries || entries.length === 0) return

    const groupedData: Record<string, Record<string, number>> = {}
    entries.forEach((entry) => {
      if (!groupedData[entry.date]) {
        groupedData[entry.date] = {}
      }
      groupedData[entry.date][entry.category] = (groupedData[entry.date][entry.category] || 0) + entry.emissions
    })

    const data = Object.entries(groupedData)
      .map(([date, categories]) => ({ date, ...categories }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const categories = Array.from(new Set(entries.map((e) => e.category)))
    const colors = ["#2d7d4d", "#4a9d6f", "#e8b44f", "#f5d17a", "#d4cfc8"]

    const width = 800
    const height = 350
    const margin = { top: 20, right: 20, bottom: 40, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)

    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, innerWidth])
      .padding(0.2)

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        Math.max(...data.map((d) => categories.reduce((sum, cat) => sum + (d[cat as keyof typeof d] || 0), 0))),
      ])
      .range([innerHeight, 0])

    const stack = d3.stack<any>().keys(categories)
    const stackedData = stack(data)

    g.selectAll(".series")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "series")
      .attr("fill", (d, i) => colors[i % colors.length])
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.data.date) || 0)
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .style("opacity", 0.85)
      .on("mouseover", function () {
        d3.select(this).transition().duration(200).style("opacity", 1)
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).style("opacity", 0.85)
      })

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("font-size", "12px")

    g.append("g").call(d3.axisLeft(yScale)).attr("font-size", "12px")
  }, [entries])

  return <svg ref={svgRef} className="w-full" />
}
