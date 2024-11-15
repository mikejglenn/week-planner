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

const dataObject: Data = {
  entries: [],
};

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

$addEventButton.addEventListener('click', () => {
  $dialog.showModal();
});

$cancelButton.addEventListener('click', () => {
  $dialog.close();
});

$confirmButton.addEventListener('click', () => {
  $dialog.close();
});

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
  renderTbody();
});

function renderTbody(): void {
  console.log('checking for idiocracy:', dataObject);
  const $tr = document.createElement('tr');
  for (let i = 0; i < dataObject.entries.length; i++) {
    const $tdTime = document.createElement('td');
    $tdTime.textContent = dataObject.entries[i].time;
    const $tdInfo = document.createElement('td');
    $tdInfo.textContent = dataObject.entries[i].info;
    const $tdActions = document.createElement('td');
    // $tdActions.textContent = dataObject.entries[i].info;
    $tdActions.textContent = '';
    $tr.appendChild($tdTime);
    $tr.appendChild($tdInfo);
    $tr.appendChild($tdActions);
  }
  $tBody.prepend($tr);
}
