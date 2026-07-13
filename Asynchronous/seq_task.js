function taskOne() {
    console.log('Task 1 started');
    // Simulating a task that takes 2 seconds
    let start = Date.now();
    while (Date.now() - start < 100000) {
        // Busy-wait to simulate a blocking task
    }
    console.log('Task 1 completed');
}

function taskTwo() {
    console.log('Task 2 started');
    console.log('Task 2 completed');
}

taskOne();
taskTwo();
