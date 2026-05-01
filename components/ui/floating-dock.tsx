'use client';

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse, IconSun, IconMoon, IconAdjustments } from "@tabler/icons-react";
import { AnimatePresence, motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  group: number;
}

interface FloatingDockProps {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: FloatingDockProps) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

interface FloatingDockMobileProps {
  items: DockItem[];
  className?: string;
}

const FloatingDockMobile = ({
  items,
  className,
}: FloatingDockMobileProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Theme Toggle Button - Left Side */}
      <div className="fixed top-8 left-8 block md:hidden z-50">
        <button
          onClick={() => {
            if (theme === "dark") setTheme("light");
            else if (theme === "light") setTheme("system");
            else setTheme("dark");
          }}
          className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center shadow-lg"
        >
          {theme === "dark" ? (
            <IconSun className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          ) : theme === "light" ? (
            <IconMoon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          ) : (
            <IconAdjustments className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          )}
        </button>
      </div>

      {/* Menu Icon and Dropdown - Right Side */}
      <div className={cn("fixed top-20 right-8 block md:hidden z-50", className)}>
        <div className="relative">
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-12 p-4 bg-gray-50 dark:bg-neutral-900 rounded-2xl shadow-lg w-64"
              >
                <div className="grid grid-cols-3 gap-4">
                  {items.map((item) => (
                    <Link
                      href={item.href}
                      key={item.title}
                      className="flex flex-col items-center gap-2"
                      onClick={() => setOpen(false)}
                    >
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center">
                        <div className="h-4 w-4">{item.icon}</div>
                      </div>
                      <span className="text-xs text-neutral-600 dark:text-neutral-400 text-center">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setOpen(!open)}
            className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center shadow-lg"
          >
            <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          </button>
        </div>
      </div>
    </>
  );
};

interface FloatingDockDesktopProps {
  items: DockItem[];
  className?: string;
}

const FloatingDockDesktop = ({
  items,
  className,
}: FloatingDockDesktopProps) => {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(Infinity);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      {items.map((item, index) => {
        const nextItem = items[index + 1];
        const currentGroup = item.group;
        const nextGroup = nextItem?.group;

        return (
          <div key={item.title} className="flex items-center">
            <IconContainer mouseX={mouseX} {...item} />
            {nextItem && currentGroup !== nextGroup && (
              <Separator orientation="vertical" className="h-8 mx-2" />
            )}
          </div>
        );
      })}
      <Separator orientation="vertical" className="h-8 mx-2" />
      <button
        onClick={() => {
          if (theme === "dark") {
            setTheme("light");
          } else if (theme === "light") {
            setTheme("system");
          } else {
            setTheme("dark");
          }
        }}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        {theme === "dark" ? (
          <IconSun className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        ) : theme === "light" ? (
          <IconMoon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        ) : (
          <IconAdjustments className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        )}
      </button>
    </motion.div>
  );
};

interface IconContainerProps extends DockItem {
  mouseX: MotionValue;
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: IconContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const marginTransform = useTransform(distance, [-150, 0, 150], [0, 20, 0]);
  const margin = useSpring(marginTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ 
          marginLeft: margin,
          marginRight: margin
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 top-full mt-2 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-4 h-4 flex items-center justify-center">
          {icon}
        </div>
      </motion.div>
    </Link>
  );
}