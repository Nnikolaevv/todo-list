const tasks = [
{
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
    'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
},
{
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
    'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
    'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
},
{
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
    'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
},
{
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
    'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
    'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
},
];

 // Основная самовызывающаяся функция принимающая массив объектов со свойствами

(function (arrOfTasks) {
    //Создаем из массива объектов, объект объектов, в котором названия принимают значения id
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});

    const themes = {
        default: {
            '--base-text-color': '#212529',
            '--header-bg': '#007bff',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#007bff',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#0069d9',
            '--default-btn-border-color': '#0069d9',
            '--danger-btn-bg': '#dc3545',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#bd2130',
            '--danger-btn-border-color': '#dc3545',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#80bdff',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
        dark: {
            '--base-text-color': '#212529',
            '--header-bg': '#343a40',
            '--header-text-color': '#fff',
            '--default-btn-bg': '#58616b',
            '--default-btn-text-color': '#fff',
            '--default-btn-hover-bg': '#292d31',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#b52d3a',
            '--danger-btn-text-color': '#fff',
            '--danger-btn-hover-bg': '#88222c',
            '--danger-btn-border-color': '#88222c',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
        light: {
            '--base-text-color': '#212529',
            '--header-bg': '#fff',
            '--header-text-color': '#212529',
            '--default-btn-bg': '#fff',
            '--default-btn-text-color': '#212529',
            '--default-btn-hover-bg': '#e8e7e7',
            '--default-btn-border-color': '#343a40',
            '--default-btn-focus-box-shadow':
                '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
            '--danger-btn-bg': '#f1b5bb',
            '--danger-btn-text-color': '#212529',
            '--danger-btn-hover-bg': '#ef808a',
            '--danger-btn-border-color': '#e2818a',
            '--input-border-color': '#ced4da',
            '--input-bg-color': '#fff',
            '--input-text-color': '#495057',
            '--input-focus-bg-color': '#fff',
            '--input-focus-text-color': '#495057',
            '--input-focus-border-color': '#78818a',
            '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
        },
    };

    //!!!!ELEMENTS UI!!!!
    // Находим элемент контайнер для помещенияв него созданого фрагмента с созданным списком ('li')
    const listContainer = document.querySelector('.tasks-list-section .list-group');
    //Находим элемент form
    const form = document.forms['addTask'];
    // Находим поле title
    const inputTitle = form.elements['title'];
    //Находим поле body
    const inputBody = form.elements['body'];
    //Находим элемент переключения тем
    const themeSelector = document.getElementById('themeSelect');
    //Создаем переменную для хранения последней выбранной темы
    let lastSelectedTheme =  localStorage.getItem('theme') || "default";

    // Вешаем обработчик события на родителя кнопки Delete
    listContainer.addEventListener('click', onDeleteHandler);
    // Вешаем обработчик события на themeSelector
    themeSelector.addEventListener('change', onThemeSelectHandler)


   // !!!!EVENTS!!!
    setTheme(lastSelectedTheme);
    //Назначаем на кнопку 'submit' обработчик событий, котрый вызывает функцию
    form.addEventListener('submit', onFormSubmitHandler);
    form.reset()

    // Вызываем рендер полученного объекта объектов
    renderAllTasks(objOfTasks);

   // Создаем рендер из объекта объектов с параметрами
   function renderAllTasks(tasksList) {
       // Проверяем передан ли объект
       if (!tasksList) {
           console.error('Передайте список задач')
           return;
       }
       // Создаем фрагмент
       const fragment = document.createDocumentFragment();
       // Перебираем объект объектов и на каждой итерации создаем элемент списка ('li')
        Object.values((tasksList)).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
        })

        listContainer.appendChild(fragment)

    }

    // Созд функцию которая принимает объект с параметрами {id, title, body} и возвращает DOM на каждой вызванной итерации
    function listItemTemplate({_id, title, body} = {}) {
       const li = document.createElement('li');
       li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');

       const span = document.createElement('span');
       span.textContent = title;
       span.style.fontWeight = 'bold';

       const btn = document.createElement('button');
       btn.textContent = 'Delete';
       btn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

       const article = document.createElement('p');
       article.textContent = body;
       article.classList.add('mt-2', 'w-100');

       li.appendChild(span);
       li.appendChild(btn);
       li.appendChild(article);

        //Добавляем каждому элементу LI data атрибут c параметрами ID
       li.setAttribute('data-task-id', _id)
       return li;
    }

    // Функция срабатывающая на 'submit'.
    function onFormSubmitHandler(e) {
       e.preventDefault()

        // Получаем значение поля title и body
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;

    //Проверяем пустые ли строки title и body
        if (titleValue === "" || bodyValue === '') {
            alert('ВВедите значения Title и Body');
            return;
        }

        //Вызываем фунцию для создания нового Task и передаем значения TitleValue, BodyValue
         const task = createNewTask(titleValue, bodyValue);
        // Создаем новый DOM с принятыми значениями
        const listItem = listItemTemplate(task);
        //Добавляем в список созданый DOM
        listContainer.insertAdjacentElement('afterbegin', listItem)

    }
    //создаем функцию для  создания нового Task
    function createNewTask(title, body) {
       const newTask = {
           title,
           body,
           completed: false,
           _id: `task-${Math.random()}`,
       }
       // Добавляем в массив новый объект Task;
       objOfTasks[newTask._id] = newTask
        console.log(tasks)

       //Возвращаем копию newTask с помощью деструктуризации
       return {...newTask}
    }
    //Функция срабатывает на клик по кнопке удалить
    function onDeleteHandler(e) {
       // проверяем что клик бы лпо кнопке удалить
       if (e.target.classList.contains('delete-btn')) {
         // Находим родительский блок
         const parent = e.target.closest('[data-task-id]');
         // Находим ID родительского блока
         const id = parent.dataset.taskId;
         // Вызываем функцию удаления
         const confirmed = deleteTask(id);
         //Передаем в Функцию статус да/нет и элемент
         deleteTaskFromHtml(confirmed, parent);
       }
    }

    // Функция удаления
    function deleteTask(id) {
       //Находим title для  подтверждения
       const {title} = objOfTasks[id];
       //Спрашиваем удлалить task
        const isConfirm = confirm(`Вы действительно хотите удалить task?: ${title}`)
        // Проверяем да/нет
        if (!isConfirm) {
            return isConfirm
        }
        //Удаляем
        delete objOfTasks[id];
        //Возвращаем статус
        return isConfirm

    }
//Функция удаления из разметки. Принимает статус да/нет и элемент
    function deleteTaskFromHtml(confirmed, el) {
       if (!confirmed) {
           return
       }
       el.remove()
    }

    //Функция переключения темы
    function onThemeSelectHandler(e) {
       //Записываем значение изменяемой темы
       const selectedTheme = themeSelector.value;
       //Подтверждение да/нет (можно убрать)
       // const isConfirmed = confirm(`Вы хотите поменять тему на: ${selectedTheme}`);
       // // Если нет, то оставляем предыдущее значение
       // if (!isConfirmed) return themeSelector.value = lastSelectedTheme;
       //Если да то вызвыаем функцию смены темы
       setTheme(selectedTheme);
       // Записываем текущее значение
       lastSelectedTheme = selectedTheme;
       localStorage.setItem('theme', lastSelectedTheme)
    }

    //Функция смены темы, принимает название темы
    function setTheme(name) {
       //Создаем объект на основе принятого значения имени
       const selectedThemeObj = themes[name];
       //Перебираем объект и на каждой итерации меняем название свойства на значение
       Object.entries(selectedThemeObj).forEach(([key, value]) => {
           document.documentElement.style.setProperty(key, value)
       })
    }
})(tasks);


