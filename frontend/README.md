# Frontend

## Przeznaczenie

Frontend to ta część aplikacji, którą widzi i obsługuje użytkownik. Odpowiada za wyświetlanie listy zadań, formularze oraz komunikację z backendem. Sam nie przechowuje danych na stałe, tylko prosi API o ich pobranie lub zapisanie.

## Planowane widoki

- lista zadań z możliwością wyszukiwania i filtrowania,
- formularz dodawania nowego zadania,
- formularz edycji zadania,
- komunikaty o powodzeniu lub błędzie operacji.

## Technologie

- HTML do zbudowania struktury stron,
- CSS do nadania wyglądu i układu,
- JavaScript do obsługi kliknięć, formularzy i zapytań do API.

## Pomysły na wygląd i obsługę

- prosty, czytelny układ z dużą ilością wolnego miejsca,
- statusy zadań oznaczone różnymi kolorami, żeby były widoczne na pierwszy rzut oka,
- przyciski edycji i usuwania przy każdym zadaniu,
- pole wyszukiwania nad listą,
- układ dostosowany do telefonów i małych ekranów,
- potwierdzenie przed usunięciem zadania.

## Proponowana struktura

```text
frontend/
  css/          # arkusze stylów
  js/           # skrypty
  images/       # grafiki i ikony (planowane)
  index.html    # strona główna
```
