'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const holdImages = [
  { src: '/images/climbing_hold_3.png', x: -15 },
  { src: '/images/climbing_hold_2.png', x: 15 },
  { src: '/images/climbing_hold_1.png', x: -15 },
];

const Spinner = () => {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setCycle((prev) => prev + 1);
      },
      holdImages.length * 300 + 600,
    );

    return () => clearTimeout(timer);
  }, [cycle]);

  return (
    <div className="flex flex-col items-center gap-[2px]">
      {holdImages.map(({ src, x }, index) => (
        <motion.div
          key={`${src}-${cycle}`}
          initial={{ opacity: 0, y: 50, x }}
          animate={{ opacity: 1, y: 0, x }}
          transition={{
            delay: (holdImages.length - 1 - index) * 0.3,
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          <Image src={src} width={50} height={40} alt={`climbing hold ${3 - index}`} />
        </motion.div>
      ))}
    </div>
  );
};

export default Spinner;
