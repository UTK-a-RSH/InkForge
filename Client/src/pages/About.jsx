export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About InkForge
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
             Welcome to InkForge. This open source project is a part of my journey as a developer in the field of software development. This is an application where you will find me and others writing stuffs about our expierences of pioneering the field of Computer Science.
            </p>

            <p>
             This application will also guide the students and enthusiasts of Computer Science towards the world of Open Source Development. Towards the ideas with creativity and innovation. 
             Articles on projects from very own Github Organization " <a href="https://github.com/The-Lord-Buddha-Club" class="text-blue-500 hover:text-blue-700 underline">
  The Lord Buddha Club
</a>" will be delievered here.   
            </p>

            <p>
             Finally this is about me the author of this beautiful project which no one is interesting to knowing about. To know more about me follow me on Github and X. 
             Thank You.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}