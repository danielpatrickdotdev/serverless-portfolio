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

  it("Should contain one 'section' element", () => {
    expect(component.find('section').length).toEqual(1);
  });
  it("Should contain same number of children as work examples", () => {
    expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
  });
  it("Should allow the modal to open and close", () => {
    expect(component.instance().state.modalOpen).toBe(false);
    component.instance().openModal();
    expect(component.instance().state.modalOpen).toBe(true);
    component.instance().closeModal();
    expect(component.instance().state.modalOpen).toBe(false);
  });
});

describe("ExampleWorkBubble component", () => {
  const mockOpenModalFn = jest.fn();
  const component = shallow(<ExampleWorkBubble example={myWork[0]} openModal={mockOpenModalFn}/>);
  const images = component.find("img");

  it("Should contain a single img element", () => {
    expect(images.length).toEqual(1);
  });
  it("Should have image src set correctly", () => {
    expect(images.prop('src')).toEqual(myWork[0].image.src);
  });
  it("Should call the openModal handler when clicked", () => {
    expect(mockOpenModalFn).not.toHaveBeenCalled();
    component.find(".section__exampleWrapper").simulate("click");
    expect(mockOpenModalFn).toHaveBeenCalled();
  });
});
