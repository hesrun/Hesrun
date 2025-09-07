import { useEffect, useState } from 'react';
import client from '../api/contentfulClient.js';
import type { Document } from '@contentful/rich-text-types';

interface Includes {
    sys: {
        id: string;
    };
    fields: {
        file: {
            url: string;
        };
    };
}
interface Work {
    sys: {
        id: string;
    };
    fields: {
        description: Document;
        title: string;
        url: string;
        tech: [];
        image: {
            sys: {
                id: string;
            };
        };
    };
}
interface Works {
    items: Work[];
    includes: {
        Asset: Includes[];
    };
}

const useWorks = () => {
    const [data, setData] = useState<Works | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function getMyWorks() {
        try {
            setLoading(true);
            const response = await client.getEntries({
                content_type: 'myWork',
                order: 'fields.order',
            });
            setData(response);
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMyWorks();
    }, []);

    return { data, loading, error };
};

export default useWorks;
