SELECT username, email
FROM users
ORDER BY username;

SELECT title, status
FROM tasks
WHERE status = 'done';

SELECT status, COUNT(*) AS liczba_zadan
FROM tasks
GROUP BY status
ORDER BY liczba_zadan DESC, status;

SELECT t.title, u.username
FROM tasks t
JOIN users u ON u.id = t.user_id;