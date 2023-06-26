"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';
import { Post, UserProfileProps } from '@interfaces/interfaces';

const UserProfile: React.FC<UserProfileProps> = ( {params} ) => {
  const searchParams = useSearchParams();
  const userName: string | null = searchParams.get('name');
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
  
      setUserPosts(data);
    };
    if(params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile 
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  )
}

export default UserProfile;
