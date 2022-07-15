import { useEffect, useState } from "react"
import Token from "../../../services/Token"
import axios from "../../../services/HttpServices";

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        // const abortCont = new AbortController();

        // fetch(url)
        //     .then(res => {
        //         if (!res.ok) throw Error("Could not fetch the data for that resource")
        //         return res.json()
        //     })
        //     .then(data => {
        //         setData(data)
        //         setIsPending(false)
        //         setError(null)
        //     })
        //     .catch(err => {
        //         if (err.name === 'AbortError') {
        //             console.log('fetch aborted')
        //         } else {
        //             setIsPending(false)
        //             setError(err.message)
        //         }
        //     })

        // return () => { abortCont.abort(); }

        

        axios.get(
            url
          //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
          ).then(data => {
                    setData(data.data)
                    setIsPending(false)
                    setError(null)
               
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                        setIsPending(false)
                        setError(err.message)
                    }
                })
                
    }, [url])

    return { data, isPending, error }
}

export default useFetch;