# Task Manager (MansLoveInternetSystem)

## Opis projektu

Task Manager to internetowa aplikacja do zarządzania zadaniami. Pozwala zapisać, co jest do zrobienia, zmieniać stan wykonania poszczególnych zadań i szybko znaleźć to, czego aktualnie szukamy. Całość działa w przeglądarce, więc nie trzeba niczego instalować na komputerze użytkownika.

## Cel projektu

Projekt powstaje, aby w praktyce nauczyć się budowy pełnej aplikacji webowej: od interfejsu użytkownika, przez serwer i API, aż po bazę danych. Przy okazji ćwiczę pracę zespołową z Git i GitHub: osobne branche, pull requesty, code review oraz automatyczne sprawdzanie kodu w pipeline.

## Funkcjonalności

- dodawanie nowych zadań,
- edycja istniejących zadań,
- usuwanie zadań,
- zmiana statusu (np. do zrobienia, w trakcie, zrobione),
- wyszukiwanie zadań po nazwie,
- filtrowanie zadań według statusu.

## Technologie

| Warstwa | Technologia |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | C# (API REST) |
| Baza danych | PostgreSQL |
| Kontrola wersji | Git i GitHub |
| CI | GitHub Actions |

## Struktura projektu

```text
.github/workflows/   # pipeline GitHub Actions (CI)
frontend/            # interfejs użytkownika (css, js, index.html)
backend/             # API i logika aplikacji (planowane)
task-manager/        # katalog projektu aplikacji
database/            # skrypty i schemat bazy danych (planowane)
docs/                # dodatkowa dokumentacja (planowane)
tests/               # testy (planowane)
```

## Status projektu

- [x] Utworzenie repozytorium
- [x] Zabezpieczenie gałęzi `main`
- [x] Dodanie workflow GitHub Actions
- [x] Przygotowanie dokumentacji
- [ ] Przygotowanie frontendu
- [ ] Utworzenie API
- [ ] Połączenie z bazą danych

## Uruchomienie

Instrukcja uruchomienia zostanie dodana, gdy projekt będzie gotowy do pierwszego startu.
