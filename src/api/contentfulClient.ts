import { VITE_CONTENTFUL_TOKEN } from '../constants/keys.ts';
import * as contentful from 'contentful';

const client = contentful.createClient({
    space: 'p4f2iuzeb1al',
    environment: 'master',
    accessToken: VITE_CONTENTFUL_TOKEN,
});

export default client;
