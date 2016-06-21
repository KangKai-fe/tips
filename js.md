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
   obj.__proto__.hasOwnProperty('x'); // true
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

obj __proto__ -> foo.prototype
foo __proto__ -> Object.prototype
Object __proto__ -> null // 有限原型链

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
var obj = Object.create({x: 1}); // obj的__proto_指向Object_.prototype
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

## 函数

JS中的函数也是对象, 可以像其他对象那样操作和传递, 也称JS中的函数为函数对象.

* this
* arguments
* 作用域
* 不同调用方式
    * 直接调用 `foo();`
    * 对象方法 `o.method();`
    * 构造器 `new Foo();`
    * call/apply/bind `func.call(o);`
* 不同创建方式
    * 函数声明: `函数声明会被前置`; `函数声明不能立即调用`
    ```
    function add(a, b) {
        a = +a;
        b = +b;
        if (isNaN(a) || isNaN(b)) {
            return;
        }
        return a + b;
    }
    ```
    * 函数表达式
    ```
    // 函数表达式 function variable
    var add = function(a, b) {
        // do sth.
    };
    
    // 立即执行函数表达式 IEF(immediately excuted function)
    (function() {
        // do sth.
    })();
    
    // first-class function
    return function() {
        // do sth.
    };
    
    // 命名函数表达式 NEF(named function expression)
    var add = function foo(a, b) {
        // do sth.
    };
    // 递归调用
    var func = function nfe() {
        // do sth.
        nfe();
    };
    ```
    * Function构造器
    ```
    var func = new Function('a', 'b', 'console.log(a + b);');
    func(1, 2); // 3
    
    var func = Function('a', 'b', 'console.log(a + b);');
    func(1, 2); // 3
    ```
    ```
    // CASE 1
    Function('var localVal = "local"; console.log(localVal)')();
    console.log(typeof localVal);
    // local, undefined -> localVal仍为局部变量
    
    // CASE 2
    var globalVal = 'global';
    (function() {
        var locaVal = 'local';
        Function('console.log(typeof localVal, typeof globalVal);')();
    })()
    // undefined, string -> 可以访问global, 不能访问local
    ```
* 变量 & 函数的声明前置
```
var num = add(1, 2);
console.log(num); // 3

function add(a, b) {
    a = +a;
    b = +b;
    if (isNaN(a) || isNaN(b)) {
        return;
    }
    return a + b;
}
```

```
var num = add(1, 2);
console.log(num); // Uncaught TypeError: add is not a function(…)

var add = function(a, b) {
    a = +a;
    b = +b;
    if (isNaN(a) || isNaN(b)) {
        return;
    }
    return a + b;
}
```

## this

* 全局的this(浏览器)
```
console.log(this.document === document); // true
console.log(this === window); // true
this.a = 37;
console.log(window.a); // 37
```
* 一般函数的this(浏览器)
```
function f1() {
    return this;
}
f1() === window; // true; nodejs中为global对象

function f2() {
    'use strict';
    return this;
}
f2() === undefined; // true
```
* 作为对象方法的函数的this
```
var o = {
    prop: 37,
    f: function() {
        return this.prop;
    }
};
console.log(o.f()); // 37

var o = {prop: 37};
function independent() {
    return this.prop;
}
o.f = independent;
console.log(o.f()); // 37
```
* 对象原型链上的this
```
var o = {
    f: function() {
        return this.a + this.b;
    }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```
* get/set方法与this
```
function modulus() {
    return Math.sqrt(this.re * this.re + this.im * this.im);
}
var o = {
    re: 1,
    im: -1,
    get phase() {
        return Math.atan2(this.im, this.re);
    }
};
Object.defineProperty(o, 'modulus', {
    get: modulus, enumerable: true, configurable: true
});
console.log(o.phase, o.modulus); // -0.78 1.4142
```
* 构造器中的this
```
function MyClass() {
   this.a = 37;
   // 构造器中没有return语句, 默认返回this
}
var o = new MyClass();
console.log(o.a); // 37

function C2() {
   this.a = 37;
   return {a: 38};
}
o = new C2();
console.log(o.a); // 38
```
* call/apply方法与this
```
function add(c, d) {
   return this.a + this.b + c + d;
}
var o = {a: 1, b: 3};

add.call(o, 5, 7); // 16
add.apply(o, [10, 20]); // 34

function bar() {
   console.log(Object.prototype.toString.call(this));
}

bar.call(7); // '[object Number]'
```
* bind方法与this (ES5 -> gt IE8)
```
function f() {
   return this.a;
}
var g = f.bind({a: 'test'});
console.log(g()); // test

var o = {a: 37, f: f, g: g};
console.log(o.f(), o.g()); // 37, test
```

## 函数属性和方法

* arguments为类数组的对象, 没有join, slice等数组对象的方法
```
function foo(x, y, z) {
   arguments.length; // 2 -> 实参个数
   arguments[0]; // 1
   arguments[0] = 10; // 绑定关系
   x; // 10 -> 严格模式下仍然是1
   
   arguments[2] = 100; // 未传参数, 失去绑定关系
   z; //undefined
   arguments.callee === foo; // true -> 严格模式下禁止使用
}

foo(1, 2);
foo.length; // 3 -> 形参的个数
foo.name; // 'foo' -> 函数名
```
* apply/call方法(浏览器)
```
function foo(x, y) {
   console.log(x, y, this);
}

foo.call(100, 1, 2); // 1, 2, Number(100)
foo.apply(true, [3, 4]); // 3, 4, Boolean(true)
foo.apply(null); // undefined, undefined, window
foo.apply(undefined); // undefined, undefined, window

function foo(x, y) {
   'use strict';
   console.log(x, y, this);
}
```
* bind方法
```
this.x = 9;
var module = {
   x: 81,
   getX: function() {return this.x;}
};
module.getX(); // 81

var getX = module.getX;
getX(); // 9

var boundGetX = getX.bind(module);
boundGetX(); // 81
```
* bind与currying
```
function add(a, b, c) {
   return a + b + c;
}

var func = add.bind(undefined, 100); // a绑定为100
func(1, 2); // 103

var func2 = func.bind(undefined, 200); // b绑定为200
func2(10); // 310

// example
function getConfig(color, size, otherOptions) {
   console.log(colors, size, otherOptions);
}

var defaultConfig = getConfig.bind(null, '#cc0000', '1024 * 768');

defaultConfig('123'); // #cc0000 1024 * 768 123
defaultConfig('456'); // #cc0000 1024 * 768 456
```
* bind与new
```
function foo() {
   this.b = 100;
   return this.a;
}

var func = foo.bind({a: 1});

func(); // 1
new func(); // {b: 100} -> 去除bind的影响
```

## 闭包

例子

```
function outer() {
   var localVal = 30;
   return localVal;
}

outer(); // 30, 局部变量localVal被释放掉
```

```
function outer() {
   var localVal = 30;
   return function() {
      return localVal;
   }
}

var func = outer();
func(); // 30
```

```
!function() {
   var localData = 'localData here';
   document.addEventListener('click', function() {
      console.log(localData);
   });
}();
```

```
!function() {
   var localData = 'localData here';
   var url = 'http://www.baidu.com/';
   $.ajax({
      url: url,
      success: function() {
         // do sth.
         console.log(localData);
      }
   });
}();
```

闭包 - 常见错误 - 循环闭包

```
document.body.innerHTML = '<div id="div1">aaa</div>' + '<div id="div2">bbb</div>' + '<div id="div3">ccc</div>';
for (var i = 1; i < 4; i++) {
   document.getElementById('div' + i).addEventListener('click', function() {
      alert(i); // all are 4!
   })
}

// 解决方案
document.body.innerHTML = '<div id="div1">aaa</div>' + '<div id="div2">bbb</div>' + '<div id="div3">ccc</div>';
for (var i = 1; i < 4; i++) {
   !function(i) {
      document.getElementById('div' + i).addEventListener('click', function() {
         alert(i); // 1, 2, 3
      });
   }(i);
}
```

闭包 - 封装

```
(function() {
   var _userId = 12345;
   var _typeId = 'item';
   var export = {};
   
   function converter(userId) {
      return +userId;
   }
   
   export.getUserId = function() {
      return converter(_userId);
   }
   
   export.getTypeId = function() {
      return _typeId;
   }
   
   window.export = export;
}());

export.getUserId(); // 12345
export.getTypeId(); // item

export._userId; // undefined
export._typeId; // undefined
export.converter; // undefined
```

闭包的概念: 

wiki:
- 在计算机科学中, 闭包(也称词法闭包或函数闭包)是指一个函数或者函数的引用, 与一个引用环境绑定在一起. 这个引用环境是一个存储该函数每个非局部变量(也叫自由变量)的表.
- 闭包, 不同于一般的函数, 它允许一个函数在立即词法作用域外调用时, 仍可访问非本地变量.

[阮一峰老师](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html) 

`闭包就是能够读取其他函数内部变量的函数。由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。`

优点:

灵活和方便, 封装

缺点:

空间浪费, 内存泄漏, 性能消耗

## 利用函数作用域封装

```
(function() {
   // do sth.
   var a, b;
})();

!function() { // !将函数变为函数表达式, 而非函数声明, 防止声明提前
   // do sth.
   var a, b;
}();
```

## ES3执行上下文

* 概念: `EC(Execution Context) - 执行上下文`  `VO(Variable Object) - 变量对象: 1. 变量, 2. 函数声明, 3. 函数参数`  `AO - 激活对象`
* 变量初始化阶段, VO按照如下顺序填充:
   1. 函数参数(若未传入, 初始化该参数值为undefined)
   2. 函数声明(若命名发生冲突 - 参数中也存在该命名, 会覆盖掉, 变成ref to func) `function foo(x, y, z) {function x() {}; alert(x);} foo(100);`
   3. 变量声明(初始化变量值为undefined, 若发声命名冲突, 会被忽略) `function foo(x, y, z) {function func() {}; var func; console.log(func);}; foo(100);`
   ```
   function test(a, b) {
      var c = 10; // var c是变量初始化阶段做的, c = 10 为赋值语句, 不在此阶段做
      function d() {}
      var e = function _e() {}; // 函数表达式并不会影响VO, 如_e是匿名函数表达式的名字, 不会记录到VO中
      (function x() {}); // 因为是函数表达式, 所以不会影响VO
      b = 20;
   }
   test(10);
   
   AO(test) = {
      a: 10,
      b: undefined, // undefined 和 `Uncaught ReferenceError: b is not defined'' 是不一样的!!!!
      c: undefined,
      d: <ref to func 'd'>,
      e: undefined
   };
   ```
* 代码执行阶段
   ```
   // 接上文
   VO['c'] = 10;
   VO['e'] = function _e() {};
   VO['b'] = 20;
   
   (function x() {}); // 执行完后被忽略, 括起来成为函数表达式, 并没有被调用, 相当于被忽略掉了
   
   AO(test) = {
      a: 10,
      b: 20,
      c: 10,
      d: <reference to FunctionDeclaration 'd'>,
      e: function _e() {}
   };
   ```
   * 举个栗子
   ```
   alert(x); // function
   
   var x = 10;
   alert(x); // 10
   x = 20;
   
   function x() {}
   alert(x); // 20
   
   if (true) {
      var a = 1;
   } else {
      var b = true;
   }
   
   alert(a); // 1
   alert(b); // undefined -> 声明阶段被提前, 赋值为undefined, 但执行阶段因为条件控制语句没能被赋值
   ```

## JavaScript OOP

* 概念: `面向对象程序设计(Object-oriented programming, OOP)是一种程序设计范型, 同时也是一种程序开发的方法. 对象指的是类的实例. 它将对象作为程序的基本单元, 将程序的数据封装在其中, 以提高软件的重用性, 灵活性和扩展性.` - wiki
* 继承, 封装, 多态, 抽象
* 基于原型的继承
   ```
   // prototype -> 函数对象上预设的对象属性
   // __proto__ -> 原型 -> 通常指向实例对象的构造器的prototype属性
   function Foo() {
      this.y = 2; // 作为函数直接去调用的话, this指向全局对象, 使用new调用时, this指向会指向一个原型为Foo.prototype的空对象, 通过this.y给空对象赋值
   }
   typeof Foo.prototype; // 'object'
   Foo.prototype.x = 1;
   var obj = new Foo(); // 当使用new来调用Foo时, Foo会作为一个构造器使用, this指向一个对象, 该对象的原型__proto__会指向构造器的prototype属性 -> Foo.prototype
   
   obj.y; // 2 -> y是obj上的属性
   obj.x; // 1 -> x是原型链上的原型Foo.prototype上的属性
   
   Foo.prototype
   {
      constructor: Foo, // 默认属性
      __proto__: Object.prototype, // 默认属性, 相当于Foo.prototype的原型指向Object.prototype, 因此valueOf...toString等一些方法才会被继承下来
      x: 1 // 通过赋值语句增加的
   }
   ```
   * 举个栗子
   ```
   function Person(name, age) {
      this.name = name;
      this.age = age;
   }
   
   Person.prototype.hi = function() {
      console.log('Hi, my name is ' + this.name + ', I\'m ' + this.age + ' years old now');
   };
   
   Person.prototype.LEGS_NUM = 2;
   Person.prototype.ARMS_NUM = 2;
   Person.prototype.walk = function() {
      console.log(this.name + ' is walking.');
   };
   
   function Student(name, age, className) {
      Person.call(this, name, age);
      this.className = className;
   }
   
   Student.prototype = Object.create(Person.prototype); // Object.create(arg) -> 创建一个空对象, 并且这个空对象的原型__proto__指向传入的参数arg;
   // Student.prototype会作为所有的new Student的实例对象的原型
   // 不使用Student.prototype = Person.prototype 直接赋值的原因, 如果通过直接赋值, 由于Student和Person指向了同一个对象, 当想要为Student自己的方法或属性的时候, 同时会给Person.prototype增加同样的属性
   // 采用Object.create(), Student既可以继承Person上的属性和方法, 也可以添加自己的属性和方法, 而不对Person进行修改
   Student.prototype.constructor = Student; // 如果不设置, constructor会指向Person
   
   Student.prototype.hi = function() { // 覆盖基类的方法
      console.log('Hi, my name is ' + this.name + ' , I\'m ' + this.age + ' years old now, and from ' + this.className + '.');
   };
   
   Student.prototype.learn = function(subject) { // 创建自己的方法
      console.log(this.name + ' is learing ' + subject + ' at ' + this.className + '.');
   };
   
   //test
   var kangkai = new Student('Kangkai', 25, 'Class 3');
   kangkai.hi(); // Hi, my name is Kangkai , I'm 25 years old now, and from Class 3.
   kangkai.LEGS_NUM; // 2
   kangkai.walk(); // Kangkai is walking.
   kangkai.learn('JavaScript'); // Kangkai is learing JavaScript at Class 3.
   
   
   kangkai __proto__ -> Student.prototype (hi, learn)
   Student.prototype __proto__ -> Person.prototype (hi, walk, LEGS_NUM, ARMS_NUM)
   Person.prototype __proto__ -> Object.prototype (hasOwnProperty, valueOf, toString, ...)
   Object.prototype __proto__ -> null
   ```
   * prototype判断
   ```
   var obj = {x: 1};
   Object.getPrototypeOf(obj) === Object.prototype; // true (ES5)
   obj.__proto__ === Object.prototype; // Chrome
   
   var obj2 = Object.create(null); // 创建一个空对象, 对象原型指向null
   obj2.__proto__; // undefined
   obj2.toString(); // Uncaught TypeError: obj2.toString is not a function
   ```
   * prototype改变
   ```
   // 接"举个栗子"里的代码
   // Student.prototype (className, hi, learn)
   
   Student.prototype.x = 1; // 动态修改prototype的属性的时候, 是会影响所有已经创建和新创建的实例的
   kangkai.x; // 1
   
   Student.prototype = {y: 2}; // 如果修改了prototype, 赋值为新的对象的话, 对已经创建的实例是没有影响的, 但是会影响后续创建的实例
   kangkai.y; // undefined
   kangkai.x; // 1
   
   var liming = new Student('Liming', '25', 'Class 1');
   liming.x; // undefined
   liming.y; // 2
   ```
   * 内置构造器的prototype
   ```
   Object.prototype.x = 1;
   var obj = {};
   obj.x; // 1
   for (var key in obj) {
      console.log('result: ' + key);
   }
   // result: x
   
   Object.defineProperty(Object.prototype, 'x', {writable: true, value: 1}); // (ES5)
   var obj = {};
   obj.x; // 1
   for (var key in obj) {
      console.log('result: ' + key);
   }
   // nothing logs
   ```
   * 实现继承的方式
   ```
   function Person() {}
   function Student() {}
   
   Student.prototype = Person.prototype; // 1: 改写子类的原型时, 也会改写Person的原型, 不要用...
   Student.prototype = new Person(); // 2: 只是要实现继承, 去创建实例, 如果Person()需要传参时...
   Student.prototype = Object.create(Person.prototype); // 3: (ES5)创建空对象, 空对象的原型__proto__指向Person.prototype
   Student.prototype.constructor = Student;
   
   if (!Object.create) {
      Object.create = function(proto) {
         function F() {}
         F.prototype = proto;
         return new F;
      };
   }
   ```
* 模拟重载 `就是函数或者方法有相同的名称, 但是参数列表不相同的情形, 这样的同名不同参数的函数或者方法之间, 互相称之为重载函数或者方法`
   ```
   function Person() {
      var args = arguments;
      if (typeof args[0] === 'object' && args[0]) { // && args[0], 将args[0]转化为boolean, 排除null的干扰
         if (args[0].name) {
            this.name = args[0].name;
         }
         if (args[0].age) {
            this.age = args[0].age;
         }
      } else {
         if (args[0]) {
            this.name = args[0];
         }
         if (args[1]) {
            this.age = args[1];
         }
      }
   }
   
   Person.prototype.toString = function() { // 重写Person.prototype.toString, 方便检测传参的结果
      return 'name = ' + this.name + ', age = ' + this.age;
   }
   
   var kangkai = new Person('Kangkai', 25);
   kangkai.toString(); // "name = Kangkai, age = 25"
   
   var liming = new Person({name: 'Liming', age: 24});
   liming.toString(); // "name = Liming, age = 24"
   ```
* 调用父类方法
   ```
   function Person(name) { // 基类
      this.name = name;
   }
   function Student(name, className) {
      this.className = className; // 创建自己的属性
      Person.call(this, name); // 调用基类的方法和属性
   }
   var kangkai = new Student('Kangkai', 'Class 2');
   kangkai; // Student {className: "Class 2", name: "Kangkai"}
   
   Person.prototype.init = function() {};
   
   Student.prototype.init = function() {
      // do sth...
      Person.prototype.init.apply(this, arguments);
   }
   ```
* 链式调用
   ```
   function ClassManager() {}
   ClassManager.prototype.addClass = function(str) {
      console.log('Class: ' + str + ' added.');
      return this; // this 指向 ClassManager的实例
   }
   
   var manager = new ClassManager();
   manager.addClass('classA').addClass('classB').addClass('classC');
   // Class: classA added.
   // Class: classB added.
   // Class: classC added.
   ```
* 抽象类 `通过throw new Error来避免被调用`
   ```
   function DetectorBase() {
      throw new Error('Abstract class can not be invoked directly!');
   }
   DetectorBase.prototype.detect = function() {console.log('Detection starting...');};
   DetectorBase.prototype.stop = function() {console.log('Detector stopped.');};
   DetectorBase.prototype.init = function() {throw new Error('Error');};
   
   function LinkDetector() {}
   LinkDetector.prototype = Object.create(Detecrot.prototype);
   LinkDetector.prototype.constructor = LinkDetector;
   
   // ... add methods to LinkDetector ...
   ```
* defineProperty(ES5)
   ```
   function Person(name) {
      Object.defineProperty(this, 'name', {value: name, enumerable: true}); // 不可写, 不可删, 可遍历
   }
   Object.defineProperty(Person, 'ARMS_NUM', {value: 2, enumerable: true});
   Object.seal(Person.prototype); // 不再被扩展和配置
   Object.seal(Person);
   function Student(name, className) {
      this.className = className;
      Person.call(this, name);
   }
   Student.prototype = Object.create(Person.prototype);
   Student.prototype.constructor = Student;
   ```
* 模块化
   ```
   var moduleA;
   moduleA = function() { // 立即执行的匿名函数
      var prop = 1;
      function func() {}
      return {
         func: func,
         prop: prop
      }
   }();
   
   // 或者
   var moduleA;
   moduleA = new function() { // 通过new, 会返回this -> 对象
      var prop = 1;
      function func() {}
      this.func = func;
      this.prop = prop;
   };
   ```
* 实践 - 探测器
   ```
   !function(global) { // 立即执行的匿名函数表达式, 防止变量或者函数声明泄露到外部
      function DetectorBase(configs) {
         if (!this instanceof DetectorBase) {
            throw new Error('Do not invoke without new.');
         }
         this.configs = configs;
         this.analyze();
      }
      
      DetectorBase.prototype.detect = function() {
         throw new Error('Not implemented');
      };
      
      DetectorBase.prototype.analyze = function() {
         console.log('analyzing...');
         this.data = '###data###';
      };
      
      function LinkDetector(links) {
         if (!this instanceof LinkDetector) {
            throw new Error('Do not invoke without new.');
         }
         this.links = links;
         DetectorBase.apply(this, arguments);
      }
      
      function ContainerDetector(containers) {
         if (!this instanceof ContainerDetector) {
            throw new Error('Do not invoke without new.');
         }
         this.containers = containers;
         DetectorBase.apply(this, arguments);
      }
      
      // inherit first
      inherit(LinkDetector, DetectorBase);
      inherit(ContainerDetector, DetectorBase);
      
      // expand later
      LinkDetector.prototype.detect = function() {
         console.log('Loading data: ' + this.data);
         console.log('Link detection started.');
         console.log('Scanning links: ' + this.links);
      };
      
      ContainerDetector.prototype.detect = function() {
         console.log('Loading data: ' + this.data);
         console.log('Container detection started.');
         console.log('Scanning containers: ' + this.containers);
      };
      
      // prevent from being altered
      Object.freeze(DetectorBase); // 不可删, 不可写, 不可扩展
      Object.freeze(DetectorBase.prototype);
      Object.freeze(LinkDetector);
      Object.freeze(LinkDetector.prototype);
      Object.freeze(ContainerDetector);
      Object.freeze(ContainerDetector.prototype);
      
      // export to global object
      Object.defineProperties(global, {
         LinkDetector: {value: LinkDetector}, // 不可枚举, 不可改写, 不可删除
         ContainerDetector: {value: ContainerDetector},
         DetectorBase: {value: DetectorBase}
      });
      
      function inherit(subClass, superClass) {
         subClass.prototype = Object.create(superClass.prototype);
         subClass.prototype.constructor = subClass;
      }
   }(this);
   
   var cd = new ContainerDetector('#abc #def #ghi');
   var ld = new LinkDetector('http://www.baidu.com http://www.taobao.com http://www.qq.com');
   
   cd.detect();
   ld.detect();
   ```

## 正则表达式

* 正则基础
   * `.` 匹配任意字符(除换行符外: \n, \r, \u2028, \u2029) `/.../.test('1a@');`
   * `\d` 匹配数字0-9 `/\d\d\d/.test(123);`
   * `\D` 非\d, 即匹配不是数字0-9的字符 `/\D\D\D/.test('ab!');`
   * `\w` 匹配数字0-9, 或字母a-z及A-Z, 或下划线 `/\w\w\w\w/.test('aB9_')`
   * `\W` 非\w `/\W\W\W/.test('@!#');`
   * `\s` 匹配空格符, TAB, 换页符, 换行符 `/\sabc/.test(' abc');`
   * `\S` 非\s
   * `\t \r \n \v \f` 匹配tab 回车 换行 垂直制表符 换页符
* 范围符号
   * `[...]` 字符范围 `[a-z] [0-9] [A-Z0-9a-z_]`
   * `[^...]` 字符范围以外 `[^a-z] [^abc]`
   * `^` 行首 `^Hi`
   * `$` 行尾 `test$`
   * `\b` 零宽单词边界 `\bno`
   * `\B` 非\b
* 特殊符号转义 `/\^abc/.test('^abc');`
* 分组
   * `(x)` 分组, 并记录匹配到的字符串 `/(abc)/`
   * `\num` 表示使用分组符(x)匹配到的字符串 `/(abc)\1/.test('abcabc');`
   * `(?:x)` 仅分组 `/(?:abc)(def)\1/.test('abcdefdef');`
* 重复
   * `x* x+` 重复次数>=0 重复次数>0 贪婪算法 `正则表达式: abc*将匹配ab, abc, abccccccc; abc+ 匹配abc, abccccc, 不匹配ab`
   * `x*? x+?` 同x\*, x+ 非贪婪算法 `正则表达式: abc*?在字符串abcccccc中匹配ab, abc+?匹配abc`
   * `x?` 出现0次或1次
   * `x|y` x或者y `x|y匹配x, 也匹配y; ab|cd|ef 匹配ab或cd或ef`
   * `x{n} x{n,} x{n,m}` 重复n次, 重复>=n次, 重复次数满足n<=x<=m `x{5}匹配xxxxxoo, 不匹配xxo;  x{1,3}匹配x, xx, xxx`
* 三个flag
   * `global` 匹配多次
   * `ignoreCase` 忽略大小写
   * `multiline` 跨行
   * 字面量 `/abc/gim.test('ABC'); // true`
   * 对象构造器 `RegExp('abc', 'mgi')`
* RegExp对象属性
   * global `/abc/g.global // true` (使用了g, 返回true)
   * ignoreCase `/abc/g.ignoreCase // false`
   * multiline `/abc/g.multiline // false`
   * source `/abc/g.source // 'abc'`
* RegExp对象方法
   * exec `/abc/.exec('abcdef'); // 'abc'` 正则.exec(字符串) 与 字符串.match(正则) 类似
   * test `/abc/.test('abcde'); // true`
   * toString `/abc/.toString(); // '/abc/'`
   * compile 改变正则的规则和属性
   ```
   var reg = /abc/;
   reg.compile('def');
   reg.test('def'); // true
   ```
* String类型与正则相关的方法
   * String.prototype.search `'abcabcdef'.search(/(abc)\1/); // 0` 返回索引
   * String.prototype.replace 
   ```
   'aabbbbcc'.replace(/b+?/, '1'); // aa1bbbcc
   'aabbbbcc'.replace(/b+/, '1'); // aa1cc
   ```
   * String.prototype.match
   ```
   'aabbbbcc'.match(/b+/); // ['bbbb']
   'aabbbbccbbaa'.match(/b+/g); // ['bbbb', 'bb']
   ```
   * String.prototype.split `'aabbbbccbbaa'.split(/b+/); // ['aa', 'cc', 'aa']`
