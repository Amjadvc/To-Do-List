let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//Empty Array To Store The Tasks
let arrayOfTasks = [];
 
//Check IF Threre IS Tasks in Local Storege
if (localStorage.getItem("tasks")) {
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks")) 
}
 
//Trigger Get Data From  Local Storeg
getDataFromLocalStoreg() 


//Add Task
submit.onclick = function () {
    if (input.value !== "") {
        let c=input.value.split(" ")
        let inputValues = `${c[0][0].toUpperCase()}${c[0].slice(1)} ${c.slice(1)}`;
        addTaskToArray(inputValues.replaceAll(",", " ")) //Add Task info  To Array  Of  Tasks
        input.value = ""; //Empty Input  Field
    }
}

//Click On Task Element
tasksDiv.addEventListener("click", function (ele) {
    //Delete Button
    if (ele.target.classList.contains("del")) {
        //Remove Element From Page
        ele.target.parentElement.remove();
        //Remove Element From Local Storeg
        removeElemntWith(ele.target.parentElement.getAttribute("data-id"));
    };
    //Click On Task Element 
    if (ele.target.classList.contains("task")) {
    //Togle Completed For The Task
        toggleStatusTaskWith(ele.target.getAttribute("data-id"))
    //Toggle Done  Class
        ele.target.classList.toggle("done")
    }
});



function addTaskToArray(inputValue) {
    const task = {
        id: Date.now(),
        title: inputValue,
        completed: false,

    };
    //push Task To Array Of Tasks
    arrayOfTasks.push(task);

    //Add Tasks To Page
    addElementsToPage(arrayOfTasks);
    //Add Tasks To Local Storeg
    addTasksToLocalStoreg(arrayOfTasks)
}
function addElementsToPage(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    //Looping on Array of tasks
    arrayOfTasks.forEach((ele) => {
        let div = document.createElement("div");
        div.className = "task";
        //Check if Task is Done;
        if (ele.completed) {
            div.className = "task done";
        };
        div.setAttribute("data-id", ele.id);    
        let pargraph = document.createElement("p");
        pargraph.className = "my-paragraph";
        pargraph.appendChild(document.createTextNode(ele.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));

        //Append Child 
        div.appendChild(pargraph);
        div.appendChild(span);
        tasksDiv.appendChild(div);
        
    })

}
function addTasksToLocalStoreg(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}


function getDataFromLocalStoreg() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks=JSON.parse(data);
        addElementsToPage(tasks);
    };
};

function removeElemntWith(taskId) {
    arrayOfTasks=arrayOfTasks.filter((task) => {
        
        return task.id != taskId
    })

    addTasksToLocalStoreg(arrayOfTasks)
};


function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addTasksToLocalStoreg(arrayOfTasks)
}


