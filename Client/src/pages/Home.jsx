import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="text-center bg-cover bg-hero-pattern py-20 px-4">
        <h1 className="text-5xl font-bold text-red-800 dark:text-white">Welcome to InkForge</h1>
        <p className="text-xl text-gray-300 mt-4">Dive into the depths of software development.</p>
        <button className="mt-8 bg-blue-500 text-white font-bold py-2 px-4 rounded">Explore Now</button>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center">About Us</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-4xl mx-auto">
          InkForge is the nexus where technology enthusiasts, industry veterans, and visionary creators converge to share their insights on the evolving world of software development. From the intricacies of artificial intelligence and machine learning to the creative challenges of game development, InkForge offers a platform for exploration, discussion, and inspiration. Our community thrives on the exchange of ideas, fostering a space where every voice can contribute to the tapestry of tech innovation. Join us as we navigate the ever-changing landscape of technology, one post at a time.
        </p>
      </section>

      {/* View Recent Posts Section */}
      <section className="py-20 px-4 bg-gray-50">
        <h2 className="text-4xl font-bold text-center">Recent Posts</h2>
        <p className="text-lg text-gray-600 mt-4 text-center">Stay updated with the latest trends and insights from the world of software development.</p>
        <div className="flex justify-center mt-6">
          <button className="bg-green-500 text-white font-bold py-2 px-6 rounded hover:bg-green-600 transition duration-200">View Posts</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-800 text-white text-center py-4">
        <p>Contact us at info@inkforge.com</p>
      </footer>
    </div>
  );
};

export default Home;