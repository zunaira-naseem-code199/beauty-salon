import GalleryImage from '../models/GalleryImage.js'
import { crudRouter } from './crud.js'

export default crudRouter(GalleryImage, ['url', 'caption', 'active'])
