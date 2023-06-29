import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db'); 

export const setupDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, designation TEXT, date DATE, quantity INTEGER, image TEXT, delete TEXT, modified TEXT);",
      [],
      null,
      (_, error) => console.log(error)
    );
  });
}

export const savePhotoToDB = (designation, quantity, image) => {
  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO items (designation, date, quantity, image, delete, modified) values (?, ?, ?, ?, ?, ?);",
      [designation, new Date().toISOString(), quantity, image, 'No', new Date().toISOString()],
      null,
      (_, error) => console.log(error)
    );
  });
}

export const retrieveDataFromDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM items;",
      [],
      (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          console.log(`ID: ${row.id}, Designation: ${row.designation}, Date: ${row.date}, Quantity: ${row.quantity}`);
          // Utilisez `row.image` pour accéder à l'image en base64
        }
      },
      (_, error) => console.log(error)
    );
  });
}
