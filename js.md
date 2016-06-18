## javascript六种数据类型:

* 原始类型:
    * number
    * string
    * boolean
    * null
    * undefined

* object对象
    * Function
    * Array
    * Date
    * ...

## 包装对象
会发生临时转换, 但是之后被销毁掉

* 'str' -> String Object
* 123 -> Number Object
* true -> Boolean Object

```javascript
    var a = 'string';
    alert(a.length);    // 6
    a.t = 3;
    alert(a.t);         // undefined
```

## 类型检测

* typeof        `返回字符串;` 适合基本类型及function的检测, 遇到null失效(`用===来判断null`)
```javascript
    typeof function(){};    // "function"
    typeof [1, 2];          // "object"
    typeof NaN;            // "number"
    typeof null;           // "object"
```
* instanceof    (obj instanceof Object)   基于原型链查找, `返回boolean值;` 适合自定义对象, 也可以用来检测原生对象, 在不同window或iframe之间检测时失效
```javascript
    // 不同window或iframe之间的对象类型检测不能使用instanceof
    function Person() {};
    function Student() {};
    Student.prototype = new Person();
    Student.prototype.constructor = Student;
    var kk = new Student();
    var oneperson = new Person();
    kk instanceof Student;   // true
    kk instanceof Person;   // true
    oneperson instanceof Student;   // false
    oneperson instanceof Person;    // true
```
* Object.prototype.toString   适合内置对象和基本类型, 遇到null和undefined失效
```js
    Object.prototype.toString.apply([]);    // "[object Array]"
    Object.prototype.toString.apply(function() {});    // "[object Function]"
    Object.prototype.toString.apply(null);    // "[object Null]"; lt IE9 return "[object object]"
    Object.prototype.toString.apply(undefined);    // "[object Undefined]"
```
* constructor
* duck type

## 表达式

* 原始表达式
   * 常量, 直接量 `3.14, 'test'`
   * 关键字 `null, this, true`
   * 变量 `i, j, k`
* 复合表达式 = 原始表达式 运算符 原始表达式 `10 + 20`
* 数组, 对象的初始化表达式
   * [1, 2]          -> new Array(1, 2);
   * [1, , , 4]      -> [1, undefined, undefined, 4];
   * {x: 1, y: 2}    -> var o = new Object(); o.x = 1; o.y = 2;
* 函数表达式
```
   var fe = function() {};
   (function() {
      console.log('hello world');
   })();
```
* 属性访问表达式
```
   var o = {x: 1};
   o.x;
   o['x'];
```
* 调用表达式 `func();`
* 对象创建表达式
```
   new Func(1, 2);
   new Object;
```

## 运算符

* 一元 `+num`
* 二元 `a + b`
* 三元 `c ? a : b`

* 赋值 `x += 1`
* 比较 `a === b`
* 算数 `a - b`
* 位 `a | b`
* 逻辑 `exp1 && exp2`
* 字符串 `'a' + 'b'`
* 特殊 
   * delete运算符 `delete obj.x`
   * ,运算符 `var val = (1, 2, 3); // val = 3`逗号隔开, 每个表达式都会被计算, 取最右边的值
   * in运算符 `window.x = 1; 'x' in window; // true`
   * typeof `判断原始类型, 函数对象, 返回字符串`
   * instanceof `判断对象的类型, 基于原型链, 返回boolean`
   * new运算符
   ```
   function Foo(){};
   Foo.prototype.x = 1;
   var obj = new Foo();
   obj.x; // 1
   obj.hasOwnProperty('x'); // false
   obj._proto_.hasOwnProperty('x'); // true
   ```
   * this运算符
   ```
   this; // window
   var obj = {
      func: function() {return this;}
   };
   obj.func(); // obj
   ```
   * void
   ```
   void 0; // undefined
   void(0); // undefined
   ```

## 语句(statement)

block, break, continue, empty, if...else, switch, try catch, var, function, return, do...while, for, for...in, while, debugger, label, with

* var
``` 
function foo() {
   var a = b = 1; // 隐式创建全局变量b
}
foo();

console.log(typeof a); // 'undefined'
console.log(typeof b); // 'number'

```
* try catch finally
```
try {                      // 首先执行try块语句中的代码, try后面必须接着一个catch或者finally语句
   throw 'test';
} catch (ex) {             // 如果抛出异常, 会由catch捕获并执行, 如果没有异常, catch语句将被忽略
   console.log(ex);
} finally {                // finally一定执行
   console.log('finally');
}
```
```
try {
   try {
      throw new Error('oops');
   }
   finally {
      console.log('finally');
   }
}
catch (ex) {
   console.error('outer', ex.message);
}
```
* function
```
// 函数声明 前置
fd(); // true
function fd() {
   // do sth.
   return true;
}
// 函数表达式
fe(); // Uncaught ReferenceError: fe is not defined(…)
var fe = function() {
   // do sth.
};
```
* for...in 1.顺序不确定(遍历数组, 尽量不要用); 2.enumerable为false时不会出现; 3.for in对象属性时受原型链影响
* with 不建议使用 1.让js引擎优化更难; 2.可读性差; 3.`可被变量定义代替`; 4.严格模式下禁用
* 'use strict' 1. 不允许使用with(SyntaxError); 2.不允许未声明的变量被赋值(ReferenceError); 3.arguments变为参数的静态副本; 4.delete参数或函数名报错(SyntaxError); 5.delete不可配置的属性报错(TypeError); 6.对象字面量重复属性名报错; 7.进制八进制字面量(SyntaxError); 8.eval, arguments变为关键字, 不能作为变量或函数名(SyntaxError); 9.eval独立作用域
```
!function(a) {
   arguments[0] = 100;
   console.log(a);
}(1);
// a传1 => 100; a不传参 => undefined
!function(a) {
   'use strict';
   arguments[0] = 100;
   console.log(a);
}(1);
// 1
!function(a) {
   'use strict';
   arguments[0].x = 100;
   console.log(a.x);
}({x: 1});
// 100
```

## 对象

* 属性`无序`, 每个属性都有一个`字符串`key和对应的value
* 对象创建 - 字面量
```
var obj1 = {x: 1, y: 2};
var obj2 = {
   x: 1,
   y: 2,
   o: {
      z: 3,
      n: 4
   }
};
```
* 对象创建 - new/原型链
```
function foo() {}
foo.prototype.z = 3;

var obj = new foo();
obj.x = 1;
obj.y = 2;

obj.x; // 1
obj.y; // 2
obj.z; // 3
typeob obj.toString; // 'function'
'z' in obj; // true
obj hasOwnProperty('z'); // false

obj _proto_ -> foo.prototype
foo _proto_ -> Object.prototype
Object _proto_ -> null // 有限原型链

obj.z = 5;
obj.hasOwnProperty('z'); // true
foo.prototype.z; // 3
obj.z; // 5

obj.z = undefined;
obj.z; // undefined

delete obj.z; // true
obj.z; // 3

delete obj.z; // true
obj.z; // 3
```
* 对象创建 - Object.create
```
var obj = Object.create({x: 1}); // obj的_proto_指向Object.prototype
obj.x; // 1
typeof obj.toString// 'function'
obj.hasOwnProperty('x'); // false

var obj = Object.create(null);
obj.toString; // undefined
```
* 对象属性 - 访问: 1. obj.prop; 2. obj['prop'];
* for...in 遍历时可能会访问原型链上的属性
* 属性检测
```
if (obj && obj.prop) {
   prop = ...
}
if (obj.prop != undefined) {
   // !== undefined or !== null
}
if (obj.prop !== undefined) {
   // !== undefined
}
```
* 属性getter/setter方法
```
var man = {
   name: 'kk',
   $age: null,
   github: 'kangkai-fe',
   get age() {
      if (this.$age == undefined) {
         return new Date().getFullYear() - 1991;
      } else {
         return this.$age;
      }
   },
   set age(val) {
      val = +val;
      if (!isNaN(val) && val > 0 && val < 150) {
         this.$age = val;
      } else {
         throw new Error('Incorrect val = ' + val);
      }
   }
}
console.log(man.age); // 25
man.age = 30;
console.log(man.age); // 30
man.age = 'abc'; // error: Incorrect val = NaN

```
