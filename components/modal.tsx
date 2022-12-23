import React, { useContext, useState } from "react"
import { ModalContext } from "../pages"
import ConfettiExplosion from "react-confetti-explosion"

export const Modal = () => {
    const [copySuccess, setCopySuccess] = useState(false)
    const [copyErrorMessage, setCopyErrorMessage] = useState("")

    const modalContext = useContext(ModalContext)
    const open = modalContext.open

    return (
        <div
            className={`${open ? "" : "pointer-events-none"} relative z-10`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/*Background backdrop, show/hide based on modal state.*/}

            {/*Entering: "ease-out duration-300"*/}
            {/*  From: "opacity-0"*/}
            {/*  To: "opacity-100"*/}
            {/*Leaving: "ease-in duration-200"*/}
            {/*  From: "opacity-100"*/}
            {/*  To: "opacity-0"*/}

            <div
                className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
                    open ? "opacity-100" : "opacity-0"
                }`}
            ></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    {/*<ConfettiExplosion />*/}
                    {/*Modal panel, show/hide based on modal state.*/}

                    {/*Entering: "ease-out duration-300"*/}
                    {/*  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"*/}
                    {/*  To: "opacity-100 translate-y-0 sm:scale-100"*/}
                    {/*Leaving: "ease-in duration-200"*/}
                    {/*  From: "opacity-100 translate-y-0 sm:scale-100"*/}
                    {/*  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"*/}

                    <div
                        className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${
                            open ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                                        A winner is you!
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            You did it! Share this puzzle to see if your friends can do it too:
                                            <br />
                                            <a
                                                className="cursor-pointer underline"
                                                onClick={() => {
                                                    try {
                                                        navigator.clipboard.writeText(
                                                            "https://elliotfiske.github.io/tb-santa-jam-2022/",
                                                        )
                                                        setCopySuccess(true)
                                                    } catch (err: any) {
                                                        setCopyErrorMessage(err.message)
                                                    }
                                                }}
                                            >
                                                Copy link to this puzzle
                                            </a>
                                            {copySuccess && <div className="text-green-500">Copied!</div>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => {
                                    modalContext.setOpen(false)
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
