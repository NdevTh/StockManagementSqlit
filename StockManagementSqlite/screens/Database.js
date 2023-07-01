import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database.db');

export const setupDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY AUTOINCREMENT, designation TEXT, quantity INTEGER, image TEXT);",
      [],
      null,
      (_, error) => console.log(error)
    );
  });
}

export const savePhotoToDB = (designation, quantity, image) => {
  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO photos (designation, quantity, image) values (?, ?, ?);",
      [designation, quantity, image],
      null,
      (_, error) => console.log(error)
    );
  });
}

export const retrievePhotosFromDB = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM photos;",
      [],
      (_, { rows }) => {
        const photos = rows._array;
        callback(photos);
      },
      (_, error) => console.log(error)
    );
  });
}
