--utworzenie usera, uprawnienia.

CREATE ROLE userek LOGIN PASSWORD 'P@ssW0rD';
GRANT CONNECT ON DATABASE task_manager TO userek;
GRANT USAGE ON SCHEMA public TO userek;
GRANT SELECT ON tasks, users, comments TO userek;

--przełączenie się na usera
SET ROLE userek;
SELECT current_user;

--dodaję rekord (ma się nie udać)
INSERT INTO users (username, email, password_hash)
VALUES ('test', 'test@example.com', 'hash-placeholder-6');

--powrót na administratora
RESET ROLE;
SELECT current_user;

--wykonuje ten sam insert
INSERT INTO users (username, email, password_hash)
VALUES ('test', 'test@example.com', 'hash-placeholder-6');