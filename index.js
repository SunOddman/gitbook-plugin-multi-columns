var markdown = require('gitbook-markdown');
var COUNTER = 0;

function hehe(block) {
  var body = markdown.page(block.body).content;
  // var blocks = block.blocks.filter(function (subBlock) {
  //   return subBlock;
  // });
  var leftBody = markdown.page(block.blocks[0].body).content;
  var rightBody = markdown.page(block.blocks[1].body).content;

  return `
    ${body}
    <div class="class-multi-columns">
      <div class="column-left">
      ${leftBody}
      </div>
      <div class="column-right">
      ${rightBody}
      </div>
    </div>
  `;
}

function multiColumnContainer(isHeader) {
  var htmlStr = '';
  if (isHeader) {
    htmlStr = '<div class="class-multi-columns">'
  } else {
    htmlStr = '</div>'
  }
  return htmlStr;
}

function multiColumnContent(isleft, block) {
  var body = markdown.page(block.body).content;
  var className = isleft ? 'column-left' : 'column-right';

  return `
    <div class="${className}">
    ${body}
    </div>
  `;

}

module.exports = {

  book: {
    assets: './assets',
    css: [
      'multi_column.css'
    ],
    js: [

    ]
  },

  blocks: {
    start_multi_column: {
      process: function(block) {
        return multiColumnContainer(true);
      }
    },
    left_column: {
      process: function (block) {
        return multiColumnContent(true, block);
      }
    },
    right_column: {
      process: function (block) {
        return multiColumnContent(false, block);
      }
    },
    end_multi_column: {
      process: function (block) {
        return multiColumnContainer(false);
      }

    }
  }

};
