let data = []

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

const init = () => {
    let table = document.getElementById('table')
    getData('http://localhost:30000/api/people')
        .then(result => {
            table.innerHTML = ''
            result.forEach((person, index) => {
                table.innerHTML += setRow(person, index)
            })
            data = result
            for (let i = 0; i < result.length; i++) {
                const el = document.getElementById(`${i}`)
                el.addEventListener('click', () => {
                    document.getElementById('main').style.display = 'none'
                    document.getElementById('resume').style.display = 'flex'
                    document.getElementById('resumeInner').innerHTML = createResume(data[i])
                })
            }
        })
}

init()

document.getElementById('toMain').addEventListener('click', () => {
    document.getElementById('main').style.display = 'flex'
    document.getElementById('resume').style.display = 'none'
})
