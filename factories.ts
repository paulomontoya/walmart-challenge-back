import { factory } from 'factory-girl';
import mongooseAdapter from './adapters/mongooseAdapter';

factory.setAdapter(mongooseAdapter);

import './services/products/products.factory';
