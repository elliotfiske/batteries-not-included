import React, { useCallback, useContext, useEffect, useState } from "react"
import { fill } from "lodash"
import { RowTotaller } from "./row-totaller"
import { BatteryTile } from "./BatteryTile"
import ConfettiExplosion from "react-confetti-explosion"
import { ModalContext } from "../pages"

const WINNER = [
    "green",
    "red",
    "empty",
    "empty",
    "green",
    "red",
    "red",
    "empty",
    "green",
    "red",
    "empty",
    "green",
    "green",
    "empty",
    "red",
    "green",
    "empty",
    "red",
    "empty",
    "empty",
    "green",
    "red",
    "empty",
    "empty",
    "red",
    "green",
    "red",
    "empty",
    "empty",
    "green",
    "green",
    "red",
    "green",
    "red",
    "green",
    "red",
]

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

function findAdjacentRedsOrGreens(fills: Fill[]): [number[], number[], boolean, boolean] {
    const verticalDanger: number[] = []
    const horizontalDanger: number[] = []
    let redFault = false
    let greenFault = false

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            if (fills[i * 6 + j] === "red" && fills[i * 6 + j + 1] === "red") {
                horizontalDanger.push(i * 6 + j)
                redFault = true
            }

            if (fills[j * 6 + i] === "red" && fills[(j + 1) * 6 + i] === "red") {
                verticalDanger.push(j * 6 + i)
                redFault = true
            }

            if (fills[i * 6 + j] === "green" && fills[i * 6 + j + 1] === "green") {
                horizontalDanger.push(i * 6 + j)
                greenFault = true
            }
            if (fills[j * 6 + i] === "green" && fills[(j + 1) * 6 + i] === "green") {
                verticalDanger.push(j * 6 + i)
                greenFault = true
            }
        }
    }

    return [horizontalDanger, verticalDanger, redFault, greenFault]
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

    const [horizontalDanger, verticalDanger, redFault, greenFault] = findAdjacentRedsOrGreens(filled)

    const setFilledAndSave = useCallback((newFilled: Fill[]) => {
        setFilled(newFilled)
        window.localStorage.setItem("saved-filled", JSON.stringify(newFilled))
    }, [])

    const modalContext = useContext(ModalContext)

    useEffect(() => {
        const didWin = filled.every((f, ndx) => {
            if (f === "hella-empty" && WINNER[ndx] === "empty") {
                return true
            }
            return f === WINNER[ndx]
        })

        modalContext.setOpen(didWin)
    }, [filled])

    const [ignoreClickOnce, setIgnoreClickOnce] = useState(false)

    return (
        <div className="flex flex-col justify-center">
            {redFault && <span className="text-shadow-red text-3xl">FAULT: Negative next to negative</span>}
            {!redFault && <span className="text-3xl">&nbsp;</span>}
            {greenFault && <span className="text-shadow-green text-3xl">FAULT: Positive next to positive</span>}
            {!greenFault && <span className="text-3xl">&nbsp;</span>}
            <div className="flex flex-row items-center">
                <div className="width-full subtle-text-shadow-red text-center text-8xl text-red-500">-</div>
                <RowTotaller side="left" targets={leftColumn} fillState={filled} />
                <div className="flex flex-col">
                    <div className="width-full subtle-text-shadow-green  text-center text-8xl text-green-500">+</div>
                    <RowTotaller side="top" targets={topRow} fillState={filled} />
                    <div className="grid grid-cols-6">
                        {grid.map((i, ndx) => {
                            const dangerRight = horizontalDanger.includes(ndx)
                            const dangerDown = verticalDanger.includes(ndx)

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
                                    dangerRight={dangerRight}
                                    dangerDown={dangerDown}
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
        </div>
    )
}
