interface FormElement extends HTMLFormControlsCollection {
  time: HTMLInputElement;
  day: HTMLInputElement;
  info: HTMLInputElement;
}

interface DialogEntry {
  time: string;
  day: string;
  info: string;
  id: number;
}

interface Data {
  entries: DialogEntry[];
  nextEntryId: number;
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
    return { entries: [], nextEntryId: 1 };
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
  daySelected = $eventTarget.options[$eventTarget.selectedIndex].value;
  console.log(daySelected);
  renderTbody();
});

$formDialog.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  console.log('checking for idiocracy:', $formDialog);
  const formElements = $formDialog.elements as FormElement;
  const formObject: DialogEntry = {
    time: formElements.time.value,
    day: formElements.day.value,
    info: formElements.info.value,
    id: dataObject.nextEntryId,
  };
  dataObject.entries.push(formObject);
  dataObject.nextEntryId++;
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
    console.log(daySelected, dataObject.entries[i].day);
    if (daySelected === dataObject.entries[i].day) {
      const $tr = document.createElement('tr');
      $tr.setAttribute('data-entry-id', String(dataObject.entries[i].id));
      const $tdTime = document.createElement('td');
      $tdTime.textContent = dataObject.entries[i].time;
      const $tdInfo = document.createElement('td');
      $tdInfo.textContent = dataObject.entries[i].info;
      const $tdActions = document.createElement('td');
      $tdActions.textContent = dataObject.entries[i].info;
      $tdActions.textContent = '';

      const $editButton = document.createElement('button');
      $editButton.className = 'edit-button';
      $editButton.textContent = 'EDIT';
      $tdActions.appendChild($editButton);

      const $deleteButton = document.createElement('button');
      $deleteButton.setAttribute('class', 'delete-button');
      $deleteButton.textContent = 'DELETE';
      $tdActions.appendChild($deleteButton);

      $tr.appendChild($tdTime);
      $tr.appendChild($tdInfo);
      $tr.appendChild($tdActions);
      $tBody.prepend($tr);

      $editButton.addEventListener('click', (event: Event) => {
        $dialog.showModal();
        const $eventTarget = event.target as HTMLElement;
        for (i = 0; i < dataObject.entries.length; i++) {
          const $findTr = $eventTarget.closest('tr');
          const $closestId = $findTr.getAttribute('data-entry-id');
          if (dataObject.entries[i].id === Number($closestId)) {
            // dataObject.entries[i] = dataObject.nextEntryId,
          }
        }
      });
    }
  }
  for (let j = i; j < 10; j++) {
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
