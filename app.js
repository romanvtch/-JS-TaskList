function toDoList(){
    const title = createTitle('Task List')
    const form = createForm();
    const list = createList();
    form.form.addEventListener('submit', (e) =>{
        e.preventDefault();
        const inputValue = form.inputText.value
        if(!inputValue.trim()){
            alert('write text');
        } else{
            const item = createListItem(inputValue);
            list.append(item.li);
            form.inputText.value = '';
        }
        
        setLocalStorage()
    }) 
    JSON.parse(localStorage.getItem('key')).forEach(element => {
        const item = createListItem(element);
        list.append(item.li);
    });

    // const listEl = createListItem();
    document.querySelector('#container').append(title, form.form, list);
    // list.append(listEl.li);
}

function createTitle(name){
    const title = document.createElement('h1');
    title.innerHTML = name;
    return title; 
    
}
function createForm(){
    const form = document.createElement('form');
    form.style.cssText = `
    display:flex;
    align-items:center;`

    const inputText = document.createElement('input');
    const inputAdd = document.createElement('button');
    inputAdd.textContent = 'Add';
    

    form.append(inputText,inputAdd);
    form.classList.add('form');
    inputText.classList.add('input');
    inputAdd.classList.add('submit');

    return {form,inputText,inputAdd};
}

function createList(){
    const list = document.createElement('ul');
    list.classList.add('nav');
    return list;
}



function createListItem(text){
    const li = document.createElement('li');
    li.classList.add('list__item');
    li.innerText = text;

    const boxButton = document.createElement('div');
    boxButton.classList.add('button');

    const btnComplete = document.createElement('button');
    btnComplete.classList.add('complete');
    btnComplete.innerText = 'complete';

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('delete');
    btnDelete.innerText = 'delete';

    li.append(boxButton);
    boxButton.append(btnComplete,btnDelete);

    btnDelete.addEventListener('click', () =>{
        if(confirm('You realy want delete?')){
            li.remove();
            setLocalStorage();   
        }
    }) 
    btnComplete.addEventListener('click', () =>{
       li.classList.toggle('active');
       setLocalStorage();
    })

    return {li,btnComplete,btnDelete};
}

function setLocalStorage (){
    const listArr = [];
    const listItems = document.querySelectorAll('li');
    for(let i = 0; i < listItems.length; i++){
        listArr.push(listItems[i].firstChild.textContent);
    }
    localStorage.setItem('key', JSON.stringify(listArr));
}


toDoList()