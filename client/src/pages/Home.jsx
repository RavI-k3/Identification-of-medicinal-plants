import React from "react";
import { UploadCloud, CheckCircle, Users, Star } from "lucide-react";

const Home = () => {
  return (
    <main className="dark:bg-gray-800 bg-white">
      {/* Header */}
      <header className="h-24 sm:h-32 flex items-center w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
            Medicinal Plants
          </div>
          <div className="flex items-center">
            <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
              <a
                href="/"
                className="py-2 px-6 flex hover:text-pink-500 transition-colors"
              >
                Home
              </a>
              <a
                href="/about"
                className="py-2 px-6 flex hover:text-pink-500 transition-colors"
              >
                About
              </a>
              <a
                href="/contact"
                className="py-2 px-6 flex hover:text-pink-500 transition-colors"
              >
                Contact
              </a>
              <a
                href="/sample-images"
                className="py-2 px-6 flex hover:text-pink-500 transition-colors"
              >
                Sample Images
              </a>
            </nav>
            <button className="lg:hidden flex flex-col ml-4">
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 flex items-center h-[85vh]">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 flex flex-col space-y-8">
            <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-4"></span>
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black leading-none dark:text-white text-gray-800">
              Discover
              <span className="text-5xl sm:text-7xl block mt-2">
                Medicinal Plants
              </span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-white">
              Explore the therapeutic nature of medicinal plants and their
              ability to heal many diseases.
            </p>
            <div className="flex space-x-4">
              <a
                href="/predict"
                className="uppercase py-3 px-6 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md hover:bg-pink-600 transition-colors"
              >
                Get Started
              </a>
              <a
                href="/about"
                className="uppercase py-3 px-6 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <img
              src="https://t3.ftcdn.net/jpg/06/11/24/66/360_F_611246666_UuaYs1qQuJllipq03mHE8o3Szd8D8uCV.jpg"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              alt="Medicinal Plant"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-700 min-h-screen flex items-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg">
              <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
              <h3 className="font-semibold text-xl mt-4">Step 1: Upload</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Choose an image of the leaf.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg">
              <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
              <h3 className="font-semibold text-xl mt-4">Step 2: Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                We analyze the leaf properties.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg">
              <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
              <h3 className="font-semibold text-xl mt-4">Step 3: Results</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                View medicinal uses instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-36 min-h-screen flex items-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Why Analyze Leaves?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white  shadow-lg p-8 rounded-lg">
              <Star className="text-yellow-500 w-12 h-12 mx-auto" />
              <h3 className="font-semibold text-xl mt-4">Natural Remedies</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Find alternative healing options.
              </p>
            </div>
            <div className="bg-white  shadow-lg p-8 rounded-lg">
              <Star className="text-yellow-500 w-12 h-12 mx-auto" />
              <h3 className="font-semibold text-xl mt-4">Educational Use</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Learn about different plants.
              </p>
            </div>
            <div className="bg-white shadow-lg p-8 rounded-lg">
              <Star className="text-yellow-500 w-12 h-12 mx-auto" />
              <h3 className="font-semibold text-xl mt-4">Eco-Friendly</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Support sustainable knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-36 bg-gray-100 dark:bg-gray-700  flex items-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg">
              <Users className="text-blue-500 w-12 h-12 mx-auto" />
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                "This tool helped me identify healing plants!"
              </p>
              <span className="text-sm text-gray-500 mt-2">- A Happy User</span>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg">
              <Users className="text-blue-500 w-12 h-12 mx-auto" />
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                "Great for learning about medicinal plants!"
              </p>
              <span className="text-sm text-gray-500 mt-2">
                - Nature Enthusiast
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-green-600 text-white text-center  flex items-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold">Start Your Journey Today</h2>
          <p className="mt-4 text-lg">
            Upload an image and discover nature’s healing power.
          </p>
          <button className="mt-8 bg-white text-green-600 px-8 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition-colors">
            Upload Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
