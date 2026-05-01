// components/ProjectCard.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { Github, Loader2, AlertCircle } from 'lucide-react';
import { fetchRepoReadme, fetchRepoLanguages } from '@/lib/github';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  language: string | null;
}

interface ProjectCardProps {
  repo: Repo;
}

interface Languages {
  [key: string]: number;
}

const ProjectCard = ({ repo }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [readme, setReadme] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [languages, setLanguages] = useState<Languages>({});
  const [mounted, setMounted] = useState(false);
  const username = "utkarsh-singh-dev";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const getLanguages = async () => {
      const languageData = await fetchRepoLanguages(username, repo.name);
      setLanguages(languageData);
    };
    getLanguages();
  }, [repo.name, mounted]);

  const handleClick = async () => {
    setIsOpen(true);
    if (!readme && !error) {
      setIsLoading(true);
      try {
        const { content, error: readmeError } = await fetchRepoReadme(username, repo.name);
        if (readmeError) {
          setError(readmeError);
          setReadme(null);
        } else {
          setReadme(content);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load README");
        setReadme(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const calculateLanguagePercentages = (languages: Languages) => {
    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    return Object.entries(languages)
      .map(([name, bytes]) => ({
        name,
        percentage: ((bytes / total) * 100).toFixed(1)
      }))
      .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
  };

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      TypeScript: 'bg-blue-500',
      JavaScript: 'bg-yellow-500',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      'C++': 'bg-purple-500',
      C: 'bg-gray-500',
      Ruby: 'bg-red-600',
      PHP: 'bg-indigo-500',
      HTML: 'bg-orange-500',
      CSS: 'bg-pink-500',
      Swift: 'bg-orange-600',
      Kotlin: 'bg-purple-600',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-700',
      default: 'bg-secondary'
    };
    return colors[language] || colors.default;
  };

  if (!mounted) return null;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-6 bg-card rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        onClick={handleClick}
      >
        <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
        <p className="text-muted-foreground mb-4">
          {repo.description || "No description available."}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span>⭐</span>
              {repo.stargazers_count}
            </span>
            <Github className="w-5 h-5" />
          </div>
          <div className="flex flex-wrap gap-2">
            {calculateLanguagePercentages(languages).map(({ name, percentage }) => (
              <span
                key={name}
                className={`text-xs font-medium px-2 py-1 rounded text-white ${getLanguageColor(name)}`}
                title={`${name}: ${percentage}%`}
              >
                {name} {percentage}%
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{repo.name}</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                  {repo.description && (
                    <p className="mt-4 text-sm">Project Description: {repo.description}</p>
                  )}
                </AlertDescription>
              </Alert>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                className="markdown-content"
              >
                {readme || "No content available."}
              </ReactMarkdown>
            )}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(repo.updated_at).toLocaleDateString()}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;