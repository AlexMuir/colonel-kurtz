let FocusTrap = require('react-focus-trap')
let React     = require('react')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      className: 'col-dialog'
    }
  },

  render() {
    let { active, children, className, onExit } = this.props
    return React.createElement(FocusTrap, { active, className, onExit }, children)
  }

})