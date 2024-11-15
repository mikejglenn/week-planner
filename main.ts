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

$addEventButton.addEventListener('click', () => {
  $dialog.showModal();
});

$cancelButton.addEventListener('click', () => {
  $dialog.close();
});

$confirmButton.addEventListener('click', () => {
  $dialog.close();
});

const $formDialog = document.querySelector('form');
if (!$formDialog) throw new Error('$formDialog query failed');

$formDialog.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const formElements = $formDialog.elements as FormElement;
  const formObject: DialogEntry = {
    time: formElements.time.value,
    day: formElements.day.value,
    info: formElements.info.value,
  };
  dataObject.entries.push(formObject);
  renderEntry(dataObject.entries[0]);
});

function renderEntry(dialogEntry: DialogEntry): void {
  // const $tr1 = document.querySelector('tbody tr');
  const $tr = document.createElement('tr');
  const $tdTime = document.createElement('td');
  $tdTime.textContent = dialogEntry.time;
  const $tdInfo = document.createElement('td');
  $tdInfo.textContent = dialogEntry.info;
  const $tdActions = document.createElement('td');
  $tdActions.textContent = '';

  $tr.appendChild($tdTime);
  $tr.appendChild($tdInfo);
  $tr.appendChild($tdActions);
}
