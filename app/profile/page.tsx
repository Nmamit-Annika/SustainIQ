"use client"

import { useEffect, useState } from "react"
import { getCarbonData, deleteCarbonEntry, getEmissionsTrend } from "@/lib/carbon-calculator"
import { Trash2, Download, Calendar } from "lucide-react"

export default function ProfilePage() {
  const [carbonData, setCarbonData] = useState<any>(null)
  const [trend, setTrend] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const data = getCarbonData()
    setCarbonData(data)

    const trendData = getEmissionsTrend()
    setTrend(trendData)
    setLoading(false)
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      deleteCarbonEntry(id)
      const data = getCarbonData()
      setCarbonData(data)

      const trendData = getEmissionsTrend()
      setTrend(trendData)
    }
  }

  const handleExport = () => {
    if (!carbonData) return

    const csv = [
      ["Date", "Category", "Subcategory", "Value", "Unit", "Emissions (kg CO2)"],
      ...carbonData.entries.map((entry: any) => [
        entry.date,
        entry.category,
        entry.subcategory,
        entry.value,
        entry.unit,
        entry.emissions.toFixed(2),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `carbon-footprint-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  const hasData = carbonData && carbonData.entries.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container-max max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Profile</h1>
          <p className="text-slate-600">Manage your carbon footprint history and data</p>
        </div>

        {!hasData ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-dashed border-slate-300">
            <Calendar className="mx-auto mb-4 text-accent" size={48} />
            <h2 className="text-2xl font-bold text-foreground mb-2">No History Yet</h2>
            <p className="text-slate-600 mb-6">
              Your carbon footprint entries will appear here once you start tracking.
            </p>
            <a
              href="/calculator"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Tracking
            </a>
          </div>
        ) : (
          <>
            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary">
                <p className="text-slate-600 text-sm mb-1">Total Entries</p>
                <p className="text-3xl font-bold text-primary">{carbonData.entries.length}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-accent">
                <p className="text-slate-600 text-sm mb-1">Total Emissions</p>
                <p className="text-3xl font-bold text-accent">{carbonData.totalEmissions.toFixed(0)}</p>
                <p className="text-xs text-slate-600">kg CO₂</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary/80">
                <p className="text-slate-600 text-sm mb-1">Average Entry</p>
                <p className="text-3xl font-bold text-primary/80">
                  {(carbonData.totalEmissions / carbonData.entries.length).toFixed(1)}
                </p>
                <p className="text-xs text-slate-600">kg CO₂</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-slate-700">
                <p className="text-slate-600 text-sm mb-1">Date Range</p>
                <p className="text-sm font-bold text-foreground">
                  {carbonData.entries.length > 0
                    ? `${carbonData.entries[0].date} to ${carbonData.entries[carbonData.entries.length - 1].date}`
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Trend Summary */}
            {trend && trend.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Trend Summary</h2>
                <div className="space-y-4">
                  {trend.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pb-4 border-b border-slate-200 last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">{item.date}</p>
                        <p className="text-sm text-slate-600">{item.emissions.toFixed(2)} kg CO₂</p>
                      </div>
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{
                            width: `${(item.emissions / Math.max(...trend.map((t: any) => t.emissions))) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mb-12">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <Download size={20} />
                Export as CSV
              </button>
              <a
                href="/calculator"
                className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-foreground rounded-lg font-semibold hover:bg-slate-300 transition-colors"
              >
                Add New Entry
              </a>
            </div>

            {/* Entries Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-foreground">All Entries</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300">
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Category</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Subcategory</th>
                      <th className="text-right py-4 px-6 font-semibold text-foreground">Value</th>
                      <th className="text-right py-4 px-6 font-semibold text-foreground">Emissions</th>
                      <th className="text-center py-4 px-6 font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonData.entries
                      .slice()
                      .reverse()
                      .map((entry: any) => (
                        <tr key={entry.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6 text-slate-600">{entry.date}</td>
                          <td className="py-4 px-6 text-foreground font-medium">{entry.category}</td>
                          <td className="py-4 px-6 text-slate-600">{entry.subcategory}</td>
                          <td className="py-4 px-6 text-right text-slate-600">
                            {entry.value} {entry.unit}
                          </td>
                          <td className="py-4 px-6 text-right font-semibold text-primary">
                            {entry.emissions.toFixed(2)} kg
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete entry"
                            >
                              <Trash2 size={18} />
                            </button>
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
