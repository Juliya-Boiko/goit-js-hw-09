const refs = {
	    startBtn: document.querySelector('[data-start]'),
	    stopBtn: document.querySelector('[data-stop]'),
	    body: document.querySelector('body')
	}
	let colorChangerID = null;
	
	// refs.stopBtn.setAttribute('disabled', 'false');
	
	function getRandomHexColor() {
	  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
	}
	
	function onStartBtnClick() {
	    refs.body.style.backgroundColor = getRandomHexColor();
	    refs.startBtn.disabled = true;
	    refs.stopBtn.disabled = false;
	}

	function onStopBtnClick() {
	    clearInterval(colorChangerID);
	    refs.startBtn.disabled = false;
		refs.stopBtn.disabled = true;
	}

	refs.startBtn.addEventListener('click', () => {
	    colorChangerID = setInterval(() => {
	        onStartBtnClick();
	    }, 1000)
	})
	refs.stopBtn.addEventListener('click', onStopBtnClick);

