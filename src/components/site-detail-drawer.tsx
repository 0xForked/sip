import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import {Site} from "@/lib/site.ts";
import {Button} from "@/components/ui/button.tsx";
import {Check, Edit, Plus, X} from "lucide-react";

interface SiteDetailProps {
    display: boolean
    site?: Site | null
    callback(): void
}

export function  SiteDetailDrawer(props: SiteDetailProps){
    return (
        <Drawer open={props.display} onClose={() => props.callback()}>
            <DrawerContent>
                <div className="mx-auto w-full h-[780px]">
                    <div className="flex flex-row justify-between items-center">
                        <DrawerHeader>
                            <DrawerTitle>{props.site?.name}</DrawerTitle>
                        </DrawerHeader>
                        <div className="px-8 space-x-2">
                            <Button size="sm" onClick={() => console.log("add new site plan")}>
                                <Edit className="w-4 h-4"/>
                            </Button>
                            {/* if edit click, display this 2 button and hide close and edit button */}
                            <Button size="sm" onClick={() => console.log("add new site plan")}>
                                <Plus className="w-4 h-4"/>
                            </Button>
                            <Button size="sm" onClick={() => console.log("add new site plan")}>
                                <Check className="w-4 h-4"/>
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => props.callback()}>
                                <X className="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                    <div className="m-4 p-4 h-[700px] border-2">
                        <img
                            className="h-full w-full px-20"
                            src={props.site?.plan}
                            alt={props.site?.id}
                        />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
