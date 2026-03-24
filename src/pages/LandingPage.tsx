import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FeatureCards from "@/components/FeatureCards";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-16">

        {/* Hero */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Explore any GitHub profile
          </h1>
          <p className="text-muted-foreground text-lg max-w-md">
            Search a username to preview public stats no login required.
          </p>
        </div>

        {/* Search */}
        <SearchBar />

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-md">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        {/* OAuth button — wired up properly once Auth is added */}
        <Button
          variant="outline"
          className="w-full max-w-md h-10 gap-2"
        >
          <Github className="w-4 h-4" />
          Continue with GitHub
        </Button>

        {/* Feature cards */}
        <FeatureCards />

      </main>

    </div>
  )
}

export default App