import { Session } from 'next-auth';
import { ReactNode } from 'react';

export interface Provider {
  id: string;
  name: string;
}

export interface ProviderProps {
  children: ReactNode;
  session?: Session | null;
}

export interface Post {
  _id?: string | null | undefined
  prompt: string;
  tag: string;
};

export interface PostP {
  id?: string | null | undefined;
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
  name: string | null
  desc: string
  data: Post[];
  handleEdit?: (post: Post) => void
  handleDelete?: (post: Post) => void
}

export interface PromptCardProps {
  post: any
  handleTagClick?: (tag: string) => void 
  handleEdit?: () => void
  handleDelete?: () => void
}

export interface Prompt {
  _id: string
  creator: {
    username: string
  }
  tag: string
  prompt: string
}

export interface PromptCardListProps {
  data: Prompt[];
  handleTagClick: (tagName: string) => void;
}

export interface SessionUser {
  id?: string ;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export interface RootLayoutProps {
  children: ReactNode;
}

export interface UserProfileProps {
  params: {
    id?: string;
  };
}