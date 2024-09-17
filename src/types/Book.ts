import {Price} from "@/types/Price.ts";

export type Book = {
    id: number
    name: string
    userId: number
    prices: Price[]
}