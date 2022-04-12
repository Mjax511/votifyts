import React, { useState, useEffect } from 'react';

// interface RequestOptionsI {
//   method: string,
//   headers: any
// }
type UseHandleFetchAndLoadResults<Data> = [
  loading: boolean,
  data: Data | null,
  error: any
];

export function useHandleFetchAndLoad<Data>(options: {
  endpoint: string;
  requestOptions: any;
}): UseHandleFetchAndLoadResults<Data> {
  const { endpoint, requestOptions } = options;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(endpoint, requestOptions);
        setData(await res.json());
        setLoading(false);
      })();
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
    // finally {
    //   setLoading(false);
    // }
    //   .then((res) => {
    //     return (res.json());
    //     setLoading(false);
    //   }).then(data => {
    //       setData(data)
    //   })
    //   .catch((err) => {
    //       setError(err)
    //   });
  }, []);
  // if (loading) {
  //   return <div>Loading fetch from {endpoint}</div>;
  // }
  //how to do this?

  return [loading, data, error];
}
