INSERT INTO users (username, email, password_hash) VALUES
    ('admin', 'admin@example.com', 'hash-placeholder-1'),
    ('anna',  'anna@example.com',  'hash-placeholder-2'),
    ('jan',   'jan@example.com',   'hash-placeholder-3'),
    ('marta', 'marta@example.com', 'hash-placeholder-4'),
    ('piotr', 'piotr@example.com', 'hash-placeholder-5');

INSERT INTO tasks (title, description, status, user_id) VALUES
    ('Przygotować makietę',      'Ekran listy i formularza',            'done',        (SELECT id FROM users WHERE username = 'anna')),
    ('Wybrać paletę kolorów',    'Cztery kolory z kodami HEX',          'done',        (SELECT id FROM users WHERE username = 'anna')),
    ('Napisać dokumentację API', 'Opis endpointów /api/tasks',          'in_progress', (SELECT id FROM users WHERE username = 'jan')),
    ('Skonfigurować bazę',       'Skrypty SQL i kopia zapasowa',        'in_progress', (SELECT id FROM users WHERE username = 'admin')),
    ('Napisać testy',            'Testy dla endpointów',                'todo',        (SELECT id FROM users WHERE username = 'marta')),
    ('Dodać logowanie',          'Ekran logowania i sprawdzanie hasła', 'todo',        (SELECT id FROM users WHERE username = 'piotr'));

INSERT INTO comments (content, task_id, user_id) VALUES
    ('Makieta wygląda dobrze.',               1, 3),
    ('Sprawdź jeszcze kontrast kolorów.',     2, 4),
    ('Zacznę od endpointu GET.',              3, 3),
    ('Czy baza jest już gotowa?',             4, 2),
    ('Tak, skrypty są w katalogu database.',  4, 1),
    ('Potrzebuję dostępu do repozytorium.',   5, 5);
