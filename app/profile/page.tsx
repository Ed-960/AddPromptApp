"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user: any = session?.user;
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${user.id}/posts`);
      const data = await response.json();
  
      setPosts(data);
    };
    if(user?.id) fetchPosts();
  }, [user?.id]);

  const handleEdit = async (post: any) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleRemove = async (post: any) => {
     const hasConfirmed = confirm('are you sure you want to delete this prompt');
  
      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          }) 

          const filteredPosts = posts.filter((p: any) => p.id !== post._id)
          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    }

  return (
    <Profile 
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleRemove}
    />
  )
}

export default MyProfile;
