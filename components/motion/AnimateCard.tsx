"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

const AnimateCard = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={cn(
              "bg-background h-104 min-h-104 w-72 rounded-lg border p-4",
              "flex flex-col",
            )}
            onClick={() => setOpen(false)}
          >
            <div className="mb-2">
              <h2>Hello World</h2>
              <p>This is a card</p>
            </div>

            <div className="border-muted flex-1 rounded-sm border bg-gray-50">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.98,
                  filter: "blur(10px)",
                }}
                whileHover={{
                  opacity: 1,
                  scale: 1.05,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="flex flex-col gap-3 divide-y divide-neutral-200 p-4"
              >
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimateCard;
