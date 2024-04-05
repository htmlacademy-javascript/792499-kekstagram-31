import { isEscapeKey } from './utils.js';

const closeMessage = (evt) => {
  const currentMessage = document.querySelector('.success') || document.querySelector('.error');
  const btnMessage = currentMessage.querySelector('button');

  if (evt.target === currentMessage || evt.target === btnMessage || isEscapeKey(evt)) {
    currentMessage.remove();
    document.removeEventListener('keydown', closeMessage);
    btnMessage.removeEventListener('click', closeMessage);
  }
};

const showsStatusSending = (parentElement, templateId, templateClass) => {
  const parentTag = document.querySelector(parentElement);
  const templateMessage = document.querySelector(templateId).content.querySelector(templateClass);
  const blockMessage = templateMessage.cloneNode(true);
  const btnMessage = blockMessage.querySelector('button');

  parentTag.append(blockMessage);
  parentTag.classList.add('modal-open');

  document.addEventListener('keydown', closeMessage);
  btnMessage.addEventListener('click', closeMessage);
};

export { showsStatusSending };
