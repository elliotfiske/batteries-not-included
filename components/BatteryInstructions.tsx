import React from "react"

export const BatteryInstructions = () => {
    return (
        <div className="mb-16 max-w-3xl text-3xl sm:text-3xl lg:text-xl">
            <a
                className="underline"
                href="http://puzzledpint.net/files/8516/4658/7245/Main_Set_-_Internet_Shopping_2.pdf"
            >
                Original puzzle design
            </a>{" "}
            by Alastair Aitchison
            <br />
            License:{" "}
            <a className="underline" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                CC BY-NC-SA Intl. 4.0
            </a>
            <h2 className="mt-12 text-5xl sm:text-8xl lg:text-3xl">Instructions:</h2>
            <p className="mt-4">
                Place batteries such that each row and column gets the correct total of green and red tiles.
                <b> Not every tile will be filled!</b>
            </p>
            <p className="mt-4">
                Green tiles must not touch green tiles, and red tiles must not touch red tiles. Diagonal touching is
                fine.
            </p>
            <p className="mt-4">
                If you want to mark a battery as <b>definitely empty</b>, press and hold it.
            </p>
        </div>
    )
}
