INSERT INTO users (username, email, password_hash) VALUES
    ('admin', 'admin@example.com', 'hash-placeholder-1'),
    ('anna',  'anna@example.com',  'hash-placeholder-2'),
    ('jan',   'jan@example.com',   'hash-placeholder-3'),
    ('marta', 'marta@example.com', 'hash-placeholder-4'),
    ('piotr', 'piotr@example.com', 'hash-placeholder-5');

INSERT INTO tasks (title, description, status, user_id) VALUES
    ('Przygotować makietę',      'Ekran listy i formularza',            'done',        2),
    ('Wybrać paletę kolorów',    'Cztery kolory z kodami HEX',          'done',        2),
    ('Napisać dokumentację API', 'Opis endpointów /api/tasks',          'in_progress', 3),
    ('Skonfigurować bazę',       'Skrypty SQL i kopia zapasowa',        'in_progress', 1),
    ('Napisać testy',            'Testy dla endpointów',                'todo',        4),
    ('Dodać logowanie',          'Ekran logowania i sprawdzanie hasła', 'todo',        5);

INSERT INTO comments (content, task_id, user_id) VALUES
    ('Makieta wygląda dobrze.',               1, 3),
    ('Sprawdź jeszcze kontrast kolorów.',     2, 4),
    ('Zacznę od endpointu GET.',              3, 3),
    ('Czy baza jest już gotowa?',             4, 2),
    ('Tak, skrypty są w katalogu database.',  4, 1),
    ('Potrzebuję dostępu do repozytorium.',   5, 5);