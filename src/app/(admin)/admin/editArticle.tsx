"use client";

import { useArticles } from "@/app/_context/article";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleUpload } from "@/lib/handle-upload";
import { ArticleType } from "@/types/article";
import Image from "next/image";
import { useState } from "react";

export function EditArticle({ article }: { article: ArticleType }) {
  const { deleteArticle, updateArticle } = useArticles();

  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [tags, setTags] = useState(article.tags.join(", "));
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const editHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = article.image;
      if (newImageFile) {
        const uploadedUrl = await handleUpload(newImageFile);
        if (!uploadedUrl) throw new Error("Upload failed");
        imageUrl = uploadedUrl;
      }

      await updateArticle({
        id: article.id,
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
        image: imageUrl,
        createdAt: article.createdAt,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Edit error:", error);
      alert("Өөрчлөлтийг хадгалахад алдаа гарлаа.");
    }
  };

  const deleteHandle = async () => {
    try {
      await deleteArticle(article.id);
    } catch (error) {
      console.log("Delete error:", error);
      alert("Устгах үед алдаа гарлаа.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
        >
          Засах
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={editHandler}>
          <DialogHeader>
            <DialogTitle>Мэдээ засах</DialogTitle>
            <DialogDescription>
              Нийтлэлийн мэдээллийг шинэчлэх бол энд өөрчлөөд хадгалаарай.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Гарчиг</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Агуулга</Label>
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Тагууд (таслалаар тусгаарла)</Label>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Зураг</Label>
              <Input type="file" onChange={handleImageChange} />
              {(previewUrl || article.image) && (
                <div className="mt-2">
                  <Image
                    src={previewUrl || article.image}
                    alt="preview"
                    width={400}
                    height={200}
                    style={{ height: "auto" }}
                    className="rounded-md object-contain mx-auto"
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4 flex flex-wrap gap-2">
            <DialogClose asChild>
              <Button
                variant="destructive"
                type="button"
                onClick={deleteHandle}
              >
                Устгах
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={editHandler}>
                Хадгалах
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
