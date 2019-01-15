import { shallow } from 'enzyme';
import React from 'react';

import { ThreadFetcher } from './ThreadFetcher';

const getThreadFetcher = props => shallow(<ThreadFetcher
    fetchThreads={jest.fn()}
    syncNewThreads={jest.fn()}
    threads={{ submissionThreads: [] }}
    {...props}
/>);

describe('ThreadFetcher', () => {
    it('fetches threads on mount', () => {
        const fetchThreads = jest.fn();
        getThreadFetcher({ fetchThreads });
        expect(fetchThreads).toHaveBeenCalled();
    });
});
