import { INave } from './naves.model';

export interface IApiResponse {
  count?: number;
  next?: string;
  previous?: string;
  results?: INave[];
}
