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

* typeof        返回字符串; 适合基本类型及function的检测, 遇到null失效(用===来判断null)
```javascript
    typeof function(){};    // "function"
    typeof [1, 2];          // "object"
    typeof NaN;            // "number"
    typeof null;           // "object"
```
* instanceof    (obj instanceof Object)   基于原型链查找, 返回boolean值; 适合自定义对象, 也可以用来检测原生对象, 在不同window或iframe之间检测时失效
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
