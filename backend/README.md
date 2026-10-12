# Backend

## Przeznaczenie

Backend to serwerowa część aplikacji. Przyjmuje zapytania z frontendu, sprawdza poprawność danych, wykonuje logikę aplikacji i zapisuje lub odczytuje informacje z bazy danych. Dzięki temu frontend nie musi znać szczegółów działania bazy.

## Komunikacja z bazą danych

Backend łączy się z bazą PostgreSQL, w której przechowywane są zadania. Wszystkie operacje na danych (dodanie, odczyt, zmiana, usunięcie) przechodzą przez warstwę dostępu do danych, a frontend korzysta tylko z API.

## Planowane endpointy API

| Metoda | Adres | Działanie |
|---|---|---|
| GET | `/api/tasks` | pobranie listy zadań |
| POST | `/api/tasks` | dodanie nowego zadania |
| PUT | `/api/tasks/{id}` | edycja zadania o podanym id |
| DELETE | `/api/tasks/{id}` | usunięcie zadania o podanym id |

Dane będą wymieniane w formacie JSON.

## Proponowana struktura

```text
backend/
  Controllers/   # obsługa zapytań HTTP i endpointów
  Models/        # opis obiektów, np. zadania
  Services/      # logika aplikacji
  Data/          # dostęp do bazy danych
  Tests/         # testy
```
