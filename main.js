(()=>{"use strict";function e(e){e.classList.add("popup_is-animated"),document.addEventListener("keydown",n),setTimeout((function(){e.classList.add("popup_is-opened")}),1)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function o(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),i=c.querySelector(".card__image"),s=c.querySelector(".card__title"),l=c.querySelector(".card__like-quantity");return i.src=e.link,i.alt=e.name,c.cardId=e._id,c.ownerId=e.owner._id,s.textContent=e.name,l.textContent=e.likes.length,e.likes.some((function(e){return e._id===t}))&&u.classList.add("card__like-button_is-active"),u.addEventListener("click",(function(t){o(t,e._id)})),i.addEventListener("click",n),e.owner._id===t?a.addEventListener("click",(function(t){r(t,e._id)})):(a.disabled=!0,a.classList.add("card__delete-button_disabled")),c}var r=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},c=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)}(t,n)},a=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){r(e,n,t),n.setCustomValidity("")}))},u={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-28",headers:{authorization:"87499e0d-719b-4d6f-84c9-6ddaa82af35b","Content-Type":"application/json"}};function i(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}var s=function(e){return fetch("".concat(u.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:u.headers}).then(i)},l=function(e){return fetch("".concat(u.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:u.headers}).then(i)},d=document.querySelector(".places__list"),p=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup__form"),f=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),y=document.querySelector(".popup_type_new-card"),v=document.forms["new-place"],h=document.querySelectorAll(".popup"),S=document.querySelector(".popup_type_image"),b=S.querySelector(".popup__image"),q=S.querySelector(".popup__caption"),L=_.querySelector(".popup__input_type_name"),g=_.querySelector(".popup__input_type_description"),C=document.querySelector(".popup__form__avatar"),E=(C.querySelector(".popup__input_type_url_avatar"),document.querySelector(".profile__info")),k=E.querySelector(".profile__title"),x=E.querySelector(".profile__description"),U=document.querySelector(".profile__image"),w=document.querySelector(".popup_type_avatar"),A=document.querySelector(".popup__input_type_url_avatar"),T="",N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function P(t){var n=t.target.closest(".card__image");e(S),b.src=n.src,b.alt=n.alt,q.textContent=n.alt}function D(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function B(e,t){var n=e.target.parentNode.querySelector(".card__like-quantity");(e.target.classList.contains("card__like-button_is-active")?l:s)(t).then((function(t){e.target.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}function O(e,t){var n;(n=t,fetch("".concat(u.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:u.headers}).then(i)).then((function(){e.target.closest(".places__item").remove()})).catch((function(e){console.log(e)}))}Promise.all([fetch("".concat(u.baseUrl,"/users/me"),{headers:u.headers}).then(i),fetch("".concat(u.baseUrl,"/cards"),{headers:u.headers}).then(i)]).then((function(e){var t=e[0];T=t._id,k.textContent=t.name,x.textContent=t.about;var n=e[1];U.style.backgroundImage="url(".concat(t.avatar,")"),n.forEach((function(e){!function(e,t,n){var r=o(e,t,n,B,O);d.append(r)}(e,T,P)}))})).catch((function(e){console.log(e)})),v.addEventListener("submit",(function(e){e.preventDefault();var n,r=v.querySelector(".popup__button"),c=v.querySelector(".popup__input_type_card-name").value,s=v.querySelector(".popup__input_type_url").value;D(!0,r),(n={name:c,link:s},fetch("".concat(u.baseUrl,"/cards"),{method:"POST",headers:u.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(i)).then((function(e){var n=o(e,T,P,B,O);d.prepend(n),v.reset(),t(y)})).catch((function(e){console.log(e)})).finally((function(){a(v,N),D(!1,r)}))})),_.addEventListener("submit",(function(e){e.preventDefault();var n,o=p.querySelector(".popup__button");D(!0,o),(n={personName:L.value,occupation:g.value},fetch("".concat(u.baseUrl,"/users/me"),{method:"PATCH",headers:u.headers,body:JSON.stringify({name:n.personName,about:n.occupation})}).then(i)).then((function(e){k.textContent=e.name,x.textContent=e.about,t(p)})).catch((function(e){console.log(e)})).finally((function(){a(p,N),D(!1,o)}))})),f.addEventListener("click",(function(){e(p),L.value=k.textContent,g.value=x.textContent})),m.addEventListener("click",(function(){e(y)})),h.forEach((function(e){e.addEventListener("mousedown",(function(n){(n.target.classList.contains("popup_is-opened")||n.target.classList.contains("popup__close"))&&t(e)}))})),U.addEventListener("click",(function(){e(w)})),C.addEventListener("submit",(function(e){e.preventDefault();var n,o=C.querySelector(".popup__button");D(!0,o),(n=A.value,fetch("".concat(u.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:u.headers,body:JSON.stringify({avatar:n})}).then(i)).then((function(e){U.src=e.avatar,C.reset(),t(w)})).catch((function(e){console.log(e)})).finally((function(){a(p,N),D(!1,o)}))})),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(".popup__input")),o=e.querySelector(".popup__button");n.forEach((function(a){a.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?r(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,a,t),c(n,o,t)}))}))}(t,e)}))}(N)})();