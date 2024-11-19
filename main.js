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
    return { entries: [], nextEntryId: 1 };
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
var $dayWeek = document.querySelector('#day-of-week');
if (!$dayWeek) throw new Error('$dayWeek query failed');
$addEventButton.addEventListener('click', function () {
  $dialog.showModal();
});
$cancelButton.addEventListener('click', function () {
  $dialog.close();
});
$confirmButton.addEventListener('click', function () {
  $dialog.close();
});
var daySelected = 'monday';
$dayWeek.addEventListener('change', function (event) {
  var $eventTarget = event.target;
  daySelected = $eventTarget.options[$eventTarget.selectedIndex].value;
  console.log(daySelected);
  renderTbody();
});
$formDialog.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('checking for idiocracy:', $formDialog);
  var formElements = $formDialog.elements;
  var formObject = {
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
document.addEventListener('DOMContentLoaded', function () {
  renderTbody();
});
function renderTbody() {
  $tBody.innerHTML = '';
  console.log('checking for idiocracy:', dataObject);
  var i = 0;
  for (i = 0; i < dataObject.entries.length; i++) {
    console.log(daySelected, dataObject.entries[i].day);
    if (daySelected === dataObject.entries[i].day) {
      var $tr = document.createElement('tr');
      $tr.setAttribute('data-entry-id', String(dataObject.entries[i].id));
      var $tdTime = document.createElement('td');
      $tdTime.textContent = dataObject.entries[i].time;
      var $tdInfo = document.createElement('td');
      $tdInfo.textContent = dataObject.entries[i].info;
      var $tdActions = document.createElement('td');
      $tdActions.textContent = dataObject.entries[i].info;
      $tdActions.textContent = '';
      var $editButton = document.createElement('button');
      $editButton.className = 'edit-button';
      $editButton.textContent = 'EDIT';
      $tdActions.appendChild($editButton);
      var $deleteButton = document.createElement('button');
      $deleteButton.setAttribute('class', 'delete-button');
      $deleteButton.textContent = 'DELETE';
      $tdActions.appendChild($deleteButton);
      $tr.appendChild($tdTime);
      $tr.appendChild($tdInfo);
      $tr.appendChild($tdActions);
      $tBody.prepend($tr);
      $editButton.addEventListener('click', function (event) {
        $dialog.showModal();
        var $eventTarget = event.target;
        for (i = 0; i < dataObject.entries.length; i++) {
          var $findTr = $eventTarget.closest('tr');
          var $closestId = $findTr.getAttribute('data-entry-id');
          if (dataObject.entries[i].id === Number($closestId)) {
            // dataObject.entries[i] = dataObject.nextEntryId,
          }
        }
      });
    }
  }
  for (var j = i; j < 10; j++) {
    var $tr = document.createElement('tr');
    var $tdTime = document.createElement('td');
    $tdTime.textContent = '';
    var $tdInfo = document.createElement('td');
    $tdInfo.textContent = '';
    var $tdActions = document.createElement('td');
    $tdActions.textContent = '';
    $tdActions.textContent = '';
    $tr.appendChild($tdTime);
    $tr.appendChild($tdInfo);
    $tr.appendChild($tdActions);
    $tBody.append($tr);
  }
}
