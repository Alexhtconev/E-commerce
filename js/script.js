const nav = document.querySelectorAll('.menu__link'),
      divider = document.querySelectorAll('.active_divider'),
      imgs = document.querySelectorAll('.mini'),
      first = document.querySelector('.first'),
      minus = document.querySelector('#minus'),
      plus = document.querySelector('#plus'),
      counter = document.querySelector('.number'),
      cartBtn = document.querySelector('.finish__cart'),
      cart = document.querySelector('.cart'),
      allWrap = document.querySelectorAll('.wrap'),
      modal = document.querySelector('.modal'),
      cartItem = document.querySelector('.cart__add-item'),
      cartInsideBtn = document.querySelector('.cart__btn'),
      addToCartBtn = document.querySelector('.add__btn'),
      cartText = document.querySelector('.cart__value-text'),
      deleteItem = document.querySelector('.cart__delete-ico'),
      itemCount = document.querySelector('.cart__single-price'),
      mainPrice = document.querySelector('.main__price'),
      totalPrice = document.querySelector('.cart__total-price'),
      firstSlider = document.querySelector('.first__slider'),
      slider = document.querySelector('.slider'),
      close = document.querySelector('.close'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      activeItem = document.querySelector('.cart__active-item'),
      activeCounter = document.querySelector('.cart__active-counter'),
      menu = document.querySelector('.menu'),
      menuItem = document.querySelectorAll('.menu_item'),
      hamburger = document.querySelector('.hamburger'),
      sidePanel = document.querySelector('.side'),
      screenWidth = window.screen.width,
      next320 = document.querySelector('.next-320'),
      prev320 = document.querySelector('.prev-320'),
      cartTitleName = document.querySelector('.cart__title'),
      dataMini = document.querySelectorAll('[data-mini]'),
      dataMax = document.querySelectorAll('[data-max]'),
      wrapMax = document.querySelectorAll('.wrap__max'),
      wrapMini = document.querySelectorAll('.wrap__mini');



// hamburger 
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('menu_active');
    sidePanel.classList.toggle('side__active');
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
        sidePanel.classList.toggle('side__active');
    });
});


// slider 

let isZoom = false;

first.addEventListener('click', () => {
    isZoom = true;
    showSlider();
});

function showSlider() {
    if(screenWidth === 320 || screenWidth === 425){
        return;
    } else {
        slider.classList.remove('hide');
        slider.classList.add('show');
    }
}

function closeSlider() {
    if(screenWidth === 320 || screenWidth === 425){
        return;
    } else {
        slider.classList.add('hide');
        slider.classList.remove('show');
        isZoom = false;
    }  
}
close.addEventListener('click', () => {
    closeSlider();
});

slider.addEventListener('click', (e) => {
    if(e.target === slider) {
        closeSlider();
    }
});

// hover effect

function hoverEffect(nav) {
    nav.forEach((item, i) => {
        item.addEventListener('mouseenter', (e) => {   
            if(item == e.target) {
                divider[i].classList.add('show');
                divider[i].classList.remove('hide');
            }
        });
        item.addEventListener('mouseleave', () =>{
            divider[i].classList.remove('show');
            divider[i].classList.add('hide');
        });
        
    });
}
hoverEffect(nav);

// chage photo

function srcChanged(src, elem) {
    const nazwa = src.replace(/-thumbnail/i,"");
    elem.src = nazwa;
}

function addAndRemove(img, wrap) {
    img.forEach(item => {
        item.classList.remove('active__class');
    });
    wrap.forEach(item => {
        item.classList.add('wrap__hide');
    });
}

function changeBorder(active, index, wrap) {
    addAndRemove(isZoom?dataMini:dataMax, wrap);
    active.classList.add('active__class');
    wrap[index].classList.remove('wrap__hide');
}


function changePhoto(img){
    img.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            let mode = first;
            srcChanged(e.target.src, mode);
            changeBorder(e.target, i, wrapMax);
        });
    });
}
changePhoto(dataMax);

function changePhotoSlider(img) {
    img.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            let mode = firstSlider;
            srcChanged(e.target.src, mode);
            changeBorder(e.target, i, wrapMini);
        });
    });
}
changePhotoSlider(dataMini);



//cart

function hideCart(){
    modal.classList.add('hide');
    modal.classList.remove('show');
}

function showCart() {
    modal.classList.remove('hide');
    modal.classList.add('show');
}

function showAndHideCart() {
    cartBtn.addEventListener('click', () => {
        if(!modal.classList.contains('hide')){
            hideCart();
        } else {
            showCart();
        }
        
    }); 
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            hideCart();
        }
    });
}
showAndHideCart();

// plus minu btn

let i = 0;

function plusMinusBtn() {
    counter.innerHTML = `${i}`;
    minus.addEventListener('click', () => {
       if(i <= 0){
        i = 0;
       } else {
        i--;
        totalPrice.innerHTML = `$${mainPrice.innerHTML.replace(/[$.00]/igm, '') * i}.00`;
       }
       counter.innerHTML = `${i}`;
       itemCount.innerHTML = `${mainPrice.innerHTML} x ${i}`;

    });
    plus.addEventListener('click', () => {
        i++;
        counter.innerHTML = `${i}`;
        itemCount.innerHTML = `${mainPrice.innerHTML} x ${i}`;
        totalPrice.innerHTML = `$${mainPrice.innerHTML.replace(/[$.00]/igm, '') * i}.00`;
    });

    // add to cart btn

    function addToCart() {
        addToCartBtn.addEventListener('click', () => {
            if(i === 0) {
                cartText.classList.add('show');
                cartText.classList.remove('hide');
                cartItem.classList.remove('show');
                cartItem.classList.add('hide');
                cartInsideBtn.classList.remove('show');
                cartInsideBtn.classList.add('hide');
                activeItem.classList.add('hide');
                return;
            }
            cartText.classList.add('hide');
            cartText.classList.remove('show');
            cartItem.classList.remove('hide');
            cartItem.classList.add('show');
            cartInsideBtn.classList.remove('hide');
            cartInsideBtn.classList.add('show');
            activeItem.classList.remove('hide');
            activeCounter.classList.remove('hide');
            activeCounter.innerHTML = `${i}`;
            counter.innerHTML = 0;
            i = 0;
        });
    }
    addToCart();
    
    function del() {
        deleteItem.addEventListener('click', () => {
            cartText.classList.add('show');
            cartText.classList.remove('hide');
            cartItem.classList.remove('show');
            cartItem.classList.add('hide');
            cartInsideBtn.classList.remove('show');
            cartInsideBtn.classList.add('hide');
            activeItem.classList.add('hide');
            activeCounter.innerHTML = `${i}`;
        });
    }
    del();

}
plusMinusBtn();

// slider btns + adaptation


let sliderCounter = 1;
let sliderCounterBorder = 0;


if(screenWidth === 320 || screenWidth === 425){
    nextSlide(next320, first);
    prevSlide(prev320, first);
    cartTitle(cartTitleName);
} else {
    nextSlide(next, firstSlider);
    prevSlide(prev, firstSlider);
} 


function nextSlide(swipeBtn, slider) {
    swipeBtn.addEventListener('click', () => {
        sliderCounter++;
        sliderCounterBorder++;
        if(sliderCounter > 4) {
            sliderCounter = 1;
            slider.src = `${firstSlider.src.replace(/\d\.\w\w\w/gmi, '')}${sliderCounter}.jpg`;
        } else {
            slider.src = `${firstSlider.src.replace(/\d\.\w\w\w/gmi, '')}${sliderCounter}.jpg`; 
        }
        if(sliderCounterBorder > 3){
            sliderCounterBorder = 0;
        }
        changeBorder(dataMini[sliderCounterBorder], sliderCounterBorder, wrapMini);
    });
}


function prevSlide(swipeBtn, slider) {
    swipeBtn.addEventListener('click', () => {
        sliderCounter--;
        sliderCounterBorder--;
        if(sliderCounter < 1) {
            sliderCounter = 4;
            slider.src = `${firstSlider.src.replace(/\d\.\w\w\w/gmi, '')}${sliderCounter}.jpg`;
        } else {
            slider.src = `${firstSlider.src.replace(/\d\.\w\w\w/gmi, '')}${sliderCounter}.jpg`;
        }
        if(sliderCounterBorder < 0){
            sliderCounterBorder = 3;
        }
        changeBorder(dataMini[sliderCounterBorder], sliderCounterBorder, wrapMini);
    });
}

function cartTitle(str) {
    if(str.innerHTML.length > 22) {
        str.innerHTML = `${str.innerHTML.trim().split('').slice(0, 19).join('')}...`;
    }
}


