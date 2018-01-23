var markdown = require('gitbook-markdown');
var cheerio = require('cheerio')

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

function multiColumnContent(isleft, block, columnName) {
  var htmlStr = '';
  var body = markdown.page(block.body).content;
  if (isleft) {
    htmlStr = '<div id="' + columnName + '" class="class-multi-columns"><div class="column-left">' + body + '</div></div>';
  } else {
    // var container = $('<div id=' + columnName + '></div>');
    var container = cheerio.load('<div id=' + columnName + '></div>');
    // var container = $("#" + columnName);
    container.appendChild('<div class="column-right">' + body + '</div >');
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
    make_columns: {
      blocks: ['left', 'right'],
      process: function (block) {
        return hehe(block);
      }
    },
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
