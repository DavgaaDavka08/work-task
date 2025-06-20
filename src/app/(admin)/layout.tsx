"use client";
import { Button } from "@/components/ui/button";
import type React from "react";

import {
  LayoutDashboard,
  Newspaper,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Админ</h1>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-[280px] border-r bg-gray-50 flex flex-col">
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-blue-600 bg-blue-50 hover:bg-blue-100"
              >
                <LayoutDashboard className="h-5 w-5" />
                Удирдлагын самбар
              </Button>
            </Link>

            <Link href="/news">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-gray-700 hover:bg-gray-100"
              >
                <Newspaper className="h-5 w-5" />
                Мэдээ удирдах
              </Button>
            </Link>

            <Link href="/comments">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-gray-700 hover:bg-gray-100"
              >
                <MessageSquare className="h-5 w-5" />
                Сэтгэгдэл хянах
              </Button>
            </Link>
          </nav>

          <div className="p-4 border-t bg-white">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Админ хэрэглэгч
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@example.com
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
