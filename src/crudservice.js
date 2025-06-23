const AppError = require('./utils/appError');


class CrudService {
    constructor(repository, options = {}) {
        this.repository = repository;
        this.validators = options.validators || {};
    }

    async create(data) {
        try {
            if (this.validators.create) {
                const error = this.validators.create(data);
                if (error) throw new AppError(error.message, 422);
            }

            return await this.repository.create(data);
        } catch (error) {
            if (error instanceof AppError) throw error;
            console.error('[Service][create] Error:', error.message);
            throw new AppError('Something went wrong while creating resource', 500);
        }
    }

    async get(id) {
        try {
            return await this.repository.get(id);
        } catch (error) {
            if (error instanceof AppError) throw error;
            console.error('[Service][get] Error:', error.message);
            throw new AppError('Something went wrong while fetching resource', 500);
        }
    }

    async getAll() {
        try {
            return await this.repository.getAll();
        } catch (error) {
            console.error('[Service][getAll] Error:', error.message);
            throw new AppError('Something went wrong while fetching resources', 500);
        }
    }

    async update(id, data) {
        try {
            if (this.validators.update) {
                const error = this.validators.update(data);
                if (error) throw new AppError(error.message, 422);
            }

            return await this.repository.update(id, data);
        } catch (error) {
            if (error instanceof AppError) throw error;
            console.error('[Service][update] Error:', error.message);
            throw new AppError('Something went wrong while updating resource', 500);
        }
    }

    async delete(id) {
        try {
            return await this.repository.delete(id);
        } catch (error) {
            if (error instanceof AppError) throw error;
            console.error('[Service][delete] Error:', error.message);
            throw new AppError('Something went wrong while deleting resource', 500);
        }
    }

    async insertMany(data) {
        try {
            return await this.repository.insertMany(data);
        } catch (error) {
            console.error('[Service][insertMany] Error:', error.message);
            throw new AppError('Something went wrong while inserting data', 500);
        }
    }

    async count(filter = {}) {
        try {
            return await this.repository.count(filter);
        } catch (error) {
            console.error('[Service][count] Error:', error.message);
            throw new AppError('Something went wrong while counting documents', 500);
        }
    }

    async exists(filter = {}) {
        try {
            return await this.repository.exists(filter);
        } catch (error) {
            console.error('[Service][exists] Error:', error.message);
            throw new AppError('Something went wrong while checking existence', 500);
        }
    }
}
module.exports = CrudService;
