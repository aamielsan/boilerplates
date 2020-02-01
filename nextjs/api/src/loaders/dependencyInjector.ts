import { Container } from 'typedi';
import logger from '../lib/logger';

export default () => {
  Container.set('logger', logger);
};
