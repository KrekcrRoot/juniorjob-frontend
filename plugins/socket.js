export default (context, inject) => {
  // Предполагаем, что у вас есть способ получения токена аутентификации
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNjMDI5YjktZTFiMy00OWFiLWFhZGEtOTM1NWQwZjU2NzdjIiwiZW1haWwiOiJtb2RlckBiay5ydSIsInJvbGUiOiJtb2RlcmF0b3IiLCJpYXQiOjE3MTExMzAwMDksImV4cCI6MTcxMTEzMDkwOX0.CKLINCWEaiPQGPY_OlEH4p4SwXhUZxQ9yT4g9v-GyZY";

  // Добавляем токен как параметр запроса в URL
  const socket = new WebSocket(
    `wss://socket.junior-job.ru?token=${encodeURIComponent(token)}`
  );

  // Обработчик открытия соединения
  socket.onopen = function () {
    console.log("Соединение установлено.");
    // Можете здесь же отправлять сообщения, если требуется автоматическая отправка при подключении
  };

  // Остальной код остается без изменений...

  // Функция для отправки сообщений
  const sendMessage = (message) => {
    socket.send(JSON.stringify({ body: message }));
  };

  // Инжектируем socket и sendMessage в контекст Nuxt, чтобы их можно было использовать во всем приложении
  inject("socket", { sendMessage });
};
