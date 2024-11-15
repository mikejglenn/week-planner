interface FormElement extends HTMLFormControlsCollection {
  time: HTMLInputElement;
  day: HTMLInputElement;
  info: HTMLInputElement;
}

interface DialogEntry {
  time: string;
  day: string;
  info: string;
}

interface Data {
  entries: DialogEntry[];
}

const dataObject: Data = readEvents();

function writeEvents(): void {
  const eventsJson: string = JSON.stringify(dataObject);
  localStorage.setItem('events-storage', eventsJson);
}

function readEvents(): Data {
  const eventsJson = localStorage.getItem('events-storage');
  if (eventsJson) {
    return JSON.parse(eventsJson);
  } else {
    return { entries: [] };
  }
}

const $addEventButton = document.querySelector('#add-event');
if (!$addEventButton) throw new Error('$addEventButton query failed');

const $dialog = document.querySelector('dialog');
if (!$dialog) throw new Error('$dialog query failed');

const $cancelButton = document.querySelector('.cancel-button');
if (!$cancelButton) throw new Error('$cancelButton query failed');

const $confirmButton = document.querySelector('.confirm-button');
if (!$confirmButton) throw new Error('$confirmButton query failed');

const $formDialog = document.querySelector('form');
if (!$formDialog) throw new Error('$formDialog query failed');
console.log($formDialog);

const $tBody = document.querySelector('tbody');
if (!$tBody) throw new Error('$tBody query failed');

const $dayWeek = document.querySelector('#day-of-week');
if (!$dayWeek) throw new Error('$dayWeek query failed');



$addEventButton.addEventListener('click', () => {
  $dialog.showModal();
});

$cancelButton.addEventListener('click', () => {
  $dialog.close();
});

$confirmButton.addEventListener('click', () => {
  $dialog.close();
});

let daySelected = 'monday';
$dayWeek.addEventListener('change', (event: Event) => {
const $eventTarget = event.target as HTMLSelectElement;
daySelected = $eventTarget.selectedOptions.item.
//////////////////////////////////////////////////////
})



$formDialog.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  console.log('checking for idiocracy:', $formDialog);
  const formElements = $formDialog.elements as FormElement;
  const formObject: DialogEntry = {
    time: formElements.time.value,
    day: formElements.day.value,
    info: formElements.info.value,
  };
  dataObject.entries.push(formObject);
  writeEvents();
  renderTbody();
});

document.addEventListener('DOMContentLoaded', () => {
  renderTbody();
});

function renderTbody(): void {
  $tBody.innerHTML = '';
  console.log('checking for idiocracy:', dataObject);
  let i = 0;
  for (i = 0; i < dataObject.entries.length; i++) {
    const $tr = document.createElement('tr');
    const $tdTime = document.createElement('td');
    $tdTime.textContent = dataObject.entries[i].time;
    const $tdInfo = document.createElement('td');
    $tdInfo.textContent = dataObject.entries[i].info;
    const $tdActions = document.createElement('td');
    $tdActions.textContent = dataObject.entries[i].info;
    $tdActions.textContent = '';
    $tr.appendChild($tdTime);
    $tr.appendChild($tdInfo);
    $tr.appendChild($tdActions);
    $tBody.prepend($tr);
  }
  for (i = 10 - i; i < 12; i++) {
    const $tr = document.createElement('tr');
    const $tdTime = document.createElement('td');
    $tdTime.textContent = '';
    const $tdInfo = document.createElement('td');
    $tdInfo.textContent = '';
    const $tdActions = document.createElement('td');
    $tdActions.textContent = '';
    $tdActions.textContent = '';
    $tr.appendChild($tdTime);
    $tr.appendChild($tdInfo);
    $tr.appendChild($tdActions);
    $tBody.append($tr);
  }
}
