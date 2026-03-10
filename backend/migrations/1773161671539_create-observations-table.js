/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
  // Create the observations table
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
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
  // Drop the observations table on rollback
  pgm.dropTable("observations");
};
