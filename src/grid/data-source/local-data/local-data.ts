import data from 'data';

export class LocalData {
  data: { get: () => any[] } = data;
}
