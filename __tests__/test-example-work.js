import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work';


Enzyme.configure({ adapter: new Adapter });

const myWork = [
  {
    "title": "Work Example",
    "image": {
      "description": "example screenshot of a project involving code",
      "src": "images/example1.png",
      "comment": ""
    }
  },
  {
    "title": "Work Example",
    "image": {
      "description": "example screenshot of a project involving chemistry",
      "src": "images/example2.png",
      "comment": `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
                  https://www.flickr.com/photos/ssoosay/4097410999`
    }
  }
];

describe("ExampleWork component", () => {
  const component = shallow(<ExampleWork work={myWork} />);

  it("Should be a 'section' element", () => {
    expect(component.type()).toEqual('section');
  });
  it("Should contain same number of children as work examples", () => {
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
  });
});

describe("ExampleWorkBubble component", () => {
  const component = shallow(<ExampleWorkBubble example={myWork[0]} />);
  const images = component.find("img");

  it("Should contain a single img element", () => {
    expect(images.length).toEqual(1);
  });
  it("Should have image src set correctly", () => {
    expect(images.prop('src')).toEqual(myWork[0].image.src);
  });
});
