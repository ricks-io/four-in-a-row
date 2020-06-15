export default function clone(obj) {
  if (arguments.length != 1) throw new Error("clone function expects one argument.");
  return JSON.parse(JSON.stringify(obj));
}