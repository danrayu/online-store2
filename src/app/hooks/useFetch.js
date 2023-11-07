const { useState, useEffect } = require("react")

export function useFetch(fetchCallback) {
  const [waiting, setWaiting] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function runFetch() {
      try {
        const response = await fetchCallback();
        setData(response);
      }
      catch (error) {
        setError(error);
      }
      setWaiting(false);
    }

    runFetch();
  }, [fetchCallback]);

  return [waiting, data, error];

}