/*
 * moduleName: 
 * description: 排序算法
 * version: 
 * author: xuchao
 */

function bubbleSort(arr) {
    if (arr.length === 1) return arr;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
              const t = arr[j];

              arr[j + 1] = arr[j];
              arr[j] = t;
            }
        }
    }

    return arr;
}

function bubbleSort(arr) {
    if (arr.length === 1) return arr;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
              const t = arr[i];

              arr[i] = arr[j];
              arr[j] = t;
            }
        }
    }

    return arr;
}

function selectionSort(arr) {
    if (arr.length === 1) return arr;

    let minIndex;
    let t;

    for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        t = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = t;
    }

    return arr;
}

function insertSort(arr) {
    if (arr.length === 1) return arr;

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j > 0; j--) {
            if (arr[i] > arr[j - 1]) {
                const t = arr[j - 1];

                arr[j - 1] = arr[j];
                arr[j] = t;
            }
        }
    }
}