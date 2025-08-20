// Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

// Получение информации о пользователе
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function getExchangeRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

// Первоначальное получение курсов
getExchangeRates();

// Обновление курсов каждую минуту
setInterval(getExchangeRates, 60000);

// Операции с деньгами
const moneyManager = new MoneyManager();

// Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Баланс успешно пополнен');
    } else {
      moneyManager.setMessage(false, response.error || 'Ошибка пополнения баланса');
    }
  });
};

// Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Конвертация выполнена успешно');
    } else {
      moneyManager.setMessage(false, response.error || 'Ошибка конвертации');
    }
  });
};

// Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Перевод выполнен успешно');
    } else {
      moneyManager.setMessage(false, response.error || 'Ошибка перевода');
    }
  });
};

// Работа с избранным
const favoritesWidget = new FavoritesWidget();

// Запрос начального списка избранного
function updateFavoritesList() {
  ApiConnector.getFavorites((response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
  });
}

// Первоначальная загрузка избранного
updateFavoritesList();

// Добавление пользователя в избранное
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      updateFavoritesList();
      favoritesWidget.setMessage(true, 'Пользователь успешно добавлен в избранное');
    } else {
      favoritesWidget.setMessage(false, response.error || 'Ошибка добавления пользователя');
    }
  });
};

// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      updateFavoritesList();
      favoritesWidget.setMessage(true, 'Пользователь успешно удален из избранного');
    } else {
      favoritesWidget.setMessage(false, response.error || 'Ошибка удаления пользователя');
    }
  });
};