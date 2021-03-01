import { THackerData } from '../types';

export type TMHackerListData<T = THackerData> = { [key in keyof T] : null | T[key] };
