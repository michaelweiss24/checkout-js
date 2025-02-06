"use strict";(self.webpackJsonpCheckout=self.webpackJsonpCheckout||[]).push([[134],{20903:(t,e,a)=>{a.r(e),a.d(e,{default:()=>E});var n=a(30455),r=a(41109),c=a(49655);const i=function(t){var e=t.children;return n.createElement("header",{className:"cart-header"},n.createElement("h3",{className:"cart-title optimizedCheckout-headingSecondary"},n.createElement(c.A,{id:"cart.cart_heading"})),e)};var s=a(1346),o=a(9188),l=a.n(o),m=a(75363),d=a(72769),u=a(39981),p=a(21277);const g=function(t){var e=t.amount,a=t.actionLabel,r=t.onActionTriggered,c=t.children,i=t.className,s=t.currencyCode,o=t.label,g=t.superscript,h=t.testId,f=t.zeroLabel,E=(0,n.useState)(!1),v=E[0],y=E[1],A=(0,n.useState)(e),I=A[0],_=A[1],C=(0,u.Q)().checkoutState.statuses.isSubmittingOrder,N=function(t,e){return null==t?"--":e&&0===t?e:t}(e,f),x=C();(0,n.useEffect)((function(){y(e!==I),_(e)}),[e]);var k=(0,n.useCallback)((function(t,e){t.addEventListener("animationend",(function(a){a.target===t&&(y(!1),e())}))}),[y]);return n.createElement("div",{"data-test":h},n.createElement(m.CSSTransition,{addEndListener:k,classNames:"changeHighlight",in:v,timeout:{}},n.createElement("div",{"aria-live":"polite",className:l()("cart-priceItem","optimizedCheckout-contentPrimary",i)},n.createElement("span",{className:"cart-priceItem-label"},n.createElement("span",{"data-test":"cart-price-label"},o,"  "),s&&n.createElement("span",{className:"cart-priceItem-currencyCode"},"(".concat(s,") ")),r&&a&&n.createElement("span",{className:"cart-priceItem-link"},n.createElement("a",{className:l()({"link--disabled":x}),"data-test":"cart-price-callback",href:"#",onClick:(0,d.A)((function(){!x&&r&&r()}))},a))),n.createElement("span",{className:"cart-priceItem-value"},n.createElement("span",{"data-test":"cart-price-value"},function(t){return"number"==typeof t}(N)?n.createElement(p.A,{amount:N}):N),g&&n.createElement("sup",{"data-test":"cart-price-value-superscript"},g)),c)))};var h=a(62755),f=a(9660);const E=function(t){var e=t.isTaxIncluded,a=t.taxes,o=t.headerLink,l=t.lineItems,m=(0,n.useMemo)((function(){return(0,f.A)(l)}),[l]),d=e&&a&&a.length>0;return n.createElement("article",{className:"cart optimizedCheckout-orderSummary","data-test":"cart"},n.createElement(i,null,o),n.createElement(h.A,null,n.createElement(s.A,{displayLineItemsCount:!0,items:m})),n.createElement(r.Y,{region:"summary.lastItem.after"}),d&&n.createElement(h.A,null,n.createElement("h5",{className:"cart-taxItem cart-taxItem--subtotal optimizedCheckout-contentPrimary","data-test":"tax-text"},n.createElement(c.A,{id:"tax.inclusive_label"})),(a||[]).map((function(t,e){return n.createElement(g,{amount:t.amount,key:e,label:t.name,testId:"cart-taxes"})}))))}},1346:(t,e,a)=>{a.d(e,{A:()=>v});var n=a(31635),r=a(30455),c=a(49655),i=a(83651),s=a(15735),o=a(59908),l=a(73545);const m=function(t){return{id:t.id,quantity:t.quantity,amount:t.extendedListPrice,name:t.name}};function d(t){if(t.imageUrl)return r.createElement("img",{alt:t.name,"data-test":"cart-item-image",src:t.imageUrl})}function u(t){return t.downloadPageUrl?{testId:"cart-item-digital-product-download",content:r.createElement("a",{href:t.downloadPageUrl,rel:"noopener noreferrer",target:"_blank"},r.createElement(c.A,{id:"cart.downloads_action"}))}:{testId:"cart-item-digital-product",content:r.createElement(c.A,{id:"cart.digital_item_text"})}}const p=function(t){return{id:t.id,quantity:t.quantity,amount:t.extendedComparisonPrice,amountAfterDiscount:t.extendedSalePrice,name:t.name,image:d(t),productOptions:(0,n.__spreadArray)((0,n.__spreadArray)([],(t.options||[]).map((function(t){return{testId:"cart-item-product-option",content:"".concat(t.name," ").concat(t.value)}})),!0),[u(t)],!1)}};var g=a(45050);const h=function(t){return{id:t.id,quantity:1,amount:t.amount,name:t.name,image:r.createElement("span",{className:"productImage-giftCertificate","data-test":"cart-item-gift-certificate"},r.createElement(g.A,null))}};const f=function(t){return{id:t.id,quantity:t.quantity,amount:t.extendedComparisonPrice,amountAfterDiscount:t.extendedSalePrice,name:t.name,image:d(t),description:t.giftWrapping?t.giftWrapping.name:void 0,productOptions:(t.options||[]).map((function(t){return{testId:"cart-item-product-option",content:"".concat(t.name," ").concat(t.value)}}))}};const E=(0,r.memo)((function(t){var e=t.image,a=t.name,n=t.productOptions,c=t.quantity,i=t.description;return r.createElement("div",{className:"product"},r.createElement("figure",{className:"product-column product-figure"},e),r.createElement("div",{className:"product-column product-body"},r.createElement("h4",{className:"product-title optimizedCheckout-contentPrimary","data-test":"cart-item-product-title"},a),n&&n.length>0&&r.createElement("ul",{className:"product-options optimizedCheckout-contentSecondary","data-test":"cart-item-product-options"},n.map((function(t,e){return r.createElement("li",{className:"product-option","data-test":t.testId,key:e},t.content)}))),i&&r.createElement("div",{className:"product-description optimizedCheckout-contentSecondary","data-test":"cart-item-product-description"},i)),r.createElement("div",{className:"product-column product-body quantity"},r.createElement("span",null,"".concat(c))))}));const v=function(t){function e(e){var a=t.call(this,e)||this;return a.handleToggle=function(){var t=a.state.isExpanded;a.setState({isExpanded:!t})},a.state={isExpanded:!1,collapsedLimit:a.getCollapsedLimit()},a}return(0,n.__extends)(e,t),e.prototype.render=function(){var t=this.props,e=t.displayLineItemsCount,a=void 0===e||e,i=t.items,s=this.state,o=s.collapsedLimit,d=s.isExpanded;return r.createElement(r.Fragment,null,a&&r.createElement("h3",{className:"cart-section-heading optimizedCheckout-contentPrimary","data-test":"cart-count-total"},r.createElement(c.A,{data:{count:(0,l.A)(i)},id:"cart.item_count_text"})),r.createElement("div",{className:"cart-list-header"},r.createElement("div",{className:"cart-title product"},"Product"),r.createElement("div",{className:"quantity "},"Quantity")),r.createElement("ul",{"aria-live":"polite",className:"productList"},(0,n.__spreadArray)((0,n.__spreadArray)((0,n.__spreadArray)((0,n.__spreadArray)([],i.physicalItems.slice().sort((function(t){return t.variantId})).map(f),!0),i.giftCertificates.slice().map(h),!0),i.digitalItems.slice().sort((function(t){return t.variantId})).map(p),!0),(i.customItems||[]).map(m),!0).slice(0,d?void 0:o).map((function(t){return r.createElement("li",{className:"productList-item is-visible",key:t.id},r.createElement(E,(0,n.__assign)({},t)))}))),this.renderActions())},e.prototype.getCollapsedLimit=function(){return(0,o.A)()?3:4},e.prototype.renderActions=function(){var t=this.state.isExpanded;if(!(this.getLineItemCount()<=this.getCollapsedLimit()))return r.createElement("div",{className:"cart-actions"},r.createElement("button",{className:"button button--tertiary button--tiny optimizedCheckout-buttonSecondary",onClick:this.handleToggle,type:"button"},t?r.createElement(r.Fragment,null,r.createElement(c.A,{id:"cart.see_less_action"}),r.createElement(i.A,null)):r.createElement(r.Fragment,null,r.createElement(c.A,{id:"cart.see_all_action"}),r.createElement(s.A,null))))},e.prototype.getLineItemCount=function(){var t=this.props.items;return(t.customItems||[]).length+t.physicalItems.length+t.digitalItems.length+t.giftCertificates.length},e}(r.Component)},62755:(t,e,a)=>{a.d(e,{A:()=>r});var n=a(30455);const r=function(t){var e=t.children;return n.createElement("section",{className:"cart-section optimizedCheckout-orderSummary-cartSection"},e)}},73545:(t,e,a)=>{a.d(e,{A:()=>r});var n=a(31635);function r(t){var e=t.physicalItems,a=t.digitalItems,r=t.giftCertificates,c=t.customItems;return(0,n.__spreadArray)((0,n.__spreadArray)((0,n.__spreadArray)([],e,!0),a,!0),c||[],!0).reduce((function(t,e){return t+e.quantity}),0)+r.length}},9660:(t,e,a)=>{a.d(e,{A:()=>r});var n=a(31635);function r(t){return(0,n.__assign)((0,n.__assign)({},t),{physicalItems:t.physicalItems.filter((function(t){return"string"!=typeof t.parentId})),digitalItems:t.digitalItems.filter((function(t){return"string"!=typeof t.parentId}))})}},83651:(t,e,a)=>{a.d(e,{A:()=>r});var n=a(30455);const r=(0,a(45080).A)((function(){return n.createElement("svg",{height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},n.createElement("path",{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}))}))},45050:(t,e,a)=>{a.d(e,{A:()=>r});var n=a(30455);const r=function(){return n.createElement("svg",{height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},n.createElement("path",{d:"M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"}))}},59908:(t,e,a)=>{a.d(e,{A:()=>r});var n=a(81655);function r(){return window.matchMedia("(max-width: ".concat(n.Z,"px)")).matches}}}]);
//# sourceMappingURL=order-summary-b3d50e33.js.map