import { isEscapeKey } from './utils.js';

const closeMessage = (evt) => {
  evt.stopPropagation();
  const bodyElement = document.querySelector('body');
  const currentMessage = document.querySelector('.success') || document.querySelector('.error');
  const innerContainer = currentMessage.children[0];

  if (evt.type === 'click' || isEscapeKey(evt)) {

    if (evt.target !== innerContainer) {
      currentMessage.remove();
      bodyElement.removeEventListener('keydown', closeMessage);
      bodyElement.removeEventListener('click', closeMessage);
    }
  }
};

const showsStatusSending = (parentElement, templateId, templateClass) => {
  const parentTag = document.querySelector(parentElement);
  const templateMessage = document.querySelector(templateId).content.querySelector(templateClass);
  const blockMessage = templateMessage.cloneNode(true);
  parentTag.classList.add('modal-open');
  parentTag.append(blockMessage);

  parentTag.addEventListener('keydown', closeMessage);
  parentTag.addEventListener('click', closeMessage);
};

export { showsStatusSending };
