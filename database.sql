-- Иди
-- - id
-- ФИО
-- - FIO
-- Пики (точёные) /Пикчи
-- - Pic
-- Ступень образования
-- - lvl_ed
-- Контакты
-- - Contacts
-- Стаж (в виде даты начала работы, нужно вытаскивать запросом, который считает)
-- - Stazh
-- Школа
-- - School
-- Должность
-- - Dolzhnost
-- Образование
-- - Obrazovanie
-- Повышение квалификации
-- - Kvalific
-- Публикации
-- - Publications
-- Проекты (внеурочная деятельность)
-- - Projects
-- Достижения учеников
-- - Stud_Succ
-- Приложения
-- - Prilozh
-- Специализация
-- - Spec

create TABLE persons(
    id SERIAL PRIMARY KEY,
    FIO TEXT,
    Pic TEXT,
    lvl_ed TEXT,
    Contacts TEXT,
    Stazh TEXT,
    School TEXT,
    Dolzhnost TEXT,
    Obrazovanie TEXT,
    Kvalific TEXT,
    Publications TEXT,
    Projects TEXT,
    Stud_Succ TEXT,
    Prilozh TEXT,
    Spec TEXT
);
