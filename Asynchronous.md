# JavaScript Asynchronous Patterns - Code Examples & Analysis

## Overview
This document analyzes various JavaScript code examples demonstrating different asynchronous patterns, from callback hell to modern async/await and Promise-based solutions.

---

## 1. Callback Hell (`callback_hell.js`)

### Code Example
```javascript
// Nested callbacks (Callback Hell 😵)
getUser(function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      console.log("Final Comments:", comments);
    });
  });
});
```

### Analysis
**What's happening:** Three asynchronous functions are nested within each other. Each depends on the result of the previous one.

**Problems:**
- **Deep Nesting:** Code becomes a "pyramid of doom"
- **Error Handling:** No unified error handling mechanism
- **Readability:** Hard to follow the flow of execution
- **Maintainability:** Difficult to refactor or add new steps

---

## 2. Promise Chaining (`promise_callhell_sol.js`)

### Code Example
```javascript
// 2) Promise chaining with resolve/reject + catch
getUser()
  .then((user) => getPosts(user.id))
  .then((posts) => getComments(posts[0].id))
  .then((comments) => {
    console.log("Final Comments:", comments);
  })
  .catch((err) => {
    console.error("Error caught:", err);
  })
  .finally(() => {
    console.log("Process finished.");
  });
```

### Analysis
**What's happening:** Each function returns a Promise. The `.then()` chain flattens the structure.

**Benefits over Callback Hell:**
- **Flattened Structure:** No deep nesting
- **Error Handling:** Single `.catch()` for all errors
- **Clean Cleanup:** `.finally()` for code that must run regardless
- **Better Readability:** Sequential steps are clear

---

## 3. Async/Await Solution (`promise_with_async.js`)

### Code Example
```javascript
// ✅ Async function to handle sequence
async function showUserComments() {
  try {
    const user = await getUser();         // waits until user is fetched
    const posts = await getPosts(user.id); // waits until posts are fetched
    const comments = await getComments(posts[0].id); // waits for comments

    console.log("Final Comments:", comments);
  } catch (error) {
    console.error("Error caught:", error);
  } finally {
    console.log("Process finished.");
  }
}
```

### Analysis
**What's happening:** The `async` keyword makes the function return a Promise. `await` pauses execution until the Promise resolves.

**Benefits:**
- **Synchronous Look & Feel:** Code reads like synchronous code
- **Simplicity:** No `.then()` chaining needed
- **Error Handling:** Traditional `try/catch/finally` blocks
- **Debugging:** Easier stack traces and debugging

---

## 4. Promise.race() for Timeouts (`promise_race.js`)

### Code Example
```javascript
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject("❌ Request timed out"), ms);
  });
}

// Race: whichever finishes first wins
Promise.race([getUser(), timeout(1500)])
  .then((user) => {
    console.log("Winner:", user);
  })
  .catch((err) => {
    console.error("Error caught:", err);
  });
```

### Analysis
**What's happening:** Two Promises "race" against each other. The first to settle (resolve or reject) determines the outcome.

**Use Cases:**
- **Timeouts:** Prevent operations from running too long
- **Multiple APIs:** Use the fastest response from multiple sources
- **Fallback Logic:** Try a primary source, fall back to a backup

**Key Insight:** `Promise.race()` resolves or rejects with the **first** settled Promise, not the first resolved one.

---

## 5. Sequential vs. Parallel Execution (`promise_parallel.js`)

### Sequential Execution
```javascript
async function sequentialDemo() {
  console.time("Sequential Time");

  const result1 = await task1();  // waits 2s
  const result2 = await task2();  // waits another 3s

  console.log("Sequential Results:", result1, result2);
  console.timeEnd("Sequential Time");
}
```
**Total Time:** ~5 seconds (2s + 3s)

### Parallel Execution
```javascript
async function parallelDemo() {
  console.time("Parallel Time");

  const p1 = task1();   // start task1
  const p2 = task2();   // start task2
  const results = await Promise.all([p1, p2]); // wait for both together

  console.log("Parallel Results:", results);
  console.timeEnd("Parallel Time");
}
```
**Total Time:** ~3 seconds (max of 2s and 3s)

### Analysis
- **Sequential:** Good for dependent tasks (need result of task1 for task2)
- **Parallel:** Good for independent tasks (don't depend on each other)
- **Promise.all():** Waits for ALL promises to resolve; rejects if ANY rejects

---

## 6. Blocking vs. Non-Blocking Code

### Synchronous (Blocking) Code (`seq_task.js`)
```javascript
function taskOne() {
    console.log('Task 1 started');
    // Simulating a blocking task
    let start = Date.now();
    while (Date.now() - start < 100000) {
        // Busy-wait to simulate a blocking task
    }
    console.log('Task 1 completed');
}

taskOne();
taskTwo();
```
**Output:**
```
Task 1 started
Task 1 completed
Task 2 started
Task 2 completed
```

**Why it blocks:** The `while` loop occupies the single JavaScript thread, preventing `taskTwo()` from starting until `taskOne()` completes.

### Asynchronous (Non-Blocking) Code (`asy_task.js`)
```javascript
function taskOne() {
    console.log('Task 1 started');
    setTimeout(() => {
        console.log('Task 1 completed');
    }, 10000);
}

taskOne();
taskTwo();
```
**Output:**
```
Task 1 started
Task 2 started
Task 2 completed
Task 1 completed
```

**Why it doesn't block:** `setTimeout()` schedules the callback to run later. The JavaScript thread is freed to continue executing other code.

---

## Key Takeaways

### Evolution of Async Patterns
1. **Callbacks** → Basic but leads to "callback hell"
2. **Promises** → Flatten the structure with `.then()` chains
3. **Async/Await** → Cleanest syntax; looks synchronous

### Choosing Execution Strategy
| Pattern | When to Use |
|---------|-------------|
| **Sequential** | Tasks depend on each other's results |
| **Parallel** | Tasks are independent and can run simultaneously |
| **Race** | Need fastest result or want to implement timeouts |

### Important Promise Methods
| Method | Description |
|--------|-------------|
| `Promise.all()` | Resolves when ALL promises resolve; rejects if ANY rejects |
| `Promise.race()` | Settles (resolves or rejects) with the FIRST promise to settle |
| `Promise.allSettled()` | Resolves when ALL promises have settled (resolved or rejected) |

### Key Insight
JavaScript is **single-threaded**. Asynchronous operations don't run in parallel; they're scheduled and managed by the **event loop**. "Parallel" in JavaScript means "not waiting for each other to complete," not "running on different CPU cores simultaneously."
