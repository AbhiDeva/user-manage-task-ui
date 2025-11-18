import React from 'react';

export default function HolyGrailLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center font-bold">Header</header>

      {/* Main content area with 3 columns */}
      <div className="flex flex-1">
        {/* Left navigation */}
        <nav className="w-1/5 bg-gray-200 p-4">
          <ul className="space-y-2">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </nav>

        {/* Center content */}
        <main className="flex-1 bg-gray-50 p-4">
          <h2 className="text-xl font-bold mb-2">Main Content</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ligula sed augue fermentum.</p>
          <p>Additional content goes here...</p>
        </main>

        {/* Right ads */}
        <aside className="w-1/5 bg-gray-200 p-4">
          <h3 className="font-bold mb-2">Ads</h3>
          <p>Ad content 1</p>
          <p>Ad content 2</p>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center font-bold">Footer</footer>
    </div>
  );
}
