import { useState, useEffect } from "react";

import 'firebase/firestore';
import firebaseApp from '../../firebase';

function useGraphsPageHooks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = firebaseApp.firestore();

  async function fetchData() {
    const response = await db.collection("scores").orderBy("date", "asc").get();
    let resData = {dates: [], scores: []};

    response.forEach(function(doc) {
      resData.dates.push(doc.data().dateString);
      resData.scores.push(doc.data().scores.reduce((a, b) => a + b, 0));
    })
    
    setData(resData);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line
  
  return [data, loading];
}

export default useGraphsPageHooks;
