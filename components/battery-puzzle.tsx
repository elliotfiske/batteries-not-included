import React from "react"
import { BatteryGrid } from "./battery-grid"

export function BatteryPuzzle() {
    return (
        <div className=" scale-50 sm:scale-[60%] md:scale-75 lg:scale-100">
            <div className="space-x-8 p-14 text-5xl font-bold text-white">
                <h1 className="text-shadow-green inline-block animate-flicker-me">BATTERIES</h1>
                <h1 className="text-shadow-red inline-block">NOT</h1>
                <h1 className="text-shadow-green inline-block">INCLUDED</h1>
            </div>
            <div className="flex justify-center">
                <BatteryGrid />
            </div>
        </div>
    )
}
