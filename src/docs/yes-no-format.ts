export class YesNoFormatValueConverter {
  toView(value) {
    return value ? 'yes' : value == undefined ? 'unknown' : 'no';
  }
}