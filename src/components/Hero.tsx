"use client";

import { MapPin, ChevronDown } from "lucide-react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Main heading */}
      <div className="text-center mb-12 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
          Order food & groceries. Discover best restaurants. Swiggy it!
        </h1>
      </div>

      {/* Search section */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl mb-16">
        {/* Location selector */}
        <div className="flex items-center gap-2 bg-white rounded-lg px-6 py-4 flex-1 cursor-pointer hover:shadow-lg transition-shadow">
          <MapPin className="h-5 w-5 text-orange-500 shrink-0" />
          <input
            type="text"
            placeholder="Enter your delivery location"
            className="bg-transparent text-gray-700 text-sm placeholder-gray-500 outline-none w-full"
          />
          <ChevronDown className="h-4 w-4 text-gray-700 shrink-0" />
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 bg-white rounded-lg px-6 py-4 flex-1 md:flex-2 cursor-pointer hover:shadow-lg transition-shadow">
          <SearchBar />
        </div>
      </div>

      {/* Service cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Food Delivery Card */}
        <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
          <div className="h-56 bg-linear-to-br from-yellow-300 via-red-400 to-pink-500 flex items-center justify-center">
            <div className="text-6xl">🍲</div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">FOOD DELIVERY</h3>
            <p className="text-gray-600 text-sm mb-4">FROM RESTAURANTS</p>
            <p className="text-orange-500 font-bold text-lg">UPTO 60% OFF</p>
          </div>
        </div>

        {/* Instamart Card */}
        <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
          <div className="h-56 bg-linear-to-br from-green-300 via-green-400 to-emerald-500 flex items-center justify-center">
            <div className="text-6xl">🛒</div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">INSTAMART</h3>
            <p className="text-gray-600 text-sm mb-4">INSTANT GROCERY</p>
            <p className="text-orange-500 font-bold text-lg">UPTO 60% OFF</p>
          </div>
        </div>

        {/* Dineout Card */}
        <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
          <div className="h-56 bg-linear-to-br from-purple-300 via-purple-400 to-indigo-500 flex items-center justify-center">
            <div className="text-6xl">🍽️</div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">DINEOUT</h3>
            <p className="text-gray-600 text-sm mb-4">EAT OUT & SAVE MORE</p>
            <p className="text-orange-500 font-bold text-lg">UPTO 50% OFF</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;