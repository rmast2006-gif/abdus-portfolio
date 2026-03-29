import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete(); // hide loader
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // speed of loading

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Big Percentage */}
      <h1 className="text-6xl md:text-8xl font-black text-white mb-8">
        {progress}%
      </h1>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Optional Text */}
      <p className="text-gray-400 mt-6 text-sm tracking-widest uppercase">
        Loading Portfolio...
      </p>
    </motion.div>
  );
};

export default Loader;