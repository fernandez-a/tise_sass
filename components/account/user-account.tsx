import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import TiseAccountCard from "./tise-account-card";
import UserInformationCard from "./user-information-account";

interface UserAccountProps {
  profile: {
    username: string;
    name: string;
    surname: string;
  };
  user: {
    email: string;
    phone: string | null;
    created_at: string;
  };
}

export default function UserAccount({ profile, user }: UserAccountProps) {
  return (
    <div>
      {/* ...breadcrumb stays same */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/account">My account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{profile.username}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4 flex flex-col xl:flex-row gap-8">
        <div className="w-full xl:w-1/3 space-y-6">
          <UserInformationCard
            name={profile.name}
            surname={profile.surname}
            email={user.email}
            phone={user.phone}
            createdAt={user.created_at}
          />
        </div>

        <div className="w-full xl:w-1/3 space-y-6">
          <TiseAccountCard name={profile.name} username={profile.username} />
        </div>

        <div className="w-full xl:w-1/3 space-y-6">
          <div className="bg-primary-foreground p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Cookie generator</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
