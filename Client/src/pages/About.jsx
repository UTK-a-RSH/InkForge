import { motion } from 'framer-motion';

export default function About() {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } },
  };

  // Animation variants for individual paragraphs
  const paragraphVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
  };

  return (
    <motion.div
      className='min-h-screen flex items-center justify-center'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <motion.h1
            className='text-3xl font font-semibold text-center my-7'
            variants={paragraphVariants}
          >
            About <span className=' w-full px-2 py-2 bg-gradient-to-r from-red-700 via-black to-black rounded-xl text-white'>INK</span>Forge
          </motion.h1>
          <motion.div
            className='text-md text-gray-500 flex flex-col gap-6'
            variants={paragraphVariants}
          >
            <p>
              Welcome to InkForge. This open source project is a part of my journey as a developer in the field of software development. This is an application where you will find me and others writing stuffs about our experiences of pioneering the field of Computer Science.
            </p>

            <p>
              This application will also guide the students and enthusiasts of Computer Science towards the world of Open Source Development. Towards the ideas with creativity and innovation. 
              Articles on projects from very own Github Organization " <a href="https://github.com/The-Lord-Buddha-Club" class="text-blue-500 hover:text-blue-700 underline">
    The Lord Buddha Club
  </a>" will be delivered here.   
            </p>

            <p>
              Finally, this is about me, the author of this beautiful project which no one is interesting to know about. To know more about me follow me on Github and X. 
              Thank You.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}