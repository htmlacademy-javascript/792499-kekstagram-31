const createBigPhoto = () => {
	const pictures = document.querySelector('.pictures');
	const bigPictrure = document.querySelector('.big-picture');

	pictures.addEventListener('click', function (evt) {
		evt.preventDefault();

		if (evt.target.matches('.picture__img')) {
			bigPictrure.classList.remove('hidden');
		}
	})
};

export { createBigPhoto };