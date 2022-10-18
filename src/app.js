import {Question} from './question.js'
import {createModal, isValid} from './utils.js'
import './style.css'
import { getAuthForm, authWithEmailAndPassword } from './auth.js';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');

modalBtn.addEventListener('click',openModal);
window.addEventListener('load',Question.RenderList);
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
    event.preventDefault();

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true;
        //Asinc request to server to save question
        Question.create(question).then(() => {
            console.log('Question: ',question);
            input.value = '';
            input.className = '';
            submitBtn.disabled = false;
        })        
    }
}

function openModal() {
    createModal('Авторизация',getAuthForm());
    document.getElementById('auth-form').addEventListener('submit',authFormHandler);
}

function authFormHandler(event) {
    event.preventDefault();

    const btn = event.target.querySelector('button');
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;

    btn.disabled = true;
    authWithEmailAndPassword(email,password)
    .then(token => {
        return Question.fetch(token);
    })
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false);
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Ошибка!', content);
    } else {
        createModal('Список вопросов',Question.listToHTML(content))
    };
}