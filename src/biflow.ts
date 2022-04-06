// add lodash
import * as _ from "lodash";

import "@/scss/style.scss";

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

const getMsg = (msg: string) => {
  const element = document.createElement("div");
  element.innerHTML = _.join(["Hello", msg], " ");
  return element;
};

document.body.appendChild(component());
document.body.appendChild(getMsg("babel"));

let testTx: string = "replace test test";
testTx = testTx.replaceAll("test", "replaceAll");
console.log(testTx);
