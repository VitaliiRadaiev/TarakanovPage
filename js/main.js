$(document).ready(function(){  

	new WOW().init();

	$('.home_slider').slick({
		infinite: true,
		fade: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 10000,
		speed: 800,
	});

	$('.reviews_slider').slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		dots: true,
		autoplaySpeed: 5000,
		speed: 500,
	});
	
	// ==== Mobile menu handler ====
	function burgerBtnAnimation() {
		$('.burger span:nth-child(1)').toggleClass('first');
		$('.burger span:nth-child(2)').toggleClass('second');
		$('.burger span:nth-child(3)').toggleClass('third');
		$('.burger span:nth-child(4)').toggleClass('fourth');
		$('.header_menu_burg-btn').toggleClass('active');
		$('.header-mobile_menu').toggleClass('active');
	}
	$('.burger').click(burgerBtnAnimation);

	let toggleMobileBtn = document.querySelector('.header_menu_burg-btn');
	let mobileList = document.querySelector('.header_mobile_menu_list');

	function subListHandler(e, item) {
		e.preventDefault();
	}

	toggleMobileBtn.onclick = () => {
		if(mobileList.style.maxHeight) {
			mobileList.style.maxHeight = mobileList.scrollHeight + 'px';
		 	setTimeout(() => {
		 			mobileList.style.maxHeight = null;
		 	},100)
		} else {
			mobileList.style.maxHeight = mobileList.scrollHeight + 'px';
			setTimeout(() => {
					mobileList.style.maxHeight = 'none';
			},500)
		}
	}

	mobileList.onclick = (e) => {
		if(e.target.nextElementSibling) {
			e.preventDefault();
			e.target.classList.toggle('open')
			let subList = e.target.nextElementSibling;
			for(item of mobileList.children) {
				if(item.lastElementChild === subList) {
					continue;
				}

				item.lastElementChild.classList.remove('open');
				item.firstElementChild.classList.remove('open');
			}
			subList.classList.toggle('open')
		}
	}

	// ==== AND Mobile menu handler ====


	// ==== Popup form handler====

	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll('.lock-padding');

	let unlock = true;

	const timeout = 200;

	if(popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener('click', function(e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault();
			});
		}
	}


	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if(popupCloseIcon.length > 0) {
		for(let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function(e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}

	function popupOpen(curentPopup) {
		if(curentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			curentPopup.classList.add('open');
			curentPopup.addEventListener('click', function(e) {
				if(!e.target.closest('.popup_content')) {
					popupClose(e.target.closest('.popup'));
				}
			});

		}
	}

	function popupClose(popupActive, doUnlock = true) {
		if(unlock) {
			popupActive.classList.remove('open');
			if(doUnlock) {
				bodyUnlock();
			}
		}
	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

		if(lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = lockPaddingValue;
			}
		}

		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');

		unlock = false;
		setTimeout(function() {
			unlock = true;
		}, timeout);
	}

	function bodyUnlock() {
		setTimeout(function() {
			for( let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}

			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);

		unlock = false;
		setTimeout(function() { 
			unlock = true;
		}, timeout);
	}

	document.addEventListener('keydown', function(e) {
		if(e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	popup.addEventListener('swiped-right', function(e) {
	    const popupActive = document.querySelector('.popup.open');
	    popupClose(popupActive);
	});

	geoPopup.addEventListener('swiped-right', function(e) {
	    const popupActive = document.querySelector('.popup.open');
	    popupClose(popupActive);
	});

	// === Polyfill ===
		(function() {
			if(!Element.prototype.closest) {
				Element.prototype.closest = function(css) {
					var node = this;
					while(node) {
						if(node.matches(css)) return node;
						else node == node.parentElement;
					}
					return null;
				};
			}
		})();

		(function() {
			if(!Element.prototype.matches) {
				Element.prototype.matches = Element.prototype.matchesSelector ||
					Element.prototype.webkitMatchesSelector ||
					Element.prototype.mozMatchesSelector ||
					Element.prototype.mozMatchesSelector;
			}
		})();
	// === AND Polyfill ===

	// ==== AND Popup form handler ====


	// ==== reCaptcha ====
		document.getElementById('popupForm').onsubmit = function () {
		    if (!grecaptcha.getResponse()) {
		         alert('Вы не заполнили поле Я не робот!');
		         return false; 
		    }
		}
	// ==== AND reCaptcha ====

});


