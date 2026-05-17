import { motion, useTransform } from "framer-motion";
import { useRouter } from "next/navigation"; 

const Section1 = ({ scrollYProgress }) => {
  const router = useRouter(); 

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  const handleClick = () => {
    router.push("/Expertise/Web-Development");
  };

  return (
    <>    
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen flex flex-col items-center justify-center text-white pb-[10vh]"
      >

      <div className="flex gap-4">
        <div
          onClick={handleClick} 
          className="relative w-full h-screen bg-[#f0f0f0] flex flex-col items-center justify-center text-white cursor-pointer"
          >
          <p
            className="absolute left-10 bottom-0 font-normal pb-5 text-[45px] leading-none not-italic font-semibold font-Mokoto sm:text-[50px] ml-[-20px] md:text-[80px] lg:text-[120px] cursor-pointer"
            >
            Web Design & Development
          </p>
          <img src="/Website.jpg" alt="Modern website homepage design showcasing clean UI, responsive layout, and professional web development best practices"
 className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.div>
            </>
  );
};

export default Section1;
