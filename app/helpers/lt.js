import { helper } from '@ember/component/helper';

export function lt([a, b]) {
  return a < b;
}

export default helper(lt);
