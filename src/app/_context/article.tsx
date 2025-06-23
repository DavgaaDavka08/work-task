"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ArticleType } from "@/types/article";
type NewsContextTypes = {
  articles: ArticleType[];
  addArticle: (data: ArticleType) => void;
  deleteArticle: (id: string) => void;
  updateArticle: (data: ArticleType) => void;
};

const NewsContext = createContext<NewsContextTypes>({} as NewsContextTypes);

export const useArticles = () => useContext(NewsContext);

export default function NewsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [articles, setArticles] = useState<ArticleType[]>([]);

  const getArticles = async () => {
    try {
      const res = await axios.get("/api/articles");
      setArticles(res.data.articles);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  const addArticle = async (data: ArticleType) => {
    try {
      await axios.post("/api/articles", data);
      await getArticles();
    } catch (error) {
      console.error("Failed to add article:", error);
    }
  };
  const deleteArticle = async (id: string) => {
    try {
      await axios.post("/api/articles/delete", { id });
      await getArticles();
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };
  const updateArticle = async (data: ArticleType) => {
    try {
      await axios.put("/api/articles", {
        ...data,
        id: data.id,
        is_published: true,
      });
      await getArticles();
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <NewsContext.Provider
      value={{ articles, addArticle, deleteArticle, updateArticle }}
    >
      {children}
    </NewsContext.Provider>
  );
}
