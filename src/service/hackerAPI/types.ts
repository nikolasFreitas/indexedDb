export type THackerData = {
  author: string,
  phrase: string,
  bank: string,
};

export interface hackerDB {
  getHackerPerName(name: string): THackerData;
}
