"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { AddArticle } from "./addArticles";
import { useArticles } from "@/app/_context/article";
import Image from "next/image";
import { EditArticle } from "./editArticle";

export default function MapArticles() {
  const { articles } = useArticles();

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Нийтлэлүүд</h1>
          <p className="text-gray-600 mt-1">{articles.length} нийтлэл байна</p>
        </div>

        <AddArticle />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="relative w-full h-48 rounded-md overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-gray-900 mt-2">
                {article.title}
              </h3>
            </CardHeader>

            <CardContent className="pb-3">
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {article.content}
              </p>

              {article.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </CardContent>

            <EditArticle article={article} />
          </Card>
        ))}
      </div>
    </div>
  );
}
