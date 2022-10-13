export class Question {
    static create(question) {
        return fetch('https://podcast--abb-default-rtdb.firebaseio.com/question.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-type': 'Aplication/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            question.id = response.name;
            return question;
        })
        .then(addToLocalStorage)
        .then(Question.RenderList)
    }
    static RenderList() {
        const questions = getQuestionsFromLocalStorage()
    }
}

function addToLocalStorage(question) {
    const all = getQuestionsFromLocalStorage();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}