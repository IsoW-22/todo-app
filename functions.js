const createNewTask = () => {
    const itemCount = document.querySelector(".items").childNodes.length;
    const main = document.querySelector(".items");
    const create = document.getElementById("create");

    const div = document.createElement("div");
    div.classList.add("todo-item");
    div.setAttribute("id",`item-${itemCount - 3}`)
    main.insertBefore(div, create);

    const tickButton = document.createElement("Button");
    const tickImg = document.createElement("img");
    tickImg.src =
      "https://img.icons8.com/external-others-inmotus-design/20/000000/external-Done-accept-others-inmotus-design-2.png";
    tickButton.classList.add("tick-icon");
    div.appendChild(tickButton);
    tickButton.appendChild(tickImg);

    const delButton = document.createElement("button");
    const delImg = document.createElement("img");
    delImg.src = "https://img.icons8.com/color/23/000000/cancel--v3.png";
    delButton.classList.add("delete-icon");
    delButton.appendChild(delImg);
    div.appendChild(delButton);

    const editButton = document.createElement("button");
    const editImg = document.createElement("img");
    editImg.src =
      "https://img.icons8.com/external-flaticons-flat-flat-icons/25/000000/external-edit-100-most-used-icons-flaticons-flat-flat-icons-2.png";
    editButton.classList.add("edit-icon");
    editButton.appendChild(editImg);
    div.appendChild(editButton);

    const starButton = document.createElement("button"); 
    const star = document.createElement("p");
    star.innerHTML = "&#9733;";
    star.classList.add("important");
    starButton.classList.add("important-button");
    starButton.appendChild(star);
    div.appendChild(starButton);

    const textarea = document.createElement("p");
    textarea.classList.add("task");
    
    let textInput = prompt("Please enter your task name:", "new task");
    if (textInput == null || textInput == "") {
      textarea.innerHTML = "new task";
    } else {
      textarea.innerHTML = textInput;
    }
    div.appendChild(textarea);
}


const create = document.getElementById("create");
create.addEventListener("click", createNewTask)

// ^^^^^^^^^^^^^ up there... to make new tasks no? :D ^^^^^^^^^^

function load(){
    sessionStorage.clear();
    sessionStorage.setItem("main", "[]");
    return;
}

// now lets do something more fun down here!
//lets make these tasks buttons work :D so tick will... check it green? important yellow? ok

const tasks = document.querySelector(".items");
tasks.addEventListener("click", taskButtons = (event) => {
    const { target } = event;

    if (target.classList.contains("tick-icon")) {
        const task =  target.parentNode.querySelector(".task");

        if(target.parentNode.style.backgroundColor == "green"){
          task.style.textDecoration = "none";
          target.parentNode.style.backgroundColor = "#7A4495";
          target.parentNode.querySelector(".edit-icon").disabled = false;
          target.parentNode.querySelector(".important-button").disabled = false;
        }
        else {
          task.style.textDecoration = "line-through";
          target.parentNode.style.backgroundColor = "green";
          target.parentNode.querySelector(".edit-icon").disabled = true;
          target.parentNode.querySelector(".important-button").disabled = true;
        }
    }

    if(target.classList.contains("delete-icon")){
      if (confirm("are you sure you want to delete this task?")) {
        target.parentNode.remove();
      }
      else {
        return;
      }
    }

    if(target.classList.contains("edit-icon")){
      const pText = target.parentNode.querySelector(".task").innerHTML;
      let textInput = prompt("Please enter your task name:", pText);
      if (textInput == null || textInput == "") {
        return;
      } else {
        target.parentNode.querySelector(".task").innerHTML = textInput;
      }
    }

    if (target.classList.contains("important-button")) {
      const id = target.parentNode.id;
      const color = target.parentNode.querySelector(".important-button p").style.color;
      if (color == "orangered") {
        target.parentNode
          .querySelector(".important-button p").style.color = "white";
          target.parentNode.style.backgroundColor = "#7A4495";
          target.parentNode.querySelector(".task").style.color = "#fff";
          sessionStorage.removeItem(id);
      } else {
        target.parentNode
          .querySelector(".important-button p").style.color = "orangered";
          target.parentNode.style.backgroundColor = "#ffde20";
          target.parentNode.querySelector(".task").style.color = "#000";
          let sessionItems = JSON.parse(sessionStorage.getItem('main'));
          sessionItems.push(id);
          sessionStorage.removeItem("main");
          sessionStorage.setItem("main", JSON.stringify(sessionItems));
      }
    }
});

//something cool finished :D now lets make those nav items work!

function justImportant(){
  const items = document.querySelectorAll(".todo-item");
  const id = document.querySelectorAll(".items [id]:not(#create)");
  let sItems = JSON.parse(sessionStorage.getItem("main"));
  let i = 0;
  items.forEach((item) => {
    item.style.display = "none";
  });
  for(; i < id.length; i++){
   id.forEach(item2 => {
      if(sItems[i] == item2.id){
        item2.style.display = "block";
      }
    })
  }
}

const importantThings = document.querySelector(".importants");
importantThings.addEventListener("click", justImportant);

function showAll() {
  const items = document.querySelectorAll(".todo-item");
  items.forEach((item) => {
    item.style.display = "block";
  });
}


const dayItems = document.querySelector(".day");
dayItems.addEventListener("click", showAll);