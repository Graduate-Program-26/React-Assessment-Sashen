import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [username, setUsername] = useState("")

  function handleSearch() {
    const trimmed = username.trim()
    if (!trimmed) return
    console.log("Searching for:", trimmed)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <div className="flex w-full max-w-md gap-2">
      <Input
        placeholder="Enter a GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-10"
      />
      <Button onClick={handleSearch} className="h-10 px-4">
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </div>
  )
}