
var x = document.getElementsByClassName('search-bar-input')[0];
var y = document.getElementsByClassName('search-button')[0];

// x.addEventListener('transitionend', (event) => {
//   if (event.elapsedTime > 0.195) {
//     x.className = 'search-bar-input-over';
//   }
//
//   console.log(event.elapsedTime);
// });

x.addEventListener('keyup', function() {
  if (!this.value) {
    x.className = 'search-bar-input';
    y.classList.remove('anim-button-appear');
    y.classList.add('anim-button-disappear');
  } else {
    x.className = 'search-bar-input-over';
    y.classList.remove('anim-button-disappear');
    y.classList.add('anim-button-appear');
  };
});

// var searchTool = document.getElementById('search-tool');
var z = document.getElementsByClassName('delete-x')[0];
if (z) {
  z.addEventListener('click',function() {
    this.parentNode.parentNode.removeChild(this.parentNode);
  });
}


/* FORM SUBMIT */

let submitbuttons = document.getElementsByClassName('register-button');

for (let i = 0; i < submitbuttons.length; i++ ) {
  submitbuttons[i].addEventListener('click', function() {
    if (this.parentNode.nodeName == 'FORM') {
      this.parentNode.submit();
    } else {
      this.parentNode.parentNode.submit();
    }

  })
}

var modalRegister = document.getElementsByClassName('modal-register')[0];
var modalLogin = document.getElementsByClassName('modal-login')[0];
window.onclick = function(event) {
  if (event.target == modalRegister) {
    modalRegister.style.display = 'none';
  }
  if (event.target == modalLogin) {
    modalLogin.style.display = 'none';
  }
}
var close = document.getElementsByClassName('modal-close')[0];
close.onclick = function() {
  modalRegister.style.display = 'none';
}
var close = document.getElementsByClassName('modal-close')[1];
close.onclick = function() {
  modalLogin.style.display = 'none';
}
var register = document.getElementsByClassName('register')[0];
if (register) {
  register.addEventListener('click', function() {
    modalRegister.style.display = 'block';
    modalRegister.querySelector('div form input').focus();
  })
}

var login = document.getElementsByClassName('login')[0];
if (login) {
  login.addEventListener('click',function() {
    modalLogin.style.display = 'block';
    modalLogin.querySelector('div form input').focus();
  })
}
