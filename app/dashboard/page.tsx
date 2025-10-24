"use client"

import { useEffect, useState } from "react"
import { getCarbonData, getEmissionsByCategory } from "@/lib/carbon-calculator"
import DonutChart from "@/components/charts/donut-chart"
import StackedBarChart from "@/components/charts/stacked-bar-chart"
import RadialChart from "@/components/charts/radial-chart"
import TrendChart from "@/components/charts/trend-chart"
import { AlertCircle, TrendingUp, Zap, Leaf, Droplet } from "lucide-react"

export default function DashboardPage() {
  const [carbonData, setCarbonData] = useState<any>(null)
  const [categoryData, setCategoryData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = getCarbonData()
    setCarbonData(data)

    const categories = getEmissionsByCategory()
    const categoryArray = Object.entries(categories).map(([name, value]) => ({
      name,
      value: value as number,
    }))
    setCategoryData(categoryArray)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const hasData = carbonData && carbonData.entries.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12">
      <div className="container-max">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-3">Your Carbon Dashboard</h1>
          <p className="text-lg text-slate-600">Track and analyze your environmental impact with detailed insights</p>
        </div>

        {!hasData ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-slate-300">
            <AlertCircle className="mx-auto mb-4 text-accent" size={48} />
            <h2 className="text-2xl font-bold text-foreground mb-2">No Data Yet</h2>
            <p className="text-slate-600 mb-6">
              Start by filling out the carbon calculator to see your visualizations here.
            </p>
            <a
              href="/calculator"
              className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
            >
              Go to Calculator
            </a>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg p-8 border-l-4 border-primary hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-600 text-sm font-semibold">Total Emissions</p>
                  <Leaf className="text-primary opacity-50" size={24} />
                </div>
                <p className="text-5xl font-bold text-primary mb-2">{carbonData.totalEmissions.toFixed(1)}</p>
                <p className="text-xs text-slate-600">kg CO₂</p>
              </div>

              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg p-8 border-l-4 border-accent hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-600 text-sm font-semibold">Entries Logged</p>
                  <Zap className="text-accent opacity-50" size={24} />
                </div>
                <p className="text-5xl font-bold text-accent mb-2">{carbonData.entries.length}</p>
                <p className="text-xs text-slate-600">measurements</p>
              </div>

              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg p-8 border-l-4 border-primary/80 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-600 text-sm font-semibold">Average per Entry</p>
                  <Droplet className="text-primary/80 opacity-50" size={24} />
                </div>
                <p className="text-5xl font-bold text-primary/80 mb-2">
                  {(carbonData.totalEmissions / carbonData.entries.length).toFixed(1)}
                </p>
                <p className="text-xs text-slate-600">kg CO₂</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Donut Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold text-foreground mb-6">Emissions Distribution</h2>
                <DonutChart data={categoryData} />
              </div>

              {/* Radial Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-bold text-foreground mb-6">Category Comparison</h2>
                <RadialChart data={categoryData} />
              </div>
            </div>

            {/* Stacked Bar Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-foreground mb-6">Emissions by Category Over Time</h2>
              <StackedBarChart entries={carbonData.entries} />
            </div>

            {/* Trend Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp size={24} className="text-primary" />
                Emissions Trend
              </h2>
              <TrendChart entries={carbonData.entries} />
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-foreground mb-6">Recent Entries</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Date</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Category</th>
                      <th className="text-right py-4 px-4 font-semibold text-foreground">Emissions (kg CO₂)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonData.entries
                      .slice(-10)
                      .reverse()
                      .map((entry: any) => (
                        <tr key={entry.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 text-slate-600">{entry.date}</td>
                          <td className="py-4 px-4 text-foreground font-medium">{entry.category}</td>
                          <td className="py-4 px-4 text-right font-semibold text-primary">
                            {entry.emissions.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
