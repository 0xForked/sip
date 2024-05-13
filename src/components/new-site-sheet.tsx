"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {CirclePlus, ExternalLink} from "lucide-react";

export function NewSiteSheet() {
    return (
        <div className="grid grid-cols-2 gap-2">
            <Sheet key="left">
                <SheetTrigger asChild>
                    <Button>
                        <CirclePlus className="w-4 h-4 mr-2" />
                        Add
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Add New Site Plan</SheetTitle>
                        <SheetDescription>
                            Create a new site plan by filling out the necessary details below. Remember to save your changes once you've completed the form.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" placeholder="Site Plan II" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="latitude" className="text-right">
                                Location
                            </Label>
                            <Input id="latitude" placeholder="1.xxxx" className="col-span-3"/>
                            <Input id="longitude" placeholder="124.xxx" className="col-span-3 ml-[88px]"/>
                            <span className="col-span-3 ml-[88px] w-full text-[10px]">The easy way to get the latitude and longitude is use <a href="https://maps.google.com" target="_blank" className="text-blue-500 underline"><ExternalLink className="h-[8px] w-[8px] inline text-gray-500"/>google maps</a></span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                Plan
                            </Label>
                            <Input id="image" type="file" className="col-span-3"/>
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
