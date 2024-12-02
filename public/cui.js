/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = globalThis, ai = Ge.ShadowRoot && (Ge.ShadyCSS === void 0 || Ge.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, li = Symbol(), Mi = /* @__PURE__ */ new WeakMap();
let di = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== li) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ai && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = Mi.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && Mi.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Hr = (i) => new di(typeof i == "string" ? i : i + "", void 0, li), p = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((o, r, s) => o + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[s + 1], i[0]);
  return new di(e, i, li);
}, bo = (i, t) => {
  if (ai) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), r = Ge.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = e.cssText, i.appendChild(o);
  }
}, Li = ai ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return Hr(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ur, defineProperty: Vr, getOwnPropertyDescriptor: jr, getOwnPropertyNames: qr, getOwnPropertySymbols: Wr, getPrototypeOf: Kr } = Object, H = globalThis, Ri = H.trustedTypes, Yr = Ri ? Ri.emptyScript : "", Et = H.reactiveElementPolyfillSupport, Ee = (i, t) => i, Xe = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Yr : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, ci = (i, t) => !Ur(i, t), $i = { attribute: !0, type: String, converter: Xe, reflect: !1, hasChanged: ci };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), H.litPropertyMetadata ?? (H.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class te extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = $i) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(t, o, e);
      r !== void 0 && Vr(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: r, set: s } = jr(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get() {
      return r == null ? void 0 : r.call(this);
    }, set(n) {
      const a = r == null ? void 0 : r.call(this);
      s.call(this, n), this.requestUpdate(t, a, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? $i;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ee("elementProperties"))) return;
    const t = Kr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ee("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ee("properties"))) {
      const e = this.properties, o = [...qr(e), ...Wr(e)];
      for (const r of o) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [o, r] of e) this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, o] of this.elementProperties) {
      const r = this._$Eu(e, o);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const r of o) e.unshift(Li(r));
    } else t !== void 0 && e.push(Li(t));
    return e;
  }
  static _$Eu(t, e) {
    const o = e.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const o of e.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return bo(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var o;
      return (o = e.hostConnected) == null ? void 0 : o.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var o;
      return (o = e.hostDisconnected) == null ? void 0 : o.call(e);
    });
  }
  attributeChangedCallback(t, e, o) {
    this._$AK(t, o);
  }
  _$EC(t, e) {
    var s;
    const o = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, o);
    if (r !== void 0 && o.reflect === !0) {
      const n = (((s = o.converter) == null ? void 0 : s.toAttribute) !== void 0 ? o.converter : Xe).toAttribute(e, o.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var s;
    const o = this.constructor, r = o._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = o.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((s = n.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? n.converter : Xe;
      this._$Em = r, this[r] = a.fromAttribute(e, n.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, o) {
    if (t !== void 0) {
      if (o ?? (o = this.constructor.getPropertyOptions(t)), !(o.hasChanged ?? ci)(this[t], e)) return;
      this.P(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, o) {
    this._$AL.has(t) || this._$AL.set(t, e), o.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, n] of r) n.wrapped !== !0 || this._$AL.has(s) || this[s] === void 0 || this.P(s, this[s], n);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (o = this._$EO) == null || o.forEach((r) => {
        var s;
        return (s = r.hostUpdate) == null ? void 0 : s.call(r);
      }), this.update(e)) : this._$EU();
    } catch (r) {
      throw t = !1, this._$EU(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((o) => {
      var r;
      return (r = o.hostUpdated) == null ? void 0 : r.call(o);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
te.elementStyles = [], te.shadowRootOptions = { mode: "open" }, te[Ee("elementProperties")] = /* @__PURE__ */ new Map(), te[Ee("finalized")] = /* @__PURE__ */ new Map(), Et == null || Et({ ReactiveElement: te }), (H.reactiveElementVersions ?? (H.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = globalThis, et = ke.trustedTypes, Di = et ? et.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, yo = "$lit$", F = `lit$${Math.random().toFixed(9).slice(2)}$`, xo = "?" + F, Gr = `<${xo}>`, G = document, Te = () => G.createComment(""), Se = (i) => i === null || typeof i != "object" && typeof i != "function", ui = Array.isArray, Jr = (i) => ui(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", kt = `[ 	
\f\r]`, be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Bi = /-->/g, Fi = />/g, j = RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Hi = /'/g, Ui = /"/g, wo = /^(?:script|style|textarea|title)$/i, Zr = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), N = Zr(1), ne = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), Vi = /* @__PURE__ */ new WeakMap(), q = G.createTreeWalker(G, 129);
function Co(i, t) {
  if (!ui(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Di !== void 0 ? Di.createHTML(t) : t;
}
const Qr = (i, t) => {
  const e = i.length - 1, o = [];
  let r, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = be;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let d, c, u = -1, h = 0;
    for (; h < l.length && (n.lastIndex = h, c = n.exec(l), c !== null); ) h = n.lastIndex, n === be ? c[1] === "!--" ? n = Bi : c[1] !== void 0 ? n = Fi : c[2] !== void 0 ? (wo.test(c[2]) && (r = RegExp("</" + c[2], "g")), n = j) : c[3] !== void 0 && (n = j) : n === j ? c[0] === ">" ? (n = r ?? be, u = -1) : c[1] === void 0 ? u = -2 : (u = n.lastIndex - c[2].length, d = c[1], n = c[3] === void 0 ? j : c[3] === '"' ? Ui : Hi) : n === Ui || n === Hi ? n = j : n === Bi || n === Fi ? n = be : (n = j, r = void 0);
    const f = n === j && i[a + 1].startsWith("/>") ? " " : "";
    s += n === be ? l + Gr : u >= 0 ? (o.push(d), l.slice(0, u) + yo + l.slice(u) + F + f) : l + F + (u === -2 ? a : f);
  }
  return [Co(i, s + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class Oe {
  constructor({ strings: t, _$litType$: e }, o) {
    let r;
    this.parts = [];
    let s = 0, n = 0;
    const a = t.length - 1, l = this.parts, [d, c] = Qr(t, e);
    if (this.el = Oe.createElement(d, o), q.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = q.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(yo)) {
          const h = c[n++], f = r.getAttribute(u).split(F), _ = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: s, name: _[2], strings: f, ctor: _[1] === "." ? es : _[1] === "?" ? ts : _[1] === "@" ? is : dt }), r.removeAttribute(u);
        } else u.startsWith(F) && (l.push({ type: 6, index: s }), r.removeAttribute(u));
        if (wo.test(r.tagName)) {
          const u = r.textContent.split(F), h = u.length - 1;
          if (h > 0) {
            r.textContent = et ? et.emptyScript : "";
            for (let f = 0; f < h; f++) r.append(u[f], Te()), q.nextNode(), l.push({ type: 2, index: ++s });
            r.append(u[h], Te());
          }
        }
      } else if (r.nodeType === 8) if (r.data === xo) l.push({ type: 2, index: s });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(F, u + 1)) !== -1; ) l.push({ type: 7, index: s }), u += F.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const o = G.createElement("template");
    return o.innerHTML = t, o;
  }
}
function ae(i, t, e = i, o) {
  var n, a;
  if (t === ne) return t;
  let r = o !== void 0 ? (n = e._$Co) == null ? void 0 : n[o] : e._$Cl;
  const s = Se(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== s && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), s === void 0 ? r = void 0 : (r = new s(i), r._$AT(i, e, o)), o !== void 0 ? (e._$Co ?? (e._$Co = []))[o] = r : e._$Cl = r), r !== void 0 && (t = ae(i, r._$AS(i, t.values), r, o)), t;
}
class Xr {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: o } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? G).importNode(e, !0);
    q.currentNode = r;
    let s = q.nextNode(), n = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let d;
        l.type === 2 ? d = new Re(s, s.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (d = new os(s, this, t)), this._$AV.push(d), l = o[++a];
      }
      n !== (l == null ? void 0 : l.index) && (s = q.nextNode(), n++);
    }
    return q.currentNode = G, r;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class Re {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, o, r) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = ae(this, t, e), Se(t) ? t === E || t == null || t === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== ne && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Jr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== E && Se(this._$AH) ? this._$AA.nextSibling.data = t : this.T(G.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: e, _$litType$: o } = t, r = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = Oe.createElement(Co(o.h, o.h[0]), this.options)), o);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === r) this._$AH.p(e);
    else {
      const n = new Xr(r, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Vi.get(t.strings);
    return e === void 0 && Vi.set(t.strings, e = new Oe(t)), e;
  }
  k(t) {
    ui(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, r = 0;
    for (const s of t) r === e.length ? e.push(o = new Re(this.O(Te()), this.O(Te()), this, this.options)) : o = e[r], o._$AI(s), r++;
    r < e.length && (this._$AR(o && o._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, r, s) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = s, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = E;
  }
  _$AI(t, e = this, o, r) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) t = ae(this, t, e, 0), n = !Se(t) || t !== this._$AH && t !== ne, n && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = s[0], l = 0; l < s.length - 1; l++) d = ae(this, a[o + l], e, l), d === ne && (d = this._$AH[l]), n || (n = !Se(d) || d !== this._$AH[l]), d === E ? t = E : t !== E && (t += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class es extends dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === E ? void 0 : t;
  }
}
class ts extends dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== E);
  }
}
class is extends dt {
  constructor(t, e, o, r, s) {
    super(t, e, o, r, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ae(this, t, e, 0) ?? E) === ne) return;
    const o = this._$AH, r = t === E && o !== E || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, s = t !== E && (o === E || r);
    r && this.element.removeEventListener(this.name, this, o), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class os {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ae(this, t);
  }
}
const Pt = ke.litHtmlPolyfillSupport;
Pt == null || Pt(Oe, Re), (ke.litHtmlVersions ?? (ke.litHtmlVersions = [])).push("3.2.1");
const Ao = (i, t, e) => {
  const o = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = o._$litPart$;
  if (r === void 0) {
    const s = (e == null ? void 0 : e.renderBefore) ?? null;
    o._$litPart$ = r = new Re(t.insertBefore(Te(), s), s, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let P = class extends te {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ao(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return ne;
  }
};
var go;
P._$litElement$ = !0, P.finalized = !0, (go = globalThis.litElementHydrateSupport) == null || go.call(globalThis, { LitElement: P });
const Tt = globalThis.litElementPolyfillSupport;
Tt == null || Tt({ LitElement: P });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rs = { attribute: !0, type: String, converter: Xe, reflect: !1, hasChanged: ci }, ss = (i = rs, t, e) => {
  const { kind: o, metadata: r } = e;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), s.set(e.name, i), o === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, l, i);
    }, init(a) {
      return a !== void 0 && this.P(n, void 0, i), a;
    } };
  }
  if (o === "setter") {
    const { name: n } = e;
    return function(a) {
      const l = this[n];
      t.call(this, a), this.requestUpdate(n, l, i);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function g(i) {
  return (t, e) => typeof e == "object" ? ss(i, t, e) : ((o, r, s) => {
    const n = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, n ? { ...o, wrapped: !0 } : o), n ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ns(i) {
  return g({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function b(i, t = "24.5.3") {
  Object.defineProperty(i, "version", {
    get() {
      return t;
    }
  });
  const e = customElements.get(i.is);
  if (!e)
    customElements.define(i.is, i);
  else {
    const o = e.version;
    o && i.version && o === i.version ? console.warn(`The component ${i.is} has been loaded twice`) : console.error(
      `Tried to define ${i.is} version ${i.version} when version ${e.version} is already in use. Something will probably break.`
    );
  }
}
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class as extends HTMLElement {
  static get is() {
    return "vaadin-lumo-styles";
  }
}
b(as);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const ct = (i) => class extends i {
  static get properties() {
    return {
      /**
       * Helper property with theme attribute value facilitating propagation
       * in shadow DOM.
       *
       * Enables the component implementation to propagate the `theme`
       * attribute value to the sub-components in Shadow DOM by binding
       * the sub-component's "theme" attribute to the `theme` property of
       * the host.
       *
       * **NOTE:** Extending the mixin only provides the property for binding,
       * and does not make the propagation alone.
       *
       * See [Styling Components: Sub-components](https://vaadin.com/docs/latest/styling/styling-components/#sub-components).
       * page for more information.
       *
       * @protected
       */
      _theme: {
        type: String,
        readOnly: !0
      }
    };
  }
  static get observedAttributes() {
    return [...super.observedAttributes, "theme"];
  }
  /** @protected */
  attributeChangedCallback(e, o, r) {
    super.attributeChangedCallback(e, o, r), e === "theme" && this._set_theme(r);
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Eo = [], Ut = /* @__PURE__ */ new Set(), hi = /* @__PURE__ */ new Set();
function ko(i) {
  return i && Object.prototype.hasOwnProperty.call(i, "__themes");
}
function ls(i) {
  return ko(customElements.get(i));
}
function ds(i = []) {
  return [i].flat(1 / 0).filter((t) => t instanceof di ? !0 : (console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."), !1));
}
function Po(i, t) {
  return (i || "").split(" ").some((e) => new RegExp(`^${e.split("*").join(".*")}$`, "u").test(t));
}
function To(i) {
  return i.map((t) => t.cssText).join(`
`);
}
const tt = "vaadin-themable-mixin-style";
function cs(i, t) {
  const e = document.createElement("style");
  e.id = tt, e.textContent = To(i), t.content.appendChild(e);
}
function us(i) {
  if (!i.shadowRoot)
    return;
  const t = i.constructor;
  if (i instanceof P)
    [...i.shadowRoot.querySelectorAll("style")].forEach((e) => e.remove()), bo(i.shadowRoot, t.elementStyles);
  else {
    const e = i.shadowRoot.getElementById(tt), o = t.prototype._template;
    e.textContent = o.content.getElementById(tt).textContent;
  }
}
function hs(i) {
  Ut.forEach((t) => {
    const e = t.deref();
    e instanceof i ? us(e) : e || Ut.delete(t);
  });
}
function So(i) {
  if (i.prototype instanceof P)
    i.elementStyles = i.finalizeStyles(i.styles);
  else {
    const t = i.prototype._template;
    t.content.getElementById(tt).textContent = To(i.getStylesForThis());
  }
  hi.forEach((t) => {
    const e = customElements.get(t);
    e !== i && e.prototype instanceof i && So(e);
  });
}
function ps(i, t) {
  const e = i.__themes;
  return !e || !t ? !1 : e.some(
    (o) => o.styles.some((r) => t.some((s) => s.cssText === r.cssText))
  );
}
function m(i, t, e = {}) {
  t = ds(t), window.Vaadin && window.Vaadin.styleModules ? window.Vaadin.styleModules.registerStyles(i, t, e) : Eo.push({
    themeFor: i,
    styles: t,
    include: e.include,
    moduleId: e.moduleId
  }), i && hi.forEach((o) => {
    if (Po(i, o) && ls(o)) {
      const r = customElements.get(o);
      ps(r, t) ? console.warn(`Registering styles that already exist for ${o}`) : (!window.Vaadin || !window.Vaadin.suppressPostFinalizeStylesWarning) && console.warn(
        `The custom element definition for "${o}" was finalized before a style module was registered. Ideally, import component specific style modules before importing the corresponding custom element. This warning can be suppressed by setting "window.Vaadin.suppressPostFinalizeStylesWarning = true".`
      ), So(r), hs(r);
    }
  });
}
function Vt() {
  return window.Vaadin && window.Vaadin.styleModules ? window.Vaadin.styleModules.getAllThemes() : Eo;
}
function fs(i = "") {
  let t = 0;
  return i.startsWith("lumo-") || i.startsWith("material-") ? t = 1 : i.startsWith("vaadin-") && (t = 2), t;
}
function Oo(i) {
  const t = [];
  return i.include && [].concat(i.include).forEach((e) => {
    const o = Vt().find((r) => r.moduleId === e);
    o ? t.push(...Oo(o), ...o.styles) : console.warn(`Included moduleId ${e} not found in style registry`);
  }, i.styles), t;
}
function ms(i) {
  const t = `${i}-default-theme`, e = Vt().filter((o) => o.moduleId !== t && Po(o.themeFor, i)).map((o) => ({
    ...o,
    // Prepend styles from included themes
    styles: [...Oo(o), ...o.styles],
    // Map moduleId to includePriority
    includePriority: fs(o.moduleId)
  })).sort((o, r) => r.includePriority - o.includePriority);
  return e.length > 0 ? e : Vt().filter((o) => o.moduleId === t);
}
const k = (i) => class extends ct(i) {
  constructor() {
    super(), Ut.add(new WeakRef(this));
  }
  /**
   * Covers PolymerElement based component styling
   * @protected
   */
  static finalize() {
    if (super.finalize(), this.is && hi.add(this.is), this.elementStyles)
      return;
    const e = this.prototype._template;
    !e || ko(this) || cs(this.getStylesForThis(), e);
  }
  /**
   * Covers LitElement based component styling
   *
   * @protected
   */
  static finalizeStyles(e) {
    const o = this.getStylesForThis();
    return e ? [...[e].flat(1 / 0), ...o] : o;
  }
  /**
   * Get styles for the component type
   *
   * @private
   */
  static getStylesForThis() {
    const e = i.__themes || [], o = Object.getPrototypeOf(this.prototype), r = (o ? o.constructor.__themes : []) || [];
    this.__themes = [...e, ...r, ...ms(this.is)];
    const s = this.__themes.flatMap((n) => n.styles);
    return s.filter((n, a) => a === s.lastIndexOf(n));
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const _s = (i, ...t) => {
  const e = document.createElement("style");
  e.id = i, e.textContent = t.map((o) => o.toString()).join(`
`).replace(":host", "html"), document.head.insertAdjacentElement("afterbegin", e);
}, fe = (i, ...t) => {
  _s(`lumo-${i}`, t);
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const vs = p`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`;
fe("spacing-props", vs);
const gs = p`
  :host([theme~='margin']) {
    margin: var(--lumo-space-m);
  }

  :host([theme~='padding']) {
    padding: var(--lumo-space-m);
  }

  :host([theme~='spacing-xs']) {
    gap: var(--lumo-space-xs);
  }

  :host([theme~='spacing-s']) {
    gap: var(--lumo-space-s);
  }

  :host([theme~='spacing']) {
    gap: var(--lumo-space-m);
  }

  :host([theme~='spacing-l']) {
    gap: var(--lumo-space-l);
  }

  :host([theme~='spacing-xl']) {
    gap: var(--lumo-space-xl);
  }
`;
m("vaadin-vertical-layout", gs, { moduleId: "lumo-vertical-layout" });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.JSCompiler_renameProperty = function(i, t) {
  return i;
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let bs = /(url\()([^)]*)(\))/g, ys = /(^\/[^\/])|(^#)|(^[\w-\d]*:)/, Ve, I;
function Pe(i, t) {
  if (i && ys.test(i) || i === "//")
    return i;
  if (Ve === void 0) {
    Ve = !1;
    try {
      const e = new URL("b", "http://a");
      e.pathname = "c%20d", Ve = e.href === "http://a/c%20d";
    } catch {
    }
  }
  if (t || (t = document.baseURI || window.location.href), Ve)
    try {
      return new URL(i, t).href;
    } catch {
      return i;
    }
  return I || (I = document.implementation.createHTMLDocument("temp"), I.base = I.createElement("base"), I.head.appendChild(I.base), I.anchor = I.createElement("a"), I.body.appendChild(I.anchor)), I.base.href = t, I.anchor.href = i, I.anchor.href || i;
}
function pi(i, t) {
  return i.replace(bs, function(e, o, r, s) {
    return o + "'" + Pe(r.replace(/["']/g, ""), t) + "'" + s;
  });
}
function fi(i) {
  return i.substring(0, i.lastIndexOf("/") + 1);
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const xs = !window.ShadyDOM || !window.ShadyDOM.inUse;
!window.ShadyCSS || window.ShadyCSS.nativeCss;
const ws = xs && "adoptedStyleSheets" in Document.prototype && "replaceSync" in CSSStyleSheet.prototype && // Since spec may change, feature detect exact API we need
(() => {
  try {
    const i = new CSSStyleSheet();
    i.replaceSync("");
    const t = document.createElement("div");
    return t.attachShadow({ mode: "open" }), t.shadowRoot.adoptedStyleSheets = [i], t.shadowRoot.adoptedStyleSheets[0] === i;
  } catch {
    return !1;
  }
})();
let Cs = window.Polymer && window.Polymer.rootPath || fi(document.baseURI || window.location.href), it = window.Polymer && window.Polymer.sanitizeDOMValue || void 0;
window.Polymer && window.Polymer.setPassiveTouchGestures;
let jt = window.Polymer && window.Polymer.strictTemplatePolicy || !1, As = window.Polymer && window.Polymer.allowTemplateFromDomModule || !1, Es = window.Polymer && window.Polymer.legacyOptimizations || !1, ks = window.Polymer && window.Polymer.legacyWarnings || !1, Ps = window.Polymer && window.Polymer.syncInitialRender || !1, qt = window.Polymer && window.Polymer.legacyUndefined || !1, Ts = window.Polymer && window.Polymer.orderedComputed || !1, ji = window.Polymer && window.Polymer.removeNestedTemplates || !1, Ss = window.Polymer && window.Polymer.fastDomIf || !1;
window.Polymer && window.Polymer.suppressTemplateNotifications;
window.Polymer && window.Polymer.legacyNoObservedAttributes;
let Os = window.Polymer && window.Polymer.useAdoptedStyleSheetsWithBuiltCSS || !1;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Ns = 0;
const C = function(i) {
  let t = (
    /** @type {!MixinFunction} */
    i.__mixinApplications
  );
  t || (t = /* @__PURE__ */ new WeakMap(), i.__mixinApplications = t);
  let e = Ns++;
  function o(r) {
    let s = (
      /** @type {!MixinFunction} */
      r.__mixinSet
    );
    if (s && s[e])
      return r;
    let n = t, a = n.get(r);
    if (!a) {
      a = /** @type {!Function} */
      i(r), n.set(r, a);
      let l = Object.create(
        /** @type {!MixinFunction} */
        a.__mixinSet || s || null
      );
      l[e] = !0, a.__mixinSet = l;
    }
    return a;
  }
  return o;
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let mi = {}, No = {};
function qi(i, t) {
  mi[i] = No[i.toLowerCase()] = t;
}
function Wi(i) {
  return mi[i] || No[i.toLowerCase()];
}
function Is(i) {
  i.querySelector("style") && console.warn("dom-module %s has style outside template", i.id);
}
class Ne extends HTMLElement {
  /** @override */
  static get observedAttributes() {
    return ["id"];
  }
  /**
   * Retrieves the element specified by the css `selector` in the module
   * registered by `id`. For example, this.import('foo', 'img');
   * @param {string} id The id of the dom-module in which to search.
   * @param {string=} selector The css selector by which to find the element.
   * @return {Element} Returns the element which matches `selector` in the
   * module registered at the specified `id`.
   *
   * @export
   * @nocollapse Referred to indirectly in style-gather.js
   */
  static import(t, e) {
    if (t) {
      let o = Wi(t);
      return o && e ? o.querySelector(e) : o;
    }
    return null;
  }
  /* eslint-disable no-unused-vars */
  /**
   * @param {string} name Name of attribute.
   * @param {?string} old Old value of attribute.
   * @param {?string} value Current value of attribute.
   * @param {?string} namespace Attribute namespace.
   * @return {void}
   * @override
   */
  attributeChangedCallback(t, e, o, r) {
    e !== o && this.register();
  }
  /* eslint-enable no-unused-args */
  /**
   * The absolute URL of the original location of this `dom-module`.
   *
   * This value will differ from this element's `ownerDocument` in the
   * following ways:
   * - Takes into account any `assetpath` attribute added during bundling
   *   to indicate the original location relative to the bundled location
   * - Uses the HTMLImports polyfill's `importForElement` API to ensure
   *   the path is relative to the import document's location since
   *   `ownerDocument` is not currently polyfilled
   */
  get assetpath() {
    if (!this.__assetpath) {
      const t = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument, e = Pe(
        this.getAttribute("assetpath") || "",
        t.baseURI
      );
      this.__assetpath = fi(e);
    }
    return this.__assetpath;
  }
  /**
   * Registers the dom-module at a given id. This method should only be called
   * when a dom-module is imperatively created. For
   * example, `document.createElement('dom-module').register('foo')`.
   * @param {string=} id The id at which to register the dom-module.
   * @return {void}
   */
  register(t) {
    if (t = t || this.id, t) {
      if (jt && Wi(t) !== void 0)
        throw qi(t, null), new Error(`strictTemplatePolicy: dom-module ${t} re-registered`);
      this.id = t, qi(t, this), Is(this);
    }
  }
}
Ne.prototype.modules = mi;
customElements.define("dom-module", Ne);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const zs = "link[rel=import][type~=css]", Ms = "include", Ki = "shady-unscoped";
function Io(i) {
  return (
    /** @type {?DomModule} */
    Ne.import(i)
  );
}
function Yi(i) {
  let t = i.body ? i.body : i;
  const e = pi(
    t.textContent,
    i.baseURI
  ), o = document.createElement("style");
  return o.textContent = e, o;
}
function Ls(i) {
  const t = i.trim().split(/\s+/), e = [];
  for (let o = 0; o < t.length; o++)
    e.push(...Rs(t[o]));
  return e;
}
function Rs(i) {
  const t = Io(i);
  if (!t)
    return console.warn("Could not find style data in module named", i), [];
  if (t._styles === void 0) {
    const e = [];
    e.push(...Mo(t));
    const o = (
      /** @type {?HTMLTemplateElement} */
      t.querySelector("template")
    );
    o && e.push(...zo(
      o,
      /** @type {templateWithAssetPath} */
      t.assetpath
    )), t._styles = e;
  }
  return t._styles;
}
function zo(i, t) {
  if (!i._styles) {
    const e = [], o = i.content.querySelectorAll("style");
    for (let r = 0; r < o.length; r++) {
      let s = o[r], n = s.getAttribute(Ms);
      n && e.push(...Ls(n).filter(function(a, l, d) {
        return d.indexOf(a) === l;
      })), t && (s.textContent = pi(
        s.textContent,
        /** @type {string} */
        t
      )), e.push(s);
    }
    i._styles = e;
  }
  return i._styles;
}
function $s(i) {
  let t = Io(i);
  return t ? Mo(t) : [];
}
function Mo(i) {
  const t = [], e = i.querySelectorAll(zs);
  for (let o = 0; o < e.length; o++) {
    let r = e[o];
    if (r.import) {
      const s = r.import, n = r.hasAttribute(Ki);
      if (n && !s._unscopedStyle) {
        const a = Yi(s);
        a.setAttribute(Ki, ""), s._unscopedStyle = a;
      } else s._style || (s._style = Yi(s));
      t.push(n ? s._unscopedStyle : s._style);
    }
  }
  return t;
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const K = window.ShadyDOM && window.ShadyDOM.noPatch && window.ShadyDOM.wrap ? window.ShadyDOM.wrap : window.ShadyDOM ? (i) => ShadyDOM.patch(i) : (i) => i;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function Wt(i) {
  return i.indexOf(".") >= 0;
}
function Z(i) {
  let t = i.indexOf(".");
  return t === -1 ? i : i.slice(0, t);
}
function Ds(i, t) {
  return i.indexOf(t + ".") === 0;
}
function ot(i, t) {
  return t.indexOf(i + ".") === 0;
}
function rt(i, t, e) {
  return t + e.slice(i.length);
}
function Ce(i) {
  if (Array.isArray(i)) {
    let t = [];
    for (let e = 0; e < i.length; e++) {
      let o = i[e].toString().split(".");
      for (let r = 0; r < o.length; r++)
        t.push(o[r]);
    }
    return t.join(".");
  } else
    return i;
}
function Lo(i) {
  return Array.isArray(i) ? Ce(i).split(".") : i.toString().split(".");
}
function O(i, t, e) {
  let o = i, r = Lo(t);
  for (let s = 0; s < r.length; s++) {
    if (!o)
      return;
    let n = r[s];
    o = o[n];
  }
  return e && (e.path = r.join(".")), o;
}
function Gi(i, t, e) {
  let o = i, r = Lo(t), s = r[r.length - 1];
  if (r.length > 1) {
    for (let n = 0; n < r.length - 1; n++) {
      let a = r[n];
      if (o = o[a], !o)
        return;
    }
    o[s] = e;
  } else
    o[t] = e;
  return r.join(".");
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const st = {}, Bs = /-[a-z]/g, Fs = /([A-Z])/g;
function Ro(i) {
  return st[i] || (st[i] = i.indexOf("-") < 0 ? i : i.replace(
    Bs,
    (t) => t[1].toUpperCase()
  ));
}
function ut(i) {
  return st[i] || (st[i] = i.replace(Fs, "-$1").toLowerCase());
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Hs = 0, $o = 0, ie = [], Us = 0, Kt = !1, Do = document.createTextNode("");
new window.MutationObserver(Vs).observe(Do, { characterData: !0 });
function Vs() {
  Kt = !1;
  const i = ie.length;
  for (let t = 0; t < i; t++) {
    let e = ie[t];
    if (e)
      try {
        e();
      } catch (o) {
        setTimeout(() => {
          throw o;
        });
      }
  }
  ie.splice(0, i), $o += i;
}
const js = {
  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof microTask
   * @param {!Function=} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run(i) {
    return Kt || (Kt = !0, Do.textContent = Us++), ie.push(i), Hs++;
  },
  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(i) {
    const t = i - $o;
    if (t >= 0) {
      if (!ie[t])
        throw new Error("invalid async handle: " + i);
      ie[t] = null;
    }
  }
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const qs = js, Bo = C(
  /**
   * @template T
   * @param {function(new:T)} superClass Class to apply mixin to.
   * @return {function(new:T)} superClass with mixin applied.
   */
  (i) => {
    class t extends i {
      /**
       * Creates property accessors for the given property names.
       * @param {!Object} props Object whose keys are names of accessors.
       * @return {void}
       * @protected
       * @nocollapse
       */
      static createProperties(o) {
        const r = this.prototype;
        for (let s in o)
          s in r || r._createPropertyAccessor(s);
      }
      /**
       * Returns an attribute name that corresponds to the given property.
       * The attribute name is the lowercased property name. Override to
       * customize this mapping.
       * @param {string} property Property to convert
       * @return {string} Attribute name corresponding to the given property.
       *
       * @protected
       * @nocollapse
       */
      static attributeNameForProperty(o) {
        return o.toLowerCase();
      }
      /**
       * Override point to provide a type to which to deserialize a value to
       * a given property.
       * @param {string} name Name of property
       *
       * @protected
       * @nocollapse
       */
      static typeForProperty(o) {
      }
      //eslint-disable-line no-unused-vars
      /**
       * Creates a setter/getter pair for the named property with its own
       * local storage.  The getter returns the value in the local storage,
       * and the setter calls `_setProperty`, which updates the local storage
       * for the property and enqueues a `_propertiesChanged` callback.
       *
       * This method may be called on a prototype or an instance.  Calling
       * this method may overwrite a property value that already exists on
       * the prototype/instance by creating the accessor.
       *
       * @param {string} property Name of the property
       * @param {boolean=} readOnly When true, no setter is created; the
       *   protected `_setProperty` function must be used to set the property
       * @return {void}
       * @protected
       * @override
       */
      _createPropertyAccessor(o, r) {
        this._addPropertyToAttributeMap(o), this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor", this)) || (this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor)), this.__dataHasAccessor[o] || (this.__dataHasAccessor[o] = !0, this._definePropertyAccessor(o, r));
      }
      /**
       * Adds the given `property` to a map matching attribute names
       * to property names, using `attributeNameForProperty`. This map is
       * used when deserializing attribute values to properties.
       *
       * @param {string} property Name of the property
       * @override
       */
      _addPropertyToAttributeMap(o) {
        this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes", this)) || (this.__dataAttributes = Object.assign({}, this.__dataAttributes));
        let r = this.__dataAttributes[o];
        return r || (r = this.constructor.attributeNameForProperty(o), this.__dataAttributes[r] = o), r;
      }
      /**
       * Defines a property accessor for the given property.
       * @param {string} property Name of the property
       * @param {boolean=} readOnly When true, no setter is created
       * @return {void}
       * @override
       */
      _definePropertyAccessor(o, r) {
        Object.defineProperty(this, o, {
          /* eslint-disable valid-jsdoc */
          /** @this {PropertiesChanged} */
          get() {
            return this.__data[o];
          },
          /** @this {PropertiesChanged} */
          set: r ? function() {
          } : function(s) {
            this._setPendingProperty(o, s, !0) && this._invalidateProperties();
          }
          /* eslint-enable */
        });
      }
      constructor() {
        super(), this.__dataEnabled = !1, this.__dataReady = !1, this.__dataInvalid = !1, this.__data = {}, this.__dataPending = null, this.__dataOld = null, this.__dataInstanceProps = null, this.__dataCounter = 0, this.__serializing = !1, this._initializeProperties();
      }
      /**
       * Lifecycle callback called when properties are enabled via
       * `_enableProperties`.
       *
       * Users may override this function to implement behavior that is
       * dependent on the element having its property data initialized, e.g.
       * from defaults (initialized from `constructor`, `_initializeProperties`),
       * `attributeChangedCallback`, or values propagated from host e.g. via
       * bindings.  `super.ready()` must be called to ensure the data system
       * becomes enabled.
       *
       * @return {void}
       * @public
       * @override
       */
      ready() {
        this.__dataReady = !0, this._flushProperties();
      }
      /**
       * Initializes the local storage for property accessors.
       *
       * Provided as an override point for performing any setup work prior
       * to initializing the property accessor system.
       *
       * @return {void}
       * @protected
       * @override
       */
      _initializeProperties() {
        for (let o in this.__dataHasAccessor)
          this.hasOwnProperty(o) && (this.__dataInstanceProps = this.__dataInstanceProps || {}, this.__dataInstanceProps[o] = this[o], delete this[o]);
      }
      /**
       * Called at ready time with bag of instance properties that overwrote
       * accessors when the element upgraded.
       *
       * The default implementation sets these properties back into the
       * setter at ready time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @return {void}
       * @protected
       * @override
       */
      _initializeInstanceProperties(o) {
        Object.assign(this, o);
      }
      /**
       * Updates the local storage for a property (via `_setPendingProperty`)
       * and enqueues a `_proeprtiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @return {void}
       * @protected
       * @override
       */
      _setProperty(o, r) {
        this._setPendingProperty(o, r) && this._invalidateProperties();
      }
      /**
       * Returns the value for the given property.
       * @param {string} property Name of property
       * @return {*} Value for the given property
       * @protected
       * @override
       */
      _getProperty(o) {
        return this.__data[o];
      }
      /* eslint-disable no-unused-vars */
      /**
       * Updates the local storage for a property, records the previous value,
       * and adds it to the set of "pending changes" that will be passed to the
       * `_propertiesChanged` callback.  This method does not enqueue the
       * `_propertiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @param {boolean=} ext Not used here; affordance for closure
       * @return {boolean} Returns true if the property changed
       * @protected
       * @override
       */
      _setPendingProperty(o, r, s) {
        let n = this.__data[o], a = this._shouldPropertyChange(o, r, n);
        return a && (this.__dataPending || (this.__dataPending = {}, this.__dataOld = {}), this.__dataOld && !(o in this.__dataOld) && (this.__dataOld[o] = n), this.__data[o] = r, this.__dataPending[o] = r), a;
      }
      /* eslint-enable */
      /**
       * @param {string} property Name of the property
       * @return {boolean} Returns true if the property is pending.
       */
      _isPropertyPending(o) {
        return !!(this.__dataPending && this.__dataPending.hasOwnProperty(o));
      }
      /**
       * Marks the properties as invalid, and enqueues an async
       * `_propertiesChanged` callback.
       *
       * @return {void}
       * @protected
       * @override
       */
      _invalidateProperties() {
        !this.__dataInvalid && this.__dataReady && (this.__dataInvalid = !0, qs.run(() => {
          this.__dataInvalid && (this.__dataInvalid = !1, this._flushProperties());
        }));
      }
      /**
       * Call to enable property accessor processing. Before this method is
       * called accessor values will be set but side effects are
       * queued. When called, any pending side effects occur immediately.
       * For elements, generally `connectedCallback` is a normal spot to do so.
       * It is safe to call this method multiple times as it only turns on
       * property accessors once.
       *
       * @return {void}
       * @protected
       * @override
       */
      _enableProperties() {
        this.__dataEnabled || (this.__dataEnabled = !0, this.__dataInstanceProps && (this._initializeInstanceProperties(this.__dataInstanceProps), this.__dataInstanceProps = null), this.ready());
      }
      /**
       * Calls the `_propertiesChanged` callback with the current set of
       * pending changes (and old values recorded when pending changes were
       * set), and resets the pending set of changes. Generally, this method
       * should not be called in user code.
       *
       * @return {void}
       * @protected
       * @override
       */
      _flushProperties() {
        this.__dataCounter++;
        const o = this.__data, r = this.__dataPending, s = this.__dataOld;
        this._shouldPropertiesChange(o, r, s) && (this.__dataPending = null, this.__dataOld = null, this._propertiesChanged(o, r, s)), this.__dataCounter--;
      }
      /**
       * Called in `_flushProperties` to determine if `_propertiesChanged`
       * should be called. The default implementation returns true if
       * properties are pending. Override to customize when
       * `_propertiesChanged` is called.
       * @param {!Object} currentProps Bag of all current accessor values
       * @param {?Object} changedProps Bag of properties changed since the last
       *   call to `_propertiesChanged`
       * @param {?Object} oldProps Bag of previous values for each property
       *   in `changedProps`
       * @return {boolean} true if changedProps is truthy
       * @override
       */
      _shouldPropertiesChange(o, r, s) {
        return !!r;
      }
      /**
       * Callback called when any properties with accessors created via
       * `_createPropertyAccessor` have been set.
       *
       * @param {!Object} currentProps Bag of all current accessor values
       * @param {?Object} changedProps Bag of properties changed since the last
       *   call to `_propertiesChanged`
       * @param {?Object} oldProps Bag of previous values for each property
       *   in `changedProps`
       * @return {void}
       * @protected
       * @override
       */
      _propertiesChanged(o, r, s) {
      }
      /**
       * Method called to determine whether a property value should be
       * considered as a change and cause the `_propertiesChanged` callback
       * to be enqueued.
       *
       * The default implementation returns `true` if a strict equality
       * check fails. The method always returns false for `NaN`.
       *
       * Override this method to e.g. provide stricter checking for
       * Objects/Arrays when using immutable patterns.
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       *   and enqueue a `_proeprtiesChanged` callback
       * @protected
       * @override
       */
      _shouldPropertyChange(o, r, s) {
        return (
          // Strict equality check
          s !== r && // This ensures (old==NaN, value==NaN) always returns false
          (s === s || r === r)
        );
      }
      /**
       * Implements native Custom Elements `attributeChangedCallback` to
       * set an attribute value to a property via `_attributeToProperty`.
       *
       * @param {string} name Name of attribute that changed
       * @param {?string} old Old attribute value
       * @param {?string} value New attribute value
       * @param {?string} namespace Attribute namespace.
       * @return {void}
       * @suppress {missingProperties} Super may or may not implement the callback
       * @override
       */
      attributeChangedCallback(o, r, s, n) {
        r !== s && this._attributeToProperty(o, s), super.attributeChangedCallback && super.attributeChangedCallback(o, r, s, n);
      }
      /**
       * Deserializes an attribute to its associated property.
       *
       * This method calls the `_deserializeValue` method to convert the string to
       * a typed value.
       *
       * @param {string} attribute Name of attribute to deserialize.
       * @param {?string} value of the attribute.
       * @param {*=} type type to deserialize to, defaults to the value
       * returned from `typeForProperty`
       * @return {void}
       * @override
       */
      _attributeToProperty(o, r, s) {
        if (!this.__serializing) {
          const n = this.__dataAttributes, a = n && n[o] || o;
          this[a] = this._deserializeValue(r, s || this.constructor.typeForProperty(a));
        }
      }
      /**
       * Serializes a property to its associated attribute.
       *
       * @suppress {invalidCasts} Closure can't figure out `this` is an element.
       *
       * @param {string} property Property name to reflect.
       * @param {string=} attribute Attribute name to reflect to.
       * @param {*=} value Property value to refect.
       * @return {void}
       * @override
       */
      _propertyToAttribute(o, r, s) {
        this.__serializing = !0, s = arguments.length < 3 ? this[o] : s, this._valueToNodeAttribute(
          /** @type {!HTMLElement} */
          this,
          s,
          r || this.constructor.attributeNameForProperty(o)
        ), this.__serializing = !1;
      }
      /**
       * Sets a typed value to an HTML attribute on a node.
       *
       * This method calls the `_serializeValue` method to convert the typed
       * value to a string.  If the `_serializeValue` method returns `undefined`,
       * the attribute will be removed (this is the default for boolean
       * type `false`).
       *
       * @param {Element} node Element to set attribute to.
       * @param {*} value Value to serialize.
       * @param {string} attribute Attribute name to serialize to.
       * @return {void}
       * @override
       */
      _valueToNodeAttribute(o, r, s) {
        const n = this._serializeValue(r);
        (s === "class" || s === "name" || s === "slot") && (o = /** @type {?Element} */
        K(o)), n === void 0 ? o.removeAttribute(s) : o.setAttribute(
          s,
          // Closure's type for `setAttribute`'s second parameter incorrectly
          // excludes `TrustedScript`.
          n === "" && window.trustedTypes ? (
            /** @type {?} */
            window.trustedTypes.emptyScript
          ) : n
        );
      }
      /**
       * Converts a typed JavaScript value to a string.
       *
       * This method is called when setting JS property values to
       * HTML attributes.  Users may override this method to provide
       * serialization for custom types.
       *
       * @param {*} value Property value to serialize.
       * @return {string | undefined} String serialized from the provided
       * property  value.
       * @override
       */
      _serializeValue(o) {
        switch (typeof o) {
          case "boolean":
            return o ? "" : void 0;
          default:
            return o != null ? o.toString() : void 0;
        }
      }
      /**
       * Converts a string to a typed JavaScript value.
       *
       * This method is called when reading HTML attribute values to
       * JS properties.  Users may override this method to provide
       * deserialization for custom `type`s. Types for `Boolean`, `String`,
       * and `Number` convert attributes to the expected types.
       *
       * @param {?string} value Value to deserialize.
       * @param {*=} type Type to deserialize the string to.
       * @return {*} Typed value deserialized from the provided string.
       * @override
       */
      _deserializeValue(o, r) {
        switch (r) {
          case Boolean:
            return o !== null;
          case Number:
            return Number(o);
          default:
            return o;
        }
      }
    }
    return t;
  }
);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Fo = {};
let je = HTMLElement.prototype;
for (; je; ) {
  let i = Object.getOwnPropertyNames(je);
  for (let t = 0; t < i.length; t++)
    Fo[i[t]] = !0;
  je = Object.getPrototypeOf(je);
}
const Ws = window.trustedTypes ? (i) => trustedTypes.isHTML(i) || trustedTypes.isScript(i) || trustedTypes.isScriptURL(i) : () => !1;
function Ks(i, t) {
  if (!Fo[t]) {
    let e = i[t];
    e !== void 0 && (i.__data ? i._setPendingProperty(t, e) : (i.__dataProto ? i.hasOwnProperty(JSCompiler_renameProperty("__dataProto", i)) || (i.__dataProto = Object.create(i.__dataProto)) : i.__dataProto = {}, i.__dataProto[t] = e));
  }
}
const Ys = C((i) => {
  const t = Bo(i);
  class e extends t {
    /**
     * Generates property accessors for all attributes in the standard
     * static `observedAttributes` array.
     *
     * Attribute names are mapped to property names using the `dash-case` to
     * `camelCase` convention
     *
     * @return {void}
     * @nocollapse
     */
    static createPropertiesForAttributes() {
      let r = (
        /** @type {?} */
        this.observedAttributes
      );
      for (let s = 0; s < r.length; s++)
        this.prototype._createPropertyAccessor(Ro(r[s]));
    }
    /**
     * Returns an attribute name that corresponds to the given property.
     * By default, converts camel to dash case, e.g. `fooBar` to `foo-bar`.
     * @param {string} property Property to convert
     * @return {string} Attribute name corresponding to the given property.
     *
     * @protected
     * @nocollapse
     */
    static attributeNameForProperty(r) {
      return ut(r);
    }
    /**
     * Overrides PropertiesChanged implementation to initialize values for
     * accessors created for values that already existed on the element
     * prototype.
     *
     * @return {void}
     * @protected
     * @override
     */
    _initializeProperties() {
      this.__dataProto && (this._initializeProtoProperties(this.__dataProto), this.__dataProto = null), super._initializeProperties();
    }
    /**
     * Called at instance time with bag of properties that were overwritten
     * by accessors on the prototype when accessors were created.
     *
     * The default implementation sets these properties back into the
     * setter at instance time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @return {void}
     * @protected
     * @override
     */
    _initializeProtoProperties(r) {
      for (let s in r)
        this._setProperty(s, r[s]);
    }
    /**
     * Ensures the element has the given attribute. If it does not,
     * assigns the given value to the attribute.
     *
     * @suppress {invalidCasts} Closure can't figure out `this` is infact an
     *     element
     *
     * @param {string} attribute Name of attribute to ensure is set.
     * @param {string} value of the attribute.
     * @return {void}
     * @override
     */
    _ensureAttribute(r, s) {
      const n = (
        /** @type {!HTMLElement} */
        this
      );
      n.hasAttribute(r) || this._valueToNodeAttribute(n, s, r);
    }
    /**
     * Overrides PropertiesChanged implemention to serialize objects as JSON.
     *
     * @param {*} value Property value to serialize.
     * @return {string | undefined} String serialized from the provided property
     *     value.
     * @override
     */
    _serializeValue(r) {
      switch (typeof r) {
        case "object":
          if (r instanceof Date)
            return r.toString();
          if (r) {
            if (Ws(r))
              return (
                /** @type {?} */
                r
              );
            try {
              return JSON.stringify(r);
            } catch {
              return "";
            }
          }
        default:
          return super._serializeValue(r);
      }
    }
    /**
     * Converts a string to a typed JavaScript value.
     *
     * This method is called by Polymer when reading HTML attribute values to
     * JS properties.  Users may override this method on Polymer element
     * prototypes to provide deserialization for custom `type`s.  Note,
     * the `type` argument is the value of the `type` field provided in the
     * `properties` configuration object for a given property, and is
     * by convention the constructor for the type to deserialize.
     *
     *
     * @param {?string} value Attribute value to deserialize.
     * @param {*=} type Type to deserialize the string to.
     * @return {*} Typed value deserialized from the provided string.
     * @override
     */
    _deserializeValue(r, s) {
      let n;
      switch (s) {
        case Object:
          try {
            n = JSON.parse(
              /** @type {string} */
              r
            );
          } catch {
            n = r;
          }
          break;
        case Array:
          try {
            n = JSON.parse(
              /** @type {string} */
              r
            );
          } catch {
            n = null, console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${r}`);
          }
          break;
        case Date:
          n = isNaN(r) ? String(r) : Number(r), n = new Date(n);
          break;
        default:
          n = super._deserializeValue(r, s);
          break;
      }
      return n;
    }
    /* eslint-enable no-fallthrough */
    /**
     * Overrides PropertiesChanged implementation to save existing prototype
     * property value so that it can be reset.
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created
     *
     * When calling on a prototype, any overwritten values are saved in
     * `__dataProto`, and it is up to the subclasser to decide how/when
     * to set those properties back into the accessor.  When calling on an
     * instance, the overwritten value is set via `_setPendingProperty`,
     * and the user should call `_invalidateProperties` or `_flushProperties`
     * for the values to take effect.
     * @protected
     * @return {void}
     * @override
     */
    _definePropertyAccessor(r, s) {
      Ks(this, r), super._definePropertyAccessor(r, s);
    }
    /**
     * Returns true if this library created an accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if an accessor was created
     * @override
     */
    _hasAccessor(r) {
      return this.__dataHasAccessor && this.__dataHasAccessor[r];
    }
    /**
     * Returns true if the specified property has a pending change.
     *
     * @param {string} prop Property name
     * @return {boolean} True if property has a pending change
     * @protected
     * @override
     */
    _isPropertyPending(r) {
      return !!(this.__dataPending && r in this.__dataPending);
    }
  }
  return e;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Gs = {
  "dom-if": !0,
  "dom-repeat": !0
};
let Ji = !1, Zi = !1;
function Js() {
  if (!Ji) {
    Ji = !0;
    const i = document.createElement("textarea");
    i.placeholder = "a", Zi = i.placeholder === i.textContent;
  }
  return Zi;
}
function Zs(i) {
  Js() && i.localName === "textarea" && i.placeholder && i.placeholder === i.textContent && (i.textContent = null);
}
const Qs = (() => {
  const i = window.trustedTypes && window.trustedTypes.createPolicy(
    "polymer-template-event-attribute-policy",
    {
      createScript: (t) => t
    }
  );
  return (t, e, o) => {
    const r = e.getAttribute(o);
    if (i && o.startsWith("on-")) {
      t.setAttribute(
        o,
        i.createScript(r, o)
      );
      return;
    }
    t.setAttribute(o, r);
  };
})();
function Xs(i) {
  let t = i.getAttribute("is");
  if (t && Gs[t]) {
    let e = i;
    for (e.removeAttribute("is"), i = e.ownerDocument.createElement(t), e.parentNode.replaceChild(i, e), i.appendChild(e); e.attributes.length; ) {
      const { name: o } = e.attributes[0];
      Qs(i, e, o), e.removeAttribute(o);
    }
  }
  return i;
}
function Ho(i, t) {
  let e = t.parentInfo && Ho(i, t.parentInfo);
  if (e) {
    for (let o = e.firstChild, r = 0; o; o = o.nextSibling)
      if (t.parentIndex === r++)
        return o;
  } else
    return i;
}
function en(i, t, e, o) {
  o.id && (t[o.id] = e);
}
function tn(i, t, e) {
  if (e.events && e.events.length)
    for (let o = 0, r = e.events, s; o < r.length && (s = r[o]); o++)
      i._addMethodEventListenerToNode(t, s.name, s.value, i);
}
function on(i, t, e, o) {
  e.templateInfo && (t._templateInfo = e.templateInfo, t._parentTemplateInfo = o);
}
function rn(i, t, e) {
  return i = i._methodHost || i, function(r) {
    i[e] ? i[e](r, r.detail) : console.warn("listener method `" + e + "` not defined");
  };
}
const sn = C(
  /**
   * @template T
   * @param {function(new:T)} superClass Class to apply mixin to.
   * @return {function(new:T)} superClass with mixin applied.
   */
  (i) => {
    class t extends i {
      /**
       * Scans a template to produce template metadata.
       *
       * Template-specific metadata are stored in the object returned, and node-
       * specific metadata are stored in objects in its flattened `nodeInfoList`
       * array.  Only nodes in the template that were parsed as nodes of
       * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
       * contains an `index` (`childNodes` index in parent) and optionally
       * `parent`, which points to node info of its parent (including its index).
       *
       * The template metadata object returned from this method has the following
       * structure (many fields optional):
       *
       * ```js
       *   {
       *     // Flattened list of node metadata (for nodes that generated metadata)
       *     nodeInfoList: [
       *       {
       *         // `id` attribute for any nodes with id's for generating `$` map
       *         id: {string},
       *         // `on-event="handler"` metadata
       *         events: [
       *           {
       *             name: {string},   // event name
       *             value: {string},  // handler method name
       *           }, ...
       *         ],
       *         // Notes when the template contained a `<slot>` for shady DOM
       *         // optimization purposes
       *         hasInsertionPoint: {boolean},
       *         // For nested `<template>`` nodes, nested template metadata
       *         templateInfo: {object}, // nested template metadata
       *         // Metadata to allow efficient retrieval of instanced node
       *         // corresponding to this metadata
       *         parentInfo: {number},   // reference to parent nodeInfo>
       *         parentIndex: {number},  // index in parent's `childNodes` collection
       *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
       *       },
       *       ...
       *     ],
       *     // When true, the template had the `strip-whitespace` attribute
       *     // or was nested in a template with that setting
       *     stripWhitespace: {boolean},
       *     // For nested templates, nested template content is moved into
       *     // a document fragment stored here; this is an optimization to
       *     // avoid the cost of nested template cloning
       *     content: {DocumentFragment}
       *   }
       * ```
       *
       * This method kicks off a recursive treewalk as follows:
       *
       * ```
       *    _parseTemplate <---------------------+
       *      _parseTemplateContent              |
       *        _parseTemplateNode  <------------|--+
       *          _parseTemplateNestedTemplate --+  |
       *          _parseTemplateChildNodes ---------+
       *          _parseTemplateNodeAttributes
       *            _parseTemplateNodeAttribute
       *
       * ```
       *
       * These methods may be overridden to add custom metadata about templates
       * to either `templateInfo` or `nodeInfo`.
       *
       * Note that this method may be destructive to the template, in that
       * e.g. event annotations may be removed after being noted in the
       * template metadata.
       *
       * @param {!HTMLTemplateElement} template Template to parse
       * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
       *   template, for parsing nested templates
       * @return {!TemplateInfo} Parsed template metadata
       * @nocollapse
       */
      static _parseTemplate(o, r) {
        if (!o._templateInfo) {
          let s = o._templateInfo = {};
          s.nodeInfoList = [], s.nestedTemplate = !!r, s.stripWhiteSpace = r && r.stripWhiteSpace || o.hasAttribute && o.hasAttribute("strip-whitespace"), this._parseTemplateContent(
            o,
            s,
            /** @type {?} */
            { parent: null }
          );
        }
        return o._templateInfo;
      }
      /**
       * See docs for _parseTemplateNode.
       *
       * @param {!HTMLTemplateElement} template .
       * @param {!TemplateInfo} templateInfo .
       * @param {!NodeInfo} nodeInfo .
       * @return {boolean} .
       * @nocollapse
       */
      static _parseTemplateContent(o, r, s) {
        return this._parseTemplateNode(o.content, r, s);
      }
      /**
       * Parses template node and adds template and node metadata based on
       * the current node, and its `childNodes` and `attributes`.
       *
       * This method may be overridden to add custom node or template specific
       * metadata based on this node.
       *
       * @param {Node} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @nocollapse
       */
      static _parseTemplateNode(o, r, s) {
        let n = !1, a = (
          /** @type {!HTMLTemplateElement} */
          o
        );
        return a.localName == "template" && !a.hasAttribute("preserve-content") ? n = this._parseTemplateNestedTemplate(a, r, s) || n : a.localName === "slot" && (r.hasInsertionPoint = !0), Zs(a), a.firstChild && this._parseTemplateChildNodes(a, r, s), a.hasAttributes && a.hasAttributes() && (n = this._parseTemplateNodeAttributes(a, r, s) || n), n || s.noted;
      }
      /**
       * Parses template child nodes for the given root node.
       *
       * This method also wraps whitelisted legacy template extensions
       * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
       * wrappers, collapses text nodes, and strips whitespace from the template
       * if the `templateInfo.stripWhitespace` setting was provided.
       *
       * @param {Node} root Root node whose `childNodes` will be parsed
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {void}
       */
      static _parseTemplateChildNodes(o, r, s) {
        if (!(o.localName === "script" || o.localName === "style"))
          for (let n = o.firstChild, a = 0, l; n; n = l) {
            if (n.localName == "template" && (n = Xs(n)), l = n.nextSibling, n.nodeType === Node.TEXT_NODE) {
              let c = l;
              for (; c && c.nodeType === Node.TEXT_NODE; )
                n.textContent += c.textContent, l = c.nextSibling, o.removeChild(c), c = l;
              if (r.stripWhiteSpace && !n.textContent.trim()) {
                o.removeChild(n);
                continue;
              }
            }
            let d = (
              /** @type {!NodeInfo} */
              { parentIndex: a, parentInfo: s }
            );
            this._parseTemplateNode(n, r, d) && (d.infoIndex = r.nodeInfoList.push(d) - 1), n.parentNode && a++;
          }
      }
      /**
       * Parses template content for the given nested `<template>`.
       *
       * Nested template info is stored as `templateInfo` in the current node's
       * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
       * It will then be the responsibility of the host to set it back to the
       * template and for users stamping nested templates to use the
       * `_contentForTemplate` method to retrieve the content for this template
       * (an optimization to avoid the cost of cloning nested template content).
       *
       * @param {HTMLTemplateElement} node Node to parse (a <template>)
       * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
       *   that includes the template `node`
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @nocollapse
       */
      static _parseTemplateNestedTemplate(o, r, s) {
        let n = (
          /** @type {!HTMLTemplateElement} */
          o
        ), a = this._parseTemplate(n, r);
        return (a.content = n.content.ownerDocument.createDocumentFragment()).appendChild(n.content), s.templateInfo = a, !0;
      }
      /**
       * Parses template node attributes and adds node metadata to `nodeInfo`
       * for nodes of interest.
       *
       * @param {Element} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current
       *     template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @nocollapse
       */
      static _parseTemplateNodeAttributes(o, r, s) {
        let n = !1, a = Array.from(o.attributes);
        for (let l = a.length - 1, d; d = a[l]; l--)
          n = this._parseTemplateNodeAttribute(o, r, s, d.name, d.value) || n;
        return n;
      }
      /**
       * Parses a single template node attribute and adds node metadata to
       * `nodeInfo` for attributes of interest.
       *
       * This implementation adds metadata for `on-event="handler"` attributes
       * and `id` attributes.
       *
       * @param {Element} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @param {string} name Attribute name
       * @param {string} value Attribute value
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @nocollapse
       */
      static _parseTemplateNodeAttribute(o, r, s, n, a) {
        return n.slice(0, 3) === "on-" ? (o.removeAttribute(n), s.events = s.events || [], s.events.push({
          name: n.slice(3),
          value: a
        }), !0) : n === "id" ? (s.id = a, !0) : !1;
      }
      /**
       * Returns the `content` document fragment for a given template.
       *
       * For nested templates, Polymer performs an optimization to cache nested
       * template content to avoid the cost of cloning deeply nested templates.
       * This method retrieves the cached content for a given template.
       *
       * @param {HTMLTemplateElement} template Template to retrieve `content` for
       * @return {DocumentFragment} Content fragment
       * @nocollapse
       */
      static _contentForTemplate(o) {
        let r = (
          /** @type {HTMLTemplateElementWithInfo} */
          o._templateInfo
        );
        return r && r.content || o.content;
      }
      /**
       * Clones the provided template content and returns a document fragment
       * containing the cloned dom.
       *
       * The template is parsed (once and memoized) using this library's
       * template parsing features, and provides the following value-added
       * features:
       * * Adds declarative event listeners for `on-event="handler"` attributes
       * * Generates an "id map" for all nodes with id's under `$` on returned
       *   document fragment
       * * Passes template info including `content` back to templates as
       *   `_templateInfo` (a performance optimization to avoid deep template
       *   cloning)
       *
       * Note that the memoized template parsing process is destructive to the
       * template: attributes for bindings and declarative event listeners are
       * removed after being noted in notes, and any nested `<template>.content`
       * is removed and stored in notes as well.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @param {TemplateInfo=} templateInfo Optional template info associated
       *   with the template to be stamped; if omitted the template will be
       *   automatically parsed.
       * @return {!StampedTemplate} Cloned template content
       * @override
       */
      _stampTemplate(o, r) {
        o && !o.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(o), r = r || this.constructor._parseTemplate(o);
        let s = r.nodeInfoList, n = r.content || o.content, a = (
          /** @type {DocumentFragment} */
          document.importNode(n, !0)
        );
        a.__noInsertionPoint = !r.hasInsertionPoint;
        let l = a.nodeList = new Array(s.length);
        a.$ = {};
        for (let d = 0, c = s.length, u; d < c && (u = s[d]); d++) {
          let h = l[d] = Ho(a, u);
          en(this, a.$, h, u), on(this, h, u, r), tn(this, h, u);
        }
        return a = /** @type {!StampedTemplate} */
        a, a;
      }
      /**
       * Adds an event listener by method name for the event provided.
       *
       * This method generates a handler function that looks up the method
       * name at handling time.
       *
       * @param {!EventTarget} node Node to add listener on
       * @param {string} eventName Name of event
       * @param {string} methodName Name of method
       * @param {*=} context Context the method will be called on (defaults
       *   to `node`)
       * @return {Function} Generated handler function
       * @override
       */
      _addMethodEventListenerToNode(o, r, s, n) {
        n = n || o;
        let a = rn(n, r, s);
        return this._addEventListenerToNode(o, r, a), a;
      }
      /**
       * Override point for adding custom or simulated event handling.
       *
       * @param {!EventTarget} node Node to add event listener to
       * @param {string} eventName Name of event
       * @param {function(!Event):void} handler Listener function to add
       * @return {void}
       * @override
       */
      _addEventListenerToNode(o, r, s) {
        o.addEventListener(r, s);
      }
      /**
       * Override point for adding custom or simulated event handling.
       *
       * @param {!EventTarget} node Node to remove event listener from
       * @param {string} eventName Name of event
       * @param {function(!Event):void} handler Listener function to remove
       * @return {void}
       * @override
       */
      _removeEventListenerFromNode(o, r, s) {
        o.removeEventListener(r, s);
      }
    }
    return t;
  }
);
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
let Ie = 0;
const ze = [], v = {
  COMPUTE: "__computeEffects",
  REFLECT: "__reflectEffects",
  NOTIFY: "__notifyEffects",
  PROPAGATE: "__propagateEffects",
  OBSERVE: "__observeEffects",
  READ_ONLY: "__readOnly"
}, Uo = "__computeInfo", nn = /[A-Z]/;
function St(i, t, e) {
  let o = i[t];
  if (!o)
    o = i[t] = {};
  else if (!i.hasOwnProperty(t) && (o = i[t] = Object.create(i[t]), e))
    for (let r in o) {
      let s = o[r], n = o[r] = Array(s.length);
      for (let a = 0; a < s.length; a++)
        n[a] = s[a];
    }
  return o;
}
function Ae(i, t, e, o, r, s) {
  if (t) {
    let n = !1;
    const a = Ie++;
    for (let l in e) {
      let d = r ? Z(l) : l, c = t[d];
      if (c)
        for (let u = 0, h = c.length, f; u < h && (f = c[u]); u++)
          (!f.info || f.info.lastRun !== a) && (!r || _i(l, f.trigger)) && (f.info && (f.info.lastRun = a), f.fn(i, l, e, o, f.info, r, s), n = !0);
    }
    return n;
  }
  return !1;
}
function an(i, t, e, o, r, s, n, a) {
  let l = !1, d = n ? Z(o) : o, c = t[d];
  if (c)
    for (let u = 0, h = c.length, f; u < h && (f = c[u]); u++)
      (!f.info || f.info.lastRun !== e) && (!n || _i(o, f.trigger)) && (f.info && (f.info.lastRun = e), f.fn(i, o, r, s, f.info, n, a), l = !0);
  return l;
}
function _i(i, t) {
  if (t) {
    let e = (
      /** @type {string} */
      t.name
    );
    return e == i || !!(t.structured && Ds(e, i)) || !!(t.wildcard && ot(e, i));
  } else
    return !0;
}
function Qi(i, t, e, o, r) {
  let s = typeof r.method == "string" ? i[r.method] : r.method, n = r.property;
  s ? s.call(i, i.__data[n], o[n]) : r.dynamicFn || console.warn("observer method `" + r.method + "` not defined");
}
function ln(i, t, e, o, r) {
  let s = i[v.NOTIFY], n, a = Ie++;
  for (let d in t)
    t[d] && (s && an(i, s, a, d, e, o, r) || r && dn(i, d, e)) && (n = !0);
  let l;
  n && (l = i.__dataHost) && l._invalidateProperties && l._invalidateProperties();
}
function dn(i, t, e) {
  let o = Z(t);
  if (o !== t) {
    let r = ut(o) + "-changed";
    return Vo(i, r, e[t], t), !0;
  }
  return !1;
}
function Vo(i, t, e, o) {
  let r = {
    value: e,
    queueProperty: !0
  };
  o && (r.path = o), K(
    /** @type {!HTMLElement} */
    i
  ).dispatchEvent(new CustomEvent(t, { detail: r }));
}
function cn(i, t, e, o, r, s) {
  let a = (s ? Z(t) : t) != t ? t : null, l = a ? O(i, a) : i.__data[t];
  a && l === void 0 && (l = e[t]), Vo(i, r.eventName, l, a);
}
function un(i, t, e, o, r) {
  let s, n = (
    /** @type {Object} */
    i.detail
  ), a = n && n.path;
  a ? (o = rt(e, o, a), s = n && n.value) : s = i.currentTarget[e], s = r ? !s : s, (!t[v.READ_ONLY] || !t[v.READ_ONLY][o]) && t._setPendingPropertyOrPath(o, s, !0, !!a) && (!n || !n.queueProperty) && t._invalidateProperties();
}
function hn(i, t, e, o, r) {
  let s = i.__data[t];
  it && (s = it(
    s,
    r.attrName,
    "attribute",
    /** @type {Node} */
    i
  )), i._propertyToAttribute(t, r.attrName, s);
}
function pn(i, t, e, o) {
  let r = i[v.COMPUTE];
  if (r)
    if (Ts) {
      Ie++;
      const s = mn(i), n = [];
      for (let l in t)
        Xi(l, r, n, s, o);
      let a;
      for (; a = n.shift(); )
        jo(i, "", t, e, a) && Xi(a.methodInfo, r, n, s, o);
      Object.assign(
        /** @type {!Object} */
        e,
        i.__dataOld
      ), Object.assign(
        /** @type {!Object} */
        t,
        i.__dataPending
      ), i.__dataPending = null;
    } else {
      let s = t;
      for (; Ae(i, r, s, e, o); )
        Object.assign(
          /** @type {!Object} */
          e,
          i.__dataOld
        ), Object.assign(
          /** @type {!Object} */
          t,
          i.__dataPending
        ), s = i.__dataPending, i.__dataPending = null;
    }
}
const fn = (i, t, e) => {
  let o = 0, r = t.length - 1, s = -1;
  for (; o <= r; ) {
    const n = o + r >> 1, a = e.get(t[n].methodInfo) - e.get(i.methodInfo);
    if (a < 0)
      o = n + 1;
    else if (a > 0)
      r = n - 1;
    else {
      s = n;
      break;
    }
  }
  s < 0 && (s = r + 1), t.splice(s, 0, i);
}, Xi = (i, t, e, o, r) => {
  const s = r ? Z(i) : i, n = t[s];
  if (n)
    for (let a = 0; a < n.length; a++) {
      const l = n[a];
      l.info.lastRun !== Ie && (!r || _i(i, l.trigger)) && (l.info.lastRun = Ie, fn(l.info, e, o));
    }
};
function mn(i) {
  let t = i.constructor.__orderedComputedDeps;
  if (!t) {
    t = /* @__PURE__ */ new Map();
    const e = i[v.COMPUTE];
    let { counts: o, ready: r, total: s } = _n(i), n;
    for (; n = r.shift(); ) {
      t.set(n, t.size);
      const a = e[n];
      a && a.forEach((l) => {
        const d = l.info.methodInfo;
        --s, --o[d] === 0 && r.push(d);
      });
    }
    s !== 0 && console.warn(`Computed graph for ${/** @type {HTMLElement} */
    i.localName} incomplete; circular?`), i.constructor.__orderedComputedDeps = t;
  }
  return t;
}
function _n(i) {
  const t = i[Uo], e = {}, o = i[v.COMPUTE], r = [];
  let s = 0;
  for (let n in t) {
    const a = t[n];
    s += e[n] = a.args.filter((l) => !l.literal).length + (a.dynamicFn ? 1 : 0);
  }
  for (let n in o)
    t[n] || r.push(n);
  return { counts: e, ready: r, total: s };
}
function jo(i, t, e, o, r) {
  let s = Yt(i, t, e, o, r);
  if (s === ze)
    return !1;
  let n = r.methodInfo;
  return i.__dataHasAccessor && i.__dataHasAccessor[n] ? i._setPendingProperty(n, s, !0) : (i[n] = s, !1);
}
function vn(i, t, e) {
  let o = i.__dataLinkedPaths;
  if (o) {
    let r;
    for (let s in o) {
      let n = o[s];
      ot(s, t) ? (r = rt(s, n, t), i._setPendingPropertyOrPath(r, e, !0, !0)) : ot(n, t) && (r = rt(n, s, t), i._setPendingPropertyOrPath(r, e, !0, !0));
    }
  }
}
function Ot(i, t, e, o, r, s, n) {
  e.bindings = e.bindings || [];
  let a = { kind: o, target: r, parts: s, literal: n, isCompound: s.length !== 1 };
  if (e.bindings.push(a), wn(a)) {
    let { event: d, negate: c } = a.parts[0];
    a.listenerEvent = d || ut(r) + "-changed", a.listenerNegate = c;
  }
  let l = t.nodeInfoList.length;
  for (let d = 0; d < a.parts.length; d++) {
    let c = a.parts[d];
    c.compoundIndex = d, gn(i, t, a, c, l);
  }
}
function gn(i, t, e, o, r) {
  if (!o.literal)
    if (e.kind === "attribute" && e.target[0] === "-")
      console.warn("Cannot set attribute " + e.target + ' because "-" is not a valid attribute starting character');
    else {
      let s = o.dependencies, n = { index: r, binding: e, part: o, evaluator: i };
      for (let a = 0; a < s.length; a++) {
        let l = s[a];
        typeof l == "string" && (l = Wo(l), l.wildcard = !0), i._addTemplatePropertyEffect(t, l.rootProperty, {
          fn: bn,
          info: n,
          trigger: l
        });
      }
    }
}
function bn(i, t, e, o, r, s, n) {
  let a = n[r.index], l = r.binding, d = r.part;
  if (s && d.source && t.length > d.source.length && l.kind == "property" && !l.isCompound && a.__isPropertyEffectsClient && a.__dataHasAccessor && a.__dataHasAccessor[l.target]) {
    let c = e[t];
    t = rt(d.source, l.target, t), a._setPendingPropertyOrPath(t, c, !1, !0) && i._enqueueClient(a);
  } else {
    let c = r.evaluator._evaluateBinding(i, d, t, e, o, s);
    c !== ze && yn(i, a, l, d, c);
  }
}
function yn(i, t, e, o, r) {
  if (r = xn(t, r, e, o), it && (r = it(r, e.target, e.kind, t)), e.kind == "attribute")
    i._valueToNodeAttribute(
      /** @type {Element} */
      t,
      r,
      e.target
    );
  else {
    let s = e.target;
    t.__isPropertyEffectsClient && t.__dataHasAccessor && t.__dataHasAccessor[s] ? (!t[v.READ_ONLY] || !t[v.READ_ONLY][s]) && t._setPendingProperty(s, r) && i._enqueueClient(t) : i._setUnmanagedPropertyToNode(t, s, r);
  }
}
function xn(i, t, e, o) {
  if (e.isCompound) {
    let r = i.__dataCompoundStorage[e.target];
    r[o.compoundIndex] = t, t = r.join("");
  }
  return e.kind !== "attribute" && (e.target === "textContent" || e.target === "value" && (i.localName === "input" || i.localName === "textarea")) && (t = t ?? ""), t;
}
function wn(i) {
  return !!i.target && i.kind != "attribute" && i.kind != "text" && !i.isCompound && i.parts[0].mode === "{";
}
function Cn(i, t) {
  let { nodeList: e, nodeInfoList: o } = t;
  if (o.length)
    for (let r = 0; r < o.length; r++) {
      let s = o[r], n = e[r], a = s.bindings;
      if (a)
        for (let l = 0; l < a.length; l++) {
          let d = a[l];
          An(n, d), En(n, i, d);
        }
      n.__dataHost = i;
    }
}
function An(i, t) {
  if (t.isCompound) {
    let e = i.__dataCompoundStorage || (i.__dataCompoundStorage = {}), o = t.parts, r = new Array(o.length);
    for (let n = 0; n < o.length; n++)
      r[n] = o[n].literal;
    let s = t.target;
    e[s] = r, t.literal && t.kind == "property" && (s === "className" && (i = K(i)), i[s] = t.literal);
  }
}
function En(i, t, e) {
  if (e.listenerEvent) {
    let o = e.parts[0];
    i.addEventListener(e.listenerEvent, function(r) {
      un(r, t, e.target, o.source, o.negate);
    });
  }
}
function eo(i, t, e, o, r, s) {
  s = t.static || s && (typeof s != "object" || s[t.methodName]);
  let n = {
    methodName: t.methodName,
    args: t.args,
    methodInfo: r,
    dynamicFn: s
  };
  for (let a = 0, l; a < t.args.length && (l = t.args[a]); a++)
    l.literal || i._addPropertyEffect(l.rootProperty, e, {
      fn: o,
      info: n,
      trigger: l
    });
  return s && i._addPropertyEffect(t.methodName, e, {
    fn: o,
    info: n
  }), n;
}
function Yt(i, t, e, o, r) {
  let s = i._methodHost || i, n = s[r.methodName];
  if (n) {
    let a = i._marshalArgs(r.args, t, e);
    return a === ze ? ze : n.apply(s, a);
  } else r.dynamicFn || console.warn("method `" + r.methodName + "` not defined");
}
const kn = [], qo = "(?:[a-zA-Z_$][\\w.:$\\-*]*)", Pn = "(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)", Tn = "(?:'(?:[^'\\\\]|\\\\.)*')", Sn = '(?:"(?:[^"\\\\]|\\\\.)*")', On = "(?:" + Tn + "|" + Sn + ")", to = "(?:(" + qo + "|" + Pn + "|" + On + ")\\s*)", Nn = "(?:" + to + "(?:,\\s*" + to + ")*)", In = "(?:\\(\\s*(?:" + Nn + "?)\\)\\s*)", zn = "(" + qo + "\\s*" + In + "?)", Mn = "(\\[\\[|{{)\\s*", Ln = "(?:]]|}})", Rn = "(?:(!)\\s*)?", $n = Mn + Rn + zn + Ln, io = new RegExp($n, "g");
function oo(i) {
  let t = "";
  for (let e = 0; e < i.length; e++) {
    let o = i[e].literal;
    t += o || "";
  }
  return t;
}
function Nt(i) {
  let t = i.match(/([^\s]+?)\(([\s\S]*)\)/);
  if (t) {
    let o = { methodName: t[1], static: !0, args: kn };
    if (t[2].trim()) {
      let r = t[2].replace(/\\,/g, "&comma;").split(",");
      return Dn(r, o);
    } else
      return o;
  }
  return null;
}
function Dn(i, t) {
  return t.args = i.map(function(e) {
    let o = Wo(e);
    return o.literal || (t.static = !1), o;
  }, this), t;
}
function Wo(i) {
  let t = i.trim().replace(/&comma;/g, ",").replace(/\\(.)/g, "$1"), e = {
    name: t,
    value: "",
    literal: !1
  }, o = t[0];
  switch (o === "-" && (o = t[1]), o >= "0" && o <= "9" && (o = "#"), o) {
    case "'":
    case '"':
      e.value = t.slice(1, -1), e.literal = !0;
      break;
    case "#":
      e.value = Number(t), e.literal = !0;
      break;
  }
  return e.literal || (e.rootProperty = Z(t), e.structured = Wt(t), e.structured && (e.wildcard = t.slice(-2) == ".*", e.wildcard && (e.name = t.slice(0, -2)))), e;
}
function ro(i, t, e) {
  let o = O(i, e);
  return o === void 0 && (o = t[e]), o;
}
function Ko(i, t, e, o) {
  const r = { indexSplices: o };
  qt && !i._overrideLegacyUndefined && (t.splices = r), i.notifyPath(e + ".splices", r), i.notifyPath(e + ".length", t.length), qt && !i._overrideLegacyUndefined && (r.indexSplices = []);
}
function ye(i, t, e, o, r, s) {
  Ko(i, t, e, [{
    index: o,
    addedCount: r,
    removed: s,
    object: t,
    type: "splice"
  }]);
}
function Bn(i) {
  return i[0].toUpperCase() + i.substring(1);
}
const Fn = C((i) => {
  const t = sn(Ys(i));
  class e extends t {
    constructor() {
      super(), this.__isPropertyEffectsClient = !0, this.__dataClientsReady, this.__dataPendingClients, this.__dataToNotify, this.__dataLinkedPaths, this.__dataHasPaths, this.__dataCompoundStorage, this.__dataHost, this.__dataTemp, this.__dataClientsInitialized, this.__data, this.__dataPending, this.__dataOld, this.__computeEffects, this.__computeInfo, this.__reflectEffects, this.__notifyEffects, this.__propagateEffects, this.__observeEffects, this.__readOnly, this.__templateInfo, this._overrideLegacyUndefined;
    }
    get PROPERTY_EFFECT_TYPES() {
      return v;
    }
    /**
     * @override
     * @return {void}
     */
    _initializeProperties() {
      super._initializeProperties(), this._registerHost(), this.__dataClientsReady = !1, this.__dataPendingClients = null, this.__dataToNotify = null, this.__dataLinkedPaths = null, this.__dataHasPaths = !1, this.__dataCompoundStorage = this.__dataCompoundStorage || null, this.__dataHost = this.__dataHost || null, this.__dataTemp = {}, this.__dataClientsInitialized = !1;
    }
    _registerHost() {
      if (xe.length) {
        let r = xe[xe.length - 1];
        r._enqueueClient(this), this.__dataHost = r;
      }
    }
    /**
     * Overrides `PropertyAccessors` implementation to provide a
     * more efficient implementation of initializing properties from
     * the prototype on the instance.
     *
     * @override
     * @param {Object} props Properties to initialize on the prototype
     * @return {void}
     */
    _initializeProtoProperties(r) {
      this.__data = Object.create(r), this.__dataPending = Object.create(r), this.__dataOld = {};
    }
    /**
     * Overrides `PropertyAccessors` implementation to avoid setting
     * `_setProperty`'s `shouldNotify: true`.
     *
     * @override
     * @param {Object} props Properties to initialize on the instance
     * @return {void}
     */
    _initializeInstanceProperties(r) {
      let s = this[v.READ_ONLY];
      for (let n in r)
        (!s || !s[n]) && (this.__dataPending = this.__dataPending || {}, this.__dataOld = this.__dataOld || {}, this.__data[n] = this.__dataPending[n] = r[n]);
    }
    // Prototype setup ----------------------------------------
    /**
     * Equivalent to static `addPropertyEffect` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     */
    _addPropertyEffect(r, s, n) {
      this._createPropertyAccessor(r, s == v.READ_ONLY);
      let a = St(this, s, !0)[r];
      a || (a = this[s][r] = []), a.push(n);
    }
    /**
     * Removes the given property effect.
     *
     * @override
     * @param {string} property Property the effect was associated with
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object to remove
     * @return {void}
     */
    _removePropertyEffect(r, s, n) {
      let a = St(this, s, !0)[r], l = a.indexOf(n);
      l >= 0 && a.splice(l, 1);
    }
    /**
     * Returns whether the current prototype/instance has a property effect
     * of a certain type.
     *
     * @override
     * @param {string} property Property name
     * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @return {boolean} True if the prototype/instance has an effect of this
     *     type
     * @protected
     */
    _hasPropertyEffect(r, s) {
      let n = this[s];
      return !!(n && n[r]);
    }
    /**
     * Returns whether the current prototype/instance has a "read only"
     * accessor for the given property.
     *
     * @override
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this
     *     type
     * @protected
     */
    _hasReadOnlyEffect(r) {
      return this._hasPropertyEffect(r, v.READ_ONLY);
    }
    /**
     * Returns whether the current prototype/instance has a "notify"
     * property effect for the given property.
     *
     * @override
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this
     *     type
     * @protected
     */
    _hasNotifyEffect(r) {
      return this._hasPropertyEffect(r, v.NOTIFY);
    }
    /**
     * Returns whether the current prototype/instance has a "reflect to
     * attribute" property effect for the given property.
     *
     * @override
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this
     *     type
     * @protected
     */
    _hasReflectEffect(r) {
      return this._hasPropertyEffect(r, v.REFLECT);
    }
    /**
     * Returns whether the current prototype/instance has a "computed"
     * property effect for the given property.
     *
     * @override
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this
     *     type
     * @protected
     */
    _hasComputedEffect(r) {
      return this._hasPropertyEffect(r, v.COMPUTE);
    }
    // Runtime ----------------------------------------
    /**
     * Sets a pending property or path.  If the root property of the path in
     * question had no accessor, the path is set, otherwise it is enqueued
     * via `_setPendingProperty`.
     *
     * This function isolates relatively expensive functionality necessary
     * for the public API (`set`, `setProperties`, `notifyPath`, and property
     * change listeners via {{...}} bindings), such that it is only done
     * when paths enter the system, and not at every propagation step.  It
     * also sets a `__dataHasPaths` flag on the instance which is used to
     * fast-path slower path-matching code in the property effects host paths.
     *
     * `path` can be a path string or array of path parts as accepted by the
     * public API.
     *
     * @override
     * @param {string | !Array<number|string>} path Path to set
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify Set to true if this change should
     *  cause a property notification event dispatch
     * @param {boolean=} isPathNotification If the path being set is a path
     *   notification of an already changed value, as opposed to a request
     *   to set and notify the change.  In the latter `false` case, a dirty
     *   check is performed and then the value is set to the path before
     *   enqueuing the pending property change.
     * @return {boolean} Returns true if the property/path was enqueued in
     *   the pending changes bag.
     * @protected
     */
    _setPendingPropertyOrPath(r, s, n, a) {
      if (a || Z(Array.isArray(r) ? r[0] : r) !== r) {
        if (!a) {
          let l = O(this, r);
          if (r = /** @type {string} */
          Gi(this, r, s), !r || !super._shouldPropertyChange(r, s, l))
            return !1;
        }
        if (this.__dataHasPaths = !0, this._setPendingProperty(
          /**@type{string}*/
          r,
          s,
          n
        ))
          return vn(
            this,
            /**@type{string}*/
            r,
            s
          ), !0;
      } else {
        if (this.__dataHasAccessor && this.__dataHasAccessor[r])
          return this._setPendingProperty(
            /**@type{string}*/
            r,
            s,
            n
          );
        this[r] = s;
      }
      return !1;
    }
    /**
     * Applies a value to a non-Polymer element/node's property.
     *
     * The implementation makes a best-effort at binding interop:
     * Some native element properties have side-effects when
     * re-setting the same value (e.g. setting `<input>.value` resets the
     * cursor position), so we do a dirty-check before setting the value.
     * However, for better interop with non-Polymer custom elements that
     * accept objects, we explicitly re-set object changes coming from the
     * Polymer world (which may include deep object changes without the
     * top reference changing), erring on the side of providing more
     * information.
     *
     * Users may override this method to provide alternate approaches.
     *
     * @override
     * @param {!Node} node The node to set a property on
     * @param {string} prop The property to set
     * @param {*} value The value to set
     * @return {void}
     * @protected
     */
    _setUnmanagedPropertyToNode(r, s, n) {
      (n !== r[s] || typeof n == "object") && (s === "className" && (r = /** @type {!Node} */
      K(r)), r[s] = n);
    }
    /**
     * Overrides the `PropertiesChanged` implementation to introduce special
     * dirty check logic depending on the property & value being set:
     *
     * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
     *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
     * 2. Object set to simple property (e.g. 'prop': {...})
     *    Stored in `__dataTemp` and `__data`, dirty checked against
     *    `__dataTemp` by default implementation of `_shouldPropertyChange`
     * 3. Primitive value set to simple property (e.g. 'prop': 42)
     *    Stored in `__data`, dirty checked against `__data`
     *
     * The dirty-check is important to prevent cycles due to two-way
     * notification, but paths and objects are only dirty checked against any
     * previous value set during this turn via a "temporary cache" that is
     * cleared when the last `_propertiesChanged` exits. This is so:
     * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
     *    due to array mutations like shift/unshift/splice; this is fine
     *    since path changes are dirty-checked at user entry points like `set`
     * b. dirty-checking for objects only lasts one turn to allow the user
     *    to mutate the object in-place and re-set it with the same identity
     *    and have all sub-properties re-propagated in a subsequent turn.
     *
     * The temp cache is not necessarily sufficient to prevent invalid array
     * paths, since a splice can happen during the same turn (with pathological
     * user code); we could introduce a "fixup" for temporarily cached array
     * paths if needed: https://github.com/Polymer/polymer/issues/4227
     *
     * @override
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify True if property should fire notification
     *   event (applies only for `notify: true` properties)
     * @return {boolean} Returns true if the property changed
     */
    _setPendingProperty(r, s, n) {
      let a = this.__dataHasPaths && Wt(r), l = a ? this.__dataTemp : this.__data;
      return this._shouldPropertyChange(r, s, l[r]) ? (this.__dataPending || (this.__dataPending = {}, this.__dataOld = {}), r in this.__dataOld || (this.__dataOld[r] = this.__data[r]), a ? this.__dataTemp[r] = s : this.__data[r] = s, this.__dataPending[r] = s, (a || this[v.NOTIFY] && this[v.NOTIFY][r]) && (this.__dataToNotify = this.__dataToNotify || {}, this.__dataToNotify[r] = n), !0) : !1;
    }
    /**
     * Overrides base implementation to ensure all accessors set `shouldNotify`
     * to true, for per-property notification tracking.
     *
     * @override
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @return {void}
     */
    _setProperty(r, s) {
      this._setPendingProperty(r, s, !0) && this._invalidateProperties();
    }
    /**
     * Overrides `PropertyAccessor`'s default async queuing of
     * `_propertiesChanged`: if `__dataReady` is false (has not yet been
     * manually flushed), the function no-ops; otherwise flushes
     * `_propertiesChanged` synchronously.
     *
     * @override
     * @return {void}
     */
    _invalidateProperties() {
      this.__dataReady && this._flushProperties();
    }
    /**
     * Enqueues the given client on a list of pending clients, whose
     * pending property changes can later be flushed via a call to
     * `_flushClients`.
     *
     * @override
     * @param {Object} client PropertyEffects client to enqueue
     * @return {void}
     * @protected
     */
    _enqueueClient(r) {
      this.__dataPendingClients = this.__dataPendingClients || [], r !== this && this.__dataPendingClients.push(r);
    }
    /**
     * Flushes any clients previously enqueued via `_enqueueClient`, causing
     * their `_flushProperties` method to run.
     *
     * @override
     * @return {void}
     * @protected
     */
    _flushClients() {
      this.__dataClientsReady ? this.__enableOrFlushClients() : (this.__dataClientsReady = !0, this._readyClients(), this.__dataReady = !0);
    }
    // NOTE: We ensure clients either enable or flush as appropriate. This
    // handles two corner cases:
    // (1) clients flush properly when connected/enabled before the host
    // enables; e.g.
    //   (a) Templatize stamps with no properties and does not flush and
    //   (b) the instance is inserted into dom and
    //   (c) then the instance flushes.
    // (2) clients enable properly when not connected/enabled when the host
    // flushes; e.g.
    //   (a) a template is runtime stamped and not yet connected/enabled
    //   (b) a host sets a property, causing stamped dom to flush
    //   (c) the stamped dom enables.
    __enableOrFlushClients() {
      let r = this.__dataPendingClients;
      if (r) {
        this.__dataPendingClients = null;
        for (let s = 0; s < r.length; s++) {
          let n = r[s];
          n.__dataEnabled ? n.__dataPending && n._flushProperties() : n._enableProperties();
        }
      }
    }
    /**
     * Perform any initial setup on client dom. Called before the first
     * `_flushProperties` call on client dom and before any element
     * observers are called.
     *
     * @override
     * @return {void}
     * @protected
     */
    _readyClients() {
      this.__enableOrFlushClients();
    }
    /**
     * Sets a bag of property changes to this instance, and
     * synchronously processes all effects of the properties as a batch.
     *
     * Property names must be simple properties, not paths.  Batched
     * path propagation is not supported.
     *
     * @override
     * @param {Object} props Bag of one or more key-value pairs whose key is
     *   a property and value is the new value to set for that property.
     * @param {boolean=} setReadOnly When true, any private values set in
     *   `props` will be set. By default, `setProperties` will not set
     *   `readOnly: true` root properties.
     * @return {void}
     * @public
     */
    setProperties(r, s) {
      for (let n in r)
        (s || !this[v.READ_ONLY] || !this[v.READ_ONLY][n]) && this._setPendingPropertyOrPath(n, r[n], !0);
      this._invalidateProperties();
    }
    /**
     * Overrides `PropertyAccessors` so that property accessor
     * side effects are not enabled until after client dom is fully ready.
     * Also calls `_flushClients` callback to ensure client dom is enabled
     * that was not enabled as a result of flushing properties.
     *
     * @override
     * @return {void}
     */
    ready() {
      this._flushProperties(), this.__dataClientsReady || this._flushClients(), this.__dataPending && this._flushProperties();
    }
    /**
     * Implements `PropertyAccessors`'s properties changed callback.
     *
     * Runs each class of effects for the batch of changed properties in
     * a specific order (compute, propagate, reflect, observe, notify).
     *
     * @override
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {?Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {?Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @return {void}
     */
    _propertiesChanged(r, s, n) {
      let a = this.__dataHasPaths;
      this.__dataHasPaths = !1;
      let l;
      pn(this, s, n, a), l = this.__dataToNotify, this.__dataToNotify = null, this._propagatePropertyChanges(s, n, a), this._flushClients(), Ae(this, this[v.REFLECT], s, n, a), Ae(this, this[v.OBSERVE], s, n, a), l && ln(this, l, s, n, a), this.__dataCounter == 1 && (this.__dataTemp = {});
    }
    /**
     * Called to propagate any property changes to stamped template nodes
     * managed by this element.
     *
     * @override
     * @param {Object} changedProps Bag of changed properties
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @return {void}
     * @protected
     */
    _propagatePropertyChanges(r, s, n) {
      this[v.PROPAGATE] && Ae(this, this[v.PROPAGATE], r, s, n), this.__templateInfo && this._runEffectsForTemplate(this.__templateInfo, r, s, n);
    }
    _runEffectsForTemplate(r, s, n, a) {
      const l = (d, c) => {
        Ae(
          this,
          r.propertyEffects,
          d,
          n,
          c,
          r.nodeList
        );
        for (let u = r.firstChild; u; u = u.nextSibling)
          this._runEffectsForTemplate(u, d, n, c);
      };
      r.runEffects ? r.runEffects(l, s, a) : l(s, a);
    }
    /**
     * Aliases one data path as another, such that path notifications from one
     * are routed to the other.
     *
     * @override
     * @param {string | !Array<string|number>} to Target path to link.
     * @param {string | !Array<string|number>} from Source path to link.
     * @return {void}
     * @public
     */
    linkPaths(r, s) {
      r = Ce(r), s = Ce(s), this.__dataLinkedPaths = this.__dataLinkedPaths || {}, this.__dataLinkedPaths[r] = s;
    }
    /**
     * Removes a data path alias previously established with `_linkPaths`.
     *
     * Note, the path to unlink should be the target (`to`) used when
     * linking the paths.
     *
     * @override
     * @param {string | !Array<string|number>} path Target path to unlink.
     * @return {void}
     * @public
     */
    unlinkPaths(r) {
      r = Ce(r), this.__dataLinkedPaths && delete this.__dataLinkedPaths[r];
    }
    /**
     * Notify that an array has changed.
     *
     * Example:
     *
     *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
     *     ...
     *     this.items.splice(1, 1, {name: 'Sam'});
     *     this.items.push({name: 'Bob'});
     *     this.notifySplices('items', [
     *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1,
     *         object: this.items, type: 'splice' },
     *       { index: 3, removed: [], addedCount: 1,
     *         object: this.items, type: 'splice'}
     *     ]);
     *
     * @param {string} path Path that should be notified.
     * @param {Array} splices Array of splice records indicating ordered
     *   changes that occurred to the array. Each record should have the
     *   following fields:
     *    * index: index at which the change occurred
     *    * removed: array of items that were removed from this index
     *    * addedCount: number of new items added at this index
     *    * object: a reference to the array in question
     *    * type: the string literal 'splice'
     *
     *   Note that splice records _must_ be normalized such that they are
     *   reported in index order (raw results from `Object.observe` are not
     *   ordered and must be normalized/merged before notifying).
     *
     * @override
     * @return {void}
     * @public
     */
    notifySplices(r, s) {
      let n = { path: "" }, a = (
        /** @type {Array} */
        O(this, r, n)
      );
      Ko(this, a, n.path, s);
    }
    /**
     * Convenience method for reading a value from a path.
     *
     * Note, if any part in the path is undefined, this method returns
     * `undefined` (this method does not throw when dereferencing undefined
     * paths).
     *
     * @override
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `users.12.name` or `['users', 12, 'name']`).
     * @param {Object=} root Root object from which the path is evaluated.
     * @return {*} Value at the path, or `undefined` if any part of the path
     *   is undefined.
     * @public
     */
    get(r, s) {
      return O(s || this, r);
    }
    /**
     * Convenience method for setting a value to a path and notifying any
     * elements bound to the same path.
     *
     * Note, if any part in the path except for the last is undefined,
     * this method does nothing (this method does not throw when
     * dereferencing undefined paths).
     *
     * @override
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
     * @param {*} value Value to set at the specified path.
     * @param {Object=} root Root object from which the path is evaluated.
     *   When specified, no notification will occur.
     * @return {void}
     * @public
     */
    set(r, s, n) {
      n ? Gi(n, r, s) : (!this[v.READ_ONLY] || !this[v.READ_ONLY][
        /** @type {string} */
        r
      ]) && this._setPendingPropertyOrPath(r, s, !0) && this._invalidateProperties();
    }
    /**
     * Adds items onto the end of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @override
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to push onto array
     * @return {number} New length of the array.
     * @public
     */
    push(r, ...s) {
      let n = { path: "" }, a = (
        /** @type {Array}*/
        O(this, r, n)
      ), l = a.length, d = a.push(...s);
      return s.length && ye(this, a, n.path, l, s.length, []), d;
    }
    /**
     * Removes an item from the end of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @override
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */
    pop(r) {
      let s = { path: "" }, n = (
        /** @type {Array} */
        O(this, r, s)
      ), a = !!n.length, l = n.pop();
      return a && ye(this, n, s.path, n.length, 0, [l]), l;
    }
    /**
     * Starting from the start index specified, removes 0 or more items
     * from the array and inserts 0 or more new items in their place.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.splice`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @override
     * @param {string | !Array<string|number>} path Path to array.
     * @param {number} start Index from which to start removing/inserting.
     * @param {number=} deleteCount Number of items to remove.
     * @param {...*} items Items to insert into array.
     * @return {!Array} Array of removed items.
     * @public
     */
    splice(r, s, n, ...a) {
      let l = { path: "" }, d = (
        /** @type {Array} */
        O(this, r, l)
      );
      s < 0 ? s = d.length - Math.floor(-s) : s && (s = Math.floor(s));
      let c;
      return arguments.length === 2 ? c = d.splice(s) : c = d.splice(s, n, ...a), (a.length || c.length) && ye(this, d, l.path, s, a.length, c), c;
    }
    /**
     * Removes an item from the beginning of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @override
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */
    shift(r) {
      let s = { path: "" }, n = (
        /** @type {Array} */
        O(this, r, s)
      ), a = !!n.length, l = n.shift();
      return a && ye(this, n, s.path, 0, 0, [l]), l;
    }
    /**
     * Adds items onto the beginning of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @override
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to insert info array
     * @return {number} New length of the array.
     * @public
     */
    unshift(r, ...s) {
      let n = { path: "" }, a = (
        /** @type {Array} */
        O(this, r, n)
      ), l = a.unshift(...s);
      return s.length && ye(this, a, n.path, 0, s.length, []), l;
    }
    /**
     * Notify that a path has changed.
     *
     * Example:
     *
     *     this.item.user.name = 'Bob';
     *     this.notifyPath('item.user.name');
     *
     * @override
     * @param {string} path Path that should be notified.
     * @param {*=} value Value at the path (optional).
     * @return {void}
     * @public
     */
    notifyPath(r, s) {
      let n;
      if (arguments.length == 1) {
        let a = { path: "" };
        s = O(this, r, a), n = a.path;
      } else Array.isArray(r) ? n = Ce(r) : n = /** @type{string} */
      r;
      this._setPendingPropertyOrPath(n, s, !0, !0) && this._invalidateProperties();
    }
    /**
     * Equivalent to static `createReadOnlyProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @return {void}
     * @protected
     */
    _createReadOnlyProperty(r, s) {
      this._addPropertyEffect(r, v.READ_ONLY), s && (this["_set" + Bn(r)] = /** @this {PropertyEffects} */
      function(n) {
        this._setProperty(r, n);
      });
    }
    /**
     * Equivalent to static `createPropertyObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property name
     * @param {string|function(*,*)} method Function or name of observer method
     *     to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @return {void}
     * @protected
     */
    _createPropertyObserver(r, s, n) {
      let a = { property: r, method: s, dynamicFn: !!n };
      this._addPropertyEffect(r, v.OBSERVE, {
        fn: Qi,
        info: a,
        trigger: { name: r }
      }), n && this._addPropertyEffect(
        /** @type {string} */
        s,
        v.OBSERVE,
        {
          fn: Qi,
          info: a,
          trigger: { name: s }
        }
      );
    }
    /**
     * Equivalent to static `createMethodObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @return {void}
     * @protected
     */
    _createMethodObserver(r, s) {
      let n = Nt(r);
      if (!n)
        throw new Error("Malformed observer expression '" + r + "'");
      eo(this, n, v.OBSERVE, Yt, null, s);
    }
    /**
     * Equivalent to static `createNotifyingProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property name
     * @return {void}
     * @protected
     */
    _createNotifyingProperty(r) {
      this._addPropertyEffect(r, v.NOTIFY, {
        fn: cn,
        info: {
          eventName: ut(r) + "-changed",
          property: r
        }
      });
    }
    /**
     * Equivalent to static `createReflectedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property name
     * @return {void}
     * @protected
     * @suppress {missingProperties} go/missingfnprops
     */
    _createReflectedProperty(r) {
      let s = this.constructor.attributeNameForProperty(r);
      s[0] === "-" ? console.warn("Property " + r + " cannot be reflected to attribute " + s + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.') : this._addPropertyEffect(r, v.REFLECT, {
        fn: hn,
        info: {
          attrName: s
        }
      });
    }
    /**
     * Equivalent to static `createComputedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @return {void}
     * @protected
     */
    _createComputedProperty(r, s, n) {
      let a = Nt(s);
      if (!a)
        throw new Error("Malformed computed expression '" + s + "'");
      const l = eo(this, a, v.COMPUTE, jo, r, n);
      St(this, Uo)[r] = l;
    }
    /**
     * Gather the argument values for a method specified in the provided array
     * of argument metadata.
     *
     * The `path` and `value` arguments are used to fill in wildcard descriptor
     * when the method is being called as a result of a path notification.
     *
     * @param {!Array<!MethodArg>} args Array of argument metadata
     * @param {string} path Property/path name that triggered the method effect
     * @param {Object} props Bag of current property changes
     * @return {!Array<*>} Array of argument values
     * @private
     */
    _marshalArgs(r, s, n) {
      const a = this.__data, l = [];
      for (let d = 0, c = r.length; d < c; d++) {
        let { name: u, structured: h, wildcard: f, value: _, literal: T } = r[d];
        if (!T)
          if (f) {
            const S = ot(u, s), A = ro(a, n, S ? s : u);
            _ = {
              path: S ? s : u,
              value: A,
              base: S ? O(a, u) : A
            };
          } else
            _ = h ? ro(a, n, u) : a[u];
        if (qt && !this._overrideLegacyUndefined && _ === void 0 && r.length > 1)
          return ze;
        l[d] = _;
      }
      return l;
    }
    // -- static class methods ------------
    /**
     * Ensures an accessor exists for the specified property, and adds
     * to a list of "property effects" that will run when the accessor for
     * the specified property is set.  Effects are grouped by "type", which
     * roughly corresponds to a phase in effect processing.  The effect
     * metadata should be in the following form:
     *
     *     {
     *       fn: effectFunction, // Reference to function to call to perform effect
     *       info: { ... }       // Effect metadata passed to function
     *       trigger: {          // Optional triggering metadata; if not provided
     *         name: string      // the property is treated as a wildcard
     *         structured: boolean
     *         wildcard: boolean
     *       }
     *     }
     *
     * Effects are called from `_propertiesChanged` in the following order by
     * type:
     *
     * 1. COMPUTE
     * 2. PROPAGATE
     * 3. REFLECT
     * 4. OBSERVE
     * 5. NOTIFY
     *
     * Effect functions are called with the following signature:
     *
     *     effectFunction(inst, path, props, oldProps, info, hasPaths)
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     * @nocollapse
     */
    static addPropertyEffect(r, s, n) {
      this.prototype._addPropertyEffect(r, s, n);
    }
    /**
     * Creates a single-property observer for the given property.
     *
     * @param {string} property Property name
     * @param {string|function(*,*)} method Function or name of observer method to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @return {void}
     * @protected
     * @nocollapse
     */
    static createPropertyObserver(r, s, n) {
      this.prototype._createPropertyObserver(r, s, n);
    }
    /**
     * Creates a multi-property "method observer" based on the provided
     * expression, which should be a string in the form of a normal JavaScript
     * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
     * should correspond to a property or path in the context of this
     * prototype (or instance), or may be a literal string or number.
     *
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     * @return {void}
     *   whether method names should be included as a dependency to the effect.
     * @protected
     * @nocollapse
     */
    static createMethodObserver(r, s) {
      this.prototype._createMethodObserver(r, s);
    }
    /**
     * Causes the setter for the given property to dispatch `<property>-changed`
     * events to notify of changes to the property.
     *
     * @param {string} property Property name
     * @return {void}
     * @protected
     * @nocollapse
     */
    static createNotifyingProperty(r) {
      this.prototype._createNotifyingProperty(r);
    }
    /**
     * Creates a read-only accessor for the given property.
     *
     * To set the property, use the protected `_setProperty` API.
     * To create a custom protected setter (e.g. `_setMyProp()` for
     * property `myProp`), pass `true` for `protectedSetter`.
     *
     * Note, if the property will have other property effects, this method
     * should be called first, before adding other effects.
     *
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @return {void}
     * @protected
     * @nocollapse
     */
    static createReadOnlyProperty(r, s) {
      this.prototype._createReadOnlyProperty(r, s);
    }
    /**
     * Causes the setter for the given property to reflect the property value
     * to a (dash-cased) attribute of the same name.
     *
     * @param {string} property Property name
     * @return {void}
     * @protected
     * @nocollapse
     */
    static createReflectedProperty(r) {
      this.prototype._createReflectedProperty(r);
    }
    /**
     * Creates a computed property whose value is set to the result of the
     * method described by the given `expression` each time one or more
     * arguments to the method changes.  The expression should be a string
     * in the form of a normal JavaScript function signature:
     * `'methodName(arg1, [..., argn])'`
     *
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
     *   method names should be included as a dependency to the effect.
     * @return {void}
     * @protected
     * @nocollapse
     */
    static createComputedProperty(r, s, n) {
      this.prototype._createComputedProperty(r, s, n);
    }
    /**
     * Parses the provided template to ensure binding effects are created
     * for them, and then ensures property accessors are created for any
     * dependent properties in the template.  Binding effects for bound
     * templates are stored in a linked list on the instance so that
     * templates can be efficiently stamped and unstamped.
     *
     * @param {!HTMLTemplateElement} template Template containing binding
     *   bindings
     * @return {!TemplateInfo} Template metadata object
     * @protected
     * @nocollapse
     */
    static bindTemplate(r) {
      return this.prototype._bindTemplate(r);
    }
    // -- binding ----------------------------------------------
    /*
     * Overview of binding flow:
     *
     * During finalization (`instanceBinding==false`, `wasPreBound==false`):
     *  `_bindTemplate(t, false)` called directly during finalization - parses
     *  the template (for the first time), and then assigns that _prototypical_
     *  template info to `__preboundTemplateInfo` _on the prototype_; note in
     *  this case `wasPreBound` is false; this is the first time we're binding
     *  it, thus we create accessors.
     *
     * During first stamping (`instanceBinding==true`, `wasPreBound==true`):
     *   `_stampTemplate` calls `_bindTemplate(t, true)`: the `templateInfo`
     *   returned matches the prebound one, and so this is `wasPreBound == true`
     *   state; thus we _skip_ creating accessors, but _do_ create an instance
     *   of the template info to serve as the start of our linked list (needs to
     *   be an instance, not the prototypical one, so that we can add `nodeList`
     *   to it to contain the `nodeInfo`-ordered list of instance nodes for
     *   bindings, and so we can chain runtime-stamped template infos off of
     *   it). At this point, the call to `_stampTemplate` calls
     *   `applyTemplateInfo` for each nested `<template>` found during parsing
     *   to hand prototypical `_templateInfo` to them; we also pass the _parent_
     *   `templateInfo` to the `<template>` so that we have the instance-time
     *   parent to link the `templateInfo` under in the case it was
     *   runtime-stamped.
     *
     * During subsequent runtime stamping (`instanceBinding==true`,
     *   `wasPreBound==false`): `_stampTemplate` calls `_bindTemplate(t, true)`
     *   - here `templateInfo` is guaranteed to _not_ match the prebound one,
     *   because it was either a different template altogether, or even if it
     *   was the same template, the step above created a instance of the info;
     *   in this case `wasPreBound == false`, so we _do_ create accessors, _and_
     *   link a instance into the linked list.
     */
    /**
     * Equivalent to static `bindTemplate` API but can be called on an instance
     * to add effects at runtime.  See that method for full API docs.
     *
     * This method may be called on the prototype (for prototypical template
     * binding, to avoid creating accessors every instance) once per prototype,
     * and will be called with `runtimeBinding: true` by `_stampTemplate` to
     * create and link an instance of the template metadata associated with a
     * particular stamping.
     *
     * @override
     * @param {!HTMLTemplateElement} template Template containing binding
     * bindings
     * @param {boolean=} instanceBinding When false (default), performs
     * "prototypical" binding of the template and overwrites any previously
     * bound template for the class. When true (as passed from
     * `_stampTemplate`), the template info is instanced and linked into the
     * list of bound templates.
     * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
     * this is an instance of the prototypical template info
     * @protected
     * @suppress {missingProperties} go/missingfnprops
     */
    _bindTemplate(r, s) {
      let n = this.constructor._parseTemplate(r), a = this.__preBoundTemplateInfo == n;
      if (!a)
        for (let l in n.propertyEffects)
          this._createPropertyAccessor(l);
      if (s)
        if (n = /** @type {!TemplateInfo} */
        Object.create(n), n.wasPreBound = a, !this.__templateInfo)
          this.__templateInfo = n;
        else {
          const l = r._parentTemplateInfo || this.__templateInfo, d = l.lastChild;
          n.parent = l, l.lastChild = n, n.previousSibling = d, d ? d.nextSibling = n : l.firstChild = n;
        }
      else
        this.__preBoundTemplateInfo = n;
      return n;
    }
    /**
     * Adds a property effect to the given template metadata, which is run
     * at the "propagate" stage of `_propertiesChanged` when the template
     * has been bound to the element via `_bindTemplate`.
     *
     * The `effect` object should match the format in `_addPropertyEffect`.
     *
     * @param {Object} templateInfo Template metadata to add effect to
     * @param {string} prop Property that should trigger the effect
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     * @nocollapse
     */
    static _addTemplatePropertyEffect(r, s, n) {
      let a = r.hostProps = r.hostProps || {};
      a[s] = !0;
      let l = r.propertyEffects = r.propertyEffects || {};
      (l[s] = l[s] || []).push(n);
    }
    /**
     * Stamps the provided template and performs instance-time setup for
     * Polymer template features, including data bindings, declarative event
     * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
     * is returned containing the stamped DOM, ready for insertion into the
     * DOM.
     *
     * This method may be called more than once; however note that due to
     * `shadycss` polyfill limitations, only styles from templates prepared
     * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
     * to the shadow root and support CSS custom properties), and note that
     * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
     * any styles required by in runtime-stamped templates must be included
     * in the main element template.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @param {TemplateInfo=} templateInfo Optional bound template info associated
     *   with the template to be stamped; if omitted the template will be
     *   automatically bound.
     * @return {!StampedTemplate} Cloned template content
     * @override
     * @protected
     */
    _stampTemplate(r, s) {
      s = s || /** @type {!TemplateInfo} */
      this._bindTemplate(r, !0), xe.push(this);
      let n = super._stampTemplate(r, s);
      if (xe.pop(), s.nodeList = n.nodeList, !s.wasPreBound) {
        let a = s.childNodes = [];
        for (let l = n.firstChild; l; l = l.nextSibling)
          a.push(l);
      }
      return n.templateInfo = s, Cn(this, s), this.__dataClientsReady && (this._runEffectsForTemplate(s, this.__data, null, !1), this._flushClients()), n;
    }
    /**
     * Removes and unbinds the nodes previously contained in the provided
     * DocumentFragment returned from `_stampTemplate`.
     *
     * @override
     * @param {!StampedTemplate} dom DocumentFragment previously returned
     *   from `_stampTemplate` associated with the nodes to be removed
     * @return {void}
     * @protected
     */
    _removeBoundDom(r) {
      const s = r.templateInfo, { previousSibling: n, nextSibling: a, parent: l } = s;
      n ? n.nextSibling = a : l && (l.firstChild = a), a ? a.previousSibling = n : l && (l.lastChild = n), s.nextSibling = s.previousSibling = null;
      let d = s.childNodes;
      for (let c = 0; c < d.length; c++) {
        let u = d[c];
        K(K(u).parentNode).removeChild(u);
      }
    }
    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */
    static _parseTemplateNode(r, s, n) {
      let a = t._parseTemplateNode.call(
        this,
        r,
        s,
        n
      );
      if (r.nodeType === Node.TEXT_NODE) {
        let l = this._parseBindings(r.textContent, s);
        l && (r.textContent = oo(l) || " ", Ot(this, s, n, "text", "textContent", l), a = !0);
      }
      return a;
    }
    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from attributes.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @param {Element} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @param {string} name Attribute name
     * @param {string} value Attribute value
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */
    static _parseTemplateNodeAttribute(r, s, n, a, l) {
      let d = this._parseBindings(l, s);
      if (d) {
        let c = a, u = "property";
        nn.test(a) ? u = "attribute" : a[a.length - 1] == "$" && (a = a.slice(0, -1), u = "attribute");
        let h = oo(d);
        return h && u == "attribute" && (a == "class" && r.hasAttribute("class") && (h += " " + r.getAttribute(a)), r.setAttribute(a, h)), u == "attribute" && c == "disable-upgrade$" && r.setAttribute(a, ""), r.localName === "input" && c === "value" && r.setAttribute(c, ""), r.removeAttribute(c), u === "property" && (a = Ro(a)), Ot(this, s, n, u, a, d, h), !0;
      } else
        return t._parseTemplateNodeAttribute.call(
          this,
          r,
          s,
          n,
          a,
          l
        );
    }
    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * binding the properties that a nested template depends on to the template
     * as `_host_<property>`.
     *
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */
    static _parseTemplateNestedTemplate(r, s, n) {
      let a = t._parseTemplateNestedTemplate.call(
        this,
        r,
        s,
        n
      );
      const l = r.parentNode, d = n.templateInfo, c = l.localName === "dom-if", u = l.localName === "dom-repeat";
      ji && (c || u) && (l.removeChild(r), n = n.parentInfo, n.templateInfo = d, n.noted = !0, a = !1);
      let h = d.hostProps;
      if (Ss && c)
        h && (s.hostProps = Object.assign(s.hostProps || {}, h), ji || (n.parentInfo.noted = !0));
      else {
        let f = "{";
        for (let _ in h) {
          let T = [{ mode: f, source: _, dependencies: [_], hostProp: !0 }];
          Ot(this, s, n, "property", "_host_" + _, T);
        }
      }
      return a;
    }
    /**
     * Called to parse text in a template (either attribute values or
     * textContent) into binding metadata.
     *
     * Any overrides of this method should return an array of binding part
     * metadata  representing one or more bindings found in the provided text
     * and any "literal" text in between.  Any non-literal parts will be passed
     * to `_evaluateBinding` when any dependencies change.  The only required
     * fields of each "part" in the returned array are as follows:
     *
     * - `dependencies` - Array containing trigger metadata for each property
     *   that should trigger the binding to update
     * - `literal` - String containing text if the part represents a literal;
     *   in this case no `dependencies` are needed
     *
     * Additional metadata for use by `_evaluateBinding` may be provided in
     * each part object as needed.
     *
     * The default implementation handles the following types of bindings
     * (one or more may be intermixed with literal strings):
     * - Property binding: `[[prop]]`
     * - Path binding: `[[object.prop]]`
     * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
     * - Two-way property or path bindings (supports negation):
     *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
     * - Inline computed method (supports negation):
     *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
     *
     * The default implementation uses a regular expression for best
     * performance. However, the regular expression uses a white-list of
     * allowed characters in a data-binding, which causes problems for
     * data-bindings that do use characters not in this white-list.
     *
     * Instead of updating the white-list with all allowed characters,
     * there is a StrictBindingParser (see lib/mixins/strict-binding-parser)
     * that uses a state machine instead. This state machine is able to handle
     * all characters. However, it is slightly less performant, therefore we
     * extracted it into a separate optional mixin.
     *
     * @param {string} text Text to parse from attribute or textContent
     * @param {Object} templateInfo Current template metadata
     * @return {Array<!BindingPart>} Array of binding part metadata
     * @protected
     * @nocollapse
     */
    static _parseBindings(r, s) {
      let n = [], a = 0, l;
      for (; (l = io.exec(r)) !== null; ) {
        l.index > a && n.push({ literal: r.slice(a, l.index) });
        let d = l[1][0], c = !!l[2], u = l[3].trim(), h = !1, f = "", _ = -1;
        d == "{" && (_ = u.indexOf("::")) > 0 && (f = u.substring(_ + 2), u = u.substring(0, _), h = !0);
        let T = Nt(u), S = [];
        if (T) {
          let { args: A, methodName: w } = T;
          for (let ge = 0; ge < A.length; ge++) {
            let V = A[ge];
            V.literal || S.push(V);
          }
          let B = s.dynamicFns;
          (B && B[w] || T.static) && (S.push(w), T.dynamicFn = !0);
        } else
          S.push(u);
        n.push({
          source: u,
          mode: d,
          negate: c,
          customEvent: h,
          signature: T,
          dependencies: S,
          event: f
        }), a = io.lastIndex;
      }
      if (a && a < r.length) {
        let d = r.substring(a);
        d && n.push({
          literal: d
        });
      }
      return n.length ? n : null;
    }
    /**
     * Called to evaluate a previously parsed binding part based on a set of
     * one or more changed dependencies.
     *
     * @param {!Polymer_PropertyEffects} inst Element that should be used as
     *     scope for binding dependencies
     * @param {BindingPart} part Binding part metadata
     * @param {string} path Property/path that triggered this effect
     * @param {Object} props Bag of current property changes
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @return {*} Value the binding part evaluated to
     * @protected
     * @nocollapse
     */
    static _evaluateBinding(r, s, n, a, l, d) {
      let c;
      return s.signature ? c = Yt(r, n, a, l, s.signature) : n != s.source ? c = O(r, s.source) : d && Wt(n) ? c = O(r, n) : c = r.__data[n], s.negate && (c = !c), c;
    }
  }
  return e;
}), xe = [];
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function Hn(i) {
  const t = {};
  for (let e in i) {
    const o = i[e];
    t[e] = typeof o == "function" ? { type: o } : o;
  }
  return t;
}
const Un = C((i) => {
  const t = Bo(i);
  function e(s) {
    const n = Object.getPrototypeOf(s);
    return n.prototype instanceof r ? (
      /** @type {!PropertiesMixinConstructor} */
      n
    ) : null;
  }
  function o(s) {
    if (!s.hasOwnProperty(JSCompiler_renameProperty("__ownProperties", s))) {
      let n = null;
      if (s.hasOwnProperty(JSCompiler_renameProperty("properties", s))) {
        const a = s.properties;
        a && (n = Hn(a));
      }
      s.__ownProperties = n;
    }
    return s.__ownProperties;
  }
  class r extends t {
    /**
     * Implements standard custom elements getter to observes the attributes
     * listed in `properties`.
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */
    static get observedAttributes() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes", this))) {
        this.prototype;
        const n = this._properties;
        this.__observedAttributes = n ? Object.keys(n).map((a) => this.prototype._addPropertyToAttributeMap(a)) : [];
      }
      return this.__observedAttributes;
    }
    /**
     * Finalizes an element definition, including ensuring any super classes
     * are also finalized. This includes ensuring property
     * accessors exist on the element prototype. This method calls
     * `_finalizeClass` to finalize each constructor in the prototype chain.
     * @return {void}
     * @nocollapse
     */
    static finalize() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("__finalized", this))) {
        const n = e(
          /** @type {!PropertiesMixinConstructor} */
          this
        );
        n && n.finalize(), this.__finalized = !0, this._finalizeClass();
      }
    }
    /**
     * Finalize an element class. This includes ensuring property
     * accessors exist on the element prototype. This method is called by
     * `finalize` and finalizes the class constructor.
     *
     * @protected
     * @nocollapse
     */
    static _finalizeClass() {
      const n = o(
        /** @type {!PropertiesMixinConstructor} */
        this
      );
      n && this.createProperties(n);
    }
    /**
     * Returns a memoized version of all properties, including those inherited
     * from super classes. Properties not in object format are converted to
     * at least {type}.
     *
     * @return {Object} Object containing properties for this class
     * @protected
     * @nocollapse
     */
    static get _properties() {
      if (!this.hasOwnProperty(
        JSCompiler_renameProperty("__properties", this)
      )) {
        const n = e(
          /** @type {!PropertiesMixinConstructor} */
          this
        );
        this.__properties = Object.assign(
          {},
          n && n._properties,
          o(
            /** @type {PropertiesMixinConstructor} */
            this
          )
        );
      }
      return this.__properties;
    }
    /**
     * Overrides `PropertiesChanged` method to return type specified in the
     * static `properties` object for the given property.
     * @param {string} name Name of property
     * @return {*} Type to which to deserialize attribute
     *
     * @protected
     * @nocollapse
     */
    static typeForProperty(n) {
      const a = this._properties[n];
      return a && a.type;
    }
    /**
     * Overrides `PropertiesChanged` method and adds a call to
     * `finalize` which lazily configures the element's property accessors.
     * @override
     * @return {void}
     */
    _initializeProperties() {
      this.constructor.finalize(), super._initializeProperties();
    }
    /**
     * Called when the element is added to a document.
     * Calls `_enableProperties` to turn on property system from
     * `PropertiesChanged`.
     * @suppress {missingProperties} Super may or may not implement the callback
     * @return {void}
     * @override
     */
    connectedCallback() {
      super.connectedCallback && super.connectedCallback(), this._enableProperties();
    }
    /**
     * Called when the element is removed from a document
     * @suppress {missingProperties} Super may or may not implement the callback
     * @return {void}
     * @override
     */
    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback();
    }
  }
  return r;
});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
const Vn = "3.5.2", so = window.ShadyCSS && window.ShadyCSS.cssBuild, jn = C((i) => {
  const t = Un(Fn(i));
  function e(l) {
    if (!l.hasOwnProperty(
      JSCompiler_renameProperty("__propertyDefaults", l)
    )) {
      l.__propertyDefaults = null;
      let d = l._properties;
      for (let c in d) {
        let u = d[c];
        "value" in u && (l.__propertyDefaults = l.__propertyDefaults || {}, l.__propertyDefaults[c] = u);
      }
    }
    return l.__propertyDefaults;
  }
  function o(l) {
    return l.hasOwnProperty(
      JSCompiler_renameProperty("__ownObservers", l)
    ) || (l.__ownObservers = l.hasOwnProperty(
      JSCompiler_renameProperty("observers", l)
    ) ? (
      /** @type {PolymerElementConstructor} */
      l.observers
    ) : null), l.__ownObservers;
  }
  function r(l, d, c, u) {
    c.computed && (c.readOnly = !0), c.computed && (l._hasReadOnlyEffect(d) ? console.warn(`Cannot redefine computed property '${d}'.`) : l._createComputedProperty(d, c.computed, u)), c.readOnly && !l._hasReadOnlyEffect(d) ? l._createReadOnlyProperty(d, !c.computed) : c.readOnly === !1 && l._hasReadOnlyEffect(d) && console.warn(`Cannot make readOnly property '${d}' non-readOnly.`), c.reflectToAttribute && !l._hasReflectEffect(d) ? l._createReflectedProperty(d) : c.reflectToAttribute === !1 && l._hasReflectEffect(d) && console.warn(`Cannot make reflected property '${d}' non-reflected.`), c.notify && !l._hasNotifyEffect(d) ? l._createNotifyingProperty(d) : c.notify === !1 && l._hasNotifyEffect(d) && console.warn(`Cannot make notify property '${d}' non-notify.`), c.observer && l._createPropertyObserver(d, c.observer, u[c.observer]), l._addPropertyToAttributeMap(d);
  }
  function s(l, d, c, u) {
    if (!so) {
      const h = d.content.querySelectorAll("style"), f = zo(d), _ = $s(c), T = d.content.firstElementChild;
      for (let A = 0; A < _.length; A++) {
        let w = _[A];
        w.textContent = l._processStyleText(w.textContent, u), d.content.insertBefore(w, T);
      }
      let S = 0;
      for (let A = 0; A < f.length; A++) {
        let w = f[A], B = h[S];
        B !== w ? (w = w.cloneNode(!0), B.parentNode.insertBefore(w, B)) : S++, w.textContent = l._processStyleText(w.textContent, u);
      }
    }
    if (window.ShadyCSS && window.ShadyCSS.prepareTemplate(d, c), Os && so && ws) {
      const h = d.content.querySelectorAll("style");
      if (h) {
        let f = "";
        Array.from(h).forEach((_) => {
          f += _.textContent, _.parentNode.removeChild(_);
        }), l._styleSheet = new CSSStyleSheet(), l._styleSheet.replaceSync(f);
      }
    }
  }
  function n(l) {
    let d = null;
    if (l && (!jt || As) && (d = /** @type {?HTMLTemplateElement} */
    Ne.import(l, "template"), jt && !d))
      throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${l}`);
    return d;
  }
  class a extends t {
    /**
     * Current Polymer version in Semver notation.
     * @type {string} Semver notation of the current version of Polymer.
     * @nocollapse
     */
    static get polymerElementVersion() {
      return Vn;
    }
    /**
     * Override of PropertiesMixin _finalizeClass to create observers and
     * find the template.
     * @return {void}
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */
    static _finalizeClass() {
      t._finalizeClass.call(this);
      const d = o(this);
      d && this.createObservers(d, this._properties), this._prepareTemplate();
    }
    /** @nocollapse */
    static _prepareTemplate() {
      let d = (
        /** @type {PolymerElementConstructor} */
        this.template
      );
      d && (typeof d == "string" ? (console.error("template getter must return HTMLTemplateElement"), d = null) : Es || (d = d.cloneNode(!0))), this.prototype._template = d;
    }
    /**
     * Override of PropertiesChanged createProperties to create accessors
     * and property effects for all of the properties.
     * @param {!Object} props .
     * @return {void}
     * @protected
     * @nocollapse
     */
    static createProperties(d) {
      for (let c in d)
        r(
          /** @type {?} */
          this.prototype,
          c,
          d[c],
          d
        );
    }
    /**
     * Creates observers for the given `observers` array.
     * Leverages `PropertyEffects` to create observers.
     * @param {Object} observers Array of observer descriptors for
     *   this class
     * @param {Object} dynamicFns Object containing keys for any properties
     *   that are functions and should trigger the effect when the function
     *   reference is changed
     * @return {void}
     * @protected
     * @nocollapse
     */
    static createObservers(d, c) {
      const u = this.prototype;
      for (let h = 0; h < d.length; h++)
        u._createMethodObserver(d[h], c);
    }
    /**
     * Returns the template that will be stamped into this element's shadow root.
     *
     * If a `static get is()` getter is defined, the default implementation will
     * return the first `<template>` in a `dom-module` whose `id` matches this
     * element's `is` (note that a `_template` property on the class prototype
     * takes precedence over the `dom-module` template, to maintain legacy
     * element semantics; a subclass will subsequently fall back to its super
     * class template if neither a `prototype._template` or a `dom-module` for
     * the class's `is` was found).
     *
     * Users may override this getter to return an arbitrary template
     * (in which case the `is` getter is unnecessary). The template returned
     * must be an `HTMLTemplateElement`.
     *
     * Note that when subclassing, if the super class overrode the default
     * implementation and the subclass would like to provide an alternate
     * template via a `dom-module`, it should override this getter and
     * return `DomModule.import(this.is, 'template')`.
     *
     * If a subclass would like to modify the super class template, it should
     * clone it rather than modify it in place.  If the getter does expensive
     * work such as cloning/modifying a template, it should memoize the
     * template for maximum performance:
     *
     *   let memoizedTemplate;
     *   class MySubClass extends MySuperClass {
     *     static get template() {
     *       if (!memoizedTemplate) {
     *         memoizedTemplate = super.template.cloneNode(true);
     *         let subContent = document.createElement('div');
     *         subContent.textContent = 'This came from MySubClass';
     *         memoizedTemplate.content.appendChild(subContent);
     *       }
     *       return memoizedTemplate;
     *     }
     *   }
     *
     * @return {!HTMLTemplateElement|string} Template to be stamped
     * @nocollapse
     */
    static get template() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("_template", this))) {
        let d = this.prototype.hasOwnProperty(
          JSCompiler_renameProperty("_template", this.prototype)
        ) ? this.prototype._template : void 0;
        typeof d == "function" && (d = d()), this._template = // If user has put template on prototype (e.g. in legacy via registered
        // callback or info object), prefer that first. Note that `null` is
        // used as a sentinel to indicate "no template" and can be used to
        // override a super template, whereas `undefined` is used as a
        // sentinel to mean "fall-back to default template lookup" via
        // dom-module and/or super.template.
        d !== void 0 ? d : (
          // Look in dom-module associated with this element's is
          this.hasOwnProperty(JSCompiler_renameProperty("is", this)) && n(
            /** @type {PolymerElementConstructor}*/
            this.is
          ) || // Next look for superclass template (call the super impl this
          // way so that `this` points to the superclass)
          Object.getPrototypeOf(
            /** @type {PolymerElementConstructor}*/
            this.prototype
          ).constructor.template
        );
      }
      return this._template;
    }
    /**
     * Set the template.
     *
     * @param {!HTMLTemplateElement|string} value Template to set.
     * @nocollapse
     */
    static set template(d) {
      this._template = d;
    }
    /**
     * Path matching the url from which the element was imported.
     *
     * This path is used to resolve url's in template style cssText.
     * The `importPath` property is also set on element instances and can be
     * used to create bindings relative to the import path.
     *
     * For elements defined in ES modules, users should implement
     * `static get importMeta() { return import.meta; }`, and the default
     * implementation of `importPath` will  return `import.meta.url`'s path.
     * For elements defined in HTML imports, this getter will return the path
     * to the document containing a `dom-module` element matching this
     * element's static `is` property.
     *
     * Note, this path should contain a trailing `/`.
     *
     * @return {string} The import path for this element class
     * @suppress {missingProperties}
     * @nocollapse
     */
    static get importPath() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("_importPath", this))) {
        const d = this.importMeta;
        if (d)
          this._importPath = fi(d.url);
        else {
          const c = Ne.import(
            /** @type {PolymerElementConstructor} */
            this.is
          );
          this._importPath = c && c.assetpath || Object.getPrototypeOf(
            /** @type {PolymerElementConstructor}*/
            this.prototype
          ).constructor.importPath;
        }
      }
      return this._importPath;
    }
    constructor() {
      super(), this._template, this._importPath, this.rootPath, this.importPath, this.root, this.$;
    }
    /**
     * Overrides the default `PropertyAccessors` to ensure class
     * metaprogramming related to property accessors and effects has
     * completed (calls `finalize`).
     *
     * It also initializes any property defaults provided via `value` in
     * `properties` metadata.
     *
     * @return {void}
     * @override
     * @suppress {invalidCasts,missingProperties} go/missingfnprops
     */
    _initializeProperties() {
      this.constructor.finalize(), this.constructor._finalizeTemplate(
        /** @type {!HTMLElement} */
        this.localName
      ), super._initializeProperties(), this.rootPath = Cs, this.importPath = this.constructor.importPath;
      let d = e(this.constructor);
      if (d)
        for (let c in d) {
          let u = d[c];
          if (this._canApplyPropertyDefault(c)) {
            let h = typeof u.value == "function" ? u.value.call(this) : u.value;
            this._hasAccessor(c) ? this._setPendingProperty(c, h, !0) : this[c] = h;
          }
        }
    }
    /**
     * Determines if a property dfeault can be applied. For example, this
     * prevents a default from being applied when a property that has no
     * accessor is overridden by its host before upgrade (e.g. via a binding).
     * @override
     * @param {string} property Name of the property
     * @return {boolean} Returns true if the property default can be applied.
     */
    _canApplyPropertyDefault(d) {
      return !this.hasOwnProperty(d);
    }
    /**
     * Gather style text for a style element in the template.
     *
     * @param {string} cssText Text containing styling to process
     * @param {string} baseURI Base URI to rebase CSS paths against
     * @return {string} The processed CSS text
     * @protected
     * @nocollapse
     */
    static _processStyleText(d, c) {
      return pi(d, c);
    }
    /**
    * Configures an element `proto` to function with a given `template`.
    * The element name `is` and extends `ext` must be specified for ShadyCSS
    * style scoping.
    *
    * @param {string} is Tag name (or type extension name) for this element
    * @return {void}
    * @protected
    * @nocollapse
    */
    static _finalizeTemplate(d) {
      const c = this.prototype._template;
      if (c && !c.__polymerFinalized) {
        c.__polymerFinalized = !0;
        const u = this.importPath, h = u ? Pe(u) : "";
        s(this, c, d, h), this.prototype._bindTemplate(c);
      }
    }
    /**
     * Provides a default implementation of the standard Custom Elements
     * `connectedCallback`.
     *
     * The default implementation enables the property effects system and
     * flushes any pending properties, and updates shimmed CSS properties
     * when using the ShadyCSS scoping/custom properties polyfill.
     *
     * @override
     * @suppress {missingProperties, invalidCasts} Super may or may not
     *     implement the callback
     * @return {void}
     */
    connectedCallback() {
      window.ShadyCSS && this._template && window.ShadyCSS.styleElement(
        /** @type {!HTMLElement} */
        this
      ), super.connectedCallback();
    }
    /**
     * Stamps the element template.
     *
     * @return {void}
     * @override
     */
    ready() {
      this._template && (this.root = this._stampTemplate(this._template), this.$ = this.root.$), super.ready();
    }
    /**
     * Implements `PropertyEffects`'s `_readyClients` call. Attaches
     * element dom by calling `_attachDom` with the dom stamped from the
     * element's template via `_stampTemplate`. Note that this allows
     * client dom to be attached to the element prior to any observers
     * running.
     *
     * @return {void}
     * @override
     */
    _readyClients() {
      this._template && (this.root = this._attachDom(
        /** @type {StampedTemplate} */
        this.root
      )), super._readyClients();
    }
    /**
     * Attaches an element's stamped dom to itself. By default,
     * this method creates a `shadowRoot` and adds the dom to it.
     * However, this method may be overridden to allow an element
     * to put its dom in another location.
     *
     * @override
     * @throws {Error}
     * @suppress {missingReturn}
     * @param {StampedTemplate} dom to attach to the element.
     * @return {ShadowRoot} node to which the dom has been attached.
     */
    _attachDom(d) {
      const c = K(this);
      if (c.attachShadow)
        return d ? (c.shadowRoot || (c.attachShadow({ mode: "open", shadyUpgradeFragment: d }), c.shadowRoot.appendChild(d), this.constructor._styleSheet && (c.shadowRoot.adoptedStyleSheets = [this.constructor._styleSheet])), Ps && window.ShadyDOM && window.ShadyDOM.flushInitial(c.shadowRoot), c.shadowRoot) : null;
      throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.");
    }
    /**
     * When using the ShadyCSS scoping and custom property shim, causes all
     * shimmed styles in this element (and its subtree) to be updated
     * based on current custom property values.
     *
     * The optional parameter overrides inline custom property styles with an
     * object of properties where the keys are CSS properties, and the values
     * are strings.
     *
     * Example: `this.updateStyles({'--color': 'blue'})`
     *
     * These properties are retained unless a value of `null` is set.
     *
     * Note: This function does not support updating CSS mixins.
     * You can not dynamically change the value of an `@apply`.
     *
     * @override
     * @param {Object=} properties Bag of custom property key/values to
     *   apply to this element.
     * @return {void}
     * @suppress {invalidCasts}
     */
    updateStyles(d) {
      window.ShadyCSS && window.ShadyCSS.styleSubtree(
        /** @type {!HTMLElement} */
        this,
        d
      );
    }
    /**
     * Rewrites a given URL relative to a base URL. The base URL defaults to
     * the original location of the document containing the `dom-module` for
     * this element. This method will return the same URL before and after
     * bundling.
     *
     * Note that this function performs no resolution for URLs that start
     * with `/` (absolute URLs) or `#` (hash identifiers).  For general purpose
     * URL resolution, use `window.URL`.
     *
     * @override
     * @param {string} url URL to resolve.
     * @param {string=} base Optional base URL to resolve against, defaults
     * to the element's `importPath`
     * @return {string} Rewritten URL relative to base
     */
    resolveUrl(d, c) {
      return !c && this.importPath && (c = Pe(this.importPath)), Pe(d, c);
    }
    /**
     * Overrides `PropertyEffects` to add map of dynamic functions on
     * template info, for consumption by `PropertyEffects` template binding
     * code. This map determines which method templates should have accessors
     * created for them.
     *
     * @param {!HTMLTemplateElement} template Template
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} .
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */
    static _parseTemplateContent(d, c, u) {
      return c.dynamicFns = c.dynamicFns || this._properties, t._parseTemplateContent.call(
        this,
        d,
        c,
        u
      );
    }
    /**
     * Overrides `PropertyEffects` to warn on use of undeclared properties in
     * template.
     *
     * @param {Object} templateInfo Template metadata to add effect to
     * @param {string} prop Property that should trigger the effect
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */
    static _addTemplatePropertyEffect(d, c, u) {
      return ks && !(c in this._properties) && // Methods used in templates with no dependencies (or only literal
      // dependencies) become accessors with template effects; ignore these
      !(u.info.part.signature && u.info.part.signature.static) && // Warnings for bindings added to nested templates are handled by
      // templatizer so ignore both the host-to-template bindings
      // (`hostProp`) and TemplateInstance-to-child bindings
      // (`nestedTemplate`)
      !u.info.part.hostProp && !d.nestedTemplate && console.warn(`Property '${c}' used in template but not declared in 'properties'; attribute will not be observed.`), t._addTemplatePropertyEffect.call(
        this,
        d,
        c,
        u
      );
    }
  }
  return a;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const no = window.trustedTypes && trustedTypes.createPolicy("polymer-html-literal", { createHTML: (i) => i });
class Yo {
  /**
   * @param {!ITemplateArray} strings Constant parts of tagged template literal
   * @param {!Array<*>} values Variable parts of tagged template literal
   */
  constructor(t, e) {
    Jo(t, e);
    const o = e.reduce(
      (r, s, n) => r + Go(s) + t[n + 1],
      t[0]
    );
    this.value = o.toString();
  }
  /**
   * @return {string} LiteralString string value
   * @override
   */
  toString() {
    return this.value;
  }
}
function Go(i) {
  if (i instanceof Yo)
    return (
      /** @type {!LiteralString} */
      i.value
    );
  throw new Error(
    `non-literal value passed to Polymer's htmlLiteral function: ${i}`
  );
}
function qn(i) {
  if (i instanceof HTMLTemplateElement)
    return (
      /** @type {!HTMLTemplateElement } */
      i.innerHTML
    );
  if (i instanceof Yo)
    return Go(i);
  throw new Error(
    `non-template value passed to Polymer's html function: ${i}`
  );
}
const y = function(t, ...e) {
  Jo(t, e);
  const o = (
    /** @type {!HTMLTemplateElement} */
    document.createElement("template")
  );
  let r = e.reduce(
    (s, n, a) => s + qn(n) + t[a + 1],
    t[0]
  );
  return no && (r = no.createHTML(r)), o.innerHTML = r, o;
}, Jo = (i, t) => {
  if (!Array.isArray(i) || !Array.isArray(i.raw) || t.length !== i.length - 1)
    throw new TypeError("Invalid call to the html template tag");
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const x = jn(HTMLElement), Wn = /\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i, Je = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;
function Kn() {
  function i() {
    return !0;
  }
  return Zo(i);
}
function Yn() {
  try {
    return Gn() ? !0 : Jn() ? Je ? !Zn() : !Kn() : !1;
  } catch {
    return !1;
  }
}
function Gn() {
  return localStorage.getItem("vaadin.developmentmode.force");
}
function Jn() {
  return ["localhost", "127.0.0.1"].indexOf(window.location.hostname) >= 0;
}
function Zn() {
  return !!(Je && Object.keys(Je).map((t) => Je[t]).filter((t) => t.productionMode).length > 0);
}
function Zo(i, t) {
  if (typeof i != "function")
    return;
  const e = Wn.exec(i.toString());
  if (e)
    try {
      i = new Function(e[1]);
    } catch (o) {
      console.log("vaadin-development-mode-detector: uncommentAndRun() failed", o);
    }
  return i(t);
}
window.Vaadin = window.Vaadin || {};
const ao = function(i, t) {
  if (window.Vaadin.developmentMode)
    return Zo(i, t);
};
window.Vaadin.developmentMode === void 0 && (window.Vaadin.developmentMode = Yn());
function Qn() {
  /*! vaadin-dev-mode:start
    (function () {
  'use strict';
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  
  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  
  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  
  var getPolymerVersion = function getPolymerVersion() {
    return window.Polymer && window.Polymer.version;
  };
  
  var StatisticsGatherer = function () {
    function StatisticsGatherer(logger) {
      classCallCheck(this, StatisticsGatherer);
  
      this.now = new Date().getTime();
      this.logger = logger;
    }
  
    createClass(StatisticsGatherer, [{
      key: 'frameworkVersionDetectors',
      value: function frameworkVersionDetectors() {
        return {
          'Flow': function Flow() {
            if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
              var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
                return window.Vaadin.Flow.clients[key];
              }).filter(function (client) {
                return client.getVersionInfo;
              }).map(function (client) {
                return client.getVersionInfo().flow;
              });
              if (flowVersions.length > 0) {
                return flowVersions[0];
              }
            }
          },
          'Vaadin Framework': function VaadinFramework() {
            if (window.vaadin && window.vaadin.clients) {
              var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
                return client.getVersionInfo;
              }).map(function (client) {
                return client.getVersionInfo().vaadinVersion;
              });
              if (frameworkVersions.length > 0) {
                return frameworkVersions[0];
              }
            }
          },
          'AngularJs': function AngularJs() {
            if (window.angular && window.angular.version && window.angular.version) {
              return window.angular.version.full;
            }
          },
          'Angular': function Angular() {
            if (window.ng) {
              var tags = document.querySelectorAll("[ng-version]");
              if (tags.length > 0) {
                return tags[0].getAttribute("ng-version");
              }
              return "Unknown";
            }
          },
          'Backbone.js': function BackboneJs() {
            if (window.Backbone) {
              return window.Backbone.VERSION;
            }
          },
          'React': function React() {
            var reactSelector = '[data-reactroot], [data-reactid]';
            if (!!document.querySelector(reactSelector)) {
              // React does not publish the version by default
              return "unknown";
            }
          },
          'Ember': function Ember() {
            if (window.Em && window.Em.VERSION) {
              return window.Em.VERSION;
            } else if (window.Ember && window.Ember.VERSION) {
              return window.Ember.VERSION;
            }
          },
          'jQuery': function (_jQuery) {
            function jQuery() {
              return _jQuery.apply(this, arguments);
            }
  
            jQuery.toString = function () {
              return _jQuery.toString();
            };
  
            return jQuery;
          }(function () {
            if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
              return jQuery.prototype.jquery;
            }
          }),
          'Polymer': function Polymer() {
            var version = getPolymerVersion();
            if (version) {
              return version;
            }
          },
          'LitElement': function LitElement() {
            var version = window.litElementVersions && window.litElementVersions[0];
            if (version) {
              return version;
            }
          },
          'LitHtml': function LitHtml() {
            var version = window.litHtmlVersions && window.litHtmlVersions[0];
            if (version) {
              return version;
            }
          },
          'Vue.js': function VueJs() {
            if (window.Vue) {
              return window.Vue.version;
            }
          }
        };
      }
    }, {
      key: 'getUsedVaadinElements',
      value: function getUsedVaadinElements(elements) {
        var version = getPolymerVersion();
        var elementClasses = void 0;
        // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
        // Check all locations calling the method getEntries() in
        // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
        // Currently it is only used by BootstrapHandler.
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: components classes are stored in window.Vaadin
          elementClasses = Object.keys(window.Vaadin).map(function (c) {
            return window.Vaadin[c];
          }).filter(function (c) {
            return c.is;
          });
        } else {
          // Polymer 3: components classes are stored in window.Vaadin.registrations
          elementClasses = window.Vaadin.registrations || [];
        }
        elementClasses.forEach(function (klass) {
          var version = klass.version ? klass.version : "0.0.0";
          elements[klass.is] = { version: version };
        });
      }
    }, {
      key: 'getUsedVaadinThemes',
      value: function getUsedVaadinThemes(themes) {
        ['Lumo', 'Material'].forEach(function (themeName) {
          var theme;
          var version = getPolymerVersion();
          if (version && version.indexOf('2') === 0) {
            // Polymer 2: themes are stored in window.Vaadin
            theme = window.Vaadin[themeName];
          } else {
            // Polymer 3: themes are stored in custom element registry
            theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
          }
          if (theme && theme.version) {
            themes[themeName] = { version: theme.version };
          }
        });
      }
    }, {
      key: 'getFrameworks',
      value: function getFrameworks(frameworks) {
        var detectors = this.frameworkVersionDetectors();
        Object.keys(detectors).forEach(function (framework) {
          var detector = detectors[framework];
          try {
            var version = detector();
            if (version) {
              frameworks[framework] = { version: version };
            }
          } catch (e) {}
        });
      }
    }, {
      key: 'gather',
      value: function gather(storage) {
        var storedStats = storage.read();
        var gatheredStats = {};
        var types = ["elements", "frameworks", "themes"];
  
        types.forEach(function (type) {
          gatheredStats[type] = {};
          if (!storedStats[type]) {
            storedStats[type] = {};
          }
        });
  
        var previousStats = JSON.stringify(storedStats);
  
        this.getUsedVaadinElements(gatheredStats.elements);
        this.getFrameworks(gatheredStats.frameworks);
        this.getUsedVaadinThemes(gatheredStats.themes);
  
        var now = this.now;
        types.forEach(function (type) {
          var keys = Object.keys(gatheredStats[type]);
          keys.forEach(function (key) {
            if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
              storedStats[type][key] = { firstUsed: now };
            }
            // Discards any previously logged version number
            storedStats[type][key].version = gatheredStats[type][key].version;
            storedStats[type][key].lastUsed = now;
          });
        });
  
        var newStats = JSON.stringify(storedStats);
        storage.write(newStats);
        if (newStats != previousStats && Object.keys(storedStats).length > 0) {
          this.logger.debug("New stats: " + newStats);
        }
      }
    }]);
    return StatisticsGatherer;
  }();
  
  var StatisticsStorage = function () {
    function StatisticsStorage(key) {
      classCallCheck(this, StatisticsStorage);
  
      this.key = key;
    }
  
    createClass(StatisticsStorage, [{
      key: 'read',
      value: function read() {
        var localStorageStatsString = localStorage.getItem(this.key);
        try {
          return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
        } catch (e) {
          return {};
        }
      }
    }, {
      key: 'write',
      value: function write(data) {
        localStorage.setItem(this.key, data);
      }
    }, {
      key: 'clear',
      value: function clear() {
        localStorage.removeItem(this.key);
      }
    }, {
      key: 'isEmpty',
      value: function isEmpty() {
        var storedStats = this.read();
        var empty = true;
        Object.keys(storedStats).forEach(function (key) {
          if (Object.keys(storedStats[key]).length > 0) {
            empty = false;
          }
        });
  
        return empty;
      }
    }]);
    return StatisticsStorage;
  }();
  
  var StatisticsSender = function () {
    function StatisticsSender(url, logger) {
      classCallCheck(this, StatisticsSender);
  
      this.url = url;
      this.logger = logger;
    }
  
    createClass(StatisticsSender, [{
      key: 'send',
      value: function send(data, errorHandler) {
        var logger = this.logger;
  
        if (navigator.onLine === false) {
          logger.debug("Offline, can't send");
          errorHandler();
          return;
        }
        logger.debug("Sending data to " + this.url);
  
        var req = new XMLHttpRequest();
        req.withCredentials = true;
        req.addEventListener("load", function () {
          // Stats sent, nothing more to do
          logger.debug("Response: " + req.responseText);
        });
        req.addEventListener("error", function () {
          logger.debug("Send failed");
          errorHandler();
        });
        req.addEventListener("abort", function () {
          logger.debug("Send aborted");
          errorHandler();
        });
        req.open("POST", this.url);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(data);
      }
    }]);
    return StatisticsSender;
  }();
  
  var StatisticsLogger = function () {
    function StatisticsLogger(id) {
      classCallCheck(this, StatisticsLogger);
  
      this.id = id;
    }
  
    createClass(StatisticsLogger, [{
      key: '_isDebug',
      value: function _isDebug() {
        return localStorage.getItem("vaadin." + this.id + ".debug");
      }
    }, {
      key: 'debug',
      value: function debug(msg) {
        if (this._isDebug()) {
          console.info(this.id + ": " + msg);
        }
      }
    }]);
    return StatisticsLogger;
  }();
  
  var UsageStatistics = function () {
    function UsageStatistics() {
      classCallCheck(this, UsageStatistics);
  
      this.now = new Date();
      this.timeNow = this.now.getTime();
      this.gatherDelay = 10; // Delay between loading this file and gathering stats
      this.initialDelay = 24 * 60 * 60;
  
      this.logger = new StatisticsLogger("statistics");
      this.storage = new StatisticsStorage("vaadin.statistics.basket");
      this.gatherer = new StatisticsGatherer(this.logger);
      this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
    }
  
    createClass(UsageStatistics, [{
      key: 'maybeGatherAndSend',
      value: function maybeGatherAndSend() {
        var _this = this;
  
        if (localStorage.getItem(UsageStatistics.optOutKey)) {
          return;
        }
        this.gatherer.gather(this.storage);
        setTimeout(function () {
          _this.maybeSend();
        }, this.gatherDelay * 1000);
      }
    }, {
      key: 'lottery',
      value: function lottery() {
        return true;
      }
    }, {
      key: 'currentMonth',
      value: function currentMonth() {
        return this.now.getYear() * 12 + this.now.getMonth();
      }
    }, {
      key: 'maybeSend',
      value: function maybeSend() {
        var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
        var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));
  
        if (!firstUse) {
          // Use a grace period to avoid interfering with tests, incognito mode etc
          firstUse = this.timeNow;
          localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
        }
  
        if (this.timeNow < firstUse + this.initialDelay * 1000) {
          this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
          return;
        }
        if (this.currentMonth() <= monthProcessed) {
          this.logger.debug("This month has already been processed");
          return;
        }
        localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
        // Use random sampling
        if (this.lottery()) {
          this.logger.debug("Congratulations, we have a winner!");
        } else {
          this.logger.debug("Sorry, no stats from you this time");
          return;
        }
  
        this.send();
      }
    }, {
      key: 'send',
      value: function send() {
        // Ensure we have the latest data
        this.gatherer.gather(this.storage);
  
        // Read, send and clean up
        var data = this.storage.read();
        data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
        data["usageStatisticsVersion"] = UsageStatistics.version;
        var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
        var self = this;
        this.sender.send(info + JSON.stringify(data), function () {
          // Revert the 'month processed' flag
          localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
        });
      }
    }], [{
      key: 'version',
      get: function get$1() {
        return '2.1.2';
      }
    }, {
      key: 'firstUseKey',
      get: function get$1() {
        return 'vaadin.statistics.firstuse';
      }
    }, {
      key: 'monthProcessedKey',
      get: function get$1() {
        return 'vaadin.statistics.monthProcessed';
      }
    }, {
      key: 'optOutKey',
      get: function get$1() {
        return 'vaadin.statistics.optout';
      }
    }]);
    return UsageStatistics;
  }();
  
  try {
    window.Vaadin = window.Vaadin || {};
    window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
    window.Vaadin.usageStatsChecker.maybeGatherAndSend();
  } catch (e) {
    // Intentionally ignored as this is not a problem in the app being developed
  }
  
  }());
  
    vaadin-dev-mode:end **/
}
const Xn = function() {
  if (typeof ao == "function")
    return ao(Qn);
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
let lo = 0, Qo = 0;
const oe = [];
let Gt = !1;
function ea() {
  Gt = !1;
  const i = oe.length;
  for (let t = 0; t < i; t++) {
    const e = oe[t];
    if (e)
      try {
        e();
      } catch (o) {
        setTimeout(() => {
          throw o;
        });
      }
  }
  oe.splice(0, i), Qo += i;
}
const Xo = {
  /**
   * Returns a sub-module with the async interface providing the provided
   * delay.
   *
   * @memberof timeOut
   * @param {number=} delay Time to wait before calling callbacks in ms
   * @return {!AsyncInterface} An async timeout interface
   */
  after(i) {
    return {
      run(t) {
        return window.setTimeout(t, i);
      },
      cancel(t) {
        window.clearTimeout(t);
      }
    };
  },
  /**
   * Enqueues a function called in the next task.
   *
   * @memberof timeOut
   * @param {!Function} fn Callback to run
   * @param {number=} delay Delay in milliseconds
   * @return {number} Handle used for canceling task
   */
  run(i, t) {
    return window.setTimeout(i, t);
  },
  /**
   * Cancels a previously enqueued `timeOut` callback.
   *
   * @memberof timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(i) {
    window.clearTimeout(i);
  }
}, ta = {
  /**
   * Enqueues a function called at `requestIdleCallback` timing.
   *
   * @memberof idlePeriod
   * @param {function(!IdleDeadline):void} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run(i) {
    return window.requestIdleCallback ? window.requestIdleCallback(i) : window.setTimeout(i, 16);
  },
  /**
   * Cancels a previously enqueued `idlePeriod` callback.
   *
   * @memberof idlePeriod
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(i) {
    window.cancelIdleCallback ? window.cancelIdleCallback(i) : window.clearTimeout(i);
  }
}, ia = {
  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof microTask
   * @param {!Function=} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run(i) {
    Gt || (Gt = !0, queueMicrotask(() => ea())), oe.push(i);
    const t = lo;
    return lo += 1, t;
  },
  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(i) {
    const t = i - Qo;
    if (t >= 0) {
      if (!oe[t])
        throw new Error(`invalid async handle: ${i}`);
      oe[t] = null;
    }
  }
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const Jt = /* @__PURE__ */ new Set();
class le {
  /**
   * Creates a debouncer if no debouncer is passed as a parameter
   * or it cancels an active debouncer otherwise. The following
   * example shows how a debouncer can be called multiple times within a
   * microtask and "debounced" such that the provided callback function is
   * called once. Add this method to a custom element:
   *
   * ```js
   * import {microTask} from '@vaadin/component-base/src/async.js';
   * import {Debouncer} from '@vaadin/component-base/src/debounce.js';
   * // ...
   *
   * _debounceWork() {
   *   this._debounceJob = Debouncer.debounce(this._debounceJob,
   *       microTask, () => this._doWork());
   * }
   * ```
   *
   * If the `_debounceWork` method is called multiple times within the same
   * microtask, the `_doWork` function will be called only once at the next
   * microtask checkpoint.
   *
   * Note: In testing it is often convenient to avoid asynchrony. To accomplish
   * this with a debouncer, you can use `enqueueDebouncer` and
   * `flush`. For example, extend the above example by adding
   * `enqueueDebouncer(this._debounceJob)` at the end of the
   * `_debounceWork` method. Then in a test, call `flush` to ensure
   * the debouncer has completed.
   *
   * @param {Debouncer?} debouncer Debouncer object.
   * @param {!AsyncInterface} asyncModule Object with Async interface
   * @param {function()} callback Callback to run.
   * @return {!Debouncer} Returns a debouncer object.
   */
  static debounce(t, e, o) {
    return t instanceof le ? t._cancelAsync() : t = new le(), t.setConfig(e, o), t;
  }
  constructor() {
    this._asyncModule = null, this._callback = null, this._timer = null;
  }
  /**
   * Sets the scheduler; that is, a module with the Async interface,
   * a callback and optional arguments to be passed to the run function
   * from the async module.
   *
   * @param {!AsyncInterface} asyncModule Object with Async interface.
   * @param {function()} callback Callback to run.
   * @return {void}
   */
  setConfig(t, e) {
    this._asyncModule = t, this._callback = e, this._timer = this._asyncModule.run(() => {
      this._timer = null, Jt.delete(this), this._callback();
    });
  }
  /**
   * Cancels an active debouncer and returns a reference to itself.
   *
   * @return {void}
   */
  cancel() {
    this.isActive() && (this._cancelAsync(), Jt.delete(this));
  }
  /**
   * Cancels a debouncer's async callback.
   *
   * @return {void}
   */
  _cancelAsync() {
    this.isActive() && (this._asyncModule.cancel(
      /** @type {number} */
      this._timer
    ), this._timer = null);
  }
  /**
   * Flushes an active debouncer and returns a reference to itself.
   *
   * @return {void}
   */
  flush() {
    this.isActive() && (this.cancel(), this._callback());
  }
  /**
   * Returns true if the debouncer is active.
   *
   * @return {boolean} True if active.
   */
  isActive() {
    return this._timer != null;
  }
}
function oa(i) {
  Jt.add(i);
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const $ = [];
function Zt(i, t, e = i.getAttribute("dir")) {
  t ? i.setAttribute("dir", t) : e != null && i.removeAttribute("dir");
}
function Qt() {
  return document.documentElement.getAttribute("dir");
}
function ra() {
  const i = Qt();
  $.forEach((t) => {
    Zt(t, i);
  });
}
const sa = new MutationObserver(ra);
sa.observe(document.documentElement, { attributes: !0, attributeFilter: ["dir"] });
const Q = (i) => class extends i {
  static get properties() {
    return {
      /**
       * @protected
       */
      dir: {
        type: String,
        value: "",
        reflectToAttribute: !0,
        converter: {
          fromAttribute: (e) => e || "",
          toAttribute: (e) => e === "" ? null : e
        }
      }
    };
  }
  /**
   * @return {boolean}
   * @protected
   */
  get __isRTL() {
    return this.getAttribute("dir") === "rtl";
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback(), (!this.hasAttribute("dir") || this.__restoreSubscription) && (this.__subscribe(), Zt(this, Qt(), null));
  }
  /** @protected */
  attributeChangedCallback(e, o, r) {
    if (super.attributeChangedCallback(e, o, r), e !== "dir")
      return;
    const s = Qt(), n = r === s && $.indexOf(this) === -1, a = !r && o && $.indexOf(this) === -1;
    n || a ? (this.__subscribe(), Zt(this, s, r)) : r !== s && o === s && this.__unsubscribe();
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback(), this.__restoreSubscription = $.includes(this), this.__unsubscribe();
  }
  /** @protected */
  _valueToNodeAttribute(e, o, r) {
    r === "dir" && o === "" && !e.hasAttribute("dir") || super._valueToNodeAttribute(e, o, r);
  }
  /** @protected */
  _attributeToProperty(e, o, r) {
    e === "dir" && !o ? this.dir = "" : super._attributeToProperty(e, o, r);
  }
  /** @private */
  __subscribe() {
    $.includes(this) || $.push(this);
  }
  /** @private */
  __unsubscribe() {
    $.includes(this) && $.splice($.indexOf(this), 1);
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
window.Vaadin || (window.Vaadin = {});
window.Vaadin.registrations || (window.Vaadin.registrations = []);
window.Vaadin.developmentModeCallback || (window.Vaadin.developmentModeCallback = {});
window.Vaadin.developmentModeCallback["vaadin-usage-statistics"] = function() {
  Xn();
};
let It;
const co = /* @__PURE__ */ new Set(), z = (i) => class extends Q(i) {
  /** @protected */
  static finalize() {
    super.finalize();
    const { is: e } = this;
    e && !co.has(e) && (window.Vaadin.registrations.push(this), co.add(e), window.Vaadin.developmentModeCallback && (It = le.debounce(It, ta, () => {
      window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]();
    }), oa(It)));
  }
  constructor() {
    super(), document.doctype === null && console.warn(
      'Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.'
    );
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class na extends z(k(x)) {
  static get template() {
    return y`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-sizing: border-box;
        }

        :host([hidden]) {
          display: none !important;
        }

        /* Theme variations */
        :host([theme~='margin']) {
          margin: 1em;
        }

        :host([theme~='padding']) {
          padding: 1em;
        }

        :host([theme~='spacing']) {
          gap: 1em;
        }
      </style>

      <slot></slot>
    `;
  }
  static get is() {
    return "vaadin-vertical-layout";
  }
}
b(na);
var aa = Object.defineProperty, la = Object.getOwnPropertyDescriptor, er = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? la(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && aa(t, e, r), r;
};
let Xt = class extends P {
  constructor() {
    super(...arguments), this.dim = "false";
  }
  render() {
    return N`
            <vaadin-vertical-layout
                style="background-color: ${this.dim === "true" ? "silver" : "whitesmoke"}; box-shadow: 0 3px 10px 0 #aaa; border-radius: 5px;"
                theme="spacing-xs padding">
                <slot></slot>
            </vaadin-vertical-layout>`;
  }
};
er([
  g({ type: String })
], Xt.prototype, "dim", 2);
Xt = er([
  L("as-box")
], Xt);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const da = p`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`;
fe("color-props", da);
const ca = p`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
  pre code {
    background: transparent;
  }
`;
m("", ca, { moduleId: "lumo-color" });
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const ua = p`
  :host {
    --lumo-size-xs: 1.625rem;
    --lumo-size-s: 1.875rem;
    --lumo-size-m: 2.25rem;
    --lumo-size-l: 2.75rem;
    --lumo-size-xl: 3.5rem;

    /* Icons */
    --lumo-icon-size-s: 1.25em;
    --lumo-icon-size-m: 1.5em;
    --lumo-icon-size-l: 2.25em;
    /* For backwards compatibility */
    --lumo-icon-size: var(--lumo-icon-size-m);
  }
`;
fe("sizing-props", ua);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const ha = p`
  :host {
    /* Border radius */
    --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
    --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
    --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */

    /* Shadow */
    --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
    --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
    --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
    --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
    --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

    /* Clickable element cursor */
    --lumo-clickable-cursor: default;
  }
`;
p`
  html {
    /* Button */
    --vaadin-button-background: var(--lumo-contrast-5pct);
    --vaadin-button-border: none;
    --vaadin-button-border-radius: var(--lumo-border-radius-m);
    --vaadin-button-font-size: var(--lumo-font-size-m);
    --vaadin-button-font-weight: 500;
    --vaadin-button-height: var(--lumo-size-m);
    --vaadin-button-margin: var(--lumo-space-xs) 0;
    --vaadin-button-min-width: calc(var(--vaadin-button-height) * 2);
    --vaadin-button-padding: 0 calc(var(--vaadin-button-height) / 3 + var(--lumo-border-radius-m) / 2);
    --vaadin-button-text-color: var(--lumo-primary-text-color);
    --vaadin-button-primary-background: var(--lumo-primary-color);
    --vaadin-button-primary-border: none;
    --vaadin-button-primary-font-weight: 600;
    --vaadin-button-primary-text-color: var(--lumo-primary-contrast-color);
    --vaadin-button-tertiary-background: transparent !important;
    --vaadin-button-tertiary-text-color: var(--lumo-primary-text-color);
    --vaadin-button-tertiary-font-weight: 500;
    --vaadin-button-tertiary-padding: 0 calc(var(--vaadin-button-height) / 6);
    /* Checkbox */
    --vaadin-checkbox-background: var(--lumo-contrast-20pct);
    --vaadin-checkbox-background-hover: var(--lumo-contrast-30pct);
    --vaadin-checkbox-border-radius: var(--lumo-border-radius-s);
    --vaadin-checkbox-checkmark-char: var(--lumo-icons-checkmark);
    --vaadin-checkbox-checkmark-char-indeterminate: '';
    --vaadin-checkbox-checkmark-color: var(--lumo-primary-contrast-color);
    --vaadin-checkbox-checkmark-size: calc(var(--vaadin-checkbox-size) + 2px);
    --vaadin-checkbox-label-color: var(--lumo-body-text-color);
    --vaadin-checkbox-label-font-size: var(--lumo-font-size-m);
    --vaadin-checkbox-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs) var(--lumo-space-xs);
    --vaadin-checkbox-size: calc(var(--lumo-size-m) / 2);
    --vaadin-checkbox-disabled-checkmark-color: var(--lumo-contrast-30pct);
    --vaadin-checkbox-disabled-background: var(--lumo-contrast-10pct);
    /* Radio button */
    --vaadin-radio-button-background: var(--lumo-contrast-20pct);
    --vaadin-radio-button-background-hover: var(--lumo-contrast-30pct);
    --vaadin-radio-button-dot-color: var(--lumo-primary-contrast-color);
    --vaadin-radio-button-dot-size: 3px;
    --vaadin-radio-button-label-color: var(--lumo-body-text-color);
    --vaadin-radio-button-label-font-size: var(--lumo-font-size-m);
    --vaadin-radio-button-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs)
      var(--lumo-space-xs);
    --vaadin-radio-button-size: calc(var(--lumo-size-m) / 2);
    --vaadin-radio-button-disabled-background: var(--lumo-contrast-10pct);
    --vaadin-radio-button-disabled-dot-color: var(--lumo-contrast-30pct);
    --vaadin-selection-color: var(--lumo-primary-color);
    --vaadin-selection-color-text: var(--lumo-primary-text-color);
    --vaadin-input-field-border-radius: var(--lumo-border-radius-m);
    --vaadin-focus-ring-color: var(--lumo-primary-color-50pct);
    --vaadin-focus-ring-width: 2px;
    /* Label */
    --vaadin-input-field-label-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-focused-label-color: var(--lumo-primary-text-color);
    --vaadin-input-field-hovered-label-color: var(--lumo-body-text-color);
    --vaadin-input-field-label-font-size: var(--lumo-font-size-s);
    --vaadin-input-field-label-font-weight: 500;
    /* Helper */
    --vaadin-input-field-helper-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-helper-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-helper-font-weight: 400;
    --vaadin-input-field-helper-spacing: 0.4em;
    /* Error message */
    --vaadin-input-field-error-color: var(--lumo-error-text-color);
    --vaadin-input-field-error-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-error-font-weight: 400;
    /* Input field */
    --vaadin-input-field-background: var(--lumo-contrast-10pct);
    --vaadin-input-field-icon-color: var(--lumo-contrast-60pct);
    --vaadin-input-field-icon-size: var(--lumo-icon-size-m);
    --vaadin-input-field-invalid-background: var(--lumo-error-color-10pct);
    --vaadin-input-field-invalid-hover-highlight: var(--lumo-error-color-50pct);
    --vaadin-input-field-disabled-background: var(--lumo-contrast-5pct);
    --vaadin-input-field-disabled-value-color: var(--lumo-disabled-text-color);
    --vaadin-input-field-height: var(--lumo-size-m);
    --vaadin-input-field-hover-highlight: var(--lumo-contrast-50pct);
    --vaadin-input-field-placeholder-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-readonly-border: 1px dashed var(--lumo-contrast-30pct);
    --vaadin-input-field-value-color: var(--lumo-body-text-color);
    --vaadin-input-field-value-font-size: var(--lumo-font-size-m);
    --vaadin-input-field-value-font-weight: 400;
  }
`;
fe("style-props", ha);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const pa = p`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`, fa = p`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`;
m("", fa, { moduleId: "lumo-typography" });
fe("typography-props", pa);
const tr = p`
  :host {
    /* Sizing */
    --lumo-button-size: var(--lumo-size-m);
    min-width: var(--vaadin-button-min-width, calc(var(--_button-size) * 2));
    height: var(--_button-size);
    padding: var(--vaadin-button-padding, 0 calc(var(--_button-size) / 3 + var(--lumo-border-radius-m) / 2));
    margin: var(--vaadin-button-margin, var(--lumo-space-xs) 0);
    box-sizing: border-box;
    /* Style */
    font-family: var(--lumo-font-family);
    font-size: var(--vaadin-button-font-size, var(--lumo-font-size-m));
    font-weight: var(--vaadin-button-font-weight, 500);
    color: var(--_lumo-button-text-color);
    background: var(--_lumo-button-background);
    border: var(--vaadin-button-border, none);
    border-radius: var(--vaadin-button-border-radius, var(--lumo-border-radius-m));
    cursor: var(--lumo-clickable-cursor);
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    flex-shrink: 0;
    --_button-size: var(--vaadin-button-height, var(--lumo-button-size));
    --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
    --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
    /* Used by notification */
    --_lumo-button-background: var(--vaadin-button-background, var(--lumo-contrast-5pct));
    --_lumo-button-text-color: var(--vaadin-button-text-color, var(--lumo-primary-text-color));
    --_lumo-button-primary-background: var(--vaadin-button-primary-background, var(--lumo-primary-color));
    --_lumo-button-primary-text-color: var(--vaadin-button-primary-text-color, var(--lumo-primary-contrast-color));
  }

  /* Set only for the internal parts so we don't affect the host vertical alignment */
  [part='label'],
  [part='prefix'],
  [part='suffix'] {
    line-height: var(--lumo-line-height-xs);
  }

  [part='label'] {
    padding: calc(var(--lumo-button-size) / 6) 0;
  }

  :host([theme~='small']) {
    font-size: var(--lumo-font-size-s);
    --lumo-button-size: var(--lumo-size-s);
  }

  :host([theme~='large']) {
    font-size: var(--lumo-font-size-l);
    --lumo-button-size: var(--lumo-size-l);
  }

  /* For interaction states */
  :host::before,
  :host::after {
    content: '';
    /* We rely on the host always being relative */
    position: absolute;
    z-index: 1;
    inset: 0;
    background-color: currentColor;
    border-radius: inherit;
    opacity: 0;
    pointer-events: none;
  }

  /* Hover */

  @media (any-hover: hover) {
    :host(:hover)::before {
      opacity: 0.02;
    }
  }

  /* Active */

  :host::after {
    transition:
      opacity 1.4s,
      transform 0.1s;
    filter: blur(8px);
  }

  :host([active])::before {
    opacity: 0.05;
    transition-duration: 0s;
  }

  :host([active])::after {
    opacity: 0.1;
    transition-duration: 0s, 0s;
    transform: scale(0);
  }

  /* Keyboard focus */

  :host([focus-ring]) {
    box-shadow:
      0 0 0 calc(1px * var(--_focus-ring-gap-on, 0)) var(--_focus-ring-gap-color, var(--lumo-base-color)),
      0 0 0 calc(var(--_focus-ring-width) + 1px * var(--_focus-ring-gap-on, 0)) var(--_focus-ring-color);
  }

  :host([theme~='primary'][focus-ring]) {
    --_focus-ring-gap-on: 1;
  }

  /* Types (primary, tertiary, tertiary-inline */

  :host([theme~='tertiary']),
  :host([theme~='tertiary-inline']) {
    --_background: transparent !important;
    background: var(--vaadin-button-tertiary-background, var(--_background));
    min-width: 0;
  }

  :host([theme~='tertiary']) {
    border: var(--vaadin-button-tertiary-border, none);
    color: var(--vaadin-button-tertiary-text-color, var(--lumo-primary-text-color));
    font-weight: var(--vaadin-button-tertiary-font-weight, 500);
    padding: var(--vaadin-button-tertiary-padding, 0 calc(var(--_button-size) / 6));
  }

  :host([theme~='tertiary-inline'])::before {
    display: none;
  }

  :host([theme~='tertiary-inline']) {
    margin: 0;
    height: auto;
    padding: 0;
    line-height: inherit;
    font-size: inherit;
  }

  :host([theme~='tertiary-inline']) [part='label'] {
    padding: 0;
    overflow: visible;
    line-height: inherit;
  }

  :host([theme~='primary']) {
    background: var(--_lumo-button-primary-background);
    border: var(--vaadin-button-primary-border, none);
    color: var(--_lumo-button-primary-text-color);
    font-weight: var(--vaadin-button-primary-font-weight, 600);
    min-width: calc(var(--lumo-button-size) * 2.5);
  }

  :host([theme~='primary'])::before {
    background-color: black;
  }

  @media (any-hover: hover) {
    :host([theme~='primary']:hover)::before {
      opacity: 0.05;
    }
  }

  :host([theme~='primary'][active])::before {
    opacity: 0.1;
  }

  :host([theme~='primary'][active])::after {
    opacity: 0.2;
  }

  /* Colors (success, warning, error, contrast) */

  :host([theme~='success']) {
    color: var(--lumo-success-text-color);
  }

  :host([theme~='success'][theme~='primary']) {
    background-color: var(--lumo-success-color);
    color: var(--lumo-success-contrast-color);
  }

  :host([theme~='warning']) {
    color: var(--lumo-warning-text-color);
  }

  :host([theme~='warning'][theme~='primary']) {
    background-color: var(--lumo-warning-color);
    color: var(--lumo-warning-contrast-color);
  }

  :host([theme~='error']) {
    color: var(--lumo-error-text-color);
  }

  :host([theme~='error'][theme~='primary']) {
    background-color: var(--lumo-error-color);
    color: var(--lumo-error-contrast-color);
  }

  :host([theme~='contrast']) {
    color: var(--lumo-contrast);
  }

  :host([theme~='contrast'][theme~='primary']) {
    background-color: var(--lumo-contrast);
    color: var(--lumo-base-color);
  }

  /* Disabled state. Keep selectors after other color variants. */

  :host([disabled]) {
    pointer-events: none;
    color: var(--lumo-disabled-text-color);
  }

  :host([theme~='primary'][disabled]) {
    background-color: var(--lumo-contrast-30pct);
    color: var(--lumo-base-color);
  }

  :host([theme~='primary'][disabled]) [part] {
    opacity: 0.7;
  }

  /* Icons */

  [part] ::slotted(vaadin-icon) {
    display: inline-block;
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }

  /* Vaadin icons are based on a 16x16 grid (unlike Lumo and Material icons with 24x24), so they look too big by default */
  [part] ::slotted(vaadin-icon[icon^='vaadin:']) {
    padding: 0.25em;
    box-sizing: border-box !important;
  }

  [part='prefix'] {
    margin-left: -0.25em;
    margin-right: 0.25em;
  }

  [part='suffix'] {
    margin-left: 0.25em;
    margin-right: -0.25em;
  }

  /* Icon-only */

  :host([theme~='icon']:not([theme~='tertiary-inline'])) {
    min-width: var(--lumo-button-size);
    padding-left: calc(var(--lumo-button-size) / 4);
    padding-right: calc(var(--lumo-button-size) / 4);
  }

  :host([theme~='icon']) [part='prefix'],
  :host([theme~='icon']) [part='suffix'] {
    margin-left: 0;
    margin-right: 0;
  }

  /* RTL specific styles */

  :host([dir='rtl']) [part='prefix'] {
    margin-left: 0.25em;
    margin-right: -0.25em;
  }

  :host([dir='rtl']) [part='suffix'] {
    margin-left: -0.25em;
    margin-right: 0.25em;
  }

  :host([dir='rtl'][theme~='icon']) [part='prefix'],
  :host([dir='rtl'][theme~='icon']) [part='suffix'] {
    margin-left: 0;
    margin-right: 0;
  }
`;
m("vaadin-button", tr, { moduleId: "lumo-button" });
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const X = C((i) => typeof i.prototype.addController == "function" ? i : class extends i {
  constructor() {
    super(), this.__controllers = /* @__PURE__ */ new Set();
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback(), this.__controllers.forEach((e) => {
      e.hostConnected && e.hostConnected();
    });
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback(), this.__controllers.forEach((e) => {
      e.hostDisconnected && e.hostDisconnected();
    });
  }
  /**
   * Registers a controller to participate in the element update cycle.
   *
   * @param {ReactiveController} controller
   * @protected
   */
  addController(e) {
    this.__controllers.add(e), this.$ !== void 0 && this.isConnected && e.hostConnected && e.hostConnected();
  }
  /**
   * Removes a controller from the element.
   *
   * @param {ReactiveController} controller
   * @protected
   */
  removeController(e) {
    this.__controllers.delete(e);
  }
});
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function ma(i) {
  const t = [];
  for (; i; ) {
    if (i.nodeType === Node.DOCUMENT_NODE) {
      t.push(i);
      break;
    }
    if (i.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      t.push(i), i = i.host;
      continue;
    }
    if (i.assignedSlot) {
      i = i.assignedSlot;
      continue;
    }
    i = i.parentNode;
  }
  return t;
}
function ir(i) {
  const t = [];
  let e;
  return i.localName === "slot" ? e = i.assignedElements() : (t.push(i), e = [...i.children]), e.forEach((o) => t.push(...ir(o))), t;
}
function vi(i) {
  return i ? new Set(i.split(" ")) : /* @__PURE__ */ new Set();
}
function ht(i) {
  return i ? [...i].join(" ") : "";
}
function or(i, t, e) {
  const o = vi(i.getAttribute(t));
  o.add(e), i.setAttribute(t, ht(o));
}
function _a(i, t, e) {
  const o = vi(i.getAttribute(t));
  if (o.delete(e), o.size === 0) {
    i.removeAttribute(t);
    return;
  }
  i.setAttribute(t, ht(o));
}
function va(i) {
  return i.nodeType === Node.TEXT_NODE && i.textContent.trim() === "";
}
/**
 * @license
 * Copyright (c) 2023 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class gi {
  constructor(t, e) {
    this.slot = t, this.callback = e, this._storedNodes = [], this._connected = !1, this._scheduled = !1, this._boundSchedule = () => {
      this._schedule();
    }, this.connect(), this._schedule();
  }
  /**
   * Activates an observer. This method is automatically called when
   * a `SlotObserver` is created. It should only be called to  re-activate
   * an observer that has been deactivated via the `disconnect` method.
   */
  connect() {
    this.slot.addEventListener("slotchange", this._boundSchedule), this._connected = !0;
  }
  /**
   * Deactivates the observer. After calling this method the observer callback
   * will not be called when changes to slotted nodes occur. The `connect` method
   * may be subsequently called to reactivate the observer.
   */
  disconnect() {
    this.slot.removeEventListener("slotchange", this._boundSchedule), this._connected = !1;
  }
  /** @private */
  _schedule() {
    this._scheduled || (this._scheduled = !0, queueMicrotask(() => {
      this.flush();
    }));
  }
  /**
   * Run the observer callback synchronously.
   */
  flush() {
    this._connected && (this._scheduled = !1, this._processNodes());
  }
  /** @private */
  _processNodes() {
    const t = this.slot.assignedNodes({ flatten: !0 });
    let e = [];
    const o = [], r = [];
    t.length && (e = t.filter((s) => !this._storedNodes.includes(s))), this._storedNodes.length && this._storedNodes.forEach((s, n) => {
      const a = t.indexOf(s);
      a === -1 ? o.push(s) : a !== n && r.push(s);
    }), (e.length || o.length || r.length) && this.callback({ addedNodes: e, currentNodes: t, movedNodes: r, removedNodes: o }), this._storedNodes = t;
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
let ga = 0;
function pt() {
  return ga++;
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class M extends EventTarget {
  /**
   * Ensure that every instance has unique ID.
   *
   * @param {HTMLElement} host
   * @param {string} slotName
   * @return {string}
   * @protected
   */
  static generateId(t, e = "default") {
    return `${e}-${t.localName}-${pt()}`;
  }
  constructor(t, e, o, r = {}) {
    super();
    const { initializer: s, multiple: n, observe: a, useUniqueId: l, uniqueIdPrefix: d } = r;
    this.host = t, this.slotName = e, this.tagName = o, this.observe = typeof a == "boolean" ? a : !0, this.multiple = typeof n == "boolean" ? n : !1, this.slotInitializer = s, n && (this.nodes = []), l && (this.defaultId = this.constructor.generateId(t, d || e));
  }
  hostConnected() {
    this.initialized || (this.multiple ? this.initMultiple() : this.initSingle(), this.observe && this.observeSlot(), this.initialized = !0);
  }
  /** @protected */
  initSingle() {
    let t = this.getSlotChild();
    t ? (this.node = t, this.initAddedNode(t)) : (t = this.attachDefaultNode(), this.initNode(t));
  }
  /** @protected */
  initMultiple() {
    const t = this.getSlotChildren();
    if (t.length === 0) {
      const e = this.attachDefaultNode();
      e && (this.nodes = [e], this.initNode(e));
    } else
      this.nodes = t, t.forEach((e) => {
        this.initAddedNode(e);
      });
  }
  /**
   * Create and attach default node using the provided tag name, if any.
   * @return {Node | undefined}
   * @protected
   */
  attachDefaultNode() {
    const { host: t, slotName: e, tagName: o } = this;
    let r = this.defaultNode;
    return !r && o && (r = document.createElement(o), r instanceof Element && (e !== "" && r.setAttribute("slot", e), this.defaultNode = r)), r && (this.node = r, t.appendChild(r)), r;
  }
  /**
   * Return the list of nodes matching the slot managed by the controller.
   * @return {Node}
   */
  getSlotChildren() {
    const { slotName: t } = this;
    return Array.from(this.host.childNodes).filter((e) => e.nodeType === Node.ELEMENT_NODE && e.slot === t || e.nodeType === Node.TEXT_NODE && e.textContent.trim() && t === "");
  }
  /**
   * Return a reference to the node managed by the controller.
   * @return {Node}
   */
  getSlotChild() {
    return this.getSlotChildren()[0];
  }
  /**
   * Run `slotInitializer` for the node managed by the controller.
   *
   * @param {Node} node
   * @protected
   */
  initNode(t) {
    const { slotInitializer: e } = this;
    e && e(t, this.host);
  }
  /**
   * Override to initialize the newly added custom node.
   *
   * @param {Node} _node
   * @protected
   */
  initCustomNode(t) {
  }
  /**
   * Override to teardown slotted node when it's removed.
   *
   * @param {Node} _node
   * @protected
   */
  teardownNode(t) {
  }
  /**
   * Run both `initCustomNode` and `initNode` for a custom slotted node.
   *
   * @param {Node} node
   * @protected
   */
  initAddedNode(t) {
    t !== this.defaultNode && (this.initCustomNode(t), this.initNode(t));
  }
  /**
   * Setup the observer to manage slot content changes.
   * @protected
   */
  observeSlot() {
    const { slotName: t } = this, e = t === "" ? "slot:not([name])" : `slot[name=${t}]`, o = this.host.shadowRoot.querySelector(e);
    this.__slotObserver = new gi(o, ({ addedNodes: r, removedNodes: s }) => {
      const n = this.multiple ? this.nodes : [this.node], a = r.filter((l) => !va(l) && !n.includes(l));
      s.length && (this.nodes = n.filter((l) => !s.includes(l)), s.forEach((l) => {
        this.teardownNode(l);
      })), a && a.length > 0 && (this.multiple ? (this.defaultNode && this.defaultNode.remove(), this.nodes = [...n, ...a].filter((l) => l !== this.defaultNode), a.forEach((l) => {
        this.initAddedNode(l);
      })) : (this.node && this.node.remove(), this.node = a[0], this.initAddedNode(this.node)));
    });
  }
}
/**
 * @license
 * Copyright (c) 2022 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class me extends M {
  constructor(t) {
    super(t, "tooltip"), this.setTarget(t);
  }
  /**
   * Override to initialize the newly added custom tooltip.
   *
   * @param {Node} tooltipNode
   * @protected
   * @override
   */
  initCustomNode(t) {
    t.target = this.target, this.ariaTarget !== void 0 && (t.ariaTarget = this.ariaTarget), this.context !== void 0 && (t.context = this.context), this.manual !== void 0 && (t.manual = this.manual), this.opened !== void 0 && (t.opened = this.opened), this.position !== void 0 && (t._position = this.position), this.shouldShow !== void 0 && (t.shouldShow = this.shouldShow), this.__notifyChange();
  }
  /**
   * Override to notify the host when the tooltip is removed.
   *
   * @param {Node} tooltipNode
   * @protected
   * @override
   */
  teardownNode() {
    this.__notifyChange();
  }
  /**
   * Set an HTML element for linking with the tooltip overlay
   * via `aria-describedby` attribute used by screen readers.
   * @param {HTMLElement} ariaTarget
   */
  setAriaTarget(t) {
    this.ariaTarget = t;
    const e = this.node;
    e && (e.ariaTarget = t);
  }
  /**
   * Set a context object to be used by generator.
   * @param {object} context
   */
  setContext(t) {
    this.context = t;
    const e = this.node;
    e && (e.context = t);
  }
  /**
   * Toggle manual state on the slotted tooltip.
   * @param {boolean} manual
   */
  setManual(t) {
    this.manual = t;
    const e = this.node;
    e && (e.manual = t);
  }
  /**
   * Toggle opened state on the slotted tooltip.
   * @param {boolean} opened
   */
  setOpened(t) {
    this.opened = t;
    const e = this.node;
    e && (e.opened = t);
  }
  /**
   * Set default position for the slotted tooltip.
   * This can be overridden by setting the position
   * using corresponding property or attribute.
   * @param {string} position
   */
  setPosition(t) {
    this.position = t;
    const e = this.node;
    e && (e._position = t);
  }
  /**
   * Set function used to detect whether to show
   * the tooltip based on a condition.
   * @param {Function} shouldShow
   */
  setShouldShow(t) {
    this.shouldShow = t;
    const e = this.node;
    e && (e.shouldShow = t);
  }
  /**
   * Set an HTML element to attach the tooltip to.
   * @param {HTMLElement} target
   */
  setTarget(t) {
    this.target = t;
    const e = this.node;
    e && (e.target = t);
  }
  /** @private */
  __notifyChange() {
    this.dispatchEvent(new CustomEvent("tooltip-changed", { detail: { node: this.node } }));
  }
}
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const rr = p`
  :host {
    display: inline-block;
    position: relative;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Aligns the button with form fields when placed on the same line.
  Note, to make it work, the form fields should have the same "::before" pseudo-element. */
  .vaadin-button-container::before {
    content: '\\2003';
    display: inline-block;
    width: 0;
    max-height: 100%;
  }

  .vaadin-button-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100%;
    min-height: inherit;
    text-shadow: inherit;
  }

  [part='prefix'],
  [part='suffix'] {
    flex: none;
  }

  [part='label'] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (forced-colors: active) {
    :host {
      outline: 1px solid;
      outline-offset: -1px;
    }

    :host([focused]) {
      outline-width: 2px;
    }

    :host([disabled]) {
      outline-color: GrayText;
    }
  }
`, ba = (i) => i`
  <div class="vaadin-button-container">
    <span part="prefix" aria-hidden="true">
      <slot name="prefix"></slot>
    </span>
    <span part="label">
      <slot></slot>
    </span>
    <span part="suffix" aria-hidden="true">
      <slot name="suffix"></slot>
    </span>
  </div>
  <slot name="tooltip"></slot>
`;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const ya = !1, xa = (i) => i, bi = typeof document.head.style.touchAction == "string", ei = "__polymerGestures", zt = "__polymerGesturesHandled", ti = "__polymerGesturesTouchAction", uo = 25, ho = 5, wa = 2, Ca = ["mousedown", "mousemove", "mouseup", "click"], Aa = [0, 1, 4, 2], Ea = function() {
  try {
    return new MouseEvent("test", { buttons: 1 }).buttons === 1;
  } catch {
    return !1;
  }
}();
function yi(i) {
  return Ca.indexOf(i) > -1;
}
let sr = !1;
(function() {
  try {
    const i = Object.defineProperty({}, "passive", {
      // eslint-disable-next-line getter-return
      get() {
        sr = !0;
      }
    });
    window.addEventListener("test", null, i), window.removeEventListener("test", null, i);
  } catch {
  }
})();
function ka(i) {
  if (!(yi(i) || i === "touchend") && bi && sr && ya)
    return { passive: !0 };
}
const Pa = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/u), Ta = {
  button: !0,
  command: !0,
  fieldset: !0,
  input: !0,
  keygen: !0,
  optgroup: !0,
  option: !0,
  select: !0,
  textarea: !0
};
function Y(i) {
  const t = i.type;
  if (!yi(t))
    return !1;
  if (t === "mousemove") {
    let o = i.buttons === void 0 ? 1 : i.buttons;
    return i instanceof window.MouseEvent && !Ea && (o = Aa[i.which] || 0), !!(o & 1);
  }
  return (i.button === void 0 ? 0 : i.button) === 0;
}
function Sa(i) {
  if (i.type === "click") {
    if (i.detail === 0)
      return !0;
    const t = U(i);
    if (!t.nodeType || /** @type {Element} */
    t.nodeType !== Node.ELEMENT_NODE)
      return !0;
    const e = (
      /** @type {Element} */
      t.getBoundingClientRect()
    ), o = i.pageX, r = i.pageY;
    return !(o >= e.left && o <= e.right && r >= e.top && r <= e.bottom);
  }
  return !1;
}
const D = {
  mouse: {
    target: null,
    mouseIgnoreJob: null
  },
  touch: {
    x: 0,
    y: 0,
    id: -1,
    scrollDecided: !1
  }
};
function Oa(i) {
  let t = "auto";
  const e = ar(i);
  for (let o = 0, r; o < e.length; o++)
    if (r = e[o], r[ti]) {
      t = r[ti];
      break;
    }
  return t;
}
function nr(i, t, e) {
  i.movefn = t, i.upfn = e, document.addEventListener("mousemove", t), document.addEventListener("mouseup", e);
}
function re(i) {
  document.removeEventListener("mousemove", i.movefn), document.removeEventListener("mouseup", i.upfn), i.movefn = null, i.upfn = null;
}
const ar = window.ShadyDOM && window.ShadyDOM.noPatch ? window.ShadyDOM.composedPath : (i) => i.composedPath && i.composedPath() || [], xi = {}, W = [];
function Na(i, t) {
  let e = document.elementFromPoint(i, t), o = e;
  for (; o && o.shadowRoot && !window.ShadyDOM; ) {
    const r = o;
    if (o = o.shadowRoot.elementFromPoint(i, t), r === o)
      break;
    o && (e = o);
  }
  return e;
}
function U(i) {
  const t = ar(
    /** @type {?Event} */
    i
  );
  return t.length > 0 ? t[0] : i.target;
}
function Ia(i) {
  const t = i.type, o = i.currentTarget[ei];
  if (!o)
    return;
  const r = o[t];
  if (!r)
    return;
  if (!i[zt] && (i[zt] = {}, t.startsWith("touch"))) {
    const n = i.changedTouches[0];
    if (t === "touchstart" && i.touches.length === 1 && (D.touch.id = n.identifier), D.touch.id !== n.identifier)
      return;
    bi || (t === "touchstart" || t === "touchmove") && za(i);
  }
  const s = i[zt];
  if (!s.skip) {
    for (let n = 0, a; n < W.length; n++)
      a = W[n], r[a.name] && !s[a.name] && a.flow && a.flow.start.indexOf(i.type) > -1 && a.reset && a.reset();
    for (let n = 0, a; n < W.length; n++)
      a = W[n], r[a.name] && !s[a.name] && (s[a.name] = !0, a[t](i));
  }
}
function za(i) {
  const t = i.changedTouches[0], e = i.type;
  if (e === "touchstart")
    D.touch.x = t.clientX, D.touch.y = t.clientY, D.touch.scrollDecided = !1;
  else if (e === "touchmove") {
    if (D.touch.scrollDecided)
      return;
    D.touch.scrollDecided = !0;
    const o = Oa(i);
    let r = !1;
    const s = Math.abs(D.touch.x - t.clientX), n = Math.abs(D.touch.y - t.clientY);
    i.cancelable && (o === "none" ? r = !0 : o === "pan-x" ? r = n > s : o === "pan-y" && (r = s > n)), r ? i.preventDefault() : nt("track");
  }
}
function po(i, t, e) {
  return xi[t] ? (Ma(i, t, e), !0) : !1;
}
function Ma(i, t, e) {
  const o = xi[t], r = o.deps, s = o.name;
  let n = i[ei];
  n || (i[ei] = n = {});
  for (let a = 0, l, d; a < r.length; a++)
    l = r[a], !(Pa && yi(l) && l !== "click") && (d = n[l], d || (n[l] = d = { _count: 0 }), d._count === 0 && i.addEventListener(l, Ia, ka(l)), d[s] = (d[s] || 0) + 1, d._count = (d._count || 0) + 1);
  i.addEventListener(t, e), o.touchAction && Ra(i, o.touchAction);
}
function wi(i) {
  W.push(i), i.emits.forEach((t) => {
    xi[t] = i;
  });
}
function La(i) {
  for (let t = 0, e; t < W.length; t++) {
    e = W[t];
    for (let o = 0, r; o < e.emits.length; o++)
      if (r = e.emits[o], r === i)
        return e;
  }
  return null;
}
function Ra(i, t) {
  bi && i instanceof HTMLElement && ia.run(() => {
    i.style.touchAction = t;
  }), i[ti] = t;
}
function Ci(i, t, e) {
  const o = new Event(t, { bubbles: !0, cancelable: !0, composed: !0 });
  if (o.detail = e, xa(
    /** @type {!Node} */
    i
  ).dispatchEvent(o), o.defaultPrevented) {
    const r = e.preventer || e.sourceEvent;
    r && r.preventDefault && r.preventDefault();
  }
}
function nt(i) {
  const t = La(i);
  t.info && (t.info.prevent = !0);
}
wi({
  name: "downup",
  deps: ["mousedown", "touchstart", "touchend"],
  flow: {
    start: ["mousedown", "touchstart"],
    end: ["mouseup", "touchend"]
  },
  emits: ["down", "up"],
  info: {
    movefn: null,
    upfn: null
  },
  /**
   * @this {GestureRecognizer}
   * @return {void}
   */
  reset() {
    re(this.info);
  },
  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */
  mousedown(i) {
    if (!Y(i))
      return;
    const t = U(i), e = this, o = (s) => {
      Y(s) || (we("up", t, s), re(e.info));
    }, r = (s) => {
      Y(s) && we("up", t, s), re(e.info);
    };
    nr(this.info, o, r), we("down", t, i);
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchstart(i) {
    we("down", U(i), i.changedTouches[0], i);
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchend(i) {
    we("up", U(i), i.changedTouches[0], i);
  }
});
function we(i, t, e, o) {
  t && Ci(t, i, {
    x: e.clientX,
    y: e.clientY,
    sourceEvent: e,
    preventer: o,
    prevent(r) {
      return nt(r);
    }
  });
}
wi({
  name: "track",
  touchAction: "none",
  deps: ["mousedown", "touchstart", "touchmove", "touchend"],
  flow: {
    start: ["mousedown", "touchstart"],
    end: ["mouseup", "touchend"]
  },
  emits: ["track"],
  info: {
    x: 0,
    y: 0,
    state: "start",
    started: !1,
    moves: [],
    /** @this {GestureInfo} */
    addMove(i) {
      this.moves.length > wa && this.moves.shift(), this.moves.push(i);
    },
    movefn: null,
    upfn: null,
    prevent: !1
  },
  /**
   * @this {GestureRecognizer}
   * @return {void}
   */
  reset() {
    this.info.state = "start", this.info.started = !1, this.info.moves = [], this.info.x = 0, this.info.y = 0, this.info.prevent = !1, re(this.info);
  },
  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */
  mousedown(i) {
    if (!Y(i))
      return;
    const t = U(i), e = this, o = (s) => {
      const n = s.clientX, a = s.clientY;
      fo(e.info, n, a) && (e.info.state = e.info.started ? s.type === "mouseup" ? "end" : "track" : "start", e.info.state === "start" && nt("tap"), e.info.addMove({ x: n, y: a }), Y(s) || (e.info.state = "end", re(e.info)), t && Mt(e.info, t, s), e.info.started = !0);
    }, r = (s) => {
      e.info.started && o(s), re(e.info);
    };
    nr(this.info, o, r), this.info.x = i.clientX, this.info.y = i.clientY;
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchstart(i) {
    const t = i.changedTouches[0];
    this.info.x = t.clientX, this.info.y = t.clientY;
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchmove(i) {
    const t = U(i), e = i.changedTouches[0], o = e.clientX, r = e.clientY;
    fo(this.info, o, r) && (this.info.state === "start" && nt("tap"), this.info.addMove({ x: o, y: r }), Mt(this.info, t, e), this.info.state = "track", this.info.started = !0);
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchend(i) {
    const t = U(i), e = i.changedTouches[0];
    this.info.started && (this.info.state = "end", this.info.addMove({ x: e.clientX, y: e.clientY }), Mt(this.info, t, e));
  }
});
function fo(i, t, e) {
  if (i.prevent)
    return !1;
  if (i.started)
    return !0;
  const o = Math.abs(i.x - t), r = Math.abs(i.y - e);
  return o >= ho || r >= ho;
}
function Mt(i, t, e) {
  if (!t)
    return;
  const o = i.moves[i.moves.length - 2], r = i.moves[i.moves.length - 1], s = r.x - i.x, n = r.y - i.y;
  let a, l = 0;
  o && (a = r.x - o.x, l = r.y - o.y), Ci(t, "track", {
    state: i.state,
    x: e.clientX,
    y: e.clientY,
    dx: s,
    dy: n,
    ddx: a,
    ddy: l,
    sourceEvent: e,
    hover() {
      return Na(e.clientX, e.clientY);
    }
  });
}
wi({
  name: "tap",
  deps: ["mousedown", "click", "touchstart", "touchend"],
  flow: {
    start: ["mousedown", "touchstart"],
    end: ["click", "touchend"]
  },
  emits: ["tap"],
  info: {
    x: NaN,
    y: NaN,
    prevent: !1
  },
  /**
   * @this {GestureRecognizer}
   * @return {void}
   */
  reset() {
    this.info.x = NaN, this.info.y = NaN, this.info.prevent = !1;
  },
  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */
  mousedown(i) {
    Y(i) && (this.info.x = i.clientX, this.info.y = i.clientY);
  },
  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */
  click(i) {
    Y(i) && mo(this.info, i);
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchstart(i) {
    const t = i.changedTouches[0];
    this.info.x = t.clientX, this.info.y = t.clientY;
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */
  touchend(i) {
    mo(this.info, i.changedTouches[0], i);
  }
});
function mo(i, t, e) {
  const o = Math.abs(t.clientX - i.x), r = Math.abs(t.clientY - i.y), s = U(e || t);
  !s || Ta[
    /** @type {!HTMLElement} */
    s.localName
  ] && s.hasAttribute("disabled") || (isNaN(o) || isNaN(r) || o <= uo && r <= uo || Sa(t)) && (i.prevent || Ci(s, "tap", {
    x: t.clientX,
    y: t.clientY,
    sourceEvent: t,
    preventer: e
  }));
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const $e = C(
  (i) => class extends i {
    static get properties() {
      return {
        /**
         * If true, the user cannot interact with this element.
         */
        disabled: {
          type: Boolean,
          value: !1,
          observer: "_disabledChanged",
          reflectToAttribute: !0
        }
      };
    }
    /**
     * @param {boolean} disabled
     * @protected
     */
    _disabledChanged(e) {
      this._setAriaDisabled(e);
    }
    /**
     * @param {boolean} disabled
     * @protected
     */
    _setAriaDisabled(e) {
      e ? this.setAttribute("aria-disabled", "true") : this.removeAttribute("aria-disabled");
    }
    /**
     * Overrides the default element `click` method in order to prevent
     * firing the `click` event when the element is disabled.
     * @protected
     * @override
     */
    click() {
      this.disabled || super.click();
    }
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const _e = C(
  (i) => class extends i {
    /** @protected */
    ready() {
      super.ready(), this.addEventListener("keydown", (e) => {
        this._onKeyDown(e);
      }), this.addEventListener("keyup", (e) => {
        this._onKeyUp(e);
      });
    }
    /**
     * A handler for the `keydown` event. By default, it calls
     * separate methods for handling "Enter" and "Escape" keys.
     * Override the method to implement your own behavior.
     *
     * @param {KeyboardEvent} event
     * @protected
     */
    _onKeyDown(e) {
      switch (e.key) {
        case "Enter":
          this._onEnter(e);
          break;
        case "Escape":
          this._onEscape(e);
          break;
      }
    }
    /**
     * A handler for the `keyup` event. By default, it does nothing.
     * Override the method to implement your own behavior.
     *
     * @param {KeyboardEvent} _event
     * @protected
     */
    _onKeyUp(e) {
    }
    /**
     * A handler for the "Enter" key. By default, it does nothing.
     * Override the method to implement your own behavior.
     *
     * @param {KeyboardEvent} _event
     * @protected
     */
    _onEnter(e) {
    }
    /**
     * A handler for the "Escape" key. By default, it does nothing.
     * Override the method to implement your own behavior.
     *
     * @param {KeyboardEvent} _event
     * @protected
     */
    _onEscape(e) {
    }
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const ft = (i) => class extends $e(_e(i)) {
  /**
   * An array of activation keys.
   *
   * See possible values here:
   * https://developer.mozilla.org/ru/docs/Web/API/KeyboardEvent/key/Key_Values
   *
   * @protected
   * @return {!Array<!string>}
   */
  get _activeKeys() {
    return [" "];
  }
  /** @protected */
  ready() {
    super.ready(), po(this, "down", (e) => {
      this._shouldSetActive(e) && this._setActive(!0);
    }), po(this, "up", () => {
      this._setActive(!1);
    });
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback(), this._setActive(!1);
  }
  /**
   * @param {KeyboardEvent | MouseEvent} _event
   * @protected
   */
  _shouldSetActive(e) {
    return !this.disabled;
  }
  /**
   * Sets the `active` attribute on the element if an activation key is pressed.
   *
   * @param {KeyboardEvent} event
   * @protected
   * @override
   */
  _onKeyDown(e) {
    super._onKeyDown(e), this._shouldSetActive(e) && this._activeKeys.includes(e.key) && (this._setActive(!0), document.addEventListener(
      "keyup",
      (o) => {
        this._activeKeys.includes(o.key) && this._setActive(!1);
      },
      { once: !0 }
    ));
  }
  /**
   * Toggles the `active` attribute on the element.
   *
   * @param {boolean} active
   * @protected
   */
  _setActive(e) {
    this.toggleAttribute("active", e);
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
let Ai = !1;
window.addEventListener(
  "keydown",
  () => {
    Ai = !0;
  },
  { capture: !0 }
);
window.addEventListener(
  "mousedown",
  () => {
    Ai = !1;
  },
  { capture: !0 }
);
function ii() {
  let i = document.activeElement || document.body;
  for (; i.shadowRoot && i.shadowRoot.activeElement; )
    i = i.shadowRoot.activeElement;
  return i;
}
function lr() {
  return Ai;
}
function dr(i) {
  const t = i.style;
  if (t.visibility === "hidden" || t.display === "none")
    return !0;
  const e = window.getComputedStyle(i);
  return e.visibility === "hidden" || e.display === "none";
}
function $a(i, t) {
  const e = Math.max(i.tabIndex, 0), o = Math.max(t.tabIndex, 0);
  return e === 0 || o === 0 ? o > e : e > o;
}
function Da(i, t) {
  const e = [];
  for (; i.length > 0 && t.length > 0; )
    $a(i[0], t[0]) ? e.push(t.shift()) : e.push(i.shift());
  return e.concat(i, t);
}
function oi(i) {
  const t = i.length;
  if (t < 2)
    return i;
  const e = Math.ceil(t / 2), o = oi(i.slice(0, e)), r = oi(i.slice(e));
  return Da(o, r);
}
function ri(i) {
  return i.offsetParent === null && i.clientWidth === 0 && i.clientHeight === 0 ? !0 : dr(i);
}
function Ba(i) {
  return i.matches('[tabindex="-1"]') ? !1 : i.matches("input, select, textarea, button, object") ? i.matches(":not([disabled])") : i.matches("a[href], area[href], iframe, [tabindex], [contentEditable]");
}
function cr(i) {
  return i.getRootNode().activeElement === i;
}
function Fa(i) {
  if (!Ba(i))
    return -1;
  const t = i.getAttribute("tabindex") || 0;
  return Number(t);
}
function ur(i, t) {
  if (i.nodeType !== Node.ELEMENT_NODE || dr(i))
    return !1;
  const e = (
    /** @type {HTMLElement} */
    i
  ), o = Fa(e);
  let r = o > 0;
  o >= 0 && t.push(e);
  let s = [];
  return e.localName === "slot" ? s = e.assignedNodes({ flatten: !0 }) : s = (e.shadowRoot || e).children, [...s].forEach((n) => {
    r = ur(n, t) || r;
  }), r;
}
function Ha(i) {
  const t = [];
  return ur(i, t) ? oi(t) : t;
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const De = C(
  (i) => class extends i {
    /**
     * @protected
     * @return {boolean}
     */
    get _keyboardActive() {
      return lr();
    }
    /** @protected */
    ready() {
      this.addEventListener("focusin", (e) => {
        this._shouldSetFocus(e) && this._setFocused(!0);
      }), this.addEventListener("focusout", (e) => {
        this._shouldRemoveFocus(e) && this._setFocused(!1);
      }), super.ready();
    }
    /** @protected */
    disconnectedCallback() {
      super.disconnectedCallback(), this.hasAttribute("focused") && this._setFocused(!1);
    }
    /**
     * Override to change how focused and focus-ring attributes are set.
     *
     * @param {boolean} focused
     * @protected
     */
    _setFocused(e) {
      this.toggleAttribute("focused", e), this.toggleAttribute("focus-ring", e && this._keyboardActive);
    }
    /**
     * Override to define if the field receives focus based on the event.
     *
     * @param {FocusEvent} _event
     * @return {boolean}
     * @protected
     */
    _shouldSetFocus(e) {
      return !0;
    }
    /**
     * Override to define if the field loses focus based on the event.
     *
     * @param {FocusEvent} _event
     * @return {boolean}
     * @protected
     */
    _shouldRemoveFocus(e) {
      return !0;
    }
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const hr = (i) => class extends $e(i) {
  static get properties() {
    return {
      /**
       * Indicates whether the element can be focused and where it participates in sequential keyboard navigation.
       *
       * @protected
       */
      tabindex: {
        type: Number,
        reflectToAttribute: !0,
        observer: "_tabindexChanged"
      },
      /**
       * Stores the last known tabindex since the element has been disabled.
       *
       * @protected
       */
      _lastTabIndex: {
        type: Number
      }
    };
  }
  /**
   * When the element gets disabled, the observer saves the last known tabindex
   * and makes the element not focusable by setting tabindex to -1.
   * As soon as the element gets enabled, the observer restores the last known tabindex
   * so that the element can be focusable again.
   *
   * @protected
   * @override
   */
  _disabledChanged(e, o) {
    super._disabledChanged(e, o), e ? (this.tabindex !== void 0 && (this._lastTabIndex = this.tabindex), this.tabindex = -1) : o && (this.tabindex = this._lastTabIndex);
  }
  /**
   * When the user has changed tabindex while the element is disabled,
   * the observer reverts tabindex to -1 and rather saves the new tabindex value to apply it later.
   * The new value will be applied as soon as the element becomes enabled.
   *
   * @protected
   */
  _tabindexChanged(e) {
    this.disabled && e !== -1 && (this._lastTabIndex = e, this.tabindex = -1);
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Ei = (i) => class extends ft(hr(De(i))) {
  static get properties() {
    return {
      /**
       * Indicates whether the element can be focused and where it participates in sequential keyboard navigation.
       *
       * @override
       * @protected
       */
      tabindex: {
        type: Number,
        value: 0,
        reflectToAttribute: !0
      }
    };
  }
  /**
   * By default, `Space` is the only possible activation key for a focusable HTML element.
   * Nonetheless, the button is an exception as it can be also activated by pressing `Enter`.
   * See the "Keyboard Support" section in https://www.w3.org/TR/wai-aria-practices/examples/button/button.html.
   *
   * @protected
   * @override
   */
  get _activeKeys() {
    return ["Enter", " "];
  }
  /** @protected */
  ready() {
    super.ready(), this.hasAttribute("role") || this.setAttribute("role", "button");
  }
  /**
   * Since the button component is designed on the base of the `[role=button]` attribute,
   * and doesn't have a native <button> inside, in order to be fully accessible from the keyboard,
   * it should manually fire the `click` event once an activation key is pressed,
   * as it follows from the WAI-ARIA specifications:
   * https://www.w3.org/TR/wai-aria-practices-1.1/#button
   *
   * According to the UI Events specifications,
   * the `click` event should be fired exactly on `keydown`:
   * https://www.w3.org/TR/uievents/#event-type-keydown
   *
   * @param {KeyboardEvent} event
   * @protected
   * @override
   */
  _onKeyDown(e) {
    super._onKeyDown(e), !(e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) && this._activeKeys.includes(e.key) && (e.preventDefault(), this.click());
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-button", rr, { moduleId: "vaadin-button-styles" });
class Ua extends Ei(z(k(X(x)))) {
  static get is() {
    return "vaadin-button";
  }
  static get template() {
    return ba(y);
  }
  /** @protected */
  ready() {
    super.ready(), this._tooltipController = new me(this), this.addController(this._tooltipController);
  }
}
b(Ua);
m(
  "vaadin-notification-card",
  p`
    :host {
      position: relative;
      margin: var(--lumo-space-s);
    }

    [part='overlay'] {
      background: var(--lumo-base-color) linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
      border-radius: var(--lumo-border-radius-l);
      box-shadow:
        0 0 0 1px var(--lumo-contrast-10pct),
        var(--lumo-box-shadow-l);
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
      font-weight: 400;
      line-height: var(--lumo-line-height-s);
      letter-spacing: 0;
      text-transform: none;
      -webkit-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    [part='content'] {
      padding: var(--lumo-space-wide-l);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    [part='content'] ::slotted(vaadin-button) {
      flex: none;
      margin: 0 calc(var(--lumo-space-s) * -1) 0 var(--lumo-space-m);
    }

    :host([slot^='middle']) {
      max-width: 80vw;
      margin: var(--lumo-space-s) auto;
    }

    :host([slot$='stretch']) {
      margin: 0;
    }

    :host([slot$='stretch']) [part='overlay'] {
      border-radius: 0;
    }

    @media (min-width: 421px) {
      :host(:not([slot$='stretch'])) {
        display: flex;
      }

      :host([slot$='end']) {
        justify-content: flex-end;
      }

      :host([slot^='middle']),
      :host([slot$='center']) {
        display: flex;
        justify-content: center;
      }
    }

    @keyframes lumo-notification-exit-fade-out {
      100% {
        opacity: 0;
      }
    }

    @keyframes lumo-notification-enter-fade-in {
      0% {
        opacity: 0;
      }
    }

    @keyframes lumo-notification-enter-slide-down {
      0% {
        transform: translateY(-200%);
        opacity: 0;
      }
    }

    @keyframes lumo-notification-exit-slide-up {
      100% {
        transform: translateY(-200%);
        opacity: 0;
      }
    }

    @keyframes lumo-notification-enter-slide-up {
      0% {
        transform: translateY(200%);
        opacity: 0;
      }
    }

    @keyframes lumo-notification-exit-slide-down {
      100% {
        transform: translateY(200%);
        opacity: 0;
      }
    }

    :host([slot='middle'][opening]) {
      animation: lumo-notification-enter-fade-in 300ms;
    }

    :host([slot='middle'][closing]) {
      animation: lumo-notification-exit-fade-out 300ms;
    }

    :host([slot^='top'][opening]) {
      animation: lumo-notification-enter-slide-down 300ms;
    }

    :host([slot^='top'][closing]) {
      animation: lumo-notification-exit-slide-up 300ms;
    }

    :host([slot^='bottom'][opening]) {
      animation: lumo-notification-enter-slide-up 300ms;
    }

    :host([slot^='bottom'][closing]) {
      animation: lumo-notification-exit-slide-down 300ms;
    }

    :host([theme='success']) {
      --_focus-ring-gap-color: var(--lumo-success-color);
      --vaadin-focus-ring-color: var(--lumo-success-contrast-color);
    }

    :host([theme='warning']) {
      --_focus-ring-gap-color: var(--lumo-warning-color);
      --vaadin-focus-ring-color: var(--lumo-warning-contrast-color);
    }

    :host([theme='error']) {
      --_focus-ring-gap-color: var(--lumo-error-color);
      --vaadin-focus-ring-color: var(--lumo-error-contrast-color);
    }

    :host([theme='primary']) {
      --_focus-ring-gap-color: var(--lumo-primary-color);
      --vaadin-focus-ring-color: var(--lumo-primary-contrast-color);
    }

    :host([theme~='primary']) [part='overlay'] {
      background: var(--lumo-primary-color);
      color: var(--lumo-primary-contrast-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='primary']) {
      --vaadin-button-background: var(--lumo-shade-20pct);
      --vaadin-button-text-color: var(--lumo-primary-contrast-color);
      --vaadin-button-primary-background: var(--lumo-primary-contrast-color);
      --vaadin-button-primary-text-color: var(--lumo-primary-text-color);
    }

    :host([theme~='contrast']) [part='overlay'] {
      background: var(--lumo-contrast);
      color: var(--lumo-base-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='contrast']) {
      --vaadin-button-background: var(--lumo-contrast-20pct);
      --vaadin-button-text-color: var(--lumo-base-color);
      --vaadin-button-primary-background: var(--lumo-base-color);
      --vaadin-button-primary-text-color: var(--lumo-contrast);
    }

    :host([theme~='success']) [part='overlay'] {
      background: var(--lumo-success-color);
      color: var(--lumo-success-contrast-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='success']) {
      --vaadin-button-background: var(--lumo-shade-20pct);
      --vaadin-button-text-color: var(--lumo-success-contrast-color);
      --vaadin-button-primary-background: var(--lumo-success-contrast-color);
      --vaadin-button-primary-text-color: var(--lumo-success-text-color);
    }

    :host([theme~='error']) [part='overlay'] {
      background: var(--lumo-error-color);
      color: var(--lumo-error-contrast-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='error']) {
      --vaadin-button-background: var(--lumo-shade-20pct);
      --vaadin-button-text-color: var(--lumo-error-contrast-color);
      --vaadin-button-primary-background: var(--lumo-error-contrast-color);
      --vaadin-button-primary-text-color: var(--lumo-error-text-color);
    }

    :host([theme~='warning']) [part='overlay'] {
      background: var(--lumo-warning-color);
      color: var(--lumo-warning-contrast-color);
      box-shadow:
        inset 0 0 0 1px var(--lumo-contrast-20pct),
        var(--lumo-box-shadow-l);
    }

    :host([theme~='warning']) {
      --vaadin-button-background: var(--lumo-shade-20pct);
      --vaadin-button-text-color: var(--lumo-warning-contrast-color);
      --vaadin-button-primary-background: var(--lumo-shade-50pct);
      --vaadin-button-primary-text-color: var(--lumo-primary-contrast-color);
    }
  `,
  { moduleId: "lumo-notification-card" }
);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Va = (i, t) => (i == null ? void 0 : i._$litType$) !== void 0;
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const mt = (i) => i.test(navigator.userAgent), si = (i) => i.test(navigator.platform), ja = (i) => i.test(navigator.vendor);
mt(/Android/u);
mt(/Chrome/u) && ja(/Google Inc/u);
mt(/Firefox/u);
const qa = si(/^iPad/u) || si(/^Mac/u) && navigator.maxTouchPoints > 1, Wa = si(/^iPhone/u), pr = Wa || qa;
mt(/^((?!chrome|android).)*safari/iu);
const Ka = (() => {
  try {
    return document.createEvent("TouchEvent"), !0;
  } catch {
    return !1;
  }
})();
/**
 * @license
 * Copyright (c) 2023 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const ki = (i) => class extends i {
  static get properties() {
    return {
      /**
       * A space-delimited list of CSS class names to set on the overlay element.
       * This property does not affect other CSS class names set manually via JS.
       *
       * Note, if the CSS class name was set with this property, clearing it will
       * remove it from the overlay, even if the same class name was also added
       * manually, e.g. by using `classList.add()` in the `renderer` function.
       *
       * @attr {string} overlay-class
       */
      overlayClass: {
        type: String
      },
      /**
       * An overlay element on which CSS class names are set.
       *
       * @protected
       */
      _overlayElement: {
        type: Object
      }
    };
  }
  static get observers() {
    return ["__updateOverlayClassNames(overlayClass, _overlayElement)"];
  }
  /** @private */
  __updateOverlayClassNames(e, o) {
    if (!o || e === void 0)
      return;
    const { classList: r } = o;
    if (this.__initialClasses || (this.__initialClasses = new Set(r)), Array.isArray(this.__previousClasses)) {
      const n = this.__previousClasses.filter((a) => !this.__initialClasses.has(a));
      n.length > 0 && r.remove(...n);
    }
    const s = typeof e == "string" ? e.split(" ").filter(Boolean) : [];
    s.length > 0 && r.add(...s), this.__previousClasses = s;
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function fr(i) {
  if (window.Vaadin && window.Vaadin.templateRendererCallback) {
    window.Vaadin.templateRendererCallback(i);
    return;
  }
  i.querySelector("template") && console.warn(
    `WARNING: <template> inside <${i.localName}> is no longer supported. Import @vaadin/polymer-legacy-adapter/template-renderer.js to enable compatibility.`
  );
}
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Ya extends k(z(x)) {
  static get template() {
    return y`
      <style>
        :host {
          position: fixed;
          z-index: 1000;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          box-sizing: border-box;

          display: flex;
          flex-direction: column;
          align-items: stretch;
          pointer-events: none;
        }

        [region-group] {
          flex: 1 1 0%;
          display: flex;
        }

        [region-group='top'] {
          align-items: flex-start;
        }

        [region-group='bottom'] {
          align-items: flex-end;
        }

        [region-group] > [region] {
          flex: 1 1 0%;
        }

        @media (max-width: 420px) {
          [region-group] {
            flex-direction: column;
            align-items: stretch;
          }

          [region-group='top'] {
            justify-content: flex-start;
          }

          [region-group='bottom'] {
            justify-content: flex-end;
          }

          [region-group] > [region] {
            flex: initial;
          }
        }
      </style>

      <div region="top-stretch"><slot name="top-stretch"></slot></div>
      <div region-group="top">
        <div region="top-start"><slot name="top-start"></slot></div>
        <div region="top-center"><slot name="top-center"></slot></div>
        <div region="top-end"><slot name="top-end"></slot></div>
      </div>
      <div region="middle"><slot name="middle"></slot></div>
      <div region-group="bottom">
        <div region="bottom-start"><slot name="bottom-start"></slot></div>
        <div region="bottom-center"><slot name="bottom-center"></slot></div>
        <div region="bottom-end"><slot name="bottom-end"></slot></div>
      </div>
      <div region="bottom-stretch"><slot name="bottom-stretch"></slot></div>
    `;
  }
  static get is() {
    return "vaadin-notification-container";
  }
  static get properties() {
    return {
      /**
       * True when the container is opened
       * @type {boolean}
       */
      opened: {
        type: Boolean,
        value: !1,
        observer: "_openedChanged"
      }
    };
  }
  constructor() {
    super(), this._boundVaadinOverlayClose = this._onVaadinOverlayClose.bind(this), pr && (this._boundIosResizeListener = () => this._detectIosNavbar());
  }
  /** @private */
  _openedChanged(t) {
    t ? (document.body.appendChild(this), document.addEventListener("vaadin-overlay-close", this._boundVaadinOverlayClose), this._boundIosResizeListener && (this._detectIosNavbar(), window.addEventListener("resize", this._boundIosResizeListener))) : (document.body.removeChild(this), document.removeEventListener("vaadin-overlay-close", this._boundVaadinOverlayClose), this._boundIosResizeListener && window.removeEventListener("resize", this._boundIosResizeListener));
  }
  /** @private */
  _detectIosNavbar() {
    const t = window.innerHeight, o = window.innerWidth > t, r = document.documentElement.clientHeight;
    o && r > t ? this.style.bottom = `${r - t}px` : this.style.bottom = "0";
  }
  /** @private */
  _onVaadinOverlayClose(t) {
    const e = t.detail.sourceEvent;
    e && e.composedPath().indexOf(this) >= 0 && t.preventDefault();
  }
}
class Ga extends k(x) {
  static get template() {
    return y`
      <style>
        :host {
          display: block;
        }

        [part='overlay'] {
          pointer-events: auto;
        }

        @media (forced-colors: active) {
          [part='overlay'] {
            outline: 3px solid;
          }
        }
      </style>

      <div part="overlay">
        <div part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  static get is() {
    return "vaadin-notification-card";
  }
  /** @protected */
  ready() {
    super.ready(), this.setAttribute("role", "alert"), this.setAttribute("aria-live", "polite");
  }
}
class R extends ki(ct(z(x))) {
  static get template() {
    return y`
      <style>
        :host {
          display: none !important;
        }
      </style>
      <vaadin-notification-card theme$="[[_theme]]"> </vaadin-notification-card>
    `;
  }
  static get is() {
    return "vaadin-notification";
  }
  static get properties() {
    return {
      /**
       * The duration in milliseconds to show the notification.
       * Set to `0` or a negative number to disable the notification auto-closing.
       * @type {number}
       */
      duration: {
        type: Number,
        value: 5e3
      },
      /**
       * True if the notification is currently displayed.
       * @type {boolean}
       */
      opened: {
        type: Boolean,
        value: !1,
        notify: !0,
        observer: "_openedChanged"
      },
      /**
       * Alignment of the notification in the viewport
       * Valid values are `top-stretch|top-start|top-center|top-end|middle|bottom-start|bottom-center|bottom-end|bottom-stretch`
       * @type {!NotificationPosition}
       */
      position: {
        type: String,
        value: "bottom-start",
        observer: "_positionChanged"
      },
      /**
       * Custom function for rendering the content of the notification.
       * Receives two arguments:
       *
       * - `root` The `<vaadin-notification-card>` DOM element. Append
       *   your content to it.
       * - `notification` The reference to the `<vaadin-notification>` element.
       * @type {!NotificationRenderer | undefined}
       */
      renderer: Function
    };
  }
  static get observers() {
    return ["_durationChanged(duration, opened)", "_rendererChanged(renderer, opened, _overlayElement)"];
  }
  /**
   * Shows a notification with the given content.
   * By default, positions the notification at `bottom-start` and uses a 5 second duration.
   * An options object can be passed to configure the notification.
   * The options object has the following structure:
   *
   * ```
   * {
   *   position?: string
   *   duration?: number
   *   theme?: string
   * }
   * ```
   *
   * See the individual documentation for:
   * - [`position`](#/elements/vaadin-notification#property-position)
   * - [`duration`](#/elements/vaadin-notification#property-duration)
   *
   * @param contents the contents to show, either as a string or a Lit template.
   * @param options optional options for customizing the notification.
   */
  static show(t, e) {
    return Va(t) ? R._createAndShowNotification((o) => {
      Ao(t, o);
    }, e) : R._createAndShowNotification((o) => {
      o.innerText = t;
    }, e);
  }
  /** @private */
  static _createAndShowNotification(t, e) {
    const o = document.createElement(R.is);
    return e && Number.isFinite(e.duration) && (o.duration = e.duration), e && e.position && (o.position = e.position), e && e.theme && o.setAttribute("theme", e.theme), o.renderer = t, document.body.appendChild(o), o.opened = !0, o.addEventListener("opened-changed", (r) => {
      r.detail.value || o.remove();
    }), o;
  }
  /** @private */
  get _container() {
    return R._container || (R._container = document.createElement("vaadin-notification-container"), document.body.appendChild(R._container)), R._container;
  }
  /** @protected */
  get _card() {
    return this._overlayElement;
  }
  /** @protected */
  ready() {
    super.ready(), this._overlayElement = this.shadowRoot.querySelector("vaadin-notification-card"), fr(this);
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback(), queueMicrotask(() => {
      this.isConnected || (this.opened = !1);
    });
  }
  /**
   * Requests an update for the content of the notification.
   * While performing the update, it invokes the renderer passed in the `renderer` property.
   *
   * It is not guaranteed that the update happens immediately (synchronously) after it is requested.
   */
  requestContentUpdate() {
    this.renderer && this.renderer(this._card, this);
  }
  /** @private */
  _rendererChanged(t, e, o) {
    if (!o)
      return;
    const r = this._oldRenderer !== t;
    this._oldRenderer = t, r && (o.innerHTML = "", delete o._$litPart$), e && (this._didAnimateNotificationAppend || this._animatedAppendNotificationCard(), this.requestContentUpdate());
  }
  /**
   * Opens the notification.
   */
  open() {
    this.opened = !0;
  }
  /**
   * Closes the notification.
   */
  close() {
    this.opened = !1;
  }
  /** @private */
  _openedChanged(t) {
    t ? (this._container.opened = !0, this._animatedAppendNotificationCard()) : this._card && this._closeNotificationCard();
  }
  /** @private */
  __cleanUpOpeningClosingState() {
    this._card.removeAttribute("opening"), this._card.removeAttribute("closing"), this._card.removeEventListener("animationend", this.__animationEndListener);
  }
  /** @private */
  _animatedAppendNotificationCard() {
    this._card ? (this.__cleanUpOpeningClosingState(), this._card.setAttribute("opening", ""), this._appendNotificationCard(), this.__animationEndListener = () => this.__cleanUpOpeningClosingState(), this._card.addEventListener("animationend", this.__animationEndListener), this._didAnimateNotificationAppend = !0) : this._didAnimateNotificationAppend = !1;
  }
  /** @private */
  _appendNotificationCard() {
    if (this._card) {
      if (!this._container.shadowRoot.querySelector(`slot[name="${this.position}"]`)) {
        console.warn(`Invalid alignment parameter provided: position=${this.position}`);
        return;
      }
      this._card.slot = this.position, this._container.firstElementChild && /top/u.test(this.position) ? this._container.insertBefore(this._card, this._container.firstElementChild) : this._container.appendChild(this._card);
    }
  }
  /** @private */
  _removeNotificationCard() {
    this._card.parentNode && this._card.parentNode.removeChild(this._card), this._card.removeAttribute("closing"), this._container.opened = !!this._container.firstElementChild, this.dispatchEvent(new CustomEvent("closed"));
  }
  /** @private */
  _closeNotificationCard() {
    this._durationTimeoutId && clearTimeout(this._durationTimeoutId), this._animatedRemoveNotificationCard();
  }
  /** @private */
  _animatedRemoveNotificationCard() {
    this.__cleanUpOpeningClosingState(), this._card.setAttribute("closing", "");
    const t = getComputedStyle(this._card).getPropertyValue("animation-name");
    t && t !== "none" ? (this.__animationEndListener = () => {
      this._removeNotificationCard(), this.__cleanUpOpeningClosingState();
    }, this._card.addEventListener("animationend", this.__animationEndListener)) : this._removeNotificationCard();
  }
  /** @private */
  _positionChanged() {
    this.opened && this._animatedAppendNotificationCard();
  }
  /** @private */
  _durationChanged(t, e) {
    e && (clearTimeout(this._durationTimeoutId), t > 0 && (this._durationTimeoutId = setTimeout(() => this.close(), t)));
  }
  /**
   * Fired when the notification is closed.
   *
   * @event closed
   */
}
b(Ya);
b(Ga);
b(R);
var Ja = Object.defineProperty, Za = Object.getOwnPropertyDescriptor, _t = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? Za(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && Ja(t, e, r), r;
};
let Me = class extends P {
  constructor() {
    super(...arguments), this.label = "Oops!", this.link = "", this.message = "";
  }
  render() {
    return N`
      <vaadin-button @click=${this.onClick} theme="primary" style="cursor: pointer;">
        ${this.label}
      </vaadin-button>`;
  }
  onClick() {
    this.link ? location.assign(this.link) : this.message ? R.show(this.message, {
      position: "bottom-center",
      duration: 3500,
      theme: "contrast"
    }) : console.log("as-button clicked!");
  }
};
_t([
  g({ type: String })
], Me.prototype, "label", 2);
_t([
  g({ type: String })
], Me.prototype, "link", 2);
_t([
  g({ type: String })
], Me.prototype, "message", 2);
Me = _t([
  L("as-button")
], Me);
m(
  "vaadin-input-container",
  p`
    :host {
      background: var(--_background);
      padding: 0 calc(0.375em + var(--_input-container-radius) / 4 - 1px);
      font-weight: 500;
      line-height: 1;
      position: relative;
      cursor: text;
      box-sizing: border-box;
      border-radius:
        /* See https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius#syntax */
        var(--vaadin-input-field-top-start-radius, var(--_input-container-radius))
        var(--vaadin-input-field-top-end-radius, var(--_input-container-radius))
        var(--vaadin-input-field-bottom-end-radius, var(--_input-container-radius))
        var(--vaadin-input-field-bottom-start-radius, var(--_input-container-radius));
      /* Fallback */
      --_input-container-radius: var(--vaadin-input-field-border-radius, var(--lumo-border-radius-m));
      --_input-height: var(--lumo-text-field-size, var(--lumo-size-m));
      /* Default values */
      --_background: var(--vaadin-input-field-background, var(--lumo-contrast-10pct));
      --_hover-highlight: var(--vaadin-input-field-hover-highlight, var(--lumo-contrast-50pct));
      --_input-border-color: var(--vaadin-input-field-border-color, var(--lumo-contrast-50pct));
      --_icon-color: var(--vaadin-input-field-icon-color, var(--lumo-contrast-60pct));
      --_icon-size: var(--vaadin-input-field-icon-size, var(--lumo-icon-size-m));
      --_invalid-background: var(--vaadin-input-field-invalid-background, var(--lumo-error-color-10pct));
      --_invalid-hover-highlight: var(--vaadin-input-field-invalid-hover-highlight, var(--lumo-error-color-50pct));
      --_disabled-background: var(--vaadin-input-field-disabled-background, var(--lumo-contrast-5pct));
      --_disabled-value-color: var(--vaadin-input-field-disabled-value-color, var(--lumo-disabled-text-color));
    }

    :host([dir='rtl']) {
      border-radius:
        /* Don't use logical props, see https://github.com/vaadin/vaadin-time-picker/issues/145 */
        var(--vaadin-input-field-top-end-radius, var(--_input-container-radius))
        var(--vaadin-input-field-top-start-radius, var(--_input-container-radius))
        var(--vaadin-input-field-bottom-start-radius, var(--_input-container-radius))
        var(--vaadin-input-field-bottom-end-radius, var(--_input-container-radius));
    }

    /* Used for hover and activation effects */
    :host::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: var(--_hover-highlight);
      opacity: 0;
      transition:
        transform 0.15s,
        opacity 0.2s;
      transform-origin: 100% 0;
    }

    ::slotted(:not([slot$='fix'])) {
      cursor: inherit;
      min-height: var(--vaadin-input-field-height, var(--_input-height));
      padding: 0 0.25em;
      --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
      -webkit-mask-image: var(--_lumo-text-field-overflow-mask-image);
      mask-image: var(--_lumo-text-field-overflow-mask-image);
    }

    /* Read-only */
    :host([readonly]) {
      color: var(--lumo-secondary-text-color);
      background-color: transparent;
      cursor: default;
    }

    :host([readonly])::after {
      background-color: transparent;
      opacity: 1;
      border: var(--vaadin-input-field-readonly-border, 1px dashed var(--lumo-contrast-30pct));
    }

    /* Disabled */
    :host([disabled]) {
      background: var(--_disabled-background);
    }

    :host([disabled]) ::slotted(:not([slot$='fix'])) {
      -webkit-text-fill-color: var(--_disabled-value-color);
      color: var(--_disabled-value-color);
    }

    /* Invalid */
    :host([invalid]) {
      background: var(--_invalid-background);
    }

    :host([invalid]:not([readonly]))::after {
      background: var(--_invalid-hover-highlight);
    }

    /* Slotted icons */
    ::slotted(vaadin-icon) {
      color: var(--_icon-color);
      width: var(--_icon-size);
      height: var(--_icon-size);
    }

    /* Vaadin icons are based on a 16x16 grid (unlike Lumo and Material icons with 24x24), so they look too big by default */
    ::slotted(vaadin-icon[icon^='vaadin:']) {
      padding: 0.25em;
      box-sizing: border-box !important;
    }

    /* Text align */
    :host([dir='rtl']) ::slotted(:not([slot$='fix'])) {
      --_lumo-text-field-overflow-mask-image: linear-gradient(to right, transparent, #000 1.25em);
    }

    @-moz-document url-prefix() {
      :host([dir='rtl']) ::slotted(:not([slot$='fix'])) {
        mask-image: var(--_lumo-text-field-overflow-mask-image);
      }
    }

    :host([theme~='align-left']) ::slotted(:not([slot$='fix'])) {
      text-align: start;
      --_lumo-text-field-overflow-mask-image: none;
    }

    :host([theme~='align-center']) ::slotted(:not([slot$='fix'])) {
      text-align: center;
      --_lumo-text-field-overflow-mask-image: none;
    }

    :host([theme~='align-right']) ::slotted(:not([slot$='fix'])) {
      text-align: end;
      --_lumo-text-field-overflow-mask-image: none;
    }

    @-moz-document url-prefix() {
      /* Firefox is smart enough to align overflowing text to right */
      :host([theme~='align-right']) ::slotted(:not([slot$='fix'])) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to right, transparent 0.25em, #000 1.5em);
      }
    }

    @-moz-document url-prefix() {
      /* Firefox is smart enough to align overflowing text to right */
      :host([theme~='align-left']) ::slotted(:not([slot$='fix'])) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent 0.25em, #000 1.5em);
      }
    }

    /* RTL specific styles */
    :host([dir='rtl'])::after {
      transform-origin: 0% 0;
    }

    :host([theme~='align-left'][dir='rtl']) ::slotted(:not([slot$='fix'])) {
      --_lumo-text-field-overflow-mask-image: none;
    }

    :host([theme~='align-center'][dir='rtl']) ::slotted(:not([slot$='fix'])) {
      --_lumo-text-field-overflow-mask-image: none;
    }

    :host([theme~='align-right'][dir='rtl']) ::slotted(:not([slot$='fix'])) {
      --_lumo-text-field-overflow-mask-image: none;
    }

    @-moz-document url-prefix() {
      /* Firefox is smart enough to align overflowing text to right */
      :host([theme~='align-right'][dir='rtl']) ::slotted(:not([slot$='fix'])) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to right, transparent 0.25em, #000 1.5em);
      }
    }

    @-moz-document url-prefix() {
      /* Firefox is smart enough to align overflowing text to right */
      :host([theme~='align-left'][dir='rtl']) ::slotted(:not([slot$='fix'])) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent 0.25em, #000 1.5em);
      }
    }
  `,
  { moduleId: "lumo-input-container" }
);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Qa = p`
  @font-face {
    font-family: 'lumo-icons';
    src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABEgAAsAAAAAIjQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAQwAAAFZAIUuKY21hcAAAAYgAAAD4AAADrsCU8d5nbHlmAAACgAAAC2cAABeAWri7U2hlYWQAAA3oAAAAMAAAADZa/6SsaGhlYQAADhgAAAAdAAAAJAbpA35obXR4AAAOOAAAABAAAACspBAAAGxvY2EAAA5IAAAAWAAAAFh57oA4bWF4cAAADqAAAAAfAAAAIAFKAXBuYW1lAAAOwAAAATEAAAIuUUJZCHBvc3QAAA/0AAABKwAAAelm8SzVeJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGS+yDiBgZWBgamKaQ8DA0MPhGZ8wGDIyAQUZWBlZsAKAtJcUxgcXjG+0mIO+p/FEMUcxDANKMwIkgMABn8MLQB4nO3SWW6DMABF0UtwCEnIPM/zhLK8LqhfXRybSP14XUYtHV9hGYQwQBNIo3cUIPkhQeM7rib1ekqnXg981XuC1qvy84lzojleh3puxL0hPjGjRU473teloEefAUNGjJkwZcacBUtWrNmwZceeA0dOnLlw5cadB09elPGhGf+j0NTI/65KfXerT6JhqKnpRKtgOpuqaTrtKjPUlqHmhto21I7pL6i6hlqY3q7qGWrfUAeGOjTUkaGODXViqFNDnRnq3FAXhro01JWhrg11Y6hbQ90Z6t5QD4Z6NNSToZ4N9WKoV0O9GerdUB+G+jTUl6GWRvkL24BkEXictVh9bFvVFb/nxvbz+7Rf/N6zHcd2bCfP+Wic1Z9N0jpNHCD9SNqqoVBgbQoMjY+pjA4hNnWa2pV1rHSIif0DGkyT2k10Kmu1Cag6huj4ZpqYBHSqJsTEJgZCG3TaVBFv595nO3ZIv4RIrPPuvefe884599zzO/cRF8G/tgn6CFFImNgkR0ggX8wlspbhSSWSdrC5ozd30s2dw5afzvgtyz9/zG9t1hV4RtF1pXolowvtzc2z6L2aYUQM45jKH9WDTvd1LRDoDASYWhfTzTyvboXz6uZX4ARX5wrF39y+HM2+CJ8d0pkyqBIqoze3D12ez4DrFoYzxI8dWwMrDlZ2DMqQAR9AROsJU+2smlTPaTTco52BVxXa2a2+I8vvqd2dVHm1LoPeTn/AZPRYGthDYOeZjBjKoFsVGulR3lGU95SeCK44oHU7MhWUGUKZDT3oSUcG2GWuh+EDDfUYA/jhIhl0TOsJNYSEu7mQmi3UzfXwZKA4BsVsHLXQYGgJW95qEtpJ1VcW9HiTriZBlFEqxsDjA09yCNUoQxxwd7KWSTt2y3GTKifkqHRCoWZc3m11Wa/dKdFgXD4kSYfkeJBKd8KMz7J8dZn/cGRCcLGDnA2Ge3bKzcvlnTDNthFWLH7Xt80ua5FMjA4WKelWv5Xo16vHuYzpRbJhhdVlftuRK0VlR27D9lu5TF0DPBi60OrHNO0AfP/uRWvhn/U3LXICE+nh+3IHPUJ8JE6GyBjZQLbjGchlrSgYngF8zyrIF4NJD3atUcgWsWunGN/UHX5B5/yg7uF87Nqp4Gf52F3gH73DjEZNRoqCKAr9giQJp5rGJABpiVE2htNhW9R8nw0jqYjCYcY4LIjwYNScf4WN06IZnZCEqsI4cFaQbo4Z1TsZBx40YhXkHOecaYE5oY37IIQ+iJJ+UsDYSun5MuRSBRZRUUhlY2DqOGajOR6zrSU/5My6l2DnusH1GQgnw5BZP7iuYM/ahcfQ7Z8y51ddfutvuwNqWQ0cBYr8fj0U0vsHpwerVaB2sWhXT2NExi2r1KUE2tUuVMnkepVQrxTmpQrZTG4iu8he8iPyM3KcPE/+RP5KPoE2CEAKclCBzXATxkYOtUY/o961PWRqsj0chRrHFBbtrjP9/P0ven5pcbRdpL94vfsy33e5+izuwz3nFLFPVNayPZx/jdG1fOChflFRvYzsW6L18efgLrSWIgvcqnGJYi4skO4xREURjbDuxKke5v0T3Mrzkt2fi31uyZlLLrqIpEuXXsMlgw442Jb0GAxjS1DM20kBoCzHLXm/jEm0IltdcvU0fEW24jgiwwRjVd9u4NJHcIyoHJcwvyVqgqj5hqBJ1ZWSJryh9p56UWhX1XbhRbW2ZopuZWsQd5y8mEQ8M+C6xjRYxZbDKWf5AgY+Qq/l6wSPk16zDFjowYuu+wjx13mfkxbyDDxadYT/LijZyI0THB+6yfLaWsRcO82zo9mWTNtpO18qlorZoIVMwSN40tky5DOQ1MCIAe24mvlsuwIIxPb10+uXDQ4uWz/9m3rj+ql7p6bufZARuPVq5tXtsn6KwfP8Jy0TeWOyNhUJN6mhX5rkUTtUppQWEMNTqEdaCGKFYKJaQrCE4JtDLYOlNEKmO5kBTPGY2A0N2sY3+dVlo1N9ycBsIGtOjQ2p/tlZvzo0ur4v6cOh8NTospB7U/X40KahoU3bGIH97dnwmtHlYffVG3R1YOwKM2vNhrPhCT5zk64sG53oS4b31aYjqe/B7+kQiXBN+b6h21hNUPMq29B8CU4elINdygMPKF1B+WBTG7Z9ZshpN/xwEuuDQZR+nuoo4CDaAiiwXmLpmukMQyPf/JMclqgL1ixZQ/nnP2VbdUODFGt2fgBvL123rlLYu/6A9ckb7F3K0/CyBMEu6aQoPscroCcacVehvyQyCZAsizsWWBkoLC+WAiWnOksLKaeuQDzGuqSk42aiYTiJ4zf9afl17SrqaTO1f+XlZAfIuYcq7/IqYMaMrksOJ6vHkOCPDq943xcCnHqVD9pHFRpMqSPXrIua1WNs+tOz1U+ciTCDpPk+c4QYJIHnYhxP/kVPAq+ahFpVhPcHp8qyarhiF+HsBU9Hrl+UZa876fbKipL0KqB6OdUveErgtOI97fZ63ae9SvWU6k2w1JfwqnUbHsYcFCJFrC/W12zIMMirWYEHxMPs6LGYSdkSZ5TsNP9PCpwnWC3HKZ1lydNjWHC2Mn3l6vL0dHn1ldP3LTSrX+vKrBqv7KmMr8p0SR6P1NqF63or6XRlIyO90f7+kf7+myOhvt4tq7f09oUiTc2/dycGgqFQcCDRLYmi1NL7fk0CknVMxEg/cdfs/TnpJMNkgqwj17B8beVazSrVbU4lG67IZYOCnWrYy3yBR9cyWcChywos3LJBEdhhFoAdYjiw0rLGm0xU5OzoGm5/ZfmHjVZpNNg6SznzGKDdwv2cCtVn6Eaxo12cfxLprpVtTcZ6hVx6dow7Yq7e8LXO8PY9Jgjoze9yCtU5FNbegcKkQMdCbt9au/te4Ebe0jkc0ukUL32eYnTpNs20h0KpUOhZPYwVcfhZnfdqeCvDfXiuCbAoYWcXERPc/mDQD3/hdF+wK4i/xv3kYfprIpAuMkk2kW3kdtS0kBIKpZwp8KxmsCyfM1MFzAss9LBkDxRyThiaqTLwKYKJVTwmWTudMyz+yks09346MDh4m72yOxCKrt1XMlQ1qPVlTEVVQ1ofdK/sCWjtZu9qGwZ8YZ9PPWlo1IV3eW3+U0aXblP39zrt+JPf6UhEQ1rUjNBULN+utyuaDNW34kpAVuSOeMTyWbSNWnooFu+QFNWQ4d/Ox4IPWx41fP/fB/Rjeoz08ezPA9TysMtmnOXfGN7Ui3xIYLDALrlDLOP09qtJuY2OeL0+QZXdRnR1nxRVBF/SOyKKPpcrn9mWzH4rH9IidE+PTNU2182+hOgSItrE1slByS24vaLvJpxOqe4Pduf3HJkZ+jLqUz9rRzB7p8gKcgWZwV1L8JtUS5Z2JxZSOCuBoMTQihMzLbCPA0KqGMAljRQjONklW/wjnXKy8vxT/Elvm3/KiMUMOoV0/vnDYlhec0SMKtt3/kKMyOt33tj2bqxQLsTjSGLl+EAsNhCnTyRGktW55EgCn/A4PlnWn+Mg8bgZrWqHxTbPwMuyy1u5YeZF2SUM7JRhddwRgiRuxpmgJmxn9ZW7XpcF3ViX/ar6ptRpGJ0S9Adg4qhb9sI3vbL7qNJV/y4i07t5TZBiho1imFoMz3gED+CtjYUxvP4SOxov4bFoNPg5aR1e+G4UgDPoedJTpogyCJ7oYvRqoVS0MQAy+CoNEdTDUjok5ZHZL/WtjV7rFj3PKQE3iKp7ou+rIxN3b9LB1dGjeT4cvKo3FrnWpYpuaFd/h3dtV8UeKN1Y9hpR3dt4p0H/zKuPQq0kZQUIIpuDfoiETsnIk+gCWMJZUXHtE8V9LkUc2TE8vOMbO4ax/MACabzyaGXc7u3FBr11ThBdB8SIeMAlCntG2KThHSPsaj2Dc9KNyY2a0KZ7ODaTHoRiFkeYz+shZBpCS4X6471KKKnuHd84edfk5F37d1XO5bbkcltu2ZLNbvnPXiUVAnVvprJrP+NObryjxrllS65md6Tm6wzFHRR4dY3QUUjb7MgxaIixU8hspi98fl/Xc+IB4iU66eCVL9YfAfahiSUt4TONS8x0D8W7u8vd3fGWx6OXlM/U1IoU/s61PGhpyXRFa3eReq2qG56lvmYtXavCC1iN7lbiBpWxXHU+cSlztVLVz0tVN600fVsLxaVDknhYioeoXP3t4lqV1r79MAw0GCI1FTL1YIGzPL1MMlJ9ZsN9P7lvA2yr9ZFUzwzPrVgxN/x/SS+chwB4nGNgZGBgAOLPrYdY4vltvjJwM78AijDUqG5oRND/XzNPZboF5HIwMIFEAU/lC+J4nGNgZGBgDvqfBSRfMAAB81QGRgZUoA0AVvYDbwAAAHicY2BgYGB+MTQwAM8EJo8AAAAAAE4AmgDoAQoBLAFOAXABmgHEAe4CGgKcAugEmgS8BNYE8gUOBSoFegXQBf4GRAZmBrYHGAeQCBgIUghqCP4JRgm+CdoKBAo+CoQKugr0C1QLmgvAeJxjYGRgYNBmTGEQZQABJiDmAkIGhv9gPgMAGJQBvAB4nG2RPU7DMBiG3/QP0UoIBGJh8QILavozdmRo9w7d09RpUzlx5LgVvQMn4BAcgoEzcAgOwVvzSZVQbcnf48fvFysJgGt8IcJxROiG9TgauODuj5ukG+EW+UG4jR4ehTv0Q+EunjER7uEWmk+IWpc0d3gVbuAKb8JN+nfhFvlDuI17fAp36L+Fu1jgR7iHp+jF7Arbz1Nb1nO93pnEncSJFtrVuS3VKB6e5EyX2iVer9TyoOr9eux9pjJnCzW1pdfGWFU5u9WpjzfeV5PBIBMfp7aAwQ4FLPrIkbKWqDHn+67pDRK4s4lzbsEux5qHvcIIMb/nueSMyTKkE3jWFdNLHLjW2PPmMa1Hxn3GjGW/wjT0HtOG09JU4WxLk9LH2ISuiv9twJn9y8fh9uIXI+BknAAAAHicbY7ZboMwEEW5CVBCSLrv+76kfJRjTwHFsdGAG+Xvy5JUfehIHp0rnxmNN/D6ir3/a4YBhvARIMQOIowQY4wEE0yxiz3s4wCHOMIxTnCKM5zjApe4wjVucIs73OMBj3jCM17wije84wMzfHqJ0EVmUkmmJo77oOmrHvfIRZbXsTCZplTZldlgb3TYGVHProwFs11t1A57tcON2rErR3PBqcwF1/6ctI6k0GSU4JHMSS6WghdJQ99sTbfuN7QLJ9vQ37dNrgyktnIxlDYLJNuqitpRbYWKFNuyDT6pog6oOYKHtKakeakqKjHXpPwlGRcsC+OqxLIiJpXqoqqDMreG2l5bv9Ri3TRX+c23DZna9WFFgmXuO6Ps1Jm/w6ErW8N3FbHn/QC444j0AA==)
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  html {
    --lumo-icons-align-center: '\\ea01';
    --lumo-icons-align-left: '\\ea02';
    --lumo-icons-align-right: '\\ea03';
    --lumo-icons-angle-down: '\\ea04';
    --lumo-icons-angle-left: '\\ea05';
    --lumo-icons-angle-right: '\\ea06';
    --lumo-icons-angle-up: '\\ea07';
    --lumo-icons-arrow-down: '\\ea08';
    --lumo-icons-arrow-left: '\\ea09';
    --lumo-icons-arrow-right: '\\ea0a';
    --lumo-icons-arrow-up: '\\ea0b';
    --lumo-icons-bar-chart: '\\ea0c';
    --lumo-icons-bell: '\\ea0d';
    --lumo-icons-calendar: '\\ea0e';
    --lumo-icons-checkmark: '\\ea0f';
    --lumo-icons-chevron-down: '\\ea10';
    --lumo-icons-chevron-left: '\\ea11';
    --lumo-icons-chevron-right: '\\ea12';
    --lumo-icons-chevron-up: '\\ea13';
    --lumo-icons-clock: '\\ea14';
    --lumo-icons-cog: '\\ea15';
    --lumo-icons-cross: '\\ea16';
    --lumo-icons-download: '\\ea17';
    --lumo-icons-dropdown: '\\ea18';
    --lumo-icons-edit: '\\ea19';
    --lumo-icons-error: '\\ea1a';
    --lumo-icons-eye: '\\ea1b';
    --lumo-icons-eye-disabled: '\\ea1c';
    --lumo-icons-menu: '\\ea1d';
    --lumo-icons-minus: '\\ea1e';
    --lumo-icons-ordered-list: '\\ea1f';
    --lumo-icons-phone: '\\ea20';
    --lumo-icons-photo: '\\ea21';
    --lumo-icons-play: '\\ea22';
    --lumo-icons-plus: '\\ea23';
    --lumo-icons-redo: '\\ea24';
    --lumo-icons-reload: '\\ea25';
    --lumo-icons-search: '\\ea26';
    --lumo-icons-undo: '\\ea27';
    --lumo-icons-unordered-list: '\\ea28';
    --lumo-icons-upload: '\\ea29';
    --lumo-icons-user: '\\ea2a';
  }
`;
fe("font-icons", Qa);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const mr = p`
  [part$='button'] {
    flex: none;
    width: 1em;
    height: 1em;
    line-height: 1;
    font-size: var(--lumo-icon-size-m);
    text-align: center;
    color: var(--lumo-contrast-60pct);
    transition: 0.2s color;
    cursor: var(--lumo-clickable-cursor);
  }

  [part$='button']:hover {
    color: var(--lumo-contrast-90pct);
  }

  :host([disabled]) [part$='button'],
  :host([readonly]) [part$='button'] {
    color: var(--lumo-contrast-20pct);
    cursor: default;
  }

  [part$='button']::before {
    font-family: 'lumo-icons';
    display: block;
  }
`;
m("", mr, { moduleId: "lumo-field-button" });
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const _r = p`
  :host {
    --_helper-spacing: var(--vaadin-input-field-helper-spacing, 0.4em);
  }

  :host([has-helper]) [part='helper-text']::before {
    content: '';
    display: block;
    height: var(--_helper-spacing);
  }

  [part='helper-text'] {
    display: block;
    color: var(--vaadin-input-field-helper-color, var(--lumo-secondary-text-color));
    font-size: var(--vaadin-input-field-helper-font-size, var(--lumo-font-size-xs));
    line-height: var(--lumo-line-height-xs);
    font-weight: var(--vaadin-input-field-helper-font-weight, 400);
    margin-left: calc(var(--lumo-border-radius-m) / 4);
    transition: color 0.2s;
  }

  :host(:hover:not([readonly])) [part='helper-text'] {
    color: var(--lumo-body-text-color);
  }

  :host([disabled]) [part='helper-text'] {
    color: var(--lumo-disabled-text-color);
    -webkit-text-fill-color: var(--lumo-disabled-text-color);
  }

  :host([has-helper][theme~='helper-above-field']) [part='helper-text']::before {
    display: none;
  }

  :host([has-helper][theme~='helper-above-field']) [part='helper-text']::after {
    content: '';
    display: block;
    height: var(--_helper-spacing);
  }

  :host([has-helper][theme~='helper-above-field']) [part='label'] {
    order: 0;
    padding-bottom: var(--_helper-spacing);
  }

  :host([has-helper][theme~='helper-above-field']) [part='helper-text'] {
    order: 1;
  }

  :host([has-helper][theme~='helper-above-field']) [part='label'] + * {
    order: 2;
  }

  :host([has-helper][theme~='helper-above-field']) [part='error-message'] {
    order: 3;
  }
`;
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Pi = p`
  [part='label'] {
    align-self: flex-start;
    color: var(--vaadin-input-field-label-color, var(--lumo-secondary-text-color));
    font-weight: var(--vaadin-input-field-label-font-weight, 500);
    font-size: var(--vaadin-input-field-label-font-size, var(--lumo-font-size-s));
    margin-left: calc(var(--lumo-border-radius-m) / 4);
    transition: color 0.2s;
    line-height: 1;
    padding-right: 1em;
    padding-bottom: 0.5em;
    /* As a workaround for diacritics being cut off, add a top padding and a
    negative margin to compensate */
    padding-top: 0.25em;
    margin-top: -0.25em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    max-width: 100%;
    box-sizing: border-box;
  }

  :host([focused]:not([readonly])) [part='label'] {
    color: var(--vaadin-input-field-focused-label-color, var(--lumo-primary-text-color));
  }

  :host(:hover:not([readonly]):not([focused])) [part='label'] {
    color: var(--vaadin-input-field-hovered-label-color, var(--lumo-body-text-color));
  }

  /* Touch device adjustment */
  @media (pointer: coarse) {
    :host(:hover:not([readonly]):not([focused])) [part='label'] {
      color: var(--vaadin-input-field-label-color, var(--lumo-secondary-text-color));
    }
  }

  :host([has-label])::before {
    margin-top: calc(var(--lumo-font-size-s) * 1.5);
  }

  :host([has-label][theme~='small'])::before {
    margin-top: calc(var(--lumo-font-size-xs) * 1.5);
  }

  :host([has-label]) {
    padding-top: var(--lumo-space-m);
  }

  :host([has-label]) ::slotted([slot='tooltip']) {
    --vaadin-tooltip-offset-bottom: calc((var(--lumo-space-m) - var(--lumo-space-xs)) * -1);
  }

  :host([required]) [part='required-indicator']::after {
    content: var(--lumo-required-field-indicator, '\\2022');
    transition: opacity 0.2s;
    color: var(--lumo-required-field-indicator-color, var(--lumo-primary-text-color));
    position: absolute;
    right: 0;
    width: 1em;
    text-align: center;
  }

  :host([invalid]) [part='required-indicator']::after {
    color: var(--lumo-required-field-indicator-color, var(--lumo-error-text-color));
  }

  [part='error-message'] {
    margin-left: calc(var(--lumo-border-radius-m) / 4);
    font-size: var(--vaadin-input-field-error-font-size, var(--lumo-font-size-xs));
    line-height: var(--lumo-line-height-xs);
    font-weight: var(--vaadin-input-field-error-font-weight, 400);
    color: var(--vaadin-input-field-error-color, var(--lumo-error-text-color));
    will-change: max-height;
    transition: 0.4s max-height;
    max-height: 5em;
  }

  :host([has-error-message]) [part='error-message']::before,
  :host([has-error-message]) [part='error-message']::after {
    content: '';
    display: block;
    height: 0.4em;
  }

  :host(:not([invalid])) [part='error-message'] {
    max-height: 0;
    overflow: hidden;
  }

  /* RTL specific styles */

  :host([dir='rtl']) [part='label'] {
    margin-left: 0;
    margin-right: calc(var(--lumo-border-radius-m) / 4);
  }

  :host([dir='rtl']) [part='label'] {
    padding-left: 1em;
    padding-right: 0;
  }

  :host([dir='rtl']) [part='required-indicator']::after {
    right: auto;
    left: 0;
  }

  :host([dir='rtl']) [part='error-message'] {
    margin-left: 0;
    margin-right: calc(var(--lumo-border-radius-m) / 4);
  }
`;
m("", Pi, { moduleId: "lumo-required-field" });
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Xa = p`
  :host {
    --lumo-text-field-size: var(--lumo-size-m);
    color: var(--vaadin-input-field-value-color, var(--lumo-body-text-color));
    font-size: var(--vaadin-input-field-value-font-size, var(--lumo-font-size-m));
    font-weight: var(--vaadin-input-field-value-font-weight, 400);
    font-family: var(--lumo-font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    padding: var(--lumo-space-xs) 0;
    --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
    --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
    --_input-height: var(--vaadin-input-field-height, var(--lumo-text-field-size));
    --_disabled-value-color: var(--vaadin-input-field-disabled-value-color, var(--lumo-disabled-text-color));
  }

  :host::before {
    height: var(--_input-height);
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
  }

  :host([focused]) [part='input-field'] ::slotted(:is(input, textarea)) {
    -webkit-mask-image: none;
    mask-image: none;
  }

  ::slotted(:is(input, textarea):placeholder-shown) {
    color: var(--vaadin-input-field-placeholder-color, var(--lumo-secondary-text-color));
  }

  /* Hover */
  :host(:hover:not([readonly]):not([focused])) [part='input-field']::after {
    opacity: var(--vaadin-input-field-hover-highlight-opacity, 0.1);
  }

  /* Touch device adjustment */
  @media (pointer: coarse) {
    :host(:hover:not([readonly]):not([focused])) [part='input-field']::after {
      opacity: 0;
    }

    :host(:active:not([readonly]):not([focused])) [part='input-field']::after {
      opacity: 0.2;
    }
  }

  /* Trigger when not focusing using the keyboard */
  :host([focused]:not([focus-ring]):not([readonly])) [part='input-field']::after {
    transform: scaleX(0);
    transition-duration: 0.15s, 1s;
  }

  /* Focus-ring */
  :host([focus-ring]) [part='input-field'] {
    box-shadow: 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
  }

  /* Read-only and disabled */
  :host(:is([readonly], [disabled])) ::slotted(:is(input, textarea):placeholder-shown) {
    opacity: 0;
  }

  /* Read-only style */
  :host([readonly]) {
    --vaadin-input-field-border-color: transparent;
  }

  /* Disabled style */
  :host([disabled]) {
    pointer-events: none;
    --vaadin-input-field-border-color: var(--lumo-contrast-20pct);
  }

  :host([disabled]) [part='label'],
  :host([disabled]) [part='input-field'] ::slotted([slot$='fix']) {
    color: var(--lumo-disabled-text-color);
    -webkit-text-fill-color: var(--lumo-disabled-text-color);
  }

  :host([disabled]) [part='input-field'] ::slotted(:not([slot$='fix'])) {
    color: var(--_disabled-value-color);
    -webkit-text-fill-color: var(--_disabled-value-color);
  }

  /* Invalid style */
  :host([invalid]) {
    --vaadin-input-field-border-color: var(--lumo-error-color);
  }

  :host([invalid][focus-ring]) [part='input-field'] {
    box-shadow: 0 0 0 2px var(--lumo-error-color-50pct);
  }

  :host([input-prevented]) [part='input-field'] {
    animation: shake 0.15s infinite;
  }

  @keyframes shake {
    25% {
      transform: translateX(4px);
    }
    75% {
      transform: translateX(-4px);
    }
  }

  /* Small theme */
  :host([theme~='small']) {
    font-size: var(--lumo-font-size-s);
    --lumo-text-field-size: var(--lumo-size-s);
  }

  :host([theme~='small']) [part='label'] {
    font-size: var(--lumo-font-size-xs);
  }

  :host([theme~='small']) [part='error-message'] {
    font-size: var(--lumo-font-size-xxs);
  }

  /* Slotted content */
  [part='input-field'] ::slotted(:not(vaadin-icon):not(input):not(textarea)) {
    color: var(--lumo-secondary-text-color);
    font-weight: 400;
  }

  [part='clear-button']::before {
    content: var(--lumo-icons-cross);
  }
`, ve = [Pi, mr, _r, Xa];
m("", ve, {
  moduleId: "lumo-input-field-shared-styles"
});
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-text-field", ve, {
  moduleId: "lumo-text-field-styles"
});
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const el = (i) => class extends i {
  static get properties() {
    return {
      /**
       * If true, the user cannot interact with this element.
       */
      disabled: {
        type: Boolean,
        reflectToAttribute: !0
      },
      /**
       * Set to true to make this element read-only.
       */
      readonly: {
        type: Boolean,
        reflectToAttribute: !0
      },
      /**
       * Set to true when the element is invalid.
       */
      invalid: {
        type: Boolean,
        reflectToAttribute: !0
      }
    };
  }
  /** @protected */
  ready() {
    super.ready(), this.addEventListener("pointerdown", (e) => {
      e.target === this && e.preventDefault();
    }), this.addEventListener("click", (e) => {
      e.target === this && this.shadowRoot.querySelector("slot:not([name])").assignedNodes({ flatten: !0 }).forEach((o) => o.focus && o.focus());
    });
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const tl = p`
  :host {
    display: flex;
    align-items: center;
    flex: 0 1 auto;
    border-radius:
            /* See https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius */
      var(--vaadin-input-field-top-start-radius, var(--__border-radius))
      var(--vaadin-input-field-top-end-radius, var(--__border-radius))
      var(--vaadin-input-field-bottom-end-radius, var(--__border-radius))
      var(--vaadin-input-field-bottom-start-radius, var(--__border-radius));
    --_border-radius: var(--vaadin-input-field-border-radius, 0);
    --_input-border-width: var(--vaadin-input-field-border-width, 0);
    --_input-border-color: var(--vaadin-input-field-border-color, transparent);
    box-shadow: inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
  }

  :host([dir='rtl']) {
    border-radius:
            /* Don't use logical props, see https://github.com/vaadin/vaadin-time-picker/issues/145 */
      var(--vaadin-input-field-top-end-radius, var(--_border-radius))
      var(--vaadin-input-field-top-start-radius, var(--_border-radius))
      var(--vaadin-input-field-bottom-start-radius, var(--_border-radius))
      var(--vaadin-input-field-bottom-end-radius, var(--_border-radius));
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Reset the native input styles */
  ::slotted(input) {
    -webkit-appearance: none;
    -moz-appearance: none;
    flex: auto;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: none;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    min-width: 0;
    font: inherit;
    line-height: normal;
    color: inherit;
    background-color: transparent;
    /* Disable default invalid style in Firefox */
    box-shadow: none;
  }

  ::slotted(*) {
    flex: none;
  }

  ::slotted(:is(input, textarea))::placeholder {
    /* Use ::slotted(input:placeholder-shown) in themes to style the placeholder. */
    /* because ::slotted(...)::placeholder does not work in Safari. */
    font: inherit;
    color: inherit;
    /* Override default opacity in Firefox */
    opacity: 1;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-input-container", tl, { moduleId: "vaadin-input-container-styles" });
class il extends el(k(Q(x))) {
  static get is() {
    return "vaadin-input-container";
  }
  static get template() {
    return y`
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
    `;
  }
}
b(il);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd..
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const ol = p`
  [part='clear-button'] {
    display: none;
    cursor: default;
  }

  [part='clear-button']::before {
    content: '\\2715';
  }

  :host([clear-button-visible][has-value]:not([disabled]):not([readonly])) [part='clear-button'] {
    display: block;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd..
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const vr = p`
  :host {
    display: inline-flex;
    outline: none;
  }

  :host::before {
    content: '\\2003';
    width: 0;
    display: inline-block;
    /* Size and position this element on the same vertical position as the input-field element
          to make vertical align for the host element work as expected */
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:not([has-label])) [part='label'] {
    display: none;
  }

  @media (forced-colors: active) {
    :host(:not([readonly])) [part='input-field'] {
      outline: 1px solid;
      outline-offset: -1px;
    }
    :host([focused]) [part='input-field'] {
      outline-width: 2px;
    }
    :host([disabled]) [part='input-field'] {
      outline-color: GrayText;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd..
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const gr = p`
  [class$='container'] {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    max-width: 100%;
    width: var(--vaadin-field-default-width, 12em);
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd..
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const br = [vr, gr, ol];
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Ti extends M {
  constructor(t, e, o = {}) {
    const { uniqueIdPrefix: r } = o;
    super(t, "input", "input", {
      initializer: (s, n) => {
        n.value && (s.value = n.value), n.type && s.setAttribute("type", n.type), s.id = this.defaultId, typeof e == "function" && e(s);
      },
      useUniqueId: !0,
      uniqueIdPrefix: r
    });
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const vt = C(
  (i) => class extends De(hr(i)) {
    static get properties() {
      return {
        /**
         * Specify that this control should have input focus when the page loads.
         */
        autofocus: {
          type: Boolean
        },
        /**
         * A reference to the focusable element controlled by the mixin.
         * It can be an input, textarea, button or any element with tabindex > -1.
         *
         * Any component implementing this mixin is expected to provide it
         * by using `this._setFocusElement(input)` Polymer API.
         *
         * Toggling `tabindex` attribute on the host element propagates its value to `focusElement`.
         *
         * @protected
         * @type {!HTMLElement}
         */
        focusElement: {
          type: Object,
          readOnly: !0,
          observer: "_focusElementChanged"
        },
        /**
         * Override the property from `TabIndexMixin`
         * to ensure the `tabindex` attribute of the focus element
         * will be restored to `0` after re-enabling the element.
         *
         * @protected
         * @override
         */
        _lastTabIndex: {
          value: 0
        }
      };
    }
    constructor() {
      super(), this._boundOnBlur = this._onBlur.bind(this), this._boundOnFocus = this._onFocus.bind(this);
    }
    /** @protected */
    ready() {
      super.ready(), this.autofocus && !this.disabled && requestAnimationFrame(() => {
        this.focus(), this.setAttribute("focus-ring", "");
      });
    }
    /**
     * @protected
     * @override
     */
    focus() {
      this.focusElement && !this.disabled && this.focusElement.focus();
    }
    /**
     * @protected
     * @override
     */
    blur() {
      this.focusElement && this.focusElement.blur();
    }
    /**
     * @protected
     * @override
     */
    click() {
      this.focusElement && !this.disabled && this.focusElement.click();
    }
    /** @protected */
    _focusElementChanged(e, o) {
      e ? (e.disabled = this.disabled, this._addFocusListeners(e), this.__forwardTabIndex(this.tabindex)) : o && this._removeFocusListeners(o);
    }
    /**
     * @param {HTMLElement} element
     * @protected
     */
    _addFocusListeners(e) {
      e.addEventListener("blur", this._boundOnBlur), e.addEventListener("focus", this._boundOnFocus);
    }
    /**
     * @param {HTMLElement} element
     * @protected
     */
    _removeFocusListeners(e) {
      e.removeEventListener("blur", this._boundOnBlur), e.removeEventListener("focus", this._boundOnFocus);
    }
    /**
     * Focus event does not bubble, so we dispatch it manually
     * on the host element to support adding focus listeners
     * when the focusable element is placed in light DOM.
     * @param {FocusEvent} event
     * @protected
     */
    _onFocus(e) {
      e.stopPropagation(), this.dispatchEvent(new Event("focus"));
    }
    /**
     * Blur event does not bubble, so we dispatch it manually
     * on the host element to support adding blur listeners
     * when the focusable element is placed in light DOM.
     * @param {FocusEvent} event
     * @protected
     */
    _onBlur(e) {
      e.stopPropagation(), this.dispatchEvent(new Event("blur"));
    }
    /**
     * @param {FocusEvent} event
     * @return {boolean}
     * @protected
     * @override
     */
    _shouldSetFocus(e) {
      return e.target === this.focusElement;
    }
    /**
     * @param {FocusEvent} event
     * @return {boolean}
     * @protected
     * @override
     */
    _shouldRemoveFocus(e) {
      return e.target === this.focusElement;
    }
    /**
     * @param {boolean} disabled
     * @param {boolean} oldDisabled
     * @protected
     * @override
     */
    _disabledChanged(e, o) {
      super._disabledChanged(e, o), this.focusElement && (this.focusElement.disabled = e), e && this.blur();
    }
    /**
     * Override an observer from `TabindexMixin`.
     * Do not call super to remove tabindex attribute
     * from the host after it has been forwarded.
     * @param {string} tabindex
     * @protected
     * @override
     */
    _tabindexChanged(e) {
      this.__forwardTabIndex(e);
    }
    /** @private */
    __forwardTabIndex(e) {
      e !== void 0 && this.focusElement && (this.focusElement.tabIndex = e, e !== -1 && (this.tabindex = void 0)), this.disabled && e && (e !== -1 && (this._lastTabIndex = e), this.tabindex = void 0);
    }
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Lt = /* @__PURE__ */ new WeakMap();
function rl(i) {
  return Lt.has(i) || Lt.set(i, /* @__PURE__ */ new Set()), Lt.get(i);
}
function sl(i, t) {
  const e = document.createElement("style");
  e.textContent = i, t === document ? document.head.appendChild(e) : t.insertBefore(e, t.firstChild);
}
const yr = C(
  (i) => class extends i {
    /**
     * List of styles to insert into root.
     * @protected
     */
    get slotStyles() {
      return {};
    }
    /** @protected */
    connectedCallback() {
      super.connectedCallback(), this.__applySlotStyles();
    }
    /** @private */
    __applySlotStyles() {
      const e = this.getRootNode(), o = rl(e);
      this.slotStyles.forEach((r) => {
        o.has(r) || (sl(r, e), o.add(r));
      });
    }
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const gt = C(
  (i) => class extends i {
    static get properties() {
      return {
        /**
         * A reference to the input element controlled by the mixin.
         * Any component implementing this mixin is expected to provide it
         * by using `this._setInputElement(input)` Polymer API.
         *
         * A typical case is using `InputController` that does this automatically.
         * However, the input element does not have to always be native <input>:
         * as an example, <vaadin-combo-box-light> accepts other components.
         *
         * @protected
         * @type {!HTMLElement}
         */
        inputElement: {
          type: Object,
          readOnly: !0,
          observer: "_inputElementChanged"
        },
        /**
         * String used to define input type.
         * @protected
         */
        type: {
          type: String,
          readOnly: !0
        },
        /**
         * The value of the field.
         */
        value: {
          type: String,
          value: "",
          observer: "_valueChanged",
          notify: !0,
          sync: !0
        },
        /**
         * Whether the input element has a non-empty value.
         *
         * @protected
         */
        _hasInputValue: {
          type: Boolean,
          value: !1,
          observer: "_hasInputValueChanged"
        }
      };
    }
    constructor() {
      super(), this._boundOnInput = this.__onInput.bind(this), this._boundOnChange = this._onChange.bind(this);
    }
    /**
     * Indicates whether the value is different from the default one.
     * Override if the `value` property has a type other than `string`.
     *
     * @protected
     */
    get _hasValue() {
      return this.value != null && this.value !== "";
    }
    /**
     * A property for accessing the input element's value.
     *
     * Override this getter if the property is different from the default `value` one.
     *
     * @protected
     * @return {string}
     */
    get _inputElementValueProperty() {
      return "value";
    }
    /**
     * The input element's value.
     *
     * @protected
     * @return {string}
     */
    get _inputElementValue() {
      return this.inputElement ? this.inputElement[this._inputElementValueProperty] : void 0;
    }
    /**
     * The input element's value.
     *
     * @protected
     */
    set _inputElementValue(e) {
      this.inputElement && (this.inputElement[this._inputElementValueProperty] = e);
    }
    /**
     * Clear the value of the field.
     */
    clear() {
      this._hasInputValue = !1, this.value = "", this._inputElementValue = "";
    }
    /**
     * Add event listeners to the input element instance.
     * Override this method to add custom listeners.
     * @param {!HTMLElement} input
     * @protected
     */
    _addInputListeners(e) {
      e.addEventListener("input", this._boundOnInput), e.addEventListener("change", this._boundOnChange);
    }
    /**
     * Remove event listeners from the input element instance.
     * @param {!HTMLElement} input
     * @protected
     */
    _removeInputListeners(e) {
      e.removeEventListener("input", this._boundOnInput), e.removeEventListener("change", this._boundOnChange);
    }
    /**
     * A method to forward the value property set on the field
     * programmatically back to the input element value.
     * Override this method to perform additional checks,
     * for example to skip this in certain conditions.
     * @param {string} value
     * @protected
     */
    _forwardInputValue(e) {
      this.inputElement && (this._inputElementValue = e ?? "");
    }
    /**
     * @param {HTMLElement | undefined} input
     * @param {HTMLElement | undefined} oldInput
     * @protected
     */
    _inputElementChanged(e, o) {
      e ? this._addInputListeners(e) : o && this._removeInputListeners(o);
    }
    /**
     * Observer to notify about the change of private property.
     *
     * @private
     */
    _hasInputValueChanged(e, o) {
      (e || o) && this.dispatchEvent(new CustomEvent("has-input-value-changed"));
    }
    /**
     * An input event listener used to update `_hasInputValue` property.
     * Do not override this method.
     *
     * @param {Event} event
     * @private
     */
    __onInput(e) {
      this._setHasInputValue(e), this._onInput(e);
    }
    /**
     * An input event listener used to update the field value.
     *
     * @param {Event} event
     * @protected
     */
    _onInput(e) {
      const o = e.composedPath()[0];
      this.__userInput = e.isTrusted, this.value = o.value, this.__userInput = !1;
    }
    /**
     * A change event listener.
     * Override this method with an actual implementation.
     * @param {Event} _event
     * @protected
     */
    _onChange(e) {
    }
    /**
     * Toggle the has-value attribute based on the value property.
     *
     * @param {boolean} hasValue
     * @protected
     */
    _toggleHasValue(e) {
      this.toggleAttribute("has-value", e);
    }
    /**
     * Observer called when a value property changes.
     * @param {string | undefined} newVal
     * @param {string | undefined} oldVal
     * @protected
     */
    _valueChanged(e, o) {
      this._toggleHasValue(this._hasValue), !(e === "" && o === void 0) && (this.__userInput || this._forwardInputValue(e));
    }
    /**
     * Sets the `_hasInputValue` property based on the `input` event.
     *
     * @param {InputEvent} event
     * @protected
     */
    _setHasInputValue(e) {
      const o = e.composedPath()[0];
      this._hasInputValue = o.value.length > 0;
    }
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const nl = (i) => class extends gt(_e(i)) {
  static get properties() {
    return {
      /**
       * Set to true to display the clear icon which clears the input.
       *
       * It is up to the component to choose where to place the clear icon:
       * in the Shadow DOM or in the light DOM. In any way, a reference to
       * the clear icon element should be provided via the `clearElement` getter.
       *
       * @attr {boolean} clear-button-visible
       */
      clearButtonVisible: {
        type: Boolean,
        reflectToAttribute: !0,
        value: !1
      }
    };
  }
  /**
   * Any element extending this mixin is required to implement this getter.
   * It returns the reference to the clear button element.
   *
   * @protected
   * @return {Element | null | undefined}
   */
  get clearElement() {
    return console.warn(`Please implement the 'clearElement' property in <${this.localName}>`), null;
  }
  /** @protected */
  ready() {
    super.ready(), this.clearElement && (this.clearElement.addEventListener("mousedown", (e) => this._onClearButtonMouseDown(e)), this.clearElement.addEventListener("click", (e) => this._onClearButtonClick(e)));
  }
  /**
   * @param {Event} event
   * @protected
   */
  _onClearButtonClick(e) {
    e.preventDefault(), this._onClearAction();
  }
  /**
   * @param {MouseEvent} event
   * @protected
   */
  _onClearButtonMouseDown(e) {
    e.preventDefault(), Ka || this.inputElement.focus();
  }
  /**
   * Override an event listener inherited from `KeydownMixin` to clear on Esc.
   * Components that extend this mixin can prevent this behavior by overriding
   * this method without calling `super._onEscape` to provide custom logic.
   *
   * @param {KeyboardEvent} event
   * @protected
   * @override
   */
  _onEscape(e) {
    super._onEscape(e), this.clearButtonVisible && this.value && (e.stopPropagation(), this._onClearAction());
  }
  /**
   * Clears the value and dispatches `input` and `change` events
   * on the input element. This method should be called
   * when the clear action originates from the user.
   *
   * @protected
   */
  _onClearAction() {
    this._inputElementValue = "", this.inputElement.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 })), this.inputElement.dispatchEvent(new Event("change", { bubbles: !0 }));
  }
};
/**
 * @license
 * Copyright (c) 2023 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Rt = /* @__PURE__ */ new Map();
function Si(i) {
  return Rt.has(i) || Rt.set(i, /* @__PURE__ */ new WeakMap()), Rt.get(i);
}
function xr(i, t) {
  i && i.removeAttribute(t);
}
function wr(i, t) {
  if (!i || !t)
    return;
  const e = Si(t);
  if (e.has(i))
    return;
  const o = vi(i.getAttribute(t));
  e.set(i, new Set(o));
}
function al(i, t) {
  if (!i || !t)
    return;
  const e = Si(t), o = e.get(i);
  !o || o.size === 0 ? i.removeAttribute(t) : or(i, t, ht(o)), e.delete(i);
}
function se(i, t, e = { newId: null, oldId: null, fromUser: !1 }) {
  if (!i || !t)
    return;
  const { newId: o, oldId: r, fromUser: s } = e, n = Si(t), a = n.get(i);
  if (!s && a) {
    r && a.delete(r), o && a.add(o);
    return;
  }
  s && (a ? o || n.delete(i) : wr(i, t), xr(i, t)), _a(i, t, r);
  const l = o || ht(a);
  l && or(i, t, l);
}
function ll(i, t) {
  wr(i, t), xr(i, t);
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class dl {
  constructor(t) {
    this.host = t, this.__required = !1;
  }
  /**
   * Sets a target element to which ARIA attributes are added.
   *
   * @param {HTMLElement} target
   */
  setTarget(t) {
    this.__target = t, this.__setAriaRequiredAttribute(this.__required), this.__setLabelIdToAriaAttribute(this.__labelId, this.__labelId), this.__labelIdFromUser != null && this.__setLabelIdToAriaAttribute(this.__labelIdFromUser, this.__labelIdFromUser, !0), this.__setErrorIdToAriaAttribute(this.__errorId), this.__setHelperIdToAriaAttribute(this.__helperId), this.setAriaLabel(this.__label);
  }
  /**
   * Toggles the `aria-required` attribute on the target element
   * if the target is the host component (e.g. a field group).
   * Otherwise, it does nothing.
   *
   * @param {boolean} required
   */
  setRequired(t) {
    this.__setAriaRequiredAttribute(t), this.__required = t;
  }
  /**
   * Defines the `aria-label` attribute of the target element.
   *
   * To remove the attribute, pass `null` as `label`.
   *
   * @param {string | null | undefined} label
   */
  setAriaLabel(t) {
    this.__setAriaLabelToAttribute(t), this.__label = t;
  }
  /**
   * Links the target element with a slotted label element
   * via the target's attribute `aria-labelledby`.
   *
   * To unlink the previous slotted label element, pass `null` as `labelId`.
   *
   * @param {string | null} labelId
   */
  setLabelId(t, e = !1) {
    const o = e ? this.__labelIdFromUser : this.__labelId;
    this.__setLabelIdToAriaAttribute(t, o, e), e ? this.__labelIdFromUser = t : this.__labelId = t;
  }
  /**
   * Links the target element with a slotted error element via the target's attribute:
   * - `aria-labelledby` if the target is the host component (e.g a field group).
   * - `aria-describedby` otherwise.
   *
   * To unlink the previous slotted error element, pass `null` as `errorId`.
   *
   * @param {string | null} errorId
   */
  setErrorId(t) {
    this.__setErrorIdToAriaAttribute(t, this.__errorId), this.__errorId = t;
  }
  /**
   * Links the target element with a slotted helper element via the target's attribute:
   * - `aria-labelledby` if the target is the host component (e.g a field group).
   * - `aria-describedby` otherwise.
   *
   * To unlink the previous slotted helper element, pass `null` as `helperId`.
   *
   * @param {string | null} helperId
   */
  setHelperId(t) {
    this.__setHelperIdToAriaAttribute(t, this.__helperId), this.__helperId = t;
  }
  /**
   * @param {string | null | undefined} label
   * @private
   * */
  __setAriaLabelToAttribute(t) {
    this.__target && (t ? (ll(this.__target, "aria-labelledby"), this.__target.setAttribute("aria-label", t)) : this.__label && (al(this.__target, "aria-labelledby"), this.__target.removeAttribute("aria-label")));
  }
  /**
   * @param {string | null | undefined} labelId
   * @param {string | null | undefined} oldLabelId
   * @param {boolean | null | undefined} fromUser
   * @private
   */
  __setLabelIdToAriaAttribute(t, e, o) {
    se(this.__target, "aria-labelledby", { newId: t, oldId: e, fromUser: o });
  }
  /**
   * @param {string | null | undefined} errorId
   * @param {string | null | undefined} oldErrorId
   * @private
   */
  __setErrorIdToAriaAttribute(t, e) {
    se(this.__target, "aria-describedby", { newId: t, oldId: e, fromUser: !1 });
  }
  /**
   * @param {string | null | undefined} helperId
   * @param {string | null | undefined} oldHelperId
   * @private
   */
  __setHelperIdToAriaAttribute(t, e) {
    se(this.__target, "aria-describedby", { newId: t, oldId: e, fromUser: !1 });
  }
  /**
   * @param {boolean} required
   * @private
   */
  __setAriaRequiredAttribute(t) {
    this.__target && (["input", "textarea"].includes(this.__target.localName) || (t ? this.__target.setAttribute("aria-required", "true") : this.__target.removeAttribute("aria-required")));
  }
}
/**
 * @license
 * Copyright (c) 2022 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Oi extends M {
  constructor(t, e, o, r = {}) {
    super(t, e, o, { ...r, useUniqueId: !0 });
  }
  /**
   * Override to initialize the newly added custom node.
   *
   * @param {Node} node
   * @protected
   * @override
   */
  initCustomNode(t) {
    this.__updateNodeId(t), this.__notifyChange(t);
  }
  /**
   * Override to notify the controller host about removal of
   * the custom node, and to apply the default one if needed.
   *
   * @param {Node} _node
   * @protected
   * @override
   */
  teardownNode(t) {
    const e = this.getSlotChild();
    e && e !== this.defaultNode ? this.__notifyChange(e) : (this.restoreDefaultNode(), this.updateDefaultNode(this.node));
  }
  /**
   * Override method inherited from `SlotMixin`
   * to set ID attribute on the default node.
   *
   * @return {Node}
   * @protected
   * @override
   */
  attachDefaultNode() {
    const t = super.attachDefaultNode();
    return t && this.__updateNodeId(t), t;
  }
  /**
   * Override to restore default node when a custom one is removed.
   *
   * @protected
   */
  restoreDefaultNode() {
  }
  /**
   * Override to update default node text on property change.
   *
   * @param {Node} node
   * @protected
   */
  updateDefaultNode(t) {
    this.__notifyChange(t);
  }
  /**
   * Setup the mutation observer on the node to update ID and notify host.
   * Node doesn't get observed automatically until this method is called.
   *
   * @param {Node} node
   * @protected
   */
  observeNode(t) {
    this.__nodeObserver && this.__nodeObserver.disconnect(), this.__nodeObserver = new MutationObserver((e) => {
      e.forEach((o) => {
        const r = o.target, s = r === this.node;
        o.type === "attributes" ? s && this.__updateNodeId(r) : (s || r.parentElement === this.node) && this.__notifyChange(this.node);
      });
    }), this.__nodeObserver.observe(t, {
      attributes: !0,
      attributeFilter: ["id"],
      childList: !0,
      subtree: !0,
      characterData: !0
    });
  }
  /**
   * Returns true if a node is an HTML element with children,
   * or is a defined custom element, or has non-empty text.
   *
   * @param {Node} node
   * @return {boolean}
   * @private
   */
  __hasContent(t) {
    return t ? t.nodeType === Node.ELEMENT_NODE && (customElements.get(t.localName) || t.children.length > 0) || t.textContent && t.textContent.trim() !== "" : !1;
  }
  /**
   * Fire an event to notify the controller host about node changes.
   *
   * @param {Node} node
   * @private
   */
  __notifyChange(t) {
    this.dispatchEvent(
      new CustomEvent("slot-content-changed", {
        detail: { hasContent: this.__hasContent(t), node: t }
      })
    );
  }
  /**
   * Set default ID on the node in case it is an HTML element.
   *
   * @param {Node} node
   * @private
   */
  __updateNodeId(t) {
    const e = !this.nodes || t === this.nodes[0];
    t.nodeType === Node.ELEMENT_NODE && (!this.multiple || e) && !t.id && (t.id = this.defaultId);
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class cl extends Oi {
  constructor(t) {
    super(t, "error-message", "div");
  }
  /**
   * Set the error message element text content.
   *
   * @param {string} errorMessage
   */
  setErrorMessage(t) {
    this.errorMessage = t, this.updateDefaultNode(this.node);
  }
  /**
   * Set invalid state for detecting whether to show error message.
   *
   * @param {boolean} invalid
   */
  setInvalid(t) {
    this.invalid = t, this.updateDefaultNode(this.node);
  }
  /**
   * Override method inherited from `SlotController` to not run
   * initializer on the custom slotted node unnecessarily.
   *
   * @param {Node} node
   * @protected
   * @override
   */
  initAddedNode(t) {
    t !== this.defaultNode && this.initCustomNode(t);
  }
  /**
   * Override to initialize the newly added default error message.
   *
   * @param {Node} errorNode
   * @protected
   * @override
   */
  initNode(t) {
    this.updateDefaultNode(t);
  }
  /**
   * Override to initialize the newly added custom error message.
   *
   * @param {Node} errorNode
   * @protected
   * @override
   */
  initCustomNode(t) {
    t.textContent && !this.errorMessage && (this.errorMessage = t.textContent.trim()), super.initCustomNode(t);
  }
  /**
   * Override method inherited from `SlotChildObserveController`
   * to restore the default error message element.
   *
   * @protected
   * @override
   */
  restoreDefaultNode() {
    this.attachDefaultNode();
  }
  /**
   * Override method inherited from `SlotChildObserveController`
   * to update the error message text and hidden state.
   *
   * Note: unlike with other controllers, this method is
   * called for both default and custom error message.
   *
   * @param {Node | undefined} node
   * @protected
   * @override
   */
  updateDefaultNode(t) {
    const { errorMessage: e, invalid: o } = this, r = !!(o && e && e.trim() !== "");
    t && (t.textContent = r ? e : "", t.hidden = !r, r ? t.setAttribute("role", "alert") : t.removeAttribute("role")), super.updateDefaultNode(t);
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class ul extends Oi {
  constructor(t) {
    super(t, "helper", null);
  }
  /**
   * Set helper text based on corresponding host property.
   *
   * @param {string} helperText
   */
  setHelperText(t) {
    this.helperText = t, this.getSlotChild() || this.restoreDefaultNode(), this.node === this.defaultNode && this.updateDefaultNode(this.node);
  }
  /**
   * Override method inherited from `SlotChildObserveController`
   * to create the default helper element lazily as needed.
   *
   * @param {Node | undefined} node
   * @protected
   * @override
   */
  restoreDefaultNode() {
    const { helperText: t } = this;
    if (t && t.trim() !== "") {
      this.tagName = "div";
      const e = this.attachDefaultNode();
      this.observeNode(e);
    }
  }
  /**
   * Override method inherited from `SlotChildObserveController`
   * to update the default helper element text content.
   *
   * @param {Node | undefined} node
   * @protected
   * @override
   */
  updateDefaultNode(t) {
    t && (t.textContent = this.helperText), super.updateDefaultNode(t);
  }
  /**
   * Override to observe the newly added custom node.
   *
   * @param {Node} node
   * @protected
   * @override
   */
  initCustomNode(t) {
    super.initCustomNode(t), this.observeNode(t);
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Cr extends Oi {
  constructor(t) {
    super(t, "label", "label");
  }
  /**
   * Set label based on corresponding host property.
   *
   * @param {string} label
   */
  setLabel(t) {
    this.label = t, this.getSlotChild() || this.restoreDefaultNode(), this.node === this.defaultNode && this.updateDefaultNode(this.node);
  }
  /**
   * Override method inherited from `SlotChildObserveController`
   * to restore and observe the default label element.
   *
   * @protected
   * @override
   */
  restoreDefaultNode() {
    const { label: t } = this;
    if (t && t.trim() !== "") {
      const e = this.attachDefaultNode();
      this.observeNode(e);
    }
  }
  /**
   * Override method inherited from `SlotChildObserveController`
   * to update the default label element text content.
   *
   * @param {Node | undefined} node
   * @protected
   * @override
   */
  updateDefaultNode(t) {
    t && (t.textContent = this.label), super.updateDefaultNode(t);
  }
  /**
   * Override to observe the newly added custom node.
   *
   * @param {Node} node
   * @protected
   * @override
   */
  initCustomNode(t) {
    super.initCustomNode(t), this.observeNode(t);
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Ar = C(
  (i) => class extends X(i) {
    static get properties() {
      return {
        /**
         * The label text for the input node.
         * When no light dom defined via [slot=label], this value will be used.
         */
        label: {
          type: String,
          observer: "_labelChanged"
        }
      };
    }
    constructor() {
      super(), this._labelController = new Cr(this), this._labelController.addEventListener("slot-content-changed", (e) => {
        this.toggleAttribute("has-label", e.detail.hasContent);
      });
    }
    /** @protected */
    get _labelId() {
      const e = this._labelNode;
      return e && e.id;
    }
    /** @protected */
    get _labelNode() {
      return this._labelController.node;
    }
    /** @protected */
    ready() {
      super.ready(), this.addController(this._labelController);
    }
    /** @protected */
    _labelChanged(e) {
      this._labelController.setLabel(e);
    }
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Er = C(
  (i) => class extends i {
    static get properties() {
      return {
        /**
         * Set to true when the field is invalid.
         */
        invalid: {
          type: Boolean,
          reflectToAttribute: !0,
          notify: !0,
          value: !1
        },
        /**
         * Specifies that the user must fill in a value.
         */
        required: {
          type: Boolean,
          reflectToAttribute: !0
        }
      };
    }
    /**
     * Validates the field and sets the `invalid` property based on the result.
     *
     * The method fires a `validated` event with the result of the validation.
     *
     * @return {boolean} True if the value is valid.
     */
    validate() {
      const e = this.checkValidity();
      return this._setInvalid(!e), this.dispatchEvent(new CustomEvent("validated", { detail: { valid: e } })), e;
    }
    /**
     * Returns true if the field value satisfies all constraints (if any).
     *
     * @return {boolean}
     */
    checkValidity() {
      return !this.required || !!this.value;
    }
    /**
     * @param {boolean} invalid
     * @protected
     */
    _setInvalid(e) {
      this._shouldSetInvalid(e) && (this.invalid = e);
    }
    /**
     * Override this method to define whether the given `invalid` state should be set.
     *
     * @param {boolean} _invalid
     * @return {boolean}
     * @protected
     */
    _shouldSetInvalid(e) {
      return !0;
    }
    /**
     * Fired whenever the field is validated.
     *
     * @event validated
     * @param {Object} detail
     * @param {boolean} detail.valid the result of the validation.
     */
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const bt = (i) => class extends Er(Ar(X(i))) {
  static get properties() {
    return {
      /**
       * A target element to which ARIA attributes are set.
       * @protected
       */
      ariaTarget: {
        type: Object,
        observer: "_ariaTargetChanged"
      },
      /**
       * Error to show when the field is invalid.
       *
       * @attr {string} error-message
       */
      errorMessage: {
        type: String,
        observer: "_errorMessageChanged"
      },
      /**
       * String used for the helper text.
       * @attr {string} helper-text
       */
      helperText: {
        type: String,
        observer: "_helperTextChanged"
      },
      /**
       * String used to label the component to screen reader users.
       * @attr {string} accessible-name
       */
      accessibleName: {
        type: String,
        observer: "_accessibleNameChanged"
      },
      /**
       * Id of the element used as label of the component to screen reader users.
       * @attr {string} accessible-name-ref
       */
      accessibleNameRef: {
        type: String,
        observer: "_accessibleNameRefChanged"
      }
    };
  }
  static get observers() {
    return ["_invalidChanged(invalid)", "_requiredChanged(required)"];
  }
  constructor() {
    super(), this._fieldAriaController = new dl(this), this._helperController = new ul(this), this._errorController = new cl(this), this._errorController.addEventListener("slot-content-changed", (e) => {
      this.toggleAttribute("has-error-message", e.detail.hasContent);
    }), this._labelController.addEventListener("slot-content-changed", (e) => {
      const { hasContent: o, node: r } = e.detail;
      this.__labelChanged(o, r);
    }), this._helperController.addEventListener("slot-content-changed", (e) => {
      const { hasContent: o, node: r } = e.detail;
      this.toggleAttribute("has-helper", o), this.__helperChanged(o, r);
    });
  }
  /**
   * @protected
   * @return {HTMLElement}
   */
  get _errorNode() {
    return this._errorController.node;
  }
  /**
   * @protected
   * @return {HTMLElement}
   */
  get _helperNode() {
    return this._helperController.node;
  }
  /** @protected */
  ready() {
    super.ready(), this.addController(this._fieldAriaController), this.addController(this._helperController), this.addController(this._errorController);
  }
  /** @private */
  __helperChanged(e, o) {
    e ? this._fieldAriaController.setHelperId(o.id) : this._fieldAriaController.setHelperId(null);
  }
  /** @protected */
  _accessibleNameChanged(e) {
    this._fieldAriaController.setAriaLabel(e);
  }
  /** @protected */
  _accessibleNameRefChanged(e) {
    this._fieldAriaController.setLabelId(e, !0);
  }
  /** @private */
  __labelChanged(e, o) {
    e ? this._fieldAriaController.setLabelId(o.id) : this._fieldAriaController.setLabelId(null);
  }
  /**
   * @param {string | null | undefined} errorMessage
   * @protected
   */
  _errorMessageChanged(e) {
    this._errorController.setErrorMessage(e);
  }
  /**
   * @param {string} helperText
   * @protected
   */
  _helperTextChanged(e) {
    this._helperController.setHelperText(e);
  }
  /**
   * @param {HTMLElement | null | undefined} target
   * @protected
   */
  _ariaTargetChanged(e) {
    e && this._fieldAriaController.setTarget(e);
  }
  /**
   * @param {boolean} required
   * @protected
   */
  _requiredChanged(e) {
    this._fieldAriaController.setRequired(e);
  }
  /**
   * @param {boolean} invalid
   * @protected
   */
  _invalidChanged(e) {
    this._errorController.setInvalid(e), setTimeout(() => {
      if (e) {
        const o = this._errorNode;
        this._fieldAriaController.setErrorId(o && o.id);
      } else
        this._fieldAriaController.setErrorId(null);
    });
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Ni = C(
  (i) => class extends i {
    static get properties() {
      return {
        /**
         * A target element to which attributes and properties are delegated.
         * @protected
         */
        stateTarget: {
          type: Object,
          observer: "_stateTargetChanged"
        }
      };
    }
    /**
     * An array of the host attributes to delegate to the target element.
     */
    static get delegateAttrs() {
      return [];
    }
    /**
     * An array of the host properties to delegate to the target element.
     */
    static get delegateProps() {
      return [];
    }
    /** @protected */
    ready() {
      super.ready(), this._createDelegateAttrsObserver(), this._createDelegatePropsObserver();
    }
    /** @protected */
    _stateTargetChanged(e) {
      e && (this._ensureAttrsDelegated(), this._ensurePropsDelegated());
    }
    /** @protected */
    _createDelegateAttrsObserver() {
      this._createMethodObserver(`_delegateAttrsChanged(${this.constructor.delegateAttrs.join(", ")})`);
    }
    /** @protected */
    _createDelegatePropsObserver() {
      this._createMethodObserver(`_delegatePropsChanged(${this.constructor.delegateProps.join(", ")})`);
    }
    /** @protected */
    _ensureAttrsDelegated() {
      this.constructor.delegateAttrs.forEach((e) => {
        this._delegateAttribute(e, this[e]);
      });
    }
    /** @protected */
    _ensurePropsDelegated() {
      this.constructor.delegateProps.forEach((e) => {
        this._delegateProperty(e, this[e]);
      });
    }
    /** @protected */
    _delegateAttrsChanged(...e) {
      this.constructor.delegateAttrs.forEach((o, r) => {
        this._delegateAttribute(o, e[r]);
      });
    }
    /** @protected */
    _delegatePropsChanged(...e) {
      this.constructor.delegateProps.forEach((o, r) => {
        this._delegateProperty(o, e[r]);
      });
    }
    /** @protected */
    _delegateAttribute(e, o) {
      this.stateTarget && (e === "invalid" && this._delegateAttribute("aria-invalid", o ? "true" : !1), typeof o == "boolean" ? this.stateTarget.toggleAttribute(e, o) : o ? this.stateTarget.setAttribute(e, o) : this.stateTarget.removeAttribute(e));
    }
    /** @protected */
    _delegateProperty(e, o) {
      this.stateTarget && (this.stateTarget[e] = o);
    }
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const hl = C(
  (i) => class extends Ni(Er(gt(i))) {
    /**
     * An array of attributes which participate in the input validation.
     * Changing these attributes will cause the input to re-validate.
     *
     * IMPORTANT: The attributes should be properly delegated to the input element
     * from the host using `delegateAttrs` getter (see `DelegateStateMixin`).
     * The `required` attribute is already delegated.
     */
    static get constraints() {
      return ["required"];
    }
    static get delegateAttrs() {
      return [...super.delegateAttrs, "required"];
    }
    /** @protected */
    ready() {
      super.ready(), this._createConstraintsObserver();
    }
    /**
     * Returns true if the current input value satisfies all constraints (if any).
     * @return {boolean}
     */
    checkValidity() {
      return this.inputElement && this._hasValidConstraints(this.constructor.constraints.map((e) => this[e])) ? this.inputElement.checkValidity() : !this.invalid;
    }
    /**
     * Returns true if some of the provided set of constraints are valid.
     * @param {Array} constraints
     * @return {boolean}
     * @protected
     */
    _hasValidConstraints(e) {
      return e.some((o) => this.__isValidConstraint(o));
    }
    /**
     * Override this method to customize setting up constraints observer.
     * @protected
     */
    _createConstraintsObserver() {
      this._createMethodObserver(`_constraintsChanged(stateTarget, ${this.constructor.constraints.join(", ")})`);
    }
    /**
     * Override this method to implement custom validation constraints.
     * @param {HTMLElement | undefined} stateTarget
     * @param {unknown[]} constraints
     * @protected
     */
    _constraintsChanged(e, ...o) {
      if (!e)
        return;
      const r = this._hasValidConstraints(o), s = this.__previousHasConstraints && !r;
      (this._hasValue || this.invalid) && r ? this.validate() : s && this._setInvalid(!1), this.__previousHasConstraints = r;
    }
    /**
     * Override an event listener inherited from `InputMixin`
     * to capture native `change` event and make sure that
     * a new one is dispatched after validation runs.
     * @param {Event} event
     * @protected
     * @override
     */
    _onChange(e) {
      e.stopPropagation(), this.validate(), this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            sourceEvent: e
          },
          bubbles: e.bubbles,
          cancelable: e.cancelable
        })
      );
    }
    /** @private */
    __isValidConstraint(e) {
      return !!e || e === 0;
    }
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const pl = (i) => class extends yr(
  vt(hl(bt(nl(_e(i)))))
) {
  static get properties() {
    return {
      /**
       * A pattern matched against individual characters the user inputs.
       *
       * When set, the field will prevent:
       * - `keydown` events if the entered key doesn't match `/^allowedCharPattern$/`
       * - `paste` events if the pasted text doesn't match `/^allowedCharPattern*$/`
       * - `drop` events if the dropped text doesn't match `/^allowedCharPattern*$/`
       *
       * For example, to allow entering only numbers and minus signs, use:
       * `allowedCharPattern = "[\\d-]"`
       * @attr {string} allowed-char-pattern
       */
      allowedCharPattern: {
        type: String,
        observer: "_allowedCharPatternChanged"
      },
      /**
       * If true, the input text gets fully selected when the field is focused using click or touch / tap.
       */
      autoselect: {
        type: Boolean,
        value: !1
      },
      /**
       * The name of this field.
       */
      name: {
        type: String,
        reflectToAttribute: !0
      },
      /**
       * A hint to the user of what can be entered in the field.
       */
      placeholder: {
        type: String,
        reflectToAttribute: !0
      },
      /**
       * When present, it specifies that the field is read-only.
       */
      readonly: {
        type: Boolean,
        value: !1,
        reflectToAttribute: !0
      },
      /**
       * The text usually displayed in a tooltip popup when the mouse is over the field.
       */
      title: {
        type: String,
        reflectToAttribute: !0
      }
    };
  }
  static get delegateAttrs() {
    return [...super.delegateAttrs, "name", "type", "placeholder", "readonly", "invalid", "title"];
  }
  constructor() {
    super(), this._boundOnPaste = this._onPaste.bind(this), this._boundOnDrop = this._onDrop.bind(this), this._boundOnBeforeInput = this._onBeforeInput.bind(this);
  }
  /** @protected */
  get slotStyles() {
    return [
      `
          :is(input[slot='input'], textarea[slot='textarea'])::placeholder {
            font: inherit;
            color: inherit;
          }
        `
    ];
  }
  /**
   * Override an event listener from `DelegateFocusMixin`.
   * @param {FocusEvent} event
   * @protected
   * @override
   */
  _onFocus(e) {
    super._onFocus(e), this.autoselect && this.inputElement && this.inputElement.select();
  }
  /**
   * Override an event listener inherited from `InputMixin`
   * to capture native `change` event and make sure that
   * a new one is dispatched after validation runs.
   * @param {Event} event
   * @protected
   * @override
   */
  _onChange(e) {
    e.stopPropagation(), this.validate(), this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          sourceEvent: e
        },
        bubbles: e.bubbles,
        cancelable: e.cancelable
      })
    );
  }
  /**
   * Override a method from `InputMixin`.
   * @param {!HTMLElement} input
   * @protected
   * @override
   */
  _addInputListeners(e) {
    super._addInputListeners(e), e.addEventListener("paste", this._boundOnPaste), e.addEventListener("drop", this._boundOnDrop), e.addEventListener("beforeinput", this._boundOnBeforeInput);
  }
  /**
   * Override a method from `InputMixin`.
   * @param {!HTMLElement} input
   * @protected
   * @override
   */
  _removeInputListeners(e) {
    super._removeInputListeners(e), e.removeEventListener("paste", this._boundOnPaste), e.removeEventListener("drop", this._boundOnDrop), e.removeEventListener("beforeinput", this._boundOnBeforeInput);
  }
  /**
   * Override an event listener from `KeyboardMixin`.
   * @param {!KeyboardEvent} event
   * @protected
   * @override
   */
  _onKeyDown(e) {
    super._onKeyDown(e), this.allowedCharPattern && !this.__shouldAcceptKey(e) && e.target === this.inputElement && (e.preventDefault(), this._markInputPrevented());
  }
  /** @protected */
  _markInputPrevented() {
    this.setAttribute("input-prevented", ""), this._preventInputDebouncer = le.debounce(this._preventInputDebouncer, Xo.after(200), () => {
      this.removeAttribute("input-prevented");
    });
  }
  /** @private */
  __shouldAcceptKey(e) {
    return e.metaKey || e.ctrlKey || !e.key || // Allow typing anything if event.key is not supported
    e.key.length !== 1 || // Allow "Backspace", "ArrowLeft" etc.
    this.__allowedCharRegExp.test(e.key);
  }
  /** @private */
  _onPaste(e) {
    if (this.allowedCharPattern) {
      const o = e.clipboardData.getData("text");
      this.__allowedTextRegExp.test(o) || (e.preventDefault(), this._markInputPrevented());
    }
  }
  /** @private */
  _onDrop(e) {
    if (this.allowedCharPattern) {
      const o = e.dataTransfer.getData("text");
      this.__allowedTextRegExp.test(o) || (e.preventDefault(), this._markInputPrevented());
    }
  }
  /** @private */
  _onBeforeInput(e) {
    this.allowedCharPattern && e.data && !this.__allowedTextRegExp.test(e.data) && (e.preventDefault(), this._markInputPrevented());
  }
  /** @private */
  _allowedCharPatternChanged(e) {
    if (e)
      try {
        this.__allowedCharRegExp = new RegExp(`^${e}$`, "u"), this.__allowedTextRegExp = new RegExp(`^${e}*$`, "u");
      } catch (o) {
        console.error(o);
      }
  }
  /**
   * Fired when the user commits a value change.
   *
   * @event change
   */
  /**
   * Fired when the value is changed by the user: on every typing keystroke,
   * and the value is cleared using the clear button.
   *
   * @event input
   */
};
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const kr = (i) => class extends pl(i) {
  static get properties() {
    return {
      /**
       * Whether the value of the control can be automatically completed by the browser.
       * List of available options at:
       * https://developer.mozilla.org/en/docs/Web/HTML/Element/input#attr-autocomplete
       */
      autocomplete: {
        type: String
      },
      /**
       * This is a property supported by Safari that is used to control whether
       * autocorrection should be enabled when the user is entering/editing the text.
       * Possible values are:
       * on: Enable autocorrection.
       * off: Disable autocorrection.
       */
      autocorrect: {
        type: String
      },
      /**
       * This is a property supported by Safari and Chrome that is used to control whether
       * autocapitalization should be enabled when the user is entering/editing the text.
       * Possible values are:
       * characters: Characters capitalization.
       * words: Words capitalization.
       * sentences: Sentences capitalization.
       * none: No capitalization.
       */
      autocapitalize: {
        type: String,
        reflectToAttribute: !0
      }
    };
  }
  static get delegateAttrs() {
    return [...super.delegateAttrs, "autocapitalize", "autocomplete", "autocorrect"];
  }
  // Workaround for https://github.com/Polymer/polymer/issues/5259
  get __data() {
    return this.__dataValue || {};
  }
  set __data(e) {
    this.__dataValue = e;
  }
  /**
   * @param {HTMLElement} input
   * @protected
   * @override
   */
  _inputElementChanged(e) {
    super._inputElementChanged(e), e && (e.value && e.value !== this.value && (console.warn(`Please define value on the <${this.localName}> component!`), e.value = ""), this.value && (e.value = this.value));
  }
  /**
   * Override an event listener from `FocusMixin`.
   * @param {boolean} focused
   * @protected
   * @override
   */
  _setFocused(e) {
    super._setFocused(e), !e && document.hasFocus() && this.validate();
  }
  /**
   * Override an event listener from `InputMixin`
   * to mark as valid after user started typing.
   * @param {Event} event
   * @protected
   * @override
   */
  _onInput(e) {
    super._onInput(e), this.invalid && this.validate();
  }
  /**
   * Override an observer from `InputMixin` to validate the field
   * when a new value is set programmatically.
   *
   * @param {string | undefined} newValue
   * @param {string | undefined} oldValue
   * @protected
   * @override
   */
  _valueChanged(e, o) {
    super._valueChanged(e, o), o !== void 0 && this.invalid && this.validate();
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class yt {
  constructor(t, e) {
    this.input = t, this.__preventDuplicateLabelClick = this.__preventDuplicateLabelClick.bind(this), e.addEventListener("slot-content-changed", (o) => {
      this.__initLabel(o.detail.node);
    }), this.__initLabel(e.node);
  }
  /**
   * @param {HTMLElement} label
   * @private
   */
  __initLabel(t) {
    t && (t.addEventListener("click", this.__preventDuplicateLabelClick), this.input && t.setAttribute("for", this.input.id));
  }
  /**
   * The native platform fires an event for both the click on the label, and also
   * the subsequent click on the native input element caused by label click.
   * This results in two click events arriving at the host, but we only want one.
   * This method prevents the duplicate click and ensures the correct isTrusted event
   * with the correct event.target arrives at the host.
   * @private
   */
  __preventDuplicateLabelClick() {
    const t = (e) => {
      e.stopImmediatePropagation(), this.input.removeEventListener("click", t);
    };
    this.input.addEventListener("click", t);
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const fl = (i) => class extends kr(i) {
  static get properties() {
    return {
      /**
       * Maximum number of characters (in Unicode code points) that the user can enter.
       */
      maxlength: {
        type: Number
      },
      /**
       * Minimum number of characters (in Unicode code points) that the user can enter.
       */
      minlength: {
        type: Number
      },
      /**
       * A regular expression that the value is checked against.
       * The pattern must match the entire value, not just some subset.
       */
      pattern: {
        type: String
      }
    };
  }
  static get delegateAttrs() {
    return [...super.delegateAttrs, "maxlength", "minlength", "pattern"];
  }
  static get constraints() {
    return [...super.constraints, "maxlength", "minlength", "pattern"];
  }
  constructor() {
    super(), this._setType("text");
  }
  /** @protected */
  get clearElement() {
    return this.$.clearButton;
  }
  /** @protected */
  ready() {
    super.ready(), this.addController(
      new Ti(this, (e) => {
        this._setInputElement(e), this._setFocusElement(e), this.stateTarget = e, this.ariaTarget = e;
      })
    ), this.addController(new yt(this.inputElement, this._labelController));
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-text-field", br, { moduleId: "vaadin-text-field-styles" });
class Ii extends fl(k(z(x))) {
  static get is() {
    return "vaadin-text-field";
  }
  static get template() {
    return y`
      <div class="vaadin-field-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" on-click="focus"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          readonly="[[readonly]]"
          disabled="[[disabled]]"
          invalid="[[invalid]]"
          theme$="[[_theme]]"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <slot name="suffix" slot="suffix"></slot>
          <div id="clearButton" part="clear-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>
      <slot name="tooltip"></slot>
    `;
  }
  static get properties() {
    return {
      /**
       * Maximum number of characters (in Unicode code points) that the user can enter.
       */
      maxlength: {
        type: Number
      },
      /**
       * Minimum number of characters (in Unicode code points) that the user can enter.
       */
      minlength: {
        type: Number
      }
    };
  }
  /** @protected */
  ready() {
    super.ready(), this._tooltipController = new me(this), this._tooltipController.setPosition("top"), this._tooltipController.setAriaTarget(this.inputElement), this.addController(this._tooltipController);
  }
}
b(Ii);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const ml = p`
  :host([dir='rtl']) [part='input-field'] ::slotted(input) {
    --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input:placeholder-shown) {
    --_lumo-text-field-overflow-mask-image: none;
  }
`;
m("vaadin-email-field", [ve, ml], {
  moduleId: "lumo-email-field"
});
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const _l = p`
  :host([dir='rtl']) [part='input-field'] {
    direction: ltr;
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input)::placeholder {
    direction: rtl;
    text-align: left;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-email-field", _l, { moduleId: "vaadin-email-field-styles" });
class vl extends Ii {
  static get is() {
    return "vaadin-email-field";
  }
  constructor() {
    super(), this._setType("email"), this.pattern = "^[a-zA-Z0-9_\\-+]+(?:\\.[a-zA-Z0-9_\\-+]+)*@[a-zA-Z0-9\\-.]+\\.[a-zA-Z0-9\\-]{2,}$";
  }
  /** @protected */
  ready() {
    super.ready(), this.inputElement && (this.inputElement.autocapitalize = "off");
  }
}
b(vl);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const gl = p`
  :host {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    min-width: auto;
    background: transparent;
    outline: none;
  }
`;
m("vaadin-password-field-button", [tr, gl], {
  moduleId: "lumo-password-field-button"
});
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const bl = p`
  [part='reveal-button']::before {
    content: var(--lumo-icons-eye);
  }

  :host([password-visible]) [part='reveal-button']::before {
    content: var(--lumo-icons-eye-disabled);
  }

  /* Make it easy to hide the button across the whole app */
  [part='reveal-button'] {
    position: relative;
    display: var(--lumo-password-field-reveal-button-display, block);
  }

  [part='reveal-button'][hidden] {
    display: none !important;
  }
`;
m("vaadin-password-field", [ve, bl], { moduleId: "lumo-password-field" });
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-password-field-button", rr, { moduleId: "vaadin-password-field-button-styles" });
class yl extends Ei(Q(k(x))) {
  static get is() {
    return "vaadin-password-field-button";
  }
  static get template() {
    return y``;
  }
}
b(yl);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const xl = (i) => class extends yr($e(De(gt(i)))) {
  static get properties() {
    return {
      /**
       * Set to true to hide the eye icon which toggles the password visibility.
       * @attr {boolean} reveal-button-hidden
       */
      revealButtonHidden: {
        type: Boolean,
        observer: "_revealButtonHiddenChanged",
        value: !1
      },
      /**
       * True if the password is visible ([type=text]).
       * @attr {boolean} password-visible
       */
      passwordVisible: {
        type: Boolean,
        value: !1,
        reflectToAttribute: !0,
        observer: "_passwordVisibleChanged",
        readOnly: !0
      },
      /**
       * An object with translated strings used for localization.
       * It has the following structure and default values:
       *
       * ```
       * {
       *   // Translation of the reveal icon button accessible label
       *   reveal: 'Show password'
       * }
       * ```
       */
      i18n: {
        type: Object,
        value: () => ({
          reveal: "Show password"
        })
      }
    };
  }
  static get observers() {
    return ["__i18nChanged(i18n)"];
  }
  constructor() {
    super(), this._setType("password"), this.__boundRevealButtonClick = this._onRevealButtonClick.bind(this), this.__boundRevealButtonMouseDown = this._onRevealButtonMouseDown.bind(this), this.__lastChange = "";
  }
  /** @protected */
  get slotStyles() {
    const e = this.localName;
    return [
      ...super.slotStyles,
      `
          ${e} [slot="input"]::-ms-reveal {
            display: none;
          }
        `
    ];
  }
  /** @protected */
  get _revealNode() {
    return this._revealButtonController && this._revealButtonController.node;
  }
  /** @protected */
  ready() {
    super.ready(), this._revealPart = this.shadowRoot.querySelector('[part="reveal-button"]'), this._revealButtonController = new M(this, "reveal", "vaadin-password-field-button", {
      initializer: (e) => {
        e.disabled = this.disabled, e.addEventListener("click", this.__boundRevealButtonClick), e.addEventListener("mousedown", this.__boundRevealButtonMouseDown);
      }
    }), this.addController(this._revealButtonController), this.__updateAriaLabel(this.i18n), this._updateToggleState(!1), this._toggleRevealHidden(this.revealButtonHidden), this.inputElement && (this.inputElement.autocapitalize = "off");
  }
  /**
   * Override an event listener inherited from `InputControlMixin`
   * to store the value at the moment of the native `change` event.
   * @param {Event} event
   * @protected
   * @override
   */
  _onChange(e) {
    super._onChange(e), this.__lastChange = this.inputElement.value;
  }
  /**
   * Override method inherited from `FocusMixin` to mark field as focused
   * when focus moves to the reveal button using Shift Tab.
   * @param {Event} event
   * @return {boolean}
   * @protected
   */
  _shouldSetFocus(e) {
    return e.target === this.inputElement || e.target === this._revealNode;
  }
  /**
   * Override method inherited from `FocusMixin` to not hide password
   * when focus moves to the reveal button or back to the input.
   * @param {Event} event
   * @return {boolean}
   * @protected
   */
  _shouldRemoveFocus(e) {
    return !(e.relatedTarget === this._revealNode || e.relatedTarget === this.inputElement && e.target === this._revealNode);
  }
  /**
   * Override method inherited from `FocusMixin` to toggle password visibility.
   * @param {boolean} focused
   * @protected
   * @override
   */
  _setFocused(e) {
    if (super._setFocused(e), !e)
      this._setPasswordVisible(!1), this.__lastChange !== this.inputElement.value && (this.__lastChange = this.inputElement.value, this.dispatchEvent(new CustomEvent("change", { bubbles: !0 })));
    else {
      const o = this.getRootNode().activeElement === this._revealNode;
      this.toggleAttribute("focus-ring", this._keyboardActive && !o);
    }
  }
  /** @private */
  __updateAriaLabel(e) {
    e && e.reveal && this._revealNode && this._revealNode.setAttribute("aria-label", e.reveal);
  }
  /** @private */
  __i18nChanged(e) {
    this.__updateAriaLabel(e);
  }
  /** @private */
  _revealButtonHiddenChanged(e) {
    this._toggleRevealHidden(e);
  }
  /** @private */
  _togglePasswordVisibility() {
    this._setPasswordVisible(!this.passwordVisible);
  }
  /** @private */
  _onRevealButtonClick() {
    this._togglePasswordVisibility();
  }
  /** @private */
  _onRevealButtonMouseDown(e) {
    e.preventDefault(), this.inputElement.focus();
  }
  /** @private */
  _toggleRevealHidden(e) {
    this._revealNode && (e ? (this._revealPart.setAttribute("hidden", ""), this._revealNode.setAttribute("tabindex", "-1"), this._revealNode.setAttribute("aria-hidden", "true")) : (this._revealPart.removeAttribute("hidden"), this._revealNode.setAttribute("tabindex", "0"), this._revealNode.removeAttribute("aria-hidden")));
  }
  /** @private */
  _updateToggleState(e) {
    this._revealNode && this._revealNode.setAttribute("aria-pressed", e ? "true" : "false");
  }
  /** @private */
  _passwordVisibleChanged(e) {
    this._setType(e ? "text" : "password"), this._updateToggleState(e);
  }
  /**
   * Override method inherited from `DisabledMixin` to synchronize the reveal button
   * disabled state with the password field disabled state.
   * @param {boolean} disabled
   * @param {boolean} oldDisabled
   * @protected
   */
  _disabledChanged(e, o) {
    super._disabledChanged(e, o), this._revealNode && (this._revealNode.disabled = e);
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const wl = y`
  <div part="reveal-button" slot="suffix">
    <slot name="reveal"></slot>
  </div>
`;
let qe;
class Cl extends xl(Ii) {
  static get is() {
    return "vaadin-password-field";
  }
  static get template() {
    if (!qe) {
      qe = super.template.cloneNode(!0);
      const t = wl.content.querySelector('[part="reveal-button"]');
      qe.content.querySelector('[part="input-field"]').appendChild(t);
    }
    return qe;
  }
}
b(Cl);
var Al = Object.defineProperty, El = Object.getOwnPropertyDescriptor, Be = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? El(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && Al(t, e, r), r;
};
let de = class extends P {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.placeholder = this.label, this.kind = "text";
  }
  render() {
    return this.kind === "email" ? N`
              <vaadin-email-field class="as-field"
                label="${this.label}"
                value="${this.value}" 
                placeholder="${this.placeholder}">
              </vaadin-email-field>` : this.kind === "password" ? N`
              <vaadin-password-field class="as-field"
                label="${this.label}"
                value="${this.value}" 
                placeholder="${this.placeholder}">
              </vaadin-password-field>` : N`
          <vaadin-text-field class="as-field"
            label="${this.label}"
            value="${this.value}" 
            placeholder="${this.placeholder}">
          </vaadin-text-field>`;
  }
};
Be([
  g({ type: String })
], de.prototype, "label", 2);
Be([
  g({ type: String })
], de.prototype, "value", 2);
Be([
  g({ type: String })
], de.prototype, "placeholder", 2);
Be([
  g({ type: String })
], de.prototype, "kind", 2);
de = Be([
  L("as-input")
], de);
m(
  "vaadin-checkbox",
  p`
    :host {
      color: var(--vaadin-checkbox-label-color, var(--lumo-body-text-color));
      font-size: var(--vaadin-checkbox-label-font-size, var(--lumo-font-size-m));
      font-family: var(--lumo-font-family);
      line-height: var(--lumo-line-height-s);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      cursor: default;
      outline: none;
      --_checkbox-size: var(--vaadin-checkbox-size, calc(var(--lumo-size-m) / 2));
      --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
      --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
      --_selection-color: var(--vaadin-selection-color, var(--lumo-primary-color));
      --_invalid-background: var(--vaadin-input-field-invalid-background, var(--lumo-error-color-10pct));
      --_disabled-checkmark-color: var(--vaadin-checkbox-disabled-checkmark-color, var(--lumo-contrast-30pct));
    }

    [part='label'] {
      display: flex;
      position: relative;
      max-width: max-content;
    }

    :host([has-label]) ::slotted(label) {
      padding: var(
        --vaadin-checkbox-label-padding,
        var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs) var(--lumo-space-xs)
      );
    }

    :host([dir='rtl'][has-label]) ::slotted(label) {
      padding: var(--lumo-space-xs) var(--lumo-space-xs) var(--lumo-space-xs) var(--lumo-space-s);
    }

    :host([has-label][required]) ::slotted(label) {
      padding-inline-end: var(--lumo-space-m);
    }

    [part='checkbox'] {
      width: var(--_checkbox-size);
      height: var(--_checkbox-size);
      margin: var(--lumo-space-xs);
      position: relative;
      border-radius: var(--vaadin-checkbox-border-radius, var(--lumo-border-radius-s));
      background: var(--vaadin-checkbox-background, var(--lumo-contrast-20pct));
      transition:
        transform 0.2s cubic-bezier(0.12, 0.32, 0.54, 2),
        background-color 0.15s;
      cursor: var(--lumo-clickable-cursor);
      /* Default field border color */
      --_input-border-color: var(--vaadin-input-field-border-color, var(--lumo-contrast-50pct));
    }

    :host([indeterminate]),
    :host([checked]) {
      --vaadin-input-field-border-color: transparent;
    }

    :host([indeterminate]) [part='checkbox'],
    :host([checked]) [part='checkbox'] {
      background-color: var(--_selection-color);
    }

    /* Checkmark */
    [part='checkbox']::after {
      pointer-events: none;
      font-family: 'lumo-icons';
      content: var(--vaadin-checkbox-checkmark-char, var(--lumo-icons-checkmark));
      color: var(--vaadin-checkbox-checkmark-color, var(--lumo-primary-contrast-color));
      font-size: var(--vaadin-checkbox-checkmark-size, calc(var(--_checkbox-size) + 2px));
      line-height: 1;
      position: absolute;
      top: -1px;
      left: -1px;
      contain: content;
      opacity: 0;
    }

    :host([checked]) [part='checkbox']::after {
      opacity: 1;
    }

    :host([readonly]:not([checked]):not([indeterminate])) {
      color: var(--lumo-secondary-text-color);
    }

    :host([readonly]:not([checked]):not([indeterminate])) [part='checkbox'] {
      background: transparent;
      box-shadow: none;
    }

    :host([readonly]:not([checked]):not([indeterminate])) [part='checkbox']::after {
      content: '';
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      top: 0;
      left: 0;
      opacity: 1;
      border: var(--vaadin-input-field-readonly-border, 1px dashed var(--lumo-contrast-50pct));
    }

    /* Indeterminate checkmark */
    :host([indeterminate]) [part='checkbox']::after {
      content: var(--vaadin-checkbox-checkmark-char-indeterminate, '');
      opacity: 1;
      top: 45%;
      height: 10%;
      left: 22%;
      right: 22%;
      width: auto;
      border: 0;
      background-color: var(--lumo-primary-contrast-color);
    }

    /* Focus ring */
    :host([focus-ring]) [part='checkbox'] {
      box-shadow:
        0 0 0 1px var(--lumo-base-color),
        0 0 0 calc(var(--_focus-ring-width) + 1px) var(--_focus-ring-color),
        inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
    }

    :host([focus-ring][readonly]:not([checked]):not([indeterminate])) [part='checkbox'] {
      box-shadow:
        0 0 0 1px var(--lumo-base-color),
        0 0 0 calc(var(--_focus-ring-width) + 1px) var(--_focus-ring-color);
    }

    /* Disabled */
    :host([disabled]) {
      pointer-events: none;
      --vaadin-input-field-border-color: var(--lumo-contrast-20pct);
    }

    :host([disabled]) ::slotted(label) {
      color: inherit;
    }

    :host([disabled]) [part='checkbox'] {
      background-color: var(--vaadin-checkbox-disabled-background, var(--lumo-contrast-10pct));
    }

    :host([disabled]) [part='checkbox']::after {
      color: var(--_disabled-checkmark-color);
    }

    :host([disabled]) [part='label'],
    :host([disabled]) [part='helper-text'] {
      color: var(--lumo-disabled-text-color);
      -webkit-text-fill-color: var(--lumo-disabled-text-color);
    }

    :host([indeterminate][disabled]) [part='checkbox']::after {
      background-color: var(--_disabled-checkmark-color);
    }

    :host([readonly][checked]:not([disabled])) [part='checkbox'],
    :host([readonly][indeterminate]:not([disabled])) [part='checkbox'] {
      background-color: var(--vaadin-checkbox-readonly-checked-background, var(--lumo-contrast-70pct));
    }

    /* Used for activation "halo" */
    [part='checkbox']::before {
      pointer-events: none;
      color: transparent;
      width: 100%;
      height: 100%;
      line-height: var(--_checkbox-size);
      border-radius: inherit;
      background-color: inherit;
      transform: scale(1.4);
      opacity: 0;
      transition:
        transform 0.1s,
        opacity 0.8s;
    }

    /* Hover */
    :host(:not([checked]):not([indeterminate]):not([disabled]):not([readonly]):not([invalid]):hover) [part='checkbox'] {
      background: var(--vaadin-checkbox-background-hover, var(--lumo-contrast-30pct));
    }

    /* Disable hover for touch devices */
    @media (pointer: coarse) {
      /* prettier-ignore */
      :host(:not([checked]):not([indeterminate]):not([disabled]):not([readonly]):not([invalid]):hover) [part='checkbox'] {
        background: var(--vaadin-checkbox-background, var(--lumo-contrast-20pct));
      }
    }

    /* Active */
    :host([active]) [part='checkbox'] {
      transform: scale(0.9);
      transition-duration: 0.05s;
    }

    :host([active][checked]) [part='checkbox'] {
      transform: scale(1.1);
    }

    :host([active]:not([checked])) [part='checkbox']::before {
      transition-duration: 0.01s, 0.01s;
      transform: scale(0);
      opacity: 0.4;
    }

    /* Required */
    :host([required]) [part='required-indicator'] {
      position: absolute;
      top: var(--lumo-space-xs);
      right: var(--lumo-space-xs);
    }

    :host([required][dir='rtl']) [part='required-indicator'] {
      right: auto;
      left: var(--lumo-space-xs);
    }

    :host([required]) [part='required-indicator']::after {
      content: var(--lumo-required-field-indicator, '\\2022');
      transition: opacity 0.2s;
      color: var(--lumo-required-field-indicator-color, var(--lumo-primary-text-color));
      width: 1em;
      text-align: center;
    }

    /* Invalid */
    :host([invalid]) {
      --vaadin-input-field-border-color: var(--lumo-error-color);
    }

    :host([invalid]) [part='checkbox'] {
      background: var(--_invalid-background);
      background-image: linear-gradient(var(--_invalid-background) 0%, var(--_invalid-background) 100%);
    }

    :host([invalid]:hover) [part='checkbox'] {
      background-image: linear-gradient(var(--_invalid-background) 0%, var(--_invalid-background) 100%),
        linear-gradient(var(--_invalid-background) 0%, var(--_invalid-background) 100%);
    }

    :host([invalid][focus-ring]) {
      --_focus-ring-color: var(--lumo-error-color-50pct);
    }

    :host([invalid]) [part='required-indicator']::after {
      color: var(--lumo-required-field-indicator-color, var(--lumo-error-text-color));
    }

    /* Error message */
    [part='error-message'] {
      font-size: var(--vaadin-input-field-error-font-size, var(--lumo-font-size-xs));
      line-height: var(--lumo-line-height-xs);
      font-weight: var(--vaadin-input-field-error-font-weight, 400);
      color: var(--vaadin-input-field-error-color, var(--lumo-error-text-color));
      will-change: max-height;
      transition: 0.4s max-height;
      max-height: 5em;
      padding-inline-start: var(--lumo-space-xs);
    }

    :host([has-error-message]) [part='error-message']::after,
    :host([has-helper]) [part='helper-text']::after {
      content: '';
      display: block;
      height: 0.4em;
    }

    :host(:not([invalid])) [part='error-message'] {
      max-height: 0;
      overflow: hidden;
    }

    /* Helper */
    [part='helper-text'] {
      display: block;
      color: var(--vaadin-input-field-helper-color, var(--lumo-secondary-text-color));
      font-size: var(--vaadin-input-field-helper-font-size, var(--lumo-font-size-xs));
      line-height: var(--lumo-line-height-xs);
      font-weight: var(--vaadin-input-field-helper-font-weight, 400);
      margin-left: calc(var(--lumo-border-radius-m) / 4);
      transition: color 0.2s;
      padding-inline-start: var(--lumo-space-xs);
    }

    :host(:hover:not([readonly])) [part='helper-text'] {
      color: var(--lumo-body-text-color);
    }

    :host([has-error-message]) ::slotted(label),
    :host([has-helper]) ::slotted(label) {
      padding-bottom: 0;
    }
  `,
  { moduleId: "lumo-checkbox" }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Pr = C(
  (i) => class extends Ni($e(gt(i))) {
    static get properties() {
      return {
        /**
         * True if the element is checked.
         * @type {boolean}
         */
        checked: {
          type: Boolean,
          value: !1,
          notify: !0,
          reflectToAttribute: !0
        }
      };
    }
    static get delegateProps() {
      return [...super.delegateProps, "checked"];
    }
    /**
     * @param {Event} event
     * @protected
     * @override
     */
    _onChange(e) {
      const o = e.target;
      this._toggleChecked(o.checked);
    }
    /** @protected */
    _toggleChecked(e) {
      this.checked = e;
    }
  }
);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const kl = (i) => class extends bt(Pr(vt(ft(i)))) {
  static get properties() {
    return {
      /**
       * True if the checkbox is in the indeterminate state which means
       * it is not possible to say whether it is checked or unchecked.
       * The state is reset once the user switches the checkbox by hand.
       *
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes
       *
       * @type {boolean}
       */
      indeterminate: {
        type: Boolean,
        notify: !0,
        value: !1,
        reflectToAttribute: !0
      },
      /**
       * The name of the checkbox.
       *
       * @type {string}
       */
      name: {
        type: String,
        value: ""
      },
      /**
       * When true, the user cannot modify the value of the checkbox.
       * The difference between `disabled` and `readonly` is that the
       * read-only checkbox remains focusable, is announced by screen
       * readers and its value can be submitted as part of the form.
       */
      readonly: {
        type: Boolean,
        value: !1,
        reflectToAttribute: !0
      },
      /**
       * Indicates whether the element can be focused and where it participates in sequential keyboard navigation.
       *
       * @override
       * @protected
       */
      tabindex: {
        type: Number,
        value: 0,
        reflectToAttribute: !0
      }
    };
  }
  static get observers() {
    return ["__readonlyChanged(readonly, inputElement)"];
  }
  /** @override */
  static get delegateProps() {
    return [...super.delegateProps, "indeterminate"];
  }
  /** @override */
  static get delegateAttrs() {
    return [...super.delegateAttrs, "name", "invalid", "required"];
  }
  constructor() {
    super(), this._setType("checkbox"), this._boundOnInputClick = this._onInputClick.bind(this), this.value = "on";
  }
  /** @protected */
  ready() {
    super.ready(), this.addController(
      new Ti(this, (e) => {
        this._setInputElement(e), this._setFocusElement(e), this.stateTarget = e, this.ariaTarget = e;
      })
    ), this.addController(new yt(this.inputElement, this._labelController)), this._createMethodObserver("_checkedChanged(checked)");
  }
  /**
   * Override method inherited from `ActiveMixin` to prevent setting `active`
   * attribute when readonly, or when clicking a link placed inside the label,
   * or when clicking slotted helper or error message element.
   *
   * @param {Event} event
   * @return {boolean}
   * @protected
   * @override
   */
  _shouldSetActive(e) {
    return this.readonly || e.target.localName === "a" || e.target === this._helperNode || e.target === this._errorNode ? !1 : super._shouldSetActive(e);
  }
  /**
   * Override method inherited from `InputMixin`.
   * @param {!HTMLElement} input
   * @protected
   * @override
   */
  _addInputListeners(e) {
    super._addInputListeners(e), e.addEventListener("click", this._boundOnInputClick);
  }
  /**
   * Override method inherited from `InputMixin`.
   * @param {!HTMLElement} input
   * @protected
   * @override
   */
  _removeInputListeners(e) {
    super._removeInputListeners(e), e.removeEventListener("click", this._boundOnInputClick);
  }
  /** @private */
  _onInputClick(e) {
    this.readonly && e.preventDefault();
  }
  /** @private */
  __readonlyChanged(e, o) {
    o && (e ? o.setAttribute("aria-readonly", "true") : o.removeAttribute("aria-readonly"));
  }
  /**
   * Override method inherited from `CheckedMixin` to reset
   * `indeterminate` state checkbox is toggled by the user.
   *
   * @param {boolean} checked
   * @protected
   * @override
   */
  _toggleChecked(e) {
    this.indeterminate && (this.indeterminate = !1), super._toggleChecked(e);
  }
  /**
   * @override
   * @return {boolean}
   */
  checkValidity() {
    return !this.required || !!this.checked;
  }
  /**
   * Override method inherited from `FocusMixin` to validate on blur.
   * @param {boolean} focused
   * @protected
   */
  _setFocused(e) {
    super._setFocused(e), !e && document.hasFocus() && this.validate();
  }
  /** @private */
  _checkedChanged(e) {
    (e || this.__oldChecked) && this.validate(), this.__oldChecked = e;
  }
  /**
   * Override an observer from `FieldMixin`
   * to validate when required is removed.
   *
   * @protected
   * @override
   */
  _requiredChanged(e) {
    super._requiredChanged(e), e === !1 && this.validate();
  }
  /** @private */
  _onRequiredIndicatorClick() {
    this._labelNode.click();
  }
  /**
   * Fired when the checkbox is checked or unchecked by the user.
   *
   * @event change
   */
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Pl = p`
  :host {
    display: inline-block;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([disabled]) {
    -webkit-tap-highlight-color: transparent;
  }

  .vaadin-checkbox-container {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: baseline;
  }

  [part='checkbox'],
  ::slotted(input),
  [part='label'] {
    grid-row: 1;
  }

  [part='checkbox'],
  ::slotted(input) {
    grid-column: 1;
  }

  [part='helper-text'],
  [part='error-message'] {
    grid-column: 2;
  }

  :host(:not([has-helper])) [part='helper-text'],
  :host(:not([has-error-message])) [part='error-message'] {
    display: none;
  }

  [part='checkbox'] {
    width: var(--vaadin-checkbox-size, 1em);
    height: var(--vaadin-checkbox-size, 1em);
    --_input-border-width: var(--vaadin-input-field-border-width, 0);
    --_input-border-color: var(--vaadin-input-field-border-color, transparent);
    box-shadow: inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
  }

  [part='checkbox']::before {
    display: block;
    content: '\\202F';
    line-height: var(--vaadin-checkbox-size, 1em);
    contain: paint;
  }

  /* visually hidden */
  ::slotted(input) {
    opacity: 0;
    cursor: inherit;
    margin: 0;
    align-self: stretch;
    -webkit-appearance: none;
    width: initial;
    height: initial;
  }

  @media (forced-colors: active) {
    [part='checkbox'] {
      outline: 1px solid;
      outline-offset: -1px;
    }

    :host([disabled]) [part='checkbox'],
    :host([disabled]) [part='checkbox']::after {
      outline-color: GrayText;
    }

    :host(:is([checked], [indeterminate])) [part='checkbox']::after {
      outline: 1px solid;
      outline-offset: -1px;
      border-radius: inherit;
    }

    :host([focused]) [part='checkbox'],
    :host([focused]) [part='checkbox']::after {
      outline-width: 2px;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-checkbox", Pl, { moduleId: "vaadin-checkbox-styles" });
class Tl extends kl(z(k(x))) {
  static get is() {
    return "vaadin-checkbox";
  }
  static get template() {
    return y`
      <div class="vaadin-checkbox-container">
        <div part="checkbox" aria-hidden="true"></div>
        <slot name="input"></slot>
        <div part="label">
          <slot name="label"></slot>
          <div part="required-indicator" on-click="_onRequiredIndicatorClick"></div>
        </div>
        <div part="helper-text">
          <slot name="helper"></slot>
        </div>
        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>
      <slot name="tooltip"></slot>
    `;
  }
  /** @protected */
  ready() {
    super.ready(), this._tooltipController = new me(this), this._tooltipController.setAriaTarget(this.inputElement), this.addController(this._tooltipController);
  }
}
b(Tl);
var Sl = Object.defineProperty, Ol = Object.getOwnPropertyDescriptor, zi = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? Ol(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && Sl(t, e, r), r;
};
let at = class extends P {
  constructor() {
    super(...arguments), this.label = "", this.value = "";
  }
  render() {
    return N`
        <vaadin-checkbox
          label="${this.label}"
          .value="${this.value}"
        ></vaadin-checkbox>`;
  }
};
zi([
  g({ type: String })
], at.prototype, "label", 2);
zi([
  g({ type: String })
], at.prototype, "value", 2);
at = zi([
  L("as-check")
], at);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const xt = p`
  :host {
    top: var(--lumo-space-m);
    right: var(--lumo-space-m);
    bottom: var(--lumo-space-m);
    left: var(--lumo-space-m);
    /* Workaround for Edge issue (only on Surface), where an overflowing vaadin-list-box inside vaadin-select-overlay makes the overlay transparent */
    /* stylelint-disable-next-line */
    outline: 0px solid transparent;
  }

  [part='overlay'] {
    background-color: var(--lumo-base-color);
    background-image: linear-gradient(var(--lumo-tint-5pct), var(--lumo-tint-5pct));
    border-radius: var(--lumo-border-radius-m);
    box-shadow:
      0 0 0 1px var(--lumo-shade-5pct),
      var(--lumo-box-shadow-m);
    color: var(--lumo-body-text-color);
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    font-weight: 400;
    line-height: var(--lumo-line-height-m);
    letter-spacing: 0;
    text-transform: none;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  [part='content'] {
    padding: var(--lumo-space-xs);
  }

  [part='backdrop'] {
    background-color: var(--lumo-shade-20pct);
    animation: 0.2s lumo-overlay-backdrop-enter both;
    will-change: opacity;
  }

  @keyframes lumo-overlay-backdrop-enter {
    0% {
      opacity: 0;
    }
  }

  :host([closing]) [part='backdrop'] {
    animation: 0.2s lumo-overlay-backdrop-exit both;
  }

  @keyframes lumo-overlay-backdrop-exit {
    100% {
      opacity: 0;
    }
  }

  @keyframes lumo-overlay-dummy-animation {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 1;
    }
  }
`;
m("", xt, { moduleId: "lumo-overlay" });
const Tr = p`
  /* Optical centering */
  :host::before,
  :host::after {
    content: '';
    flex-basis: 0;
    flex-grow: 1;
  }

  :host::after {
    flex-grow: 1.1;
  }

  [part='overlay'] {
    border-radius: var(--lumo-border-radius-l);
    box-shadow:
      0 0 0 1px var(--lumo-shade-5pct),
      var(--lumo-box-shadow-xl);
    background-image: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  [part='content'] {
    padding: var(--lumo-space-l);
  }

  :host(:is([has-header], [has-title])) [part='header'] + [part='content'] {
    padding-top: 0;
  }

  [part='header'],
  [part='header-content'],
  [part='footer'] {
    gap: var(--lumo-space-xs) var(--lumo-space-s);
    line-height: var(--lumo-line-height-s);
  }

  [part='header'] {
    padding: var(--lumo-space-m);
    background-color: var(--lumo-base-color);
    border-radius: var(--lumo-border-radius-l) var(--lumo-border-radius-l) 0 0; /* Needed for Safari */
  }

  [part='footer'] {
    padding: var(--lumo-space-s) var(--lumo-space-m);
    background-color: var(--lumo-contrast-5pct);
    border-radius: 0 0 var(--lumo-border-radius-l) var(--lumo-border-radius-l); /* Needed for Safari */
  }

  [part='title'] {
    font-size: var(--lumo-font-size-xl);
    font-weight: 600;
    color: var(--lumo-header-text-color);
    margin-inline-start: calc(var(--lumo-space-l) - var(--lumo-space-m));
  }

  /* No padding */
  :host([theme~='no-padding']) [part='content'] {
    padding: 0 !important;
  }

  @media (min-height: 320px) {
    :host([overflow~='top']) [part='header'] {
      box-shadow: 0 1px 0 0 var(--lumo-contrast-10pct);
    }
  }

  /* Animations */

  :host([opening]),
  :host([closing]) {
    animation: 0.25s lumo-overlay-dummy-animation;
  }

  :host([opening]) [part='overlay'] {
    animation: 0.12s 0.05s vaadin-dialog-enter cubic-bezier(0.215, 0.61, 0.355, 1) both;
  }

  @keyframes vaadin-dialog-enter {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  :host([closing]) [part='overlay'] {
    animation: 0.1s 0.03s vaadin-dialog-exit cubic-bezier(0.55, 0.055, 0.675, 0.19) both;
  }

  :host([closing]) [part='backdrop'] {
    animation-delay: 0.05s;
  }

  @keyframes vaadin-dialog-exit {
    100% {
      opacity: 0;
      transform: scale(1.02);
    }
  }
`;
m("vaadin-dialog-overlay", [xt, Tr], { moduleId: "lumo-dialog" });
m(
  "vaadin-confirm-dialog-overlay",
  [
    xt,
    Tr,
    p`
      [part='header'] ::slotted(h3) {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-inline-start: calc(var(--lumo-space-l) - var(--lumo-space-m));
      }

      [part='message'] {
        width: 25em;
        min-width: 100%;
        max-width: 100%;
      }

      ::slotted([slot$='button'][theme~='tertiary']) {
        padding-left: var(--lumo-space-s);
        padding-right: var(--lumo-space-s);
      }

      [part='cancel-button'] {
        flex-grow: 1;
      }

      @media (max-width: 360px) {
        [part='footer'] {
          flex-direction: column-reverse;
          align-items: stretch;
          padding: var(--lumo-space-s) var(--lumo-space-l);
          gap: var(--lumo-space-s);
        }

        ::slotted([slot$='button']) {
          width: 100%;
          margin: 0;
        }
      }
    `
  ],
  { moduleId: "lumo-confirm-dialog-overlay" }
);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Nl = (i) => class extends i {
  static get properties() {
    return {
      /**
       * True if the overlay is currently displayed.
       * @type {boolean}
       */
      opened: {
        type: Boolean,
        value: !1,
        notify: !0
      },
      /**
       * Set to true to disable closing dialog on outside click
       * @attr {boolean} no-close-on-outside-click
       * @type {boolean}
       */
      noCloseOnOutsideClick: {
        type: Boolean,
        value: !1
      },
      /**
       * Set to true to disable closing dialog on Escape press
       * @attr {boolean} no-close-on-esc
       * @type {boolean}
       */
      noCloseOnEsc: {
        type: Boolean,
        value: !1
      },
      /**
       * Set to true to remove backdrop and allow click events on background elements.
       * @type {boolean}
       */
      modeless: {
        type: Boolean,
        value: !1
      },
      /**
       * The `role` attribute value to be set on the overlay. Defaults to "dialog".
       *
       * @attr {string} overlay-role
       */
      overlayRole: {
        type: String,
        value: "dialog"
      }
    };
  }
  /** @protected */
  ready() {
    super.ready();
    const e = this.$.overlay;
    e.addEventListener("vaadin-overlay-outside-click", this._handleOutsideClick.bind(this)), e.addEventListener("vaadin-overlay-escape-press", this._handleEscPress.bind(this)), e.addEventListener("vaadin-overlay-closed", this.__handleOverlayClosed.bind(this)), this._overlayElement = e;
  }
  /** @private */
  __handleOverlayClosed() {
    this.dispatchEvent(new CustomEvent("closed"));
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback(), this.__restoreOpened && (this.opened = !0);
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback(), setTimeout(() => {
      this.isConnected || (this.__restoreOpened = this.opened, this.opened = !1);
    });
  }
  /** @protected */
  _onOverlayOpened(e) {
    e.detail.value === !1 && (this.opened = !1);
  }
  /**
   * Close the dialog if `noCloseOnOutsideClick` isn't set to true
   * @private
   */
  _handleOutsideClick(e) {
    this.noCloseOnOutsideClick && e.preventDefault();
  }
  /**
   * Close the dialog if `noCloseOnEsc` isn't set to true
   * @private
   */
  _handleEscPress(e) {
    this.noCloseOnEsc && e.preventDefault();
  }
  /** @private */
  _bringOverlayToFront() {
    this.modeless && this._overlayElement.bringToFront();
  }
  /**
   * Fired when the dialog is closed.
   *
   * @event closed
   */
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Il = p`
  [part='header'],
  [part='header-content'],
  [part='footer'] {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex: none;
    pointer-events: none;
    z-index: 1;
  }

  [part='header'] {
    flex-wrap: nowrap;
  }

  ::slotted([slot='header-content']),
  ::slotted([slot='title']),
  ::slotted([slot='footer']) {
    display: contents;
    pointer-events: auto;
  }

  ::slotted([slot='title']) {
    font: inherit !important;
    overflow-wrap: anywhere;
  }

  [part='header-content'] {
    flex: 1;
  }

  :host([has-title]) [part='header-content'],
  [part='footer'] {
    justify-content: flex-end;
  }

  :host(:not([has-title]):not([has-header])) [part='header'],
  :host(:not([has-header])) [part='header-content'],
  :host(:not([has-title])) [part='title'],
  :host(:not([has-footer])) [part='footer'] {
    display: none !important;
  }

  :host(:is([has-title], [has-header], [has-footer])) [part='content'] {
    height: auto;
  }

  @media (min-height: 320px) {
    :host(:is([has-title], [has-header], [has-footer])) .resizer-container {
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    :host(:is([has-title], [has-header], [has-footer])) [part='content'] {
      flex: 1;
      overflow: auto;
    }
  }

  /*
      NOTE(platosha): Make some min-width to prevent collapsing of the content
      taking the parent width, e. g., <vaadin-grid> and such.
    */
  [part='content'] {
    min-width: 12em; /* matches the default <vaadin-text-field> width */
  }

  :host([has-bounds-set]) [part='overlay'] {
    max-width: none;
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      outline: 3px solid !important;
    }
  }
`;
p`
  [part='overlay'] {
    position: relative;
    overflow: visible;
    max-height: 100%;
    display: flex;
  }

  [part='content'] {
    box-sizing: border-box;
    height: 100%;
  }

  .resizer-container {
    overflow: auto;
    flex-grow: 1;
    border-radius: inherit; /* prevent child elements being drawn outside part=overlay */
  }

  [part='overlay'][style] .resizer-container {
    min-height: 100%;
    width: 100%;
  }

  :host(:not([resizable])) .resizer {
    display: none;
  }

  :host([resizable]) [part='title'] {
    cursor: move;
    -webkit-user-select: none;
    user-select: none;
  }

  .resizer {
    position: absolute;
    height: 16px;
    width: 16px;
  }

  .resizer.edge {
    height: 8px;
    width: 8px;
    inset: -4px;
  }

  .resizer.edge.n {
    width: auto;
    bottom: auto;
    cursor: ns-resize;
  }

  .resizer.ne {
    top: -4px;
    right: -4px;
    cursor: nesw-resize;
  }

  .resizer.edge.e {
    height: auto;
    left: auto;
    cursor: ew-resize;
  }

  .resizer.se {
    bottom: -4px;
    right: -4px;
    cursor: nwse-resize;
  }

  .resizer.edge.s {
    width: auto;
    top: auto;
    cursor: ns-resize;
  }

  .resizer.sw {
    bottom: -4px;
    left: -4px;
    cursor: nesw-resize;
  }

  .resizer.edge.w {
    height: auto;
    right: auto;
    cursor: ew-resize;
  }

  .resizer.nw {
    top: -4px;
    left: -4px;
    cursor: nwse-resize;
  }
`;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let ni = !1, zl = [], Sr = [];
function Ml() {
  ni = !0, requestAnimationFrame(function() {
    ni = !1, Ll(zl), setTimeout(function() {
      Rl(Sr);
    });
  });
}
function Ll(i) {
  for (; i.length; )
    Or(i.shift());
}
function Rl(i) {
  for (let t = 0, e = i.length; t < e; t++)
    Or(i.shift());
}
function Or(i) {
  const t = i[0], e = i[1], o = i[2];
  try {
    e.apply(t, o);
  } catch (r) {
    setTimeout(() => {
      throw r;
    });
  }
}
function $l(i, t, e) {
  ni || Ml(), Sr.push([i, t, e]);
}
/**
 * @license
 * Copyright (c) 2017 Anton Korzunov
 * SPDX-License-Identifier: MIT
 */
let ee = /* @__PURE__ */ new WeakMap(), We = /* @__PURE__ */ new WeakMap(), Ke = {}, $t = 0;
const _o = (i) => i && i.nodeType === Node.ELEMENT_NODE, Dt = (...i) => {
  console.error(`Error: ${i.join(" ")}. Skip setting aria-hidden.`);
}, Dl = (i, t) => _o(i) ? t.map((e) => {
  if (!_o(e))
    return Dt(e, "is not a valid element"), null;
  let o = e;
  for (; o && o !== i; ) {
    if (i.contains(o))
      return e;
    o = o.getRootNode().host;
  }
  return Dt(e, "is not contained inside", i), null;
}).filter((e) => !!e) : (Dt(i, "is not a valid element"), []), Bl = (i, t, e, o) => {
  const r = Dl(t, Array.isArray(i) ? i : [i]);
  Ke[e] || (Ke[e] = /* @__PURE__ */ new WeakMap());
  const s = Ke[e], n = [], a = /* @__PURE__ */ new Set(), l = new Set(r), d = (u) => {
    if (!u || a.has(u))
      return;
    a.add(u);
    const h = u.assignedSlot;
    h && d(h), d(u.parentNode || u.host);
  };
  r.forEach(d);
  const c = (u) => {
    if (!u || l.has(u))
      return;
    const h = u.shadowRoot;
    (h ? [...u.children, ...h.children] : [...u.children]).forEach((_) => {
      if (!["template", "script", "style"].includes(_.localName))
        if (a.has(_))
          c(_);
        else {
          const T = _.getAttribute(o), S = T !== null && T !== "false", A = (ee.get(_) || 0) + 1, w = (s.get(_) || 0) + 1;
          ee.set(_, A), s.set(_, w), n.push(_), A === 1 && S && We.set(_, !0), w === 1 && _.setAttribute(e, "true"), S || _.setAttribute(o, "true");
        }
    });
  };
  return c(t), a.clear(), $t += 1, () => {
    n.forEach((u) => {
      const h = ee.get(u) - 1, f = s.get(u) - 1;
      ee.set(u, h), s.set(u, f), h || (We.has(u) ? We.delete(u) : u.removeAttribute(o)), f || u.removeAttribute(e);
    }), $t -= 1, $t || (ee = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), We = /* @__PURE__ */ new WeakMap(), Ke = {});
  };
}, Fl = (i, t = document.body, e = "data-aria-hidden") => {
  const o = Array.from(Array.isArray(i) ? i : [i]);
  return t && o.push(...Array.from(t.querySelectorAll("[aria-live]"))), Bl(o, t, e, "aria-hidden");
};
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Hl {
  /**
   * @param {HTMLElement} host
   */
  constructor(t, e) {
    this.host = t, this.callback = typeof e == "function" ? e : () => t;
  }
  /**
   * Make the controller host modal by hiding other elements from screen readers
   * using `aria-hidden` attribute (can be replaced with `inert` in the future).
   *
   * The method name is chosen to align with the one provided by native `<dialog>`:
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
   */
  showModal() {
    const t = this.callback();
    this.__showOthers = Fl(t);
  }
  /**
   * Remove `aria-hidden` from other elements unless there are any other
   * controller hosts on the page activated by using `showModal()` call.
   */
  close() {
    this.__showOthers && (this.__showOthers(), this.__showOthers = null);
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Ul {
  /**
   * Saves the given node as a target for restoring focus to
   * when `restoreFocus()` is called. If no node is provided,
   * the currently focused node in the DOM is saved as a target.
   *
   * @param {Node | null | undefined} focusNode
   */
  saveFocus(t) {
    this.focusNode = t || ii();
  }
  /**
   * Restores focus to the target node that was saved previously with `saveFocus()`.
   */
  restoreFocus(t) {
    const e = this.focusNode;
    if (!e)
      return;
    const o = t ? t.preventScroll : !1;
    ii() === document.body ? setTimeout(() => e.focus({ preventScroll: o })) : e.focus({ preventScroll: o }), this.focusNode = null;
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Bt = [];
class Vl {
  /**
   * @param {HTMLElement} host
   */
  constructor(t) {
    this.host = t, this.__trapNode = null, this.__onKeyDown = this.__onKeyDown.bind(this);
  }
  /**
   * An array of tab-ordered focusable elements inside the trap node.
   *
   * @return {HTMLElement[]}
   * @private
   */
  get __focusableElements() {
    return Ha(this.__trapNode);
  }
  /**
   * The index of the element inside the trap node that currently has focus.
   *
   * @return {HTMLElement | undefined}
   * @private
   */
  get __focusedElementIndex() {
    const t = this.__focusableElements;
    return t.indexOf(t.filter(cr).pop());
  }
  hostConnected() {
    document.addEventListener("keydown", this.__onKeyDown);
  }
  hostDisconnected() {
    document.removeEventListener("keydown", this.__onKeyDown);
  }
  /**
   * Activates a focus trap for a DOM node that will prevent focus from escaping the node.
   * The trap can be deactivated with the `.releaseFocus()` method.
   *
   * If focus is initially outside the trap, the method will move focus inside,
   * on the first focusable element of the trap in the tab order.
   * The first focusable element can be the trap node itself if it is focusable
   * and comes first in the tab order.
   *
   * If there are no focusable elements, the method will throw an exception
   * and the trap will not be set.
   *
   * @param {HTMLElement} trapNode
   */
  trapFocus(t) {
    if (this.__trapNode = t, this.__focusableElements.length === 0)
      throw this.__trapNode = null, new Error("The trap node should have at least one focusable descendant or be focusable itself.");
    Bt.push(this), this.__focusedElementIndex === -1 && this.__focusableElements[0].focus();
  }
  /**
   * Deactivates the focus trap set with the `.trapFocus()` method
   * so that it becomes possible to tab outside the trap node.
   */
  releaseFocus() {
    this.__trapNode = null, Bt.pop();
  }
  /**
   * A `keydown` event handler that manages tabbing navigation when the trap is enabled.
   *
   * - Moves focus to the next focusable element of the trap on `Tab` press.
   * When no next element to focus, the method moves focus to the first focusable element.
   * - Moves focus to the prev focusable element of the trap on `Shift+Tab` press.
   * When no prev element to focus, the method moves focus to the last focusable element.
   *
   * @param {KeyboardEvent} event
   * @private
   */
  __onKeyDown(t) {
    if (this.__trapNode && this === Array.from(Bt).pop() && t.key === "Tab") {
      t.preventDefault();
      const e = t.shiftKey;
      this.__focusNextElement(e);
    }
  }
  /**
   * - Moves focus to the next focusable element if `backward === false`.
   * When no next element to focus, the method moves focus to the first focusable element.
   * - Moves focus to the prev focusable element if `backward === true`.
   * When no prev element to focus the method moves focus to the last focusable element.
   *
   * If no focusable elements, the method returns immediately.
   *
   * @param {boolean} backward
   * @private
   */
  __focusNextElement(t = !1) {
    const e = this.__focusableElements, o = t ? -1 : 1, r = this.__focusedElementIndex, s = (e.length + r + o) % e.length, n = e[s];
    n.focus(), n.localName === "input" && n.select();
  }
}
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const jl = (i) => class extends X(i) {
  static get properties() {
    return {
      /**
       * When true, opening the overlay moves focus to the first focusable child,
       * or to the overlay part with tabindex if there are no focusable children.
       * @attr {boolean} focus-trap
       */
      focusTrap: {
        type: Boolean,
        value: !1
      },
      /**
       * Set to true to enable restoring of focus when overlay is closed.
       * @attr {boolean} restore-focus-on-close
       */
      restoreFocusOnClose: {
        type: Boolean,
        value: !1
      },
      /**
       * Set to specify the element which should be focused on overlay close,
       * if `restoreFocusOnClose` is set to true.
       * @type {HTMLElement}
       */
      restoreFocusNode: {
        type: HTMLElement
      }
    };
  }
  constructor() {
    super(), this.__ariaModalController = new Hl(this), this.__focusTrapController = new Vl(this), this.__focusRestorationController = new Ul();
  }
  /** @protected */
  ready() {
    super.ready(), this.addController(this.__ariaModalController), this.addController(this.__focusTrapController), this.addController(this.__focusRestorationController);
  }
  /**
   * Release focus and restore focus after the overlay is closed.
   *
   * @protected
   */
  _resetFocus() {
    if (this.focusTrap && (this.__ariaModalController.close(), this.__focusTrapController.releaseFocus()), this.restoreFocusOnClose && this._shouldRestoreFocus()) {
      const e = !lr();
      this.__focusRestorationController.restoreFocus({ preventScroll: e });
    }
  }
  /**
   * Save the previously focused node when the overlay starts to open.
   *
   * @protected
   */
  _saveFocus() {
    this.restoreFocusOnClose && this.__focusRestorationController.saveFocus(this.restoreFocusNode);
  }
  /**
   * Trap focus within the overlay after opening has completed.
   *
   * @protected
   */
  _trapFocus() {
    this.focusTrap && (this.__ariaModalController.showModal(), this.__focusTrapController.trapFocus(this.$.overlay));
  }
  /**
   * Returns true if focus is still inside the overlay or on the body element,
   * otherwise false.
   *
   * Focus shouldn't be restored if it's been moved elsewhere by another
   * component or as a result of a user interaction e.g. the user clicked
   * on a button outside the overlay while the overlay was open.
   *
   * @protected
   * @return {boolean}
   */
  _shouldRestoreFocus() {
    const e = ii();
    return e === document.body || this._deepContains(e);
  }
  /**
   * Returns true if the overlay contains the given node,
   * including those within shadow DOM trees.
   *
   * @param {Node} node
   * @return {boolean}
   * @protected
   */
  _deepContains(e) {
    if (this.contains(e))
      return !0;
    let o = e;
    const r = e.ownerDocument;
    for (; o && o !== r && o !== this; )
      o = o.parentNode || o.host;
    return o === this;
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Ze = () => Array.from(document.body.children).filter((i) => i instanceof HTMLElement && i._hasOverlayStackMixin && !i.hasAttribute("closing")).sort((i, t) => i.__zIndex - t.__zIndex || 0), ql = (i) => i === Ze().pop(), Wl = (i) => class extends i {
  constructor() {
    super(), this._hasOverlayStackMixin = !0;
  }
  /**
   * Returns true if this is the last one in the opened overlays stack.
   *
   * @return {boolean}
   * @protected
   */
  get _last() {
    return ql(this);
  }
  /**
   * Brings the overlay as visually the frontmost one.
   */
  bringToFront() {
    let e = "";
    const o = Ze().filter((r) => r !== this).pop();
    o && (e = o.__zIndex + 1), this.style.zIndex = e, this.__zIndex = e || parseFloat(getComputedStyle(this).zIndex);
  }
  /** @protected */
  _enterModalState() {
    document.body.style.pointerEvents !== "none" && (this._previousDocumentPointerEvents = document.body.style.pointerEvents, document.body.style.pointerEvents = "none"), Ze().forEach((e) => {
      e !== this && (e.$.overlay.style.pointerEvents = "none");
    });
  }
  /** @protected */
  _exitModalState() {
    this._previousDocumentPointerEvents !== void 0 && (document.body.style.pointerEvents = this._previousDocumentPointerEvents, delete this._previousDocumentPointerEvents);
    const e = Ze();
    let o;
    for (; (o = e.pop()) && !(o !== this && (o.$.overlay.style.removeProperty("pointer-events"), !o.modeless)); )
      ;
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Nr = (i) => class extends jl(Wl(i)) {
  static get properties() {
    return {
      /**
       * When true, the overlay is visible and attached to body.
       */
      opened: {
        type: Boolean,
        notify: !0,
        observer: "_openedChanged",
        reflectToAttribute: !0
      },
      /**
       * Owner element passed with renderer function
       * @type {HTMLElement}
       */
      owner: {
        type: Object
      },
      /**
       * Object with properties that is passed to `renderer` function
       */
      model: {
        type: Object
      },
      /**
       * Custom function for rendering the content of the overlay.
       * Receives three arguments:
       *
       * - `root` The root container DOM element. Append your content to it.
       * - `owner` The host element of the renderer function.
       * - `model` The object with the properties related with rendering.
       * @type {OverlayRenderer | null | undefined}
       */
      renderer: {
        type: Object
      },
      /**
       * When true the overlay won't disable the main content, showing
       * it doesn't change the functionality of the user interface.
       * @type {boolean}
       */
      modeless: {
        type: Boolean,
        value: !1,
        reflectToAttribute: !0,
        observer: "_modelessChanged"
      },
      /**
       * When set to true, the overlay is hidden. This also closes the overlay
       * immediately in case there is a closing animation in progress.
       * @type {boolean}
       */
      hidden: {
        type: Boolean,
        reflectToAttribute: !0,
        observer: "_hiddenChanged"
      },
      /**
       * When true the overlay has backdrop on top of content when opened.
       * @type {boolean}
       */
      withBackdrop: {
        type: Boolean,
        value: !1,
        reflectToAttribute: !0
      }
    };
  }
  static get observers() {
    return ["_rendererOrDataChanged(renderer, owner, model, opened)"];
  }
  constructor() {
    super(), this._boundMouseDownListener = this._mouseDownListener.bind(this), this._boundMouseUpListener = this._mouseUpListener.bind(this), this._boundOutsideClickListener = this._outsideClickListener.bind(this), this._boundKeydownListener = this._keydownListener.bind(this), pr && (this._boundIosResizeListener = () => this._detectIosNavbar());
  }
  /** @protected */
  ready() {
    super.ready(), this.addEventListener("click", () => {
    }), this.$.backdrop.addEventListener("click", () => {
    }), this.addEventListener("mouseup", () => {
      document.activeElement === document.body && this.$.overlay.getAttribute("tabindex") === "0" && this.$.overlay.focus();
    });
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback(), this._boundIosResizeListener && (this._detectIosNavbar(), window.addEventListener("resize", this._boundIosResizeListener));
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback(), this._boundIosResizeListener && window.removeEventListener("resize", this._boundIosResizeListener);
  }
  /**
   * Requests an update for the content of the overlay.
   * While performing the update, it invokes the renderer passed in the `renderer` property.
   *
   * It is not guaranteed that the update happens immediately (synchronously) after it is requested.
   */
  requestContentUpdate() {
    this.renderer && this.renderer.call(this.owner, this, this.owner, this.model);
  }
  /**
   * @param {Event=} sourceEvent
   */
  close(e) {
    const o = new CustomEvent("vaadin-overlay-close", {
      bubbles: !0,
      cancelable: !0,
      detail: { sourceEvent: e }
    });
    this.dispatchEvent(o), o.defaultPrevented || (this.opened = !1);
  }
  /** @private */
  _detectIosNavbar() {
    if (!this.opened)
      return;
    const e = window.innerHeight, r = window.innerWidth > e, s = document.documentElement.clientHeight;
    r && s > e ? this.style.setProperty("--vaadin-overlay-viewport-bottom", `${s - e}px`) : this.style.setProperty("--vaadin-overlay-viewport-bottom", "0");
  }
  /** @private */
  _addGlobalListeners() {
    document.addEventListener("mousedown", this._boundMouseDownListener), document.addEventListener("mouseup", this._boundMouseUpListener), document.documentElement.addEventListener("click", this._boundOutsideClickListener, !0);
  }
  /** @private */
  _removeGlobalListeners() {
    document.removeEventListener("mousedown", this._boundMouseDownListener), document.removeEventListener("mouseup", this._boundMouseUpListener), document.documentElement.removeEventListener("click", this._boundOutsideClickListener, !0);
  }
  /** @private */
  _rendererOrDataChanged(e, o, r, s) {
    const n = this._oldOwner !== o || this._oldModel !== r;
    this._oldModel = r, this._oldOwner = o;
    const a = this._oldRenderer !== e, l = this._oldRenderer !== void 0;
    this._oldRenderer = e;
    const d = this._oldOpened !== s;
    this._oldOpened = s, a && l && (this.innerHTML = "", delete this._$litPart$), s && e && (a || d || n) && this.requestContentUpdate();
  }
  /** @private */
  _modelessChanged(e) {
    e ? (this._removeGlobalListeners(), this._exitModalState()) : this.opened && (this._addGlobalListeners(), this._enterModalState());
  }
  /** @private */
  _openedChanged(e, o) {
    e ? (this._saveFocus(), this._animatedOpening(), $l(this, () => {
      this._trapFocus();
      const r = new CustomEvent("vaadin-overlay-open", { bubbles: !0 });
      this.dispatchEvent(r);
    }), document.addEventListener("keydown", this._boundKeydownListener), this.modeless || this._addGlobalListeners()) : o && (this._resetFocus(), this._animatedClosing(), document.removeEventListener("keydown", this._boundKeydownListener), this.modeless || this._removeGlobalListeners());
  }
  /** @private */
  _hiddenChanged(e) {
    e && this.hasAttribute("closing") && this._flushAnimation("closing");
  }
  /**
   * @return {boolean}
   * @private
   */
  _shouldAnimate() {
    const e = getComputedStyle(this), o = e.getPropertyValue("animation-name");
    return !(e.getPropertyValue("display") === "none") && o && o !== "none";
  }
  /**
   * @param {string} type
   * @param {Function} callback
   * @private
   */
  _enqueueAnimation(e, o) {
    const r = `__${e}Handler`, s = (n) => {
      n && n.target !== this || (o(), this.removeEventListener("animationend", s), delete this[r]);
    };
    this[r] = s, this.addEventListener("animationend", s);
  }
  /**
   * @param {string} type
   * @protected
   */
  _flushAnimation(e) {
    const o = `__${e}Handler`;
    typeof this[o] == "function" && this[o]();
  }
  /** @private */
  _animatedOpening() {
    this.parentNode === document.body && this.hasAttribute("closing") && this._flushAnimation("closing"), this._attachOverlay(), this.modeless || this._enterModalState(), this.setAttribute("opening", ""), this._shouldAnimate() ? this._enqueueAnimation("opening", () => {
      this._finishOpening();
    }) : this._finishOpening();
  }
  /** @private */
  _attachOverlay() {
    this._placeholder = document.createComment("vaadin-overlay-placeholder"), this.parentNode.insertBefore(this._placeholder, this), document.body.appendChild(this), this.bringToFront();
  }
  /** @private */
  _finishOpening() {
    this.removeAttribute("opening");
  }
  /** @private */
  _finishClosing() {
    this._detachOverlay(), this.$.overlay.style.removeProperty("pointer-events"), this.removeAttribute("closing"), this.dispatchEvent(new CustomEvent("vaadin-overlay-closed"));
  }
  /** @private */
  _animatedClosing() {
    this.hasAttribute("opening") && this._flushAnimation("opening"), this._placeholder && (this._exitModalState(), this.setAttribute("closing", ""), this.dispatchEvent(new CustomEvent("vaadin-overlay-closing")), this._shouldAnimate() ? this._enqueueAnimation("closing", () => {
      this._finishClosing();
    }) : this._finishClosing());
  }
  /** @private */
  _detachOverlay() {
    this._placeholder.parentNode.insertBefore(this, this._placeholder), this._placeholder.parentNode.removeChild(this._placeholder);
  }
  /** @private */
  _mouseDownListener(e) {
    this._mouseDownInside = e.composedPath().indexOf(this.$.overlay) >= 0;
  }
  /** @private */
  _mouseUpListener(e) {
    this._mouseUpInside = e.composedPath().indexOf(this.$.overlay) >= 0;
  }
  /**
   * Whether to close the overlay on outside click or not.
   * Override this method to customize the closing logic.
   *
   * @param {Event} _event
   * @return {boolean}
   * @protected
   */
  _shouldCloseOnOutsideClick(e) {
    return this._last;
  }
  /**
   * Outside click listener used in capture phase to close the overlay before
   * propagating the event to the listener on the element that triggered it.
   * Otherwise, calling `open()` would result in closing and re-opening.
   *
   * @private
   */
  _outsideClickListener(e) {
    if (e.composedPath().includes(this.$.overlay) || this._mouseDownInside || this._mouseUpInside) {
      this._mouseDownInside = !1, this._mouseUpInside = !1;
      return;
    }
    if (!this._shouldCloseOnOutsideClick(e))
      return;
    const o = new CustomEvent("vaadin-overlay-outside-click", {
      bubbles: !0,
      cancelable: !0,
      detail: { sourceEvent: e }
    });
    this.dispatchEvent(o), this.opened && !o.defaultPrevented && this.close(e);
  }
  /**
   * Listener used to close whe overlay on Escape press, if it is the last one.
   * @private
   */
  _keydownListener(e) {
    if (this._last && !(this.modeless && !e.composedPath().includes(this.$.overlay)) && e.key === "Escape") {
      const o = new CustomEvent("vaadin-overlay-escape-press", {
        bubbles: !0,
        cancelable: !0,
        detail: { sourceEvent: e }
      });
      this.dispatchEvent(o), this.opened && !o.defaultPrevented && this.close(e);
    }
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Ir = p`
  :host {
    z-index: 200;
    position: fixed;

    /* Despite of what the names say, <vaadin-overlay> is just a container
          for position/sizing/alignment. The actual overlay is the overlay part. */

    /* Default position constraints: the entire viewport. Note: themes can
          override this to introduce gaps between the overlay and the viewport. */
    inset: 0;
    bottom: var(--vaadin-overlay-viewport-bottom);

    /* Use flexbox alignment for the overlay part. */
    display: flex;
    flex-direction: column; /* makes dropdowns sizing easier */
    /* Align to center by default. */
    align-items: center;
    justify-content: center;

    /* Allow centering when max-width/max-height applies. */
    margin: auto;

    /* The host is not clickable, only the overlay part is. */
    pointer-events: none;

    /* Remove tap highlight on touch devices. */
    -webkit-tap-highlight-color: transparent;

    /* CSS API for host */
    --vaadin-overlay-viewport-bottom: 0;
  }

  :host([hidden]),
  :host(:not([opened]):not([closing])),
  :host(:not([opened]):not([closing])) [part='overlay'] {
    display: none !important;
  }

  [part='overlay'] {
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    pointer-events: auto;

    /* Prevent overflowing the host */
    max-width: 100%;
    box-sizing: border-box;

    -webkit-tap-highlight-color: initial; /* reenable tap highlight inside */
  }

  [part='backdrop'] {
    z-index: -1;
    content: '';
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
    pointer-events: auto;
  }
`;
/**
 * @license
 * Copyright (c) 2018 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Kl = (i) => class extends i {
  static get properties() {
    return {
      /**
       * Set the `aria-label` attribute for assistive technologies like
       * screen readers. An empty string value for this property (the
       * default) means that the `aria-label` attribute is not present.
       */
      ariaLabel: {
        type: String,
        value: ""
      },
      /**
       * Height to be set on the overlay content.
       */
      contentHeight: {
        type: String
      },
      /**
       * Width to be set on the overlay content.
       */
      contentWidth: {
        type: String
      }
    };
  }
  static get observers() {
    return [
      "__updateContentHeight(contentHeight, _overlayElement)",
      "__updateContentWidth(contentWidth, _overlayElement)"
    ];
  }
  /** @private */
  __updateDimension(e, o, r) {
    const s = `--_vaadin-confirm-dialog-content-${o}`;
    r ? e.style.setProperty(s, r) : e.style.removeProperty(s);
  }
  /** @private */
  __updateContentHeight(e, o) {
    o && this.__updateDimension(o, "height", e);
  }
  /** @private */
  __updateContentWidth(e, o) {
    o && this.__updateDimension(o, "width", e);
  }
};
/**
 * @license
 * Copyright (c) 2018 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Yl = p`
  :host {
    --_vaadin-confirm-dialog-content-width: auto;
    --_vaadin-confirm-dialog-content-height: auto;
  }

  [part='overlay'] {
    width: var(--_vaadin-confirm-dialog-content-width);
    height: var(--_vaadin-confirm-dialog-content-height);
  }

  ::slotted([slot='header']) {
    pointer-events: auto;
  }

  /* Make buttons clickable */
  [part='footer'] > * {
    pointer-events: all;
  }
`;
/**
 * @license
 * Copyright (c) 2018 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-confirm-dialog-overlay", [Ir, Il, Yl], {
  moduleId: "vaadin-confirm-dialog-overlay-styles"
});
class Gl extends Nr(Q(k(x))) {
  static get is() {
    return "vaadin-confirm-dialog-overlay";
  }
  static get template() {
    return y`
      <div part="backdrop" id="backdrop" hidden$="[[!withBackdrop]]"></div>
      <div part="overlay" id="overlay" tabindex="0">
        <section id="resizerContainer" class="resizer-container">
          <header part="header"><slot name="header"></slot></header>
          <div part="content" id="content">
            <div part="message"><slot></slot></div>
          </div>
          <footer part="footer" role="toolbar">
            <div part="cancel-button">
              <slot name="cancel-button"></slot>
            </div>
            <div part="reject-button">
              <slot name="reject-button"></slot>
            </div>
            <div part="confirm-button">
              <slot name="confirm-button"></slot>
            </div>
          </footer>
        </section>
      </div>
    `;
  }
  /**
   * @protected
   * @override
   */
  ready() {
    super.ready(), this.setAttribute("has-header", ""), this.setAttribute("has-footer", "");
  }
}
b(Gl);
class Jl extends Kl(
  Nl(ki(ct(x)))
) {
  static get is() {
    return "vaadin-confirm-dialog-dialog";
  }
  static get template() {
    return y`
      <style>
        :host {
          display: none;
        }
      </style>

      <vaadin-confirm-dialog-overlay
        id="overlay"
        opened="[[opened]]"
        on-opened-changed="_onOverlayOpened"
        on-mousedown="_bringOverlayToFront"
        on-touchstart="_bringOverlayToFront"
        theme$="[[_theme]]"
        modeless="[[modeless]]"
        with-backdrop="[[!modeless]]"
        resizable$="[[resizable]]"
        aria-label$="[[ariaLabel]]"
        restore-focus-on-close
        focus-trap
      ></vaadin-confirm-dialog-overlay>
    `;
  }
}
b(Jl);
/**
 * @license
 * Copyright (c) 2018 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Zl = (i) => class extends i {
  static get properties() {
    return {
      /**
       * Sets the `aria-describedby` attribute of the overlay element.
       *
       * By default, all elements inside the message area are linked
       * through the `aria-describedby` attribute. However, there are
       * cases where this can confuse screen reader users (e.g. the dialog
       * may present a password confirmation form). For these cases,
       * it's better to associate only the elements that will help describe
       * the confirmation dialog through this API.
       */
      accessibleDescriptionRef: {
        type: String
      },
      /**
       * True if the overlay is currently displayed.
       * @type {boolean}
       */
      opened: {
        type: Boolean,
        value: !1,
        notify: !0
      },
      /**
       * Set the confirmation dialog title.
       * @type {string}
       */
      header: {
        type: String,
        value: ""
      },
      /**
       * Set the message or confirmation question.
       */
      message: {
        type: String,
        value: ""
      },
      /**
       * Text displayed on confirm-button.
       * This only affects the default button, custom slotted buttons will not be altered.
       * @attr {string} confirm-text
       * @type {string}
       */
      confirmText: {
        type: String,
        value: "Confirm"
      },
      /**
       * Theme for a confirm-button.
       * This only affects the default button, custom slotted buttons will not be altered.
       * @attr {string} confirm-theme
       * @type {string}
       */
      confirmTheme: {
        type: String,
        value: "primary"
      },
      /**
       * Set to true to disable closing dialog on Escape press
       * @attr {boolean} no-close-on-esc
       * @type {boolean}
       */
      noCloseOnEsc: {
        type: Boolean,
        value: !1
      },
      /**
       * Whether to show reject button or not.
       * @attr {boolean} reject-button-visible
       * @type {boolean}
       */
      rejectButtonVisible: {
        type: Boolean,
        reflectToAttribute: !0,
        value: !1
      },
      /**
       * Text displayed on reject-button.
       * This only affects the default button, custom slotted buttons will not be altered.
       * @attr {string} reject-text
       * @type {string}
       */
      rejectText: {
        type: String,
        value: "Reject"
      },
      /**
       * Theme for a reject-button.
       * This only affects the default button, custom slotted buttons will not be altered.
       * @attr {string} reject-theme
       * @type {string}
       */
      rejectTheme: {
        type: String,
        value: "error tertiary"
      },
      /**
       * Whether to show cancel button or not.
       * @attr {boolean} cancel-button-visible
       * @type {boolean}
       */
      cancelButtonVisible: {
        type: Boolean,
        reflectToAttribute: !0,
        value: !1
      },
      /**
       * Text displayed on cancel-button.
       * This only affects the default button, custom slotted buttons will not be altered.
       * @attr {string} cancel-text
       * @type {string}
       */
      cancelText: {
        type: String,
        value: "Cancel"
      },
      /**
       * Theme for a cancel-button.
       * This only affects the default button, custom slotted buttons will not be altered.
       * @attr {string} cancel-theme
       * @type {string}
       */
      cancelTheme: {
        type: String,
        value: "tertiary"
      },
      /**
       * A space-delimited list of CSS class names
       * to set on the underlying overlay element.
       *
       * @attr {string} overlay-class
       */
      overlayClass: {
        type: String
      },
      /**
       * A reference to the "Cancel" button which will be teleported to the overlay.
       * @private
       */
      _cancelButton: {
        type: Object
      },
      /**
       * A reference to the "Confirm" button which will be teleported to the overlay.
       * @private
       */
      _confirmButton: {
        type: Object
      },
      /**
       * A reference to the "header" node which will be teleported to the overlay.
       * @private
       */
      _headerNode: {
        type: Object
      },
      /**
       * A list of message nodes which will be placed in the overlay default slot.
       * @private
       */
      _messageNodes: {
        type: Array,
        value: () => []
      },
      /**
       * A reference to the overlay element.
       * @private
       */
      _overlayElement: {
        type: Object,
        sync: !0
      },
      /**
       * A reference to the "Reject" button which will be teleported to the overlay.
       * @private
       */
      _rejectButton: {
        type: Object
      },
      /**
       * Height to be set on the overlay content.
       * @protected
       */
      _contentHeight: {
        type: String
      },
      /**
       * Width to be set on the overlay content.
       * @protected
       */
      _contentWidth: {
        type: String
      }
    };
  }
  static get observers() {
    return [
      "__updateConfirmButton(_confirmButton, confirmText, confirmTheme)",
      "__updateCancelButton(_cancelButton, cancelText, cancelTheme, cancelButtonVisible)",
      "__updateHeaderNode(_headerNode, header)",
      "__updateMessageNodes(_messageNodes, message)",
      "__updateRejectButton(_rejectButton, rejectText, rejectTheme, rejectButtonVisible)",
      "__accessibleDescriptionRefChanged(_overlayElement, _messageNodes, accessibleDescriptionRef)"
    ];
  }
  constructor() {
    super(), this.__cancel = this.__cancel.bind(this), this.__confirm = this.__confirm.bind(this), this.__reject = this.__reject.bind(this);
  }
  get __slottedNodes() {
    return [this._headerNode, ...this._messageNodes, this._cancelButton, this._confirmButton, this._rejectButton];
  }
  /** @protected */
  ready() {
    super.ready(), this._headerController = new M(this, "header", "h3", {
      initializer: (e) => {
        this._headerNode = e;
      }
    }), this.addController(this._headerController), this._messageController = new M(this, "", "div", {
      // Allow providing multiple custom nodes in the default slot
      multiple: !0,
      observe: !1,
      initializer: (e) => {
        const o = document.createElement("div");
        o.style.display = "contents";
        const r = `confirm-dialog-message-${pt()}`;
        o.id = r, this.appendChild(o), o.appendChild(e), this._messageNodes = [...this._messageNodes, o];
      }
    }), this.addController(this._messageController), this._cancelController = new M(this, "cancel-button", "vaadin-button", {
      initializer: (e) => {
        this.__setupSlottedButton("cancel", e);
      }
    }), this.addController(this._cancelController), this._rejectController = new M(this, "reject-button", "vaadin-button", {
      initializer: (e) => {
        this.__setupSlottedButton("reject", e);
      }
    }), this.addController(this._rejectController), this._confirmController = new M(this, "confirm-button", "vaadin-button", {
      initializer: (e) => {
        this.__setupSlottedButton("confirm", e);
      }
    }), this.addController(this._confirmController);
  }
  /** @protected */
  _initOverlay(e) {
    e.addEventListener("vaadin-overlay-escape-press", this._escPressed.bind(this)), e.addEventListener("vaadin-overlay-open", () => this.__onDialogOpened()), e.addEventListener("vaadin-overlay-closed", () => this.__onDialogClosed()), e.setAttribute("role", "alertdialog");
  }
  /** @private */
  __onDialogOpened() {
    const e = this._overlayElement;
    this.__slottedNodes.forEach((r) => {
      e.appendChild(r);
    });
    const o = e.querySelector('[slot="confirm-button"]');
    o && o.focus();
  }
  /** @private */
  __onDialogClosed() {
    this.__slottedNodes.forEach((e) => {
      this.appendChild(e);
    }), this.dispatchEvent(new CustomEvent("closed"));
  }
  /** @private */
  __accessibleDescriptionRefChanged(e, o, r) {
    !e || !o || (r !== void 0 ? se(e, "aria-describedby", {
      newId: r,
      oldId: this.__oldAccessibleDescriptionRef,
      fromUser: !0
    }) : o.forEach((s) => {
      se(e, "aria-describedby", { newId: s.id });
    }), this.__oldAccessibleDescriptionRef = r);
  }
  /** @private */
  __setupSlottedButton(e, o) {
    const r = `_${e}Button`, s = `__${e}`;
    this[r] && this[r] !== o && this[r].remove(), o.addEventListener("click", this[s]), this[r] = o;
  }
  /** @private */
  __updateCancelButton(e, o, r, s) {
    e && (e === this._cancelController.defaultNode && (e.textContent = o, e.setAttribute("theme", r)), e.toggleAttribute("hidden", !s));
  }
  /** @private */
  __updateConfirmButton(e, o, r) {
    e && e === this._confirmController.defaultNode && (e.textContent = o, e.setAttribute("theme", r));
  }
  /** @private */
  __updateHeaderNode(e, o) {
    e && e === this._headerController.defaultNode && (e.textContent = o);
  }
  /** @private */
  __updateMessageNodes(e, o) {
    if (e && e.length > 0) {
      const r = e.find(
        (s) => this._messageController.defaultNode && s === this._messageController.defaultNode.parentElement
      );
      r && (r.firstChild.textContent = o);
    }
  }
  /** @private */
  __updateRejectButton(e, o, r, s) {
    e && (e === this._rejectController.defaultNode && (e.textContent = o, e.setAttribute("theme", r)), e.toggleAttribute("hidden", !s));
  }
  /** @private */
  _escPressed(e) {
    e.defaultPrevented || this.__cancel();
  }
  /** @private */
  __confirm() {
    this.dispatchEvent(new CustomEvent("confirm")), this.opened = !1;
  }
  /** @private */
  __cancel() {
    this.dispatchEvent(new CustomEvent("cancel")), this.opened = !1;
  }
  /** @private */
  __reject() {
    this.dispatchEvent(new CustomEvent("reject")), this.opened = !1;
  }
  /** @private */
  _getAriaLabel(e) {
    return e || "confirmation";
  }
  /**
   * Fired when the confirm dialog is closed.
   *
   * @event closed
   */
};
/**
 * @license
 * Copyright (c) 2018 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Ql extends Zl(z(ct(X(x)))) {
  static get template() {
    return y`
      <style>
        :host,
        [hidden] {
          display: none !important;
        }
      </style>

      <vaadin-confirm-dialog-dialog
        id="dialog"
        opened="{{opened}}"
        overlay-class="[[overlayClass]]"
        aria-label="[[_getAriaLabel(header)]]"
        theme$="[[_theme]]"
        no-close-on-outside-click
        no-close-on-esc="[[noCloseOnEsc]]"
        content-height="[[_contentHeight]]"
        content-width="[[_contentWidth]]"
      ></vaadin-confirm-dialog-dialog>

      <div hidden>
        <slot name="header"></slot>
        <slot></slot>
        <slot name="cancel-button"></slot>
        <slot name="reject-button"></slot>
        <slot name="confirm-button"></slot>
      </div>
    `;
  }
  static get is() {
    return "vaadin-confirm-dialog";
  }
  /** @protected */
  ready() {
    super.ready(), this._overlayElement = this.$.dialog.$.overlay, this._initOverlay(this._overlayElement);
  }
  /**
   * @event confirm
   * fired when Confirm button was pressed.
   */
  /**
   * @event cancel
   * fired when Cancel button or Escape key was pressed.
   */
  /**
   * @event reject
   * fired when Reject button was pressed.
   */
}
b(Ql);
const Xl = p`
  :host([theme~='margin']) {
    margin: var(--lumo-space-m);
  }

  :host([theme~='padding']) {
    padding: var(--lumo-space-m);
  }

  :host([theme~='spacing-xs']) {
    gap: var(--lumo-space-xs);
  }

  :host([theme~='spacing-s']) {
    gap: var(--lumo-space-s);
  }

  :host([theme~='spacing']) {
    gap: var(--lumo-space-m);
  }

  :host([theme~='spacing-l']) {
    gap: var(--lumo-space-l);
  }

  :host([theme~='spacing-xl']) {
    gap: var(--lumo-space-xl);
  }
`;
m("vaadin-horizontal-layout", Xl, { moduleId: "lumo-horizontal-layout" });
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class ed extends z(k(x)) {
  static get template() {
    return y`
      <style>
        :host {
          display: flex;
          box-sizing: border-box;
        }

        :host([hidden]) {
          display: none !important;
        }

        /* Theme variations */
        :host([theme~='margin']) {
          margin: 1em;
        }

        :host([theme~='padding']) {
          padding: 1em;
        }

        :host([theme~='spacing']) {
          gap: 1em;
        }
      </style>

      <slot></slot>
    `;
  }
  static get is() {
    return "vaadin-horizontal-layout";
  }
}
b(ed);
var td = Object.defineProperty, id = Object.getOwnPropertyDescriptor, zr = (i) => {
  throw TypeError(i);
}, Fe = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? id(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && td(t, e, r), r;
}, Mr = (i, t, e) => t.has(i) || zr("Cannot " + e), od = (i, t, e) => (Mr(i, t, "read from private field"), e ? e.call(i) : t.get(i)), rd = (i, t, e) => t.has(i) ? zr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), sd = (i, t, e, o) => (Mr(i, t, "write to private field"), t.set(i, e), e), Qe;
let ce = class extends P {
  constructor() {
    super(...arguments), this.label = "Oops!", this.link = "", this.message = "", rd(this, Qe, !1);
  }
  get dialogOpened() {
    return od(this, Qe);
  }
  set dialogOpened(i) {
    sd(this, Qe, i);
  }
  //@state()
  //private accessor status = ''
  render() {
    return N`
          <vaadin-horizontal-layout
            style="align-items: center; justify-content: center;"
            theme="spacing"
          >
            <vaadin-button @click=${this.open} theme="primary" style="cursor: pointer;">${this.label}</vaadin-button>
    
            <vaadin-confirm-dialog
              header='Confirm ?'
              cancel-button-visible
              confirm-text="${this.label}"
              confirm-theme="error primary"
              .opened=${this.dialogOpened}
              @opened-changed="${this.openedChanged}"
              @confirm=${this.onClick}
            >
              ${this.message}
            </vaadin-confirm-dialog>
          </vaadin-horizontal-layout>
        `;
  }
  openedChanged(i) {
    this.dialogOpened = i.detail.value;
  }
  open() {
    this.dialogOpened = !0;
  }
  onClick() {
    console.log("Confirmed!"), this.link && location.assign(this.link);
  }
};
Qe = /* @__PURE__ */ new WeakMap();
Fe([
  g({ type: String })
], ce.prototype, "label", 2);
Fe([
  g({ type: String })
], ce.prototype, "link", 2);
Fe([
  g({ type: String })
], ce.prototype, "message", 2);
Fe([
  ns()
], ce.prototype, "dialogOpened", 1);
ce = Fe([
  L("as-confirm")
], ce);
var nd = Object.defineProperty, ad = Object.getOwnPropertyDescriptor, wt = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? ad(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && nd(t, e, r), r;
};
let J = class extends P {
  constructor() {
    super(), this.width = 1200, this.height = 675, this.url = "", this.width = 1200, this.height = 675, this.url = "";
  }
  /*connectedCallback() {
      super.connectedCallback();
      this.update();
  }*/
  render() {
    return N`
        <div class="embed-container">
            <iframe
            width="${this.width}"
            height="${this.height}"
            frameborder="0"
            src="${this.url}"
            type="text/html"
            allowScriptAccess="always"
            allowFullScreen
            scrolling="yes"
            allowNetworking="all"
            ></iframe>
        </div>`;
  }
};
J.styles = p`
    :host {
        width: 100%;
    }

    .embed-container {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 0;
        height: 0;
    }

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }`;
J.properties = {
  width: { type: Number },
  height: { type: Number },
  url: { type: String }
};
wt([
  g({ type: String })
], J.prototype, "width", 2);
wt([
  g({ type: String })
], J.prototype, "height", 2);
wt([
  g({ type: String })
], J.prototype, "url", 2);
J = wt([
  L("as-embed")
], J);
var ld = Object.defineProperty, dd = Object.getOwnPropertyDescriptor, Lr = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? dd(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && ld(t, e, r), r;
};
let lt = class extends P {
  constructor() {
    super(...arguments), this.url = "";
  }
  render() {
    return N`
        <div class="image-container">
          <br />
          <img src="${this.url}" />
          <br />
        </div>`;
  }
};
lt.styles = p`
    :host {
        display: flex;
        justify-content: center;
    }

    img {
        margin: 10px;
    }

    .image-container {
        display: flex;
        justify-content: center;
    }`;
Lr([
  g({ type: String })
], lt.prototype, "url", 2);
lt = Lr([
  L("as-image")
], lt);
m(
  "vaadin-radio-button",
  p`
    :host {
      color: var(--vaadin-radio-button-label-color, var(--lumo-body-text-color));
      font-size: var(--vaadin-radio-button-label-font-size, var(--lumo-font-size-m));
      font-family: var(--lumo-font-family);
      line-height: var(--lumo-line-height-s);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      cursor: default;
      outline: none;
      --_radio-button-size: var(--vaadin-radio-button-size, calc(var(--lumo-size-m) / 2));
      --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
      --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
      --_selection-color: var(--vaadin-selection-color, var(--lumo-primary-color));
    }

    :host([has-label]) ::slotted(label) {
      padding: var(
        --vaadin-radio-button-label-padding,
        var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs) var(--lumo-space-xs)
      );
    }

    [part='radio'] {
      width: var(--_radio-button-size);
      height: var(--_radio-button-size);
      margin: var(--lumo-space-xs);
      position: relative;
      border-radius: 50%;
      background: var(--vaadin-radio-button-background, var(--lumo-contrast-20pct));
      transition:
        transform 0.2s cubic-bezier(0.12, 0.32, 0.54, 2),
        background-color 0.15s;
      will-change: transform;
      cursor: var(--lumo-clickable-cursor);
      /* Default field border color */
      --_input-border-color: var(--vaadin-input-field-border-color, var(--lumo-contrast-50pct));
    }

    /* Used for activation "halo" */
    [part='radio']::before {
      pointer-events: none;
      color: transparent;
      width: 100%;
      height: 100%;
      line-height: var(--_radio-button-size);
      border-radius: inherit;
      background-color: inherit;
      transform: scale(1.4);
      opacity: 0;
      transition:
        transform 0.1s,
        opacity 0.8s;
      will-change: transform, opacity;
    }

    /* Used for the dot */
    [part='radio']::after {
      content: '';
      pointer-events: none;
      width: 0;
      height: 0;
      border: var(--vaadin-radio-button-dot-size, 3px) solid
        var(--vaadin-radio-button-dot-color, var(--lumo-primary-contrast-color));
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: 0.25s transform;
      will-change: transform;
      background-clip: content-box;
    }

    :host([checked]) {
      --vaadin-input-field-border-color: transparent;
    }

    :host([checked]) [part='radio'] {
      background-color: var(--_selection-color);
    }

    :host([checked]) [part='radio']::after {
      transform: translate(-50%, -50%) scale(1);
    }

    :host(:not([checked]):not([disabled]):hover) [part='radio'] {
      background: var(--vaadin-radio-button-background-hover, var(--lumo-contrast-30pct));
    }

    :host([active]) [part='radio'] {
      transform: scale(0.9);
      transition-duration: 0.05s;
    }

    :host([active][checked]) [part='radio'] {
      transform: scale(1.1);
    }

    :host([active]:not([checked])) [part='radio']::before {
      transition-duration: 0.01s, 0.01s;
      transform: scale(0);
      opacity: 0.4;
    }

    :host([focus-ring]) [part='radio'] {
      box-shadow:
        0 0 0 1px var(--lumo-base-color),
        0 0 0 calc(var(--_focus-ring-width) + 1px) var(--_focus-ring-color),
        inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
    }

    :host([disabled]) {
      pointer-events: none;
      color: var(--lumo-disabled-text-color);
      --vaadin-input-field-border-color: var(--lumo-contrast-20pct);
    }

    :host([disabled]) ::slotted(label) {
      color: inherit;
    }

    :host([disabled]) [part='radio'] {
      background-color: var(--vaadin-radio-button-disabled-background, var(--lumo-contrast-10pct));
    }

    :host([disabled]) [part='radio']::after {
      border-color: var(--vaadin-radio-button-disabled-dot-color, var(--lumo-contrast-30pct));
    }

    /* RTL specific styles */
    :host([dir='rtl'][has-label]) ::slotted(label) {
      padding: var(--lumo-space-xs) var(--lumo-space-xs) var(--lumo-space-xs) var(--lumo-space-s);
    }
  `,
  { moduleId: "lumo-radio-button" }
);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const cd = (i) => class extends Ar(Pr(vt(ft(i)))) {
  static get properties() {
    return {
      /**
       * The name of the radio button.
       *
       * @type {string}
       */
      name: {
        type: String,
        value: ""
      },
      /**
       * Indicates whether the element can be focused and where it participates in sequential keyboard navigation.
       *
       * @override
       * @protected
       */
      tabindex: {
        type: Number,
        value: 0,
        reflectToAttribute: !0
      }
    };
  }
  /** @override */
  static get delegateAttrs() {
    return [...super.delegateAttrs, "name"];
  }
  constructor() {
    super(), this._setType("radio"), this.value = "on";
  }
  /** @protected */
  ready() {
    super.ready(), this.addController(
      new Ti(this, (e) => {
        this._setInputElement(e), this._setFocusElement(e), this.stateTarget = e, this.ariaTarget = e;
      })
    ), this.addController(new yt(this.inputElement, this._labelController));
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const ud = p`
  :host {
    display: inline-block;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([disabled]) {
    -webkit-tap-highlight-color: transparent;
  }

  .vaadin-radio-button-container {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: baseline;
  }

  [part='radio'],
  ::slotted(input),
  ::slotted(label) {
    grid-row: 1;
  }

  [part='radio'],
  ::slotted(input) {
    grid-column: 1;
  }

  [part='radio'] {
    width: var(--vaadin-radio-button-size, 1em);
    height: var(--vaadin-radio-button-size, 1em);
    --_input-border-width: var(--vaadin-input-field-border-width, 0);
    --_input-border-color: var(--vaadin-input-field-border-color, transparent);
    box-shadow: inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
  }

  [part='radio']::before {
    display: block;
    content: '\\202F';
    line-height: var(--vaadin-radio-button-size, 1em);
    contain: paint;
  }

  /* visually hidden */
  ::slotted(input) {
    opacity: 0;
    cursor: inherit;
    margin: 0;
    align-self: stretch;
    -webkit-appearance: none;
    width: initial;
    height: initial;
  }

  @media (forced-colors: active) {
    [part='radio'] {
      outline: 1px solid;
      outline-offset: -1px;
    }

    :host([focused]) [part='radio'] {
      outline-width: 2px;
    }

    :host([disabled]) [part='radio'] {
      outline-color: GrayText;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-radio-button", ud, { moduleId: "vaadin-radio-button-styles" });
class hd extends cd(z(k(X(x)))) {
  static get is() {
    return "vaadin-radio-button";
  }
  static get template() {
    return y`
      <div class="vaadin-radio-button-container">
        <div part="radio" aria-hidden="true"></div>
        <slot name="input"></slot>
        <slot name="label"></slot>
      </div>
    `;
  }
}
b(hd);
const pd = p`
  :host {
    color: var(--lumo-body-text-color);
    font-size: var(--lumo-font-size-m);
    font-family: var(--lumo-font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    padding: var(--lumo-space-xs) 0;
  }

  :host::before {
    /* Effective height of vaadin-radio-button */
    height: var(--lumo-size-s);
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
  }

  :host([theme~='vertical']) [part='group-field'] {
    flex-direction: column;
  }

  :host([disabled]) [part='label'] {
    color: var(--lumo-disabled-text-color);
    -webkit-text-fill-color: var(--lumo-disabled-text-color);
  }

  :host([focused]:not([readonly])) [part='label'] {
    color: var(--lumo-primary-text-color);
  }

  :host(:hover:not([readonly]):not([focused])) [part='label'],
  :host(:hover:not([readonly])) [part='helper-text'] {
    color: var(--lumo-body-text-color);
  }

  /* Touch device adjustment */
  @media (pointer: coarse) {
    :host(:hover:not([readonly]):not([focused])) [part='label'] {
      color: var(--lumo-secondary-text-color);
    }
  }
`;
m("vaadin-radio-group", [Pi, _r, pd], { moduleId: "lumo-radio-group" });
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const fd = (i) => class extends bt(De($e(_e(i)))) {
  static get properties() {
    return {
      /**
       * The value of the radio group.
       *
       * @type {string}
       */
      value: {
        type: String,
        notify: !0,
        value: "",
        observer: "__valueChanged"
      },
      /**
       * When present, the user cannot modify the value of the radio group.
       * The property works similarly to the `disabled` property.
       * While the `disabled` property disables all radio buttons inside the group,
       * the `readonly` property disables only unchecked ones.
       *
       * @type {boolean}
       */
      readonly: {
        type: Boolean,
        value: !1,
        reflectToAttribute: !0,
        observer: "__readonlyChanged"
      },
      /**
       * @type {string}
       * @private
       */
      _fieldName: {
        type: String
      }
    };
  }
  constructor() {
    super(), this.__registerRadioButton = this.__registerRadioButton.bind(this), this.__unregisterRadioButton = this.__unregisterRadioButton.bind(this), this.__onRadioButtonCheckedChange = this.__onRadioButtonCheckedChange.bind(this), this._tooltipController = new me(this), this._tooltipController.addEventListener("tooltip-changed", (e) => {
      const o = e.detail.node;
      if (o && o.isConnected) {
        const r = this.__radioButtons.map((s) => s.inputElement);
        this._tooltipController.setAriaTarget(r);
      } else
        this._tooltipController.setAriaTarget([]);
    });
  }
  /**
   * A collection of the group's radio buttons.
   *
   * @return {!Array<!RadioButton>}
   * @private
   */
  get __radioButtons() {
    return this.__filterRadioButtons([...this.children]);
  }
  /**
   * A currently selected radio button.
   *
   * @return {!RadioButton | undefined}
   * @private
   */
  get __selectedRadioButton() {
    return this.__radioButtons.find((e) => e.checked);
  }
  /**
   * @return {boolean}
   * @private
   */
  get isHorizontalRTL() {
    return this.__isRTL && this._theme !== "vertical";
  }
  /** @protected */
  ready() {
    super.ready(), this.ariaTarget = this, this.setAttribute("role", "radiogroup"), this._fieldName = `${this.localName}-${pt()}`;
    const e = this.shadowRoot.querySelector("slot:not([name])");
    this._observer = new gi(e, ({ addedNodes: o, removedNodes: r }) => {
      this.__filterRadioButtons(o).reverse().forEach(this.__registerRadioButton), this.__filterRadioButtons(r).forEach(this.__unregisterRadioButton);
      const s = this.__radioButtons.map((n) => n.inputElement);
      this._tooltipController.setAriaTarget(s);
    }), this.addController(this._tooltipController);
  }
  /**
   * @param {!Array<!Node>} nodes
   * @return {!Array<!RadioButton>}
   * @private
   */
  __filterRadioButtons(e) {
    return e.filter((o) => o.nodeType === Node.ELEMENT_NODE && o.localName === "vaadin-radio-button");
  }
  /**
   * Override method inherited from `KeyboardMixin`
   * to implement the custom keyboard navigation as a replacement for the native one
   * in order for the navigation to work the same way across different browsers.
   *
   * @param {!KeyboardEvent} event
   * @override
   * @protected
   */
  _onKeyDown(e) {
    super._onKeyDown(e);
    const o = e.composedPath().find((r) => r.nodeType === Node.ELEMENT_NODE && r.localName === "vaadin-radio-button");
    ["ArrowLeft", "ArrowUp"].includes(e.key) && (e.preventDefault(), this.__selectNextRadioButton(o)), ["ArrowRight", "ArrowDown"].includes(e.key) && (e.preventDefault(), this.__selectPrevRadioButton(o));
  }
  /**
   * Override an observer from `FieldMixin`.
   *
   * @param {boolean} invalid
   * @protected
   * @override
   */
  _invalidChanged(e) {
    super._invalidChanged(e), e ? this.setAttribute("aria-invalid", "true") : this.removeAttribute("aria-invalid");
  }
  /**
   * @param {number} index
   * @private
   */
  __selectNextRadioButton(e) {
    const o = this.__radioButtons.indexOf(e);
    this.__selectIncRadioButton(o, this.isHorizontalRTL ? 1 : -1);
  }
  /**
   * @param {number} index
   * @private
   */
  __selectPrevRadioButton(e) {
    const o = this.__radioButtons.indexOf(e);
    this.__selectIncRadioButton(o, this.isHorizontalRTL ? -1 : 1);
  }
  /**
   * @param {number} index
   * @param {number} step
   * @private
   */
  __selectIncRadioButton(e, o) {
    const r = (this.__radioButtons.length + e + o) % this.__radioButtons.length, s = this.__radioButtons[r];
    s.disabled ? this.__selectIncRadioButton(r, o) : (s.focusElement.focus(), s.focusElement.click());
  }
  /**
   * Registers the radio button after adding it to the group.
   *
   * @param {!RadioButton} radioButton
   * @private
   */
  __registerRadioButton(e) {
    e.name = this._fieldName, e.addEventListener("checked-changed", this.__onRadioButtonCheckedChange), (this.disabled || this.readonly) && (e.disabled = !0), e.checked && this.__selectRadioButton(e);
  }
  /**
   * Unregisters the radio button before removing it from the group.
   *
   * @param {!RadioButton} radioButton
   * @private
   */
  __unregisterRadioButton(e) {
    e.removeEventListener("checked-changed", this.__onRadioButtonCheckedChange), e.value === this.value && this.__selectRadioButton(null);
  }
  /**
   * @param {!CustomEvent} event
   * @private
   */
  __onRadioButtonCheckedChange(e) {
    e.target.checked && this.__selectRadioButton(e.target);
  }
  /**
   * Whenever the user sets a non-empty value,
   * the method tries to select the radio button with that value
   * showing a warning if no radio button was found with the given value.
   * If the new value is empty, the method deselects the currently selected radio button.
   * At last, the method toggles the `has-value` attribute considering the new value.
   *
   * @param {string | null | undefined} newValue
   * @param {string | null | undefined} oldValue
   * @private
   */
  __valueChanged(e, o) {
    if (!(o === void 0 && e === "")) {
      if (e) {
        const r = this.__radioButtons.find((s) => s.value === e);
        r ? (this.__selectRadioButton(r), this.toggleAttribute("has-value", !0)) : console.warn(`The radio button with the value "${e}" was not found.`);
      } else
        this.__selectRadioButton(null), this.removeAttribute("has-value");
      o !== void 0 && this.validate();
    }
  }
  /**
   * Whenever `readonly` property changes on the group element,
   * the method updates the `disabled` property for the radio buttons.
   *
   * @param {boolean} newValue
   * @param {boolean} oldValue
   * @private
   */
  __readonlyChanged(e, o) {
    !e && o === void 0 || o !== e && this.__updateRadioButtonsDisabledProperty();
  }
  /**
   * Override method inherited from `DisabledMixin`
   * to update the `disabled` property for the radio buttons
   * whenever the property changes on the group element.
   *
   * @param {boolean} newValue
   * @param {boolean} oldValue
   * @override
   * @protected
   */
  _disabledChanged(e, o) {
    super._disabledChanged(e, o), !(!e && o === void 0) && o !== e && this.__updateRadioButtonsDisabledProperty();
  }
  /**
   * Override method inherited from `FocusMixin`
   * to prevent removing the `focused` attribute
   * when focus moves between radio buttons inside the group.
   *
   * @param {!FocusEvent} event
   * @return {boolean}
   * @protected
   */
  _shouldRemoveFocus(e) {
    return !this.contains(e.relatedTarget);
  }
  /**
   * Override method inherited from `FocusMixin`
   * to run validation when the group loses focus.
   *
   * @param {boolean} focused
   * @override
   * @protected
   */
  _setFocused(e) {
    super._setFocused(e), !e && document.hasFocus() && this.validate();
  }
  /**
   * @param {RadioButton} radioButton
   * @private
   */
  __selectRadioButton(e) {
    e ? this.value = e.value : this.value = "", this.__radioButtons.forEach((o) => {
      o.checked = o === e;
    }), this.readonly && this.__updateRadioButtonsDisabledProperty();
  }
  /**
   * If the group is read-only, the method disables the unchecked radio buttons.
   * Otherwise, the method propagates the group's `disabled` property to the radio buttons.
   *
   * @private
   */
  __updateRadioButtonsDisabledProperty() {
    this.__radioButtons.forEach((e) => {
      this.readonly ? e.disabled = e !== this.__selectedRadioButton : e.disabled = this.disabled;
    });
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const md = p`
  :host {
    display: inline-flex;
  }

  :host::before {
    content: '\\2003';
    width: 0;
    display: inline-block;
  }

  :host([hidden]) {
    display: none !important;
  }

  .vaadin-group-field-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  [part='group-field'] {
    display: flex;
    flex-wrap: wrap;
  }

  :host(:not([has-label])) [part='label'] {
    display: none;
  }
`;
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-radio-group", md, { moduleId: "vaadin-radio-group-styles" });
class _d extends fd(z(k(x))) {
  static get is() {
    return "vaadin-radio-group";
  }
  static get template() {
    return y`
      <div class="vaadin-group-field-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true"></span>
        </div>

        <div part="group-field">
          <slot></slot>
        </div>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `;
  }
}
b(_d);
class Rr {
  planeDeserialize(t) {
    const e = t.split(";"), o = [];
    try {
      t !== "" && t !== "[]" && e.forEach((r) => {
        const s = r.split(","), n = {};
        s.forEach((a) => {
          const [l, d] = a.split("=");
          n[l] = d;
        }), o.push(n);
      });
    } catch {
      console.log("planeDeserialize => IndexOutOfBounds! input =", t);
    }
    return o;
  }
}
var vd = Object.defineProperty, gd = Object.getOwnPropertyDescriptor, He = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? gd(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && vd(t, e, r), r;
};
let ue = class extends P {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.options = "label=A,value=A;label=B,value=B;label=C,value=C";
  }
  get items() {
    return new Rr().planeDeserialize(this.options).map((t) => ({ label: t.label, value: t.value }));
  }
  render() {
    return N`
        <vaadin-radio-group label="${this.label}" theme="horizontal">
            ${this.items.map((i) => N`
                <vaadin-radio-button value="${i.value}" label="${i.label}" ?checked="${this.value === i.value}"></vaadin-radio-button>
            `)}
        </vaadin-radio-group>`;
  }
};
He([
  g({ type: String })
], ue.prototype, "label", 2);
He([
  g({ type: String })
], ue.prototype, "value", 2);
He([
  g({ type: String })
], ue.prototype, "options", 2);
He([
  g({ type: Array })
], ue.prototype, "items", 1);
ue = He([
  L("as-radio")
], ue);
const $r = p`
  :host {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-xs);
    padding: 0.5em calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4) 0.5em
      var(--_lumo-list-box-item-padding-left, calc(var(--lumo-border-radius-m) / 4));
    min-height: var(--lumo-size-m);
    outline: none;
    border-radius: var(--lumo-border-radius-m);
    cursor: var(--lumo-clickable-cursor);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: var(--lumo-primary-color-10pct);
    --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
    --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
    --_selection-color-text: var(--vaadin-selection-color-text, var(--lumo-primary-text-color));
  }

  /* Checkmark */
  [part='checkmark']::before {
    display: var(--_lumo-item-selected-icon-display, none);
    content: var(--lumo-icons-checkmark);
    font-family: lumo-icons;
    font-size: var(--lumo-icon-size-m);
    line-height: 1;
    font-weight: normal;
    width: 1em;
    height: 1em;
    margin: calc((1 - var(--lumo-line-height-xs)) * var(--lumo-font-size-m) / 2) 0;
    color: var(--_selection-color-text);
    flex: none;
    opacity: 0;
    transition:
      transform 0.2s cubic-bezier(0.12, 0.32, 0.54, 2),
      opacity 0.1s;
  }

  :host([selected]) [part='checkmark']::before {
    opacity: 1;
  }

  :host([active]:not([selected])) [part='checkmark']::before {
    transform: scale(0.8);
    opacity: 0;
    transition-duration: 0s;
  }

  [part='content'] {
    flex: auto;
  }

  /* Disabled */
  :host([disabled]) {
    color: var(--lumo-disabled-text-color);
    cursor: default;
    pointer-events: none;
  }

  /* TODO a workaround until we have "focus-follows-mouse". After that, use the hover style for focus-ring as well */
  @media (any-hover: hover) {
    :host(:hover:not([disabled])) {
      background-color: var(--lumo-primary-color-10pct);
    }
  }

  :host([focus-ring]:not([disabled])) {
    box-shadow: inset 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
  }

  /* RTL specific styles */
  :host([dir='rtl']) {
    padding-left: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
    padding-right: var(--_lumo-list-box-item-padding-left, calc(var(--lumo-border-radius-m) / 4));
  }

  /* Slotted icons */
  :host ::slotted(vaadin-icon) {
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }
`;
m("vaadin-item", $r, { moduleId: "lumo-item" });
const Dr = p`
  :host {
    -webkit-tap-highlight-color: transparent;
    --_lumo-item-selected-icon-display: var(--_lumo-list-box-item-selected-icon-display, block);
  }

  /* Dividers */
  [part='items'] ::slotted(hr) {
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) var(--lumo-border-radius-m);
    background-color: var(--lumo-contrast-10pct);
  }
`;
m("vaadin-list-box", Dr, { moduleId: "lumo-list-box" });
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Br = p`
  :host([opening]),
  :host([closing]) {
    animation: 0.14s lumo-overlay-dummy-animation;
  }

  [part='overlay'] {
    will-change: opacity, transform;
  }

  :host([opening]) [part='overlay'] {
    animation: 0.1s lumo-menu-overlay-enter ease-out both;
  }

  @keyframes lumo-menu-overlay-enter {
    0% {
      opacity: 0;
      transform: translateY(-4px);
    }
  }

  :host([closing]) [part='overlay'] {
    animation: 0.1s lumo-menu-overlay-exit both;
  }

  @keyframes lumo-menu-overlay-exit {
    100% {
      opacity: 0;
    }
  }
`;
m("", Br, { moduleId: "lumo-menu-overlay-core" });
const bd = p`
  /* Small viewport (bottom sheet) styles */
  /* Use direct media queries instead of the state attributes ([phone] and [fullscreen]) provided by the elements */
  @media (max-width: 420px), (max-height: 420px) {
    :host {
      top: 0 !important;
      right: 0 !important;
      bottom: var(--vaadin-overlay-viewport-bottom, 0) !important;
      left: 0 !important;
      align-items: stretch !important;
      justify-content: flex-end !important;
    }

    [part='overlay'] {
      max-height: 50vh;
      width: 100vw;
      border-radius: 0;
      box-shadow: var(--lumo-box-shadow-xl);
    }

    /* The content part scrolls instead of the overlay part, because of the gradient fade-out */
    [part='content'] {
      padding: 30px var(--lumo-space-m);
      max-height: inherit;
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
      -webkit-mask-image: linear-gradient(transparent, #000 40px, #000 calc(100% - 40px), transparent);
      mask-image: linear-gradient(transparent, #000 40px, #000 calc(100% - 40px), transparent);
    }

    [part='backdrop'] {
      display: block;
    }

    /* Animations */

    :host([opening]) [part='overlay'] {
      animation: 0.2s lumo-mobile-menu-overlay-enter cubic-bezier(0.215, 0.61, 0.355, 1) both;
    }

    :host([closing]),
    :host([closing]) [part='backdrop'] {
      animation-delay: 0.14s;
    }

    :host([closing]) [part='overlay'] {
      animation: 0.14s 0.14s lumo-mobile-menu-overlay-exit cubic-bezier(0.55, 0.055, 0.675, 0.19) both;
    }
  }

  @keyframes lumo-mobile-menu-overlay-enter {
    0% {
      transform: translateY(150%);
    }
  }

  @keyframes lumo-mobile-menu-overlay-exit {
    100% {
      transform: translateY(150%);
    }
  }
`, Fr = [xt, Br, bd];
m("", Fr, { moduleId: "lumo-menu-overlay" });
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-select-item", $r, { moduleId: "lumo-select-item" });
m("vaadin-select-list-box", Dr, { moduleId: "lumo-select-list-box" });
const yd = p`
  :host(:not([theme*='align'])) ::slotted([slot='value']) {
    text-align: start;
  }

  [part='input-field'] {
    cursor: var(--lumo-clickable-cursor);
  }

  [part='input-field'] ::slotted([slot='value']) {
    font-weight: var(--vaadin-input-field-value-font-weight, 500);
  }

  [part='input-field'] ::slotted([slot='value']:not([placeholder])) {
    color: var(--vaadin-input-field-value-color, var(--lumo-body-text-color));
  }

  :host([readonly]) [part='input-field'] ::slotted([slot='value']:not([placeholder])) {
    color: var(--lumo-secondary-text-color);
  }

  /* placeholder styles */
  [part='input-field'] ::slotted([slot='value'][placeholder]) {
    color: var(--vaadin-input-field-placeholder-color, var(--lumo-secondary-text-color));
  }

  :host(:is([readonly], [disabled])) ::slotted([slot='value'][placeholder]) {
    opacity: 0;
  }

  [part='toggle-button']::before {
    content: var(--lumo-icons-dropdown);
  }

  /* Highlight the toggle button when hovering over the entire component */
  :host(:hover:not([readonly]):not([disabled])) [part='toggle-button'] {
    color: var(--lumo-contrast-80pct);
  }

  :host([theme~='small']) [part='input-field'] ::slotted([slot='value']) {
    --_lumo-selected-item-height: var(--lumo-size-s);
    --_lumo-selected-item-padding: 0;
  }
`;
m("vaadin-select", [ve, yd], { moduleId: "lumo-select" });
m(
  "vaadin-select-value-button",
  p`
    :host {
      font-family: var(--lumo-font-family);
      font-size: var(--vaadin-input-field-value-font-size, var(--lumo-font-size-m));
      padding: 0 0.25em;
      --_lumo-selected-item-height: var(--lumo-size-m);
      --_lumo-selected-item-padding: 0.5em;
    }

    ::slotted(*) {
      min-height: var(--_lumo-selected-item-height);
      padding-top: var(--_lumo-selected-item-padding);
      padding-bottom: var(--_lumo-selected-item-padding);
      font-size: inherit;
    }

    ::slotted(*:hover) {
      background-color: transparent;
    }
  `,
  { moduleId: "lumo-select-value-button" }
);
const xd = p`
  :host {
    --_lumo-item-selected-icon-display: block;
  }

  /* Small viewport adjustment */
  :host([phone]) {
    /* stylelint-disable declaration-block-no-redundant-longhand-properties */
    top: 0 !important;
    right: 0 !important;
    bottom: var(--vaadin-overlay-viewport-bottom, 0) !important;
    left: 0 !important;
    /* stylelint-enable declaration-block-no-redundant-longhand-properties */
    align-items: stretch;
    justify-content: flex-end;
  }

  :host([no-vertical-overlap][top-aligned]) [part='overlay'] {
    margin-block-start: var(--lumo-space-xs);
  }

  :host([no-vertical-overlap][bottom-aligned]) [part='overlay'] {
    margin-block-end: var(--lumo-space-xs);
  }

  :host([theme~='align-left']) {
    text-align: left;
  }

  :host([theme~='align-right']) {
    text-align: right;
  }

  :host([theme~='align-center']) {
    text-align: center;
  }
`;
m("vaadin-select-overlay", [Fr, xd], { moduleId: "lumo-select-overlay" });
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const wd = (i) => class extends ft(De(i)) {
  static get properties() {
    return {
      /**
       * Used for mixin detection because `instanceof` does not work with mixins.
       * e.g. in VaadinListMixin it filters items by using the
       * `element._hasVaadinItemMixin` condition.
       * @type {boolean}
       */
      _hasVaadinItemMixin: {
        value: !0
      },
      /**
       * If true, the item is in selected state.
       * @type {boolean}
       */
      selected: {
        type: Boolean,
        value: !1,
        reflectToAttribute: !0,
        observer: "_selectedChanged"
      },
      /** @private */
      _value: String
    };
  }
  /**
   * By default, `Space` is the only possible activation key for a focusable HTML element.
   * Nonetheless, the item is an exception as it can be also activated by pressing `Enter`.
   * See the "Keyboard Support" section in https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html.
   *
   * @protected
   * @override
   */
  get _activeKeys() {
    return ["Enter", " "];
  }
  /**
   * @return {string}
   */
  get value() {
    return this._value !== void 0 ? this._value : this.textContent.trim();
  }
  /**
   * @param {string} value
   */
  set value(e) {
    this._value = e;
  }
  /** @protected */
  ready() {
    super.ready();
    const e = this.getAttribute("value");
    e !== null && (this.value = e);
  }
  /**
   * Override native `focus` to set focused attribute
   * when focusing the item programmatically.
   * @protected
   * @override
   */
  focus() {
    this.disabled || (super.focus(), this._setFocused(!0));
  }
  /**
   * @param {KeyboardEvent | MouseEvent} _event
   * @protected
   * @override
   */
  _shouldSetActive(e) {
    return !this.disabled && !(e.type === "keydown" && e.defaultPrevented);
  }
  /** @private */
  _selectedChanged(e) {
    this.setAttribute("aria-selected", e);
  }
  /**
   * Override an observer from `DisabledMixin`.
   * @protected
   * @override
   */
  _disabledChanged(e) {
    super._disabledChanged(e), e && (this.selected = !1, this.blur());
  }
  /**
   * In order to be fully accessible from the keyboard, the item should
   * manually fire the `click` event once an activation key is pressed.
   *
   * According to the UI Events specifications,
   * the `click` event should be fired exactly on `keydown`:
   * https://www.w3.org/TR/uievents/#event-type-keydown
   *
   * @param {KeyboardEvent} event
   * @protected
   * @override
   */
  _onKeyDown(e) {
    super._onKeyDown(e), this._activeKeys.includes(e.key) && !e.defaultPrevented && (e.preventDefault(), this.click());
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Cd extends wd(k(Q(x))) {
  static get is() {
    return "vaadin-select-item";
  }
  static get template() {
    return y`
      <style>
        :host {
          display: inline-block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `;
  }
  /** @protected */
  ready() {
    super.ready(), this.setAttribute("role", "option");
  }
}
b(Cd);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function Ad(i, t) {
  const { scrollLeft: e } = i;
  return t !== "rtl" ? e : i.scrollWidth - i.clientWidth + e;
}
function Ed(i, t, e) {
  t !== "rtl" ? i.scrollLeft = e : i.scrollLeft = i.clientWidth - i.scrollWidth + e;
}
/**
 * @license
 * Copyright (c) 2022 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const kd = (i) => class extends _e(i) {
  /**
   * @return {Element | null}
   * @protected
   */
  get focused() {
    return (this._getItems() || []).find(cr);
  }
  /**
   * @return {boolean}
   * @protected
   */
  get _vertical() {
    return !0;
  }
  /** @protected */
  focus() {
    const e = this._getItems();
    if (Array.isArray(e)) {
      const o = this._getAvailableIndex(e, 0, null, (r) => !ri(r));
      o >= 0 && this._focus(o);
    }
  }
  /**
   * Get the list of items participating in keyboard navigation.
   * By default, it treats all the light DOM children as items.
   * Override this method to provide custom list of elements.
   *
   * @return {Element[]}
   * @protected
   */
  _getItems() {
    return Array.from(this.children);
  }
  /**
   * Override an event listener from `KeyboardMixin`.
   *
   * @param {!KeyboardEvent} event
   * @protected
   * @override
   */
  _onKeyDown(e) {
    if (super._onKeyDown(e), e.metaKey || e.ctrlKey)
      return;
    const { key: o } = e, r = this._getItems() || [], s = r.indexOf(this.focused);
    let n, a;
    const d = !this._vertical && this.getAttribute("dir") === "rtl" ? -1 : 1;
    this.__isPrevKey(o) ? (a = -d, n = s - d) : this.__isNextKey(o) ? (a = d, n = s + d) : o === "Home" ? (a = 1, n = 0) : o === "End" && (a = -1, n = r.length - 1), n = this._getAvailableIndex(r, n, a, (c) => !ri(c)), n >= 0 && (e.preventDefault(), this._focus(n, !0));
  }
  /**
   * @param {string} key
   * @return {boolean}
   * @private
   */
  __isPrevKey(e) {
    return this._vertical ? e === "ArrowUp" : e === "ArrowLeft";
  }
  /**
   * @param {string} key
   * @return {boolean}
   * @private
   */
  __isNextKey(e) {
    return this._vertical ? e === "ArrowDown" : e === "ArrowRight";
  }
  /**
   * Focus the item at given index. Override this method to add custom logic.
   *
   * @param {number} index
   * @param {boolean} navigating
   * @protected
   */
  _focus(e, o = !1) {
    const r = this._getItems();
    this._focusItem(r[e], o);
  }
  /**
   * Focus the given item. Override this method to add custom logic.
   *
   * @param {Element} item
   * @param {boolean} navigating
   * @protected
   */
  _focusItem(e) {
    e && (e.focus(), e.setAttribute("focus-ring", ""));
  }
  /**
   * Returns index of the next item that satisfies the given condition,
   * based on the index of the current item and a numeric increment.
   *
   * @param {Element[]} items - array of items to iterate over
   * @param {number} index - index of the current item
   * @param {number} increment - numeric increment, can be either 1 or -1
   * @param {Function} condition - function used to check the item
   * @return {number}
   * @protected
   */
  _getAvailableIndex(e, o, r, s) {
    const n = e.length;
    let a = o;
    for (let l = 0; typeof a == "number" && l < n; l += 1, a += r || 1) {
      a < 0 ? a = n - 1 : a >= n && (a = 0);
      const d = e[a];
      if (!d.hasAttribute("disabled") && this.__isMatchingItem(d, s))
        return a;
    }
    return -1;
  }
  /**
   * Returns true if the item matches condition.
   *
   * @param {Element} item - item to check
   * @param {Function} condition - function used to check the item
   * @return {number}
   * @private
   */
  __isMatchingItem(e, o) {
    return typeof o == "function" ? o(e) : !0;
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Pd = (i) => class extends kd(i) {
  static get properties() {
    return {
      /**
       * If true, the user cannot interact with this element.
       * When the element is disabled, the selected item is
       * not updated when `selected` property is changed.
       */
      disabled: {
        type: Boolean,
        value: !1,
        reflectToAttribute: !0
      },
      /**
       * The index of the item selected in the items array.
       * Note: Not updated when used in `multiple` selection mode.
       */
      selected: {
        type: Number,
        reflectToAttribute: !0,
        notify: !0
      },
      /**
       * Define how items are disposed in the dom.
       * Possible values are: `horizontal|vertical`.
       * It also changes navigation keys from left/right to up/down.
       * @type {!ListOrientation}
       */
      orientation: {
        type: String,
        reflectToAttribute: !0,
        value: ""
      },
      /**
       * The list of items from which a selection can be made.
       * It is populated from the elements passed to the light DOM,
       * and updated dynamically when adding or removing items.
       *
       * The item elements must implement `Vaadin.ItemMixin`.
       *
       * Note: unlike `<vaadin-combo-box>`, this property is read-only,
       * so if you want to provide items by iterating array of data,
       * you have to use `dom-repeat` and place it to the light DOM.
       * @type {!Array<!Element> | undefined}
       */
      items: {
        type: Array,
        readOnly: !0,
        notify: !0
      },
      /**
       * The search buffer for the keyboard selection feature.
       * @private
       */
      _searchBuf: {
        type: String,
        value: ""
      }
    };
  }
  static get observers() {
    return ["_enhanceItems(items, orientation, selected, disabled)"];
  }
  /**
   * @return {boolean}
   * @protected
   */
  get _isRTL() {
    return !this._vertical && this.getAttribute("dir") === "rtl";
  }
  /**
   * @return {!HTMLElement}
   * @protected
   */
  get _scrollerElement() {
    return console.warn(`Please implement the '_scrollerElement' property in <${this.localName}>`), this;
  }
  /**
   * @return {boolean}
   * @protected
   */
  get _vertical() {
    return this.orientation !== "horizontal";
  }
  focus() {
    this._observer && this._observer.flush();
    const e = Array.isArray(this.items) ? this.items : [], o = this._getAvailableIndex(e, 0, null, (r) => r.tabIndex === 0 && !ri(r));
    o >= 0 ? this._focus(o) : super.focus();
  }
  /** @protected */
  ready() {
    super.ready(), this.addEventListener("click", (o) => this._onClick(o));
    const e = this.shadowRoot.querySelector("slot:not([name])");
    this._observer = new gi(e, () => {
      this._setItems(this._filterItems(ir(this)));
    });
  }
  /**
   * Override method inherited from `KeyboardDirectionMixin`
   * to use the stored list of item elements.
   *
   * @return {Element[]}
   * @protected
   * @override
   */
  _getItems() {
    return this.items;
  }
  /** @private */
  _enhanceItems(e, o, r, s) {
    if (!s && e) {
      this.setAttribute("aria-orientation", o || "vertical"), e.forEach((a) => {
        o ? a.setAttribute("orientation", o) : a.removeAttribute("orientation");
      }), this._setFocusable(r < 0 || !r ? 0 : r);
      const n = e[r];
      e.forEach((a) => {
        a.selected = a === n;
      }), n && !n.disabled && this._scrollToItem(r);
    }
  }
  /**
   * @param {!Array<!Element>} array
   * @return {!Array<!Element>}
   * @protected
   */
  _filterItems(e) {
    return e.filter((o) => o._hasVaadinItemMixin);
  }
  /**
   * @param {!MouseEvent} event
   * @protected
   */
  _onClick(e) {
    if (e.metaKey || e.shiftKey || e.ctrlKey || e.defaultPrevented)
      return;
    const o = this._filterItems(e.composedPath())[0];
    let r;
    o && !o.disabled && (r = this.items.indexOf(o)) >= 0 && (this.selected = r);
  }
  /**
   * @param {number} currentIdx
   * @param {string} key
   * @return {number}
   * @protected
   */
  _searchKey(e, o) {
    this._searchReset = le.debounce(this._searchReset, Xo.after(500), () => {
      this._searchBuf = "";
    }), this._searchBuf += o.toLowerCase(), this.items.some((s) => this.__isMatchingKey(s)) || (this._searchBuf = o.toLowerCase());
    const r = this._searchBuf.length === 1 ? e + 1 : e;
    return this._getAvailableIndex(
      this.items,
      r,
      1,
      (s) => this.__isMatchingKey(s) && getComputedStyle(s).display !== "none"
    );
  }
  /** @private */
  __isMatchingKey(e) {
    return e.textContent.replace(/[^\p{L}\p{Nd}]/gu, "").toLowerCase().startsWith(this._searchBuf);
  }
  /**
   * Override an event listener from `KeyboardMixin`
   * to search items by key.
   *
   * @param {!KeyboardEvent} event
   * @protected
   * @override
   */
  _onKeyDown(e) {
    if (e.metaKey || e.ctrlKey)
      return;
    const o = e.key, r = this.items.indexOf(this.focused);
    if (/[\p{L}\p{Nd}]/u.test(o) && o.length === 1) {
      const s = this._searchKey(r, o);
      s >= 0 && this._focus(s);
      return;
    }
    super._onKeyDown(e);
  }
  /**
   * @param {!Element} item
   * @return {boolean}
   * @protected
   */
  _isItemHidden(e) {
    return getComputedStyle(e).display === "none";
  }
  /**
   * @param {number} idx
   * @protected
   */
  _setFocusable(e) {
    e = this._getAvailableIndex(this.items, e, 1);
    const o = this.items[e];
    this.items.forEach((r) => {
      r.tabIndex = r === o ? 0 : -1;
    });
  }
  /**
   * @param {number} idx
   * @protected
   */
  _focus(e) {
    this.items.forEach((o, r) => {
      o.focused = r === e;
    }), this._setFocusable(e), this._scrollToItem(e), super._focus(e);
  }
  /**
   * Scroll the container to have the next item by the edge of the viewport.
   * @param {number} idx
   * @protected
   */
  _scrollToItem(e) {
    const o = this.items[e];
    if (!o)
      return;
    const r = this._vertical ? ["top", "bottom"] : this._isRTL ? ["right", "left"] : ["left", "right"], s = this._scrollerElement.getBoundingClientRect(), n = (this.items[e + 1] || o).getBoundingClientRect(), a = (this.items[e - 1] || o).getBoundingClientRect();
    let l = 0;
    !this._isRTL && n[r[1]] >= s[r[1]] || this._isRTL && n[r[1]] <= s[r[1]] ? l = n[r[1]] - s[r[1]] : (!this._isRTL && a[r[0]] <= s[r[0]] || this._isRTL && a[r[0]] >= s[r[0]]) && (l = a[r[0]] - s[r[0]]), this._scroll(l);
  }
  /**
   * @param {number} pixels
   * @protected
   */
  _scroll(e) {
    if (this._vertical)
      this._scrollerElement.scrollTop += e;
    else {
      const o = this.getAttribute("dir") || "ltr", r = Ad(this._scrollerElement, o) + e;
      Ed(this._scrollerElement, o, r);
    }
  }
  /**
   * Fired when the selection is changed.
   * Not fired when used in `multiple` selection mode.
   *
   * @event selected-changed
   * @param {Object} detail
   * @param {Object} detail.value the index of the item selected in the items array.
   */
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Td extends Pd(k(Q(X(x)))) {
  static get is() {
    return "vaadin-select-list-box";
  }
  static get template() {
    return y`
      <style>
        :host {
          display: flex;
        }

        :host([hidden]) {
          display: none !important;
        }

        [part='items'] {
          height: 100%;
          width: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      </style>
      <div part="items">
        <slot></slot>
      </div>
    `;
  }
  static get properties() {
    return {
      // We don't need to define this property since super default is vertical,
      // but we don't want it to be modified, or be shown in the API docs.
      /** @private */
      orientation: {
        readOnly: !0
      }
    };
  }
  /**
   * @return {!HTMLElement}
   * @protected
   * @override
   */
  get _scrollerElement() {
    return this.shadowRoot.querySelector('[part="items"]');
  }
  /** @protected */
  ready() {
    super.ready(), this.setAttribute("role", "listbox");
  }
}
b(Td);
/**
 * @license
 * Copyright (c) 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
function Sd(i, t) {
  let e = null;
  const o = document.documentElement;
  function r() {
    e && e.disconnect(), e = null;
  }
  function s(n = !1, a = 1) {
    r();
    const { left: l, top: d, width: c, height: u } = i.getBoundingClientRect();
    if (n || t(), !c || !u)
      return;
    const h = Math.floor(d), f = Math.floor(o.clientWidth - (l + c)), _ = Math.floor(o.clientHeight - (d + u)), T = Math.floor(l), A = {
      rootMargin: `${-h}px ${-f}px ${-_}px ${-T}px`,
      threshold: Math.max(0, Math.min(1, a)) || 1
    };
    let w = !0;
    function B(ge) {
      let V = ge[0].intersectionRatio;
      if (V !== a) {
        if (!w)
          return s();
        V === 0 && (V = 1e-7), s(!1, V);
      }
      w = !1;
    }
    e = new IntersectionObserver(B, A), e.observe(i);
  }
  return s(!0), r;
}
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Ft = {
  start: "top",
  end: "bottom"
}, Ht = {
  start: "left",
  end: "right"
}, vo = new ResizeObserver((i) => {
  setTimeout(() => {
    i.forEach((t) => {
      t.target.__overlay && t.target.__overlay._updatePosition();
    });
  });
}), Od = (i) => class extends i {
  static get properties() {
    return {
      /**
       * The element next to which this overlay should be aligned.
       * The position of the overlay relative to the positionTarget can be adjusted
       * with properties `horizontalAlign`, `verticalAlign`, `noHorizontalOverlap`
       * and `noVerticalOverlap`.
       */
      positionTarget: {
        type: Object,
        value: null,
        sync: !0
      },
      /**
       * When `positionTarget` is set, this property defines whether to align the overlay's
       * left or right side to the target element by default.
       * Possible values are `start` and `end`.
       * RTL is taken into account when interpreting the value.
       * The overlay is automatically flipped to the opposite side when it doesn't fit into
       * the default side defined by this property.
       *
       * @attr {start|end} horizontal-align
       */
      horizontalAlign: {
        type: String,
        value: "start",
        sync: !0
      },
      /**
       * When `positionTarget` is set, this property defines whether to align the overlay's
       * top or bottom side to the target element by default.
       * Possible values are `top` and `bottom`.
       * The overlay is automatically flipped to the opposite side when it doesn't fit into
       * the default side defined by this property.
       *
       * @attr {top|bottom} vertical-align
       */
      verticalAlign: {
        type: String,
        value: "top",
        sync: !0
      },
      /**
       * When `positionTarget` is set, this property defines whether the overlay should overlap
       * the target element in the x-axis, or be positioned right next to it.
       *
       * @attr {boolean} no-horizontal-overlap
       */
      noHorizontalOverlap: {
        type: Boolean,
        value: !1,
        sync: !0
      },
      /**
       * When `positionTarget` is set, this property defines whether the overlay should overlap
       * the target element in the y-axis, or be positioned right above/below it.
       *
       * @attr {boolean} no-vertical-overlap
       */
      noVerticalOverlap: {
        type: Boolean,
        value: !1,
        sync: !0
      },
      /**
       * If the overlay content has no intrinsic height, this property can be used to set
       * the minimum vertical space (in pixels) required by the overlay. Setting a value to
       * the property effectively disables the content measurement in favor of using this
       * fixed value for determining the open direction.
       *
       * @attr {number} required-vertical-space
       */
      requiredVerticalSpace: {
        type: Number,
        value: 0,
        sync: !0
      }
    };
  }
  static get observers() {
    return [
      "__positionSettingsChanged(horizontalAlign, verticalAlign, noHorizontalOverlap, noVerticalOverlap, requiredVerticalSpace)",
      "__overlayOpenedChanged(opened, positionTarget)"
    ];
  }
  constructor() {
    super(), this.__onScroll = this.__onScroll.bind(this), this._updatePosition = this._updatePosition.bind(this);
  }
  /** @protected */
  connectedCallback() {
    super.connectedCallback(), this.opened && this.__addUpdatePositionEventListeners();
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback(), this.__removeUpdatePositionEventListeners();
  }
  /** @private */
  __addUpdatePositionEventListeners() {
    window.visualViewport.addEventListener("resize", this._updatePosition), window.visualViewport.addEventListener("scroll", this.__onScroll, !0), this.__positionTargetAncestorRootNodes = ma(this.positionTarget), this.__positionTargetAncestorRootNodes.forEach((e) => {
      e.addEventListener("scroll", this.__onScroll, !0);
    }), this.positionTarget && (this.__observePositionTargetMove = Sd(this.positionTarget, () => {
      this._updatePosition();
    }));
  }
  /** @private */
  __removeUpdatePositionEventListeners() {
    window.visualViewport.removeEventListener("resize", this._updatePosition), window.visualViewport.removeEventListener("scroll", this.__onScroll, !0), this.__positionTargetAncestorRootNodes && (this.__positionTargetAncestorRootNodes.forEach((e) => {
      e.removeEventListener("scroll", this.__onScroll, !0);
    }), this.__positionTargetAncestorRootNodes = null), this.__observePositionTargetMove && (this.__observePositionTargetMove(), this.__observePositionTargetMove = null);
  }
  /** @private */
  __overlayOpenedChanged(e, o) {
    if (this.__removeUpdatePositionEventListeners(), o && (o.__overlay = null, vo.unobserve(o), e && (this.__addUpdatePositionEventListeners(), o.__overlay = this, vo.observe(o))), e) {
      const r = getComputedStyle(this);
      this.__margins || (this.__margins = {}, ["top", "bottom", "left", "right"].forEach((s) => {
        this.__margins[s] = parseInt(r[s], 10);
      })), this._updatePosition(), requestAnimationFrame(() => this._updatePosition());
    }
  }
  __positionSettingsChanged() {
    this._updatePosition();
  }
  /** @private */
  __onScroll(e) {
    e.target instanceof Node && this.contains(e.target) || this._updatePosition();
  }
  _updatePosition() {
    if (!this.positionTarget || !this.opened || !this.__margins)
      return;
    const e = this.positionTarget.getBoundingClientRect();
    if (e.width === 0 && e.height === 0 && this.opened) {
      this.opened = !1;
      return;
    }
    const o = this.__shouldAlignStartVertically(e);
    this.style.justifyContent = o ? "flex-start" : "flex-end";
    const r = this.__isRTL, s = this.__shouldAlignStartHorizontally(e, r), n = !r && s || r && !s;
    this.style.alignItems = n ? "flex-start" : "flex-end";
    const a = this.getBoundingClientRect(), l = this.__calculatePositionInOneDimension(
      e,
      a,
      this.noVerticalOverlap,
      Ft,
      this,
      o
    ), d = this.__calculatePositionInOneDimension(
      e,
      a,
      this.noHorizontalOverlap,
      Ht,
      this,
      s
    );
    Object.assign(this.style, l, d), this.toggleAttribute("bottom-aligned", !o), this.toggleAttribute("top-aligned", o), this.toggleAttribute("end-aligned", !n), this.toggleAttribute("start-aligned", n);
  }
  __shouldAlignStartHorizontally(e, o) {
    const r = Math.max(this.__oldContentWidth || 0, this.$.overlay.offsetWidth);
    this.__oldContentWidth = this.$.overlay.offsetWidth;
    const s = Math.min(window.innerWidth, document.documentElement.clientWidth), n = !o && this.horizontalAlign === "start" || o && this.horizontalAlign === "end";
    return this.__shouldAlignStart(
      e,
      r,
      s,
      this.__margins,
      n,
      this.noHorizontalOverlap,
      Ht
    );
  }
  __shouldAlignStartVertically(e) {
    const o = this.requiredVerticalSpace || Math.max(this.__oldContentHeight || 0, this.$.overlay.offsetHeight);
    this.__oldContentHeight = this.$.overlay.offsetHeight;
    const r = Math.min(window.innerHeight, document.documentElement.clientHeight), s = this.verticalAlign === "top";
    return this.__shouldAlignStart(
      e,
      o,
      r,
      this.__margins,
      s,
      this.noVerticalOverlap,
      Ft
    );
  }
  // eslint-disable-next-line @typescript-eslint/max-params
  __shouldAlignStart(e, o, r, s, n, a, l) {
    const d = r - e[a ? l.end : l.start] - s[l.end], c = e[a ? l.start : l.end] - s[l.start], u = n ? d : c, f = u > (n ? c : d) || u > o;
    return n === f;
  }
  /**
   * Returns an adjusted value after resizing the browser window,
   * to avoid wrong calculations when e.g. previously set `bottom`
   * CSS property value is larger than the updated viewport height.
   * See https://github.com/vaadin/web-components/issues/4604
   */
  __adjustBottomProperty(e, o, r) {
    let s;
    if (e === o.end) {
      if (o.end === Ft.end) {
        const n = Math.min(window.innerHeight, document.documentElement.clientHeight);
        if (r > n && this.__oldViewportHeight) {
          const a = this.__oldViewportHeight - n;
          s = r - a;
        }
        this.__oldViewportHeight = n;
      }
      if (o.end === Ht.end) {
        const n = Math.min(window.innerWidth, document.documentElement.clientWidth);
        if (r > n && this.__oldViewportWidth) {
          const a = this.__oldViewportWidth - n;
          s = r - a;
        }
        this.__oldViewportWidth = n;
      }
    }
    return s;
  }
  /**
   * Returns an object with CSS position properties to set,
   * e.g. { top: "100px" }
   */
  // eslint-disable-next-line @typescript-eslint/max-params
  __calculatePositionInOneDimension(e, o, r, s, n, a) {
    const l = a ? s.start : s.end, d = a ? s.end : s.start, c = parseFloat(n.style[l] || getComputedStyle(n)[l]), u = this.__adjustBottomProperty(l, s, c), h = o[a ? s.start : s.end] - e[r === a ? s.end : s.start], f = u ? `${u}px` : `${c + h * (a ? -1 : 1)}px`;
    return {
      [l]: f,
      [d]: ""
    };
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Nd = (i) => class extends Od(Nr(Q(i))) {
  static get observers() {
    return ["_updateOverlayWidth(opened, owner)"];
  }
  /** @protected */
  ready() {
    super.ready(), this.restoreFocusOnClose = !0;
  }
  /** @protected */
  _getMenuElement() {
    return Array.from(this.children).find((e) => e.localName !== "style");
  }
  /** @private */
  _updateOverlayWidth(e, o) {
    if (e && o) {
      const r = "--vaadin-select-overlay-width", s = getComputedStyle(o).getPropertyValue(r);
      s === "" ? this.style.removeProperty(r) : this.style.setProperty(r, s);
    }
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Id = p`
  :host {
    align-items: flex-start;
    justify-content: flex-start;
  }

  :host(:not([phone])) [part='overlay'] {
    min-width: var(--vaadin-select-overlay-width, var(--vaadin-select-text-field-width));
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      outline: 3px solid;
    }
  }
`;
m("vaadin-select-overlay", [Ir, Id], {
  moduleId: "vaadin-select-overlay-styles"
});
class zd extends Nd(k(x)) {
  static get is() {
    return "vaadin-select-overlay";
  }
  static get template() {
    return y`
      <div id="backdrop" part="backdrop" hidden$="[[!withBackdrop]]"></div>
      <div part="overlay" id="overlay" tabindex="0">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  /** @protected */
  ready() {
    super.ready(), this.owner = this.__dataHost, this.owner._overlayElement = this;
  }
  requestContentUpdate() {
    if (super.requestContentUpdate(), this.owner) {
      const t = this._getMenuElement();
      this.owner._assignMenuElement(t);
    }
  }
}
b(zd);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Md = p`
  :host {
    display: inline-block;
    position: relative;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    min-width: 0;
    width: 0;
  }

  ::slotted(*) {
    padding-left: 0;
    padding-right: 0;
    flex: auto;
  }

  /* placeholder styles */
  ::slotted(*:not([selected])) {
    line-height: 1;
  }

  .vaadin-button-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: inherit;
    width: 100%;
    height: 100%;
    min-height: inherit;
    text-shadow: inherit;
  }

  [part='label'] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    line-height: inherit;
  }
`;
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-select-value-button", Md, { moduleId: "vaadin-select-value-button-styles" });
class Ld extends Ei(k(x)) {
  static get is() {
    return "vaadin-select-value-button";
  }
  static get template() {
    return y`
      <div class="vaadin-button-container">
        <span part="label">
          <slot></slot>
        </span>
      </div>
    `;
  }
}
b(Ld);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd..
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Rd = p`
  .sr-only {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class $d {
  constructor(t, e) {
    this.query = t, this.callback = e, this._boundQueryHandler = this._queryHandler.bind(this);
  }
  hostConnected() {
    this._removeListener(), this._mediaQuery = window.matchMedia(this.query), this._addListener(), this._queryHandler(this._mediaQuery);
  }
  hostDisconnected() {
    this._removeListener();
  }
  /** @private */
  _addListener() {
    this._mediaQuery && this._mediaQuery.addListener(this._boundQueryHandler);
  }
  /** @private */
  _removeListener() {
    this._mediaQuery && this._mediaQuery.removeListener(this._boundQueryHandler), this._mediaQuery = null;
  }
  /** @private */
  _queryHandler(t) {
    typeof this.callback == "function" && this.callback(t.matches);
  }
}
/**
 * @license
 * Copyright (c) 2023 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class Dd extends M {
  constructor(t) {
    super(t, "value", "vaadin-select-value-button", {
      initializer: (e, o) => {
        o._setFocusElement(e), o.ariaTarget = e, o.stateTarget = e, e.setAttribute("aria-haspopup", "listbox");
      }
    });
  }
}
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Bd = (i) => class extends ki(
  vt(Ni(_e(bt(i))))
) {
  static get properties() {
    return {
      /**
       * An array containing items that will be rendered as the options of the select.
       *
       * #### Example
       * ```js
       * select.items = [
       *   { label: 'Most recent first', value: 'recent' },
       *   { component: 'hr' },
       *   { label: 'Rating: low to high', value: 'rating-asc', className: 'asc' },
       *   { label: 'Rating: high to low', value: 'rating-desc', className: 'desc' },
       *   { component: 'hr' },
       *   { label: 'Price: low to high', value: 'price-asc', disabled: true },
       *   { label: 'Price: high to low', value: 'price-desc', disabled: true }
       * ];
       * ```
       *
       * Note: each item is rendered by default as the internal `<vaadin-select-item>` that is an extension of `<vaadin-item>`.
       * To render the item with a custom component, provide a tag name by the `component` property.
       *
       * @type {!Array<!SelectItem>}
       */
      items: {
        type: Array,
        observer: "__itemsChanged"
      },
      /**
       * Set when the select is open
       * @type {boolean}
       */
      opened: {
        type: Boolean,
        value: !1,
        notify: !0,
        reflectToAttribute: !0,
        observer: "_openedChanged"
      },
      /**
       * Custom function for rendering the content of the `<vaadin-select>`.
       * Receives two arguments:
       *
       * - `root` The `<vaadin-select-overlay>` internal container
       *   DOM element. Append your content to it.
       * - `select` The reference to the `<vaadin-select>` element.
       * @type {!SelectRenderer | undefined}
       */
      renderer: {
        type: Object
      },
      /**
       * The `value` property of the selected item, or an empty string
       * if no item is selected.
       * On change or initialization, the component finds the item which matches the
       * value and displays it.
       * If no value is provided to the component, it selects the first item without
       * value or empty value.
       * Hint: If you do not want to select any item by default, you can either set all
       * the values of inner vaadin-items, or set the vaadin-select value to
       * an inexistent value in the items list.
       * @type {string}
       */
      value: {
        type: String,
        value: "",
        notify: !0,
        observer: "_valueChanged"
      },
      /**
       * The name of this element.
       */
      name: {
        type: String
      },
      /**
       * A hint to the user of what can be entered in the control.
       * The placeholder will be displayed in the case that there
       * is no item selected, or the selected item has an empty
       * string label, or the selected item has no label and it's
       * DOM content is empty.
       */
      placeholder: {
        type: String
      },
      /**
       * When present, it specifies that the element is read-only.
       * @type {boolean}
       */
      readonly: {
        type: Boolean,
        value: !1,
        reflectToAttribute: !0
      },
      /**
       * Defines whether the overlay should overlap the target element
       * in the y-axis, or be positioned right above/below it.
       *
       * @attr {boolean} no-vertical-overlap
       */
      noVerticalOverlap: {
        type: Boolean,
        value: !1
      },
      /** @private */
      _phone: Boolean,
      /** @private */
      _phoneMediaQuery: {
        value: "(max-width: 420px), (max-height: 420px)"
      },
      /** @private */
      _inputContainer: Object,
      /** @private */
      _items: Object
    };
  }
  static get delegateAttrs() {
    return [...super.delegateAttrs, "invalid"];
  }
  static get observers() {
    return ["_updateAriaExpanded(opened, focusElement)", "_updateSelectedItem(value, _items, placeholder)"];
  }
  constructor() {
    super(), this._itemId = `value-${this.localName}-${pt()}`, this._srLabelController = new Cr(this), this._srLabelController.slotName = "sr-label";
  }
  /** @protected */
  disconnectedCallback() {
    super.disconnectedCallback(), this.opened = !1;
  }
  /** @protected */
  ready() {
    super.ready(), this._inputContainer = this.shadowRoot.querySelector('[part~="input-field"]'), this._valueButtonController = new Dd(this), this.addController(this._valueButtonController), this.addController(this._srLabelController), this.addController(
      new $d(this._phoneMediaQuery, (e) => {
        this._phone = e;
      })
    ), this._tooltipController = new me(this), this._tooltipController.setPosition("top"), this._tooltipController.setAriaTarget(this.focusElement), this.addController(this._tooltipController);
  }
  /**
   * Requests an update for the content of the select.
   * While performing the update, it invokes the renderer passed in the `renderer` property.
   *
   * It is not guaranteed that the update happens immediately (synchronously) after it is requested.
   */
  requestContentUpdate() {
    this._overlayElement && (this._overlayElement.requestContentUpdate(), this._menuElement && this._menuElement.items && this._updateSelectedItem(this.value, this._menuElement.items));
  }
  /**
   * Override an observer from `FieldMixin`
   * to validate when required is removed.
   *
   * @protected
   * @override
   */
  _requiredChanged(e) {
    super._requiredChanged(e), e === !1 && this.validate();
  }
  /**
   * @param {SelectItem[] | undefined | null} newItems
   * @param {SelectItem[] | undefined | null} oldItems
   * @private
   */
  __itemsChanged(e, o) {
    (e || o) && this.requestContentUpdate();
  }
  /**
   * @param {HTMLElement} menuElement
   * @protected
   */
  _assignMenuElement(e) {
    e && e !== this.__lastMenuElement && (this._menuElement = e, this.__initMenuItems(e), e.addEventListener("items-changed", () => {
      this.__initMenuItems(e);
    }), e.addEventListener("selected-changed", () => this.__updateValueButton()), e.addEventListener("keydown", (o) => this._onKeyDownInside(o), !0), e.addEventListener(
      "click",
      (o) => {
        const r = o.composedPath().find((s) => s._hasVaadinItemMixin);
        this.__dispatchChangePending = !!(r && r.value !== void 0 && r.value !== this.value), this.opened = !1;
      },
      !0
    ), this.__lastMenuElement = e);
  }
  /** @private */
  __initMenuItems(e) {
    e.items && (this._items = e.items);
  }
  /** @private */
  _valueChanged(e, o) {
    this.toggleAttribute("has-value", !!e), o !== void 0 && !this.__dispatchChangePending && this.validate();
  }
  /**
   * Opens the overlay if the field is not read-only.
   *
   * @private
   */
  _onClick(e) {
    this.disabled || (e.preventDefault(), this.opened = !this.readonly);
  }
  /** @private */
  _onToggleMouseDown(e) {
    e.preventDefault();
  }
  /**
   * @param {!KeyboardEvent} e
   * @protected
   * @override
   */
  _onKeyDown(e) {
    if (e.target === this.focusElement && !this.readonly && !this.disabled && !this.opened) {
      if (/^(Enter|SpaceBar|\s|ArrowDown|Down|ArrowUp|Up)$/u.test(e.key))
        e.preventDefault(), this.opened = !0;
      else if (/[\p{L}\p{Nd}]/u.test(e.key) && e.key.length === 1) {
        const o = this._menuElement.selected, r = o !== void 0 ? o : -1, s = this._menuElement._searchKey(r, e.key);
        s >= 0 && (this.__dispatchChangePending = !0, this._updateAriaLive(!0), this._menuElement.selected = s);
      }
    }
  }
  /**
   * @param {!KeyboardEvent} e
   * @protected
   */
  _onKeyDownInside(e) {
    /^(Tab)$/u.test(e.key) && (this.opened = !1);
  }
  /** @private */
  _openedChanged(e, o) {
    if (e) {
      if (this._updateAriaLive(!1), !this._overlayElement || !this._menuElement || !this.focusElement || this.disabled || this.readonly) {
        this.opened = !1;
        return;
      }
      this._overlayElement.style.setProperty(
        "--vaadin-select-text-field-width",
        `${this._inputContainer.offsetWidth}px`
      );
      const r = this.hasAttribute("focus-ring");
      this._openedWithFocusRing = r, r && this.removeAttribute("focus-ring");
    } else o && (this._openedWithFocusRing && this.setAttribute("focus-ring", ""), !this.__dispatchChangePending && !this._keyboardActive && this.validate());
  }
  /** @private */
  _updateAriaExpanded(e, o) {
    o && o.setAttribute("aria-expanded", e ? "true" : "false");
  }
  /** @private */
  _updateAriaLive(e) {
    this.focusElement && (e ? this.focusElement.setAttribute("aria-live", "polite") : this.focusElement.removeAttribute("aria-live"));
  }
  /** @private */
  __attachSelectedItem(e) {
    let o;
    const r = e.getAttribute("label");
    r ? o = this.__createItemElement({ label: r }) : o = e.cloneNode(!0), o._sourceItem = e, this.__appendValueItemElement(o, this.focusElement), o.selected = !0;
  }
  /**
   * @param {!SelectItem} item
   * @private
   */
  __createItemElement(e) {
    const o = document.createElement(e.component || "vaadin-select-item");
    return e.label && (o.textContent = e.label), e.value && (o.value = e.value), e.disabled && (o.disabled = e.disabled), e.className && (o.className = e.className), o;
  }
  /**
   * @param {!HTMLElement} itemElement
   * @param {!HTMLElement} parent
   * @private
   */
  __appendValueItemElement(e, o) {
    o.appendChild(e), e.removeAttribute("tabindex"), e.removeAttribute("aria-selected"), e.removeAttribute("role"), e.removeAttribute("focused"), e.removeAttribute("focus-ring"), e.removeAttribute("active"), e.setAttribute("id", this._itemId);
  }
  /**
   * @param {string} accessibleName
   * @protected
   */
  _accessibleNameChanged(e) {
    this._srLabelController.setLabel(e), this._setCustomAriaLabelledBy(e ? this._srLabelController.defaultId : null);
  }
  /**
   * @param {string} accessibleNameRef
   * @protected
   */
  _accessibleNameRefChanged(e) {
    this._setCustomAriaLabelledBy(e);
  }
  /**
   * @param {string} ariaLabelledby
   * @private
   */
  _setCustomAriaLabelledBy(e) {
    const o = this._getLabelIdWithItemId(e);
    this._fieldAriaController.setLabelId(o, !0);
  }
  /**
   * @param {string | null} labelId
   * @returns string | null
   * @private
   */
  _getLabelIdWithItemId(e) {
    const r = (this._items ? this._items[this._menuElement.selected] : !1) || this.placeholder ? this._itemId : "";
    return e ? `${e} ${r}`.trim() : null;
  }
  /** @private */
  __updateValueButton() {
    const e = this.focusElement;
    if (!e)
      return;
    e.innerHTML = "";
    const o = this._items[this._menuElement.selected];
    if (e.removeAttribute("placeholder"), this._hasContent(o))
      this.__attachSelectedItem(o);
    else if (this.placeholder) {
      const s = this.__createItemElement({ label: this.placeholder });
      this.__appendValueItemElement(s, e), e.setAttribute("placeholder", "");
    }
    !this._valueChanging && o && (this._selectedChanging = !0, this.value = o.value || "", this.__dispatchChangePending && this.__dispatchChange(), delete this._selectedChanging);
    const r = o || this.placeholder ? { newId: this._itemId } : { oldId: this._itemId };
    se(e, "aria-labelledby", r), (this.accessibleName || this.accessibleNameRef) && this._setCustomAriaLabelledBy(this.accessibleNameRef || this._srLabelController.defaultId);
  }
  /** @private */
  _hasContent(e) {
    if (!e)
      return !1;
    const o = !!(e.hasAttribute("label") ? e.getAttribute("label") : e.textContent.trim()), r = e.childElementCount > 0;
    return o || r;
  }
  /** @private */
  _updateSelectedItem(e, o) {
    if (o) {
      const r = e == null ? e : e.toString();
      this._menuElement.selected = o.reduce((s, n, a) => s === void 0 && n.value === r ? a : s, void 0), this._selectedChanging || (this._valueChanging = !0, this.__updateValueButton(), delete this._valueChanging);
    }
  }
  /**
   * Override method inherited from `FocusMixin` to not remove focused
   * state when select is opened and focus moves to list-box.
   * @return {boolean}
   * @protected
   * @override
   */
  _shouldRemoveFocus() {
    return !this.opened;
  }
  /**
   * Override method inherited from `FocusMixin` to validate on blur.
   * @param {boolean} focused
   * @protected
   * @override
   */
  _setFocused(e) {
    super._setFocused(e), !e && document.hasFocus() && this.validate();
  }
  /**
   * Returns true if the current value satisfies all constraints (if any)
   *
   * @return {boolean}
   */
  checkValidity() {
    return !this.required || this.readonly || !!this.value;
  }
  /**
   * Renders items when they are provided by the `items` property and clears the content otherwise.
   * @param {!HTMLElement} root
   * @param {!Select} _select
   * @private
   */
  __defaultRenderer(e, o) {
    if (!this.items || this.items.length === 0) {
      e.textContent = "";
      return;
    }
    let r = e.firstElementChild;
    r || (r = document.createElement("vaadin-select-list-box"), e.appendChild(r)), r.textContent = "", this.items.forEach((s) => {
      r.appendChild(this.__createItemElement(s));
    });
  }
  /** @private */
  async __dispatchChange() {
    this.updateComplete && await this.updateComplete, this.validate(), this.dispatchEvent(new CustomEvent("change", { bubbles: !0 })), this.__dispatchChangePending = !1;
  }
};
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-select", [vr, gr, Rd], {
  moduleId: "vaadin-select-styles"
});
class Fd extends Bd(z(k(x))) {
  static get is() {
    return "vaadin-select";
  }
  static get template() {
    return y`
      <style>
        :host {
          position: relative;
        }

        ::slotted([slot='value']) {
          flex-grow: 1;
        }
      </style>

      <div class="vaadin-select-container">
        <div part="label" on-click="_onClick">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" on-click="focus"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          readonly="[[readonly]]"
          disabled="[[disabled]]"
          invalid="[[invalid]]"
          theme$="[[_theme]]"
          on-click="_onClick"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="value"></slot>
          <div part="toggle-button" slot="suffix" aria-hidden="true" on-mousedown="_onToggleMouseDown"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <vaadin-select-overlay
        position-target="[[_inputContainer]]"
        opened="{{opened}}"
        with-backdrop="[[_phone]]"
        phone$="[[_phone]]"
        theme$="[[_theme]]"
        no-vertical-overlap$="[[noVerticalOverlap]]"
        on-vaadin-overlay-open="_onOverlayOpen"
      ></vaadin-select-overlay>

      <slot name="tooltip"></slot>
      <div class="sr-only">
        <slot name="sr-label"></slot>
      </div>
    `;
  }
  static get observers() {
    return ["_rendererChanged(renderer, _overlayElement)"];
  }
  /** @protected */
  ready() {
    super.ready(), fr(this);
  }
  /**
   * @param {SelectRenderer | undefined | null} renderer
   * @param {SelectOverlay | undefined} overlay
   * @private
   */
  _rendererChanged(t, e) {
    e && (e.renderer = t || this.__defaultRenderer, this.requestContentUpdate());
  }
  /** @private */
  _onOverlayOpen() {
    this._menuElement && this._menuElement.focus();
  }
  /**
   * Fired when the user commits a value change.
   *
   * @event change
   */
}
b(Fd);
var Hd = Object.defineProperty, Ud = Object.getOwnPropertyDescriptor, Ue = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? Ud(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && Hd(t, e, r), r;
};
let he = class extends P {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.options = "label=A,value=A;label=B,value=B;label=C,value=C";
  }
  get items() {
    return new Rr().planeDeserialize(this.options).map((t) => ({ label: t.label, value: t.value }));
  }
  render() {
    return N`
        <vaadin-select
            label="${this.label}"
            placeholder="${this.label}"
            .items="${this.items}"
            .value="${this.items[0].value}"
        ></vaadin-select>
        `;
  }
};
Ue([
  g({ type: String })
], he.prototype, "label", 2);
Ue([
  g({ type: String })
], he.prototype, "value", 2);
Ue([
  g({ type: String })
], he.prototype, "options", 2);
Ue([
  g({ type: Array })
], he.prototype, "items", 1);
he = Ue([
  L("as-select")
], he);
/**
 * @license
 * Copyright (c) 2017 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Vd = p`
  [part='input-field'],
  [part='input-field'] ::slotted(textarea) {
    height: auto;
    box-sizing: border-box;
  }

  [part='input-field'] {
    /* Equal to the implicit padding in vaadin-text-field */
    padding-top: calc((var(--lumo-text-field-size) - 1em * var(--lumo-line-height-s)) / 2);
    padding-bottom: calc((var(--lumo-text-field-size) - 1em * var(--lumo-line-height-s)) / 2);
    transition: background-color 0.1s;
    line-height: var(--lumo-line-height-s);
  }

  :host(:not([readonly])) [part='input-field']::after {
    display: none;
  }

  :host([readonly]) [part='input-field'] {
    border: var(--vaadin-input-field-readonly-border, 1px dashed var(--lumo-contrast-30pct));
  }

  :host([readonly]) [part='input-field']::after {
    border: none;
  }

  :host(:hover:not([readonly]):not([focused]):not([invalid])) [part='input-field'] {
    background-color: var(--lumo-contrast-20pct);
  }

  @media (pointer: coarse) {
    :host(:hover:not([readonly]):not([focused]):not([invalid])) [part='input-field'] {
      background-color: var(--lumo-contrast-10pct);
    }

    :host(:active:not([readonly]):not([focused])) [part='input-field'] {
      background-color: var(--lumo-contrast-20pct);
    }
  }

  [part='input-field'] ::slotted(textarea) {
    line-height: inherit;
    --_lumo-text-field-overflow-mask-image: none;
  }

  /* Use sticky positioning to keep prefix/suffix/clear button visible when scrolling textarea container */
  [part='input-field'] ::slotted([slot$='fix']),
  [part='clear-button'] {
    position: sticky;
    top: 0;
    align-self: flex-start;
  }

  /* Vertically align icon prefix/suffix/clear button with the first line of text */
  [part='input-field'] ::slotted(vaadin-icon[slot$='fix']),
  [part='clear-button'] {
    top: calc((var(--lumo-icon-size-m) - 1em * var(--lumo-line-height-s)) / -2);
    margin-top: calc((var(--lumo-icon-size-m) - 1em * var(--lumo-line-height-s)) / -2);
  }
`;
m("vaadin-text-area", [ve, Vd], {
  moduleId: "lumo-text-area"
});
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Ye = new ResizeObserver((i) => {
  setTimeout(() => {
    i.forEach((t) => {
      t.target.resizables ? t.target.resizables.forEach((e) => {
        e._onResize(t.contentRect);
      }) : t.target._onResize(t.contentRect);
    });
  });
}), jd = C(
  (i) => class extends i {
    /**
     * When true, the parent element resize will be also observed.
     * Override this getter and return `true` to enable this.
     *
     * @protected
     */
    get _observeParent() {
      return !1;
    }
    /** @protected */
    connectedCallback() {
      if (super.connectedCallback(), Ye.observe(this), this._observeParent) {
        const e = this.parentNode instanceof ShadowRoot ? this.parentNode.host : this.parentNode;
        e.resizables || (e.resizables = /* @__PURE__ */ new Set(), Ye.observe(e)), e.resizables.add(this), this.__parent = e;
      }
    }
    /** @protected */
    disconnectedCallback() {
      super.disconnectedCallback(), Ye.unobserve(this);
      const e = this.__parent;
      if (this._observeParent && e) {
        const o = e.resizables;
        o && (o.delete(this), o.size === 0 && Ye.unobserve(e)), this.__parent = null;
      }
    }
    /**
     * A handler invoked on host resize. By default, it does nothing.
     * Override the method to implement your own behavior.
     *
     * @protected
     */
    _onResize(e) {
    }
  }
);
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
class qd extends M {
  constructor(t, e) {
    super(t, "textarea", "textarea", {
      initializer: (o, r) => {
        const s = r.getAttribute("value");
        s && (o.value = s);
        const n = r.getAttribute("name");
        n && o.setAttribute("name", n), o.id = this.defaultId, typeof e == "function" && e(o);
      },
      useUniqueId: !0
    });
  }
}
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Wd = (i) => class extends jd(kr(i)) {
  static get properties() {
    return {
      /**
       * Maximum number of characters (in Unicode code points) that the user can enter.
       */
      maxlength: {
        type: Number
      },
      /**
       * Minimum number of characters (in Unicode code points) that the user can enter.
       */
      minlength: {
        type: Number
      },
      /**
       * A regular expression that the value is checked against.
       * The pattern must match the entire value, not just some subset.
       */
      pattern: {
        type: String
      }
    };
  }
  static get delegateAttrs() {
    return [...super.delegateAttrs, "maxlength", "minlength", "pattern"];
  }
  static get constraints() {
    return [...super.constraints, "maxlength", "minlength", "pattern"];
  }
  /**
   * Used by `InputControlMixin` as a reference to the clear button element.
   * @protected
   */
  get clearElement() {
    return this.$.clearButton;
  }
  /**
   * @protected
   * @override
   */
  _onResize() {
    this._updateHeight(), this.__scrollPositionUpdated();
  }
  /** @protected */
  _onScroll() {
    this.__scrollPositionUpdated();
  }
  /** @protected */
  ready() {
    super.ready(), this.addController(
      new qd(this, (e) => {
        this._setInputElement(e), this._setFocusElement(e), this.stateTarget = e, this.ariaTarget = e;
      })
    ), this.addController(new yt(this.inputElement, this._labelController)), this.addEventListener("animationend", this._onAnimationEnd), this._inputField = this.shadowRoot.querySelector("[part=input-field]"), this._inputField.addEventListener("wheel", (e) => {
      const o = this._inputField.scrollTop;
      this._inputField.scrollTop += e.deltaY, o !== this._inputField.scrollTop && (e.preventDefault(), this.__scrollPositionUpdated());
    }), this._updateHeight(), this.__scrollPositionUpdated();
  }
  /** @private */
  __scrollPositionUpdated() {
    this._inputField.style.setProperty("--_text-area-vertical-scroll-position", "0px"), this._inputField.style.setProperty("--_text-area-vertical-scroll-position", `${this._inputField.scrollTop}px`);
  }
  /** @private */
  _onAnimationEnd(e) {
    e.animationName.indexOf("vaadin-text-area-appear") === 0 && this._updateHeight();
  }
  /**
   * @param {unknown} newVal
   * @param {unknown} oldVal
   * @protected
   * @override
   */
  _valueChanged(e, o) {
    super._valueChanged(e, o), this._updateHeight();
  }
  /** @private */
  _updateHeight() {
    const e = this.inputElement, o = this._inputField;
    if (!e || !o)
      return;
    const r = o.scrollTop, s = this.value ? this.value.length : 0;
    if (this._oldValueLength >= s) {
      const a = getComputedStyle(o).height, l = getComputedStyle(e).width;
      o.style.display = "block", o.style.height = a, e.style.maxWidth = l, e.style.height = "auto";
    }
    this._oldValueLength = s;
    const n = e.scrollHeight;
    n > e.clientHeight && (e.style.height = `${n}px`), e.style.removeProperty("max-width"), o.style.removeProperty("display"), o.style.removeProperty("height"), o.scrollTop = r;
  }
  /**
   * Scrolls the textarea to the start if it has a vertical scrollbar.
   */
  scrollToStart() {
    this._inputField.scrollTop = 0;
  }
  /**
   * Scrolls the textarea to the end if it has a vertical scrollbar.
   */
  scrollToEnd() {
    this._inputField.scrollTop = this._inputField.scrollHeight;
  }
  /**
   * Returns true if the current textarea value satisfies all constraints (if any).
   * @return {boolean}
   * @override
   */
  checkValidity() {
    if (!super.checkValidity())
      return !1;
    if (!this.pattern || !this.inputElement.value)
      return !0;
    try {
      const e = this.inputElement.value.match(this.pattern);
      return e ? e[0] === e.input : !1;
    } catch {
      return !0;
    }
  }
};
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
const Kd = p`
  :host {
    animation: 1ms vaadin-text-area-appear;
  }

  .vaadin-text-area-container {
    flex: auto;
  }

  /* The label, helper text and the error message should neither grow nor shrink. */
  [part='label'],
  [part='helper-text'],
  [part='error-message'] {
    flex: none;
  }

  [part='input-field'] {
    flex: auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  ::slotted(textarea) {
    -webkit-appearance: none;
    -moz-appearance: none;
    flex: auto;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: none;
    resize: none;
    margin: 0;
    padding: 0 0.25em;
    border: 0;
    border-radius: 0;
    min-width: 0;
    font: inherit;
    font-size: 1em;
    line-height: normal;
    color: inherit;
    background-color: transparent;
    /* Disable default invalid style in Firefox */
    box-shadow: none;
  }

  /* Override styles from <vaadin-input-container> */
  [part='input-field'] ::slotted(textarea) {
    align-self: stretch;
    white-space: pre-wrap;
  }

  [part='input-field'] ::slotted(:not(textarea)) {
    align-self: flex-start;
  }

  /* Workaround https://bugzilla.mozilla.org/show_bug.cgi?id=1739079 */
  :host([disabled]) ::slotted(textarea) {
    user-select: none;
  }

  @keyframes vaadin-text-area-appear {
    to {
      opacity: 1;
    }
  }
`;
/**
 * @license
 * Copyright (c) 2021 - 2024 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
m("vaadin-text-area", [br, Kd], { moduleId: "vaadin-text-area-styles" });
class Yd extends Wd(k(z(x))) {
  static get is() {
    return "vaadin-text-area";
  }
  static get template() {
    return y`
      <div class="vaadin-text-area-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          readonly="[[readonly]]"
          disabled="[[disabled]]"
          invalid="[[invalid]]"
          theme$="[[_theme]]"
          on-scroll="_onScroll"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="textarea"></slot>
          <slot name="suffix" slot="suffix"></slot>
          <div id="clearButton" part="clear-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `;
  }
  /** @protected */
  ready() {
    super.ready(), this._tooltipController = new me(this), this._tooltipController.setPosition("top"), this._tooltipController.setAriaTarget(this.inputElement), this.addController(this._tooltipController);
  }
}
b(Yd);
var Gd = Object.defineProperty, Jd = Object.getOwnPropertyDescriptor, Ct = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? Jd(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && Gd(t, e, r), r;
};
let Le = class extends P {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.placeholder = this.label;
  }
  render() {
    return N`
        <vaadin-text-area
            label="${this.label}"
            placeholder="${this.placeholder}"
            .value="${this.value}"
            @value-changed="${(i) => {
      this.value = i.detail.value;
    }}"
        ></vaadin-text-area>
        `;
  }
};
Ct([
  g({ type: String })
], Le.prototype, "label", 2);
Ct([
  g({ type: String })
], Le.prototype, "value", 2);
Ct([
  g({ type: String })
], Le.prototype, "placeholder", 2);
Le = Ct([
  L("as-text")
], Le);
var Zd = Object.defineProperty, Qd = Object.getOwnPropertyDescriptor, At = (i, t, e, o) => {
  for (var r = o > 1 ? void 0 : o ? Qd(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (r = (o ? n(t, e, r) : n(r)) || r);
  return o && r && Zd(t, e, r), r;
};
let pe = class extends P {
  constructor() {
    super(), this.width = 560, this.height = 315, this.url = "", this.width = 560, this.height = 315, this.url = "";
  }
  /*connectedCallback() {
      super.connectedCallback();
      this.update();
  }*/
  updated(i) {
    i.has("width") && window.innerWidth < 560 && (this.width = 310, this.height = 175);
  }
  render() {
    return N`
        <div class="video">
            <br />
            <iframe
                width="${this.width}"
                height="${this.height}"
                frameborder="0"
                src="${this.url}"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            <br />
        </div>`;
  }
};
pe.styles = p`
    .video {
      display: grid;
      grid-template-areas: stack;
      place-items: center;
      width: max(320px, 100%);
    }`;
At([
  g({ type: String })
], pe.prototype, "width", 2);
At([
  g({ type: String })
], pe.prototype, "height", 2);
At([
  g({ type: String })
], pe.prototype, "url", 2);
pe = At([
  L("as-video")
], pe);
export {
  Xt as AsBox,
  Me as AsButton,
  at as AsCheck,
  ce as AsConfirm,
  J as AsEmbed,
  lt as AsImage,
  de as AsInput,
  ue as AsRadio,
  he as AsSelect,
  Le as AsText,
  pe as AsVideo
};
