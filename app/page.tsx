import Link from "next/link"
import { ArrowRight, BarChart3, Leaf, TrendingDown } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
      <section className="container-max py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-semibold text-primary">🌱 Sustainability Tracking</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
              Track Your Carbon Footprint
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed text-pretty">
              Visualize your environmental impact with interactive charts and actionable insights. Make informed
              decisions to reduce your carbon emissions and build a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105"
              >
                Start Tracking
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all hover:shadow-lg"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="relative h-96 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 rounded-3xl flex items-center justify-center overflow-hidden shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 animate-pulse" />
                  <Leaf size={120} className="text-primary mx-auto relative z-10" />
                </div>
                <p className="text-slate-600 font-semibold text-lg">Interactive Visualizations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="container-max">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Why EcoDataViz?</h2>
          <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
            Comprehensive tools to understand and reduce your environmental impact
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:shadow-xl transition-all hover:border-primary/30 group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                <BarChart3 className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Beautiful Charts</h3>
              <p className="text-slate-600 leading-relaxed">
                Interactive D3.js visualizations that make your carbon data easy to understand and analyze at a glance.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:shadow-xl transition-all hover:border-primary/30 group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                <TrendingDown className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Track Progress</h3>
              <p className="text-slate-600 leading-relaxed">
                Monitor your emissions over time and see the impact of your sustainability efforts with detailed trends.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:shadow-xl transition-all hover:border-primary/30 group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                <Leaf className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Eco-Friendly</h3>
              <p className="text-slate-600 leading-relaxed">
                Built with sustainability in mind. All data is stored locally on your device for complete privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16 border-y border-slate-200">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">100%</p>
              <p className="text-slate-600">Private & Secure</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">Real-time</p>
              <p className="text-slate-600">Data Visualization</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">Actionable</p>
              <p className="text-slate-600">Insights & Tips</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-primary/80 to-primary text-white py-20">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
            Start tracking your carbon footprint today and join thousands of people making sustainable choices for a
            better tomorrow.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-slate-100 transition-all hover:shadow-lg hover:scale-105"
          >
            Begin Your Journey
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
