import React from "react"
import { Fill } from "./battery-grid"
import useLongPress from "../hooks/use-long-press"

function classFromFill(fill: Fill) {
    switch (fill) {
        case "red":
            return "red-500"
        case "green":
            return "green-500"
        case "empty":
            return "gray-700"
        case "hella-empty":
            return "gray-900"
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

export function BatteryTile(props: {
    onClick: () => void
    onLongPress: () => void
    i: FlatArray<number[][], 1>
    filled: Array<Fill>
    ndx: number
}) {
    const [clicksDisabled, setClicksDisabled] = React.useState(false)

    const attrs = useLongPress(() => {
        props.onLongPress()
        setClicksDisabled(true)
    }, 1000)

    return (
        <div
            className={`h-24 w-24 cursor-pointer select-none border border-dashed border-gray-600 text-white`}
            onClick={props.onClick}
            onMouseUpCapture={(e) => {
                if (clicksDisabled) {
                    e.stopPropagation()
                    e.preventDefault()
                    setClicksDisabled(false)
                }
            }}
            {...attrs}
        >
            {props.i == 0 && <ZeroGuy fill={props.filled[props.ndx]} />}
            {props.i == 1 && <OneGuy fill={props.filled[props.ndx]} />}
            {props.i == 2 && <TwoGuy fill={props.filled[props.ndx]} />}
            {props.i == 3 && <ThreeGuy fill={props.filled[props.ndx]} />}
        </div>
    )
}
