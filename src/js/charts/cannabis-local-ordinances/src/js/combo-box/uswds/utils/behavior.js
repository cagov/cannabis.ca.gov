const assign = require("object-assign");
// const Behavior = require("./../../../../../node_modules/receptor/src/behavior");

import { behavior } from "receptor";

/**
 * @name sequence
 * @param {...Function} seq an array of functions
 * @return { closure } callHooks
 */
// We use a named function here because we want it to inherit its lexical scope
// from the behavior props object, not from the module
const sequence = (...seq) =>
  function callHooks(target = document.body) {
//     seq.forEach((method) => {
//       if (typeof this[method] === "function") {
//         this[method].call(this, target);
//       }
//     });
  };

/**
 * @name behavior
 * @param {object} events
 * @param {object?} props
 * @return {receptor.behavior}
 */
 export default (events, props) =>
  behavior(
    events,
    assign(
      {
        on: sequence("init", "add"),
        off: sequence("teardown", "remove"),
      },
      props
    )
  );


