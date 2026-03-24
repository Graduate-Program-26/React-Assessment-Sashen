import { Github } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <header className="w-full border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        <div className="flex items-center gap-2 text-sm font-semibold">
          <Github className="w-5 h-5" />
          GitHub Dashboard
        </div>
        {/* ThemeToggle to be top right corner*/}
        <ThemeToggle />
      </div>
    </header>
  )
}