import {v4} from 'uuid';

export const saveData = async (db, data, vc) => {
    const v4_ = v4();

    const userId = v4_;
    db.run(
        `INSERT INTO user_dids (userId, vc, uri, document, metadata, privateKeys) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId,
          vc,
          data.uri,
          JSON.stringify(data.document),
          JSON.stringify(data.metadata),
          JSON.stringify(data.privateKeys),
        ],
        (err, rows) => {
          if (err) {
            console.error('Error saving user data:', err.message);
          } else {
            console.log('rows affected here: ', rows)
            console.log(`User data saved with ID: ${userId}`);
          }
        }
    );

    db.close()

    return userId;
}

export const getData = (db, id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM user_dids WHERE userId = ?`;
        db.get(query, [id], (err, row) => {
            if (err) {
            reject(err);
            } else if (row) {
                const data = {
                    userId: row.userId,
                    vc: row.vc,
                    uri: row.uri,
                    document: JSON.parse(row.document),
                    metadata: JSON.parse(row.metadata),
                    privateKeys: JSON.parse(row.privateKeys),
                };
                resolve(data);
            } else {
                resolve(null); 
            }
        });

        db.close();
    });
}