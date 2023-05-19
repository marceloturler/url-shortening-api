const BTN_SHORTEN = document.getElementById('btn-shorten');
const INPUT_SHORTEN = document.getElementById('input-shorten');
const URL_API = 'https://api.shrtco.de/v2/shorten?url=';
const SPAN_ERROR = document.getElementById('error');
const ICON_MENU = document.getElementById('menu-mobile-icon');
const MENU_MOBILE = document.querySelector('nav');

function createNode(el) {
  return element = document.createElement(el);
}

function insertText(el, text, link) {
  text 
    ? el.innerHTML = text
    : el.innerHTML = `https<span>://</span>` + link
  return el;
}

function insertClass(el, className) {
  return el.classList = className;
}

function appendNode(parent, el) {
  return parent.appendChild(el);
}

function searchBtnDisabled() {
  let btnDisabled = '';
  btnDisabled = document.getElementsByClassName('btn-copied');
  return btnDisabled[0];
}

function enabledButton() {
  let btnDisabled = searchBtnDisabled();
  if (btnDisabled != null) {
    btnDisabled.removeAttribute('class');
    btnDisabled.innerText = 'Copy';
    btnDisabled.disabled = false;
  }
}

function disabledButton(btn) {
  enabledButton();
  btn.classList = 'btn-copied';
  btn.innerText = 'Copied';
  btn.disabled = true;
}

function copyShortedLink() {
  disabledButton(this);
  let elParent = this.closest("div");
  let linkInner = elParent.children[0].children[1].innerHTML;
  let shortedLink = 'https://'+ linkInner.slice(21);
  navigator.clipboard.writeText(shortedLink);
}

function changeInputtoError(msg) {
  SPAN_ERROR.style.display = 'block';
  SPAN_ERROR.innerText = msg;
  INPUT_SHORTEN.classList.add('shorten-error', 'wrong');
  INPUT_SHORTEN.focus();
}

function changeInputtoNormal() {
  SPAN_ERROR.style.display = 'none';
  INPUT_SHORTEN.classList.remove('shorten-error', 'wrong');
  INPUT_SHORTEN.focus();
}

function shortenURL() {
  let url = INPUT_SHORTEN.value;
  let url_full = URL_API + url;
  let url_shorted = '';
  
  if (INPUT_SHORTEN.value == "") {
    changeInputtoError('Please add a link');
  }
  else {
    fetch(url_full)
    .then((resp) => resp.json())
    .then(function(data) {
      if (data.ok) {
        let shorted_list = document.getElementById('shorted-list');
        url_shorted = data.result.short_link;
        SPAN_ERROR.style.display = 'none';
        let paragraph1 = createNode('p');
        let paragraph2 = createNode('p');
        let divParent = createNode('div');
        let divInternal = createNode('div');
        let btn = createNode('button');
        insertClass(divParent, 'link-container');
        insertClass(divInternal, 'link');
        insertClass(paragraph2, 'link-shorted');
        insertText(paragraph1, '', url);
        insertText(paragraph2, '', url_shorted);
        insertText(btn, 'Copy');
        btn.addEventListener('click', copyShortedLink);
        appendNode(divInternal, paragraph1);
        appendNode(divInternal, paragraph2);
        appendNode(divParent, divInternal);
        appendNode(divParent, btn);
        appendNode(shorted_list, divParent);
        shorted_list.style.marginBottom = '24px';
      }
      else {
        changeInputtoError('Please add a valid link');
      }
    })
    .catch(function(err) {
      changeInputtoError('Something went wrong in the server side: ' + err);
    })
    changeInputtoNormal();
    INPUT_SHORTEN.value = '';
    INPUT_SHORTEN.focus;
  }
  return url_shorted;
}

function toogleMenu() {
  MENU_MOBILE.classList.toggle('active');
}

INPUT_SHORTEN.addEventListener('input', changeInputtoNormal);
BTN_SHORTEN.addEventListener('click', shortenURL);
ICON_MENU.addEventListener('click', toogleMenu);