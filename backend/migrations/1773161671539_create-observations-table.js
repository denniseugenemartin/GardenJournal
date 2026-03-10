/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
const shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
const up = (pgm) => {
  pgm.createTable("observations", {
    id: "id", // serial primary key
    species: { type: "varchar(100)", notNull: true },
    location: { type: "varchar(255)" },
    notes: { type: "text" },
    observed_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("NOW()"),
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("NOW()"),
    },
  });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
const down = (pgm) => {
  pgm.dropTable("observations");
};

// CommonJS export
module.exports = { shorthands, up, down };
