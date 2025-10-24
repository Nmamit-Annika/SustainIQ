"use client"

interface WasteStepProps {
  formData: any
  setFormData: (data: any) => void
}

export default function WasteStep({ formData, setFormData }: WasteStepProps) {
  const handleChange = (key: string, value: number) => {
    setFormData({
      ...formData,
      waste: {
        ...formData.waste,
        [key]: value,
      },
    })
  }

  const types = [
    { key: "plastic", label: "Plastic Waste (kg/week)", placeholder: "e.g., 2" },
    { key: "paper", label: "Paper Waste (kg/week)", placeholder: "e.g., 1" },
    { key: "organic", label: "Organic Waste (kg/week)", placeholder: "e.g., 3" },
  ]

  return (
    <div className="space-y-6">
      {types.map((type) => (
        <div key={type.key}>
          <label className="block text-sm font-medium text-foreground mb-2">{type.label}</label>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder={type.placeholder}
            value={formData.waste[type.key] || ""}
            onChange={(e) => handleChange(type.key, Number.parseFloat(e.target.value) || 0)}
            className="input-field"
          />
        </div>
      ))}
    </div>
  )
}
