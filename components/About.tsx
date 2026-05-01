"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AchievementCard from "./AchievementCard";
import Globe from "@/components/ui/globe";
import { TechStack } from "./TechStack";

interface Achievement {
  title: string;
  link: string | null;
}

interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  logo: string;
  achievements: Achievement[];
}

interface Education {
  institution: string;
  degree: string;
  duration: string;
  logo: string;
  achievements: Achievement[];
}

const spinningTexts = ["Who am I?", "Your best chance?", "I'm Batman"];

const workExperience: WorkExperience[] = [
  {
    company: "Cognizant",
    role: "Programmer Analyst Trainee",
    duration: "2025 - Current Year",
    logo: "/images/cognizant.png",
    achievements: [
      {
        title: "Updating soon...",
        link: null,
      },
    ],
  },
  {
    company: "FirePrime Pvt. Ltd.",
    role: "Internship",
    duration: "Jan, 2024 - Feb, 2024",
    logo: "/images/FirePrime.jpg",
    achievements: [
      {
        title: "Developed full-stack applications",
        link: null,
      },
      {
        title: "Internship Certificate",
        link: "/certificates/fireprime-certificate.pdf",
      },
    ],
  },
];

const education: Education[] = [
  {
    institution: "Savitribai Phule Pune University",
    degree: "Bachelor in Electrical Engineering",
    duration: "2021 - 2025",
    logo: "/images/sppu.png",
    achievements: [
      {
        title: "Published research paper on Solar Panel Cleaning bot",
        link: "/pdf/SolarCleaner.pdf",
      },
      {
        title: "Secretary, STES Robotics",
        link: null,
      },
      {
        title: "Avionics Engineer, STES Rocketry",
        link: null,
      },
      {
        title: "Team Leader, CyberCell Club",
        link: null,
      },
    ],
  },
  {
    institution: "Boys' High School and College",
    degree: "Higher Secondary Education",
    duration: "2019-2021",
    logo: "/images/bhs.png",
    achievements: [
      {
        title: "Percentage: 93.8%",
        link: null,
      },
      {
        title: "Quiz Competition consecutive runner-up",
        link: null,
      },
      {
        title: "Orator, Writer and Singing Competiton Winner",
        link: null,
      },
    ],
  },
];

const About = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % spinningTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="about-section py-10 px-5 bg-background text-foreground relative">
      {/* Globe Component - Positioned with lowest z-index */}
      <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
        <Globe />
      </div>

      <div className="container mx-auto max-w-4xl relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-12">
          <motion.h1
            key={currentTextIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            {spinningTexts[currentTextIndex]}
          </motion.h1>
        </div>

        {/* TechStack Component - Now with higher z-index */}
        <div className="relative" style={{ zIndex: 2 }}>
          <TechStack />
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
          {workExperience.map((job, index) => (
            <AchievementCard
              key={index}
              name={job.company}
              role={job.role}
              duration={job.duration}
              logo={job.logo}
              achievements={job.achievements}
            />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          {education.map((edu, index) => (
            <AchievementCard
              key={index}
              name={edu.institution}
              role={edu.degree}
              duration={edu.duration}
              logo={edu.logo}
              achievements={edu.achievements}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;