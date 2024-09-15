import {v4} from 'uuid';

export const saveData = async (db, did, vc) => {
    const v4_ = v4();

    const userId = v4_;
    db.run(
        `INSERT INTO user_dids (userId, did, vc) VALUES (?, ?, ?)`,
        [
          userId,
          JSON.stringify(did),
          vc
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
                    did: JSON.parse(row.did),
                    vc: row.vc,
                };
                resolve(data);
            } else {
                resolve(null); 
            }
        });

        db.close();
    });
}

export const getAllUserData = (db) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM user_dids`;
        db.get(query, (err, row) => {
            if (err) {
            reject(err);
            } else if (row) {
                const data = {
                    userId: row.userId,
                    did: JSON.parse(row.did),
                    vc: row.vc,
                };
                resolve(data);
            } else {
                resolve(null); 
            }
        });

        db.close();
    });
}