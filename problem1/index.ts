const solution1 = function (n: number): number {
  if (n < 0) {
    return 0;
  }
  return (n * (n + 1)) / 2;
};


const solution2 = function (n: number): number {
  if (n < 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const solution3 = function (n: number): number {
  if (n <= 0) {
    return 0;
  }
  return n + solution3(n - 1);
};
