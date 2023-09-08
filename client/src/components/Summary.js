import { useEffect, useState } from "react"


const Summary = ({body}) => {
    const [summary, setSummary] = useState();
    useEffect(() => {
        fetchSummary();
    }, [body])

    const fetchSummary = async() => {
        fetch('/api/summary')
        .then(res => res.json())
        .then(data => setSummary(data))
      }

    return (
        <div>
            Summary:
            {summary}
        </div>
    )

}

export default Summary;