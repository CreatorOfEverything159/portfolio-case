let data = []
const PORT = 80
const HOST = '165.22.251.103'

const getData = (url) => {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = () => {
            if (xhr.status === 200) res(JSON.parse(xhr.response))
            else rej(Error(`Error: ${xhr.statusText}`))
        }
        xhr.send();
    })
}

const findData = (url, whatFind, whereFind) => {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = () => {
            if (xhr.status === 200) res(JSON.parse(xhr.response))
            else rej(Error(`Error: ${xhr.statusText}`))
        }
        xhr.send(JSON.stringify({whatFind, whereFind}))
    })
}

const setRow = (obj, id) => {
    return `
    <tr>
        <td>
            <a href="#" id="${id}">${obj.fio}</a>
        </td>
        <td>${obj.dolzhnost || '-'}</td>
        <td>${obj.school || '-'}</td>
        <td>${obj.spec || '-'}</td>
    </tr>
    `
}

const createList = (list) => {
    let newList = list.split(' //// ')
    return newList.map(i => {
        return `<li>${i}</li>`
    }).join('')
}

const createBlock = (blockName, list) => {
    return `
        <div class="block">
            <h2 class="subtitle">${blockName}</h2>
            <ul class="list">
                ${createList(list)}
            </ul>
        </div>
    `
}

const createResume = (data) => {
    return `
        <h1 class="title">${data.fio}</h1>

        <div class="info block">
            <img width="150px" class="info__image" src="${data.pic || ''}" alt="">
            <div class="info__right">
                <div class="phone">Телефон: ${data.contacts || '-'}</div>
                <div class="stazh">Стаж: ${(new Date().getFullYear() - new Date(data.stazh).getFullYear()) || '-'} лет</div>
                <div class="school">Образовательная организация: ${data.school || '-'}</div>
                <div class="dolzh">Должность: ${data.dolzhnost || '-'}</div>
            </div>
        </div>
        
        ${data.obrazovanie ? createBlock('Образование', data.obrazovanie) : ''}
        ${data.kvalific ? createBlock('Повышение квалификации', data.kvalific) : ''}
        ${data.publications ? createBlock('Публикации', data.publications) : ''}
        ${data.projects ? createBlock('Проекты', data.projects) : ''}
        ${data.stud_succ ? createBlock('Достижения учеников', data.stud_succ) : ''}
        ${data.prilozh ? createBlock('Приложения', data.prilozh) : ''}
    `
}

const createTable = (data) => {
    let table = document.getElementById('table')
    table.innerHTML = `
                <tr>
                    <th>Сотрудник</th>
                    <th>Должность</th>
                    <th>Образовательное учреждение</th>
                    <th>Специализация</th>
                </tr>
`
    data.forEach((person, index) => {
        table.innerHTML += setRow(person, index)
    })
}

const addListeners = (data) => {
    for (let i = 0; i < data.length; i++) {
        const el = document.getElementById(`${i}`)
        el.addEventListener('click', () => {
            document.getElementById('main').style.display = 'none'
            document.getElementById('resume').style.display = 'flex'
            document.getElementById('resumeInner').innerHTML = createResume(data[i])
        })
    }
}

const init = () => {
    getData(`http://${HOST}:${PORT}/api/people`)
        .then(result => {
            createTable(result)
            data = result
            addListeners(data)
        })
}

init()

document.getElementById('toMain').addEventListener('click', () => {
    document.getElementById('main').style.display = 'flex'
    document.getElementById('resume').style.display = 'none'
})

document.addEventListener('keyup', () => {
    if (document.activeElement.id === 'search__employee') {
        findData(`http://${HOST}:${PORT}/api/find`, document.getElementById('search__employee').value, 'fio')
            .then(result => {
                data = result
                createTable(result)
                addListeners(data)
            })
    }

    if (document.activeElement.id === 'search__position') {
        findData(`http://${HOST}:${PORT}/api/find`, document.getElementById('search__position').value, 'dolzhnost')
            .then(result => {
                data = result
                createTable(result)
                addListeners(data)
            })
    }

    if (document.activeElement.id === 'search__school') {
        findData(`http://${HOST}:${PORT}/api/find`, document.getElementById('search__school').value, 'school')
            .then(result => {
                data = result
                createTable(result)
                addListeners(data)
            })
    }

    if (document.activeElement.id === 'search__spec') {
        findData(`http://${HOST}:${PORT}/api/find`, document.getElementById('search__spec').value, 'spec')
            .then(result => {
                data = result
                createTable(result)
                addListeners(data)
            })
    }
})
