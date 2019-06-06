const url = 'https://api.html.wtf/v1/files';
const folders = document.getElementById('folders');

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    layout(folders, data);
  })
  .catch(function (error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  }).then(() => {
    document.querySelector('.j-status').innerText = 'Loaded';
    setTimeout(() => {
      document.querySelector('.j-status').parentElement.hidden = true;
    }, 750)
  });

function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes == 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "0 bytes";
  }
  return bytes;
}

function layout(parent, data) {
  data.forEach(element => {
    // console.log(element);

    if (element.items) {
      folder(parent, element);
    } else {
      item(parent, element);
    }

  });
  // return data;
}

function folder(parent, data) {
  // console.groupCollapsed('folder');
  let item = document.createElement('li'),
    iInfo = document.createElement('div'),
    iName = document.createElement('span'),
    iCollapse = document.createElement('b'),
    iModified = document.createElement('span'),
    iSize = document.createElement('span'),
    iDesc = document.createElement('div'),
    date = new Date(data.modified),
    iModifiedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
    itemsList = document.createElement('ul');


  item.classList.add('item');
  iInfo.classList.add('item__info', 'j-collapse', 'border', 'mb1', 'flex', 'flex-center', 'is-close');
  iName.classList.add('item__name', 'btn', 'j-btn', 'flex-auto', 'overflow-hidden', 'nowrap', 'black');
  iCollapse.classList.add('collapse');

  iDesc.classList.add('item__desc', 'flex', 'nowrap', 'overflow-hidden', 'ml3', 'gray');
  iModified.classList.add('item__modified', 'px1');
  iSize.classList.add('item__size', 'px1');

  itemsList.classList.add('list-reset', 'ml3', 'mb2');

  iCollapse.innerHTML = '&#x25b6;';
  iName.innerText = data.name;
  iName.prepend(iCollapse);

  iModified.innerText = iModifiedDate;

  iDesc.append(iModified);

  iInfo.append(iName);
  iInfo.append(iDesc);

  item.append(iInfo);
  item.append(itemsList);

  parent.append(item);

  // console.log(item);
  // console.groupEnd('folder');

  layout(itemsList, data.items);
}

function item(parent, data) {
  let item = document.createElement('li'),
    iInfo = document.createElement('div'),
    iName = document.createElement('span'),
    iCollapse = document.createElement('b'),
    iModified = document.createElement('span'),
    iSize = document.createElement('span'),
    iDesc = document.createElement('div'),
    date = new Date(data.modified),
    iModifiedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
    iSizeFormated = formatSizeUnits(data.size);

  item.classList.add('item');
  iInfo.classList.add('item__info', 'j-collapse', 'border', 'mb1', 'flex', 'flex-center');
  iName.classList.add('item__name', 'btn', 'flex-auto', 'overflow-hidden', 'nowrap', 'black');
  // iCollapse.classList.add('collapse');

  iDesc.classList.add('item__desc', 'flex', 'nowrap', 'overflow-hidden', 'ml3', 'gray');
  iModified.classList.add('item__modified', 'px1');
  iSize.classList.add('item__size', 'px1');

  iCollapse.innerHTML = '&#x221F;';
  iName.innerText = data.name;
  iName.prepend(iCollapse);

  iModified.innerText = iModifiedDate;
  iSize.innerText = iSizeFormated;

  iDesc.append(iSize);
  iDesc.append(iModified);

  iInfo.append(iName);
  iInfo.append(iDesc);

  item.append(iInfo);

  parent.append(item);

  // console.log(item);
  // console.groupEnd('item');

}

folders.addEventListener('click', btnClick)

function btnClick(event) {
  let target = event.target,
    btn = target.closest('.j-btn');
  if (!btn) return;

  if (!folders.contains(btn)) return;

  collapse(btn);
}

function collapse(btn) {
  if (btn.parentElement.classList.contains('is-close')) {
    btn.parentElement.classList.remove('is-close');
    btn.querySelector('b').innerHTML = '&#x25bc;';
  } else {
    btn.parentElement.classList.add('is-close')
    btn.querySelector('b').innerHTML = '&#x25b6;';
  }
}