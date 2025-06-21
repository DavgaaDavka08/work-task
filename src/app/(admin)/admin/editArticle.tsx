"use client";
import { useState } from "react";

import { ArticleType } from "@/types/article";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { handleUpload } from "@/lib/handle-upload";
import { useArticles } from "@/app/_context/article";

const EditArticles = ({ article }: { article: ArticleType }) => {
  const { updateArticle, deleteArticle } = useArticles();
  const [editData, setEditData] = useState<ArticleType>(article);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setEditData((prev) => ({
        ...prev,
        image: url,
      }));
    }
  };

  const handleSave = async () => {
    try {
      let imageUrl = editData.image;

      if (newImageFile) {
        const uploadedUrl = await handleUpload(newImageFile);
        if (!uploadedUrl) throw new Error("Upload failed");
        imageUrl = uploadedUrl;
      }

      await updateArticle({
        ...editData,
        image: imageUrl,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Save error:", err);
      alert("Хадгалахад алдаа гарлаа.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteArticle(id);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <Card className="overflow-hidden cursor-pointer">
      <div className="relative h-48">
        <Image
          src={article.image}
          alt="Article"
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <Badge className="w-fit">{article.tags.join(", ")}</Badge>
        <CardTitle className="text-lg">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <p
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="text-sm text-muted-foreground line-clamp-2"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditData(article);
                setPreviewUrl(null);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border shadow text-red-500 hover:bg-red-100 transition"
              aria-label="Edit article"
            >
              ✎
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-3xl">
            <DialogHeader className="px-4">
              <DialogTitle className="text-xl">Мэдээ засах</DialogTitle>
              <div className="space-y-4 w-full">
                <div>
                  <p className="text-sm font-medium mb-1">Гарчиг</p>
                  <Input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Агуулга</p>
                  <Input
                    value={editData.content}
                    onChange={(e) =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Tags</p>
                  <Input
                    value={editData.tags?.join(", ")}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        tags: e.target.value
                          .split(",")
                          .map((tag) => tag.trim()),
                      })
                    }
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Зураг</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {(previewUrl || editData.image) && (
                    <div className="mt-4">
                      <Image
                        src={previewUrl || editData.image}
                        alt="Зургийн урьдчилсан харагдац"
                        className="max-h-60 rounded-lg object-contain mx-auto"
                        width={800}
                        height={400}
                      />
                    </div>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="flex gap-4 mt-4 px-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => handleDelete(article._id || "")}
                className="text-red-500 hover:text-red-700 hover:bg-red-100 border border-red-200"
              >
                Устгах
              </Button>
              <Button type="button" onClick={handleSave} className="flex-1">
                Хадгалах
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EditArticles;
