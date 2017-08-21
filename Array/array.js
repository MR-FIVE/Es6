// 1.静态方法
// 1.1 Array.from(obj[,cb[,context]])
// DOM集合和arguments是最经典类数组对象，在以前我们大概会使用下面的方式将其转化为一个数组：
// es5:
var arr = [].slice.apply(arguments);
// es6
let arr = Array.from(arguments);
// -----------------------------------------------------------------------------
// 只要是部署了Iterator接口的对象，即可遍历的对象，Array.from都可以将其转化为一个真正的数组。比如字符串和Set集合。下面的代码会将一个字符串转为以单个字符为元素的数组：
var str = 'hello world';
// es5
let arr = str.split('');//[ 'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd' ]
// es6
let str = Array.from(str);//[ 'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd' ]

// -----------------------------------------------------------------------------
// 有的时候我们的字符串中会出现四字节字符，会导致str.length出现异常行为，可以将字符串转化为数组，在获取数组length的值。
// 我们可以配合Set集合默认去除重复元素的特性来实现数组去重：
let arr = ['a','b','c','d','a','e','c']; // 需要去重的数组
let set = new Set(arr); // 创建一个Set集合，集合会默认去除重复的元素
newArr = Array.from(set); // 将Set集合转化为一个数组
console.log(Array.isArray(newArr)); //=> true
console.log(newArr); // ['a','b','c','d','e']

// -----------------------------------------------------------------------------
// 还有一个极端的例子
Array.from({length:3}); // =>[undefined, undefined, undefined]

// -----------------------------------------------------------------------------
// 另外不得不提的是括展元素符...，它也可以将部署了遍历器接口的变量转化为数组，它和Array.from的区别在于，它无法转化那些只有length属性的类似数组的对象。

// -----------------------------------------------------------------------------
// Array.from方法还可以接受第二个参数，类似于[].map方法的回调函数，它会对将要返回的数组元素进行加工：
Array.from(new Set(['a','b','a']), item=>item+'@'); //=> ['a@', 'b@']

// -----------------------------------------------------------------------------
// Array.from在处理这样的数组时，不像foreach()\filter\every\some\map那样自动跳过空位，而是默认为它填充undefined
// 数组中空位不等于undefined，一个位置的值是undefined表明其仍然是有值的
// 另外补充一句，join方法会将空位视为undefined，而将undefined和null视为空字符串。
Array.from([1,2,3,,5])//[ 1, 2, 3, undefined, 5 ]

// 1.2 Array.of(...args)
// Array.of用于将一组值转化为数组，其作用与Array构造器类似，但区别在于Array.of不会出现Array构造器那样怪异的行为：
Array.of(3) // =>[3];
new Array(3) // =>[,,]

// 2.实例方法
// 寻找数组中的数组，如果未找到符合条件的元素，find方法返回undefined，而findIndex方法返回-1.
let arr = [1,-2,3,4,5,6,7];
let negative = arr.find(item => item < 0); //-2
let negativeIndex = arr.findIndex(item => item < 0); //1

// ES5中的indexOf方法没有办法找到数组中的NaN，因为NaN!==NaN
let arr = [1,2,3,4,NaN];
console.log(arr.indexOf(NaN));// -1

// 在ES6中，我们可以使用find方法自定义条件来实现这个功能：
let foo = arr.find((item) => {
    return item!==item;//NaN !== NaN
});

// 2.1
Array.prototype.fill(value, [start = 0[, end = arr.length]])
// 这个方法可以用来填充数组，它适合填充空数组：
// 注意，这个方法会影响原来的数组，将选中的已有元素抹去
let arr = new Array(3);
arr.fill(6);
arr// => [6,6,6]

let array = [1,2,3,4,5,6];
array.fill('hello',2,3);
console.log(array); //[1, 2, "hello", 4, 5, 6]第二个参数是一个数的时候代表填充未知的下标，两个数代表范围左闭右开；

Array.prototype.copyWithin(target [, start = 0[, end = arr.length]])
// start和end可以是负数，-1就表示倒数第一个数。
 let array = [1,2,3,4,5,6];
 array.copyWithin(0,3);
 console.log(array); //[4, 5, 6, 4, 5, 6]

 // 2.3 返回遍历器的方法
// ES6提供了entries()\keys()\values()三个方法用来遍历数组，它们都返回一个遍历器对象，可以使用for...of循环进行遍历
// es5
let arr = [1,2,3,4,5,6];
for(let index of arr.keys()){
    console.log(index);
}// =>0 1 2 3 4 5

for(let value of arr.values()){
    console.log(value)
} // 1 2 3 4 5 6 chrome5.7目前不支持该方法

for(let entry of arr.entries()){
    console.log(entry);
} // [0,1] [1,2] [2,3] [3,4] [4,5] [5,6]

// es6----------------------
let entries = arr.entries();
console.log(entries.next()); //{value: [0,1], done: false}
console.log(entries.next().value); // [1,2]
