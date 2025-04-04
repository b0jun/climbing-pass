import { motion } from 'framer-motion';
const Spinner = () => {
  return (
    <motion.img
      src="/images/climbing_hold.png"
      alt="spinner"
      width={70}
      height={70}
      animate={{
        rotate: [0, 10, -10, 0],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export default Spinner;
