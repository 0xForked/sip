import type {LatLngExpression} from "leaflet";

export interface Site {
    id: string
    name: string
    location: LatLngExpression
    plan: string
}