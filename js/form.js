
const form = document.getElementById('form');
const fullNameInput = form.querySelector('#fullNnameInput');
const emailAdressInput = form.querySelector('#emailAdressInput');
const message = form.querySelector('#message');
const submitButton = form.querySelector('#submitButton');

form.addEventListener('submit', submitFormHandler);

function submitFormHandler(event) {
  event.preventDefault();

  const messageForm = {
    name: fullNameInput.value || '',
    email: emailAdressInput.value || '',
    message: message.value || '',
    date: new  Date().toJSON(),
  }
  // console.log('messageForm', messageForm);

  submitButton.disabled = true;

  // Request to server to save message
  Message.postMessage(messageForm).then(() => {
    fullNameInput.value = '';
    emailAdressInput.value = '';
    message.value = '';
    submitButton.disabled = false;
  })
}

class Message {
  static postMessage (message) {
    return fetch ('https://yin---ai-app-default-rtdb.firebaseio.com/messages.json', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
    })
    .then(res => res.json())
    .then(res => {
      console.log('res', res);
    })
  }
}