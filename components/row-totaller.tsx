import React from "react"
import range from "lodash/range"

type Props = {
    side: "left" | "right" | "top" | "bottom"
}

export function RowTotaller(props: Props) {
    const { side } = props

    const isHorizontal = side === "top" || side === "bottom"

    let justify = "justify-center"
    if (side === "left") {
        justify = "justify-end"
    } else if (side === "right") {
        justify = "justify-start"
    }

    let items = "items-center"
    if (side === "top") {
        items = "items-end"
    } else if (side === "bottom") {
        items = "items-start"
    }

    return (
        <React.Fragment>
            <div className={`flex ${isHorizontal ? "flex-row" : "flex-col"}`}>
                {range(0, 6).map((i) => (
                    <div className={`flex h-24 w-24 ${items} ${justify} bg-black text-2xl text-white`} key={i}>
                        0/3
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}
