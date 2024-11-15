var dataObject = {
    entries: [],
};
var $addEventButton = document.querySelector('#add-event');
if (!$addEventButton)
    throw new Error('$addEventButton query failed');
var $dialog = document.querySelector('dialog');
if (!$dialog)
    throw new Error('$dialog query failed');
var $cancelButton = document.querySelector('.cancel-button');
if (!$cancelButton)
    throw new Error('$cancelButton query failed');
var $confirmButton = document.querySelector('.confirm-button');
if (!$confirmButton)
    throw new Error('$confirmButton query failed');
$addEventButton.addEventListener('click', function () {
    $dialog.showModal();
});
$cancelButton.addEventListener('click', function () {
    $dialog.close();
});
$confirmButton.addEventListener('click', function () {
    $dialog.close();
});
var $formDialog = document.querySelector('form');
if (!$formDialog)
    throw new Error('$formDialog query failed');
$formDialog.addEventListener('submit', function (event) {
    event.preventDefault();
    var formElements = $formDialog.elements;
    var formObject = {
        time: formElements.time.value,
        day: formElements.day.value,
        info: formElements.info.value,
    };
    dataObject.entries.push(formObject);
});
