import { useScroll, useTransform, motion } from "framer-motion";
import { useRouter } from "next/navigation"; 


const Section2 = ({ scrollYProgress }) => {

    const router = useRouter();
  
    const handleClick = () => {
      router.push("/Expertise/Branding-n-Design");
    };
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className=" sticky top-0 relative h-screen text-[3.5vw] flex flex-col items-center justify-center text-white"
    >
      <div
          onClick={handleClick} 
          className="relative w-full h-screen text-[3.5vw] flex flex-col items-center justify-center text-white cursor-pointer"
        >
      <p 
        className="absolute left-10 bottom-0 font-normal pb-5 text-[45px] leading-none not-italic font-semibold font-Mokoto sm:text-[3.5vw] ml-[-20px] md:text-[80px] lg:text-[120px] cursor-pointer"
        >Branding & Identity</p>

      <img
        src="/Brand3.jpg"
        alt="Creative branding and design concept with logo sketches, typography samples, and color palette swatches"
        className="w-full h-full object-cover"
      />
      </div>
    </motion.div>
  );
};

export default Section2;
