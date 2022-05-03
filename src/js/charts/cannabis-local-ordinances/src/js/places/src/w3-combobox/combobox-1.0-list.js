/**
 * ComboboxList;
 */
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
var ComboboxList = function (domNode) {
  this.domNode = domNode;
  this.listbox = false;
  this.option = false;

  this.hasFocus = false;
  this.hasHover = false;
  this.filter = "";
  this.isNone = false;
  this.isList = false;
  this.isBoth = false;

  this.keyCode = Object.freeze({
    BACKSPACE: 8,
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    SPACE: 32,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  });
  this.updatedEvent = new Event("cagov-combox-updated");
};

ComboboxList.prototype.init = function () {
  this.domNode.setAttribute("aria-haspopup", "true");

  var autocomplete = this.domNode.getAttribute("aria-autocomplete");

  // cagov-places-combox has "both" hardcoded.
  if (typeof autocomplete === "string") {
    autocomplete = autocomplete.toLowerCase();
    this.isNone = autocomplete === "none";
    this.isList = autocomplete === "list";
    this.isBoth = autocomplete === "both";
  } else {
    // default value of autocomplete
    this.isNone = true;
  }

  this.domNode.addEventListener("keydown", this.handleKeydown.bind(this));
  this.domNode.addEventListener("keyup", this.handleKeyup.bind(this));
  this.domNode.addEventListener("click", this.handleClick.bind(this));
  this.domNode.addEventListener("focus", this.handleFocus.bind(this));
  this.domNode.addEventListener("blur", this.handleBlur.bind(this));

  // initialize pop up menus

  var listbox = document.getElementById(this.domNode.getAttribute("aria-owns"));

  if (listbox) {
    this.listbox = new Listbox(listbox, this);
    this.listbox.init();
  }

  // Open Button

  var button = this.domNode.nextElementSibling;

  if (button && button.tagName === "BUTTON") {
    button.addEventListener("click", this.handleButtonClick.bind(this));
  }
};

ComboboxList.prototype.setActiveDescendant = function (option) {
  if (option && this.listbox.hasFocus) {
    this.domNode.setAttribute("aria-activedescendant", option.domNode.id);
  } else {
    this.domNode.setAttribute("aria-activedescendant", "");
  }
};

ComboboxList.prototype.setValue = function (option, value) {
  // @todo CAGOV-COMBOX
  // Spit this is two functions and reduce to 1 paramenter.
  // When aren't getting the value from the option, we just
  // set it to whatever it was before.
  if (option === null) {
    this.filter = value;
    return;
  } else {
    // @todo CAGOV-COMBOX
    // Now we get the values from the option element.
    // Abstract these values so we don't need to hard code them.
    this.filter = option.domNode.dataset.value;
    this.domNode.setAttribute("data-geoid", option.domNode.dataset.geoid);
    this.domNode.setAttribute("data-value", option.domNode.dataset.value);
    this.domNode.setAttribute(
      "data-jurisdiction",
      option.domNode.dataset.jurisdiction
    );
    this.domNode.dispatchEvent(this.updatedEvent);
  }
  this.domNode.value = this.filter;
  this.domNode.setSelectionRange(this.filter.length, this.filter.length);
  if (this.isList || this.isBoth) {
    this.listbox.filterOptions(this.filter, this.option);
  }
};

ComboboxList.prototype.setOption = function (option, flag) {
  if (typeof flag !== "boolean") {
    flag = false;
  }

  if (option) {
    this.option = option;
    this.listbox.setCurrentOptionStyle(this.option);
    this.setActiveDescendant(this.option);

    if (this.isBoth) {
      this.domNode.value = this.option.textContent;
      if (flag) {
        this.domNode.setSelectionRange(
          this.option.textContent.length,
          this.option.textContent.length
        );
      } else {
        this.domNode.setSelectionRange(
          this.filter.length,
          this.option.textContent.length
        );
      }
    }
  }
};

ComboboxList.prototype.setVisualFocusTextbox = function () {
  this.listbox.domNode.classList.remove("focus");
  this.listbox.hasFocus = false;
  this.domNode.classList.add("focus");
  this.hasFocus = true;
  this.setActiveDescendant(false);
};

ComboboxList.prototype.setVisualFocusListbox = function () {
  this.domNode.classList.remove("focus");
  this.hasFocus = false;
  this.listbox.domNode.classList.add("focus");
  this.listbox.hasFocus = true;
  this.setActiveDescendant(this.option);
};

ComboboxList.prototype.removeVisualFocusAll = function () {
  this.domNode.classList.remove("focus");
  this.hasFocus = false;
  this.listbox.domNode.classList.remove("focus");
  this.listbox.hasFocus = true;
  this.option = false;
  this.setActiveDescendant(false);
};

/* Event Handlers */

ComboboxList.prototype.handleKeydown = function (event) {
  var tgt = event.currentTarget,
    flag = false,
    char = event.key,
    shiftKey = event.shiftKey,
    ctrlKey = event.ctrlKey,
    altKey = event.altKey;

  switch (event.keyCode) {
    case this.keyCode.RETURN:
      if ((this.listbox.hasFocus || this.isBoth) && this.option) {
        this.setValue(this.option);
      }
      this.listbox.close(true);
      flag = true;
      break;

    case this.keyCode.DOWN:
      if (this.listbox.hasOptions()) {
        if (this.listbox.hasFocus || (this.isBoth && this.option)) {
          this.setOption(this.listbox.getNextItem(this.option), true);
        } else {
          this.listbox.open();
          if (!altKey) {
            this.setOption(this.listbox.getFirstItem(), true);
          }
        }
        this.setVisualFocusListbox();
      }
      flag = true;
      break;

    case this.keyCode.UP:
      if (this.listbox.hasOptions()) {
        if (this.listbox.hasFocus || (this.isBoth && this.option)) {
          this.setOption(this.listbox.getPreviousItem(this.option), true);
        } else {
          this.listbox.open();
          if (!altKey) {
            this.setOption(this.listbox.getLastItem(), true);
          }
        }
        this.setVisualFocusListbox();
      }
      flag = true;
      break;

    case this.keyCode.ESC:
      this.listbox.close(true);
      this.setVisualFocusTextbox();
      this.setValue("");
      this.option = false;
      flag = true;
      break;

    case this.keyCode.TAB:
      this.listbox.close(true);
      if (this.listbox.hasFocus) {
        if (this.option) {
          this.setValue(this.option);
        }
      }
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

ComboboxList.prototype.handleKeyup = function (event) {
  var tgt = event.currentTarget,
    flag = false,
    option = false,
    char = event.key;

  function isPrintableCharacter(str) {
    return str.length === 1;
  }

  if (isPrintableCharacter(char)) {
    this.filter += char;
  }

  // this is for the case when a selection in the textbox has been deleted
  if (this.domNode.value.length < this.filter.length) {
    this.filter = this.domNode.value;
    this.option = false;
  }

  if (event.keyCode === this.keyCode.ESC) {
    return;
  }

  switch (event.keyCode) {
    case this.keyCode.BACKSPACE:
      this.setValue(null, this.domNode.value);
      this.setVisualFocusTextbox();
      this.listbox.setCurrentOptionStyle(false);
      this.option = false;
      flag = true;
      break;

    case this.keyCode.LEFT:
    case this.keyCode.RIGHT:
    case this.keyCode.HOME:
    case this.keyCode.END:
      if (this.isBoth) {
        this.filter = this.domNode.value;
      } else {
        this.option = false;
        this.listbox.setCurrentOptionStyle(false);
      }

      this.setVisualFocusTextbox();
      flag = true;
      break;

    default:
      if (isPrintableCharacter(char)) {
        this.setVisualFocusTextbox();
        this.listbox.setCurrentOptionStyle(false);
        flag = true;
      }

      break;
  }

  if (event.keyCode !== this.keyCode.RETURN) {
    if (this.isList || this.isBoth) {
      option = this.listbox.filterOptions(this.filter, this.option);
      if (option) {
        if (this.listbox.isClosed()) {
          if (this.domNode.value.length) {
            this.listbox.open();
          }
        }

        if (
          option.textComparison.indexOf(this.domNode.value.toLowerCase()) === 0
        ) {
          this.option = option;
          if (this.isBoth || this.listbox.hasFocus) {
            this.listbox.setCurrentOptionStyle(option);
            if (this.isBoth && isPrintableCharacter(char)) {
              this.setOption(option);
            }
          }
        } else {
          this.option = false;
          this.listbox.setCurrentOptionStyle(false);
        }
      } else {
        this.listbox.close();
        this.option = false;
        this.setActiveDescendant(false);
      }
    } else {
      if (this.domNode.value.length) {
        this.listbox.open();
      }
    }
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

ComboboxList.prototype.handleClick = function (event) {
  if (this.listbox.isOpen()) {
    this.listbox.close(true);
  } else {
    this.listbox.open();
  }
};

ComboboxList.prototype.handleFocus = function (event) {
  this.setVisualFocusTextbox();
  this.option = false;
  this.listbox.setCurrentOptionStyle(null);
};

ComboboxList.prototype.handleBlur = function (event) {
  this.listbox.hasFocus = false;
  this.listbox.setCurrentOptionStyle(null);
  this.removeVisualFocusAll();
  setTimeout(this.listbox.close.bind(this.listbox, false), 300);
};

ComboboxList.prototype.handleButtonClick = function (event) {
  if (this.listbox.isOpen()) {
    this.listbox.close(true);
  } else {
    this.listbox.open();
  }
  this.domNode.focus();
  this.setVisualFocusTextbox();
};

// Initialize comboboxes

window.addEventListener("load", function () {
  var comboboxes = document.querySelectorAll(
    '.combobox-list input[role="combobox"]'
  );

  for (var i = 0; i < comboboxes.length; i++) {
    var combobox = new ComboboxList(comboboxes[i]);
    combobox.init();
  }
});

/**
 * Listbox
 */

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
var Listbox = function (domNode, comboboxObj) {
  var elementChildren,
    msgPrefix = "Listbox constructor argument domNode ";

  // Check whether domNode is a DOM element
  if (!domNode instanceof Element) {
    throw new TypeError(msgPrefix + "is not a DOM Element.");
  }

  // Check whether domNode has child elements
  if (domNode.childElementCount === 0) {
    throw new Error(msgPrefix + "has no element children.");
  }

  // Check whether domNode child elements are A elements
  var childElement = domNode.firstElementChild;
  while (childElement) {
    var option = childElement.firstElementChild;
    childElement = childElement.nextElementSibling;
  }

  this.domNode = domNode;
  this.combobox = comboboxObj;

  this.allOptions = [];

  this.options = []; // see PopupMenu init method

  this.firstOption = null; // see PopupMenu init method
  this.lastOption = null; // see PopupMenu init method

  this.hasFocus = false; // see MenuItem handleFocus, handleBlur
  this.hasHover = false; // see PopupMenu handleMouseover, handleMouseout
};

/*
 *   @method Listbox.prototype.init
 *
 *   @desc
 *       Add domNode event listeners for mouseover and mouseout. Traverse
 *       domNode children to configure each option and populate.options
 *       array. Initialize firstOption and lastOption properties.
 */
Listbox.prototype.init = function () {
  var childElement,
    optionElement,
    optionElements,
    firstChildElement,
    option,
    textContent,
    numItems;

  // Configure the domNode itself
  this.domNode.tabIndex = -1;

  this.domNode.setAttribute("role", "listbox");

  this.domNode.addEventListener("mouseover", this.handleMouseover.bind(this));
  this.domNode.addEventListener("mouseout", this.handleMouseout.bind(this));

  // Traverse the element children of domNode: configure each with
  // option role behavior and store reference in.options array.
  optionElements = this.domNode.getElementsByTagName("LI");

  for (var i = 0; i < optionElements.length; i++) {
    optionElement = optionElements[i];

    if (
      !optionElement.firstElementChild &&
      optionElement.getAttribute("role") != "separator"
    ) {
      option = new Option(optionElement, this);
      option.init();
      this.allOptions.push(option);
    }
  }

  this.filterOptions("");
};

Listbox.prototype.filterOptions = function (filter, currentOption) {
  if (typeof filter !== "string") {
    filter = "";
  }

  var firstMatch = false,
    i,
    option,
    textContent,
    numItems;

  filter = filter.toLowerCase();

  this.options = [];
  this.firstChars = [];
  this.domNode.innerHTML = "";

  for (i = 0; i < this.allOptions.length; i++) {
    option = this.allOptions[i];
    if (filter.length === 0 || option.textComparison.indexOf(filter) === 0) {
      this.options.push(option);
      textContent = option.textContent.trim();
      this.firstChars.push(textContent.substring(0, 1).toLowerCase());
      this.domNode.appendChild(option.domNode);
    }
  }

  // Use populated.options array to initialize firstOption and lastOption.
  numItems = this.options.length;
  if (numItems > 0) {
    this.firstOption = this.options[0];
    this.lastOption = this.options[numItems - 1];

    if (currentOption && this.options.indexOf(currentOption) >= 0) {
      option = currentOption;
    } else {
      option = this.firstOption;
    }
  } else {
    this.firstOption = false;
    option = false;
    this.lastOption = false;
  }

  return option;
};

Listbox.prototype.setCurrentOptionStyle = function (option) {
  for (var i = 0; i < this.options.length; i++) {
    var opt = this.options[i];
    if (opt === option) {
      opt.domNode.setAttribute("aria-selected", "true");
      this.domNode.scrollTop = opt.domNode.offsetTop;
    } else {
      opt.domNode.removeAttribute("aria-selected");
    }
  }
};

Listbox.prototype.setOption = function (option) {
  if (option) {
    this.combobox.setOption(option);
    this.combobox.setValue(option);
  }
};

/* EVENT HANDLERS */

Listbox.prototype.handleMouseover = function (event) {
  this.hasHover = true;
};

Listbox.prototype.handleMouseout = function (event) {
  this.hasHover = false;
  setTimeout(this.close.bind(this, false), 300);
};

/* FOCUS MANAGEMENT METHODS */

Listbox.prototype.getFirstItem = function () {
  return this.firstOption;
};

Listbox.prototype.getLastItem = function () {
  return this.lastOption;
};

Listbox.prototype.getPreviousItem = function (currentOption) {
  var index;

  if (currentOption !== this.firstOption) {
    index = this.options.indexOf(currentOption);
    return this.options[index - 1];
  }
  return this.lastOption;
};

Listbox.prototype.getNextItem = function (currentOption) {
  var index;

  if (currentOption !== this.lastOption) {
    index = this.options.indexOf(currentOption);
    return this.options[index + 1];
  }
  return this.firstOption;
};

/* MENU DISPLAY METHODS */

Listbox.prototype.isOpen = function () {
  return this.domNode.style.display === "block";
};

Listbox.prototype.isClosed = function () {
  return this.domNode.style.display !== "block";
};

Listbox.prototype.hasOptions = function () {
  return this.options.length;
};

Listbox.prototype.open = function () {
  // set CSS properties
  this.domNode.style.display = "block";

  // set aria-expanded attribute
  this.combobox.domNode.setAttribute("aria-expanded", "true");
};

Listbox.prototype.close = function (force) {
  if (typeof force !== "boolean") {
    force = false;
  }

  if (force || (!this.hasFocus && !this.hasHover && !this.combobox.hasHover)) {
    this.setCurrentOptionStyle(false);
    this.domNode.style.display = "none";
    this.combobox.domNode.setAttribute("aria-expanded", "false");
    this.combobox.setActiveDescendant(false);
  }
};

/**
 * Option;
 */

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
var Option = function (domNode, listboxObj) {
  this.domNode = domNode;
  this.listbox = listboxObj;
  this.textContent = domNode.textContent;
  this.textComparison = domNode.textContent.toLowerCase();
};

Option.prototype.init = function () {
  if (!this.domNode.getAttribute("role")) {
    this.domNode.setAttribute("role", "option");
  }

  this.domNode.addEventListener("click", this.handleClick.bind(this));
  this.domNode.addEventListener("mouseover", this.handleMouseover.bind(this));
  this.domNode.addEventListener("mouseout", this.handleMouseout.bind(this));
};

/* EVENT HANDLERS */

Option.prototype.handleClick = function (event) {
  this.listbox.setOption(this);
  this.listbox.close(true);
};

Option.prototype.handleMouseover = function (event) {
  this.listbox.hasHover = true;
  this.listbox.open();
};

Option.prototype.handleMouseout = function (event) {
  this.listbox.hasHover = false;
  setTimeout(this.listbox.close.bind(this.listbox, false), 300);
};
