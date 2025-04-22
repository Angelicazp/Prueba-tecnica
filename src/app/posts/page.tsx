"use client";

import React, { useState, useEffect, useCallback } from "react";
import PostList from "../components/PostList";
import FilterBar from "../components/FilterBar";
import styles from "../styles/Posts.module.css";

interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

const POSTS_PER_PAGE = 10;

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userIdFilter, setUserIdFilter] = useState<string>("");

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newPosts = await response.json();

      const filteredNewPosts = filterPosts(newPosts, searchTerm, userIdFilter);

      setPosts((prevPosts) => [...prevPosts, ...filteredNewPosts]);

      if (newPosts.length < POSTS_PER_PAGE) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (e: any) {
      setError("Error al cargar los posts.");
      console.error("Error fetching posts:", e);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, searchTerm, userIdFilter]);

  useEffect(() => {
    // Reiniciar el estado al cambiar los filtros
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [searchTerm, userIdFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  //}, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading && hasMore) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchPosts, loading, hasMore]);

  // Función para aplicar los filtros (sin paginación) - ya no se usa directamente aquí
  const filterPosts = useCallback((postsToFilter: Post[], currentSearchTerm: string, currentUserId: string): Post[] => {
    return postsToFilter.filter((post) => {
      const searchMatch =
        currentSearchTerm === "" ||
        post.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(currentSearchTerm.toLowerCase());
      const userMatch = currentUserId === "" || (post.userId && String(post.userId) === currentUserId);
      return searchMatch && userMatch;
    });
  }, []);

  // Funciones para manejar los cambios en los filtros
  const handleFilterChange = useCallback((filters: { searchTerm: string; userId: string }) => {
    setSearchTerm(filters.searchTerm);
    setUserIdFilter(filters.userId);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setUserIdFilter("");
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Listado de Posts</h1>
      <FilterBar
        onFilter={handleFilterChange}
        onReset={handleResetFilters}
        initialFilters={{ searchTerm, userId: userIdFilter }}
      />
      <PostList posts={posts} />
      {loading && <p>Cargando más posts...</p>}
      {!hasMore && posts.length > 0 && <p>No hay más posts para cargar.</p>}
      {posts.length === 0 && !loading && !error && <p>No se encontraron posts.</p>}
    </div>
  );
};

export default PostsPage;
