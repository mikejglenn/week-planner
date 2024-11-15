interface FormElement extends HTMLFormControlsCollection {
  time: HTMLInputElement;
  day: HTMLInputElement;
  event: HTMLInputElement;
}

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
  const formObject = {
    time: formElements.time.value,
    day: formElements.day.value,
    event: formElements.event.value,
  };
  console.log(formObject);
});
