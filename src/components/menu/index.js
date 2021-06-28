class CAGOVOverlayNav extends window.HTMLElement {
  connectedCallback () {
    this.menuContentFile = this.dataset.json;
    this.querySelector('.open-menu').addEventListener('click', this.toggleMainMenu.bind(this));
    this.expansionListeners(); // everything is expanded by default on big screens
  }

  toggleMainMenu () {
    if (this.querySelector('.hamburger').classList.contains('is-active')) {
      this.closeMainMenu();
    } else {
      this.openMainMenu();
    }
  }

  openMainMenu () {
    this.classList.add('display-menu');
    this.querySelector('.hamburger').classList.add('is-active');
    this.querySelector('.menu-trigger').classList.add('is-fixed');
    var menLabel = this.querySelector('.menu-trigger-label');
    menLabel.innerHTML = menLabel.getAttribute('data-closelabel');
  }

  closeMainMenu () {
    this.classList.remove('display-menu');
    this.classList.remove('reveal-items');
    this.querySelector('.hamburger').classList.remove('is-active');
    this.querySelector('.menu-trigger').classList.remove('is-fixed');
    var menLabel = this.querySelector('.menu-trigger-label');
    menLabel.innerHTML =  menLabel.getAttribute('data-openlabel');
  }

  closeAllMenus() {
    const allMenus = this.querySelectorAll('.js-expandable-mobile');
    allMenus.forEach(menu => {
      let expandedEl = menu.closest('.expanded-menu-section');
      expandedEl.classList.remove('expanded');
      menu.closest('.expanded-menu-col').setAttribute('aria-expanded', 'false');
      let closestDropDown = menu.closest('.expanded-menu-section').querySelector('.expanded-menu-dropdown');
      if (closestDropDown) {
        closestDropDown.setAttribute('aria-hidden', 'true');
        let allLinks = closestDropDown.querySelectorAll("a");
        for (var i = 0; i < allLinks.length; i++) {
          allLinks[i].setAttribute('tabindex', '-1'); // set tabindex to -1 so you cannot tab through these hidden links
        }
      }
    });
  }

  expansionListeners () {
    const allMenus = this.querySelectorAll('.js-expandable-mobile');
    allMenus.forEach(menu => {
      const nearestMenu = menu.closest('.expanded-menu-section');
      if (nearestMenu) {
        const nearestMenuDropDown = nearestMenu.querySelector('.expanded-menu-dropdown');
        if (nearestMenuDropDown) {
          nearestMenuDropDown.setAttribute('aria-hidden', 'true');
          menu.closest('.expanded-menu-col').setAttribute('aria-expanded', 'false');
        }
      }
      let menuComponent = this;
      menu.addEventListener('click', function (event) {
        event.preventDefault();
        let expandedEl = this.closest('.expanded-menu-section');
        if(expandedEl) {
          if(expandedEl.classList.contains('expanded')) {
            // closing an open menu
            menuComponent.closeAllMenus();
          } else {
            menuComponent.closeAllMenus();
            expandedEl.classList.add('expanded');
            this.closest('.expanded-menu-col').setAttribute('aria-expanded', 'true');
            let closestDropDown = this.closest('.expanded-menu-section').querySelector('.expanded-menu-dropdown');
            if (closestDropDown) {
              closestDropDown.setAttribute('aria-hidden', 'false');
              let allLinks = closestDropDown.querySelectorAll("a");
              for (var i = 0; i < allLinks.length; i++) {
                allLinks[i].removeAttribute("tabindex"); // remove tabindex from all the links
              }
            }
          }
        }
      });
    });
  }
}
window.customElements.define('cagov-navoverlay', CAGOVOverlayNav);
