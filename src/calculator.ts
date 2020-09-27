/**
 * "+", "-", "*", "/", 숫자를 입력받아서 사칙연산 하는 계산기 만들기
 * node에서 완전한 수식을 입력받아서 결과 도출
 * ex) 4 + 6 입력받아서 10 출력
 */

const sum = (num1: number, num2: number): number => {
  return num1 + num2;
};

const subtract = (num1: number, num2: number) => {
  return num1 - num2;
};

const multiply = (num1: number, num2: number) => {
  return num1 * num2;
};

const divide = (num1: number, num2: number) => {
  return num1 / num2;
};

const parser = (value: string): number => {
  const split: string[] = value.split(" ");
  const second = split[1];

  const num1 = Number(split[0]);
  const num2 = Number(split[2]);

  if (second === "+") return sum(num1, num2);
  if (second === "-") return subtract(num1, num2);
  if (second === "*") return multiply(num1, num2);
  return divide(num1, num2);
};

console.log(parser("4 + 6"));
console.log(parser("4 - 6"));

/**
 * 배열의 length는 3으로 고정, 배열의 요소는 number, number, number
 * number를 모두 더하는 로직 (reduce를 사용)
 * [1, 2, 3].reduce((acc, cur) => ~~)
 */

type TTuple = string | boolean | number;

const total = (input: [number, number, number]) =>
  input.reduce((acc, cur) => acc + cur, 0);

console.log(total([3, 4, 5]));
