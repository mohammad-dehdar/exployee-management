import { Card, CardContent } from "@/components/ui/card";
import { UserRecord } from "../../store";
import Link from "next/link";

export default function UserCard({ user }: { user: UserRecord }) {
    return (
        <Link href={`/admin-dashboard/users/${user.id}`}>
            <Card className="p-4 cursor-pointer hover:shadow-lg transition">
                <CardContent className="space-y-2">
                    <h2 className="font-bold text-lg">
                        {user.personal.firstName} {user.personal.lastName}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {user.job.position}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {user.contact.orgEmail}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
