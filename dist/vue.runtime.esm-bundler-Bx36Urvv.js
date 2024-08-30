/**
* @vue/shared v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function hr(e, t) {
  const n = new Set(e.split(","));
  return (r) => n.has(r);
}
const U = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, _r = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], le = () => {
}, gr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), L = Object.assign, ln = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, mr = Object.prototype.hasOwnProperty, V = (e, t) => mr.call(e, t), N = Array.isArray, ae = (e) => tt(e) === "[object Map]", an = (e) => tt(e) === "[object Set]", v = (e) => typeof e == "function", R = (e) => typeof e == "string", ge = (e) => typeof e == "symbol", D = (e) => e !== null && typeof e == "object", Er = (e) => (D(e) || v(e)) && v(e.then) && v(e.catch), un = Object.prototype.toString, tt = (e) => un.call(e), fn = (e) => tt(e).slice(8, -1), pn = (e) => tt(e) === "[object Object]", Ot = (e) => R(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, St = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Nr = /-(\w)/g, Ge = St((e) => e.replace(Nr, (t, n) => n ? n.toUpperCase() : "")), Se = St((e) => e.charAt(0).toUpperCase() + e.slice(1)), vr = St((e) => e ? `on${Se(e)}` : ""), oe = (e, t) => !Object.is(e, t), yr = (e, t, n, r = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: r,
    value: n
  });
}, ao = (e) => {
  const t = R(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Kt;
const dn = () => Kt || (Kt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function nt(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = R(r) ? Sr(r) : nt(r);
      if (s)
        for (const o in s)
          t[o] = s[o];
    }
    return t;
  } else if (R(e) || D(e))
    return e;
}
const wr = /;(?![^(]*\))/g, br = /:([^]+)/, Or = /\/\*[^]*?\*\//g;
function Sr(e) {
  const t = {};
  return e.replace(Or, "").split(wr).forEach((n) => {
    if (n) {
      const r = n.split(br);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function rt(e) {
  let t = "";
  if (R(e))
    t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const r = rt(e[n]);
      r && (t += r + " ");
    }
  else if (D(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function uo(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !R(t) && (e.class = rt(t)), n && (e.style = nt(n)), e;
}
const hn = (e) => !!(e && e.__v_isRef === !0), Vr = (e) => R(e) ? e : e == null ? "" : N(e) || D(e) && (e.toString === un || !v(e.toString)) ? hn(e) ? Vr(e.value) : JSON.stringify(e, _n, 2) : String(e), _n = (e, t) => hn(t) ? _n(e, t.value) : ae(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [r, s], o) => (n[ct(r, o) + " =>"] = s, n),
    {}
  )
} : an(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => ct(n))
} : ge(t) ? ct(t) : D(t) && !N(t) && !pn(t) ? String(t) : t, ct = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ge(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function G(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let M;
class Cr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = M, !t && M && (this.index = (M.scopes || (M.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = M;
      try {
        return M = this, t();
      } finally {
        M = n;
      }
    } else process.env.NODE_ENV !== "production" && G("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    M = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    M = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function fo(e) {
  return new Cr(e);
}
function Dr(e, t = M) {
  t && t.active && t.effects.push(e);
}
function Rr() {
  return M;
}
function po(e) {
  M ? M.cleanups.push(e) : process.env.NODE_ENV !== "production" && G(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let ue;
class gn {
  constructor(t, n, r, s) {
    this.fn = t, this.trigger = n, this.scheduler = r, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Dr(this, s);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Re();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Tr(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Te();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = re, n = ue;
    try {
      return re = !0, ue = this, this._runnings++, Ut(this), this.fn();
    } finally {
      Bt(this), this._runnings--, ue = n, re = t;
    }
  }
  stop() {
    this.active && (Ut(this), Bt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Tr(e) {
  return e.value;
}
function Ut(e) {
  e._trackId++, e._depsLength = 0;
}
function Bt(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      mn(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function mn(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let re = !0, pt = 0;
const En = [];
function Re() {
  En.push(re), re = !1;
}
function Te() {
  const e = En.pop();
  re = e === void 0 ? !0 : e;
}
function Vt() {
  pt++;
}
function Ct() {
  for (pt--; !pt && dt.length; )
    dt.shift()();
}
function Nn(e, t, n) {
  var r;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const s = e.deps[e._depsLength];
    s !== t ? (s && mn(s, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((r = e.onTrack) == null || r.call(e, L({ effect: e }, n)));
  }
}
const dt = [];
function vn(e, t, n) {
  var r;
  Vt();
  for (const s of e.keys()) {
    let o;
    s._dirtyLevel < t && (o ?? (o = e.get(s) === s._trackId)) && (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0), s._dirtyLevel = t), s._shouldSchedule && (o ?? (o = e.get(s) === s._trackId)) && (process.env.NODE_ENV !== "production" && ((r = s.onTrigger) == null || r.call(s, L({ effect: s }, n))), s.trigger(), (!s._runnings || s.allowRecurse) && s._dirtyLevel !== 2 && (s._shouldSchedule = !1, s.scheduler && dt.push(s.scheduler)));
  }
  Ct();
}
const yn = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, ke = /* @__PURE__ */ new WeakMap(), fe = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), ht = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
function T(e, t, n) {
  if (re && ue) {
    let r = ke.get(e);
    r || ke.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = yn(() => r.delete(n))), Nn(
      ue,
      s,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function se(e, t, n, r, s, o) {
  const i = ke.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && N(e)) {
    const a = Number(r);
    i.forEach((f, _) => {
      (_ === "length" || !ge(_) && _ >= a) && c.push(f);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        N(e) ? Ot(n) && c.push(i.get("length")) : (c.push(i.get(fe)), ae(e) && c.push(i.get(ht)));
        break;
      case "delete":
        N(e) || (c.push(i.get(fe)), ae(e) && c.push(i.get(ht)));
        break;
      case "set":
        ae(e) && c.push(i.get(fe));
        break;
    }
  Vt();
  for (const a of c)
    a && vn(
      a,
      4,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: r,
        oldValue: s,
        oldTarget: o
      } : void 0
    );
  Ct();
}
function xr(e, t) {
  const n = ke.get(e);
  return n && n.get(t);
}
const Ir = /* @__PURE__ */ hr("__proto__,__v_isRef,__isVue"), wn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ge)
), zt = /* @__PURE__ */ Ar();
function Ar() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = m(this);
      for (let o = 0, i = this.length; o < i; o++)
        T(r, "get", o + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(m)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Re(), Vt();
      const r = m(this)[t].apply(this, n);
      return Ct(), Te(), r;
    };
  }), e;
}
function $r(e) {
  ge(e) || (e = String(e));
  const t = m(this);
  return T(t, "has", e), t.hasOwnProperty(e);
}
class bn {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    const s = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return r === (s ? o ? Dn : Cn : o ? kr : Vn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const i = N(t);
    if (!s) {
      if (i && V(zt, n))
        return Reflect.get(zt, n, r);
      if (n === "hasOwnProperty")
        return $r;
    }
    const c = Reflect.get(t, n, r);
    return (ge(n) ? wn.has(n) : Ir(n)) || (s || T(t, "get", n), o) ? c : A(c) ? i && Ot(n) ? c : c.value : D(c) ? s ? Tn(c) : Rn(c) : c;
  }
}
class Pr extends bn {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (!this._isShallow) {
      const a = J(o);
      if (!k(r) && !J(r) && (o = m(o), r = m(r)), !N(t) && A(o) && !A(r))
        return a ? !1 : (o.value = r, !0);
    }
    const i = N(t) && Ot(n) ? Number(n) < t.length : V(t, n), c = Reflect.set(t, n, r, s);
    return t === m(s) && (i ? oe(r, o) && se(t, "set", n, r, o) : se(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = V(t, n), s = t[n], o = Reflect.deleteProperty(t, n);
    return o && r && se(t, "delete", n, void 0, s), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ge(n) || !wn.has(n)) && T(t, "has", n), r;
  }
  ownKeys(t) {
    return T(
      t,
      "iterate",
      N(t) ? "length" : fe
    ), Reflect.ownKeys(t);
  }
}
class On extends bn {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && G(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && G(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Mr = /* @__PURE__ */ new Pr(), Fr = /* @__PURE__ */ new On(), Lr = /* @__PURE__ */ new On(!0), Dt = (e) => e, st = (e) => Reflect.getPrototypeOf(e);
function $e(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = m(e), o = m(t);
  n || (oe(t, o) && T(s, "get", t), T(s, "get", o));
  const { has: i } = st(s), c = r ? Dt : n ? xt : Ve;
  if (i.call(s, t))
    return c(e.get(t));
  if (i.call(s, o))
    return c(e.get(o));
  e !== s && e.get(t);
}
function Pe(e, t = !1) {
  const n = this.__v_raw, r = m(n), s = m(e);
  return t || (oe(e, s) && T(r, "has", e), T(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function Me(e, t = !1) {
  return e = e.__v_raw, !t && T(m(e), "iterate", fe), Reflect.get(e, "size", e);
}
function Wt(e, t = !1) {
  !t && !k(e) && !J(e) && (e = m(e));
  const n = m(this);
  return st(n).has.call(n, e) || (n.add(e), se(n, "add", e, e)), this;
}
function Gt(e, t, n = !1) {
  !n && !k(t) && !J(t) && (t = m(t));
  const r = m(this), { has: s, get: o } = st(r);
  let i = s.call(r, e);
  i ? process.env.NODE_ENV !== "production" && Sn(r, s, e) : (e = m(e), i = s.call(r, e));
  const c = o.call(r, e);
  return r.set(e, t), i ? oe(t, c) && se(r, "set", e, t, c) : se(r, "add", e, t), this;
}
function kt(e) {
  const t = m(this), { has: n, get: r } = st(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && Sn(t, n, e) : (e = m(e), s = n.call(t, e));
  const o = r ? r.call(t, e) : void 0, i = t.delete(e);
  return s && se(t, "delete", e, void 0, o), i;
}
function Jt() {
  const e = m(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? ae(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && se(e, "clear", void 0, void 0, n), r;
}
function Fe(e, t) {
  return function(r, s) {
    const o = this, i = o.__v_raw, c = m(i), a = t ? Dt : e ? xt : Ve;
    return !e && T(c, "iterate", fe), i.forEach((f, _) => r.call(s, a(f), a(_), o));
  };
}
function Le(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, o = m(s), i = ae(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = s[e](...r), _ = n ? Dt : t ? xt : Ve;
    return !t && T(
      o,
      "iterate",
      a ? ht : fe
    ), {
      // iterator protocol
      next() {
        const { value: l, done: u } = f.next();
        return u ? { value: l, done: u } : {
          value: c ? [_(l[0]), _(l[1])] : _(l),
          done: u
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Y(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      G(
        `${Se(e)} operation ${n}failed: target is readonly.`,
        m(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function jr() {
  const e = {
    get(o) {
      return $e(this, o);
    },
    get size() {
      return Me(this);
    },
    has: Pe,
    add: Wt,
    set: Gt,
    delete: kt,
    clear: Jt,
    forEach: Fe(!1, !1)
  }, t = {
    get(o) {
      return $e(this, o, !1, !0);
    },
    get size() {
      return Me(this);
    },
    has: Pe,
    add(o) {
      return Wt.call(this, o, !0);
    },
    set(o, i) {
      return Gt.call(this, o, i, !0);
    },
    delete: kt,
    clear: Jt,
    forEach: Fe(!1, !0)
  }, n = {
    get(o) {
      return $e(this, o, !0);
    },
    get size() {
      return Me(this, !0);
    },
    has(o) {
      return Pe.call(this, o, !0);
    },
    add: Y("add"),
    set: Y("set"),
    delete: Y("delete"),
    clear: Y("clear"),
    forEach: Fe(!0, !1)
  }, r = {
    get(o) {
      return $e(this, o, !0, !0);
    },
    get size() {
      return Me(this, !0);
    },
    has(o) {
      return Pe.call(this, o, !0);
    },
    add: Y("add"),
    set: Y("set"),
    delete: Y("delete"),
    clear: Y("clear"),
    forEach: Fe(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    e[o] = Le(o, !1, !1), n[o] = Le(o, !0, !1), t[o] = Le(o, !1, !0), r[o] = Le(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  Hr,
  Kr,
  Ur,
  Br
] = /* @__PURE__ */ jr();
function Rt(e, t) {
  const n = t ? e ? Br : Ur : e ? Kr : Hr;
  return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(
    V(n, s) && s in r ? n : r,
    s,
    o
  );
}
const zr = {
  get: /* @__PURE__ */ Rt(!1, !1)
}, Wr = {
  get: /* @__PURE__ */ Rt(!0, !1)
}, Gr = {
  get: /* @__PURE__ */ Rt(!0, !0)
};
function Sn(e, t, n) {
  const r = m(n);
  if (r !== n && t.call(e, r)) {
    const s = fn(e);
    G(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Vn = /* @__PURE__ */ new WeakMap(), kr = /* @__PURE__ */ new WeakMap(), Cn = /* @__PURE__ */ new WeakMap(), Dn = /* @__PURE__ */ new WeakMap();
function Jr(e) {
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
function qr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Jr(fn(e));
}
function Rn(e) {
  return J(e) ? e : Tt(
    e,
    !1,
    Mr,
    zr,
    Vn
  );
}
function Tn(e) {
  return Tt(
    e,
    !0,
    Fr,
    Wr,
    Cn
  );
}
function je(e) {
  return Tt(
    e,
    !0,
    Lr,
    Gr,
    Dn
  );
}
function Tt(e, t, n, r, s) {
  if (!D(e))
    return process.env.NODE_ENV !== "production" && G(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = s.get(e);
  if (o)
    return o;
  const i = qr(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? r : n
  );
  return s.set(e, c), c;
}
function me(e) {
  return J(e) ? me(e.__v_raw) : !!(e && e.__v_isReactive);
}
function J(e) {
  return !!(e && e.__v_isReadonly);
}
function k(e) {
  return !!(e && e.__v_isShallow);
}
function Je(e) {
  return e ? !!e.__v_raw : !1;
}
function m(e) {
  const t = e && e.__v_raw;
  return t ? m(t) : e;
}
function Yr(e) {
  return Object.isExtensible(e) && yr(e, "__v_skip", !0), e;
}
const Ve = (e) => D(e) ? Rn(e) : e, xt = (e) => D(e) ? Tn(e) : e, Qr = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class xn {
  constructor(t, n, r, s) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new gn(
      () => t(this._value),
      () => be(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r;
  }
  get value() {
    const t = m(this);
    return (!t._cacheable || t.effect.dirty) && oe(t._value, t._value = t.effect.run()) && be(t, 4), It(t), t.effect._dirtyLevel >= 2 && (process.env.NODE_ENV !== "production" && this._warnRecursive && G(Qr, `

getter: `, this.getter), be(t, 2)), t._value;
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
function Xr(e, t, n = !1) {
  let r, s;
  const o = v(e);
  o ? (r = e, s = process.env.NODE_ENV !== "production" ? () => {
    G("Write operation failed: computed value is readonly");
  } : le) : (r = e.get, s = e.set);
  const i = new xn(r, s, o || !s, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
function It(e) {
  var t;
  re && ue && (e = m(e), Nn(
    ue,
    (t = e.dep) != null ? t : e.dep = yn(
      () => e.dep = void 0,
      e instanceof xn ? e : void 0
    ),
    process.env.NODE_ENV !== "production" ? {
      target: e,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function be(e, t = 4, n, r) {
  e = m(e);
  const s = e.dep;
  s && vn(
    s,
    t,
    process.env.NODE_ENV !== "production" ? {
      target: e,
      type: "set",
      key: "value",
      newValue: n,
      oldValue: r
    } : void 0
  );
}
function A(e) {
  return !!(e && e.__v_isRef === !0);
}
function Zr(e) {
  return In(e, !1);
}
function ho(e) {
  return In(e, !0);
}
function In(e, t) {
  return A(e) ? e : new es(e, t);
}
class es {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : m(t), this._value = n ? t : Ve(t);
  }
  get value() {
    return It(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || k(t) || J(t);
    if (t = n ? t : m(t), oe(t, this._rawValue)) {
      const r = this._rawValue;
      this._rawValue = t, this._value = n ? t : Ve(t), be(this, 4, t, r);
    }
  }
}
function ts(e) {
  return A(e) ? e.value : e;
}
const ns = {
  get: (e, t, n) => ts(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return A(s) && !A(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function rs(e) {
  return me(e) ? e : new Proxy(e, ns);
}
class ss {
  constructor(t) {
    this.dep = void 0, this.__v_isRef = !0;
    const { get: n, set: r } = t(
      () => It(this),
      () => be(this)
    );
    this._get = n, this._set = r;
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function _o(e) {
  return new ss(e);
}
function go(e) {
  process.env.NODE_ENV !== "production" && !Je(e) && G("toRefs() expects a reactive object but received a plain one.");
  const t = N(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = An(e, n);
  return t;
}
class os {
  constructor(t, n, r) {
    this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return xr(m(this._object), this._key);
  }
}
class is {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function mo(e, t, n) {
  return A(e) ? e : v(e) ? new is(e) : D(e) && arguments.length > 1 ? An(e, t, n) : Zr(e);
}
function An(e, t, n) {
  const r = e[t];
  return A(r) ? r : new os(e, t, n);
}
/**
* @vue/runtime-core v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const pe = [];
function cs(e) {
  pe.push(e);
}
function ls() {
  pe.pop();
}
let lt = !1;
function h(e, ...t) {
  if (lt) return;
  lt = !0, Re();
  const n = pe.length ? pe[pe.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = as();
  if (r)
    de(
      r,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        s.map(
          ({ vnode: o }) => `at <${fr(n, o.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    s.length && o.push(`
`, ...us(s)), console.warn(...o);
  }
  Te(), lt = !1;
}
function as() {
  let e = pe[pe.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function us(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...fs(n));
  }), t;
}
function fs({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${fr(
    e.component,
    e.type,
    r
  )}`, o = ">" + n;
  return e.props ? [s, ...ps(e.props), o] : [s + o];
}
function ps(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...$n(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function $n(e, t, n) {
  return R(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : A(t) ? (t = $n(e, m(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : v(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = m(t), n ? t : [`${e}=`, t]);
}
function Eo(e, t) {
  process.env.NODE_ENV !== "production" && e !== void 0 && (typeof e != "number" ? h(`${t} is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && h(`${t} is NaN - the duration expression might be incorrect.`));
}
const At = {
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
function de(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    $t(s, t, n);
  }
}
function Ee(e, t, n, r) {
  if (v(e)) {
    const s = de(e, t, n, r);
    return s && Er(s) && s.catch((o) => {
      $t(o, t, n);
    }), s;
  }
  if (N(e)) {
    const s = [];
    for (let o = 0; o < e.length; o++)
      s.push(Ee(e[o], t, n, r));
    return s;
  } else process.env.NODE_ENV !== "production" && h(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function $t(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? At[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let _ = 0; _ < f.length; _++)
          if (f[_](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Re(), de(
        a,
        null,
        10,
        [e, i, c]
      ), Te();
      return;
    }
  }
  ds(e, n, s, r);
}
function ds(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = At[t];
    if (n && cs(n), h(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && ls(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let qe = !1, _t = !1;
const B = [];
let Z = 0;
const Ne = [];
let Q = null, ce = 0;
const Pn = /* @__PURE__ */ Promise.resolve();
let Pt = null;
const hs = 100;
function _s(e) {
  const t = Pt || Pn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function gs(e) {
  let t = Z + 1, n = B.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = B[r], o = Ce(s);
    o < e || o === e && s.pre ? t = r + 1 : n = r;
  }
  return t;
}
function Mt(e) {
  (!B.length || !B.includes(
    e,
    qe && e.allowRecurse ? Z + 1 : Z
  )) && (e.id == null ? B.push(e) : B.splice(gs(e.id), 0, e), Mn());
}
function Mn() {
  !qe && !_t && (_t = !0, Pt = Pn.then(Ln));
}
function Fn(e) {
  N(e) ? Ne.push(...e) : (!Q || !Q.includes(
    e,
    e.allowRecurse ? ce + 1 : ce
  )) && Ne.push(e), Mn();
}
function ms(e) {
  if (Ne.length) {
    const t = [...new Set(Ne)].sort(
      (n, r) => Ce(n) - Ce(r)
    );
    if (Ne.length = 0, Q) {
      Q.push(...t);
      return;
    }
    for (Q = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ce = 0; ce < Q.length; ce++) {
      const n = Q[ce];
      process.env.NODE_ENV !== "production" && jn(e, n) || n.active !== !1 && n();
    }
    Q = null, ce = 0;
  }
}
const Ce = (e) => e.id == null ? 1 / 0 : e.id, Es = (e, t) => {
  const n = Ce(e) - Ce(t);
  if (n === 0) {
    if (e.pre && !t.pre) return -1;
    if (t.pre && !e.pre) return 1;
  }
  return n;
};
function Ln(e) {
  _t = !1, qe = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), B.sort(Es);
  const t = process.env.NODE_ENV !== "production" ? (n) => jn(e, n) : le;
  try {
    for (Z = 0; Z < B.length; Z++) {
      const n = B[Z];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        de(
          n,
          n.i,
          n.i ? 15 : 14
        );
      }
    }
  } finally {
    Z = 0, B.length = 0, ms(e), qe = !1, Pt = null, (B.length || Ne.length) && Ln(e);
  }
}
function jn(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > hs) {
      const r = t.i, s = r && Ht(r.type);
      return $t(
        `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
let gt = !1;
const Be = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (dn().__VUE_HMR_RUNTIME__ = {
  createRecord: at(Ns),
  rerender: at(vs),
  reload: at(ys)
});
const Ye = /* @__PURE__ */ new Map();
function Ns(e, t) {
  return Ye.has(e) ? !1 : (Ye.set(e, {
    initialDef: Qe(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Qe(e) {
  return pr(e) ? e.__vccOpts : e;
}
function vs(e, t) {
  const n = Ye.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, Qe(r.type).render = t), r.renderCache = [], gt = !0, r.effect.dirty = !0, r.update(), gt = !1;
  }));
}
function ys(e, t) {
  const n = Ye.get(e);
  if (!n) return;
  t = Qe(t), qt(n.initialDef, t);
  const r = [...n.instances];
  for (let s = 0; s < r.length; s++) {
    const o = r[s], i = Qe(o.type);
    let c = Be.get(i);
    c || (i !== n.initialDef && qt(i, t), Be.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? (o.parent.effect.dirty = !0, Mt(() => {
      o.parent.update(), c.delete(o);
    })) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Fn(() => {
    Be.clear();
  });
}
function qt(e, t) {
  L(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function at(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let ee, ye = [], mt = !1;
function ws(e, ...t) {
  ee ? ee.emit(e, ...t) : mt || ye.push({ event: e, args: t });
}
function Hn(e, t) {
  var n, r;
  ee = e, ee ? (ee.enabled = !0, ye.forEach(({ event: s, args: o }) => ee.emit(s, ...o)), ye = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    Hn(o, t);
  }), setTimeout(() => {
    ee || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, mt = !0, ye = []);
  }, 3e3)) : (mt = !0, ye = []);
}
const bs = /* @__PURE__ */ Os(
  "component:updated"
  /* COMPONENT_UPDATED */
);
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Os(e) {
  return (t) => {
    ws(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
let O = null, Kn = null;
function Yt(e) {
  const t = O;
  return O = e, Kn = e && e.type.__scopeId || null, t;
}
function No(e, t = O, n) {
  if (!t || e._n)
    return e;
  const r = (...s) => {
    r._d && cn(-1);
    const o = Yt(t);
    let i;
    try {
      i = e(...s);
    } finally {
      Yt(o), r._d && cn(1);
    }
    return process.env.NODE_ENV !== "production" && bs(t), i;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function vo(e, t) {
  if (O === null)
    return process.env.NODE_ENV !== "production" && h("withDirectives can only be used inside render functions."), e;
  const n = ur(O), r = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [o, i, c, a = U] = t[s];
    o && (v(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && te(i), r.push({
      dir: o,
      instance: n,
      value: i,
      oldValue: void 0,
      arg: c,
      modifiers: a
    }));
  }
  return e;
}
const X = Symbol("_leaveCb"), He = Symbol("_enterCb");
function Ss() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Ts(() => {
    e.isMounted = !0;
  }), xs(() => {
    e.isUnmounting = !0;
  }), e;
}
const H = [Function, Array], Vs = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: H,
  onEnter: H,
  onAfterEnter: H,
  onEnterCancelled: H,
  // leave
  onBeforeLeave: H,
  onLeave: H,
  onAfterLeave: H,
  onLeaveCancelled: H,
  // appear
  onBeforeAppear: H,
  onAppear: H,
  onAfterAppear: H,
  onAppearCancelled: H
}, Un = (e) => {
  const t = e.subTree;
  return t.component ? Un(t.component) : t;
}, Cs = {
  name: "BaseTransition",
  props: Vs,
  setup(e, { slots: t }) {
    const n = lr(), r = Ss();
    return () => {
      const s = t.default && zn(t.default(), !0);
      if (!s || !s.length)
        return;
      let o = s[0];
      if (s.length > 1) {
        let u = !1;
        for (const d of s)
          if (d.type !== z) {
            if (process.env.NODE_ENV !== "production" && u) {
              h(
                "<transition> can only be used on a single element or component. Use <transition-group> for lists."
              );
              break;
            }
            if (o = d, u = !0, process.env.NODE_ENV === "production") break;
          }
      }
      const i = m(e), { mode: c } = i;
      if (process.env.NODE_ENV !== "production" && c && c !== "in-out" && c !== "out-in" && c !== "default" && h(`invalid <transition> mode: ${c}`), r.isLeaving)
        return ut(o);
      const a = Qt(o);
      if (!a)
        return ut(o);
      let f = Et(
        a,
        i,
        r,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (u) => f = u
      );
      Xe(a, f);
      const _ = n.subTree, l = _ && Qt(_);
      if (l && l.type !== z && !rr(a, l) && Un(n).type !== z) {
        const u = Et(
          l,
          i,
          r,
          n
        );
        if (Xe(l, u), c === "out-in" && a.type !== z)
          return r.isLeaving = !0, u.afterLeave = () => {
            r.isLeaving = !1, n.update.active !== !1 && (n.effect.dirty = !0, n.update());
          }, ut(o);
        c === "in-out" && a.type !== z && (u.delayLeave = (d, g, y) => {
          const W = Bn(
            r,
            l
          );
          W[String(l.key)] = l, d[X] = () => {
            g(), d[X] = void 0, delete f.delayedLeave;
          }, f.delayedLeave = y;
        });
      }
      return o;
    };
  }
}, yo = Cs;
function Bn(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Et(e, t, n, r, s) {
  const {
    appear: o,
    mode: i,
    persisted: c = !1,
    onBeforeEnter: a,
    onEnter: f,
    onAfterEnter: _,
    onEnterCancelled: l,
    onBeforeLeave: u,
    onLeave: d,
    onAfterLeave: g,
    onLeaveCancelled: y,
    onBeforeAppear: W,
    onAppear: P,
    onAfterAppear: K,
    onAppearCancelled: q
  } = t, S = String(e.key), j = Bn(n, e), w = (E, b) => {
    E && Ee(
      E,
      r,
      9,
      b
    );
  }, p = (E, b) => {
    const C = b[1];
    w(E, b), N(E) ? E.every((ie) => ie.length <= 1) && C() : E.length <= 1 && C();
  }, $ = {
    mode: i,
    persisted: c,
    beforeEnter(E) {
      let b = a;
      if (!n.isMounted)
        if (o)
          b = W || a;
        else
          return;
      E[X] && E[X](
        !0
        /* cancelled */
      );
      const C = j[S];
      C && rr(e, C) && C.el[X] && C.el[X](), w(b, [E]);
    },
    enter(E) {
      let b = f, C = _, ie = l;
      if (!n.isMounted)
        if (o)
          b = P || f, C = K || _, ie = q || l;
        else
          return;
      let ve = !1;
      const Ae = E[He] = (dr) => {
        ve || (ve = !0, dr ? w(ie, [E]) : w(C, [E]), $.delayedLeave && $.delayedLeave(), E[He] = void 0);
      };
      b ? p(b, [E, Ae]) : Ae();
    },
    leave(E, b) {
      const C = String(e.key);
      if (E[He] && E[He](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return b();
      w(u, [E]);
      let ie = !1;
      const ve = E[X] = (Ae) => {
        ie || (ie = !0, b(), Ae ? w(y, [E]) : w(g, [E]), E[X] = void 0, j[C] === e && delete j[C]);
      };
      j[C] = e, d ? p(d, [E, ve]) : ve();
    },
    clone(E) {
      const b = Et(
        E,
        t,
        n,
        r,
        s
      );
      return s && s(b), b;
    }
  };
  return $;
}
function ut(e) {
  if (Ft(e))
    return e = _e(e), e.children = null, e;
}
function Qt(e) {
  if (!Ft(e))
    return e;
  if (process.env.NODE_ENV !== "production" && e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && v(n.default))
      return n.default();
  }
}
function Xe(e, t) {
  e.shapeFlag & 6 && e.component ? Xe(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function zn(e, t = !1, n) {
  let r = [], s = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const c = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === Ie ? (i.patchFlag & 128 && s++, r = r.concat(
      zn(i.children, t, c)
    )) : (t || i.type !== z) && r.push(c != null ? _e(i, { key: c }) : i);
  }
  if (s > 1)
    for (let o = 0; o < r.length; o++)
      r[o].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function wo(e, t) {
  return v(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    L({ name: e.name }, t, { setup: e })
  ) : e;
}
const Ds = (e) => !!e.type.__asyncLoader, Ft = (e) => e.type.__isKeepAlive;
function bo(e, t) {
  Wn(e, "a", t);
}
function Oo(e, t) {
  Wn(e, "da", t);
}
function Wn(e, t, n = I) {
  const r = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Lt(t, r, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Ft(s.parent.vnode) && Rs(r, t, n, s), s = s.parent;
  }
}
function Rs(e, t, n, r) {
  const s = Lt(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  Is(() => {
    ln(r[t], s);
  }, n);
}
function Lt(e, t, n = I, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      Re();
      const c = ar(n), a = Ee(t, n, e, i);
      return c(), Te(), a;
    });
    return r ? s.unshift(o) : s.push(o), o;
  } else if (process.env.NODE_ENV !== "production") {
    const s = vr(At[e].replace(/ hook$/, ""));
    h(
      `${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const xe = (e) => (t, n = I) => {
  (!it || e === "sp") && Lt(e, (...r) => t(...r), n);
}, So = xe("bm"), Ts = xe("m"), Vo = xe("u"), xs = xe("bum"), Is = xe("um"), Nt = "components", As = "directives", Gn = Symbol.for("v-ndc");
function Co(e) {
  return R(e) ? kn(Nt, e, !1) || e : e || Gn;
}
function Do(e) {
  return kn(As, e);
}
function kn(e, t, n = !0, r = !1) {
  const s = O || I;
  if (s) {
    const o = s.type;
    if (e === Nt) {
      const c = Ht(
        o,
        !1
      );
      if (c && (c === t || c === Ge(t) || c === Se(Ge(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Xt(s[e] || o[e], t) || // global registration
      Xt(s.appContext[e], t)
    );
    if (!i && r)
      return o;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const c = e === Nt ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      h(`Failed to resolve ${e.slice(0, -1)}: ${t}${c}`);
    }
    return i;
  } else process.env.NODE_ENV !== "production" && h(
    `resolve${Se(e.slice(0, -1))} can only be used in render() or setup().`
  );
}
function Xt(e, t) {
  return e && (e[t] || e[Ge(t)] || e[Se(Ge(t))]);
}
function Ro(e, t, n, r) {
  let s;
  const o = n;
  if (N(e) || R(e)) {
    s = new Array(e.length);
    for (let i = 0, c = e.length; i < c; i++)
      s[i] = t(e[i], i, void 0, o);
  } else {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && h(`The v-for range expect an integer value but got ${e}.`), s = new Array(e);
    for (let i = 0; i < e; i++)
      s[i] = t(i + 1, i, void 0, o);
  }
  return s;
}
function To(e, t, n = {}, r, s) {
  if (O.isCE || O.parent && Ds(O.parent) && O.parent.isCE)
    return ne("slot", n, r);
  let o = e[t];
  process.env.NODE_ENV !== "production" && o && o.length > 1 && (h(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), o = () => []), o && o._c && (o._d = !1), er();
  const i = o && Jn(o(n)), c = nr(
    Ie,
    {
      key: (n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && r ? "_fb" : "")
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function Jn(e) {
  return e.some((t) => et(t) ? !(t.type === z || t.type === Ie && !Jn(t.children)) : !0) ? e : null;
}
const vt = (e) => e ? so(e) ? ur(e) : vt(e.parent) : null, Oe = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ L(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? je(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? je(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? je(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? je(e.refs) : e.refs,
    $parent: (e) => vt(e.parent),
    $root: (e) => vt(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ms(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Mt(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = _s.bind(e.proxy)),
    $watch: (e) => Js.bind(e)
  })
), $s = (e) => e === "_" || e === "$", ft = (e, t) => e !== U && !e.__isScriptSetup && V(e, t), Ps = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
    if (t[0] !== "$") {
      const d = i[t];
      if (d !== void 0)
        switch (d) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (ft(r, t))
          return i[t] = 1, r[t];
        if (s !== U && V(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && V(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== U && V(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const _ = Oe[t];
    let l, u;
    if (_)
      return t === "$attrs" ? (T(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && T(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== U && V(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, V(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && O && (!R(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== U && $s(t[0]) && V(s, t) ? h(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === O && h(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: o } = e;
    return ft(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && V(s, t) ? (h(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== U && V(r, t) ? (r[t] = n, !0) : V(e.props, t) ? (process.env.NODE_ENV !== "production" && h(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && h(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== U && V(e, i) || ft(t, i) || (c = o[0]) && V(c, i) || V(r, i) || V(Oe, i) || V(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : V(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Ps.ownKeys = (e) => (h(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Zt(e) {
  return N(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Ms(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: s,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !s.length && !n && !r ? a = t : (a = {}, s.length && s.forEach(
    (f) => Ze(a, f, i, !0)
  ), Ze(a, t, i)), D(t) && o.set(t, a), a;
}
function Ze(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Ze(e, o, n, !0), s && s.forEach(
    (i) => Ze(e, i, n, !0)
  );
  for (const i in t)
    if (r && i === "expose")
      process.env.NODE_ENV !== "production" && h(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = Fs[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Fs = {
  data: en,
  props: nn,
  emits: nn,
  // objects
  methods: we,
  computed: we,
  // lifecycle
  beforeCreate: x,
  created: x,
  beforeMount: x,
  mounted: x,
  beforeUpdate: x,
  updated: x,
  beforeDestroy: x,
  beforeUnmount: x,
  destroyed: x,
  unmounted: x,
  activated: x,
  deactivated: x,
  errorCaptured: x,
  serverPrefetch: x,
  // assets
  components: we,
  directives: we,
  // watch
  watch: js,
  // provide / inject
  provide: en,
  inject: Ls
};
function en(e, t) {
  return t ? e ? function() {
    return L(
      v(e) ? e.call(this, this) : e,
      v(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ls(e, t) {
  return we(tn(e), tn(t));
}
function tn(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function x(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function we(e, t) {
  return e ? L(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function nn(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : L(
    /* @__PURE__ */ Object.create(null),
    Zt(e),
    Zt(t ?? {})
  ) : t;
}
function js(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = L(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = x(e[r], t[r]);
  return n;
}
let yt = null;
function xo(e, t) {
  if (!I)
    process.env.NODE_ENV !== "production" && h("provide() can only be used inside setup().");
  else {
    let n = I.provides;
    const r = I.parent && I.parent.provides;
    r === n && (n = I.provides = Object.create(r)), n[e] = t;
  }
}
function Hs(e, t, n = !1) {
  const r = I || O;
  if (r || yt) {
    const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : yt._context.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && v(t) ? t.call(r && r.proxy) : t;
    process.env.NODE_ENV !== "production" && h(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && h("inject() can only be used inside setup() or functional components.");
}
function Io() {
  return !!(I || O || yt);
}
const Ks = {}, qn = (e) => Object.getPrototypeOf(e) === Ks, Us = Symbol("_vte"), Bs = (e) => e.__isTeleport, he = (e) => e && (e.disabled || e.disabled === ""), rn = (e) => typeof SVGElement < "u" && e instanceof SVGElement, sn = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, wt = (e, t) => {
  const n = e && e.to;
  if (R(n))
    if (t) {
      const r = t(n);
      return process.env.NODE_ENV !== "production" && !r && !he(e) && h(
        `Failed to locate Teleport target with selector "${n}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`
      ), r;
    } else
      return process.env.NODE_ENV !== "production" && h(
        "Current renderer does not support string target for Teleports. (missing querySelector renderer option)"
      ), null;
  else
    return process.env.NODE_ENV !== "production" && !n && !he(e) && h(`Invalid Teleport target: ${n}`), n;
}, zs = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, r, s, o, i, c, a, f) {
    const {
      mc: _,
      pc: l,
      pbc: u,
      o: { insert: d, querySelector: g, createText: y, createComment: W }
    } = f, P = he(t.props);
    let { shapeFlag: K, children: q, dynamicChildren: S } = t;
    if (process.env.NODE_ENV !== "production" && gt && (a = !1, S = null), e == null) {
      const j = t.el = process.env.NODE_ENV !== "production" ? W("teleport start") : y(""), w = t.anchor = process.env.NODE_ENV !== "production" ? W("teleport end") : y("");
      d(j, n, r), d(w, n, r);
      const p = t.target = wt(t.props, g), $ = Qn(p, t, y, d);
      p ? i === "svg" || rn(p) ? i = "svg" : (i === "mathml" || sn(p)) && (i = "mathml") : process.env.NODE_ENV !== "production" && !P && h("Invalid Teleport target on mount:", p, `(${typeof p})`);
      const E = (b, C) => {
        K & 16 && _(
          q,
          b,
          C,
          s,
          o,
          i,
          c,
          a
        );
      };
      P ? E(n, w) : p && E(p, $);
    } else {
      t.el = e.el, t.targetStart = e.targetStart;
      const j = t.anchor = e.anchor, w = t.target = e.target, p = t.targetAnchor = e.targetAnchor, $ = he(e.props), E = $ ? n : w, b = $ ? j : p;
      if (i === "svg" || rn(w) ? i = "svg" : (i === "mathml" || sn(w)) && (i = "mathml"), S ? (u(
        e.dynamicChildren,
        S,
        E,
        s,
        o,
        i,
        c
      ), Xn(e, t, !0)) : a || l(
        e,
        t,
        E,
        b,
        s,
        o,
        i,
        c,
        !1
      ), P)
        $ ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Ke(
          t,
          n,
          j,
          f,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const C = t.target = wt(
          t.props,
          g
        );
        C ? Ke(
          t,
          C,
          null,
          f,
          0
        ) : process.env.NODE_ENV !== "production" && h(
          "Invalid Teleport target on update:",
          w,
          `(${typeof w})`
        );
      } else $ && Ke(
        t,
        w,
        p,
        f,
        1
      );
    }
    Yn(t);
  },
  remove(e, t, n, { um: r, o: { remove: s } }, o) {
    const {
      shapeFlag: i,
      children: c,
      anchor: a,
      targetStart: f,
      targetAnchor: _,
      target: l,
      props: u
    } = e;
    if (l && (s(f), s(_)), o && s(a), i & 16) {
      const d = o || !he(u);
      for (let g = 0; g < c.length; g++) {
        const y = c[g];
        r(
          y,
          t,
          n,
          d,
          !!y.dynamicChildren
        );
      }
    }
  },
  move: Ke,
  hydrate: Ws
};
function Ke(e, t, n, { o: { insert: r }, m: s }, o = 2) {
  o === 0 && r(e.targetAnchor, t, n);
  const { el: i, anchor: c, shapeFlag: a, children: f, props: _ } = e, l = o === 2;
  if (l && r(i, t, n), (!l || he(_)) && a & 16)
    for (let u = 0; u < f.length; u++)
      s(
        f[u],
        t,
        n,
        2
      );
  l && r(c, t, n);
}
function Ws(e, t, n, r, s, o, {
  o: { nextSibling: i, parentNode: c, querySelector: a, insert: f, createText: _ }
}, l) {
  const u = t.target = wt(
    t.props,
    a
  );
  if (u) {
    const d = u._lpa || u.firstChild;
    if (t.shapeFlag & 16)
      if (he(t.props))
        t.anchor = l(
          i(e),
          t,
          c(e),
          n,
          r,
          s,
          o
        ), t.targetStart = d, t.targetAnchor = d && i(d);
      else {
        t.anchor = i(e);
        let g = d;
        for (; g; ) {
          if (g && g.nodeType === 8) {
            if (g.data === "teleport start anchor")
              t.targetStart = g;
            else if (g.data === "teleport anchor") {
              t.targetAnchor = g, u._lpa = t.targetAnchor && i(t.targetAnchor);
              break;
            }
          }
          g = i(g);
        }
        t.targetAnchor || Qn(u, t, _, f), l(
          d && i(d),
          t,
          u,
          n,
          r,
          s,
          o
        );
      }
    Yn(t);
  }
  return t.anchor && i(t.anchor);
}
const Ao = zs;
function Yn(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
function Qn(e, t, n, r) {
  const s = t.targetStart = n(""), o = t.targetAnchor = n("");
  return s[Us] = o, e && (r(s, e), r(o, e)), o;
}
const on = Qs;
function Xn(e, t, n = !1) {
  const r = e.children, s = t.children;
  if (N(r) && N(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let c = s[o];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = s[o] = no(s[o]), c.el = i.el), !n && c.patchFlag !== -2 && Xn(i, c)), c.type === Zn && (c.el = i.el), process.env.NODE_ENV !== "production" && c.type === z && !c.el && (c.el = i.el);
    }
}
const Gs = Symbol.for("v-scx"), ks = () => {
  {
    const e = Hs(Gs);
    return e || process.env.NODE_ENV !== "production" && h(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function $o(e, t) {
  return ot(e, null, t);
}
function Po(e, t) {
  return ot(
    e,
    null,
    process.env.NODE_ENV !== "production" ? L({}, t, { flush: "post" }) : { flush: "post" }
  );
}
const Ue = {};
function Mo(e, t, n) {
  return process.env.NODE_ENV !== "production" && !v(t) && h(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), ot(e, t, n);
}
function ot(e, t, {
  immediate: n,
  deep: r,
  flush: s,
  once: o,
  onTrack: i,
  onTrigger: c
} = U) {
  if (t && o) {
    const p = t;
    t = (...$) => {
      p(...$), w();
    };
  }
  process.env.NODE_ENV !== "production" && r !== void 0 && typeof r == "number" && h(
    'watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.'
  ), process.env.NODE_ENV !== "production" && !t && (n !== void 0 && h(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && h(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && h(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (p) => {
    h(
      "Invalid watch source: ",
      p,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, f = I, _ = (p) => r === !0 ? p : (
    // for deep: false, only traverse root-level properties
    te(p, r === !1 ? 1 : void 0)
  );
  let l, u = !1, d = !1;
  if (A(e) ? (l = () => e.value, u = k(e)) : me(e) ? (l = () => _(e), u = !0) : N(e) ? (d = !0, u = e.some((p) => me(p) || k(p)), l = () => e.map((p) => {
    if (A(p))
      return p.value;
    if (me(p))
      return _(p);
    if (v(p))
      return de(p, f, 2);
    process.env.NODE_ENV !== "production" && a(p);
  })) : v(e) ? t ? l = () => de(e, f, 2) : l = () => (g && g(), Ee(
    e,
    f,
    3,
    [y]
  )) : (l = le, process.env.NODE_ENV !== "production" && a(e)), t && r) {
    const p = l;
    l = () => te(p());
  }
  let g, y = (p) => {
    g = S.onStop = () => {
      de(p, f, 4), g = S.onStop = void 0;
    };
  }, W;
  if (it)
    if (y = le, t ? n && Ee(t, f, 3, [
      l(),
      d ? [] : void 0,
      y
    ]) : l(), s === "sync") {
      const p = ks();
      W = p.__watcherHandles || (p.__watcherHandles = []);
    } else
      return le;
  let P = d ? new Array(e.length).fill(Ue) : Ue;
  const K = () => {
    if (!(!S.active || !S.dirty))
      if (t) {
        const p = S.run();
        (r || u || (d ? p.some(($, E) => oe($, P[E])) : oe(p, P))) && (g && g(), Ee(t, f, 3, [
          p,
          // pass undefined as the old value when it's changed for the first time
          P === Ue ? void 0 : d && P[0] === Ue ? [] : P,
          y
        ]), P = p);
      } else
        S.run();
  };
  K.allowRecurse = !!t;
  let q;
  s === "sync" ? q = K : s === "post" ? q = () => on(K, f && f.suspense) : (K.pre = !0, f && (K.id = f.uid), q = () => Mt(K));
  const S = new gn(l, le, q), j = Rr(), w = () => {
    S.stop(), j && ln(j.effects, S);
  };
  return process.env.NODE_ENV !== "production" && (S.onTrack = i, S.onTrigger = c), t ? n ? K() : P = S.run() : s === "post" ? on(
    S.run.bind(S),
    f && f.suspense
  ) : S.run(), W && W.push(w), w;
}
function Js(e, t, n) {
  const r = this.proxy, s = R(e) ? e.includes(".") ? qs(r, e) : () => r[e] : e.bind(r, r);
  let o;
  v(t) ? o = t : (o = t.handler, n = t);
  const i = ar(this), c = ot(s, o.bind(r), n);
  return i(), c;
}
function qs(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function te(e, t = 1 / 0, n) {
  if (t <= 0 || !D(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, A(e))
    te(e.value, t, n);
  else if (N(e))
    for (let r = 0; r < e.length; r++)
      te(e[r], t, n);
  else if (an(e) || ae(e))
    e.forEach((r) => {
      te(r, t, n);
    });
  else if (pn(e)) {
    for (const r in e)
      te(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && te(e[r], t, n);
  }
  return e;
}
const Ys = (e) => e.__isSuspense;
function Qs(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : Fn(e);
}
const Ie = Symbol.for("v-fgt"), Zn = Symbol.for("v-txt"), z = Symbol.for("v-cmt"), ze = [];
let F = null;
function er(e = !1) {
  ze.push(F = e ? null : []);
}
function Xs() {
  ze.pop(), F = ze[ze.length - 1] || null;
}
let De = 1;
function cn(e) {
  De += e, e < 0 && F && (F.hasOnce = !0);
}
function tr(e) {
  return e.dynamicChildren = De > 0 ? F || _r : null, Xs(), De > 0 && F && F.push(e), e;
}
function Fo(e, t, n, r, s, o) {
  return tr(
    or(
      e,
      t,
      n,
      r,
      s,
      o,
      !0
    )
  );
}
function nr(e, t, n, r, s) {
  return tr(
    ne(
      e,
      t,
      n,
      r,
      s,
      !0
    )
  );
}
function et(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function rr(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = Be.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Zs = (...e) => ir(
  ...e
), sr = ({ key: e }) => e ?? null, We = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? R(e) || A(e) || v(e) ? { i: O, r: e, k: t, f: !!n } : e : null);
function or(e, t = null, n = null, r = 0, s = null, o = e === Ie ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && sr(t),
    ref: t && We(t),
    scopeId: Kn,
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
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: O
  };
  return c ? (jt(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= R(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && h("VNode created with invalid key (NaN). VNode type:", a.type), De > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  F && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && F.push(a), a;
}
const ne = process.env.NODE_ENV !== "production" ? Zs : ir;
function ir(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === Gn) && (process.env.NODE_ENV !== "production" && !e && h(`Invalid vnode type when creating vnode: ${e}.`), e = z), et(e)) {
    const c = _e(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && jt(c, n), De > 0 && !o && F && (c.shapeFlag & 6 ? F[F.indexOf(e)] = c : F.push(c)), c.patchFlag = -2, c;
  }
  if (pr(e) && (e = e.__vccOpts), t) {
    t = eo(t);
    let { class: c, style: a } = t;
    c && !R(c) && (t.class = rt(c)), D(a) && (Je(a) && !N(a) && (a = L({}, a)), t.style = nt(a));
  }
  const i = R(e) ? 1 : Ys(e) ? 128 : Bs(e) ? 64 : D(e) ? 4 : v(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Je(e) && (e = m(e), h(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), or(
    e,
    t,
    n,
    r,
    s,
    i,
    o,
    !0
  );
}
function eo(e) {
  return e ? Je(e) || qn(e) ? L({}, e) : e : null;
}
function _e(e, t, n = !1, r = !1) {
  const { props: s, ref: o, patchFlag: i, children: c, transition: a } = e, f = t ? ro(s || {}, t) : s, _ = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && sr(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? N(o) ? o.concat(We(t)) : [o, We(t)] : We(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && N(c) ? c.map(cr) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ie ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && _e(e.ssContent),
    ssFallback: e.ssFallback && _e(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && r && Xe(
    _,
    a.clone(_)
  ), _;
}
function cr(e) {
  const t = _e(e);
  return N(e.children) && (t.children = e.children.map(cr)), t;
}
function to(e = " ", t = 0) {
  return ne(Zn, null, e, t);
}
function Lo(e = "", t = !1) {
  return t ? (er(), nr(z, null, e)) : ne(z, null, e);
}
function no(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : _e(e);
}
function jt(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (N(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), jt(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !qn(t) ? t._ctx = O : s === 3 && O && (O.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else v(t) ? (t = { default: t, _ctx: O }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [to(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ro(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = rt([t.class, r.class]));
      else if (s === "style")
        t.style = nt([t.style, r.style]);
      else if (gr(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(N(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
let I = null;
const lr = () => I || O;
let bt;
{
  const e = dn(), t = (n, r) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(r), (o) => {
      s.length > 1 ? s.forEach((i) => i(o)) : s[0](o);
    };
  };
  bt = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => I = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => it = n
  );
}
const ar = (e) => {
  const t = I;
  return bt(e), e.scope.on(), () => {
    e.scope.off(), bt(t);
  };
};
function so(e) {
  return e.vnode.shapeFlag & 4;
}
let it = !1;
process.env.NODE_ENV;
function ur(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(rs(Yr(e.exposed)), {
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
const oo = /(?:^|[-_])(\w)/g, io = (e) => e.replace(oo, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ht(e, t = !0) {
  return v(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function fr(e, t, n = !1) {
  let r = Ht(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    r = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return r ? io(r) : n ? "App" : "Anonymous";
}
function pr(e) {
  return v(e) && "__vccOpts" in e;
}
const jo = (e, t) => {
  const n = Xr(e, t, it);
  if (process.env.NODE_ENV !== "production") {
    const r = lr();
    r && r.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Ho(e, t, n) {
  const r = arguments.length;
  return r === 2 ? D(t) && !N(t) ? et(t) ? ne(e, null, [t]) : ne(e, t) : ne(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && et(n) && (n = [n]), ne(e, t, n));
}
function co() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, s = {
    __vue_custom_formatter: !0,
    header(l) {
      return D(l) ? l.__isVue ? ["div", e, "VueInstance"] : A(l) ? [
        "div",
        {},
        ["span", e, _(l)],
        "<",
        c(l.value),
        ">"
      ] : me(l) ? [
        "div",
        {},
        ["span", e, k(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${J(l) ? " (readonly)" : ""}`
      ] : J(l) ? [
        "div",
        {},
        ["span", e, k(l) ? "ShallowReadonly" : "Readonly"],
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
    const u = [];
    l.type.props && l.props && u.push(i("props", m(l.props))), l.setupState !== U && u.push(i("setup", l.setupState)), l.data !== U && u.push(i("data", m(l.data)));
    const d = a(l, "computed");
    d && u.push(i("computed", d));
    const g = a(l, "inject");
    return g && u.push(i("injected", g)), u.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), u;
  }
  function i(l, u) {
    return u = L({}, u), Object.keys(u).length ? [
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
        ...Object.keys(u).map((d) => [
          "div",
          {},
          ["span", r, d + ": "],
          c(u[d], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, u = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", r, l] : D(l) ? ["object", { object: u ? m(l) : l }] : ["span", n, String(l)];
  }
  function a(l, u) {
    const d = l.type;
    if (v(d))
      return;
    const g = {};
    for (const y in l.ctx)
      f(d, y, u) && (g[y] = l.ctx[y]);
    return g;
  }
  function f(l, u, d) {
    const g = l[d];
    if (N(g) && g.includes(u) || D(g) && u in g || l.extends && f(l.extends, u, d) || l.mixins && l.mixins.some((y) => f(y, u, d)))
      return !0;
  }
  function _(l) {
    return k(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const Ko = process.env.NODE_ENV !== "production" ? h : le;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function lo() {
  co();
}
process.env.NODE_ENV !== "production" && lo();
export {
  No as $,
  Rr as A,
  yo as B,
  po as C,
  jo as D,
  Zr as E,
  Ie as F,
  Hs as G,
  _o as H,
  Rn as I,
  $o as J,
  go as K,
  Se as L,
  ho as M,
  xo as N,
  Ge as O,
  A as P,
  mo as Q,
  fo as R,
  xs as S,
  ro as T,
  Zn as U,
  Tn as V,
  Co as W,
  vo as X,
  So as Y,
  Do as Z,
  nr as _,
  Vs as a,
  or as a0,
  Lo as a1,
  Po as a2,
  Is as a3,
  Ro as a4,
  Vr as a5,
  Oo as a6,
  bo as a7,
  Ao as a8,
  uo as a9,
  eo as aa,
  Yr as ab,
  me as ac,
  Io as ad,
  Eo as b,
  N as c,
  m as d,
  L as e,
  ne as f,
  zn as g,
  Ho as h,
  D as i,
  lr as j,
  wo as k,
  er as l,
  Fo as m,
  to as n,
  Vo as o,
  To as p,
  nt as q,
  Et as r,
  Xe as s,
  ao as t,
  Ss as u,
  Mo as v,
  Ko as w,
  _s as x,
  ts as y,
  Ts as z
};
