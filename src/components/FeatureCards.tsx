import { Card, CardContent } from "@/components/ui/card"
import { Github, User, Star } from "lucide-react"

const features = [
  { icon: <User className="w-5 h-5" />,
    title: "Public profiles",
    description: "Search any GitHub username and preview their profile instantly.",
  },
  { icon: <Github className="w-5 h-5" />,
    title: "Your dashboard",
    description: "Sign in to see your repos, activity feed and contribution calendar.",
  },
  { icon: <Star className="w-5 h-5" />,
    title: "Top repositories",
    description: "Your 6 most starred repos with language, stars and last updated.",
  },
]

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
      {features.map((feature) => (
        <Card key={feature.title} className="bg-card border-border">
          <CardContent className="pt-6 flex flex-col gap-3">
            <div className="text-muted-foreground">{feature.icon}</div>
            <p className="text-sm font-semibold">{feature.title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}