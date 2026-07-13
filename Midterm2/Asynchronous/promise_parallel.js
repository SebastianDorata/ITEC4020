// Simulated async tasks
function task1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✅ Task 1 finished");
      resolve("Result 1");
    }, 2000); // takes 2 seconds
  });
}

function task2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✅ Task 2 finished");
      resolve("Result 2");
    }, 3000); // takes 3 seconds
  });
}

// Sequential execution
async function sequentialDemo() {
  console.time("Sequential Time");

  const result1 = await task1();  // waits 2s
  const result2 = await task2();  // waits another 3s

  console.log("Sequential Results:", result1, result2);
  console.timeEnd("Sequential Time");
}

// Parallel execution
async function parallelDemo() {
  console.time("Parallel Time");

  const p1 = task1();   // start task1
  const p2 = task2();   // start task2
  const results = await Promise.all([p1, p2]); // wait for both together

  console.log("Parallel Results:", results);
  console.timeEnd("Parallel Time");
}

// Run demos
sequentialDemo().then(() => parallelDemo());
