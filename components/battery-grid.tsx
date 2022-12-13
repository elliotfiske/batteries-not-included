import React, { useState } from "react"
import { fill } from "lodash"
import { RowTotaller } from "./row-totaller"

export type Fill = "red" | "green" | "empty"

function classFromFill(fill: Fill) {
    switch (fill) {
        case "red":
            return "red-500"
        case "green":
            return "green-500"
        case "empty":
            return "gray-700"
    }
}

function textFromFill(fill: Fill) {
    switch (fill) {
        case "red":
            return "–"
        case "green":
            return "+"
        case "empty":
            return ""
    }
}

/*
 0-1 is horizontal battery
 2-3 is vertical battery
 */
const horizontalCommonClasses = "absolute flex justify-center h-16 w-20 border-2 border-white text-5xl"
const verticalCommonClasses = "absolute flex justify-center h-20 w-16 border-2 border-white text-5xl"

function ZeroGuy({ fill }: { fill: Fill }) {
    return (
        <div className="flex h-24 items-center justify-end">
            <div className={`h-16 w-20 rounded-l-lg border-r-0 bg-${classFromFill(fill)} ${horizontalCommonClasses}`}>
                {textFromFill(fill)}
                <div className={`absolute top-[-2px] left-0 h-16 w-20 border-r-2`} />
            </div>
        </div>
    )
}

function OneGuy({ fill }: { fill: Fill }) {
    return (
        <div className="flex h-24 items-center justify-start">
            <div className={`h-16 w-20 rounded-r-lg border-l-0 bg-${classFromFill(fill)} ${horizontalCommonClasses}`}>
                {textFromFill(fill)}
                <div className={`absolute top-[-2px] left-0 h-16 w-20 border-l-2`} />
            </div>
        </div>
    )
}

function TwoGuy({ fill }: { fill: Fill }) {
    return (
        <div className="flex h-24 flex-col items-center justify-end">
            <div className={`rounded-t-lg border-b-0 bg-${classFromFill(fill)} ${verticalCommonClasses}`}>
                <div className="mt-2">{textFromFill(fill)}</div>
            </div>
            <div className={`absolute h-20 w-16 border-b-2`} />
        </div>
    )
}

function ThreeGuy({ fill }: { fill: Fill }) {
    return (
        <div className="flex h-24 flex-col items-center justify-start">
            <div className={`rounded-b-lg border-t-0 bg-${classFromFill(fill)} ${verticalCommonClasses}`}>
                <div className="mt-2">{textFromFill(fill)}</div>
            </div>
            <div className={`absolute h-20 w-16 border-t`} />
        </div>
    )
}

const grid = [
    [0, 1, 0, 1, 0, 1],
    [2, 2, 0, 1, 2, 2],
    [3, 3, 2, 2, 3, 3],
    [0, 1, 3, 3, 0, 1],
    [2, 2, 2, 0, 1, 2],
    [3, 3, 3, 0, 1, 3],
].flat()

const topRow = [3, 1, 3, 1, 2, 2]
const leftColumn = [2, 2, 2, 1, 2, 3]
const rightColumn = [2, 2, 2, 1, 2, 3]
const bottomRow = [2, 2, 2, 3, 0, 3]

function toggleFillState(fills: Fill[], ndx: number) {
    const type = grid[ndx]
    const newFills = [...fills]

    let partnerInCrime = -1
    if (type === 0) {
        partnerInCrime = ndx + 1
    } else if (type === 1) {
        partnerInCrime = ndx - 1
    } else if (type === 2) {
        partnerInCrime = ndx + 6
    } else if (type === 3) {
        partnerInCrime = ndx - 6
    }

    if (type === 0 || type === 2) {
        if (fills[ndx] === "empty") {
            newFills[ndx] = "red"
            newFills[partnerInCrime] = "green"
        } else if (fills[ndx] === "red") {
            newFills[ndx] = "green"
            newFills[partnerInCrime] = "red"
        } else if (fills[ndx] === "green") {
            newFills[ndx] = "empty"
            newFills[partnerInCrime] = "empty"
        }
    } else if (type === 1 || type === 3) {
        if (fills[ndx] === "empty") {
            newFills[ndx] = "green"
            newFills[partnerInCrime] = "red"
        } else if (fills[ndx] === "red") {
            newFills[ndx] = "empty"
            newFills[partnerInCrime] = "empty"
        } else if (fills[ndx] === "green") {
            newFills[ndx] = "red"
            newFills[partnerInCrime] = "green"
        }
    }

    return newFills
}

export function BatteryGrid() {
    const [filled, setFilled] = useState<Array<Fill>>(fill(Array(36), "empty"))

    return (
        <div className="flex flex-row items-center">
            <div className="width-full subtle-text-shadow-red text-center text-8xl text-red-500">-</div>
            <RowTotaller side="left" targets={leftColumn} fillState={filled} />
            <div className="flex flex-col">
                <div className="width-full subtle-text-shadow-green  text-center text-8xl text-green-500">+</div>
                <RowTotaller side="top" targets={topRow} fillState={filled} />
                <div className="grid grid-cols-6">
                    {grid.map((i, ndx) => {
                        return (
                            <div
                                key={ndx}
                                className="h-24 w-24 cursor-pointer border border-dashed border-gray-600 text-white"
                                onClick={() => {
                                    const newFill = toggleFillState(filled, ndx)
                                    setFilled(newFill)
                                }}
                            >
                                {i == 0 && <ZeroGuy fill={filled[ndx]} />}
                                {i == 1 && <OneGuy fill={filled[ndx]} />}
                                {i == 2 && <TwoGuy fill={filled[ndx]} />}
                                {i == 3 && <ThreeGuy fill={filled[ndx]} />}
                            </div>
                        )
                    })}
                </div>
                <RowTotaller side="bottom" targets={bottomRow} fillState={filled} />
                <div className="width-full subtle-text-shadow-red z-10  text-center text-8xl text-red-500">-</div>
            </div>
            <RowTotaller side="right" targets={rightColumn} fillState={filled} />
            <div className="width-full subtle-text-shadow-green  text-center text-8xl text-green-500">+</div>
        </div>
    )
}
