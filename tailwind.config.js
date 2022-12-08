/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            // boxShadow: {
            //   'outline-primary': '0 0 0 5px rgba(66, 153, 225, 0.5)',
            // },
            // https://vercel.com/design/color
            colors: {
                vercel: {
                    pink: "#FF0080",
                    blue: "#0070F3",
                    cyan: "#50E3C2",
                    orange: "#F5A623",
                    violet: "#7928CA",
                },
            },
            animation: {
                "flicker-me": "flicker 5s none",
            },
            keyframes: ({ theme }) => ({
                flicker: [0, 12, 14, 16, 30, 40, 80, 100].reduce((acc, val, ndx) => {
                    acc[`${val}%`] = { opacity: ndx % 2 === 0 ? 1 : 0 }
                    return acc
                }, {}),
                rerender: {
                    "0%": {
                        "border-color": theme("colors.vercel.pink"),
                    },
                    "40%": {
                        "border-color": theme("colors.vercel.pink"),
                    },
                },
                highlight: {
                    "0%": {
                        background: theme("colors.vercel.pink"),
                        color: theme("colors.white"),
                    },
                    "40%": {
                        background: theme("colors.vercel.pink"),
                        color: theme("colors.white"),
                    },
                },
                shimmer: {
                    "100%": {
                        transform: "translateX(100%)",
                    },
                },
                translateXReset: {
                    "100%": {
                        transform: "translateX(0)",
                    },
                },
                fadeToTransparent: {
                    "0%": {
                        opacity: 1,
                    },
                    "40%": {
                        opacity: 1,
                    },
                    "100%": {
                        opacity: 0,
                    },
                },
            }),
        },
    },
}
