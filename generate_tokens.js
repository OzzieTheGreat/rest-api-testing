const jwt = require('jsonwebtoken');
const SECRET = '17F5DDF52CFE6A9C5A434CBA4AE9DF5D52B45B36CB1C0E2F52AF743DF279B5A6'; 
const generateToken = (payload, secret, expiresIn = '20m') => {
    return jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: expiresIn
    });
};
// 1. User with ONLY 'user' role
const userPayload = { id: 101, username: 'tester_user', roles: ["user"] };
const userToken = generateToken(userPayload, SECRET);
console.log("--- 1. User Token (roles: [\"user\"]) ---");
console.log(userToken);

// 2. User with ONLY 'admin' role
const adminPayload = { id: 102, username: 'tester_admin', roles: ["admin"] };
const adminToken = generateToken(adminPayload, SECRET);
console.log("\n--- 2. Admin Token (roles: [\"admin\"]) ---");
console.log(adminToken);

// 3. User with BOTH 'user' and 'admin' roles
const superUserPayload = { id: 103, username: 'tester_super', roles: ["user", "admin"] };
const superUserToken = generateToken(superUserPayload, SECRET);
console.log("\n--- 3. Super User Token (roles: [\"user\", \"admin\"]) ---");
console.log(superUserToken);

// 4. Token signed with an INVALID secret (for 401 test)
const invalidSecretToken = generateToken(adminPayload, 'this_is_a_different_secret');
console.log("\n--- 4. Invalid Secret Token ---");
console.log(invalidSecretToken);

// 5. Token with NO 'roles' property (for isValid: false test)
const noRolesPayload = { id: 104, username: 'no_roles' };
const noRolesToken = generateToken(noRolesPayload, SECRET);
console.log("\n--- 5. No Roles Token (should fail validation) ---");
console.log(noRolesToken);

// 6. Expired Token (for 401 or hapi expiration error)
const expiredPayload = { id: 105, username: 'expired_user', roles: ["user"] };
const expiredToken = generateToken(expiredPayload, SECRET, '1s');
console.log("\n--- 6. Expired Token (wait 2 seconds before testing) ---");
console.log(expiredToken);

//node generate_tokens.js
