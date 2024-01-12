let root = document.getElementById('root');

root.addEventListener('click', (e) => {
  console.log('event', e);
  console.log('click');
  showEventPopup();
});

const parser = new DOMParser();
const doc = parser.parseFromString(root.innerHTML, 'text/html');
console.log(doc);
console.log(document.body);

setTimeout(() => {
  const iframe = document.querySelector('iframe[title="Google Calendar"]');
  if (iframe) {
    console.log('found iframe');
    console.log(iframe);

    iframe.addEventListener('mousedown', (e) => {
      console.log('event', e);
      console.log(e.target);
      console.log('click');
      showEventPopup();
    });
  } else {
    console.log('no iframe');
  }
  const iframes = document.getElementsByTagName('iframe');

  for (let i = 0; i < iframes.length; i++) {
    if (iframes[i].id === 'calendar') {
      console.log('found iframes');
      console.log(iframes[i]);
      iframes[i].addEventListener('click', () => {
        console.log('click');
        showEventPopup();
      });
    }
  }
}, 3000);

function showEventPopup() {
  // Could fetch event data from API here
  console.log('showopoup');

  let modal = document.getElementById('modal');
  console.log(modal);
  modal.style.display = 'block';

  let form = `
    <form>
      <h2>Event Form</h2>
      <div>
        <label>Title:</label>
        <input />  
      </div>
      <div>
        <label>Details:</label>
        <textarea></textarea>
      </div>
      <button>Submit</button>
    </form>
  `;

  modal.innerHTML = form;
}
