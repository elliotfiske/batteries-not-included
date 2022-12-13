import "../styles/globals.css"
import "../styles/dist.css"

function MyApp({ Component, pageProps }) {
    return <Component className="h-full" {...pageProps} />
}

export default MyApp
