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
    * `{} => Object.prototype`
    * `[] => Array.prototype`
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
* 属性标签
```
Object.getOwnPropertyDescriptor({pro: true}, 'pro');  // 两个参数, 对象, 属性
/* Object{
 * value: true, 属性值
 * writable: true, 是否可写
 * enumerable: true,　是否可以被枚举（for...in中是否会出现）
 * configurable: true 可不可以被delete删除或重新配制
 * }
 */
Object.getOwnPropertyDescriptor({pro: true}, 'a');  // undefined

var person = {};
Object.defineProperty(person, 'name', {
   configurable: false,
   writable: false,
   enumerable: true,
   value: 'kangkai'
});
person.name; // kangkai
person.name = 1;
person.name; // kangkai
delete person.name; //false

Object.defineProperty(person, 'type', {
   configurable: true,
   writable: true,
   enumerable: false,
   value: 'Object'
});
Object.keys(person); // ['name']
```
* 对象标签
   * [[proto]]
   * [[class]]
   * [[extensible]]
   ```
   Object.preventExtensible(obj);//使obj对象不可新增属性，原属性可改、可删
   Object.seal(obj);//使obj不可新增属性，原属性可改但不可删
   Object.freeze(obj);//使obj不可新增属性，原属性不可更改、删除
   ```

## 数组 - 弱类型: 可以含有不同类型的元素

```
var arr = [1, true, null, undefined, {x: 1}, [1, 2, 3]];
arr[0]; // 1
arr[3]; // undefined
arr[4].x; // 1
arr[5][1]; // 2
```

* 创建数组
    * - 字面量 `var BAT = ['baidu', 'alibaba', 'tencent']`
    * - Array构造器: new Array
    ```
    var arr = new Array();
    var arrWithLength = new Array(100); // size from 0 to 2^23-1; new 可以省略掉
    var arrLikesLiteral = new Array(true, false, null, 1, 2, 'hi'); // 等价于[true, false, null, 1, 2, 'hi
    ```
* 数组元素读写
```
var arr = [1, 2, 3, 4, 5];
arr[1]; // 2
arr.length; // 5

arr[5] = 6;
arr.length; // 6

delete arr[0]; // 将指定元素变为undefined
arr[0]; // undefined
arr.length; // 6
```
* 数组元素增删: 动态的, 无需指定大小
```
var arr = [];
arr[0] = 1;
arr[1] = 2;
arr.push(3);
arr; // [1, 2, 3]

arr[arr.length] = 4; // arr.push(4)
arr; // [1, 2, 3, 4]

arr.unshift(0);
arr; // [0, 1, 2, 3, 4]

delete arr[2];
arr; // [0, 1, undefined, 3, 4]
arr.length; //5
2 in arr; // false

arr.length -= 1;
arr; // [0, 1, undefined, 3]

arr.pop();
arr; // [0, 1, undefined]

arr.shift();
arr; // [1, undefined]
```
* 数组迭代
```
var i = 0, n = 10;
var arr = [1, 2, 3, 4, 5];
for (; i < n; i++) {
    console.log(arr[i]); // 1, 2, 3, 4, 5
}

for (i in arr) {
    console.log(arr[i]); // 1, 2, 3, 4, 5
}

Array.prototype.x = 'inherited';

for (i in arr) {
    console.log(arr[i]); // 1, 2, 3, 4, 5, inherited
}

for (i in arr) {
    if (arr.hasOwnProperty(i)) {
        console.log(arr[i]); // 1, 2, 3, 4, 5
    }
}
```
* 二维数组, 稀疏数组
* 数组方法 [] => Array.prototype
    * `[].join` 数组转化为字符串
    * `[].reverse` 将数组逆序; `元素组被修改`(inplace operation)
    * `[].sort` 排序; `元素组被修改`
    ```
    // 升序排列
    arr.sort(function(a, b) {
        return a - b;
    });
    ```
    ```
    // 对象
    arr = [{age: 25}, {age: 15}, {age: 91}]
    arr.sort(function(a, b) {
        return a.age - b.age;
    });
    ```
    * `[].concat` 数组合并; `原数组未被修改`
    ```
    var arr = [1, 2, 3];
    arr.concat(4, 5); // [1, 2, 3, 4, 5]
    arr; [1, 2, 3]
    
    // 可以将数组作为参数传参, 数组会被拉平(一次)
    arr.concat([10, 11], 13); // [1, 2, 3, 10, 11, 13]
    arr.concat([1, [2, 3]]); // [1, 2, 3, 1, [2, 3]]
    ```
    * `[].slice` 返回部分数组 `左闭右开区间`
    ```
    var arr = [1, 2, 3, 4, 5];
    arr.slice(1, 3); // [2, 3]
    arr.slice(1); // [2, 3, 4, 5]
    arr.slice(1, -1); // [2, 3, 4]
    arr.slice(-3, -4); // [2]
    ```
    * `[].splice` 数组拼接 `可以删, 可以拼接`; `元素组被修改`
    ```
    // (index, 个数, 添加元素)
    var arr = [1, 2, 3, 4, 5];
    arr.splice(1); // returns [3, 4, 5]
    arr; // [1, 2]
    
    arr = [1, 2, 3, 4, 5];
    arr.splice(2, 2); // returns [3, 4]
    arr; // [1, 2, 5]
    
    arr = [1, 2, 3, 4, 5];
    arr.splice(1, 1, 'a', 'b'); // returns [2]
    arr; // [1, 'a', 'b', 3, 4, 5]
    ```
    * `[].forEach` (ES5 -> gt IE8) 数组遍历
    ```
    var arr = [1, 2, 3, 4, 5];
    arr.forEach(function(item, index, a) {
        console.log(item + '|' + index + '|' + (a === arr));
    });
    // 1|0|true
    // 2|1|true
    // 3|2|true
    // 4|3|true
    // 5|4|true
    ```
    * `[].map` (ES5) 数组映射 `原数组未被修改`
    ```
    var arr = [1, 2, 3];
    arr.map(function(x) {
        return x + 10;
    }); // [11, 12, 13]
    arr; // [1, 2, 3]
    ```
    * `[].filter` (ES5) 数组过滤 `原数组未被修改`
    ```
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr.filter(function(x, index) {
        return index % 3 === 0 || x >=8;
    }); // returns[1, 4, 7, 8, 9, 10]
    arr; // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ```
    * `[].every` (ES5) 数组判断
    ```
    var arr = [1, 2, 3, 4, 5];
    arr.every(function(x) {
        return x < 10;
    }); // true
    
    arr.every(function(x) {
        return x < 3;
    }); // false
    ```
    * `[].some` (ES5) 数组判断
    ```
    var arr = [1, 2, 3, 4, 5];
    arr.some(function(x) {
        return x === 3;
    }); // true
    
    arr.some(function(x) {
        return x === 100;
    }); // false
    ```
    * `[].reduce/reduceRight` (ES5) 对数组元素两两进行操作 `原数组未被修改`
    ```
    var arr = [1, 2, 3];
    var sum = arr.reduce(function(x, y) {
        return x + y;
    }, 0); // 6
    arr; // [1, 2, 3]
    
    arr = [3, 9, 6];
    var max = arr.reduce(function(x, y) {
        console.log(x + '|' + y);
        return x > y ? x : y;
    });
    // 3|9
    // 9|6
    max; // 9
    
    var max = arr.reduceRight(function(x, y) {
        console.log(x + '|' + y);
        return x > y ? x : y;
    });
    // 6|9
    // 9|3
    max; // 9
    ```
    * `[].indexOf/lastIndexOf` (ES5) 数组检索
    ```
    var arr = [1, 2, 3, 2, 1];
    arr.indexOf(2); // 1
    arr.indexOf(99); // -1
    arr.indexOf(1, 1); // 4 -> 第二个元素开始查找
    arr.indexOf(1, -3); // 4
    arr.indexOf(2, -1); // -1
    arr.lastIndexOf(2); // 3
    arr.lastIndexOf(2, -2); // 3
    arr.lastIndexOf(2, -3); // 1
    ```
    * `Array.isArray` (ES5) 判断是否为数组; 构造器的属性, 调用时应该用Array.isArray()
    ```
    Array.isArray([]); // true
    
    // 其他判断方法
    [] instanceof Array; // true
    ({}).toString.apply([]) === '[object Array]'; // true
    [].constructor === Array; // true
    ```
