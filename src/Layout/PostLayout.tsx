import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import SideBar from "../components/SideBar";

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-black text-gray-200">
        <SideBar />

        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b border-gray-800 bg-black/80 backdrop-blur-sm flex items-center px-6">
            <SidebarTrigger className="mr-4 text-gray-300" />
            <h1 className="text-lg font-semibold text-gray-100 flex-1">
              Stratify
            </h1>
          </header>

          <div className="flex-1 p-6 bg-black">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
