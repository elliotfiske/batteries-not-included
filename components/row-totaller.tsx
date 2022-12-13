import React from "react"
import range from "lodash/range"
import { Fill } from "./battery-grid"
import { fill } from "lodash"

type Props = {
    side: "left" | "right" | "top" | "bottom"
    targets: number[]
    fillState: Fill[]
}

function calculateTotals(fillState: Fill[], side: string): number[] {
    const totals = fill(Array(6), 0)

    fillState.forEach((fill, ndx) => {
        if (side === "left") {
            if (fill === "red") {
                totals[Math.floor(ndx / 6)]++
            }
        } else if (side === "right") {
            if (fill === "green") {
                totals[Math.floor(ndx / 6)]++
            }
        } else if (side === "top") {
            if (fill === "green") {
                totals[ndx % 6]++
            }
        } else if (side === "bottom") {
            if (fill === "red") {
                totals[ndx % 6]++
            }
        }
    })

    return totals
}

export function RowTotaller(props: Props) {
    const isHorizontal = props.side === "top" || props.side === "bottom"
    const isPositive = props.side === "top" || props.side === "right"

    let justify = "justify-center"
    if (props.side === "left") {
        justify = "justify-end"
    } else if (props.side === "right") {
        justify = "justify-start"
    }

    let items = "items-center"
    if (props.side === "top") {
        items = "items-end"
    } else if (props.side === "bottom") {
        items = "items-start"
    }

    const totals = calculateTotals(props.fillState, props.side)

    const rowSize = isHorizontal ? "w-24 h-10" : "w-14 h-24"
    const textColor = isPositive ? "text-green-300" : "text-red-300"

    return (
        <React.Fragment>
            <div className={`flex ${isHorizontal ? "flex-row" : "flex-col"}`}>
                {range(0, 6).map((i) => {
                    const correct = props.targets[i] === totals[i]
                    let correctClass = null
                    if (correct) {
                        if (isPositive) {
                            correctClass = "text-shadow-green text-white"
                        } else {
                            correctClass = "text-shadow-red text-white"
                        }
                    }

                    return (
                        <div
                            className={`flex ${rowSize} ${items} ${justify} ${correctClass ?? textColor} text-3xl`}
                            key={i}
                        >
                            {totals[i]}/{props.targets[i]}
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}
