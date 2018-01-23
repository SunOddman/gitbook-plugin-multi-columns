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
    htmlStr = '<div class="class-multi-columns"> '
  } else {
    htmlStr = '</div>'
  }
  return htmlStr;
}

function multiColumnContent(isleft, block, columnName) {
  var htmlStr = '';
  var body = markdown.page(block.body).content;
  if (isleft) {
    htmlStr = `
                <div id="${columnName}" class="class-multi-columns">
                    <div class="column-left">
                      ${body}
                    </div>
                </div>
              `;
  } else {
    var container = this.createElement(columnName);
    var rightDiv = this.createElement('div');
    rightDiv.class = 'column-right';
    newNode.innerHTML = body;
    container.appendChild(rightDiv);
  }
  return htmlStr;
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
    left_column: {
      process: function (block) {
        multiColumnName = block.kwargs['name'];
        return multiColumnContent(true, block, multiColumnName);
      }
    },
    right_column: {
      process: function (block) {
        return multiColumnContent(false, block, multiColumnName);
      }
    }
  }

};
