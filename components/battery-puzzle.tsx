import React from "react"
import { BatteryGrid } from "./battery-grid"
import { BatteryInstructions } from "./BatteryInstructions"

export function BatteryPuzzle() {
    return (
        <div className="text-white">
            <div className="space-x-8 p-14 text-5xl font-bold ">
                <h1 className="text-shadow-green inline-block animate-flicker-me">BATTERIES</h1>
                <h1 className="text-shadow-red inline-block">NOT</h1>
                <h1 className="text-shadow-green inline-block">INCLUDED</h1>
            </div>
            <div className="flex flex-col justify-center">
                <BatteryGrid />
                <BatteryInstructions />
            </div>
        </div>
    )
}
