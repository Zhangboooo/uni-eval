/**
* @vue/shared v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function zn(e, t) {
  const n = new Set(e.split(","));
  return (s) => n.has(s);
}
const H = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};
process.env.NODE_ENV !== "production" && Object.freeze([]);
const te = () => {
}, Kn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), A = Object.assign, Jn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, qn = Object.prototype.hasOwnProperty, O = (e, t) => qn.call(e, t), m = Array.isArray, he = (e) => Ye(e) === "[object Map]", Gn = (e) => Ye(e) === "[object Set]", y = (e) => typeof e == "function", M = (e) => typeof e == "string", Ve = (e) => typeof e == "symbol", x = (e) => e !== null && typeof e == "object", Yn = (e) => (x(e) || y(e)) && y(e.then) && y(e.catch), Bn = Object.prototype.toString, Ye = (e) => Bn.call(e), Zt = (e) => Ye(e).slice(8, -1), Qn = (e) => Ye(e) === "[object Object]", Et = (e) => M(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Xn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Zn = Xn((e) => e.charAt(0).toUpperCase() + e.slice(1)), X = (e, t) => !Object.is(e, t), kn = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let $t;
const kt = () => $t || ($t = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function mt(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = M(s) ? ss(s) : mt(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (M(e) || x(e))
    return e;
}
const es = /;(?![^(]*\))/g, ts = /:([^]+)/, ns = /\/\*[^]*?\*\//g;
function ss(e) {
  const t = {};
  return e.replace(ns, "").split(es).forEach((n) => {
    if (n) {
      const s = n.split(ts);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function vt(e) {
  let t = "";
  if (M(e))
    t = e;
  else if (m(e))
    for (let n = 0; n < e.length; n++) {
      const s = vt(e[n]);
      s && (t += s + " ");
    }
  else if (x(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
/**
* @vue/reactivity v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function U(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let P;
class rs {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = P, !t && P && (this.index = (P.scopes || (P.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = P;
      try {
        return P = this, t();
      } finally {
        P = n;
      }
    } else process.env.NODE_ENV !== "production" && U("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    P = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    P = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function os(e) {
  return new rs(e);
}
function is(e, t = P) {
  t && t.active && t.effects.push(e);
}
function en() {
  return P;
}
function cs(e) {
  P ? P.cleanups.push(e) : process.env.NODE_ENV !== "production" && U(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let ne;
class tn {
  constructor(t, n, s, r) {
    this.fn = t, this.trigger = n, this.scheduler = s, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, is(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Be();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (ls(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Qe();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = B, n = ne;
    try {
      return B = !0, ne = this, this._runnings++, Tt(this), this.fn();
    } finally {
      jt(this), this._runnings--, ne = n, B = t;
    }
  }
  stop() {
    this.active && (Tt(this), jt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ls(e) {
  return e.value;
}
function Tt(e) {
  e._trackId++, e._depsLength = 0;
}
function jt(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      nn(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function nn(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let B = !0, ct = 0;
const sn = [];
function Be() {
  sn.push(B), B = !1;
}
function Qe() {
  const e = sn.pop();
  B = e === void 0 ? !0 : e;
}
function Nt() {
  ct++;
}
function bt() {
  for (ct--; !ct && lt.length; )
    lt.shift()();
}
function rn(e, t, n) {
  var s;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && nn(r, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((s = e.onTrack) == null || s.call(e, A({ effect: e }, n)));
  }
}
const lt = [];
function on(e, t, n) {
  var s;
  Nt();
  for (const r of e.keys()) {
    let o;
    r._dirtyLevel < t && (o ?? (o = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = t), r._shouldSchedule && (o ?? (o = e.get(r) === r._trackId)) && (process.env.NODE_ENV !== "production" && ((s = r.onTrigger) == null || s.call(r, A({ effect: r }, n))), r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && lt.push(r.scheduler)));
  }
  bt();
}
const cn = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, He = /* @__PURE__ */ new WeakMap(), se = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), ut = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
function V(e, t, n) {
  if (B && ne) {
    let s = He.get(e);
    s || He.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = cn(() => s.delete(n))), rn(
      ne,
      r,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function Q(e, t, n, s, r, o) {
  const i = He.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && m(e)) {
    const a = Number(s);
    i.forEach((h, _) => {
      (_ === "length" || !Ve(_) && _ >= a) && c.push(h);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        m(e) ? Et(n) && c.push(i.get("length")) : (c.push(i.get(se)), he(e) && c.push(i.get(ut)));
        break;
      case "delete":
        m(e) || (c.push(i.get(se)), he(e) && c.push(i.get(ut)));
        break;
      case "set":
        he(e) && c.push(i.get(se));
        break;
    }
  Nt();
  for (const a of c)
    a && on(
      a,
      4,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: s,
        oldValue: r,
        oldTarget: o
      } : void 0
    );
  bt();
}
function us(e, t) {
  const n = He.get(e);
  return n && n.get(t);
}
const as = /* @__PURE__ */ zn("__proto__,__v_isRef,__isVue"), ln = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ve)
), Mt = /* @__PURE__ */ fs();
function fs() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = g(this);
      for (let o = 0, i = this.length; o < i; o++)
        V(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(g)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Be(), Nt();
      const s = g(this)[t].apply(this, n);
      return bt(), Qe(), s;
    };
  }), e;
}
function ps(e) {
  Ve(e) || (e = String(e));
  const t = g(this);
  return V(t, "has", e), t.hasOwnProperty(e);
}
class un {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? hn : dn : o ? Ss : pn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = m(t);
    if (!r) {
      if (i && O(Mt, n))
        return Reflect.get(Mt, n, s);
      if (n === "hasOwnProperty")
        return ps;
    }
    const c = Reflect.get(t, n, s);
    return (Ve(n) ? ln.has(n) : as(n)) || (r || V(t, "get", n), o) ? c : w(c) ? i && Et(n) ? c : c.value : x(c) ? r ? _n(c) : wt(c) : c;
  }
}
class ds extends un {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = J(o);
      if (!K(s) && !J(s) && (o = g(o), s = g(s)), !m(t) && w(o) && !w(s))
        return a ? !1 : (o.value = s, !0);
    }
    const i = m(t) && Et(n) ? Number(n) < t.length : O(t, n), c = Reflect.set(t, n, s, r);
    return t === g(r) && (i ? X(s, o) && Q(t, "set", n, s, o) : Q(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = O(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && Q(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ve(n) || !ln.has(n)) && V(t, "has", n), s;
  }
  ownKeys(t) {
    return V(
      t,
      "iterate",
      m(t) ? "length" : se
    ), Reflect.ownKeys(t);
  }
}
class an extends un {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && U(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && U(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const hs = /* @__PURE__ */ new ds(), _s = /* @__PURE__ */ new an(), gs = /* @__PURE__ */ new an(!0), Ot = (e) => e, Xe = (e) => Reflect.getPrototypeOf(e);
function xe(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = g(e), o = g(t);
  n || (X(t, o) && V(r, "get", t), V(r, "get", o));
  const { has: i } = Xe(r), c = s ? Ot : n ? Vt : we;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function Re(e, t = !1) {
  const n = this.__v_raw, s = g(n), r = g(e);
  return t || (X(e, r) && V(s, "has", e), V(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Pe(e, t = !1) {
  return e = e.__v_raw, !t && V(g(e), "iterate", se), Reflect.get(e, "size", e);
}
function At(e, t = !1) {
  !t && !K(e) && !J(e) && (e = g(e));
  const n = g(this);
  return Xe(n).has.call(n, e) || (n.add(e), Q(n, "add", e, e)), this;
}
function Ft(e, t, n = !1) {
  !n && !K(t) && !J(t) && (t = g(t));
  const s = g(this), { has: r, get: o } = Xe(s);
  let i = r.call(s, e);
  i ? process.env.NODE_ENV !== "production" && fn(s, r, e) : (e = g(e), i = r.call(s, e));
  const c = o.call(s, e);
  return s.set(e, t), i ? X(t, c) && Q(s, "set", e, t, c) : Q(s, "add", e, t), this;
}
function Lt(e) {
  const t = g(this), { has: n, get: s } = Xe(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && fn(t, n, e) : (e = g(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && Q(t, "delete", e, void 0, o), i;
}
function Ht() {
  const e = g(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? he(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && Q(e, "clear", void 0, void 0, n), s;
}
function Ce(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = g(i), a = t ? Ot : e ? Vt : we;
    return !e && V(c, "iterate", se), i.forEach((h, _) => s.call(r, a(h), a(_), o));
  };
}
function Ie(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = g(r), i = he(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, h = r[e](...s), _ = n ? Ot : t ? Vt : we;
    return !t && V(
      o,
      "iterate",
      a ? ut : se
    ), {
      // iterator protocol
      next() {
        const { value: l, done: d } = h.next();
        return d ? { value: l, done: d } : {
          value: c ? [_(l[0]), _(l[1])] : _(l),
          done: d
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function q(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      U(
        `${Zn(e)} operation ${n}failed: target is readonly.`,
        g(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Es() {
  const e = {
    get(o) {
      return xe(this, o);
    },
    get size() {
      return Pe(this);
    },
    has: Re,
    add: At,
    set: Ft,
    delete: Lt,
    clear: Ht,
    forEach: Ce(!1, !1)
  }, t = {
    get(o) {
      return xe(this, o, !1, !0);
    },
    get size() {
      return Pe(this);
    },
    has: Re,
    add(o) {
      return At.call(this, o, !0);
    },
    set(o, i) {
      return Ft.call(this, o, i, !0);
    },
    delete: Lt,
    clear: Ht,
    forEach: Ce(!1, !0)
  }, n = {
    get(o) {
      return xe(this, o, !0);
    },
    get size() {
      return Pe(this, !0);
    },
    has(o) {
      return Re.call(this, o, !0);
    },
    add: q("add"),
    set: q("set"),
    delete: q("delete"),
    clear: q("clear"),
    forEach: Ce(!0, !1)
  }, s = {
    get(o) {
      return xe(this, o, !0, !0);
    },
    get size() {
      return Pe(this, !0);
    },
    has(o) {
      return Re.call(this, o, !0);
    },
    add: q("add"),
    set: q("set"),
    delete: q("delete"),
    clear: q("clear"),
    forEach: Ce(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    e[o] = Ie(o, !1, !1), n[o] = Ie(o, !0, !1), t[o] = Ie(o, !1, !0), s[o] = Ie(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  ms,
  vs,
  Ns,
  bs
] = /* @__PURE__ */ Es();
function yt(e, t) {
  const n = t ? e ? bs : Ns : e ? vs : ms;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    O(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Os = {
  get: /* @__PURE__ */ yt(!1, !1)
}, ys = {
  get: /* @__PURE__ */ yt(!0, !1)
}, ws = {
  get: /* @__PURE__ */ yt(!0, !0)
};
function fn(e, t, n) {
  const s = g(n);
  if (s !== n && t.call(e, s)) {
    const r = Zt(e);
    U(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const pn = /* @__PURE__ */ new WeakMap(), Ss = /* @__PURE__ */ new WeakMap(), dn = /* @__PURE__ */ new WeakMap(), hn = /* @__PURE__ */ new WeakMap();
function Vs(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ds(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Vs(Zt(e));
}
function wt(e) {
  return J(e) ? e : St(
    e,
    !1,
    hs,
    Os,
    pn
  );
}
function _n(e) {
  return St(
    e,
    !0,
    _s,
    ys,
    dn
  );
}
function $e(e) {
  return St(
    e,
    !0,
    gs,
    ws,
    hn
  );
}
function St(e, t, n, s, r) {
  if (!x(e))
    return process.env.NODE_ENV !== "production" && U(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Ds(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function z(e) {
  return J(e) ? z(e.__v_raw) : !!(e && e.__v_isReactive);
}
function J(e) {
  return !!(e && e.__v_isReadonly);
}
function K(e) {
  return !!(e && e.__v_isShallow);
}
function Ue(e) {
  return e ? !!e.__v_raw : !1;
}
function g(e) {
  const t = e && e.__v_raw;
  return t ? g(t) : e;
}
function pe(e) {
  return Object.isExtensible(e) && kn(e, "__v_skip", !0), e;
}
const we = (e) => x(e) ? wt(e) : e, Vt = (e) => x(e) ? _n(e) : e, xs = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class gn {
  constructor(t, n, s, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new tn(
      () => t(this._value),
      () => Ae(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = g(this);
    return (!t._cacheable || t.effect.dirty) && X(t._value, t._value = t.effect.run()) && Ae(t, 4), En(t), t.effect._dirtyLevel >= 2 && (process.env.NODE_ENV !== "production" && this._warnRecursive && U(xs, `

getter: `, this.getter), Ae(t, 2)), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function Rs(e, t, n = !1) {
  let s, r;
  const o = y(e);
  o ? (s = e, r = process.env.NODE_ENV !== "production" ? () => {
    U("Write operation failed: computed value is readonly");
  } : te) : (s = e.get, r = e.set);
  const i = new gn(s, r, o || !r, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
function En(e) {
  var t;
  B && ne && (e = g(e), rn(
    ne,
    (t = e.dep) != null ? t : e.dep = cn(
      () => e.dep = void 0,
      e instanceof gn ? e : void 0
    ),
    process.env.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function Ae(e, t = 4, n, s) {
  e = g(e);
  const r = e.dep;
  r && on(
    r,
    t,
    process.env.NODE_ENV !== "production" ? {
      target: e,
      type: "set",
      key: "value",
      newValue: n,
      oldValue: s
    } : void 0
  );
}
function w(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ze(e) {
  return Ps(e, !1);
}
function Ps(e, t) {
  return w(e) ? e : new Cs(e, t);
}
class Cs {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : g(t), this._value = n ? t : we(t);
  }
  get value() {
    return En(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || K(t) || J(t);
    if (t = n ? t : g(t), X(t, this._rawValue)) {
      const s = this._rawValue;
      this._rawValue = t, this._value = n ? t : we(t), Ae(this, 4, t, s);
    }
  }
}
function Is(e) {
  return w(e) ? e.value : e;
}
const $s = {
  get: (e, t, n) => Is(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return w(r) && !w(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ts(e) {
  return z(e) ? e : new Proxy(e, $s);
}
function Ut(e) {
  process.env.NODE_ENV !== "production" && !Ue(e) && U("toRefs() expects a reactive object but received a plain one.");
  const t = m(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = mn(e, n);
  return t;
}
class js {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return us(g(this._object), this._key);
  }
}
class Ms {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function et(e, t, n) {
  return w(e) ? e : y(e) ? new Ms(e) : x(e) && arguments.length > 1 ? mn(e, t, n) : Ze(e);
}
function mn(e, t, n) {
  const s = e[t];
  return w(s) ? s : new js(e, t, n);
}
/**
* @vue/runtime-core v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const re = [];
function As(e) {
  re.push(e);
}
function Fs() {
  re.pop();
}
let tt = !1;
function b(e, ...t) {
  if (tt) return;
  tt = !0, Be();
  const n = re.length ? re[re.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Ls();
  if (s)
    oe(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${An(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...Hs(r)), console.warn(...o);
  }
  Qe(), tt = !1;
}
function Ls() {
  let e = re[re.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function Hs(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Us(n));
  }), t;
}
function Us({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${An(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...Ws(e.props), o] : [r + o];
}
function Ws(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...vn(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function vn(e, t, n) {
  return M(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : w(t) ? (t = vn(e, g(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : y(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = g(t), n ? t : [`${e}=`, t]);
}
const Nn = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update"
};
function oe(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Dt(r, t, n);
  }
}
function Fe(e, t, n, s) {
  if (y(e)) {
    const r = oe(e, t, n, s);
    return r && Yn(r) && r.catch((o) => {
      Dt(o, t, n);
    }), r;
  }
  if (m(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Fe(e[o], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && b(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Dt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? Nn[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const h = o.ec;
      if (h) {
        for (let _ = 0; _ < h.length; _++)
          if (h[_](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Be(), oe(
        a,
        null,
        10,
        [e, i, c]
      ), Qe();
      return;
    }
  }
  zs(e, n, r, s);
}
function zs(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = Nn[t];
    if (n && As(n), b(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Fs(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let We = !1, at = !1;
const T = [];
let Y = 0;
const _e = [];
let G = null, k = 0;
const bn = /* @__PURE__ */ Promise.resolve();
let xt = null;
const Ks = 100;
function ft(e) {
  const t = xt || bn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Js(e) {
  let t = Y + 1, n = T.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = T[s], o = Se(r);
    o < e || o === e && r.pre ? t = s + 1 : n = s;
  }
  return t;
}
function Rt(e) {
  (!T.length || !T.includes(
    e,
    We && e.allowRecurse ? Y + 1 : Y
  )) && (e.id == null ? T.push(e) : T.splice(Js(e.id), 0, e), On());
}
function On() {
  !We && !at && (at = !0, xt = bn.then(wn));
}
function yn(e) {
  m(e) ? _e.push(...e) : (!G || !G.includes(
    e,
    e.allowRecurse ? k + 1 : k
  )) && _e.push(e), On();
}
function qs(e) {
  if (_e.length) {
    const t = [...new Set(_e)].sort(
      (n, s) => Se(n) - Se(s)
    );
    if (_e.length = 0, G) {
      G.push(...t);
      return;
    }
    for (G = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), k = 0; k < G.length; k++) {
      const n = G[k];
      process.env.NODE_ENV !== "production" && Sn(e, n) || n.active !== !1 && n();
    }
    G = null, k = 0;
  }
}
const Se = (e) => e.id == null ? 1 / 0 : e.id, Gs = (e, t) => {
  const n = Se(e) - Se(t);
  if (n === 0) {
    if (e.pre && !t.pre) return -1;
    if (t.pre && !e.pre) return 1;
  }
  return n;
};
function wn(e) {
  at = !1, We = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), T.sort(Gs);
  const t = process.env.NODE_ENV !== "production" ? (n) => Sn(e, n) : te;
  try {
    for (Y = 0; Y < T.length; Y++) {
      const n = T[Y];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        oe(
          n,
          n.i,
          n.i ? 15 : 14
        );
      }
    }
  } finally {
    Y = 0, T.length = 0, qs(e), We = !1, xt = null, (T.length || _e.length) && wn(e);
  }
}
function Sn(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Ks) {
      const s = t.i, r = s && Mn(s.type);
      return Dt(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const nt = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (kt().__VUE_HMR_RUNTIME__ = {
  createRecord: st(Ys),
  rerender: st(Bs),
  reload: st(Qs)
});
const ze = /* @__PURE__ */ new Map();
function Ys(e, t) {
  return ze.has(e) ? !1 : (ze.set(e, {
    initialDef: Ke(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Ke(e) {
  return Fn(e) ? e.__vccOpts : e;
}
function Bs(e, t) {
  const n = ze.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, Ke(s.type).render = t), s.renderCache = [], s.effect.dirty = !0, s.update();
  }));
}
function Qs(e, t) {
  const n = ze.get(e);
  if (!n) return;
  t = Ke(t), Wt(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = Ke(o.type);
    let c = nt.get(i);
    c || (i !== n.initialDef && Wt(i, t), nt.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? (o.parent.effect.dirty = !0, Rt(() => {
      o.parent.update(), c.delete(o);
    })) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  yn(() => {
    nt.clear();
  });
}
function Wt(e, t) {
  A(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function st(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let fe, Te = [];
function Vn(e, t) {
  var n, s;
  fe = e, fe ? (fe.enabled = !0, Te.forEach(({ event: r, args: o }) => fe.emit(r, ...o)), Te = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    Vn(o, t);
  }), setTimeout(() => {
    fe || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Te = []);
  }, 3e3)) : Te = [];
}
let j = null, Xs = null;
function Dn(e, t) {
  e.shapeFlag & 6 && e.component ? Dn(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
const Zs = Symbol.for("v-ndc"), pt = (e) => e ? Sr(e) ? Vr(e) : pt(e.parent) : null, Oe = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ A(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? $e(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? $e(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? $e(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? $e(e.refs) : e.refs,
    $parent: (e) => pt(e.parent),
    $root: (e) => pt(e.root),
    $emit: (e) => e.emit,
    $options: (e) => tr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Rt(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ft.bind(e.proxy)),
    $watch: (e) => fr.bind(e)
  })
), ks = (e) => e === "_" || e === "$", rt = (e, t) => e !== H && !e.__isScriptSetup && O(e, t), er = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let h;
    if (t[0] !== "$") {
      const E = i[t];
      if (E !== void 0)
        switch (E) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (rt(s, t))
          return i[t] = 1, s[t];
        if (r !== H && O(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (h = e.propsOptions[0]) && O(h, t)
        )
          return i[t] = 3, o[t];
        if (n !== H && O(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const _ = Oe[t];
    let l, d;
    if (_)
      return t === "$attrs" ? (V(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && V(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== H && O(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      d = a.config.globalProperties, O(d, t)
    )
      return d[t];
    process.env.NODE_ENV !== "production" && j && (!M(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== H && ks(t[0]) && O(r, t) ? b(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === j && b(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return rt(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && O(r, t) ? (b(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== H && O(s, t) ? (s[t] = n, !0) : O(e.props, t) ? (process.env.NODE_ENV !== "production" && b(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && b(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== H && O(e, i) || rt(t, i) || (c = o[0]) && O(c, i) || O(s, i) || O(Oe, i) || O(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : O(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (er.ownKeys = (e) => (b(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function zt(e) {
  return m(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function tr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (h) => Je(a, h, i, !0)
  ), Je(a, t, i)), x(t) && o.set(t, a), a;
}
function Je(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Je(e, o, n, !0), r && r.forEach(
    (i) => Je(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && b(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = nr[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const nr = {
  data: Kt,
  props: qt,
  emits: qt,
  // objects
  methods: ve,
  computed: ve,
  // lifecycle
  beforeCreate: D,
  created: D,
  beforeMount: D,
  mounted: D,
  beforeUpdate: D,
  updated: D,
  beforeDestroy: D,
  beforeUnmount: D,
  destroyed: D,
  unmounted: D,
  activated: D,
  deactivated: D,
  errorCaptured: D,
  serverPrefetch: D,
  // assets
  components: ve,
  directives: ve,
  // watch
  watch: rr,
  // provide / inject
  provide: Kt,
  inject: sr
};
function Kt(e, t) {
  return t ? e ? function() {
    return A(
      y(e) ? e.call(this, this) : e,
      y(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function sr(e, t) {
  return ve(Jt(e), Jt(t));
}
function Jt(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function D(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ve(e, t) {
  return e ? A(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function qt(e, t) {
  return e ? m(e) && m(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : A(
    /* @__PURE__ */ Object.create(null),
    zt(e),
    zt(t ?? {})
  ) : t;
}
function rr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = A(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = D(e[s], t[s]);
  return n;
}
let dt = null;
function xn(e, t, n = !1) {
  const s = ge || j;
  if (s || dt) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : dt._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && y(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && b(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && b("inject() can only be used inside setup() or functional components.");
}
function or() {
  return !!(ge || j || dt);
}
const ir = {}, Rn = (e) => Object.getPrototypeOf(e) === ir, cr = (e) => e.__isTeleport, Gt = hr, lr = Symbol.for("v-scx"), ur = () => {
  {
    const e = xn(lr);
    return e || process.env.NODE_ENV !== "production" && b(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
}, je = {};
function ar(e, t, n) {
  return process.env.NODE_ENV !== "production" && !y(t) && b(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Pn(e, t, n);
}
function Pn(e, t, {
  immediate: n,
  deep: s,
  flush: r,
  once: o,
  onTrack: i,
  onTrigger: c
} = H) {
  if (t && o) {
    const u = t;
    t = (...De) => {
      u(...De), ue();
    };
  }
  process.env.NODE_ENV !== "production" && s !== void 0 && typeof s == "number" && b(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), process.env.NODE_ENV !== "production" && !t && (n !== void 0 && b(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && b(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && b(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (u) => {
    b(
      "Invalid watch source: ",
      u,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, h = ge, _ = (u) => s === !0 ? u : (
    // for deep: false, only traverse root-level properties
    ee(u, s === !1 ? 1 : void 0)
  );
  let l, d = !1, E = !1;
  if (w(e) ? (l = () => e.value, d = K(e)) : z(e) ? (l = () => _(e), d = !0) : m(e) ? (E = !0, d = e.some((u) => z(u) || K(u)), l = () => e.map((u) => {
    if (w(u))
      return u.value;
    if (z(u))
      return _(u);
    if (y(u))
      return oe(u, h, 2);
    process.env.NODE_ENV !== "production" && a(u);
  })) : y(e) ? t ? l = () => oe(e, h, 2) : l = () => (v && v(), Fe(
    e,
    h,
    3,
    [R]
  )) : (l = te, process.env.NODE_ENV !== "production" && a(e)), t && s) {
    const u = l;
    l = () => ee(u());
  }
  let v, R = (u) => {
    v = S.onStop = () => {
      oe(u, h, 4), v = S.onStop = void 0;
    };
  }, ce;
  if (Ct)
    if (R = te, t ? n && Fe(t, h, 3, [
      l(),
      E ? [] : void 0,
      R
    ]) : l(), r === "sync") {
      const u = ur();
      ce = u.__watcherHandles || (u.__watcherHandles = []);
    } else
      return te;
  let F = E ? new Array(e.length).fill(je) : je;
  const W = () => {
    if (!(!S.active || !S.dirty))
      if (t) {
        const u = S.run();
        (s || d || (E ? u.some((De, L) => X(De, F[L])) : X(u, F))) && (v && v(), Fe(t, h, 3, [
          u,
          // pass undefined as the old value when it's changed for the first time
          F === je ? void 0 : E && F[0] === je ? [] : F,
          R
        ]), F = u);
      } else
        S.run();
  };
  W.allowRecurse = !!t;
  let le;
  r === "sync" ? le = W : r === "post" ? le = () => Gt(W, h && h.suspense) : (W.pre = !0, h && (W.id = h.uid), le = () => Rt(W));
  const S = new tn(l, te, le), Z = en(), ue = () => {
    S.stop(), Z && Jn(Z.effects, S);
  };
  return process.env.NODE_ENV !== "production" && (S.onTrack = i, S.onTrigger = c), t ? n ? W() : F = S.run() : r === "post" ? Gt(
    S.run.bind(S),
    h && h.suspense
  ) : S.run(), ce && ce.push(ue), ue;
}
function fr(e, t, n) {
  const s = this.proxy, r = M(e) ? e.includes(".") ? pr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  y(t) ? o = t : (o = t.handler, n = t);
  const i = wr(this), c = Pn(r, o.bind(s), n);
  return i(), c;
}
function pr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function ee(e, t = 1 / 0, n) {
  if (t <= 0 || !x(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, w(e))
    ee(e.value, t, n);
  else if (m(e))
    for (let s = 0; s < e.length; s++)
      ee(e[s], t, n);
  else if (Gn(e) || he(e))
    e.forEach((s) => {
      ee(s, t, n);
    });
  else if (Qn(e)) {
    for (const s in e)
      ee(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && ee(e[s], t, n);
  }
  return e;
}
const dr = (e) => e.__isSuspense;
function hr(e, t) {
  t && t.pendingBranch ? m(e) ? t.effects.push(...e) : t.effects.push(e) : yn(e);
}
const Cn = Symbol.for("v-fgt"), _r = Symbol.for("v-txt"), gr = Symbol.for("v-cmt");
let de = null;
function Er(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const mr = (...e) => $n(
  ...e
), In = ({ key: e }) => e ?? null, Le = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? M(e) || w(e) || y(e) ? { i: j, r: e, k: t, f: !!n } : e : null);
function vr(e, t = null, n = null, s = 0, r = null, o = e === Cn ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && In(t),
    ref: t && Le(t),
    scopeId: Xs,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: j
  };
  return c ? (Pt(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= M(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && b("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  de && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && de.push(a), a;
}
const Nr = process.env.NODE_ENV !== "production" ? mr : $n;
function $n(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Zs) && (process.env.NODE_ENV !== "production" && !e && b(`Invalid vnode type when creating vnode: ${e}.`), e = gr), Er(e)) {
    const c = qe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Pt(c, n), !o && de && (c.shapeFlag & 6 ? de[de.indexOf(e)] = c : de.push(c)), c.patchFlag = -2, c;
  }
  if (Fn(e) && (e = e.__vccOpts), t) {
    t = br(t);
    let { class: c, style: a } = t;
    c && !M(c) && (t.class = vt(c)), x(a) && (Ue(a) && !m(a) && (a = A({}, a)), t.style = mt(a));
  }
  const i = M(e) ? 1 : dr(e) ? 128 : cr(e) ? 64 : x(e) ? 4 : y(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Ue(e) && (e = g(e), b(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), vr(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function br(e) {
  return e ? Ue(e) || Rn(e) ? A({}, e) : e : null;
}
function qe(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: a } = e, h = t ? yr(r || {}, t) : r, _ = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: h,
    key: h && In(h),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? m(o) ? o.concat(Le(t)) : [o, Le(t)] : Le(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && m(c) ? c.map(Tn) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Cn ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && qe(e.ssContent),
    ssFallback: e.ssFallback && qe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && Dn(
    _,
    a.clone(_)
  ), _;
}
function Tn(e) {
  const t = qe(e);
  return m(e.children) && (t.children = e.children.map(Tn)), t;
}
function Or(e = " ", t = 0) {
  return Nr(_r, null, e, t);
}
function Pt(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (m(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Pt(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Rn(t) ? t._ctx = j : r === 3 && j && (j.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else y(t) ? (t = { default: t, _ctx: j }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Or(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function yr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = vt([t.class, s.class]));
      else if (r === "style")
        t.style = mt([t.style, s.style]);
      else if (Kn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(m(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let ge = null;
const jn = () => ge || j;
let ht;
{
  const e = kt(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  ht = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ge = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Ct = n
  );
}
const wr = (e) => {
  const t = ge;
  return ht(e), e.scope.on(), () => {
    e.scope.off(), ht(t);
  };
};
function Sr(e) {
  return e.vnode.shapeFlag & 4;
}
let Ct = !1;
process.env.NODE_ENV;
function Vr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ts(pe(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Oe)
        return Oe[n](e);
    },
    has(t, n) {
      return n in t || n in Oe;
    }
  })) : e.proxy;
}
const Dr = /(?:^|[-_])(\w)/g, xr = (e) => e.replace(Dr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Mn(e, t = !0) {
  return y(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function An(e, t, n = !1) {
  let s = Mn(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? xr(s) : n ? "App" : "Anonymous";
}
function Fn(e) {
  return y(e) && "__vccOpts" in e;
}
const It = (e, t) => {
  const n = Rs(e, t, Ct);
  if (process.env.NODE_ENV !== "production") {
    const s = jn();
    s && s.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Rr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(l) {
      return x(l) ? l.__isVue ? ["div", e, "VueInstance"] : w(l) ? [
        "div",
        {},
        ["span", e, _(l)],
        "<",
        c(l.value),
        ">"
      ] : z(l) ? [
        "div",
        {},
        ["span", e, K(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${J(l) ? " (readonly)" : ""}`
      ] : J(l) ? [
        "div",
        {},
        ["span", e, K(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const d = [];
    l.type.props && l.props && d.push(i("props", g(l.props))), l.setupState !== H && d.push(i("setup", l.setupState)), l.data !== H && d.push(i("data", g(l.data)));
    const E = a(l, "computed");
    E && d.push(i("computed", E));
    const v = a(l, "inject");
    return v && d.push(i("injected", v)), d.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), d;
  }
  function i(l, d) {
    return d = A({}, d), Object.keys(d).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(d).map((E) => [
          "div",
          {},
          ["span", s, E + ": "],
          c(d[E], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, d = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : x(l) ? ["object", { object: d ? g(l) : l }] : ["span", n, String(l)];
  }
  function a(l, d) {
    const E = l.type;
    if (y(E))
      return;
    const v = {};
    for (const R in l.ctx)
      h(E, R, d) && (v[R] = l.ctx[R]);
    return v;
  }
  function h(l, d, E) {
    const v = l[E];
    if (m(v) && v.includes(d) || x(v) && d in v || l.extends && h(l.extends, d, E) || l.mixins && l.mixins.some((R) => h(R, d, E)))
      return !0;
  }
  function _(l) {
    return K(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Pr() {
  Rr();
}
process.env.NODE_ENV !== "production" && Pr();
var Cr = !1;
function Me(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function ot(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
/*!
 * pinia v2.2.1
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let Ne;
const Ge = (e) => Ne = e, Ir = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function ie(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ye;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ye || (ye = {}));
const be = typeof window < "u";
function Ln(e, t) {
  for (const n in t) {
    const s = t[n];
    if (!(n in e))
      continue;
    const r = e[n];
    ie(r) && ie(s) && !w(s) && !z(s) ? e[n] = Ln(r, s) : e[n] = s;
  }
  return e;
}
const Hn = () => {
};
function Yt(e, t, n, s = Hn) {
  e.push(t);
  const r = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), s());
  };
  return !n && en() && cs(r), r;
}
function ae(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const $r = (e) => e(), Bt = Symbol(), it = Symbol();
function _t(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], r = e[n];
    ie(r) && ie(s) && e.hasOwnProperty(n) && !w(s) && !z(s) ? e[n] = _t(r, s) : e[n] = s;
  }
  return e;
}
const Tr = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function jr(e) {
  return !ie(e) || !e.hasOwnProperty(Tr);
}
const { assign: $ } = Object;
function Qt(e) {
  return !!(w(e) && e.effect);
}
function Xt(e, t, n, s) {
  const { state: r, actions: o, getters: i } = t, c = n.state.value[e];
  let a;
  function h() {
    !c && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = r ? r() : {});
    const _ = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Ut(Ze(r ? r() : {}).value)
    ) : Ut(n.state.value[e]);
    return $(_, o, Object.keys(i || {}).reduce((l, d) => (process.env.NODE_ENV !== "production" && d in _ && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${d}" in store "${e}".`), l[d] = pe(It(() => {
      Ge(n);
      const E = n._s.get(e);
      return i[d].call(E, E);
    })), l), {}));
  }
  return a = gt(e, h, t, n, s, !0), a;
}
function gt(e, t, n = {}, s, r, o) {
  let i;
  const c = $({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const a = { deep: !0 };
  process.env.NODE_ENV !== "production" && !Cr && (a.onTrigger = (p) => {
    h ? E = p : h == !1 && !u._hotUpdating && (Array.isArray(E) ? E.push(p) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let h, _, l = [], d = [], E;
  const v = s.state.value[e];
  !o && !v && (process.env.NODE_ENV === "production" || !r) && (s.state.value[e] = {});
  const R = Ze({});
  let ce;
  function F(p) {
    let f;
    h = _ = !1, process.env.NODE_ENV !== "production" && (E = []), typeof p == "function" ? (p(s.state.value[e]), f = {
      type: ye.patchFunction,
      storeId: e,
      events: E
    }) : (_t(s.state.value[e], p), f = {
      type: ye.patchObject,
      payload: p,
      storeId: e,
      events: E
    });
    const N = ce = Symbol();
    ft().then(() => {
      ce === N && (h = !0);
    }), _ = !0, ae(l, f, s.state.value[e]);
  }
  const W = o ? function() {
    const { state: f } = n, N = f ? f() : {};
    this.$patch((C) => {
      $(C, N);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Hn
  );
  function le() {
    i.stop(), l = [], d = [], s._s.delete(e);
  }
  const S = (p, f = "") => {
    if (Bt in p)
      return p[it] = f, p;
    const N = function() {
      Ge(s);
      const C = Array.from(arguments), Ee = [], ke = [];
      function Un(I) {
        Ee.push(I);
      }
      function Wn(I) {
        ke.push(I);
      }
      ae(d, {
        args: C,
        name: N[it],
        store: u,
        after: Un,
        onError: Wn
      });
      let me;
      try {
        me = p.apply(this && this.$id === e ? this : u, C);
      } catch (I) {
        throw ae(ke, I), I;
      }
      return me instanceof Promise ? me.then((I) => (ae(Ee, I), I)).catch((I) => (ae(ke, I), Promise.reject(I))) : (ae(Ee, me), me);
    };
    return N[Bt] = !0, N[it] = f, N;
  }, Z = /* @__PURE__ */ pe({
    actions: {},
    getters: {},
    state: [],
    hotState: R
  }), ue = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: Yt.bind(null, d),
    $patch: F,
    $reset: W,
    $subscribe(p, f = {}) {
      const N = Yt(l, p, f.detached, () => C()), C = i.run(() => ar(() => s.state.value[e], (Ee) => {
        (f.flush === "sync" ? _ : h) && p({
          storeId: e,
          type: ye.direct,
          events: E
        }, Ee);
      }, $({}, a, f)));
      return N;
    },
    $dispose: le
  }, u = wt(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && be ? $(
    {
      _hmrPayload: Z,
      _customProperties: pe(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    ue
    // must be added later
    // setupStore
  ) : ue);
  s._s.set(e, u);
  const L = (s._a && s._a.runWithContext || $r)(() => s._e.run(() => (i = os()).run(() => t({ action: S }))));
  for (const p in L) {
    const f = L[p];
    if (w(f) && !Qt(f) || z(f))
      process.env.NODE_ENV !== "production" && r ? Me(R.value, p, et(L, p)) : o || (v && jr(f) && (w(f) ? f.value = v[p] : _t(f, v[p])), s.state.value[e][p] = f), process.env.NODE_ENV !== "production" && Z.state.push(p);
    else if (typeof f == "function") {
      const N = process.env.NODE_ENV !== "production" && r ? f : S(f, p);
      L[p] = N, process.env.NODE_ENV !== "production" && (Z.actions[p] = f), c.actions[p] = f;
    } else process.env.NODE_ENV !== "production" && Qt(f) && (Z.getters[p] = o ? (
      // @ts-expect-error
      n.getters[p]
    ) : f, be && (L._getters || // @ts-expect-error: same
    (L._getters = pe([]))).push(p));
  }
  if ($(u, L), $(g(u), L), Object.defineProperty(u, "$state", {
    get: () => process.env.NODE_ENV !== "production" && r ? R.value : s.state.value[e],
    set: (p) => {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error("cannot set hotState");
      F((f) => {
        $(f, p);
      });
    }
  }), process.env.NODE_ENV !== "production" && (u._hotUpdate = pe((p) => {
    u._hotUpdating = !0, p._hmrPayload.state.forEach((f) => {
      if (f in u.$state) {
        const N = p.$state[f], C = u.$state[f];
        typeof N == "object" && ie(N) && ie(C) ? Ln(N, C) : p.$state[f] = C;
      }
      Me(u, f, et(p.$state, f));
    }), Object.keys(u.$state).forEach((f) => {
      f in p.$state || ot(u, f);
    }), h = !1, _ = !1, s.state.value[e] = et(p._hmrPayload, "hotState"), _ = !0, ft().then(() => {
      h = !0;
    });
    for (const f in p._hmrPayload.actions) {
      const N = p[f];
      Me(u, f, S(N, f));
    }
    for (const f in p._hmrPayload.getters) {
      const N = p._hmrPayload.getters[f], C = o ? (
        // special handling of options api
        It(() => (Ge(s), N.call(u, u)))
      ) : N;
      Me(u, f, C);
    }
    Object.keys(u._hmrPayload.getters).forEach((f) => {
      f in p._hmrPayload.getters || ot(u, f);
    }), Object.keys(u._hmrPayload.actions).forEach((f) => {
      f in p._hmrPayload.actions || ot(u, f);
    }), u._hmrPayload = p._hmrPayload, u._getters = p._getters, u._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && be) {
    const p = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((f) => {
      Object.defineProperty(u, f, $({ value: u[f] }, p));
    });
  }
  return s._p.forEach((p) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && be) {
      const f = i.run(() => p({
        store: u,
        app: s._a,
        pinia: s,
        options: c
      }));
      Object.keys(f || {}).forEach((N) => u._customProperties.add(N)), $(u, f);
    } else
      $(u, i.run(() => p({
        store: u,
        app: s._a,
        pinia: s,
        options: c
      })));
  }), process.env.NODE_ENV !== "production" && u.$state && typeof u.$state == "object" && typeof u.$state.constructor == "function" && !u.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${u.$id}".`), v && o && n.hydrate && n.hydrate(u.$state, v), h = !0, _ = !0, u;
}
function Mr(e, t, n) {
  let s, r;
  const o = typeof t == "function";
  s = e, r = o ? n : t;
  function i(c, a) {
    const h = or();
    if (c = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Ne && Ne._testing ? null : c) || (h ? xn(Ir, null) : null), c && Ge(c), process.env.NODE_ENV !== "production" && !Ne)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    c = Ne, c._s.has(s) || (o ? gt(s, t, r, c) : Xt(s, r, c), process.env.NODE_ENV !== "production" && (i._pinia = c));
    const _ = c._s.get(s);
    if (process.env.NODE_ENV !== "production" && a) {
      const l = "__hot:" + s, d = o ? gt(l, t, r, c, !0) : Xt(l, $({}, r), c, !0);
      a._hotUpdate(d), delete c.state.value[l], c._s.delete(l);
    }
    if (process.env.NODE_ENV !== "production" && be) {
      const l = jn();
      if (l && l.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const d = l.proxy, E = "_pStores" in d ? d._pStores : d._pStores = {};
        E[s] = _;
      }
    }
    return _;
  }
  return i.$id = s, i;
}
const Ar = Mr("counter", () => {
  const e = Ze(0), t = It(() => e.value * 2);
  function n() {
    e.value++;
  }
  return { count: e, doubleCount: t, increment: n };
}), Fr = "bar";
export {
  Fr as foo,
  Ar as useCounterStore
};
