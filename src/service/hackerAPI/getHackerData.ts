import indexedDbOperations from './indexedDb';
import { THackerData } from './types';

export default async function getHackerData() {
  if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    return (await import('../../mock/example.json')).default as THackerData[];
  }
  const indexDbHandler = await indexedDbOperations();
  // If the value is cached

  if (await indexDbHandler.isStoreEmpty()) {
    console.log("Inserting...");
    const hackersList = (await import('../../mock/example.json')).default as THackerData[];
    indexDbHandler.saveItems(hackersList);
  } else {
    console.log("Is already inserted");
    
  }

  return indexDbHandler;
}
