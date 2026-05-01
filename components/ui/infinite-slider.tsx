'use client';

import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion'; // Changed from motion/react
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

// Define the component's props with TypeScript
type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;             // Space between items
  duration?: number;        // Animation duration in seconds
  durationOnHover?: number; // Animation duration when hovering
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;        // Reverse animation direction
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  // State management for animation control
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure(); // Measure container dimensions
  const translation = useMotionValue(0);         // Track animation progress
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);            // Force animation reset

  // Handle continuous animation
  useEffect(() => {
    let controls;
    // Calculate sizes based on direction
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    
    // Set animation boundaries
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      // Handle smooth transition when speed changes (e.g., on hover)
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      // Normal infinite scrolling animation
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from); // Reset position for seamless loop
        },
      });
    }

    // Cleanup animation on unmount or when dependencies change
    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  // Configure hover behavior if durationOnHover is provided
  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          // Apply translation based on direction
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {/* Duplicate children for seamless infinite effect */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}