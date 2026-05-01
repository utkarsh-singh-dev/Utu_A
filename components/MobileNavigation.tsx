import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from '@/components/ui/sidebar';
import { IconHome, IconBrandGithub, IconMail } from "@tabler/icons-react";
import { Library, Terminal, Menu } from 'lucide-react';
import { TbBrandLeetcode } from "react-icons/tb";
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const navigationItems = [
    {
      title: "Home",
      icon: <IconHome className="size-5" />,
      href: "/",
      group: 1
    },
    {
      title: "Research",
      icon: <Library className="size-5" />,
      href: "/research",
      group: 1
    },
    {
      title: "Projects",
      icon: <Terminal className="size-5" />,
      href: "/project",
      group: 2
    },
    {
      title: "LeetCode",
      icon: <TbBrandLeetcode className="size-5" />,
      href: "https://leetcode.com/u/atlas_2302/",
      group: 2
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="size-5" />,
      href: "https://github.com/yourusername",
      group: 2
    },
    {
      title: "Contact Me",
      icon: <IconMail className="size-5" />,
      href: "/auth/contact",
      group: 3
    },
  ];

  // Only show mobile navigation on mobile devices
  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        variant="outline"
        size="icon"
        className="bg-background"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      <SidebarProvider defaultOpen={true} open={isOpen} onOpenChange={setIsOpen}>
        <Sidebar className="top-0">
          <SidebarHeader className="border-b border-border">
            <h2 className="px-2 text-lg font-semibold">Navigation</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.href} passHref>
                    <SidebarMenuButton 
                      className="w-full justify-start gap-4"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};

export default MobileNavigation;