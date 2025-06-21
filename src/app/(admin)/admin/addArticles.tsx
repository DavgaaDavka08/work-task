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
  const { addArticle } = useArticles();
  const addHandle = async () => {
    if (!title || !content || !image) return;
    const uploadImage = await handleUpload(image);
    addArticle({
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      image: uploadImage,
      _id: "",
      createdAt: "",
      updatedAt: "",
    });
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
      <form>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">Мэдээ нэмэх</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Мэдээ нэмэх </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Title</Label>
              <Input onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label>content</Label>
              <Input onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label>tags</Label>
              <Input onChange={(e) => setTags(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label>image</Label>
              <Input type="file" onChange={handleImage} />
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt=""
                  className="mt-4 max-h-60 rounded-lg object-cover"
                  width={1000}
                  height={1000}
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={addHandle} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
