/**
 * Function that shuffles an array according to the Fisher-Yates (Durstenfield)
 * Algorithm
 * @param arr An array of strings
 * @returns shuffled array
 */
export function shuffleArray(arr: Array<string>): Array<string> {
  for (let i = arr.length - 1; i > 0; i--) {
    // pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // swap elements at i and j
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function areEqual(arr_1: Array<string | undefined>, arr_2: Array<string>) {
  if (arr_1.length !== arr_2.length) return false;
  const sorted_1 = arr_1.sort();
  const sorted_2 = arr_2.sort();

  return sorted_1.every((val, i) => val === sorted_2[i]);
}
