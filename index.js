const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const filters =  document.querySelectorAll(".filters span ");
const clearBtn = document.querySelector(".clear-btn");
const count = document.querySelector(".count p");
let todos =JSON.parse(localStorage.getItem("todo-list"));


//perform action on filter 
filters.forEach(btn =>{
    btn.addEventListener('click',()=>{
        // console.log(btn);
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id)

    })
})

//show all todo item
function showTodo(filter){
    let li="";
    if(todos){
        todos.forEach(function(todo, id){
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filter==todo.status || filter =="all"){
                li += `<li class="task">
                          <label for="${id}" class="d-flex justify-content-center">
                            <input type="checkbox" onclick="updateStatus(this)" id="${id}" ${isCompleted} class="me-3 mt-2">
                            <p class="${isCompleted}" id="para"> ${todo.name} </p>
                          </label>
                        
                          <div class="settings">
                            <i class="fa fa-trash btn btn-outline-danger" onclick="deleteTask(${id})" ></i>
                          </div>

                    </li>`;
                    count.textContent='Total Count : '+todos.length;
            }    
        });
    }
    
   
    taskBox.innerHTML = li || `<span>You dont't have any task here</span>`;
    
}
showTodo("all");

//add todo
function addTodo(){
    let userTask =taskInput.value.trim();
    if(userTask==""){
        return;
    }
        if(!todos){
            todos=[];

        }
        taskInput.value="";
        let taskInfo = {name :userTask , status:"pending"};
        todos.push(taskInfo); 
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");

};

//update status
function updateStatus(selectedTask){
    
    let taskName = selectedTask.parentElement.lastElementChild;
    // console.log(taskName);
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status="completed";
    
    }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status="pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));


}

//delete todo item
function deleteTask(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");

}

//delete all todo item
clearBtn.addEventListener('click',()=>{
    todos.splice(0,todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");
})

