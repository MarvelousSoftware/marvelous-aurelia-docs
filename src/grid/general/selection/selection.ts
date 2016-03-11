import {Grid} from 'marvelous-aurelia-grid';
import data from 'data';

export class Selection {
  data: { getRandom: (count: number) => any[] } = data;
  grid: Grid;
}
