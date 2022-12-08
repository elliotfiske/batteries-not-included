import React from "react"
import { BatteryGrid } from "./battery-grid"

export function BatteryPuzzle() {
    return (
        <div>
            <div className="space-x-8 bg-black p-14 text-5xl font-bold text-white">
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
