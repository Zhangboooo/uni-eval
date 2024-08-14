/**
* @vue/shared v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function An(e, t) {
  const n = new Set(e.split(","));
  return (s) => n.has(s);
}
const P = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Fn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Q = () => {
}, jn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), D = Object.assign, Ln = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Hn = Object.prototype.hasOwnProperty, N = (e, t) => Hn.call(e, t), d = Array.isArray, X = (e) => Ae(e) === "[object Map]", Lt = (e) => Ae(e) === "[object Set]", m = (e) => typeof e == "function", V = (e) => typeof e == "string", ne = (e) => typeof e == "symbol", v = (e) => e !== null && typeof e == "object", zn = (e) => (v(e) || m(e)) && m(e.then) && m(e.catch), Ht = Object.prototype.toString, Ae = (e) => Ht.call(e), zt = (e) => Ae(e).slice(8, -1), Kt = (e) => Ae(e) === "[object Object]", st = (e) => V(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, rt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Kn = /-(\w)/g, Re = rt((e) => e.replace(Kn, (t, n) => n ? n.toUpperCase() : "")), ae = rt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Un = rt((e) => e ? `on${ae(e)}` : ""), B = (e, t) => !Object.is(e, t), Wn = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let bt;
const Ut = () => bt || (bt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ot(e) {
  if (d(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = V(s) ? Gn(s) : ot(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (V(e) || v(e))
    return e;
}
const Bn = /;(?![^(]*\))/g, Jn = /:([^]+)/, qn = /\/\*[^]*?\*\//g;
function Gn(e) {
  const t = {};
  return e.replace(qn, "").split(Bn).forEach((n) => {
    if (n) {
      const s = n.split(Jn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function it(e) {
  let t = "";
  if (V(e))
    t = e;
  else if (d(e))
    for (let n = 0; n < e.length; n++) {
      const s = it(e[n]);
      s && (t += s + " ");
    }
  else if (v(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Wt = (e) => !!(e && e.__v_isRef === !0), Yn = (e) => V(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === Ht || !m(e.toString)) ? Wt(e) ? Yn(e.value) : JSON.stringify(e, Bt, 2) : String(e), Bt = (e, t) => Wt(t) ? Bt(e, t.value) : X(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[We(s, o) + " =>"] = r, n),
    {}
  )
} : Lt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => We(n))
} : ne(t) ? We(t) : v(t) && !d(t) && !Kt(t) ? String(t) : t, We = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ne(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function T(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let x;
class Qn {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = x, !t && x && (this.index = (x.scopes || (x.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = x;
      try {
        return x = this, t();
      } finally {
        x = n;
      }
    } else process.env.NODE_ENV !== "production" && T("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    x = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    x = this.parent;
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
function Sr(e) {
  return new Qn(e);
}
function Xn(e, t = x) {
  t && t.active && t.effects.push(e);
}
function Zn() {
  return x;
}
function yr(e) {
  x ? x.cleanups.push(e) : process.env.NODE_ENV !== "production" && T(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let Z;
class Jt {
  constructor(t, n, s, r) {
    this.fn = t, this.trigger = n, this.scheduler = s, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Xn(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, he();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (kn(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), _e();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = U, n = Z;
    try {
      return U = !0, Z = this, this._runnings++, Ot(this), this.fn();
    } finally {
      St(this), this._runnings--, Z = n, U = t;
    }
  }
  stop() {
    this.active && (Ot(this), St(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function kn(e) {
  return e.value;
}
function Ot(e) {
  e._trackId++, e._depsLength = 0;
}
function St(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      qt(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function qt(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let U = !0, Ye = 0;
const Gt = [];
function he() {
  Gt.push(U), U = !1;
}
function _e() {
  const e = Gt.pop();
  U = e === void 0 ? !0 : e;
}
function ct() {
  Ye++;
}
function lt() {
  for (Ye--; !Ye && Qe.length; )
    Qe.shift()();
}
function Yt(e, t, n) {
  var s;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const r = e.deps[e._depsLength];
    r !== t ? (r && qt(r, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((s = e.onTrack) == null || s.call(e, D({ effect: e }, n)));
  }
}
const Qe = [];
function Qt(e, t, n) {
  var s;
  ct();
  for (const r of e.keys()) {
    let o;
    r._dirtyLevel < t && (o ?? (o = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), r._dirtyLevel = t), r._shouldSchedule && (o ?? (o = e.get(r) === r._trackId)) && (process.env.NODE_ENV !== "production" && ((s = r.onTrigger) == null || s.call(r, D({ effect: r }, n))), r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && (r._shouldSchedule = !1, r.scheduler && Qe.push(r.scheduler)));
  }
  lt();
}
const Xt = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, Ve = /* @__PURE__ */ new WeakMap(), k = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Xe = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
function O(e, t, n) {
  if (U && Z) {
    let s = Ve.get(e);
    s || Ve.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = Xt(() => s.delete(n))), Yt(
      Z,
      r,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function W(e, t, n, s, r, o) {
  const i = Ve.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && d(e)) {
    const u = Number(s);
    i.forEach((f, g) => {
      (g === "length" || !ne(g) && g >= u) && c.push(f);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        d(e) ? st(n) && c.push(i.get("length")) : (c.push(i.get(k)), X(e) && c.push(i.get(Xe)));
        break;
      case "delete":
        d(e) || (c.push(i.get(k)), X(e) && c.push(i.get(Xe)));
        break;
      case "set":
        X(e) && c.push(i.get(k));
        break;
    }
  ct();
  for (const u of c)
    u && Qt(
      u,
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
  lt();
}
function es(e, t) {
  const n = Ve.get(e);
  return n && n.get(t);
}
const ts = /* @__PURE__ */ An("__proto__,__v_isRef,__isVue"), Zt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ne)
), yt = /* @__PURE__ */ ns();
function ns() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = a(this);
      for (let o = 0, i = this.length; o < i; o++)
        O(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(a)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      he(), ct();
      const s = a(this)[t].apply(this, n);
      return lt(), _e(), s;
    };
  }), e;
}
function ss(e) {
  ne(e) || (e = String(e));
  const t = a(this);
  return O(t, "has", e), t.hasOwnProperty(e);
}
class kt {
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
      return s === (r ? o ? rn : sn : o ? gs : nn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = d(t);
    if (!r) {
      if (i && N(yt, n))
        return Reflect.get(yt, n, s);
      if (n === "hasOwnProperty")
        return ss;
    }
    const c = Reflect.get(t, n, s);
    return (ne(n) ? Zt.has(n) : ts(n)) || (r || O(t, "get", n), o) ? c : y(c) ? i && st(n) ? c : c.value : v(c) ? r ? cn(c) : on(c) : c;
  }
}
class rs extends kt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const u = A(o);
      if (!M(s) && !A(s) && (o = a(o), s = a(s)), !d(t) && y(o) && !y(s))
        return u ? !1 : (o.value = s, !0);
    }
    const i = d(t) && st(n) ? Number(n) < t.length : N(t, n), c = Reflect.set(t, n, s, r);
    return t === a(r) && (i ? B(s, o) && W(t, "set", n, s, o) : W(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = N(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && W(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!ne(n) || !Zt.has(n)) && O(t, "has", n), s;
  }
  ownKeys(t) {
    return O(
      t,
      "iterate",
      d(t) ? "length" : k
    ), Reflect.ownKeys(t);
  }
}
class en extends kt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && T(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && T(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const os = /* @__PURE__ */ new rs(), is = /* @__PURE__ */ new en(), cs = /* @__PURE__ */ new en(!0), ut = (e) => e, Fe = (e) => Reflect.getPrototypeOf(e);
function me(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = a(e), o = a(t);
  n || (B(t, o) && O(r, "get", t), O(r, "get", o));
  const { has: i } = Fe(r), c = s ? ut : n ? pt : fe;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function Ee(e, t = !1) {
  const n = this.__v_raw, s = a(n), r = a(e);
  return t || (B(e, r) && O(s, "has", e), O(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Ne(e, t = !1) {
  return e = e.__v_raw, !t && O(a(e), "iterate", k), Reflect.get(e, "size", e);
}
function Rt(e, t = !1) {
  !t && !M(e) && !A(e) && (e = a(e));
  const n = a(this);
  return Fe(n).has.call(n, e) || (n.add(e), W(n, "add", e, e)), this;
}
function Vt(e, t, n = !1) {
  !n && !M(t) && !A(t) && (t = a(t));
  const s = a(this), { has: r, get: o } = Fe(s);
  let i = r.call(s, e);
  i ? process.env.NODE_ENV !== "production" && tn(s, r, e) : (e = a(e), i = r.call(s, e));
  const c = o.call(s, e);
  return s.set(e, t), i ? B(t, c) && W(s, "set", e, t, c) : W(s, "add", e, t), this;
}
function xt(e) {
  const t = a(this), { has: n, get: s } = Fe(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && tn(t, n, e) : (e = a(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && W(t, "delete", e, void 0, o), i;
}
function Ct() {
  const e = a(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? X(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && W(e, "clear", void 0, void 0, n), s;
}
function we(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = a(i), u = t ? ut : e ? pt : fe;
    return !e && O(c, "iterate", k), i.forEach((f, g) => s.call(r, u(f), u(g), o));
  };
}
function ve(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = a(r), i = X(o), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, f = r[e](...s), g = n ? ut : t ? pt : fe;
    return !t && O(
      o,
      "iterate",
      u ? Xe : k
    ), {
      // iterator protocol
      next() {
        const { value: l, done: p } = f.next();
        return p ? { value: l, done: p } : {
          value: c ? [g(l[0]), g(l[1])] : g(l),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function j(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      T(
        `${ae(e)} operation ${n}failed: target is readonly.`,
        a(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ls() {
  const e = {
    get(o) {
      return me(this, o);
    },
    get size() {
      return Ne(this);
    },
    has: Ee,
    add: Rt,
    set: Vt,
    delete: xt,
    clear: Ct,
    forEach: we(!1, !1)
  }, t = {
    get(o) {
      return me(this, o, !1, !0);
    },
    get size() {
      return Ne(this);
    },
    has: Ee,
    add(o) {
      return Rt.call(this, o, !0);
    },
    set(o, i) {
      return Vt.call(this, o, i, !0);
    },
    delete: xt,
    clear: Ct,
    forEach: we(!1, !0)
  }, n = {
    get(o) {
      return me(this, o, !0);
    },
    get size() {
      return Ne(this, !0);
    },
    has(o) {
      return Ee.call(this, o, !0);
    },
    add: j("add"),
    set: j("set"),
    delete: j("delete"),
    clear: j("clear"),
    forEach: we(!0, !1)
  }, s = {
    get(o) {
      return me(this, o, !0, !0);
    },
    get size() {
      return Ne(this, !0);
    },
    has(o) {
      return Ee.call(this, o, !0);
    },
    add: j("add"),
    set: j("set"),
    delete: j("delete"),
    clear: j("clear"),
    forEach: we(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    e[o] = ve(o, !1, !1), n[o] = ve(o, !0, !1), t[o] = ve(o, !1, !0), s[o] = ve(
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
  us,
  as,
  fs,
  ps
] = /* @__PURE__ */ ls();
function at(e, t) {
  const n = t ? e ? ps : fs : e ? as : us;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    N(n, r) && r in s ? n : s,
    r,
    o
  );
}
const ds = {
  get: /* @__PURE__ */ at(!1, !1)
}, hs = {
  get: /* @__PURE__ */ at(!0, !1)
}, _s = {
  get: /* @__PURE__ */ at(!0, !0)
};
function tn(e, t, n) {
  const s = a(n);
  if (s !== n && t.call(e, s)) {
    const r = zt(e);
    T(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const nn = /* @__PURE__ */ new WeakMap(), gs = /* @__PURE__ */ new WeakMap(), sn = /* @__PURE__ */ new WeakMap(), rn = /* @__PURE__ */ new WeakMap();
function ms(e) {
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
function Es(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ms(zt(e));
}
function on(e) {
  return A(e) ? e : ft(
    e,
    !1,
    os,
    ds,
    nn
  );
}
function cn(e) {
  return ft(
    e,
    !0,
    is,
    hs,
    sn
  );
}
function be(e) {
  return ft(
    e,
    !0,
    cs,
    _s,
    rn
  );
}
function ft(e, t, n, s, r) {
  if (!v(e))
    return process.env.NODE_ENV !== "production" && T(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Es(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function se(e) {
  return A(e) ? se(e.__v_raw) : !!(e && e.__v_isReactive);
}
function A(e) {
  return !!(e && e.__v_isReadonly);
}
function M(e) {
  return !!(e && e.__v_isShallow);
}
function xe(e) {
  return e ? !!e.__v_raw : !1;
}
function a(e) {
  const t = e && e.__v_raw;
  return t ? a(t) : e;
}
function Ns(e) {
  return Object.isExtensible(e) && Wn(e, "__v_skip", !0), e;
}
const fe = (e) => v(e) ? on(e) : e, pt = (e) => v(e) ? cn(e) : e, ws = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class ln {
  constructor(t, n, s, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Jt(
      () => t(this._value),
      () => ce(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = a(this);
    return (!t._cacheable || t.effect.dirty) && B(t._value, t._value = t.effect.run()) && ce(t, 4), dt(t), t.effect._dirtyLevel >= 2 && (process.env.NODE_ENV !== "production" && this._warnRecursive && T(ws, `

getter: `, this.getter), ce(t, 2)), t._value;
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
function vs(e, t, n = !1) {
  let s, r;
  const o = m(e);
  o ? (s = e, r = process.env.NODE_ENV !== "production" ? () => {
    T("Write operation failed: computed value is readonly");
  } : Q) : (s = e.get, r = e.set);
  const i = new ln(s, r, o || !r, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
function dt(e) {
  var t;
  U && Z && (e = a(e), Yt(
    Z,
    (t = e.dep) != null ? t : e.dep = Xt(
      () => e.dep = void 0,
      e instanceof ln ? e : void 0
    ),
    process.env.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function ce(e, t = 4, n, s) {
  e = a(e);
  const r = e.dep;
  r && Qt(
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
function y(e) {
  return !!(e && e.__v_isRef === !0);
}
function bs(e) {
  return un(e, !1);
}
function Rr(e) {
  return un(e, !0);
}
function un(e, t) {
  return y(e) ? e : new Os(e, t);
}
class Os {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : a(t), this._value = n ? t : fe(t);
  }
  get value() {
    return dt(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || M(t) || A(t);
    if (t = n ? t : a(t), B(t, this._rawValue)) {
      const s = this._rawValue;
      this._rawValue = t, this._value = n ? t : fe(t), ce(this, 4, t, s);
    }
  }
}
function Ss(e) {
  return y(e) ? e.value : e;
}
const ys = {
  get: (e, t, n) => Ss(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return y(r) && !y(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Rs(e) {
  return se(e) ? e : new Proxy(e, ys);
}
class Vs {
  constructor(t) {
    this.dep = void 0, this.__v_isRef = !0;
    const { get: n, set: s } = t(
      () => dt(this),
      () => ce(this)
    );
    this._get = n, this._set = s;
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function Vr(e) {
  return new Vs(e);
}
function xr(e) {
  process.env.NODE_ENV !== "production" && !xe(e) && T("toRefs() expects a reactive object but received a plain one.");
  const t = d(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = an(e, n);
  return t;
}
class xs {
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
    return es(a(this._object), this._key);
  }
}
class Cs {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function Cr(e, t, n) {
  return y(e) ? e : m(e) ? new Cs(e) : v(e) && arguments.length > 1 ? an(e, t, n) : bs(e);
}
function an(e, t, n) {
  const s = e[t];
  return y(s) ? s : new xs(e, t, n);
}
/**
* @vue/runtime-core v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const ee = [];
function Ds(e) {
  ee.push(e);
}
function Is() {
  ee.pop();
}
let Be = !1;
function _(e, ...t) {
  if (Be) return;
  Be = !0, he();
  const n = ee.length ? ee[ee.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = $s();
  if (s)
    te(
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
          ({ vnode: o }) => `at <${Pn(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...Ps(r)), console.warn(...o);
  }
  _e(), Be = !1;
}
function $s() {
  let e = ee[ee.length - 1];
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
function Ps(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Ts(n));
  }), t;
}
function Ts({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${Pn(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...Ms(e.props), o] : [r + o];
}
function Ms(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...fn(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function fn(e, t, n) {
  return V(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : y(t) ? (t = fn(e, a(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : m(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = a(t), n ? t : [`${e}=`, t]);
}
const ht = {
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
function te(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    _t(r, t, n);
  }
}
function le(e, t, n, s) {
  if (m(e)) {
    const r = te(e, t, n, s);
    return r && zn(r) && r.catch((o) => {
      _t(o, t, n);
    }), r;
  }
  if (d(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(le(e[o], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && _(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function _t(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? ht[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let g = 0; g < f.length; g++)
          if (f[g](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      he(), te(
        u,
        null,
        10,
        [e, i, c]
      ), _e();
      return;
    }
  }
  As(e, n, r, s);
}
function As(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = ht[t];
    if (n && Ds(n), _(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Is(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Ce = !1, Ze = !1;
const I = [];
let H = 0;
const re = [];
let L = null, G = 0;
const pn = /* @__PURE__ */ Promise.resolve();
let gt = null;
const Fs = 100;
function js(e) {
  const t = gt || pn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ls(e) {
  let t = H + 1, n = I.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = I[s], o = pe(r);
    o < e || o === e && r.pre ? t = s + 1 : n = s;
  }
  return t;
}
function mt(e) {
  (!I.length || !I.includes(
    e,
    Ce && e.allowRecurse ? H + 1 : H
  )) && (e.id == null ? I.push(e) : I.splice(Ls(e.id), 0, e), dn());
}
function dn() {
  !Ce && !Ze && (Ze = !0, gt = pn.then(_n));
}
function hn(e) {
  d(e) ? re.push(...e) : (!L || !L.includes(
    e,
    e.allowRecurse ? G + 1 : G
  )) && re.push(e), dn();
}
function Hs(e) {
  if (re.length) {
    const t = [...new Set(re)].sort(
      (n, s) => pe(n) - pe(s)
    );
    if (re.length = 0, L) {
      L.push(...t);
      return;
    }
    for (L = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), G = 0; G < L.length; G++) {
      const n = L[G];
      process.env.NODE_ENV !== "production" && gn(e, n) || n.active !== !1 && n();
    }
    L = null, G = 0;
  }
}
const pe = (e) => e.id == null ? 1 / 0 : e.id, zs = (e, t) => {
  const n = pe(e) - pe(t);
  if (n === 0) {
    if (e.pre && !t.pre) return -1;
    if (t.pre && !e.pre) return 1;
  }
  return n;
};
function _n(e) {
  Ze = !1, Ce = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), I.sort(zs);
  const t = process.env.NODE_ENV !== "production" ? (n) => gn(e, n) : Q;
  try {
    for (H = 0; H < I.length; H++) {
      const n = I[H];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        te(
          n,
          n.i,
          n.i ? 15 : 14
        );
      }
    }
  } finally {
    H = 0, I.length = 0, Hs(e), Ce = !1, gt = null, (I.length || re.length) && _n(e);
  }
}
function gn(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Fs) {
      const s = t.i, r = s && wt(s.type);
      return _t(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const Je = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Ut().__VUE_HMR_RUNTIME__ = {
  createRecord: qe(Ks),
  rerender: qe(Us),
  reload: qe(Ws)
});
const De = /* @__PURE__ */ new Map();
function Ks(e, t) {
  return De.has(e) ? !1 : (De.set(e, {
    initialDef: Ie(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Ie(e) {
  return Tn(e) ? e.__vccOpts : e;
}
function Us(e, t) {
  const n = De.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, Ie(s.type).render = t), s.renderCache = [], s.effect.dirty = !0, s.update();
  }));
}
function Ws(e, t) {
  const n = De.get(e);
  if (!n) return;
  t = Ie(t), Dt(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = Ie(o.type);
    let c = Je.get(i);
    c || (i !== n.initialDef && Dt(i, t), Je.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? (o.parent.effect.dirty = !0, mt(() => {
      o.parent.update(), c.delete(o);
    })) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  hn(() => {
    Je.clear();
  });
}
function Dt(e, t) {
  D(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function qe(e) {
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
let z, oe = [], ke = !1;
function Bs(e, ...t) {
  z ? z.emit(e, ...t) : ke || oe.push({ event: e, args: t });
}
function mn(e, t) {
  var n, s;
  z = e, z ? (z.enabled = !0, oe.forEach(({ event: r, args: o }) => z.emit(r, ...o)), oe = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    mn(o, t);
  }), setTimeout(() => {
    z || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, ke = !0, oe = []);
  }, 3e3)) : (ke = !0, oe = []);
}
const Js = /* @__PURE__ */ qs(
  "component:updated"
  /* COMPONENT_UPDATED */
);
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function qs(e) {
  return (t) => {
    Bs(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
let w = null, je = null;
function It(e) {
  const t = w;
  return w = e, je = e && e.type.__scopeId || null, t;
}
function Dr(e) {
  je = e;
}
function Ir() {
  je = null;
}
function $r(e, t = w, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && jt(-1);
    const o = It(t);
    let i;
    try {
      i = e(...r);
    } finally {
      It(o), s._d && jt(1);
    }
    return process.env.NODE_ENV !== "production" && Js(t), i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function En(e, t) {
  e.shapeFlag & 6 && e.component ? En(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Pr(e, t) {
  return m(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    D({ name: e.name }, t, { setup: e })
  ) : e;
}
const Gs = (e) => !!e.type.__asyncLoader;
function Ys(e, t, n = F, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      he();
      const c = $n(n), u = le(t, n, e, i);
      return c(), _e(), u;
    });
    return s ? r.unshift(o) : r.push(o), o;
  } else if (process.env.NODE_ENV !== "production") {
    const r = Un(ht[e].replace(/ hook$/, ""));
    _(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Nn = (e) => (t, n = F) => {
  (!He || e === "sp") && Ys(e, (...s) => t(...s), n);
}, Tr = Nn("m"), Mr = Nn("um"), wn = "components";
function Ar(e, t) {
  return bn(wn, e, !0, t) || e;
}
const vn = Symbol.for("v-ndc");
function Fr(e) {
  return V(e) ? bn(wn, e, !1) || e : e || vn;
}
function bn(e, t, n = !0, s = !1) {
  const r = w || F;
  if (r) {
    const o = r.type;
    {
      const c = wt(
        o,
        !1
      );
      if (c && (c === t || c === Re(t) || c === ae(Re(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      $t(r[e] || o[e], t) || // global registration
      $t(r.appContext[e], t)
    );
    return !i && s ? o : (process.env.NODE_ENV !== "production" && n && !i && _(`Failed to resolve ${e.slice(0, -1)}: ${t}
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.`), i);
  } else process.env.NODE_ENV !== "production" && _(
    `resolve${ae(e.slice(0, -1))} can only be used in render() or setup().`
  );
}
function $t(e, t) {
  return e && (e[t] || e[Re(t)] || e[ae(Re(t))]);
}
function jr(e, t, n, s) {
  let r;
  const o = n;
  if (d(e) || V(e)) {
    r = new Array(e.length);
    for (let i = 0, c = e.length; i < c; i++)
      r[i] = t(e[i], i, void 0, o);
  } else {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && _(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, o);
  }
  return r;
}
function Lr(e, t, n = {}, s, r) {
  if (w.isCE || w.parent && Gs(w.parent) && w.parent.isCE)
    return K("slot", n, s);
  let o = e[t];
  process.env.NODE_ENV !== "production" && o && o.length > 1 && (_(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), o = () => []), o && o._c && (o._d = !1), yn();
  const i = o && On(o(n)), c = Vn(
    Le,
    {
      key: (n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && s ? "_fb" : "")
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function On(e) {
  return e.some((t) => Te(t) ? !(t.type === Pe || t.type === Le && !On(t.children)) : !0) ? e : null;
}
const et = (e) => e ? Er(e) ? Nr(e) : et(e.parent) : null, ue = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ D(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? be(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? be(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? be(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? be(e.refs) : e.refs,
    $parent: (e) => et(e.parent),
    $root: (e) => et(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Zs(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, mt(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = js.bind(e.proxy)),
    $watch: (e) => cr.bind(e)
  })
), Qs = (e) => e === "_" || e === "$", Ge = (e, t) => e !== P && !e.__isScriptSetup && N(e, t), Xs = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
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
        if (Ge(s, t))
          return i[t] = 1, s[t];
        if (r !== P && N(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && N(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== P && N(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const g = ue[t];
    let l, p;
    if (g)
      return t === "$attrs" ? (O(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && O(e, "get", t), g(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== P && N(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = u.config.globalProperties, N(p, t)
    )
      return p[t];
    process.env.NODE_ENV !== "production" && w && (!V(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== P && Qs(t[0]) && N(r, t) ? _(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === w && _(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Ge(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && N(r, t) ? (_(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== P && N(s, t) ? (s[t] = n, !0) : N(e.props, t) ? (process.env.NODE_ENV !== "production" && _(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && _(
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
    return !!n[i] || e !== P && N(e, i) || Ge(t, i) || (c = o[0]) && N(c, i) || N(s, i) || N(ue, i) || N(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : N(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Xs.ownKeys = (e) => (_(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Pt(e) {
  return d(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Zs(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach(
    (f) => $e(u, f, i, !0)
  ), $e(u, t, i)), v(t) && o.set(t, u), u;
}
function $e(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && $e(e, o, n, !0), r && r.forEach(
    (i) => $e(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && _(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = ks[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const ks = {
  data: Tt,
  props: At,
  emits: At,
  // objects
  methods: ie,
  computed: ie,
  // lifecycle
  beforeCreate: S,
  created: S,
  beforeMount: S,
  mounted: S,
  beforeUpdate: S,
  updated: S,
  beforeDestroy: S,
  beforeUnmount: S,
  destroyed: S,
  unmounted: S,
  activated: S,
  deactivated: S,
  errorCaptured: S,
  serverPrefetch: S,
  // assets
  components: ie,
  directives: ie,
  // watch
  watch: tr,
  // provide / inject
  provide: Tt,
  inject: er
};
function Tt(e, t) {
  return t ? e ? function() {
    return D(
      m(e) ? e.call(this, this) : e,
      m(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function er(e, t) {
  return ie(Mt(e), Mt(t));
}
function Mt(e) {
  if (d(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function S(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ie(e, t) {
  return e ? D(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function At(e, t) {
  return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : D(
    /* @__PURE__ */ Object.create(null),
    Pt(e),
    Pt(t ?? {})
  ) : t;
}
function tr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = D(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = S(e[s], t[s]);
  return n;
}
let tt = null;
function nr(e, t, n = !1) {
  const s = F || w;
  if (s || tt) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : tt._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && m(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && _(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && _("inject() can only be used inside setup() or functional components.");
}
function Hr() {
  return !!(F || w || tt);
}
const sr = {}, Sn = (e) => Object.getPrototypeOf(e) === sr, rr = (e) => e.__isTeleport, Ft = ar, or = Symbol.for("v-scx"), ir = () => {
  {
    const e = nr(or);
    return e || process.env.NODE_ENV !== "production" && _(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function zr(e, t) {
  return Et(
    e,
    null,
    process.env.NODE_ENV !== "production" ? D({}, t, { flush: "post" }) : { flush: "post" }
  );
}
const Oe = {};
function Kr(e, t, n) {
  return process.env.NODE_ENV !== "production" && !m(t) && _(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Et(e, t, n);
}
function Et(e, t, {
  immediate: n,
  deep: s,
  flush: r,
  once: o,
  onTrack: i,
  onTrigger: c
} = P) {
  if (t && o) {
    const h = t;
    t = (...Ue) => {
      h(...Ue), Ke();
    };
  }
  process.env.NODE_ENV !== "production" && s !== void 0 && typeof s == "number" && _(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), process.env.NODE_ENV !== "production" && !t && (n !== void 0 && _(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && _(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && _(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const u = (h) => {
    _(
      "Invalid watch source: ",
      h,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, f = F, g = (h) => s === !0 ? h : (
    // for deep: false, only traverse root-level properties
    Y(h, s === !1 ? 1 : void 0)
  );
  let l, p = !1, E = !1;
  if (y(e) ? (l = () => e.value, p = M(e)) : se(e) ? (l = () => g(e), p = !0) : d(e) ? (E = !0, p = e.some((h) => se(h) || M(h)), l = () => e.map((h) => {
    if (y(h))
      return h.value;
    if (se(h))
      return g(h);
    if (m(h))
      return te(h, f, 2);
    process.env.NODE_ENV !== "production" && u(h);
  })) : m(e) ? t ? l = () => te(e, f, 2) : l = () => (b && b(), le(
    e,
    f,
    3,
    [$]
  )) : (l = Q, process.env.NODE_ENV !== "production" && u(e)), t && s) {
    const h = l;
    l = () => Y(h());
  }
  let b, $ = (h) => {
    b = R.onStop = () => {
      te(h, f, 4), b = R.onStop = void 0;
    };
  }, ze;
  if (He)
    if ($ = Q, t ? n && le(t, f, 3, [
      l(),
      E ? [] : void 0,
      $
    ]) : l(), r === "sync") {
      const h = ir();
      ze = h.__watcherHandles || (h.__watcherHandles = []);
    } else
      return Q;
  let J = E ? new Array(e.length).fill(Oe) : Oe;
  const q = () => {
    if (!(!R.active || !R.dirty))
      if (t) {
        const h = R.run();
        (s || p || (E ? h.some((Ue, Mn) => B(Ue, J[Mn])) : B(h, J))) && (b && b(), le(t, f, 3, [
          h,
          // pass undefined as the old value when it's changed for the first time
          J === Oe ? void 0 : E && J[0] === Oe ? [] : J,
          $
        ]), J = h);
      } else
        R.run();
  };
  q.allowRecurse = !!t;
  let ge;
  r === "sync" ? ge = q : r === "post" ? ge = () => Ft(q, f && f.suspense) : (q.pre = !0, f && (q.id = f.uid), ge = () => mt(q));
  const R = new Jt(l, Q, ge), vt = Zn(), Ke = () => {
    R.stop(), vt && Ln(vt.effects, R);
  };
  return process.env.NODE_ENV !== "production" && (R.onTrack = i, R.onTrigger = c), t ? n ? q() : J = R.run() : r === "post" ? Ft(
    R.run.bind(R),
    f && f.suspense
  ) : R.run(), ze && ze.push(Ke), Ke;
}
function cr(e, t, n) {
  const s = this.proxy, r = V(e) ? e.includes(".") ? lr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  m(t) ? o = t : (o = t.handler, n = t);
  const i = $n(this), c = Et(r, o.bind(s), n);
  return i(), c;
}
function lr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function Y(e, t = 1 / 0, n) {
  if (t <= 0 || !v(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, y(e))
    Y(e.value, t, n);
  else if (d(e))
    for (let s = 0; s < e.length; s++)
      Y(e[s], t, n);
  else if (Lt(e) || X(e))
    e.forEach((s) => {
      Y(s, t, n);
    });
  else if (Kt(e)) {
    for (const s in e)
      Y(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Y(e[s], t, n);
  }
  return e;
}
const ur = (e) => e.__isSuspense;
function ar(e, t) {
  t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : hn(e);
}
const Le = Symbol.for("v-fgt"), fr = Symbol.for("v-txt"), Pe = Symbol.for("v-cmt"), Se = [];
let C = null;
function yn(e = !1) {
  Se.push(C = e ? null : []);
}
function pr() {
  Se.pop(), C = Se[Se.length - 1] || null;
}
let de = 1;
function jt(e) {
  de += e, e < 0 && C && (C.hasOnce = !0);
}
function Rn(e) {
  return e.dynamicChildren = de > 0 ? C || Fn : null, pr(), de > 0 && C && C.push(e), e;
}
function Ur(e, t, n, s, r, o) {
  return Rn(
    Cn(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function Vn(e, t, n, s, r) {
  return Rn(
    K(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Te(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const dr = (...e) => Dn(
  ...e
), xn = ({ key: e }) => e ?? null, ye = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? V(e) || y(e) || m(e) ? { i: w, r: e, k: t, f: !!n } : e : null);
function Cn(e, t = null, n = null, s = 0, r = null, o = e === Le ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xn(t),
    ref: t && ye(t),
    scopeId: je,
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
    ctx: w
  };
  return c ? (Nt(u, n), o & 128 && e.normalize(u)) : n && (u.shapeFlag |= V(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && _("VNode created with invalid key (NaN). VNode type:", u.type), de > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  C && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && C.push(u), u;
}
const K = process.env.NODE_ENV !== "production" ? dr : Dn;
function Dn(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === vn) && (process.env.NODE_ENV !== "production" && !e && _(`Invalid vnode type when creating vnode: ${e}.`), e = Pe), Te(e)) {
    const c = Me(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Nt(c, n), de > 0 && !o && C && (c.shapeFlag & 6 ? C[C.indexOf(e)] = c : C.push(c)), c.patchFlag = -2, c;
  }
  if (Tn(e) && (e = e.__vccOpts), t) {
    t = hr(t);
    let { class: c, style: u } = t;
    c && !V(c) && (t.class = it(c)), v(u) && (xe(u) && !d(u) && (u = D({}, u)), t.style = ot(u));
  }
  const i = V(e) ? 1 : ur(e) ? 128 : rr(e) ? 64 : v(e) ? 4 : m(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && xe(e) && (e = a(e), _(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Cn(
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
function hr(e) {
  return e ? xe(e) || Sn(e) ? D({}, e) : e : null;
}
function Me(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: u } = e, f = t ? gr(r || {}, t) : r, g = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && xn(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? d(o) ? o.concat(ye(t)) : [o, ye(t)] : ye(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && d(c) ? c.map(In) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Le ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Me(e.ssContent),
    ssFallback: e.ssFallback && Me(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && s && En(
    g,
    u.clone(g)
  ), g;
}
function In(e) {
  const t = Me(e);
  return d(e.children) && (t.children = e.children.map(In)), t;
}
function _r(e = " ", t = 0) {
  return K(fr, null, e, t);
}
function Wr(e = "", t = !1) {
  return t ? (yn(), Vn(Pe, null, e)) : K(Pe, null, e);
}
function Nt(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (d(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Nt(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Sn(t) ? t._ctx = w : r === 3 && w && (w.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else m(t) ? (t = { default: t, _ctx: w }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [_r(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function gr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = it([t.class, s.class]));
      else if (r === "style")
        t.style = ot([t.style, s.style]);
      else if (jn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(d(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let F = null;
const mr = () => F || w;
let nt;
{
  const e = Ut(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  nt = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => F = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => He = n
  );
}
const $n = (e) => {
  const t = F;
  return nt(e), e.scope.on(), () => {
    e.scope.off(), nt(t);
  };
};
function Er(e) {
  return e.vnode.shapeFlag & 4;
}
let He = !1;
process.env.NODE_ENV;
function Nr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Rs(Ns(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in ue)
        return ue[n](e);
    },
    has(t, n) {
      return n in t || n in ue;
    }
  })) : e.proxy;
}
const wr = /(?:^|[-_])(\w)/g, vr = (e) => e.replace(wr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function wt(e, t = !0) {
  return m(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Pn(e, t, n = !1) {
  let s = wt(t);
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
  return s ? vr(s) : n ? "App" : "Anonymous";
}
function Tn(e) {
  return m(e) && "__vccOpts" in e;
}
const Br = (e, t) => {
  const n = vs(e, t, He);
  if (process.env.NODE_ENV !== "production") {
    const s = mr();
    s && s.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Jr(e, t, n) {
  const s = arguments.length;
  return s === 2 ? v(t) && !d(t) ? Te(t) ? K(e, null, [t]) : K(e, t) : K(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Te(n) && (n = [n]), K(e, t, n));
}
function br() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(l) {
      return v(l) ? l.__isVue ? ["div", e, "VueInstance"] : y(l) ? [
        "div",
        {},
        ["span", e, g(l)],
        "<",
        c(l.value),
        ">"
      ] : se(l) ? [
        "div",
        {},
        ["span", e, M(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${A(l) ? " (readonly)" : ""}`
      ] : A(l) ? [
        "div",
        {},
        ["span", e, M(l) ? "ShallowReadonly" : "Readonly"],
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
    const p = [];
    l.type.props && l.props && p.push(i("props", a(l.props))), l.setupState !== P && p.push(i("setup", l.setupState)), l.data !== P && p.push(i("data", a(l.data)));
    const E = u(l, "computed");
    E && p.push(i("computed", E));
    const b = u(l, "inject");
    return b && p.push(i("injected", b)), p.push([
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
    ]), p;
  }
  function i(l, p) {
    return p = D({}, p), Object.keys(p).length ? [
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
        ...Object.keys(p).map((E) => [
          "div",
          {},
          ["span", s, E + ": "],
          c(p[E], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, p = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : v(l) ? ["object", { object: p ? a(l) : l }] : ["span", n, String(l)];
  }
  function u(l, p) {
    const E = l.type;
    if (m(E))
      return;
    const b = {};
    for (const $ in l.ctx)
      f(E, $, p) && (b[$] = l.ctx[$]);
    return b;
  }
  function f(l, p, E) {
    const b = l[E];
    if (d(b) && b.includes(p) || v(b) && p in b || l.extends && f(l.extends, p, E) || l.mixins && l.mixins.some(($) => f($, p, E)))
      return !0;
  }
  function g(l) {
    return M(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
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
function Or() {
  br();
}
process.env.NODE_ENV !== "production" && Or();
export {
  Cn as A,
  xr as B,
  Rr as C,
  zr as D,
  Fr as E,
  Mr as F,
  jr as G,
  Le as H,
  Yn as I,
  on as J,
  Ns as K,
  Sr as L,
  se as M,
  Cr as N,
  a as O,
  Hr as P,
  K as a,
  _r as b,
  Ur as c,
  Pr as d,
  js as e,
  Tr as f,
  Zn as g,
  Jr as h,
  yr as i,
  mr as j,
  Br as k,
  bs as l,
  nr as m,
  ot as n,
  yn as o,
  Vr as p,
  Ar as q,
  Lr as r,
  Vn as s,
  $r as t,
  Ss as u,
  y as v,
  Kr as w,
  Wr as x,
  Dr as y,
  Ir as z
};
