import {auth} from "@/lib/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {FC, ReactNode, useEffect, useState} from "react";
import {LoginDialog} from "@/components/login-dialog.tsx";
import {Header} from "@/components/navigation.tsx";

interface Props {
    children: ReactNode
}

const MainLayout: FC<Props> = (props: Props) => {
    const [
        displayLoginDialog,
        setDisplayLoginDialog,
    ] = useState(false)

    useEffect(() => {
         onAuthStateChanged(auth, (user) => {
            if (user == null) {
                setDisplayLoginDialog(true)
                return
            }
        })
    }, [])

    return (
        <>
            <div className="md:hidden text-center py-10">
                Screen Size Not Supported <br/> (min: 768px/tablet screen)
            </div>

            <div className="hidden flex-col md:flex">
                <Header />
                <main className="min-h-full min-w-full">
                    {props.children}
                </main>
            </div>

            <LoginDialog display={displayLoginDialog}/>
        </>
    )
}

export default MainLayout