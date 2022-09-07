import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

const Transition = ({ children }: Props) => {
  const { asPath } = useRouter();

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
    <AnimatePresence initial={false} exitBeforeEnter>
      <motion.div
        key={asPath}
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
