"use client";
import React from "react";
import Marquee from "@/components/ui/marquee";

interface TechBadge {
  name: string;
  imageUrl: string;
}

const techStack: TechBadge[] = [
  {
    name: "Qiskit",
    imageUrl: "https://img.shields.io/badge/Qiskit-%236929C4.svg?style=for-the-badge&logo=Qiskit&logoColor=white"
  },
  {
    name: "C",
    imageUrl: "https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white"
  },
  {
    name: "Java",
    imageUrl: "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"
  },
  {
    name: "JavaScript",
    imageUrl: "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
  },
  {
    name: "Python",
    imageUrl: "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"
  },
  {
    name: "Shell Script",
    imageUrl: "https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white"
  },
  {
    name: "AWS",
    imageUrl: "https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"
  },
  {
    name: "Azure",
    imageUrl: "https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white"
  },
  // First row of technologies
  {
    name: "React",
    imageUrl: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
  },
  {
    name: "TailwindCSS",
    imageUrl: "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"
  },
  {
    name: "Three.js",
    imageUrl: "https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white"
  },
  // Second row of technologies
  {
    name: "MongoDB",
    imageUrl: "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"
  },
  {
    name: "MySQL",
    imageUrl: "https://img.shields.io/badge/mysql-%2300000f.svg?style=for-the-badge&logo=mysql&logoColor=white"
  },
  {
    name: "Docker",
    imageUrl: "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"
  }
];

export const TechStack = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full py-12">
      <h3 className="text-2xl font-bold text-center mb-8">Tech Stack</h3>
      <div className="relative overflow-hidden">
        {/* First Marquee */}
        <Marquee className="mb-4">
          <div className="flex space-x-6 px-4">
            {techStack.slice(0, 8).map((tech) => (
              <div
                key={tech.name}
                className="transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={tech.imageUrl}
                  alt={`${tech.name} badge`}
                  className="h-8"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Marquee>

        {/* Second Marquee (using CSS to reverse direction) */}
        <div className="[&_*]:direction-rtl">
          <Marquee className="mb-4">
            <div className="flex space-x-6 px-4">
              {techStack.slice(8, 14).map((tech) => (
                <div
                  key={tech.name}
                  className="transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src={tech.imageUrl}
                    alt={`${tech.name} badge`}
                    className="h-8"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};