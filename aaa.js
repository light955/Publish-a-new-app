function createCounter() {
    let count = 0; // 初期値
  
    return function() {
      const currentCount = count; // 以前のカウントを別の変数に保存
      count++; // カウントを増やす
      return currentCount; // 以前のカウントを返す
    };
  }
  
  const counter = createCounter();
  
  console.log(counter()); // 1
  console.log(counter()); // 2
  console.log(counter()); // 3
  console.log(counter()); // 1
  console.log(counter()); // 1
  console.log(counter()); // 1

  