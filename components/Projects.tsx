// components/Projects.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { fetchUserRepos } from "@/lib/github";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProjectCard = dynamic(() => import("./ProjectCard"), {
  loading: () => <div className="animate-pulse h-64 bg-gray-200 rounded-lg" />,
  ssr: false
});

interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  language: string | null;
  fork: boolean;
}

const SPINNING_TEXTS = ["Featured Projects", "Open Source Work", "Latest Builds"];

const Projects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const username = "utkarsh-singh-dev";
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let isMounted = true;

    const getRepos = async () => {
      if (!isMounted) return;

      try {
        setLoading(true);
        setError(null);

        if (!process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
          throw new Error("GitHub token is not configured");
        }

        const fetchedRepos = await fetchUserRepos(username);

        if (!isMounted) return;

        const sortedRepos = Array.isArray(fetchedRepos)
          ? fetchedRepos
              .filter((repo: Repo) => !repo.fork)
              .sort((a: Repo, b: Repo) => {
                if (b.stargazers_count !== a.stargazers_count) {
                  return b.stargazers_count - a.stargazers_count;
                }
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
              })
          : [];

        if (sortedRepos.length === 0) {
          setError("No repositories found");
          return;
        }

        setRepos(sortedRepos);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to fetch repositories");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getRepos();

    intervalRef.current = setInterval(() => {
      if (isMounted) {
        setCurrentTextIndex((prev) => (prev + 1) % SPINNING_TEXTS.length);
      }
    }, 3000);

    return () => {
      isMounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [username, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8" suppressHydrationWarning>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 mt-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500">
        Projects and Work
      </h1>

      <AnimatePresence mode="wait">
        <motion.h2
          key={currentTextIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-4xl font-bold text-center mb-12"
        >
          {SPINNING_TEXTS[currentTextIndex]}
        </motion.h2>
      </AnimatePresence>

      {loading && (
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-lg">Loading repositories...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="my-8" suppressHydrationWarning>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <p className="mb-2">{error}</p>
            <p className="text-sm">Troubleshooting steps:</p>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Verify your GitHub username is correct</li>
              <li>Check that NEXT_PUBLIC_GITHUB_TOKEN is set in .env.local</li>
              <li>Ensure your GitHub token has the necessary permissions</li>
              <li>Check your internet connection</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {repos.map((repo) => (
            <ProjectCard
              key={repo.id}
              repo={repo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;