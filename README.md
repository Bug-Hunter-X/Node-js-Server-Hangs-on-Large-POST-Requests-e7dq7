# Node.js Server Hanging on Large POST Requests

This repository demonstrates a common issue in Node.js servers where they hang or crash when processing large POST requests.  The problem arises from the lack of proper handling of incoming request data, specifically the `data` event emitted by the `http.IncomingMessage` object.

The `bug.js` file contains the buggy code, which fails to account for large requests that might trigger the `data` event multiple times. This can lead to excessive memory usage and ultimately cause the server to freeze or crash.

The `bugSolution.js` file provides a solution to address this. It introduces a limit on the maximum request body size to prevent the server from being overwhelmed by large requests. Additionally, it includes proper error handling mechanisms to manage various scenarios gracefully.

## How to Reproduce

1. Clone the repository.
2. Run `node bug.js`.
3. Send a large POST request to `http://localhost:3000` using a tool like `curl` or Postman.

## Solution

The solution involves two key improvements:

* **Body Size Limit:** Implementing a limit on the maximum allowed request body size prevents the server from being overloaded by excessively large requests.
* **Error Handling:**  The improved code provides error handling mechanisms to gracefully manage situations like invalid JSON in the request body or request size exceeding the limit.