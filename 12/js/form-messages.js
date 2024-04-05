import { isEscapeKey } from './utils.js';

const closeMessage = (evt) => {
  evt.stopPropagation();
  const bodyElement = document.querySelector('body');
  const currentMessage = document.querySelector('.success') || document.querySelector('.error');

  if (evt.type === 'click' || isEscapeKey(evt)) {
    currentMessage.remove();
    bodyElement.removeEventListener('keydown', closeMessage);
    bodyElement.removeEventListener('click', closeMessage);
  }
};

const showsStatusSending = (parentElement, templateId, templateClass) => {
  const parentTag = document.querySelector(parentElement);
  const templateMessage = document.querySelector(templateId).content.querySelector(templateClass);
  const blockMessage = templateMessage.cloneNode(true);

  parentTag.append(blockMessage);
  parentTag.classList.add('modal-open');

  parentTag.addEventListener('keydown', closeMessage);
  parentTag.addEventListener('click', closeMessage);
};

export { showsStatusSending };
