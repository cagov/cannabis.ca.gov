(()=>{var j=Object.create;var q=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,z=Object.prototype.hasOwnProperty;var N=(r,a)=>()=>(a||r((a={exports:{}}).exports,a),a.exports);var B=(r,a,i,e)=>{if(a&&typeof a=="object"||typeof a=="function")for(let t of O(a))!z.call(r,t)&&t!==i&&q(r,t,{get:()=>a[t],enumerable:!(e=D(a,t))||e.enumerable});return r};var F=(r,a,i)=>(i=r!=null?j(I(r)):{},B(a||!r||!r.__esModule?q(i,"default",{value:r,enumerable:!0}):i,r));var H=N((T,C)=>{(function(r){typeof define=="function"&&define.amd?define(r):typeof T=="object"?C.exports=r():r()})(function(){"use strict";var r=typeof window<"u"?window:this,a=r.Glider=function(e,t){var n=this;if(e._glider)return e._glider;if(n.ele=e,n.ele.classList.add("glider"),n.ele._glider=n,n.opt=Object.assign({},{slidesToScroll:1,slidesToShow:1,resizeLock:!0,duration:.5,easing:function(o,s,l,c,d){return c*(s/=d)*s+l}},t),n.animate_id=n.page=n.slide=0,n.arrows={},n._opt=n.opt,n.opt.skipTrack)n.track=n.ele.children[0];else for(n.track=document.createElement("div"),n.ele.appendChild(n.track);n.ele.children.length!==1;)n.track.appendChild(n.ele.children[0]);n.track.classList.add("glider-track"),n.init(),n.resize=n.init.bind(n,!0),n.event(n.ele,"add",{scroll:n.updateControls.bind(n)}),n.event(r,"add",{resize:n.resize})},i=a.prototype;return i.init=function(e,t){var n=this,o=0,s=0;n.slides=n.track.children,[].forEach.call(n.slides,function(d,p){d.classList.add("glider-slide"),d.setAttribute("data-gslide",p)}),n.containerWidth=n.ele.clientWidth;var l=n.settingsBreakpoint();if(t||(t=l),n.opt.slidesToShow==="auto"||typeof n.opt._autoSlide<"u"){var c=n.containerWidth/n.opt.itemWidth;n.opt._autoSlide=n.opt.slidesToShow=n.opt.exactWidth?c:Math.max(1,Math.floor(c))}n.opt.slidesToScroll==="auto"&&(n.opt.slidesToScroll=Math.floor(n.opt.slidesToShow)),n.itemWidth=n.opt.exactWidth?n.opt.itemWidth:n.containerWidth/n.opt.slidesToShow,[].forEach.call(n.slides,function(d){d.style.height="auto",d.style.width=n.itemWidth+"px",o+=n.itemWidth,s=Math.max(d.offsetHeight,s)}),n.track.style.width=o+"px",n.trackWidth=o,n.isDrag=!1,n.preventClick=!1,n.opt.resizeLock&&n.scrollTo(n.slide*n.itemWidth,0),(l||t)&&(n.bindArrows(),n.buildDots(),n.bindDrag()),n.updateControls(),n.emit(e?"refresh":"loaded")},i.bindDrag=function(){var e=this;e.mouse=e.mouse||e.handleMouse.bind(e);var t=function(){e.mouseDown=void 0,e.ele.classList.remove("drag"),e.isDrag&&(e.preventClick=!0),e.isDrag=!1},n={mouseup:t,mouseleave:t,mousedown:function(o){o.preventDefault(),o.stopPropagation(),e.mouseDown=o.clientX,e.ele.classList.add("drag")},mousemove:e.mouse,click:function(o){e.preventClick&&(o.preventDefault(),o.stopPropagation()),e.preventClick=!1}};e.ele.classList.toggle("draggable",e.opt.draggable===!0),e.event(e.ele,"remove",n),e.opt.draggable&&e.event(e.ele,"add",n)},i.buildDots=function(){var e=this;if(!e.opt.dots){e.dots&&(e.dots.innerHTML="");return}if(typeof e.opt.dots=="string"?e.dots=document.querySelector(e.opt.dots):e.dots=e.opt.dots,!!e.dots){e.dots.innerHTML="",e.dots.classList.add("glider-dots");for(var t=0;t<Math.ceil(e.slides.length/e.opt.slidesToShow);++t){var n=document.createElement("button");n.dataset.index=t,n.setAttribute("aria-label","Page "+(t+1)),n.setAttribute("role","tab"),n.className="glider-dot "+(t?"":"active"),e.event(n,"add",{click:e.scrollItem.bind(e,t,!0)}),e.dots.appendChild(n)}}},i.bindArrows=function(){var e=this;if(!e.opt.arrows){Object.keys(e.arrows).forEach(function(t){var n=e.arrows[t];e.event(n,"remove",{click:n._func})});return}["prev","next"].forEach(function(t){var n=e.opt.arrows[t];n&&(typeof n=="string"&&(n=document.querySelector(n)),n&&(n._func=n._func||e.scrollItem.bind(e,t),e.event(n,"remove",{click:n._func}),e.event(n,"add",{click:n._func}),e.arrows[t]=n))})},i.updateControls=function(e){var t=this;e&&!t.opt.scrollPropagate&&e.stopPropagation();var n=t.containerWidth>=t.trackWidth;t.opt.rewind||(t.arrows.prev&&(t.arrows.prev.classList.toggle("disabled",t.ele.scrollLeft<=0||n),t.arrows.prev.classList.contains("disabled")?t.arrows.prev.setAttribute("aria-disabled",!0):t.arrows.prev.setAttribute("aria-disabled",!1)),t.arrows.next&&(t.arrows.next.classList.toggle("disabled",Math.ceil(t.ele.scrollLeft+t.containerWidth)>=Math.floor(t.trackWidth)||n),t.arrows.next.classList.contains("disabled")?t.arrows.next.setAttribute("aria-disabled",!0):t.arrows.next.setAttribute("aria-disabled",!1))),t.slide=Math.round(t.ele.scrollLeft/t.itemWidth),t.page=Math.round(t.ele.scrollLeft/t.containerWidth);var o=t.slide+Math.floor(Math.floor(t.opt.slidesToShow)/2),s=Math.floor(t.opt.slidesToShow)%2?0:o+1;Math.floor(t.opt.slidesToShow)===1&&(s=0),t.ele.scrollLeft+t.containerWidth>=Math.floor(t.trackWidth)&&(t.page=t.dots?t.dots.children.length-1:0),[].forEach.call(t.slides,function(l,c){var d=l.classList,p=d.contains("visible"),m=t.ele.scrollLeft,f=t.ele.scrollLeft+t.containerWidth,S=t.itemWidth*c,W=S+t.itemWidth;[].forEach.call(d,function(E){/^left|right/.test(E)&&d.remove(E)}),d.toggle("active",t.slide===c),o===c||s&&s===c?d.add("center"):(d.remove("center"),d.add([c<o?"left":"right",Math.abs(c-(c<o?o:s||o))].join("-")));var v=Math.ceil(S)>=Math.floor(m)&&Math.floor(W)<=Math.ceil(f);d.toggle("visible",v),v!==p&&t.emit("slide-"+(v?"visible":"hidden"),{slide:c})}),t.dots&&[].forEach.call(t.dots.children,function(l,c){l.classList.toggle("active",t.page===c)}),e&&t.opt.scrollLock&&(clearTimeout(t.scrollLock),t.scrollLock=setTimeout(function(){clearTimeout(t.scrollLock),Math.abs(t.ele.scrollLeft/t.itemWidth-t.slide)>.02&&(t.mouseDown||t.trackWidth>t.containerWidth+t.ele.scrollLeft&&t.scrollItem(t.getCurrentSlide()))},t.opt.scrollLockDelay||250))},i.getCurrentSlide=function(){var e=this;return e.round(e.ele.scrollLeft/e.itemWidth)},i.scrollItem=function(e,t,n){n&&n.preventDefault();var o=this,s=e;if(++o.animate_id,t===!0)e=e*o.containerWidth,e=Math.round(e/o.itemWidth)*o.itemWidth;else{if(typeof e=="string"){var l=e==="prev";if(o.opt.slidesToScroll%1||o.opt.slidesToShow%1?e=o.getCurrentSlide():e=o.slide,l?e-=o.opt.slidesToScroll:e+=o.opt.slidesToScroll,o.opt.rewind){var c=o.ele.scrollLeft;e=l&&!c?o.slides.length:!l&&c+o.containerWidth>=Math.floor(o.trackWidth)?0:e}}e=Math.max(Math.min(e,o.slides.length),0),o.slide=e,e=o.itemWidth*e}return o.scrollTo(e,o.opt.duration*Math.abs(o.ele.scrollLeft-e),function(){o.updateControls(),o.emit("animated",{value:s,type:typeof s=="string"?"arrow":t?"dot":"slide"})}),!1},i.settingsBreakpoint=function(){var e=this,t=e._opt.responsive;if(t){t.sort(function(l,c){return c.breakpoint-l.breakpoint});for(var n=0;n<t.length;++n){var o=t[n];if(r.innerWidth>=o.breakpoint)return e.breakpoint!==o.breakpoint?(e.opt=Object.assign({},e._opt,o.settings),e.breakpoint=o.breakpoint,!0):!1}}var s=e.breakpoint!==0;return e.opt=Object.assign({},e._opt),e.breakpoint=0,s},i.scrollTo=function(e,t,n){var o=this,s=new Date().getTime(),l=o.animate_id,c=function(){var d=new Date().getTime()-s;o.ele.scrollLeft=o.ele.scrollLeft+(e-o.ele.scrollLeft)*o.opt.easing(0,d,0,1,t),d<t&&l===o.animate_id?r.requestAnimationFrame(c):(o.ele.scrollLeft=e,n&&n.call(o))};r.requestAnimationFrame(c)},i.removeItem=function(e){var t=this;t.slides.length&&(t.track.removeChild(t.slides[e]),t.refresh(!0),t.emit("remove"))},i.addItem=function(e){var t=this;t.track.appendChild(e),t.refresh(!0),t.emit("add")},i.handleMouse=function(e){var t=this;t.mouseDown&&(t.isDrag=!0,t.ele.scrollLeft+=(t.mouseDown-e.clientX)*(t.opt.dragVelocity||3.3),t.mouseDown=e.clientX)},i.round=function(e){var t=this,n=t.opt.slidesToScroll%1||1,o=1/n;return Math.round(e*o)/o},i.refresh=function(e){var t=this;t.init(!0,e)},i.setOption=function(e,t){var n=this;n.breakpoint&&!t?n._opt.responsive.forEach(function(o){o.breakpoint===n.breakpoint&&(o.settings=Object.assign({},o.settings,e))}):n._opt=Object.assign({},n._opt,e),n.breakpoint=0,n.settingsBreakpoint()},i.destroy=function(){var e=this,t=e.ele.cloneNode(!0),n=function(o){o.removeAttribute("style"),[].forEach.call(o.classList,function(s){/^glider/.test(s)&&o.classList.remove(s)})};t.children[0].outerHTML=t.children[0].innerHTML,n(t),[].forEach.call(t.getElementsByTagName("*"),n),e.ele.parentNode.replaceChild(t,e.ele),e.event(r,"remove",{resize:e.resize}),e.emit("destroy")},i.emit=function(e,t){var n=this,o=new r.CustomEvent("glider-"+e,{bubbles:!n.opt.eventPropagate,detail:t});n.ele.dispatchEvent(o)},i.event=function(e,t,n){var o=e[t+"EventListener"].bind(e);Object.keys(n).forEach(function(s){o(s,n[s])})},a})});var U=`/* initial styles */
cagov-accordion details {
  border-radius: var(--radius-2, 5px) !important;
  margin-bottom: 0;
  min-height: var(--s-5, 3rem);
  margin-top: 0.5rem;
  border: solid var(--border-1, 1px) var(--gray-200, #d4d4d7) !important;
}
cagov-accordion details summary {
  cursor: pointer;
  padding: var(--s-1, 0.5rem) var(--s-5, 3rem) var(--s-1, 0.5rem) var(--s-2, 1rem);
  background-color: var(--gray-50, #fafafa);
  position: relative;
  line-height: var(--s-4, 2rem);
  margin: 0;
  color: var(--primary-700, #165ac2);
  font-size: var(--font-size-2, 1.125rem);
  font-weight: bold;
}
cagov-accordion details summary:hover {
  background-color: var(--gray-100, #fafafa);
  color: var(--primary-900, #003688);
}
cagov-accordion details .accordion-body {
  padding: var(--s-2, 1rem);
}

/* styles applied after custom element javascript runs */
cagov-accordion:defined {
  /* let it be open initially if details has open attribute */
}
cagov-accordion:defined details {
  transition: height var(--animation-duration-2, 0.2s);
  height: var(--s-5, 3rem);
  overflow: hidden;
}
cagov-accordion:defined details[open] {
  height: auto;
}
cagov-accordion:defined summary::-webkit-details-marker {
  display: none;
}
cagov-accordion:defined details summary {
  list-style: none; /* hide default expansion triangle after js executes */
  border-radius: var(--border-5, 5px) var(--border-5, 5px) 0 0;
}
cagov-accordion:defined details summary:focus {
  outline-offset: -2px;
  outline: solid 2px var(--accent2-500, #ac8227) !important;
  background-color: var(--gray-100, #fafafa);
}
cagov-accordion:defined details .cagov-open-indicator {
  background-color: var(--primary-700, #165ac2);
  height: 3px;
  width: 15px;
  border-radius: var(--border-3, 3px);
  position: absolute;
  right: var(--s-2, 1rem);
  top: 1.4rem;
}
cagov-accordion:defined details .cagov-open-indicator:before {
  display: block;
  content: "";
  position: absolute;
  top: -6px;
  left: 3px;
  width: 3px;
  height: 15px;
  border-radius: var(--border-3, 3px);
  border: none;
  box-shadow: 3px 0 0 0 var(--primary-700, #165ac2);
  background: none;
}
cagov-accordion:defined details[open] .cagov-open-indicator:before {
  display: none;
}

/*# sourceMappingURL=index.css.map */
`,b=class extends window.HTMLElement{constructor(){if(super(),!document.querySelector("#cagov-accordion-styles")){let a=document.createElement("style");a.id="cagov-accordion-styles",a.textContent=U,document.querySelector("head").appendChild(a)}}connectedCallback(){this.summaryEl=this.querySelector("summary"),this.setHeight(),this.summaryEl.addEventListener("click",this.listen.bind(this)),this.summaryEl.insertAdjacentHTML("beforeend",'<div class="cagov-open-indicator" aria-hidden="true" />'),this.detailsEl=this.querySelector("details"),this.bodyEl=this.querySelector(".accordion-body"),window.addEventListener("resize",this.debounce(()=>this.setHeight()).bind(this))}setHeight(){requestAnimationFrame(()=>{this.closedHeightInt=parseInt(this.summaryEl.scrollHeight+2,10),this.closedHeight=`${this.closedHeightInt}px`,this.detailsEl.hasAttribute("open")?this.detailsEl.style.height=`${parseInt(this.bodyEl.scrollHeight+this.closedHeightInt,10)}px`:this.detailsEl.style.height=this.closedHeight})}listen(){this.detailsEl.hasAttribute("open")?this.detailsEl.style.height=this.closedHeight:requestAnimationFrame(()=>{this.detailsEl.style.height=`${parseInt(this.bodyEl.scrollHeight+this.closedHeightInt,10)}px`})}debounce(a,i=300){let e;return(...t)=>{clearTimeout(e),e=setTimeout(()=>{a.apply(this,t)},i)}}};window.customElements.define("cagov-accordion",b);var V=`/* Back to top button */
cagov-back-to-top .back-to-top {
  position: fixed;
  z-index: 99999;
  right: -100px;
  font-size: var(--font-size-2, 1.125rem);
  padding: 10px 10px 10px 10px;
  bottom: 50px;
  opacity: 0;
  visibility: hidden;
  color: var(--primary-700, #004abc);
  border: 1px solid var(--primary-700, #004abc);
  border-radius: 5px 0px 0px 5px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s ease;
  background-color: #fff;
}
@media (max-width: 767px) {
  cagov-back-to-top .back-to-top {
    font-size: var(--font-size-1, 1rem);
    padding: 8px 8px 8px 8px;
  }
}
cagov-back-to-top .back-to-top:hover {
  color: var(--primary-900, #003484);
  border: 1px solid var(--primary-900, #003484);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}
cagov-back-to-top .back-to-top:hover svg path {
  fill: var(--primary-900, #003484);
}
cagov-back-to-top .back-to-top:focus {
  outline: 2px solid var(--accent2-500, #ac8227);
}
cagov-back-to-top .back-to-top svg {
  width: 16px;
  position: relative;
  top: 3px;
}
cagov-back-to-top .back-to-top svg path {
  fill: var(--primary-700, #004abc);
}
cagov-back-to-top .back-to-top.is-visible {
  opacity: 1;
  visibility: visible;
  display: inline;
  right: 0;
}

/*# sourceMappingURL=index.css.map */
`,u=class extends window.HTMLElement{static get observedAttributes(){return["data-hide-after","data-label"]}constructor(){super();let a={parentSelector:"cagov-back-to-top",onLoadSelector:"body",scrollBottomThreshold:10,scrollAfterHeight:400};if(this.options={...a,label:this.dataset.label||"Back to top",hideAfter:Number(this.dataset.hideAfter)||7e3},this.state={lastScrollTop:0,timer:null},!document.querySelector("#cagov-back-to-top-styles")){let i=document.createElement("style");i.id="cagov-back-to-top-styles",i.textContent=V,document.querySelector("head").appendChild(i)}}connectedCallback(){document.querySelector(this.options.onLoadSelector).onload=this.addGoToTopButton(),window.addEventListener("scroll",u.debounce(()=>{this.scrollToTopHandler()},200),!1),window.onscroll=u.debounce(()=>{this.checkScrolledToBottom()},200)}checkScrolledToBottom(){let{timer:a}=this.state,i=document.querySelector(".back-to-top");window.innerHeight+window.scrollY>=document.body.offsetHeight&&(i.classList.add("is-visible"),i.removeAttribute("aria-hidden"),i.removeAttribute("tabindex"),clearTimeout(a))}static debounce(a,i,e){let t;return(...n)=>{let o=this,s=()=>{t=null,e||a.apply(o,...n)},l=e&&!t;clearTimeout(t),t=setTimeout(s,i),l&&a.apply(o,...n)}}attributeChangedCallback(a,i,e){a==="data-hide-after"&&(this.options.hideAfter=Number(e)),a==="data-label"&&(this.options.label=e,document.querySelector(".back-to-top")!==null&&(document.querySelector(".back-to-top").innerHTML=this.options.label))}scrollToTopHandler(){let a=document.querySelector(this.options.parentSelector),{lastScrollTop:i}=this.state,{timer:e}=this.state,t=document.querySelector(".back-to-top"),n=window.pageYOffset||document.documentElement.scrollTop;n>i?(t.classList.remove("is-visible"),t.setAttribute("aria-hidden","true"),t.setAttribute("tabindex","-1")):a.scrollTop>=this.options.scrollAfterHeight||document.documentElement.scrollTop>=this.options.scrollAfterHeight?(e!==null&&clearTimeout(e),t.classList.add("is-visible"),t.removeAttribute("aria-hidden"),t.removeAttribute("tabindex"),e=setTimeout(()=>{t.classList.remove("is-visible"),t.setAttribute("aria-hidden","true"),t.setAttribute("tabindex","-1")},this.options.hideAfter)):(t.classList.remove("is-visible"),t.setAttribute("aria-hidden","true"),t.setAttribute("tabindex","-1")),this.state.lastScrollTop=n<=0?0:n}static addStyle(a){let i=document.createElement("span");i.setAttribute("aria-hidden","true"),i.innerHTML=`
      <svg version="1.1" x="0px" y="0px" width="21px" height="16px" viewBox="0 0 21 16" style="enable-background:new 0 0 21 16;" xml:space="preserve"><path d="M5.2,10.8l5.3-5.3l5.3,5.3c0.4,0.4,0.9,0.4,1.3,0c0.4-0.4,0.4-0.9,0-1.3l-5.9-5.9c-0.2-0.2-0.4-0.3-0.6-0.3S10,3.5,9.8,3.6 L3.9,9.5c-0.4,0.4-0.4,0.9,0,1.3C4.3,11.2,4.8,11.2,5.2,10.8z"/></svg> 
      `,a.insertBefore(i,a.firstChild)}addGoToTopButton(){let a=document.querySelector(this.options.parentSelector),i=document.createElement("button");i.classList.add("back-to-top"),i.setAttribute("aria-hidden","true"),i.setAttribute("tabindex","-1");let e=document.createTextNode(this.options.label);i.appendChild(e),u.addStyle(i),a.append(i),i.addEventListener("click",()=>this.goToTopFunction())}goToTopFunction(){document.querySelector(this.options.onLoadSelector).scrollTop=0,window.scroll({top:0,behavior:"smooth"})}};window.customElements.define("cagov-back-to-top",u);var R=`/* Page alert */
.icon-select {
  height: 48px;
  padding: 0 0px 0 16px;
}

.editor-styles-wrapper .message-body {
  padding: 0 32px;
}

.editor-styles-wrapper .cagov-page-alert {
  min-height: 64px;
  height: auto;
}

.cagov-page-alert {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  min-height: 46px;
  height: auto;
  background: rgba(254, 192, 47, 0.2);
  border: 1px solid var(--cagov-highlight, #fec02f);
  box-sizing: border-box;
  border-radius: 5px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 32px 0px;
}
.cagov-page-alert .icon {
  line-height: 1.5rem;
  background: none;
}
.cagov-page-alert .close-button {
  background: none;
  margin-left: auto;
  border: none;
  cursor: pointer !important;
}
.cagov-page-alert .body {
  line-height: 1.5rem;
  padding: 0 16px;
  background: none;
}
@media only screen and (max-width: 600px) {
  .cagov-page-alert {
    min-height: 46px;
    height: auto;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/*# sourceMappingURL=index.css.map */
`,y=class extends window.HTMLElement{constructor(){if(super(),!document.querySelector("#cagov-page-alert-styles")){let a=document.createElement("style");a.id="cagov-page-alert-styles",a.textContent=R,document.querySelector("head").appendChild(a)}}connectedCallback(){this.message=this.dataset.message||"",this.icon=this.dataset.icon||"",this.template({message:this.message,icon:this.icon}),document.querySelector("cagov-page-alert .close-button").addEventListener("click",()=>{document.querySelector(".cagov-page-alert").setAttribute("aria-hidden","true"),document.querySelector("cagov-page-alert .close-button").setAttribute("tabindex","-1"),document.querySelector("cagov-page-alert").style.display="none"})}template(a){return a!=null&&a.content!==null&&(this.innerHTML=`<div class="cagov-page-alert cagov-stack">
      <div class="icon" aria-hidden="true"><span class="${this.icon}"></span></div>
        <div class="body">${this.message}</div>
        <button class="close-button">
          <span class="ca-gov-icon-close-line" aria-hidden="true"></span>
          <span class="sr-only">Dismiss page alert</span>
        </button>
      </div>`),null}};window.customElements.define("cagov-page-alert",y);var Y=`/* PDF Icon */
.pdf-link-icon {
  display: inline-block;
  outline: 1px solid;
  outline-offset: -2px;
  padding: 0;
  position: relative;
  left: 1px;
  top: -3px;
  line-height: 0.9rem;
  text-decoration: none;
}
.pdf-link-icon svg path {
  fill: var(--primary-700, #004abc);
}

/* External link icon */
.external-link-icon {
  display: inline-block;
  padding: 0;
  position: relative;
  left: 3px;
  margin-right: 2px;
  top: 1px;
  text-decoration: none;
  width: 0.8em;
}
.external-link-icon svg path {
  fill: var(--primary-700, #004abc);
}

main a:hover .external-link-icon svg path,
.site-footer a:hover .external-link-icon svg path,
.agency-footer a:hover .external-link-icon svg path {
  fill: var(--primary-900, #003484);
}

footer a .external-link-icon svg path {
  fill: var(--black, #000);
}

/* External link icon exceptions */
.cagov-card .external-link-icon,
.wp-block-button__link .external-link-icon,
.footer-social-links a .external-link-icon,
img ~ .external-link-icon,
svg ~ .external-link-icon,
.pdf-link-icon ~ .external-link-icon {
  display: none;
}

.sr-only {
  height: unset !important;
  text-indent: -10000px;
  width: unset !important;
  clip: rect(0, 0, 0, 0) !important;
  border: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  white-space: nowrap !important;
}

/*# sourceMappingURL=index.css.map */
`;if(!document.querySelector("#cagov-link-icon-styles")){let r=document.createElement("style");r.id="cagov-link-icon-styles",r.textContent=Y,document.querySelector("head").appendChild(r)}function X(){let r='<span class="pdf-link-icon" aria-hidden="true"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="25.1px" height="13.6px" viewBox="0 0 25.1 13.6" style="enable-background:new 0 0 25.1 13.6;" xml:space="preserve"><path d="M11.7,9.9h1.5c1.7,0,3.1-1.4,3.1-3.1s-1.4-3.1-3.1-3.1h-1.5c-0.3,0-0.6,0.3-0.6,0.6v4.9c0,0.2,0.1,0.3,0.2,0.4C11.4,9.9,11.6,9.9,11.7,9.9L11.7,9.9z M12.3,5h0.9c1,0,1.8,0.8,1.8,1.8s-0.8,1.8-1.8,1.8h-0.9V5z"/><path d="M17.8,9.9c0.2,0,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.3,0.2-0.4V7.5h1.2c0.3,0,0.6-0.3,0.6-0.6c0-0.3-0.3-0.6-0.6-0.6h-1.2V5h2.1c0.3,0,0.6-0.3,0.6-0.6c0-0.3-0.3-0.6-0.6-0.6h-2.8c-0.3,0-0.6,0.3-0.6,0.6v4.9c0,0.2,0.1,0.3,0.2,0.4C17.5,9.9,17.7,9.9,17.8,9.9L17.8,9.9z"/><path d="M6.2,9.9c0.2,0,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.3,0.2-0.4V8.1H8c1.2,0,2.1-1,2.1-2.1c0-1.2-1-2.1-2.1-2.1H6.2c-0.3,0-0.6,0.3-0.6,0.6v4.9c0,0.2,0.1,0.3,0.2,0.4C5.9,9.9,6,9.9,6.2,9.9L6.2,9.9z M9,6c0,0.3-0.1,0.5-0.2,0.7C8.5,6.8,8.3,6.9,8,6.9H6.8V5H8c0.2,0,0.5,0.1,0.7,0.2C8.9,5.5,9,5.7,9,6L9,6z"/></svg></span><span class="sr-only"> (this is a pdf file)</span>',a=document.querySelectorAll("a[href*='.pdf']");for(let i=0;i<a.length;i+=1)a[i].innerHTML+=r,a[i].innerHTML.indexOf("*PDF (this is a pdf file)*")!==-1&&(a[i].innerHTML+=r.replace(/PDF (this is a pdf file)]/g,""))}X();function J(){let r='<span class="external-link-icon" aria-hidden="true"><svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path d="M1.4,13.3c0-1.9,0-3.8,0-5.7c0-2.3,1.3-3.6,3.7-3.7c2,0,3.9,0,5.9,0c0.9,0,1.4,0.4,1.4,1.1c0,0.7-0.5,1.1-1.5,1.1 c-2,0-3.9,0-5.9,0c-1.1,0-1.4,0.3-1.4,1.5c0,3.8,0,7.6,0,11.3c0,1.1,0.4,1.5,1.5,1.5c3.8,0,7.6,0,11.3,0c1.1,0,1.4-0.3,1.4-1.5 c0-1.9,0-3.9,0-5.8c0-1,0.4-1.5,1.1-1.5c0.7,0,1.1,0.5,1.1,1.5c0,2,0,4,0,6.1c0,2-1.4,3.4-3.4,3.4c-4,0-7.9,0-11.9,0 c-2.1,0-3.4-1.4-3.4-3.4C1.4,17.2,1.4,15.2,1.4,13.3L1.4,13.3z"/><path d="M19.6,2.8c-1.3,0-2.5,0-3.6,0c-0.9,0-1.4-0.4-1.4-1.1c0.1-0.8,0.6-1.1,1.3-1.1c2.1,0,4.2,0,6.2,0c0.8,0,1.2,0.5,1.2,1.3 c0,2,0,4.1,0,6.2c0,0.9-0.4,1.4-1.1,1.4c-0.7,0-1.1-0.5-1.1-1.4c0-1.1,0-2.3,0-3.6c-0.3,0.3-0.6,0.5-0.8,0.7c-3,3-6,6-8.9,8.9 c-0.2,0.2-0.3,0.3-0.5,0.5c-0.5,0.5-1.1,0.5-1.6,0c-0.5-0.5-0.4-1,0-1.5c0.1-0.2,0.3-0.3,0.5-0.5c3-3,6-6,8.9-8.9 C19,3.4,19.2,3.2,19.6,2.8L19.6,2.8z"/></svg></span>';function a(e){return window.location.host.indexOf(e.host)>-1}document.querySelectorAll("main a, .agency-footer a, .site-footer a, footer a").forEach(e=>{let t=e.href.indexOf("#")===0,n=e.href.indexOf("localhost")>-1,o=e.href.indexOf("@")>-1,s=e;a(s)===!1&&!t&&!o&&!n&&(s.innerHTML+=r)})}J();var Z=`/* PAGE NAVIGATION */
sidebar cagov-page-navigation .label {
  font-weight: 700;
  font-size: 24px;
  line-height: 28.2px;
  padding: 0;
  margin: 0;
  padding-bottom: 16px;
}

sidebar cagov-page-navigation ul,
sidebar cagov-page-navigation ol:not([class*=menu]):not([class*=nav]):not([class*=footer-links]),
sidebar cagov-page-navigation ul:not([class*=menu]):not([class*=nav]):not([class*=footer-links]) {
  margin: 0;
  text-indent: 0;
  padding: 0;
}

sidebar cagov-page-navigation ul li {
  padding-top: 14px;
  padding-bottom: 18px;
  margin-left: 0;
  margin-top: 0px;
  margin-bottom: 0px;
  border-bottom: 1px solid var(--gray-300, #e1e0e3);
  line-height: 28.2px;
  list-style: none;
}
sidebar cagov-page-navigation ul li:first-child {
  border-top: 1px solid var(--gray-300, #e1e0e3);
}
sidebar cagov-page-navigation ul li a {
  text-decoration: none;
}
sidebar cagov-page-navigation ul li a:hover {
  text-decoration: underline;
}

@media only screen and (max-width: 992px) {
  cagov-page-navigation .label {
    display: none;
  }
  .sidebar-container {
    display: block;
    width: 100%;
    max-width: 100%;
  }
  cagov-page-navigation ul li a {
    font-size: 16px;
    line-height: 24px;
  }
}

/*# sourceMappingURL=index.css.map */
`,h=class extends window.HTMLElement{constructor(){if(super(),!document.querySelector("#cagov-page-navigation-styles")){let a=document.createElement("style");a.id="cagov-page-navigation-styles",a.textContent=Z,document.querySelector("head").appendChild(a)}}connectedCallback(){this.type="wordpress",this.type==="wordpress"&&document.addEventListener("DOMContentLoaded",()=>this.buildContentNavigation()),(document.readyState==="complete"||document.readyState==="loaded")&&this.buildContentNavigation()}buildContentNavigation(){let a=this.getHeaderTags(),i=null;a!==null&&(i=this.dataset.label||"On this page");let e=null;a!==null&&(e=`<nav aria-labelledby="page-navigation-label"> <div id="page-navigation-label" class="label">${i}</div> ${a}</nav>`),this.template({content:e},"wordpress")}template(a,i){return a!=null&&a.content!==null&&i==="wordpress"&&(this.innerHTML=`${a.content}`),null}renderNoContent(){this.innerHTML=""}getHeaderTags(){let{selector:a}=this.dataset,i=["h2"];for(let e=0;e<i.length;e+=1)if(a!=null){let t=document.querySelector(a);if(t!==null)return h.outliner(t)}return null}static outliner(a){let i=a.querySelectorAll("h2"),e="";return i!=null&&i.length>0?(i.forEach(t=>{let n=t.getAttribute("id"),o=t.getAttribute("name"),s=t.getAttribute("tabindex")||"-1",l=t.innerHTML,c=null;n?c=n:o?c=o:c=t.innerHTML;let d=c.toLowerCase().trim().replace(/ /g,"-").replace(/\(|\)|!|"|#|\$|%|&|'|\*|\+|,|\.|\/|:|;|<|=|>|\?|@|\[|\]|\\|\^|`|\{|\||\|\}|~/g,"").replace(/a-zA-ZÃ€-Ã–Ã™-Ã¶Ã¹-Ã¿Ä€-Å¾á¸€-á»¿0-9\u00A0-\u017F/g,"");e+=`<li><a data-page-navigation href="#${encodeURI(d)}">${l}</a></li>`,t.setAttribute("id",d),t.setAttribute("name",d),t.setAttribute("tabindex",s)}),`<ul>${e}</ul>`):null}};window.customElements.define("cagov-page-navigation",h);function g(r,a){return`<li class="cagov-pagination__item">
    <a
      href="javascript:void(0);"
      class="cagov-pagination__button"
      aria-label="${r} ${a}"
      data-page-num="${a}"
    >
      ${a}
    </a>
  </li>`}function _(){return`<li
    class="cagov-pagination__item cagov-pagination__overflow"
    role="presentation"
  >
    <span> \u2026 </span>
  </li>`}function G(r,a,i,e,t){return`<nav aria-label="Pagination" class="cagov-pagination">
    <ul class="cagov-pagination__list">
      <li class="cagov-pagination__item">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__link cagov-pagination__previous-page"
          aria-label="${a} ${i}"
        >
          <span class="cagov-pagination__link-text ${e>2?"":"cagov-pagination__link-inactive"}"> ${a} </span>
        </a>
      </li>
      ${e>2?g(i,1):""}

      ${e>3?_():""}

      ${e>1?g(i,e-1):""}

      <li class="cagov-pagination__item cagov-pagination-current">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__button"
          aria-label="Page ${e}"
          aria-current="page"
          data-page-num="${e}"
        >
          ${e}
        </a>
      </li>

      ${e<t?g(i,e+1):""}

      ${e<t-3?_():""}

      ${e<t-1?g(i,t):""}

      <li class="cagov-pagination__item">
        <a
          href="javascript:void(0);"
          class="cagov-pagination__link cagov-pagination__next-page"
          aria-label="${r} ${i}"
        >
          <span class="cagov-pagination__link-text ${e>t-1?"cagov-pagination__link-inactive":""}"> ${r} </span>
        </a>
      </li>
    </ul>
  </nav>`}var K=`cagov-pagination .cagov-pagination__list {
  list-style: none;
  margin: 0;
  padding: 0 !important;
  display: flex;
}
cagov-pagination .cagov-pagination__item {
  border: var(--border-1, 1px) solid var(--gray-100, #ededef);
  border-radius: var(--radius-2, 4px);
  margin: var(--s-sm, 0.25rem);
}
cagov-pagination .cagov-pagination__item a {
  padding: 0.75rem 0.875rem;
  display: inline-block;
  color: var(--primary-700, #165ac2);
  text-decoration: none;
}
cagov-pagination .cagov-pagination__item a:hover {
  color: var(--primary-900, #003588);
  background: var(--gray-50, #fafafa);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}
cagov-pagination .cagov-pagination__item a:focus {
  color: var(--primary-900, #003588);
  background: var(--gray-50, #fafafa);
  outline: var(--border-2) solid var(--accent2-500);
  outline-offset: 2px;
  text-decoration: none;
}
cagov-pagination .cagov-pagination__item.cagov-pagination-current {
  background-color: #165ac2;
  background-color: var(--primary-700, #165ac2);
}
cagov-pagination .cagov-pagination__item.cagov-pagination-current a {
  color: var(--white, #ffffff);
}
cagov-pagination .cagov-pagination__item.cagov-pagination-current a:hover {
  background-color: var(--primary-900, 3588);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  text-decoration: none;
  color: var(--white, #ffffff);
}
cagov-pagination .cagov-pagination__item.cagov-pagination-current a:focus {
  background-color: var(--primary-900, 3588);
  border-color: var(--primary-900, 3588);
  outline: var(--border-2) solid var(--accent2-500);
  outline-offset: 2px;
}
cagov-pagination .cagov-pagination__item.cagov-pagination__overflow {
  border: none;
  padding: 0.875rem 0;
}
cagov-pagination .cagov-pagination__item.cagov-pagination__overflow:hover {
  background: inherit;
}
cagov-pagination .cagov-pagination__link-inactive {
  color: grey;
  border-color: grey;
  cursor: not-allowed;
  opacity: 0.5;
}

/*# sourceMappingURL=index.css.map */
`,x=class extends window.HTMLElement{constructor(){if(super(),!document.querySelector("#cagov-pagination-styles")){let a=document.createElement("style");a.id="cagov-pagination-styles",a.textContent=K,document.querySelector("head").appendChild(a)}}connectedCallback(){this.currentPage=parseInt(this.dataset.currentPage?this.dataset.currentPage:"1",10),this.render()}render(){let a=this.dataset.previous?this.dataset.previous:"&#60;",i=this.dataset.next?this.dataset.next:"&#62;",e=this.dataset.page?this.dataset.page:"Page";this.totalPages=this.dataset.totalPages?this.dataset.totalPages:"1";let t=G(i,a,e,this.currentPage,this.totalPages);this.innerHTML=t,this.applyListeners()}static get observedAttributes(){return["data-current-page","data-total-pages"]}attributeChangedCallback(a,i,e){a==="data-current-page"&&(this.currentPage=parseInt(e,10),this.render())}applyListeners(){this.querySelectorAll(".cagov-pagination__button").forEach(i=>{i.addEventListener("click",e=>{this.currentPage=parseInt(e.target.dataset.pageNum,10),this.dispatchEvent(new CustomEvent("paginationClick",{detail:this.currentPage})),this.dataset.currentPage=this.currentPage})}),this.querySelector(".cagov-pagination__previous-page").addEventListener("click",i=>{i.target.classList.contains("cagov-pagination__link-inactive")||(this.currentPage-=1,this.currentPage<1&&(this.currentPage=1),this.dispatchEvent(new CustomEvent("paginationClick",{detail:this.currentPage})),this.dataset.currentPage=this.currentPage)}),this.querySelector(".cagov-pagination__next-page").addEventListener("click",i=>{i.target.classList.contains("cagov-pagination__link-inactive")||(this.currentPage+=1,this.currentPage>this.totalPages&&(this.currentPage=this.totalPages),this.dispatchEvent(new CustomEvent("paginationClick",{detail:this.currentPage})),this.dataset.currentPage=this.currentPage)})}};window.customElements.define("cagov-pagination",x);function Q(){let r=document.querySelector(".site-header .grid-mobile-icons");return r?getComputedStyle(r).display!=="none":!1}var k=class extends window.HTMLElement{connectedCallback(){document.querySelector(".cagov-nav.open-menu").addEventListener("click",this.toggleMainMenu.bind(this));let a=document.querySelector(".cagov-nav.mobile-search .search-btn");a&&(a.setAttribute("aria-expanded","false"),document.querySelector(".search-container--small .site-search input").setAttribute("tabindex","-1"),document.querySelector(".search-container--small .site-search button.search-submit").setAttribute("tabindex","-1"),document.querySelector(".search-container--small").setAttribute("aria-hidden","true"),Q()&&a.addEventListener("click",()=>{document.querySelector(".search-container--small").classList.toggle("hidden-search"),document.querySelector(".search-container--small").classList.contains("hidden-search")?(a.setAttribute("aria-expanded","false"),document.querySelector(".search-container--small .site-search input").setAttribute("tabindex","-1"),document.querySelector(".search-container--small .site-search button.search-submit").setAttribute("tabindex","-1"),document.querySelector(".search-container--small").setAttribute("aria-hidden","true")):(a.setAttribute("aria-expanded","true"),document.querySelector(".search-container--small .site-search input").focus(),document.querySelector(".search-container--small .site-search input").removeAttribute("tabindex"),document.querySelector(".search-container--small .site-search button.search-submit").removeAttribute("tabindex"),document.querySelector(".search-container--small").setAttribute("aria-hidden","false"))})),window.addEventListener("resize",()=>{document.querySelector(".search-container--small").classList.add("hidden-search"),a&&document.querySelector(".cagov-nav.mobile-search .search-btn").setAttribute("aria-expanded","false"),document.querySelector(".search-container--small .site-search input").setAttribute("tabindex","-1"),document.querySelector(".search-container--small .site-search button.search-submit").setAttribute("tabindex","-1"),document.querySelector(".search-container--small").setAttribute("aria-hidden","true"),this.closeAllMenus(),this.closeMainMenu()}),this.expansionListeners(),document.addEventListener("keydown",this.escapeMainMenu.bind(this)),document.body.addEventListener("click",this.bodyClick.bind(this)),this.highlightCurrentPage()}toggleMainMenu(){document.querySelector(".cagov-nav.hamburger").classList.contains("is-active")?this.closeMainMenu():this.openMainMenu()}highlightCurrentPage(){this.querySelectorAll("a.expanded-menu-dropdown-link").forEach(a=>{a.href===window.location.href&&a.classList.add("current-page-highlight")})}openMainMenu(){document.querySelector(".mobile-icons").classList.add("display-menu"),this.classList.add("display-menu"),document.querySelector(".cagov-nav.hamburger").classList.add("is-active"),document.querySelector(".cagov-nav.menu-trigger").classList.add("is-fixed"),document.querySelector(".cagov-nav.menu-trigger").setAttribute("aria-expanded","true");let a=document.querySelector(".cagov-nav.menu-trigger-label");a.innerHTML=a.getAttribute("data-closelabel")}closeMainMenu(){document.querySelector(".mobile-icons").classList.remove("display-menu"),this.classList.remove("display-menu"),document.querySelector(".cagov-nav.hamburger").classList.remove("is-active"),document.querySelector(".cagov-nav.menu-trigger").classList.remove("is-fixed"),document.querySelector(".cagov-nav.menu-trigger").setAttribute("aria-expanded","false");let a=document.querySelector(".cagov-nav.menu-trigger-label");a.innerHTML=a.getAttribute("data-openlabel")}escapeMainMenu(a){a.keyCode===27&&this.closeAllMenus()}bodyClick(a){a.target.closest("cagov-site-navigation")||this.closeAllMenus()}closeAllMenus(){this.querySelectorAll(".js-cagov-navoverlay-expandable").forEach(i=>{i.querySelector(".expanded-menu-section").classList.remove("expanded");let t=i.querySelector(".expanded-menu-dropdown");t&&t.id&&i.querySelector(`button[aria-controls=${t.id}]`)&&i.querySelector(`button[aria-controls=${t.id}]`).setAttribute("aria-expanded","false"),t&&(t.setAttribute("aria-hidden","true"),t.querySelectorAll("a").forEach(o=>{o.setAttribute("tabindex","-1")}))})}expansionListeners(){this.querySelectorAll(".js-cagov-navoverlay-expandable").forEach(i=>{let e=i.querySelector(".expanded-menu-section");if(e){let n=e.querySelector(".expanded-menu-dropdown");n&&(n.setAttribute("aria-hidden","true"),n&&n.id&&i.querySelector(`button[aria-controls=${n.id}]`)&&i.querySelector(`button[aria-controls=${n.id}]`).setAttribute("aria-expanded","false"))}let t=this;i.addEventListener("click",function(o){o.target.nodeName!=="A"&&o.preventDefault();let s=this.querySelector(".expanded-menu-section");if(s)if(s.classList.contains("expanded"))t.closeAllMenus();else{t.closeAllMenus(),s.classList.add("expanded");let l=this.querySelector(".expanded-menu-dropdown");l&&l.id&&i.querySelector(`button[aria-controls=${l.id}]`)&&i.querySelector(`button[aria-controls=${l.id}]`).setAttribute("aria-expanded","true"),l&&(l.setAttribute("aria-hidden","false"),l.querySelectorAll("a").forEach(d=>{d.removeAttribute("tabindex")}))}})})}};window.customElements.define("cagov-site-navigation",k);function ee(r,a,i,e,t,n,o){return`
  <section aria-label="feedback">
  <div class="feedback-form cagov-stack">
    <div class="js-feedback-form feedback-form-question">
      <h2 class="feedback-form-label" id="feedback-rating">${r}</h2>
      <button class="btn-light m-r-2 js-feedback-yes feedback-yes" id="feedback-yes">${a}</button>
      <button class="btn-light js-feedback-no" id="feedback-no">${i}</button>
    </div>
          
    <div class="feedback-form-thanks js-feedback-thanks" role="alert">${t}</div>
          
    <div class="feedback-form-add">
      <label class="feedback-form-label js-feedback-field-label" for="add-feedback">${e}</label>
      <div class="feedback-form-add-grid">
        <textarea name="add-feedback" class="js-add-feedback feedback-form-textarea" id="add-feedback" rows="1"></textarea>
        <button class="btn-light js-feedback-submit" type="submit" id="feedback-submit">${o}</button>
      </div>
    </div>

    <div class="feedback-form-thanks feedback-thanks-add" role="alert">${n}</div>
  </div>
  </section>`}var A=ee;var M={};var w=class extends window.HTMLElement{constructor(){if(super(),!document.querySelector("#cagov-page-feedback-styles")){let a=document.createElement("style");a.id="cagov-page-feedback-styles",a.textContent=M,document.querySelector("head").appendChild(a)}}connectedCallback(){let a=this.dataset.question?this.dataset.question:"Did you find what you were looking for?",i=this.dataset.yes?this.dataset.yes:"Yes",e=this.dataset.no?this.dataset.no:"No",t=this.dataset.commentPrompt?this.dataset.commentPrompt:"What was the problem?";this.positiveCommentPrompt=this.dataset.positiveCommentPrompt?this.dataset.positiveCommentPrompt:"Great! What were you looking for today?";let n=this.dataset.thanksFeedback?this.dataset.thanksFeedback:"Thank you for your feedback!",o=this.dataset.thanksComments?this.dataset.thanksComments:"Thank you for your comments!",s=this.dataset.submit?this.dataset.submit:"Submit",l=this.dataset.characterLimit?this.dataset.characterLimit:"You have reached your character limit.",c=this.dataset.anythingToAdd?this.dataset.anythingToAdd:"If you have anything to add,",d=this.dataset.anyOtherFeedback?this.dataset.anyOtherFeedback:"If you have any other feedback about this website,";this.endpointUrl=this.dataset.endpointUrl;let p=A(a,i,e,t,n,o,s,l,c,d);this.innerHTML=p,this.applyListeners()}applyListeners(){this.wasHelpful="",this.querySelector(".js-add-feedback").addEventListener("focus",()=>{this.querySelector(".js-feedback-submit").style.display="block"});let a=this.querySelector(".js-add-feedback");a.addEventListener("keyup",()=>{a.value.length>15?a.setAttribute("rows","3"):a.setAttribute("rows","1")}),a.addEventListener("blur",()=>{a.value.length!==0&&(this.querySelector(".js-feedback-submit").style.display="block")}),this.querySelector(".js-feedback-yes").addEventListener("click",()=>{this.querySelector(".js-feedback-field-label").innerHTML=this.positiveCommentPrompt,this.querySelector(".js-feedback-form").style.display="none",this.querySelector(".feedback-form-add").style.display="block",this.wasHelpful="yes",this.dispatchEvent(new CustomEvent("ratedPage",{detail:this.wasHelpful}))}),this.querySelector(".js-feedback-no").addEventListener("click",()=>{this.querySelector(".js-feedback-form").style.display="none",this.querySelector(".feedback-form-add").style.display="block",this.wasHelpful="no",this.dispatchEvent(new CustomEvent("ratedPage",{detail:this.wasHelpful}))}),this.querySelector(".js-feedback-submit").addEventListener("click",()=>{this.querySelector(".feedback-form-add").style.display="none",this.querySelector(".feedback-thanks-add").style.display="block";let i={};i.url=window.location.href,i.helpful=this.wasHelpful,i.comments=a.value,i.userAgent=navigator.userAgent,fetch(this.endpointUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(e=>e.json()).then(e=>console.log(e))})}};customElements.get("cagov-page-feedback")||window.customElements.define("cagov-page-feedback",w);var ge=F(H());(function(){window.addEventListener("load",function(){window.addEventListener("resize",()=>{console.log("resized"),r()});var r=()=>{let a=2;if(window.innerWidth<=770&&(a=1),document.querySelector(".glider")!==null){let i=document.querySelectorAll(".glider");i.length>0&&Object.keys(i).map(e=>{var t=i[e],n=t.children.length;n!==void 0&&n>a&&new Glider(t,{slidesToShow:"auto",slidesToScroll:"auto",itemWidth:376,dots:t.parentNode.querySelector(".dots"),draggable:!1,responsive:[{breakpoint:775,settings:{slidesToShow:"auto",slidesToScroll:"auto",itemWidth:376,duration:.25}},{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1,itemWidth:376,duration:.25}}]})})}};r()})})();var $=function(a){fetch(`/about-us/announcements/${a-1}`).then(i=>i.text()).then(i=>{document.querySelector(".post-list-results").innerHTML=i})},P=function(){if(document.querySelector("cagov-pagination")){document.querySelector("cagov-pagination").addEventListener("paginationClick",i=>{$(i.detail),window.history.replaceState({page:3},`${document.title} page ${i.detail}`,`?page=${i.detail}`)},!1);let a=new URLSearchParams(window.location.search);parseInt(a.get("page"),10)>0&&$(a.get("page"))}};(function(){let r=document.createElement("script");r.async=!0,r.src="https://www.googletagmanager.com/gtag/js?id=UA-31125811-39";let a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a)})();window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date);gtag("config","UA-31125811-39");gtag("config","UA-3419582-2");function L(){function r(n,o,s="click"){typeof gtag<"u"?gtag("event",n,{event_category:s,event_label:o}):setTimeout(()=>{r(n,o,s)},500)}document.querySelectorAll("cagov-accordion").forEach(n=>{n.addEventListener("click",function(){this.querySelector(".accordion-title")&&r("accordion",this.querySelector(".accordion-title").textContent.trim())})}),document.querySelectorAll("a").forEach(n=>{n.href.indexOf(window.location.hostname)>-1?(n.href.indexOf(".pdf")>-1&&n.addEventListener("click",function(){r("pdf",this.href.split(window.location.hostname)[1])}),n.href.indexOf("#")>-1&&n.addEventListener("click",function(){r("anchor",this.href.split(window.location.hostname)[1])})):n.addEventListener("click",function(){r("offsite",this.href)})}),document.querySelector("cagov-feedback")&&document.querySelector("cagov-feedback").addEventListener("ratedPage",n=>{gtag("event","rating",{event_category:"helpful",event_label:n.detail})});let a=(n,o)=>s=>{let l=!1;l||(n(s),l=!0,setTimeout(()=>{l=!1},o))},i=[25,50,75,90],e=[],t=n=>()=>{let o=document.documentElement.clientHeight,l=document.documentElement.scrollHeight-o,c=window.pageYOffset,d=Math.floor(c/l*100);i.forEach(p=>{if(e.indexOf(p)===-1&&d>=p){e.push(p);let m=`scroll-${p}`,f=`scroll-${p}-${n}`;r(m,f,"scroll")}})};window.addEventListener("scroll",a(t("homepage"),1e3))}window.onload=r=>{L()};P();})();
/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/
