import data from 'data';

export class ColumnTemplate {
  data: { get: () => any[] } = data;
  
  show(item) {
    alert(`${item.firstName} ${item.lastName}`);
  }
}
