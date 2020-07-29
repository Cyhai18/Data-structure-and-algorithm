/**
 * 原理：相邻的元素两两比较，当一个元素大于右侧的相邻元素时，则交换位置，否则位置不变；一轮下来数组的最大值就到了最右侧，有序区域就多了一个元素。
 * 冒泡排序是一种稳定排序，值相等的元素并不会打乱原本的顺序。算法每一轮都要遍历所有的元素，总共遍历（元素数量 - 1）轮，所以平均时间复杂度为 O(n^2)
 * @param arr 要排序的数组
 */
function bubbleSort (arr) {
  // 外部循环控制所有的回合，内部循环实现每一轮的冒泡处理
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      var temp = arr[j]
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j + 1]
        arr[j + 1] = temp 
      }
    }
  }
  return arr
}

/**
 * 优化1：如果经过前几轮的排序后，整个数列已经是有序的了，可以做出标记，剩下的几轮排序就不必执行了，提前结束
 * @param arr 要排序的数组
 */
function bubbleSort1 (arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    var isSorted = true
    for (var j = 0; j < arr.length - 1 - i; j++) {
      var temp = arr[j]
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        isSorted = false
      }
    }
    if (isSorted) {
      break
    }
  }
  return arr
}

/**
 * 优化2：如果数列后面的许多元素已经是有序的了，每一轮还比较的话就太浪费了，解决这个问题的关键点在于对数列有序区的界定，
 * 按照现有的逻辑，有序区的长度和排序的轮数是相等的，第一轮排序过后的有序区长度为1...，实际上数列真正的有序区可能大于这个长度，
 * 所以可以在每轮排序后，记录下来最后一次元素交换的位置，该位置就是无序数列的边界，再往后就是有序区了
 * @param arr 要排序的数组
 */
function bubbleSort2 (arr) {
  var lastExchangeIndex = 0
  var sortBorder = arr.length - 1
  for (var i = 0; i < arr.length - 1; i++) {
    var isSorted = true
    for (var j = 0; j < sortBorder; j++) {
      var temp = arr[j]
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        isSorted = false
        lastExchangeIndex = j
      }
    }
    sortBorder = lastExchangeIndex
    if (isSorted) {
      break
    }
  }
  return arr
}

/**
 * 优化3：鸡尾酒排序，外层的大循环控制所有排序的回合，里层包含两个小循环，第一个小循环从左到右比较并交换元素，第二个小循环从右到左比较并交换元素；
 * 鸡尾酒排序的优点是在特定的条件下，可以减少排序的回合数；针对大部分元素已经有序的场景可以发挥出优势
 * @param arr 要排序的数组
 */
function bubbleSort3 (arr) {
  var temp = 0
  for (var i = 0; i < arr.length / 2; i++) {
    // 有序标记，每一轮的初始值都是 true
    var isSorted = true
    // 奇数轮，从左向右比较并交换
    for (var j = i; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        isSorted = false
      }
    }
    if (isSorted) {
      break
    }

    isSorted = true
    // 偶数轮，从右向左比较并交换
    for (var j = arr.length - 1 - i; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        temp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = temp
        isSorted = false
      }
    }
    if (isSorted) {
      break
    }
  }
  return arr
}


var arr = [7, 2, 4, 9, 3, 5, 8, 15]

console.log(bubbleSort3(arr))

