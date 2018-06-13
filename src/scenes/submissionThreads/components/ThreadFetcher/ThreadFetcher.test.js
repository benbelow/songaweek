import { shallow } from 'enzyme';
import React from 'react';

import { ThreadFetcher } from './ThreadFetcher';

describe('ThreadFetcher', () => {
    it('fetches threads on mount', () => {
        const fetchThreads = jest.fn();
        shallow(<ThreadFetcher fetchThreads={fetchThreads} />);
        expect(fetchThreads).toHaveBeenCalled();
    })
});
