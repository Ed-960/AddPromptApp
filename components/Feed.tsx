"use client";

import { Prompt, PromptCardListProps } from '@interfaces/interfaces';
import { useState, useEffect, ChangeEvent, useRef } from 'react';
import PromptCard from './PromptCard';

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: Prompt) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick} 
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState<Prompt[]>([]);
  
  //Search states
  const [searchText, setSearchText] = useState<string>('');
  const [searchedResults, setSearchedResults] = useState<Prompt[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item: Prompt) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setSearchText(e.target.value);
    
    // debounce method
    searchTimeoutRef.current = setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
  };


  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <div>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input 
            type='text'
            placeholder='Search for a tag or a username'
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>
        {/* All Prompts */}
        {searchText ? (
          <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
        )}
      </section>
    </div>
  )
}

export default Feed;
