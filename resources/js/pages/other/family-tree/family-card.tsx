import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { storageSourceUrl } from "@/lib/utils"
import { Family } from "@/types"
import { format } from "date-fns"

interface FamilyCardProps {
  family: Family
}

export const FamilyCard = ({ family }: FamilyCardProps) => {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{family.name}</CardTitle>
            <CardDescription>{family.description || "Aucune description disponible"}</CardDescription>
          </div>
          <Badge variant="outline">Créée le {format(new Date(family.created_at), "d MMM, yyyy")}</Badge>
        </div>
      </CardHeader>
      <CardContent>

        <h3 className="mb-4 font-medium">Membres de la famille ({family.peoples.length})</h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {family.peoples.map((person) => (
            <div key={person.id} className="flex items-start space-x-4 rounded-lg border p-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={storageSourceUrl(person.image)} alt={person.full_name} />
                <AvatarFallback>
                  {person.full_name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <h4 className="font-medium">{person.full_name}</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {person.gender}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {person.relation_family}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Né(e) le : {format(new Date(person.birth), "d MMM, yyyy")}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
