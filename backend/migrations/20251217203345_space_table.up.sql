CREATE TYPE space_role_enum AS ENUM ('owner', 'admin', 'member');

CREATE TABLE IF NOT EXISTS spaces (
    id SERIAL PRIMARY KEY,
    space_name VARCHAR(40) NOT NULL CHECK (LENGTH(space_name) >= 6),
    space_description VARCHAR(255),
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS space_members (
    id SERIAL PRIMARY KEY,
    space_id INT NOT NULL REFERENCES spaces(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    username_in_space VARCHAR(255) CHECK (LENGTH(username_in_space) >= 6),
    space_role space_role_enum DEFAULT 'member',
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    space_id INT NOT NULL REFERENCES spaces(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    max_uses INT NOT NULL DEFAULT 1 CHECK (max_uses > 0),
    used_count INT NOT NULL DEFAULT 0 CHECK (used_count >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
