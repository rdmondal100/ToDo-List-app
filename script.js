let addTaskInput = document.getElementById("addTaskInput");
let addBtn = document.getElementById("addBtn");



addBtn.addEventListener('click', () => {
  addTaskInput_value = addTaskInput.value;
  if (addTaskInput_value.trim() != 0) {

    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
      taskObj = [];
    }
    else {
      taskObj = JSON.parse(webtask);
    }

    taskObj.push(addTaskInput_value);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addTaskInput.value = "";
  }
  showTask();

})



const showTask = () => {
  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    taskObj = [];
  }
  else {
    taskObj = JSON.parse(webtask);
  }
  let html = "";
  let taskList = document.getElementById("taskList");
  taskObj.forEach((item, index) => {
    html += ` 
    
        <tr id="tableRow" class="table-active border border-2 border-white">
                    <th scope="row">${index + 1}</th>
                    <td>${item}</td>
                    <td> <button onclick="editTask(${index})" type="button" id="EditBtn" class="text-primary"><i class="fa fa-edit"> 
                    </i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>Edit</button> </td>
                    <td> <button onclick="deleteItem(${index})" type="button" id="DeleteBtn" class="text-primary"><i class="fa fa-trash"> 
                    </i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>Delete</button> </td>
     
        </tr>
    
    `;
  });


  taskList.innerHTML = html;
}

showTask();

//editTask
const editTask = (index) => {
  let saveIndex = document.getElementById("saveIndex")
  let addBtn = document.getElementById("addBtn")
  let saveBtn = document.getElementById("saveBtn")
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  saveIndex.value = index;

  addTaskInput.value = taskObj[index]
  addBtn.style.display = "none";
  saveBtn.style.display = "block";
}



//saveTask
let saveBtn = document.getElementById("saveBtn")
saveBtn.addEventListener("click", () => {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  let saveIndex = document.getElementById("saveIndex").value;
  taskObj[saveIndex] = addTaskInput.value;
  let addBtn = document.getElementById("addBtn");
  saveBtn.style.display = "none";
  addBtn.style.display = "block"

  localStorage.setItem("localtask", JSON.stringify(taskObj));
  addTaskInput.value = " ";
  showTask();
});



// deleteItem
const deleteItem = (index) => {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showTask();


}

//deleteAllBtn
let deleteAllBtn = document.getElementById("deleteAllBtn");
deleteAllBtn.addEventListener('click', () => {
  let addBtn = document.getElementById("addBtn");
  let saveBtn = document.getElementById("saveBtn")

  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  if (webtask == null) {
    taskObj = [];
  }
  else {
    taskObj = JSON.parse(webtask)
    taskObj = [];
  }
  saveBtn.style.display = "none"
  addBtn.style.display = "block"

  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showTask();
})


//searchlist
let searchBox = document.getElementById("searchBox");
searchBox.addEventListener("input", () => {
  let trList = document.querySelectorAll("tr");
  Array.from(trList).forEach((item) => {
    let searchText = item.getElementsByTagName("td")[0].innerText;
    let searchTextBoxval = searchBox.value;
    let re = new RegExp(searchTextBoxval, 'gi');
    if (searchText.match(re)) {
      item.style.display = "table-row";
    }
    else {
      item.style.display = "none";
    }
  })
})

//tableRow design

let trList = document.querySelectorAll("tr");
let trArray = Array.from(trList);
let tableLength = trArray.length;

for (let i = 0; i < tableLength; i++) {
  let tableRow = trArray[i];

  if (i % 2 === 0) {
    tableRow.style.border = "1px solid white";
  } else {
    tableRow.style.border = "2px solid white";
  }
}
