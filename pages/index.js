import Head from "next/head"
import { BatteryPuzzle } from "../components/battery-puzzle"

export default function Home() {
    return (
        <div className="flex">
            <BatteryPuzzle />
            <Head>
                <title>Create Next App!</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    )
}