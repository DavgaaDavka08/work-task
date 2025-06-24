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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const deleteHandle = async () => {
    await deleteArticle(article.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-black">
          Засах
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto rounded-xl shadow-xl p-6">
        <form onSubmit={editHandler}>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-800">
              Мэдээ засах
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Та нийтлэлийн мэдээллийг шинэчилж хадгалах боломжтой.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 mt-5">
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Гарчиг
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Шинэ гарчиг..."
                className="border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Агуулга
              </Label>
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Агуулга..."
                className="border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Тагууд
              </Label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tech, мэдээ, шинэ"
                className="border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className=" gap-2">
              <Label className="text-sm font-medium text-gray-700">Зураг</Label>
              <Input type="file" onChange={handleImageChange} />
              {(previewUrl || article.image) && (
                <div className="mt-3">
                  <div className="mt-3">
                    <Image
                      src={previewUrl || article.image}
                      alt="Preview"
                      width={1000}
                      height={1000}
                      className="rounded-lg h-[300px] w-[500px] object-cover mx-auto  cursor-zoom-in"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 flex flex-wrap gap-3 justify-end">
            <DialogClose asChild>
              <Button type="button" onClick={deleteHandle} className="px-4">
                устгах
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={editHandler} disabled={loading}>
                {loading ? "Хадгалж байна..." : "Хадгалах"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
