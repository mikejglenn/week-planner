var $addEventButton = document.querySelector('#add-event');
if (!$addEventButton) throw new Error('$addEventButton query failed');
var $dialog = document.querySelector('dialog');
if (!$dialog) throw new Error('$dialog query failed');
var $cancelButton = document.querySelector('.cancel-button');
if (!$cancelButton) throw new Error('$cancelButton query failed');
var $confirmButton = document.querySelector('.confirm-button');
if (!$confirmButton) throw new Error('$confirmButton query failed');
$addEventButton.addEventListener('click', function () {
  $dialog.showModal();
});
$cancelButton.addEventListener('click', function () {
  $dialog.close();
});
$confirmButton.addEventListener('click', function () {
  $dialog.close();
});
