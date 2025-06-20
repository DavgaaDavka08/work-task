"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Check, X, Filter } from "lucide-react";

// Mock data - replace with real data from your database
const mockComments = [
  {
    id: 1,
    content: "Маш сайхан мэдээ байна. Баярлалаа!",
    author: "Б.Батбаяр",
    email: "batbayar@email.com",
    newsTitle: "Монгол Улсын эдийн засгийн өсөлт",
    status: "pending",
    createdAt: "2024-01-15 14:30",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    content: "Энэ талаар илүү дэлгэрэнгүй мэдээлэл авмаар байна.",
    author: "С.Сарантуяа",
    email: "sarantuya@email.com",
    newsTitle: "Улаанбаатар хотын шинэ төлөвлөгөө",
    status: "approved",
    createdAt: "2024-01-14 16:45",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    content: "Спам сэтгэгдэл - устгах хэрэгтэй",
    author: "Spam User",
    email: "spam@spam.com",
    newsTitle: "Спортын шинэ амжилт",
    status: "rejected",
    createdAt: "2024-01-13 09:15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    content: "Маш их таалагдлаа. Ийм мэдээ байнга гаргаарай!",
    author: "Д.Дорж",
    email: "dorj@email.com",
    newsTitle: "Технологийн шинэ хөгжил",
    status: "pending",
    createdAt: "2024-01-12 11:20",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export default function CommentModeration() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredComments = mockComments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.newsTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || comment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: number) => {
    console.log("Approving comment with id:", id);
    alert("Сэтгэгдэл батлагдлаа!");
  };

  const handleReject = (id: number) => {
    if (confirm("Энэ сэтгэгдлийг татгалзахдаа итгэлтэй байна уу?")) {
      console.log("Rejecting comment with id:", id);
      alert("Сэтгэгдэл татгалзагдлаа!");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Энэ сэтгэгдлийг устгахдаа итгэлтэй байна уу?")) {
      console.log("Deleting comment with id:", id);
      alert("Сэтгэгдэл устгагдлаа!");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">Батлагдсан</Badge>
        );
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Татгалзсан</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Хүлээгдэж буй</Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const pendingCount = mockComments.filter(
    (c) => c.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Сэтгэгдэл хянах</h1>
          <p className="text-gray-600 mt-2">
            Хэрэглэгчийн сэтгэгдлийг хянах, батлах, татгалзах
            {pendingCount > 0 && (
              <span className="ml-2 text-orange-600 font-medium">
                ({pendingCount} хүлээгдэж буй)
              </span>
            )}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Сэтгэгдлийн жагсаалт</CardTitle>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Сэтгэгдэл хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Төлөв" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүх төлөв</SelectItem>
                  <SelectItem value="pending">Хүлээгдэж буй</SelectItem>
                  <SelectItem value="approved">Батлагдсан</SelectItem>
                  <SelectItem value="rejected">Татгалзсан</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className="border rounded-lg p-4 bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={comment.avatar || "/placeholder.svg"}
                          alt={comment.author}
                        />
                        <AvatarFallback>
                          {comment.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-sm text-gray-500">
                            {comment.email}
                          </span>
                          {getStatusBadge(comment.status)}
                        </div>

                        <p className="text-gray-700 mb-2">{comment.content}</p>

                        <div className="text-sm text-gray-500">
                          <span>Мэдээ: {comment.newsTitle}</span>
                          <span className="mx-2">•</span>
                          <span>{comment.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      {comment.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(comment.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(comment.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
