import React from 'react';
import { shallow } from 'enzyme';
import { SubmissionThreads } from './SubmissionThreads';

describe('SubmissionThreads', () => {
  it('renders all submission threads', () => {
    const threads = [{ url: '1' }, { url: '2' }];
    const wrapper = shallow(<SubmissionThreads submissionThreads={threads}/>);
    expect(wrapper.find('Connect(SubmissionThread)').length).toBe(threads.length);
  });
});
