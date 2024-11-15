var dataObject = readEvents();
function writeEvents() {
  var eventsJson = JSON.stringify(dataObject);
  localStorage.setItem('events-storage', eventsJson);
}
function readEvents() {
  var eventsJson = localStorage.getItem('events-storage');
  if (eventsJson) {
    return JSON.parse(eventsJson);
  } else {
    return { entries: [] };
  }
}
var $addEventButton = document.querySelector('#add-event');
if (!$addEventButton) throw new Error('$addEventButton query failed');
var $dialog = document.querySelector('dialog');
if (!$dialog) throw new Error('$dialog query failed');
var $cancelButton = document.querySelector('.cancel-button');
if (!$cancelButton) throw new Error('$cancelButton query failed');
var $confirmButton = document.querySelector('.confirm-button');
if (!$confirmButton) throw new Error('$confirmButton query failed');
var $formDialog = document.querySelector('form');
if (!$formDialog) throw new Error('$formDialog query failed');
console.log($formDialog);
var $tBody = document.querySelector('tbody');
if (!$tBody) throw new Error('$tBody query failed');
$addEventButton.addEventListener('click', function () {
  $dialog.showModal();
});
$cancelButton.addEventListener('click', function () {
  $dialog.close();
});
$confirmButton.addEventListener('click', function () {
  $dialog.close();
});
$formDialog.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('checking for idiocracy:', $formDialog);
  var formElements = $formDialog.elements;
  var formObject = {
    time: formElements.time.value,
    day: formElements.day.value,
    info: formElements.info.value,
  };
  dataObject.entries.push(formObject);
  writeEvents();
  renderTbody();
});
document.addEventListener('DOMContentLoaded', function () {
  renderTbody();
});
function renderTbody() {
  console.log('checking for idiocracy:', dataObject);
  var $tr = document.createElement('tr');
  for (var i = 0; i < dataObject.entries.length; i++) {
    var $tdTime = document.createElement('td');
    $tdTime.textContent = dataObject.entries[i].time;
    var $tdInfo = document.createElement('td');
    $tdInfo.textContent = dataObject.entries[i].info;
    var $tdActions = document.createElement('td');
    $tdActions.textContent = dataObject.entries[i].info;
    $tdActions.textContent = '';
    $tr.appendChild($tdTime);
    $tr.appendChild($tdInfo);
    $tr.appendChild($tdActions);
  }
  $tBody.prepend($tr);
}
