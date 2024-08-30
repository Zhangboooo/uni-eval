import { G as at, E as T, v as ut, I as it, ab as j, R as ft, P as I, ac as J, Q as F, d as lt, ad as pt, j as dt, A as ht, C as Et, x as G, D as Q, K as X } from "./vue.runtime.esm-bundler-Bx36Urvv.js";
var _t = !1;
function $(t, c, n) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, c), t.splice(c, 1, n), n) : (t[c] = n, n);
}
function U(t, c) {
  if (Array.isArray(t)) {
    t.splice(c, 1);
    return;
  }
  delete t[c];
}
/*!
 * pinia v2.2.1
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let S;
const A = (t) => S = t, vt = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function O(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function";
}
var x;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(x || (x = {}));
const C = typeof window < "u";
function et(t, c) {
  for (const n in c) {
    const o = c[n];
    if (!(n in t))
      continue;
    const a = t[n];
    O(a) && O(o) && !I(o) && !J(o) ? t[n] = et(a, o) : t[n] = o;
  }
  return t;
}
const st = () => {
};
function Y(t, c, n, o = st) {
  t.push(c);
  const a = () => {
    const f = t.indexOf(c);
    f > -1 && (t.splice(f, 1), o());
  };
  return !n && ht() && Et(a), a;
}
function V(t, ...c) {
  t.slice().forEach((n) => {
    n(...c);
  });
}
const Nt = (t) => t(), Z = Symbol(), W = Symbol();
function H(t, c) {
  t instanceof Map && c instanceof Map ? c.forEach((n, o) => t.set(o, n)) : t instanceof Set && c instanceof Set && c.forEach(t.add, t);
  for (const n in c) {
    if (!c.hasOwnProperty(n))
      continue;
    const o = c[n], a = t[n];
    O(a) && O(o) && t.hasOwnProperty(n) && !I(o) && !J(o) ? t[n] = H(a, o) : t[n] = o;
  }
  return t;
}
const bt = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function yt(t) {
  return !O(t) || !t.hasOwnProperty(bt);
}
const { assign: b } = Object;
function K(t) {
  return !!(I(t) && t.effect);
}
function tt(t, c, n, o) {
  const { state: a, actions: f, getters: d } = c, i = n.state.value[t];
  let y;
  function h() {
    !i && (process.env.NODE_ENV === "production" || !o) && (n.state.value[t] = a ? a() : {});
    const E = process.env.NODE_ENV !== "production" && o ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      X(T(a ? a() : {}).value)
    ) : X(n.state.value[t]);
    return b(E, f, Object.keys(d || {}).reduce((l, p) => (process.env.NODE_ENV !== "production" && p in E && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${t}".`), l[p] = j(Q(() => {
      A(n);
      const _ = n._s.get(t);
      return d[p].call(_, _);
    })), l), {}));
  }
  return y = M(t, h, c, n, o, !0), y;
}
function M(t, c, n = {}, o, a, f) {
  let d;
  const i = b({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !o._e.active)
    throw new Error("Pinia destroyed");
  const y = { deep: !0 };
  process.env.NODE_ENV !== "production" && !_t && (y.onTrigger = (s) => {
    h ? _ = s : h == !1 && !r._hotUpdating && (Array.isArray(_) ? _.push(s) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let h, E, l = [], p = [], _;
  const g = o.state.value[t];
  !f && !g && (process.env.NODE_ENV === "production" || !a) && (o.state.value[t] = {});
  const R = T({});
  let q;
  function z(s) {
    let e;
    h = E = !1, process.env.NODE_ENV !== "production" && (_ = []), typeof s == "function" ? (s(o.state.value[t]), e = {
      type: x.patchFunction,
      storeId: t,
      events: _
    }) : (H(o.state.value[t], s), e = {
      type: x.patchObject,
      payload: s,
      storeId: t,
      events: _
    });
    const u = q = Symbol();
    G().then(() => {
      q === u && (h = !0);
    }), E = !0, V(l, e, o.state.value[t]);
  }
  const ot = f ? function() {
    const { state: e } = n, u = e ? e() : {};
    this.$patch((v) => {
      b(v, u);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${t}" is built using the setup syntax and does not implement $reset().`);
    } : st
  );
  function nt() {
    d.stop(), l = [], p = [], o._s.delete(t);
  }
  const k = (s, e = "") => {
    if (Z in s)
      return s[W] = e, s;
    const u = function() {
      A(o);
      const v = Array.from(arguments), P = [], L = [];
      function rt(N) {
        P.push(N);
      }
      function ct(N) {
        L.push(N);
      }
      V(p, {
        args: v,
        name: u[W],
        store: r,
        after: rt,
        onError: ct
      });
      let D;
      try {
        D = s.apply(this && this.$id === t ? this : r, v);
      } catch (N) {
        throw V(L, N), N;
      }
      return D instanceof Promise ? D.then((N) => (V(P, N), N)).catch((N) => (V(L, N), Promise.reject(N))) : (V(P, D), D);
    };
    return u[Z] = !0, u[W] = e, u;
  }, w = /* @__PURE__ */ j({
    actions: {},
    getters: {},
    state: [],
    hotState: R
  }), B = {
    _p: o,
    // _s: scope,
    $id: t,
    $onAction: Y.bind(null, p),
    $patch: z,
    $reset: ot,
    $subscribe(s, e = {}) {
      const u = Y(l, s, e.detached, () => v()), v = d.run(() => ut(() => o.state.value[t], (P) => {
        (e.flush === "sync" ? E : h) && s({
          storeId: t,
          type: x.direct,
          events: _
        }, P);
      }, b({}, y, e)));
      return u;
    },
    $dispose: nt
  }, r = it(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && C ? b(
    {
      _hmrPayload: w,
      _customProperties: j(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    B
    // must be added later
    // setupStore
  ) : B);
  o._s.set(t, r);
  const m = (o._a && o._a.runWithContext || Nt)(() => o._e.run(() => (d = ft()).run(() => c({ action: k }))));
  for (const s in m) {
    const e = m[s];
    if (I(e) && !K(e) || J(e))
      process.env.NODE_ENV !== "production" && a ? $(R.value, s, F(m, s)) : f || (g && yt(e) && (I(e) ? e.value = g[s] : H(e, g[s])), o.state.value[t][s] = e), process.env.NODE_ENV !== "production" && w.state.push(s);
    else if (typeof e == "function") {
      const u = process.env.NODE_ENV !== "production" && a ? e : k(e, s);
      m[s] = u, process.env.NODE_ENV !== "production" && (w.actions[s] = e), i.actions[s] = e;
    } else process.env.NODE_ENV !== "production" && K(e) && (w.getters[s] = f ? (
      // @ts-expect-error
      n.getters[s]
    ) : e, C && (m._getters || // @ts-expect-error: same
    (m._getters = j([]))).push(s));
  }
  if (b(r, m), b(lt(r), m), Object.defineProperty(r, "$state", {
    get: () => process.env.NODE_ENV !== "production" && a ? R.value : o.state.value[t],
    set: (s) => {
      if (process.env.NODE_ENV !== "production" && a)
        throw new Error("cannot set hotState");
      z((e) => {
        b(e, s);
      });
    }
  }), process.env.NODE_ENV !== "production" && (r._hotUpdate = j((s) => {
    r._hotUpdating = !0, s._hmrPayload.state.forEach((e) => {
      if (e in r.$state) {
        const u = s.$state[e], v = r.$state[e];
        typeof u == "object" && O(u) && O(v) ? et(u, v) : s.$state[e] = v;
      }
      $(r, e, F(s.$state, e));
    }), Object.keys(r.$state).forEach((e) => {
      e in s.$state || U(r, e);
    }), h = !1, E = !1, o.state.value[t] = F(s._hmrPayload, "hotState"), E = !0, G().then(() => {
      h = !0;
    });
    for (const e in s._hmrPayload.actions) {
      const u = s[e];
      $(r, e, k(u, e));
    }
    for (const e in s._hmrPayload.getters) {
      const u = s._hmrPayload.getters[e], v = f ? (
        // special handling of options api
        Q(() => (A(o), u.call(r, r)))
      ) : u;
      $(r, e, v);
    }
    Object.keys(r._hmrPayload.getters).forEach((e) => {
      e in s._hmrPayload.getters || U(r, e);
    }), Object.keys(r._hmrPayload.actions).forEach((e) => {
      e in s._hmrPayload.actions || U(r, e);
    }), r._hmrPayload = s._hmrPayload, r._getters = s._getters, r._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && C) {
    const s = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((e) => {
      Object.defineProperty(r, e, b({ value: r[e] }, s));
    });
  }
  return o._p.forEach((s) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && C) {
      const e = d.run(() => s({
        store: r,
        app: o._a,
        pinia: o,
        options: i
      }));
      Object.keys(e || {}).forEach((u) => r._customProperties.add(u)), b(r, e);
    } else
      b(r, d.run(() => s({
        store: r,
        app: o._a,
        pinia: o,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && r.$state && typeof r.$state == "object" && typeof r.$state.constructor == "function" && !r.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${r.$id}".`), g && f && n.hydrate && n.hydrate(r.$state, g), h = !0, E = !0, r;
}
function mt(t, c, n) {
  let o, a;
  const f = typeof c == "function";
  o = t, a = f ? n : c;
  function d(i, y) {
    const h = pt();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && S && S._testing ? null : i) || (h ? at(vt, null) : null), i && A(i), process.env.NODE_ENV !== "production" && !S)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = S, i._s.has(o) || (f ? M(o, c, a, i) : tt(o, a, i), process.env.NODE_ENV !== "production" && (d._pinia = i));
    const E = i._s.get(o);
    if (process.env.NODE_ENV !== "production" && y) {
      const l = "__hot:" + o, p = f ? M(l, c, a, i, !0) : tt(l, b({}, a), i, !0);
      y._hotUpdate(p), delete i.state.value[l], i._s.delete(l);
    }
    if (process.env.NODE_ENV !== "production" && C) {
      const l = dt();
      if (l && l.proxy && // avoid adding stores that are just built for hot module replacement
      !y) {
        const p = l.proxy, _ = "_pStores" in p ? p._pStores : p._pStores = {};
        _[o] = E;
      }
    }
    return E;
  }
  return d.$id = o, d;
}
const Vt = mt("counter", () => {
  const t = T(0), c = Q(() => t.value * 2);
  function n() {
    t.value++;
  }
  return { count: t, doubleCount: c, increment: n };
}), Pt = "bar";
export {
  Pt as foo,
  Vt as useCounterStore
};
