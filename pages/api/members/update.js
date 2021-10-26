// Route is meant to add a new parameter to all members
// e.g, if req.body was { active: true }, then it add an active: true to all members in the db
const data = require("../../../backend/data/index.js");
module.exports = async (req, res) => {
  await data.initIfNotStarted();
  if (req.method === "POST") {
    const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
    if (authStatus) {
        res.setHeader('Content-Type', 'application/json');
        if (await data.util.checkIsEmptyBody(req.body)) {
            res.statusCode = 400;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                throw Error('body must be present in request.');
            })));
            return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
          return await data.members.updateAllMembers({$set: req.body });
        })));
    }
  }
  else {
    res.statusCode = 404;
    res.end();
}
};