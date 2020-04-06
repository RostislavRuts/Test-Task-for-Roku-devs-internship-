/*Тестовое:
Реализовать на JavaScript*/

let data = {
    "accounts" : [
        {
            "title" : "первый юзер",
            "img" : "competencу.png"
        },
        {
            "title" : "второй юзер",
            "img" : "competencу.png"
        },
        {
            "title" : "третий юзер",
            "img" : "competencу.png"
        },
]
}

let newData = data["accounts"];
let list = document.querySelector('#list');
let openScreenTwo = document.querySelector('#openScreen-2');
let firstScreen = document.querySelector('.screen-1');
let secondScreen = document.querySelector('.screen-2');
let cancel = document.querySelector('#cancel');
let addToList = document.querySelector('#addToList');
let input = document.getElementById('input');


/*
* Ф-ция showList вывоит юзеров на страницу пользователя.
* параметр data - объект с юзерами*/
function showList(data) {
    //очищается список на странице пользователя
    if(list.children.length > 0){
        clear();
    }
    //проверяем наличие аккаунтов в объекте
    if(data.length > 0){
        let newData = data;// в переменную ложим параметр получаемый при вызове ф-ции

        //перебираем объект циклом. создаем теги и ложим в них елементы с объекта
        for (let key in newData){
            let obj = newData[key];

            let newElem = document.createElement('li');
            let image  = document.createElement('img');
            newElem.innerHTML = obj["title"];
            //в src="" записываем путь
            image.setAttribute('src', obj['img']);
            list.appendChild(newElem);
            newElem.prepend(image);
            /*
            * присваеваем первому ел-ту списка класс focus.
            * с его помощью будем осуществлять управление на странице*/
            list.firstElementChild.classList.add('focus');
        }
    }
}
/*
* ф-ция clear очищает список.
* вызывается в ф-ции showList перед выводом юзеров на страницу.
*/
function clear() {
    while(list.firstElementChild){
        list.removeChild(list.firstElementChild);
    }
}
/*
* ф-ция addAccount будет записывать в объект data новые аккаунты
* параметр title строка
*/
function addAccount(title) {
    newData.push({
        "title": title,
        "img" : "competencу.png",
    });
}
//вывод юзеров объекта data на страницу
showList(newData);

/*
* событие 'keydown' будет отслеживать нажатие клавиш управления (лево, право, верх, низ, "Enter")
* с помощью проверки на наличие у елемента страницы класса "focus"
* реализовуем интерфейс перемещения фокуса между элементами без использования мышки*/
document.body.addEventListener('keydown', function (event) {
    if (event.code == 'ArrowDown' || event.code == 'ArrowUp' || event.code == 'ArrowLeft' || event.code == 'Enter' || event.code == 'ArrowRight') {
        event.preventDefault();
    }

    if(event.code == 'ArrowDown'){
        //перемещение фокуса для списка юзеров
        for(let elem of list.children){
            if(elem.classList.contains('focus') && list.children.length > 1){
                if(list.lastElementChild.classList.contains('focus')){
                    list.firstElementChild.classList.add('focus');
                    list.lastElementChild.classList.remove('focus');
                    break;
                }
                let next = elem.nextSibling;
                next.classList.add('focus');
                elem.classList.remove('focus');
                break;
            }
        }
        //перемещение фокуса для поля ввода (input)
        if(input.classList.contains('focus') && cancel.classList.contains('last')){
                input.classList.remove('focus');
                input.blur();
                cancel.classList.add('focus');
        }
        else if(input.classList.contains('focus')){
            input.classList.remove('focus');
            input.blur();
            addToList.classList.add('focus');
        }
    }
    if(event.code == 'ArrowUp'){
        //перемещение фокуса для списка юзеров
        for(let elem of list.children){
            if(elem.classList.contains('focus') && list.children.length > 1){
                if(list.firstElementChild.classList.contains('focus')){
                    list.lastElementChild.classList.add('focus');
                    list.firstElementChild.classList.remove('focus');
                    break;
                }
                let previous = elem.previousSibling;
                previous.classList.add('focus');
                elem.classList.remove('focus');
                break;
            }
        }
        //перемещение фокуса для кнопки 'add' и 'cancel' в Screen2
        if(addToList.classList.contains('focus')){
            addToList.classList.remove('focus');
            input.classList.add('focus');
            input.focus();
        }
        else if(cancel.classList.contains('focus')){
            cancel.classList.remove('focus');
            cancel.classList.add('last');
            input.classList.add('focus');
            input.focus();
        }

    }
    if(event.code == 'ArrowLeft'){
        //удаление юзеров из объекта data
        for (let elem of list.children){
            /*
            * циклом перебираем список на странице
            * каждого юзера сравниваем с елементами объекта. ищем совпадение по title
            */
            for(let key in newData){
                let obj = newData[key];
                /*
                * если есть совпадение удаляем данные аккаунта из объекта
                * выводим аккаунты списком на страницу с помощью ф-ции showList()*/
                if(elem.textContent == obj['title'] && elem.classList.contains('focus')){
                    newData.splice(key, 1);
                    showList(newData);
                    //при удалении последнего юзера 'focus' получает кнопка 'add' в Screen1
                    if(list.children.length == 0){
                        openScreenTwo.classList.add('focus');
                    }
                }
            }
        }
        /*
        * переход фокуса от кнопки Add к блоку accounts - нажатием кнопки "лево".
        *  Фокус передать тому элементу, с которого перешли на Add.*/
        if(openScreenTwo.classList.contains('focus')){
            for(let elem of list.children){
                if(elem.classList.contains('last')){
                    openScreenTwo.classList.remove('focus');
                    elem.classList.remove('last');
                    elem.classList.add('focus');
                }
            }
        }
        //переход фокуса от кнопки 'Add' в Screen2 к кнопке 'Cancel'
        if(addToList.classList.contains('focus')){
            addToList.classList.remove('focus');
            cancel.classList.add('focus');
        }
    }
    if(event.code == 'ArrowRight'){
        //переход фокуса от блока accounts к кнопке Add - нажатием кнопки "право"
        for(let elem of list.children){
            if(elem.classList.contains('focus')){
                elem.classList.remove('focus');
                openScreenTwo.classList.add('focus');
                elem.classList.add('last');
            }
        }
        //переход фокуса от кнопки Cancel к кнопке Add - нажатием кнопки "право"
        if(cancel.classList.contains('focus')){
            cancel.classList.remove('focus');
            cancel.classList.remove('last');
            addToList.classList.add('focus');
        }
    }
    if(event.code == 'Enter'){
        //При нажатии кнопки Add - Screen1 заменяется на Screen2. фокус получает поле ввода
        if(openScreenTwo.classList.contains('focus')){
            openScreenTwo.classList.remove('focus');
            for(let elem of list.children){
                if(elem.classList.contains('last')){
                    elem.classList.remove('last');
                }
            }
            firstScreen.style.display = 'none';
            secondScreen.style.display = 'inline';
            input.classList.add('focus');
            input.focus();
        }
        /*
        * При нажатии кнопок
            'Cancel':
            - очистить поле ввода
            - скрыть Screen2 отобразив Screen1*/
        if(cancel.classList.contains('focus')){
            input.value = "";
            cancel.classList.remove('focus');
            list.firstElementChild.classList.add('focus');
            firstScreen.style.display = 'inline';
            secondScreen.style.display = 'none';
        }
        /*  Add:
                - добавить новый элемент в accounts где title - введенный текст из поля ввода, img -
                стандартное изображение ( выполняет ф-ция addAccount() )
                - перерисовать блок accounts на Screen1 ( ф-ция showList() )
                - очистить поле ввода
                - скрыть Screen2 отобразив Screen1*/
        if(addToList.classList.contains('focus') && input.value.trim() != ''){
            addAccount(input.value);
            addToList.classList.remove('focus');
            input.value = "";
            showList(newData);
            firstScreen.style.display = 'inline-block';
            secondScreen.style.display = 'none';
        } 
    }
});





