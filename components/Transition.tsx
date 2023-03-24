"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const Transition = ({ children }: Props) => {
  const pathname = usePathname();

  const variants = {
    out: {
      opacity: 0,
      filter: "blur(3px)",
      transition: {
        duration: 0.1,
      },
    },
    in: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pathname}
        className="top-level-div"
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
