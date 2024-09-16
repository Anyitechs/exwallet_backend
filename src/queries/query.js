import {v4} from 'uuid';

export const saveData = async (db, did, vc) => {
    return new Promise((resolve, reject) => {
      const userId = v4();

      db.run(
        `INSERT INTO user_dids (userId, did, vc) VALUES (?, ?, ?)`,
        [userId, JSON.stringify(did), vc],
        function (err) {
          if (err) {
            console.error('Error saving user data:', err.message);
            reject(err); 
            return;
          }
          
          console.log('Rows affected:', this.changes);
          console.log(`User data saved with ID: ${userId}`);
  
          db.close((closeErr) => {
            if (closeErr) {
              console.error('Error closing the database:', closeErr.message);
              reject(closeErr); 
              return;
            }
  
            resolve(userId);
          });
        }
      );
    });
};
  

export const getData = (db, id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM user_dids WHERE userId = ?`;

        db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Error retrieving user data:', err.message);
            reject(err);
            return;
        }

        if (row) {
            let didData;
            try {
                didData = JSON.parse(row.did);
            } catch (parseError) {
                console.error('Error parsing DID data:', parseError);
                reject(new Error('Invalid DID data format'));
                return;
            }

            const data = {
                userId: row.userId,
                did: didData,
                vc: row.vc,
            };
            resolve(data);
        } else {
            resolve(null);
        }
        });

        db.close((closeErr) => {
            if (closeErr) {
                console.error('Error closing the database:', closeErr.message);
                reject(closeErr);
            }
        });
    });
};
  

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
    });
}