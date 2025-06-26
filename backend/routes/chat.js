```javascript
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Remove: const auth = require('../middleware/auth');

// router.post('/message', auth, chatController.sendMessage);
// Change to:
router.post('/message', chatController.sendMessage);

module.exports = router;
```