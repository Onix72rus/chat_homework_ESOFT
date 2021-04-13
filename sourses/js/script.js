const chatForm = document.querySelector ('#chat__form');

   //Get username from URL

   const {username} = Qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });


const socket = io();

   // Join ChatRoom

   socket.emit('joinRoom', {username});

socket.on ('message', message => {
   console.log(message);
   outputMessage(message);
});

chatForm.addEventListener ('submit', (e) => {
   e.preventDefault();

   const msg = e.target.elements.message.value;

   socket.emit('ChatMessage', msg);

   e.target.elements.message.value = '';
   e.target.elements.message.focus();
});

//Push message to DOM

function outputMessage (message) {
   const div = document.createElement ('div');
   div.classList.add('message');
   div.innerHTML = `
   <p class="meta">${message.username} <span> ${message.time}</span></p>
      <p class="text">
         ${message.text}
      </p>
   `;

   document.querySelector('.chat__messages').appendChild(div);
}
