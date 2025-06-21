"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

import { AddArticle } from "./addArticles";
import { useArticles } from "@/app/_context/article";
import Image from "next/image";
import EditArticles from "./editArticle";

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
            key={article._id}
            className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="relative w-full h-48 rounded-md overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
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

              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              {/* <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-500">
                  <User className="w-3 h-3 mr-1" />
                  <span>{article.author || "Зохиогчгүй"}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>
                    {new Date(article.createdAt).toLocaleDateString("mn-MN")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{article.readTime || 5} мин</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span>{article.views?.toLocaleString() || 0} үзэлт</span>
                  </div>
                </div>
              </div> */}
            </CardContent>

            <CardFooter className="pt-3 border-t">
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  <EditArticles article={article} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
