import { arrayFrom } from "./arrayFrom";
import { last } from "./last";

class PrivateUtilities {
  arrayFrom = arrayFrom;
  last = last;
}

const _ = new PrivateUtilities();

export { _ };
