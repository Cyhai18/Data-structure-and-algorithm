/**
 * 原理：每一轮都挑选一个基准元素（默认是首位），比它大的移动到数列一边，比它小的移动到数列的另一边，从而把数列拆解成两个部分；继续此过程，直到不能拆分为止。
 * 具体实现：双边循环法：先指定基准元素 pivot，并且设置两个指针 left 和 right，指向数列最左和最右的两个元素。每轮循环时，从 right 指针开始，指针所指元素和 pivot 比较，大于或等于 pivot
 * 则指针左移，直到小于 pivot 才停止移动；切换到 left 指针同理，left 指针所指元素如果小于或等于 pivot，则指针右移，直到大于 pivot 才停止移动；接着让 left 和 right 指针所指向的元素进行交换。
 * 重复以上过程，直到 left 和 right 指针重合，最后把 pivot 元素 和 指针重合所指向的元素交换，这一轮宣告结束
 * @param arr 要排序的数组
 * @param left 左指针
 * @param right 右指针
 */
function quickSort (arr, left, right) {
  // 递归结束条件
  if (left >= right) return
  // 得到交换过后基准元素位置，同时完成元素交换，小于基准值的元素在前面，大于的在后面
  var pivotIndex = partition(arr, left, right)
  quickSort(arr, left, pivotIndex - 1)
  quickSort(arr, pivotIndex + 1, right)
  
  return arr
}

function partition (arr, left, right) {
  // 默认取首位作为基准元素
  var pivot = arr[left]
  var startIndex = left
  
  while (left != right) {
    // 控制 right 指针比较并左移
    while (left < right && arr[right] > pivot) {
      right--
    }
    // 控制 left 指针比较并右移
    while (left < right && arr[left] <= pivot) {
      left++
    }
    // 交换 left 和 right 指针所指向的元素
    if (left < right) {
      var temp = arr[left]
      arr[left] = arr[right]
      arr[right] = temp
    }
  }

  // 左右指针重合，所指向的元素和基准元素交换
  arr[startIndex] = arr[left]
  arr[left] = pivot

  return left
}

var arr = [7, 2, 4, 9, 3, 5, 8, 15]

console.log(quickSort(arr, 0, arr.length -1))