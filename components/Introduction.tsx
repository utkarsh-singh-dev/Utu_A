"use client";

import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useClickOutside from "@/hooks/useClickOutside";
import confetti from "canvas-confetti";

const Introduction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDownloadClick = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
  };

  useClickOutside(dialogRef, handleClose);

  return (
    <div className="bg-card rounded-2xl p-8 flex flex-col justify-center">
      <h3 className="text-xl mb-4">Hello There!</h3>
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Data Science, redefining Quantum tech, building Robots, launching Payloads, and Securing systems.
      </h2>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <p className="text-muted-foreground">Available for Freelancing</p>
      </div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 w-fit transition-colors duration-300"
            onClick={() => setIsOpen(true)}
          >
            Download Resume
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent ref={dialogRef} className="flex flex-col items-center justify-center p-8">
          <button
            className="absolute top-4 right-4 text-black dark:text-white text-xl hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
            onClick={handleClose}
          >
            ×
          </button>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {`Brace yourself to hire this amazing\n<👨🏻‍💻 FullStack Developer>\n🚀Rocket Scientist ...\n⚛Researcher 👨🏻‍🔬Innovator\nand 🕵🏻‍♂️ Cybersecurity Professional`}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="mt-6 flex justify-center w-full">
            <a
              href="https://docs.google.com/document/d/1XtyuL-u3eJaQcQHUomMHpY0IQPtd2DNUBEXOJdvwiKY/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              onClick={handleDownloadClick}
            >
              Download Resume
            </a>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Introduction;