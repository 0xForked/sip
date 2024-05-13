import {useEffect, useState} from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Loader2} from "lucide-react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/lib/firebase.ts";
import {loginSchema, TLoginSchema} from "@/lib/login-schema.ts";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from "@/components/ui/button.tsx";

interface LoginDialogProps {
    display: boolean,
}

export function LoginDialog(props: LoginDialogProps) {
    const [
        display,
        setDisplay
    ] = useState(false)

    useEffect(() => {
        setDisplay(props.display)
    }, [props])

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<TLoginSchema>({
        resolver: yupResolver(loginSchema),
    })

    const onSubmit = (data: TLoginSchema) => {
        signInWithEmailAndPassword(
            auth,
            data.email,
            data.password,
        ).then(() => {
            window.location.reload()
        }).catch((error) => {
            if (error.code === "auth/invalid-credential") {
                alert("invalid email or password")
            }
        })
    }

   return <>
       <AlertDialog open={display}>
           <AlertDialogContent>
               <AlertDialogHeader>
                   <AlertDialogTitle>Login</AlertDialogTitle>
                   <AlertDialogDescription>
                       Sign in to your account to continue
                   </AlertDialogDescription>
                   <form onSubmit={handleSubmit(onSubmit)}>
                       <div className="space-y-4 py-2 text-left">
                           <div className="space-y-2">
                               <Label htmlFor="email">Email</Label>
                               <Input
                                   id="email"
                                   placeholder="admin@sip.id"
                                   {...register('email')}
                               />
                               <p className={`text-sm text-muted-foreground ${errors?.email ? "text-red-500" : ""}`}>
                                   {errors?.email ? errors?.email?.message : "Enter your email address"}
                               </p>
                           </div>
                       </div>
                       <div className="space-y-4 py-2 pb-4 text-left">
                           <div className="space-y-2">
                               <Label htmlFor="password">Password</Label>
                               <Input
                                   id="password"
                                   type="password"
                                   placeholder="* * * * *"
                                   {...register('password')}
                               />
                               <p className={`text-sm text-muted-foreground ${errors?.password ? "text-red-500" : ""}`}>
                                   {errors?.password ? errors?.password?.message : "Enter your password"}
                               </p>
                           </div>
                       </div>
                       <Button type="submit" disabled={isSubmitting}>
                           {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <></>}
                           Sign In
                       </Button>
                   </form>
               </AlertDialogHeader>
           </AlertDialogContent>
       </AlertDialog>
   </>
}