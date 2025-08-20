'use strict'; // Подключаем строгий режим выполнения кода

// Создаем объект класса UserForm
const userForm = new UserForm();

// Обработчик формы авторизации
userForm.loginFormCallback = function(data) {
    // Выполняем запрос на сервер для авторизации
    ApiConnector.login(data, function(response) {
        console.log('Ответ сервера при авторизации:', response); // Смотрим ответ в консоли
        
        // Проверяем успешность запроса
        if (response.success) {
            // В случае успеха - обновляем страницу
            location.reload();
        } else {
            // В случае ошибки - выводим сообщение об ошибке
            userForm.setLoginErrorMessage(response.error || 'Ошибка авторизации');
        }
    });
};

// Обработчик формы регистрации
userForm.registerFormCallback = function(data) {
    // Выполняем запрос на сервер для регистрации
    ApiConnector.register(data, function(response) {
        console.log('Ответ сервера при регистрации:', response); // Смотрим ответ в консоли
        
        // Проверяем успешность запроса
        if (response.success) {
            // В случае успеха - обновляем страницу
            location.reload();
        } else {
            // В случае ошибки - выводим сообщение об ошибке
            userForm.setRegisterErrorMessage(response.error || 'Ошибка регистрации');
        }
    });
};