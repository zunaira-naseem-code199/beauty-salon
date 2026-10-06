import Review from '../models/Review.js'
import { crudRouter } from './crud.js'

export default crudRouter(Review, ['name', 'event', 'text', 'rating', 'active'])
