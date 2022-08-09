"use strict";

const ajaxSend = async (FormData) => {
  // функция отправки формы
  const fetchResp = await fetch("telegram.php", {
    //указываем обработчик формы
    method: "POST", // метод отправки
    body: FormData, // содержимое формы
  });
  if (!fetchResp.ok) {
    // если ответ с ошибкой, показать ошибку статус и текст
    throw new Error(
      `Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`
    );
  }
  return await fetchResp.text(); // если ок, возвращаем ответ сервера
};

const forms = document.querySelectorAll("form"); // находим все формы

forms.forEach((form) => {
  // делеаем перебор форм, лоя каждой формы дальше...
  form.addEventListener("submit", function (e) {
    // отслеживаем событие отправки
    e.preventDefault(); // отменяем стандартную отправку формы
    console.log(e.target);
    const formData = new FormData(this); // собираем все данные из формы

    ajaxSend(formData) // передаем данные из формы в обработчик
      .then((response) => {
        // если отправка успешная
        this.innerHTML = // окно с благодарностью
          "Спасибо, <br> ваша заявка получена. Я свяжусь с вами в ближайшее время";
        form.reset(); // очищаем поля формы
      })
      .catch((err) => console.error(err)); // если ошибка, выводим ошибку в консоль
  });
});
