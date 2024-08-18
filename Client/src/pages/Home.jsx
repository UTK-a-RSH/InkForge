import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  function handleExploreNowClick() {
    navigate('/projects'); 
  }

  return (
    <div className="min-h-screen flex flex-col">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center bg-cover bg-hero-pattern py-20 px-4"
      >
        <h1 className="text-5xl font-bold text-black dark:text-white">Welcome to  <span className=' w-full px-2 py-2 bg-gradient-to-r from-red-700 via-black to-black rounded-xl text-white'>INK</span>Forge</h1>
        <p className="text-xl text-black dark:text-gray-200 mt-4">Dive into the depths of Computer Science.</p>
        <button className="mt-8 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out" onClick={handleExploreNowClick}>Explore Now</button>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="py-20 px-4"
      >
        <h2 className="text-4xl font-bold text-center">Enlightening Innovation and Igniting Minds</h2>
        
      </motion.section>

      
    </div>
  );
};

export default Home;