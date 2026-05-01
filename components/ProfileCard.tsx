"use client";

import { Mail, Linkedin, Github } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { SpinningText } from "@/components/ui/spinning-text";

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl p-12">
      <div className="relative w-48 h-48 mx-auto mb-9 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-card" />
        <img
          src="/images/dev.jpeg"
          alt="Profile"
          className="absolute inset-0 rounded-full object-cover"
          style={{ zIndex: 1 }}
        />
        <SpinningText
          radius={17}
          fontSize={0.8}
          className="absolute inset-0 translate-y-2 font-medium leading-none text-peach-500"
          style={{ zIndex: 2 }}
        >
          UTKARSH SINGH • UTKARSH SINGH • UTKARSH SINGH • UTKARSH SINGH •
        </SpinningText>
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">Utkarsh Singh</h2>
      <p className="text-muted-foreground text-center mb-6">
        Developer, Researcher and Inventor
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="https://discord.com/users/1062079909243134083"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord Profile"
          className="p-2 hover:text-orange-500"
        >
          <FaDiscord size={20} />
        </a>
        <a
          href="mailto:utkarshsingh2331@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
          className="p-2 hover:text-orange-500"
        >
          <Mail size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/utkarshsinghrajput23/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="p-2 hover:text-orange-500"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="https://github.com/utkarsh-singh-dev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="p-2 hover:text-orange-500"
        >
          <Github size={20} />
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;