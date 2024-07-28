export function showUserName(name) {
  if (name) {
    return `@${name.split(" ").join("").toLowerCase()}`;
  }

  return "@joedoe";
}
