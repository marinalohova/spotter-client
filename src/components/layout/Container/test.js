import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Container from '.';

describe('Component: Container', function () {
  const sandbox = sinon.createSandbox();
  let wrapper;

  afterEach(function () {
    wrapper.unmount();
    sandbox.restore();
  });

  it('renders correctly', function () {
    const elements = [
      'main'
    ];

    wrapper = shallow(<Container />);

    elements.forEach(element => expect(wrapper.find(element)).to.have.length(1));
  });
});
