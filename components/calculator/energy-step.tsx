"use client"

interface EnergyStepProps {
  formData: any
  setFormData: (data: any) => void
}

export default function EnergyStep({ formData, setFormData }: EnergyStepProps) {
  const handleChange = (key: string, value: number) => {
    setFormData({
      ...formData,
      energy: {
        ...formData.energy,
        [key]: value,
      },
    })
  }

  const sources = [
    { key: "electricity", label: "Electricity (kWh/month)", placeholder: "e.g., 300" },
    { key: "naturalGas", label: "Natural Gas (m³/month)", placeholder: "e.g., 50" },
    { key: "heating", label: "Heating Oil (liters/month)", placeholder: "e.g., 100" },
  ]

  return (
    <div className="space-y-6">
      {sources.map((source) => (
        <div key={source.key}>
          <label className="block text-sm font-medium text-foreground mb-2">{source.label}</label>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder={source.placeholder}
            value={formData.energy[source.key] || ""}
            onChange={(e) => handleChange(source.key, Number.parseFloat(e.target.value) || 0)}
            className="input-field"
          />
        </div>
      ))}
    </div>
  )
}
