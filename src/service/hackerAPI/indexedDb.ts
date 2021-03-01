import HackerDataModel from './models/hackerDataModel';
import { THackerData } from './types';

function config(DB_NAME: string, tableFactory: (db: IDBDatabase) => void): Promise<IDBDatabase> {
  const request = window.indexedDB.open(DB_NAME);

  return new Promise((resolve) => {
    request.onupgradeneeded = () => {
      const db = request.result;
      // Create tables when finish open
      tableFactory(db);
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

export default async function indexedDbOperations() {
  const DB_NAME = 'HACKER_DB';
  const HACKER_PROFILE = 'HACKER_PROFILE';
  const db: IDBDatabase = await config(DB_NAME, tableFactory);

  async function saveItems(items: THackerData[]): Promise<boolean> {
    const trx = db.transaction(HACKER_PROFILE, 'readwrite');
    const objStore = trx.objectStore(HACKER_PROFILE);
    items.forEach((item) => {
      try {
        objStore.add(item);
      } catch (error) {
        console.error(error);
      }
    });

    const result = new Promise<boolean>((resolve, reject) => {
      trx.oncomplete = () => {
        resolve(true);
      };
      trx.onerror = (e: any) => {
        const error = new Error(
          `Not possible add  due error: ${e}`,
        );
        reject(error);
      };
    });

    return result;
  }

  // @TODO
  async function isStoreEmpty(): Promise<boolean> {
    const trx = db.transaction(HACKER_PROFILE, 'readwrite');
    const objStore = trx.objectStore(HACKER_PROFILE);
    const request = objStore.count();

    return new Promise((resolve) => {
      request.onsuccess = () => {
        resolve(!request.result);
      };
    });
  }

  function isDbCreated(database = db): Boolean {
    return database.objectStoreNames.contains(HACKER_PROFILE);
  }

  function tableFactory(database = db) {
    if (isDbCreated(database)) {
      return;
    }
    const createObjectStore = database.createObjectStore(HACKER_PROFILE, {
      keyPath: 'id',
      autoIncrement: true,
    });

    Object.keys(HackerDataModel).forEach((key) => {
      createObjectStore.createIndex(key, key, {
        unique: key === 'id', // If key is the ID, should be UNIQUE
      });
    });
  }

  return {
    isStoreEmpty,
    saveItems,
  };
}
