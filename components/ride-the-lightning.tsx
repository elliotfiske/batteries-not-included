import React, { useMemo } from "react"
import lightning from "../public/lightning_white.svg"

export const RideTheLightning = () => {
    const randoms = useMemo(() => {
        return Array.from({ length: 10 }, () => Math.random())
    }, [])

    return (
        <div className="absolute h-24 w-24">
            <img
                src={"/lightning_white.svg"}
                className={`fade-out absolute top-16 left-8 h-12 w-12 opacity-0`}
                style={{ animationDelay: `${randoms[0]}s` }}
            />
            <img
                src={"/lightning_white.svg"}
                className={`fade-out absolute top-16 left-8 h-12 w-12 rotate-180 opacity-0`}
                style={{ animationDelay: `${randoms[1]}s` }}
            />
            <img
                src={"/lightning_white.svg"}
                className={`fade-out absolute top-16 left-8 h-12 w-12 rotate-180 scale-x-[-100%] opacity-0`}
                style={{ animationDelay: `${randoms[2]}s` }}
            />
            <img
                src={"/lightning_white.svg"}
                className={`fade-out absolute top-16 left-8 h-12 w-12 scale-x-[-100%] opacity-0`}
                style={{ animationDelay: `${randoms[3]}s` }}
            />

            <img
                src={"/lightning_white.svg"}
                className={`fade-out absolute top-16 left-8 h-12 w-12 opacity-0`}
                style={{ animationDelay: `${randoms[4]}s` }}
            />
            <img
                src={"/lightning_white.svg"}
                className={`fade-out absolute top-16 left-8 h-12 w-12 rotate-180 opacity-0`}
                style={{ animationDelay: `${randoms[5]}s` }}
            />
            <img
                src={"/lightning_white.svg"}
                className={`fade-out absolute top-16 left-8 h-12 w-12 rotate-180 scale-x-[-100%] opacity-0`}
                style={{ animationDelay: `${randoms[6]}s` }}
            />
            <img
                src={"/lightning_white.svg"}
                className={`fade-out absolute top-16 left-8 h-12 w-12 scale-x-[-100%] opacity-0`}
                style={{ animationDelay: `${randoms[7]}s` }}
            />
        </div>
    )
}
