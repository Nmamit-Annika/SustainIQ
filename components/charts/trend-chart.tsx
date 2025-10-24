"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface TrendChartProps {
  entries: Array<{ date: string; emissions: number }>
}

export default function TrendChart({ entries }: TrendChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !entries || entries.length === 0) return

    // Aggregate emissions by date
    const aggregated: Record<string, number> = {}
    entries.forEach((entry) => {
      aggregated[entry.date] = (aggregated[entry.date] || 0) + entry.emissions
    })

    const data = Object.entries(aggregated)
      .map(([date, emissions]) => ({ date, emissions }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const width = 800
    const height = 300
    const margin = { top: 20, right: 20, bottom: 40, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)

    svg.selectAll("*").remove()

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const xScale = d3
      .scaleTime()
      .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
      .range([0, innerWidth])

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data.map((d) => d.emissions))])
      .range([innerHeight, 0])

    const line = d3
      .line<any>()
      .x((d) => xScale(new Date(d.date)))
      .y((d) => yScale(d.emissions))

    g.append("path").datum(data).attr("fill", "none").attr("stroke", "#2d7d4d").attr("stroke-width", 3).attr("d", line)

    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(new Date(d.date)))
      .attr("cy", (d) => yScale(d.emissions))
      .attr("r", 4)
      .attr("fill", "#2d7d4d")
      .style("opacity", 0.7)
      .on("mouseover", function () {
        d3.select(this).attr("r", 6).style("opacity", 1)
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", 4).style("opacity", 0.7)
      })

    g.append("g").attr("transform", `translate(0,${innerHeight})`).call(d3.axisBottom(xScale)).attr("font-size", "12px")

    g.append("g").call(d3.axisLeft(yScale)).attr("font-size", "12px")
  }, [entries])

  return <svg ref={svgRef} className="w-full" />
}
