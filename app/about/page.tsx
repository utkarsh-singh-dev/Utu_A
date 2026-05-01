// app/about/page.tsx
"use client";

import React from "react";
import ProfileCard from "@/components/ProfileCard";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { TechStack } from "@/components/TechStack";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const workExperience = [
  {
    company: "Google",
    role: "SDE3",
    duration: "1994 - 2000",
    logo: "/logos/google.png", // Replace with the correct path
  },
  {
    company: "Microsoft",
    role: "SDE2",
    duration: "1984 - 1994",
    logo: "/logos/microsoft.png", // Replace with the correct path
  },
  {
    company: "Blackrock",
    role: "SDE1",
    duration: "1950 - 1984",
    logo: "/logos/blackrock.png", // Replace with the correct path
  },
];

const education = [
  {
    institution: "Oxford College",
    degree: "Engineering",
    duration: "1990 - 1993",
    logo: "/logos/oxford.png", // Replace with the correct path
  },
  {
    institution: "Harvard College",
    degree: "PG Diploma in MTech",
    duration: "1993 - 1995",
    logo: "/logos/harvard.png", // Replace with the correct path
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-cyan-200 to-cyan-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          About Me
        </motion.h1>
      </LampContainer>

      <div className="relative z-10 px-6 py-12 bg-slate-950">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-7xl mx-auto">
          <ProfileCard />
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
              My Journey
            </h2>

            <div className="space-y-4">
              <p className="text-lg text-slate-300">
                Hello! I&apos;m a final-year Electrical Engineering student passionate about technology and innovation. I serve as the cybersecurity leader at my college, contributing to a safe digital environment and raising awareness about cybersecurity best practices. Additionally, I&apos;m the secretary of the robotics team, where I help drive projects and foster collaboration among team members. As the payload lead of the rocketry team, I ensure the development of payload systems for successful rocket launches.
              </p>

              <p className="text-lg text-slate-300">
                I also have research certified by Microsoft and Google in the field of quantum communication, which demonstrates my commitment to exploring cutting-edge technologies. Alongside my academic and extracurricular pursuits, I have a strong interest in software development, with a focus on creating intuitive and impactful projects. My journey is driven by a passion for learning and contributing to meaningful technological advancements.
              </p>

              <p className="text-lg text-slate-200">
                Feel free to explore my projects and reach out if you&apos;d like to collaborate or discuss ideas. I&apos;m always open to exciting opportunities in the fields of technology, engineering, and research.
              </p>
            </div>

            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent mb-8">
            Work Experience
          </h2>
          {workExperience.map((job, index) => (
            <Card
              key={index}
              className="flex items-center justify-between p-4 mb-4 bg-slate-800 text-slate-300 shadow-md"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={job.logo} alt={`${job.company} logo`} />
                  <AvatarFallback>{job.company[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{job.company}</h3>
                  <p className="text-sm text-slate-400">{job.role}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400">{job.duration}</p>
            </Card>
          ))}
        </div>

        {/* Education Section */}
        <div className="max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent mb-8">
            Education
          </h2>
          {education.map((edu, index) => (
            <Card
              key={index}
              className="flex items-center justify-between p-4 mb-4 bg-slate-800 text-slate-300 shadow-md"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={edu.logo} alt={`${edu.institution} logo`} />
                  <AvatarFallback>{edu.institution[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{edu.institution}</h3>
                  <p className="text-sm text-slate-400">{edu.degree}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400">{edu.duration}</p>
            </Card>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="max-w-7xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TechStack />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
