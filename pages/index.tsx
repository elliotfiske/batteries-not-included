import Head from "next/head"
import { BatteryPuzzle } from "../components/battery-puzzle"
import { Modal } from "../components/modal"
import React, { useState } from "react"

export const ModalContext = React.createContext({
    open: false,
    setOpen: (value: boolean) => {},
})

export default function Home() {
    const [open, setOpen] = useState(false)

    return (
        <ModalContext.Provider
            value={{
                open,
                setOpen,
            }}
        >
            <Modal />
            <div className="-translate-y-72 scale-[40%] sm:-translate-y-48 sm:scale-[60%] md:-translate-y-24 md:scale-75 lg:translate-y-0 lg:scale-100">
                <div className="flex h-full w-full flex-grow justify-center">
                    <BatteryPuzzle />
                    <Head>
                        <title>Batteries Not Included - A Christmas Puzzle</title>
                        <meta name="description" content="Try your hand at this wacky little puzzle!" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                </div>
            </div>
        </ModalContext.Provider>
    )
}
