# Crud-Kit

A minimal and extendable CRUD service and repository layer for Node.js + MongoDB (Mongoose) projects. Easily integrate standard CRUD operations, validation, error handling, and custom business logic with clean architecture principles.

---

##  Installation

```bash
npm install crud-kit
```

---

##  Features

*  Reusable Repository Layer
* Service Layer with Joi (or custom) Validation Support
* Built-in Error Handling via AppError
* Easily Extendable for Custom Logic
* Works with CommonJS and ES Modules

---

##  Project Structure Explained

###  Repository Folder

> This folder connects directly to the database (MongoDB via Mongoose). It contains methods like:

* `create(data)` → Save a new document
* `get(id)` → Fetch document by ID
* `update(id, data)` → Update document
* `delete(id)` → Delete document
* `getAll()` → Fetch all documents
* `insertMany()` → Insert bulk records
* `count(filter)` → Count documents
* `exists(filter)` → Check if any document exists

 **This layer deals only with raw DB queries.**

---

###  Service Folder

> This folder contains the business logic and connects the Repository to the outside world (like controllers).

* Handles validation (via Joi or any function)
* Uses `AppError` for consistent error responses
* You can override methods for custom behavior

 **This is the logic layer, and what your API routes should call.**

---

## 🛠️ Usage

### Step 1: Create Your Mongoose Model (example)

```js
// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
module.exports = mongoose.model('User', userSchema);
```

### Step 2: Create Repository

```js
// repositories/UserRepository.js
const CrudRepository = require('crud-kit').CrudRepository;
const User = require('../models/User');

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
}

module.exports = UserRepository;
```

### Step 3: Add Validation (optional but recommended)

```js
// validators/userValidator.js
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required()
});

module.exports = {
  create: (data) => userSchema.validate(data).error,
  update: (data) => userSchema.validate(data).error
};
```

### Step 4: Create Service

```js
// services/UserService.js
const CrudService = require('crud-kit').CrudService;
const UserRepository = require('../repositories/UserRepository');
const validators = require('../validators/userValidator');

class UserService extends CrudService {
  constructor() {
    super(new UserRepository(), { validators });
  }

  // You can override default methods if needed
  async get(id) {
    const user = await super.get(id);
    console.log('Fetched user:', user.name);
    return user;
  }
}

module.exports = UserService;
```

---

##  Importing in CommonJS or ESModules

```js
// CommonJS
const { CrudService, CrudRepository, AppError } = require('crud-kit');

// ES Modules
import { CrudService, CrudRepository, AppError } from 'crud-kit';
```

---

##  Error Handling

Use `AppError` to throw custom errors from anywhere in your service or repository:

```js
throw new AppError('User not found', 404);
```

In your global error handler middleware, you can catch and respond accordingly.

---

##  Advanced Usage

* Inject custom validators, middlewares or logger
* Create your own extended base classes if needed
* Works with async/await and try/catch

---

##  Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

##  License

MIT

---

##  Author

# Crud-Kit

A minimal and extendable CRUD service and repository layer for Node.js + MongoDB (Mongoose) projects. Easily integrate standard CRUD operations, validation, error handling, and custom business logic with clean architecture principles.

---

##  Installation

```bash
npm install crud-kit
```

---

##  Features

*  Reusable Repository Layer
*  Service Layer with Joi (or custom) Validation Support
*  Built-in Error Handling via AppError
*  Easily Extendable for Custom Logic
*  Pagination, Count, Exists, InsertMany supported
*  Works with CommonJS and ES Modules

---

##  Project Structure Explained

###  Repository Folder

> This folder connects directly to the database (MongoDB via Mongoose). It contains methods like:

* `create(data)` → Save a new document
* `get(id)` → Fetch document by ID
* `update(id, data)` → Update document
* `delete(id)` → Delete document
* `getAll()` → Fetch all documents
* `insertMany()` → Insert bulk records
* `count(filter)` → Count documents
* `exists(filter)` → Check if any document exists

 **This layer deals only with raw DB queries.**

---

###  Service Folder

> This folder contains the business logic and connects the Repository to the outside world (like controllers).

* Handles validation (via Joi or any function)
* Uses `AppError` for consistent error responses
* You can override methods for custom behavior

 **This is the logic layer, and what your API routes should call.**

---

##  Usage

### Step 1: Create Your Mongoose Model (example)

```js
// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
module.exports = mongoose.model('User', userSchema);
```

### Step 2: Create Repository

```js
// repositories/UserRepository.js
const CrudRepository = require('crud-kit').CrudRepository;
const User = require('../models/User');

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
}

module.exports = UserRepository;
```

### Step 3: Add Validation (optional but recommended)

```js
// validators/userValidator.js
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required()
});

module.exports = {
  create: (data) => userSchema.validate(data).error,
  update: (data) => userSchema.validate(data).error
};
```

### Step 4: Create Service

```js
// services/UserService.js
const CrudService = require('crud-kit').CrudService;
const UserRepository = require('../repositories/UserRepository');
const validators = require('../validators/userValidator');

class UserService extends CrudService {
  constructor() {
    super(new UserRepository(), { validators });
  }

  // You can override default methods if needed
  async get(id) {
    const user = await super.get(id);
    console.log('Fetched user:', user.name);
    return user;
  }
}

module.exports = UserService;
```

---

##  Importing in CommonJS or ESModules

```js
// CommonJS
const { CrudService, CrudRepository, AppError } = require('crud-kit');

// ES Modules
import { CrudService, CrudRepository, AppError } from 'crud-kit';
```

---

##  Error Handling

Use `AppError` to throw custom errors from anywhere in your service or repository:

```js
throw new AppError('User not found', 404);
```

In your global error handler middleware, you can catch and respond accordingly.

---

##  Advanced Usage

* Inject custom validators, middlewares or logger
* Create your own extended base classes if needed
* Works with async/await and try/catch

---

##  Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

##  License

MIT

---

## 🔗 Author

Created by [jineksh chovatiya](https://github.com/jineksh)
