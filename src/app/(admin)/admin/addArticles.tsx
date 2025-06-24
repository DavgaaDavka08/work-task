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
import Image from "next/image";
import { useState } from "react";

export function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { addArticle } = useArticles();

  const addHandle = async () => {
    if (!title || !content || !image) return;
    setLoading(true);
    try {
      const uploadImage = await handleUpload(image);
      await addArticle({
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        image: uploadImage,
        id: "",
        createdAt: "",
        updatedAt: "",
      });

      setTitle("");
      setContent("");
      setTags("");
      setImage(null);
      setPreviewUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition">
          Мэдээ нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-xl border border-gray-200 shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Мэдээ нэмэх
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Эндээс шинэ мэдээ оруулна уу. Бүх талбарыг бүрэн бөглөнө үү.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-5 mt-4">
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-gray-700">Гарчиг</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Жишээ: Шинэ технологийн мэдээ"
              className="rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-gray-700">Агуулга</Label>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Жишээ: Өнөөдөр гарсан технологийн..."
              className="rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-gray-700">Тагууд</Label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Жишээ: tech, шинэ, мэдээ"
              className="rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-gray-700">Зураг</Label>
            <Input type="file" onChange={handleImage} />
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Preview"
                className="mt-3 h-48 w-full object-cover rounded-lg shadow"
                width={500}
                height={300}
              />
            )}
          </div>
          <DialogFooter className="mt-4 flex justify-between">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-md">
                Цуцлах
              </Button>
            </DialogClose>
            <Button
              onClick={addHandle}
              type="button"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md"
            >
              {loading ? "Хадгалж байна..." : "Хадгалах"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
