import { useScroll, useTransform, motion } from "framer-motion";
import { useRouter } from "next/navigation"; 

const Section2 = ({scrollYProgress}) => {

    const router = useRouter();
  
    const handleClick = () => {
      router.push("/contact");
    };
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div style={{ scale, rotate }} className=" sticky top-0 relative h-screen text-[3.5vw] flex flex-col items-center justify-center text-white">
      <div
          onClick={handleClick} 
          className="relative w-full h-screen bg-[#f0f0f0] text-[3.5vw] flex flex-col items-center justify-center text-white cursor-pointer"
        >
      <p  
      className="absolute left-10 bottom-0 font-normal pb-5 text-[48px] leading-none not-italic font-semibold font-Mokoto sm:text-[50px] ml-[-20px] md:text-[80px] lg:text-[120px] cursor-pointer"
      >Mobile Application Design & Development</p>

      <img
        src="/Social-Media2.jpg"
        alt="Mobile application UI concept with device frames and modern interface design"
        className="w-full h-full object-cover"
      />
      </div>
    </motion.div>
  );
};

export default Section2;
