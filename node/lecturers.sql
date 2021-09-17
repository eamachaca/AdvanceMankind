CREATE TABLE states
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime
);
CREATE TABLE streets
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime
);
CREATE TABLE cities
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime
);
CREATE TABLE addresses
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    number     int      not null,
    city_id    int      not null,
    street_id  int      not null,
    state_id   int      not null,
    status     int      not null default 1,
    created_at datetime not null,
    updated_at datetime not null,
    deleted_at datetime,
    CONSTRAINT fk_street_address
        FOREIGN KEY (street_id)
            REFERENCES streets (id),
    CONSTRAINT fk_state_address
        FOREIGN KEY (state_id)
            REFERENCES states (id),
    CONSTRAINT fk_city_address
        FOREIGN KEY (city_id)
            REFERENCES cities (id)
);

CREATE TABLE lecturers
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    address_id   int          NOT NULL,
    phone_number VARCHAR(20)  NOT NULL,
    email        VARCHAR(50)  NOT NULL,
    birthdate    DATE         NOT NULL,
    created_at   datetime     not null,
    updated_at   datetime     not null,
    deleted_at   datetime,
    CONSTRAINT fk_address_lecturers
        FOREIGN KEY (address_id)
            REFERENCES addresses (id)
);

CREATE TABLE books
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime
);

CREATE TABLE lectures
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    book_id     int      not null,
    lecturer_id int      not null,
    created_at  datetime not null,
    updated_at  datetime not null,
    deleted_at  datetime,
    CONSTRAINT fk_lecturers_lectures
        FOREIGN KEY (lecturer_id)
            REFERENCES lecturers (id),
    CONSTRAINT fk_books_lectures
        FOREIGN KEY (book_id)
            REFERENCES books (id)
);

CREATE TABLE degrees
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    created_at datetime     not null,
    updated_at datetime     not null,
    deleted_at datetime
);

CREATE TABLE graduates
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    degree_id   int      not null,
    lecturer_id int      not null,
    created_at  datetime not null,
    updated_at  datetime not null,
    deleted_at  datetime,
    CONSTRAINT fk_lecturers_graduates
        FOREIGN KEY (lecturer_id)
            REFERENCES lecturers (id),
    CONSTRAINT fk_degrees_graduates
        FOREIGN KEY (degree_id)
            REFERENCES degrees (id)
);