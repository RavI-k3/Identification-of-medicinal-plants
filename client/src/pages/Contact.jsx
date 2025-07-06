import React from "react";

const Contact = () => {
    return (
        <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
            <header className="h-24 sm:h-32 flex items-center z-30 w-full">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
                        Contact Us
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
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
                    Get in Touch
                </h1>
                <p className="text-gray-700 dark:text-white">
                    Have questions or feedback? Reach out to us!
                </p>
            </div>
        </main>
    );
};

export default Contact;