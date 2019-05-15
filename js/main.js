import React from 'react';
import ReactDOM from 'react-dom';

import ExampleWork from './example-work';

const myWork = [
  {
    "title": "Work Example",
    "href": "https://example.com",
    "desc": "Lorem ipsum dolor sit amet, eum no graece scripta voluptaria. Scripta legimus eam id. Te vel habeo intellegebat. Eu quod clita integre vim, aeterno detraxit dissentiunt et per.",
    "image": {
      "desc": "example screenshot of a project involving code",
      "src": "images/example1.png",
      "comment": ""
    }
  },
  {
    "title": "Work Example",
    "href": "https://example.com",
    "desc": "Lorem ipsum dolor sit amet, eum no graece scripta voluptaria. Scripta legimus eam id. Te vel habeo intellegebat. Eu quod clita integre vim, aeterno detraxit dissentiunt et per.",
    "image": {
      "desc": "example screenshot of a project involving chemistry",
      "src": "images/example2.png",
      "comment": `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
                  https://www.flickr.com/photos/ssoosay/4097410999`
    }
  }
];

ReactDOM.render(<ExampleWork work={myWork} />, document.getElementById("example-work"));
