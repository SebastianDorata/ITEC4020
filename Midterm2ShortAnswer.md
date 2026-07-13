
# Midterm 2 Practice Questions & Solutions

## Short Answer Questions

### 1. Promise States

**Question:** A Promise in JavaScript has three states. What are they, and what does each state represent?

**Solution:**
1.  **Pending:** The initial state; the asynchronous operation is still in progress, and the result is not yet available.
2.  **Fulfilled (or Resolved):** The asynchronous operation has completed successfully, and the Promise now has a resulting value.
3.  **Rejected:** The asynchronous operation has failed, and the Promise now has a reason for the failure (an error).

---

### 2. Promise.race() & Real-World Scenario

**Question:** What is the purpose of `Promise.race()`? Describe a real-world scenario where you would use it.

**Solution:** `Promise.race()` takes an iterable of Promises and returns a single Promise that resolves or rejects as soon as **one** of the input Promises settles (either resolves or rejects). Its value is the value of the first settled Promise.

**Real-world scenario:** It is commonly used to implement a **timeout**. You can race a long-running operation against a timer Promise that rejects after a set amount of time. If the operation takes too long, the timeout wins, preventing the user from waiting indefinitely.

---

### 3. Implementing Timeout with Promise.race()

**Question:** How can you design a timeout for an asynchronous operation using `Promise.race()`? Provide a code snippet.

**Solution:** You create a Promise that rejects after a specific duration using `setTimeout`. Then, you `race` this timeout Promise against your main operation Promise.

```javascript
function withTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]);
}

// Usage
const slowOperation = new Promise(resolve => setTimeout(resolve, 5000));
withTimeout(slowOperation, 1000)
  .then(result => console.log('Operation completed:', result))
  .catch(error => console.error('Error:', error.message)); // Outputs: 'Error: Operation timed out after 1000ms'
```

---

### 4. Polling vs. Server Push

**Question:** In the context of web communication, what is the difference between "polling" and "server push"?

**Solution:**
- **Client Pull / Polling:** The client (e.g., a browser) repeatedly asks the server for new data at fixed intervals (e.g., every 2 seconds). The server always responds, even if there is no new data.
- **Server Push:** The server proactively sends data to the client as soon as it becomes available, without waiting for an explicit request from the client. The client simply opens a connection and listens for updates.

---

### 5. Drawbacks of HTTP Polling

**Question:** What are the key drawbacks of using traditional HTTP polling for real-time features?

**Solution:**
- **Wasted Requests:** Most requests return no new data, wasting bandwidth and server resources.
- **Higher Latency:** There is a built-in delay between updates, which can only be as fast as the polling interval.
- **Server Load:** Constant connections from many users can put a significant strain on the server.
- **Battery Drain:** On mobile devices, frequent network calls consume battery power.
- **Bandwidth Overhead:** Full HTTP headers are sent on every single request.

---

### 6. Client-Side Polling Code

**Question:** Write the client-side JavaScript code to continuously poll a server endpoint (`/api/status`) every 3 seconds. The server responds with a JSON object.

**Solution:**
```javascript
async function poll() {
  try {
    const response = await fetch('http://localhost:3000/api/status');
    const data = await response.json();
    console.log('Server status:', data);
    render(data); // Assume this updates the UI
  } catch (error) {
    console.error('Polling error:', error);
  } finally {
    // Schedule the next poll, regardless of success or failure
    setTimeout(poll, 3000);
  }
}

poll(); // Start the polling loop
```

**Note:** Using `setTimeout` in the `finally` block ensures the next request only starts after the current one completes, preventing request stacking.

---

### 7. Long Polling vs. Traditional Polling

**Question:** Explain the concept of "long polling". How does it differ from traditional polling, and what problem does it solve?

**Solution:** Long polling is a technique where the client sends a request to the server, and the server holds the request open. It doesn't respond immediately. The server only sends a response when new data is available or a timeout is reached. Once the client receives the response, it immediately sends a new request.

**Difference:** Unlike traditional polling, where the server responds immediately every time, long polling allows the server to delay its response until there is actual data to send.

**Problem Solved:** It reduces the number of empty, useless responses, effectively providing a near-real-time push experience over standard HTTP.

---

### 8. WebSockets vs. SSE for Chat Applications

**Question:** You are building a real-time chat application. Why are WebSockets generally a better choice than Server-Sent Events (SSE) for this specific use case?

**Solution:** WebSockets are **full-duplex**, meaning both the client and server can send messages to each other at any time over the same persistent connection. This is essential for a chat application where users need to both send and receive messages frequently. SSE is **unidirectional** (server-to-client only). If using SSE for a chat app, you would need to use a separate HTTP request for the client to send a message, which is less efficient and negates the benefit of a single, persistent channel.

---

### 9. Evolution of Server Communication (Polling to Streaming)

**Question:** Describe the evolution from a basic HTTP server to an event-driven, real-time streaming architecture.

**Solution:**
1.  **Basic HTTP Server (Request-Response):** A simple server that processes a request and immediately returns a response. This is suitable for static files or simple APIs.
2.  **Polling:** The client continuously sends requests to the server on a timer to check for updates.
3.  **Long Polling:** The server holds the client's request open until new data is available, returning the response then. The client immediately reconnects.
4.  **Server-Sent Events (SSE):** The server establishes a single, persistent HTTP connection to stream one-way updates from the server to the client. This is more efficient than polling.
5.  **WebSockets:** The client and server perform an HTTP handshake to upgrade the connection to a persistent, full-duplex, low-latency protocol. This is the most efficient and is used for highly interactive, two-way applications.

---

### 10. Building a Simple Polling Server

**Question:** Write a simple server using Express that can be used for polling by a client. The server should maintain a simple data value and expose an endpoint `/price` that returns the current price.

**Solution:**
```javascript
// server.js - a plain HTTP endpoint using Express
const express = require('express');
const app = express();
const PORT = 3000;

let price = {
  symbol: "XYZ",
  value: 100,
  ts: Date.now()
};

// The client will hit this endpoint repeatedly
app.get('/price', (req, res) => {
  res.json(price);
});

app.listen(PORT, () => {
  console.log(`Polling API running on http://localhost:${PORT}`);
});
```

This server is simple and stateless. It has no idea it's being polled. The "real-time" logic lives on the client, which will request this data on a timer.

```java
// Client-side polling
async function pollPrice() {
  try {
    const res = await fetch('http://localhost:3000/price');
    const data = await res.json();
    console.log('Current price:', data);
    // Update the UI with the new data
  } catch (error) {
    console.error('Polling error:', error);
  } finally {
    setTimeout(pollPrice, 2000); // Poll again in 2 seconds
  }
}

pollPrice();
```

---

### Bonus: Comparing HTTP vs WebSocket

**Question:** Compare HTTP and WebSocket protocols based on their duplex nature, connection model, and per-message size.

**Solution:**

| Criteria | HTTP | WebSocket |
| :--- | :--- | :--- |
| **Duplex** | Half-duplex (one way at a time) | Full-duplex (both ways at once) |
| **Connection** | Closes after each request/response | Stays open until a side disconnects |
| **Model** | Request → Response | Both emit & listen on `.on` events |
| **Per-message size** | Headers = 1000s of bytes | Frames = 2 bytes |
| **Setup vs transfer** | ~150 ms new TCP per message | ~50 ms message transmission |
| **Polling overhead** | Constantly checks for new data | Sends only when there is data |
```