/**
 * 二叉推：本质上是一种完全二叉树，分为最大堆（任何一个父节点的值都大于或等于它左右孩子节点的值）、最小堆（任何一个父节点的值都小于或等于它左右孩子节点的值）
 * 
 * 二叉堆的操作：
 * 1、插入节点：插入位置是完全二叉树的最后一个位置，以最小堆为例，若插入的新节点比它的父节点小，则需要让新节点上浮，和父节点交换位置，以此类推，直到符合最小堆的要求
 * 2、删除节点：删除的是处于堆顶的节点，此时为了继续维持完全二叉树的结构，把最后一个节点临时补到原来堆顶的位置，然后进来堆的自我调整，让堆顶节点和它的左右孩子进行比较，
 * 左右孩子最小的那个如果比堆顶节点小的话，让堆顶节点下沉，以此类推
 * 3、构建二叉堆：也就是把一个无序的完全二叉树调整为二叉堆，从最后一个非叶子节点开始，如果该节点大于它左右孩子节点中最小的一个，则该节点下沉，下沉到底后，再到倒数第二个非叶子节点，以此类推。
 * 
 * 用数组来存储二叉堆，规律：假设父节点的下标是：parent，则它的左孩子下标就是：2 * parent + 1，右孩子下标是：2 * parent + 2
 */

/**
 * 如何确定最后一个非叶子节点的序号：
 * n 为数组的长度，最后一个非叶子节点（序号为 i）若只有左孩子，则序号为 n - 1，有 n - 1 = 2 * i + 1，得到 i = n / 2 - 1；
 * 若有左右两个孩子，有 n - 2 = 2 * i + 1，得到 i = (n - 1) / 2 - 1
 * i，n 都为整数，由此可见，两者的差别在于 n 的奇偶
 */

/**
 * 上浮调整
 * @param {*} arr 待调整的堆 
 */
 function upAdjust (arr) {
  var childIndex = arr.length - 1
  var parentIndex = arr.length % 2 === 0 ? (childIndex - 1) / 2 : (childIndex - 2) / 2
  var temp = arr[childIndex]

  while (childIndex > 0 && temp < arr[parentIndex]) {
    arr[childIndex] = arr[parentIndex]
    // 重新计算下一轮的孩子节点位置
    childIndex = parentIndex
    parentIndex = (childIndex - 1) / 2
    arr[childIndex] = temp
  }

  return arr
 }

 /**
  * 下沉调整
  * @param {*} arr 待调整的堆
  * @param {*} parentIndex 要下沉的父节点
  * @param {*} length 堆的有效大小
  */
 function downAdjust (arr, parentIndex, length) {
  var temp = arr[parentIndex]
  var childIndex = 2 * parentIndex + 1
  while (childIndex < length) {
    // 如果有右孩子，且右孩子小于左孩子的值，则定位到右孩子
    if (childIndex + 1 < length && arr[childIndex + 1] < arr[childIndex]) {
      childIndex++
    }
    // 如果父节点小于任何一个孩子的值，则直接跳出
    if (temp <= arr[childIndex]) {
      break
    }
    arr[parentIndex] = arr[childIndex]
    parentIndex = childIndex
    childIndex = 2 * childIndex + 1
  }
  arr[parentIndex] = temp
  return arr
}

/**
 * 构建最小堆
 * @param {*} arr 待调整的堆
 */
function buildHeap (arr) {
  // 得到最后一个非叶子节点的位置
  var index = arr.length % 2 === 0 ? (arr.length - 1 - 1) / 2 : (arr.length - 1 - 2) / 2
  // 从最后一个非叶子节点开始，依次做下沉调整
  for (var i = index; i >= 0; i--) {
    downAdjust(arr, i, arr.length)
  }
  return arr
}

 /**
  * 推排序
  * 原理：根据最大（小）堆的堆顶是整个堆中的最大（小）元素
  * 步骤：1、把无序数组构建成二叉堆
  * 2、循环删除堆顶元素，替换到二叉堆的末尾，即堆顶元素和末尾元素互换位置，然后调整堆产生新的堆顶
  * 
  * @param {*} arr 待排序的数组
  */
 function heapSort (arr) {
  buildHeap(arr)
   for (var i = arr.length - 1; i > 0; i--) {
     var temp = arr[i]
     arr[i] = arr[0]
     arr[0] = temp
     // i：除去已替换好的末尾元素，代表最新的要调整的堆的长度
     downAdjust(arr, 0, i)
   }
   return arr
 }


