import Service from '../models/Service.js'
import { crudRouter } from './crud.js'

export default crudRouter(Service, ['name', 'description', 'price', 'icon', 'image', 'active'])
