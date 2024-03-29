create table rooms (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text not null,
    created_at date default now(),
    updated_at date default now()
);

INSERT INTO rooms (name) VALUES ('bedroom'), ('keyroom'), ('halloflevers'), ('room2'), ('greathall');

create table
    users (
        id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name text not null,
        score int not null,
        current_room int not null,
        firebase_uid text not null,
        profile_picture text default '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" shape-rendering="auto"><desc>"Thumbs" by "Florian Körner", licensed under "CC0 1.0". / Remix of the original. - Created with dicebear.com</desc><metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:RDF><cc:Work><dc:title>Thumbs</dc:title><dc:creator><cc:Agent rdf:about="https://dicebear.com"><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://dicebear.com</dc:source><cc:license rdf:resource="https://creativecommons.org/publicdomain/zero/1.0/" /></cc:Work></rdf:RDF></metadata><mask id="viewboxMask"><rect width="100" height="100" rx="0" ry="0" x="0" y="0" fill="#fff" /></mask><g mask="url(#viewboxMask)"><rect fill="#0a5b83" width="100" height="100" x="0" y="0" /><g transform="translate(2, 0) rotate(-4 50 70)"><path d="M95 53.33C95 29.4 74.85 10 50 10S5 29.4 5 53.33V140h90V53.33Z" fill="#1c799f"/><g transform="translate(29 33)"><g transform="translate(-9, -8) rotate(3 21 21)"><g transform="translate(0 1)"><path d="M8 8.36S8 4 12 4s4 4.36 4 4.36v2.91s0 .73-.67.73c-.66 0-.66-2.9-3.33-2.9S9.33 12 8.67 12C8 12 8 11.27 8 11.27v-2.9ZM26 8.36S26 4 30 4s4 4.36 4 4.36v2.91s0 .73-.67.73c-.66 0-.66-2.9-3.33-2.9S27.33 12 26.67 12c-.67 0-.67-.73-.67-.73v-2.9Z" fill="#ffffff"/></g><g transform="translate(6 27)"><path d="M15.2 3.84c0-.67-4.2-2-4.2-2.67 0-.66 7 .67 7 2.67S13.8 6.5 13.8 6.5s4.2.67 4.2 2.66c0 2-7 3.33-7 2.67 0-.67 4.2-2 4.2-2.67 0-.66-3.5-1.33-3.5-2.66s3.5-2 3.5-2.66Z" fill="#ffffff"/></g></g></g></g></g></svg>',
        created_at date default now(),
        updated_at date default now()
        FOREIGN KEY (room_id) REFERENCES rooms (id)
    );

create table
    questions (
        id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        topic VARCHAR(255) NOT NULL,
        chapter VARCHAR(255) NOT NULL,
        question TEXT NOT NULL,
        options TEXT NOT NULL,
        answers TEXT NOT NULL,
        feedback TEXT NOT NULL DEFAULT 'Incorrect',
    );

create table answers (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id int NOT NULL,
    question_id int NOT NULL,
    answer text NOT NULL,
    is_correct boolean NOT NULL,
    created_at date default now(),
    updated_at date default now(),
    UNIQUE (user_id, question_id, answer),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
);

create table levers_completed (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id int NOT NULL,
    lever_id int NOT NULL,
    created_at date default now(),
    updated_at date default now(),
    UNIQUE (user_id, lever_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

create table rooms_entered (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id int NOT NULL,
    room_id int NOT NULL,
    created_at date default now(),
    updated_at date default now(),
    UNIQUE (user_id, room_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms (id) ON DELETE CASCADE
);

create table levers_completed (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id int NOT NULL,
    lever_id int NOT NULL,
    created_at date default now(),
    updated_at date default now(),
    UNIQUE (user_id, lever_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

create table rooms (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text not null,
    created_at date default now(),
    updated_at date default now()
);

INSERT INTO rooms (name) VALUES ('bedroom'), ('keyroom'), ('halloflevers'), ('room2'), ('greathall');

create table rooms_entered (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id int NOT NULL,
    room_id int NOT NULL,
    created_at date default now(),
    updated_at date default now(),
    UNIQUE (user_id, room_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (room_id) REFERENCES rooms (id)
);