import { Session } from 'next-auth';
import { ReactNode } from 'react';

export interface Provider {
  id: string;
  name: string;
}

export interface ProviderProps {
  children: ReactNode;
  session: Session | null;
}

export interface Post {
  prompt: string;
  tag: string;
};

export interface FormProps {
  type: string
  post: Post
  setPost: (post: Post) => void
  submitting: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export interface ProfileProps {
  name: string
  desc: string
  data: Post[];
  handleEdit: (post: Post) => void
  handleDelete: (post: Post) => void
}

export interface PromptCardProps {
  post: any
  handleTagClick?: (tag: string) => void 
  handleEdit: () => void
  handleDelete: () => void
}

