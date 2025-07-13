import Image from "next/image";
import { MapPin, User, Globe, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <div className="relative">
      {/* Header */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  </div>
                </div>
                <span className="text-2xl font-bold text-red-600 italic">
                  Pizza Hut
                </span>
              </div>
            </div>

            {/* Right side navigation */}
            <div className="flex items-center space-x-6">
              {/* Location selector */}
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Салбар сонгох</span>
              </button>

              {/* Language selector */}
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm">English</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Login/Register */}
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm">Нэвтрэх / Бүртгүүлэх</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src="/pizza-hero.png"
          alt="Delicious Pizza Hut pizza with various toppings"
          fill
          className="object-cover"
          priority
        />

        {/* Anniversary Badge */}
        <div className="absolute top-8 right-8 flex items-center space-x-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-xs">Pizza Hut</span>
            </div>
          </div>
          <div className="bg-blue-600 rounded-full px-6 py-3">
            <div className="text-white text-center">
              <div className="text-3xl font-bold">
                30<sup className="text-sm">th</sup>
              </div>
              <div className="text-xs uppercase tracking-wider">
                Anniversary
              </div>
            </div>
          </div>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent"></div>
      </div>
    </div>
  );
}
