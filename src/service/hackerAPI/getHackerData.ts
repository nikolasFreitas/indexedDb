import indexedDbOperations from './indexedDb';
import { THackerData } from './types';

export default async function getHackerData() {
  if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    return import('../../mock/example.json') as Promise<THackerData[]>;
  }
  const indexDbHandler = await indexedDbOperations();
  console.log("Ueeeeeepaaaaa");
  // If the value is cached
  
  if (indexDbHandler.isStoreEmpty()) {
    const hackersList = (await import('../../mock/example.json')).default as THackerData[];
    console.log(hackersList);
    
    indexDbHandler.saveItems(hackersList);
  }

  return indexDbHandler;
}
