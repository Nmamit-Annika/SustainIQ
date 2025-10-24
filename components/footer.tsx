export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 mt-20">
      <div className="container-max">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">EcoDataViz</h3>
            <p className="text-sm text-white/70">Track your carbon footprint and make sustainable choices.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/calculator" className="hover:text-accent transition-colors">
                  Calculator
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-accent transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/profile" className="hover:text-accent transition-colors">
                  Profile
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
          <p>&copy; 2025 EcoDataViz. All rights reserved. Made with care for the planet.</p>
        </div>
      </div>
    </footer>
  )
}
