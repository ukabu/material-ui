!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.mui=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Typography = require('./styles/typography');
var IconButton = require('./icon-button');
var NavigationMenu = require('./svg-icons/navigation-menu');
var Paper = require('./paper');

var AppBar = React.createClass({displayName: "AppBar",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    onLeftIconButtonTouchTap: React.PropTypes.func,
    onRightIconButtonTouchTap: React.PropTypes.func,
    showMenuIconButton: React.PropTypes.bool,
    iconClassNameLeft: React.PropTypes.string,
    iconClassNameRight: React.PropTypes.string,
    iconElementLeft: React.PropTypes.element,
    iconElementRight: React.PropTypes.element,
    title : React.PropTypes.node,
    zDepth: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    }
  },

  componentDidMount: function() {
    if (process.env.NODE_ENV !== 'production' && 
       (this.props.iconElementLeft && this.props.iconClassNameLeft)) {
        var warning = 'Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' +
                      'defined. Please use one or the other.';
        console.warn(warning);
    }
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  getThemeVariables: function() {
    return this.context.theme.component.appBar;
  },

  getStyles: function(){
    var iconButtonSize = this.context.theme.component.button.iconButtonSize;
    var styles = {
      root: {
        zIndex: 5,
        width: '100%',
        minHeight: this.getSpacing().desktopKeylineIncrement,
        backgroundColor: this.getThemeVariables().color
      },
      title: {
        float: 'left',
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: '24px',
        fontWeight: Typography.fontWeightNormal,
        color: this.getThemeVariables().textColor,
        lineHeight: this.getSpacing().desktopKeylineIncrement + 'px'
      },
      iconButton: {
        style: {
          marginTop: (this.getThemeVariables().height - iconButtonSize) / 2,
          float: 'left',
          marginRight: 8,
          marginLeft: -16
        },
        iconStyle: {
          fill: this.getThemeVariables().textColor,
          color: this.getThemeVariables().textColor
        }
      },
      paper: {
        paddingLeft: this.getSpacing().desktopGutter,
        paddingRight: this.getSpacing().desktopGutter
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      this.props,onTouchTap=$__0.onTouchTap,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onTouchTap:1});
    var styles = this.getStyles();

    var title, menuElementLeft, menuElementRight;
    var iconRightStyle = this.mergeAndPrefix(styles.iconButton.style, {
      float: 'right',
      marginRight: -16,
      marginLeft: 8
    });

    if (this.props.title) {
      // If the title is a string, wrap in an h1 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        React.createElement("h1", {style: this.mergeAndPrefix(styles.title)}, this.props.title) :
        this.props.title;
    }

    if (this.props.showMenuIconButton) {
      if (this.props.iconElementLeft) {
        menuElementLeft = (
          React.createElement("div", {style: styles.iconButton.style}, 
            this.props.iconElementLeft
          )
        );
      } else {
        var child = (this.props.iconClassNameLeft) ? '' : React.createElement(NavigationMenu, {style: this.mergeAndPrefix(styles.iconButton.iconStyle)});
        menuElementLeft = (
          React.createElement(IconButton, {
            style: this.mergeAndPrefix(styles.iconButton.style), 
            iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle), 
            iconClassName: this.props.iconClassNameLeft, 
            onTouchTap: this._onLeftIconButtonTouchTap}, 
              child
          )
        );
      }

      if (this.props.iconElementRight) {
        menuElementRight = (
          React.createElement("div", {style: iconRightStyle}, 
            this.props.iconElementRight
          )
        );
      } else if (this.props.iconClassNameRight) {
        menuElementRight = (
          React.createElement(IconButton, {
            style: iconRightStyle, 
            iconStyle: this.mergeAndPrefix(styles.iconButton.iconStyle), 
            iconClassName: this.props.iconClassNameRight, 
            onTouchTap: this._onRightIconButtonTouchTap}
          )
        );
      }
    }

    return (
      React.createElement(Paper, {
        rounded: false, 
        className: this.props.className, 
        style: this.mergeAndPrefix(styles.root, this.props.style), 
        innerStyle: this.mergeAndPrefix(styles.paper), 
        zDepth: this.props.zDepth}, 
          menuElementLeft, 
          title, 
          menuElementRight
      )
    );
  },

  _onLeftIconButtonTouchTap: function(e) {
    if (this.props.onLeftIconButtonTouchTap) this.props.onLeftIconButtonTouchTap(e);
  },

  _onRightIconButtonTouchTap: function(e) {
    if (this.props.onRightIconButtonTouchTap) this.props.onRightIconButtonTouchTap(e);
  }

});

module.exports = AppBar;

}).call(this,require('_process'))
},{"./icon-button":23,"./mixins/style-propable":32,"./paper":35,"./styles/typography":51,"./svg-icons/navigation-menu":56,"_process":93,"react":undefined}],2:[function(require,module,exports){
var React = require('react');

var AppCanvas = React.createClass({displayName: "AppCanvas",
  
  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    predefinedLayout: React.PropTypes.number
  },

  render: function() {

    var styles = {
      height: '100%',
      backgroundColor: this.context.theme.palette.canvasColor,
      WebkitFontSmoothing: 'antialiased'
    };

    var stylesAppBar = {
      position: 'fixed', 
      height: this.context.theme.component.appBar.height
    };

    var newChildren = React.Children.map(this.props.children, function(currentChild) {
      switch (currentChild.type.displayName) {
        case 'AppBar' : 
          return React.cloneElement(currentChild, {style: stylesAppBar});
        default:
          return currentChild;
      }
    }, this);

    return (
      React.createElement("div", {style: styles}, 
        newChildren
      )
    );
  }

});

module.exports = AppCanvas;

},{"react":undefined}],3:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var AutoPrefix = require('./styles/auto-prefix');

/**  
 *  BeforeAfterWrapper
 *    An alternative for the ::before and ::after css pseudo-elements for 
 *    components whose styles are defined in javascript instead of css.
 *
 *  Usage: For the element that we want to apply before and after elements to,
 *    wrap its children with BeforeAfterWrapper. For example:
 *
 *                                            <Paper>
 *  <Paper>                                     <div> // See notice
 *    <BeforeAfterWrapper>        renders         <div/> // before element
 *      [children of paper]       ------>         [children of paper]
 *    </BeforeAfterWrapper>                       <div/> // after element
 *  </Paper>                                    </div>
 *                                            </Paper>
 *
 *  Notice: Notice that this div bundles together our elements. If the element 
 *    that we want to apply before and after elements is a HTML tag (i.e. a 
 *    div, p, or button tag), we can avoid this extra nesting by passing using 
 *    the BeforeAfterWrapper in place of said tag like so:
 *
 *  <p>
 *    <BeforeAfterWrapper>   do this instead   <BeforeAfterWrapper elementType='p'>
 *      [children of p]          ------>         [children of p]
 *    </BeforeAfterWrapper>                    </BeforeAfterWrapper> 
 *  </p>
 *
 *  BeforeAfterWrapper features spread functionality. This means that we can 
 *  pass HTML tag properties directly into the BeforeAfterWrapper tag.
 *
 *  When using BeforeAfterWrapper, ensure that the parent of the beforeElement 
 *  and afterElement have a defined style position.
 */  

var BeforeAfterWrapper = React.createClass({displayName: "BeforeAfterWrapper",

  mixins: [StylePropable],

  propTypes: {
    beforeStyle: React.PropTypes.object,
    afterStyle: React.PropTypes.object,
    beforeElementType: React.PropTypes.string,
    afterElementType: React.PropTypes.string,
    elementType: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      beforeElementType: 'div',
      afterElementType: 'div',
      elementType: 'div',
    }
  },

  render: function() {

    var $__0=
      
      
      
      
      
      
      this.props,beforeStyle=$__0.beforeStyle,afterStyle=$__0.afterStyle,beforeElementType=$__0.beforeElementType,afterElementType=$__0.afterElementType,elementType=$__0.elementType,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{beforeStyle:1,afterStyle:1,beforeElementType:1,afterElementType:1,elementType:1});

    var beforeElement, afterElement;
    
    beforeStyle = AutoPrefix.all({boxSizing: 'border-box'});
    afterStyle = AutoPrefix.all({boxSizing: 'border-box'});

    if (this.props.beforeStyle) beforeElement = 
      React.createElement(  this.props.beforeElementType, 
                            {style: this.mergeAndPrefix(beforeStyle, this.props.beforeStyle), 
                            key: "::before"}  );
    if (this.props.afterStyle) afterElement = 
      React.createElement(  this.props.afterElementType, 
                            {style: this.mergeAndPrefix(afterStyle, this.props.afterStyle), 
                            key: "::after"}   );

    var children = [beforeElement, this.props.children, afterElement];
    
    var props = other;
    props.style = this.props.style;

    return React.createElement(this.props.elementType, props, children);
  }

});

module.exports = BeforeAfterWrapper;
},{"./mixins/style-propable":32,"./styles/auto-prefix":44,"react":undefined}],4:[function(require,module,exports){
var React = require('react');
var EnhancedSwitch = require('./enhanced-switch');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var CheckboxOutline = require('./svg-icons/toggle-check-box-outline-blank');
var CheckboxChecked = require('./svg-icons/toggle-check-box-checked');

var Checkbox = React.createClass({displayName: "Checkbox",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    iconStyle: React.PropTypes.object,
    onCheck: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      switched: 
        this.props.checked ||
        this.props.defaultChecked || 
        (this.props.valueLink && this.props.valueLink.value) || 
        false,
    }
  },

  getTheme: function() {
    return this.context.theme.component.checkbox;
  },

  getStyles: function() {
    var checkboxSize = 24;
    var styles = {
      icon: {
          height: checkboxSize,
          width: checkboxSize,
      },
      check: {
          position: 'absolute',
          opacity: 0, 
          transform: 'scale(0)',
          transitionOrigin: '50% 50%',
          transition: Transitions.easeOut('450ms', 'opacity', '0ms') + ', ' + 
                      Transitions.easeOut('0ms', 'transform', '450ms'),
          fill: this.getTheme().checkedColor   
      },
      box: {
          position: 'absolute',
          opacity: 1,
          fill: this.getTheme().boxColor,          
          transition: Transitions.easeOut('2s', null, '200ms') 
      },
      checkWhenSwitched: {
        opacity: 1,
        transform: 'scale(1)',
        transition: Transitions.easeOut('0ms', 'opacity', '0ms') + ', ' + 
                    Transitions.easeOut('800ms', 'transform', '0ms')
      },
      boxWhenSwitched: {
        transition: Transitions.easeOut('100ms', null, '0ms'),
        fill: this.getTheme().checkedColor
      },
      checkWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      boxWhenDisabled: {
        fill: this.getTheme().disabledColor
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      this.props,onCheck=$__0.onCheck,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onCheck:1});

    var styles = this.getStyles();
    var boxStyles = 
      this.mergeAndPrefix(
        styles.box,
        this.state.switched && styles.boxWhenSwitched,
        this.props.iconStyle,
        this.props.disabled && styles.boxWhenDisabled);
    var checkStyles = 
      this.mergeAndPrefix(
        styles.check,
        this.state.switched && styles.checkWhenSwitched,
        this.props.iconStyle,
        this.props.disabled && styles.checkWhenDisabled);

    var checkboxElement = (
      React.createElement("div", null, 
        React.createElement(CheckboxOutline, {style: boxStyles}), 
        React.createElement(CheckboxChecked, {style: checkStyles})
      )
    );

    var rippleColor = this.state.switched ? checkStyles.fill : boxStyles.fill;

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switched: this.state.switched,
      switchElement: checkboxElement,
      rippleColor: rippleColor,
      iconStyle: styles.icon,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultChecked,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
    };

    return (
      React.createElement(EnhancedSwitch, React.__spread({},  
        other, 
        enhancedSwitchProps))
    );
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  _handleCheck: function(e, isInputChecked) {
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  },

  _handleStateChange: function(newSwitched) {
    this.setState({switched: newSwitched});
  }

});

module.exports = Checkbox;

},{"./enhanced-switch":18,"./mixins/style-propable":32,"./styles/transitions":50,"./svg-icons/toggle-check-box-checked":57,"./svg-icons/toggle-check-box-outline-blank":58,"react":undefined}],5:[function(require,module,exports){
var React = require('react');
var BeforeAfterWrapper = require('./before-after-wrapper');

var ClearFix = React.createClass({displayName: "ClearFix",
  
  render: function() {

    var $__0=
      
      
      this.props,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{style:1});

    var before = function() { 
      return {
        content: "' '",
        display: 'table'
      }
    }

    var after = before();
    after.clear = 'both';

    return (
      React.createElement(BeforeAfterWrapper, React.__spread({},  
        other, 
        {beforeStyle: before(), 
        afterStyle: after, 
        style: this.props.style}), 
          this.props.children
      )
    );
  }
});

module.exports = ClearFix;

},{"./before-after-wrapper":3,"react":undefined}],6:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors');
var DateTime = require('../utils/date-time');
var DayButton = require('./day-button');
var ClearFix = require('../clearfix');

var CalendarMonth = React.createClass({displayName: "CalendarMonth",

  mixins: [StylePropable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    autoOk: React.PropTypes.bool
  },

  render: function() {
    var styles = {
      lineHeight: '32px',
      textAlign: 'center',
      padding: '8px 14px 0 14px',
    };

    return (
      React.createElement("div", {style: styles}, 
        this._getWeekElements()
      )
    );
  },

  _getWeekElements: function() {
    var weekArray = DateTime.getWeekArray(this.props.displayDate);

    return weekArray.map(function(week, i) {
      return (
        React.createElement(ClearFix, {key: i}, 
          this._getDayElements(week)
        )
      );
    }, this);
  },
  _isDisabled: function(day){
    var minDate = this.props.minDate;
    var maxDate = this.props.maxDate;

    if(minDate != null && day < minDate){
      return true;
    }

    if(maxDate != null && day > maxDate){
      return true;
    }

    return false;
  },
  _getDayElements: function(week) {
    return week.map(function(day, i) {
      var selected = DateTime.isEqualDate(this.props.selectedDate, day);
      var disabled = this._isDisabled(day);
      return (
        React.createElement(DayButton, {
          key: i, 
          date: day, 
          disabled: disabled, 
          onTouchTap: this._handleDayTouchTap, 
          selected: selected})
      );
    }, this);
  },

  _handleDayTouchTap: function(e, date) {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  }

});

module.exports = CalendarMonth;
},{"../clearfix":5,"../mixins/style-propable":32,"../styles/colors":45,"../utils/date-time":85,"./day-button":12,"react":undefined}],7:[function(require,module,exports){
var React = require('react');
var DateTime = require('../utils/date-time');
var IconButton = require('../icon-button');
var NavigationChevronLeft = require('../svg-icons/navigation-chevron-left');
var NavigationChevronRight = require('../svg-icons/navigation-chevron-right');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var CalendarToolbar = React.createClass({displayName: "CalendarToolbar",

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onLeftTouchTap: React.PropTypes.func,
    onRightTouchTap: React.PropTypes.func,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object
  },

  getDefaultProps: function () {
      return {
        maxDate: null,
        minDate: null
      };
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },
  _isDisabled: function(direction){
    
    var date = this.props.displayDate;
    var minDate = this.props.minDate;
    var maxDate = this.props.maxDate;

    if(direction == "left" && minDate){      
      if(date.getFullYear() < minDate.getFullYear()) return true;
      if(date.getFullYear() == minDate.getFullYear()){
        return date.getMonth() <= minDate.getMonth();
      }
    }else if(direction == "right" && maxDate){
      if(date.getFullYear() > maxDate.getFullYear()) return true;
      if(date.getFullYear() == maxDate.getFullYear()){
        return date.getMonth() >= maxDate.getMonth();
      }
    }

    return false;
  },
  render: function() {
    var month = DateTime.getFullMonth(this.props.displayDate);
    var year = this.props.displayDate.getFullYear();
    var styles = {
      root: {
        height: '48px',
        position: 'relative'
      },

      buttonLeft: {
        position: 'absolute',
        left: '0px',
        top: '0px'
      },

      buttonRight: {
        position: 'absolute',
        right: '0px',
        top: '0px'
      },

      title: {
        position: 'absolute',
        top: '17px',
        lineHeight: '14px',
        fontSize: '14px',
        height: '14px',
        width: '100%',
        fontWeight: '500',
        textAlign: 'center',
      }
    };
    var disableLeft = this._isDisabled("left");
    var disableRight = this._isDisabled("right");

    return (
      React.createElement("div", {style: styles.root}, 

        React.createElement(SlideInTransitionGroup, {
          style: styles.title, 
          direction: this.state.transitionDirection}, 
          React.createElement("div", {key: month + '_' + year}, month, " ", year)
        ), 

        React.createElement(IconButton, {
          style: styles.buttonLeft, 
          disabled: disableLeft, 
          onTouchTap: this.props.onLeftTouchTap}, 
            React.createElement(NavigationChevronLeft, null)
        ), 

        React.createElement(IconButton, {
          style: styles.buttonRight, 
          disabled: disableRight, 
          onTouchTap: this.props.onRightTouchTap}, 
            React.createElement(NavigationChevronRight, null)
        )

      )
    );
  }

});

module.exports = CalendarToolbar;

},{"../icon-button":23,"../svg-icons/navigation-chevron-left":54,"../svg-icons/navigation-chevron-right":55,"../transition-groups/slide-in":82,"../utils/date-time":85,"react":undefined}],8:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var DateTime = require('../utils/date-time');
var KeyCode = require('../utils/key-code');
var Transitions = require('../styles/transitions');
var CalendarMonth = require('./calendar-month');
var CalendarToolbar = require('./calendar-toolbar');
var DateDisplay = require('./date-display');
var SlideInTransitionGroup = require('../transition-groups/slide-in');
var ClearFix = require('../clearfix');

var Calendar = React.createClass({displayName: "Calendar",

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    isActive: React.PropTypes.bool,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onSelectedDate: React.PropTypes.func
  },

  windowListeners: {
    'keydown': '_handleWindowKeyDown'
  },

  getDefaultProps: function() {
    return {
      initialDate: new Date(),
      maxDate: null,
      minDate: null
    };
  },

  getInitialState: function() {
    return {
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      var d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d
      });
    }
  },

  render: function() {
    var weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    var isLandscape = this.props.mode === 'landscape';

    var styles = {
      root: {
        fontSize: '12px'
      },
      calendarContainer: {
        width: isLandscape ? '280px' : '100%',
        height: weekCount === 5 ? '268px' :
          weekCount === 6 ? '308px' : '228px',
        float: isLandscape ? 'right' : 'none',
        transition: Transitions.easeOut('150ms', 'height')
      },
      dateDisplay: {
        width: isLandscape ? '280px' : '100%',
        height: '100%',
        float: isLandscape ? 'left' : 'none'
      },
      weekTitle: {
        padding: '0 14px',
        lineHeight: '12px',
        opacity: '0.5',
        height: '12px',
        fontWeight: '500',
        margin: 0
      },
      weekTitleDay: {
        listStyle: 'none',
        float: 'left',
        width: '32px',
        textAlign: 'center',
        margin: '0 2px'
      }
    };

    return (
      React.createElement(ClearFix, {style: this.mergeAndPrefix(styles.root)}, 

        React.createElement(DateDisplay, {
          style: styles.dateDisplay, 
          selectedDate: this.state.selectedDate, 
          mode: this.props.mode, 
          weekCount: weekCount}), 

        React.createElement("div", {style: styles.calendarContainer}, 
          React.createElement(CalendarToolbar, {
            minDate: this.props.minDate, 
            maxDate: this.props.maxDate, 
            displayDate: this.state.displayDate, 
            onLeftTouchTap: this._handleLeftTouchTap, 
            onRightTouchTap: this._handleRightTouchTap}), 

          React.createElement(ClearFix, {
            elementType: "ul", 
            style: styles.weekTitle}, 
            React.createElement("li", {style: styles.weekTitleDay}, "S"), 
            React.createElement("li", {style: styles.weekTitleDay}, "M"), 
            React.createElement("li", {style: styles.weekTitleDay}, "T"), 
            React.createElement("li", {style: styles.weekTitleDay}, "W"), 
            React.createElement("li", {style: styles.weekTitleDay}, "T"), 
            React.createElement("li", {style: styles.weekTitleDay}, "F"), 
            React.createElement("li", {style: styles.weekTitleDay}, "S")
          ), 

          React.createElement(SlideInTransitionGroup, {
            direction: this.state.transitionDirection}, 
            React.createElement(CalendarMonth, {
              minDate: this.props.minDate, 
              maxDate: this.props.maxDate, 
              key: this.state.displayDate.toDateString(), 
              displayDate: this.state.displayDate, 
              onDayTouchTap: this._handleDayTouchTap, 
              selectedDate: this.state.selectedDate})
          )
        )
      )
    );
  },

  getSelectedDate: function() {
    return this.state.selectedDate;
  },

  _addDisplayDate: function(m) {
    var newDisplayDate = DateTime.clone(this.state.displayDate);
    newDisplayDate.setMonth(newDisplayDate.getMonth() + m);
    this._setDisplayDate(newDisplayDate);
  },

  _addSelectedDays: function(days) {
    this._setSelectedDate(DateTime.addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths: function(months) {
    this._setSelectedDate(DateTime.addMonths(this.state.selectedDate, months));
  },

  _setDisplayDate: function(d, newSelectedDate) {
    var newDisplayDate = DateTime.getFirstDayOfMonth(d);
    var direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate
      });
    }
  },

  _setSelectedDate: function(d) {
    var newDisplayDate = DateTime.getFirstDayOfMonth(d);
    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, d);
    } else {
      this.setState({
        selectedDate: d
      });
    }
    if(this.props.onSelectedDate) this.props.onSelectedDate(d);
  },

  _handleDayTouchTap: function(e, date) {
    this._setSelectedDate(date);
  },

  _handleLeftTouchTap: function() {
    this._addDisplayDate(-1);
  },

  _handleRightTouchTap: function() {
    this._addDisplayDate(1);
  },

  _handleWindowKeyDown: function(e) {
    var newSelectedDate;

    if (this.props.isActive) {

      switch (e.keyCode) {

        case KeyCode.UP:
          if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-7);
          }
          break;

        case KeyCode.DOWN:
          if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(7);
          }
          break;

        case KeyCode.RIGHT:
          if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(1);
          }
          break;

        case KeyCode.LEFT:
          if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-1);
          }
          break;

      }

    } 
  }

});

module.exports = Calendar;
},{"../clearfix":5,"../mixins/style-propable":32,"../mixins/window-listenable":33,"../styles/transitions":50,"../transition-groups/slide-in":82,"../utils/date-time":85,"../utils/key-code":89,"./calendar-month":6,"./calendar-toolbar":7,"./date-display":9,"react":undefined}],9:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var DateTime = require('../utils/date-time');
var Transitions = require('../styles/transitions');
var AutoPrefix = require('../styles/auto-prefix');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var DateDisplay = React.createClass({displayName: "DateDisplay",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    selectedDate: React.PropTypes.object.isRequired,
    weekCount: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      weekCount: 4
    };
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.selectedDate !== this.props.selectedDate) {
      direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  getTheme: function() {
    return this.context.theme.component.datePicker;
  },

  render: function() {
    var $__0=
      
      
      
      this.props,selectedDate=$__0.selectedDate,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{selectedDate:1,style:1});
    var dayOfWeek = DateTime.getDayOfWeek(this.props.selectedDate);
    var month = DateTime.getShortMonth(this.props.selectedDate);
    var day = this.props.selectedDate.getDate();
    var year = this.props.selectedDate.getFullYear();
    
    var isLandscape = this.props.mode === 'landscape';
    var dateYPosition = '0px';
    var dayYPosition = '30px';
    var yearYPosition = '95px';

    if (isLandscape) {
      dateYPosition = this.props.weekCount === 5 ? '14px' :
        this.props.weekCount === 6 ? '34px' : '8px';
      yearYPosition = this.props.weekCount === 4 ? '114px' : '150px';
      if (this.props.weekCount > 4) dayYPosition = '50px';
    }

    var styles = {
      root: {
        textAlign: 'center',
        position: 'relative'
      },

      dateContainer: {
        backgroundColor: this.getTheme().color,
        height: isLandscape ? this.props.weekCount * 40 + 36 + 'px' : '150px',
        padding: '16px 0',
        transition: Transitions.easeOut(),
        boxSizing: 'border-box',
      },

      date: {
        position: 'relative',
        color: this.getTheme().textColor,
        transition: Transitions.easeOut(),
        transform: 'translate3d(0,' + dateYPosition + ',0)'
      },

      dowContainer: {
        height: '32px',
        backgroundColor: this.getTheme().selectColor,
        borderRadius: isLandscape ? '2px 0 0 0' : '2px 2px 0 0',
        paddingTop: '9px',
        boxSizing: 'border-box',
      },

      dow: {
        fontSize: '13px',
        lineHeight: '13px',
        height: '100%',
        color: this.getTheme().selectTextColor
      },

      day: {
        position: 'absolute',
        lineHeight: isLandscape ? '76px' : '58px',
        fontSize: isLandscape ? '76px' : '58px',
        height: isLandscape ? '76px' : '58px',
        width: '100%',
        transition: Transitions.easeOut(),
        transform: 'translate3d(0,' + dayYPosition + ',0)'
      },

      month: {
        position: 'absolute',
        top: isLandscape ? '0px' : '1px',
        fontSize: isLandscape ? '26px' : '22px',
        lineHeight: isLandscape ? '26px' : '22px',
        height: isLandscape ? '26px' : '22px',
        width: '100%',
        textTransform: 'uppercase'
      },

      year: {
        position: 'absolute',
        margin: '0px',
        fontSize: isLandscape ? '26px' : '22px',
        lineHeight: isLandscape ? '26px' : '22px',
        height: isLandscape ? '26px' : '22px',
        width: '100%',
        textTransform: 'uppercase',
        opacity: '0.7',
        transition: Transitions.easeOut(),
        transform: 'translate3d(0,' + yearYPosition + ',0)'
      }
    };

    return (
      React.createElement("div", React.__spread({},  other, {style: this.mergeAndPrefix(styles.root, this.props.style)}), 

        React.createElement("div", {style: styles.dowContainer}, 
          React.createElement(SlideInTransitionGroup, {
            style: styles.dow, 
            direction: this.state.transitionDirection}, 
            React.createElement("div", {key: dayOfWeek}, dayOfWeek)
          )
        ), 

        React.createElement("div", {style: AutoPrefix.all(styles.dateContainer)}, 
          React.createElement("div", {style: AutoPrefix.all(styles.date)}, 

            React.createElement(SlideInTransitionGroup, {
              style: styles.month, 
              direction: this.state.transitionDirection}, 
              React.createElement("div", {key: month}, month)
            ), 

            React.createElement(SlideInTransitionGroup, {
              style: styles.day, 
              direction: this.state.transitionDirection}, 
              React.createElement("div", {key: day}, day)
            ), 

            React.createElement(SlideInTransitionGroup, {
              style: styles.year, 
              direction: this.state.transitionDirection}, 
              React.createElement("div", {key: year}, year)
            )

          )
        )

      )
    );
  }

});

module.exports = DateDisplay;
},{"../mixins/style-propable":32,"../styles/auto-prefix":44,"../styles/transitions":50,"../transition-groups/slide-in":82,"../utils/date-time":85,"react":undefined}],10:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var KeyCode = require('../utils/key-code');
var Calendar = require('./calendar');
var DialogWindow = require('../dialog-window');
var FlatButton = require('../flat-button');

var DatePickerDialog = React.createClass({displayName: "DatePickerDialog",

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    initialDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getInitialState: function() {
    return {
      isCalendarActive: false
    };
  },

  render: function() {
    var $__0=
      
      
      
      
      this.props,initialDate=$__0.initialDate,onAccept=$__0.onAccept,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{initialDate:1,onAccept:1,style:1});

    var styles = {
      root: {
        fontSize: '14px',
        color: this.context.theme.component.datePicker.calendarTextColor
      },
      
      dialogContents: {
        width: this.props.mode === 'landscape' ? '560px' : '280px'
      },

      actions: {
        marginRight: 8,
      }
    };

    var actions = [
      React.createElement(FlatButton, {
        key: 0, 
        label: "Cancel", 
        secondary: true, 
        style: styles.actions, 
        onTouchTap: this._handleCancelTouchTap}),
      React.createElement(FlatButton, {
        key: 1, 
        label: "OK", 
        secondary: true, 
        style: styles.actions, 
        onTouchTap: this._handleOKTouchTap})
    ];

    if(this.props.autoOk){
      actions = actions.slice(0, 1);
    }

    return (
      React.createElement(DialogWindow, React.__spread({},  other, 
        {ref: "dialogWindow", 
        style: styles.root, 
        contentStyle: styles.dialogContents, 
        actions: actions, 
        onDismiss: this._handleDialogDismiss, 
        onShow: this._handleDialogShow, 
        repositionOnUpdate: false}), 
        React.createElement(Calendar, {
          minDate: this.props.minDate, 
          maxDate: this.props.maxDate, 
          ref: "calendar", 
          onSelectedDate: this._onSelectedDate, 
          initialDate: this.props.initialDate, 
          isActive: this.state.isCalendarActive, 
          mode: this.props.mode})
      )
    );
  },

  show: function() {
    this.refs.dialogWindow.show();
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  _onSelectedDate: function(){
    if(this.props.autoOk){
      setTimeout(this._handleOKTouchTap.bind(this), 300);
    }
  },

  _handleCancelTouchTap: function() {
    this.dismiss();
  },

  _handleOKTouchTap: function() {
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }
  },

  _handleDialogShow: function() {
    this.setState({
      isCalendarActive: true
    });

    if(this.props.onShow) {
      this.props.onShow();
    }
  },

  _handleDialogDismiss: function() {
    this.setState({
      isCalendarActive: false
    });

    if(this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _handleWindowKeyUp: function(e) {
    if (this.refs.dialogWindow.isOpen()) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  }

});

module.exports = DatePickerDialog;

},{"../dialog-window":13,"../flat-button":20,"../mixins/style-propable":32,"../mixins/window-listenable":33,"../utils/key-code":89,"./calendar":8,"react":undefined}],11:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var DateTime = require('../utils/date-time');
var KeyCode = require('../utils/key-code');
var DatePickerDialog = require('./date-picker-dialog');
var TextField = require('../text-field');

var DatePicker = React.createClass({displayName: "DatePicker",

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    defaultDate: React.PropTypes.object,
    formatDate: React.PropTypes.func,
    mode: React.PropTypes.oneOf(['portrait', 'landscape', 'inline']),
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    autoOk: React.PropTypes.bool,
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      formatDate: DateTime.format,
      minDate: null,
      maxDate: null,
      autoOk: false
    };
  },

  getInitialState: function() {
    return {
      date: this.props.defaultDate,
      dialogDate: new Date()
    };
  },

  render: function() {
    var $__0=
      
      
      
      
      
      
      
      
      
      
      this.props,formatDate=$__0.formatDate,mode=$__0.mode,onFocus=$__0.onFocus,onTouchTap=$__0.onTouchTap,onShow=$__0.onShow,onDismiss=$__0.onDismiss,minDate=$__0.minDate,maxDate=$__0.maxDate,autoOk=$__0.autoOk,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{formatDate:1,mode:1,onFocus:1,onTouchTap:1,onShow:1,onDismiss:1,minDate:1,maxDate:1,autoOk:1});
    var defaultInputValue;

    if (this.props.defaultDate) {
      defaultInputValue = this.props.formatDate(this.props.defaultDate);
    }

    return (
      React.createElement("div", {style: this.props.style}, 
        React.createElement(TextField, React.__spread({}, 
          other, 
          {ref: "input", 
          defaultValue: defaultInputValue, 
          onFocus: this._handleInputFocus, 
          onTouchTap: this._handleInputTouchTap})), 
        React.createElement(DatePickerDialog, {
          minDate: minDate, 
          maxDate: maxDate, 
          autoOk: autoOk, 
          ref: "dialogWindow", 
          mode: this.props.mode, 
          initialDate: this.state.dialogDate, 
          onAccept: this._handleDialogAccept, 
          onShow: onShow, 
          onDismiss: onDismiss})
      )

    );
  },

  getDate: function() {
    return this.state.date;
  },

  setDate: function(d) {
    this.setState({
      date: d
    });
    this.refs.input.setValue(this.props.formatDate(d));
  },

  _handleDialogAccept: function(d) {
    this.setDate(d);
    if (this.props.onChange) this.props.onChange(null, d);
  },

  _handleInputFocus: function(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function(e) {
    this.setState({
      dialogDate: this.getDate()
    });

    this.refs.dialogWindow.show();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  },

  _handleWindowKeyUp: function(e) {
    //TO DO: open the dialog if input has focus
  }

});

module.exports = DatePicker;

},{"../mixins/style-propable":32,"../mixins/window-listenable":33,"../text-field":64,"../utils/date-time":85,"../utils/key-code":89,"./date-picker-dialog":10,"react":undefined}],12:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transition = require('../styles/transitions');
var DateTime = require('../utils/date-time');
var EnhancedButton = require('../enhanced-button');

var DayButton = React.createClass({displayName: "DayButton",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    date: React.PropTypes.object,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  getTheme: function() {
    return this.context.theme.component.datePicker;
  },

  render: function() {
    var $__0=
      
      
      
      
      
      this.props,className=$__0.className,date=$__0.date,onTouchTap=$__0.onTouchTap,selected=$__0.selected,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,date:1,onTouchTap:1,selected:1});

    var styles = {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
        position: 'relative',
        float: 'left',
        width: 36,
        padding: '4px 2px',
      },

      label: {
        position: 'relative',
        color: this.context.theme.palette.textColor
      },

      select: {
        position: 'absolute',
        height: 32,
        width: 32,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transition.easeOut(),
        backgroundColor: this.getTheme().selectColor,
      },
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if (DateTime.isEqualDate(this.props.date, new Date()) && !this.props.selected) {
        styles.label.color = this.getTheme().color;
    }

    return this.props.date ? (
      React.createElement(EnhancedButton, React.__spread({},  other, 
        {style: styles.root, 
        disableFocusRipple: true, 
        disableTouchRipple: true, 
        onTouchTap: this._handleTouchTap, 
        onKeyboardFocus: this._handleKeyboardFocus}), 
        React.createElement("div", {style: styles.select}), 
        React.createElement("span", {style: styles.label}, this.props.date.getDate())
      )
    ) : (
      React.createElement("span", {style: styles.root})
    );
  },

  _handleTouchTap: function(e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused, this.props.date);
  } 

});

module.exports = DayButton;
},{"../enhanced-button":17,"../mixins/style-propable":32,"../styles/transitions":50,"../utils/date-time":85,"react":undefined}],13:[function(require,module,exports){
var React = require('react');
var WindowListenable = require('./mixins/window-listenable');
var CssEvent = require('./utils/css-event');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var FlatButton = require('./flat-button');
var Overlay = require('./overlay');
var Paper = require('./paper');

var DialogWindow = React.createClass({displayName: "DialogWindow",

  mixins: [WindowListenable, StylePropable],
  
  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    actions: React.PropTypes.array,
    actionFocus: React.PropTypes.string,
    contentClassName: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    openImmediately: React.PropTypes.bool,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    repositionOnUpdate: React.PropTypes.bool,
    modal: React.PropTypes.bool
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      actions: [],
      repositionOnUpdate: true,
      modal: false
    };
  },

  getInitialState: function() {
    return {
      open: this.props.openImmediately || false
    };
  },

  componentDidMount: function() {
    this._positionDialog();
    if (this.props.openImmediately) {
      this.refs.dialogOverlay.preventScrolling();
      this._onShow();
      this._focusOnAction();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    this._positionDialog();
    this._focusOnAction();
  },

  getTheme: function() {
    return this.context.theme;
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  getStyles: function() {
    var styles = {
      root: {
        position: 'fixed',
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        zIndex: 10,
        top: 0,
        left: -10000,
        width: '100%',
        height: '100%',
        transition: Transitions.easeOut('0ms', 'left', '450ms'),
        color: this.getTheme().palette.textColor
      },
      contents: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        transition: Transitions.easeOut(),
        position: 'relative',
        width: '75%',
        maxWidth: (this.getSpacing().desktopKeylineIncrement * 12),
        margin: '0 auto',
        zIndex: 10,
        background: this.getTheme().palette.canvasColor,
        opacity: 0
      },
      rootWhenOpen: {
        left: 2,
        transition: Transitions.easeOut('0ms', 'left', '0ms')
      },
      contentsWhenOpen: {
        opacity: 1,
        top: 0,
        transform: 'translate3d(0, ' + this.getSpacing().desktopKeylineIncrement + 'px, 0)'
      }
    };
    return styles;
  },

  render: function() {
    var actions = this._getActionsContainer(this.props.actions);
    var styles = this.getStyles();

    return (
      React.createElement("div", {ref: "container", style: this.mergeAndPrefix(styles.root, this.props.style, this.state.open && styles.rootWhenOpen)}, 
        React.createElement(Paper, {
          ref: "dialogWindow", 
          style: this.mergeAndPrefix(styles.contents, this.props.contentStyle, this.state.open && styles.contentsWhenOpen), 
          className: this.props.contentClassName, 
          zDepth: 4}, 
          this.props.children, 
          actions
        ), 
        React.createElement(Overlay, {ref: "dialogOverlay", show: this.state.open, autoLockScrolling: false, onTouchTap: this._handleOverlayTouchTap})
      )
    );
  },

  isOpen: function() {
    return this.state.open;
  },

  dismiss: function() {
    CssEvent.onTransitionEnd(React.findDOMNode(this), function() {
      this.refs.dialogOverlay.allowScrolling();
    }.bind(this));

    this.setState({ open: false });
    this._onDismiss();
  },

  show: function() {
    this.refs.dialogOverlay.preventScrolling();
    this._focusOnAction();
    this.setState({ open: true });
    this._onShow();
  },

  _getAction: function(actionJSON, key) {
    var onClickHandler = actionJSON.onClick ? actionJSON.onClick : this.dismiss;
    var styles = {marginRight: 8};
    var props = {
      key: key,
      secondary: true,
      onClick: onClickHandler,
      label: actionJSON.text,
      style: styles
    };
    if (actionJSON.ref) {
      props.ref = actionJSON.ref;
      props.keyboardFocused = actionJSON.ref === this.props.actionFocus;
    }
    
    return (
      React.createElement(FlatButton, React.__spread({}, 
        props))
    );
  },

  _getActionsContainer: function(actions) { //json w/ refs
    var actionContainer;
    var actionObjects = [];
    var actionStyle = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(s0,0,0,0)',
      padding: 8,
      marginBottom: 8,
      width: '100%',
      textAlign: 'right',
    };

    if (actions.length) {
      for (var i = 0; i < actions.length; i++) {
        var currentAction = actions[i];

        //if the current action isn't a react object, create one
        if (!React.isValidElement(currentAction)) {
          currentAction = this._getAction(currentAction, i);
        }
        actionObjects.push(currentAction);
      };

      actionContainer = (
        React.createElement("div", {style: actionStyle}, 
          actionObjects
        )
      );
    }

    return actionContainer;
  },

  _positionDialog: function() {

    var container = React.findDOMNode(this);
    var dialogWindow = React.findDOMNode(this.refs.dialogWindow);
    var containerHeight = container.offsetHeight;
    var dialogWindowHeight = dialogWindow.offsetHeight;

    //Reset the height in case the window was resized.
    dialogWindow.style.height = '';

    var paddingTop = ((containerHeight - dialogWindowHeight) / 2) - 64;

    //Vertically center the dialog window, but make sure it doesn't
    //transition to that position.
    if (this.props.repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = paddingTop + 'px';
    }

  },
  
  _focusOnAction: function() {
    if (this.props.actionFocus) {
      React.findDOMNode(this.refs[this.props.actionFocus]).focus();
    }
  },
  
  _onShow: function() {
    if (this.props.onShow) this.props.onShow();
  },

  _onDismiss: function() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleOverlayTouchTap: function() {
    if (!this.props.modal) {
      this.dismiss();
      if (this.props.onClickAway) this.props.onClickAway();
    }
  },

  _handleWindowKeyUp: function(e) {
    if (!this.props.modal && e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  }

});

module.exports = DialogWindow;

},{"./flat-button":20,"./mixins/style-propable":32,"./mixins/window-listenable":33,"./overlay":34,"./paper":35,"./styles/transitions":50,"./utils/css-event":84,"./utils/key-code":89,"react":undefined}],14:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/spacing');
var DialogWindow = require('./dialog-window');

var Dialog = React.createClass({displayName: "Dialog",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    title: React.PropTypes.node
  },

  getStyles: function() {
    var gutter = Spacing.desktopGutter + 'px ';
    var styles = {
      title: {
        padding: gutter + gutter + '0 ' + gutter,
        color: this.context.theme.palette.textColor
      },
      content: {
        padding: Spacing.desktopGutter
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

    var styles = this.getStyles();

    var title;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        React.createElement("h3", {style: styles.title}, this.props.title) :
        this.props.title;
    }

    return (
      React.createElement(DialogWindow, React.__spread({}, 
        other, 
        {ref: "dialogWindow", 
        className: className, 
        style: this.props.style}), 

        title, 

        React.createElement("div", {ref: "dialogContent", style: styles.content}, 
          this.props.children
        )

      )
    );
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  show: function() {
    this.refs.dialogWindow.show();
  }

});

module.exports = Dialog;

},{"./dialog-window":13,"./mixins/style-propable":32,"./styles/spacing":46,"react":undefined}],15:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Spacing = require('./styles/spacing');
var ClickAwayable = require('./mixins/click-awayable');
var KeyLine = require('./utils/key-line');
var Paper = require('./paper');
var FontIcon = require('./font-icon');
var Menu = require('./menu/menu');

var DropDownIcon = React.createClass({displayName: "DropDownIcon",

  mixins: [StylePropable, ClickAwayable],

  propTypes: {
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    closeOnMenuItemClick: React.PropTypes.bool,
    iconStyle: React.PropTypes.object,
    iconClassName: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      open: false,
    }
  },
  
  getDefaultProps: function() {
    return {
      closeOnMenuItemClick: true
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  getStyles: function() {
    var iconWidth = 48;
    var styles = {
      root: {
        display: 'inline-block',
        width: iconWidth + 'px !important',
        position: 'relative',
        height: Spacing.desktopToolbarHeight,
        fontSize: Spacing.desktopDropDownMenuFontSize,
        cursor: 'pointer'
       },
      menu: {
        transition: Transitions.easeOut(),
        right: '-14px !important',
        top: '9px !important',
        opacity: (this.props.open) ? 1 : 0
      },
      menuItem: { // similair to drop down menu's menu item styles
        paddingRight: (Spacing.iconSize + (Spacing.desktopGutterLess*2)),
        height: Spacing.desktopDropDownMenuItemHeight,
        lineHeight: Spacing.desktopDropDownMenuItemHeight + 'px'
      }
    };
    return styles;   
  },

  render: function() {
    var $__0=
      
      
      
      
      
      
      
      this.props,style=$__0.style,children=$__0.children,menuItems=$__0.menuItems,closeOnMenuItemClick=$__0.closeOnMenuItemClick,iconStyle=$__0.iconStyle,iconClassName=$__0.iconClassName,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{style:1,children:1,menuItems:1,closeOnMenuItemClick:1,iconStyle:1,iconClassName:1});

    var styles = this.getStyles();
    
    return (
      React.createElement("div", React.__spread({},  other, {style: this.mergeAndPrefix(styles.root, this.props.style)}), 
          React.createElement("div", {onClick: this._onControlClick}, 
              React.createElement(FontIcon, {
                className: iconClassName, 
                style: iconStyle}), 
              this.props.children
          ), 
          React.createElement(Menu, {
            ref: "menuItems", 
            style: this.mergeAndPrefix(styles.menu), 
            menuItems: menuItems, 
            menuItemStyle: styles.menuItem, 
            hideable: true, 
            visible: this.state.open, 
            onItemClick: this._onMenuItemClick})
        )
    );
  },

  _onControlClick: function(e) {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange) this.props.onChange(e, key, payload);
    
    if (this.props.closeOnMenuItemClick) {
      this.setState({ open: false });
    }
  }
});

module.exports = DropDownIcon;

},{"./font-icon":22,"./menu/menu":28,"./mixins/click-awayable":31,"./mixins/style-propable":32,"./paper":35,"./styles/spacing":46,"./styles/transitions":50,"./utils/key-line":90,"react":undefined}],16:[function(require,module,exports){
(function (process){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ClickAwayable = require('./mixins/click-awayable');
var DropDownArrow = require('./svg-icons/drop-down-arrow');
var KeyLine = require('./utils/key-line');
var Paper = require('./paper');
var Menu = require('./menu/menu');
var ClearFix = require('./clearfix');
var DropDownMenu = React.createClass({displayName: "DropDownMenu",

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  // The nested styles for drop-down-menu are modified by toolbar and possibly 
  // other user components, so it will give full access to its js styles rather 
  // than just the parent. 
  propTypes: {
    className: React.PropTypes.string,
    autoWidth: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    menuItemStyle: React.PropTypes.object,
    selectedIndex: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      autoWidth: true
    };
  },

  getInitialState: function() {
    return {
      open: false,
      isHovered: false,
      selectedIndex: this.props.selectedIndex || 0
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  componentDidMount: function() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps);
    }
 },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  getTextColor: function() {
    return this.context.theme.palette.textColor;
  },

  getStyles: function(){
    var accentColor = this.context.theme.component.dropDownMenu.accentColor;
    var backgroundColor = this.context.theme.component.menu.backgroundColor;
    var styles = {
      root: {
        transition: Transitions.easeOut(),
        position: 'relative',
        display: 'inline-block',
        height: this.getSpacing().desktopToolbarHeight,
        fontSize: this.getSpacing().desktopDropDownMenuFontSize
      },
      control: {
        cursor: 'pointer',
        position: 'static',
        height: '100%'
      },
      controlBg: {
        transition: Transitions.easeOut(),
        backgroundColor: backgroundColor,
        height: '100%',
        width: '100%',
        opacity: (this.state.open) ? 0 : 
                 (this.state.isHovered) ? 1 : 0
      },
      icon: {
        position: 'absolute',
        top: ((this.getSpacing().desktopToolbarHeight - 24) / 2),
        right: this.getSpacing().desktopGutterLess,
        fill: this.context.theme.component.dropDownMenu.accentColor
      },
      label: {
        transition: Transitions.easeOut(),
        lineHeight: this.getSpacing().desktopToolbarHeight + 'px',
        position: 'absolute',
        paddingLeft: this.getSpacing().desktopGutter,
        top: 0,
        opacity: 1,
        color: this.getTextColor()
      },
      underline: {
        borderTop: 'solid 1px ' + accentColor,
        margin: '0 ' + this.getSpacing().desktopGutter + 'px'
      },
      menuItem: {
        paddingRight: this.getSpacing().iconSize + 
                      this.getSpacing().desktopGutterLess + 
                      this.getSpacing().desktopGutterMini,
        height: this.getSpacing().desktopDropDownMenuItemHeight,
        lineHeight: this.getSpacing().desktopDropDownMenuItemHeight + 'px',
        whiteSpace: 'nowrap'
      },
      rootWhenOpen: {
        opacity: 1
      },
      labelWhenOpen: {
        opacity: 0,
        top: this.getSpacing().desktopToolbarHeight / 2
      }
    };
    return styles;
  },

  render: function() {
    var styles = this.getStyles();
    return (
      React.createElement("div", {
        ref: "root", 
        onMouseOut: this._handleMouseOut, 
        onMouseOver: this._handleMouseOver, 
        className: this.props.className, 
        style: this.mergeAndPrefix(
          styles.root, 
          this.state.open && styles.rootWhenOpen,
          this.props.style)}, 

          React.createElement(ClearFix, {style: this.mergeAndPrefix(styles.control), onClick: this._onControlClick}, 
            React.createElement(Paper, {style: this.mergeAndPrefix(styles.controlBg), zDepth: 0}), 
            React.createElement("div", {style: this.mergeAndPrefix(styles.label, this.state.open && styles.labelWhenOpen)}, 
              this.props.menuItems[this.state.selectedIndex].text
            ), 
            React.createElement(DropDownArrow, {style: this.mergeAndPrefix(styles.icon)}), 
            React.createElement("div", {style: this.mergeAndPrefix(styles.underline)})
          ), 

          React.createElement(Menu, {
            ref: "menuItems", 
            autoWidth: this.props.autoWidth, 
            selectedIndex: this.state.selectedIndex, 
            menuItems: this.props.menuItems, 
            menuItemStyle: this.mergeAndPrefix(styles.menuItem, this.props.menuItemStyle), 
            hideable: true, 
            visible: this.state.open, 
            onItemClick: this._onMenuItemClick})
      )
    );
  },

  _setWidth: function() {
    var el = React.findDOMNode(this),
      menuItemsDom = this.refs.menuItems.getDOMNode();

    el.style.width = menuItemsDom.offsetWidth + 'px';
  },

  _setSelectedIndex: function(props) {
    var selectedIndex = props.selectedIndex;

    if (process.env.NODE_ENV !== 'production' && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    this.setState({selectedIndex: (selectedIndex > -1) ? selectedIndex : 0});
  },

  _onControlClick: function(e) {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.state.selectedIndex !== key) this.props.onChange(e, key, payload);
    this.setState({
      selectedIndex: key,
      open: false
    });
  },

  _handleMouseOver: function(e) {
    this.setState({isHovered: true});
  },

  _handleMouseOut: function(e) {
    this.setState({isHovered: false});
  }

});

module.exports = DropDownMenu;
}).call(this,require('_process'))
},{"./clearfix":5,"./menu/menu":28,"./mixins/click-awayable":31,"./mixins/style-propable":32,"./paper":35,"./styles/transitions":50,"./svg-icons/drop-down-arrow":53,"./utils/key-line":90,"_process":93,"react":undefined}],17:[function(require,module,exports){
var React = require('react');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var WindowListenable = require('./mixins/window-listenable');
var FocusRipple = require('./ripples/focus-ripple');
var TouchRipple = require('./ripples/touch-ripple');

var EnhancedButton = React.createClass({displayName: "EnhancedButton",

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    centerRipple: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    disableFocusRipple: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool,
    keyboardFocused: React.PropTypes.bool,
    linkButton: React.PropTypes.bool,
    focusRippleColor: React.PropTypes.string,
    touchRippleColor: React.PropTypes.string,
    focusRippleOpacity: React.PropTypes.number,
    touchRippleOpacity: React.PropTypes.number,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
  },

  windowListeners: {
    'keydown': '_handleWindowKeydown',
    'keyup': '_handleWindowKeyup'
  },

  getInitialState: function() {
    return {
      isKeyboardFocused: !this.props.disabled && this.props.keyboardFocused
    };
  },


  // Remove inner padding and border in Firefox 4+.
  componentDidMount: function() {
    if (!EnhancedButton.hasStyleBeenInjected) {
      var style = document.createElement("style");
      style.innerHTML = 'button::-moz-focus-inner,' +
                        'input::-moz-focus-inner {' +
                        ' border: 0;' +
                        ' padding: 0;' +
                        ' }';
      document.body.appendChild(style);
      EnhancedButton.hasStyleBeenInjected = true;
    }
  }, 

  getStyles: function() {
    var styles = {
      root: {
        border: 10,
        background: 'none',
        boxSizing: 'border-box',
        font: 'inherit',
        fontFamily: this.context.theme.contentFontFamily,
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        WebkitApperance: 'button',
        cursor: 'pointer'
      },
      rootWhenLinkButton: {
        display: 'inline-block',
        cursor: (this.props.disabled) ? 'default' : 'pointer',
        textDecoration: 'none'
      },
      rootWhenDisabled: {
        cursor: 'default'
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      
      
      
      
      
      
      
      
         this.props,centerRipple=$__0.centerRipple,disabled=$__0.disabled,disableFocusRipple=$__0.disableFocusRipple,disableTouchRipple=$__0.disableTouchRipple,linkButton=$__0.linkButton,touchRippleColor=$__0.touchRippleColor,onBlur=$__0.onBlur,onFocus=$__0.onFocus,onMouseOver=$__0.onMouseOver,onTouchTap=$__0.onTouchTap,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{centerRipple:1,disabled:1,disableFocusRipple:1,disableTouchRipple:1,linkButton:1,touchRippleColor:1,onBlur:1,onFocus:1,onMouseOver:1,onTouchTap:1});

    var styles = this.mergeAndPrefix(
      this.getStyles().root,
      this.props.linkButton && this.getStyles().rootWhenLinkButton,
      this.props.disabled && this.getStyles().rootWhenDisabled,
      this.props.style
    );

    var touchRipple = (
      React.createElement(TouchRipple, {
        ref: "touchRipple", 
        key: "touchRipple", 
        centerRipple: centerRipple, 
        color: this.props.touchRippleColor, 
        opacity: this.props.touchRippleOpacity}, 
        this.props.children
      )
    );
    var focusRipple = (
      React.createElement(FocusRipple, {
        key: "focusRipple", 
        color: this.props.focusRippleColor, 
        opacity: this.props.focusRippleOpacity, 
        show: this.state.isKeyboardFocused})
    );
    var buttonProps = {
      style: styles,
      disabled: disabled,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onMouseOver: this._handleMouseOver,
      onTouchTap: this._handleTouchTap,
    };
    var buttonChildren = [
      disabled || disableTouchRipple ? this.props.children : touchRipple,
      disabled || disableFocusRipple ? null : focusRipple
    ];

    if (disabled && linkButton) {
      return (
        React.createElement("span", React.__spread({},  other, 
          {className: this.props.className, 
          disabled: disabled}), 
          this.props.children
        )
      );
    }

    return linkButton ? (
      React.createElement("a", React.__spread({},  other,  buttonProps), 
        buttonChildren
      )
    ) : (

      React.createElement("button", React.__spread({},  other,  buttonProps), 
        buttonChildren
      )
    );
  },

  isKeyboardFocused: function() {
    return this.state.isKeyboardFocused;
  },

  _handleWindowKeydown: function(e) {
    if (!this.props.disabled) {
      if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
      if (e.keyCode == KeyCode.ENTER && this.state.isKeyboardFocused) {
        this._handleTouchTap(e);
      }
    }
  },

  _handleWindowKeyup: function(e) {
    if (!this.props.disabled && e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
  },

  _handleBlur: function(e) {
    this._cancelFocusTimeout();
    if (!this.props.disabled) {
      this.setState({
        isKeyboardFocused: false
      });
      if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, false);
      if (this.props.onBlur) this.props.onBlur(e);
    }
  },

  _handleFocus: function(e) {
    this.getDOMNode().style.outline = 'none';
    if (!this.props.disabled) {
      //setTimeout is needed because the focus event fires first
      //Wait so that we can capture if this was a keyboard focus
      //or touch focus
      this._focusTimeout = setTimeout(function() {
        if (this._tabPressed) {
          this.setState({
            isKeyboardFocused: true
          });  
          if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, true);
        }
      }.bind(this), 150);

      if (this.props.onFocus) this.props.onFocus(e);
    }
  },

  _handleMouseOver: function(e) {
    this.getDOMNode().style.textDecoration = 'none';
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleTouchTap: function(e) {
    this._cancelFocusTimeout();
    if (!this.props.disabled) {
      this._tabPressed = false;
      this.setState({
        isKeyboardFocused: false
      });
      if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, false);
      if (this.props.onTouchTap) this.props.onTouchTap(e);
    }
  },

  _cancelFocusTimeout: function () {
    if (this._focusTimeout) {
      clearTimeout(this._focusTimeout);
      this._focusTimeout = null;
    }
  }

});

EnhancedButton.hasStyleBeenInjected = false;

module.exports = EnhancedButton;

},{"./mixins/style-propable":32,"./mixins/window-listenable":33,"./ripples/focus-ripple":40,"./ripples/touch-ripple":41,"./utils/key-code":89,"react":undefined}],18:[function(require,module,exports){
(function (process){
var React = require('react');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var UniqueId = require('./utils/unique-id');
var WindowListenable = require('./mixins/window-listenable');
var Spacing = require('./styles/spacing');
var FocusRipple = require('./ripples/focus-ripple');
var TouchRipple = require('./ripples/touch-ripple');
var Paper = require('./paper');

var EnhancedSwitch = React.createClass({displayName: "EnhancedSwitch",

  mixins: [WindowListenable, StylePropable],
  
  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
      id: React.PropTypes.string,
      inputType: React.PropTypes.string.isRequired,
      switchElement: React.PropTypes.element.isRequired,
      onParentShouldUpdate: React.PropTypes.func.isRequired,
      switched: React.PropTypes.bool.isRequired,
      rippleStyle: React.PropTypes.object,
      rippleColor: React.PropTypes.string,
      iconStyle: React.PropTypes.object,
      thumbStyle: React.PropTypes.object,
      trackStyle: React.PropTypes.object,
      name: React.PropTypes.string,
      value: React.PropTypes.string,
      label: React.PropTypes.string,
      onSwitch: React.PropTypes.func,
      required: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      defaultSwitched: React.PropTypes.bool,
      labelPosition: React.PropTypes.oneOf(['left', 'right']),
      disableFocusRipple: React.PropTypes.bool,
      disableTouchRipple: React.PropTypes.bool
    },

  windowListeners: {
    'keydown': '_handleWindowKeydown',
    'keyup': '_handleWindowKeyup'
  },

  getInitialState: function() {
    return {
      isKeyboardFocused: false,
      parentWidth: 100,
    };
  },

  getEvenWidth: function(){
    return (
      parseInt(window
        .getComputedStyle(React.findDOMNode(this.refs.root))
        .getPropertyValue('width'), 10)
    );
  },

  componentDidMount: function() {
    var inputNode = React.findDOMNode(this.refs.checkbox);
    if (!this.props.switched || 
        this.props.switched == undefined ||
        inputNode.checked != this.props.switched) this.props.onParentShouldUpdate(inputNode.checked);

    window.addEventListener("resize", this._handleResize);

    this._handleResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener("resize", this._handleResize);
  },

  componentWillReceiveProps: function(nextProps) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasToggledProp = nextProps.hasOwnProperty('toggled');
    var hasNewDefaultProp =
      (nextProps.hasOwnProperty('defaultSwitched') &&
      (nextProps.defaultSwitched != this.props.defaultSwitched));
    var newState = {};

    if (hasCheckedProp) {
      newState.switched = nextProps.checked;
    } else if (hasToggledProp) {
      newState.switched = nextProps.toggled;
    } else if (hasCheckedLinkProp) {
      newState.switched = nextProps.checkedLink.value;
    }

    if (newState.switched != undefined && (newState.switched != this.props.switched)) this.props.onParentShouldUpdate(newState.switched);
  },

  getTheme: function() {
    return this.context.theme.palette;
  },

  getStyles: function() {
    var switchWidth = 60 - Spacing.desktopGutterLess;
    var labelWidth = this.state.parentWidth - 60;

    var styles = {
      root: {
        position: 'relative',
        cursor: this.props.disabled ? 'default' : 'pointer',
        overflow: 'visible',
        display: 'table',
        height: 'auto',
        width: '100%'
      },
      input: {
        position: 'absolute',
        cursor: this.props.disabled ? 'default' : 'pointer',
        pointerEvents: 'all',
        opacity: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        left: 0,
        boxSizing: 'border-box', 
        padding: 0,
        margin: 0
      },
      label: {
        float: 'left',
        position: 'relative',
        display: 'table-column',
        width: labelWidth,
        lineHeight: '24px',
        color: this.getTheme().textColor
      },
      wrap: {
        transition: Transitions.easeOut(),
        float: 'left',
        position: 'relative',
        display: 'table-column',
        width: switchWidth,
        marginRight: (this.props.labelPosition == 'right') ? 
          Spacing.desktopGutterLess : 0,
        marginLeft: (this.props.labelPosition == 'left') ? 
          Spacing.desktopGutterLess : 0
      },
      ripple: {
        height: '200%',
        width: '200%',
        top: '-12',
        left: '-12'
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      this.props,type=$__0.type,name=$__0.name,value=$__0.value,label=$__0.label,onSwitch=$__0.onSwitch,defaultSwitched=$__0.defaultSwitched,onBlur=$__0.onBlur,onFocus=$__0.onFocus,onMouseUp=$__0.onMouseUp,onMouseDown=$__0.onMouseDown,onMouseOut=$__0.onMouseOut,onTouchStart=$__0.onTouchStart,onTouchEnd=$__0.onTouchEnd,disableTouchRipple=$__0.disableTouchRipple,disableFocusRipple=$__0.disableFocusRipple,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{type:1,name:1,value:1,label:1,onSwitch:1,defaultSwitched:1,onBlur:1,onFocus:1,onMouseUp:1,onMouseDown:1,onMouseOut:1,onTouchStart:1,onTouchEnd:1,disableTouchRipple:1,disableFocusRipple:1,className:1});

    var styles = this.getStyles();

    styles.root.cursor = styles.root.input = this.props.disabled ? 'default' : 'pointer';

    var wrapStyles = this.mergeAndPrefix(styles.wrap, this.props.iconStyle);
    var rippleStyle = this.mergeAndPrefix(styles.ripple, this.props.rippleStyle);
    var rippleColor = this.props.hasOwnProperty('rippleColor') ? this.props.rippleColor : 
                      this.getTheme().primary1Color;

    if (this.props.thumbStyle) {
      wrapStyles.marginLeft /= 2;
      wrapStyles.marginRight /= 2;
    }

    var inputId = this.props.id || UniqueId.generate();

    var labelElement = this.props.label ? (
      React.createElement("label", {style: this.mergeAndPrefix(styles.label), htmlFor: inputId}, 
        this.props.label
      )
    ) : null;

    var inputProps = {
      ref: "checkbox",
      type: this.props.inputType,
      style: this.mergeAndPrefix(styles.input),
      name: this.props.name,
      value: this.props.value,
      defaultChecked: this.props.defaultSwitched,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus
    };

    var hideTouchRipple = this.props.disabled || disableTouchRipple;

    if(!hideTouchRipple) {
      inputProps.onMouseUp = this._handleMouseUp;
      inputProps.onMouseDown = this._handleMouseDown;
      inputProps.onMouseOut = this._handleMouseOut;
      inputProps.onTouchStart = this._handleTouchStart;
      inputProps.onTouchEnd = this._handleTouchEnd;
    }

    if (!this.props.hasOwnProperty('checkedLink')) {
      inputProps.onChange = this._handleChange;
    }

    var inputElement = (
      React.createElement("input", React.__spread({}, 
        other, 
        inputProps))
    );

    var touchRipple = (
      React.createElement(TouchRipple, {
        ref: "touchRipple", 
        key: "touchRipple", 
        style: rippleStyle, 
        color: rippleColor, 
        centerRipple: true})
    );

    var focusRipple = (
      React.createElement(FocusRipple, {
        key: "focusRipple", 
        innerStyle: rippleStyle, 
        color: rippleColor, 
        show: this.state.isKeyboardFocused})
    );

    var ripples = [
      hideTouchRipple ? null : touchRipple,
      this.props.disabled || disableFocusRipple ? null : focusRipple
    ];

    // If toggle component (indicated by whether the style includes thumb) manually lay out 
    // elements in order to nest ripple elements
    var switchElement = !this.props.thumbStyle ? (
        React.createElement("div", {style: wrapStyles}, 
          this.props.switchElement, 
          ripples
        )
      ) : (
        React.createElement("div", {style: wrapStyles}, 
          React.createElement("div", {style: this.props.trackStyle}), 
          React.createElement(Paper, {style: this.props.thumbStyle, zDepth: 1, circle: true}, " ", ripples, " ")
        )      
    );

    var labelPositionExist = this.props.labelPosition;

    // Position is left if not defined or invalid.
    var elementsInOrder = (labelPositionExist &&
      (this.props.labelPosition.toUpperCase() === "RIGHT")) ? (
        React.createElement("div", null, 
          switchElement, 
          labelElement
        )
      ) : (
        React.createElement("div", null, 
          labelElement, 
          switchElement
        )
    );

    return (
      React.createElement("div", {ref: "root", className: className, style: this.mergeAndPrefix(styles.root, this.props.style)}, 
          inputElement, 
          elementsInOrder
      )
    );
  },


  isSwitched: function() {
    return React.findDOMNode(this.refs.checkbox).checked;
  },

  // no callback here because there is no event
  setSwitched: function(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked == false) {
      this.props.onParentShouldUpdate(newSwitchedValue);  
      React.findDOMNode(this.refs.checkbox).checked = newSwitchedValue;
    } else if (process.env.NODE_ENV !== 'production') {
      var message = 'Cannot call set method while checked is defined as a property.';
      console.error(message);
    }
  },

  getValue: function() {
    return React.findDOMNode(this.refs.checkbox).value;
  },

  isKeyboardFocused: function() {
    return this.state.isKeyboardFocused;
  },

  _handleChange: function(e) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });

    var isInputChecked = React.findDOMNode(this.refs.checkbox).checked;

    if (!this.props.hasOwnProperty('checked')) this.props.onParentShouldUpdate(isInputChecked);
    if (this.props.onSwitch) this.props.onSwitch(e, isInputChecked);
  },

  /**
   * Because both the ripples and the checkbox input cannot share pointer
   * events, the checkbox input takes control of pointer events and calls
   * ripple animations manually.
   */

  // Checkbox inputs only use SPACE to change their state. Using ENTER will
  // update the ui but not the input.
  _handleWindowKeydown: function(e) {
    if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  _handleWindowKeyup: function(e) {
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) this.refs.touchRipple.start(e);
  },

  _handleMouseUp: function(e) {
    this.refs.touchRipple.end();
  },

  _handleMouseOut: function(e) {
    this.refs.touchRipple.end();
  },

  _handleTouchStart: function(e) {
    this.refs.touchRipple.start(e);
  },

  _handleTouchEnd: function(e) {
    this.refs.touchRipple.end();
  },

  _handleBlur: function(e) {
    this.setState({
      isKeyboardFocused: false
    });

    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function(e) {
    //setTimeout is needed becuase the focus event fires first
    //Wait so that we can capture if this was a keyboard focus
    //or touch focus
    setTimeout(function() {
      if (this._tabPressed) {
        this.setState({
          isKeyboardFocused: true
        });
      }
    }.bind(this), 150);

    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleResize: function(e) {
    this.setState({parentWidth: this.getEvenWidth()});
  }

});

module.exports = EnhancedSwitch;

}).call(this,require('_process'))
},{"./mixins/style-propable":32,"./mixins/window-listenable":33,"./paper":35,"./ripples/focus-ripple":40,"./ripples/touch-ripple":41,"./styles/spacing":46,"./styles/transitions":50,"./utils/key-code":89,"./utils/unique-id":92,"_process":93,"react":undefined}],19:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var AutoPrefix = require('./styles/auto-prefix');

var EnhancedTextarea = React.createClass({displayName: "EnhancedTextarea",

  mixins: [StylePropable],

  propTypes: {
    onChange: React.PropTypes.func,
    onHeightChange: React.PropTypes.func,
    textareaStyle: React.PropTypes.object,
    rows: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      rows: 1
    };
  },

  getInitialState: function() {
    return {
      height: this.props.rows * 24
    };
  },

  componentDidMount: function() {
    this._syncHeightWithShadow();
  },

  getStyles: function() {
    var styles = {
      root: {
        width: '100%',
        resize: 'none',
        overflow: 'hidden',
        font: 'inherit',
        padding: 0,
      }
    };
    return styles;
  },

  render: function() {

    var $__0=
      
      
      
      
      
      
      
      this.props,onChange=$__0.onChange,onHeightChange=$__0.onHeightChange,rows=$__0.rows,style=$__0.style,textareaStyle=$__0.textareaStyle,valueLink=$__0.valueLink,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onChange:1,onHeightChange:1,rows:1,style:1,textareaStyle:1,valueLink:1});

    var styles = this.getStyles().root;

    var textAreaStyles = {
      width: '100%',
      resize: 'none',
      overflow: 'hidden',
      font: 'inherit',
      padding: 0,
    };

    var inputStyles = this.mergeAndPrefix(styles,{
      height: this.state.height + 'px',
    });

    inputStyles = this.mergeAndPrefix(inputStyles, textareaStyle);


    // Overflow also needed to here to remove the extra row 
    // added to textareas in Firefox.
    var shadowStyles = this.mergeAndPrefix(textAreaStyles, {
      position: 'absolute',
      opacity: 0
    });

    if (this.props.hasOwnProperty('valueLink')) other.value = this.props.valueLink.value;
    if (this.props.disabled) style.cursor = 'default';

    return (
      React.createElement("div", {style: this.props.style}, 
        React.createElement("textarea", {
          ref: "shadow", 
          style: AutoPrefix.all(shadowStyles), 
          tabIndex: "-1", 
          rows: this.props.rows, 
          defaultValue: this.props.defaultValue, 
          readOnly: true, 
          value: this.props.value}), 
        React.createElement("textarea", React.__spread({}, 
          other, 
          {ref: "input", 
          style: inputStyles, 
          rows: this.props.rows, 
          style: AutoPrefix.all(inputStyles), 
          onChange: this._handleChange}))
      )
    );
  },

  getInputNode: function() {
    return React.findDOMNode(this.refs.input);
  },

  _syncHeightWithShadow: function(newValue, e) {
    var shadow = React.findDOMNode(this.refs.shadow);
    var currentHeight = this.state.height;
    var newHeight;

    if (newValue !== undefined) shadow.value = newValue;
    newHeight = shadow.scrollHeight;
    
    if (currentHeight !== newHeight) {
      this.setState({height: newHeight});
      if (this.props.onHeightChange) this.props.onHeightChange(e, newHeight);
    }
  },

  _handleChange: function(e) {
    this._syncHeightWithShadow(e.target.value);

    if (this.props.hasOwnProperty('valueLink')) {
      this.props.valueLink.requestChange(e.target.value);
    }

    if (this.props.onChange) this.props.onChange(e);
  },
  
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value != this.props.value) {
      this._syncHeightWithShadow(nextProps.value);
    }
  }
});

module.exports = EnhancedTextarea;

},{"./mixins/style-propable":32,"./styles/auto-prefix":44,"react":undefined}],20:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ColorManipulator = require('./utils/color-manipulator');
var Typography = require('./styles/typography');
var EnhancedButton = require('./enhanced-button');

var FlatButton = React.createClass({displayName: "FlatButton",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    label: function(props, propName, componentName){
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
      }
    },
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    labelStyle: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      labelStyle: {},
    }
  },

  getInitialState: function() {
    return {
      hovered: false,
    };
  },

  getThemeButton: function() {
    return this.context.theme.component.button;
  },

  getTheme: function() {
    return this.context.theme.component.flatButton;
  },

  getStyles: function() {
    var styles = {
      root: {
        transition: Transitions.easeOut(),
        fontSize: Typography.fontStyleButtonFontSize,
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: Typography.fontWeightMedium, 
        borderRadius: 2,
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: this.getTheme().color,
        lineHeight: this.getThemeButton().height + 'px',
        minWidth: this.getThemeButton().minWidth,
        padding: 0, 
        margin: 0,
        //This is need so that ripples do not bleed past border radius.
        //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
        transform: 'translate3d(0, 0, 0)',
      },
      label: {
        position: 'relative',
        padding: '0px ' + this.context.theme.spacing.desktopGutterLess + 'px',
      }
    };
    return styles;
  },

  _getColor: function(){
    return  this.props.disabled ? this.getTheme().disabledTextColor :
            this.props.primary ? this.getTheme().primaryTextColor :
            this.props.secondary ? this.getTheme().secondaryTextColor :
            this.getTheme().textColor;
  },

  render: function() {

    var $__0=
        
        
        
        
        
        
        this.props,label=$__0.label,primary=$__0.primary,secondary=$__0.secondary,onMouseOver=$__0.onMouseOver,onMouseOut=$__0.onMouseOut,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{label:1,primary:1,secondary:1,onMouseOver:1,onMouseOut:1});

    var styles = this.getStyles();

    styles.root.color = this._getColor();

    styles.rootWhenHovered = {
        backgroundColor: ColorManipulator.fade(ColorManipulator.lighten(styles.root.color, 0.4), 0.15)
    };

    var labelElement;
    if (label) {
      labelElement = (
        React.createElement("span", {style: this.mergeAndPrefix(styles.label, this.props.labelStyle)}, 
          label
        )
      );
    };
    
    var rippleColor = ColorManipulator.fade(styles.root.color, 0.8);

    return (
      React.createElement(EnhancedButton, React.__spread({},  other, 
        {ref: "enhancedButton", 
        style: this.mergeAndPrefix(
          styles.root,
          (this.state.hovered && !this.props.disabled) && styles.rootWhenHovered,
          this.props.style
        ), 
        onMouseOver: this._handleMouseOver, 
        onMouseOut: this._handleMouseOut, 
        focusRippleColor: rippleColor, 
        touchRippleColor: rippleColor, 
        onKeyboardFocus: this._handleKeyboardFocus}), 
        labelElement, 
        this.props.children
      )
    );
  },

  _handleMouseOver: function(e) {
    if (!this.refs.enhancedButton.isKeyboardFocused()) this.setState({hovered: true});
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleMouseOut: function(e) {
    if (!this.refs.enhancedButton.isKeyboardFocused()) this.setState({hovered: false});
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {

    if (keyboardFocused && !this.props.disabled) {
      this.getDOMNode().style.backgroundColor = ColorManipulator.fade(ColorManipulator.lighten(this.getStyles().root.color, 0.4), 0.15);
    } else {
      this.getDOMNode().style.backgroundColor = 'transparent';
    }
  }


});

module.exports = FlatButton;

},{"./enhanced-button":17,"./mixins/style-propable":32,"./styles/transitions":50,"./styles/typography":51,"./utils/color-manipulator":83,"react":undefined}],21:[function(require,module,exports){
(function (process){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ColorManipulator = require('./utils/color-manipulator');
var EnhancedButton = require('./enhanced-button');
var FontIcon = require('./font-icon');
var Paper = require('./paper');

var getZDepth = function(disabled) {
  var zDepth = disabled ? 0 : 2;
  return {
    zDepth: zDepth,
    initialZDepth: zDepth
  };
};

var RaisedButton = React.createClass({displayName: "RaisedButton",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    innerClassName: React.PropTypes.string,
    innerStyle: React.PropTypes.object,
    mini: React.PropTypes.bool,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    secondary: React.PropTypes.bool
  },

  getInitialState: function() {
    var zDepth = this.props.disabled ? 0 : 2;
    return {
      zDepth: zDepth,
      initialZDepth: zDepth,
      hovered: false,
    };
  },

  componentWillMount: function() {
    this.setState(getZDepth(this.props.disabled));
  },

  componentWillReceiveProps: function(newProps) {
    if(newProps.disabled !== this.props.disabled){
      this.setState(getZDepth(newProps.disabled));
    }
  },

  componentDidMount: function() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.iconClassName && this.props.children) {
        var warning = 'You have set both an iconClassName and a child icon. ' +
                      'It is recommended you use only one method when adding ' +
                      'icons to FloatingActionButtons.';
        console.warn(warning);
      }
    }
  },

  _getBackgroundColor: function() {
    return  this.props.disabled ? this.getTheme().disabledColor :
            this.props.secondary ? this.getTheme().secondaryColor :
            this.getTheme().color; 
  },


  getTheme: function() {
    return this.context.theme.component.floatingActionButton;
  },

  _getIconColor: function() {
    return  this.props.disabled ? this.getTheme().disabledTextColor :
            this.props.secondary ? this.getTheme().secondaryIconColor :
            this.getTheme().iconColor;
  },

  getStyles: function() {
    var styles = {
      root: {
        transition: Transitions.easeOut(),
        display: 'inline-block'
      },
      container: {
        transition: Transitions.easeOut(),
        position: 'relative',
        height: this.getTheme().buttonSize,
        width: this.getTheme().buttonSize,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: this._getBackgroundColor(),
        borderRadius: '50%',
        textAlign: 'center',
        verticalAlign: 'bottom',
        //This is need so that ripples do not bleed
        //past border radius.
        //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
        transform: 'translate3d(0, 0, 0)'
      },
      icon: {
        lineHeight: this.getTheme().buttonSize + 'px',
        fill: this.getTheme().iconColor,
        color: this._getIconColor()
      },
      overlay: {
        transition: Transitions.easeOut(),
        top: 0
      },
      containerWhenMini: {
        height: this.getTheme().miniSize,
        width: this.getTheme().miniSize
      },
      iconWhenMini: {
        lineHeight: this.getTheme().miniSize + 'px'
      },
      overlayWhenHovered: {
        backgroundColor: ColorManipulator.fade(this._getIconColor(), 0.4)
      },
      inner: {
        transition: Transitions.easeOut()
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      
         this.props,icon=$__0.icon,mini=$__0.mini,secondary=$__0.secondary,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{icon:1,mini:1,secondary:1});

    var styles = this.getStyles();

    var icon;
    if (this.props.iconClassName) {
      icon = 
        React.createElement(FontIcon, {
          className: this.props.iconClassName, 
          style: this.mergeAndPrefix(
            styles.icon,
            this.props.mini && styles.iconWhenMini,
            this.props.iconStyle)})
    }

    var rippleColor = styles.icon.color;

    return (
      React.createElement(Paper, {
        style: this.mergeAndPrefix(styles.root, this.props.style), 
        innerClassName: this.props.innerClassName, 
        innerStyle: this.mergeAndPrefix(styles.inner, this.props.innerStyle), 
        zDepth: this.state.zDepth, 
        circle: true}, 

        React.createElement(EnhancedButton, React.__spread({},  other, 
          {ref: "container", 
          style: this.mergeAndPrefix(
            styles.container, 
            this.props.mini && styles.containerWhenMini
          ), 
          onMouseDown: this._handleMouseDown, 
          onMouseUp: this._handleMouseUp, 
          onMouseOut: this._handleMouseOut, 
          onMouseOver: this._handleMouseOver, 
          onTouchStart: this._handleTouchStart, 
          onTouchEnd: this._handleTouchEnd, 
          focusRippleColor: rippleColor, 
          touchRippleColor: rippleColor, 
          onKeyboardFocus: this._handleKeyboardFocus}), 
            React.createElement("div", {
              ref: "overlay", 
              style: this.mergeAndPrefix(
                styles.overlay,
                (this.state.hovered && !this.props.disabled) && styles.overlayWhenHovered
              )}, 
                icon, 
                this.props.children
            )
        )
      )
    );
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp: function(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleMouseOut: function(e) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({ zDepth: this.state.initialZDepth, hovered: false });
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleMouseOver: function(e) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({hovered: true});
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleTouchStart: function(e) {
    this.setState({ zDepth: this.state.initialZDepth + 1 });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd: function(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
      React.findDOMNode(this.refs.overlay).style.backgroundColor = ColorManipulator.fade(this.getStyles().icon.color, 0.4);
    } else if (!this.state.hovered) {
      this.setState({ zDepth: this.state.initialZDepth });
      React.findOMNode(this.refs.overlay).style.backgroundColor = 'transparent';
    }
  },

});

module.exports = RaisedButton;

}).call(this,require('_process'))
},{"./enhanced-button":17,"./font-icon":22,"./mixins/style-propable":32,"./paper":35,"./styles/transitions":50,"./utils/color-manipulator":83,"_process":93,"react":undefined}],22:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/spacing');

var FontIcon = React.createClass({displayName: "FontIcon",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      isHovered: false,
    };
  },

  getTheme: function() {
    return this.context.theme.palette;
  },

  getStyles: function() {
    var styles = {
      position: 'relative',
      fontSize: Spacing.iconSize + 'px',
      display: 'inline-block',
      userSelect: 'none'  
    };
    if (!styles.color && !this.props.className) {
      styles.color = this.getTheme().textColor;
    }
    return styles;
  },

  render: function() {
    var $__0=
      
      
      this.props,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{style:1});

    return (
      React.createElement("span", React.__spread({},  other, 
        {style: this.mergeAndPrefix(
          this.getStyles(),
          this.props.style)}))
    );
  }
});

module.exports = FontIcon;

},{"./mixins/style-propable":32,"./styles/spacing":46,"react":undefined}],23:[function(require,module,exports){
(function (process){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var EnhancedButton = require('./enhanced-button');
var FontIcon = require('./font-icon');
var Tooltip = require('./tooltip');

var IconButton = React.createClass({displayName: "IconButton",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    touch: React.PropTypes.bool,
  },

  getInitialState: function() {
    return {
      tooltipShown: false 
    };
  },

  componentDidMount: function() {
    if (this.props.tooltip) {
      this._positionTooltip();
    }
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.iconClassName && this.props.children) {
        var warning = 'You have set both an iconClassName and a child icon. ' +
                      'It is recommended you use only one method when adding ' +
                      'icons to IconButtons.';
        console.warn(warning);
      }
    }
  },

  getTheme: function() {
    return this.context.theme.palette;
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  getDisabledColor: function() {
    return this.context.theme.palette.disabledColor;
  },

  getStyles: function() {
    var styles = {
      root: {
        height: 48,
        width: 48,
        position: 'relative',
        boxSizing: 'border-box',
        transition: Transitions.easeOut(),
        padding: (this.getSpacing().iconSize / 2),
        width: this.getSpacing().iconSize*2,
        height: this.getSpacing().iconSize*2
      },
      tooltip: {
        boxSizing: 'border-box',
        marginTop: this.context.theme.component.button.iconButtonSize + 4
      },
      icon: {
        color: this.getTheme().textColor,
        fill: this.getTheme().textColor
      },
      overlay: {
        position: 'relative',
        top: 0,
        width: '100%',
        height: '100%',
        background: this.getDisabledColor()
      },
      rootWhenDisabled: {
        color: this.getDisabledColor(),
        fill: this.getDisabledColor()
      },
      iconWhenDisabled: {
        color: this.getDisabledColor(),
        fill: this.getDisabledColor()
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
         this.props,tooltip=$__0.tooltip,touch=$__0.touch,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{tooltip:1,touch:1});
    var tooltip;
    var fonticon;

    var styles = this.getStyles();

    if (this.props.tooltip) {
      tooltip = (
        React.createElement(Tooltip, {
          ref: "tooltip", 
          label: tooltip, 
          show: this.state.tooltipShown, 
          touch: touch, 
          style: this.mergeAndPrefix(styles.tooltip)})
      );
    }

    if (this.props.iconClassName) {
      fonticon = (
        React.createElement(FontIcon, {
          className: this.props.iconClassName, 
          style: this.mergeAndPrefix(
            styles.icon, 
            this.props.disabled && styles.iconWhenDisabled,
            this.props.iconStyle
          )})
      );
    }

    if (this.props.children && this.props.disabled) {
      React.Children.forEach(this.props.children, function(child) {
        child.props.style = {
          color: this.getDisabledColor(),
          fill: this.getDisabledColor(),
        }
      }, this);
    } 

    return (
      React.createElement(EnhancedButton, React.__spread({},  other, 
        {ref: "button", 
        centerRipple: true, 
        style: this.mergeAndPrefix(styles.root, this.props.style), 
        onBlur: this._handleBlur, 
        onFocus: this._handleFocus, 
        onMouseOut: this._handleMouseOut, 
        onMouseOver: this._handleMouseOver, 
        onKeyboardFocus: this._handleKeyboardFocus}), 

        tooltip, 
        fonticon, 
        this.props.children

      )
    );
  },

  _positionTooltip: function() {
    var tooltip = React.findDOMNode(this.refs.tooltip);
    var tooltipWidth = tooltip.offsetWidth;
    var buttonWidth = 48;

    tooltip.style.left = (tooltipWidth - buttonWidth) / 2 * -1 + 'px';
  },

  _showTooltip: function() {
    if (!this.props.disabled && this.props.tooltip) {
      this.setState({ tooltipShown: true });
    }
  },

  _hideTooltip: function() {
    this.setState({ tooltipShown: false });
  },

  _handleBlur: function(e) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function(e) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleMouseOut: function(e) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleMouseOver: function(e) {
    this._showTooltip();
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this._showTooltip();
      if (this.props.onFocus) this.props.onFocus(e);
    } else if (!this.state.hovered) {
      this._hideTooltip();
      if (this.props.onBlur) this.props.onBlur(e);
    }
  }

});

module.exports = IconButton;

}).call(this,require('_process'))
},{"./enhanced-button":17,"./font-icon":22,"./mixins/style-propable":32,"./styles/transitions":50,"./tooltip":80,"_process":93,"react":undefined}],24:[function(require,module,exports){
var React = require('react');
var Transitions = require('./styles/transitions');
var StylePropable = require('./mixins/style-propable');
var Colors = require('./styles/colors')
var InkBar = React.createClass({displayName: "InkBar",

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    position: React.PropTypes.string
  },
  
  mixins: [StylePropable],

  getTheme: function() {
    return this.context.theme.palette;
  },

  render: function() {

    var styles = this.mergeAndPrefix({
      left: this.props.left,
      width: this.props.width,
      bottom: '0',
      display: 'block',
      backgroundColor: this.getTheme().accent1Color,
      height: '2px',
      marginTop: '-2px',
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left')
    });

    return (
      React.createElement("div", {style: styles}, 
        " "
      )
    );
  }

});

module.exports = InkBar;

},{"./mixins/style-propable":32,"./styles/colors":45,"./styles/transitions":50,"react":undefined}],25:[function(require,module,exports){
var React = require('react');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var WindowListenable = require('./mixins/window-listenable');
var Overlay = require('./overlay');
var Paper = require('./paper');
var Menu = require('./menu/menu');

var LeftNav = React.createClass({displayName: "LeftNav",

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    docked: React.PropTypes.bool,
    header: React.PropTypes.element,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    className: React.PropTypes.string,
    onNavOpen: React.PropTypes.func,
    onNavClose: React.PropTypes.func
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp',
    'resize': '_onWindowResize'
  },

  getDefaultProps: function() {
    return {
      docked: true
    };
  },

  getInitialState: function() {
    return {
      open: this.props.docked
    };
  },
  
  componentDidMount: function() {
    this._updateMenuHeight();
  },
  
  componentDidUpdate: function(prevProps, prevState) {
    this._updateMenuHeight();
  },

  toggle: function() {
    this.setState({ open: !this.state.open });
    return this;
  },

  close: function() {
    this.setState({ open: false });
    if (this.props.onNavClose) this.props.onNavClose();
    return this;
  },

  open: function() {
    this.setState({ open: true });
    if (this.props.onNavOpen) this.props.onNavOpen();
    return this;
  },

  getThemePalette: function() {
    return this.context.theme.palette;
  },

  getTheme: function() {
    return this.context.theme.component.leftNav;
  },

  getStyles: function() {
    var x = ((-1 * this.getTheme().width) - 10) + 'px';
    var styles = {
      root: {
        height: '100%',
        width: this.getTheme().width,
        position: 'fixed',
        zIndex: 10,
        left: 0,
        top: 0,
        transition: Transitions.easeOut(),
        backgroundColor: this.getTheme().color,
        overflow: 'hidden'
      },
      menu: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%'
      },
      menuItem: {
        height: this.context.theme.spacing.desktopLeftNavMenuItemHeight,
        lineDeight: this.context.theme.spacing.desktopLeftNavMenuItemHeight
      },
      rootWhenNotOpen: {
        transform: 'translate3d(' + x + ', 0, 0)'
      }
    };
    styles.menuItemLink = this.mergeAndPrefix(styles.menuItem, {
      display: 'block',
      textDecoration: 'none',
      color: this.getThemePalette().textColor
    });
    styles.menuItemSubheader = this.mergeAndPrefix(styles.menuItem, {
      overflow: 'hidden'
    });

    return styles;
  },

  render: function() {
    var selectedIndex = this.props.selectedIndex;
    var overlay;

    var styles = this.getStyles();
    if (!this.props.docked) overlay = React.createElement(Overlay, {show: this.state.open, onTouchTap: this._onOverlayTouchTap});


    return (
      React.createElement("div", {className: this.props.className}, 
        overlay, 
        React.createElement(Paper, {
          ref: "clickAwayableElement", 
          zDepth: 2, 
          rounded: false, 
          style: this.mergeAndPrefix(
            styles.root, 
            !this.state.open && styles.rootWhenNotOpen,
            this.props.style)}, 
            this.props.header, 
            React.createElement(Menu, {
              ref: "menuItems", 
              style: this.mergeAndPrefix(styles.menu), 
              zDepth: 0, 
              menuItems: this.props.menuItems, 
              menuItemStyle: this.mergeAndPrefix(styles.menuItem), 
              menuItemStyleLink: this.mergeAndPrefix(styles.menuItemLink), 
              menuItemStyleSubheader: this.mergeAndPrefix(styles.menuItemSubheader), 
              selectedIndex: selectedIndex, 
              onItemClick: this._onMenuItemClick})
        )
      )
    );
  },
  
  _updateMenuHeight: function() {
    if (this.props.header) {
      var container = this.refs.clickAwayableElement.getDOMNode();
      var menu = this.refs.menuItems.getDOMNode();
      var menuHeight = container.clientHeight - menu.offsetTop;
      menu.style.height = menuHeight + 'px';
    }
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.props.selectedIndex !== key) {
      this.props.onChange(e, key, payload);
    }
    if (!this.props.docked) this.close();
  },

  _onOverlayTouchTap: function() {
    this.close();
  },

  _onWindowKeyUp: function(e) {
    if (e.keyCode == KeyCode.ESC &&
        !this.props.docked &&
        this.state.open) {
      this.close();
    }
  },
  
  _onWindowResize: function(e) {
    this._updateMenuHeight();
  }
  
});

module.exports = LeftNav;

},{"./menu/menu":28,"./mixins/style-propable":32,"./mixins/window-listenable":33,"./overlay":34,"./paper":35,"./styles/transitions":50,"./utils/key-code":89,"react":undefined}],26:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');

var LinkMenuItem = React.createClass({displayName: "LinkMenuItem",

  mixins: [StylePropable],
  
  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    payload: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    target: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string,
  },
  
  getDefaultProps: function() {
    return {
      disabled: false
    };
  },

  getInitialState: function() {
    return {
      hovered: false
    }
  },

  getTheme: function() {
    return this.context.theme.component.menuItem;
  },

  getStyles: function() {
    var style = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        display: 'block',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.context.theme.palette.disabledColor
      }
    };
    return style;
  },

  render: function() {
    var onClickHandler = (this.props.disabled) ? this._stopLink : undefined;
    // Prevent context menu 'Open In New Tab/Window'
    var linkAttribute = (this.props.disabled) ? 'data-href' : 'href';
    var link = {};
    link[linkAttribute] = this.props.payload

    var styles = this.getStyles();

    var linkStyles = 
      this.mergeAndPrefix(
        styles.root, 
        this.props.selected && styles.rootWhenSelected,
        (this.state.hovered && !this.props.disabled) && styles.rootWhenHovered,
        this.props.style,
        this.props.disabled && styles.rootWhenDisabled);

    return (
      React.createElement("a", React.__spread({
        key: this.props.index, 
        target: this.props.target, 
        style: linkStyles},  link, 
        {className: this.props.className, 
        onClick: onClickHandler, 
        onMouseOver: this._handleMouseOver, 
        onMouseOut: this._handleMouseOut}), 
          this.props.text
      )
    );
  },
  
  _stopLink: function(event) {
    event.preventDefault();
  },

  _handleMouseOver: function(e) {
    this.setState({hovered: true});
    if (!this.props.disabled && this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (!this.props.disabled && this.props.onMouseOut) this.props.onMouseOut(e);
  }
});

module.exports = LinkMenuItem;
},{"../mixins/style-propable":32,"react":undefined}],27:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var FontIcon = require('../font-icon');
var Toggle = require('../toggle');

var Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED'
};

var MenuItem = React.createClass({displayName: "MenuItem",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
    iconRightClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    iconRightStyle: React.PropTypes.object,
    attribute: React.PropTypes.string,
    number: React.PropTypes.string,
    data: React.PropTypes.string,
    toggle: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onTouchTap: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    selected: React.PropTypes.bool
  },
  
  statics: {
    Types: Types
  },

  getDefaultProps: function() {
    return {
      toggle: false,
      disabled: false
    };
  },

  getInitialState: function() {
    return {
      hovered: false
    }
  },

  getTheme: function() {
    return this.context.theme.component.menuItem;
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  getStyles: function() {
    var styles = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding,
        color: this.context.theme.palette.textColor
      },
      number: {
        float: 'right',
        width: 24,
        textAlign: 'center'
      },
      attribute: {
        float: 'right'
      },
      iconRight: {
        lineHeight: this.getTheme().height + 'px',
        float: 'right'
      },
      icon: {
        float: 'left',
        lineHeight: this.getTheme().height + 'px',
        marginRight: this.getSpacing().desktopGutter
      },
      data: {
        display: 'block',
        paddingLeft: this.getSpacing().desktopGutter * 2,
        lineHeight: this.getTheme().dataHeight + 'px',
        height: this.getTheme().dataHeight + 'px',
        verticalAlign: 'top',
        top: -12,
        position: 'relative',
        fontWeight: 300,
        color: this.context.theme.palette.textColor
      },
      toggle: {
        marginTop: ((this.getTheme().height - this.context.theme.component.radioButton.size) / 2),
        float: 'right',
        width: 42
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.context.theme.palette.disabledColor
      }
    };
    return styles;
  },

  render: function() {
    var icon;
    var data;
    var iconRight;
    var attribute;
    var number;
    var toggle;

    var styles = this.getStyles();

    if (this.props.iconClassName) icon = React.createElement(FontIcon, {style: this.mergeAndPrefix(styles.icon, this.props.iconStyle), className: this.props.iconClassName});
    if (this.props.iconRightClassName) iconRight = React.createElement(FontIcon, {style: this.mergeAndPrefix(styles.iconRight, this.props.iconRightStyle), className: this.props.iconRightClassName});
    if (this.props.data) data = React.createElement("span", {style: this.mergeAndPrefix(styles.data)}, this.props.data);
    if (this.props.number !== undefined) number = React.createElement("span", {style: this.mergeAndPrefix(styles.number)}, this.props.number);
    if (this.props.attribute !== undefined) attribute = React.createElement("span", {style: this.mergeAndPrefix(styles.style)}, this.props.attribute);
    
    if (this.props.toggle) {
      var $__0=
        
        
        
        
        
        
        
        
        
        this.props,toggle=$__0.toggle,onClick=$__0.onClick,onToggle=$__0.onToggle,onMouseOver=$__0.onMouseOver,onMouseOut=$__0.onMouseOut,children=$__0.children,label=$__0.label,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{toggle:1,onClick:1,onToggle:1,onMouseOver:1,onMouseOut:1,children:1,label:1,style:1});
      toggle = React.createElement(Toggle, React.__spread({},  other, {onToggle: this._handleToggle, style: styles.toggle}));
    }

    return (
      React.createElement("div", {
        key: this.props.index, 
        className: this.props.className, 
        onTouchTap: this._handleTouchTap, 
        onClick: this._handleOnClick, 
        onMouseOver: this._handleMouseOver, 
        onMouseOut: this._handleMouseOut, 
        style: this.mergeAndPrefix(
          styles.root, 
          this.props.selected && styles.rootWhenSelected,
          (this.state.hovered && !this.props.disabled) && styles.rootWhenHovered,
          this.props.style,
          this.props.disabled && styles.rootWhenDisabled)}, 

        icon, 
        this.props.children, 
        data, 
        attribute, 
        number, 
        toggle, 
        iconRight
        
      )
    );
  },

  _handleTouchTap: function(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.index);
  },

  _handleOnClick: function(e) {
    if (!this.props.disabled && this.props.onClick) this.props.onClick(e, this.props.index);
  },

  _handleToggle: function(e, toggled) {
    if (!this.props.disabled && this.props.onToggle) this.props.onToggle(e, this.props.index, toggled);
  },

  _handleMouseOver: function(e) {
    this.setState({hovered: true});
    if (!this.props.disabled && this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (!this.props.disabled && this.props.onMouseOut) this.props.onMouseOut(e);
  }

});

module.exports = MenuItem;

},{"../font-icon":22,"../mixins/style-propable":32,"../toggle":75,"react":undefined}],28:[function(require,module,exports){
var React = require('react');
var CssEvent = require('../utils/css-event');
var Dom = require('../utils/dom');
var KeyLine = require('../utils/key-line');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/transitions');
var ClickAwayable = require('../mixins/click-awayable');
var Paper = require('../paper');
var MenuItem = require('./menu-item');
var LinkMenuItem = require('./link-menu-item');
var SubheaderMenuItem = require('./subheader-menu-item');

/***********************
* Nested Menu Component
***********************/
var NestedMenuItem = React.createClass({displayName: "NestedMenuItem",

  mixins: [ClickAwayable, StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    text: React.PropTypes.string,
    menuItems: React.PropTypes.array.isRequired,
    zDepth: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    onItemClick: React.PropTypes.func,
    onItemTap: React.PropTypes.func,
    menuItemStyle: React.PropTypes.object,
  },
  
  getDefaultProps: function() {
    return {
      disabled: false
    };
  },

  getInitialState: function() {
    return { open: false }
  },

  componentClickAway: function() {
    this._closeNestedMenu();
  },

  componentDidMount: function() {
    this._positionNestedMenu();
  },

  componentDidUpdate: function(prevProps, prevState) {
    this._positionNestedMenu();
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  render: function() {
    var styles = this.mergeAndPrefix({
      position: 'relative'
    }, this.props.style);

    var iconCustomArrowDropRight = {
      marginRight: this.getSpacing().desktopGutterMini * -1,
      color: this.context.theme.component.dropDownMenu.accentColor
    };

    var $__0=
      
      
      
      this.props,index=$__0.index,menuItemStyle=$__0.menuItemStyle,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{index:1,menuItemStyle:1});

    return (
      React.createElement("div", {ref: "root", style: styles, onMouseEnter: this._openNestedMenu, onMouseLeave: this._closeNestedMenu}, 
        React.createElement(MenuItem, {
          index: index, 
          style: menuItemStyle, 
          disabled: this.props.disabled, 
          iconRightStyle: iconCustomArrowDropRight, 
          iconRightClassName: "muidocs-icon-custom-arrow-drop-right", 
          onClick: this._onParentItemClick}, 
            this.props.text
        ), 
        React.createElement(Menu, React.__spread({},  other, 
          {ref: "nestedMenu", 
          menuItems: this.props.menuItems, 
          onItemClick: this._onMenuItemClick, 
          onItemTap: this._onMenuItemTap, 
          hideable: true, 
          visible: this.state.open, 
          zDepth: this.props.zDepth + 1}))
      )
    );
  },

  _positionNestedMenu: function() {
// <<<<<<< HEAD:src/menu/menu.jsx
    var el = this.getDOMNode();
    var nestedMenu = React.findDOMNode(this.refs.nestedMenu);
// =======
//     var el = React.findDOMNode(this),
//       nestedMenu = React.findDOMNode(this.refs.nestedMenu);

// >>>>>>> master:src/js/menu/menu.jsx
    nestedMenu.style.left = el.offsetWidth + 'px';
  },
  
  _openNestedMenu: function() {
    if (!this.props.disabled) this.setState({ open: true });
  },
  
  _closeNestedMenu: function() {
    this.setState({ open: false });
  },
  
  _toggleNestedMenu: function() {
    if (!this.props.disabled) this.setState({ open: !this.state.open });
  },

  _onParentItemClick: function() {
    this._toggleNestedMenu();
  },

  _onMenuItemClick: function(e, index, menuItem) {
    if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
    this._closeNestedMenu();
  },
  
  _onMenuItemTap: function(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
    this._closeNestedMenu();
  }

});


/****************
* Menu Component
****************/
var Menu = React.createClass({displayName: "Menu",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    autoWidth: React.PropTypes.bool,
    onItemTap: React.PropTypes.func,
    onItemClick: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    hideable: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    zDepth: React.PropTypes.number,
    menuItemStyle: React.PropTypes.object,
    menuItemStyleSubheader: React.PropTypes.object,
    menuItemStyleLink: React.PropTypes.object,
    menuItemClassName: React.PropTypes.string,
    menuItemClassNameSubheader: React.PropTypes.string,
    menuItemClassNameLink: React.PropTypes.string,
  },

  getInitialState: function() {
    return { nestedMenuShown: false }
  },

  getDefaultProps: function() {
    return {
      autoWidth: true,
      hideable: false,
      visible: true,
      zDepth: 1,
    };
  },

  componentDidMount: function() {
    var el = React.findDOMNode(this);

    //Set the menu width
    this._setKeyWidth(el);

    //Save the initial menu height for later
    this._initialMenuHeight = el.offsetHeight;

    //Show or Hide the menu according to visibility
    this._renderVisibility();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.visible !== prevProps.visible) this._renderVisibility();
  },

  getTheme: function() {
    return this.context.theme.component.menu
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  getStyles: function() {
    var styles = {
      root: {
        backgroundColor: this.getTheme().backgroundColor,
        transition: Transitions.easeOut(null, 'height')
      },
      innerPaper: {
        paddingTop: this.getSpacing().desktopGutterMini,
        paddingBottom: this.getSpacing().desktopGutterMini,
        backgroundColor: this.getTheme().containerBackgroundColor
      },
      subheader: {
        paddingLeft: this.context.theme.component.menuSubheader.padding,
        paddingRight: this.context.theme.component.menuSubheader.padding
      },
      hideable: {
        opacity: (this.props.visible) ? 1 : 0,
        position: 'absolute',
        top: 0,
        zIndex: 1
      },
      innerPaperWhenHideable: {
        overflow: 'hidden'
      }
    };
    return styles;
  },

  render: function() {
    var styles = this.getStyles();
    return (
      React.createElement(Paper, {
        ref: "paperContainer", 
        zDepth: this.props.zDepth, 
        style: this.mergeAndPrefix(
          styles.root,
          this.props.hideable && styles.hideable,
          this.props.style), 
        innerStyle: this.mergeAndPrefix(
          styles.innerPaper,
          this.props.hideable && styles.innerPaperWhenHideable)}, 
            this._getChildren()
      )
    );
  },

  _getChildren: function() {
    var children = [],
      menuItem,
      itemComponent,
      isSelected,
      isDisabled;

    var styles = this.getStyles();

    //This array is used to keep track of all nested menu refs
    this._nestedChildren = [];

    for (var i=0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isSelected = i === this.props.selectedIndex;
      isDisabled = (menuItem.disabled === undefined) ? false : menuItem.disabled;

      var $__0=
        
        
        
        
        
        
        
        menuItem,icon=$__0.icon,data=$__0.data,attribute=$__0.attribute,number=$__0.number,toggle=$__0.toggle,onClick=$__0.onClick,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{icon:1,data:1,attribute:1,number:1,toggle:1,onClick:1});

      switch (menuItem.type) {

        case MenuItem.Types.LINK:
          itemComponent = (
            React.createElement(LinkMenuItem, {
              key: i, 
              index: i, 
              text: menuItem.text, 
              disabled: isDisabled, 
              className: this.props.menuItemClassNameLink, 
              style: this.props.menuItemStyleLink, 
              payload: menuItem.payload, 
              target: menuItem.target})
          );
          break;

        case MenuItem.Types.SUBHEADER:
          itemComponent = (
            React.createElement(SubheaderMenuItem, {
              key: i, 
              index: i, 
              className: this.props.menuItemClassNameSubheader, 
              style: this.mergeAndPrefix(styles.subheader), 
              firstChild: i == 0, 
              text: menuItem.text})
          );
          break;

        case MenuItem.Types.NESTED:
          var $__1=
            
            
            
            
            
            this.props,ref=$__1.ref,key=$__1.key,index=$__1.index,zDepth=$__1.zDepth,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__1,{ref:1,key:1,index:1,zDepth:1});

          itemComponent = (
            React.createElement(NestedMenuItem, React.__spread({}, 
              other, 
              {ref: i, 
              key: i, 
              index: i, 
              text: menuItem.text, 
              disabled: isDisabled, 
              menuItems: menuItem.items, 
              menuItemStyle: this.props.menuItemStyle, 
              zDepth: this.props.zDepth, 
              onItemClick: this._onNestedItemClick, 
              onItemTap: this._onNestedItemClick}))
          );
          this._nestedChildren.push(i);
          break;

        default:
          itemComponent = (
            React.createElement(MenuItem, React.__spread({}, 
              other, 
              {selected: isSelected, 
              key: i, 
              index: i, 
              icon: menuItem.icon, 
              data: menuItem.data, 
              className: this.props.menuItemClassName, 
              style: this.props.menuItemStyle, 
              attribute: menuItem.attribute, 
              number: menuItem.number, 
              toggle: menuItem.toggle, 
              onToggle: this.props.onToggle, 
              disabled: isDisabled, 
              onClick: this._onItemClick, 
              onTouchTap: this._onItemTap}), 
              menuItem.text
            )
          );
      }
      children.push(itemComponent);
    }

    return children;
  },

  _setKeyWidth: function(el) {
    var menuWidth = this.props.autoWidth ?
      KeyLine.getIncrementalDim(el.offsetWidth) + 'px' :
      '100%';

    //Update the menu width
    Dom.withoutTransition(el, function() {
      el.style.width = menuWidth;
    });
  },

  _renderVisibility: function() {
    var el;

    if (this.props.hideable) {    
      el = React.findDOMNode(this);
      var innerContainer = React.findDOMNode(this.refs.paperContainer.getInnerContainer());
      
      if (this.props.visible) {
        //Open the menu
        el.style.transition = Transitions.easeOut();
        el.style.height = this._initialMenuHeight + 'px';

        //Set the overflow to visible after the animation is done so
        //that other nested menus can be shown
        CssEvent.onTransitionEnd(el, function() {
          //Make sure the menu is open before setting the overflow.
          //This is to accout for fast clicks
          if (this.props.visible) innerContainer.style.overflow = 'visible';
        }.bind(this));

      } else {

        //Close the menu
        el.style.height = '0px';

        //Set the overflow to hidden so that animation works properly
        innerContainer.style.overflow = 'hidden';
      }
    }
  },

  _onNestedItemClick: function(e, index, menuItem) {
    if (this.props.onItemClick) this.props.onItemClick(e, index, menuItem);
  },

  _onNestedItemTap: function(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
  },

  _onItemClick: function(e, index) {
    if (this.props.onItemClick) this.props.onItemClick(e, index, this.props.menuItems[index]);
  },

  _onItemTap: function(e, index) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.menuItems[index]);
  },

  _onItemToggle: function(e, index, toggled) {
    if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.menuItems[index], toggled);
  }

});

module.exports = Menu;

},{"../mixins/click-awayable":31,"../mixins/style-propable":32,"../paper":35,"../styles/transitions":50,"../utils/css-event":84,"../utils/dom":86,"../utils/key-line":90,"./link-menu-item":26,"./menu-item":27,"./subheader-menu-item":29,"react":undefined}],29:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/typography');

var SubheaderMenuItem = React.createClass({displayName: "SubheaderMenuItem",
  
  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
      index: React.PropTypes.number.isRequired,
      text: React.PropTypes.string.isRequired,
      firstChild: React.PropTypes.bool,
      className: React.PropTypes.string,
  },

  getTheme: function() {
    return this.context.theme.component.menuSubheader;
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  getStyles: function() {
    var gutterMini = this.getSpacing().desktopGutterMini;
    var subheaderHeight = this.getSpacing().desktopSubheaderHeight;
    var styles = {
      root: {
        boxSizing: 'border-box',
        fontSize: '13px',
        letterSpacing: 0,
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
        margin: 0,
        height: subheaderHeight + gutterMini,
        lineHeight: subheaderHeight + 'px',
        color: this.getTheme().textColor,
        borderTop: 'solid 1px ' + this.getTheme().borderColor,
        paddingTop: gutterMini,
        marginTop: gutterMini
      },
      rootWhenFirstChild: {
        height: subheaderHeight,
        borderTop: 'none',
        paddingTop: 0,
        marginTop: 0        
      }
    };
    return styles;
  },

  render: function() {
    return (
        React.createElement("div", {
        	key: this.props.index, 
          className: this.props.className, 
          style: this.mergeAndPrefix(
            this.getStyles().root,
            this.props.firstChild && this.getStyles().rootWhenFirstChild,
            this.props.style
          )}, 
        		this.props.text
        )
    );
  }
  
});

module.exports = SubheaderMenuItem;
},{"../mixins/style-propable":32,"../styles/typography":51,"react":undefined}],30:[function(require,module,exports){
var React = require('react');
var classNames = require('classnames');

module.exports = {

  propTypes: {
    className: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      className: ''
    }
  },

  getClasses: function(initialClasses, additionalClassObj) {
    var classString = '';

    //Initialize the classString with the classNames that were passed in
    if (this.props.className.length) classString += ' ' + this.props.className;

    //Add in initial classes
    if (typeof initialClasses === 'object') {
      classString += ' ' + classNames(initialClasses);
    } else {
      classString += ' ' + initialClasses;
    }

    //Add in additional classes
    if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

    //Convert the class string into an object and run it through the class set
    return classNames(this.getClassSet(classString));
  },

  getClassSet: function(classString) {
    var classObj = {};

    if (classString) {
      classString.split(' ').forEach(function(className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  }

}

},{"classnames":94,"react":undefined}],31:[function(require,module,exports){
var React = require('react');
var Events = require('../utils/events');
var Dom = require('../utils/dom');

module.exports = {

  //When the component mounts, listen to click events and check if we need to
  //Call the componentClickAway function.
  componentDidMount: function() {
    if (!this.manuallyBindClickAway) this._bindClickAway();
  },

  componentWillUnmount: function() {
    this._unbindClickAway();
  },

  _checkClickAway: function(e) {
    var el = React.findDOMNode(this); 
    
    // Check if the target is inside the current component
    if (this.isMounted() && 
      e.target != el &&
      !Dom.isDescendant(el, e.target) &&
      document.documentElement.contains(e.target)) {
      
      if (this.componentClickAway) this.componentClickAway();
    }
  },

  _bindClickAway: function() {
    Events.on(document, 'click', this._checkClickAway);
  },

  _unbindClickAway: function() {
    Events.off(document, 'click', this._checkClickAway);
  }

};

},{"../utils/dom":86,"../utils/events":87,"react":undefined}],32:[function(require,module,exports){
var React = require('react/addons');
var AutoPrefix = require('../styles/auto-prefix');
var Extend = require('../utils/extend');

/**
 *	@params:
 *	styles = Current styles.
 *  props = New style properties that will override the current style.
 */
module.exports = {

  propTypes: {
    style: React.PropTypes.object
  },

  mergeStyles: function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var base = args[0];
    for (var i = 1; i < args.length; i++) {
      if (args[i]) base = Extend(base, args[i]);
    }
    return base;
  },


  /** 
   * m loops through all properties defined in the first argument, so overrides
   * of undefined properties will not take place.
   */
  mergeAndPrefix: function() {
    var args = Array.prototype.slice.call(arguments, 0);

    var base = args[0];
    for (var i = 1; i < args.length; i++) {
      if (args[i]) base = Extend(base, args[i]);
    }

    return AutoPrefix.all(base);
    // return function(args){
    //   return AutoPrefix.all()
    // }.bind()
	},
}

},{"../styles/auto-prefix":44,"../utils/extend":88,"react/addons":undefined}],33:[function(require,module,exports){
var Events = require('../utils/events');

module.exports = {

  componentDidMount: function() {
    var listeners = this.windowListeners;

    for (var eventName in listeners) {
       var callbackName = listeners[eventName];
       Events.on(window, eventName, this[callbackName]);
    }
  },

  componentWillUnmount: function() {
    var listeners = this.windowListeners;

    for (var eventName in listeners) {
       var callbackName = listeners[eventName];
       Events.off(window, eventName, this[callbackName]);
    }
  }
  
}
},{"../utils/events":87}],34:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Colors = require('./styles/colors');

var Overlay = React.createClass({displayName: "Overlay",

  mixins: [StylePropable],

  propTypes: {
    show: React.PropTypes.bool,
    autoLockScrolling: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      autoLockScrolling: true
    };
  },
  
  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.autoLockScrolling) (this.props.show) ? this._preventScrolling() : this._allowScrolling();
  },

  getStyles: function() {
    var styles = {
      root: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        zIndex: 9,
        top: 0,
        left: '-100%',
        backgroundColor: Colors.transparent,
        transition:
          Transitions.easeOut('0ms', 'left', '400ms') + ',' +
          Transitions.easeOut('400ms', 'backgroundColor')
      },
      rootWhenShown: {
        left: '0',
        backgroundColor: Colors.lightBlack,
        transition:
          Transitions.easeOut('0ms', 'left') + ',' +
          Transitions.easeOut('400ms', 'backgroundColor')
      }
    };
    return styles;
  },

  render: function() {

    var $__0=
      
      
      
      this.props,show=$__0.show,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{show:1,style:1});

    var styles = this.mergeAndPrefix(this.getStyles().root, this.props.style, this.props.show && this.getStyles().rootWhenShown)

    return (
      React.createElement("div", React.__spread({},  other, {style: styles}))
    );
  },
  
  preventScrolling: function() {
    if (!this.props.autoLockScrolling) this._preventScrolling();
  },
  
  allowScrolling: function() {
    if (!this.props.autoLockScrolling) this._allowScrolling();
  },
  
  _preventScrolling: function() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  },
  
  _allowScrolling: function() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = '';
  }

});

module.exports = Overlay;
},{"./mixins/style-propable":32,"./styles/colors":45,"./styles/transitions":50,"react":undefined}],35:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Paper = React.createClass({displayName: "Paper",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    circle: React.PropTypes.bool,
    className: React.PropTypes.string,
    innerClassName: React.PropTypes.string,
    innerStyle: React.PropTypes.object,
    rounded: React.PropTypes.bool,
    zDepth: React.PropTypes.oneOf([0,1,2,3,4,5]),
  },

  getDefaultProps: function() {
    return {
      innerClassName: '',
      rounded: true,
      zDepth: 1
    };
  },

  getStyles: function() {
    var styles = {
      root: {
        backgroundColor: this.context.theme.component.paper.backgroundColor,
        transition: Transitions.easeOut(),
        boxSizing: 'border-box',
        fontFamily: this.context.theme.contentFontFamily,
        WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
        boxShadow: this._getZDepthShadows(this.props.zDepth).boxShadow,
        borderRadius: this.props.circle ? '50%' : 
                      this.props.rounded ? '2px' :
                      '0px'
      },
      inner: {
        width: '100%', 
        height: '100%',
        boxSizing: 'border-box',
        fontFamily: this.context.theme.contentFontFamily,
        WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
        boxShadow: this._getZDepthShadows(this.props.zDepth).bottomBoxShadow,
        borderRadius: this.props.circle ? '50%' : 
                      this.props.rounded ? '2px' :
                      '0px'       
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      
      
      
      
      
         this.props,className=$__0.className,innerClassName=$__0.innerClassName,style=$__0.style,innerStyle=$__0.innerStyle,circle=$__0.circle,rounded=$__0.rounded,zDepth=$__0.zDepth,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,innerClassName:1,style:1,innerStyle:1,circle:1,rounded:1,zDepth:1});

    var styles = this.getStyles();

    return (
      React.createElement("div", React.__spread({},  other, {className: this.props.className, style: this.mergeAndPrefix(styles.root, this.props.style)}), 
        React.createElement("div", {ref: "innerContainer", className: this.props.innerClassName, style: this.mergeAndPrefix(styles.inner, this.props.innerStyle)}, 
          this.props.children
        )
      )
    );
  },

  getInnerContainer: function() {
    return this.refs.innerContainer;
  },

  _getZDepthShadows: function(zDepth) {
    var shadows = [
      {
        boxShadow: '',
        bottomBoxShadow: '',
      },
      {
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.24)',
        bottomBoxShadow: '0 1px 6px rgba(0, 0, 0, 0.12)',
      },
      {
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.23)',
        bottomBoxShadow: '0 3px 10px rgba(0, 0, 0, 0.16)',
      },
      {
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.23)',
        bottomBoxShadow: '0 10px 30px rgba(0, 0, 0, 0.19)',
      },
      {
        boxShadow: '0 10px 18px rgba(0, 0, 0, 0.22)',
        bottomBoxShadow: '0 14px 45px rgba(0, 0, 0, 0.25)',
      },
      {
        boxShadow: '0 15px 20px rgba(0, 0, 0, 0.22)',
        bottomBoxShadow: '0 19px 60px rgba(0, 0, 0, 0.30)',
      },
    ];

    return shadows[zDepth];
  }

});

module.exports = Paper;

},{"./mixins/style-propable":32,"./styles/transitions":50,"react":undefined}],36:[function(require,module,exports){
(function (process){
var React = require('react');
var Paper = require('./paper');
var EnhancedSwitch = require('./enhanced-switch');
var RadioButton = require('./radio-button');

var RadioButtonGroup = React.createClass({displayName: "RadioButtonGroup",

	propTypes: {
		name: React.PropTypes.string.isRequired,
    valueSelected: React.PropTypes.string,
    defaultSelected: React.PropTypes.string,
    labelPosition: React.PropTypes.oneOf(['left', 'right']),
		onChange: React.PropTypes.func
	},

  _hasCheckAttribute: function(radioButton) {
    return radioButton.props.hasOwnProperty('checked') && 
      radioButton.props.checked; 
  },

  getInitialState: function() {
    return {
      numberCheckedRadioButtons: 0,
      selected: this.props.valueSelected || this.props.defaultSelected || ''
    };
  },

  componentWillMount: function() {
    var cnt = 0;
    
    this.props.children.forEach(function(option) {
      if (this._hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({numberCheckedRadioButtons: cnt});
  }, 

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({selected: nextProps.valueSelected});
    }
  },

	render: function() {

    var options = this.props.children.map(function(option) {
      
      var $__0=
        
         
        
        
        
        option.props,name=$__0.name,value=$__0.value,label=$__0.label,onCheck=$__0.onCheck,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{name:1,value:1,label:1,onCheck:1});

      return React.createElement(RadioButton, React.__spread({}, 
        other, 
        {ref: option.props.value, 
        name: this.props.name, 
        key: option.props.value, 
        value: option.props.value, 
        label: option.props.label, 
        labelPosition: this.props.labelPosition, 
        onCheck: this._onChange, 
        checked: option.props.value == this.state.selected}))

		}, this);

		return (
			React.createElement("div", null, 
				options
			)
		);
	},

  _updateRadioButtons: function(newSelection) {
    if (this.state.numberCheckedRadioButtons == 0) {
      this.setState({selected: newSelection});
    } else if (process.env.NODE_ENV !== 'production') {
      var message = "Cannot select a different radio button while another radio button " +
                    "has the 'checked' property set to true.";
      console.error(message);
    }
  },

	_onChange: function(e, newSelection) {
    this._updateRadioButtons(newSelection);

    // Successful update
    if (this.state.numberCheckedRadioButtons == 0) {
      if (this.props.onChange) this.props.onChange(e, newSelection);
    }
	},

  getSelectedValue: function() {
    return this.state.selected;
  },

  setSelectedValue: function(newSelectionValue) {
    this._updateRadioButtons(newSelectionValue);  
  },

  clearValue: function() {
    this.setSelectedValue('');  
  }

});

module.exports = RadioButtonGroup;

}).call(this,require('_process'))
},{"./enhanced-switch":18,"./paper":35,"./radio-button":37,"_process":93,"react":undefined}],37:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var EnhancedSwitch = require('./enhanced-switch');
var RadioButtonOff = require('./svg-icons/toggle-radio-button-off');
var RadioButtonOn = require('./svg-icons/toggle-radio-button-on');

var RadioButton = React.createClass({displayName: "RadioButton",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    iconStyle: React.PropTypes.object,
    onCheck: React.PropTypes.func
  },

  getTheme: function() {
    return this.context.theme.component.radioButton;
  },

  getStyles: function() {
    var styles = {
      icon: {
          height: this.getTheme().size,
          width: this.getTheme().size
      },
      target: {
          transition: Transitions.easeOut(),
          position: 'absolute',
          opacity: 1,
          transform: 'scale(1)',
          fill: this.getTheme().borderColor
      },
      fill: {
          position: 'absolute',
          opacity: 1,
          transform: 'scale(0)',
          transformOrigin: '50% 50%',
          transition: Transitions.easeOut(),
          fill: this.getTheme().checkedColor
      },
      targetWhenChecked: {
        opacity: 0,
        transform: 'scale(0)'
      },
      fillWhenChecked: {
        opacity: 1,
        transform: 'scale(1)'
      },
      targetWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      fillWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      this.props,onCheck=$__0.onCheck,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onCheck:1});

    var styles = this.getStyles();
    var onStyles = 
      this.mergeAndPrefix(
        styles.target,
        this.props.checked && styles.targetWhenChecked,
        this.props.iconStyle,
        this.props.disabled && styles.targetWhenDisabled);
    var offStyles = 
      this.mergeAndPrefix(
        styles.fill,
        this.props.checked && styles.fillWhenChecked,
        this.props.iconStyle,
        this.props.disabled && styles.fillWhenDisabled);

    var radioButtonElement = (
      React.createElement("div", null, 
          React.createElement(RadioButtonOff, {style: onStyles}), 
          React.createElement(RadioButtonOn, {style: offStyles})
      )
    );

    var rippleColor = this.props.checked ? this.getTheme().checkedColor : this.getTheme().borderColor;

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "radio",
      switched: this.props.checked,
      switchElement: radioButtonElement,
      rippleColor: rippleColor,
      iconStyle: styles.icon,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
    };

    return (
      React.createElement(EnhancedSwitch, React.__spread({},  
        other, 
        enhancedSwitchProps))
    );
  },

  // Only called when selected, not when unselected.
  _handleCheck: function(e) {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
  },

  _handleStateChange: function(newSwitched) {
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  // Use RadioButtonGroup.setSelectedValue(newSelectionValue) to set a 
  // RadioButton's checked value.
  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },
  
  getValue: function() {
    return this.refs.enhancedSwitch.getValue();
  }

});

module.exports = RadioButton;

},{"./enhanced-switch":18,"./mixins/style-propable":32,"./styles/transitions":50,"./svg-icons/toggle-radio-button-off":59,"./svg-icons/toggle-radio-button-on":60,"react":undefined}],38:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ColorManipulator = require('./utils/color-manipulator');
var Typography = require('./styles/typography');
var EnhancedButton = require('./enhanced-button');
var Paper = require('./paper');

var RaisedButton = React.createClass({displayName: "RaisedButton",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    label: function(props, propName, componentName){
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
      }
    },
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    labelStyle: React.PropTypes.object,
  },

  getInitialState: function() {
    var zDepth = this.props.disabled ? 0 : 1;
    return {
      zDepth: zDepth,
      initialZDepth: zDepth,
      hovered: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var zDepth = nextProps.disabled ? 0 : 1;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth,
    });
    this.styles = this.getStyles();
  },

  _getBackgroundColor: function() {
    return  this.props.disabled ? this.getTheme().disabledColor :
            this.props.primary ? this.getTheme().primaryColor :
            this.props.secondary ? this.getTheme().secondaryColor :
            this.getTheme().color; 
  },

  _getLabelColor: function() {
    return  this.props.disabled ? this.getTheme().disabledTextColor :
            this.props.primary ? this.getTheme().primaryTextColor :
            this.props.secondary ? this.getTheme().secondaryTextColor :
            this.getTheme().textColor;
  },

  getThemeButton: function() {
    return this.context.theme.component.button;
  },

  getTheme: function() {
    return this.context.theme.component.raisedButton;
  },

  getStyles: function() {
    var amount = (this.props.primary || this.props.secondary) ? 0.4 : 0.08;
    var styles = {
      root: {
        display: 'inline-block',
        minWidth: this.getThemeButton().minWidth,
        height: this.getThemeButton().height
      },
      container: {
        position: 'relative',
        height: '100%',
        width: '100%',
        padding: 0,
        overflow: 'hidden',
        borderRadius: 2,
        transition: Transitions.easeOut(),
        backgroundColor: this._getBackgroundColor(),

        //This is need so that ripples do not bleed
        //past border radius.
        //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
        transform: 'translate3d(0, 0, 0)'
      },
      label: {
        position: 'relative',
        opacity: 1,
        fontSize: '14px',
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: Typography.fontWeightMedium,
        margin: 0,
        padding: '0px ' + this.context.theme.spacing.desktopGutterLess + 'px',
        userSelect: 'none',
        lineHeight: this.getThemeButton().height + 'px',
        color:  this._getLabelColor(),
      },
      overlay: {
        transition: Transitions.easeOut(),
        top: 0
      },
      overlayWhenHovered: {
        backgroundColor: ColorManipulator.fade(this._getLabelColor(), amount)
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      
         this.props,label=$__0.label,primary=$__0.primary,secondary=$__0.secondary,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{label:1,primary:1,secondary:1});

    if (!this.hasOwnProperty('styles')) this.styles = this.getStyles();

    var labelElement;
    if (label) {
      labelElement = (
        React.createElement("span", {style: this.mergeAndPrefix(this.styles.label, this.props.labelStyle)}, 
          label
        )
      );
    }

    var rippleColor = this.styles.label.color;
    var rippleOpacity = !(primary || secondary) ? 0.1 : 0.16;

    if (!this.hasOwnProperty('styles')) this.styles = this.getStyles();

    return (
      React.createElement(Paper, {
        style: this.mergeAndPrefix(this.styles.root, this.props.style), 
        innerStyle: {transition: Transitions.easeOut()}, 
        zDepth: this.state.zDepth}, 
          React.createElement(EnhancedButton, React.__spread({},  other, 
            {ref: "container", 
            style: this.mergeAndPrefix(this.styles.container), 
            onMouseUp: this._handleMouseUp, 
            onMouseDown: this._handleMouseDown, 
            onMouseOut: this._handleMouseOut, 
            onMouseOver: this._handleMouseOver, 
            onTouchStart: this._handleTouchStart, 
            onTouchEnd: this._handleTouchEnd, 
            focusRippleColor: rippleColor, 
            touchRippleColor: rippleColor, 
            focusRippleOpacity: rippleOpacity, 
            touchRippleOpacity: rippleOpacity, 
            onKeyboardFocus: this._handleKeyboardFocus}), 
              React.createElement("div", {ref: "overlay", style: this.mergeAndPrefix(
                  this.styles.overlay,
                  (this.state.hovered && !this.props.disabled) && this.styles.overlayWhenHovered
                )}, 
                  labelElement, 
                  this.props.children
              )
          )
      )
    );
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp: function(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleMouseOut: function(e) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({ zDepth: this.state.initialZDepth, hovered: false });
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleMouseOver: function(e) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({hovered: true});
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleTouchStart: function(e) {
    this.setState({ zDepth: this.state.initialZDepth + 1 });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd: function(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
      var amount = (this.props.primary || this.props.secondary) ? 0.4 : 0.08;
      this.refs.overlay.getDOMNode().style.backgroundColor = ColorManipulator.fade(this.mergeAndPrefix(this.styles.label, this.props.labelStyle).color, amount);
    } else if (!this.state.hovered) {
      this.setState({ zDepth: this.state.initialZDepth });
      this.refs.overlay.getDOMNode().style.backgroundColor = 'transparent';
    }
  },
});

module.exports = RaisedButton;
},{"./enhanced-button":17,"./mixins/style-propable":32,"./paper":35,"./styles/transitions":50,"./styles/typography":51,"./utils/color-manipulator":83,"react":undefined}],39:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/transitions');
var Colors = require('../styles/colors');

var RippleCircle = React.createClass({displayName: "RippleCircle",

  mixins: [StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
    started: React.PropTypes.bool,
    ending: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      color: Colors.darkBlack
    };
  },

  render: function() {
    var $__0=
      
      
      
      
      
      this.props,color=$__0.color,started=$__0.started,ending=$__0.ending,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{color:1,started:1,ending:1,style:1});

    var styles = this.mergeAndPrefix({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      opacity:  this.props.ending ? 0 : 
                this.props.opacity ? this.props.opacity : 0.16,
      borderRadius: '50%',
      transform: this.props.started ? 'scale(1)' : 'scale(0)',
      backgroundColor: this.props.color,
      transition:
        Transitions.easeOut('2s', 'opacity') + ',' +
        Transitions.easeOut('1s', 'transform')
    }, this.props.style);

    return (
      React.createElement("div", React.__spread({},  other, {style: styles}))
    );
  }

});

module.exports = RippleCircle;
},{"../mixins/style-propable":32,"../styles/colors":45,"../styles/transitions":50,"react":undefined}],40:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transitions = require('../styles/transitions');
var Colors = require('../styles/colors');

var pulsateDuration = 750;

var FocusRipple = React.createClass({displayName: "FocusRipple",

  mixins: [StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
    show: React.PropTypes.bool,
    innerStyle: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      color: Colors.darkBlack
    };
  },

  componentDidMount: function() {
    this._setRippleSize();
    this._pulsate();
  },

  render: function() {

    var outerStyles = this.mergeAndPrefix({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(),
      transform: this.props.show ? 'scale(1)' : 'scale(0)',
      opacity: this.props.show ? 1 : 0
    }, this.props.style);

    var innerStyles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      opacity: this.props.opacity ? this.props.opacity : 0.16,
      backgroundColor: this.props.color,
      transition: Transitions.easeOut(pulsateDuration + 'ms', null, null, Transitions.easeInOutFunction)
    }, this.props.innerStyle);

    return (
      React.createElement("div", {style: outerStyles}, 
        React.createElement("div", {ref: "innerCircle", style: innerStyles})
      )
    );
  },

  _pulsate: function() {
    if (!this.isMounted()) return;

    var startScale = 'scale(0.75)';
    var endScale = 'scale(0.85)';
    var innerCircle = React.findDOMNode(this.refs.innerCircle);
    var currentScale = innerCircle.style.transform;
    var nextScale;

    currentScale = currentScale || startScale;
    nextScale = currentScale === startScale ?
      endScale : startScale;

    innerCircle.style.transform = nextScale;
    setTimeout(this._pulsate, pulsateDuration);
  },

  _setRippleSize: function() {
    var el = React.findDOMNode(this);
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    var size = Math.max(height, width);

    el.style.height = size + 'px';
    el.style.top = (size / 2 * -1) + (height / 2) + 'px';
  }

});

module.exports = FocusRipple;
},{"../mixins/style-propable":32,"../styles/colors":45,"../styles/transitions":50,"react":undefined}],41:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Dom = require('../utils/dom');
var RippleCircle = require('./circle');
var TouchRipple = React.createClass({displayName: "TouchRipple",

  mixins: [StylePropable],

  propTypes: {
    centerRipple: React.PropTypes.bool,
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
  },

  getInitialState: function() {
    return {
      ripples: [{
        key: 0,
        started: false,
        ending: false
      }],
      touchInProgress: false
    };
  },

  render: function() {

    var styles = this.mergeAndPrefix({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    }, this.props.style);

    return (
      React.createElement("div", {
        onMouseUp: this._handleMouseUp, 
        onMouseDown: this._handleMouseDown, 
        onMouseOut: this._handleMouseOut, 
        onTouchStart: this._handleTouchStart, 
        onTouchEnd: this._handleTouchEnd}, 
        React.createElement("div", {style: styles}, 
          this._getRippleElements()
        ), 
        this.props.children
      )
    );
  },

  start: function(e) {
    var ripples = this.state.ripples;
    var nextKey = ripples[ripples.length-1].key + 1;
    var style = !this.props.centerRipple ? this._getRippleStyle(e) : {};
    var ripple;

    //Start the next unstarted ripple
    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (!ripple.started) {
        ripple.started = true;
        ripple.style = style;
        break;
      }
    };

    //Add an unstarted ripple at the end
    ripples.push({
      key: nextKey,
      started: false,
      ending: false
    });

    //Re-render
    this.setState({
      ripples: ripples
    });
  },

  end: function() {
    var ripples = this.state.ripples;
    var ripple;
    var endingRipple;

    //End the the next un-ended ripple
    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (ripple.started && !ripple.ending) {
        ripple.ending = true;
        endingRipple = ripple;
        break;
      }
    };

    //Only update if a ripple was found
    if (endingRipple) {
      //Re-render
      this.setState({
        ripples: ripples
      });

      //Wait 2 seconds and remove the ripple from DOM
      setTimeout(function() {
        ripples.shift();
        if (this.isMounted()) {
          this.setState({
            ripples: ripples
          });
        }
      }.bind(this), 2000);
    }
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0 && !this.state.touchInProgress) this.start(e);
  },

  _handleMouseUp: function(e) {
    if (!this.state.touchInProgress) this.end();
  },

  _handleMouseOut: function(e) {
    if (!this.state.touchInProgress) this.end();
  },

  _handleTouchStart: function(e) {
    this.start(e);
  },

  _handleTouchEnd: function(e) {
    this.setState({ touchInProgress: true });
    setTimeout(function () {
      if (this.isMounted()) {
        this.setState({ touchInProgress: false });
      }
    }.bind(this), 100);

    this.end();
  },

  _getRippleStyle: function(e) {
    var style = {};
    var el = React.findDOMNode(this);
    var elHeight = el.offsetHeight;
    var elWidth = el.offsetWidth;
    var offset = Dom.offset(el);
    var isTouchEvent = e.touches && e.touches.length;
    var pageX = isTouchEvent ? e.touches[0].pageX : e.pageX;
    var pageY = isTouchEvent ? e.touches[0].pageY : e.pageY;
    var pointerX = pageX - offset.left;
    var pointerY = pageY - offset.top;
    var topLeftDiag = this._calcDiag(pointerX, pointerY);
    var topRightDiag = this._calcDiag(elWidth - pointerX, pointerY);
    var botRightDiag = this._calcDiag(elWidth - pointerX, elHeight - pointerY);
    var botLeftDiag = this._calcDiag(pointerX, elHeight - pointerY);
    var rippleRadius = Math.max(
      topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
    );
    var rippleSize = rippleRadius * 2;
    var left = pointerX - rippleRadius;
    var top = pointerY - rippleRadius;

    style.height = rippleSize + 'px';
    style.width = rippleSize + 'px';
    style.top = top + 'px';
    style.left = left + 'px';

    return style;
  },

  _calcDiag: function(a, b) {
    return Math.sqrt((a * a) + (b * b));
  },

  _getRippleElements: function() {
    return this.state.ripples.map(function(ripple) {
      return (
        React.createElement(RippleCircle, {
          key: ripple.key, 
          started: ripple.started, 
          ending: ripple.ending, 
          style: ripple.style, 
          color: this.props.color, 
          opacity: this.props.opacity})
      );
    }.bind(this));
  }

});

module.exports = TouchRipple;

},{"../mixins/style-propable":32,"../utils/dom":86,"./circle":39,"react":undefined}],42:[function(require,module,exports){
var React = require('react');
var Paper = require('./paper');
var StylePropable = require('./mixins/style-propable');
var Draggable = require('react-draggable2');
var Transitions = require('./styles/transitions.js');
var FocusRipple = require('./ripples/focus-ripple');
var Paper = require('./paper');

var Slider = React.createClass({displayName: "Slider",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    error: React.PropTypes.string,
    description: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    onDragStart: React.PropTypes.func,
    onDragStop: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      required: true,
      disabled: false,
      defaultValue: 0,
      min: 0,
      max: 1,
      dragging: false
    };
  },

  getInitialState: function() {
    var value = this.props.value;
    if (value == null) value = this.props.defaultValue;
    var percent = (value - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;
    return {
      value: value,
      percent: percent,
      focused: false,
      active: false,
      hovered: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value != null) {
      this.setValue(nextProps.value);
    }
  },

  getTheme: function() {
    return this.context.theme.component.slider;
  },

  getStyles: function() {
    var size = this.getTheme().handleSize + this.getTheme().trackSize;
    var gutter = (this.getTheme().handleSizeDisabled + this.getTheme().trackSize) / 2;
    var fillGutter = this.getTheme().handleSizeDisabled - this.getTheme().trackSize;
    var styles = {
      root: {
        touchCallout: 'none',
        userSelect: 'none',
        cursor: 'default',
        height: this.getTheme().handleSizeActive,
        position: 'relative',
        marginTop: 24,
        marginBottom: 48
      },
      track: {
        position: 'absolute', 
        top: (this.getTheme().handleSizeActive - this.getTheme(). trackSize) / 2,
        left: 0,
        width: '100%',
        height: this.getTheme().trackSize      
      },
      filledAndRemaining: {
        position: 'absolute',
        top: 0,
        height: '100%',
        transition: Transitions.easeOut(null, 'margin'),
      },
      percentZeroRemaining: { 
        left: 1,
        marginLeft: gutter
      },
      handle: {
        boxSizing: 'border-box',
        position: 'absolute',
        cursor: 'pointer',
        pointerEvents: 'inherit',
        top: ((this.getTheme().handleSizeActive - this.getTheme().trackSize) / 2) + 'px',
        left: '0%',
        zIndex: 1,
        margin: (this.getTheme().trackSize / 2) + 'px 0 0 0',   
        width: this.getTheme().handleSize,
        height: this.getTheme().handleSize,
        backgroundColor: this.getTheme().selectionColor,
        backgroundClip: 'padding-box',
        border: '0px solid transparent',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        transition:
          Transitions.easeOut('450ms', 'border') + ',' +
          Transitions.easeOut('450ms', 'width') + ',' +
          Transitions.easeOut('450ms', 'height'),
        overflow: 'visible'      
      },
      handleWhenDisabled: {
        boxSizing: 'content-box',
        cursor: 'not-allowed',
        backgroundColor: this.getTheme().trackColor,
        width: this.getTheme().handleSizeDisabled,
        height: this.getTheme().handleSizeDisabled,
        border: '2px solid white'
      },
      handleWhenPercentZero: {
        border: this.getTheme().trackSize + 'px solid ' + this.getTheme().trackColor,
        backgroundColor: this.getTheme().handleFillColor,
        boxShadow: 'none'
      },
      handleWhenActive: {
        borderColor: this.getTheme().trackColorSelected,
        width: this.getTheme().handleSizeActive,
        height: this.getTheme().handleSizeActive,
        transition:
          Transitions.easeOut('450ms', 'backgroundColor') + ',' +
          Transitions.easeOut('450ms', 'width') + ',' +
          Transitions.easeOut('450ms', 'height')
      },
      ripples: {
        height: '300%',
        width: '300%',
        top: '-12px',
        left: '-12px'
      },
      handleWhenDisabledAndZero: {
        width: (size / 2) + 'px',
        height: (size /2) + 'px'
      },
      handleWhenPercentZeroAndHovered: {
        border: this.getTheme().trackSize + 'px solid ' + this.getTheme().handleColorZero,
        width: size + 'px',
        height: size + 'px'
      },
    };
    styles.filled = this.mergeAndPrefix(styles.filledAndRemaining, {
      left: 0,
      backgroundColor: (this.props.disabled) ? 
        this.getTheme().trackColor : 
        this.getTheme().selectionColor,
      marginRight: fillGutter,
      width: (this.state.percent * 100) + (this.props.disabled ? -1 : 0) + '%'
    });
    styles.remaining = this.mergeAndPrefix(styles.filledAndRemaining, {
      right: 0,
      backgroundColor: this.getTheme().trackColor,
      marginLeft: fillGutter,
      width: ((1 - this.state.percent) * 100) + (this.props.disabled ? -1 : 0) + '%'
    });

    styles.percentZeroRemaining.width = styles.remaining.width - styles.percentZeroRemaining.left;

    return styles;
  },

  render: function() {
    var percent = this.state.percent;
    if (percent > 1) percent = 1; else if (percent < 0) percent = 0;
    var gutter = (this.getTheme().handleSizeDisabled + this.getTheme().trackSize) / 2;
    var fillGutter = this.getTheme().handleSizeDisabled - this.getTheme().trackSize;

    var styles = this.getStyles();
    var sliderStyles = this.mergeAndPrefix(styles.root, this.props.style);
    var trackStyles = styles.track;
    var filledStyles = styles.filled;
    var remainingStyles = this.mergeAndPrefix(
      styles.remaining,
      percent === 0 && styles.percentZeroRemaining
    );
    var handleStyles = percent === 0 ? this.mergeAndPrefix(
      styles.handle,
      styles.handleWhenPercentZero,
      this.state.active && styles.handleWhenActive,
      this.props.focused && {outline: 'none'},
      this.state.hovered && styles.handleWhenPercentZeroAndHovered,
      this.props.disabled && styles.handleWhenDisabledAndZero
    ) : this.mergeAndPrefix(
      styles.handle,
      this.state.active && styles.handleWhenActive,
      this.props.focused && {outline: 'none'},
      this.props.disabled && styles.handleWhenDisabled
    );

    var rippleStyle = {height: '12px', width: '12px'};

    if ((this.state.hovered || this.state.focused) && !this.props.disabled) {
      remainingStyles.backgroundColor = this.getTheme().trackColorSelected;
    }

    if (percent === 0) filledStyles.marginRight = gutter;    
    if (this.state.percent === 0 && this.state.active) remainingStyles.marginLeft = fillGutter;

    var rippleShowCondition = (this.state.hovered || this.state.focused) && !this.state.active && this.state.percent !== 0;
    var rippleColor = this.state.percent === 0 ? this.getTheme().handleColorZero : this.getTheme().rippleColor;
    var focusRipple;
    if (!this.props.disabled && !this.props.disableFocusRipple) {
      focusRipple = (
        React.createElement(FocusRipple, {
          ref: "focusRipple", 
          key: "focusRipple", 
          style: rippleStyle, 
          innerStyle: styles.ripples, 
          show: rippleShowCondition, 
          color: rippleColor})
      );
    }

    return (
      React.createElement("div", {style: this.props.style}, 
        React.createElement("span", {className: "mui-input-highlight"}), 
        React.createElement("span", {className: "mui-input-bar"}), 
        React.createElement("span", {className: "mui-input-description"}, this.props.description), 
        React.createElement("span", {className: "mui-input-error"}, this.props.error), 
        React.createElement("div", {style: sliderStyles, 
          onClick: this._onClick, 
          onFocus: this._onFocus, 
          onBlur: this._onBlur, 
          onMouseOver: this._onMouseOver, 
          onMouseOut: this._onMouseOut, 
          onMouseUp: this._onMouseUp}, 
            React.createElement("div", {ref: "track", style: trackStyles}, 
              React.createElement("div", {style: filledStyles}), 
              React.createElement("div", {style: remainingStyles}), 
              React.createElement(Draggable, {axis: "x", bound: "point", 
                cancel: this.props.disabled ? '*' : null, 
                start: {x: (percent * 100) + '%'}, 
                onStart: this._onDragStart, 
                onStop: this._onDragStop, 
                onDrag: this._onDragUpdate, 
                onMouseDown: this._onMouseDown}, 
                  React.createElement("div", {style: handleStyles, tabIndex: 0}, 
                    focusRipple
                  )
              )
            )
        ), 
        React.createElement("input", {ref: "input", type: "hidden", 
          name: this.props.name, 
          value: this.state.value, 
          required: this.props.required, 
          min: this.props.min, 
          max: this.props.max, 
          step: this.props.step})
      )
    );
  },

  getValue: function() {
    return this.state.value;
  },

  setValue: function(i) {
    // calculate percentage
    var percent = (i - this.props.min) / (this.props.max - this.props.min);
    if (isNaN(percent)) percent = 0;
    // update state
    this.setState({
      value: i,
      percent: percent
    });
  },

  getPercent: function() {
    return this.state.percent;
  },

  setPercent: function (percent) {
    var value = this._percentToValue(percent);
    this.setState({value: value, percent: percent});
  },

  clearValue: function() {
    this.setValue(0);
  },

  _handleWindowKeydown: function(e) {
    if (e.keyCode == KeyCode.TAB) this._tabPressed = true;
  },

  _onClick: function (e) {
    this._tabPressed = false;
    // let draggable handle the slider
    if (this.state.dragging || this.props.disabled) return;
    var value = this.state.value;
    var node = React.findDOMNode(this.refs.track);
    var boundingClientRect = node.getBoundingClientRect();
    var offset = e.clientX - boundingClientRect.left;
    this._updateWithChangeEvent(e, offset / node.clientWidth);
  },

  _onFocus: function (e) {    
    this.setState({focused: true});
  },

  _onBlur: function (e) {
    this.setState({focused: false, active: false});
  },

  _onMouseOver: function (e) {
    this.setState({hovered: true});
  },

  _onMouseOut: function (e) {
    this.setState({hovered: false});
  },

  _onMouseUp: function (e) {
    if (!this.props.disabled) this.setState({active: false});
  },

  _onMouseDown: function (e) {
    if (!this.props.disabled) this.setState({active: true});
  },

  _onDragStart: function(e, ui) {
    this.setState({
      dragging: true,
      active: true
    });
    if (this.props.onDragStart) this.props.onDragStart(e, ui);
  },

  _onDragStop: function(e, ui) {
    this.setState({
      dragging: false,
      active: false
    });
    if (this.props.onDragStop) this.props.onDragStop(e, ui);
  },

  _onDragUpdate: function(e, ui) {
    if (!this.state.dragging) return;
    if (!this.props.disabled) this._dragX(e, ui.position.left);
  },

  _dragX: function(e, pos) {
    var max = React.findDOMNode(this.refs.track).clientWidth;
    if (pos < 0) pos = 0; else if (pos > max) pos = max;
    this._updateWithChangeEvent(e, pos / max);
  },

  _updateWithChangeEvent: function(e, percent) {
    if (this.state.percent === percent) return;
    this.setPercent(percent);
    var value = this._percentToValue(percent);
    if (this.props.onChange) this.props.onChange(e, value);
  },

  _percentToValue: function(percent) {
    return percent * (this.props.max - this.props.min) + this.props.min;
  }

});

module.exports = Slider;

},{"./mixins/style-propable":32,"./paper":35,"./ripples/focus-ripple":40,"./styles/transitions.js":50,"react":undefined,"react-draggable2":95}],43:[function(require,module,exports){
var React = require('react');
var CssEvent = require('./utils/css-event');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ClickAwayable = require('./mixins/click-awayable');
var FlatButton = require('./flat-button');

var Snackbar = React.createClass({displayName: "Snackbar",

  mixins: [StylePropable, ClickAwayable],

  manuallyBindClickAway: true,

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    action: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    openOnMount: React.PropTypes.bool,
    onActionTouchTap: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      open: this.props.openOnMount || false
    };
  },

  componentClickAway: function() {
    this.dismiss();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.open != this.state.open) {
      if (this.state.open) {
        //Only Bind clickaway after transition finishes
        CssEvent.onTransitionEnd(React.findDOMNode(this), function() {
          this._bindClickAway();
        }.bind(this));
      } else {
        this._unbindClickAway();
      }
    }
  },

  getTheme: function() {
    return this.context.theme.component.snackbar;
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  getStyles: function() {
    var styles = {
      root: {
        color: this.getTheme().textColor,
        backgroundColor: this.getTheme().backgroundColor,
        borderRadius: 2,
        padding: '0px ' + this.getSpacing().desktopGutter + 'px',
        height: this.getSpacing().desktopSubheaderHeight,
        lineHeight: this.getSpacing().desktopSubheaderHeight + 'px',
        minWidth: 288,
        maxWidth: 568,

        position: 'fixed',
        zIndex: 10,
        bottom: this.getSpacing().desktopGutter,
        marginLeft: this.getSpacing().desktopGutter,

        left: -10000,
        opacity: 0,
        transform: 'translate3d(0, 20px, 0)',
        transition:
          Transitions.easeOut('0ms', 'left', '400ms') + ',' +
          Transitions.easeOut('400ms', 'opacity') + ',' +
          Transitions.easeOut('400ms', 'transform'),
      },
      action: {
        color: this.getTheme().actionColor,
        float: 'right',
        marginTop: 6,
        marginRight: -16,
        marginLeft: this.getSpacing().desktopGutter,
        backgroundColor: 'transparent'
      },
      rootWhenOpen: {
        left: '0px',
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        transition:
          Transitions.easeOut('0ms', 'left', '0ms') + ',' +
          Transitions.easeOut('400ms', 'opacity', '0ms') + ',' +
          Transitions.easeOut('400ms', 'transform', '0ms')   
      }
    };
    return styles;
  },

  render: function() {

    var styles = this.getStyles(); 

    var action;
    if (this.props.action) {
      action = (
        React.createElement(FlatButton, {
          style: styles.action, 
          label: this.props.action, 
          onTouchTap: this.props.onActionTouchTap})
      );
    }

    var rootStyles = styles.root;
    if (this.state.open) rootStyles = this.mergeStyles(styles.root, styles.rootWhenOpen, this.props.style);
    
    return (
      React.createElement("span", {style: rootStyles}, 
          React.createElement("span", null, this.props.message), 
          action
      )
    );
  },

  show: function() {
    this.setState({ open: true });
  },
  
  dismiss: function() {
    this.setState({ open: false });
  }

});

module.exports = Snackbar;
},{"./flat-button":20,"./mixins/click-awayable":31,"./mixins/style-propable":32,"./styles/transitions":50,"./utils/css-event":84,"react":undefined}],44:[function(require,module,exports){
var isBrowser = typeof window !== 'undefined' ? true : false;
var Modernizr = isBrowser ? require('../utils/modernizr.custom') : undefined;

module.exports = {

  all: function(styles) {
    var prefixedStyle = {};
    for (var key in styles) {
      prefixedStyle[this.single(key)] = styles[key];
    }
    return prefixedStyle;
  },

  set: function(style, key, value) {
    style[this.single(key)] = value;
  },

  single: function(key) {
    return isBrowser ? Modernizr.prefixed(key) : key;
  },

  singleHyphened: function(key) {
    var str = this.single(key);

    return !str ? key : str.replace(/([A-Z])/g, function(str,m1){
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/,'-ms-');
  }

};

},{"../utils/modernizr.custom":91}],45:[function(require,module,exports){
// To include this file in your project:
// var mui = require('mui');
// var Colors = mui.Styles.Colors;

module.exports = {

  red50:    '#ffebee',
  red100:   '#ffcdd2',
  red200:   '#ef9a9a',
  red300:   '#e57373',
  red400:   '#ef5350',
  red500:   '#f44336',
  red600:   '#e53935',
  red700:   '#d32f2f',
  red800:   '#c62828',
  red900:   '#b71c1c',
  redA100:  '#ff8a80',
  redA200:  '#ff5252',
  redA400:  '#ff1744',
  redA700:  '#d50000',

  pink50:   '#fce4ec',
  pink100:  '#f8bbd0',
  pink200:  '#f48fb1',
  pink300:  '#f06292',
  pink400:  '#ec407a',
  pink500:  '#e91e63',
  pink600:  '#d81b60',
  pink700:  '#c2185b',
  pink800:  '#ad1457',
  pink900:  '#880e4f',
  pinkA100: '#ff80ab',
  pinkA200: '#ff4081',
  pinkA400: '#f50057',
  pinkA700: '#c51162',

  purple50:   '#f3e5f5',
  purple100:  '#e1bee7',
  purple200:  '#ce93d8',
  purple300:  '#ba68c8',
  purple400:  '#ab47bc',
  purple500:  '#9c27b0',
  purple600:  '#8e24aa',
  purple700:  '#7b1fa2',
  purple800:  '#6a1b9a',
  purple900:  '#4a148c',
  purpleA100: '#ea80fc',
  purpleA200: '#e040fb',
  purpleA400: '#d500f9',
  purpleA700: '#aa00ff',

  deepPurple50:    '#ede7f6',
  deepPurple100:   '#d1c4e9',
  deepPurple200:   '#b39ddb',
  deepPurple300:   '#9575cd',
  deepPurple400:   '#7e57c2',
  deepPurple500:   '#673ab7',
  deepPurple600:   '#5e35b1',
  deepPurple700:   '#512da8',
  deepPurple800:   '#4527a0',
  deepPurple900:   '#311b92',
  deepPurpleA100:  '#b388ff',
  deepPurpleA200:  '#7c4dff',
  deepPurpleA400:  '#651fff',
  deepPurpleA700:  '#6200ea',

  indigo50:   '#e8eaf6',
  indigo100:  '#c5cae9',
  indigo200:  '#9fa8da',
  indigo300:  '#7986cb',
  indigo400:  '#5c6bc0',
  indigo500:  '#3f51b5',
  indigo600:  '#3949ab',
  indigo700:  '#303f9f',
  indigo800:  '#283593',
  indigo900:  '#1a237e',
  indigoA100: '#8c9eff',
  indigoA200: '#536dfe',
  indigoA400: '#3d5afe',
  indigoA700: '#304ffe',

  blue50:   '#e3f2fd',
  blue100:  '#bbdefb',
  blue200:  '#90caf9',
  blue300:  '#64b5f6',
  blue400:  '#42a5f5',
  blue500:  '#2196f3',
  blue600:  '#1e88e5',
  blue700:  '#1976d2',
  blue800:  '#1565c0',
  blue900:  '#0d47a1',
  blueA100: '#82b1ff',
  blueA200: '#448aff',
  blueA400: '#2979ff',
  blueA700: '#2962ff',

  lightBlue50:   '#e1f5fe',
  lightBlue100:  '#b3e5fc',
  lightBlue200:  '#81d4fa',
  lightBlue300:  '#4fc3f7',
  lightBlue400:  '#29b6f6',
  lightBlue500:  '#03a9f4',
  lightBlue600:  '#039be5',
  lightBlue700:  '#0288d1',
  lightBlue800:  '#0277bd',
  lightBlue900:  '#01579b',
  lightBlueA100: '#80d8ff',
  lightBlueA200: '#40c4ff',
  lightBlueA400: '#00b0ff',
  lightBlueA700: '#0091ea',

  cyan50:   '#e0f7fa',
  cyan100:  '#b2ebf2',
  cyan200:  '#80deea',
  cyan300:  '#4dd0e1',
  cyan400:  '#26c6da',
  cyan500:  '#00bcd4',
  cyan600:  '#00acc1',
  cyan700:  '#0097a7',
  cyan800:  '#00838f',
  cyan900:  '#006064',
  cyanA100: '#84ffff',
  cyanA200: '#18ffff',
  cyanA400: '#00e5ff',
  cyanA700: '#00b8d4',

  teal50:   '#e0f2f1',
  teal100:  '#b2dfdb',
  teal200:  '#80cbc4',
  teal300:  '#4db6ac',
  teal400:  '#26a69a',
  teal500:  '#009688',
  teal600:  '#00897b',
  teal700:  '#00796b',
  teal800:  '#00695c',
  teal900:  '#004d40',
  tealA100: '#a7ffeb',
  tealA200: '#64ffda',
  tealA400: '#1de9b6',
  tealA700: '#00bfa5',

  green50:    '#e8f5e9',
  green100:   '#c8e6c9',
  green200:   '#a5d6a7',
  green300:   '#81c784',
  green400:   '#66bb6a',
  green500:   '#4caf50',
  green600:   '#43a047',
  green700:   '#388e3c',
  green800:   '#2e7d32',
  green900:   '#1b5e20',
  greenA100:  '#b9f6ca',
  greenA200:  '#69f0ae',
  greenA400:  '#00e676',
  greenA700:  '#00c853',

  lightGreen50:    '#f1f8e9',
  lightGreen100:   '#dcedc8',
  lightGreen200:   '#c5e1a5',
  lightGreen300:   '#aed581',
  lightGreen400:   '#9ccc65',
  lightGreen500:   '#8bc34a',
  lightGreen600:   '#7cb342',
  lightGreen700:   '#689f38',
  lightGreen800:   '#558b2f',
  lightGreen900:   '#33691e',
  lightGreenA100:  '#ccff90',
  lightGreenA200:  '#b2ff59',
  lightGreenA400:  '#76ff03',
  lightGreenA700:  '#64dd17',

  lime50:   '#f9fbe7',
  lime100:  '#f0f4c3',
  lime200:  '#e6ee9c',
  lime300:  '#dce775',
  lime400:  '#d4e157',
  lime500:  '#cddc39',
  lime600:  '#c0ca33',
  lime700:  '#afb42b',
  lime800:  '#9e9d24',
  lime900:  '#827717',
  limeA100: '#f4ff81',
  limeA200: '#eeff41',
  limeA400: '#c6ff00',
  limeA700: '#aeea00',

  yellow50:   '#fffde7',
  yellow100:  '#fff9c4',
  yellow200:  '#fff59d',
  yellow300:  '#fff176',
  yellow400:  '#ffee58',
  yellow500:  '#ffeb3b',
  yellow600:  '#fdd835',
  yellow700:  '#fbc02d',
  yellow800:  '#f9a825',
  yellow900:  '#f57f17',
  yellowA100: '#ffff8d',
  yellowA200: '#ffff00',
  yellowA400: '#ffea00',
  yellowA700: '#ffd600',

  amber50:    '#fff8e1',
  amber100:   '#ffecb3',
  amber200:   '#ffe082',
  amber300:   '#ffd54f',
  amber400:   '#ffca28',
  amber500:   '#ffc107',
  amber600:   '#ffb300',
  amber700:   '#ffa000',
  amber800:   '#ff8f00',
  amber900:   '#ff6f00',
  amberA100:  '#ffe57f',
  amberA200:  '#ffd740',
  amberA400:  '#ffc400',
  amberA700:  '#ffab00',

  orange50:   '#fff3e0',
  orange100:  '#ffe0b2',
  orange200:  '#ffcc80',
  orange300:  '#ffb74d',
  orange400:  '#ffa726',
  orange500:  '#ff9800',
  orange600:  '#fb8c00',
  orange700:  '#f57c00',
  orange800:  '#ef6c00',
  orange900:  '#e65100',
  orangeA100: '#ffd180',
  orangeA200: '#ffab40',
  orangeA400: '#ff9100',
  orangeA700: '#ff6d00',

  deepOrange50:    '#fbe9e7',
  deepOrange100:   '#ffccbc',
  deepOrange200:   '#ffab91',
  deepOrange300:   '#ff8a65',
  deepOrange400:   '#ff7043',
  deepOrange500:   '#ff5722',
  deepOrange600:   '#f4511e',
  deepOrange700:   '#e64a19',
  deepOrange800:   '#d84315',
  deepOrange900:   '#bf360c',
  deepOrangeA100:  '#ff9e80',
  deepOrangeA200:  '#ff6e40',
  deepOrangeA400:  '#ff3d00',
  deepOrangeA700:  '#dd2c00',

  brown50:   '#efebe9',
  brown100:  '#d7ccc8',
  brown200:  '#bcaaa4',
  brown300:  '#a1887f',
  brown400:  '#8d6e63',
  brown500:  '#795548',
  brown600:  '#6d4c41',
  brown700:  '#5d4037',
  brown800:  '#4e342e',
  brown900:  '#3e2723',

  blueGrey50:   '#eceff1',
  blueGrey100:  '#cfd8dc',
  blueGrey200:  '#b0bec5',
  blueGrey300:  '#90a4ae',
  blueGrey400:  '#78909c',
  blueGrey500:  '#607d8b',
  blueGrey600:  '#546e7a',
  blueGrey700:  '#455a64',
  blueGrey800:  '#37474f',
  blueGrey900:  '#263238',

  grey50:   '#fafafa',
  grey100:  '#f5f5f5',
  grey200:  '#eeeeee',
  grey300:  '#e0e0e0',
  grey400:  '#bdbdbd',
  grey500:  '#9e9e9e',
  grey600:  '#757575',
  grey700:  '#616161',
  grey800:  '#424242',
  grey900:  '#212121',

  black:    '#000000',
  white:    '#ffffff',

  transparent:  'rgba(0, 0, 0, 0)',
  fullBlack:    'rgba(0, 0, 0, 1)',
  darkBlack:    'rgba(0, 0, 0, 0.87)',
  lightBlack:   'rgba(0, 0, 0, 0.54)',
  minBlack:     'rgba(0, 0, 0, 0.26)',
  faintBlack:   'rgba(0, 0, 0, 0.12)',
  fullWhite:    'rgba(255, 255, 255, 1)',
  darkWhite:    'rgba(255, 255, 255, 0.87)',
  lightWhite:   'rgba(255, 255, 255, 0.54)'

}

},{}],46:[function(require,module,exports){
module.exports = {
  iconSize: 24,

  desktopGutter: 24,
  desktopGutterMore: 32,
  desktopGutterLess: 16,
  desktopGutterMini: 8,
  desktopKeylineIncrement: 64,
  desktopDropDownMenuItemHeight: 32,
  desktopDropDownMenuFontSize: 15,
  desktopLeftNavMenuItemHeight: 48,
  desktopSubheaderHeight: 48,
  desktopToolbarHeight: 56
}




},{}],47:[function(require,module,exports){
var Color = require('./colors');
var Spacing = require('./spacing');
var ColorManipulator = require('../utils/color-manipulator');
var Extend = require('../utils/extend');

var Types = {
  LIGHT: require('./themes/light-theme'),
  DARK: require('./themes/dark-theme')
};

var ThemeManager = function() {
  return {
    types: Types,
    template: Types.LIGHT,

    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',

    palette: Types.LIGHT.getPalette(),
    component: Types.LIGHT.getComponentThemes(Types.LIGHT.getPalette()),

    getCurrentTheme: function() {
      return this;
    },

    // Component gets updated to reflect palette changes.
    setTheme: function(newTheme) {
      this.setPalette(newTheme.getPalette());
      this.setComponentThemes(newTheme.getComponentThemes(newTheme.getPalette()));
    },

    setPalette: function(newPalette) {
      this.palette = Extend(this.palette, newPalette);
      this.component = Extend(this.component, this.template.getComponentThemes(this.palette));
    },

    setComponentThemes: function(overrides) {
      this.component = Extend(this.component, overrides);
    }
  };
};

module.exports = ThemeManager;
},{"../utils/color-manipulator":83,"../utils/extend":88,"./colors":45,"./spacing":46,"./themes/dark-theme":48,"./themes/light-theme":49}],48:[function(require,module,exports){
var Colors = require('../colors');
var ColorManipulator = require('../../utils/color-manipulator');

var DarkTheme = {
  getPalette: function() {
    return {
      textColor: Colors.fullWhite,
      canvasColor: '#303030',
      borderColor:  ColorManipulator.fade(Colors.fullWhite, 0.3), //Colors.grey300
      disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3)
    };
  },
  getComponentThemes: function(palette) {
    var cardColor = Colors.grey800;
    return {
      floatingActionButton: {
        disabledColor: ColorManipulator.fade(palette.textColor, 0.12),
      },
      leftNav: {
        color: cardColor
      },
      menu: {
        backgroundColor: cardColor,
        containerBackgroundColor: cardColor
      },
      menuItem: {
        hoverColor: 'rgba(255, 255, 255, .03)',
      },      
      menuSubheader: {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      paper: {
        backgroundColor: cardColor
      },
      raisedButton: {
        color: Colors.grey500,
      },
      toggle: {
        thumbOnColor: Colors.cyan200,
        thumbOffColor: Colors.grey400,
        thumbDisabledColor: Colors.grey800,
        thumbRequiredColor: Colors.cyan200,
        trackOnColor: ColorManipulator.fade(Colors.cyan200, 0.5),
        trackOffColor: 'rgba(255, 255, 255, 0.3)',
        trackDisabledColor: 'rgba(255, 255, 255, 0.1)',
      },
      slider: {
        trackColor: Colors.minBlack,
        handleColorZero: cardColor,
        handleFillColor: cardColor,
        selectionColor: Colors.cyan200,
      },
    };
  }
};

module.exports = DarkTheme;
},{"../../utils/color-manipulator":83,"../colors":45}],49:[function(require,module,exports){
var Colors = require('../colors');
var Spacing = require('../spacing');
var ColorManipulator = require('../../utils/color-manipulator');

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined 
 *  in a custom theme will default to these values.
 */

var LightTheme = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  getPalette: function() {
    return {
      primary1Color: Colors.cyan500,
      primary2Color: Colors.cyan700,
      primary3Color: Colors.cyan100,
      accent1Color: Colors.pinkA200,
      accent2Color: Colors.pinkA400,
      accent3Color: Colors.pinkA100,
      textColor: Colors.darkBlack,
      canvasColor: Colors.white,
      borderColor: Colors.grey300,
      disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    };
  },
  getComponentThemes: function(palette) {
    var obj = {
      appBar: {
        color: palette.primary1Color,
        textColor: Colors.darkWhite,
        height: Spacing.desktopKeylineIncrement
      },
      button: {
        height: 36,
        minWidth: 88,
        iconButtonSize: Spacing.iconSize * 2
      },
      checkbox: {
        boxColor: palette.textColor,
        checkedColor: palette.primary1Color,
        requiredColor: palette.primary1Color,
        disabledColor: palette.disabledColor
      },
      datePicker: {
        color: palette.primary1Color,
        textColor: Colors.white,
        calendarTextColor: palette.textColor,
        selectColor: palette.primary2Color,
        selectTextColor: Colors.white
      },
      dropDownMenu: {
        accentColor: palette.borderColor
      },
      flatButton: {
        color: palette.canvasColor,
        textColor: palette.textColor,
        primaryTextColor: palette.accent1Color,
        secondaryTextColor: palette.primary1Color,
      },
      floatingActionButton: {
        buttonSize: 56,
        miniSize: 40,
        color: palette.accent1Color,
        iconColor: Colors.white,
        secondaryColor: palette.primary1Color,
        secondaryIconColor: Colors.white,
      },
      leftNav: {
        width: Spacing.desktopKeylineIncrement * 4,
        color: Colors.white
      },
      menu: {
        backgroundColor: Colors.white,
        containerBackgroundColor: Colors.white,
      },
      menuItem: {
        dataHeight: 32,
        height: 48,
        hoverColor: 'rgba(0, 0, 0, .035)',
        padding: Spacing.desktopGutter,
        selectedTextColor: palette.accent1Color,
      },
      menuSubheader: {
        padding: Spacing.desktopGutter,
        borderColor: palette.borderColor,
        textColor: palette.primary1Color
      },
      paper: {
        backgroundColor: Colors.white,
      },
      radioButton: {
        borderColor:  palette.textColor,
        backgroundColor: Colors.white,
        checkedColor: palette.primary1Color,
        requiredColor: palette.primary1Color,
        disabledColor: palette.disabledColor,
        size: 24,
      },
      raisedButton: {
        color: Colors.white,
        textColor: palette.textColor,
        primaryColor: palette.accent1Color,
        primaryTextColor: Colors.white,
        secondaryColor: palette.primary1Color,
        secondaryTextColor: Colors.white
      },
      slider: {
        trackSize: 2,
        trackColor: Colors.minBlack,
        trackColorSelected: Colors.grey500,
        handleSize: 12,
        handleSizeDisabled: 8,
        handleColorZero: Colors.grey400,
        handleFillColor: Colors.white,
        selectionColor: palette.primary3Color,
        rippleColor: palette.primary1Color
      },
      snackbar: {
        textColor: Colors.white,
        backgroundColor: '#323232',
        actionColor: palette.accent1Color
      },
      timePicker: {
        color: Colors.white,
        textColor: Colors.grey600,
        accentColor: palette.primary1Color,
        clockColor: Colors.black,
        selectColor: palette.primary2Color,
        selectTextColor: Colors.white
      },
      toggle: {
        thumbOnColor: palette.primary1Color,
        thumbOffColor: Colors.grey50,
        thumbDisabledColor: Colors.grey400,
        thumbRequiredColor: palette.primary1Color,
        trackOnColor: ColorManipulator.fade(palette.primary1Color, 0.5),
        trackOffColor: Colors.minBlack,
        trackDisabledColor: Colors.faintBlack
      },
      toolbar: {
        backgroundColor: ColorManipulator.darken('#eeeeee', 0.05),
        height: 56,
        titleFontSize: 20,
        iconColor: 'rgba(0, 0, 0, .40)',
        separatorColor: 'rgba(0, 0, 0, .175)',
        menuHoverColor: 'rgba(0, 0, 0, .10)',
        menuHoverColor: Colors.white
      }
    };
    
    // Properties based on previous properties
    obj.flatButton.disabledTextColor = ColorManipulator.fade(obj.flatButton.textColor, 0.3),
    obj.floatingActionButton.disabledColor = ColorManipulator.darken(Colors.white, 0.1),
    obj.floatingActionButton.disabledTextColor = ColorManipulator.fade(palette.textColor, 0.3)
    obj.raisedButton.disabledColor = ColorManipulator.darken(obj.raisedButton.color, 0.1),
    obj.raisedButton.disabledTextColor = ColorManipulator.fade(obj.raisedButton.textColor, 0.3)
    obj.slider.handleSizeActive = obj.slider.handleSize * 2;
    obj.toggle.trackRequiredColor = ColorManipulator.fade(obj.toggle.thumbRequiredColor, 0.5);

    return obj;
  }
}

module.exports = LightTheme;
},{"../../utils/color-manipulator":83,"../colors":45,"../spacing":46}],50:[function(require,module,exports){
var AutoPrefix = require('./auto-prefix');

module.exports = {

  easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

  easeOut: function(duration, property, delay, easeFunction) {
    duration = duration || '450ms';
    property = property || 'all';
    delay = delay || '0ms';
    easeFunction = easeFunction || this.easeOutFunction;

    return AutoPrefix.singleHyphened(property) + ' ' +
      duration + ' ' +
      easeFunction + ' ' +
      delay;
  }

}
},{"./auto-prefix":44}],51:[function(require,module,exports){
var Colors = require('./colors');

var typography = new (function() {

	// text colors
	this.textFullBlack = Colors.fullBlack;
	this.textDarkBlack = Colors.darkBlack;
	this.textLightBlack = Colors.lightBlack;
	this.textMinBlack = Colors.minBlack;
	this.textFullWhite = Colors.fullWhite;
	this.textDarkWhite = Colors.darkWhite;
	this.textLightWhite = Colors.lightWhite;

	// font weight
	this.fontWeightLight = 300;
	this.fontWeightNormal = 400;
	this.fontWeightMedium = 500;

  this.fontStyleButtonFontSize = 14;
});

module.exports = typography;
},{"./colors":45}],52:[function(require,module,exports){
var React = require('react/addons');
var StylePropable = require('./mixins/style-propable');

var SvgIcon = React.createClass({displayName: "SvgIcon",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  getTheme: function() {
    return this.context.theme.palette;
  },

  getStyles: function() {
    return {
      display: 'inline-block',
      height: '24px',
      width: '24px',
      userSelect: 'none',
      fill: this.getTheme().textColor
    };
  },

  render: function() {

    var $__0=
      
      
      
      this.props,viewBox=$__0.viewBox,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{viewBox:1,style:1});

    return (
      React.createElement("svg", React.__spread({}, 
        other, 
        {viewBox: "0 0 24 24", 
        style: this.mergeAndPrefix(
          this.getStyles(), 
          this.props.style)}), 
            this.props.children
      )
    );
  }
});

module.exports = SvgIcon;

},{"./mixins/style-propable":32,"react/addons":undefined}],53:[function(require,module,exports){
var React = require('react');
var SvgIcon = require('../svg-icon');

var DropDownArrow = React.createClass({displayName: "DropDownArrow",

  render: function() {
    return (
      React.createElement(SvgIcon, React.__spread({},  this.props), 
        React.createElement("polygon", {points: "7,9.5 12,14.5 17,9.5 "})
      )
    );
  }

});

module.exports = DropDownArrow;
},{"../svg-icon":52,"react":undefined}],54:[function(require,module,exports){
var React = require('react');
var SvgIcon = require('../svg-icon');

var NavigationChevronLeft = React.createClass({displayName: "NavigationChevronLeft",

  render: function() {
    return (
      React.createElement(SvgIcon, React.__spread({},  this.props), 
        React.createElement("path", {d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"})
      )
    );
  }

});

module.exports = NavigationChevronLeft;
},{"../svg-icon":52,"react":undefined}],55:[function(require,module,exports){
var React = require('react');
var SvgIcon = require('../svg-icon');

var NavigationChevronLeft = React.createClass({displayName: "NavigationChevronLeft",

  render: function() {
    return (
      React.createElement(SvgIcon, React.__spread({},  this.props), 
        React.createElement("path", {d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"})
      )
    );
  }

});

module.exports = NavigationChevronLeft;


},{"../svg-icon":52,"react":undefined}],56:[function(require,module,exports){
var React = require('react');
var SvgIcon = require('../svg-icon');

var NavigationMenu = React.createClass({displayName: "NavigationMenu",

  render: function() {
    return (
      React.createElement(SvgIcon, React.__spread({},  this.props), 
        React.createElement("path", {d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"})
      )
    );
  }

});

module.exports = NavigationMenu;
},{"../svg-icon":52,"react":undefined}],57:[function(require,module,exports){
var React = require('react');
var SvgIcon = require('../svg-icon');

var ToggleCheckBoxChecked = React.createClass({displayName: "ToggleCheckBoxChecked",

  render: function() {
    return (
      React.createElement(SvgIcon, React.__spread({},  this.props), 
        React.createElement("path", {d: "M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M10,17l-5-5l1.4-1.4 l3.6,3.6l7.6-7.6L19,8L10,17z"})
      )
    );
  }

});

module.exports = ToggleCheckBoxChecked;
},{"../svg-icon":52,"react":undefined}],58:[function(require,module,exports){
var React = require('react');
var SvgIcon = require('../svg-icon');

var ToggleCheckBoxOutlineBlank = React.createClass({displayName: "ToggleCheckBoxOutlineBlank",

  render: function() {
    return (
      React.createElement(SvgIcon, React.__spread({},  this.props), 
        React.createElement("path", {d: "M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z"})
      )
    );
  }

});

module.exports = ToggleCheckBoxOutlineBlank;
},{"../svg-icon":52,"react":undefined}],59:[function(require,module,exports){
var React = require('react');
var SvgIcon = require('../svg-icon');

var RadioButtonOff = React.createClass({displayName: "RadioButtonOff",

  render: function() {
    return (
      React.createElement(SvgIcon, React.__spread({},  this.props), 
        React.createElement("path", {d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"})
      )
    );
  }

});

module.exports = RadioButtonOff;
},{"../svg-icon":52,"react":undefined}],60:[function(require,module,exports){
var React = require('react');
var SvgIcon = require('../svg-icon');

var RadioButtonOn = React.createClass({displayName: "RadioButtonOn",

  render: function() {
    return (
      React.createElement(SvgIcon, React.__spread({},  this.props), 
       React.createElement("path", {d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"})
      )
    );
  }

});

module.exports = RadioButtonOn;
},{"../svg-icon":52,"react":undefined}],61:[function(require,module,exports){
var React = require('react');
var TabTemplate = require('./tabTemplate');
var StylePropable = require('../mixins/style-propable.js');
var Colors = require('../styles/colors.js')
var Tab = React.createClass({displayName: "Tab",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    handleTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  handleTouchTap: function(){
    this.props.handleTouchTap(this.props.tabIndex, this);
  },

  getTheme: function() {
    return this.context.theme.palette;
  },

  render: function(){
    var styles = this.mergeAndPrefix({
      'display': 'table-cell',
      'height': '100%',
      'cursor': 'pointer',
      'textAlign': 'center',
      'verticalAlign': 'middle',
      'height': '48px',
      'color': Colors.white,
      'opacity': '.6',
      'fontSize': '14sp',
      'fontWeight': '500',
      'whiteSpace': 'initial',
      'font': this.getTheme().fontFamily,
      'width': this.props.width
    }, this.props.style);

    if (this.props.selected) styles.opacity = '1';

    return (
    React.createElement("div", {style: styles, onTouchTap: this.handleTouchTap, routeName: this.props.route}, 
      this.props.label
    )
    )
  }

});

module.exports = Tab;

},{"../mixins/style-propable.js":32,"../styles/colors.js":45,"./tabTemplate":62,"react":undefined}],62:[function(require,module,exports){
var React = require('react');

var TabTemplate = React.createClass({displayName: "TabTemplate",

  render: function(){

    var styles = {
      'display': 'block',
      'width': '100%',
      'position': 'relative',
      'text-align': 'initial'
    };

    return (
      React.createElement("div", {styles: styles}, 
        this.props.children
      )
    );
  },
});

module.exports = TabTemplate;
},{"react":undefined}],63:[function(require,module,exports){
var React = require('react/addons');
var Tab = require('./tab');
var TabTemplate = require('./tabTemplate');
var InkBar = require('../ink-bar');
var Transitions = require('../styles/transitions.js');
var StylePropable = require('../mixins/style-propable.js');
var Colors = require('../styles/colors.js')


var Tabs = React.createClass({displayName: "Tabs",

  mixins: [StylePropable],

  propTypes: {
    initialSelectedIndex: React.PropTypes.number,
    onActive: React.PropTypes.func,
    tabWidth: React.PropTypes.number
  },

  getInitialState: function(){
    var selectedIndex = 0;
    if (this.props.initialSelectedIndex && this.props.initialSelectedIndex < this.props.children.length) {
      selectedIndex = this.props.initialSelectedIndex;
    }
    return {
      selectedIndex: selectedIndex,
      width: this.props.tabWidth || (100/this.props.children.length) + '%'
    };
  },

  getEvenWidth: function(){
    return (
      parseInt(window
        .getComputedStyle(React.findDOMNode(this))
        .getPropertyValue('width'), 10)
    );
  },

  // Validates that the tabWidth can fit all tabs on the tab bar. If not, the 
  // tabWidth is recalculated and fixed. 
  componentDidMount: function(){
    if(this.props.tabWidth) {
      if(!(this.props.children.length * this.props.tabWidth > this.getEvenWidth())){
        this.setState({
          width: this.props.tabWidth,
          fixed: false
        });
        return;
      }
    }
    this.setState({
      width: this.getEvenWidth(),
      fixed: true
    });
  },

  handleTouchTap: function(tabIndex, tab){
    if (this.props.onChange && this.state.selectedIndex !== tabIndex) {
      this.props.onChange(tabIndex, tab);
    }

    this.setState({selectedIndex: tabIndex});
    //default CB is _onActive. Can be updated in tab.jsx
    if(tab.props.onActive) tab.props.onActive(tab);
  },

  render: function(){

    var tabItemContainerStyle = this.mergeAndPrefix({
      margin: '0',
      padding: '0',
      width: '100%',
      height: '48px',
      backgroundColor: Colors.cyan500,
      whiteSpace: 'nowrap',
      display: 'table'
    }, this.props.tabItemContainerStyle);
    
    var width = this.state.fixed ?
      this.state.width/this.props.children.length :
      this.props.tabWidth;
    var left = width * this.state.selectedIndex || 0;

    var currentTemplate;
    var tabs = React.Children.map(this.props.children, function(tab, index){
      if(tab.type.displayName === "Tab"){
        if(this.state.selectedIndex === index) currentTemplate = tab.props.children;
         return React.addons.cloneWithProps(tab, {
            key: index,
            selected: this.state.selectedIndex === index,
            tabIndex: index,
            width: width,
            handleTouchTap: this.handleTouchTap
          })
      } else {
        var type = tab.type.displayName || tab.type;
        throw "Tabs only accepts Tab Components as children. Found " + type + " as child number " + (index + 1) + " of Tabs";
      }
    }, this);

    return (
      React.createElement("div", {style: this.mergeAndPrefix({position: 'relative'}, this.props.style)}, 
        React.createElement("div", {style: tabItemContainerStyle}, 
          tabs
        ), 
        React.createElement(InkBar, {left: left, width: width}), 
        React.createElement(TabTemplate, null, 
          currentTemplate
        )
      )
    )
  },

});

module.exports = Tabs;

},{"../ink-bar":24,"../mixins/style-propable.js":32,"../styles/colors.js":45,"../styles/transitions.js":50,"./tab":61,"./tabTemplate":62,"react/addons":undefined}],64:[function(require,module,exports){
(function (process){
var React = require('react');
var ColorManipulator = require('./utils/color-manipulator');
var Colors = require('./styles/colors');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var UniqueId = require('./utils/unique-id');
var EnhancedTextarea = require('./enhanced-textarea');

var TextField = React.createClass({displayName: "TextField",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    hintText: React.PropTypes.string,
    id: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    type: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      type: 'text'
    };
  },

  getInitialState: function() {
    return {
      errorText: this.props.errorText,
      hasValue: this.props.value || this.props.defaultValue ||
        (this.props.valueLink && this.props.valueLink.value)
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var hasErrorProp = nextProps.hasOwnProperty('errorText');
    var hasValueLinkProp = nextProps.hasOwnProperty('valueLink');
    var hasValueProp = nextProps.hasOwnProperty('value');
    var hasNewDefaultValue = nextProps.defaultValue !== this.props.defaultValue;
    var newState = {};

    if (hasValueProp) {
      newState.hasValue = nextProps.value;
    } else if (hasValueLinkProp) {
      newState.hasValue = nextProps.valueLink.value;
    } else if (hasNewDefaultValue) {
      newState.hasValue = nextProps.defaultValue;
    }

    if (hasErrorProp) newState.errorText = nextProps.errorText;
    if (newState) this.setState(newState);
  },

  errorColor: Colors.red500,

  _getDisabledTextColor: function() {
    return this.getTheme().disabledColor;
  },

  getTheme: function() {
    return this.context.theme.palette;
  },

  getStyles: function() {
    var styles = {
      root: {
        fontSize: '16px',
        lineHeight: '24px',
        width: (64 * 4),
        height: (this.props.floatingLabelText) ? 72 : 48,
        display: 'inline-block',
        position: 'relative',
        fontFamily: this.context.theme.contentFontFamily,
        transition: Transitions.easeOut('200ms', 'height')
      },
      error: {
        position: 'absolute',
        bottom: -10,
        fontSize: '12px',
        lineHeight: '12px',
        color: this.errorColor,
        transition: Transitions.easeOut(),
      },
      hint: {
        position: 'absolute',
        lineHeight: '48px',
        opacity: 1,
        color: this._getDisabledTextColor(),
        transition: Transitions.easeOut()            
      },
      input: {
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        position: 'relative',
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        color: this.getTheme().textColor,
        font: 'inherit'
      },
      underline: {
        border: 'none',
        borderBottom: 'solid 1px ' + this.getTheme().borderColor,
        position: 'absolute',
        width: '100%',
        bottom: 8,
        margin: 0,
        MozBoxSizing: 'content-box',
        boxSizing: 'content-box',
        height: 0
      },
      underlineAfter: {
        position: 'absolute',
        userSelect: 'none',
        cursor: 'default',
        bottom: 0,
        color: this._getDisabledTextColor()
      }
    };

    styles.floatingLabel = this.mergeAndPrefix(styles.hint, {
      top: 24,
      opacity: 1,
      transform: 'scale(1) translate3d(0, 0, 0)',
      transformOrigin: 'left top'
    });

    styles.textarea = this.mergeAndPrefix(styles.input, {
      paddingTop: this.props.floatingLabelText ? 36 : 12,
      boxSizing: 'border-box',
      font: 'inherit'
    });

    styles.focusUnderline= this.mergeAndPrefix(styles.underline, {
      borderBottom: 'solid 2px ' + this.getTheme().primary1Color,
      transform: 'scaleX(0)',
      transition: Transitions.easeOut(),
    });


    if (this.props.disabled) {
      styles.hint.color = this._getDisabledTextColor();
      styles.input.color = this._getDisabledTextColor();
    }

    if (this.state.isFocused) {
      styles.floatingLabel.color = this.getTheme().primary1Color;
      styles.floatingLabel.transform = 'scale(0.75) translate3d(0, -18px, 0)';
      styles.focusUnderline.transform = 'scaleX(1)';
    }

    if (this.state.hasValue) {
      styles.floatingLabel.color = ColorManipulator.fade(this.getTheme().textColor, 0.5);
      styles.floatingLabel.transform = 'scale(0.75) translate3d(0, -18px, 0)';
      styles.hint.opacity = 0;
    }

    if (this.props.floatingLabelText) {
      styles.hint.top = 24;
      styles.hint.opacity = 0;
      styles.input.boxSizing = 'border-box';
      if (this.state.isFocused && !this.state.hasValue) styles.hint.opacity = 1;
    }

    if (this.props.errorText && this.state.isFocused) styles.floatingLabel.color = this.errorColor;
    if (this.props.floatingLabelText && !this.props.multiLine) styles.input.paddingTop = 26;

    if (this.props.errorText) {
      styles.focusUnderline.borderColor = this.errorColor;
      styles.focusUnderline.transform = 'scaleX(1)';
    }

    return styles;
  },

  render: function() {
    var $__0=
      
      
      
      
      
      
      
      
      
      
      
      this.props,className=$__0.className,errorText=$__0.errorText,floatingLabelText=$__0.floatingLabelText,hintText=$__0.hintText,id=$__0.id,multiLine=$__0.multiLine,onBlur=$__0.onBlur,onChange=$__0.onChange,onFocus=$__0.onFocus,type=$__0.type,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,errorText:1,floatingLabelText:1,hintText:1,id:1,multiLine:1,onBlur:1,onChange:1,onFocus:1,type:1});

    var styles = this.getStyles();

    var inputId = this.props.id || UniqueId.generate();

    var errorTextElement = this.state.errorText ? (
      React.createElement("div", {style: this.mergeAndPrefix(styles.error)}, this.state.errorText)
    ) : null;

    var hintTextElement = this.props.hintText ? (
      React.createElement("div", {style: this.mergeAndPrefix(styles.hint)}, this.props.hintText)
    ) : null;

    var floatingLabelTextElement = this.props.floatingLabelText ? (
      React.createElement("label", {
        style: this.mergeAndPrefix(styles.floatingLabel), 
        htmlFor: inputId}, 
        this.props.floatingLabelText
      )
    ) : null;

    var inputProps;
    var inputElement;

    inputProps = {
      id: inputId,
      ref: 'input',
      style: this.mergeAndPrefix(styles.input),
      onBlur: this._handleInputBlur,
      onFocus: this._handleInputFocus,
      onKeyDown: this._handleInputKeyDown
    };

    if (!this.props.hasOwnProperty('valueLink')) {
      inputProps.onChange = this._handleInputChange;
    }

    inputElement = this.props.multiLine ? (
      React.createElement(EnhancedTextarea, React.__spread({}, 
        other, 
        inputProps, 
        {onHeightChange: this._handleTextAreaHeightChange, 
        textareaStyle: this.mergeAndPrefix(styles.textarea)}))
    ) : (
      React.createElement("input", React.__spread({}, 
        other, 
        inputProps, 
        {type: this.props.type}))
    );

    var underlineElement = this.props.disabled ? (
      React.createElement("div", {style: this.mergeAndPrefix(styles.underlineAfter)}, 
        "............................................................."
      )
    ) : (
      React.createElement("hr", {style: this.mergeAndPrefix(styles.underline)})
    );
    var focusUnderlineElement = React.createElement("hr", {style: this.mergeAndPrefix(styles.focusUnderline)});


    return (
      React.createElement("div", {className: this.props.className, style: this.mergeAndPrefix(styles.root, this.props.style)}, 
        floatingLabelTextElement, 
        hintTextElement, 
        inputElement, 
        underlineElement, 
        focusUnderlineElement, 
        errorTextElement
      )
    );
  },

  blur: function() {
    if (this.isMounted()) this._getInputNode().blur();
  },

  clearValue: function() {
    this.setValue('');
  },

  focus: function() {
    if (this.isMounted()) this._getInputNode().focus();
  },

  getValue: function() {
    return this.isMounted() ? this._getInputNode().value : undefined;
  },

  setErrorText: function(newErrorText) {
    if (process.env.NODE_ENV !== 'production' && this.props.hasOwnProperty('errorText')) {
      console.error('Cannot call TextField.setErrorText when errorText is defined as a property.');
    } else if (this.isMounted()) {
      this.setState({errorText: newErrorText});
    }
  },

  setValue: function(newValue) {
    if (process.env.NODE_ENV !== 'production' && this._isControlled()) {
      console.error('Cannot call TextField.setValue when value or valueLink is defined as a property.');
    } else if (this.isMounted()) {
      this._getInputNode().value = newValue;
      this.setState({hasValue: newValue});
    }
  },

  _getInputNode: function() {
    return this.props.multiLine ?
      this.refs.input.getInputNode() : React.findDOMNode(this.refs.input);
  },

  _handleInputBlur: function(e) {
    this.setState({isFocused: false});
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleInputChange: function(e) {
    this.setState({hasValue: e.target.value});
    if (this.props.onChange) this.props.onChange(e);
  },

  _handleInputFocus: function(e) {
    this.setState({isFocused: true});
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputKeyDown: function(e) {
    if (e.keyCode === 13 && this.props.onEnterKeyDown) this.props.onEnterKeyDown(e);
    if (this.props.onKeyDown) this.props.onKeyDown(e);
  },

  _handleTextAreaHeightChange: function(e, height) {
    var newHeight = height + 24;
    if (this.props.floatingLabelText) newHeight += 24;
    React.findDOMNode(this).style.height = newHeight + 'px';
  },

  _isControlled: function() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  }

});

module.exports = TextField;

}).call(this,require('_process'))
},{"./enhanced-textarea":19,"./mixins/style-propable":32,"./styles/colors":45,"./styles/transitions":50,"./utils/color-manipulator":83,"./utils/unique-id":92,"_process":93,"react":undefined}],65:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var EnhancedButton = require('../enhanced-button');
var Transitions = require('../styles/transitions');

var ClockButton = React.createClass({displayName: "ClockButton",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
      position: React.PropTypes.oneOf(['left', 'right'])
  },
  
  getDefaultProps: function () {
      return {
          position: "left"  
      };
  },
  _handleTouchTap: function(){
    
    this.setState({
      selected: true
    })
    this.props.onTouchTap();
  },
  getTheme: function() {
    return this.context.theme.component.timePicker;
  },
  render: function() {
    
    var $__0=
      
        this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});
    
    var styles = {
      root: {
        position: "absolute",
        bottom: "65px",
        pointerEvents: "auto",
        height: "50px", 
        width: "50px",
        borderRadius: "100%"
      },

      label : {
        position: "absolute",
        top: "17px",
        left: "14px"
      },

      select: {
        position: 'absolute',
        height: 50,
        width: 50,
        top: "0px",
        left: "0px",
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transitions.easeOut(),
        backgroundColor: this.getTheme().accentColor,
      },
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if( this.props.position == "right" ){
      styles.root.right = "5px";
    }else{
      styles.root.left = "5px";
    }
      


    return (
        React.createElement(EnhancedButton, React.__spread({},  other, 
          {style: this.mergeAndPrefix(styles.root), 
          disableFocusRipple: true, 
          disableTouchRipple: true, 
          onTouchTap: this._handleTouchTap}), 
          React.createElement("span", {style: this.mergeAndPrefix(styles.select)}), 
          React.createElement("span", {style: this.mergeAndPrefix(styles.label)}, this.props.children)
        ) 
    );
  }
});

module.exports = ClockButton;
},{"../enhanced-button":17,"../mixins/style-propable":32,"../styles/transitions":50,"react":undefined}],66:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var ClockNumber = require("./clock-number");
var ClockPointer = require("./clock-pointer");

function rad2deg(rad){
  return rad * 57.29577951308232
}

var ClockHours = React.createClass({displayName: "ClockHours",

  mixins: [StylePropable],

  propTypes: {
    initialHours: React.PropTypes.number,
    onChange: React.PropTypes.func,
    format: React.PropTypes.oneOf(['ampm', '24hr'])
  },

  center: {x: 0, y: 0},
  basePoint: {x: 0, y: 0},
  isMousePressed: function(e){

    if(typeof e.buttons == "undefined"){
      return e.nativeEvent.which;
    }

    return e.buttons;

  },
  getDefaultProps: function() {
    return {
      initialHours: new Date().getHours(),
      onChange: function(){},
      format: 'ampm'
    };
  },

  componentDidMount: function () {
    var clockElement = this.refs.mask.getDOMNode();

      this.center = {
        x: clockElement.offsetWidth / 2,
        y: clockElement.offsetHeight / 2,
      };

      this.basePoint = {
        x: this.center.x,
        y: 0
      }; 
  },
  handleUp: function(e){
    e.preventDefault(); 
    this.setClock(e, true);
  },
  handleMove: function(e){
     e.preventDefault();
    if(this.isMousePressed(e) != 1 ) return;
    this.setClock(e, false);
  },
  handleTouch: function(e){
    e.preventDefault(); 
    this.setClock(e, false);
  },
  setClock: function(e, finish){

     
     var pos = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
     };
  
    var hours = this.getHours(pos.x, pos.y);
 
    this.props.onChange(hours, finish);
     
  },
  getHours: function(x, y){

    var step = 30;
    x = x - this.center.x;
    y = y - this.center.y;
    var cx = this.basePoint.x - this.center.x;
    var cy = this.basePoint.y - this.center.y;

    var atan = Math.atan2(cx, cy) -  Math.atan2(x, y);

    var deg = rad2deg(atan);
    deg = Math.round(deg / step ) * step;
    deg %= 360;

    var value = Math.floor(deg / step) || 0;

    var delta = Math.pow(x, 2) + Math.pow(y, 2);
    var distance = Math.sqrt(delta);
    
    value = value || 12;
    if(this.props.format == "24hr"){
      if(distance < 90){
        value += 12;
        value %= 24;  
      }
    }else{
      value %= 12;
    }

    return value;

  },
  _getSelected: function(){

    var hour = this.props.initialHours;

    if(this.props.format == "ampm"){
      hour %= 12;
      hour = hour || 12;
    }

    return hour;
  },
  _getHourNumbers: function(){
    var style = {
      pointerEvents: "none"
    };  

    var hourSize = this.props.format == 'ampm' ? 12 : 24;

    var hours = [];

    for(var i = 1; i <= hourSize; i++){
      hours.push(i % 24);
    }

    return hours.map(function(hour){ 

      var isSelected = this._getSelected() == hour;  
      return React.createElement(ClockNumber, {style: style, isSelected: isSelected, type: "hour", value: hour});

    }.bind(this));

  },
 
  render: function() {

    var styles = {
      root: {
        height: "100%",
        width: "100%",
        borderRadius: "100%",
        position: "relative",
        pointerEvents: "none",
        boxSizing: "border-box",
      },

      hitMask: {
        height: "100%",
        width: "100%",
        pointerEvents: "auto",
      },

    };


    var hours = this._getSelected();
    var numbers = this._getHourNumbers();
   
    return (
      React.createElement("div", {ref: "clock", style: this.mergeAndPrefix(styles.root)}, 
        React.createElement(ClockPointer, {hasSelected: true, value: hours, type: "hour"}), 
        numbers, 
        React.createElement("div", {ref: "mask", style: this.mergeAndPrefix(styles.hitMask), onTouchMove: this.handleTouch, onTouchEnd: this.handleUp, onMouseUp: this.handleUp, onMouseMove: this.handleMove})
      )
    );
  }
});

module.exports = ClockHours;
 
},{"../mixins/style-propable":32,"./clock-number":68,"./clock-pointer":69,"react":undefined}],67:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ClockNumber = require("./clock-number");
var ClockPointer = require("./clock-pointer");

function rad2deg(rad){
  return rad * 57.29577951308232
}

var ClockMinutes = React.createClass({displayName: "ClockMinutes",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    initialMinutes: React.PropTypes.number,
    onChange: React.PropTypes.func
  },

  center: {x: 0, y: 0},
  basePoint: {x: 0, y: 0},
  isMousePressed: function(e){

    if(typeof e.buttons == "undefined"){
      return e.nativeEvent.which;
    } 
    return e.buttons;

  },
  getDefaultProps: function() {
    return {
      initialMinutes: new Date().getMinutes(),
      onChange: function(){}
    };
  },
 
  componentDidMount: function () {
    var clockElement = this.refs.mask.getDOMNode();

      this.center = {
        x: clockElement.offsetWidth / 2,
        y: clockElement.offsetHeight / 2,
      };

      this.basePoint = {
        x: this.center.x,
        y: 0
      };

  },
  handleUp: function(e){
    e.preventDefault(); 
    this.setClock(e, true);
  },
  handleMove: function(e){
    e.preventDefault();
    if(this.isMousePressed(e) != 1 ) return;
    this.setClock(e, false);
  },
  handleTouch: function(e){
    e.preventDefault(); 
    this.setClock(e, false);
  },
  setClock: function(e, finish){

     e.preventDefault();
     if(this.isMousePressed(e) != 1 ) return;
     
     var pos = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
     };
  
     var minutes = this.getMinutes(pos.x, pos.y)
 
     this.props.onChange(minutes, finish);
   
  },
  getMinutes: function(x, y){

    var step = 6;
    x = x - this.center.x;
    y = y - this.center.y;
    var cx = this.basePoint.x - this.center.x;
    var cy = this.basePoint.y - this.center.y;

    var atan = Math.atan2(cx, cy) -  Math.atan2(x, y);

    var deg = rad2deg(atan);
    deg = Math.round(deg / step ) * step;
    deg %= 360;

    var value = Math.floor(deg / step) || 0;

    return value;

  },
  _getMinuteNumbers: function(){

    var minutes = [];
    for(var i = 0; i < 12; i++){
      minutes.push(i * 5);
    }
    var selectedMinutes = this.props.initialMinutes;

   
    var hasSelected = false;

    var numbers = minutes.map(function(minute){   
      var isSelected = selectedMinutes == minute;   
      if(isSelected) hasSelected = true;
      return React.createElement(ClockNumber, {isSelected: isSelected, type: "minute", value: minute});
    }.bind(this));

    return {
      numbers: numbers,
      hasSelected: hasSelected,
      selected: selectedMinutes
    }

  },
  render: function() {


    var styles = {
      root: {
        height: "100%",
        width: "100%",
        borderRadius: "100%",
        position: "relative",
        pointerEvents: "none",
        boxSizing: "border-box",
      },

      hitMask: {
        height: "100%",
        width: "100%",
        pointerEvents: "auto",
      },

    };

    var minutes = this._getMinuteNumbers();
     
     
    return (
      React.createElement("div", {ref: "clock", style: this.mergeAndPrefix(styles.root)}, 
        React.createElement(ClockPointer, {value: minutes.selected, type: "minute"}), 
        minutes.numbers, 
        React.createElement("div", {ref: "mask", style: this.mergeAndPrefix(styles.hitMask), hasSelected: minutes.hasSelected, onTouchMove: this.handleTouch, onTouchEnd: this.handleUp, onMouseUp: this.handleUp, onMouseMove: this.handleMove})
      )
    );
  }
});

module.exports = ClockMinutes;
 
},{"../mixins/style-propable":32,"./clock-number":68,"./clock-pointer":69,"react":undefined}],68:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ClockNumber = React.createClass({displayName: "ClockNumber",

  mixins: [StylePropable],
  
  contextTypes: {
    theme: React.PropTypes.object
  },
  
  propTypes: {
    value: React.PropTypes.number,
    type: React.PropTypes.oneOf(['hour', 'minute']),
    onSelected: React.PropTypes.func,
    isSelected: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      value: 0,
      type: 'minute',
      isSelected: false
    };
  },
  getTheme: function() {
    return this.context.theme.component.timePicker;
  },
  render: function() {

    var pos = this.props.value;

    var inner = false;

    if(this.props.type == "hour"){
      inner = pos < 1 || pos > 12;
      pos %= 12;
    }else{
      pos = pos / 5; 
    }

    var positions = [
      [0, 5],
      [54.5, 16.6],
      [94.4, 59.5],
      [109, 114],
      [94.4, 168.5],
      [54.5, 208.4],
      [0, 223],
      [-54.5, 208.4],
      [-94.4, 168.5],
      [-109, 114],
      [-94.4, 59.5],
      [-54.5, 19.6]
    ];

    var innerPositions = [
      [0, 40],
      [36.9, 49.9],
      [64, 77],
      [74, 114],
      [64, 151],
      [37, 178],
      [0, 188],
      [-37, 178],
      [-64, 151],
      [-74, 114],
      [-64, 77],
      [-37, 50]
    ];

    var styles = {
      root: {
        display: "inline-block",
        position: "absolute",
        width: "32px",
        height: "32px",
        borderRadius: "100%",
        left: 'calc(50% - 16px)',
        top: "10px",
        textAlign: "center",
        paddingTop: '5px',
        userSelect: "none",  /* Chrome all / Safari all */
        fontSize: "1.1em", 
        pointerEvents: "none",
        boxSizing: "border-box",
      }
      
    }

    if(this.props.isSelected){
      styles.root.backgroundColor = this.getTheme().accentColor;
      styles.root.color = this.getTheme().selectTextColor;
    }

    var transformPos = positions[pos];

    if(inner){
      styles.root.width = "28px";
      styles.root.height = "28px"; 
      styles.root.left = 'calc(50% - 14px)';
      transformPos = innerPositions[pos];
    }    

    var $__0=   transformPos,x=$__0[0],y=$__0[1];

    styles.root.transform = "translate(" + x + "px, " + y + "px)";

 

    return (
        React.createElement("span", {style: styles.root}, this.props.value)       
    );
  }
});

module.exports = ClockNumber;
},{"../mixins/style-propable":32,"react":undefined}],69:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ClockPointer = React.createClass({displayName: "ClockPointer",

  mixins: [StylePropable],
  
  contextTypes: {
    theme: React.PropTypes.object
  },
  
  propTypes: {
    value: React.PropTypes.number,
    type: React.PropTypes.oneOf(['hour', 'minute'])
  },

  getInitialState: function () {
     return {
        inner: this.isInner(this.props.value)
    };
  },
  getDefaultProps: function() {
    return {
      value: null,
      type: 'minute',
      hasSelected: false
    };
  },
  componentWillReceiveProps: function (nextProps) {
      
  	this.setState({
        inner: this.isInner(nextProps.value)
  	});
  },
  isInner: function(value){
	if(this.props.type != "hour" ) {
		return false;
	}
	return value < 1 || value > 12 ;
  },
  getAngle: function(){

  	if(this.props.type == "hour"){
  		return this.calcAngle(this.props.value, 12);
  	}
  	
  	return this.calcAngle(this.props.value, 60);

  },
  calcAngle: function(value, base){  	
  	value %= base;
  	var angle = 360 / base * value;
  	return angle;

  },
  getTheme: function() {
    return this.context.theme.component.timePicker;
  },
  render: function() {

  	if(this.props.value == null){
  		return React.createElement("span", null);
  	}

  	var angle = this.getAngle();

    var styles = {
      root: {
        height: "30%",
        background: this.getTheme().accentColor,
        width: "2px",
        left: 'calc(50% - 1px)',
        position: "absolute",
        bottom: "50%",
        transformOrigin: "bottom",
        pointerEvents: "none",
        transform: "rotateZ(" + angle + "deg)"
      },
      mark: {
        background:  this.getTheme().selectTextColor,
        border: "4px solid " +  this.getTheme().accentColor,
        width: "7px",
        height: "7px",
        position: "absolute",
        top: "-5px",
        left: "-6px",
        borderRadius: "100%",
      }
    };


    if(!this.state.inner ){
      styles.root.height = "40%"; 
  	};

    if(this.props.hasSelected){
      styles.mark.display = "none";
    }

    return (
        React.createElement("div", {style: styles.root}, 
          React.createElement("div", {style: styles.mark})
        )        
    );
  }
});

module.exports = ClockPointer;

},{"../mixins/style-propable":32,"react":undefined}],70:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');

var TimeDisplay = require("./time-display");
var ClockButton = require("./clock-button");
var ClockHours = require("./clock-hours");
var ClockMinutes = require("./clock-minutes");
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var Clock = React.createClass({displayName: "Clock",

  mixins: [StylePropable],

  propTypes: {
    initialTime: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    isActive: React.PropTypes.bool
  },
 
  init: function(){
    this.setState({
      mode: 'hour'
    })
  },

  getDefaultProps: function() {
    return {
      initialTime: new Date() 
    };
  },

  componentWillReceiveProps: function (nextProps) {
   
    this.setState({
      selectedTime: nextProps.initialTime
    });
  },

  getInitialState: function() {

    return {
      selectedTime: this.props.initialTime,
      mode: 'hour'  
    };
  },


  _setMode: function(mode){
    setTimeout(function(){
        this.setState({
          mode: mode
        })
      }.bind(this), 100);
  },
 
  _setAffix: function(affix){

    if(affix == this._getAffix()) return;

    var hours = this.state.selectedTime.getHours();

    if(affix == "am"){
      this.handleChangeHours(hours - 12);
      return;
    }

    this.handleChangeHours(hours + 12);
  },

  _getAffix: function(){

    if(this.props.format != "ampm") return "";

    var hours = this.state.selectedTime.getHours();
    if(hours < 12){
      return "am";
    }

    return "pm";

  },

  _getButtons: function(){
    var buttons = [];
    var isAM = this._getIsAM();
   
    if(this.props.format == 'ampm'){
      buttons = [
        React.createElement(ClockButton, {position: "left", onTouchTap: this._setAffix.bind(this, "am"), selected: isAM}, "AM"),
        React.createElement(ClockButton, {position: "right", onTouchTap: this._setAffix.bind(this, "pm"), selected: !isAM}, "PM")
      ];
    }
    return buttons; 
  },

  _getIsAM: function(){

    return this._getAffix() == "am";

  },

  render: function() {

    var clock = null;
    var buttons = this._getButtons(); 

    var styles = {
      root: {},

      container: {
        height: "280px",
        padding: "10px",
      }
    };



    if( this.state.mode == "hour"){
      clock = React.createElement(ClockHours, {key: "hours", 
                format: this.props.format, 
                onChange: this.handleChangeHours, 
                initialHours: this.state.selectedTime.getHours()})
    }else{
      clock = React.createElement(ClockMinutes, {key: "minutes", 
                onChange: this.handleChangeMinutes, 
                initialMinutes: this.state.selectedTime.getMinutes()})
   
    }


    return (
      React.createElement("div", {style: styles.root}, 
        
        React.createElement(TimeDisplay, {
          selectedTime: this.state.selectedTime, 
          mode: this.state.mode, 
          format: this.props.format, 
          affix: this._getAffix(), 
          onSelectHour: this._setMode.bind(this, 'hour'), 
          onSelectMin: this._setMode.bind(this, 'minute')}
           ), 
        
        React.createElement("div", {
          style: styles.container}, 
          clock
        ), 
       buttons
      )
    );
  },
  handleChangeHours: function(hours, finished){
    var time = new Date(this.state.selectedTime);
     
    time.setHours(hours);
    this.setState({
      selectedTime: time
    });    

    if(finished){
      setTimeout(function(){
        this.setState({
          mode: 'minute'
        })
      }.bind(this), 100);
    }
  },
  handleChangeMinutes: function(minutes){
    var time = new Date(this.state.selectedTime);
    time.setMinutes(minutes);
    this.setState({
      selectedTime: time
    });
  },
  getSelectedTime: function(){
    return this.state.selectedTime;
  }
});

module.exports = Clock;
},{"../mixins/style-propable":32,"../transition-groups/slide-in":82,"./clock-button":65,"./clock-hours":66,"./clock-minutes":67,"./time-display":72,"react":undefined}],71:[function(require,module,exports){
module.exports = require('./time-picker');
},{"./time-picker":74}],72:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');

var SlideInTransitionGroup = require('../transition-groups/slide-in');

var TimeDisplay = React.createClass({displayName: "TimeDisplay",

  mixins: [StylePropable],
 
  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    selectedTime: React.PropTypes.object.isRequired,
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    affix: React.PropTypes.oneOf(['', 'pm', 'am'])
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },
  getDefaultProps: function () {
      return {
          mode: 'hour' ,
          affix: '' 
      };
  },
  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.selectedTime !== this.props.selectedTime) {
      direction = nextProps.selectedTime > this.props.selectedTime ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },
  sanitizeTime: function(time){
    var hour = this.props.selectedTime.getHours();
    var min = this.props.selectedTime.getMinutes().toString();

    if(this.props.format == "ampm"){

      hour %= 12;
      hour = hour || 12;
    }

    hour = hour.toString();
    if(hour.length < 2 ) hour = "0" + hour;
    if(min.length < 2 ) min = "0" + min;

    return [hour, min];
  },
  getTheme: function() {
    return this.context.theme.component.timePicker;
  },
  render: function() {
    
		var $__0=
			
			
			
		  this.props,selectedTime=$__0.selectedTime,mode=$__0.mode,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{selectedTime:1,mode:1});
     
		var styles = {
			root: {
				textAlign: "center",
				position: "relative",
				width: "280px",
				height: "100%",
			},

			time: {
				margin: "6px 0",
				lineHeight: "58px",
				height: "58px",
				fontSize: "58px",
			},

			box: {
				padding: "16px 0",
		    backgroundColor: this.getTheme().color,
		    color: this.getTheme().textColor,
			},


			hour: {}, 
			
			minute: {}
		}


    var $__1=    this.sanitizeTime(),hour=$__1[0],min=$__1[1];
    
     
    var hourClassName = "";
    var minClassName = "";

    styles[mode].color = this.getTheme().accentColor;

    return (
      React.createElement("div", React.__spread({},  other, {style: this.mergeAndPrefix(styles.root)}), 

        React.createElement("div", {style: this.mergeAndPrefix(styles.box)}, 
 
         
          React.createElement("div", {style: this.mergeAndPrefix(styles.time)}, 
            React.createElement("span", {style: this.mergeAndPrefix(styles.hour), onTouchTap: this.props.onSelectHour}, hour), 
            React.createElement("span", null, ":"), 
            React.createElement("span", {style: this.mergeAndPrefix(styles.minute), onTouchTap: this.props.onSelectMin}, min)
          ), 
         React.createElement("span", {key: "affix"}, this.props.affix.toUpperCase())
          

        )

      )
    );
  }

});

module.exports = TimeDisplay;


 
},{"../mixins/style-propable":32,"../transition-groups/slide-in":82,"react":undefined}],73:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var KeyCode = require('../utils/key-code');
var Clock = require('./clock');
var DialogWindow = require('../dialog-window');
var FlatButton = require('../flat-button');

var TimePickerDialog = React.createClass({displayName: "TimePickerDialog",

  mixins: [StylePropable, WindowListenable],
  
  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    initialTime: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

 
  getTheme: function() {
    return this.context.theme.component.timePicker;
  },
  render: function() {
    var $__0=
      
      
      
      
      this.props,initialTime=$__0.initialTime,onAccept=$__0.onAccept,format=$__0.format,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{initialTime:1,onAccept:1,format:1});
   
    var styles = {
      root: {
        fontSize: "14px",
        color: this.getTheme().clockColor,
      },
      dialogContent: {
        width: "280px",
      }
    };
   
    var actions = [
      React.createElement(FlatButton, {
        key: 0, 
        label: "Cancel", 
        secondary: true, 
        onTouchTap: this._handleCancelTouchTap}),
      React.createElement(FlatButton, {
        key: 1, 
        label: "OK", 
        secondary: true, 
        onTouchTap: this._handleOKTouchTap})
    ];

    return (
      React.createElement(DialogWindow, React.__spread({},  other, 
        {ref: "dialogWindow", 
        style: this.mergeAndPrefix(styles.root), 
        actions: actions, 
        contentStyle: styles.dialogContent, 
        onDismiss: this._handleDialogDismiss, 
        onShow: this._handleDialogShow, 
        repositionOnUpdate: false}), 
        React.createElement(Clock, {
          ref: "clock", 
          format: format, 
          initialTime: initialTime})
      )
    );
  },

  show: function() {
    this.refs.dialogWindow.show();
    this.refs.clock.init();
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  _handleCancelTouchTap: function() {
    this.dismiss();
  },

  _handleOKTouchTap: function() {
    this.dismiss();
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.clock.getSelectedTime());
    }
  },

  _handleDialogShow: function() {

    if(this.props.onShow) {
      this.props.onShow();
    }
  },

  _handleDialogDismiss: function() {
   

    if(this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _handleWindowKeyUp: function(e) {
    if (this.refs.dialogWindow.isOpen()) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    } 
  }

});

module.exports = TimePickerDialog;
},{"../dialog-window":13,"../flat-button":20,"../mixins/style-propable":32,"../mixins/window-listenable":33,"../utils/key-code":89,"./clock":70,"react":undefined}],74:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');

var WindowListenable = require('../mixins/window-listenable');
var DateTime = require('../utils/date-time');
var KeyCode = require('../utils/key-code');
var TimePickerDialog = require('./time-picker-dialog');
var TextField = require('../text-field');

var emptyTime = new Date();
emptyTime.setHours(0);
emptyTime.setMinutes(0);

var TimePicker = React.createClass({displayName: "TimePicker",

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    defaultTime: React.PropTypes.object, 
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      defaultTime: emptyTime,
      format: 'ampm'
    };
  },

  getInitialState: function() {
    return {
      time: this.props.defaultTime,
      dialogTime: new Date()
    };
  },
  formatTime: function(date){

    var hours = date.getHours();
    var mins = date.getMinutes();
    var aditional = "";

    if(this.props.format == "ampm"){
      var isAM = hours < 12;
      hours = hours % 12;
      aditional +=  isAM ? " am" : " pm";
      hours = hours || 12;
    }

    hours = hours.toString();
    mins = mins.toString();

    if(hours.length < 2) hours = "0" + hours;
    if(mins.length < 2) mins = "0" + mins;
    
    return  hours + ":" + mins + aditional;
  },
  render: function() {
    var $__0=
      
      
      
      
      
      
      this.props,format=$__0.format,onFocus=$__0.onFocus,onTouchTap=$__0.onTouchTap,onShow=$__0.onShow,onDismiss=$__0.onDismiss,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{format:1,onFocus:1,onTouchTap:1,onShow:1,onDismiss:1});

    var defaultInputValue;

    if (this.props.defaultDate) {
      defaultInputValue = this.formatTime(this.props.defaultTime);
    }

    return (
      React.createElement("div", null, 
        React.createElement(TextField, React.__spread({}, 
          other, 
          {ref: "input", 
          defaultValue: defaultInputValue, 
          onFocus: this._handleInputFocus, 
          onTouchTap: this._handleInputTouchTap})), 
        React.createElement(TimePickerDialog, {
          ref: "dialogWindow", 
          initialTime: this.state.dialogTime, 
          onAccept: this._handleDialogAccept, 
          onShow: onShow, 
          onDismiss: onDismiss, 
          format: format})
      )

    );
  },

  getTime: function() {
    return this.state.time;
  },

  setTime: function(t) {
    this.setState({
      time: t 
    });
    this.refs.input.setValue(this.formatTime(t));
  },

  _handleDialogAccept: function(t) {

    this.setTime(t);
    if (this.props.onChange) this.props.onChange(null, t);
  },

  _handleInputFocus: function(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function(e) {
    this.setState({
      dialogTime: this.getTime()
    });
   
    this.refs.dialogWindow.show();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  } 

});

module.exports = TimePicker;

},{"../mixins/style-propable":32,"../mixins/window-listenable":33,"../text-field":64,"../utils/date-time":85,"../utils/key-code":89,"./time-picker-dialog":73,"react":undefined}],75:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Paper = require('./paper');
var EnhancedSwitch = require('./enhanced-switch');

var Toggle = React.createClass({displayName: "Toggle",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    elementStyle: React.PropTypes.object,
    onToggle: React.PropTypes.func,
    toggled: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      switched: 
        this.props.toggled ||
        this.props.defaultToggled || 
        (this.props.valueLink && this.props.valueLink.value) || 
        false,
    }
  },

  getTheme: function() {
    return this.context.theme.component.toggle;
  },

  getStyles: function() {
    var toggleSize = 20;
    var toggleTrackWidth = 36;
    var styles = {
      icon: {
        padding: '4px 0px 6px 2px'
      },
      track: {
          transition: Transitions.easeOut(),
          width: toggleTrackWidth,
          height: 14,
          borderRadius: 30,
          backgroundColor: this.getTheme().trackOffColor
      },
      thumb: {
        transition: Transitions.easeOut(),
        position: 'absolute',
        top: 1,
        left: 2,
        width: toggleSize,
        height: toggleSize,
        lineHeight: '24px',
        borderRadius: '50%',
        backgroundColor: this.getTheme().thumbOffColor
      },
      trackWhenSwitched: {
        backgroundColor: this.getTheme().trackOnColor
      },      
      thumbWhenSwitched: {
        backgroundColor: this.getTheme().thumbOnColor,
        left: 18
      },
      trackWhenDisabled: {
        backgroundColor: this.getTheme().trackDisabledColor
      },
      thumbWhenDisabled: {
        backgroundColor: this.getTheme().thumbDisabledColor
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      this.props,onToggle=$__0.onToggle,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onToggle:1});

    var styles = this.getStyles();

    var trackStyles = this.mergeAndPrefix(
      styles.track,
      this.state.switched && styles.trackWhenSwitched,
      this.props.disabled && styles.trackWhenDisabled
    );

    var thumbStyles = this.mergeAndPrefix(
      styles.thumb,
      this.state.switched && styles.thumbWhenSwitched,
      this.props.disabled && styles.thumbWhenDisabled
    );

    var toggleElement = (
      React.createElement("div", {style: this.mergeAndPrefix(this.props.elementStyle)}, 
        React.createElement("div", {style: trackStyles}), 
        React.createElement(Paper, {style: thumbStyles, circle: true, zDepth: 1})
      )
    );

    var customRippleStyle = {
      top: '-10',
      left: '-10'
    };

    var rippleColor =  this.state.switched ? 
      this.getTheme().thumbOnColor : this.context.theme.component.textColor;

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: toggleElement,
      rippleStyle: customRippleStyle,
      rippleColor: rippleColor,
      iconStyle: styles.icon,
      trackStyle: trackStyles,
      thumbStyle: thumbStyles,
      switched: this.state.switched,
      onSwitch: this._handleToggle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "left"
    };

    if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

    return (
      React.createElement(EnhancedSwitch, React.__spread({},  
        other, 
        enhancedSwitchProps))
    );
  },

  isToggled: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle: function(e, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  },

  _handleStateChange: function(newSwitched) {
    this.setState({switched: newSwitched});
  }

});

module.exports = Toggle;

},{"./enhanced-switch":18,"./mixins/style-propable":32,"./paper":35,"./styles/transitions":50,"react":undefined}],76:[function(require,module,exports){
var React = require('react');
var Colors = require('../styles/colors');
var StylePropable = require('../mixins/style-propable');

var ToolbarGroup = React.createClass({displayName: "ToolbarGroup",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    float: React.PropTypes.string,
    firstChild: React.PropTypes.bool,
    lastChild: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      float: 'left',
    };
  },
  
  getTheme: function() {
    return this.context.theme.component.toolbar;
  },

  getSpacing: function() {
    return this.context.theme.spacing.desktopGutter;
  },

  getStyles: function() {
    var marginHorizontal = this.getSpacing();
    var marginVertical = (this.getTheme().height - this.context.theme.component.button.height) / 2;
    var styles = {
      root: {
        position: 'relative',
        float: this.props.float
      },
      dropDownMenu: {
        root: {
          float: 'left',
          color: Colors.lightBlack,// removes hover color change, we want to keep it
          display: 'inline-block',
          marginRight: this.getSpacing()
        },
        controlBg: {  
          backgroundColor: this.getTheme().menuHoverColor,
          borderRadius: 0
        },
        underline: {
          display: 'none'
        }
      },
      button: {
        float: 'left',
        margin: marginVertical + 'px ' + marginHorizontal + 'px',
        position: 'relative'
      },
      icon: {
        root: {
          float: 'left',
          cursor: 'pointer',
          color: this.getTheme().iconColor,
          lineHeight: this.getTheme().height + 'px',
          paddingLeft: this.getSpacing()
        },
        hover: {
          zIndex: 1,
          color: Colors.darkBlack
        }
      },
      span: {
        float: 'left',
        color: this.getTheme().iconColor,
        lineHeight: this.getTheme().height + 'px'
      }
    };
    return styles;
  },

  render: function() {

    var styles = this.getStyles();

    if (this.props.firstChild) styles.marginLeft = -24;
    if (this.props.lastChild) styles.marginRight = -24;

    var newChildren = React.Children.map(this.props.children, function(currentChild) {
      switch (currentChild.type.displayName) {
        case 'DropDownMenu' : 
          return React.cloneElement(currentChild, {
            style: styles.dropDownMenu.root,
            styleControlBg: styles.dropDownMenu.controlBg,
            styleUnderline: styles.dropDownMenu.underline
          });
          break;
        case 'DropDownIcon' :
          return React.cloneElement(currentChild, {
            style: {float: 'left'},
            iconStyle: styles.icon.root,
            onMouseOver: this._handleMouseOverDropDownMenu,
            onMouseOut: this._handleMouseOutDropDownMenu
          });
        case 'RaisedButton' : case 'FlatButton' :
          return React.cloneElement(currentChild, {
            style: styles.button
          });
        case 'FontIcon' : 
          return React.cloneElement(currentChild, {
            style: styles.icon.root,
            onMouseOver: this._handleMouseOverFontIcon,
            onMouseOut: this._handleMouseOutFontIcon
          });
        case 'ToolbarSeparator' : case 'ToolbarTitle' : 
          return React.cloneElement(currentChild, {
            style: styles.span
          });
        default:
          return currentChild;
      }
    }, this);

    return (
      React.createElement("div", {className: this.props.className, style: this.mergeAndPrefix(styles.root, this.props.style)}, 
        newChildren
      )
    );
  },

  _handleMouseOverDropDownMenu: function(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseOutDropDownMenu: function(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  },

  _handleMouseOverFontIcon: function(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseOutFontIcon: function(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  },
});

module.exports = ToolbarGroup;

},{"../mixins/style-propable":32,"../styles/colors":45,"react":undefined}],77:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ToolbarSeparator = React.createClass({displayName: "ToolbarSeparator",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  getTheme: function() {
    return this.context.theme.component.toolbar;
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  render: function() {

    var styles = this.mergeAndPrefix({
      backgroundColor: this.getTheme().separatorColor,
      display: 'inline-block',
      height: this.getSpacing().desktopGutterMore,
      marginLeft: this.getSpacing().desktopGutter,
      position: 'relative',
      top: ((this.getTheme().height - this.getSpacing().desktopGutterMore) / 2),
      width: 1,
    }, this.props.style);

    return (
      React.createElement("span", {className: this.props.className, style: styles})
    );
  }

});

module.exports = ToolbarSeparator;

},{"../mixins/style-propable":32,"react":undefined}],78:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ToolbarTitle = React.createClass({displayName: "ToolbarTitle",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    text: React.PropTypes.string,
  },

  getTheme: function() {
    return this.context.theme.component.toolbar;
  },

  render: function() {

    var styles = this.mergeAndPrefix({
      paddingRight: this.context.theme.spacing.desktopGutterLess,
      lineHeight: this.getTheme().height + 'px',
      fontSize: this.getTheme().titleFontSize + 'px',
      display: 'inline-block',
      position: 'relative',
    }, this.props.style);

    return (
      React.createElement("span", {className: this.props.className, style: styles}, this.props.text)
    );
  }

});

module.exports = ToolbarTitle;

},{"../mixins/style-propable":32,"react":undefined}],79:[function(require,module,exports){
var React = require('react');
var StylePropable = require('../mixins/style-propable');

var Toolbar = React.createClass({displayName: "Toolbar",

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
  },

  getTheme: function (argument) {
    return this.context.theme.component.toolbar;
  },

  getStyles: function() {
    return this.mergeAndPrefix({
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
      backgroundColor: this.getTheme().backgroundColor,
      height: this.getTheme().height,
      width: '100%',
      padding: '0px ' + this.context.theme.spacing.desktopGutter + 'px',
    }, this.props.style);
  },

  render: function() {

    var firstChild = this.props.children[0];
    var lastChild = this.props.children[this.props.children.length - 1];
    if (firstChild.type.displayName === 'ToolbarGroup') firstChild = React.cloneElement(firstChild, {firstChild: true});
    if (lastChild.type.displayName === 'ToolbarGroup') lastChild = React.cloneElement(lastChild, {lastChild: true});

    return (
      React.createElement("div", {className: this.props.className, style: this.getStyles()}, 
        this.props.children
      )
    );
  }

});

module.exports = Toolbar;

},{"../mixins/style-propable":32,"react":undefined}],80:[function(require,module,exports){
var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Colors = require('./styles/colors');

var Tooltip = React.createClass({displayName: "Tooltip",

  mixins: [StylePropable],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    show: React.PropTypes.bool,
    touch: React.PropTypes.bool
  },

  componentDidMount: function() {
    this._setRippleSize();
  },

  componentDidUpdate: function(prevProps, prevState) {
    this._setRippleSize();
  },

  getStyles: function(){
    var styles = {
      root: {
        position: 'absolute',
        fontFamily: "'Roboto'",
        fontSize: '10px',
        lineHeight: '22px',
        padding: '0 8px',
        color: Colors.white,
        overflow: 'hidden',
        top: -10000,
        borderRadius: 2,
        userSelect: 'none',
        opacity: 0,
        transition:
          Transitions.easeOut('0ms', 'top', '450ms') + ',' +
          Transitions.easeOut('450ms', 'transform', '0ms') + ',' +
          Transitions.easeOut('450ms', 'opacity', '0ms')
      },
      label: {
        position: 'relative',
        whiteSpace: 'nowrap'
      },
      ripple: {
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        transition:
          Transitions.easeOut('0ms', 'width', '450ms') + ',' +
          Transitions.easeOut('0ms', 'height', '450ms') + ',' +
          Transitions.easeOut('450ms', 'backgroundColor', '0ms')
      },
      rootWhenShown: {
        top: -16,
        opacity: 1,
        transform: 'translate3d(0px, 16px, 0px)',
        transition:
          Transitions.easeOut('0ms', 'top', '0ms') + ',' + 
          Transitions.easeOut('450ms', 'transform', '0ms') + ',' +
          Transitions.easeOut('450ms', 'opacity', '0ms'),
      },
      rootWhenTouched: {
        fontSize: '14px',
        lineHeight: '44px',
        padding: '0 16px'
      },
      rippleWhenShown: {
        backgroundColor: Colors.grey600,
        transition:
          Transitions.easeOut('450ms', 'width', '0ms') + ',' +
          Transitions.easeOut('450ms', 'height', '0ms') + ',' +
          Transitions.easeOut('450ms', 'backgroundColor', '0ms')
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
         this.props,label=$__0.label,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{label:1});
    var styles = this.getStyles();
    return (
      React.createElement("div", React.__spread({},  other, 
        {style: this.mergeAndPrefix(
            styles.root,
            this.props.show && styles.rootWhenShown,
            this.props.touch && styles.rootWhenTouched,
            this.props.style
          )}), 
        React.createElement("div", {
          ref: "ripple", 
          style: this.mergeAndPrefix(
            styles.ripple,
            this.props.show && styles.rippleWhenShown)}), 
        React.createElement("span", {style: this.mergeAndPrefix(styles.label)}, this.props.label)
      )
    );
  },

  _setRippleSize: function() {
    var ripple = React.findDOMNode(this.refs.ripple);
    var tooltip = window.getComputedStyle(React.findDOMNode(this));
    var tooltipWidth = parseInt(tooltip.getPropertyValue("width"), 10);
    var tooltipHeight = parseInt(tooltip.getPropertyValue("height"), 10);

    var rippleDiameter = (Math.sqrt(Math.pow(tooltipHeight, 2) + 
                                    Math.pow((tooltipWidth / 2.0), 2) ) * 2);

    if (this.props.show) {
      ripple.style.height = rippleDiameter + 'px';
      ripple.style.width = rippleDiameter + 'px';
    } else {
      ripple.style.width = '0px';
      ripple.style.height = '0px';
    }
  }

});

module.exports = Tooltip;
},{"./mixins/style-propable":32,"./styles/colors":45,"./styles/transitions":50,"react":undefined}],81:[function(require,module,exports){
var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var StylePropable = require('../mixins/style-propable');
var AutoPrefix = require('../styles/auto-prefix');
var Transitions = require('../styles/transitions');

var SlideInChild = React.createClass({displayName: "SlideInChild",

  mixins: [StylePropable],

  propTypes: {
    //This callback is needed bacause the direction could change
    //when leaving the dom
    getLeaveDirection: React.PropTypes.func.isRequired
  },

  componentWillEnter: function(callback) {
    var style = this.getDOMNode().style;
    var x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    var y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(callback, 0);
  },

  componentDidEnter: function() {
    var style = this.getDOMNode().style;
    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'translate3d(0,0,0)');
  },

  componentWillLeave: function(callback) {
    var style = this.getDOMNode().style;
    var direction = this.props.getLeaveDirection();
    var x = direction === 'left' ? '-100%' :
      direction === 'right' ? '100%' : '0';
    var y = direction === 'up' ? '-100%' :
      direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(callback, 450);
  },

  render: function() {
    var $__0=
      
      
      this.props,styles=$__0.styles,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{styles:1});

    var styles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: '0px',
      left: '0px',
      transition: Transitions.easeOut()
    }, this.props.style);

    return (
      React.createElement("div", React.__spread({},  other, 
        {style: styles}), 
        this.props.children
      )
    );
  }

});

module.exports = SlideInChild;
},{"../mixins/style-propable":32,"../styles/auto-prefix":44,"../styles/transitions":50,"react/addons":undefined}],82:[function(require,module,exports){
var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var StylePropable = require('../mixins/style-propable');
var SlideInChild = require('./slide-in-child');

var SlideIn = React.createClass({displayName: "SlideIn",

  mixins: [StylePropable],

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down'])
  },

  getDefaultProps: function() {
    return {
      direction: 'left'
    };
  },

  render: function() {
    var $__0=
      
      
      this.props,direction=$__0.direction,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{direction:1});

    var styles = this.mergeAndPrefix({
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }, this.props.style);

    return (
      React.createElement(ReactTransitionGroup, React.__spread({},  other, 
        {style: styles, 
        component: "div"}), 
        this._getSlideInChildren()
      )
    );
  },

  _getSlideInChildren: function() {
    return React.Children.map(this.props.children, function(child) {
      return (
        React.createElement(SlideInChild, {
          key: child.key, 
          direction: this.props.direction, 
          getLeaveDirection: this._getLeaveDirection}, 
          child
        )
      );
    }, this);
  },

  _getLeaveDirection: function() {
    return this.props.direction;
  }

});

module.exports = SlideIn;
},{"../mixins/style-propable":32,"./slide-in-child":81,"react/addons":undefined}],83:[function(require,module,exports){
module.exports = {

  /**
   * The relative brightness of any point in a colorspace, normalized to 0 for 
   * darkest black and 1 for lightest white. RGB colors only. Does not take 
   * into account alpha values. 
   *
   * TODO: 
   * - Take into account alpha values.
   * - Identify why there are minor discrepancies for some use cases 
   *   (i.e. #F0F & #FFF). Note that these cases rarely occur.
   *
   * Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  _luminance: function(color) {
    color = this._decomposeColor(color);

    if (color.type.indexOf('rgb') > -1) {
      var rgb = color.values.map(function(val) {
        val /= 255; // normalized
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

    } else {
      var message = 'Calculating the relative luminance is not available for ' + 
                    'HSL and HSLA.';
      console.error(message);
      return -1;
    }
  },

  /**
   * @params:
   * additionalValue = An extra value that has been calculated but not included 
   *                   with the original color object, such as an alpha value.
   */
  _convertColorToString: function (color, additonalValue) {
    var str = color.type + '(' + 
              parseInt(color.values[0]) + ',' +
              parseInt(color.values[1]) + ',' +
              parseInt(color.values[2]);
    
    if (additonalValue !== undefined) {
      str += ',' + additonalValue + ')';
    } else if (color.values.length == 4) {
      str += ',' + color.values[3] + ')';
    } else {
      str += ')';
    }
  
    return str;
  },

  // Converts a color from hex format to rgb format.
	_convertHexToRGB: function(color) {
    if (color.length === 4) {
      var extendedColor = '#';
      for (var i = 1; i < color.length; i++) {
        extendedColor += color.charAt(i) + color.charAt(i);
      }
      color = extendedColor;
    }

		var values = {
			r:	parseInt(color.substr(1,2), 16),
			g:	parseInt(color.substr(3,2), 16),
			b:	parseInt(color.substr(5,2), 16),
		};

    return 'rgb(' + values.r + ',' + 
                    values.g + ',' + 
                    values.b + ')';
	},

  // Returns the type and values of a color of any given type.
	_decomposeColor: function(color) {
		if (color.charAt(0) === '#') {
      return this._decomposeColor(this._convertHexToRGB(color));
		} 

    var marker = color.indexOf('(');
    var type = color.substring(0, marker);
    var values = color.substring(marker + 1, color.length - 1).split(',');

    return {type: type, values: values};
	},

  // Set the absolute transparency of a color. 
  // Any existing alpha values are overwritten. 
  fade: function(color, amount) {
    color = this._decomposeColor(color);
    if (color.type == 'rgb' || color.type == 'hsl') color.type += 'a';
    return this._convertColorToString(color, amount)
  },

  // Desaturates rgb and sets opacity to 0.15
  lighten: function(color, amount) {
    color = this._decomposeColor(color);

    if (color.type.indexOf('hsl') > -1) {
      color.values[2] += amount;
      return  this._decomposeColor(this._convertColorToString(color));
    } else if (color.type.indexOf('rgb') > -1) {
      for (var i = 0; i < 3; i++) {
        color.values[i] *= 1 + amount;
        if (color.values[i] > 255) color.values[i] = 255;  
      }
    }

    if (color.type.indexOf('a') <= -1) color.type += 'a';

    return  this._convertColorToString(color, '0.15');
  },

  darken: function(color, amount) {
    var color = this._decomposeColor(color);

    if (color.type.indexOf('hsl') > -1) {
      color.values[2] += amount;
      return  this._decomposeColor(this._convertColorToString(color));
    } else if (color.type.indexOf('rgb') > -1) {
      for (var i = 0; i < 3; i++) {
        color.values[i] *= 1 - amount;
        if (color.values[i] < 0) color.values[i] = 0;  
      }
    }

    return this._convertColorToString(color);
  },


  // Calculates the contrast ratio between two colors. 
  //
  // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
  contrastRatio: function(background, foreground) {
    var lumA = this._luminance(background);
    var lumB = this._luminance(foreground);

    if (lumA >= lumB) {
      return ((lumA + 0.05) / (lumB + 0.05)).toFixed(2);
    } else {
      return ((lumB + 0.05) / (lumA + 0.05)).toFixed(2);
    }
  },

  /** 
   * Determines how readable a color combination is based on its level.
   * Levels are defined from @LeaVerou:
   * https://github.com/LeaVerou/contrast-ratio/blob/gh-pages/contrast-ratio.js
   */
  contrastRatioLevel: function(background, foreground) {
    var levels = {
      'fail': {
        range: [0, 3],
        color: 'hsl(0, 100%, 40%)'
      },
      'aa-large': {
        range: [3, 4.5],
        color: 'hsl(40, 100%, 45%)'
      },
      'aa': {
        range: [4.5, 7],
        color: 'hsl(80, 60%, 45%)'
      },
      'aaa': {
        range: [7, 22],
        color: 'hsl(95, 60%, 41%)'
      }
    };

    var ratio = this.contrastRatio(background, foreground);

    for (level in levels) {
      var range = levels[level].range;
      if (ratio >= range[0] && ratio <= range[1]) return level;
    }

  },

};

},{}],84:[function(require,module,exports){
var Events = require('./events');

module.exports = {

  _testSupportedProps: function(props) {
    var i,
      undefined,
      el = document.createElement('div');

    for (i in props) {
      if (props.hasOwnProperty(i) && el.style[i] !== undefined) {
        return props[i];
      }
    }
  },

  //Returns the correct event name to use
  transitionEndEventName: function() {
    return this._testSupportedProps({
      'transition':'transitionend',
      'OTransition':'otransitionend',  
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    });
  },

  animationEndEventName: function() {
    return this._testSupportedProps({
      'animation': 'animationend',
      '-o-animation': 'oAnimationEnd',
      '-moz-animation': 'animationend',
      '-webkit-animation': 'webkitAnimationEnd'
    });
  },

  onTransitionEnd: function (el, callback) {
    var transitionEnd = this.transitionEndEventName();

    Events.once(el, transitionEnd, function() {
      return callback();
    });
  },

  onAnimationEnd: function (el, callback) {
    var animationEnd = this.animationEndEventName();

    Events.once(el, animationEnd, function() {
      return callback();
    });
  }

};
},{"./events":87}],85:[function(require,module,exports){
module.exports = {

  addDays: function(d, days) {
    var newDate = this.clone(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
  },

  addMonths: function(d, months) {
    var newDate = this.clone(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
  },

  clone: function(d) {
    return new Date(d.getTime());
  },

  getDaysInMonth: function(d) {
    var resultDate = this.getFirstDayOfMonth(d);

    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);

    return resultDate.getDate();
  },

  getFirstDayOfMonth: function(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  },

  getFullMonth: function(d) {
    var month = d.getMonth();
    switch (month) {
      case 0: return 'January';
      case 1: return 'February';
      case 2: return 'March';
      case 3: return 'April';
      case 4: return 'May';
      case 5: return 'June';
      case 6: return 'July';
      case 7: return 'August';
      case 8: return 'September';
      case 9: return 'October';
      case 10: return 'November';
      case 11: return 'December';
    }
  },

  getShortMonth: function(d) {
    var month = d.getMonth();
    switch (month) {
      case 0: return 'Jan';
      case 1: return 'Feb';
      case 2: return 'Mar';
      case 3: return 'Apr';
      case 4: return 'May';
      case 5: return 'Jun';
      case 6: return 'Jul';
      case 7: return 'Aug';
      case 8: return 'Sep';
      case 9: return 'Oct';
      case 10: return 'Nov';
      case 11: return 'Dec';
    }
  },

  getDayOfWeek: function(d) {
    var dow = d.getDay();
    switch (dow) {
      case 0: return 'Sunday';
      case 1: return 'Monday';
      case 2: return 'Tuesday';
      case 3: return 'Wednesday';
      case 4: return 'Thursday';
      case 5: return 'Friday';
      case 6: return 'Saturday';
    }
  },

  getWeekArray: function(d) {
    var dayArray = [];
    var daysInMonth = this.getDaysInMonth(d);
    var daysInWeek;
    var emptyDays;
    var firstDayOfWeek;
    var week;
    var weekArray = [];

    for (var i = 1; i <= daysInMonth; i++) {
      dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
    };

    while (dayArray.length) {
      firstDayOfWeek = dayArray[0].getDay();
      daysInWeek = 7 - firstDayOfWeek;
      emptyDays = 7 - daysInWeek;
      week = dayArray.splice(0, daysInWeek);

      for (var i = 0; i < emptyDays; i++) {
        week.unshift(null);
      };

      weekArray.push(week);
    }

    return weekArray;
  },

  format: function(date) {
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var y = date.getFullYear();
    return m + '/' + d + '/' + y;
  },

  isEqualDate: function(d1, d2) {
    return d1 && d2 &&
      (d1.getFullYear() === d2.getFullYear()) &&
      (d1.getMonth() === d2.getMonth()) &&
      (d1.getDate() === d2.getDate());
  },

  monthDiff: function(d1, d2) {
    var m;
    m = (d1.getFullYear() - d2.getFullYear()) * 12;
    m += d1.getMonth();
    m -= d2.getMonth();
    return m;
  }

}
},{}],86:[function(require,module,exports){
module.exports = {

  isDescendant: function(parent, child) {
    var node = child.parentNode;

    while (node != null) {
      if (node == parent) return true;
      node = node.parentNode;
    }

    return false;
  },

  offset: function(el) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  },

  addClass: function(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  },

  removeClass: function(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  },

  hasClass: function(el, className) {
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  },

  toggleClass: function(el, className) {
    if (this.hasClass(el, className))
      this.removeClass(el, className);
    else
      this.addClass(el, className);
  },

  forceRedraw: function(el) {
    var originalDisplay = el.style.display;

    el.style.display = 'none';
    el.offsetHeight;
    el.style.display = originalDisplay;
  },

  withoutTransition: function(el, callback) {
    //turn off transition
    el.style.transition = 'none';
    
    callback();

    //force a redraw
    this.forceRedraw(el);

    //put the transition back
    el.style.transition = '';
  }
  
}
},{}],87:[function(require,module,exports){
module.exports = {

  once: function(el, type, callback) {
    var typeArray = type.split(' ');
    var recursiveFunction = function(e){
      e.target.removeEventListener(e.type, recursiveFunction);
      return callback(e);
    };

    for (var i = typeArray.length - 1; i >= 0; i--) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },

  // IE8+ Support
  on: function(el, type, callback) {
    if(el.addEventListener) {
      el.addEventListener(type, callback);
    } else {
      el.attachEvent('on' + type, function() {
        callback.call(el);
      });
    }
  },

  // IE8+ Support
  off: function(el, type, callback) {
    if(el.removeEventListener) {
      el.removeEventListener(type, callback);
    } else {
      el.detachEvent('on' + type, callback);
    }
  }
};
},{}],88:[function(require,module,exports){
// http://stackoverflow.com/questions/1187518/javascript-array-difference
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

/** 
*  A recursive merge between two objects. 
* 
*  @param object     - the object whose properties are to be overwritten. It
*                     should be either the root level or some nested level.
*  @param overrides - an object containing properties to be overwritten. It 
*                     should have the same structure as the object object.
*/
var extend = function(object, overrides) {
  var mergeObject = {};

  Object.keys(object).forEach(function(currentKey) {

    // Arrays and null are also objects, 
    var overridesIsValidObject = object[currentKey] && !Array.isArray(object[currentKey]);
    
    // Recursive call to next level
    if (typeof(object[currentKey]) === 'object' && overridesIsValidObject) {
      mergeObject[currentKey] = extend(object[currentKey], overrides[currentKey]);
    } else {
      if (overrides && overrides[currentKey]) {
        mergeObject[currentKey] = overrides[currentKey];
      } else {
        mergeObject[currentKey] = object[currentKey];
      }
    }

  });

  // Overrides not defined in object are immediately added.
  if (overrides && typeof(overrides) === 'object' && !Array.isArray(overrides)) {
    Object.keys(overrides).diff(Object.keys(object)).forEach(function(currentDiff) {
      mergeObject[currentDiff] = overrides[currentDiff];
    });
  }

  return mergeObject;
};

module.exports = extend;
},{}],89:[function(require,module,exports){
module.exports = {
  DOWN: 40,
  ESC: 27,
  ENTER: 13,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  TAB: 9,
  UP: 38
}
},{}],90:[function(require,module,exports){
module.exports = {

  Desktop: {
    GUTTER: 24,
    GUTTER_LESS: 16,
    INCREMENT: 64,
    MENU_ITEM_HEIGHT: 32
  },

  getIncrementalDim: function(dim) {
    return Math.ceil(dim / this.Desktop.INCREMENT) * this.Desktop.INCREMENT;
  }
}

},{}],91:[function(require,module,exports){
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-borderradius-boxshadow-opacity-csstransforms-csstransforms3d-csstransitions-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;



module.exports = (function( window, document, undefined ) {

    var version = '2.8.3',

    Modernizr = {},


    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  ,


    toString = {}.toString,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),


    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, 


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
                body = document.body,
                fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
                      while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

                style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
          (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
        if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { 
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }


    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }

    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                            if (elem === false) return props[i];

                            if (is(item, 'function')){
                                return item.bind(elem || obj);
                }

                            return item;
            }
        }
        return false;
    }

    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

            if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

            } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }



    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };



    tests['opacity'] = function() {
                setCssAll('opacity:.55');

                    return (/^0.55$/).test(mStyle.opacity);
    };
    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

                        if ( ret && 'webkitPerspective' in docElement.style ) {

                      injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };



    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
                                    featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }



     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
                                              return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; 
     };


    setCss('');
    modElem = inputElem = null;


    Modernizr._version      = version;

    Modernizr._prefixes     = prefixes;
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;



    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };

    Modernizr.testAllProps  = testPropsAll;


    Modernizr.testStyles    = injectElementWithStyles;
    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
            return testPropsAll(prop, obj, elem);
      }
    };



    return Modernizr;

})(window, window.document);
;
},{}],92:[function(require,module,exports){
var index = 0;

module.exports = {
  generate: function() {
    return "mui-id-" + (index++);
  }
};

},{}],93:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],94:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

function classNames() {
	var classes = '';
	var arg;

	for (var i = 0; i < arguments.length; i++) {
		arg = arguments[i];
		if (!arg) {
			continue;
		}

		if ('string' === typeof arg || 'number' === typeof arg) {
			classes += ' ' + arg;
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			classes += ' ' + classNames.apply(null, arg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (!arg.hasOwnProperty(key) || !arg[key]) {
					continue;
				}
				classes += ' ' + key;
			}
		}
	}
	return classes.substr(1);
}

// safely export classNames for node / browserify
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

// safely export classNames for RequireJS
if (typeof define !== 'undefined' && define.amd) {
	define('classnames', [], function() {
		return classNames;
	});
}

},{}],95:[function(require,module,exports){
'use strict';

var React = require('react/addons');
var emptyFunction = function () {};

// for accessing browser globals
var root = typeof window !== 'undefined' ? window : this;
var bodyElement;
if (typeof document !== 'undefined' && 'body' in document) {
  bodyElement = document.body;
}

function updateBoundState (state, bound) {
  if (!bound) return state;
  bound = String(bound);
  var boundTop = !!~bound.indexOf('top');
  var boundRight = !!~bound.indexOf('right');
  var boundBottom = !!~bound.indexOf('bottom');
  var boundLeft = !!~bound.indexOf('left');
  var boundAll = !!~bound.indexOf('all') ||
    !(boundTop || boundRight || boundBottom || boundLeft);
  var boundBox = !~bound.indexOf('point');
  state.boundTop = boundAll || boundTop;
  state.boundRight = boundAll || boundRight;
  state.boundBottom = boundAll || boundBottom;
  state.boundLeft = boundAll || boundLeft;
  state.boundBox = boundBox;
  return state;
};

function createUIEvent(draggable) {
  return {
    position: {
      top: draggable.state.offsetTop,
      left: draggable.state.offsetLeft
    }
  };
}

function canDragY(draggable) {
  return draggable.props.axis === 'both' ||
      draggable.props.axis === 'y';
}

function canDragX(draggable) {
  return draggable.props.axis === 'both' ||
      draggable.props.axis === 'x';
}

function isFunction(func) {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]'
}

// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
function findInArray(array, callback) {
  for (var i = 0, length = array.length, element = null; i < length, element = array[i]; i++) {
    if (callback.apply(callback, [element, i, array])) return element;
  }
}

function matchesSelector(el, selector) {
  var method = findInArray([
    'matches',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector'
  ], function(method){
    return isFunction(el[method]);
  });

  return el[method].call(el, selector);
}

// @credits: http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
var isTouchDevice = 'ontouchstart' in root // works on most browsers
                 || 'onmsgesturechange' in root; // works on ie10 on ms surface

// look ::handleDragStart
//function isMultiTouch(e) {
//  return e.touches && Array.isArray(e.touches) && e.touches.length > 1
//}

/**
 * simple abstraction for dragging events names
 * */
var dragEventFor = (function () {
  var eventsFor = {
    touch: {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend'
    },
    mouse: {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    }
  };
  return eventsFor[isTouchDevice ? 'touch' : 'mouse'];
})();

/**
 * get {clientX, clientY} positions of control
 * */
function getControlPosition(e) {
  var position = (e.touches && e.touches[0]) || e;
  return {
    clientX: position.clientX,
    clientY: position.clientY
  }
}

function addEvent(el, event, handler) {
  if (!el) { return; }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    el['on' + event] = handler;
  }
}

function removeEvent(el, event, handler) {
  if (!el) { return; }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    el['on' + event] = null;
  }
}

module.exports = React.createClass({
  displayName: 'Draggable',
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    /**
     * `axis` determines which axis the draggable can move.
     *
     * 'both' allows movement horizontally and vertically.
     * 'x' limits movement to horizontal axis.
     * 'y' limits movement to vertical axis.
     *
     * Defaults to 'both'.
     */
    axis: React.PropTypes.oneOf(['both', 'x', 'y']),

    /**
     * `handle` specifies a selector to be used as the handle that initiates drag.
     *
     * Example:
     *
     * ```jsx
     *  var App = React.createClass({
     *      render: function () {
     *        return (
     *          <Draggable handle=".handle">
     *            <div>
     *                <div className="handle">Click me to drag</div>
     *                <div>This is some other content</div>
     *            </div>
     *          </Draggable>
     *        );
     *      }
     *  });
     * ```
     */
    handle: React.PropTypes.string,

    /**
     * `cancel` specifies a selector to be used to prevent drag initialization.
     *
     * Example:
     *
     * ```jsx
     *  var App = React.createClass({
     *      render: function () {
     *          return(
     *              <Draggable cancel=".cancel">
     *                  <div>
     *                    <div className="cancel">You can't drag from here</div>
     *            <div>Dragging here works fine</div>
     *                  </div>
     *              </Draggable>
     *          );
     *      }
     *  });
     * ```
     */
    cancel: React.PropTypes.string,

    /**
     * `bound` determines whether to bound the movement to the parent box.
     *
     * The property takes a list of space-separated strings. The Draggable
     * is bounded by the nearest DOMNode.offsetParent. To set the offset
     * parent, give it a position value other than 'static'.
     *
     * Optionally choose one or more bounds from:
     * 'top' bounds movement to the top edge of the parent box.
     * 'right' bounds movement to the right edge of the parent box.
     * 'bottom' bounds movement to the bottom edge of the parent box.
     * 'left' bounds movement to the left edge of the parent box.
     * 'all' bounds movement to all edges (default if not specified).
     *
     * Optionally choose one anchor from:
     * 'point' to constrain only the top-left corner.
     * 'box' to constrain the entire box (default if not specified).
     *
     * You may use more than one bound, e.g. 'top left point'. Set to a
     * falsy value to disable.
     *
     * Defaults to 'all box'.
     */
    bound: React.PropTypes.string,

    /**
     * `grid` specifies the x and y that dragging should snap to.
     *
     * Example:
     *
     * ```jsx
     *   var App = React.createClass({
     *       render: function () {
     *           return (
     *              <Draggable grid={[25, 25]}>
     *                   <div>I snap to a 25 x 25 grid</div>
     *               </Draggable>
     *           );
     *      }
     *   });
     * ```
     */
    grid: React.PropTypes.arrayOf(React.PropTypes.number),

    /**
     * `constrain` takes a function to constrain the dragging.
     *
     * Example:
     *
     * ```jsx
     *   function constrain (snap) {
     *         function constrainOffset (offset, prev) {
     *               var delta = offset - prev;
     *               if (Math.abs(delta) >= snap) {
     *                     return prev + (delta < 0 ? -snap : snap);
     *               }
     *               return prev;
     *         }
     *         return function (pos) {
     *               return {
     *                     top: constrainOffset(pos.top, pos.prevTop),
     *                     left: constrainOffset(pos.left, pos.prevLeft)
     *               };
     *         };
     *   }
     *   var App = React.createClass({
     *       render: function () {
     *           return (
     *               <Draggable constrain={constrain}>
     *                   <div>I snap to a 25 x 25 grid</div>
     *               </Draggable>
     *           );
     *       }
     *   });
     * ```
     */
    constrain: React.PropTypes.func,

    /**
     * `start` specifies the x and y that the dragged item should start at
     *
     * Example:
     *
     * ```jsx
     *  var App = React.createClass({
     *      render: function () {
     *          return (
     *              <Draggable start={{x: 25, y: 25}}>
     *                  <div>I start with left: 25px; top: 25px;</div>
     *              </Draggable>
     *          );
     *      }
     *  });
     * ```
     */
    start: React.PropTypes.object,

    /**
     * `zIndex` specifies the zIndex to use while dragging.
     *
     * Example:
     *
     * ```jsx
     *  var App = React.createClass({
     *      render: function () {
     *          return (
     *              <Draggable zIndex={100}>
     *                  <div>I have a zIndex</div>
     *              </Draggable>
     *          );
     *      }
     *  });
     * ```
     */
    zIndex: React.PropTypes.number,

    /**
     * `useChild` determines whether to use the first child as root.
     *
     * If false, a div is created. This option is required if any children
     * have a ref.
     *
     * Defaults to true.
     */
    useChild: React.PropTypes.bool,

    /**
     * Called when dragging starts.
     *
     * Example:
     *
     * ```js
     *  function (event, ui) {}
     * ```
     *
     * `event` is the Event that was triggered.
     * `ui` is an object:
     *
     * ```js
     *  {
     *    position: {top: 0, left: 0}
     *  }
     * ```
     */
    onStart: React.PropTypes.func,

    /**
     * Called while dragging.
     *
     * Example:
     *
     * ```js
     *  function (event, ui) {}
     * ```
     *
     * `event` is the Event that was triggered.
     * `ui` is an object:
     *
     * ```js
     *  {
     *    position: {top: 0, left: 0}
     *  }
     * ```
     */
    onDrag: React.PropTypes.func,

    /**
     * Called when dragging stops.
     *
     * Example:
     *
     * ```js
     *  function (event, ui) {}
     * ```
     *
     * `event` is the Event that was triggered.
     * `ui` is an object:
     *
     * ```js
     *  {
     *    position: {top: 0, left: 0}
     *  }
     * ```
     */
    onStop: React.PropTypes.func,

    /**
     * A workaround option which can be passed if onMouseDown needs to be accessed, since it'll always be blocked (due to that there's internal use of onMouseDown)
     *
     */
    onMouseDown: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      axis: 'both',
      bound: null,
      handle: null,
      cancel: null,
      grid: null,
      start: {},
      zIndex: NaN,
      useChild: true,
      onStart: emptyFunction,
      onDrag: emptyFunction,
      onStop: emptyFunction,
      onMouseDown: emptyFunction
    };
  },

  getInitialState: function () {
    var state = {
      // Whether or not currently dragging
      dragging: false,

      // Pointer offset on screen
      clientX: 0, clientY: 0,

      // DOMNode offset relative to parent
      offsetLeft: this.props.start.x || 0, offsetTop: this.props.start.y || 0
    };

    updateBoundState(state, this.props.bound);

    return state;
  },

  componentWillReceiveProps: function (nextProps) {
    var state = updateBoundState({}, nextProps.bound);
    if (nextProps.start) {
      if (nextProps.start.x != null) {
        state.offsetLeft = nextProps.start.x || 0;
      }
      if (nextProps.start.y != null) {
        state.offsetTop = nextProps.start.y || 0;
      }
    }
    this.setState(state);
  },

  componentWillUnmount: function() {
    // Remove any leftover event handlers
    removeEvent(root, dragEventFor['move'], this.handleDrag);
    removeEvent(root, dragEventFor['end'], this.handleDragEnd);
  },

  handleDragStart: function (e) {
    // todo: write right implementation to prevent multitouch drag
    // prevent multi-touch events
    // if (isMultiTouch(e)) {
    //     this.handleDragEnd.apply(e, arguments);
    //     return
    // }

    // Make it possible to attach event handlers on top of this one
    this.props.onMouseDown(e);

    // Short circuit if handle or cancel prop was provided and selector doesn't match
    if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
      (this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
      return;
    }

    var dragPoint = getControlPosition(e);

    // Initiate dragging
    this.setState({
      dragging: true,
      clientX: dragPoint.clientX,
      clientY: dragPoint.clientY
    });

    // Call event handler
    this.props.onStart(e, createUIEvent(this));

    // Add event handlers
    addEvent(root, dragEventFor['move'], this.handleDrag);
    addEvent(root, dragEventFor['end'], this.handleDragEnd);

    // Add dragging class to body element
    if (bodyElement) bodyElement.className += ' react-draggable-dragging';
  },

  handleDragEnd: function (e) {
    // Short circuit if not currently dragging
    if (!this.state.dragging) {
      return;
    }

    // Turn off dragging
    this.setState({
      dragging: false
    });

    // Call event handler
    this.props.onStop(e, createUIEvent(this));

    // Remove event handlers
    removeEvent(root, dragEventFor['move'], this.handleDrag);
    removeEvent(root, dragEventFor['end'], this.handleDragEnd);

    // Remove dragging class from body element
    if (bodyElement) {
      var className = bodyElement.className;
      bodyElement.className =
        className.replace(/(?:^|\s+)react-draggable-dragging\b/, ' ');
    }
  },

  handleDrag: function (e) {
    var dragPoint = getControlPosition(e);
    var offsetLeft = this._toPixels(this.state.offsetLeft);
    var offsetTop = this._toPixels(this.state.offsetTop);

    var state = {
      offsetLeft: offsetLeft,
      offsetTop: offsetTop
    };

    // Get parent DOM node
    var node = this.getDOMNode();
    var offsetParent = node.offsetParent;
    var offset, boundingValue;

    if (canDragX(this)) {
      // Calculate updated position
      offset = offsetLeft + dragPoint.clientX - this.state.clientX;

      // Bound movement to parent box
      if (this.state.boundLeft) {
        boundingValue = state.offsetLeft - node.offsetLeft;
        if (offset < boundingValue) {
          offset = boundingValue;
        }
      }
      if (this.state.boundRight) {
        boundingValue += offsetParent.clientWidth;
        if (this.state.boundBox) {
          boundingValue -= node.offsetWidth;
        }
        if (offset > boundingValue) {
          offset = boundingValue;
        }
      }
      // Update left
      state.offsetLeft = offset;
    }

    if (canDragY(this)) {
      // Calculate updated position
      offset = offsetTop + dragPoint.clientY - this.state.clientY;
      // Bound movement to parent box
      if (this.state.boundTop) {
        boundingValue = state.offsetTop - node.offsetTop;
        if (offset < boundingValue) {
          offset = boundingValue;
        }
      }
      if (this.state.boundBottom) {
        boundingValue += offsetParent.clientHeight;
        if (this.state.boundBox) {
          boundingValue -= node.offsetHeight;
        }
        if (offset > boundingValue) {
          offset = boundingValue;
        }
      }
      // Update top
      state.offsetTop = offset;
    }

    var constrain = this.props.constrain;
    var grid = this.props.grid;

    // Backwards-compatibility for snap to grid
    if (!constrain && Array.isArray(grid)) {
      var constrainOffset = function (offset, prev, snap) {
        var delta = offset - prev;
        if (Math.abs(delta) >= snap) {
          return prev + parseInt(delta / snap, 10) * snap;
        }
        return prev;
      };
      constrain = function (pos) {
        return {
          left: constrainOffset(pos.left, pos.prevLeft, grid[0]),
          top: constrainOffset(pos.top, pos.prevTop, grid[1])
        };
      };
    }

    // Constrain if function has been provided
    var positions;
    if (constrain) {
      // Constrain positions
      positions = constrain({
        prevLeft: this.state.offsetLeft,
        prevTop: this.state.offsetTop,
        left: state.offsetLeft,
        top: state.offsetTop
      });
      if (positions) {
        // Update left
        if ('left' in positions && !isNaN(positions.left)) {
          state.offsetLeft = positions.left;
        }
        // Update top
        if ('top' in positions && !isNaN(positions.top)) {
          state.offsetTop = positions.top;
        }
      }
    }

    // Save new state
    state.clientX = this.state.clientX + (state.offsetLeft - offsetLeft);
    state.clientY = this.state.clientY + (state.offsetTop - offsetTop);
    this.setState(state);

    // Call event handler
    this.props.onDrag(e, createUIEvent(this));
  },

  onTouchStart: function (e) {
    e.preventDefault(); // prevent for scroll
    return this.handleDragStart.apply(this, arguments);
  },

  render: function () {
    var style = {
      top: this.state.offsetTop,
      left: this.state.offsetLeft
    };

    // Set zIndex if currently dragging and prop has been provided
    if (this.state.dragging && !isNaN(this.props.zIndex)) {
      style.zIndex = this.props.zIndex;
    }

    var props = {
      style: style,
      className: 'react-draggable',

      onMouseDown: this.handleDragStart,
      onTouchStart: this.onTouchStart,

      onMouseUp: this.handleDragEnd,
      onTouchEnd: this.handleDragEnd
    };

    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    if (this.props.useChild) {
      return React.addons.cloneWithProps(React.Children.only(this.props.children), props);
    }

    return React.DOM.div(props, this.props.children);
  },

  _toPixels: function (value) {

    // Support percentages
    if (typeof value == 'string' && value.slice(-1) == '%') {
      return parseInt((+value.replace('%', '') / 100) *
        this.getDOMNode().offsetParent.clientWidth, 10) || 0;
    }

    // Invalid values become zero
    var i = parseInt(value, 10);
    if (isNaN(i) || !isFinite(i)) return 0;

    return i;
  }

});

},{"react/addons":undefined}],"/lib":[function(require,module,exports){
module.exports = {
  AppBar: require('./app-bar'),
  AppCanvas: require('./app-canvas'),
  Checkbox: require('./checkbox'),
  DatePicker: require('./date-picker/date-picker'),
  Dialog: require('./dialog'),
  DialogWindow: require('./dialog-window'),
  DropDownIcon: require('./drop-down-icon'),
  DropDownMenu: require('./drop-down-menu'),
  EnhancedButton: require('./enhanced-button'),
  FlatButton: require('./flat-button'),
  FloatingActionButton: require('./floating-action-button'),
  FontIcon: require('./font-icon'),
  IconButton: require('./icon-button'),
  LeftNav: require('./left-nav'),
  Menu: require('./menu/menu'),
  MenuItem: require('./menu/menu-item'),
  Mixins: {
    Classable: require('./mixins/classable'),
    ClickAwayable: require('./mixins/click-awayable'),
    WindowListenable: require('./mixins/window-listenable'),
    StylePropable: require('./mixins/style-propable')
  },
  Paper: require('./paper'),
  RadioButton: require('./radio-button'),
  RadioButtonGroup: require('./radio-button-group'),
  RaisedButton: require('./raised-button'),
  Slider: require('./slider'),
  SvgIcon: require('./svg-icon'),
  Icons: {
    NavigationMenu: require('./svg-icons/navigation-menu'),
    NavigationChevronLeft: require('./svg-icons/navigation-chevron-left'),
    NavigationChevronRight: require('./svg-icons/navigation-chevron-right')
  },
  Styles: {
    AutoPrefix: require('./styles/auto-prefix'),
    Colors: require('./styles/colors'),
    Spacing: require('./styles/spacing'),
    ThemeManager: require('./styles/theme-manager'),
    Transitions: require('./styles/transitions'),
    Typography: require('./styles/typography')
  },
  Snackbar: require('./snackbar'),
  Tab: require('./tabs/tab'),
  Tabs: require('./tabs/tabs'),
  Toggle: require('./toggle'),
  TimePicker: require('./time-picker'),
  TextField: require('./text-field'),
  Toolbar: require('./toolbar/toolbar'),
  ToolbarGroup: require('./toolbar/toolbar-group'),
  ToolbarSeparator: require('./toolbar/toolbar-separator'),
  ToolbarTitle: require('./toolbar/toolbar-title'),
  Tooltip: require('./tooltip'),
  Utils: {
    CssEvent: require('./utils/css-event'),
    Dom: require('./utils/dom'),
    Events: require('./utils/events'),
    KeyCode: require('./utils/key-code'),
    KeyLine: require('./utils/key-line'),
    ColorManipulator: require('./utils/color-manipulator'),
    Extend: require('./utils/extend'),
    UniqueId: require('./utils/unique-id')
  }
};

},{"./app-bar":1,"./app-canvas":2,"./checkbox":4,"./date-picker/date-picker":11,"./dialog":14,"./dialog-window":13,"./drop-down-icon":15,"./drop-down-menu":16,"./enhanced-button":17,"./flat-button":20,"./floating-action-button":21,"./font-icon":22,"./icon-button":23,"./left-nav":25,"./menu/menu":28,"./menu/menu-item":27,"./mixins/classable":30,"./mixins/click-awayable":31,"./mixins/style-propable":32,"./mixins/window-listenable":33,"./paper":35,"./radio-button":37,"./radio-button-group":36,"./raised-button":38,"./slider":42,"./snackbar":43,"./styles/auto-prefix":44,"./styles/colors":45,"./styles/spacing":46,"./styles/theme-manager":47,"./styles/transitions":50,"./styles/typography":51,"./svg-icon":52,"./svg-icons/navigation-chevron-left":54,"./svg-icons/navigation-chevron-right":55,"./svg-icons/navigation-menu":56,"./tabs/tab":61,"./tabs/tabs":63,"./text-field":64,"./time-picker":71,"./toggle":75,"./toolbar/toolbar":79,"./toolbar/toolbar-group":76,"./toolbar/toolbar-separator":77,"./toolbar/toolbar-title":78,"./tooltip":80,"./utils/color-manipulator":83,"./utils/css-event":84,"./utils/dom":86,"./utils/events":87,"./utils/extend":88,"./utils/key-code":89,"./utils/key-line":90,"./utils/unique-id":92}]},{},[])("/lib")
});