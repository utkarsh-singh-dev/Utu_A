// lib/github.ts
import { cachedFetch, getCacheKey } from './cache';

interface LanguageData {
  [key: string]: number;
}

// Function to fetch all repositories for a user
export const fetchUserRepos = async (username: string) => {
  if (!username) {
    throw new Error('Username is required');
  }

  const cacheKey = getCacheKey('repos', username);
  
  return cachedFetch(cacheKey, async () => {
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;

    try {
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
      };

      if (githubToken) {
        headers.Authorization = `token ${githubToken}`;
      }

      const response = await fetch(url, {
        headers,
        next: {
          revalidate: 3600
        }
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`GitHub API error: ${response.status} ${errorData}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching repos:', error);
      throw error;
    }
  }, 3600); // 1 hour cache
};

// Function to fetch languages for a specific repository
export const fetchRepoLanguages = async (username: string, repoName: string): Promise<LanguageData> => {
  if (!username || !repoName) {
    throw new Error('Username and repository name are required');
  }

  const cacheKey = getCacheKey('languages', username, repoName);
  
  return cachedFetch(cacheKey, async () => {
    const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const url = `https://api.github.com/repos/${username}/${repoName}/languages`;

    try {
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
      };

      if (githubToken) {
        headers.Authorization = `token ${githubToken}`;
      }

      const response = await fetch(url, {
        headers,
        next: {
          revalidate: 3600
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch languages: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching languages:', error);
      return {};
    }
  }, 3600); // 1 hour cache
};

// Function to fetch and parse repository README with better error handling
export const fetchRepoReadme = async (username: string, repoName: string): Promise<{ content: string | null; error: string | null }> => {
  if (!username || !repoName) {
    return { 
      content: null, 
      error: 'Username and repository name are required' 
    };
  }

  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const baseHeaders: HeadersInit = {
    'Accept': 'application/vnd.github.v3.raw',
  };

  if (githubToken) {
    baseHeaders.Authorization = `token ${githubToken}`;
  }

  const cacheKey = getCacheKey('readme', username, repoName);

  return cachedFetch(cacheKey, async () => {
    
  async function tryFetchReadme(filename: string): Promise<Response> {
    const url = `https://api.github.com/repos/${username}/${repoName}/contents/${filename}`;
    return fetch(url, {
      headers: baseHeaders,
      next: {
        revalidate: 3600
      }
    });
  }

  try {
    // Try multiple README filename variations
    const filenamesToTry = ['README.md', 'readme.md', 'README.markdown', 'README'];
    
    for (const filename of filenamesToTry) {
      const response = await tryFetchReadme(filename);
      
      if (response.ok) {
        const content = await response.text();
        return { content, error: null };
      }
    }

    return { 
      content: null, 
      error: `No README found for ${repoName}` 
    };
  } catch (error) {
    console.error("Error fetching README:", error);
    return { 
      content: null, 
      error: error instanceof Error ? error.message : 'Failed to fetch README' 
    };
  }
  }, 7200); // 2 hour cache for README
};