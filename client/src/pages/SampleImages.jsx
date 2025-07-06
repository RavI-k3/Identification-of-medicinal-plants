import React from "react";

const SampleImages = () => {
  const images = Array.from(
    { length: 15 },
    (_, i) =>
      `https://t3.ftcdn.net/jpg/06/11/24/66/360_F_611246666_UuaYs1qQuJllipq03mHE8o3Szd8D8uCV.jpg`
  );

  return (
    <main className="dark:bg-gray-800 bg-white relative overflow-y-scroll h-screen">
      <header className="h-24 sm:h-32 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
            Sample Images
          </div>
          <div className="flex items-center">
            <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
              <a href="/" className="py-2 px-6 flex">
                Home
              </a>
              <a href="/about" className="py-2 px-6 flex">
                About
              </a>
              <a href="/contact" className="py-2 px-6 flex">
                Contact
              </a>
              <a href="/sample-images" className="py-2 px-6 flex">
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
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Sample ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default SampleImages;
