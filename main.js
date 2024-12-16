(()=>{"use strict";function e(e){e.classList.add("popup_is-animated"),document.addEventListener("keydown",n),setTimeout((function(){e.classList.add("popup_is-opened")}),1)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function o(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),i=c.querySelector(".card__image"),s=c.querySelector(".card__title"),l=c.querySelector(".card__like-quantity");return i.src=e.link,i.alt=e.name,c.cardId=e._id,c.ownerId=e.owner._id,s.textContent=e.name,l.textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))&&u.classList.add("card__like-button_is-active"),u.addEventListener("click",(function(t){o(t,e._id)})),i.addEventListener("click",n),e.owner._id===t?a.addEventListener("click",(function(t){r(t,e._id)})):(a.disabled=!0,a.classList.add("card__delete-button_disabled")),c}var r=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},c=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)},a=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):c(t,n)},u=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){r(e,n,t),n.setCustomValidity("")})),c(o,t)},i={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-28",headers:{authorization:"87499e0d-719b-4d6f-84c9-6ddaa82af35b","Content-Type":"application/json"}};function s(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}var l=function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:i.headers}).then(s)},d=function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:i.headers}).then(s)},p=document.querySelector(".places__list"),_=document.querySelector(".popup_type_edit"),f=document.querySelector(".popup__form"),m=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_new-card"),h=document.forms["new-place"],S=document.querySelectorAll(".popup"),b=document.querySelector(".popup_type_image"),q=b.querySelector(".popup__image"),L=b.querySelector(".popup__caption"),g=f.querySelector(".popup__input_type_name"),C=f.querySelector(".popup__input_type_description"),E=document.querySelector(".popup__form__avatar"),k=(E.querySelector(".popup__input_type_url_avatar"),document.querySelector(".profile__info")),x=k.querySelector(".profile__title"),U=k.querySelector(".profile__description"),w=document.querySelector(".profile__image"),A=document.querySelector(".popup_type_avatar"),T=document.querySelector(".popup__input_type_url_avatar"),N="",P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function B(t){var n=t.target.closest(".card__image");e(b),q.src=n.src,q.alt=n.alt,L.textContent=n.alt}function D(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function O(e,t){var n=e.target.parentNode.querySelector(".card__like-quantity");(e.target.classList.contains("card__like-button_is-active")?d:l)(t).then((function(t){e.target.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}function j(e,t){var n;(n=t,fetch("".concat(i.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:i.headers}).then(s)).then((function(){e.target.closest(".places__item").remove()})).catch((function(e){console.log(e)}))}Promise.all([fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers}).then(s),fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers}).then(s)]).then((function(e){var t=e[0];N=t._id,x.textContent=t.name,U.textContent=t.about;var n=e[1];w.style.backgroundImage="url(".concat(t.avatar,")"),n.forEach((function(e){!function(e,t,n){var r=o(e,t,n,O,j);p.append(r)}(e,N,B)}))})).catch((function(e){console.log(e)})),h.addEventListener("submit",(function(e){e.preventDefault();var n,r=h.querySelector(".popup__button"),c=h.querySelector(".popup__input_type_card-name").value,a=h.querySelector(".popup__input_type_url").value;D(!0,r),(n={name:c,link:a},fetch("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(s)).then((function(e){var n=o(e,N,B,O,j);p.prepend(n),h.reset(),t(v)})).catch((function(e){console.log(e)})).finally((function(){u(h,P),D(!1,r)}))})),f.addEventListener("submit",(function(e){e.preventDefault();var n,o=_.querySelector(".popup__button");D(!0,o),(n={personName:g.value,occupation:C.value},fetch("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:n.personName,about:n.occupation})}).then(s)).then((function(e){x.textContent=e.name,U.textContent=e.about,t(_)})).catch((function(e){console.log(e)})).finally((function(){u(_,P),D(!1,o)}))})),m.addEventListener("click",(function(){e(_),g.value=x.textContent,C.value=U.textContent})),y.addEventListener("click",(function(){e(v)})),S.forEach((function(e){e.addEventListener("mousedown",(function(n){(n.target.classList.contains("popup_is-opened")||n.target.classList.contains("popup__close"))&&t(e)}))})),w.addEventListener("click",(function(){e(A)})),E.addEventListener("submit",(function(e){e.preventDefault();var n,o=E.querySelector(".popup__button");D(!0,o),(n=T.value,fetch("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:n})}).then(s)).then((function(e){w.src=e.avatar,E.reset(),t(A)})).catch((function(e){console.log(e)})).finally((function(){u(_,P),D(!1,o)}))})),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(".popup__input")),o=e.querySelector(".popup__button");n.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?r(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,c,t),a(n,o,t)}))}))}(t,e)}))}(P)})();