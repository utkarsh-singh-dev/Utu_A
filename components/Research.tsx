'use client';

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Dialog } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Cpu, Sun, ArrowRight } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";

interface ResearchPaper {
  title: string;
  abstract: string;
  published: string;
  journal: string;
  impact: string;
  pdfLink: string;
  image?: string;
  icon: "quantum" | "solar";
}

export function ResearchTimeline() {
  const [selectedPaper, setSelectedPaper] = React.useState<ResearchPaper | null>(null);
  const [isHovered, setIsHovered] = React.useState<number | null>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  const researchPapers2024: ResearchPaper[] = [
    {
      title: "Advancements in Quantum Computing using BB84 protocol",
      abstract: "This research explores novel implementations of the BB84 quantum key distribution protocol, demonstrating significant improvements in security and efficiency. Our findings show a 40% reduction in quantum bit error rate while maintaining practical implementation feasibility.",
      published: "January 2024",
      journal: "Quantum Information Processing",
      impact: "Patent pending",
      pdfLink: "pdf/AdvancementsinQuantumEncryptionEnsuringSecureCommunication.pdf",
      icon: "quantum"
    },
  ];

  const researchPapers2025: ResearchPaper[] = [
    {
      title: "Solar panel cleaner without use of water",
      abstract: "We present an innovative approach to solar panel cleaning that eliminates water usage through electrostatic dust repulsion combined with mechanical automation. This system achieves 95% cleaning efficiency while reducing maintenance costs by 60% and saving water.",
      published: "Feb 2025",
      journal: "Renewable Energy Technologies",
      impact: "Patent pending, sponsered by major motor company",
      pdfLink: "pdf/SolarCleaner.pdf",
      icon: "solar"
    },
  ];

  const IconComponent = ({ type }: { type: "quantum" | "solar" }) => {
    switch (type) {
      case "quantum":
        return <Cpu className="w-8 h-8 md:w-12 md:h-12 text-purple-500" />;
      case "solar":
        return <Sun className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />;
      default:
        return null;
    }
  };

  const PaperCard = ({ paper, index }: { paper: ResearchPaper; index: number }) => {
    const isCurrentlyHovered = isHovered === index;
    
    return (
      <motion.div
        initial={false}
        animate={{
          scale: isCurrentlyHovered ? 1.05 : 1,
          y: isCurrentlyHovered ? -5 : 0
        }}
        onClick={() => setSelectedPaper(paper)}
        onHoverStart={() => setIsHovered(index)}
        onHoverEnd={() => setIsHovered(null)}
        className="relative h-40 sm:h-48 md:h-64 w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700"
      >
        <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <IconComponent type={paper.icon} />
            <motion.div
              animate={{
                x: isCurrentlyHovered ? 10 : 0,
                opacity: isCurrentlyHovered ? 1 : 0
              }}
            >
              <ArrowRight className="text-purple-500" />
            </motion.div>
          </div>
          
          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2 line-clamp-2">
              {paper.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              {paper.published}
            </p>
          </div>
        </div>
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"
          initial={false}
          animate={{
            opacity: isCurrentlyHovered ? 1 : 0
          }}
        />
      </motion.div>
    );
  };

  const timelineData = [
    {
      title: "2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4 md:mb-8">
            Published innovative research in sustainable technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchPapers2025.map((paper, index) => (
              <PaperCard key={index} paper={paper} index={index} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4 md:mb-8">
            Published research in communication protocols through Quantum computing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {researchPapers2024.map((paper, index) => (
              <PaperCard key={index} paper={paper} index={index + researchPapers2025.length} />
            ))}
          </div>
        </div>
      ),
    },
  ];

  const handlePDFClick = (e: React.MouseEvent, pdfLink: string) => {
    e.stopPropagation();
    window.open(pdfLink, "_blank");
  };

  const handleClose = () => {
    setSelectedPaper(null);
  };

  useClickOutside(dialogRef, handleClose);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 md:py-8 relative">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 mt-8 md:mt-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
            Research Journey
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            Exploring the frontiers of Quantum computing and sustainable technology
          </p>
        </div>
        <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-8">
          <Timeline data={timelineData} />
        </div>
      </div>

      <AnimatePresence>
        {selectedPaper && (
          <Dialog>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative">
                <div className="absolute right-0 top-0 z-50 p-4">
                  <button
                    onClick={handleClose}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 group"
                    aria-label="Close dialog"
                  >
                    <X
                      size={20}
                      className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-200"
                    />
                  </button>
                </div>

                <div className="relative w-full h-48 md:h-64 mb-4 md:mb-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
                  <IconComponent type={selectedPaper.icon} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                  <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    {selectedPaper.title}
                  </h2>
                  <button
                    onClick={(e) => handlePDFClick(e, selectedPaper.pdfLink)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors whitespace-nowrap"
                  >
                    <ExternalLink size={14} />
                    <span>View PDF</span>
                  </button>
                </div>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
                  {selectedPaper.abstract}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Published</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedPaper.published}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Journal</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedPaper.journal}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <p className="font-semibold">Impact</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedPaper.impact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}