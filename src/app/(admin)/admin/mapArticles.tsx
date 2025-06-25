"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddArticle } from "./addArticles";
import { useArticles } from "@/app/_context/article";
import Image from "next/image";
import { EditArticle } from "./editArticle";

export default function MapArticles() {
  const { articles } = useArticles();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Нийтлэлүүд
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-lg">{articles.length} нийтлэл байна</p>
            </div>
          </div>
          <AddArticle />
        </div>
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-20"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              Нийтлэл байхгүй байна
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              Эхний нийтлэлээ нэмж эхлүүлээрэй
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <Card
                key={article.id}
                className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-1 overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardHeader className="p-0 relative">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <EditArticle article={article} />
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <h3 className="font-bold text-lg leading-tight line-clamp-2 text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {article.content}
                  </p>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-colors duration-200 text-xs px-2 py-1"
                        >
                          #{tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-gray-500 border-gray-300 text-xs px-2 py-1"
                        >
                          +{article.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
