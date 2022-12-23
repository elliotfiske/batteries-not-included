import React from "react"
import { BatteryGrid } from "./battery-grid"
import { BatteryInstructions } from "./BatteryInstructions"
import ConfettiExplosion from "react-confetti-explosion"

export function BatteryPuzzle() {
    return (
        <div className="text-white">
            <div className="space-x-8 p-14 text-5xl font-bold">
                <h1 className="flicker-on text-shadow-green inline-block">BATTERIES</h1>
                <h1 className="flicker-on text-shadow-red inline-block">NOT</h1>
                <h1 className="flicker-on text-shadow-green inline-block">INCLUDED</h1>
            </div>
            <div className="flex flex-col justify-center">
                <BatteryGrid />
                <BatteryInstructions />
            </div>
        </div>
    )
}
