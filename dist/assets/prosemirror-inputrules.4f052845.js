import{d as y}from"./prosemirror-state.34ed6358.js";import{b as Q}from"./prosemirror-transform.d8dd870a.js";var s={};function m(i,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function b(i,n,e){return n&&m(i.prototype,n),e&&m(i,e),Object.defineProperty(i,"prototype",{writable:!1}),i}function _(i,n){if(!(i instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(s,"__esModule",{value:!0});var T=y,h=Q,p=b(function i(n,e){_(this,i),this.match=n,this.match=n,this.handler=typeof e=="string"?k(e):e});function k(i){return function(n,e,r,a){var u=i;if(e[1]){var t=e[0].lastIndexOf(e[1]);u+=e[0].slice(t+e[1].length),r+=t;var l=r-a;l>0&&(u=e[0].slice(t-l,t)+u,r=a)}return n.tr.insertText(u,r,a)}}var D=500;function M(i){var n=i.rules,e=new T.Plugin({state:{init:function(){return null},apply:function(a,u){var t=a.getMeta(this);return t||(a.selectionSet||a.docChanged?null:u)}},props:{handleTextInput:function(a,u,t,l){return R(a,u,t,l,n,e)},handleDOMEvents:{compositionend:function(a){setTimeout(function(){var u=a.state.selection.$cursor;u&&R(a,u.pos,u.pos,"",n,e)})}}},isInputRules:!0});return e}function R(i,n,e,r,a,u){if(i.composing)return!1;var t=i.state,l=t.doc.resolve(n);if(l.parent.type.spec.code)return!1;for(var f=l.parent.textBetween(Math.max(0,l.parentOffset-D),l.parentOffset,null,"\uFFFC")+r,o=0;o<a.length;o++){var c=a[o].match.exec(f),v=c&&a[o].handler(t,c,n-(c[0].length-r.length),e);if(!!v)return i.dispatch(v.setMeta(u,{transform:v,from:n,to:e,text:r})),!0}return!1}var S=function(n,e){for(var r=n.plugins,a=0;a<r.length;a++){var u=r[a],t=void 0;if(u.spec.isInputRules&&(t=u.getState(n))){if(e){for(var l=n.tr,f=t.transform,o=f.steps.length-1;o>=0;o--)l.step(f.steps[o].invert(f.docs[o]));if(t.text){var c=l.doc.resolve(t.from).marks();l.replaceWith(t.from,t.to,n.schema.text(t.text,c))}else l.delete(t.from,t.to);e(l)}return!0}}return!1},C=new p(/--$/,"\u2014"),O=new p(/\.\.\.$/,"\u2026"),I=new p(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/,"\u201C"),w=new p(/"$/,"\u201D"),x=new p(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/,"\u2018"),$=new p(/'$/,"\u2019"),A=[I,w,x,$];function F(i,n){var e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,r=arguments.length>3?arguments[3]:void 0;return new p(i,function(a,u,t,l){var f=e instanceof Function?e(u):e,o=a.tr.delete(t,l),c=o.doc.resolve(t),v=c.blockRange(),d=v&&h.findWrapping(v,n,f);if(!d)return null;o.wrap(v,d);var g=o.doc.resolve(t-1).nodeBefore;return g&&g.type==n&&h.canJoin(o.doc,t-1)&&(!r||r(u,g))&&o.join(t-1),o})}function B(i,n){var e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null;return new p(i,function(r,a,u,t){var l=r.doc.resolve(u),f=e instanceof Function?e(a):e;return l.node(-1).canReplaceWith(l.index(-1),l.indexAfter(-1),n)?r.tr.delete(u,t).setBlockType(u,u,n,f):null})}var j=s.InputRule=p;s.closeDoubleQuote=w;s.closeSingleQuote=$;s.ellipsis=O;s.emDash=C;var E=s.inputRules=M;s.openDoubleQuote=I;s.openSingleQuote=x;s.smartQuotes=A;s.textblockTypeInputRule=B;var H=s.undoInputRule=S;s.wrappingInputRule=F;export{j as I,s as d,E as i,H as u};
