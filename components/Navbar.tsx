// components/Navbar.tsx
"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconBrandGithub, IconMail } from "@tabler/icons-react";
import { Library, Terminal } from 'lucide-react';
import { TbBrandLeetcode } from "react-icons/tb";

const Navbar = () => {
  
  const dockItems = [
    // Group 1: Home and Research
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
      group: 1
    },
    {
      title: "Research",
      icon: <Library className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/research",
      group: 1
    },
    // Group 2: Projects, Notion, and Github
    {
      title: "Projects",
      icon: <Terminal className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/project",
      group: 2
    },
    {
      title: "LeetCode",
      icon: <TbBrandLeetcode className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://leetcode.com/u/atlas_2302/",
      group: 2
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://github.com/utkarsh-singh-dev",
      group: 2
    },
    // Group 3: Contact-Me
    {
      title: "Contact-Me",
      icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/auth/contact",
      group: 3
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
      <FloatingDock
        items={dockItems}
        desktopClassName="top-0"
        mobileClassName="top-0"
      />
    </div>
  );
};

export default Navbar;