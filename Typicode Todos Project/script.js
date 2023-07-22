const apiUrl ='https://jsonplaceholder.typicode.com/todos'

const getTodos = ()=>{
    fetch(apiUrl+'?_limit=10')
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach((todo)=>addTodoToDom(todo));
    });
};

const addTodoToDom =(todo)=>{
    const div = document.createElement('div');
    div.classList.add('todo')
    div.appendChild(document.createTextNode(todo.title));
    div.setAttribute('data-id',todo.id);

    if(todo.completed){
        div.classList.add('done')
    }

    document.getElementById('todo-list').appendChild(div);

}


const createToDo = (e)=>{
    e.preventDefault();

    const newTodo = {
        title: e.target.firstElementChild.value,
        completed:false
    }

    fetch (apiUrl,{
        method:'POST',
        body: JSON.stringify(newTodo),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((data)=>addTodoToDom(data))
};

 const toggleCompleted = (e)=>{
    if(e.target.classList.contains('todo')){
        e.target.classList.toggle('done')
        updateTodo(e.target.dataset.id, e.target.classList.contains('done'))
    }
 }

const updateTodo = (id, completed)=>{
    fetch(`${apiUrl}/${id}`,{
        method:'PUT',
        body: JSON.stringify({ completed }),
        headers:{
            'Content-Type':'application/json'
        }
    })

} 

const deleteTodo =(e)=>{
    if(e.target.classList.contains('todo')){
        const id =e.target.dataset.id;
        console.log(id)
    }
}


const init = ()=>{
    document.addEventListener('DOMContentLoaded',getTodos);
    document.querySelector('#todo-form').addEventListener('submit',createToDo)
    document.querySelector('#todo-list').addEventListener('click',toggleCompleted)
    document.querySelector('#todo-list').addEventListener('dblclick',deleteTodo)
}

init()
