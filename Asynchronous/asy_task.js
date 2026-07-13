function taskOne() {
    console.log('Task 1 started');
    setTimeout(() => {
        console.log('Task 1 completed');
    }, 10000); // Non-blocking delay of 2 seconds
}

function taskTwo() {
    console.log('Task 2 started');
    console.log('Task 2 completed');
}

taskOne();
taskTwo();
