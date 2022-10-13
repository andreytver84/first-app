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
        .then(response => console.log(response))
    }
}