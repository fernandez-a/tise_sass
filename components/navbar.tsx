import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, CreditCard, Settings, Network } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="p-4 flex items-center justify-between">
      {/* Left section */}

      {/* Right section */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              User
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/connections" className="flex items-center">
                <Network className="h-[1.2rem] w-[1.2rem] mr-2" />
                Connections
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="h-[1.2rem] w-[1.2rem] mr-2" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Link href="/login" className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
