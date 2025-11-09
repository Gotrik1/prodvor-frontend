# Синхронизация API и генерация типов

Этот документ описывает процесс, с помощью которого фронтенд получает актуальную спецификацию API от бэкенда и генерирует на ее основе TypeScript-типы.

## 1. Принцип: Единый источник правды

-   **Источник правды** — это всегда **бэкенд**. Python-сервер отдает файл `openapi.json`, который является точным описанием всех его эндпоинтов.
-   **Фронтенд** является **потребителем** этой спецификации. Локальный файл `docs/OPENAPI_SPEC.json` является лишь копией и не должен редактироваться вручную.

## 2. Скрипт для синхронизации и генерации

Для автоматизации этого процесса используется следующий скрипт. Вы можете запустить его в терминале из корня проекта.

```bash
#!/bin/bash

# 1. Установите переменную с адресом вашего запущенного бэкенда
BACKEND_BASE_URL="http://localhost:5000"

# 2. Скачивание актуальной спецификации OpenAPI
echo "Downloading OpenAPI spec from $BACKEND_BASE_URL/openapi.json..."
curl -fsS "$BACKEND_BASE_URL/openapi.json" -o docs/OPENAPI_SPEC.json

# Проверка, что файл скачался
if [ ! -s docs/OPENAPI_SPEC.json ]; then
    echo "Error: Failed to download OpenAPI spec. Is the backend running at $BACKEND_BASE_URL?"
    exit 1
fi

echo "Spec downloaded successfully."

# 3. Генерация TypeScript-типов из спецификации
echo "Generating TypeScript types from the spec..."
npx openapi-typescript docs/OPENAPI_SPEC.json -o src/shared/api/types.generated.ts

echo "Types generated successfully at src/shared/api/types.generated.ts"

# 4. (Опционально) Генерация полного API-клиента, если вы используете openapi-generator-cli
# echo "Generating full API client..."
# npx @openapitools/openapi-generator-cli generate -i docs/OPENAPI_SPEC.json -g typescript-axios -o src/shared/api --skip-validate-spec

echo "API sync process complete."

```

## 3. Процесс для разработчика

1.  **Бэкенд-разработчик** вносит изменения в API.
2.  **Фронтенд-разработчик** перед началом работы, связанной с API, запускает скрипт, приведенный выше.
3.  **Скрипт** автоматически скачивает новую спецификацию и обновляет файлы с типами.
4.  **Готово!** Теперь во всем фронтенд-коде доступны новые типы и можно писать код, не опасаясь рассинхронизации.

## 4. CI/CD Проверка

В CI-пайплайн (`.github/workflows/deploy.yml`) добавлен шаг, который автоматически проверяет, соответствует ли локальный `docs/OPENAPI_SPEC.json` тому, что отдает бэкенд. Если есть расхождения, сборка упадет. Это гарантирует, что ни один коммит с устаревшей версией API не попадет в основную ветку.
