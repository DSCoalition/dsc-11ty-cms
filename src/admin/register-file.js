// import { File } from "./file-component.js"

export const RegisterFile = {

  // Internal id of the component
  id: 'file',

  // Visible label
  label: 'File',

  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'src',
      label: 'File',
      widget: 'file',
      media_library: {
        config: {
          multiple: false,
          choose_url: false,
          
        },
      },
    },
    {
      name: 'title',
      label: 'Link text',
      default: 'Click here to view file',
      widget: 'string',
    },
  ],

  // Pattern to identify a block as being an instance of this component
  pattern: /\[(.*)\]\(undefined\ "File"\)/,

  // Function to extract data elements from the regexp match
  fromBlock(match) {
    return {
      title: match[1],
      src: match[2],
    };
  },

  // Function to create a text block from an instance of this component
  toBlock(obj) {
    return `[${obj.title}](${obj.src} "File")`;
  },

  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview(obj) {
    return obj.title;
    // (
      // <File src={obj.src}>{obj.title}</File>
      // <a href={obj.src}>{(obj.title.length > 0 && obj.title !== 'undefined') ? obj.title : 'View file'}</a>
    //);
  },

};