let Actions   = require('../../src/actions/blocks')
let Colonel   = require('../../src/Colonel')
let DOM       = require('react-dom')
let BlockMenu = require('../../src/components/BlockMenu')
let config    = require('./fixtures/colonelConfig')
let render    = TestUtils.renderIntoDocument

describe('Components - BlockMenu', function() {
  let app, menu;

  beforeEach(function(done) {
    app = new Colonel(config)

    app.start(function() {
      menu = React.createElement(BlockMenu, {
        app: app,
        block: app.state.blocks[0],
        onOpen: sinon.stub(),
        onExit: sinon.stub(),
        active: true
      })

      done()
    })
  })

  it ('calls the onOpen property when the handle is clicked', function() {
    let test = render(menu)
    TestUtils.Simulate.click(DOM.findDOMNode(test.refs.handle))
    menu.props.onOpen.should.have.been.called
  })

  it ('can add new menu items', function() {
    let test = render(React.cloneElement(menu, { items: [{ id: 'test', label: 'Test'}] }))
    test.refs.should.have.property('test')
  })

  it ('calls the destroy action', function() {
    let test  = render(menu)
    let block = test.props.block

    TestUtils.Simulate.click(DOM.findDOMNode(test.refs.destroy))

    app.state.blocks.should.not.include(block)
  })

  it ('moves a block up when Move Before is clicked', function() {
    let block = app.state.blocks.concat().pop()
    let test  = render(React.cloneElement(menu, { block }))

    TestUtils.Simulate.click(DOM.findDOMNode(test.refs.moveBefore))

    app.state.blocks[app.state.blocks.length - 2].should.equal(block)
  })

  it ('disables Move Before if the block is the first child', function() {
    let test = render(menu)
    test.refs.moveBefore.isDisabled().should.equal(true)
  })

  it ('moves a block down when Move After is clicked', function() {
    let block = app.state.blocks[0]
    let test  = render(React.cloneElement(menu, { block }))

    TestUtils.Simulate.click(DOM.findDOMNode(test.refs.moveAfter))

    app.state.blocks[3].should.equal(block)
  })

  it ('disables Move After if the block is the first child', function() {
    let block = app.state.blocks.concat().pop()
    let test  = render(React.cloneElement(menu, { block }))

    test.refs.moveAfter.isDisabled().should.equal(true)
  })
})
