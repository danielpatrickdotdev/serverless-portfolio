import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExampleWorkModal from '../js/example-work-modal';

const myExample = {
  "title": "Work Example",
  "href": "https://example.com",
  "desc": "Lorem ipsum dolor sit amet, eum no graece scripta voluptaria. Scripta legimus eam id. Te vel habeo intellegebat. Eu quod clita integre vim, aeterno detraxit dissentiunt et per.",
  "image": {
    "desc": "example screenshot of a project involving code",
    "src": "images/example1.png",
    "comment": ""
  }
};

Enzyme.configure({ adapter: new Adapter });

describe("ExampleWorkModal component", () => {
  const mockCloseModalFn = jest.fn();
  const component = shallow(<ExampleWorkModal example={myExample} open={false}/>);
  const openComponent = shallow(<ExampleWorkModal example={myExample} open={true} closeModal={mockCloseModalFn}/>);
  const anchors = component.find("a");

  it("Has exactly one anchor tag", () => {
    expect(anchors.length).toEqual(1);
  });

  it("Should link to our project", () => {
    expect(anchors.prop('href')).toEqual(myExample.href);
  });

  it("Should have have closed className if closed", () => {
    expect(component.find(".background--skyBlue").hasClass("modal--closed")).toBe(true);
  });

  it("Should have have open className if open", () => {
    expect(openComponent.find(".background--skyBlue").hasClass("modal--open")).toBe(true);
  });

  it("Should call the closeModal handler when X is clicked", () => {
    const classSelector = ".modal__closeButton";

    expect(mockCloseModalFn).not.toHaveBeenCalled();
    openComponent.find(classSelector).simulate("click");
    expect(mockCloseModalFn).toHaveBeenCalled();
  });
});
