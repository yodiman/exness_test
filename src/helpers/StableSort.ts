type Comparator<T> = (a: T, b: T) => number;


export class StableSort {
  static defaultComparator: Comparator<any> = (a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };


  static sort<T>(array: T[], comparator: Comparator<T> = StableSort.defaultComparator): T[] {
    const stabilized = array.map((el, index) => [el, index] as [T, number]);
    const stableCmp: Comparator<[T, number]> = (a, b) => {
      const order = comparator(a[0], b[0]);
      return order !== 0 ? order : a[1] - b[1];
    };

    stabilized.sort(stableCmp);
    for (let i = 0; i < array.length; i += 1) {
      array[i] = stabilized[i][0];
    }

    return array;
  }
}
