import React, { useCallback, useEffect, useState } from "react"
import { fill } from "lodash"
import { RowTotaller } from "./row-totaller"
import { BatteryTile } from "./BatteryTile"

export type Fill = "red" | "green" | "empty" | "hella-empty"

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

function emptyish(fill: Fill) {
    return fill === "empty" || fill === "hella-empty"
}

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
        if (emptyish(fills[ndx])) {
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
        if (emptyish(fills[ndx])) {
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

function markDefinitelyEmpty(fills: Fill[], ndx: number) {
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

    newFills[ndx] = "hella-empty"
    newFills[partnerInCrime] = "hella-empty"

    return newFills
}

export function BatteryGrid() {
    const [filled, setFilled] = useState<Array<Fill>>(() => {
        return fill(Array(36), "empty")
    })

    useEffect(() => {
        const saved = localStorage.getItem("saved-filled")

        try {
            if (saved) {
                setFilled(JSON.parse(saved))
            }
        } catch (e) {}
    }, [])

    const setFilledAndSave = useCallback((newFilled: Fill[]) => {
        setFilled(newFilled)
        window.localStorage.setItem("saved-filled", JSON.stringify(newFilled))
    }, [])

    const [ignoreClickOnce, setIgnoreClickOnce] = useState(false)

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
                            <BatteryTile
                                key={ndx}
                                onClick={() => {
                                    if (ignoreClickOnce) {
                                        setIgnoreClickOnce(false)
                                        return
                                    }

                                    const newFill = toggleFillState(filled, ndx)
                                    setFilledAndSave(newFill)
                                }}
                                onLongPress={() => {
                                    const newFill = markDefinitelyEmpty(filled, ndx)
                                    setFilledAndSave(newFill)

                                    setIgnoreClickOnce(true)
                                }}
                                i={i}
                                filled={filled}
                                ndx={ndx}
                            />
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
