export const DIARY = "DIARY";

export const initializeTable = (connection) => {
  connection.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${DIARY} (id INTEGER PRIMARY KEY NOT NULL, emotion TEXT, message TEXT);`
    );
  });
};
