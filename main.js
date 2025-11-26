console.log(
  'JS #1. Домашнє завдання. Основи JavaScript: Працюємо зі змінними, типами даних'
);

// ім'я змінної: myNum, значення: 10
const myNum = 10;
console.log(`myNum ${myNum}`);

// ім'я змінної: myStr, значення: 'some string'
const myStr = 'some string';
console.log(`myStr ${myStr}`);

// ім'я змінної: myBool, значення: true
const myBool = true;
console.log(`myBool ${myBool}`);

// ім'я змінної: myArr, значення: 1, 2, 3, 4, 5
console.log('myArr');
const myArr = [1, 2, 3, 4, 5];
console.log(myArr);
console.log(`myArr is  ${typeof myArr}`);

// ім'я змінної: myObj, значення: first: 'First Name', last: 'Last Name'
const myObj = { first: 'First Name', last: 'Last Name' };
console.log(`myObj: \nfirst: ${myObj.first} \nlast: ${myObj.last}`);

/*
 * #2
 *
 * Відформатуйте ціле число, яке зберігається в змінній myNum, щоб отримати результат з 2 знаками після коми.
 * Результат збережіть у змінній decimal2.
 */

const decimal2 = myNum.toFixed(2);
console.log(decimal2);

/*
 * #3
 *
 * Створіть змінну myBigInt і запишіть в неї число 123n (BigInt).
 * Потім збільште його на 1 та запищіть в цю ж саму змінну.
 */
let myBigInt = 123n;
console.log(`myBigint ${myBigInt}`);
console.log(`type ${typeof myBigInt}`);
myBigInt += 1n;
console.log(`myBigint ${myBigInt}`);

// myBigInt
