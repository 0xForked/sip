import  'leaflet/dist/leaflet.css'
import {
   LayersControl,
   MapContainer,
   TileLayer, Circle,
} from 'react-leaflet'
import {db} from "@/lib/firebase.ts";
import {collection, getDocs} from "firebase/firestore/lite";
import {useEffect, useState} from "react";
import {NewSiteSheet} from "@/components/new-site-sheet.tsx";
import {SiteDetailDrawer} from "@/components/site-detail-drawer.tsx";
import {Site as ISite} from "@/lib/site.ts";

function Site() {
    const [sites, setSites] = useState<ISite[] | null>(null)
    const [site, setSite] = useState<ISite | null>(null)
    const [openDrawer, setOpenDrawer] = useState(false)

    useEffect(() => {
        getDocs(collection(db, "sites")).then((querySnapshot) => {
            const updatedSites: ISite[] = [];
            const idSet = new Set();
            querySnapshot.forEach((doc) => {
                const id = doc.id;
                if (!idSet.has(id)) {
                    idSet.add(id);
                    const newSite: ISite = {
                        id: id,
                        name: doc.data().name,
                        location: [
                            doc.data().location._lat,
                            doc.data().location._long,
                        ],
                        plan: doc.data().plan
                    };
                    updatedSites.push(newSite);
                }
            });
            setSites(updatedSites);
        });
    }, []);

    return (
        <>
            <div className="relative h-screen">
                <MapContainer
                    className="z-0 h-full"
                    center={[1.5014691,124.8518708]}
                    zoom={13}
                    scrollWheelZoom={false}
                >
                    <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                    <LayersControl position="topright">
                        {sites?.map((site, index) => (
                            <LayersControl.Overlay key={index} checked name={site.name}>
                                <Circle
                                    center={site.location}
                                    pathOptions={{ color: 'red', fillColor: 'green' }}
                                    radius={200}
                                    eventHandlers={{click: () => {
                                        setSite(site)
                                        setOpenDrawer(true)
                                    }}}
                                />
                            </LayersControl.Overlay>
                        ))}
                    </LayersControl>
                </MapContainer>
            </div>
            <div className="absolute z-0 bottom-4 left-4">
                <NewSiteSheet/>
            </div>
            <SiteDetailDrawer
                site={site}
                display={openDrawer}
                callback={()=>setOpenDrawer(false)}
            />
        </>
    )
}

export default Site