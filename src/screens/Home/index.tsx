import { THackerData } from '@src/service/hackerAPI/types';
import React, { useEffect, useState } from 'react';
import getHackerData from '../../service/hackerAPI/getHackerData';
// import ParagrafoExemplo from './style';
export default () => {
  const [hackerList, setHackerList] = useState<THackerData[]>([]);

  useEffect(() => {
    getHackerData().then((hackerOperationsDB) => {
      hackerOperationsDB.getAllData((e) => { setHackerList(e.target.result); });
    });
  }, []);

  const message = 'hello world';
  return (
    <div>
      <h1>{message}</h1>
      { hackerList.length
        && hackerList.map((hacker, i) => (
          <p key={`hacker-${i}`}>{hacker.author}</p>
        ))}
    </div>
  );
};
