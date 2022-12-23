import React from "react"
import { BatteryGrid } from "./battery-grid"
import { BatteryInstructions } from "./BatteryInstructions"

export function BatteryPuzzle() {
    return (
        <div className="text-white">
            <div className="space-x-8 p-14 text-5xl font-bold">
                <span className="text-shadow-green">
                    <h1 className="flicker-on  inline-block">BATTERIES</h1>
                </span>
                <span className="text-shadow-red">
                    <h1 className="flicker-on-2 inline-block [animation-delay:1s]">NOT</h1>
                </span>
                <span className="text-shadow-green">
                    <h1 className="flicker-on inline-block [animation-delay:1.5s]">INCLUDED</h1>
                </span>
            </div>
            <div className="flex flex-col justify-center">
                <BatteryGrid />
                <BatteryInstructions />
            </div>
        </div>
    )
}
