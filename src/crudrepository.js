const AppError = require('./utils/appError'); // import this from your package's util folder

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.error('[CRUD][create] Error:', error.message);
      throw new AppError('Failed to create resource', 500);
    }
  }

  async get(id) {
    try {
      const result = await this.model.findById(id);
      if (!result) {
        throw new AppError(`Resource not found with id: ${id}`, 404);
      }
      return result;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.error('[CRUD][get] Error:', error.message);
      throw new AppError('Failed to fetch resource', 500);
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, { new: true });
      if (!result) {
        throw new AppError(`Resource not found to update with id: ${id}`, 404);
      }
      return result;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.error('[CRUD][update] Error:', error.message);
      throw new AppError('Failed to update resource', 500);
    }
  }

  async delete(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      if (!result) {
        throw new AppError(`Resource not found to delete with id: ${id}`, 404);
      }
      return result;
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.error('[CRUD][delete] Error:', error.message);
      throw new AppError('Failed to delete resource', 500);
    }
  }

  async getAll() {
    try {
      return await this.model.find({});
    } catch (error) {
      console.error('[CRUD][getAll] Error:', error.message);
      throw new AppError('Failed to fetch resources', 500);
    }
  }

  async insertMany(data) {
    try {
      return await this.model.insertMany(data);
    } catch (error) {
      console.error('[CRUD][insertMany] Error:', error.message);
      throw new AppError('Failed to insert multiple records', 500);
    }
  }

  async count(filter = {}) {
    try {
      return await this.model.countDocuments(filter);
    } catch (error) {
      console.error('[CRUD][count] Error:', error.message);
      throw new AppError('Failed to count documents', 500);
    }
  }

  async exists(filter = {}) {
    try {
      return await this.model.exists(filter);
    } catch (error) {
      console.error('[CRUD][exists] Error:', error.message);
      throw new AppError('Failed to check existence', 500);
    }
  }
}
module.exports = CrudRepository;
