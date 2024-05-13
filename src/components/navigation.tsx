import {onAuthStateChanged, signOut, User as FUser} from "firebase/auth";
import {useLocation, useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import {HTMLAttributes, useEffect, useState} from "react";
import {auth} from "@/lib/firebase.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {LogOut,User} from "lucide-react";

function MainNav({
    className,
    ...props
}: HTMLAttributes<HTMLElement>) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <button
                onClick={() => navigate(`/`)}
                className={`
                  text-sm font-medium transition-colors hover:text-primary 
                  ${location.pathname === "/" ? "text-black" : "text-muted-foreground "}
                `}
            >
                Overview
            </button>
            <button
                onClick={() => navigate(`/sites`)}
                className={`
                  text-sm font-medium transition-colors hover:text-primary 
                  ${location.pathname === "/sites" ? "text-black" : "text-muted-foreground "}
                `}
            >
                Sites
            </button>
            <button
                onClick={() => navigate('/users')}
                className={`
                  text-sm font-medium transition-colors hover:text-primary 
                  ${location.pathname === "/users" ? "text-black" : "text-muted-foreground "}
                `}
            >
                Users
            </button>
        </nav>
    )
}

function UserNav() {
    const [
        user,
        setUser
    ] = useState<FUser | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [])

    return (
        <>
            {user && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative space-x-2">
                        <Avatar className="h-8 w-8 rounded-full">
                            <AvatarFallback>{user?.email?.split("@")[0].substring(0, 2) ?? "-"}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left space-y-1">
                            <p className="text-sm font-medium leading-none">
                                @{user?.email?.split("@")[0] ?? "-"}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user?.email ?? "-"}
                            </p>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => console.log("setting")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut(auth).then(() => {
                        window.location.reload()
                    }).catch((error) => {
                        alert(error.message)
                    })}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>}
        </>
    )
}

export function Header() {
    return (
        <>
            <header>
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <UserNav/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}