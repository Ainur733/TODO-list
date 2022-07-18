const inputAdd = document.querySelector(".todo__add input"),
    divInput = document.querySelector(".todo__add"),
    selectStatus = document.querySelector(".todo__status select"),
    divSelect = document.querySelector(".todo__status"),
    buttonAdd = document.querySelector(".todo__add-icon"),
    listContainer = document.querySelector(".container-list ul"),
    listItem = document.querySelectorAll(".container-list .todo__item");


// localStorage.clear()
//Добавление рамки при фокусе на полях
inputAdd.onfocus = function () {
    inputAdd.style.outline = "none";
    divInput.style.border = "2px solid #6b6b6b";
}

selectStatus.onfocus = function () {
    selectStatus.style.outline = "none";
    divSelect.style.border = "2px solid #6b6b6b";
}

inputAdd.onblur = function () {
    divInput.style.border = "2px solid #cccccc";
}

selectStatus.onblur = function () {
    divSelect.style.border = "2px solid #cccccc";
}

if (localStorage.getItem("task")) {
    listContainer.insertAdjacentHTML("afterbegin", localStorage.getItem("task"));
}

//Прослушивание кнопки Add(+) и выполнение действий
buttonAdd.addEventListener("click", function () {
    save()
})

// Прослушивание кнопока "Восстановить", "Завершено", "Удалить" и соответственно изменение data-todo-action and data-todo-state
listContainer.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains('todo__action')) {
        const elemItem = target.closest(".todo__item");
        const action = target.dataset.todoAction;
        if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
            elemItem.remove();
        } else elemItem.dataset.todoState = action;
    }
    localStorage.setItem("task", listContainer.innerHTML);
})


selectStatus.addEventListener("change", function () {
    const selectValue = selectStatus.value;
    listContainer.dataset.todoOption = selectValue;


})

function save() {
    if (inputAdd.value) {
        const liItem = `<li class="todo__item" data-todo-state="active">
                            <span class="todo__task">${inputAdd.value}</span>
                            <div class="todo__action_icons">
                                <span class="todo__action todo__action_restore" data-todo-action="active"></span>
                                <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
                                <span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
                            </div>
                        </li>`;
        listContainer.insertAdjacentHTML("afterbegin", liItem);
        inputAdd.value = "";
    } else {
        alert('вы не ввели задачу');
    }
}

