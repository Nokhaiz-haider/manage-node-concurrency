// Simulate a task that takes a random amount of time to complete (up to 200ms)
const doTask = (taskName) => {
  const begin = Date.now();
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const end = Date.now();
      const timeSpent = end - begin + "ms";
      console.log(`[TASK] FINISHED: ${taskName} in ${timeSpent}`);
      resolve(true);
    }, Math.random() * 200);
  });
};

// Main function to manage concurrency using a promise pool
async function manageConcurrency(taskList, maxConcurrency) {
  let taskIndex = 0; // Index to track which task to execute
  const totalTasks = taskList.length;

  // Worker function that runs tasks while there are tasks remaining
  const worker = async () => {
    while (taskIndex < totalTasks) {
      const task = taskList[taskIndex];
      taskIndex++;

      console.log(
        `[TASK] STARTING: ${task} (Task ${taskIndex} of ${totalTasks})`
      );

      await doTask(task);
      console.log(`[EXE] Task count: ${taskIndex} of ${totalTasks}`);
    }
  };

  const workers = Array.from({ length: maxConcurrency }, worker);

  // Execute the worker pool and wait for all tasks to complete
  await Promise.all(workers);
}

// Function to set concurrency based on time (9am-5pm = 10 tasks, otherwise 150)
function getCurrentConcurrency() {
  const currentHour = new Date().getHours();
  if (currentHour >= 9 && currentHour < 17) {
    return 10;
  } else {
    return 150;
  }
}

// Initialization function
async function init() {
  let concurrencyMax = getCurrentConcurrency();
  let numberOfTasks = 20;
  const taskList = [...Array(numberOfTasks)].map(() =>
    [...Array(~~(Math.random() * 10 + 3))]
      .map(() => String.fromCharCode(Math.random() * (123 - 97) + 97))
      .join("")
  );
  console.log("[init] Concurrency Algo Testing...");
  console.log("[init] Tasks to process: ", taskList.length);
  console.log("[init] Task list: " + taskList);
  console.log("[init] Maximum Concurrency: ", concurrencyMax, "\n");

  console.log(`Starting with concurrency level: ${concurrencyMax}`);

  await manageConcurrency(taskList, concurrencyMax);

  console.log("All tasks completed.");
}

init();
