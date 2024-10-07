# NodeJS Coding Problem

## Task Explaination

I chose the **promise pool** approach because it efficiently manages concurrency while maintaining a clear structure for handling asynchronous tasks. In this method, we use a pool of worker functions that concurrently process the task list, ensuring that no more than the specified maximum number of tasks are running at any given time. By avoiding recursion and using a `while` loop within the worker functions, we reduce the risk of excessive memory usage and improve the overall performance, especially when handling a large number of tasks. This approach also ensures that tasks are processed continuously, as workers pick up new tasks as soon as others finish, maintaining the required concurrency level.

## Alternative Methods

Below are Alternative picks but I have mentioned the reason for not picking them up:

- ## Recursive Calls:

  One alternative method I considered was using recursive function calls to manage concurrency. However, I rejected this because recursion can lead to higher memory usage, especially with large task lists, and make the code harder to debug and maintain.

- ## Batching Tasks:

  Another approach involved processing tasks in batches, where all tasks in a batch are resolved before starting the next. This method doesn't fulfill the requirement of maintaining a constant concurrency level, as it waits for all tasks in a batch to finish before starting the next set, leading to inefficiencies in processing time. The promise pool approach balances concurrency and simplicity, making it both performant and easy to manage.

- ## Using External Libraries:
  Tools like async or p-limit provide ready-to-use solutions for controlling concurrency. However, these were not allowed for this task.
