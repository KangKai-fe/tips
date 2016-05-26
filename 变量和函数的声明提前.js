// JavaScript 中对变量和函数声明的"提前(hoist)": 解析器将当前作用域内声明的所有变量和函数都会放到作用域的开始处


// 变量声明提前

// noSuchVariable 变量没有定义
(function() {
  //ReferenceError: noSuchVariable is not defined
  console.log(noSuchVariable);
})();


// 只有变量的声明被提前到作用域的开始处了, 而赋值操作被保留在原处
(function() {
  // Outputs: undefined
  console.log(declaredLater);

  var declaredLater = "Now it's defined!";

  // Outputs: "Now it's defined!"
  console.log(declaredLater);
})();


// 以上代码相当于
(function() {
  var declaredLater; //声明被提前到作用域开始处了！

  // Outputs: undefined
  console.log(declaredLater);

  declaredLater = "Now it's defined!"; //赋值操作还在原地!

  // Outputs: "Now it's defined!"
  console.log(declaredLater);
})();


// 例二:
// 定义的局部变量在其作用域内被"提前"了
var name = "Baggins";

(function () {
    // Outputs: "Original name was undefined"
    console.log("Original name was " + name);

    var name = "Underhill";

    // Outputs: "New name is Underhill"
    console.log("New name is " + name);
})();

// 相当于
var name = "Baggins";

(function () {
    var name;  //注意：name 变量被提前了！

    // Outputs: "Original name was undefined"
    console.log("Original name was " + name);

    name = "Underhill";

    // Outputs: "New name is Underhill"
    console.log("New name is " + name);
})();


// 函数声明提前: 分两种情况, 一种是函数声明, 第二种是函数作为值赋值给变量

// JavaScript 解释器允许你在函数声明之前使用, 也就是说, 函数声明并不仅仅是函数名"被提前"了, 整个函数的定义也"被提前"了
// Outputs: "Yes!"
isItHoisted();

function isItHoisted() {
    console.log("Yes!");
}


// 函数作为值赋值给变量
// definitionNotHoisted 变量"被提前"了, 但是他的赋值(也就是函数)并没有被提前
// 由于"被提前"的变量的默认值是 undefined , 所以报的错误属于"类型不匹配", 因为 undefined 不是函数, 当然不能被调用.
// Outputs: "Definition hoisted!"
definitionHoisted();

// TypeError: undefined is not a function
definitionNotHoisted();

function definitionHoisted() {  
    console.log("Definition hoisted!");
}

var definitionNotHoisted = function () {  
    console.log("Definition not hoisted!");
};



// 总结
// 通过上面的讲解可以总结如下:

// 变量的声明被提前到作用域顶部, 赋值保留在原地
// 函数声明整个"被提前"
// 函数作为值赋给变量时只有变量"被提前"了, 函数没有"被提前"