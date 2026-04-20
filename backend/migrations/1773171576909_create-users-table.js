/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
const shorthands = undefined;

const up = (pgm) => {
  pgm.createTable("users", {
    id: "id", // serial primary key
    email: { type: "varchar(255)", notNull: false },
    name: { type: "varchar(255)", notNull: false },
    google_id: { type: "varchar(255)", notNull: false, unique: true },
    facebook_id: { type: "varchar(255)", notNull: false, unique: true },
    twitter_id: { type: "varchar(255)", notNull: false, unique: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("NOW()"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("NOW()"),
    },
  });
};

const down = (pgm) => {
  pgm.dropTable("users");
};

module.exports = { shorthands, up, down };
