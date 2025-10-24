"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TransportationStep from "@/components/calculator/transportation-step"
import EnergyStep from "@/components/calculator/energy-step"
import FoodStep from "@/components/calculator/food-step"
import WasteStep from "@/components/calculator/waste-step"
import ReviewStep from "@/components/calculator/review-step"

export default function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    transportation: { car: 0, bus: 0, train: 0, flight: 0 },
    energy: { electricity: 0, naturalGas: 0, heating: 0 },
    food: { beef: 0, chicken: 0, fish: 0, vegetables: 0, dairy: 0 },
    waste: { plastic: 0, paper: 0, organic: 0 },
  })

  const steps = [
    { title: "Transportation", component: TransportationStep },
    { title: "Energy", component: EnergyStep },
    { title: "Food", component: FoodStep },
    { title: "Waste", component: WasteStep },
    { title: "Review", component: ReviewStep },
  ]

  const CurrentStepComponent = steps[currentStep].component

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container-max max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${
                    index <= currentStep ? "bg-primary text-white" : "bg-slate-300 text-slate-700"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs text-center text-slate-600 hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-slate-300 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">{steps[currentStep].title}</h2>
          <p className="text-slate-600 mb-8">
            {currentStep === 0 && "How do you travel? Enter your weekly or monthly distances."}
            {currentStep === 1 && "Tell us about your energy consumption."}
            {currentStep === 2 && "What's your typical diet like?"}
            {currentStep === 3 && "How much waste do you generate?"}
            {currentStep === 4 && "Review your carbon footprint summary."}
          </p>

          <CurrentStepComponent formData={formData} setFormData={setFormData} />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-foreground rounded-lg font-medium hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
