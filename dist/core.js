import { m as ae, l as J, w as ue, J as ie, K as j, L as fe, v as x, M as T, N as F, O as le, P as pe, j as he, g as de, i as Ee, e as X, k as B, B as Y } from "./vue.runtime.esm-bundler-XCawJVyy.js";
var _e = !1;
function $(e, c, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, c), e.splice(c, 1, n), n) : (e[c] = n, n);
}
function U(e, c) {
  if (Array.isArray(e)) {
    e.splice(c, 1);
    return;
  }
  delete e[c];
}
/*!
 * pinia v2.2.1
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let S;
const A = (e) => S = e, Ne = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function O(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var w;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(w || (w = {}));
const C = typeof window < "u";
function te(e, c) {
  for (const n in c) {
    const o = c[n];
    if (!(n in e))
      continue;
    const a = e[n];
    O(a) && O(o) && !x(o) && !T(o) ? e[n] = te(a, o) : e[n] = o;
  }
  return e;
}
const se = () => {
};
function Z(e, c, n, o = se) {
  e.push(c);
  const a = () => {
    const f = e.indexOf(c);
    f > -1 && (e.splice(f, 1), o());
  };
  return !n && de() && Ee(a), a;
}
function V(e, ...c) {
  e.slice().forEach((n) => {
    n(...c);
  });
}
const ve = (e) => e(), G = Symbol(), W = Symbol();
function M(e, c) {
  e instanceof Map && c instanceof Map ? c.forEach((n, o) => e.set(o, n)) : e instanceof Set && c instanceof Set && c.forEach(e.add, e);
  for (const n in c) {
    if (!c.hasOwnProperty(n))
      continue;
    const o = c[n], a = e[n];
    O(a) && O(o) && e.hasOwnProperty(n) && !x(o) && !T(o) ? e[n] = M(a, o) : e[n] = o;
  }
  return e;
}
const ye = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function be(e) {
  return !O(e) || !e.hasOwnProperty(ye);
}
const { assign: y } = Object;
function K(e) {
  return !!(x(e) && e.effect);
}
function ee(e, c, n, o) {
  const { state: a, actions: f, getters: h } = c, i = n.state.value[e];
  let b;
  function d() {
    !i && (process.env.NODE_ENV === "production" || !o) && (n.state.value[e] = a ? a() : {});
    const E = process.env.NODE_ENV !== "production" && o ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Y(J(a ? a() : {}).value)
    ) : Y(n.state.value[e]);
    return y(E, f, Object.keys(h || {}).reduce((l, p) => (process.env.NODE_ENV !== "production" && p in E && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${e}".`), l[p] = j(B(() => {
      A(n);
      const _ = n._s.get(e);
      return h[p].call(_, _);
    })), l), {}));
  }
  return b = H(e, d, c, n, o, !0), b;
}
function H(e, c, n = {}, o, a, f) {
  let h;
  const i = y({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !o._e.active)
    throw new Error("Pinia destroyed");
  const b = { deep: !0 };
  process.env.NODE_ENV !== "production" && !_e && (b.onTrigger = (s) => {
    d ? _ = s : d == !1 && !r._hotUpdating && (Array.isArray(_) ? _.push(s) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let d, E, l = [], p = [], _;
  const g = o.state.value[e];
  !f && !g && (process.env.NODE_ENV === "production" || !a) && (o.state.value[e] = {});
  const R = J({});
  let q;
  function z(s) {
    let t;
    d = E = !1, process.env.NODE_ENV !== "production" && (_ = []), typeof s == "function" ? (s(o.state.value[e]), t = {
      type: w.patchFunction,
      storeId: e,
      events: _
    }) : (M(o.state.value[e], s), t = {
      type: w.patchObject,
      payload: s,
      storeId: e,
      events: _
    });
    const u = q = Symbol();
    X().then(() => {
      q === u && (d = !0);
    }), E = !0, V(l, t, o.state.value[e]);
  }
  const oe = f ? function() {
    const { state: t } = n, u = t ? t() : {};
    this.$patch((N) => {
      y(N, u);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : se
  );
  function ne() {
    h.stop(), l = [], p = [], o._s.delete(e);
  }
  const k = (s, t = "") => {
    if (G in s)
      return s[W] = t, s;
    const u = function() {
      A(o);
      const N = Array.from(arguments), P = [], L = [];
      function re(v) {
        P.push(v);
      }
      function ce(v) {
        L.push(v);
      }
      V(p, {
        args: N,
        name: u[W],
        store: r,
        after: re,
        onError: ce
      });
      let D;
      try {
        D = s.apply(this && this.$id === e ? this : r, N);
      } catch (v) {
        throw V(L, v), v;
      }
      return D instanceof Promise ? D.then((v) => (V(P, v), v)).catch((v) => (V(L, v), Promise.reject(v))) : (V(P, D), D);
    };
    return u[G] = !0, u[W] = t, u;
  }, I = /* @__PURE__ */ j({
    actions: {},
    getters: {},
    state: [],
    hotState: R
  }), Q = {
    _p: o,
    // _s: scope,
    $id: e,
    $onAction: Z.bind(null, p),
    $patch: z,
    $reset: oe,
    $subscribe(s, t = {}) {
      const u = Z(l, s, t.detached, () => N()), N = h.run(() => ue(() => o.state.value[e], (P) => {
        (t.flush === "sync" ? E : d) && s({
          storeId: e,
          type: w.direct,
          events: _
        }, P);
      }, y({}, b, t)));
      return u;
    },
    $dispose: ne
  }, r = ie(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && C ? y(
    {
      _hmrPayload: I,
      _customProperties: j(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    Q
    // must be added later
    // setupStore
  ) : Q);
  o._s.set(e, r);
  const m = (o._a && o._a.runWithContext || ve)(() => o._e.run(() => (h = fe()).run(() => c({ action: k }))));
  for (const s in m) {
    const t = m[s];
    if (x(t) && !K(t) || T(t))
      process.env.NODE_ENV !== "production" && a ? $(R.value, s, F(m, s)) : f || (g && be(t) && (x(t) ? t.value = g[s] : M(t, g[s])), o.state.value[e][s] = t), process.env.NODE_ENV !== "production" && I.state.push(s);
    else if (typeof t == "function") {
      const u = process.env.NODE_ENV !== "production" && a ? t : k(t, s);
      m[s] = u, process.env.NODE_ENV !== "production" && (I.actions[s] = t), i.actions[s] = t;
    } else process.env.NODE_ENV !== "production" && K(t) && (I.getters[s] = f ? (
      // @ts-expect-error
      n.getters[s]
    ) : t, C && (m._getters || // @ts-expect-error: same
    (m._getters = j([]))).push(s));
  }
  if (y(r, m), y(le(r), m), Object.defineProperty(r, "$state", {
    get: () => process.env.NODE_ENV !== "production" && a ? R.value : o.state.value[e],
    set: (s) => {
      if (process.env.NODE_ENV !== "production" && a)
        throw new Error("cannot set hotState");
      z((t) => {
        y(t, s);
      });
    }
  }), process.env.NODE_ENV !== "production" && (r._hotUpdate = j((s) => {
    r._hotUpdating = !0, s._hmrPayload.state.forEach((t) => {
      if (t in r.$state) {
        const u = s.$state[t], N = r.$state[t];
        typeof u == "object" && O(u) && O(N) ? te(u, N) : s.$state[t] = N;
      }
      $(r, t, F(s.$state, t));
    }), Object.keys(r.$state).forEach((t) => {
      t in s.$state || U(r, t);
    }), d = !1, E = !1, o.state.value[e] = F(s._hmrPayload, "hotState"), E = !0, X().then(() => {
      d = !0;
    });
    for (const t in s._hmrPayload.actions) {
      const u = s[t];
      $(r, t, k(u, t));
    }
    for (const t in s._hmrPayload.getters) {
      const u = s._hmrPayload.getters[t], N = f ? (
        // special handling of options api
        B(() => (A(o), u.call(r, r)))
      ) : u;
      $(r, t, N);
    }
    Object.keys(r._hmrPayload.getters).forEach((t) => {
      t in s._hmrPayload.getters || U(r, t);
    }), Object.keys(r._hmrPayload.actions).forEach((t) => {
      t in s._hmrPayload.actions || U(r, t);
    }), r._hmrPayload = s._hmrPayload, r._getters = s._getters, r._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && C) {
    const s = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((t) => {
      Object.defineProperty(r, t, y({ value: r[t] }, s));
    });
  }
  return o._p.forEach((s) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && C) {
      const t = h.run(() => s({
        store: r,
        app: o._a,
        pinia: o,
        options: i
      }));
      Object.keys(t || {}).forEach((u) => r._customProperties.add(u)), y(r, t);
    } else
      y(r, h.run(() => s({
        store: r,
        app: o._a,
        pinia: o,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && r.$state && typeof r.$state == "object" && typeof r.$state.constructor == "function" && !r.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${r.$id}".`), g && f && n.hydrate && n.hydrate(r.$state, g), d = !0, E = !0, r;
}
function me(e, c, n) {
  let o, a;
  const f = typeof c == "function";
  o = e, a = f ? n : c;
  function h(i, b) {
    const d = pe();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && S && S._testing ? null : i) || (d ? ae(Ne, null) : null), i && A(i), process.env.NODE_ENV !== "production" && !S)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = S, i._s.has(o) || (f ? H(o, c, a, i) : ee(o, a, i), process.env.NODE_ENV !== "production" && (h._pinia = i));
    const E = i._s.get(o);
    if (process.env.NODE_ENV !== "production" && b) {
      const l = "__hot:" + o, p = f ? H(l, c, a, i, !0) : ee(l, y({}, a), i, !0);
      b._hotUpdate(p), delete i.state.value[l], i._s.delete(l);
    }
    if (process.env.NODE_ENV !== "production" && C) {
      const l = he();
      if (l && l.proxy && // avoid adding stores that are just built for hot module replacement
      !b) {
        const p = l.proxy, _ = "_pStores" in p ? p._pStores : p._pStores = {};
        _[o] = E;
      }
    }
    return E;
  }
  return h.$id = o, h;
}
const Ve = me("counter", () => {
  const e = J(0), c = B(() => e.value * 2);
  function n() {
    e.value++;
  }
  return { count: e, doubleCount: c, increment: n };
}), Pe = "bar";
export {
  Pe as foo,
  Ve as useCounterStore
};
