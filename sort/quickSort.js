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
  var pivotIndex = partition2(arr, left, right)
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

/**
 * 单边循环法实现 partition：选定一个基准值 pivot (默认是首位)，再设定一个 mark 指针指向数列起始位置，这个 mark 指针代表小于基准值的区域边界，
 * 从基准值的下一个元素开始遍历数组，如果元素大于基准值，继续遍历下一个；如果元素小于基准值，则 mark 指针右移一位，因为小于 pivot 的区域边界增加了一位，
 * 同时遍历到的元素和 mark 指针指向的元素交换位置，因为新遍历的元素归属于小于 pivot 的区域，最后把 mark 指针最后所在的位置指向的元素和 pivot 交换，结束
 */
function partition2 (arr, left, right) {
  var mark = left
  var pivot = arr[left]
  for (var i = left + 1; i <= right; i++) {
    if (arr[i] < pivot) {
      mark++
      var temp = arr[i]
      arr[i] = arr[mark]
      arr[mark] = temp
    }
  }
  arr[left] = arr[mark]
  arr[mark] = pivot
  return mark
}

/**
 * 非递归方式实现：绝大多数的递归逻辑，都可以用栈的方式来代替
 * 代码中一层一层的方法调用，本身就使用了一个方法调用栈。每次进入一个新方法，就相当于入栈；每次有方法返回，就相当于出栈。
 * 所以，可以把原本的递归实现转化成一个栈的实现，在栈中存储每一次方法调用的参数。
 */
function quickSort2 (arr, left, right) {
  // 创建一个栈
  var stack = []
  // 入栈的参数
  var obj = {'left': left, 'right': right}
  stack.push(obj)

  while (stack.length) {
    // 栈顶元素出栈，得到起始下标
    var param = stack.pop()
    // 得到基准元素位置
    var pivotIndex = partition2(arr, param.left, param.right)

    if (param.left < pivotIndex - 1) {
      var leftParam = {'left': param.left, 'right': pivotIndex - 1}
      stack.push(leftParam)
    }

    if (pivotIndex + 1 < param.right) {
      var rightParam = {'left': pivotIndex + 1, 'right': param.right}
      stack.push(rightParam)
    }
  }
  return arr
}

var arr = [7, 2, 4, 9, 3, 5, 8, 15]

console.log(quickSort2(arr, 0, arr.length -1))