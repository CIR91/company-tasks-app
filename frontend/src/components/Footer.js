// web/frontend/src/components/Footer.js
import React from 'react';
export default function Footer() {
  return (
    <footer className="bg-white border-t py-4 mt-6">
      <div className="text-center text-sm text-gray-600">
        © {new Date().getFullYear()} TaskApp
      </div>
    </footer>
  );
}
