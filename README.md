для корректной работы этого приложения, нужна переменная окружения,
которая хранит URL websocket сервера:

VITE_BACKEND_HOST_URL

для подгрузки переменной окружения я использую import.meta.env

import.meta.env.VITE_BACKEND_HOST_URL

# development

## gitflow git model

### messages concepts

для промежуточных коммитов использую месседж "update"

## hash tags system

для навигации по проекту с помощью поиска, использую хеш-теги с префиксом `#dev::`

### subject

#dev::question : описание вопроса
#dev::issue : описание
