import { helper } from '@ember/component/helper';

export function and([a, b]) {
  return a && b;
}

export default helper(and);
