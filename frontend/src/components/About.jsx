
import manzilImage from "/manzil1.png"; 

const About = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen px-6 md:px-12 lg:px-14">
      <div className="container mx-auto pt-10 md:pt-16 lg:pt-24">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 md:text-5xl">
          About Us
        </h1>

        {/* Flex container for text and image */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-8">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-left md:text-justify space-y-6">
            <p className="text-lg md:text-xl leading-relaxed">
              Welcome to our magazine website! We offer the latest articles on various topics, ranging from 
              technology, lifestyle, health, and more. Stay updated with fresh and dynamic content tailored to 
              keep you informed and engaged.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Bharati Vidyapeeth&apos;s Institute of Computer Applications and Management (BVICAM), New Delhi, is 
              one of the 187 institutions under Bharati Vidyapeeth, Pune. With a clear vision and mission to 
              serve the cause of higher education in India, the Institute started conducting the 
              Master of Computer Applications (MCA) programme from the academic year 2002-2003.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              The Institute is affiliated with Guru Gobind Singh Indraprastha University (GGSIPU), 
              Sector 16C Dwarka, New Delhi-78. It is also approved by the All India Council for Technical 
              Education (AICTE), Ministry of HRD, Government of India, New Delhi.
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={manzilImage}
              alt="MANZIL"
              className="rounded-lg shadow-lg max-w-full h-auto"
              style={{ maxWidth: "450px" }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
