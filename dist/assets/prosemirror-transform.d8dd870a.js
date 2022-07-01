import{g as ee}from"./@toast-ui.b7c0c645.js";import{a as g,R as te,F as y,c as re}from"./prosemirror-model.fc7226ba.js";const q=65535,$=Math.pow(2,16);function ne(s,e){return s+e*$}function L(s){return s&q}function ie(s){return(s-(s&q))/$}const G=1,H=2,N=4,K=8;class F{constructor(e,t,r){this.pos=e,this.delInfo=t,this.recover=r}get deleted(){return(this.delInfo&K)>0}get deletedBefore(){return(this.delInfo&(G|N))>0}get deletedAfter(){return(this.delInfo&(H|N))>0}get deletedAcross(){return(this.delInfo&N)>0}}class x{constructor(e,t=!1){if(this.ranges=e,this.inverted=t,!e.length&&x.empty)return x.empty}recover(e){let t=0,r=L(e);if(!this.inverted)for(let n=0;n<r;n++)t+=this.ranges[n*3+2]-this.ranges[n*3+1];return this.ranges[r*3]+t+ie(e)}mapResult(e,t=1){return this._map(e,t,!1)}map(e,t=1){return this._map(e,t,!0)}_map(e,t,r){let n=0,i=this.inverted?2:1,l=this.inverted?1:2;for(let o=0;o<this.ranges.length;o+=3){let a=this.ranges[o]-(this.inverted?n:0);if(a>e)break;let h=this.ranges[o+i],p=this.ranges[o+l],d=a+h;if(e<=d){let f=h?e==a?-1:e==d?1:t:t,c=a+n+(f<0?0:p);if(r)return c;let u=e==(t<0?a:d)?null:ne(o/3,e-a),m=e==a?H:e==d?G:N;return(t<0?e!=a:e!=d)&&(m|=K),new F(c,m,u)}n+=p-h}return r?e+n:new F(e+n,0,null)}touches(e,t){let r=0,n=L(t),i=this.inverted?2:1,l=this.inverted?1:2;for(let o=0;o<this.ranges.length;o+=3){let a=this.ranges[o]-(this.inverted?r:0);if(a>e)break;let h=this.ranges[o+i],p=a+h;if(e<=p&&o==n*3)return!0;r+=this.ranges[o+l]-h}return!1}forEach(e){let t=this.inverted?2:1,r=this.inverted?1:2;for(let n=0,i=0;n<this.ranges.length;n+=3){let l=this.ranges[n],o=l-(this.inverted?i:0),a=l+(this.inverted?0:i),h=this.ranges[n+t],p=this.ranges[n+r];e(o,o+h,a,a+p),i+=p-h}}invert(){return new x(this.ranges,!this.inverted)}toString(){return(this.inverted?"-":"")+JSON.stringify(this.ranges)}static offset(e){return e==0?x.empty:new x(e<0?[0,-e,0]:[0,0,e])}}x.empty=new x([]);class T{constructor(e=[],t,r=0,n=e.length){this.maps=e,this.mirror=t,this.from=r,this.to=n}slice(e=0,t=this.maps.length){return new T(this.maps,this.mirror,e,t)}copy(){return new T(this.maps.slice(),this.mirror&&this.mirror.slice(),this.from,this.to)}appendMap(e,t){this.to=this.maps.push(e),t!=null&&this.setMirror(this.maps.length-1,t)}appendMapping(e){for(let t=0,r=this.maps.length;t<e.maps.length;t++){let n=e.getMirror(t);this.appendMap(e.maps[t],n!=null&&n<t?r+n:void 0)}}getMirror(e){if(this.mirror){for(let t=0;t<this.mirror.length;t++)if(this.mirror[t]==e)return this.mirror[t+(t%2?-1:1)]}}setMirror(e,t){this.mirror||(this.mirror=[]),this.mirror.push(e,t)}appendMappingInverted(e){for(let t=e.maps.length-1,r=this.maps.length+e.maps.length;t>=0;t--){let n=e.getMirror(t);this.appendMap(e.maps[t].invert(),n!=null&&n>t?r-n-1:void 0)}}invert(){let e=new T;return e.appendMappingInverted(this),e}map(e,t=1){if(this.mirror)return this._map(e,t,!0);for(let r=this.from;r<this.to;r++)e=this.maps[r].map(e,t);return e}mapResult(e,t=1){return this._map(e,t,!1)}_map(e,t,r){let n=0;for(let i=this.from;i<this.to;i++){let l=this.maps[i],o=l.mapResult(e,t);if(o.recover!=null){let a=this.getMirror(i);if(a!=null&&a>i&&a<this.to){i=a,e=this.maps[a].recover(o.recover);continue}}n|=o.delInfo,e=o.pos}return r?e:new F(e,n,null)}}const O=Object.create(null);class b{getMap(){return x.empty}merge(e){return null}static fromJSON(e,t){if(!t||!t.stepType)throw new RangeError("Invalid input for Step.fromJSON");let r=O[t.stepType];if(!r)throw new RangeError(`No step type ${t.stepType} defined`);return r.fromJSON(e,t)}static jsonID(e,t){if(e in O)throw new RangeError("Duplicate use of step JSON ID "+e);return O[e]=t,t.prototype.jsonID=e,t}}class v{constructor(e,t){this.doc=e,this.failed=t}static ok(e){return new v(e,null)}static fail(e){return new v(null,e)}static fromReplace(e,t,r,n){try{return v.ok(e.replace(t,r,n))}catch(i){if(i instanceof te)return v.fail(i.message);throw i}}}function W(s,e,t){let r=[];for(let n=0;n<s.childCount;n++){let i=s.child(n);i.content.size&&(i=i.copy(W(i.content,e,i))),i.isInline&&(i=e(i,t,n)),r.push(i)}return y.fromArray(r)}class M extends b{constructor(e,t,r){super(),this.from=e,this.to=t,this.mark=r}apply(e){let t=e.slice(this.from,this.to),r=e.resolve(this.from),n=r.node(r.sharedDepth(this.to)),i=new g(W(t.content,(l,o)=>!l.isAtom||!o.type.allowsMarkType(this.mark.type)?l:l.mark(this.mark.addToSet(l.marks)),n),t.openStart,t.openEnd);return v.fromReplace(e,this.from,this.to,i)}invert(){return new k(this.from,this.to,this.mark)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deleted&&r.deleted||t.pos>=r.pos?null:new M(t.pos,r.pos,this.mark)}merge(e){return e instanceof M&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from?new M(Math.min(this.from,e.from),Math.max(this.to,e.to),this.mark):null}toJSON(){return{stepType:"addMark",mark:this.mark.toJSON(),from:this.from,to:this.to}}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for AddMarkStep.fromJSON");return new M(t.from,t.to,e.markFromJSON(t.mark))}}b.jsonID("addMark",M);class k extends b{constructor(e,t,r){super(),this.from=e,this.to=t,this.mark=r}apply(e){let t=e.slice(this.from,this.to),r=new g(W(t.content,n=>n.mark(this.mark.removeFromSet(n.marks)),e),t.openStart,t.openEnd);return v.fromReplace(e,this.from,this.to,r)}invert(){return new M(this.from,this.to,this.mark)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deleted&&r.deleted||t.pos>=r.pos?null:new k(t.pos,r.pos,this.mark)}merge(e){return e instanceof k&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from?new k(Math.min(this.from,e.from),Math.max(this.to,e.to),this.mark):null}toJSON(){return{stepType:"removeMark",mark:this.mark.toJSON(),from:this.from,to:this.to}}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");return new k(t.from,t.to,e.markFromJSON(t.mark))}}b.jsonID("removeMark",k);class w extends b{constructor(e,t,r,n=!1){super(),this.from=e,this.to=t,this.slice=r,this.structure=n}apply(e){return this.structure&&B(e,this.from,this.to)?v.fail("Structure replace would overwrite content"):v.fromReplace(e,this.from,this.to,this.slice)}getMap(){return new x([this.from,this.to-this.from,this.slice.size])}invert(e){return new w(this.from,this.from+this.slice.size,e.slice(this.from,this.to))}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deletedAcross&&r.deletedAcross?null:new w(t.pos,Math.max(t.pos,r.pos),this.slice)}merge(e){if(!(e instanceof w)||e.structure||this.structure)return null;if(this.from+this.slice.size==e.from&&!this.slice.openEnd&&!e.slice.openStart){let t=this.slice.size+e.slice.size==0?g.empty:new g(this.slice.content.append(e.slice.content),this.slice.openStart,e.slice.openEnd);return new w(this.from,this.to+(e.to-e.from),t,this.structure)}else if(e.to==this.from&&!this.slice.openStart&&!e.slice.openEnd){let t=this.slice.size+e.slice.size==0?g.empty:new g(e.slice.content.append(this.slice.content),e.slice.openStart,this.slice.openEnd);return new w(e.from,this.to,t,this.structure)}else return null}toJSON(){let e={stepType:"replace",from:this.from,to:this.to};return this.slice.size&&(e.slice=this.slice.toJSON()),this.structure&&(e.structure=!0),e}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for ReplaceStep.fromJSON");return new w(t.from,t.to,g.fromJSON(e,t.slice),!!t.structure)}}b.jsonID("replace",w);class C extends b{constructor(e,t,r,n,i,l,o=!1){super(),this.from=e,this.to=t,this.gapFrom=r,this.gapTo=n,this.slice=i,this.insert=l,this.structure=o}apply(e){if(this.structure&&(B(e,this.from,this.gapFrom)||B(e,this.gapTo,this.to)))return v.fail("Structure gap-replace would overwrite content");let t=e.slice(this.gapFrom,this.gapTo);if(t.openStart||t.openEnd)return v.fail("Gap is not a flat range");let r=this.slice.insertAt(this.insert,t.content);return r?v.fromReplace(e,this.from,this.to,r):v.fail("Content does not fit in gap")}getMap(){return new x([this.from,this.gapFrom-this.from,this.insert,this.gapTo,this.to-this.gapTo,this.slice.size-this.insert])}invert(e){let t=this.gapTo-this.gapFrom;return new C(this.from,this.from+this.slice.size+t,this.from+this.insert,this.from+this.insert+t,e.slice(this.from,this.to).removeBetween(this.gapFrom-this.from,this.gapTo-this.from),this.gapFrom-this.from,this.structure)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1),n=e.map(this.gapFrom,-1),i=e.map(this.gapTo,1);return t.deletedAcross&&r.deletedAcross||n<t.pos||i>r.pos?null:new C(t.pos,r.pos,n,i,this.slice,this.insert,this.structure)}toJSON(){let e={stepType:"replaceAround",from:this.from,to:this.to,gapFrom:this.gapFrom,gapTo:this.gapTo,insert:this.insert};return this.slice.size&&(e.slice=this.slice.toJSON()),this.structure&&(e.structure=!0),e}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number"||typeof t.gapFrom!="number"||typeof t.gapTo!="number"||typeof t.insert!="number")throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");return new C(t.from,t.to,t.gapFrom,t.gapTo,g.fromJSON(e,t.slice),t.insert,!!t.structure)}}b.jsonID("replaceAround",C);function B(s,e,t){let r=s.resolve(e),n=t-e,i=r.depth;for(;n>0&&i>0&&r.indexAfter(i)==r.node(i).childCount;)i--,n--;if(n>0){let l=r.node(i).maybeChild(r.indexAfter(i));for(;n>0;){if(!l||l.isLeaf)return!0;l=l.firstChild,n--}}return!1}function se(s,e,t,r){let n=[],i=[],l,o;s.doc.nodesBetween(e,t,(a,h,p)=>{if(!a.isInline)return;let d=a.marks;if(!r.isInSet(d)&&p.type.allowsMarkType(r.type)){let f=Math.max(h,e),c=Math.min(h+a.nodeSize,t),u=r.addToSet(d);for(let m=0;m<d.length;m++)d[m].isInSet(u)||(l&&l.to==f&&l.mark.eq(d[m])?l.to=c:n.push(l=new k(f,c,d[m])));o&&o.to==f?o.to=c:i.push(o=new M(f,c,r))}}),n.forEach(a=>s.step(a)),i.forEach(a=>s.step(a))}function le(s,e,t,r){let n=[],i=0;s.doc.nodesBetween(e,t,(l,o)=>{if(!l.isInline)return;i++;let a=null;if(r instanceof re){let h=l.marks,p;for(;p=r.isInSet(h);)(a||(a=[])).push(p),h=p.removeFromSet(h)}else r?r.isInSet(l.marks)&&(a=[r]):a=l.marks;if(a&&a.length){let h=Math.min(o+l.nodeSize,t);for(let p=0;p<a.length;p++){let d=a[p],f;for(let c=0;c<n.length;c++){let u=n[c];u.step==i-1&&d.eq(n[c].style)&&(f=u)}f?(f.to=h,f.step=i):n.push({style:d,from:Math.max(o,e),to:h,step:i})}}}),n.forEach(l=>s.step(new k(l.from,l.to,l.style)))}function oe(s,e,t,r=t.contentMatch){let n=s.doc.nodeAt(e),i=[],l=e+1;for(let o=0;o<n.childCount;o++){let a=n.child(o),h=l+a.nodeSize,p=r.matchType(a.type);if(!p)i.push(new w(l,h,g.empty));else{r=p;for(let d=0;d<a.marks.length;d++)t.allowsMarkType(a.marks[d].type)||s.step(new k(l,h,a.marks[d]))}l=h}if(!r.validEnd){let o=r.fillBefore(y.empty,!0);s.replace(l,l,new g(o,0,0))}for(let o=i.length-1;o>=0;o--)s.step(i[o])}function ae(s,e,t){return(e==0||s.canReplace(e,s.childCount))&&(t==s.childCount||s.canReplace(0,t))}function he(s){let t=s.parent.content.cutByIndex(s.startIndex,s.endIndex);for(let r=s.depth;;--r){let n=s.$from.node(r),i=s.$from.index(r),l=s.$to.indexAfter(r);if(r<s.depth&&n.canReplace(i,l,t))return r;if(r==0||n.type.spec.isolating||!ae(n,i,l))break}return null}function pe(s,e,t){let{$from:r,$to:n,depth:i}=e,l=r.before(i+1),o=n.after(i+1),a=l,h=o,p=y.empty,d=0;for(let u=i,m=!1;u>t;u--)m||r.index(u)>0?(m=!0,p=y.from(r.node(u).copy(p)),d++):a--;let f=y.empty,c=0;for(let u=i,m=!1;u>t;u--)m||n.after(u+1)<n.end(u)?(m=!0,f=y.from(n.node(u).copy(f)),c++):h++;s.step(new C(a,h,l,o,new g(p.append(f),d,c),p.size-d,!0))}function fe(s,e,t=null,r=s){let n=de(s,e),i=n&&ce(r,e);return i?n.map(P).concat({type:e,attrs:t}).concat(i.map(P)):null}function P(s){return{type:s,attrs:null}}function de(s,e){let{parent:t,startIndex:r,endIndex:n}=s,i=t.contentMatchAt(r).findWrapping(e);if(!i)return null;let l=i.length?i[0]:e;return t.canReplaceWith(r,n,l)?i:null}function ce(s,e){let{parent:t,startIndex:r,endIndex:n}=s,i=t.child(r),l=e.contentMatch.findWrapping(i.type);if(!l)return null;let a=(l.length?l[l.length-1]:e).contentMatch;for(let h=r;a&&h<n;h++)a=a.matchType(t.child(h).type);return!a||!a.validEnd?null:l}function ue(s,e,t){let r=y.empty;for(let l=t.length-1;l>=0;l--){if(r.size){let o=t[l].type.contentMatch.matchFragment(r);if(!o||!o.validEnd)throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper")}r=y.from(t[l].type.create(t[l].attrs,r))}let n=e.start,i=e.end;s.step(new C(n,i,n,i,new g(r,0,0),t.length,!0))}function me(s,e,t,r,n){if(!r.isTextblock)throw new RangeError("Type given to setBlockType should be a textblock");let i=s.steps.length;s.doc.nodesBetween(e,t,(l,o)=>{if(l.isTextblock&&!l.hasMarkup(r,n)&&ge(s.doc,s.mapping.slice(i).map(o),r)){s.clearIncompatible(s.mapping.slice(i).map(o,1),r);let a=s.mapping.slice(i),h=a.map(o,1),p=a.map(o+l.nodeSize,1);return s.step(new C(h,p,h+1,p-1,new g(y.from(r.create(n,null,l.marks)),0,0),1,!0)),!1}})}function ge(s,e,t){let r=s.resolve(e),n=r.index();return r.parent.canReplaceWith(n,n+1,t)}function ye(s,e,t,r,n){let i=s.doc.nodeAt(e);if(!i)throw new RangeError("No node at given position");t||(t=i.type);let l=t.create(r,null,n||i.marks);if(i.isLeaf)return s.replaceWith(e,e+i.nodeSize,l);if(!t.validContent(i.content))throw new RangeError("Invalid content for node type "+t.name);s.step(new C(e,e+i.nodeSize,e+1,e+i.nodeSize-1,new g(y.from(l),0,0),1,!0))}function we(s,e,t=1,r){let n=s.resolve(e),i=n.depth-t,l=r&&r[r.length-1]||n.parent;if(i<0||n.parent.type.spec.isolating||!n.parent.canReplace(n.index(),n.parent.childCount)||!l.type.validContent(n.parent.content.cutByIndex(n.index(),n.parent.childCount)))return!1;for(let h=n.depth-1,p=t-2;h>i;h--,p--){let d=n.node(h),f=n.index(h);if(d.type.spec.isolating)return!1;let c=d.content.cutByIndex(f,d.childCount),u=r&&r[p]||d;if(u!=d&&(c=c.replaceChild(0,u.type.create(u.attrs))),!d.canReplace(f+1,d.childCount)||!u.type.validContent(c))return!1}let o=n.indexAfter(i),a=r&&r[0];return n.node(i).canReplaceWith(o,o,a?a.type:n.node(i+1).type)}function ve(s,e,t=1,r){let n=s.doc.resolve(e),i=y.empty,l=y.empty;for(let o=n.depth,a=n.depth-t,h=t-1;o>a;o--,h--){i=y.from(n.node(o).copy(i));let p=r&&r[h];l=y.from(p?p.type.create(p.attrs,l):n.node(o).copy(l))}s.step(new w(e,e,new g(i.append(l),t,t),!0))}function Se(s,e){let t=s.resolve(e),r=t.index();return Q(t.nodeBefore,t.nodeAfter)&&t.parent.canReplace(r,r+1)}function Q(s,e){return!!(s&&e&&!s.isLeaf&&s.canAppend(e))}function xe(s,e,t=-1){let r=s.resolve(e);for(let n=r.depth;;n--){let i,l,o=r.index(n);if(n==r.depth?(i=r.nodeBefore,l=r.nodeAfter):t>0?(i=r.node(n+1),o++,l=r.node(n).maybeChild(o)):(i=r.node(n).maybeChild(o-1),l=r.node(n+1)),i&&!i.isTextblock&&Q(i,l)&&r.node(n).canReplace(o,o+1))return e;if(n==0)break;e=t<0?r.before(n):r.after(n)}}function ke(s,e,t){let r=new w(e-t,e+t,g.empty,!0);s.step(r)}function U(s,e,t){let r=s.resolve(e);if(r.parent.canReplaceWith(r.index(),r.index(),t))return e;if(r.parentOffset==0)for(let n=r.depth-1;n>=0;n--){let i=r.index(n);if(r.node(n).canReplaceWith(i,i,t))return r.before(n+1);if(i>0)return null}if(r.parentOffset==r.parent.content.size)for(let n=r.depth-1;n>=0;n--){let i=r.indexAfter(n);if(r.node(n).canReplaceWith(i,i,t))return r.after(n+1);if(i<r.node(n).childCount)return null}return null}function Ce(s,e,t){let r=s.resolve(e);if(!t.content.size)return e;let n=t.content;for(let i=0;i<t.openStart;i++)n=n.firstChild.content;for(let i=1;i<=(t.openStart==0&&t.size?2:1);i++)for(let l=r.depth;l>=0;l--){let o=l==r.depth?0:r.pos<=(r.start(l+1)+r.end(l+1))/2?-1:1,a=r.index(l)+(o>0?1:0),h=r.node(l),p=!1;if(i==1)p=h.canReplace(a,a,n);else{let d=h.contentMatchAt(a).findWrapping(n.firstChild.type);p=d&&h.canReplaceWith(a,a,d[0])}if(p)return o==0?r.pos:o<0?r.before(l+1):r.after(l+1)}return null}function V(s,e,t=e,r=g.empty){if(e==t&&!r.size)return null;let n=s.resolve(e),i=s.resolve(t);return X(n,i,r)?new w(e,t,r):new Me(n,i,r).fit()}function X(s,e,t){return!t.openStart&&!t.openEnd&&s.start()==e.start()&&s.parent.canReplace(s.index(),e.index(),t.content)}class Me{constructor(e,t,r){this.$from=e,this.$to=t,this.unplaced=r,this.frontier=[],this.placed=y.empty;for(let n=0;n<=e.depth;n++){let i=e.node(n);this.frontier.push({type:i.type,match:i.contentMatchAt(e.indexAfter(n))})}for(let n=e.depth;n>0;n--)this.placed=y.from(e.node(n).copy(this.placed))}get depth(){return this.frontier.length-1}fit(){for(;this.unplaced.size;){let h=this.findFittable();h?this.placeNodes(h):this.openMore()||this.dropNode()}let e=this.mustMoveInline(),t=this.placed.size-this.depth-this.$from.depth,r=this.$from,n=this.close(e<0?this.$to:r.doc.resolve(e));if(!n)return null;let i=this.placed,l=r.depth,o=n.depth;for(;l&&o&&i.childCount==1;)i=i.firstChild.content,l--,o--;let a=new g(i,l,o);return e>-1?new C(r.pos,e,this.$to.pos,this.$to.end(),a,t):a.size||r.pos!=this.$to.pos?new w(r.pos,n.pos,a):null}findFittable(){for(let e=1;e<=2;e++)for(let t=this.unplaced.openStart;t>=0;t--){let r,n=null;t?(n=A(this.unplaced.content,t-1).firstChild,r=n.content):r=this.unplaced.content;let i=r.firstChild;for(let l=this.depth;l>=0;l--){let{type:o,match:a}=this.frontier[l],h,p=null;if(e==1&&(i?a.matchType(i.type)||(p=a.fillBefore(y.from(i),!1)):n&&o.compatibleContent(n.type)))return{sliceDepth:t,frontierDepth:l,parent:n,inject:p};if(e==2&&i&&(h=a.findWrapping(i.type)))return{sliceDepth:t,frontierDepth:l,parent:n,wrap:h};if(n&&a.matchType(n.type))break}}}openMore(){let{content:e,openStart:t,openEnd:r}=this.unplaced,n=A(e,t);return!n.childCount||n.firstChild.isLeaf?!1:(this.unplaced=new g(e,t+1,Math.max(r,n.size+t>=e.size-r?t+1:0)),!0)}dropNode(){let{content:e,openStart:t,openEnd:r}=this.unplaced,n=A(e,t);if(n.childCount<=1&&t>0){let i=e.size-t<=t+n.size;this.unplaced=new g(E(e,t-1,1),t-1,i?t-1:r)}else this.unplaced=new g(E(e,t,1),t,r)}placeNodes({sliceDepth:e,frontierDepth:t,parent:r,inject:n,wrap:i}){for(;this.depth>t;)this.closeFrontierNode();if(i)for(let m=0;m<i.length;m++)this.openFrontierNode(i[m]);let l=this.unplaced,o=r?r.content:l.content,a=l.openStart-e,h=0,p=[],{match:d,type:f}=this.frontier[t];if(n){for(let m=0;m<n.childCount;m++)p.push(n.child(m));d=d.matchFragment(n)}let c=o.size+e-(l.content.size-l.openEnd);for(;h<o.childCount;){let m=o.child(h),S=d.matchType(m.type);if(!S)break;h++,(h>1||a==0||m.content.size)&&(d=S,p.push(Y(m.mark(f.allowedMarks(m.marks)),h==1?a:0,h==o.childCount?c:-1)))}let u=h==o.childCount;u||(c=-1),this.placed=z(this.placed,t,y.from(p)),this.frontier[t].match=d,u&&c<0&&r&&r.type==this.frontier[this.depth].type&&this.frontier.length>1&&this.closeFrontierNode();for(let m=0,S=o;m<c;m++){let I=S.lastChild;this.frontier.push({type:I.type,match:I.contentMatchAt(I.childCount)}),S=I.content}this.unplaced=u?e==0?g.empty:new g(E(l.content,e-1,1),e-1,c<0?l.openEnd:e-1):new g(E(l.content,e,h),l.openStart,l.openEnd)}mustMoveInline(){if(!this.$to.parent.isTextblock)return-1;let e=this.frontier[this.depth],t;if(!e.type.isTextblock||!J(this.$to,this.$to.depth,e.type,e.match,!1)||this.$to.depth==this.depth&&(t=this.findCloseLevel(this.$to))&&t.depth==this.depth)return-1;let{depth:r}=this.$to,n=this.$to.after(r);for(;r>1&&n==this.$to.end(--r);)++n;return n}findCloseLevel(e){e:for(let t=Math.min(this.depth,e.depth);t>=0;t--){let{match:r,type:n}=this.frontier[t],i=t<e.depth&&e.end(t+1)==e.pos+(e.depth-(t+1)),l=J(e,t,n,r,i);if(!!l){for(let o=t-1;o>=0;o--){let{match:a,type:h}=this.frontier[o],p=J(e,o,h,a,!0);if(!p||p.childCount)continue e}return{depth:t,fit:l,move:i?e.doc.resolve(e.after(t+1)):e}}}}close(e){let t=this.findCloseLevel(e);if(!t)return null;for(;this.depth>t.depth;)this.closeFrontierNode();t.fit.childCount&&(this.placed=z(this.placed,t.depth,t.fit)),e=t.move;for(let r=t.depth+1;r<=e.depth;r++){let n=e.node(r),i=n.type.contentMatch.fillBefore(n.content,!0,e.index(r));this.openFrontierNode(n.type,n.attrs,i)}return e}openFrontierNode(e,t=null,r){let n=this.frontier[this.depth];n.match=n.match.matchType(e),this.placed=z(this.placed,this.depth,y.from(e.create(t,r))),this.frontier.push({type:e,match:e.contentMatch})}closeFrontierNode(){let t=this.frontier.pop().match.fillBefore(y.empty,!0);t.childCount&&(this.placed=z(this.placed,this.frontier.length,t))}}function E(s,e,t){return e==0?s.cutByIndex(t,s.childCount):s.replaceChild(0,s.firstChild.copy(E(s.firstChild.content,e-1,t)))}function z(s,e,t){return e==0?s.append(t):s.replaceChild(s.childCount-1,s.lastChild.copy(z(s.lastChild.content,e-1,t)))}function A(s,e){for(let t=0;t<e;t++)s=s.firstChild.content;return s}function Y(s,e,t){if(e<=0)return s;let r=s.content;return e>1&&(r=r.replaceChild(0,Y(r.firstChild,e-1,r.childCount==1?t-1:0))),e>0&&(r=s.type.contentMatch.fillBefore(r).append(r),t<=0&&(r=r.append(s.type.contentMatch.matchFragment(r).fillBefore(y.empty,!0)))),s.copy(r)}function J(s,e,t,r,n){let i=s.node(e),l=n?s.indexAfter(e):s.index(e);if(l==i.childCount&&!t.compatibleContent(i.type))return null;let o=r.fillBefore(i.content,!0,l);return o&&!be(t,i.content,l)?o:null}function be(s,e,t){for(let r=t;r<e.childCount;r++)if(!s.allowsMarks(e.child(r).marks))return!0;return!1}function Ie(s){return s.spec.defining||s.spec.definingForContent}function Re(s,e,t,r){if(!r.size)return s.deleteRange(e,t);let n=s.doc.resolve(e),i=s.doc.resolve(t);if(X(n,i,r))return s.step(new w(e,t,r));let l=_(n,s.doc.resolve(t));l[l.length-1]==0&&l.pop();let o=-(n.depth+1);l.unshift(o);for(let f=n.depth,c=n.pos-1;f>0;f--,c--){let u=n.node(f).type.spec;if(u.defining||u.definingAsContext||u.isolating)break;l.indexOf(f)>-1?o=f:n.before(f)==c&&l.splice(1,0,-f)}let a=l.indexOf(o),h=[],p=r.openStart;for(let f=r.content,c=0;;c++){let u=f.firstChild;if(h.push(u),c==r.openStart)break;f=u.content}for(let f=p-1;f>=0;f--){let c=h[f].type,u=Ie(c);if(u&&n.node(a).type!=c)p=f;else if(u||!c.isTextblock)break}for(let f=r.openStart;f>=0;f--){let c=(f+p+1)%(r.openStart+1),u=h[c];if(!!u)for(let m=0;m<l.length;m++){let S=l[(m+a)%l.length],I=!0;S<0&&(I=!1,S=-S);let j=n.node(S-1),D=n.index(S-1);if(j.canReplaceWith(D,D,u.type,u.marks))return s.replace(n.before(S),I?i.after(S):t,new g(Z(r.content,0,r.openStart,c),c,r.openEnd))}}let d=s.steps.length;for(let f=l.length-1;f>=0&&(s.replace(e,t,r),!(s.steps.length>d));f--){let c=l[f];c<0||(e=n.before(c),t=i.after(c))}}function Z(s,e,t,r,n){if(e<t){let i=s.firstChild;s=s.replaceChild(0,i.copy(Z(i.content,e+1,t,r,i)))}if(e>r){let i=n.contentMatchAt(0),l=i.fillBefore(s).append(s);s=l.append(i.matchFragment(l).fillBefore(y.empty,!0))}return s}function Te(s,e,t,r){if(!r.isInline&&e==t&&s.doc.resolve(e).parent.content.size){let n=U(s.doc,e,r.type);n!=null&&(e=t=n)}s.replaceRange(e,t,new g(y.from(r),0,0))}function Ee(s,e,t){let r=s.doc.resolve(e),n=s.doc.resolve(t),i=_(r,n);for(let l=0;l<i.length;l++){let o=i[l],a=l==i.length-1;if(a&&o==0||r.node(o).type.contentMatch.validEnd)return s.delete(r.start(o),n.end(o));if(o>0&&(a||r.node(o-1).canReplace(r.index(o-1),n.indexAfter(o-1))))return s.delete(r.before(o),n.after(o))}for(let l=1;l<=r.depth&&l<=n.depth;l++)if(e-r.start(l)==r.depth-l&&t>r.end(l)&&n.end(l)-t!=n.depth-l)return s.delete(r.before(l),t);s.delete(e,t)}function _(s,e){let t=[],r=Math.min(s.depth,e.depth);for(let n=r;n>=0;n--){let i=s.start(n);if(i<s.pos-(s.depth-n)||e.end(n)>e.pos+(e.depth-n)||s.node(n).type.spec.isolating||e.node(n).type.spec.isolating)break;(i==e.start(n)||n==s.depth&&n==e.depth&&s.parent.inlineContent&&e.parent.inlineContent&&n&&e.start(n-1)==i-1)&&t.push(n)}return t}let R=class extends Error{};R=function s(e){let t=Error.call(this,e);return t.__proto__=s.prototype,t};R.prototype=Object.create(Error.prototype);R.prototype.constructor=R;R.prototype.name="TransformError";class ze{constructor(e){this.doc=e,this.steps=[],this.docs=[],this.mapping=new T}get before(){return this.docs.length?this.docs[0]:this.doc}step(e){let t=this.maybeStep(e);if(t.failed)throw new R(t.failed);return this}maybeStep(e){let t=e.apply(this.doc);return t.failed||this.addStep(e,t.doc),t}get docChanged(){return this.steps.length>0}addStep(e,t){this.docs.push(this.doc),this.steps.push(e),this.mapping.appendMap(e.getMap()),this.doc=t}replace(e,t=e,r=g.empty){let n=V(this.doc,e,t,r);return n&&this.step(n),this}replaceWith(e,t,r){return this.replace(e,t,new g(y.from(r),0,0))}delete(e,t){return this.replace(e,t,g.empty)}insert(e,t){return this.replaceWith(e,e,t)}replaceRange(e,t,r){return Re(this,e,t,r),this}replaceRangeWith(e,t,r){return Te(this,e,t,r),this}deleteRange(e,t){return Ee(this,e,t),this}lift(e,t){return pe(this,e,t),this}join(e,t=1){return ke(this,e,t),this}wrap(e,t){return ue(this,e,t),this}setBlockType(e,t=e,r,n=null){return me(this,e,t,r,n),this}setNodeMarkup(e,t,r=null,n=[]){return ye(this,e,t,r,n),this}split(e,t=1,r){return ve(this,e,t,r),this}addMark(e,t,r){return se(this,e,t,r),this}removeMark(e,t,r){return le(this,e,t,r),this}clearIncompatible(e,t,r){return oe(this,e,t,r),this}}var Ne=Object.freeze(Object.defineProperty({__proto__:null,AddMarkStep:M,MapResult:F,Mapping:T,RemoveMarkStep:k,ReplaceAroundStep:C,ReplaceStep:w,Step:b,StepMap:x,StepResult:v,Transform:ze,get TransformError(){return R},canJoin:Se,canSplit:we,dropPoint:Ce,findWrapping:fe,insertPoint:U,joinPoint:xe,liftTarget:he,replaceStep:V},Symbol.toStringTag,{value:"Module"})),Ae=ee(Ne);export{T as M,C as R,x as S,Se as a,Ae as b,we as c,fe as f,he as l,V as r};
