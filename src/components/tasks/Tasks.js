import React, { useState, useRef, useEffect, useCallback } from "react";

export default function Tasks({ index, removeTask }) {
  console.log("Tasks component re-rendered");

  const [editedTaskList, setEditedTaskList] = useState([]); // Holds the tasks and currently edited tasks
  const newTaskRef = useRef(null); // Reference for new task input focusing
  const taskRefs = useRef([]); // Reference for handling click events

  const addTask = () => {
    // Create empty task obj & append to task list, add empty inputs to prev lists
    const newTask = {
      taskName: "",
      taskDesc: "",
      collapsed: false,
      checked: false,
      previousTaskName: null,
      previousTaskDescription: null,
    };
    // Add the task to the end of the task list
    setEditedTaskList([newTask, ...editedTaskList]);

    // Focus the input box of the new task
    setTimeout(() => {
      if (newTaskRef.current) {
        newTaskRef.current.focus();
      }
    }, 100);
  };

  // Handle changing of field in task object @ index = idx
  const changeTask = (e, idx, field) => {
    const updatedTasks = editedTaskList.map((task, i) =>
      i === idx ? { ...task, [field]: e.target.value } : task
    );
    setEditedTaskList(updatedTasks);
  };

  // Filter from task lists inside callback dependent on state changes
  const handleDeleteClick = useCallback(
    (idx) => {
      const updatedTasks = editedTaskList.filter((_, i) => i !== idx);
      setEditedTaskList(updatedTasks);
    },
    [editedTaskList]
  );

  const trashCan = () => {
    console.log("Current tasks:", editedTaskList);
    const newEditedTaskList = editedTaskList.filter((task) => !task.checked);

    console.log("Filtered tasks:", newEditedTaskList);
    setEditedTaskList(newEditedTaskList);
  };

  // Flip the polarity of the checkbox
  const handleCheckboxChange = (idx) => {
    setEditedTaskList((prevTasks) =>
      prevTasks.map((task, i) =>
        i === idx ? { ...task, checked: !task.checked } : task
      )
    );
  };

  // Handle cancel button & click events dependent upon changes in state
  const cancelTask = useCallback(
    (idx, outsideClickFlag) => {
      const prevTaskName = editedTaskList[idx]?.previousTaskName || "";
      const prevTaskDesc = editedTaskList[idx]?.previousTaskDescription || "";

      // If the task hasn't been saved immediately delete
      if (!prevTaskName) {
        handleDeleteClick(idx);
        return;
      } else if (outsideClickFlag) {
        // If we are handling a click event

        // Check if there have been any modifications
        if (
          prevTaskName !== editedTaskList[idx].taskName ||
          prevTaskDesc !== editedTaskList[idx].taskDesc
        ) {
          const userConfirmed = window.confirm(
            "You have unsaved changes. Do you want to discard them?"
          );

          console.log(prevTaskName);
          console.log(editedTaskList[idx].taskName);

          if (!userConfirmed) {
            return; // Exit the function if the user does not want to discard changes
          }
        }
      }

      const updatedTasks = editedTaskList.map((task, i) =>
        i === idx
          ? {
              ...task,
              taskName: prevTaskName,
              taskDesc: prevTaskDesc,
              collapsed: true,
            }
          : task
      );
      setEditedTaskList(updatedTasks);
    },
    [handleDeleteClick, editedTaskList]
  );

  // Set collapsed to false and rerender
  const expandTask = (idx) => {
    const updatedTasks = editedTaskList.map((task, i) =>
      i === idx ? { ...task, collapsed: false } : task
    );
    setEditedTaskList(updatedTasks);
  };

  // Save by updating state/data structures
  const handleSaveClick = (idx) => {
    const task = editedTaskList[idx];
    if (!task.taskName) {
      alert("Task name cannot be empty.");
      return;
    }
    const updatedTasks = editedTaskList.map((task, i) =>
      i === idx
        ? {
            ...task,
            collapsed: true,
            previousTaskDescription: task.taskDesc,
            previousTaskName: task.taskName,
          }
        : task
    );

    setEditedTaskList(updatedTasks);
  };

  // Handle click events outside opened task
  const handleClickOutside = useCallback(
    (event, currentEditedTaskList) => {
      // Find the open task currently being modified
      let index;
      currentEditedTaskList.forEach((task, idx) => {
        if (!task.collapsed) index = idx;
      });

      taskRefs.current.forEach((taskRef, idx) => {
        // We are clicking outside the selected task
        if (taskRef && !taskRef.contains(event.target) && idx === index) {
          console.log(`Clicked outside of task ${idx}`);

          // Handle task cancelation and deletion
          cancelTask(index, true);
        }
      });
    },
    [cancelTask]
  );

  useEffect(() => {
    const handler = (event) => handleClickOutside(event, editedTaskList);
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [editedTaskList, handleClickOutside]);

  return (
    <div className="flex-grow w-80 mt-1">
      <div>
        {/*Delete all button*/}
        <div className="w-full flex justify-end p-2 pr-4">
          <button onClick={trashCan}>
            <svg
              className="h-6 w-6 text-white-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
        {/*Currently selected task*/}
        <div className="w-full flex items-center justify-center font-extrabold text-white">
          ~Project/Pomograph
        </div>
        {/*Add task button*/}
        <div
          className="flex items-center justify-center h-10 mt-4 rounded-md opacity-50 outline-dashed outline-2 shadow-md w-full bg-white cursor-pointer mb-5"
          onClick={addTask}
        >
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        {/*Map each item in task list to div on viewport*/}
        {editedTaskList.map((task, idx) => (
          /*Outermost encapsulating div w/ reference for handling click events*/
          <div
            key={idx}
            className="relative bg-white rounded-md w-full text-black shadow-lg mb-3"
            ref={(el) => (taskRefs.current[idx] = el)} // Assigning ref to each task container
          >
            <div className="flex">
              <div className="pl-4 p-3 pb-2 w-full break-words text-wrap font-semibold">
                {
                  /* {previousTaskNames[idx] &&*/ editedTaskList[idx]
                    .previousTaskName
                }
              </div>
            </div>
            {/*Lower div relegated to collapsed tasks*/}
            {task.collapsed ? (
              <div>
                {/*Absolutely positioned checkbox for grouped deletion*/}
                <div className="absolute left-[-30px] top-1/2 transform -translate-y-1/2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 shadow-md"
                    checked={task.checked}
                    onChange={() => handleCheckboxChange(idx)}
                  />
                </div>
                {/*Lowermost div for expanding task div*/}
                <div className="bg-gray-100 rounded-b-md flex justify-center text-center">
                  <button
                    onClick={() => expandTask(idx)}
                    className="flex flex-col justify-center items-center"
                  >
                    ...
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/*Encapsulating div for input text box*/}
                <div className="p-3 pt-0 pb-1">
                  <div className="relative w-full rounded-md">
                    <input
                      // Set reference to newTask reference if this task is new
                      ref={
                        idx === 0 && editedTaskList.previousTaskName
                          ? null
                          : newTaskRef
                      }
                      placeholder="More work..."
                      className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border-2 focus:border-gray-900 focus:outline-0"
                      value={task.taskName}
                      onChange={(e) => changeTask(e, idx, "taskName")}
                    />
                  </div>
                </div>
                {/*Encapsulating div for markdown notes box*/}
                <div className="p-3 pb-0 pt-1">
                  <div className="relative w-full rounded-md">
                    <textarea
                      className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border-2 focus:border-gray-900 focus:outline-0"
                      placeholder="Add notes and subtasks in markdown..."
                      rows="3"
                      onChange={(e) => changeTask(e, idx, "taskDesc")}
                      value={task.taskDesc}
                    />
                  </div>
                </div>
                {/*Save markdown button REQUIRES IMPLEMENTATION*/}
                <div className="bg-blue flex justify-end pt-1 pr-3 pb-3 text-xs">
                  <div className="text-gray-400 rounded-sm text-xs flex ml:auto bg-slate-200 p-1 rounde">
                    <div className="text-red-400">Save Markdown</div>
                  </div>
                </div>
                {/*Lowermost div encapsulating state modification buttons*/}
                <div className="bg-gray-100 w-full rounded-b-md p-2 text-xs flex items-center">
                  <div className="flex-grow pl-1">
                    <div className="p-1 pl-2 pr-2 text-white bg-slate-400 inline-block rounded-sm shadow-sm">
                      <button onClick={() => handleDeleteClick(idx)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center p-1 text-gray-400">
                    <div className="p-1 pr-2">
                      <button onClick={() => cancelTask(idx)}>Cancel</button>
                    </div>
                    <div className="p-1 pl-2 pr-2 text-white bg-slate-600 rounded-sm shadow-sm">
                      <button onClick={() => handleSaveClick(idx)}>Save</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
