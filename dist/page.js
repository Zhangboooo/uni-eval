import { h as kt, B as Bc, e as Yo, a as Mc, i as Rc, b as Nc, c as al, t as Dc, u as Hc, o as il, d as fe, F as Ye, g as Fc, s as Ma, r as Ra, w as Mn, f as g, j as Rs, k as cn, l as Qe, m as Ns, n as ae, p as wo, q as Wc, v as ne, x as et, y as ge, z as Ft, A as jc, C as Ke, D as S, E as J, G as be, H as Uc, I as ht, J as Wt, K as Xo, L as Rn, M as ee, N as Be, O as ll, P as rt, Q, R as Ko, S as tt, T as ce, U as qc, V as Qo, W as rl, X as ct, Y as Gc, Z as Nn, _ as Lt, $ as j, a0 as Bt, a1 as Na, a2 as Yc, a3 as Xc, a4 as Kc, a5 as Qc, a6 as cl, a7 as Zc, a8 as Jc, a9 as eu, aa as tu } from "./vue.runtime.esm-bundler-Bx36Urvv.js";
/**
* @vue/runtime-dom v3.4.36
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const bt = "transition", wn = "animation", An = Symbol("_vtc"), _t = (e, { slots: t }) => kt(Bc, dl(e), t);
_t.displayName = "Transition";
const ul = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, nu = _t.props = /* @__PURE__ */ Yo(
  {},
  Mc,
  ul
), Vt = (e, t = []) => {
  al(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, Da = (e) => e ? al(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function dl(e) {
  const t = {};
  for (const p in e)
    p in ul || (t[p] = e[p]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: s,
    duration: o,
    enterFromClass: a = `${n}-enter-from`,
    enterActiveClass: i = `${n}-enter-active`,
    enterToClass: l = `${n}-enter-to`,
    appearFromClass: r = a,
    appearActiveClass: c = i,
    appearToClass: u = l,
    leaveFromClass: d = `${n}-leave-from`,
    leaveActiveClass: m = `${n}-leave-active`,
    leaveToClass: v = `${n}-leave-to`
  } = e, f = su(o), h = f && f[0], y = f && f[1], {
    onBeforeEnter: b,
    onEnter: C,
    onEnterCancelled: A,
    onLeave: w,
    onLeaveCancelled: P,
    onBeforeAppear: O = b,
    onAppear: T = C,
    onAppearCancelled: _ = A
  } = t, L = (p, E, z) => {
    St(p, E ? u : l), St(p, E ? c : i), z && z();
  }, I = (p, E) => {
    p._isLeaving = !1, St(p, d), St(p, v), St(p, m), E && E();
  }, k = (p) => (E, z) => {
    const W = p ? T : C, U = () => L(E, p, z);
    Vt(W, [E, U]), Ha(() => {
      St(E, p ? r : a), ft(E, p ? u : l), Da(W) || Fa(E, s, h, U);
    });
  };
  return Yo(t, {
    onBeforeEnter(p) {
      Vt(b, [p]), ft(p, a), ft(p, i);
    },
    onBeforeAppear(p) {
      Vt(O, [p]), ft(p, r), ft(p, c);
    },
    onEnter: k(!1),
    onAppear: k(!0),
    onLeave(p, E) {
      p._isLeaving = !0;
      const z = () => I(p, E);
      ft(p, d), ft(p, m), vl(), Ha(() => {
        p._isLeaving && (St(p, d), ft(p, v), Da(w) || Fa(p, s, y, z));
      }), Vt(w, [p, z]);
    },
    onEnterCancelled(p) {
      L(p, !1), Vt(A, [p]);
    },
    onAppearCancelled(p) {
      L(p, !0), Vt(_, [p]);
    },
    onLeaveCancelled(p) {
      I(p), Vt(P, [p]);
    }
  });
}
function su(e) {
  if (e == null)
    return null;
  if (Rc(e))
    return [io(e.enter), io(e.leave)];
  {
    const t = io(e);
    return [t, t];
  }
}
function io(e) {
  const t = Dc(e);
  return process.env.NODE_ENV !== "production" && Nc(t, "<transition> explicit duration"), t;
}
function ft(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[An] || (e[An] = /* @__PURE__ */ new Set())).add(t);
}
function St(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const n = e[An];
  n && (n.delete(t), n.size || (e[An] = void 0));
}
function Ha(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let ou = 0;
function Fa(e, t, n, s) {
  const o = e._endId = ++ou, a = () => {
    o === e._endId && s();
  };
  if (n)
    return setTimeout(a, n);
  const { type: i, timeout: l, propCount: r } = fl(e, t);
  if (!i)
    return s();
  const c = i + "end";
  let u = 0;
  const d = () => {
    e.removeEventListener(c, m), a();
  }, m = (v) => {
    v.target === e && ++u >= r && d();
  };
  setTimeout(() => {
    u < r && d();
  }, l + 1), e.addEventListener(c, m);
}
function fl(e, t) {
  const n = window.getComputedStyle(e), s = (f) => (n[f] || "").split(", "), o = s(`${bt}Delay`), a = s(`${bt}Duration`), i = Wa(o, a), l = s(`${wn}Delay`), r = s(`${wn}Duration`), c = Wa(l, r);
  let u = null, d = 0, m = 0;
  t === bt ? i > 0 && (u = bt, d = i, m = a.length) : t === wn ? c > 0 && (u = wn, d = c, m = r.length) : (d = Math.max(i, c), u = d > 0 ? i > c ? bt : wn : null, m = u ? u === bt ? a.length : r.length : 0);
  const v = u === bt && /\b(transform|all)(,|$)/.test(
    s(`${bt}Property`).toString()
  );
  return {
    type: u,
    timeout: d,
    propCount: m,
    hasTransform: v
  };
}
function Wa(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => ja(n) + ja(e[s])));
}
function ja(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function vl() {
  return document.body.offsetHeight;
}
const ml = Symbol("_vod"), au = Symbol("_vsh"), un = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[ml] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : xn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), xn(e, !0), s.enter(e)) : s.leave(e, () => {
      xn(e, !1);
    }) : xn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    xn(e, t);
  }
};
process.env.NODE_ENV !== "production" && (un.name = "show");
function xn(e, t) {
  e.style.display = t ? e[ml] : "none", e[au] = !t;
}
Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : "");
const hl = /* @__PURE__ */ new WeakMap(), gl = /* @__PURE__ */ new WeakMap(), hs = Symbol("_moveCb"), Ua = Symbol("_enterCb"), yl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Yo({}, nu, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = Rs(), s = Hc();
    let o, a;
    return il(() => {
      if (!o.length)
        return;
      const i = e.moveClass || `${e.name || "v"}-move`;
      if (!uu(
        o[0].el,
        n.vnode.el,
        i
      ))
        return;
      o.forEach(lu), o.forEach(ru);
      const l = o.filter(cu);
      vl(), l.forEach((r) => {
        const c = r.el, u = c.style;
        ft(c, i), u.transform = u.webkitTransform = u.transitionDuration = "";
        const d = c[hs] = (m) => {
          m && m.target !== c || (!m || /transform$/.test(m.propertyName)) && (c.removeEventListener("transitionend", d), c[hs] = null, St(c, i));
        };
        c.addEventListener("transitionend", d);
      });
    }), () => {
      const i = fe(e), l = dl(i);
      let r = i.tag || Ye;
      if (o = [], a)
        for (let c = 0; c < a.length; c++) {
          const u = a[c];
          u.el && u.el instanceof Element && (o.push(u), Ma(
            u,
            Ra(
              u,
              l,
              s,
              n
            )
          ), hl.set(
            u,
            u.el.getBoundingClientRect()
          ));
        }
      a = t.default ? Fc(t.default()) : [];
      for (let c = 0; c < a.length; c++) {
        const u = a[c];
        u.key != null ? Ma(
          u,
          Ra(u, l, s, n)
        ) : process.env.NODE_ENV !== "production" && Mn("<TransitionGroup> children must be keyed.");
      }
      return g(r, null, a);
    };
  }
}, iu = (e) => delete e.mode;
yl.props;
const Zo = yl;
function lu(e) {
  const t = e.el;
  t[hs] && t[hs](), t[Ua] && t[Ua]();
}
function ru(e) {
  gl.set(e, e.el.getBoundingClientRect());
}
function cu(e) {
  const t = hl.get(e), n = gl.get(e), s = t.left - n.left, o = t.top - n.top;
  if (s || o) {
    const a = e.el.style;
    return a.transform = a.webkitTransform = `translate(${s}px,${o}px)`, a.transitionDuration = "0s", e;
  }
}
function uu(e, t, n) {
  const s = e.cloneNode(), o = e[An];
  o && o.forEach((l) => {
    l.split(/\s+/).forEach((r) => r && s.classList.remove(r));
  }), n.split(/\s+/).forEach((l) => l && s.classList.add(l)), s.style.display = "none";
  const a = t.nodeType === 1 ? t : t.parentNode;
  a.appendChild(s);
  const { hasTransform: i } = fl(s);
  return a.removeChild(s), i;
}
const du = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20261.76%20226.69'%3e%3cpath%20d='M161.096.001l-30.225%2052.351L100.647.001H-.005l130.877%20226.688L261.749.001z'%20fill='%2341b883'/%3e%3cpath%20d='M161.096.001l-30.225%2052.351L100.647.001H52.346l78.526%20136.01L209.398.001z'%20fill='%2334495e'/%3e%3c/svg%3e", pl = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, fu = {};
function vu(e, t) {
  return "定型";
}
const mu = /* @__PURE__ */ pl(fu, [["render", vu]]), hu = {};
function gu(e, t) {
  return "损失部位";
}
const yu = /* @__PURE__ */ pl(hu, [["render", gu]]), pu = /* @__PURE__ */ cn({
  __name: "VehicleView",
  setup(e) {
    return (t, n) => (Qe(), Ns("div", null, [
      g(mu),
      ae(" ---- "),
      g(yu)
    ]));
  }
}), bu = {
  name: "splitpanes",
  emits: ["ready", "resize", "resized", "pane-click", "pane-maximize", "pane-add", "pane-remove", "splitter-click"],
  props: {
    horizontal: { type: Boolean },
    pushOtherPanes: { type: Boolean, default: !0 },
    dblClickSplitter: { type: Boolean, default: !0 },
    rtl: { type: Boolean, default: !1 },
    firstSplitter: { type: Boolean }
  },
  provide() {
    return {
      requestUpdate: this.requestUpdate,
      onPaneAdd: this.onPaneAdd,
      onPaneRemove: this.onPaneRemove,
      onPaneClick: this.onPaneClick
    };
  },
  data: () => ({
    container: null,
    ready: !1,
    panes: [],
    touch: {
      mouseDown: !1,
      dragging: !1,
      activeSplitter: null
    },
    splitterTaps: {
      splitter: null,
      timeoutId: null
    }
  }),
  computed: {
    panesCount() {
      return this.panes.length;
    },
    indexedPanes() {
      return this.panes.reduce((e, t) => (e[t.id] = t) && e, {});
    }
  },
  methods: {
    updatePaneComponents() {
      this.panes.forEach((e) => {
        e.update && e.update({
          [this.horizontal ? "height" : "width"]: `${this.indexedPanes[e.id].size}%`
        });
      });
    },
    bindEvents() {
      document.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), document.addEventListener("mouseup", this.onMouseUp), "ontouchstart" in window && (document.addEventListener("touchmove", this.onMouseMove, { passive: !1 }), document.addEventListener("touchend", this.onMouseUp));
    },
    unbindEvents() {
      document.removeEventListener("mousemove", this.onMouseMove, { passive: !1 }), document.removeEventListener("mouseup", this.onMouseUp), "ontouchstart" in window && (document.removeEventListener("touchmove", this.onMouseMove, { passive: !1 }), document.removeEventListener("touchend", this.onMouseUp));
    },
    onMouseDown(e, t) {
      this.bindEvents(), this.touch.mouseDown = !0, this.touch.activeSplitter = t;
    },
    onMouseMove(e) {
      this.touch.mouseDown && (e.preventDefault(), this.touch.dragging = !0, this.calculatePanesSize(this.getCurrentMouseDrag(e)), this.$emit("resize", this.panes.map((t) => ({ min: t.min, max: t.max, size: t.size }))));
    },
    onMouseUp() {
      this.touch.dragging && this.$emit("resized", this.panes.map((e) => ({ min: e.min, max: e.max, size: e.size }))), this.touch.mouseDown = !1, setTimeout(() => {
        this.touch.dragging = !1, this.unbindEvents();
      }, 100);
    },
    onSplitterClick(e, t) {
      "ontouchstart" in window && (e.preventDefault(), this.dblClickSplitter && (this.splitterTaps.splitter === t ? (clearTimeout(this.splitterTaps.timeoutId), this.splitterTaps.timeoutId = null, this.onSplitterDblClick(e, t), this.splitterTaps.splitter = null) : (this.splitterTaps.splitter = t, this.splitterTaps.timeoutId = setTimeout(() => {
        this.splitterTaps.splitter = null;
      }, 500)))), this.touch.dragging || this.$emit("splitter-click", this.panes[t]);
    },
    onSplitterDblClick(e, t) {
      let n = 0;
      this.panes = this.panes.map((s, o) => (s.size = o === t ? s.max : s.min, o !== t && (n += s.min), s)), this.panes[t].size -= n, this.$emit("pane-maximize", this.panes[t]), this.$emit("resized", this.panes.map((s) => ({ min: s.min, max: s.max, size: s.size })));
    },
    onPaneClick(e, t) {
      this.$emit("pane-click", this.indexedPanes[t]);
    },
    getCurrentMouseDrag(e) {
      const t = this.container.getBoundingClientRect(), { clientX: n, clientY: s } = "ontouchstart" in window && e.touches ? e.touches[0] : e;
      return {
        x: n - t.left,
        y: s - t.top
      };
    },
    getCurrentDragPercentage(e) {
      e = e[this.horizontal ? "y" : "x"];
      const t = this.container[this.horizontal ? "clientHeight" : "clientWidth"];
      return this.rtl && !this.horizontal && (e = t - e), e * 100 / t;
    },
    calculatePanesSize(e) {
      const t = this.touch.activeSplitter;
      let n = {
        prevPanesSize: this.sumPrevPanesSize(t),
        nextPanesSize: this.sumNextPanesSize(t),
        prevReachedMinPanes: 0,
        nextReachedMinPanes: 0
      };
      const s = 0 + (this.pushOtherPanes ? 0 : n.prevPanesSize), o = 100 - (this.pushOtherPanes ? 0 : n.nextPanesSize), a = Math.max(Math.min(this.getCurrentDragPercentage(e), o), s);
      let i = [t, t + 1], l = this.panes[i[0]] || null, r = this.panes[i[1]] || null;
      const c = l.max < 100 && a >= l.max + n.prevPanesSize, u = r.max < 100 && a <= 100 - (r.max + this.sumNextPanesSize(t + 1));
      if (c || u) {
        c ? (l.size = l.max, r.size = Math.max(100 - l.max - n.prevPanesSize - n.nextPanesSize, 0)) : (l.size = Math.max(100 - r.max - n.prevPanesSize - this.sumNextPanesSize(t + 1), 0), r.size = r.max);
        return;
      }
      if (this.pushOtherPanes) {
        const d = this.doPushOtherPanes(n, a);
        if (!d)
          return;
        ({ sums: n, panesToResize: i } = d), l = this.panes[i[0]] || null, r = this.panes[i[1]] || null;
      }
      l !== null && (l.size = Math.min(Math.max(a - n.prevPanesSize - n.prevReachedMinPanes, l.min), l.max)), r !== null && (r.size = Math.min(Math.max(100 - a - n.nextPanesSize - n.nextReachedMinPanes, r.min), r.max));
    },
    doPushOtherPanes(e, t) {
      const n = this.touch.activeSplitter, s = [n, n + 1];
      return t < e.prevPanesSize + this.panes[s[0]].min && (s[0] = this.findPrevExpandedPane(n).index, e.prevReachedMinPanes = 0, s[0] < n && this.panes.forEach((o, a) => {
        a > s[0] && a <= n && (o.size = o.min, e.prevReachedMinPanes += o.min);
      }), e.prevPanesSize = this.sumPrevPanesSize(s[0]), s[0] === void 0) ? (e.prevReachedMinPanes = 0, this.panes[0].size = this.panes[0].min, this.panes.forEach((o, a) => {
        a > 0 && a <= n && (o.size = o.min, e.prevReachedMinPanes += o.min);
      }), this.panes[s[1]].size = 100 - e.prevReachedMinPanes - this.panes[0].min - e.prevPanesSize - e.nextPanesSize, null) : t > 100 - e.nextPanesSize - this.panes[s[1]].min && (s[1] = this.findNextExpandedPane(n).index, e.nextReachedMinPanes = 0, s[1] > n + 1 && this.panes.forEach((o, a) => {
        a > n && a < s[1] && (o.size = o.min, e.nextReachedMinPanes += o.min);
      }), e.nextPanesSize = this.sumNextPanesSize(s[1] - 1), s[1] === void 0) ? (e.nextReachedMinPanes = 0, this.panes[this.panesCount - 1].size = this.panes[this.panesCount - 1].min, this.panes.forEach((o, a) => {
        a < this.panesCount - 1 && a >= n + 1 && (o.size = o.min, e.nextReachedMinPanes += o.min);
      }), this.panes[s[0]].size = 100 - e.prevPanesSize - e.nextReachedMinPanes - this.panes[this.panesCount - 1].min - e.nextPanesSize, null) : { sums: e, panesToResize: s };
    },
    sumPrevPanesSize(e) {
      return this.panes.reduce((t, n, s) => t + (s < e ? n.size : 0), 0);
    },
    sumNextPanesSize(e) {
      return this.panes.reduce((t, n, s) => t + (s > e + 1 ? n.size : 0), 0);
    },
    findPrevExpandedPane(e) {
      return [...this.panes].reverse().find((t) => t.index < e && t.size > t.min) || {};
    },
    findNextExpandedPane(e) {
      return this.panes.find((t) => t.index > e + 1 && t.size > t.min) || {};
    },
    checkSplitpanesNodes() {
      Array.from(this.container.children).forEach((e) => {
        const t = e.classList.contains("splitpanes__pane"), n = e.classList.contains("splitpanes__splitter");
        !t && !n && (e.parentNode.removeChild(e), console.warn("Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed."));
      });
    },
    addSplitter(e, t, n = !1) {
      const s = e - 1, o = document.createElement("div");
      o.classList.add("splitpanes__splitter"), n || (o.onmousedown = (a) => this.onMouseDown(a, s), typeof window < "u" && "ontouchstart" in window && (o.ontouchstart = (a) => this.onMouseDown(a, s)), o.onclick = (a) => this.onSplitterClick(a, s + 1)), this.dblClickSplitter && (o.ondblclick = (a) => this.onSplitterDblClick(a, s + 1)), t.parentNode.insertBefore(o, t);
    },
    removeSplitter(e) {
      e.onmousedown = void 0, e.onclick = void 0, e.ondblclick = void 0, e.parentNode.removeChild(e);
    },
    redoSplitters() {
      const e = Array.from(this.container.children);
      e.forEach((n) => {
        n.className.includes("splitpanes__splitter") && this.removeSplitter(n);
      });
      let t = 0;
      e.forEach((n) => {
        n.className.includes("splitpanes__pane") && (!t && this.firstSplitter ? this.addSplitter(t, n, !0) : t && this.addSplitter(t, n), t++);
      });
    },
    requestUpdate({ target: e, ...t }) {
      const n = this.indexedPanes[e._.uid];
      Object.entries(t).forEach(([s, o]) => n[s] = o);
    },
    onPaneAdd(e) {
      let t = -1;
      Array.from(e.$el.parentNode.children).some((o) => (o.className.includes("splitpanes__pane") && t++, o === e.$el));
      const n = parseFloat(e.minSize), s = parseFloat(e.maxSize);
      this.panes.splice(t, 0, {
        id: e._.uid,
        index: t,
        min: isNaN(n) ? 0 : n,
        max: isNaN(s) ? 100 : s,
        size: e.size === null ? null : parseFloat(e.size),
        givenSize: e.size,
        update: e.update
      }), this.panes.forEach((o, a) => o.index = a), this.ready && this.$nextTick(() => {
        this.redoSplitters(), this.resetPaneSizes({ addedPane: this.panes[t] }), this.$emit("pane-add", { index: t, panes: this.panes.map((o) => ({ min: o.min, max: o.max, size: o.size })) });
      });
    },
    onPaneRemove(e) {
      const t = this.panes.findIndex((s) => s.id === e._.uid), n = this.panes.splice(t, 1)[0];
      this.panes.forEach((s, o) => s.index = o), this.$nextTick(() => {
        this.redoSplitters(), this.resetPaneSizes({ removedPane: { ...n, index: t } }), this.$emit("pane-remove", { removed: n, panes: this.panes.map((s) => ({ min: s.min, max: s.max, size: s.size })) });
      });
    },
    resetPaneSizes(e = {}) {
      !e.addedPane && !e.removedPane ? this.initialPanesSizing() : this.panes.some((t) => t.givenSize !== null || t.min || t.max < 100) ? this.equalizeAfterAddOrRemove(e) : this.equalize(), this.ready && this.$emit("resized", this.panes.map((t) => ({ min: t.min, max: t.max, size: t.size })));
    },
    equalize() {
      const e = 100 / this.panesCount;
      let t = 0;
      const n = [], s = [];
      this.panes.forEach((o) => {
        o.size = Math.max(Math.min(e, o.max), o.min), t -= o.size, o.size >= o.max && n.push(o.id), o.size <= o.min && s.push(o.id);
      }), t > 0.1 && this.readjustSizes(t, n, s);
    },
    initialPanesSizing() {
      let e = 100;
      const t = [], n = [];
      let s = 0;
      this.panes.forEach((a) => {
        e -= a.size, a.size !== null && s++, a.size >= a.max && t.push(a.id), a.size <= a.min && n.push(a.id);
      });
      let o = 100;
      e > 0.1 && (this.panes.forEach((a) => {
        a.size === null && (a.size = Math.max(Math.min(e / (this.panesCount - s), a.max), a.min)), o -= a.size;
      }), o > 0.1 && this.readjustSizes(e, t, n));
    },
    equalizeAfterAddOrRemove({ addedPane: e, removedPane: t } = {}) {
      let n = 100 / this.panesCount, s = 0;
      const o = [], a = [];
      e && e.givenSize !== null && (n = (100 - e.givenSize) / (this.panesCount - 1)), this.panes.forEach((i) => {
        s -= i.size, i.size >= i.max && o.push(i.id), i.size <= i.min && a.push(i.id);
      }), !(Math.abs(s) < 0.1) && (this.panes.forEach((i) => {
        e && e.givenSize !== null && e.id === i.id || (i.size = Math.max(Math.min(n, i.max), i.min)), s -= i.size, i.size >= i.max && o.push(i.id), i.size <= i.min && a.push(i.id);
      }), s > 0.1 && this.readjustSizes(s, o, a));
    },
    readjustSizes(e, t, n) {
      let s;
      e > 0 ? s = e / (this.panesCount - t.length) : s = e / (this.panesCount - n.length), this.panes.forEach((o, a) => {
        if (e > 0 && !t.includes(o.id)) {
          const i = Math.max(Math.min(o.size + s, o.max), o.min), l = i - o.size;
          e -= l, o.size = i;
        } else if (!n.includes(o.id)) {
          const i = Math.max(Math.min(o.size + s, o.max), o.min), l = i - o.size;
          e -= l, o.size = i;
        }
        o.update({
          [this.horizontal ? "height" : "width"]: `${this.indexedPanes[o.id].size}%`
        });
      }), Math.abs(e) > 0.1 && this.$nextTick(() => {
        this.ready && console.warn("Splitpanes: Could not resize panes correctly due to their constraints.");
      });
    }
  },
  watch: {
    panes: {
      deep: !0,
      immediate: !1,
      handler() {
        this.updatePaneComponents();
      }
    },
    horizontal() {
      this.updatePaneComponents();
    },
    firstSplitter() {
      this.redoSplitters();
    },
    dblClickSplitter(e) {
      [...this.container.querySelectorAll(".splitpanes__splitter")].forEach((t, n) => {
        t.ondblclick = e ? (s) => this.onSplitterDblClick(s, n) : void 0;
      });
    }
  },
  beforeUnmount() {
    this.ready = !1;
  },
  mounted() {
    this.container = this.$refs.container, this.checkSplitpanesNodes(), this.redoSplitters(), this.resetPaneSizes(), this.$emit("ready"), this.ready = !0;
  },
  render() {
    return kt(
      "div",
      {
        ref: "container",
        class: [
          "splitpanes",
          `splitpanes--${this.horizontal ? "horizontal" : "vertical"}`,
          {
            "splitpanes--dragging": this.touch.dragging
          }
        ]
      },
      this.$slots.default()
    );
  }
}, Su = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, wu = {
  name: "pane",
  inject: ["requestUpdate", "onPaneAdd", "onPaneRemove", "onPaneClick"],
  props: {
    size: { type: [Number, String], default: null },
    minSize: { type: [Number, String], default: 0 },
    maxSize: { type: [Number, String], default: 100 }
  },
  data: () => ({
    style: {}
  }),
  mounted() {
    this.onPaneAdd(this);
  },
  beforeUnmount() {
    this.onPaneRemove(this);
  },
  methods: {
    update(e) {
      this.style = e;
    }
  },
  computed: {
    sizeNumber() {
      return this.size || this.size === 0 ? parseFloat(this.size) : null;
    },
    minSizeNumber() {
      return parseFloat(this.minSize);
    },
    maxSizeNumber() {
      return parseFloat(this.maxSize);
    }
  },
  watch: {
    sizeNumber(e) {
      this.requestUpdate({ target: this, size: e });
    },
    minSizeNumber(e) {
      this.requestUpdate({ target: this, min: e });
    },
    maxSizeNumber(e) {
      this.requestUpdate({ target: this, max: e });
    }
  }
};
function xu(e, t, n, s, o, a) {
  return Qe(), Ns("div", {
    class: "splitpanes__pane",
    onClick: t[0] || (t[0] = (i) => a.onPaneClick(i, e._.uid)),
    style: Wc(e.style)
  }, [
    wo(e.$slots, "default")
  ], 4);
}
const qa = /* @__PURE__ */ Su(wu, [["render", xu]]);
function bl(e) {
  return jc() ? (Ke(e), !0) : !1;
}
function xo(e) {
  return typeof e == "function" ? e() : ge(e);
}
const Cu = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function _u(e) {
  return Rs();
}
function ku(e, t = !0, n) {
  _u() ? Ft(e, n) : t ? e() : et(e);
}
function Eu(e, t, n) {
  const s = ne(e, (...o) => (et(() => s()), t(...o)), n);
  return s;
}
function Qt(e) {
  var t;
  const n = xo(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Sl = Cu ? window : void 0;
function Pu() {
  const e = J(!1), t = Rs();
  return t && Ft(() => {
    e.value = !0;
  }, t), e;
}
function Au(e) {
  const t = Pu();
  return S(() => (t.value, !!e()));
}
function Ou(e, t, n = {}) {
  const { window: s = Sl, ...o } = n;
  let a;
  const i = Au(() => s && "ResizeObserver" in s), l = () => {
    a && (a.disconnect(), a = void 0);
  }, r = S(() => Array.isArray(e) ? e.map((d) => Qt(d)) : [Qt(e)]), c = ne(
    r,
    (d) => {
      if (l(), i.value && s) {
        a = new ResizeObserver(t);
        for (const m of d)
          m && a.observe(m, o);
      }
    },
    { immediate: !0, flush: "post" }
  ), u = () => {
    l(), c();
  };
  return bl(u), {
    isSupported: i,
    stop: u
  };
}
function Tu(e, t = { width: 0, height: 0 }, n = {}) {
  const { window: s = Sl, box: o = "content-box" } = n, a = S(() => {
    var d, m;
    return (m = (d = Qt(e)) == null ? void 0 : d.namespaceURI) == null ? void 0 : m.includes("svg");
  }), i = J(t.width), l = J(t.height), { stop: r } = Ou(
    e,
    ([d]) => {
      const m = o === "border-box" ? d.borderBoxSize : o === "content-box" ? d.contentBoxSize : d.devicePixelContentBoxSize;
      if (s && a.value) {
        const v = Qt(e);
        if (v) {
          const f = v.getBoundingClientRect();
          i.value = f.width, l.value = f.height;
        }
      } else if (m) {
        const v = Array.isArray(m) ? m : [m];
        i.value = v.reduce((f, { inlineSize: h }) => f + h, 0), l.value = v.reduce((f, { blockSize: h }) => f + h, 0);
      } else
        i.value = d.contentRect.width, l.value = d.contentRect.height;
    },
    n
  );
  ku(() => {
    const d = Qt(e);
    d && (i.value = "offsetWidth" in d ? d.offsetWidth : t.width, l.value = "offsetHeight" in d ? d.offsetHeight : t.height);
  });
  const c = ne(
    () => Qt(e),
    (d) => {
      i.value = d ? t.width : 0, l.value = d ? t.height : 0;
    }
  );
  function u() {
    r(), c();
  }
  return {
    width: i,
    height: l,
    stop: u
  };
}
/*!
  * vue-router v4.4.3
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
var Ga;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Ga || (Ga = {}));
var Ya;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Ya || (Ya = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Xa;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Xa || (Xa = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const Iu = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), Vu = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function $u() {
  return be(Iu);
}
function zu(e) {
  return be(Vu);
}
const lo = /* @__PURE__ */ new WeakMap();
function wl(e, t, n = {}) {
  const {
    mode: s = "replace",
    route: o = zu(),
    router: a = $u(),
    transform: i = (d) => d
  } = n;
  lo.has(a) || lo.set(a, /* @__PURE__ */ new Map());
  const l = lo.get(a);
  let r = o.query[e];
  bl(() => {
    r = void 0;
  });
  let c;
  const u = Uc((d, m) => (c = m, {
    get() {
      return d(), i(r !== void 0 ? r : xo(t));
    },
    set(v) {
      r !== v && (r = v === t || v === null ? void 0 : v, l.set(e, v === t || v === null ? void 0 : v), m(), et(() => {
        if (l.size === 0)
          return;
        const f = Object.fromEntries(l.entries());
        l.clear();
        const { params: h, query: y, hash: b } = o;
        a[xo(s)]({
          params: h,
          query: { ...y, ...f },
          hash: b
        });
      }));
    }
  }));
  return ne(
    () => o.query[e],
    (d) => {
      r = d, c();
    },
    { flush: "sync" }
  ), u;
}
const Le = typeof window < "u", Jo = Le && "IntersectionObserver" in window;
function xl(e, t, n) {
  const s = t.length - 1;
  if (s < 0) return e === void 0 ? n : e;
  for (let o = 0; o < s; o++) {
    if (e == null)
      return n;
    e = e[t[o]];
  }
  return e == null || e[t[s]] === void 0 ? n : e[t[s]];
}
function Dn(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((s) => Dn(e[s], t[s]));
}
function Lu(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), xl(e, t.split("."), n));
}
function Cn(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const o = t(e, n);
    return typeof o > "u" ? n : o;
  }
  if (typeof t == "string") return Lu(e, t, n);
  if (Array.isArray(t)) return xl(e, t, n);
  if (typeof t != "function") return n;
  const s = t(e, n);
  return typeof s > "u" ? n : s;
}
function se(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function Cl(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Ka(e) {
  let t;
  return e !== null && typeof e == "object" && ((t = Object.getPrototypeOf(e)) === Object.prototype || t === null);
}
function _l(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const Qa = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
function kl(e) {
  return Object.keys(e);
}
function ro(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function Bu(e, t) {
  const n = {}, s = new Set(Object.keys(e));
  for (const o of t)
    s.has(o) && (n[o] = e[o]);
  return n;
}
function Ds(e, t) {
  const n = {
    ...e
  };
  return t.forEach((s) => delete n[s]), n;
}
const Mu = /^on[^a-z]/, El = (e) => Mu.test(e);
function ea(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function gs(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Za(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Ru(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let s = 0;
  for (; s < e.length; )
    n.push(e.substr(s, t)), s += t;
  return n;
}
function gt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = {};
  for (const o in e)
    s[o] = e[o];
  for (const o in t) {
    const a = e[o], i = t[o];
    if (Ka(a) && Ka(i)) {
      s[o] = gt(a, i, n);
      continue;
    }
    if (n && Array.isArray(a) && Array.isArray(i)) {
      s[o] = n(a, i);
      continue;
    }
    s[o] = i;
  }
  return s;
}
function Pl(e) {
  return e.map((t) => t.type === Ye ? Pl(t.children) : t).flat();
}
function Mt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Mt.cache.has(e)) return Mt.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Mt.cache.set(e, t), t;
}
Mt.cache = /* @__PURE__ */ new Map();
function Zt(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => Zt(e, n)).flat(1);
  if (t.suspense)
    return Zt(e, t.ssContent);
  if (Array.isArray(t.children))
    return t.children.map((n) => Zt(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return Zt(e, t.component.subTree).flat(1);
  }
  return [];
}
function ta(e) {
  const t = ht({}), n = S(e);
  return Wt(() => {
    for (const s in n.value)
      t[s] = n.value[s];
  }, {
    flush: "sync"
  }), Xo(t);
}
function ys(e, t) {
  return e.includes(t);
}
function Al(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Rt = () => [Function, Array];
function Ja(e, t) {
  return t = "on" + Rn(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function ps(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((s) => `${s}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Ol(e, t, n) {
  let s, o = e.indexOf(document.activeElement);
  const a = t === "next" ? 1 : -1;
  do
    o += a, s = e[o];
  while ((!s || s.offsetParent == null || !((n == null ? void 0 : n(s)) ?? !0)) && o < e.length && o >= 0);
  return s;
}
function En(e, t) {
  var s, o, a, i;
  const n = ps(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((s = n[0]) == null || s.focus());
  else if (t === "first")
    (o = n[0]) == null || o.focus();
  else if (t === "last")
    (a = n.at(-1)) == null || a.focus();
  else if (typeof t == "number")
    (i = n[t]) == null || i.focus();
  else {
    const l = Ol(n, t);
    l ? l.focus() : En(e, t === "next" ? "first" : "last");
  }
}
function Nu(e, t) {
  if (!(Le && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function Du(e, t) {
  if (!Le || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function Hu(e, t) {
  const n = e.clientX, s = e.clientY, o = t.getBoundingClientRect(), a = o.left, i = o.top, l = o.right, r = o.bottom;
  return n >= a && n <= l && s >= i && s <= r;
}
function Co() {
  const e = ee(), t = (n) => {
    e.value = n;
  };
  return Object.defineProperty(t, "value", {
    enumerable: !0,
    get: () => e.value,
    set: (n) => e.value = n
  }), Object.defineProperty(t, "el", {
    enumerable: !0,
    get: () => _l(e.value)
  }), t;
}
const Tl = ["top", "bottom"], Fu = ["start", "end", "left", "right"];
function _o(e, t) {
  let [n, s] = e.split(" ");
  return s || (s = ys(Tl, n) ? "start" : ys(Fu, n) ? "top" : "center"), {
    side: ei(n, t),
    align: ei(s, t)
  };
}
function ei(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function co(e) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.side],
    align: e.align
  };
}
function uo(e) {
  return {
    side: e.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.align]
  };
}
function ti(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function ni(e) {
  return ys(Tl, e.side) ? "y" : "x";
}
class Nt {
  constructor(t) {
    let {
      x: n,
      y: s,
      width: o,
      height: a
    } = t;
    this.x = n, this.y = s, this.width = o, this.height = a;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function si(e, t) {
  return {
    x: {
      before: Math.max(0, t.left - e.left),
      after: Math.max(0, e.right - t.right)
    },
    y: {
      before: Math.max(0, t.top - e.top),
      after: Math.max(0, e.bottom - t.bottom)
    }
  };
}
function Il(e) {
  return Array.isArray(e) ? new Nt({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function Vl(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), s = n.transform;
  if (s) {
    let o, a, i, l, r;
    if (s.startsWith("matrix3d("))
      o = s.slice(9, -1).split(/, /), a = +o[0], i = +o[5], l = +o[12], r = +o[13];
    else if (s.startsWith("matrix("))
      o = s.slice(7, -1).split(/, /), a = +o[0], i = +o[3], l = +o[4], r = +o[5];
    else
      return new Nt(t);
    const c = n.transformOrigin, u = t.x - l - (1 - a) * parseFloat(c), d = t.y - r - (1 - i) * parseFloat(c.slice(c.indexOf(" ") + 1)), m = a ? t.width / a : e.offsetWidth + 1, v = i ? t.height / i : e.offsetHeight + 1;
    return new Nt({
      x: u,
      y: d,
      width: m,
      height: v
    });
  } else
    return new Nt(t);
}
function Jt(e, t, n) {
  if (typeof e.animate > "u") return {
    finished: Promise.resolve()
  };
  let s;
  try {
    s = e.animate(t, n);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof s.finished > "u" && (s.finished = new Promise((o) => {
    s.onfinish = () => {
      o(s);
    };
  })), s;
}
const ls = /* @__PURE__ */ new WeakMap();
function Wu(e, t) {
  Object.keys(t).forEach((n) => {
    if (El(n)) {
      const s = Al(n), o = ls.get(e);
      if (t[n] == null)
        o == null || o.forEach((a) => {
          const [i, l] = a;
          i === s && (e.removeEventListener(s, l), o.delete(a));
        });
      else if (!o || ![...o].some((a) => a[0] === s && a[1] === t[n])) {
        e.addEventListener(s, t[n]);
        const a = o || /* @__PURE__ */ new Set();
        a.add([s, t[n]]), ls.has(e) || ls.set(e, a);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function ju(e, t) {
  Object.keys(t).forEach((n) => {
    if (El(n)) {
      const s = Al(n), o = ls.get(e);
      o == null || o.forEach((a) => {
        const [i, l] = a;
        i === s && (e.removeEventListener(s, l), o.delete(a));
      });
    } else
      e.removeAttribute(n);
  });
}
const Kt = 2.4, oi = 0.2126729, ai = 0.7151522, ii = 0.072175, Uu = 0.55, qu = 0.58, Gu = 0.57, Yu = 0.62, ss = 0.03, li = 1.45, Xu = 5e-4, Ku = 1.25, Qu = 1.25, ri = 0.078, ci = 12.82051282051282, os = 0.06, ui = 1e-3;
function di(e, t) {
  const n = (e.r / 255) ** Kt, s = (e.g / 255) ** Kt, o = (e.b / 255) ** Kt, a = (t.r / 255) ** Kt, i = (t.g / 255) ** Kt, l = (t.b / 255) ** Kt;
  let r = n * oi + s * ai + o * ii, c = a * oi + i * ai + l * ii;
  if (r <= ss && (r += (ss - r) ** li), c <= ss && (c += (ss - c) ** li), Math.abs(c - r) < Xu) return 0;
  let u;
  if (c > r) {
    const d = (c ** Uu - r ** qu) * Ku;
    u = d < ui ? 0 : d < ri ? d - d * ci * os : d - os;
  } else {
    const d = (c ** Yu - r ** Gu) * Qu;
    u = d > -ui ? 0 : d > -ri ? d - d * ci * os : d + os;
  }
  return u * 100;
}
function xt(e) {
  Mn(`Vuetify: ${e}`);
}
function Zu(e) {
  Mn(`Vuetify error: ${e}`);
}
function Ju(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`, Mn(`[Vuetify UPGRADE] '${e}' is deprecated, use ${t} instead.`);
}
function ko(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function ed(e) {
  return ko(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const fi = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, td = {
  rgb: (e, t, n, s) => ({
    r: e,
    g: t,
    b: n,
    a: s
  }),
  rgba: (e, t, n, s) => ({
    r: e,
    g: t,
    b: n,
    a: s
  }),
  hsl: (e, t, n, s) => vi({
    h: e,
    s: t,
    l: n,
    a: s
  }),
  hsla: (e, t, n, s) => vi({
    h: e,
    s: t,
    l: n,
    a: s
  }),
  hsv: (e, t, n, s) => On({
    h: e,
    s: t,
    v: n,
    a: s
  }),
  hsva: (e, t, n, s) => On({
    h: e,
    s: t,
    v: n,
    a: s
  })
};
function kn(e) {
  if (typeof e == "number")
    return (isNaN(e) || e < 0 || e > 16777215) && xt(`'${e}' is not a valid hex color`), {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && fi.test(e)) {
    const {
      groups: t
    } = e.match(fi), {
      fn: n,
      values: s
    } = t, o = s.split(/,\s*/).map((a) => a.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(a) / 100 : parseFloat(a));
    return td[n](...o);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    [3, 4].includes(t.length) ? t = t.split("").map((s) => s + s).join("") : [6, 8].includes(t.length) || xt(`'${e}' is not a valid hex(a) color`);
    const n = parseInt(t, 16);
    return (isNaN(n) || n < 0 || n > 4294967295) && xt(`'${e}' is not a valid hex(a) color`), nd(t);
  } else if (typeof e == "object") {
    if (ro(e, ["r", "g", "b"]))
      return e;
    if (ro(e, ["h", "s", "l"]))
      return On($l(e));
    if (ro(e, ["h", "s", "v"]))
      return On(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function On(e) {
  const {
    h: t,
    s: n,
    v: s,
    a: o
  } = e, a = (l) => {
    const r = (l + t / 60) % 6;
    return s - s * n * Math.max(Math.min(r, 4 - r, 1), 0);
  }, i = [a(5), a(3), a(1)].map((l) => Math.round(l * 255));
  return {
    r: i[0],
    g: i[1],
    b: i[2],
    a: o
  };
}
function vi(e) {
  return On($l(e));
}
function $l(e) {
  const {
    h: t,
    s: n,
    l: s,
    a: o
  } = e, a = s + n * Math.min(s, 1 - s), i = a === 0 ? 0 : 2 - 2 * s / a;
  return {
    h: t,
    s: i,
    v: a,
    a: o
  };
}
function nd(e) {
  e = sd(e);
  let [t, n, s, o] = Ru(e, 2).map((a) => parseInt(a, 16));
  return o = o === void 0 ? o : o / 255, {
    r: t,
    g: n,
    b: s,
    a: o
  };
}
function sd(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Za(Za(e, 6), 8, "F")), e;
}
function od(e) {
  const t = Math.abs(di(kn(0), kn(e)));
  return Math.abs(di(kn(16777215), kn(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function F(e, t) {
  return (n) => Object.keys(e).reduce((s, o) => {
    const i = typeof e[o] == "object" && e[o] != null && !Array.isArray(e[o]) ? e[o] : {
      type: e[o]
    };
    return n && o in n ? s[o] = {
      ...i,
      default: n[o]
    } : s[o] = i, t && !s[o].source && (s[o].source = t), s;
  }, {});
}
const ue = F({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
function ke(e, t) {
  const n = Rs();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function Et() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = ke(e).type;
  return Mt((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let zl = 0, rs = /* @__PURE__ */ new WeakMap();
function Hn() {
  const e = ke("getUid");
  if (rs.has(e)) return rs.get(e);
  {
    const t = zl++;
    return rs.set(e, t), t;
  }
}
Hn.reset = () => {
  zl = 0, rs = /* @__PURE__ */ new WeakMap();
};
function ad(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ke("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
const bs = Symbol.for("vuetify:defaults");
function na() {
  const e = be(bs);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function dn(e, t) {
  const n = na(), s = J(e), o = S(() => {
    if (ge(t == null ? void 0 : t.disabled)) return n.value;
    const i = ge(t == null ? void 0 : t.scoped), l = ge(t == null ? void 0 : t.reset), r = ge(t == null ? void 0 : t.root);
    if (s.value == null && !(i || l || r)) return n.value;
    let c = gt(s.value, {
      prev: n.value
    });
    if (i) return c;
    if (l || r) {
      const u = Number(l || 1 / 0);
      for (let d = 0; d <= u && !(!c || !("prev" in c)); d++)
        c = c.prev;
      return c && typeof r == "string" && r in c && (c = gt(gt(c, {
        prev: c
      }), c[r])), c;
    }
    return c.prev ? gt(c.prev, c) : c;
  });
  return Be(bs, o), o;
}
function id(e, t) {
  var n, s;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((s = e.props) == null ? void 0 : s[Mt(t)]) < "u";
}
function ld() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : na();
  const s = ke("useDefaults");
  if (t = t ?? s.type.name ?? s.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const o = S(() => {
    var r;
    return (r = n.value) == null ? void 0 : r[e._as ?? t];
  }), a = new Proxy(e, {
    get(r, c) {
      var d, m, v, f, h, y, b;
      const u = Reflect.get(r, c);
      return c === "class" || c === "style" ? [(d = o.value) == null ? void 0 : d[c], u].filter((C) => C != null) : typeof c == "string" && !id(s.vnode, c) ? ((m = o.value) == null ? void 0 : m[c]) !== void 0 ? (v = o.value) == null ? void 0 : v[c] : ((h = (f = n.value) == null ? void 0 : f.global) == null ? void 0 : h[c]) !== void 0 ? (b = (y = n.value) == null ? void 0 : y.global) == null ? void 0 : b[c] : u : u;
    }
  }), i = ee();
  Wt(() => {
    if (o.value) {
      const r = Object.entries(o.value).filter((c) => {
        let [u] = c;
        return u.startsWith(u[0].toUpperCase());
      });
      i.value = r.length ? Object.fromEntries(r) : void 0;
    } else
      i.value = void 0;
  });
  function l() {
    const r = ad(bs, s);
    Be(bs, S(() => i.value ? gt((r == null ? void 0 : r.value) ?? {}, i.value) : r == null ? void 0 : r.value));
  }
  return {
    props: a,
    provideSubDefaults: l
  };
}
function Fn(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return xt("The component is missing an explicit name, unable to generate default prop value"), e;
  if (e._setup) {
    e.props = F(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(s) {
      return Bu(s, t);
    }, e.props._as = String, e.setup = function(s, o) {
      const a = na();
      if (!a.value) return e._setup(s, o);
      const {
        props: i,
        provideSubDefaults: l
      } = ld(s, s._as ?? e.name, a), r = e._setup(i, o);
      return l(), r;
    };
  }
  return e;
}
function te() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? Fn : cn)(t);
}
function rd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return te()({
    name: n ?? Rn(ll(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...ue()
    },
    setup(s, o) {
      let {
        slots: a
      } = o;
      return () => {
        var i;
        return kt(s.tag, {
          class: [e, s.class],
          style: s.style
        }, (i = a.default) == null ? void 0 : i.call(a));
      };
    }
  });
}
function Ll(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const Ss = "cubic-bezier(0.4, 0, 0.2, 1)", cd = "cubic-bezier(0.0, 0, 0.2, 1)", ud = "cubic-bezier(0.4, 0, 1, 1)";
function dd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? fd(e) : sa(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function ws(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (sa(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function sa(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function fd(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function vd(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ie(e) {
  const t = ke("useRender");
  t.render = e;
}
const jt = F({
  border: [Boolean, Number, String]
}, "border");
function Ut(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Et();
  return {
    borderClasses: S(() => {
      const s = rt(e) ? e.value : e.border, o = [];
      if (s === !0 || s === "")
        o.push(`${t}--border`);
      else if (typeof s == "string" || s === 0)
        for (const a of String(s).split(" "))
          o.push(`border-${a}`);
      return o;
    })
  };
}
const md = [null, "default", "comfortable", "compact"], qt = F({
  density: {
    type: String,
    default: "default",
    validator: (e) => md.includes(e)
  }
}, "density");
function Gt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Et();
  return {
    densityClasses: S(() => `${t}--density-${e.density}`)
  };
}
const fn = F({
  elevation: {
    type: [Number, String],
    validator(e) {
      const t = parseInt(e);
      return !isNaN(t) && t >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      t <= 24;
    }
  }
}, "elevation");
function vn(e) {
  return {
    elevationClasses: S(() => {
      const n = rt(e) ? e.value : e.elevation, s = [];
      return n == null || s.push(`elevation-${n}`), s;
    })
  };
}
const Pt = F({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function At(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Et();
  return {
    roundedClasses: S(() => {
      const s = rt(e) ? e.value : e.rounded, o = rt(e) ? e.value : e.tile, a = [];
      if (s === !0 || s === "")
        a.push(`${t}--rounded`);
      else if (typeof s == "string" || s === 0)
        for (const i of String(s).split(" "))
          a.push(`rounded-${i}`);
      else (o || s === !1) && a.push("rounded-0");
      return a;
    })
  };
}
const xe = F({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), mi = Symbol.for("vuetify:theme"), Me = F({
  theme: String
}, "theme");
function Re(e) {
  ke("provideTheme");
  const t = be(mi, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = S(() => e.theme ?? t.name.value), s = S(() => t.themes.value[n.value]), o = S(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), a = {
    ...t,
    name: n,
    current: s,
    themeClasses: o
  };
  return Be(mi, a), a;
}
function oa(e) {
  return ta(() => {
    const t = [], n = {};
    if (e.value.background)
      if (ko(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && ed(e.value.background)) {
          const s = kn(e.value.background);
          if (s.a == null || s.a === 1) {
            const o = od(s);
            n.color = o, n.caretColor = o;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (ko(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function on(e, t) {
  const n = S(() => ({
    text: rt(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: s,
    colorStyles: o
  } = oa(n);
  return {
    textColorClasses: s,
    textColorStyles: o
  };
}
function Wn(e, t) {
  const n = S(() => ({
    background: rt(e) ? e.value : null
  })), {
    colorClasses: s,
    colorStyles: o
  } = oa(n);
  return {
    backgroundColorClasses: s,
    backgroundColorStyles: o
  };
}
const hd = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function Hs(e, t) {
  return g(Ye, null, [e && g("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), g("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const Yt = F({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => hd.includes(e)
  }
}, "variant");
function Fs(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Et();
  const n = S(() => {
    const {
      variant: a
    } = ge(e);
    return `${t}--variant-${a}`;
  }), {
    colorClasses: s,
    colorStyles: o
  } = oa(S(() => {
    const {
      variant: a,
      color: i
    } = ge(e);
    return {
      [["elevated", "flat"].includes(a) ? "background" : "text"]: i
    };
  }));
  return {
    colorClasses: s,
    colorStyles: o,
    variantClasses: n
  };
}
const Bl = F({
  baseColor: String,
  divided: Boolean,
  ...jt(),
  ...ue(),
  ...qt(),
  ...fn(),
  ...Pt(),
  ...xe(),
  ...Me(),
  ...Yt()
}, "VBtnGroup"), xs = te()({
  name: "VBtnGroup",
  props: Bl(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: s
    } = Re(e), {
      densityClasses: o
    } = Gt(e), {
      borderClasses: a
    } = Ut(e), {
      elevationClasses: i
    } = vn(e), {
      roundedClasses: l
    } = At(e);
    dn({
      VBtn: {
        height: "auto",
        baseColor: Q(e, "baseColor"),
        color: Q(e, "color"),
        density: Q(e, "density"),
        flat: !0,
        variant: Q(e, "variant")
      }
    }), ie(() => g(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, s.value, a.value, o.value, i.value, l.value, e.class],
      style: e.style
    }, n));
  }
});
function jn(e, t) {
  let n;
  function s() {
    n = Ko(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), s();
    }) : t());
  }
  ne(e, (o) => {
    o && !n ? s() : o || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), Ke(() => {
    n == null || n.stop();
  });
}
function it(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (d) => d, o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (d) => d;
  const a = ke("useProxiedModel"), i = J(e[t] !== void 0 ? e[t] : n), l = Mt(t), c = l !== t ? S(() => {
    var d, m, v, f;
    return e[t], !!(((d = a.vnode.props) != null && d.hasOwnProperty(t) || (m = a.vnode.props) != null && m.hasOwnProperty(l)) && ((v = a.vnode.props) != null && v.hasOwnProperty(`onUpdate:${t}`) || (f = a.vnode.props) != null && f.hasOwnProperty(`onUpdate:${l}`)));
  }) : S(() => {
    var d, m;
    return e[t], !!((d = a.vnode.props) != null && d.hasOwnProperty(t) && ((m = a.vnode.props) != null && m.hasOwnProperty(`onUpdate:${t}`)));
  });
  jn(() => !c.value, () => {
    ne(() => e[t], (d) => {
      i.value = d;
    });
  });
  const u = S({
    get() {
      const d = e[t];
      return s(c.value ? d : i.value);
    },
    set(d) {
      const m = o(d), v = fe(c.value ? e[t] : i.value);
      v === m || s(v) === d || (i.value = m, a == null || a.emit(`update:${t}`, m));
    }
  });
  return Object.defineProperty(u, "externalValue", {
    get: () => c.value ? e[t] : i.value
  }), u;
}
const aa = F({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), ia = F({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function la(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const s = ke("useGroupItem");
  if (!s)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const o = Hn();
  Be(Symbol.for(`${t.description}:id`), o);
  const a = be(t, null);
  if (!a) {
    if (!n) return a;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const i = Q(e, "value"), l = S(() => !!(a.disabled.value || e.disabled));
  a.register({
    id: o,
    value: i,
    disabled: l
  }, s), tt(() => {
    a.unregister(o);
  });
  const r = S(() => a.isSelected(o)), c = S(() => a.items.value[0].id === o), u = S(() => a.items.value[a.items.value.length - 1].id === o), d = S(() => r.value && [a.selectedClass.value, e.selectedClass]);
  return ne(r, (m) => {
    s.emit("group:selected", {
      value: m
    });
  }, {
    flush: "sync"
  }), {
    id: o,
    isSelected: r,
    isFirst: c,
    isLast: u,
    toggle: () => a.select(o, !r.value),
    select: (m) => a.select(o, m),
    selectedClass: d,
    value: i,
    disabled: l,
    group: a
  };
}
function Ws(e, t) {
  let n = !1;
  const s = ht([]), o = it(e, "modelValue", [], (m) => m == null ? [] : Ml(s, ea(m)), (m) => {
    const v = yd(s, m);
    return e.multiple ? v : v[0];
  }), a = ke("useGroup");
  function i(m, v) {
    const f = m, h = Symbol.for(`${t.description}:id`), b = Zt(h, a == null ? void 0 : a.vnode).indexOf(v);
    ge(f.value) == null && (f.value = b, f.useIndexAsValue = !0), b > -1 ? s.splice(b, 0, f) : s.push(f);
  }
  function l(m) {
    if (n) return;
    r();
    const v = s.findIndex((f) => f.id === m);
    s.splice(v, 1);
  }
  function r() {
    const m = s.find((v) => !v.disabled);
    m && e.mandatory === "force" && !o.value.length && (o.value = [m.id]);
  }
  Ft(() => {
    r();
  }), tt(() => {
    n = !0;
  }), il(() => {
    for (let m = 0; m < s.length; m++)
      s[m].useIndexAsValue && (s[m].value = m);
  });
  function c(m, v) {
    const f = s.find((h) => h.id === m);
    if (!(v && (f != null && f.disabled)))
      if (e.multiple) {
        const h = o.value.slice(), y = h.findIndex((C) => C === m), b = ~y;
        if (v = v ?? !b, b && e.mandatory && h.length <= 1 || !b && e.max != null && h.length + 1 > e.max) return;
        y < 0 && v ? h.push(m) : y >= 0 && !v && h.splice(y, 1), o.value = h;
      } else {
        const h = o.value.includes(m);
        if (e.mandatory && h) return;
        o.value = v ?? !h ? [m] : [];
      }
  }
  function u(m) {
    if (e.multiple && xt('This method is not supported when using "multiple" prop'), o.value.length) {
      const v = o.value[0], f = s.findIndex((b) => b.id === v);
      let h = (f + m) % s.length, y = s[h];
      for (; y.disabled && h !== f; )
        h = (h + m) % s.length, y = s[h];
      if (y.disabled) return;
      o.value = [s[h].id];
    } else {
      const v = s.find((f) => !f.disabled);
      v && (o.value = [v.id]);
    }
  }
  const d = {
    register: i,
    unregister: l,
    selected: o,
    select: c,
    disabled: Q(e, "disabled"),
    prev: () => u(s.length - 1),
    next: () => u(1),
    isSelected: (m) => o.value.includes(m),
    selectedClass: S(() => e.selectedClass),
    items: S(() => s),
    getItemIndex: (m) => gd(s, m)
  };
  return Be(t, d), d;
}
function gd(e, t) {
  const n = Ml(e, [t]);
  return n.length ? e.findIndex((s) => s.id === n[0]) : -1;
}
function Ml(e, t) {
  const n = [];
  return t.forEach((s) => {
    const o = e.find((i) => Dn(s, i.value)), a = e[s];
    (o == null ? void 0 : o.value) != null ? n.push(o.id) : a != null && n.push(a.id);
  }), n;
}
function yd(e, t) {
  const n = [];
  return t.forEach((s) => {
    const o = e.findIndex((a) => a.id === s);
    if (~o) {
      const a = e[o];
      n.push(a.value != null ? a.value : o);
    }
  }), n;
}
const Rl = Symbol.for("vuetify:v-btn-toggle"), pd = F({
  ...Bl(),
  ...aa()
}, "VBtnToggle");
te()({
  name: "VBtnToggle",
  props: pd(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isSelected: s,
      next: o,
      prev: a,
      select: i,
      selected: l
    } = Ws(e, Rl);
    return ie(() => {
      const r = xs.filterProps(e);
      return g(xs, ce({
        class: ["v-btn-toggle", e.class]
      }, r, {
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
            isSelected: s,
            next: o,
            prev: a,
            select: i,
            selected: l
          })];
        }
      });
    }), {
      next: o,
      prev: a,
      select: i
    };
  }
});
const bd = F({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Te = te(!1)({
  name: "VDefaultsProvider",
  props: bd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: s,
      disabled: o,
      reset: a,
      root: i,
      scoped: l
    } = Xo(e);
    return dn(s, {
      reset: a,
      root: i,
      scoped: l,
      disabled: o
    }), () => {
      var r;
      return (r = n.default) == null ? void 0 : r.call(n);
    };
  }
}), Oe = [String, Function, Object, Array], Sd = Symbol.for("vuetify:icons"), js = F({
  icon: {
    type: Oe
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), hi = te()({
  name: "VComponentIcon",
  props: js(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const s = e.icon;
      return g(e.tag, null, {
        default: () => {
          var o;
          return [e.icon ? g(s, null, null) : (o = n.default) == null ? void 0 : o.call(n)];
        }
      });
    };
  }
}), wd = Fn({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: js(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => g(e.tag, ce(n, {
      style: null
    }), {
      default: () => [g("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((s) => Array.isArray(s) ? g("path", {
        d: s[0],
        "fill-opacity": s[1]
      }, null) : g("path", {
        d: s
      }, null)) : g("path", {
        d: e.icon
      }, null)])]
    });
  }
});
Fn({
  name: "VLigatureIcon",
  props: js(),
  setup(e) {
    return () => g(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
Fn({
  name: "VClassIcon",
  props: js(),
  setup(e) {
    return () => g(e.tag, {
      class: e.icon
    }, null);
  }
});
const xd = (e) => {
  const t = be(Sd);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: S(() => {
      var r;
      const s = ge(e);
      if (!s) return {
        component: hi
      };
      let o = s;
      if (typeof o == "string" && (o = o.trim(), o.startsWith("$") && (o = (r = t.aliases) == null ? void 0 : r[o.slice(1)])), o || xt(`Could not find aliased icon "${s}"`), Array.isArray(o))
        return {
          component: wd,
          icon: o
        };
      if (typeof o != "string")
        return {
          component: hi,
          icon: o
        };
      const a = Object.keys(t.sets).find((c) => typeof o == "string" && o.startsWith(`${c}:`)), i = a ? o.slice(a.length + 1) : o;
      return {
        component: t.sets[a ?? t.defaultSet].component,
        icon: i
      };
    })
  };
}, Cd = ["x-small", "small", "default", "large", "x-large"], Un = F({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function qn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Et();
  return ta(() => {
    let n, s;
    return ys(Cd, e.size) ? n = `${t}--size-${e.size}` : e.size && (s = {
      width: se(e.size),
      height: se(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: s
    };
  });
}
const _d = F({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: Oe,
  ...ue(),
  ...Un(),
  ...xe({
    tag: "i"
  }),
  ...Me()
}, "VIcon"), Ie = te()({
  name: "VIcon",
  props: _d(),
  setup(e, t) {
    let {
      attrs: n,
      slots: s
    } = t;
    const o = J(), {
      themeClasses: a
    } = Re(e), {
      iconData: i
    } = xd(S(() => o.value || e.icon)), {
      sizeClasses: l
    } = qn(e), {
      textColorClasses: r,
      textColorStyles: c
    } = on(Q(e, "color"));
    return ie(() => {
      var m, v;
      const u = (m = s.default) == null ? void 0 : m.call(s);
      u && (o.value = (v = Pl(u).filter((f) => f.type === qc && f.children && typeof f.children == "string")[0]) == null ? void 0 : v.children);
      const d = !!(n.onClick || n.onClickOnce);
      return g(i.value.component, {
        tag: e.tag,
        icon: i.value.icon,
        class: ["v-icon", "notranslate", a.value, l.value, r.value, {
          "v-icon--clickable": d,
          "v-icon--disabled": e.disabled,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [l.value ? void 0 : {
          fontSize: se(e.size),
          height: se(e.size),
          width: se(e.size)
        }, c.value, e.style],
        role: d ? "button" : void 0,
        "aria-hidden": !d,
        tabindex: d ? e.disabled ? -1 : 0 : void 0
      }, {
        default: () => [u]
      });
    }), {};
  }
});
function kd(e, t) {
  const n = J(), s = ee(!1);
  if (Jo) {
    const o = new IntersectionObserver((a) => {
      s.value = !!a.find((i) => i.isIntersecting);
    }, t);
    tt(() => {
      o.disconnect();
    }), ne(n, (a, i) => {
      i && (o.unobserve(i), s.value = !1), a && o.observe(a);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: s
  };
}
function Cs(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = Co(), s = J();
  if (Le) {
    const o = new ResizeObserver((a) => {
      a.length && (t === "content" ? s.value = a[0].contentRect : s.value = a[0].target.getBoundingClientRect());
    });
    tt(() => {
      o.disconnect();
    }), ne(() => n.el, (a, i) => {
      i && (o.unobserve(i), s.value = void 0), a && o.observe(a);
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: Qo(s)
  };
}
const Ed = F({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...ue(),
  ...Un(),
  ...xe({
    tag: "div"
  }),
  ...Me()
}, "VProgressCircular"), Pd = te()({
  name: "VProgressCircular",
  props: Ed(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const s = 20, o = 2 * Math.PI * s, a = J(), {
      themeClasses: i
    } = Re(e), {
      sizeClasses: l,
      sizeStyles: r
    } = qn(e), {
      textColorClasses: c,
      textColorStyles: u
    } = on(Q(e, "color")), {
      textColorClasses: d,
      textColorStyles: m
    } = on(Q(e, "bgColor")), {
      intersectionRef: v,
      isIntersecting: f
    } = kd(), {
      resizeRef: h,
      contentRect: y
    } = Cs(), b = S(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), C = S(() => Number(e.width)), A = S(() => r.value ? Number(e.size) : y.value ? y.value.width : Math.max(C.value, 32)), w = S(() => s / (1 - C.value / A.value) * 2), P = S(() => C.value / A.value * w.value), O = S(() => se((100 - b.value) / 100 * o));
    return Wt(() => {
      v.value = a.value, h.value = a.value;
    }), ie(() => g(e.tag, {
      ref: a,
      class: ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": f.value,
        "v-progress-circular--disable-shrink": e.indeterminate === "disable-shrink"
      }, i.value, l.value, c.value, e.class],
      style: [r.value, u.value, e.style],
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : b.value
    }, {
      default: () => [g("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${w.value} ${w.value}`
      }, [g("circle", {
        class: ["v-progress-circular__underlay", d.value],
        style: m.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: s,
        "stroke-width": P.value,
        "stroke-dasharray": o,
        "stroke-dashoffset": 0
      }, null), g("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: s,
        "stroke-width": P.value,
        "stroke-dasharray": o,
        "stroke-dashoffset": O.value
      }, null)]), n.default && g("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: b.value
      })])]
    })), {};
  }
}), mn = F({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function hn(e) {
  return {
    dimensionStyles: S(() => {
      const n = {}, s = se(e.height), o = se(e.maxHeight), a = se(e.maxWidth), i = se(e.minHeight), l = se(e.minWidth), r = se(e.width);
      return s != null && (n.height = s), o != null && (n.maxHeight = o), a != null && (n.maxWidth = a), i != null && (n.minHeight = i), l != null && (n.minWidth = l), r != null && (n.width = r), n;
    })
  };
}
const Nl = Symbol.for("vuetify:locale");
function Dl() {
  const e = be(Nl);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Ot() {
  const e = be(Nl);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const gi = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Ad = F({
  location: String
}, "location");
function Od(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: s
  } = Ot();
  return {
    locationStyles: S(() => {
      if (!e.location) return {};
      const {
        side: a,
        align: i
      } = _o(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, s.value);
      function l(c) {
        return n ? n(c) : 0;
      }
      const r = {};
      return a !== "center" && (t ? r[gi[a]] = `calc(100% - ${l(a)}px)` : r[a] = 0), i !== "center" ? t ? r[gi[i]] = `calc(100% - ${l(i)}px)` : r[i] = 0 : (a === "center" ? r.top = r.left = "50%" : r[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[a]] = "50%", r.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[a]), r;
    })
  };
}
const Td = F({
  loading: [Boolean, String]
}, "loader");
function Id(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Et();
  return {
    loaderClasses: S(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
const Vd = ["static", "relative", "fixed", "absolute", "sticky"], $d = F({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => Vd.includes(e)
    )
  }
}, "position");
function zd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Et();
  return {
    positionClasses: S(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function Ld() {
  const e = ke("useRoute");
  return S(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function Bd() {
  var e, t;
  return (t = (e = ke("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function ra(e, t) {
  var c, u;
  const n = rl("RouterLink"), s = S(() => !!(e.href || e.to)), o = S(() => (s == null ? void 0 : s.value) || Ja(t, "click") || Ja(e, "click"));
  if (typeof n == "string" || !("useLink" in n))
    return {
      isLink: s,
      isClickable: o,
      href: Q(e, "href")
    };
  const a = S(() => ({
    ...e,
    to: Q(() => e.to || "")
  })), i = n.useLink(a.value), l = S(() => e.to ? i : void 0), r = Ld();
  return {
    isLink: s,
    isClickable: o,
    route: (c = l.value) == null ? void 0 : c.route,
    navigate: (u = l.value) == null ? void 0 : u.navigate,
    isActive: S(() => {
      var d, m, v;
      return l.value ? e.exact ? r.value ? ((v = l.value.isExactActive) == null ? void 0 : v.value) && Dn(l.value.route.value.query, r.value.query) : ((m = l.value.isExactActive) == null ? void 0 : m.value) ?? !1 : ((d = l.value.isActive) == null ? void 0 : d.value) ?? !1 : !1;
    }),
    href: S(() => {
      var d;
      return e.to ? (d = l.value) == null ? void 0 : d.route.value.href : e.href;
    })
  };
}
const ca = F({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let fo = !1;
function Md(e, t) {
  let n = !1, s, o;
  Le && (et(() => {
    window.addEventListener("popstate", a), s = e == null ? void 0 : e.beforeEach((i, l, r) => {
      fo ? n ? t(r) : r() : setTimeout(() => n ? t(r) : r()), fo = !0;
    }), o = e == null ? void 0 : e.afterEach(() => {
      fo = !1;
    });
  }), Ke(() => {
    window.removeEventListener("popstate", a), s == null || s(), o == null || o();
  }));
  function a(i) {
    var l;
    (l = i.state) != null && l.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function Rd(e, t) {
  ne(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && et(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const Eo = Symbol("rippleStop"), Nd = 80;
function yi(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Po(e) {
  return e.constructor.name === "TouchEvent";
}
function Hl(e) {
  return e.constructor.name === "KeyboardEvent";
}
const Dd = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = 0, o = 0;
  if (!Hl(e)) {
    const m = t.getBoundingClientRect(), v = Po(e) ? e.touches[e.touches.length - 1] : e;
    s = v.clientX - m.left, o = v.clientY - m.top;
  }
  let a = 0, i = 0.3;
  (d = t._ripple) != null && d.circle ? (i = 0.15, a = t.clientWidth / 2, a = n.center ? a : a + Math.sqrt((s - a) ** 2 + (o - a) ** 2) / 4) : a = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const l = `${(t.clientWidth - a * 2) / 2}px`, r = `${(t.clientHeight - a * 2) / 2}px`, c = n.center ? l : `${s - a}px`, u = n.center ? r : `${o - a}px`;
  return {
    radius: a,
    scale: i,
    x: c,
    y: u,
    centerX: l,
    centerY: r
  };
}, _s = {
  /* eslint-disable max-statements */
  show(e, t) {
    var v;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((v = t == null ? void 0 : t._ripple) != null && v.enabled))
      return;
    const s = document.createElement("span"), o = document.createElement("span");
    s.appendChild(o), s.className = "v-ripple__container", n.class && (s.className += ` ${n.class}`);
    const {
      radius: a,
      scale: i,
      x: l,
      y: r,
      centerX: c,
      centerY: u
    } = Dd(e, t, n), d = `${a * 2}px`;
    o.className = "v-ripple__animation", o.style.width = d, o.style.height = d, t.appendChild(s);
    const m = window.getComputedStyle(t);
    m && m.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), o.classList.add("v-ripple__animation--enter"), o.classList.add("v-ripple__animation--visible"), yi(o, `translate(${l}, ${r}) scale3d(${i},${i},${i})`), o.dataset.activated = String(performance.now()), setTimeout(() => {
      o.classList.remove("v-ripple__animation--enter"), o.classList.add("v-ripple__animation--in"), yi(o, `translate(${c}, ${u}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(e) {
    var a;
    if (!((a = e == null ? void 0 : e._ripple) != null && a.enabled)) return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0) return;
    const n = t[t.length - 1];
    if (n.dataset.isHiding) return;
    n.dataset.isHiding = "true";
    const s = performance.now() - Number(n.dataset.activated), o = Math.max(250 - s, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var l;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((l = n.parentNode) == null ? void 0 : l.parentNode) === e && e.removeChild(n.parentNode);
      }, 300);
    }, o);
  }
};
function Fl(e) {
  return typeof e > "u" || !!e;
}
function Tn(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[Eo])) {
    if (e[Eo] = !0, Po(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || Hl(e), n._ripple.class && (t.class = n._ripple.class), Po(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        _s.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var s;
        (s = n == null ? void 0 : n._ripple) != null && s.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Nd);
    } else
      _s.show(e, n, t);
  }
}
function pi(e) {
  e[Eo] = !0;
}
function De(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        De(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), _s.hide(t);
  }
}
function Wl(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let In = !1;
function jl(e) {
  !In && (e.keyCode === Qa.enter || e.keyCode === Qa.space) && (In = !0, Tn(e));
}
function Ul(e) {
  In = !1, De(e);
}
function ql(e) {
  In && (In = !1, De(e));
}
function Gl(e, t, n) {
  const {
    value: s,
    modifiers: o
  } = t, a = Fl(s);
  if (a || _s.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = a, e._ripple.centered = o.center, e._ripple.circle = o.circle, Cl(s) && s.class && (e._ripple.class = s.class), a && !n) {
    if (o.stop) {
      e.addEventListener("touchstart", pi, {
        passive: !0
      }), e.addEventListener("mousedown", pi);
      return;
    }
    e.addEventListener("touchstart", Tn, {
      passive: !0
    }), e.addEventListener("touchend", De, {
      passive: !0
    }), e.addEventListener("touchmove", Wl, {
      passive: !0
    }), e.addEventListener("touchcancel", De), e.addEventListener("mousedown", Tn), e.addEventListener("mouseup", De), e.addEventListener("mouseleave", De), e.addEventListener("keydown", jl), e.addEventListener("keyup", Ul), e.addEventListener("blur", ql), e.addEventListener("dragstart", De, {
      passive: !0
    });
  } else !a && n && Yl(e);
}
function Yl(e) {
  e.removeEventListener("mousedown", Tn), e.removeEventListener("touchstart", Tn), e.removeEventListener("touchend", De), e.removeEventListener("touchmove", Wl), e.removeEventListener("touchcancel", De), e.removeEventListener("mouseup", De), e.removeEventListener("mouseleave", De), e.removeEventListener("keydown", jl), e.removeEventListener("keyup", Ul), e.removeEventListener("dragstart", De), e.removeEventListener("blur", ql);
}
function Hd(e, t) {
  Gl(e, t, !1);
}
function Fd(e) {
  delete e._ripple, Yl(e);
}
function Wd(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = Fl(t.oldValue);
  Gl(e, t, n);
}
const ua = {
  mounted: Hd,
  unmounted: Fd,
  updated: Wd
}, da = F({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: Rl
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: Oe,
  appendIcon: Oe,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...jt(),
  ...ue(),
  ...qt(),
  ...mn(),
  ...fn(),
  ...ia(),
  ...Td(),
  ...Ad(),
  ...$d(),
  ...Pt(),
  ...ca(),
  ...Un(),
  ...xe({
    tag: "button"
  }),
  ...Me(),
  ...Yt({
    variant: "elevated"
  })
}, "VBtn"), Ze = te()({
  name: "VBtn",
  props: da(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: s
    } = t;
    const {
      themeClasses: o
    } = Re(e), {
      borderClasses: a
    } = Ut(e), {
      densityClasses: i
    } = Gt(e), {
      dimensionStyles: l
    } = hn(e), {
      elevationClasses: r
    } = vn(e), {
      loaderClasses: c
    } = Id(e), {
      locationStyles: u
    } = Od(e), {
      positionClasses: d
    } = zd(e), {
      roundedClasses: m
    } = At(e), {
      sizeClasses: v,
      sizeStyles: f
    } = qn(e), h = la(e, e.symbol, !1), y = ra(e, n), b = S(() => {
      var k;
      return e.active !== void 0 ? e.active : y.isLink.value ? (k = y.isActive) == null ? void 0 : k.value : h == null ? void 0 : h.isSelected.value;
    }), C = S(() => b.value ? e.activeColor ?? e.color : e.color), A = S(() => {
      var p, E;
      return {
        color: (h == null ? void 0 : h.isSelected.value) && (!y.isLink.value || ((p = y.isActive) == null ? void 0 : p.value)) || !h || ((E = y.isActive) == null ? void 0 : E.value) ? C.value ?? e.baseColor : e.baseColor,
        variant: e.variant
      };
    }), {
      colorClasses: w,
      colorStyles: P,
      variantClasses: O
    } = Fs(A), T = S(() => (h == null ? void 0 : h.disabled.value) || e.disabled), _ = S(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), L = S(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function I(k) {
      var p;
      T.value || y.isLink.value && (k.metaKey || k.ctrlKey || k.shiftKey || k.button !== 0 || n.target === "_blank") || ((p = y.navigate) == null || p.call(y, k), h == null || h.toggle());
    }
    return Rd(y, h == null ? void 0 : h.select), ie(() => {
      const k = y.isLink.value ? "a" : e.tag, p = !!(e.prependIcon || s.prepend), E = !!(e.appendIcon || s.append), z = !!(e.icon && e.icon !== !0);
      return ct(g(k, {
        type: k === "a" ? void 0 : "button",
        class: ["v-btn", h == null ? void 0 : h.selectedClass.value, {
          "v-btn--active": b.value,
          "v-btn--block": e.block,
          "v-btn--disabled": T.value,
          "v-btn--elevated": _.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--readonly": e.readonly,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, o.value, a.value, w.value, i.value, r.value, c.value, d.value, m.value, v.value, O.value, e.class],
        style: [P.value, l.value, u.value, f.value, e.style],
        "aria-busy": e.loading ? !0 : void 0,
        disabled: T.value || void 0,
        href: y.href.value,
        tabindex: e.loading || e.readonly ? -1 : void 0,
        onClick: I,
        value: L.value
      }, {
        default: () => {
          var W;
          return [Hs(!0, "v-btn"), !e.icon && p && g("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [s.prepend ? g(Te, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, s.prepend) : g(Ie, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), g("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!s.default && z ? g(Ie, {
            key: "content-icon",
            icon: e.icon
          }, null) : g(Te, {
            key: "content-defaults",
            disabled: !z,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var U;
              return [((U = s.default) == null ? void 0 : U.call(s)) ?? e.text];
            }
          })]), !e.icon && E && g("span", {
            key: "append",
            class: "v-btn__append"
          }, [s.append ? g(Te, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, s.append) : g(Ie, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && g("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((W = s.loader) == null ? void 0 : W.call(s)) ?? g(Pd, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            width: "2"
          }, null)])];
        }
      }), [[ua, !T.value && e.ripple, "", {
        center: !!e.icon
      }]]);
    }), {
      group: h
    };
  }
}), jd = F({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function je(e, t, n) {
  return te()({
    name: e,
    props: jd({
      mode: n,
      origin: t
    }),
    setup(s, o) {
      let {
        slots: a
      } = o;
      const i = {
        onBeforeEnter(l) {
          s.origin && (l.style.transformOrigin = s.origin);
        },
        onLeave(l) {
          if (s.leaveAbsolute) {
            const {
              offsetTop: r,
              offsetLeft: c,
              offsetWidth: u,
              offsetHeight: d
            } = l;
            l._transitionInitialStyles = {
              position: l.style.position,
              top: l.style.top,
              left: l.style.left,
              width: l.style.width,
              height: l.style.height
            }, l.style.position = "absolute", l.style.top = `${r}px`, l.style.left = `${c}px`, l.style.width = `${u}px`, l.style.height = `${d}px`;
          }
          s.hideOnLeave && l.style.setProperty("display", "none", "important");
        },
        onAfterLeave(l) {
          if (s.leaveAbsolute && (l != null && l._transitionInitialStyles)) {
            const {
              position: r,
              top: c,
              left: u,
              width: d,
              height: m
            } = l._transitionInitialStyles;
            delete l._transitionInitialStyles, l.style.position = r || "", l.style.top = c || "", l.style.left = u || "", l.style.width = d || "", l.style.height = m || "";
          }
        }
      };
      return () => {
        const l = s.group ? Zo : _t;
        return kt(l, {
          name: s.disabled ? "" : e,
          css: !s.disabled,
          ...s.group ? void 0 : {
            mode: s.mode
          },
          ...s.disabled ? {} : i
        }, a.default);
      };
    }
  });
}
function Xl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return te()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: Boolean,
      group: Boolean
    },
    setup(s, o) {
      let {
        slots: a
      } = o;
      const i = s.group ? Zo : _t;
      return () => kt(i, {
        name: s.disabled ? "" : e,
        css: !s.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...s.disabled ? {} : t
      }, a.default);
    }
  });
}
function Kl() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", s = ll(`offset-${n}`);
  return {
    onBeforeEnter(i) {
      i._parent = i.parentNode, i._initialStyle = {
        transition: i.style.transition,
        overflow: i.style.overflow,
        [n]: i.style[n]
      };
    },
    onEnter(i) {
      const l = i._initialStyle;
      i.style.setProperty("transition", "none", "important"), i.style.overflow = "hidden";
      const r = `${i[s]}px`;
      i.style[n] = "0", i.offsetHeight, i.style.transition = l.transition, e && i._parent && i._parent.classList.add(e), requestAnimationFrame(() => {
        i.style[n] = r;
      });
    },
    onAfterEnter: a,
    onEnterCancelled: a,
    onLeave(i) {
      i._initialStyle = {
        transition: "",
        overflow: i.style.overflow,
        [n]: i.style[n]
      }, i.style.overflow = "hidden", i.style[n] = `${i[s]}px`, i.offsetHeight, requestAnimationFrame(() => i.style[n] = "0");
    },
    onAfterLeave: o,
    onLeaveCancelled: o
  };
  function o(i) {
    e && i._parent && i._parent.classList.remove(e), a(i);
  }
  function a(i) {
    const l = i._initialStyle[n];
    i.style.overflow = i._initialStyle.overflow, l != null && (i.style[n] = l), delete i._initialStyle;
  }
}
const Ud = F({
  target: [Object, Array]
}, "v-dialog-transition"), qd = te()({
  name: "VDialogTransition",
  props: Ud(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const s = {
      onBeforeEnter(o) {
        o.style.pointerEvents = "none", o.style.visibility = "hidden";
      },
      async onEnter(o, a) {
        var m;
        await new Promise((v) => requestAnimationFrame(v)), await new Promise((v) => requestAnimationFrame(v)), o.style.visibility = "";
        const {
          x: i,
          y: l,
          sx: r,
          sy: c,
          speed: u
        } = Si(e.target, o), d = Jt(o, [{
          transform: `translate(${i}px, ${l}px) scale(${r}, ${c})`,
          opacity: 0
        }, {}], {
          duration: 225 * u,
          easing: cd
        });
        (m = bi(o)) == null || m.forEach((v) => {
          Jt(v, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * u,
            easing: Ss
          });
        }), d.finished.then(() => a());
      },
      onAfterEnter(o) {
        o.style.removeProperty("pointer-events");
      },
      onBeforeLeave(o) {
        o.style.pointerEvents = "none";
      },
      async onLeave(o, a) {
        var m;
        await new Promise((v) => requestAnimationFrame(v));
        const {
          x: i,
          y: l,
          sx: r,
          sy: c,
          speed: u
        } = Si(e.target, o);
        Jt(o, [{}, {
          transform: `translate(${i}px, ${l}px) scale(${r}, ${c})`,
          opacity: 0
        }], {
          duration: 125 * u,
          easing: ud
        }).finished.then(() => a()), (m = bi(o)) == null || m.forEach((v) => {
          Jt(v, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * u,
            easing: Ss
          });
        });
      },
      onAfterLeave(o) {
        o.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? g(_t, ce({
      name: "dialog-transition"
    }, s, {
      css: !1
    }), n) : g(_t, {
      name: "dialog-transition"
    }, n);
  }
});
function bi(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function Si(e, t) {
  const n = Il(e), s = Vl(t), [o, a] = getComputedStyle(t).transformOrigin.split(" ").map((b) => parseFloat(b)), [i, l] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let r = n.left + n.width / 2;
  i === "left" || l === "left" ? r -= n.width / 2 : (i === "right" || l === "right") && (r += n.width / 2);
  let c = n.top + n.height / 2;
  i === "top" || l === "top" ? c -= n.height / 2 : (i === "bottom" || l === "bottom") && (c += n.height / 2);
  const u = n.width / s.width, d = n.height / s.height, m = Math.max(1, u, d), v = u / m || 0, f = d / m || 0, h = s.width * s.height / (window.innerWidth * window.innerHeight), y = h > 0.12 ? Math.min(1.5, (h - 0.12) * 10 + 1) : 1;
  return {
    x: r - (o + s.left),
    y: c - (a + s.top),
    sx: v,
    sy: f,
    speed: y
  };
}
je("fab-transition", "center center", "out-in");
je("dialog-bottom-transition");
je("dialog-top-transition");
const wi = je("fade-transition");
je("scale-transition");
je("scroll-x-transition");
je("scroll-x-reverse-transition");
je("scroll-y-transition");
je("scroll-y-reverse-transition");
je("slide-x-transition");
je("slide-x-reverse-transition");
je("slide-y-transition");
je("slide-y-reverse-transition");
const Ql = Xl("expand-transition", Kl()), Gd = Xl("expand-x-transition", Kl("", !0));
function Yd(e) {
  return {
    aspectStyles: S(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const Zl = F({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...ue(),
  ...mn()
}, "VResponsive"), xi = te()({
  name: "VResponsive",
  props: Zl(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: s
    } = Yd(e), {
      dimensionStyles: o
    } = hn(e);
    return ie(() => {
      var a;
      return g("div", {
        class: ["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class],
        style: [o.value, e.style]
      }, [g("div", {
        class: "v-responsive__sizer",
        style: s.value
      }, null), (a = n.additional) == null ? void 0 : a.call(n), n.default && g("div", {
        class: ["v-responsive__content", e.contentClass]
      }, [n.default()])]);
    }), {};
  }
}), Jl = F({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), $t = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: s,
    disabled: o,
    group: a,
    ...i
  } = e, {
    component: l = a ? Zo : _t,
    ...r
  } = typeof s == "object" ? s : {};
  return kt(l, ce(typeof s == "string" ? {
    name: o ? "" : s
  } : r, typeof s == "string" ? {} : Object.fromEntries(Object.entries({
    disabled: o,
    group: a
  }).filter((c) => {
    let [u, d] = c;
    return d !== void 0;
  })), i), n);
};
function Xd(e, t) {
  if (!Jo) return;
  const n = t.modifiers || {}, s = t.value, {
    handler: o,
    options: a
  } = typeof s == "object" ? s : {
    handler: s,
    options: {}
  }, i = new IntersectionObserver(function() {
    var d;
    let l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], r = arguments.length > 1 ? arguments[1] : void 0;
    const c = (d = e._observe) == null ? void 0 : d[t.instance.$.uid];
    if (!c) return;
    const u = l.some((m) => m.isIntersecting);
    o && (!n.quiet || c.init) && (!n.once || u || c.init) && o(u, l, r), u && n.once ? er(e, t) : c.init = !0;
  }, a);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: i
  }, i.observe(e);
}
function er(e, t) {
  var s;
  const n = (s = e._observe) == null ? void 0 : s[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const Kd = {
  mounted: Xd,
  unmounted: er
}, Qd = F({
  absolute: Boolean,
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...Zl(),
  ...ue(),
  ...Pt(),
  ...Jl()
}, "VImg"), tr = te()({
  name: "VImg",
  directives: {
    intersect: Kd
  },
  props: Qd(),
  emits: {
    loadstart: (e) => !0,
    load: (e) => !0,
    error: (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: s
    } = t;
    const {
      backgroundColorClasses: o,
      backgroundColorStyles: a
    } = Wn(Q(e, "color")), {
      roundedClasses: i
    } = At(e), l = ke("VImg"), r = ee(""), c = J(), u = ee(e.eager ? "loading" : "idle"), d = ee(), m = ee(), v = S(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), f = S(() => v.value.aspect || d.value / m.value || 0);
    ne(() => e.src, () => {
      h(u.value !== "idle");
    }), ne(f, (p, E) => {
      !p && E && c.value && w(c.value);
    }), Gc(() => h());
    function h(p) {
      if (!(e.eager && p) && !(Jo && !p && !e.eager)) {
        if (u.value = "loading", v.value.lazySrc) {
          const E = new Image();
          E.src = v.value.lazySrc, w(E, null);
        }
        v.value.src && et(() => {
          var E;
          n("loadstart", ((E = c.value) == null ? void 0 : E.currentSrc) || v.value.src), setTimeout(() => {
            var z;
            if (!l.isUnmounted)
              if ((z = c.value) != null && z.complete) {
                if (c.value.naturalWidth || b(), u.value === "error") return;
                f.value || w(c.value, null), u.value === "loading" && y();
              } else
                f.value || w(c.value), C();
          });
        });
      }
    }
    function y() {
      var p;
      l.isUnmounted || (C(), w(c.value), u.value = "loaded", n("load", ((p = c.value) == null ? void 0 : p.currentSrc) || v.value.src));
    }
    function b() {
      var p;
      l.isUnmounted || (u.value = "error", n("error", ((p = c.value) == null ? void 0 : p.currentSrc) || v.value.src));
    }
    function C() {
      const p = c.value;
      p && (r.value = p.currentSrc || p.src);
    }
    let A = -1;
    tt(() => {
      clearTimeout(A);
    });
    function w(p) {
      let E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const z = () => {
        if (clearTimeout(A), l.isUnmounted) return;
        const {
          naturalHeight: W,
          naturalWidth: U
        } = p;
        W || U ? (d.value = U, m.value = W) : !p.complete && u.value === "loading" && E != null ? A = window.setTimeout(z, E) : (p.currentSrc.endsWith(".svg") || p.currentSrc.startsWith("data:image/svg+xml")) && (d.value = 1, m.value = 1);
      };
      z();
    }
    const P = S(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), O = () => {
      var z;
      if (!v.value.src || u.value === "idle") return null;
      const p = g("img", {
        class: ["v-img__img", P.value],
        style: {
          objectPosition: e.position
        },
        src: v.value.src,
        srcset: v.value.srcset,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable,
        sizes: e.sizes,
        ref: c,
        onLoad: y,
        onError: b
      }, null), E = (z = s.sources) == null ? void 0 : z.call(s);
      return g($t, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [ct(E ? g("picture", {
          class: "v-img__picture"
        }, [E, p]) : p, [[un, u.value === "loaded"]])]
      });
    }, T = () => g($t, {
      transition: e.transition
    }, {
      default: () => [v.value.lazySrc && u.value !== "loaded" && g("img", {
        class: ["v-img__img", "v-img__img--preload", P.value],
        style: {
          objectPosition: e.position
        },
        src: v.value.lazySrc,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), _ = () => s.placeholder ? g($t, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(u.value === "loading" || u.value === "error" && !s.error) && g("div", {
        class: "v-img__placeholder"
      }, [s.placeholder()])]
    }) : null, L = () => s.error ? g($t, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [u.value === "error" && g("div", {
        class: "v-img__error"
      }, [s.error()])]
    }) : null, I = () => e.gradient ? g("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, k = ee(!1);
    {
      const p = ne(f, (E) => {
        E && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            k.value = !0;
          });
        }), p());
      });
    }
    return ie(() => {
      const p = xi.filterProps(e);
      return ct(g(xi, ce({
        class: ["v-img", {
          "v-img--absolute": e.absolute,
          "v-img--booting": !k.value
        }, o.value, i.value, e.class],
        style: [{
          width: se(e.width === "auto" ? d.value : e.width)
        }, a.value, e.style]
      }, p, {
        aspectRatio: f.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => g(Ye, null, [g(O, null, null), g(T, null, null), g(I, null, null), g(_, null, null), g(L, null, null)]),
        default: s.default
      }), [[Nn("intersect"), {
        handler: h,
        options: e.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: r,
      image: c,
      state: u,
      naturalWidth: d,
      naturalHeight: m
    };
  }
}), Zd = F({
  start: Boolean,
  end: Boolean,
  icon: Oe,
  image: String,
  text: String,
  ...jt(),
  ...ue(),
  ...qt(),
  ...Pt(),
  ...Un(),
  ...xe(),
  ...Me(),
  ...Yt({
    variant: "flat"
  })
}, "VAvatar"), ks = te()({
  name: "VAvatar",
  props: Zd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: s
    } = Re(e), {
      borderClasses: o
    } = Ut(e), {
      colorClasses: a,
      colorStyles: i,
      variantClasses: l
    } = Fs(e), {
      densityClasses: r
    } = Gt(e), {
      roundedClasses: c
    } = At(e), {
      sizeClasses: u,
      sizeStyles: d
    } = qn(e);
    return ie(() => g(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, s.value, o.value, a.value, r.value, c.value, u.value, l.value, e.class],
      style: [i.value, d.value, e.style]
    }, {
      default: () => [n.default ? g(Te, {
        key: "content-defaults",
        defaults: {
          VImg: {
            cover: !0,
            src: e.image
          },
          VIcon: {
            icon: e.icon
          }
        }
      }, {
        default: () => [n.default()]
      }) : e.image ? g(tr, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? g(Ie, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, Hs(!1, "v-avatar")]
    })), {};
  }
}), Us = ["sm", "md", "lg", "xl", "xxl"], Jd = Symbol.for("vuetify:display"), ef = F({
  mobile: {
    type: Boolean,
    default: !1
  },
  mobileBreakpoint: [Number, String]
}, "display");
function nr() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Et();
  const n = be(Jd);
  if (!n) throw new Error("Could not find Vuetify display injection");
  const s = S(() => {
    if (e.mobile != null) return e.mobile;
    if (!e.mobileBreakpoint) return n.mobile.value;
    const a = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < a;
  }), o = S(() => t ? {
    [`${t}--mobile`]: s.value
  } : {});
  return {
    ...n,
    displayClasses: o,
    mobile: s
  };
}
const tf = Symbol.for("vuetify:goto");
function nf() {
  return {
    container: void 0,
    duration: 300,
    layout: !1,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: {
      linear: (e) => e,
      easeInQuad: (e) => e ** 2,
      easeOutQuad: (e) => e * (2 - e),
      easeInOutQuad: (e) => e < 0.5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e,
      easeInCubic: (e) => e ** 3,
      easeOutCubic: (e) => --e ** 3 + 1,
      easeInOutCubic: (e) => e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
      easeInQuart: (e) => e ** 4,
      easeOutQuart: (e) => 1 - --e ** 4,
      easeInOutQuart: (e) => e < 0.5 ? 8 * e ** 4 : 1 - 8 * --e ** 4,
      easeInQuint: (e) => e ** 5,
      easeOutQuint: (e) => 1 + --e ** 5,
      easeInOutQuint: (e) => e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e ** 5
    }
  };
}
function sf(e) {
  return fa(e) ?? (document.scrollingElement || document.body);
}
function fa(e) {
  return typeof e == "string" ? document.querySelector(e) : _l(e);
}
function vo(e, t, n) {
  if (typeof e == "number") return t && n ? -e : e;
  let s = fa(e), o = 0;
  for (; s; )
    o += t ? s.offsetLeft : s.offsetTop, s = s.offsetParent;
  return o;
}
async function Ci(e, t, n, s) {
  const o = n ? "scrollLeft" : "scrollTop", a = gt((s == null ? void 0 : s.options) ?? nf(), t), i = s == null ? void 0 : s.rtl.value, l = (typeof e == "number" ? e : fa(e)) ?? 0, r = a.container === "parent" && l instanceof HTMLElement ? l.parentElement : sf(a.container), c = typeof a.easing == "function" ? a.easing : a.patterns[a.easing];
  if (!c) throw new TypeError(`Easing function "${a.easing}" not found.`);
  let u;
  if (typeof l == "number")
    u = vo(l, n, i);
  else if (u = vo(l, n, i) - vo(r, n, i), a.layout) {
    const f = window.getComputedStyle(l).getPropertyValue("--v-layout-top");
    f && (u -= parseInt(f, 10));
  }
  u += a.offset, u = af(r, u, !!i, !!n);
  const d = r[o] ?? 0;
  if (u === d) return Promise.resolve(u);
  const m = performance.now();
  return new Promise((v) => requestAnimationFrame(function f(h) {
    const b = (h - m) / a.duration, C = Math.floor(d + (u - d) * c(gs(b, 0, 1)));
    if (r[o] = C, b >= 1 && Math.abs(C - r[o]) < 10)
      return v(u);
    if (b > 2)
      return xt("Scroll target is not reachable"), v(r[o]);
    requestAnimationFrame(f);
  }));
}
function of() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = be(tf), {
    isRtl: n
  } = Ot();
  if (!t) throw new Error("[Vuetify] Could not find injected goto instance");
  const s = {
    ...t,
    // can be set via VLocaleProvider
    rtl: S(() => t.rtl.value || n.value)
  };
  async function o(a, i) {
    return Ci(a, gt(e, i), !1, s);
  }
  return o.horizontal = async (a, i) => Ci(a, gt(e, i), !0, s), o;
}
function af(e, t, n, s) {
  const {
    scrollWidth: o,
    scrollHeight: a
  } = e, [i, l] = e === document.scrollingElement ? [window.innerWidth, window.innerHeight] : [e.offsetWidth, e.offsetHeight];
  let r, c;
  return s ? n ? (r = -(o - i), c = 0) : (r = 0, c = o - i) : (r = 0, c = a + -l), Math.max(Math.min(t, c), r);
}
function lf(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isRtl: s,
    isHorizontal: o
  } = e;
  const a = Vn(o, n), i = sr(o, s, n), l = Vn(o, t), r = or(o, t), c = l * 0.4;
  return i > r ? r - c : i + a < r + l ? r - a + l + c : i;
}
function rf(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isHorizontal: s
  } = e;
  const o = Vn(s, n), a = or(s, t), i = Vn(s, t);
  return a - o / 2 + i / 2;
}
function _i(e, t) {
  const n = e ? "scrollWidth" : "scrollHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function cf(e, t) {
  const n = e ? "clientWidth" : "clientHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function sr(e, t, n) {
  if (!n)
    return 0;
  const {
    scrollLeft: s,
    offsetWidth: o,
    scrollWidth: a
  } = n;
  return e ? t ? a - o + s : s : n.scrollTop;
}
function Vn(e, t) {
  const n = e ? "offsetWidth" : "offsetHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function or(e, t) {
  const n = e ? "offsetLeft" : "offsetTop";
  return (t == null ? void 0 : t[n]) || 0;
}
const uf = Symbol.for("vuetify:v-slide-group"), va = F({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: uf
  },
  nextIcon: {
    type: Oe,
    default: "$next"
  },
  prevIcon: {
    type: Oe,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...ue(),
  ...ef({
    mobile: null
  }),
  ...xe(),
  ...aa({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), Es = te()({
  name: "VSlideGroup",
  props: va(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: s
    } = Ot(), {
      displayClasses: o,
      mobile: a
    } = nr(e), i = Ws(e, e.symbol), l = ee(!1), r = ee(0), c = ee(0), u = ee(0), d = S(() => e.direction === "horizontal"), {
      resizeRef: m,
      contentRect: v
    } = Cs(), {
      resizeRef: f,
      contentRect: h
    } = Cs(), y = of(), b = S(() => ({
      container: m.el,
      duration: 200,
      easing: "easeOutQuart"
    })), C = S(() => i.selected.value.length ? i.items.value.findIndex((R) => R.id === i.selected.value[0]) : -1), A = S(() => i.selected.value.length ? i.items.value.findIndex((R) => R.id === i.selected.value[i.selected.value.length - 1]) : -1);
    if (Le) {
      let R = -1;
      ne(() => [i.selected.value, v.value, h.value, d.value], () => {
        cancelAnimationFrame(R), R = requestAnimationFrame(() => {
          if (v.value && h.value) {
            const x = d.value ? "width" : "height";
            c.value = v.value[x], u.value = h.value[x], l.value = c.value + 1 < u.value;
          }
          if (C.value >= 0 && f.el) {
            const x = f.el.children[A.value];
            P(x, e.centerActive);
          }
        });
      });
    }
    const w = ee(!1);
    function P(R, x) {
      let V = 0;
      x ? V = rf({
        containerElement: m.el,
        isHorizontal: d.value,
        selectedElement: R
      }) : V = lf({
        containerElement: m.el,
        isHorizontal: d.value,
        isRtl: s.value,
        selectedElement: R
      }), O(V);
    }
    function O(R) {
      if (!Le || !m.el) return;
      const x = Vn(d.value, m.el), V = sr(d.value, s.value, m.el);
      if (!(_i(d.value, m.el) <= x || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(R - V) < 16)) {
        if (d.value && s.value && m.el) {
          const {
            scrollWidth: H,
            offsetWidth: $
          } = m.el;
          R = H - $ - R;
        }
        d.value ? y.horizontal(R, b.value) : y(R, b.value);
      }
    }
    function T(R) {
      const {
        scrollTop: x,
        scrollLeft: V
      } = R.target;
      r.value = d.value ? V : x;
    }
    function _(R) {
      if (w.value = !0, !(!l.value || !f.el)) {
        for (const x of R.composedPath())
          for (const V of f.el.children)
            if (V === x) {
              P(V);
              return;
            }
      }
    }
    function L(R) {
      w.value = !1;
    }
    let I = !1;
    function k(R) {
      var x;
      !I && !w.value && !(R.relatedTarget && ((x = f.el) != null && x.contains(R.relatedTarget))) && z(), I = !1;
    }
    function p() {
      I = !0;
    }
    function E(R) {
      if (!f.el) return;
      function x(V) {
        R.preventDefault(), z(V);
      }
      d.value ? R.key === "ArrowRight" ? x(s.value ? "prev" : "next") : R.key === "ArrowLeft" && x(s.value ? "next" : "prev") : R.key === "ArrowDown" ? x("next") : R.key === "ArrowUp" && x("prev"), R.key === "Home" ? x("first") : R.key === "End" && x("last");
    }
    function z(R) {
      var V, M;
      if (!f.el) return;
      let x;
      if (!R)
        x = ps(f.el)[0];
      else if (R === "next") {
        if (x = (V = f.el.querySelector(":focus")) == null ? void 0 : V.nextElementSibling, !x) return z("first");
      } else if (R === "prev") {
        if (x = (M = f.el.querySelector(":focus")) == null ? void 0 : M.previousElementSibling, !x) return z("last");
      } else R === "first" ? x = f.el.firstElementChild : R === "last" && (x = f.el.lastElementChild);
      x && x.focus({
        preventScroll: !0
      });
    }
    function W(R) {
      const x = d.value && s.value ? -1 : 1, V = (R === "prev" ? -x : x) * c.value;
      let M = r.value + V;
      if (d.value && s.value && m.el) {
        const {
          scrollWidth: H,
          offsetWidth: $
        } = m.el;
        M += H - $;
      }
      O(M);
    }
    const U = S(() => ({
      next: i.next,
      prev: i.prev,
      select: i.select,
      isSelected: i.isSelected
    })), K = S(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !a.value;
        case !0:
          return l.value || Math.abs(r.value) > 0;
        case "mobile":
          return a.value || l.value || Math.abs(r.value) > 0;
        default:
          return !a.value && (l.value || Math.abs(r.value) > 0);
      }
    }), G = S(() => Math.abs(r.value) > 1), Y = S(() => {
      if (!m.value) return !1;
      const R = _i(d.value, m.el), x = cf(d.value, m.el);
      return R - x - Math.abs(r.value) > 1;
    });
    return ie(() => g(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": K.value,
        "v-slide-group--is-overflowing": l.value
      }, o.value, e.class],
      style: e.style,
      tabindex: w.value || i.selected.value.length ? -1 : 0,
      onFocus: k
    }, {
      default: () => {
        var R, x, V;
        return [K.value && g("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !G.value
          }],
          onMousedown: p,
          onClick: () => G.value && W("prev")
        }, [((R = n.prev) == null ? void 0 : R.call(n, U.value)) ?? g(wi, null, {
          default: () => [g(Ie, {
            icon: s.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), g("div", {
          key: "container",
          ref: m,
          class: "v-slide-group__container",
          onScroll: T
        }, [g("div", {
          ref: f,
          class: "v-slide-group__content",
          onFocusin: _,
          onFocusout: L,
          onKeydown: E
        }, [(x = n.default) == null ? void 0 : x.call(n, U.value)])]), K.value && g("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !Y.value
          }],
          onMousedown: p,
          onClick: () => Y.value && W("next")
        }, [((V = n.next) == null ? void 0 : V.call(n, U.value)) ?? g(wi, null, {
          default: () => [g(Ie, {
            icon: s.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: i.selected,
      scrollTo: W,
      scrollOffset: r,
      focus: z,
      hasPrev: G,
      hasNext: Y
    };
  }
}), ar = Symbol.for("vuetify:v-chip-group"), df = F({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: Dn
  },
  ...va(),
  ...ue(),
  ...aa({
    selectedClass: "v-chip--selected"
  }),
  ...xe(),
  ...Me(),
  ...Yt({
    variant: "tonal"
  })
}, "VChipGroup");
te()({
  name: "VChipGroup",
  props: df(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: s
    } = Re(e), {
      isSelected: o,
      select: a,
      next: i,
      prev: l,
      selected: r
    } = Ws(e, ar);
    return dn({
      VChip: {
        color: Q(e, "color"),
        disabled: Q(e, "disabled"),
        filter: Q(e, "filter"),
        variant: Q(e, "variant")
      }
    }), ie(() => {
      const c = Es.filterProps(e);
      return g(Es, ce(c, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, s.value, e.class],
        style: e.style
      }), {
        default: () => {
          var u;
          return [(u = n.default) == null ? void 0 : u.call(n, {
            isSelected: o,
            select: a,
            next: i,
            prev: l,
            selected: r.value
          })];
        }
      });
    }), {};
  }
});
const ff = F({
  activeClass: String,
  appendAvatar: String,
  appendIcon: Oe,
  closable: Boolean,
  closeIcon: {
    type: Oe,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: String,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: Oe,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: Rt(),
  onClickOnce: Rt(),
  ...jt(),
  ...ue(),
  ...qt(),
  ...fn(),
  ...ia(),
  ...Pt(),
  ...ca(),
  ...Un(),
  ...xe({
    tag: "span"
  }),
  ...Me(),
  ...Yt({
    variant: "tonal"
  })
}, "VChip"), ki = te()({
  name: "VChip",
  directives: {
    Ripple: ua
  },
  props: ff(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0,
    "group:selected": (e) => !0,
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: s,
      slots: o
    } = t;
    const {
      t: a
    } = Dl(), {
      borderClasses: i
    } = Ut(e), {
      colorClasses: l,
      colorStyles: r,
      variantClasses: c
    } = Fs(e), {
      densityClasses: u
    } = Gt(e), {
      elevationClasses: d
    } = vn(e), {
      roundedClasses: m
    } = At(e), {
      sizeClasses: v
    } = qn(e), {
      themeClasses: f
    } = Re(e), h = it(e, "modelValue"), y = la(e, ar, !1), b = ra(e, n), C = S(() => e.link !== !1 && b.isLink.value), A = S(() => !e.disabled && e.link !== !1 && (!!y || e.link || b.isClickable.value)), w = S(() => ({
      "aria-label": a(e.closeLabel),
      onClick(T) {
        T.preventDefault(), T.stopPropagation(), h.value = !1, s("click:close", T);
      }
    }));
    function P(T) {
      var _;
      s("click", T), A.value && ((_ = b.navigate) == null || _.call(b, T), y == null || y.toggle());
    }
    function O(T) {
      (T.key === "Enter" || T.key === " ") && (T.preventDefault(), P(T));
    }
    return () => {
      const T = b.isLink.value ? "a" : e.tag, _ = !!(e.appendIcon || e.appendAvatar), L = !!(_ || o.append), I = !!(o.close || e.closable), k = !!(o.filter || e.filter) && y, p = !!(e.prependIcon || e.prependAvatar), E = !!(p || o.prepend), z = !y || y.isSelected.value;
      return h.value && ct(g(T, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": A.value,
          "v-chip--filter": k,
          "v-chip--pill": e.pill
        }, f.value, i.value, z ? l.value : void 0, u.value, d.value, m.value, v.value, c.value, y == null ? void 0 : y.selectedClass.value, e.class],
        style: [z ? r.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        href: b.href.value,
        tabindex: A.value ? 0 : void 0,
        onClick: P,
        onKeydown: A.value && !C.value && O
      }, {
        default: () => {
          var W;
          return [Hs(A.value, "v-chip"), k && g(Gd, {
            key: "filter"
          }, {
            default: () => [ct(g("div", {
              class: "v-chip__filter"
            }, [o.filter ? g(Te, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, o.filter) : g(Ie, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[un, y.isSelected.value]])]
          }), E && g("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [o.prepend ? g(Te, {
            key: "prepend-defaults",
            disabled: !p,
            defaults: {
              VAvatar: {
                image: e.prependAvatar,
                start: !0
              },
              VIcon: {
                icon: e.prependIcon,
                start: !0
              }
            }
          }, o.prepend) : g(Ye, null, [e.prependIcon && g(Ie, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && g(ks, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), g("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((W = o.default) == null ? void 0 : W.call(o, {
            isSelected: y == null ? void 0 : y.isSelected.value,
            selectedClass: y == null ? void 0 : y.selectedClass.value,
            select: y == null ? void 0 : y.select,
            toggle: y == null ? void 0 : y.toggle,
            value: y == null ? void 0 : y.value.value,
            disabled: e.disabled
          })) ?? e.text]), L && g("div", {
            key: "append",
            class: "v-chip__append"
          }, [o.append ? g(Te, {
            key: "append-defaults",
            disabled: !_,
            defaults: {
              VAvatar: {
                end: !0,
                image: e.appendAvatar
              },
              VIcon: {
                end: !0,
                icon: e.appendIcon
              }
            }
          }, o.append) : g(Ye, null, [e.appendIcon && g(Ie, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && g(ks, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), I && g("button", ce({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, w.value), [o.close ? g(Te, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, o.close) : g(Ie, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Nn("ripple"), A.value && e.ripple, null]]);
    };
  }
}), mo = Symbol("Forwarded refs");
function ho(e, t) {
  let n = e;
  for (; n; ) {
    const s = Reflect.getOwnPropertyDescriptor(n, t);
    if (s) return s;
    n = Object.getPrototypeOf(n);
  }
}
function ir(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
    n[s - 1] = arguments[s];
  return e[mo] = n, new Proxy(e, {
    get(o, a) {
      if (Reflect.has(o, a))
        return Reflect.get(o, a);
      if (!(typeof a == "symbol" || a.startsWith("$") || a.startsWith("__"))) {
        for (const i of n)
          if (i.value && Reflect.has(i.value, a)) {
            const l = Reflect.get(i.value, a);
            return typeof l == "function" ? l.bind(i.value) : l;
          }
      }
    },
    has(o, a) {
      if (Reflect.has(o, a))
        return !0;
      if (typeof a == "symbol" || a.startsWith("$") || a.startsWith("__")) return !1;
      for (const i of n)
        if (i.value && Reflect.has(i.value, a))
          return !0;
      return !1;
    },
    set(o, a, i) {
      if (Reflect.has(o, a))
        return Reflect.set(o, a, i);
      if (typeof a == "symbol" || a.startsWith("$") || a.startsWith("__")) return !1;
      for (const l of n)
        if (l.value && Reflect.has(l.value, a))
          return Reflect.set(l.value, a, i);
      return !1;
    },
    getOwnPropertyDescriptor(o, a) {
      var l;
      const i = Reflect.getOwnPropertyDescriptor(o, a);
      if (i) return i;
      if (!(typeof a == "symbol" || a.startsWith("$") || a.startsWith("__"))) {
        for (const r of n) {
          if (!r.value) continue;
          const c = ho(r.value, a) ?? ("_" in r.value ? ho((l = r.value._) == null ? void 0 : l.setupState, a) : void 0);
          if (c) return c;
        }
        for (const r of n) {
          const c = r.value && r.value[mo];
          if (!c) continue;
          const u = c.slice();
          for (; u.length; ) {
            const d = u.shift(), m = ho(d.value, a);
            if (m) return m;
            const v = d.value && d.value[mo];
            v && u.push(...v);
          }
        }
      }
    }
  });
}
const ma = Symbol.for("vuetify:v-tabs"), vf = F({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...Ds(da({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab"), qe = te()({
  name: "VTab",
  props: vf(),
  setup(e, t) {
    let {
      slots: n,
      attrs: s
    } = t;
    const {
      textColorClasses: o,
      textColorStyles: a
    } = on(e, "sliderColor"), i = J(), l = J(), r = S(() => e.direction === "horizontal"), c = S(() => {
      var d, m;
      return ((m = (d = i.value) == null ? void 0 : d.group) == null ? void 0 : m.isSelected.value) ?? !1;
    });
    function u(d) {
      var v, f;
      let {
        value: m
      } = d;
      if (m) {
        const h = (f = (v = i.value) == null ? void 0 : v.$el.parentElement) == null ? void 0 : f.querySelector(".v-tab--selected .v-tab__slider"), y = l.value;
        if (!h || !y) return;
        const b = getComputedStyle(h).color, C = h.getBoundingClientRect(), A = y.getBoundingClientRect(), w = r.value ? "x" : "y", P = r.value ? "X" : "Y", O = r.value ? "right" : "bottom", T = r.value ? "width" : "height", _ = C[w], L = A[w], I = _ > L ? C[O] - A[O] : C[w] - A[w], k = Math.sign(I) > 0 ? r.value ? "right" : "bottom" : Math.sign(I) < 0 ? r.value ? "left" : "top" : "center", E = (Math.abs(I) + (Math.sign(I) < 0 ? C[T] : A[T])) / Math.max(C[T], A[T]) || 0, z = C[T] / A[T] || 0, W = 1.5;
        Jt(y, {
          backgroundColor: [b, "currentcolor"],
          transform: [`translate${P}(${I}px) scale${P}(${z})`, `translate${P}(${I / W}px) scale${P}(${(E - 1) / W + 1})`, "none"],
          transformOrigin: Array(3).fill(k)
        }, {
          duration: 225,
          easing: Ss
        });
      }
    }
    return ie(() => {
      const d = Ze.filterProps(e);
      return g(Ze, ce({
        symbol: ma,
        ref: i,
        class: ["v-tab", e.class],
        style: e.style,
        tabindex: c.value ? 0 : -1,
        role: "tab",
        "aria-selected": String(c.value),
        active: !1
      }, d, s, {
        block: e.fixed,
        maxWidth: e.fixed ? 300 : void 0,
        "onGroup:selected": u
      }), {
        ...n,
        default: () => {
          var m;
          return g(Ye, null, [((m = n.default) == null ? void 0 : m.call(n)) ?? e.text, !e.hideSlider && g("div", {
            ref: l,
            class: ["v-tab__slider", o.value],
            style: a.value
          }, null)]);
        }
      });
    }), ir({}, i);
  }
}), mf = (e) => {
  const {
    touchstartX: t,
    touchendX: n,
    touchstartY: s,
    touchendY: o
  } = e, a = 0.5, i = 16;
  e.offsetX = n - t, e.offsetY = o - s, Math.abs(e.offsetY) < a * Math.abs(e.offsetX) && (e.left && n < t - i && e.left(e), e.right && n > t + i && e.right(e)), Math.abs(e.offsetX) < a * Math.abs(e.offsetY) && (e.up && o < s - i && e.up(e), e.down && o > s + i && e.down(e));
};
function hf(e, t) {
  var s;
  const n = e.changedTouches[0];
  t.touchstartX = n.clientX, t.touchstartY = n.clientY, (s = t.start) == null || s.call(t, {
    originalEvent: e,
    ...t
  });
}
function gf(e, t) {
  var s;
  const n = e.changedTouches[0];
  t.touchendX = n.clientX, t.touchendY = n.clientY, (s = t.end) == null || s.call(t, {
    originalEvent: e,
    ...t
  }), mf(t);
}
function yf(e, t) {
  var s;
  const n = e.changedTouches[0];
  t.touchmoveX = n.clientX, t.touchmoveY = n.clientY, (s = t.move) == null || s.call(t, {
    originalEvent: e,
    ...t
  });
}
function pf() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: e.left,
    right: e.right,
    up: e.up,
    down: e.down,
    start: e.start,
    move: e.move,
    end: e.end
  };
  return {
    touchstart: (n) => hf(n, t),
    touchend: (n) => gf(n, t),
    touchmove: (n) => yf(n, t)
  };
}
function bf(e, t) {
  var l;
  const n = t.value, s = n != null && n.parent ? e.parentElement : e, o = (n == null ? void 0 : n.options) ?? {
    passive: !0
  }, a = (l = t.instance) == null ? void 0 : l.$.uid;
  if (!s || !a) return;
  const i = pf(t.value);
  s._touchHandlers = s._touchHandlers ?? /* @__PURE__ */ Object.create(null), s._touchHandlers[a] = i, kl(i).forEach((r) => {
    s.addEventListener(r, i[r], o);
  });
}
function Sf(e, t) {
  var a, i;
  const n = (a = t.value) != null && a.parent ? e.parentElement : e, s = (i = t.instance) == null ? void 0 : i.$.uid;
  if (!(n != null && n._touchHandlers) || !s) return;
  const o = n._touchHandlers[s];
  kl(o).forEach((l) => {
    n.removeEventListener(l, o[l]);
  }), delete n._touchHandlers[s];
}
const lr = {
  mounted: bf,
  unmounted: Sf
}, wf = lr, rr = Symbol.for("vuetify:v-window"), cr = Symbol.for("vuetify:v-window-group"), ur = F({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || e === "hover"
  },
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  ...ue(),
  ...xe(),
  ...Me()
}, "VWindow"), Ei = te()({
  name: "VWindow",
  directives: {
    Touch: lr
  },
  props: ur(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: s
    } = Re(e), {
      isRtl: o
    } = Ot(), {
      t: a
    } = Dl(), i = Ws(e, cr), l = J(), r = S(() => o.value ? !e.reverse : e.reverse), c = ee(!1), u = S(() => {
      const w = e.direction === "vertical" ? "y" : "x", O = (r.value ? !c.value : c.value) ? "-reverse" : "";
      return `v-window-${w}${O}-transition`;
    }), d = ee(0), m = J(void 0), v = S(() => i.items.value.findIndex((w) => i.selected.value.includes(w.id)));
    ne(v, (w, P) => {
      const O = i.items.value.length, T = O - 1;
      O <= 2 ? c.value = w < P : w === T && P === 0 ? c.value = !0 : w === 0 && P === T ? c.value = !1 : c.value = w < P;
    }), Be(rr, {
      transition: u,
      isReversed: c,
      transitionCount: d,
      transitionHeight: m,
      rootRef: l
    });
    const f = S(() => e.continuous || v.value !== 0), h = S(() => e.continuous || v.value !== i.items.value.length - 1);
    function y() {
      f.value && i.prev();
    }
    function b() {
      h.value && i.next();
    }
    const C = S(() => {
      const w = [], P = {
        icon: o.value ? e.nextIcon : e.prevIcon,
        class: `v-window__${r.value ? "right" : "left"}`,
        onClick: i.prev,
        "aria-label": a("$vuetify.carousel.prev")
      };
      w.push(f.value ? n.prev ? n.prev({
        props: P
      }) : g(Ze, P, null) : g("div", null, null));
      const O = {
        icon: o.value ? e.prevIcon : e.nextIcon,
        class: `v-window__${r.value ? "left" : "right"}`,
        onClick: i.next,
        "aria-label": a("$vuetify.carousel.next")
      };
      return w.push(h.value ? n.next ? n.next({
        props: O
      }) : g(Ze, O, null) : g("div", null, null)), w;
    }), A = S(() => e.touch === !1 ? e.touch : {
      ...{
        left: () => {
          r.value ? y() : b();
        },
        right: () => {
          r.value ? b() : y();
        },
        start: (P) => {
          let {
            originalEvent: O
          } = P;
          O.stopPropagation();
        }
      },
      ...e.touch === !0 ? {} : e.touch
    });
    return ie(() => ct(g(e.tag, {
      ref: l,
      class: ["v-window", {
        "v-window--show-arrows-on-hover": e.showArrows === "hover"
      }, s.value, e.class],
      style: e.style
    }, {
      default: () => {
        var w, P;
        return [g("div", {
          class: "v-window__container",
          style: {
            height: m.value
          }
        }, [(w = n.default) == null ? void 0 : w.call(n, {
          group: i
        }), e.showArrows !== !1 && g("div", {
          class: "v-window__controls"
        }, [C.value])]), (P = n.additional) == null ? void 0 : P.call(n, {
          group: i
        })];
      }
    }), [[Nn("touch"), A.value]])), {
      group: i
    };
  }
}), xf = F({
  ...Ds(ur(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow"), Ps = te()({
  name: "VTabsWindow",
  props: xf(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const s = be(ma, null), o = it(e, "modelValue"), a = S({
      get() {
        var i;
        return o.value != null || !s ? o.value : (i = s.items.value.find((l) => s.selected.value.includes(l.id))) == null ? void 0 : i.value;
      },
      set(i) {
        o.value = i;
      }
    });
    return ie(() => {
      const i = Ei.filterProps(e);
      return g(Ei, ce({
        _as: "VTabsWindow"
      }, i, {
        modelValue: a.value,
        "onUpdate:modelValue": (l) => a.value = l,
        class: ["v-tabs-window", e.class],
        style: e.style,
        mandatory: !1,
        touch: !1
      }), n);
    }), {};
  }
}), dr = F({
  eager: Boolean
}, "lazy");
function fr(e, t) {
  const n = ee(!1), s = S(() => n.value || e.eager || t.value);
  ne(t, () => n.value = !0);
  function o() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: s,
    onAfterLeave: o
  };
}
function qs() {
  const e = ee(!1);
  return Ft(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: S(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: Qo(e)
  };
}
const vr = F({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...ue(),
  ...ia(),
  ...dr()
}, "VWindowItem"), Pi = te()({
  name: "VWindowItem",
  directives: {
    Touch: wf
  },
  props: vr(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const s = be(rr), o = la(e, cr), {
      isBooted: a
    } = qs();
    if (!s || !o) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const i = ee(!1), l = S(() => a.value && (s.isReversed.value ? e.reverseTransition !== !1 : e.transition !== !1));
    function r() {
      !i.value || !s || (i.value = !1, s.transitionCount.value > 0 && (s.transitionCount.value -= 1, s.transitionCount.value === 0 && (s.transitionHeight.value = void 0)));
    }
    function c() {
      var f;
      i.value || !s || (i.value = !0, s.transitionCount.value === 0 && (s.transitionHeight.value = se((f = s.rootRef.value) == null ? void 0 : f.clientHeight)), s.transitionCount.value += 1);
    }
    function u() {
      r();
    }
    function d(f) {
      i.value && et(() => {
        !l.value || !i.value || !s || (s.transitionHeight.value = se(f.clientHeight));
      });
    }
    const m = S(() => {
      const f = s.isReversed.value ? e.reverseTransition : e.transition;
      return l.value ? {
        name: typeof f != "string" ? s.transition.value : f,
        onBeforeEnter: c,
        onAfterEnter: r,
        onEnterCancelled: u,
        onBeforeLeave: c,
        onAfterLeave: r,
        onLeaveCancelled: u,
        onEnter: d
      } : !1;
    }), {
      hasContent: v
    } = fr(e, o.isSelected);
    return ie(() => g($t, {
      transition: m.value,
      disabled: !a.value
    }, {
      default: () => {
        var f;
        return [ct(g("div", {
          class: ["v-window-item", o.selectedClass.value, e.class],
          style: e.style
        }, [v.value && ((f = n.default) == null ? void 0 : f.call(n))]), [[un, o.isSelected.value]])];
      }
    })), {
      groupItem: o
    };
  }
}), Cf = F({
  ...vr()
}, "VTabsWindowItem"), Ge = te()({
  name: "VTabsWindowItem",
  props: Cf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => {
      const s = Pi.filterProps(e);
      return g(Pi, ce({
        _as: "VTabsWindowItem"
      }, s, {
        class: ["v-tabs-window-item", e.class],
        style: e.style
      }), n);
    }), {};
  }
});
function ha() {
  const t = ke("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
function _f(e) {
  return e ? e.map((t) => Cl(t) ? t : {
    text: t,
    value: t
  }) : [];
}
const kf = F({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...va({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...qt(),
  ...xe()
}, "VTabs"), Ao = te()({
  name: "VTabs",
  props: kf(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: s
    } = t;
    const o = it(e, "modelValue"), a = S(() => _f(e.items)), {
      densityClasses: i
    } = Gt(e), {
      backgroundColorClasses: l,
      backgroundColorStyles: r
    } = Wn(Q(e, "bgColor")), {
      scopeId: c
    } = ha();
    return dn({
      VTab: {
        color: Q(e, "color"),
        direction: Q(e, "direction"),
        stacked: Q(e, "stacked"),
        fixed: Q(e, "fixedTabs"),
        sliderColor: Q(e, "sliderColor"),
        hideSlider: Q(e, "hideSlider")
      }
    }), ie(() => {
      const u = Es.filterProps(e), d = !!(s.window || e.items.length > 0);
      return g(Ye, null, [g(Es, ce(u, {
        modelValue: o.value,
        "onUpdate:modelValue": (m) => o.value = m,
        class: ["v-tabs", `v-tabs--${e.direction}`, `v-tabs--align-tabs-${e.alignTabs}`, {
          "v-tabs--fixed-tabs": e.fixedTabs,
          "v-tabs--grow": e.grow,
          "v-tabs--stacked": e.stacked
        }, i.value, l.value, e.class],
        style: [{
          "--v-tabs-height": se(e.height)
        }, r.value, e.style],
        role: "tablist",
        symbol: ma
      }, c, n), {
        default: () => {
          var m;
          return [((m = s.default) == null ? void 0 : m.call(s)) ?? a.value.map((v) => {
            var f;
            return ((f = s.tab) == null ? void 0 : f.call(s, {
              item: v
            })) ?? g(qe, ce(v, {
              key: v.text,
              value: v.value
            }), {
              default: s[`tab.${v.value}`] ? () => {
                var h;
                return (h = s[`tab.${v.value}`]) == null ? void 0 : h.call(s, {
                  item: v
                });
              } : void 0
            });
          })];
        }
      }), d && g(Ps, ce({
        modelValue: o.value,
        "onUpdate:modelValue": (m) => o.value = m,
        key: "tabs-window"
      }, c), {
        default: () => {
          var m;
          return [a.value.map((v) => {
            var f;
            return ((f = s.item) == null ? void 0 : f.call(s, {
              item: v
            })) ?? g(Ge, {
              value: v.value
            }, {
              default: () => {
                var h;
                return (h = s[`item.${v.value}`]) == null ? void 0 : h.call(s, {
                  item: v
                });
              }
            });
          }), (m = s.window) == null ? void 0 : m.call(s)];
        }
      })]);
    }), {};
  }
}), Ef = { class: "flex align-center bg-primary p-x-8" }, Pf = { class: "flex align-center p-x-8" }, Af = /* @__PURE__ */ cn({
  __name: "LossView",
  setup(e) {
    const t = J(), { height: n } = Tu(t), s = S(() => Math.floor(5600 / n.value)), o = S(() => 50), a = J(0);
    Eu(s, (r) => a.value = r);
    const i = wl("items", "part"), l = J("part");
    return ne(i, (r) => l.value = r), (r, c) => (Qe(), Lt(ge(bu), {
      ref_key: "splitRef",
      ref: t,
      class: "default-theme flex-1",
      horizontal: ""
    }, {
      default: j(() => [
        g(ge(qa), {
          size: 100 - a.value
        }, {
          default: j(() => [
            Bt("div", Ef, [
              g(ki, {
                "prepend-icon": "mdi-list-status",
                variant: "text"
              }, {
                default: j(() => [
                  ae(" 损失项列表： ")
                ]),
                _: 1
              }),
              g(Ao, {
                class: "flex-1",
                modelValue: ge(i),
                "onUpdate:modelValue": c[0] || (c[0] = (u) => rt(i) ? i.value = u : null)
              }, {
                default: j(() => [
                  g(qe, { value: "part" }, {
                    default: j(() => [
                      ae("配件 ")
                    ]),
                    _: 1
                  }),
                  g(qe, { value: "hour" }, {
                    default: j(() => [
                      ae("工时 ")
                    ]),
                    _: 1
                  }),
                  g(qe, { value: "mate" }, {
                    default: j(() => [
                      ae("辅料 ")
                    ]),
                    _: 1
                  }),
                  g(qe, { value: "outer" }, {
                    default: j(() => [
                      ae("外修 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"]),
              g(xs, null, {
                default: j(() => [
                  g(Ze, {
                    variant: "plain",
                    color: "white"
                  }, {
                    default: j(() => [
                      ae("自定义")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            g(Ps, {
              modelValue: ge(i),
              "onUpdate:modelValue": c[1] || (c[1] = (u) => rt(i) ? i.value = u : null)
            }, {
              default: j(() => [
                g(Ge, { value: "part" }, {
                  default: j(() => [
                    ae("peijian")
                  ]),
                  _: 1
                }),
                g(Ge, { value: "hour" }, {
                  default: j(() => [
                    ae("gongshi")
                  ]),
                  _: 1
                }),
                g(Ge, { value: "mate" }, {
                  default: j(() => [
                    ae("fuliao")
                  ]),
                  _: 1
                }),
                g(Ge, { value: "outer" }, {
                  default: j(() => [
                    ae("waixiu")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["size"]),
        g(ge(qa), {
          "min-size": s.value,
          "max-size": o.value,
          size: a.value,
          "onUpdate:size": c[6] || (c[6] = (u) => a.value = u)
        }, {
          default: j(() => [
            Bt("div", Pf, [
              g(ki, {
                "prepend-icon": "mdi-list-box-outline",
                variant: "text"
              }, {
                default: j(() => [
                  ae(" 已添加损失项： ")
                ]),
                _: 1
              }),
              g(Ao, {
                modelValue: l.value,
                "onUpdate:modelValue": c[2] || (c[2] = (u) => l.value = u),
                class: "flex-1"
              }, {
                default: j(() => [
                  g(qe, { value: "part" }, {
                    default: j(() => [
                      ae("配件 ")
                    ]),
                    _: 1
                  }),
                  g(qe, { value: "hour" }, {
                    default: j(() => [
                      ae("工时 ")
                    ]),
                    _: 1
                  }),
                  g(qe, { value: "mate" }, {
                    default: j(() => [
                      ae("辅料 ")
                    ]),
                    _: 1
                  }),
                  g(qe, { value: "outer" }, {
                    default: j(() => [
                      ae("外修 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"]),
              Bt("div", null, [
                a.value === s.value ? (Qe(), Lt(Ze, {
                  key: 0,
                  onClick: c[3] || (c[3] = (u) => a.value = o.value)
                }, {
                  default: j(() => [
                    ae(" 展开 ")
                  ]),
                  _: 1
                })) : Na("", !0),
                a.value === o.value ? (Qe(), Lt(Ze, {
                  key: 1,
                  onClick: c[4] || (c[4] = (u) => a.value = s.value)
                }, {
                  default: j(() => [
                    ae(" 收起 ")
                  ]),
                  _: 1
                })) : Na("", !0)
              ])
            ]),
            g(Ps, {
              modelValue: l.value,
              "onUpdate:modelValue": c[5] || (c[5] = (u) => l.value = u)
            }, {
              default: j(() => [
                g(Ge, { value: "part" }, {
                  default: j(() => [
                    ae("配件1")
                  ]),
                  _: 1
                }),
                g(Ge, { value: "hour" }, {
                  default: j(() => [
                    ae("工时1")
                  ]),
                  _: 1
                }),
                g(Ge, { value: "mate" }, {
                  default: j(() => [
                    ae("辅料1")
                  ]),
                  _: 1
                }),
                g(Ge, { value: "outer" }, {
                  default: j(() => [
                    ae("外修1")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["min-size", "max-size", "size"])
      ]),
      _: 1
    }, 512));
  }
});
/*!
 * OverlayScrollbars
 * Version: 2.10.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const Ne = (e, t) => {
  const { o: n, i: s, u: o } = e;
  let a = n, i;
  const l = (u, d) => {
    const m = a, v = u, f = d || (s ? !s(m, v) : m !== v);
    return (f || o) && (a = v, i = m), [a, f, i];
  };
  return [t ? (u) => l(t(a, i), u) : l, (u) => [a, !!u, i]];
}, Of = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, ze = Of ? window : {}, mr = Math.max, Tf = Math.min, Oo = Math.round, As = Math.abs, Ai = Math.sign, hr = ze.cancelAnimationFrame, ga = ze.requestAnimationFrame, Os = ze.setTimeout, To = ze.clearTimeout, Gs = (e) => typeof ze[e] < "u" ? ze[e] : void 0, If = Gs("MutationObserver"), Oi = Gs("IntersectionObserver"), Ts = Gs("ResizeObserver"), cs = Gs("ScrollTimeline"), ya = (e) => e === void 0, Ys = (e) => e === null, lt = (e) => typeof e == "number", Gn = (e) => typeof e == "string", pa = (e) => typeof e == "boolean", Xe = (e) => typeof e == "function", ut = (e) => Array.isArray(e), Is = (e) => typeof e == "object" && !ut(e) && !Ys(e), ba = (e) => {
  const t = !!e && e.length, n = lt(t) && t > -1 && t % 1 == 0;
  return ut(e) || !Xe(e) && n ? t > 0 && Is(e) ? t - 1 in e : !0 : !1;
}, Vs = (e) => !!e && e.constructor === Object, $s = (e) => e instanceof HTMLElement, Xs = (e) => e instanceof Element;
function re(e, t) {
  if (ba(e))
    for (let n = 0; n < e.length && t(e[n], n, e) !== !1; n++)
      ;
  else e && re(Object.keys(e), (n) => t(e[n], n, e));
  return e;
}
const gr = (e, t) => e.indexOf(t) >= 0, $n = (e, t) => e.concat(t), ye = (e, t, n) => (!Gn(t) && ba(t) ? Array.prototype.push.apply(e, t) : e.push(t), e), Tt = (e) => Array.from(e || []), Sa = (e) => ut(e) ? e : !Gn(e) && ba(e) ? Tt(e) : [e], Io = (e) => !!e && !e.length, Vo = (e) => Tt(new Set(e)), We = (e, t, n) => {
  re(e, (o) => o ? o.apply(void 0, t || []) : !0), !n && (e.length = 0);
}, yr = "paddingTop", pr = "paddingRight", br = "paddingLeft", Sr = "paddingBottom", wr = "marginLeft", xr = "marginRight", Cr = "marginBottom", _r = "overflowX", kr = "overflowY", Ks = "width", Qs = "height", wt = "visible", zt = "hidden", an = "scroll", Vf = (e) => {
  const t = String(e || "");
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}, Zs = (e, t, n, s) => {
  if (e && t) {
    let o = !0;
    return re(n, (a) => {
      const i = e[a], l = t[a];
      i !== l && (o = !1);
    }), o;
  }
  return !1;
}, Er = (e, t) => Zs(e, t, ["w", "h"]), us = (e, t) => Zs(e, t, ["x", "y"]), $f = (e, t) => Zs(e, t, ["t", "r", "b", "l"]), Dt = () => {
}, X = (e, ...t) => e.bind(0, ...t), en = (e) => {
  let t;
  const n = e ? Os : ga, s = e ? To : hr;
  return [(o) => {
    s(t), t = n(() => o(), Xe(e) ? e() : e);
  }, () => s(t)];
}, $o = (e, t) => {
  const { _: n, v: s, p: o, S: a } = t || {};
  let i, l, r, c, u = Dt;
  const d = function(y) {
    u(), To(i), c = i = l = void 0, u = Dt, e.apply(this, y);
  }, m = (h) => a && l ? a(l, h) : h, v = () => {
    u !== Dt && d(m(r) || r);
  }, f = function() {
    const y = Tt(arguments), b = Xe(n) ? n() : n;
    if (lt(b) && b >= 0) {
      const A = Xe(s) ? s() : s, w = lt(A) && A >= 0, P = b > 0 ? Os : ga, O = b > 0 ? To : hr, _ = m(y) || y, L = d.bind(0, _);
      let I;
      u(), o && !c ? (L(), c = !0, I = P(() => c = void 0, b)) : (I = P(L, b), w && !i && (i = Os(v, A))), u = () => O(I), l = r = _;
    } else
      d(y);
  };
  return f.m = v, f;
}, Pr = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Je = (e) => e ? Object.keys(e) : [], oe = (e, t, n, s, o, a, i) => {
  const l = [t, n, s, o, a, i];
  return (typeof e != "object" || Ys(e)) && !Xe(e) && (e = {}), re(l, (r) => {
    re(r, (c, u) => {
      const d = r[u];
      if (e === d)
        return !0;
      const m = ut(d);
      if (d && Vs(d)) {
        const v = e[u];
        let f = v;
        m && !ut(v) ? f = [] : !m && !Vs(v) && (f = {}), e[u] = oe(f, d);
      } else
        e[u] = m ? d.slice() : d;
    });
  }), e;
}, Ar = (e, t) => re(oe({}, e), (n, s, o) => {
  n === void 0 ? delete o[s] : n && Vs(n) && (o[s] = Ar(n));
}), wa = (e) => !Je(e).length, Or = (e, t, n) => mr(e, Tf(t, n)), Ht = (e) => Vo((ut(e) ? e : (e || "").split(" ")).filter((t) => t)), xa = (e, t) => e && e.getAttribute(t), Ti = (e, t) => e && e.hasAttribute(t), vt = (e, t, n) => {
  re(Ht(t), (s) => {
    e && e.setAttribute(s, String(n || ""));
  });
}, st = (e, t) => {
  re(Ht(t), (n) => e && e.removeAttribute(n));
}, Js = (e, t) => {
  const n = Ht(xa(e, t)), s = X(vt, e, t), o = (a, i) => {
    const l = new Set(n);
    return re(Ht(a), (r) => {
      l[i](r);
    }), Tt(l).join(" ");
  };
  return {
    O: (a) => s(o(a, "delete")),
    $: (a) => s(o(a, "add")),
    C: (a) => {
      const i = Ht(a);
      return i.reduce((l, r) => l && n.includes(r), i.length > 0);
    }
  };
}, Tr = (e, t, n) => (Js(e, t).O(n), X(Ca, e, t, n)), Ca = (e, t, n) => (Js(e, t).$(n), X(Tr, e, t, n)), zs = (e, t, n, s) => (s ? Ca : Tr)(e, t, n), _a = (e, t, n) => Js(e, t).C(n), Ir = (e) => Js(e, "class"), Vr = (e, t) => {
  Ir(e).O(t);
}, ka = (e, t) => (Ir(e).$(t), X(Vr, e, t)), $r = (e, t) => {
  const n = t ? Xs(t) && t : document;
  return n ? Tt(n.querySelectorAll(e)) : [];
}, zf = (e, t) => {
  const n = t ? Xs(t) && t : document;
  return n && n.querySelector(e);
}, zo = (e, t) => Xs(e) && e.matches(t), zr = (e) => zo(e, "body"), Lo = (e) => e ? Tt(e.childNodes) : [], zn = (e) => e && e.parentElement, tn = (e, t) => Xs(e) && e.closest(t), Bo = (e) => document.activeElement, Lf = (e, t, n) => {
  const s = tn(e, t), o = e && zf(n, s), a = tn(o, t) === s;
  return s && o ? s === e || o === e || a && tn(tn(e, n), t) !== s : !1;
}, ln = (e) => {
  re(Sa(e), (t) => {
    const n = zn(t);
    t && n && n.removeChild(t);
  });
}, He = (e, t) => X(ln, e && t && re(Sa(t), (n) => {
  n && e.appendChild(n);
})), nn = (e) => {
  const t = document.createElement("div");
  return vt(t, "class", e), t;
}, Lr = (e) => {
  const t = nn();
  return t.innerHTML = e.trim(), re(Lo(t), (n) => ln(n));
}, Ii = (e, t) => e.getPropertyValue(t) || e[t] || "", Br = (e) => {
  const t = e || 0;
  return isFinite(t) ? t : 0;
}, as = (e) => Br(parseFloat(e || "")), Mo = (e) => Math.round(e * 1e4) / 1e4, Mr = (e) => `${Mo(Br(e))}px`;
function Ln(e, t) {
  e && t && re(t, (n, s) => {
    try {
      const o = e.style, a = Ys(n) || pa(n) ? "" : lt(n) ? Mr(n) : n;
      s.indexOf("--") === 0 ? o.setProperty(s, a) : o[s] = a;
    } catch {
    }
  });
}
function yt(e, t, n) {
  const s = Gn(t);
  let o = s ? "" : {};
  if (e) {
    const a = ze.getComputedStyle(e, n) || e.style;
    o = s ? Ii(a, t) : Tt(t).reduce((i, l) => (i[l] = Ii(a, l), i), o);
  }
  return o;
}
const Vi = (e, t, n) => {
  const s = t ? `${t}-` : "", o = n ? `-${n}` : "", a = `${s}top${o}`, i = `${s}right${o}`, l = `${s}bottom${o}`, r = `${s}left${o}`, c = yt(e, [a, i, l, r]);
  return {
    t: as(c[a]),
    r: as(c[i]),
    b: as(c[l]),
    l: as(c[r])
  };
}, Bf = (e, t) => `translate${Is(e) ? `(${e.x},${e.y})` : `Y(${e})`}`, Mf = (e) => !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length), Rf = {
  w: 0,
  h: 0
}, eo = (e, t) => t ? {
  w: t[`${e}Width`],
  h: t[`${e}Height`]
} : Rf, Nf = (e) => eo("inner", e || ze), sn = X(eo, "offset"), Rr = X(eo, "client"), Ls = X(eo, "scroll"), Ea = (e) => {
  const t = parseFloat(yt(e, Ks)) || 0, n = parseFloat(yt(e, Qs)) || 0;
  return {
    w: t - Oo(t),
    h: n - Oo(n)
  };
}, go = (e) => e.getBoundingClientRect(), Df = (e) => !!e && Mf(e), Ro = (e) => !!(e && (e[Qs] || e[Ks])), Nr = (e, t) => {
  const n = Ro(e);
  return !Ro(t) && n;
}, $i = (e, t, n, s) => {
  re(Ht(t), (o) => {
    e && e.removeEventListener(o, n, s);
  });
}, ve = (e, t, n, s) => {
  var o;
  const a = (o = s && s.H) != null ? o : !0, i = s && s.I || !1, l = s && s.A || !1, r = {
    passive: a,
    capture: i
  };
  return X(We, Ht(t).map((c) => {
    const u = l ? (d) => {
      $i(e, c, u, i), n && n(d);
    } : n;
    return e && e.addEventListener(c, u, r), X($i, e, c, u, i);
  }));
}, Dr = (e) => e.stopPropagation(), No = (e) => e.preventDefault(), Hr = (e) => Dr(e) || No(e), ot = (e, t) => {
  const { x: n, y: s } = lt(t) ? {
    x: t,
    y: t
  } : t || {};
  lt(n) && (e.scrollLeft = n), lt(s) && (e.scrollTop = s);
}, Fe = (e) => ({
  x: e.scrollLeft,
  y: e.scrollTop
}), Fr = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), Hf = (e, t) => {
  const { D: n, M: s } = e, { w: o, h: a } = t, i = (d, m, v) => {
    let f = Ai(d) * v, h = Ai(m) * v;
    if (f === h) {
      const y = As(d), b = As(m);
      h = y > b ? 0 : h, f = y < b ? 0 : f;
    }
    return f = f === h ? 0 : f, [f + 0, h + 0];
  }, [l, r] = i(n.x, s.x, o), [c, u] = i(n.y, s.y, a);
  return {
    D: {
      x: l,
      y: c
    },
    M: {
      x: r,
      y: u
    }
  };
}, zi = ({ D: e, M: t }) => {
  const n = (s, o) => s === 0 && s <= o;
  return {
    x: n(e.x, t.x),
    y: n(e.y, t.y)
  };
}, Li = ({ D: e, M: t }, n) => {
  const s = (o, a, i) => Or(0, 1, (o - i) / (o - a) || 0);
  return {
    x: s(e.x, t.x, n.x),
    y: s(e.y, t.y, n.y)
  };
}, Do = (e) => {
  e && e.focus && e.focus({
    preventScroll: !0
  });
}, Bi = (e, t) => {
  re(Sa(t), e);
}, Ho = (e) => {
  const t = /* @__PURE__ */ new Map(), n = (a, i) => {
    if (a) {
      const l = t.get(a);
      Bi((r) => {
        l && l[r ? "delete" : "clear"](r);
      }, i);
    } else
      t.forEach((l) => {
        l.clear();
      }), t.clear();
  }, s = (a, i) => {
    if (Gn(a)) {
      const c = t.get(a) || /* @__PURE__ */ new Set();
      return t.set(a, c), Bi((u) => {
        Xe(u) && c.add(u);
      }, i), X(n, a, i);
    }
    pa(i) && i && n();
    const l = Je(a), r = [];
    return re(l, (c) => {
      const u = a[c];
      u && ye(r, s(c, u));
    }), X(We, r);
  }, o = (a, i) => {
    re(Tt(t.get(a)), (l) => {
      i && !Io(i) ? l.apply(0, i) : l();
    });
  };
  return s(e || {}), [s, n, o];
}, Mi = (e) => JSON.stringify(e, (t, n) => {
  if (Xe(n))
    throw 0;
  return n;
}), Ri = (e, t) => e ? `${t}`.split(".").reduce((n, s) => n && Pr(n, s) ? n[s] : void 0, e) : void 0, Ff = {
  paddingAbsolute: !1,
  showNativeOverlaidScrollbars: !1,
  update: {
    elementEvents: [["img", "load"]],
    debounce: [0, 33],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: !1,
    dragScroll: !0,
    clickScroll: !1,
    pointers: ["mouse", "touch", "pen"]
  }
}, Wr = (e, t) => {
  const n = {}, s = $n(Je(t), Je(e));
  return re(s, (o) => {
    const a = e[o], i = t[o];
    if (Is(a) && Is(i))
      oe(n[o] = {}, Wr(a, i)), wa(n[o]) && delete n[o];
    else if (Pr(t, o) && i !== a) {
      let l = !0;
      if (ut(a) || ut(i))
        try {
          Mi(a) === Mi(i) && (l = !1);
        } catch {
        }
      l && (n[o] = i);
    }
  }), n;
}, Ni = (e, t, n) => (s) => [Ri(e, s), n || Ri(t, s) !== void 0], gn = "data-overlayscrollbars", ds = "os-environment", is = `${ds}-scrollbar-hidden`, yo = `${gn}-initialize`, fs = "noClipping", Di = `${gn}-body`, Ct = gn, Wf = "host", mt = `${gn}-viewport`, jf = _r, Uf = kr, qf = "arrange", jr = "measuring", Gf = "scrolling", Ur = "scrollbarHidden", Yf = "noContent", Fo = `${gn}-padding`, Hi = `${gn}-content`, Pa = "os-size-observer", Xf = `${Pa}-appear`, Kf = `${Pa}-listener`, Qf = "os-trinsic-observer", Zf = "os-theme-none", Ue = "os-scrollbar", Jf = `${Ue}-rtl`, ev = `${Ue}-horizontal`, tv = `${Ue}-vertical`, qr = `${Ue}-track`, Aa = `${Ue}-handle`, nv = `${Ue}-visible`, sv = `${Ue}-cornerless`, Fi = `${Ue}-interaction`, Wi = `${Ue}-unusable`, Wo = `${Ue}-auto-hide`, ji = `${Wo}-hidden`, Ui = `${Ue}-wheel`, ov = `${qr}-interactive`, av = `${Aa}-interactive`;
let Gr;
const iv = () => Gr, lv = (e) => {
  Gr = e;
};
let po;
const rv = () => {
  const e = (w, P, O) => {
    He(document.body, w), He(document.body, w);
    const T = Rr(w), _ = sn(w), L = Ea(P);
    return O && ln(w), {
      x: _.h - T.h + L.h,
      y: _.w - T.w + L.w
    };
  }, t = (w) => {
    let P = !1;
    const O = ka(w, is);
    try {
      P = yt(w, "scrollbar-width") === "none" || yt(w, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return O(), P;
  }, n = `.${ds}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${ds} div{width:200%;height:200%;margin:10px 0}.${is}{scrollbar-width:none!important}.${is}::-webkit-scrollbar,.${is}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = Lr(`<div class="${ds}"><div></div><style>${n}</style></div>`)[0], a = o.firstChild, i = o.lastChild, l = iv();
  l && (i.nonce = l);
  const [r, , c] = Ho(), [u, d] = Ne({
    o: e(o, a),
    i: us
  }, X(e, o, a, !0)), [m] = d(), v = t(o), f = {
    x: m.x === 0,
    y: m.y === 0
  }, h = {
    elements: {
      host: null,
      padding: !v,
      viewport: (w) => v && zr(w) && w,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, y = oe({}, Ff), b = X(oe, {}, y), C = X(oe, {}, h), A = {
    T: m,
    k: f,
    R: v,
    V: !!cs,
    L: X(r, "r"),
    U: C,
    P: (w) => oe(h, w) && C(),
    N: b,
    q: (w) => oe(y, w) && b(),
    B: oe({}, h),
    F: oe({}, y)
  };
  if (st(o, "style"), ln(o), ve(ze, "resize", () => {
    c("r", []);
  }), Xe(ze.matchMedia) && !v && (!f.x || !f.y)) {
    const w = (P) => {
      const O = ze.matchMedia(`(resolution: ${ze.devicePixelRatio}dppx)`);
      ve(O, "change", () => {
        P(), w(P);
      }, {
        A: !0
      });
    };
    w(() => {
      const [P, O] = u();
      oe(A.T, P), c("r", [O]);
    });
  }
  return A;
}, dt = () => (po || (po = rv()), po), Yr = (e, t) => Xe(t) ? t.apply(0, e) : t, cv = (e, t, n, s) => {
  const o = ya(s) ? n : s;
  return Yr(e, o) || t.apply(0, e);
}, Xr = (e, t, n, s) => {
  const o = ya(s) ? n : s, a = Yr(e, o);
  return !!a && ($s(a) ? a : t.apply(0, e));
}, uv = (e, t) => {
  const { nativeScrollbarsOverlaid: n, body: s } = t || {}, { k: o, R: a, U: i } = dt(), { nativeScrollbarsOverlaid: l, body: r } = i().cancel, c = n ?? l, u = ya(s) ? r : s, d = (o.x || o.y) && c, m = e && (Ys(u) ? !a : u);
  return !!d || !!m;
}, Oa = /* @__PURE__ */ new WeakMap(), dv = (e, t) => {
  Oa.set(e, t);
}, fv = (e) => {
  Oa.delete(e);
}, Kr = (e) => Oa.get(e), vv = (e, t, n) => {
  let s = !1;
  const o = n ? /* @__PURE__ */ new WeakMap() : !1, a = () => {
    s = !0;
  }, i = (l) => {
    if (o && n) {
      const r = n.map((c) => {
        const [u, d] = c || [];
        return [d && u ? (l || $r)(u, e) : [], d];
      });
      re(r, (c) => re(c[0], (u) => {
        const d = c[1], m = o.get(u) || [];
        if (e.contains(u) && d) {
          const f = ve(u, d, (h) => {
            s ? (f(), o.delete(u)) : t(h);
          });
          o.set(u, ye(m, f));
        } else
          We(m), o.delete(u);
      }));
    }
  };
  return i(), [a, i];
}, qi = (e, t, n, s) => {
  let o = !1;
  const { j: a, X: i, Y: l, W: r, J: c, G: u } = s || {}, d = $o(() => o && n(!0), {
    _: 33,
    v: 99
  }), [m, v] = vv(e, d, l), f = a || [], h = i || [], y = $n(f, h), b = (A, w) => {
    if (!Io(w)) {
      const P = c || Dt, O = u || Dt, T = [], _ = [];
      let L = !1, I = !1;
      if (re(w, (k) => {
        const { attributeName: p, target: E, type: z, oldValue: W, addedNodes: U, removedNodes: K } = k, G = z === "attributes", Y = z === "childList", R = e === E, x = G && p, V = x && xa(E, p || ""), M = Gn(V) ? V : null, H = x && W !== M, $ = gr(h, p) && H;
        if (t && (Y || !R)) {
          const B = G && H, N = B && r && zo(E, r), q = (N ? !P(E, p, W, M) : !G || B) && !O(k, !!N, e, s);
          re(U, (le) => ye(T, le)), re(K, (le) => ye(T, le)), I = I || q;
        }
        !t && R && H && !P(E, p, W, M) && (ye(_, p), L = L || $);
      }), v((k) => Vo(T).reduce((p, E) => (ye(p, $r(k, E)), zo(E, k) ? ye(p, E) : p), [])), t)
        return !A && I && n(!1), [!1];
      if (!Io(_) || L) {
        const k = [Vo(_), L];
        return !A && n.apply(0, k), k;
      }
    }
  }, C = new If(X(b, !1));
  return [() => (C.observe(e, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: y,
    subtree: t,
    childList: t,
    characterData: t
  }), o = !0, () => {
    o && (m(), C.disconnect(), o = !1);
  }), () => {
    if (o)
      return d.m(), b(!0, C.takeRecords());
  }];
}, Qr = {}, Zr = {}, mv = (e) => {
  re(e, (t) => re(t, (n, s) => {
    Qr[s] = t[s];
  }));
}, Jr = (e, t, n) => Je(e).map((s) => {
  const { static: o, instance: a } = e[s], [i, l, r] = n || [], c = n ? a : o;
  if (c) {
    const u = n ? c(i, l, t) : c(t);
    return (r || Zr)[s] = u;
  }
}), Yn = (e) => Zr[e], hv = "__osOptionsValidationPlugin", gv = "__osSizeObserverPlugin", yv = (e, t) => {
  const { k: n } = t, [s, o] = e("showNativeOverlaidScrollbars");
  return [s && n.x && n.y, o];
}, rn = (e) => e.indexOf(wt) === 0, pv = (e, t) => {
  const n = (o, a, i, l) => {
    const r = o === wt ? zt : o.replace(`${wt}-`, ""), c = rn(o), u = rn(i);
    return !a && !l ? zt : c && u ? wt : c ? a && l ? r : a ? wt : zt : a ? r : u && l ? wt : zt;
  }, s = {
    x: n(t.x, e.x, t.y, e.y),
    y: n(t.y, e.y, t.x, e.x)
  };
  return {
    K: s,
    Z: {
      x: s.x === an,
      y: s.y === an
    }
  };
}, ec = "__osScrollbarsHidingPlugin", bv = "__osClickScrollPlugin", tc = (e, t, n) => {
  const { dt: s } = n || {}, o = Yn(gv), [a] = Ne({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], r = Lr(`<div class="${Pa}"><div class="${Kf}"></div></div>`)[0], c = r.firstChild, u = (d) => {
      const m = d instanceof ResizeObserverEntry;
      let v = !1, f = !1;
      if (m) {
        const [h, , y] = a(d.contentRect), b = Ro(h);
        f = Nr(h, y), v = !f && !b;
      } else
        f = d === !0;
      v || t({
        ft: !0,
        dt: f
      });
    };
    if (Ts) {
      const d = new Ts((m) => u(m.pop()));
      d.observe(c), ye(i, () => {
        d.disconnect();
      });
    } else if (o) {
      const [d, m] = o(c, u, s);
      ye(i, $n([ka(r, Xf), ve(r, "animationstart", d)], m));
    } else
      return Dt;
    return X(We, ye(i, He(e, r)));
  };
}, Sv = (e, t) => {
  let n;
  const s = (r) => r.h === 0 || r.isIntersecting || r.intersectionRatio > 0, o = nn(Qf), [a] = Ne({
    o: !1
  }), i = (r, c) => {
    if (r) {
      const u = a(s(r)), [, d] = u;
      return d && !c && t(u) && [u];
    }
  }, l = (r, c) => i(c.pop(), r);
  return [() => {
    const r = [];
    if (Oi)
      n = new Oi(X(l, !1), {
        root: e
      }), n.observe(o), ye(r, () => {
        n.disconnect();
      });
    else {
      const c = () => {
        const u = sn(o);
        i(u);
      };
      ye(r, tc(o, c)()), c();
    }
    return X(We, ye(r, He(e, o)));
  }, () => n && l(!0, n.takeRecords())];
}, wv = (e, t, n, s) => {
  let o, a, i, l, r, c;
  const u = `[${Ct}]`, d = `[${mt}]`, m = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: v, ht: f, ot: h, gt: y, bt: b, nt: C, wt: A, yt: w, St: P, Ot: O } = e, T = ($) => yt($, "direction") === "rtl", _ = {
    $t: !1,
    ct: T(v)
  }, L = dt(), I = Yn(ec), [k] = Ne({
    i: Er,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const $ = I && I.tt(e, t, _, L, n).ut, N = !(A && C) && _a(f, Ct, fs), D = !C && w(qf), q = D && Fe(y), le = q && O(), Se = P(jr, N), me = D && $ && $()[0], Ee = Ls(h), Z = Ea(h);
    return me && me(), ot(y, q), le && le(), N && Se(), {
      w: Ee.w + Z.w,
      h: Ee.h + Z.h
    };
  }), p = $o(s, {
    _: () => o,
    v: () => a,
    S($, B) {
      const [N] = $, [D] = B;
      return [$n(Je(N), Je(D)).reduce((q, le) => (q[le] = N[le] || D[le], q), {})];
    }
  }), E = ($) => {
    const B = T(v);
    oe($, {
      Ct: c !== B
    }), oe(_, {
      ct: B
    }), c = B;
  }, z = ($, B) => {
    const [N, D] = $, q = {
      xt: D
    };
    return oe(_, {
      $t: N
    }), !B && s(q), q;
  }, W = ({ ft: $, dt: B }) => {
    const D = !($ && !B) && L.R ? p : s, q = {
      ft: $ || B,
      dt: B
    };
    E(q), D(q);
  }, U = ($, B) => {
    const [, N] = k(), D = {
      Ht: N
    };
    return E(D), N && !B && ($ ? s : p)(D), D;
  }, K = ($, B, N) => {
    const D = {
      Et: B
    };
    return E(D), B && !N && p(D), D;
  }, [G, Y] = b ? Sv(f, z) : [], R = !C && tc(f, W, {
    dt: !0
  }), [x, V] = qi(f, !1, K, {
    X: m,
    j: m
  }), M = C && Ts && new Ts(($) => {
    const B = $[$.length - 1].contentRect;
    W({
      ft: !0,
      dt: Nr(B, r)
    }), r = B;
  }), H = $o(() => {
    const [, $] = k();
    s({
      Ht: $
    });
  }, {
    _: 222,
    p: !0
  });
  return [() => {
    M && M.observe(f);
    const $ = R && R(), B = G && G(), N = x(), D = L.L((q) => {
      q ? p({
        zt: q
      }) : H();
    });
    return () => {
      M && M.disconnect(), $ && $(), B && B(), l && l(), N(), D();
    };
  }, ({ It: $, At: B, Dt: N }) => {
    const D = {}, [q] = $("update.ignoreMutation"), [le, Se] = $("update.attributes"), [me, Ee] = $("update.elementEvents"), [Z, Pe] = $("update.debounce"), Ve = Ee || Se, Ce = B || N, Ae = (pe) => Xe(q) && q(pe);
    if (Ve) {
      i && i(), l && l();
      const [pe, we] = qi(b || h, !0, U, {
        j: $n(m, le || []),
        Y: me,
        W: u,
        G: (de, he) => {
          const { target: _e, attributeName: $e } = de;
          return (!he && $e && !C ? Lf(_e, u, d) : !1) || !!tn(_e, `.${Ue}`) || !!Ae(de);
        }
      });
      l = pe(), i = we;
    }
    if (Pe)
      if (p.m(), ut(Z)) {
        const pe = Z[0], we = Z[1];
        o = lt(pe) && pe, a = lt(we) && we;
      } else lt(Z) ? (o = Z, a = !1) : (o = !1, a = !1);
    if (Ce) {
      const pe = V(), we = Y && Y(), de = i && i();
      pe && oe(D, K(pe[0], pe[1], Ce)), we && oe(D, z(we[0], Ce)), de && oe(D, U(de[0], Ce));
    }
    return E(D), D;
  }, _];
}, xv = (e, t, n, s) => {
  const o = "--os-viewport-percent", a = "--os-scroll-percent", i = "--os-scroll-direction", { U: l } = dt(), { scrollbars: r } = l(), { slot: c } = r, { vt: u, ht: d, ot: m, Mt: v, gt: f, wt: h, nt: y } = t, { scrollbars: b } = v ? {} : e, { slot: C } = b || {}, A = [], w = [], P = [], O = Xr([u, d, m], () => y && h ? u : d, c, C), T = (x) => {
    if (cs) {
      const V = new cs({
        source: f,
        axis: x
      });
      return {
        kt: (H) => {
          const $ = H.Tt.animate({
            clear: ["left"],
            [a]: [0, 1]
          }, {
            timeline: V
          });
          return () => $.cancel();
        }
      };
    }
  }, _ = {
    x: T("x"),
    y: T("y")
  }, L = () => {
    const { Rt: x, Vt: V } = n, M = (H, $) => Or(0, 1, H / (H + $) || 0);
    return {
      x: M(V.x, x.x),
      y: M(V.y, x.y)
    };
  }, I = (x, V, M) => {
    const H = M ? ka : Vr;
    re(x, ($) => {
      H($.Tt, V);
    });
  }, k = (x, V) => {
    re(x, (M) => {
      const [H, $] = V(M);
      Ln(H, $);
    });
  }, p = (x, V, M) => {
    const H = pa(M), $ = H ? M : !0, B = H ? !M : !0;
    $ && I(w, x, V), B && I(P, x, V);
  }, E = () => {
    const x = L(), V = (M) => (H) => [H.Tt, {
      [o]: Mo(M) + ""
    }];
    k(w, V(x.x)), k(P, V(x.y));
  }, z = () => {
    if (!cs) {
      const { Lt: x } = n, V = Li(x, Fe(f)), M = (H) => ($) => [$.Tt, {
        [a]: Mo(H) + ""
      }];
      k(w, M(V.x)), k(P, M(V.y));
    }
  }, W = () => {
    const { Lt: x } = n, V = zi(x), M = (H) => ($) => [$.Tt, {
      [i]: H ? "0" : "1"
    }];
    k(w, M(V.x)), k(P, M(V.y));
  }, U = () => {
    if (y && !h) {
      const { Rt: x, Lt: V } = n, M = zi(V), H = Li(V, Fe(f)), $ = (B) => {
        const { Tt: N } = B, D = zn(N) === m && N, q = (le, Se, me) => {
          const Ee = Se * le;
          return Mr(me ? Ee : -Ee);
        };
        return [D, D && {
          transform: Bf({
            x: q(H.x, x.x, M.x),
            y: q(H.y, x.y, M.y)
          })
        }];
      };
      k(w, $), k(P, $);
    }
  }, K = (x) => {
    const V = x ? "x" : "y", H = nn(`${Ue} ${x ? ev : tv}`), $ = nn(qr), B = nn(Aa), N = {
      Tt: H,
      Ut: $,
      Pt: B
    }, D = _[V];
    return ye(x ? w : P, N), ye(A, [He(H, $), He($, B), X(ln, H), D && D.kt(N), s(N, p, x)]), N;
  }, G = X(K, !0), Y = X(K, !1), R = () => (He(O, w[0].Tt), He(O, P[0].Tt), X(We, A));
  return G(), Y(), [{
    Nt: E,
    qt: z,
    Bt: W,
    Ft: U,
    jt: p,
    Xt: {
      Yt: w,
      Wt: G,
      Jt: X(k, w)
    },
    Gt: {
      Yt: P,
      Wt: Y,
      Jt: X(k, P)
    }
  }, R];
}, Cv = (e, t, n, s) => (o, a, i) => {
  const { ht: l, ot: r, nt: c, gt: u, Kt: d, Ot: m } = t, { Tt: v, Ut: f, Pt: h } = o, [y, b] = en(333), [C, A] = en(444), w = (T) => {
    Xe(u.scrollBy) && u.scrollBy({
      behavior: "smooth",
      left: T.x,
      top: T.y
    });
  }, P = () => {
    const T = "pointerup pointercancel lostpointercapture", _ = `client${i ? "X" : "Y"}`, L = i ? Ks : Qs, I = i ? "left" : "top", k = i ? "w" : "h", p = i ? "x" : "y", E = (W, U) => (K) => {
      const { Rt: G } = n, Y = sn(f)[k] - sn(h)[k], x = U * K / Y * G[p];
      ot(u, {
        [p]: W + x
      });
    }, z = [];
    return ve(f, "pointerdown", (W) => {
      const U = tn(W.target, `.${Aa}`) === h, K = U ? h : f, G = e.scrollbars, Y = G[U ? "dragScroll" : "clickScroll"], { button: R, isPrimary: x, pointerType: V } = W, { pointers: M } = G;
      if (R === 0 && x && Y && (M || []).includes(V)) {
        We(z), A();
        const $ = !U && (W.shiftKey || Y === "instant"), B = X(go, h), N = X(go, f), D = (he, _e) => (he || B())[I] - (_e || N())[I], q = Oo(go(u)[L]) / sn(u)[k] || 1, le = E(Fe(u)[p], 1 / q), Se = W[_], me = B(), Ee = N(), Z = me[L], Pe = D(me, Ee) + Z / 2, Ve = Se - Ee[I], Ce = U ? 0 : Ve - Pe, Ae = (he) => {
          We(de), K.releasePointerCapture(he.pointerId);
        }, pe = U || $, we = m(), de = [ve(d, T, Ae), ve(d, "selectstart", (he) => No(he), {
          H: !1
        }), ve(f, T, Ae), pe && ve(f, "pointermove", (he) => le(Ce + (he[_] - Se))), pe && (() => {
          const he = Fe(u);
          we();
          const _e = Fe(u), $e = {
            x: _e.x - he.x,
            y: _e.y - he.y
          };
          (As($e.x) > 3 || As($e.y) > 3) && (m(), ot(u, he), w($e), C(we));
        })];
        if (K.setPointerCapture(W.pointerId), $)
          le(Ce);
        else if (!U) {
          const he = Yn(bv);
          if (he) {
            const _e = he(le, Ce, Z, ($e) => {
              $e ? we() : ye(de, we);
            });
            ye(de, _e), ye(z, X(_e, !0));
          }
        }
      }
    });
  };
  let O = !0;
  return X(We, [ve(h, "pointermove pointerleave", s), ve(v, "pointerenter", () => {
    a(Fi, !0);
  }), ve(v, "pointerleave pointercancel", () => {
    a(Fi, !1);
  }), !c && ve(v, "mousedown", () => {
    const T = Bo();
    (Ti(T, mt) || Ti(T, Ct) || T === document.body) && Os(X(Do, r), 25);
  }), ve(v, "wheel", (T) => {
    const { deltaX: _, deltaY: L, deltaMode: I } = T;
    O && I === 0 && zn(v) === l && w({
      x: _,
      y: L
    }), O = !1, a(Ui, !0), y(() => {
      O = !0, a(Ui);
    }), No(T);
  }, {
    H: !1,
    I: !0
  }), ve(v, "pointerdown", X(ve, d, "click", Hr, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), P(), b, A]);
}, _v = (e, t, n, s, o, a) => {
  let i, l, r, c, u, d = Dt, m = 0;
  const v = (x) => x.pointerType === "mouse", [f, h] = en(), [y, b] = en(100), [C, A] = en(100), [w, P] = en(() => m), [O, T] = xv(e, o, s, Cv(t, o, s, (x) => v(x) && K())), { ht: _, Qt: L, wt: I } = o, { jt: k, Nt: p, qt: E, Bt: z, Ft: W } = O, U = (x, V) => {
    if (P(), x)
      k(ji);
    else {
      const M = X(k, ji, !0);
      m > 0 && !V ? w(M) : M();
    }
  }, K = () => {
    (r ? !i : !c) && (U(!0), y(() => {
      U(!1);
    }));
  }, G = (x) => {
    k(Wo, x, !0), k(Wo, x, !1);
  }, Y = (x) => {
    v(x) && (i = r, r && U(!0));
  }, R = [P, b, A, h, () => d(), ve(_, "pointerover", Y, {
    A: !0
  }), ve(_, "pointerenter", Y), ve(_, "pointerleave", (x) => {
    v(x) && (i = !1, r && U(!1));
  }), ve(_, "pointermove", (x) => {
    v(x) && l && K();
  }), ve(L, "scroll", (x) => {
    f(() => {
      E(), K();
    }), a(x), W();
  })];
  return [() => X(We, ye(R, T())), ({ It: x, Dt: V, Zt: M, tn: H }) => {
    const { nn: $, sn: B, en: N, cn: D } = H || {}, { Ct: q, dt: le } = M || {}, { ct: Se } = n, { k: me } = dt(), { K: Ee, rn: Z } = s, [Pe, Ve] = x("showNativeOverlaidScrollbars"), [Ce, Ae] = x("scrollbars.theme"), [pe, we] = x("scrollbars.visibility"), [de, he] = x("scrollbars.autoHide"), [_e, $e] = x("scrollbars.autoHideSuspend"), [yn] = x("scrollbars.autoHideDelay"), [Xn, Kn] = x("scrollbars.dragScroll"), [Qn, It] = x("scrollbars.clickScroll"), [Xt, to] = x("overflow"), no = le && !V, so = Z.x || Z.y, oo = $ || B || D || q || V, nt = N || we || to, ao = Pe && me.x && me.y, pn = (bn, pt, Zn) => {
      const Sn = bn.includes(an) && (pe === wt || pe === "auto" && pt === an);
      return k(nv, Sn, Zn), Sn;
    };
    if (m = yn, no && (_e && so ? (G(!1), d(), C(() => {
      d = ve(L, "scroll", X(G, !0), {
        A: !0
      });
    })) : G(!0)), Ve && k(Zf, ao), Ae && (k(u), k(Ce, !0), u = Ce), $e && !_e && G(!0), he && (l = de === "move", r = de === "leave", c = de === "never", U(c, !0)), Kn && k(av, Xn), It && k(ov, !!Qn), nt) {
      const bn = pn(Xt.x, Ee.x, !0), pt = pn(Xt.y, Ee.y, !1);
      k(sv, !(bn && pt));
    }
    oo && (E(), p(), W(), D && z(), k(Wi, !Z.x, !0), k(Wi, !Z.y, !1), k(Jf, Se && !I));
  }, {}, O];
}, kv = (e) => {
  const t = dt(), { U: n, R: s } = t, { elements: o } = n(), { padding: a, viewport: i, content: l } = o, r = $s(e), c = r ? {} : e, { elements: u } = c, { padding: d, viewport: m, content: v } = u || {}, f = r ? e : c.target, h = zr(f), y = f.ownerDocument, b = y.documentElement, C = () => y.defaultView || ze, A = X(cv, [f]), w = X(Xr, [f]), P = X(nn, ""), O = X(A, P, i), T = X(w, P, l), _ = (Z) => {
    const Pe = sn(Z), Ve = Ls(Z), Ce = yt(Z, _r), Ae = yt(Z, kr);
    return Ve.w - Pe.w > 0 && !rn(Ce) || Ve.h - Pe.h > 0 && !rn(Ae);
  }, L = O(m), I = L === f, k = I && h, p = !I && T(v), E = !I && L === p, z = k ? b : L, W = k ? z : f, U = !I && w(P, a, d), K = !E && p, G = [K, z, U, W].map((Z) => $s(Z) && !zn(Z) && Z), Y = (Z) => Z && gr(G, Z), R = !Y(z) && _(z) ? z : f, x = k ? b : z, M = {
    vt: f,
    ht: W,
    ot: z,
    ln: U,
    bt: K,
    gt: x,
    Qt: k ? y : z,
    an: h ? b : R,
    Kt: y,
    wt: h,
    Mt: r,
    nt: I,
    un: C,
    yt: (Z) => _a(z, mt, Z),
    St: (Z, Pe) => zs(z, mt, Z, Pe),
    Ot: () => zs(x, mt, Gf, !0)
  }, { vt: H, ht: $, ln: B, ot: N, bt: D } = M, q = [() => {
    st($, [Ct, yo]), st(H, yo), h && st(b, [yo, Ct]);
  }];
  let le = Lo([D, N, B, $, H].find((Z) => Z && !Y(Z)));
  const Se = k ? H : D || N, me = X(We, q);
  return [M, () => {
    const Z = C(), Pe = Bo(), Ve = (de) => {
      He(zn(de), Lo(de)), ln(de);
    }, Ce = (de) => ve(de, "focusin focusout focus blur", Hr, {
      I: !0,
      H: !1
    }), Ae = "tabindex", pe = xa(N, Ae), we = Ce(Pe);
    return vt($, Ct, I ? "" : Wf), vt(B, Fo, ""), vt(N, mt, ""), vt(D, Hi, ""), I || (vt(N, Ae, pe || "-1"), h && vt(b, Di, "")), He(Se, le), He($, B), He(B || $, !I && N), He(N, D), ye(q, [we, () => {
      const de = Bo(), he = Y(N), _e = he && de === N ? H : de, $e = Ce(_e);
      st(B, Fo), st(D, Hi), st(N, mt), h && st(b, Di), pe ? vt(N, Ae, pe) : st(N, Ae), Y(D) && Ve(D), he && Ve(N), Y(B) && Ve(B), Do(_e), $e();
    }]), s && !I && (Ca(N, mt, Ur), ye(q, X(st, N, mt))), Do(!I && h && Pe === H && Z.top === Z ? N : Pe), we(), le = 0, me;
  }, me];
}, Ev = ({ bt: e }) => ({ Zt: t, _n: n, Dt: s }) => {
  const { xt: o } = t || {}, { $t: a } = n;
  e && (o || s) && Ln(e, {
    [Qs]: a && "100%"
  });
}, Pv = ({ ht: e, ln: t, ot: n, nt: s }, o) => {
  const [a, i] = Ne({
    i: $f,
    o: Vi()
  }, X(Vi, e, "padding", ""));
  return ({ It: l, Zt: r, _n: c, Dt: u }) => {
    let [d, m] = i(u);
    const { R: v } = dt(), { ft: f, Ht: h, Ct: y } = r || {}, { ct: b } = c, [C, A] = l("paddingAbsolute");
    (f || m || (u || h)) && ([d, m] = a(u));
    const P = !s && (A || y || m);
    if (P) {
      const O = !C || !t && !v, T = d.r + d.l, _ = d.t + d.b, L = {
        [xr]: O && !b ? -T : 0,
        [Cr]: O ? -_ : 0,
        [wr]: O && b ? -T : 0,
        top: O ? -d.t : 0,
        right: O ? b ? -d.r : "auto" : 0,
        left: O ? b ? "auto" : -d.l : 0,
        [Ks]: O && `calc(100% + ${T}px)`
      }, I = {
        [yr]: O ? d.t : 0,
        [pr]: O ? d.r : 0,
        [Sr]: O ? d.b : 0,
        [br]: O ? d.l : 0
      };
      Ln(t || n, L), Ln(n, I), oe(o, {
        ln: d,
        dn: !O,
        rt: t ? I : oe({}, L, I)
      });
    }
    return {
      fn: P
    };
  };
}, Av = (e, t) => {
  const n = dt(), { ht: s, ln: o, ot: a, nt: i, Qt: l, gt: r, wt: c, St: u, un: d } = e, { R: m } = n, v = c && i, f = X(mr, 0), h = {
    display: () => !1,
    direction: (V) => V !== "ltr",
    flexDirection: (V) => V.endsWith("-reverse"),
    writingMode: (V) => V !== "horizontal-tb"
  }, y = Je(h), b = {
    i: Er,
    o: {
      w: 0,
      h: 0
    }
  }, C = {
    i: us,
    o: {}
  }, A = (V) => {
    u(jr, !v && V);
  }, w = (V) => {
    if (!y.some((Se) => {
      const me = V[Se];
      return me && h[Se](me);
    }))
      return {
        D: {
          x: 0,
          y: 0
        },
        M: {
          x: 1,
          y: 1
        }
      };
    A(!0);
    const H = Fe(r), $ = u(Yf, !0), B = ve(l, an, (Se) => {
      const me = Fe(r);
      Se.isTrusted && me.x === H.x && me.y === H.y && Dr(Se);
    }, {
      I: !0,
      A: !0
    });
    ot(r, {
      x: 0,
      y: 0
    }), $();
    const N = Fe(r), D = Ls(r);
    ot(r, {
      x: D.w,
      y: D.h
    });
    const q = Fe(r);
    ot(r, {
      x: q.x - N.x < 1 && -D.w,
      y: q.y - N.y < 1 && -D.h
    });
    const le = Fe(r);
    return ot(r, H), ga(() => B()), {
      D: N,
      M: le
    };
  }, P = (V, M) => {
    const H = ze.devicePixelRatio % 1 !== 0 ? 1 : 0, $ = {
      w: f(V.w - M.w),
      h: f(V.h - M.h)
    };
    return {
      w: $.w > H ? $.w : 0,
      h: $.h > H ? $.h : 0
    };
  }, [O, T] = Ne(b, X(Ea, a)), [_, L] = Ne(b, X(Ls, a)), [I, k] = Ne(b), [p] = Ne(C), [E, z] = Ne(b), [W] = Ne(C), [U] = Ne({
    i: (V, M) => Zs(V, M, y),
    o: {}
  }, () => Df(a) ? yt(a, y) : {}), [K, G] = Ne({
    i: (V, M) => us(V.D, M.D) && us(V.M, M.M),
    o: Fr()
  }), Y = Yn(ec), R = (V, M) => `${M ? jf : Uf}${Vf(V)}`, x = (V) => {
    const M = ($) => [wt, zt, an].map((B) => R(B, $)), H = M(!0).concat(M()).join(" ");
    u(H), u(Je(V).map(($) => R(V[$], $ === "x")).join(" "), !0);
  };
  return ({ It: V, Zt: M, _n: H, Dt: $ }, { fn: B }) => {
    const { ft: N, Ht: D, Ct: q, dt: le, zt: Se } = M || {}, me = Y && Y.tt(e, t, H, n, V), { it: Ee, ut: Z, _t: Pe } = me || {}, [Ve, Ce] = yv(V, n), [Ae, pe] = V("overflow"), we = rn(Ae.x), de = rn(Ae.y), he = !0;
    let _e = T($), $e = L($), yn = k($), Xn = z($);
    Ce && m && u(Ur, !Ve);
    {
      _a(s, Ct, fs) && A(!0);
      const [La] = Z ? Z() : [], [Jn] = _e = O($), [es] = $e = _($), ts = Rr(a), ns = v && Nf(d()), Lc = {
        w: f(es.w + Jn.w),
        h: f(es.h + Jn.h)
      }, Ba = {
        w: f((ns ? ns.w : ts.w + f(ts.w - es.w)) + Jn.w),
        h: f((ns ? ns.h : ts.h + f(ts.h - es.h)) + Jn.h)
      };
      La && La(), Xn = E(Ba), yn = I(P(Lc, Ba), $);
    }
    const [Kn, Qn] = Xn, [It, Xt] = yn, [to, no] = $e, [so, oo] = _e, [nt, ao] = p({
      x: It.w > 0,
      y: It.h > 0
    }), pn = we && de && (nt.x || nt.y) || we && nt.x && !nt.y || de && nt.y && !nt.x, bn = B || q || Se || oo || no || Qn || Xt || pe || Ce || he, pt = pv(nt, Ae), [Zn, Sn] = W(pt.K), [Ic, Vc] = U($), za = q || le || Vc || ao || $, [$c, zc] = za ? K(w(Ic), $) : G();
    return bn && (Sn && x(pt.K), Pe && Ee && Ln(a, Pe(pt, H, Ee(pt, to, so)))), A(!1), zs(s, Ct, fs, pn), zs(o, Fo, fs, pn), oe(t, {
      K: Zn,
      Vt: {
        x: Kn.w,
        y: Kn.h
      },
      Rt: {
        x: It.w,
        y: It.h
      },
      rn: nt,
      Lt: Hf($c, It)
    }), {
      en: Sn,
      nn: Qn,
      sn: Xt,
      cn: zc || Xt,
      vn: za
    };
  };
}, Ov = (e) => {
  const [t, n, s] = kv(e), o = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: !1,
    rt: {
      [xr]: 0,
      [Cr]: 0,
      [wr]: 0,
      [yr]: 0,
      [pr]: 0,
      [Sr]: 0,
      [br]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    K: {
      x: zt,
      y: zt
    },
    rn: {
      x: !1,
      y: !1
    },
    Lt: Fr()
  }, { vt: a, gt: i, nt: l, Ot: r } = t, { R: c, k: u } = dt(), d = !c && (u.x || u.y), m = [Ev(t), Pv(t, o), Av(t, o)];
  return [n, (v) => {
    const f = {}, y = d && Fe(i), b = y && r();
    return re(m, (C) => {
      oe(f, C(v, f) || {});
    }), ot(i, y), b && b(), !l && ot(a, 0), f;
  }, o, t, s];
}, Tv = (e, t, n, s, o) => {
  let a = !1;
  const i = Ni(t, {}), [l, r, c, u, d] = Ov(e), [m, v, f] = wv(u, c, i, (w) => {
    A({}, w);
  }), [h, y, , b] = _v(e, t, f, c, u, o), C = (w) => Je(w).some((P) => !!w[P]), A = (w, P) => {
    if (n())
      return !1;
    const { pn: O, Dt: T, At: _, hn: L } = w, I = O || {}, k = !!T || !a, p = {
      It: Ni(t, I, k),
      pn: I,
      Dt: k
    };
    if (L)
      return y(p), !1;
    const E = P || v(oe({}, p, {
      At: _
    })), z = r(oe({}, p, {
      _n: f,
      Zt: E
    }));
    y(oe({}, p, {
      Zt: E,
      tn: z
    }));
    const W = C(E), U = C(z), K = W || U || !wa(I) || k;
    return a = !0, K && s(w, {
      Zt: E,
      tn: z
    }), K;
  };
  return [() => {
    const { an: w, gt: P, Ot: O } = u, T = Fe(w), _ = [m(), l(), h()], L = O();
    return ot(P, T), L(), X(We, _);
  }, A, () => ({
    gn: f,
    bn: c
  }), {
    wn: u,
    yn: b
  }, d];
}, at = (e, t, n) => {
  const { N: s } = dt(), o = $s(e), a = o ? e : e.target, i = Kr(a);
  if (t && !i) {
    let l = !1;
    const r = [], c = {}, u = (I) => {
      const k = Ar(I), p = Yn(hv);
      return p ? p(k, !0) : k;
    }, d = oe({}, s(), u(t)), [m, v, f] = Ho(), [h, y, b] = Ho(n), C = (I, k) => {
      b(I, k), f(I, k);
    }, [A, w, P, O, T] = Tv(e, d, () => l, ({ pn: I, Dt: k }, { Zt: p, tn: E }) => {
      const { ft: z, Ct: W, xt: U, Ht: K, Et: G, dt: Y } = p, { nn: R, sn: x, en: V, cn: M } = E;
      C("updated", [L, {
        updateHints: {
          sizeChanged: !!z,
          directionChanged: !!W,
          heightIntrinsicChanged: !!U,
          overflowEdgeChanged: !!R,
          overflowAmountChanged: !!x,
          overflowStyleChanged: !!V,
          scrollCoordinatesChanged: !!M,
          contentMutation: !!K,
          hostMutation: !!G,
          appear: !!Y
        },
        changedOptions: I || {},
        force: !!k
      }]);
    }, (I) => C("scroll", [L, I])), _ = (I) => {
      fv(a), We(r), l = !0, C("destroyed", [L, I]), v(), y();
    }, L = {
      options(I, k) {
        if (I) {
          const p = k ? s() : {}, E = Wr(d, oe(p, u(I)));
          wa(E) || (oe(d, E), w({
            pn: E
          }));
        }
        return oe({}, d);
      },
      on: h,
      off: (I, k) => {
        I && k && y(I, k);
      },
      state() {
        const { gn: I, bn: k } = P(), { ct: p } = I, { Vt: E, Rt: z, K: W, rn: U, ln: K, dn: G, Lt: Y } = k;
        return oe({}, {
          overflowEdge: E,
          overflowAmount: z,
          overflowStyle: W,
          hasOverflow: U,
          scrollCoordinates: {
            start: Y.D,
            end: Y.M
          },
          padding: K,
          paddingAbsolute: G,
          directionRTL: p,
          destroyed: l
        });
      },
      elements() {
        const { vt: I, ht: k, ln: p, ot: E, bt: z, gt: W, Qt: U } = O.wn, { Xt: K, Gt: G } = O.yn, Y = (x) => {
          const { Pt: V, Ut: M, Tt: H } = x;
          return {
            scrollbar: H,
            track: M,
            handle: V
          };
        }, R = (x) => {
          const { Yt: V, Wt: M } = x, H = Y(V[0]);
          return oe({}, H, {
            clone: () => {
              const $ = Y(M());
              return w({
                hn: !0
              }), $;
            }
          });
        };
        return oe({}, {
          target: I,
          host: k,
          padding: p || E,
          viewport: E,
          content: z || E,
          scrollOffsetElement: W,
          scrollEventElement: U,
          scrollbarHorizontal: R(K),
          scrollbarVertical: R(G)
        });
      },
      update: (I) => w({
        Dt: I,
        At: !0
      }),
      destroy: X(_, !1),
      plugin: (I) => c[Je(I)[0]]
    };
    return ye(r, [T]), dv(a, L), Jr(Qr, at, [L, m, c]), uv(O.wn.wt, !o && e.cancel) ? (_(!0), L) : (ye(r, A()), C("initialized", [L]), L.update(), L);
  }
  return i;
};
at.plugin = (e) => {
  const t = ut(e), n = t ? e : [e], s = n.map((o) => Jr(o, at)[0]);
  return mv(n), t ? s : s[0];
};
at.valid = (e) => {
  const t = e && e.elements, n = Xe(t) && t();
  return Vs(n) && !!Kr(n.target);
};
at.env = () => {
  const { T: e, k: t, R: n, V: s, B: o, F: a, U: i, P: l, N: r, q: c } = dt();
  return oe({}, {
    scrollbarsSize: e,
    scrollbarsOverlaid: t,
    scrollbarsHiding: n,
    scrollTimeline: s,
    staticDefaultInitialization: o,
    staticDefaultOptions: a,
    getDefaultInitialization: i,
    setDefaultInitialization: l,
    getDefaultOptions: r,
    setDefaultOptions: c
  });
};
at.nonce = lv;
const Iv = () => {
  if (typeof window > "u") {
    const c = () => {
    };
    return [c, c];
  }
  let e, t;
  const n = window, s = typeof n.requestIdleCallback == "function", o = n.requestAnimationFrame, a = n.cancelAnimationFrame, i = s ? n.requestIdleCallback : o, l = s ? n.cancelIdleCallback : a, r = () => {
    l(e), a(t);
  };
  return [
    (c, u) => {
      r(), e = i(
        s ? () => {
          r(), t = o(c);
        } : c,
        typeof u == "object" ? u : { timeout: 2233 }
      );
    },
    r
  ];
}, Vv = (e) => {
  let t = null, n, s, o;
  const a = ee(e || {}), [i, l] = Iv();
  return ne(
    () => {
      var r;
      return ge((r = a.value) == null ? void 0 : r.defer);
    },
    (r) => {
      o = r;
    },
    { deep: !0, immediate: !0 }
  ), ne(
    () => {
      var r;
      return ge((r = a.value) == null ? void 0 : r.options);
    },
    (r) => {
      n = r, at.valid(t) && t.options(n || {}, !0);
    },
    { deep: !0, immediate: !0 }
  ), ne(
    () => {
      var r;
      return ge((r = a.value) == null ? void 0 : r.events);
    },
    (r) => {
      s = r, at.valid(t) && t.on(
        /* c8 ignore next */
        s || {},
        !0
      );
    },
    { deep: !0, immediate: !0 }
  ), Xc(() => {
    l(), t == null || t.destroy();
  }), [
    (r) => {
      if (at.valid(t))
        return t;
      const c = () => t = at(r, n || {}, s || {});
      o ? i(c, o) : c();
    },
    () => t
  ];
}, $v = /* @__PURE__ */ cn({
  __name: "OverlayScrollbarsComponent",
  props: {
    element: {
      type: [String, Object],
      default: "div"
    },
    options: { type: Object },
    events: { type: Object },
    defer: { type: [Boolean, Object] }
  },
  emits: ["osInitialized", "osUpdated", "osDestroyed", "osScroll"],
  setup(e, { expose: t, emit: n }) {
    const s = e, o = {
      initialized: "osInitialized",
      updated: "osUpdated",
      destroyed: "osDestroyed",
      scroll: "osScroll"
    }, { element: a, options: i, events: l, defer: r } = Xo(s), c = ee(null), u = ee(null), d = J(), [m, v] = Vv({ options: i, events: d, defer: r });
    return t({
      osInstance: v,
      getElement: () => c.value
    }), Yc((f) => {
      const { value: h } = c, { value: y } = u;
      h && (m(
        a.value === "body" ? {
          target: h,
          cancel: {
            body: null
          }
        } : {
          target: h,
          elements: {
            viewport: y,
            content: y
          }
        }
      ), f(() => {
        var b;
        return (b = v()) == null ? void 0 : b.destroy();
      }));
    }), ne(
      () => ge(l),
      (f) => {
        const h = f || {};
        d.value = Object.keys(o).reduce((y, b) => {
          const C = h[b];
          return y[b] = [
            (...A) => n(
              o[b],
              ...A
            ),
            ...(Array.isArray(C) ? C : [C]).filter(Boolean)
          ], y;
        }, {});
      },
      { deep: !0, immediate: !0 }
    ), (f, h) => (Qe(), Lt(rl(ge(a)), {
      "data-overlayscrollbars-initialize": "",
      ref_key: "elementRef",
      ref: c
    }, {
      default: j(() => [
        ge(a) === "body" ? wo(f.$slots, "default", { key: 0 }) : (Qe(), Ns("div", {
          key: 1,
          "data-overlayscrollbars-contents": "",
          ref_key: "slotRef",
          ref: u
        }, [
          wo(f.$slots, "default")
        ], 512))
      ]),
      _: 3
    }, 512));
  }
}), nc = Us.reduce((e, t) => (e[t] = {
  type: [Boolean, String, Number],
  default: !1
}, e), {}), sc = Us.reduce((e, t) => {
  const n = "offset" + Rn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), oc = Us.reduce((e, t) => {
  const n = "order" + Rn(t);
  return e[n] = {
    type: [String, Number],
    default: null
  }, e;
}, {}), Gi = {
  col: Object.keys(nc),
  offset: Object.keys(sc),
  order: Object.keys(oc)
};
function zv(e, t, n) {
  let s = e;
  if (!(n == null || n === !1)) {
    if (t) {
      const o = t.replace(e, "");
      s += `-${o}`;
    }
    return e === "col" && (s = "v-" + s), e === "col" && (n === "" || n === !0) || (s += `-${n}`), s.toLowerCase();
  }
}
const Lv = ["auto", "start", "end", "center", "baseline", "stretch"], Bv = F({
  cols: {
    type: [Boolean, String, Number],
    default: !1
  },
  ...nc,
  offset: {
    type: [String, Number],
    default: null
  },
  ...sc,
  order: {
    type: [String, Number],
    default: null
  },
  ...oc,
  alignSelf: {
    type: String,
    default: null,
    validator: (e) => Lv.includes(e)
  },
  ...ue(),
  ...xe()
}, "VCol"), Yi = te()({
  name: "VCol",
  props: Bv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const s = S(() => {
      const o = [];
      let a;
      for (a in Gi)
        Gi[a].forEach((l) => {
          const r = e[l], c = zv(a, l, r);
          c && o.push(c);
        });
      const i = o.some((l) => l.startsWith("v-col-"));
      return o.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !i || !e.cols,
        [`v-col-${e.cols}`]: e.cols,
        [`offset-${e.offset}`]: e.offset,
        [`order-${e.order}`]: e.order,
        [`align-self-${e.alignSelf}`]: e.alignSelf
      }), o;
    });
    return () => {
      var o;
      return kt(e.tag, {
        class: [s.value, e.class],
        style: e.style
      }, (o = n.default) == null ? void 0 : o.call(n));
    };
  }
}), Ta = ["start", "end", "center"], ac = ["space-between", "space-around", "space-evenly"];
function Ia(e, t) {
  return Us.reduce((n, s) => {
    const o = e + Rn(s);
    return n[o] = t(), n;
  }, {});
}
const Mv = [...Ta, "baseline", "stretch"], ic = (e) => Mv.includes(e), lc = Ia("align", () => ({
  type: String,
  default: null,
  validator: ic
})), Rv = [...Ta, ...ac], rc = (e) => Rv.includes(e), cc = Ia("justify", () => ({
  type: String,
  default: null,
  validator: rc
})), Nv = [...Ta, ...ac, "stretch"], uc = (e) => Nv.includes(e), dc = Ia("alignContent", () => ({
  type: String,
  default: null,
  validator: uc
})), Xi = {
  align: Object.keys(lc),
  justify: Object.keys(cc),
  alignContent: Object.keys(dc)
}, Dv = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function Hv(e, t, n) {
  let s = Dv[e];
  if (n != null) {
    if (t) {
      const o = t.replace(e, "");
      s += `-${o}`;
    }
    return s += `-${n}`, s.toLowerCase();
  }
}
const Fv = F({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: ic
  },
  ...lc,
  justify: {
    type: String,
    default: null,
    validator: rc
  },
  ...cc,
  alignContent: {
    type: String,
    default: null,
    validator: uc
  },
  ...dc,
  ...ue(),
  ...xe()
}, "VRow"), Wv = te()({
  name: "VRow",
  props: Fv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const s = S(() => {
      const o = [];
      let a;
      for (a in Xi)
        Xi[a].forEach((i) => {
          const l = e[i], r = Hv(a, i, l);
          r && o.push(r);
        });
      return o.push({
        "v-row--no-gutters": e.noGutters,
        "v-row--dense": e.dense,
        [`align-${e.align}`]: e.align,
        [`justify-${e.justify}`]: e.justify,
        [`align-content-${e.alignContent}`]: e.alignContent
      }), o;
    });
    return () => {
      var o;
      return kt(e.tag, {
        class: ["v-row", s.value, e.class],
        style: e.style
      }, (o = n.default) == null ? void 0 : o.call(n));
    };
  }
}), jv = /* @__PURE__ */ Bt("div", null, "123", -1), Uv = /* @__PURE__ */ cn({
  __name: "GraphView",
  setup(e) {
    return (t, n) => (Qe(), Lt(Wv, {
      "no-gutters": "",
      class: "h-full"
    }, {
      default: j(() => [
        g(Yi, { cols: "2" }, {
          default: j(() => [
            jv
          ]),
          _: 1
        }),
        g(Yi, {
          cols: "10",
          class: "h-full"
        }, {
          default: j(() => [
            g(ge($v), {
              class: "h-full",
              defer: ""
            }, {
              default: j(() => [
                (Qe(), Ns(Ye, null, Kc(500, (s) => Bt("p", { key: s }, [
                  Bt("span", null, Qc(s), 1)
                ])), 64))
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), Bs = Symbol.for("vuetify:layout"), fc = Symbol.for("vuetify:layout-item"), Ki = 1e3, qv = F({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, "layout"), Gv = F({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, "layout-item");
function Yv() {
  const e = be(Bs);
  if (!e) throw new Error("[Vuetify] Could not find injected layout");
  return {
    getLayoutItem: e.getLayoutItem,
    mainRect: e.mainRect,
    mainStyles: e.mainStyles
  };
}
function Xv(e) {
  const t = be(Bs);
  if (!t) throw new Error("[Vuetify] Could not find injected layout");
  const n = e.id ?? `layout-item-${Hn()}`, s = ke("useLayoutItem");
  Be(fc, {
    id: n
  });
  const o = ee(!1);
  cl(() => o.value = !0), Zc(() => o.value = !1);
  const {
    layoutItemStyles: a,
    layoutItemScrimStyles: i
  } = t.register(s, {
    ...e,
    active: S(() => o.value ? !1 : e.active.value),
    id: n
  });
  return tt(() => t.unregister(n)), {
    layoutItemStyles: a,
    layoutRect: t.layoutRect,
    layoutItemScrimStyles: i
  };
}
const Kv = (e, t, n, s) => {
  let o = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const a = [{
    id: "",
    layer: {
      ...o
    }
  }];
  for (const i of e) {
    const l = t.get(i), r = n.get(i), c = s.get(i);
    if (!l || !r || !c) continue;
    const u = {
      ...o,
      [l.value]: parseInt(o[l.value], 10) + (c.value ? parseInt(r.value, 10) : 0)
    };
    a.push({
      id: i,
      layer: u
    }), o = u;
  }
  return a;
};
function Qv(e) {
  const t = be(Bs, null), n = S(() => t ? t.rootZIndex.value - 100 : Ki), s = J([]), o = ht(/* @__PURE__ */ new Map()), a = ht(/* @__PURE__ */ new Map()), i = ht(/* @__PURE__ */ new Map()), l = ht(/* @__PURE__ */ new Map()), r = ht(/* @__PURE__ */ new Map()), {
    resizeRef: c,
    contentRect: u
  } = Cs(), d = S(() => {
    const O = /* @__PURE__ */ new Map(), T = e.overlaps ?? [];
    for (const _ of T.filter((L) => L.includes(":"))) {
      const [L, I] = _.split(":");
      if (!s.value.includes(L) || !s.value.includes(I)) continue;
      const k = o.get(L), p = o.get(I), E = a.get(L), z = a.get(I);
      !k || !p || !E || !z || (O.set(I, {
        position: k.value,
        amount: parseInt(E.value, 10)
      }), O.set(L, {
        position: p.value,
        amount: -parseInt(z.value, 10)
      }));
    }
    return O;
  }), m = S(() => {
    const O = [...new Set([...i.values()].map((_) => _.value))].sort((_, L) => _ - L), T = [];
    for (const _ of O) {
      const L = s.value.filter((I) => {
        var k;
        return ((k = i.get(I)) == null ? void 0 : k.value) === _;
      });
      T.push(...L);
    }
    return Kv(T, o, a, l);
  }), v = S(() => !Array.from(r.values()).some((O) => O.value)), f = S(() => m.value[m.value.length - 1].layer), h = S(() => ({
    "--v-layout-left": se(f.value.left),
    "--v-layout-right": se(f.value.right),
    "--v-layout-top": se(f.value.top),
    "--v-layout-bottom": se(f.value.bottom),
    ...v.value ? void 0 : {
      transition: "none"
    }
  })), y = S(() => m.value.slice(1).map((O, T) => {
    let {
      id: _
    } = O;
    const {
      layer: L
    } = m.value[T], I = a.get(_), k = o.get(_);
    return {
      id: _,
      ...L,
      size: Number(I.value),
      position: k.value
    };
  })), b = (O) => y.value.find((T) => T.id === O), C = ke("createLayout"), A = ee(!1);
  Ft(() => {
    A.value = !0;
  }), Be(Bs, {
    register: (O, T) => {
      let {
        id: _,
        order: L,
        position: I,
        layoutSize: k,
        elementSize: p,
        active: E,
        disableTransitions: z,
        absolute: W
      } = T;
      i.set(_, L), o.set(_, I), a.set(_, k), l.set(_, E), z && r.set(_, z);
      const K = Zt(fc, C == null ? void 0 : C.vnode).indexOf(O);
      K > -1 ? s.value.splice(K, 0, _) : s.value.push(_);
      const G = S(() => y.value.findIndex((V) => V.id === _)), Y = S(() => n.value + m.value.length * 2 - G.value * 2), R = S(() => {
        const V = I.value === "left" || I.value === "right", M = I.value === "right", H = I.value === "bottom", $ = p.value ?? k.value, B = $ === 0 ? "%" : "px", N = {
          [I.value]: 0,
          zIndex: Y.value,
          transform: `translate${V ? "X" : "Y"}(${(E.value ? 0 : -($ === 0 ? 100 : $)) * (M || H ? -1 : 1)}${B})`,
          position: W.value || n.value !== Ki ? "absolute" : "fixed",
          ...v.value ? void 0 : {
            transition: "none"
          }
        };
        if (!A.value) return N;
        const D = y.value[G.value];
        if (!D) throw new Error(`[Vuetify] Could not find layout item "${_}"`);
        const q = d.value.get(_);
        return q && (D[q.position] += q.amount), {
          ...N,
          height: V ? `calc(100% - ${D.top}px - ${D.bottom}px)` : p.value ? `${p.value}px` : void 0,
          left: M ? void 0 : `${D.left}px`,
          right: M ? `${D.right}px` : void 0,
          top: I.value !== "bottom" ? `${D.top}px` : void 0,
          bottom: I.value !== "top" ? `${D.bottom}px` : void 0,
          width: V ? p.value ? `${p.value}px` : void 0 : `calc(100% - ${D.left}px - ${D.right}px)`
        };
      }), x = S(() => ({
        zIndex: Y.value - 1
      }));
      return {
        layoutItemStyles: R,
        layoutItemScrimStyles: x,
        zIndex: Y
      };
    },
    unregister: (O) => {
      i.delete(O), o.delete(O), a.delete(O), l.delete(O), r.delete(O), s.value = s.value.filter((T) => T !== O);
    },
    mainRect: f,
    mainStyles: h,
    getLayoutItem: b,
    items: y,
    layoutRect: u,
    rootZIndex: n
  });
  const w = S(() => ["v-layout", {
    "v-layout--full-height": e.fullHeight
  }]), P = S(() => ({
    zIndex: t ? n.value : void 0,
    position: t ? "relative" : void 0,
    overflow: t ? "hidden" : void 0
  }));
  return {
    layoutClasses: w,
    layoutStyles: P,
    getLayoutItem: b,
    items: y,
    layoutRect: u,
    layoutRef: c
  };
}
const Zv = F({
  ...ue(),
  ...qv({
    fullHeight: !0
  }),
  ...Me()
}, "VApp"), Jv = te()({
  name: "VApp",
  props: Zv(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const s = Re(e), {
      layoutClasses: o,
      getLayoutItem: a,
      items: i,
      layoutRef: l
    } = Qv(e), {
      rtlClasses: r
    } = Ot();
    return ie(() => {
      var c;
      return g("div", {
        ref: l,
        class: ["v-application", s.themeClasses.value, o.value, r.value, e.class],
        style: [e.style]
      }, [g("div", {
        class: "v-application__wrap"
      }, [(c = n.default) == null ? void 0 : c.call(n)])]);
    }), {
      getLayoutItem: a,
      items: i,
      theme: s
    };
  }
}), vc = F({
  text: String,
  ...ue(),
  ...xe()
}, "VToolbarTitle"), mc = te()({
  name: "VToolbarTitle",
  props: vc(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => {
      const s = !!(n.default || n.text || e.text);
      return g(e.tag, {
        class: ["v-toolbar-title", e.class],
        style: e.style
      }, {
        default: () => {
          var o;
          return [s && g("div", {
            class: "v-toolbar-title__placeholder"
          }, [n.text ? n.text() : e.text, (o = n.default) == null ? void 0 : o.call(n)])];
        }
      });
    }), {};
  }
}), em = [null, "prominent", "default", "comfortable", "compact"], hc = F({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (e) => em.includes(e)
  },
  extended: Boolean,
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...jt(),
  ...ue(),
  ...fn(),
  ...Pt(),
  ...xe({
    tag: "header"
  }),
  ...Me()
}, "VToolbar"), Qi = te()({
  name: "VToolbar",
  props: hc(),
  setup(e, t) {
    var v;
    let {
      slots: n
    } = t;
    const {
      backgroundColorClasses: s,
      backgroundColorStyles: o
    } = Wn(Q(e, "color")), {
      borderClasses: a
    } = Ut(e), {
      elevationClasses: i
    } = vn(e), {
      roundedClasses: l
    } = At(e), {
      themeClasses: r
    } = Re(e), {
      rtlClasses: c
    } = Ot(), u = ee(!!(e.extended || (v = n.extension) != null && v.call(n))), d = S(() => parseInt(Number(e.height) + (e.density === "prominent" ? Number(e.height) : 0) - (e.density === "comfortable" ? 8 : 0) - (e.density === "compact" ? 16 : 0), 10)), m = S(() => u.value ? parseInt(Number(e.extensionHeight) + (e.density === "prominent" ? Number(e.extensionHeight) : 0) - (e.density === "comfortable" ? 4 : 0) - (e.density === "compact" ? 8 : 0), 10) : 0);
    return dn({
      VBtn: {
        variant: "text"
      }
    }), ie(() => {
      var b;
      const f = !!(e.title || n.title), h = !!(n.image || e.image), y = (b = n.extension) == null ? void 0 : b.call(n);
      return u.value = !!(e.extended || y), g(e.tag, {
        class: ["v-toolbar", {
          "v-toolbar--absolute": e.absolute,
          "v-toolbar--collapse": e.collapse,
          "v-toolbar--flat": e.flat,
          "v-toolbar--floating": e.floating,
          [`v-toolbar--density-${e.density}`]: !0
        }, s.value, a.value, i.value, l.value, r.value, c.value, e.class],
        style: [o.value, e.style]
      }, {
        default: () => [h && g("div", {
          key: "image",
          class: "v-toolbar__image"
        }, [n.image ? g(Te, {
          key: "image-defaults",
          disabled: !e.image,
          defaults: {
            VImg: {
              cover: !0,
              src: e.image
            }
          }
        }, n.image) : g(tr, {
          key: "image-img",
          cover: !0,
          src: e.image
        }, null)]), g(Te, {
          defaults: {
            VTabs: {
              height: se(d.value)
            }
          }
        }, {
          default: () => {
            var C, A, w;
            return [g("div", {
              class: "v-toolbar__content",
              style: {
                height: se(d.value)
              }
            }, [n.prepend && g("div", {
              class: "v-toolbar__prepend"
            }, [(C = n.prepend) == null ? void 0 : C.call(n)]), f && g(mc, {
              key: "title",
              text: e.title
            }, {
              text: n.title
            }), (A = n.default) == null ? void 0 : A.call(n), n.append && g("div", {
              class: "v-toolbar__append"
            }, [(w = n.append) == null ? void 0 : w.call(n)])])];
          }
        }), g(Te, {
          defaults: {
            VTabs: {
              height: se(m.value)
            }
          }
        }, {
          default: () => [g(Ql, null, {
            default: () => [u.value && g("div", {
              class: "v-toolbar__extension",
              style: {
                height: se(m.value)
              }
            }, [y])]
          })]
        })]
      });
    }), {
      contentHeight: d,
      extensionHeight: m
    };
  }
}), tm = F({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function nm(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll: n
  } = t;
  let s = 0, o = 0;
  const a = J(null), i = ee(0), l = ee(0), r = ee(0), c = ee(!1), u = ee(!1), d = S(() => Number(e.scrollThreshold)), m = S(() => gs((d.value - i.value) / d.value || 0)), v = () => {
    const f = a.value;
    if (!f || n && !n.value) return;
    s = i.value, i.value = "window" in f ? f.pageYOffset : f.scrollTop;
    const h = f instanceof Window ? document.documentElement.scrollHeight : f.scrollHeight;
    if (o !== h) {
      o = h;
      return;
    }
    u.value = i.value < s, r.value = Math.abs(i.value - d.value);
  };
  return ne(u, () => {
    l.value = l.value || i.value;
  }), ne(c, () => {
    l.value = 0;
  }), Ft(() => {
    ne(() => e.scrollTarget, (f) => {
      var y;
      const h = f ? document.querySelector(f) : window;
      if (!h) {
        xt(`Unable to locate element with identifier ${f}`);
        return;
      }
      h !== a.value && ((y = a.value) == null || y.removeEventListener("scroll", v), a.value = h, a.value.addEventListener("scroll", v, {
        passive: !0
      }));
    }, {
      immediate: !0
    });
  }), tt(() => {
    var f;
    (f = a.value) == null || f.removeEventListener("scroll", v);
  }), n && ne(n, v, {
    immediate: !0
  }), {
    scrollThreshold: d,
    currentScroll: i,
    currentThreshold: r,
    isScrollActive: c,
    scrollRatio: m,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp: u,
    savedScroll: l
  };
}
const sm = F({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  location: {
    type: String,
    default: "top",
    validator: (e) => ["top", "bottom"].includes(e)
  },
  ...hc(),
  ...Gv(),
  ...tm(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar"), om = te()({
  name: "VAppBar",
  props: sm(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const s = J(), o = it(e, "modelValue"), a = S(() => {
      var A;
      const C = new Set(((A = e.scrollBehavior) == null ? void 0 : A.split(" ")) ?? []);
      return {
        hide: C.has("hide"),
        fullyHide: C.has("fully-hide"),
        inverted: C.has("inverted"),
        collapse: C.has("collapse"),
        elevate: C.has("elevate"),
        fadeImage: C.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    }), i = S(() => {
      const C = a.value;
      return C.hide || C.fullyHide || C.inverted || C.collapse || C.elevate || C.fadeImage || // behavior.shrink ||
      !o.value;
    }), {
      currentScroll: l,
      scrollThreshold: r,
      isScrollingUp: c,
      scrollRatio: u
    } = nm(e, {
      canScroll: i
    }), d = S(() => a.value.hide || a.value.fullyHide), m = S(() => e.collapse || a.value.collapse && (a.value.inverted ? u.value > 0 : u.value === 0)), v = S(() => e.flat || a.value.fullyHide && !o.value || a.value.elevate && (a.value.inverted ? l.value > 0 : l.value === 0)), f = S(() => a.value.fadeImage ? a.value.inverted ? 1 - u.value : u.value : void 0), h = S(() => {
      var w, P;
      if (a.value.hide && a.value.inverted) return 0;
      const C = ((w = s.value) == null ? void 0 : w.contentHeight) ?? 0, A = ((P = s.value) == null ? void 0 : P.extensionHeight) ?? 0;
      return d.value ? l.value < r.value || a.value.fullyHide ? C + A : C : C + A;
    });
    jn(S(() => !!e.scrollBehavior), () => {
      Wt(() => {
        d.value ? a.value.inverted ? o.value = l.value > r.value : o.value = c.value || l.value < r.value : o.value = !0;
      });
    });
    const {
      ssrBootStyles: y
    } = qs(), {
      layoutItemStyles: b
    } = Xv({
      id: e.name,
      order: S(() => parseInt(e.order, 10)),
      position: Q(e, "location"),
      layoutSize: h,
      elementSize: ee(void 0),
      active: o,
      absolute: Q(e, "absolute")
    });
    return ie(() => {
      const C = Qi.filterProps(e);
      return g(Qi, ce({
        ref: s,
        class: ["v-app-bar", {
          "v-app-bar--bottom": e.location === "bottom"
        }, e.class],
        style: [{
          ...b.value,
          "--v-toolbar-image-opacity": f.value,
          height: void 0,
          ...y.value
        }, e.style]
      }, C, {
        collapse: m.value,
        flat: v.value
      }), n);
    }), {};
  }
}), am = F({
  ...da({
    icon: "$menu",
    variant: "text"
  })
}, "VAppBarNavIcon"), im = te()({
  name: "VAppBarNavIcon",
  props: am(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => g(Ze, ce(e, {
      class: ["v-app-bar-nav-icon"]
    }), n)), {};
  }
}), lm = te()({
  name: "VAppBarTitle",
  props: vc(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => g(mc, ce(e, {
      class: "v-app-bar-title"
    }), n)), {};
  }
}), jo = Symbol.for("vuetify:list");
function gc() {
  const e = be(jo, {
    hasPrepend: ee(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: ee(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return Be(jo, t), e;
}
function yc() {
  return be(jo, null);
}
const Va = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: s,
        value: o,
        activated: a
      } = n;
      return s = fe(s), e && !o && a.size === 1 && a.has(s) || (o ? a.add(s) : a.delete(s)), a;
    },
    in: (n, s, o) => {
      let a = /* @__PURE__ */ new Set();
      if (n != null)
        for (const i of ea(n))
          a = t.activate({
            id: i,
            value: !0,
            activated: new Set(a),
            children: s,
            parents: o
          });
      return a;
    },
    out: (n) => Array.from(n)
  };
  return t;
}, pc = (e) => {
  const t = Va(e);
  return {
    activate: (s) => {
      let {
        activated: o,
        id: a,
        ...i
      } = s;
      a = fe(a);
      const l = o.has(a) ? /* @__PURE__ */ new Set([a]) : /* @__PURE__ */ new Set();
      return t.activate({
        ...i,
        id: a,
        activated: l
      });
    },
    in: (s, o, a) => {
      let i = /* @__PURE__ */ new Set();
      if (s != null) {
        const l = ea(s);
        l.length && (i = t.in(l.slice(0, 1), o, a));
      }
      return i;
    },
    out: (s, o, a) => t.out(s, o, a)
  };
}, rm = (e) => {
  const t = Va(e);
  return {
    activate: (s) => {
      let {
        id: o,
        activated: a,
        children: i,
        ...l
      } = s;
      return o = fe(o), i.has(o) ? a : t.activate({
        id: o,
        activated: a,
        children: i,
        ...l
      });
    },
    in: t.in,
    out: t.out
  };
}, cm = (e) => {
  const t = pc(e);
  return {
    activate: (s) => {
      let {
        id: o,
        activated: a,
        children: i,
        ...l
      } = s;
      return o = fe(o), i.has(o) ? a : t.activate({
        id: o,
        activated: a,
        children: i,
        ...l
      });
    },
    in: t.in,
    out: t.out
  };
}, um = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: s,
      parents: o
    } = e;
    if (n) {
      const a = /* @__PURE__ */ new Set();
      a.add(t);
      let i = o.get(t);
      for (; i != null; )
        a.add(i), i = o.get(i);
      return a;
    } else
      return s.delete(t), s;
  },
  select: () => null
}, bc = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: s,
      parents: o
    } = e;
    if (n) {
      let a = fe(o.get(t));
      for (s.add(t); a != null && a !== t; )
        s.add(a), a = fe(o.get(a));
      return s;
    } else
      s.delete(t);
    return s;
  },
  select: () => null
}, dm = {
  open: bc.open,
  select: (e) => {
    let {
      id: t,
      value: n,
      opened: s,
      parents: o
    } = e;
    if (!n) return s;
    const a = [];
    let i = o.get(t);
    for (; i != null; )
      a.push(i), i = o.get(i);
    return new Set(a);
  }
}, $a = (e) => {
  const t = {
    select: (n) => {
      let {
        id: s,
        value: o,
        selected: a
      } = n;
      if (s = fe(s), e && !o) {
        const i = Array.from(a.entries()).reduce((l, r) => {
          let [c, u] = r;
          return u === "on" && l.push(c), l;
        }, []);
        if (i.length === 1 && i[0] === s) return a;
      }
      return a.set(s, o ? "on" : "off"), a;
    },
    in: (n, s, o) => {
      let a = /* @__PURE__ */ new Map();
      for (const i of n || [])
        a = t.select({
          id: i,
          value: !0,
          selected: new Map(a),
          children: s,
          parents: o
        });
      return a;
    },
    out: (n) => {
      const s = [];
      for (const [o, a] of n.entries())
        a === "on" && s.push(o);
      return s;
    }
  };
  return t;
}, Sc = (e) => {
  const t = $a(e);
  return {
    select: (s) => {
      let {
        selected: o,
        id: a,
        ...i
      } = s;
      a = fe(a);
      const l = o.has(a) ? /* @__PURE__ */ new Map([[a, o.get(a)]]) : /* @__PURE__ */ new Map();
      return t.select({
        ...i,
        id: a,
        selected: l
      });
    },
    in: (s, o, a) => {
      let i = /* @__PURE__ */ new Map();
      return s != null && s.length && (i = t.in(s.slice(0, 1), o, a)), i;
    },
    out: (s, o, a) => t.out(s, o, a)
  };
}, fm = (e) => {
  const t = $a(e);
  return {
    select: (s) => {
      let {
        id: o,
        selected: a,
        children: i,
        ...l
      } = s;
      return o = fe(o), i.has(o) ? a : t.select({
        id: o,
        selected: a,
        children: i,
        ...l
      });
    },
    in: t.in,
    out: t.out
  };
}, vm = (e) => {
  const t = Sc(e);
  return {
    select: (s) => {
      let {
        id: o,
        selected: a,
        children: i,
        ...l
      } = s;
      return o = fe(o), i.has(o) ? a : t.select({
        id: o,
        selected: a,
        children: i,
        ...l
      });
    },
    in: t.in,
    out: t.out
  };
}, mm = (e) => {
  const t = {
    select: (n) => {
      let {
        id: s,
        value: o,
        selected: a,
        children: i,
        parents: l
      } = n;
      s = fe(s);
      const r = new Map(a), c = [s];
      for (; c.length; ) {
        const d = c.shift();
        a.set(fe(d), o ? "on" : "off"), i.has(d) && c.push(...i.get(d));
      }
      let u = fe(l.get(s));
      for (; u; ) {
        const d = i.get(u), m = d.every((f) => a.get(fe(f)) === "on"), v = d.every((f) => !a.has(fe(f)) || a.get(fe(f)) === "off");
        a.set(u, m ? "on" : v ? "off" : "indeterminate"), u = fe(l.get(u));
      }
      return e && !o && Array.from(a.entries()).reduce((m, v) => {
        let [f, h] = v;
        return h === "on" && m.push(f), m;
      }, []).length === 0 ? r : a;
    },
    in: (n, s, o) => {
      let a = /* @__PURE__ */ new Map();
      for (const i of n || [])
        a = t.select({
          id: i,
          value: !0,
          selected: new Map(a),
          children: s,
          parents: o
        });
      return a;
    },
    out: (n, s) => {
      const o = [];
      for (const [a, i] of n.entries())
        i === "on" && !s.has(a) && o.push(a);
      return o;
    }
  };
  return t;
}, Bn = Symbol.for("vuetify:nested"), wc = {
  id: ee(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: J(/* @__PURE__ */ new Map()),
    children: J(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: J(!1),
    selectable: J(!1),
    opened: J(/* @__PURE__ */ new Set()),
    activated: J(/* @__PURE__ */ new Set()),
    selected: J(/* @__PURE__ */ new Map()),
    selectedValues: J([])
  }
}, hm = F({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean
}, "nested"), gm = (e) => {
  let t = !1;
  const n = J(/* @__PURE__ */ new Map()), s = J(/* @__PURE__ */ new Map()), o = it(e, "opened", e.opened, (v) => new Set(fe(v)), (v) => [...v.values()]), a = S(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    if (typeof e.activeStrategy == "function") return e.activeStrategy(e.mandatory);
    switch (e.activeStrategy) {
      case "leaf":
        return rm(e.mandatory);
      case "single-leaf":
        return cm(e.mandatory);
      case "independent":
        return Va(e.mandatory);
      case "single-independent":
      default:
        return pc(e.mandatory);
    }
  }), i = S(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    if (typeof e.selectStrategy == "function") return e.selectStrategy(e.mandatory);
    switch (e.selectStrategy) {
      case "single-leaf":
        return vm(e.mandatory);
      case "leaf":
        return fm(e.mandatory);
      case "independent":
        return $a(e.mandatory);
      case "single-independent":
        return Sc(e.mandatory);
      case "classic":
      default:
        return mm(e.mandatory);
    }
  }), l = S(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return dm;
      case "single":
        return um;
      case "multiple":
      default:
        return bc;
    }
  }), r = it(e, "activated", e.activated, (v) => a.value.in(v, n.value, s.value), (v) => a.value.out(v, n.value, s.value)), c = it(e, "selected", e.selected, (v) => i.value.in(v, n.value, s.value), (v) => i.value.out(v, n.value, s.value));
  tt(() => {
    t = !0;
  });
  function u(v) {
    const f = [];
    let h = v;
    for (; h != null; )
      f.unshift(h), h = s.value.get(h);
    return f;
  }
  const d = ke("nested"), m = {
    id: ee(),
    root: {
      opened: o,
      activatable: Q(e, "activatable"),
      selectable: Q(e, "selectable"),
      activated: r,
      selected: c,
      selectedValues: S(() => {
        const v = [];
        for (const [f, h] of c.value.entries())
          h === "on" && v.push(f);
        return v;
      }),
      register: (v, f, h) => {
        f && v !== f && s.value.set(v, f), h && n.value.set(v, []), f != null && n.value.set(f, [...n.value.get(f) || [], v]);
      },
      unregister: (v) => {
        if (t) return;
        n.value.delete(v);
        const f = s.value.get(v);
        if (f) {
          const h = n.value.get(f) ?? [];
          n.value.set(f, h.filter((y) => y !== v));
        }
        s.value.delete(v);
      },
      open: (v, f, h) => {
        d.emit("click:open", {
          id: v,
          value: f,
          path: u(v),
          event: h
        });
        const y = l.value.open({
          id: v,
          value: f,
          opened: new Set(o.value),
          children: n.value,
          parents: s.value,
          event: h
        });
        y && (o.value = y);
      },
      openOnSelect: (v, f, h) => {
        const y = l.value.select({
          id: v,
          value: f,
          selected: new Map(c.value),
          opened: new Set(o.value),
          children: n.value,
          parents: s.value,
          event: h
        });
        y && (o.value = y);
      },
      select: (v, f, h) => {
        d.emit("click:select", {
          id: v,
          value: f,
          path: u(v),
          event: h
        });
        const y = i.value.select({
          id: v,
          value: f,
          selected: new Map(c.value),
          children: n.value,
          parents: s.value,
          event: h
        });
        y && (c.value = y), m.root.openOnSelect(v, f, h);
      },
      activate: (v, f, h) => {
        if (!e.activatable)
          return m.root.select(v, !0, h);
        d.emit("click:activate", {
          id: v,
          value: f,
          path: u(v),
          event: h
        });
        const y = a.value.activate({
          id: v,
          value: f,
          activated: new Set(r.value),
          children: n.value,
          parents: s.value,
          event: h
        });
        y && (r.value = y);
      },
      children: n,
      parents: s
    }
  };
  return Be(Bn, m), m.root;
}, xc = (e, t) => {
  const n = be(Bn, wc), s = Symbol(Hn()), o = S(() => e.value !== void 0 ? e.value : s), a = {
    ...n,
    id: o,
    open: (i, l) => n.root.open(fe(o.value), i, l),
    openOnSelect: (i, l) => n.root.openOnSelect(o.value, i, l),
    isOpen: S(() => n.root.opened.value.has(fe(o.value))),
    parent: S(() => n.root.parents.value.get(o.value)),
    activate: (i, l) => n.root.activate(o.value, i, l),
    isActivated: S(() => n.root.activated.value.has(fe(o.value))),
    select: (i, l) => n.root.select(o.value, i, l),
    isSelected: S(() => n.root.selected.value.get(fe(o.value)) === "on"),
    isIndeterminate: S(() => n.root.selected.value.get(o.value) === "indeterminate"),
    isLeaf: S(() => !n.root.children.value.get(o.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(o.value, n.id.value, t), tt(() => {
    !n.isGroupActivator && n.root.unregister(o.value);
  }), t && Be(Bn, a), a;
}, ym = () => {
  const e = be(Bn, wc);
  Be(Bn, {
    ...e,
    isGroupActivator: !0
  });
}, pm = Fn({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ym(), () => {
      var s;
      return (s = n.default) == null ? void 0 : s.call(n);
    };
  }
}), bm = F({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: Oe,
    default: "$collapse"
  },
  expandIcon: {
    type: Oe,
    default: "$expand"
  },
  prependIcon: Oe,
  appendIcon: Oe,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...ue(),
  ...xe()
}, "VListGroup"), Zi = te()({
  name: "VListGroup",
  props: bm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: s,
      open: o,
      id: a
    } = xc(Q(e, "value"), !0), i = S(() => `v-list-group--id-${String(a.value)}`), l = yc(), {
      isBooted: r
    } = qs();
    function c(v) {
      v.stopPropagation(), o(!s.value, v);
    }
    const u = S(() => ({
      onClick: c,
      class: "v-list-group__header",
      id: i.value
    })), d = S(() => s.value ? e.collapseIcon : e.expandIcon), m = S(() => ({
      VListItem: {
        active: s.value,
        activeColor: e.activeColor,
        baseColor: e.baseColor,
        color: e.color,
        prependIcon: e.prependIcon || e.subgroup && d.value,
        appendIcon: e.appendIcon || !e.subgroup && d.value,
        title: e.title,
        value: e.value
      }
    }));
    return ie(() => g(e.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": l == null ? void 0 : l.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": s.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && g(Te, {
        defaults: m.value
      }, {
        default: () => [g(pm, null, {
          default: () => [n.activator({
            props: u.value,
            isOpen: s.value
          })]
        })]
      }), g($t, {
        transition: {
          component: Ql
        },
        disabled: !r.value
      }, {
        default: () => {
          var v;
          return [ct(g("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": i.value
          }, [(v = n.default) == null ? void 0 : v.call(n)]), [[un, s.value]])];
        }
      })]
    })), {
      isOpen: s
    };
  }
}), Sm = F({
  opacity: [Number, String],
  ...ue(),
  ...xe()
}, "VListItemSubtitle"), wm = te()({
  name: "VListItemSubtitle",
  props: Sm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => g(e.tag, {
      class: ["v-list-item-subtitle", e.class],
      style: [{
        "--v-list-item-subtitle-opacity": e.opacity
      }, e.style]
    }, n)), {};
  }
}), vs = rd("v-list-item-title"), xm = F({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: Oe,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: Oe,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,
  onClick: Rt(),
  onClickOnce: Rt(),
  ...jt(),
  ...ue(),
  ...qt(),
  ...mn(),
  ...fn(),
  ...Pt(),
  ...ca(),
  ...xe(),
  ...Me(),
  ...Yt({
    variant: "text"
  })
}, "VListItem"), Pn = te()({
  name: "VListItem",
  directives: {
    Ripple: ua
  },
  props: xm(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: s,
      emit: o
    } = t;
    const a = ra(e, n), i = S(() => e.value === void 0 ? a.href.value : e.value), {
      activate: l,
      isActivated: r,
      select: c,
      isOpen: u,
      isSelected: d,
      isIndeterminate: m,
      isGroupActivator: v,
      root: f,
      parent: h,
      openOnSelect: y
    } = xc(i, !1), b = yc(), C = S(() => {
      var x;
      return e.active !== !1 && (e.active || ((x = a.isActive) == null ? void 0 : x.value) || (f.activatable.value ? r.value : d.value));
    }), A = S(() => e.link !== !1 && a.isLink.value), w = S(() => !e.disabled && e.link !== !1 && (e.link || a.isClickable.value || !!b && (f.selectable.value || f.activatable.value || e.value != null))), P = S(() => e.rounded || e.nav), O = S(() => e.color ?? e.activeColor), T = S(() => ({
      color: C.value ? O.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    ne(() => {
      var x;
      return (x = a.isActive) == null ? void 0 : x.value;
    }, (x) => {
      x && h.value != null && f.open(h.value, !0), x && y(x);
    }, {
      immediate: !0
    });
    const {
      themeClasses: _
    } = Re(e), {
      borderClasses: L
    } = Ut(e), {
      colorClasses: I,
      colorStyles: k,
      variantClasses: p
    } = Fs(T), {
      densityClasses: E
    } = Gt(e), {
      dimensionStyles: z
    } = hn(e), {
      elevationClasses: W
    } = vn(e), {
      roundedClasses: U
    } = At(P), K = S(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), G = S(() => ({
      isActive: C.value,
      select: c,
      isOpen: u.value,
      isSelected: d.value,
      isIndeterminate: m.value
    }));
    function Y(x) {
      var V;
      o("click", x), w.value && ((V = a.navigate) == null || V.call(a, x), !v && (f.activatable.value ? l(!r.value, x) : (f.selectable.value || e.value != null) && c(!d.value, x)));
    }
    function R(x) {
      (x.key === "Enter" || x.key === " ") && (x.preventDefault(), x.target.dispatchEvent(new MouseEvent("click", x)));
    }
    return ie(() => {
      const x = A.value ? "a" : e.tag, V = s.title || e.title != null, M = s.subtitle || e.subtitle != null, H = !!(e.appendAvatar || e.appendIcon), $ = !!(H || s.append), B = !!(e.prependAvatar || e.prependIcon), N = !!(B || s.prepend);
      return b == null || b.updateHasPrepend(N), e.activeColor && Ju("active-color", ["color", "base-color"]), ct(g(x, {
        class: ["v-list-item", {
          "v-list-item--active": C.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": w.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !N && (b == null ? void 0 : b.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && C.value
        }, _.value, L.value, I.value, E.value, W.value, K.value, U.value, p.value, e.class],
        style: [k.value, z.value, e.style],
        href: a.href.value,
        tabindex: w.value ? b ? -2 : 0 : void 0,
        onClick: Y,
        onKeydown: w.value && !A.value && R
      }, {
        default: () => {
          var D;
          return [Hs(w.value || C.value, "v-list-item"), N && g("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [s.prepend ? g(Te, {
            key: "prepend-defaults",
            disabled: !B,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.prependAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.prependIcon
              },
              VListItemAction: {
                start: !0
              }
            }
          }, {
            default: () => {
              var q;
              return [(q = s.prepend) == null ? void 0 : q.call(s, G.value)];
            }
          }) : g(Ye, null, [e.prependAvatar && g(ks, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && g(Ie, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), g("div", {
            class: "v-list-item__spacer"
          }, null)]), g("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [V && g(vs, {
            key: "title"
          }, {
            default: () => {
              var q;
              return [((q = s.title) == null ? void 0 : q.call(s, {
                title: e.title
              })) ?? e.title];
            }
          }), M && g(wm, {
            key: "subtitle"
          }, {
            default: () => {
              var q;
              return [((q = s.subtitle) == null ? void 0 : q.call(s, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (D = s.default) == null ? void 0 : D.call(s, G.value)]), $ && g("div", {
            key: "append",
            class: "v-list-item__append"
          }, [s.append ? g(Te, {
            key: "append-defaults",
            disabled: !H,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.appendAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.appendIcon
              },
              VListItemAction: {
                end: !0
              }
            }
          }, {
            default: () => {
              var q;
              return [(q = s.append) == null ? void 0 : q.call(s, G.value)];
            }
          }) : g(Ye, null, [e.appendIcon && g(Ie, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && g(ks, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), g("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[Nn("ripple"), w.value && e.ripple]]);
    }), {
      activate: l,
      isActivated: r,
      isGroupActivator: v,
      isSelected: d,
      list: b,
      select: c
    };
  }
}), Cm = F({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...ue(),
  ...xe()
}, "VListSubheader"), _m = te()({
  name: "VListSubheader",
  props: Cm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: s,
      textColorStyles: o
    } = on(Q(e, "color"));
    return ie(() => {
      const a = !!(n.default || e.title);
      return g(e.tag, {
        class: ["v-list-subheader", {
          "v-list-subheader--inset": e.inset,
          "v-list-subheader--sticky": e.sticky
        }, s.value, e.class],
        style: [{
          textColorStyles: o
        }, e.style]
      }, {
        default: () => {
          var i;
          return [a && g("div", {
            class: "v-list-subheader__text"
          }, [((i = n.default) == null ? void 0 : i.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
}), km = F({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...ue(),
  ...Me()
}, "VDivider"), Em = te()({
  name: "VDivider",
  props: km(),
  setup(e, t) {
    let {
      attrs: n,
      slots: s
    } = t;
    const {
      themeClasses: o
    } = Re(e), {
      textColorClasses: a,
      textColorStyles: i
    } = on(Q(e, "color")), l = S(() => {
      const r = {};
      return e.length && (r[e.vertical ? "height" : "width"] = se(e.length)), e.thickness && (r[e.vertical ? "borderRightWidth" : "borderTopWidth"] = se(e.thickness)), r;
    });
    return ie(() => {
      const r = g("hr", {
        class: [{
          "v-divider": !0,
          "v-divider--inset": e.inset,
          "v-divider--vertical": e.vertical
        }, o.value, a.value, e.class],
        style: [l.value, i.value, {
          "--v-border-opacity": e.opacity
        }, e.style],
        "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
        role: `${n.role || "separator"}`
      }, null);
      return s.default ? g("div", {
        class: ["v-divider__wrapper", {
          "v-divider__wrapper--vertical": e.vertical,
          "v-divider__wrapper--inset": e.inset
        }]
      }, [r, g("div", {
        class: "v-divider__content"
      }, [s.default()]), r]) : r;
    }), {};
  }
}), Pm = F({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), Cc = te()({
  name: "VListChildren",
  props: Pm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return gc(), () => {
      var s, o;
      return ((s = n.default) == null ? void 0 : s.call(n)) ?? ((o = e.items) == null ? void 0 : o.map((a) => {
        var m, v;
        let {
          children: i,
          props: l,
          type: r,
          raw: c
        } = a;
        if (r === "divider")
          return ((m = n.divider) == null ? void 0 : m.call(n, {
            props: l
          })) ?? g(Em, l, null);
        if (r === "subheader")
          return ((v = n.subheader) == null ? void 0 : v.call(n, {
            props: l
          })) ?? g(_m, l, null);
        const u = {
          subtitle: n.subtitle ? (f) => {
            var h;
            return (h = n.subtitle) == null ? void 0 : h.call(n, {
              ...f,
              item: c
            });
          } : void 0,
          prepend: n.prepend ? (f) => {
            var h;
            return (h = n.prepend) == null ? void 0 : h.call(n, {
              ...f,
              item: c
            });
          } : void 0,
          append: n.append ? (f) => {
            var h;
            return (h = n.append) == null ? void 0 : h.call(n, {
              ...f,
              item: c
            });
          } : void 0,
          title: n.title ? (f) => {
            var h;
            return (h = n.title) == null ? void 0 : h.call(n, {
              ...f,
              item: c
            });
          } : void 0
        }, d = Zi.filterProps(l);
        return i ? g(Zi, ce({
          value: l == null ? void 0 : l.value
        }, d), {
          activator: (f) => {
            let {
              props: h
            } = f;
            const y = {
              ...l,
              ...h,
              value: e.returnObject ? c : l.value
            };
            return n.header ? n.header({
              props: y
            }) : g(Pn, y, u);
          },
          default: () => g(Cc, {
            items: i,
            returnObject: e.returnObject
          }, n)
        }) : n.item ? n.item({
          props: l
        }) : g(Pn, ce(l, {
          value: e.returnObject ? c : l.value
        }), u);
      }));
    };
  }
}), Am = F({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  returnObject: Boolean,
  valueComparator: {
    type: Function,
    default: Dn
  }
}, "list-items");
function Om(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function Tm(e, t) {
  const n = Cn(t, e.itemType, "item"), s = Om(t) ? t : Cn(t, e.itemTitle), o = Cn(t, e.itemValue, void 0), a = Cn(t, e.itemChildren), i = e.itemProps === !0 ? Ds(t, ["children"]) : Cn(t, e.itemProps), l = {
    title: s,
    value: o,
    ...i
  };
  return {
    type: n,
    title: l.title,
    value: l.value,
    props: l,
    children: n === "item" && a ? _c(e, a) : void 0,
    raw: t
  };
}
function _c(e, t) {
  const n = [];
  for (const s of t)
    n.push(Tm(e, s));
  return n;
}
function Im(e) {
  return {
    items: S(() => _c(e, e.items))
  };
}
const Vm = F({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  expandIcon: String,
  collapseIcon: String,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  nav: Boolean,
  "onClick:open": Rt(),
  "onClick:select": Rt(),
  "onUpdate:opened": Rt(),
  ...hm({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...jt(),
  ...ue(),
  ...qt(),
  ...mn(),
  ...fn(),
  itemType: {
    type: String,
    default: "type"
  },
  ...Am(),
  ...Pt(),
  ...xe(),
  ...Me(),
  ...Yt({
    variant: "text"
  })
}, "VList"), $m = te()({
  name: "VList",
  props: Vm(),
  emits: {
    "update:selected": (e) => !0,
    "update:activated": (e) => !0,
    "update:opened": (e) => !0,
    "click:open": (e) => !0,
    "click:activate": (e) => !0,
    "click:select": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      items: s
    } = Im(e), {
      themeClasses: o
    } = Re(e), {
      backgroundColorClasses: a,
      backgroundColorStyles: i
    } = Wn(Q(e, "bgColor")), {
      borderClasses: l
    } = Ut(e), {
      densityClasses: r
    } = Gt(e), {
      dimensionStyles: c
    } = hn(e), {
      elevationClasses: u
    } = vn(e), {
      roundedClasses: d
    } = At(e), {
      children: m,
      open: v,
      parents: f,
      select: h
    } = gm(e), y = S(() => e.lines ? `v-list--${e.lines}-line` : void 0), b = Q(e, "activeColor"), C = Q(e, "baseColor"), A = Q(e, "color");
    gc(), dn({
      VListGroup: {
        activeColor: b,
        baseColor: C,
        color: A,
        expandIcon: Q(e, "expandIcon"),
        collapseIcon: Q(e, "collapseIcon")
      },
      VListItem: {
        activeClass: Q(e, "activeClass"),
        activeColor: b,
        baseColor: C,
        color: A,
        density: Q(e, "density"),
        disabled: Q(e, "disabled"),
        lines: Q(e, "lines"),
        nav: Q(e, "nav"),
        slim: Q(e, "slim"),
        variant: Q(e, "variant")
      }
    });
    const w = ee(!1), P = J();
    function O(p) {
      w.value = !0;
    }
    function T(p) {
      w.value = !1;
    }
    function _(p) {
      var E;
      !w.value && !(p.relatedTarget && ((E = P.value) != null && E.contains(p.relatedTarget))) && k();
    }
    function L(p) {
      const E = p.target;
      if (!(!P.value || ["INPUT", "TEXTAREA"].includes(E.tagName))) {
        if (p.key === "ArrowDown")
          k("next");
        else if (p.key === "ArrowUp")
          k("prev");
        else if (p.key === "Home")
          k("first");
        else if (p.key === "End")
          k("last");
        else
          return;
        p.preventDefault();
      }
    }
    function I(p) {
      w.value = !0;
    }
    function k(p) {
      if (P.value)
        return En(P.value, p);
    }
    return ie(() => g(e.tag, {
      ref: P,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, o.value, a.value, l.value, r.value, u.value, y.value, d.value, e.class],
      style: [i.value, c.value, e.style],
      tabindex: e.disabled || w.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: O,
      onFocusout: T,
      onFocus: _,
      onKeydown: L,
      onMousedown: I
    }, {
      default: () => [g(Cc, {
        items: s.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: v,
      select: h,
      focus: k,
      children: m,
      parents: f
    };
  }
}), zm = F({
  scrollable: Boolean,
  ...ue(),
  ...mn(),
  ...xe({
    tag: "main"
  })
}, "VMain"), Lm = te()({
  name: "VMain",
  props: zm(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      dimensionStyles: s
    } = hn(e), {
      mainStyles: o
    } = Yv(), {
      ssrBootStyles: a
    } = qs();
    return ie(() => g(e.tag, {
      class: ["v-main", {
        "v-main--scrollable": e.scrollable
      }, e.class],
      style: [o.value, a.value, s.value, e.style]
    }, {
      default: () => {
        var i, l;
        return [e.scrollable ? g("div", {
          class: "v-main__scroller"
        }, [(i = n.default) == null ? void 0 : i.call(n)]) : (l = n.default) == null ? void 0 : l.call(n)];
      }
    })), {};
  }
});
function bo(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function Bm(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function Ji(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: s
    } = e, o = s === "left" ? 0 : s === "center" ? t.width / 2 : s === "right" ? t.width : s, a = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return bo({
      x: o,
      y: a
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: s
    } = e, o = n === "left" ? 0 : n === "right" ? t.width : n, a = s === "top" ? 0 : s === "center" ? t.height / 2 : s === "bottom" ? t.height : s;
    return bo({
      x: o,
      y: a
    }, t);
  }
  return bo({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const kc = {
  static: Nm,
  // specific viewport position, usually centered
  connected: Hm
  // connected to a certain element
}, Mm = F({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in kc
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "VOverlay-location-strategies");
function Rm(e, t) {
  const n = J({}), s = J();
  Le && jn(() => !!(t.isActive.value && e.locationStrategy), (a) => {
    var i, l;
    ne(() => e.locationStrategy, a), Ke(() => {
      window.removeEventListener("resize", o), s.value = void 0;
    }), window.addEventListener("resize", o, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? s.value = (i = e.locationStrategy(t, e, n)) == null ? void 0 : i.updateLocation : s.value = (l = kc[e.locationStrategy](t, e, n)) == null ? void 0 : l.updateLocation;
  });
  function o(a) {
    var i;
    (i = s.value) == null || i.call(s, a);
  }
  return {
    contentStyles: n,
    updateLocation: s
  };
}
function Nm() {
}
function Dm(e, t) {
  const n = Vl(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function Hm(e, t, n) {
  (Array.isArray(e.target.value) || vd(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: o,
    preferredOrigin: a
  } = ta(() => {
    const f = _o(t.location, e.isRtl.value), h = t.origin === "overlap" ? f : t.origin === "auto" ? co(f) : _o(t.origin, e.isRtl.value);
    return f.side === h.side && f.align === uo(h).align ? {
      preferredAnchor: ti(f),
      preferredOrigin: ti(h)
    } : {
      preferredAnchor: f,
      preferredOrigin: h
    };
  }), [i, l, r, c] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((f) => S(() => {
    const h = parseFloat(t[f]);
    return isNaN(h) ? 1 / 0 : h;
  })), u = S(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const f = t.offset.split(" ").map(parseFloat);
      return f.length < 2 && f.push(0), f;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let d = !1;
  const m = new ResizeObserver(() => {
    d && v();
  });
  ne([e.target, e.contentEl], (f, h) => {
    let [y, b] = f, [C, A] = h;
    C && !Array.isArray(C) && m.unobserve(C), y && !Array.isArray(y) && m.observe(y), A && m.unobserve(A), b && m.observe(b);
  }, {
    immediate: !0
  }), Ke(() => {
    m.disconnect();
  });
  function v() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    const f = Il(e.target.value), h = Dm(e.contentEl.value, e.isRtl.value), y = ws(e.contentEl.value), b = 12;
    y.length || (y.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (h.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), h.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const C = y.reduce((k, p) => {
      const E = p.getBoundingClientRect(), z = new Nt({
        x: p === document.documentElement ? 0 : E.x,
        y: p === document.documentElement ? 0 : E.y,
        width: p.clientWidth,
        height: p.clientHeight
      });
      return k ? new Nt({
        x: Math.max(k.left, z.left),
        y: Math.max(k.top, z.top),
        width: Math.min(k.right, z.right) - Math.max(k.left, z.left),
        height: Math.min(k.bottom, z.bottom) - Math.max(k.top, z.top)
      }) : z;
    }, void 0);
    C.x += b, C.y += b, C.width -= b * 2, C.height -= b * 2;
    let A = {
      anchor: o.value,
      origin: a.value
    };
    function w(k) {
      const p = new Nt(h), E = Ji(k.anchor, f), z = Ji(k.origin, p);
      let {
        x: W,
        y: U
      } = Bm(E, z);
      switch (k.anchor.side) {
        case "top":
          U -= u.value[0];
          break;
        case "bottom":
          U += u.value[0];
          break;
        case "left":
          W -= u.value[0];
          break;
        case "right":
          W += u.value[0];
          break;
      }
      switch (k.anchor.align) {
        case "top":
          U -= u.value[1];
          break;
        case "bottom":
          U += u.value[1];
          break;
        case "left":
          W -= u.value[1];
          break;
        case "right":
          W += u.value[1];
          break;
      }
      return p.x += W, p.y += U, p.width = Math.min(p.width, r.value), p.height = Math.min(p.height, c.value), {
        overflows: si(p, C),
        x: W,
        y: U
      };
    }
    let P = 0, O = 0;
    const T = {
      x: 0,
      y: 0
    }, _ = {
      x: !1,
      y: !1
    };
    let L = -1;
    for (; ; ) {
      if (L++ > 10) {
        Zu("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: k,
        y: p,
        overflows: E
      } = w(A);
      P += k, O += p, h.x += k, h.y += p;
      {
        const z = ni(A.anchor), W = E.x.before || E.x.after, U = E.y.before || E.y.after;
        let K = !1;
        if (["x", "y"].forEach((G) => {
          if (G === "x" && W && !_.x || G === "y" && U && !_.y) {
            const Y = {
              anchor: {
                ...A.anchor
              },
              origin: {
                ...A.origin
              }
            }, R = G === "x" ? z === "y" ? uo : co : z === "y" ? co : uo;
            Y.anchor = R(Y.anchor), Y.origin = R(Y.origin);
            const {
              overflows: x
            } = w(Y);
            (x[G].before <= E[G].before && x[G].after <= E[G].after || x[G].before + x[G].after < (E[G].before + E[G].after) / 2) && (A = Y, K = _[G] = !0);
          }
        }), K) continue;
      }
      E.x.before && (P += E.x.before, h.x += E.x.before), E.x.after && (P -= E.x.after, h.x -= E.x.after), E.y.before && (O += E.y.before, h.y += E.y.before), E.y.after && (O -= E.y.after, h.y -= E.y.after);
      {
        const z = si(h, C);
        T.x = C.width - z.x.before - z.x.after, T.y = C.height - z.y.before - z.y.after, P += z.x.before, h.x += z.x.before, O += z.y.before, h.y += z.y.before;
      }
      break;
    }
    const I = ni(A.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${A.anchor.side} ${A.anchor.align}`,
      transformOrigin: `${A.origin.side} ${A.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: se(So(O)),
      left: e.isRtl.value ? void 0 : se(So(P)),
      right: e.isRtl.value ? se(So(-P)) : void 0,
      minWidth: se(I === "y" ? Math.min(i.value, f.width) : i.value),
      maxWidth: se(el(gs(T.x, i.value === 1 / 0 ? 0 : i.value, r.value))),
      maxHeight: se(el(gs(T.y, l.value === 1 / 0 ? 0 : l.value, c.value)))
    }), {
      available: T,
      contentBox: h
    };
  }
  return ne(() => [o.value, a.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => v()), et(() => {
    const f = v();
    if (!f) return;
    const {
      available: h,
      contentBox: y
    } = f;
    y.height > h.y && requestAnimationFrame(() => {
      v(), requestAnimationFrame(() => {
        v();
      });
    });
  }), {
    updateLocation: v
  };
}
function So(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function el(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Uo = !0;
const Ms = [];
function Fm(e) {
  !Uo || Ms.length ? (Ms.push(e), qo()) : (Uo = !1, e(), qo());
}
let tl = -1;
function qo() {
  cancelAnimationFrame(tl), tl = requestAnimationFrame(() => {
    const e = Ms.shift();
    e && e(), Ms.length ? qo() : Uo = !0;
  });
}
const ms = {
  none: null,
  close: Um,
  block: qm,
  reposition: Gm
}, Wm = F({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in ms
  }
}, "VOverlay-scroll-strategies");
function jm(e, t) {
  if (!Le) return;
  let n;
  Wt(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = Ko(), await new Promise((s) => setTimeout(s)), n.active && n.run(() => {
      var s;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (s = ms[e.scrollStrategy]) == null || s.call(ms, t, e, n);
    }));
  }), Ke(() => {
    n == null || n.stop();
  });
}
function Um(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Ec(e.targetEl.value ?? e.contentEl.value, t);
}
function qm(e, t) {
  var i;
  const n = (i = e.root.value) == null ? void 0 : i.offsetParent, s = [.../* @__PURE__ */ new Set([...ws(e.targetEl.value, t.contained ? n : void 0), ...ws(e.contentEl.value, t.contained ? n : void 0)])].filter((l) => !l.classList.contains("v-overlay-scroll-blocked")), o = window.innerWidth - document.documentElement.offsetWidth, a = ((l) => sa(l) && l)(n || document.documentElement);
  a && e.root.value.classList.add("v-overlay--scroll-blocked"), s.forEach((l, r) => {
    l.style.setProperty("--v-body-scroll-x", se(-l.scrollLeft)), l.style.setProperty("--v-body-scroll-y", se(-l.scrollTop)), l !== document.documentElement && l.style.setProperty("--v-scrollbar-offset", se(o)), l.classList.add("v-overlay-scroll-blocked");
  }), Ke(() => {
    s.forEach((l, r) => {
      const c = parseFloat(l.style.getPropertyValue("--v-body-scroll-x")), u = parseFloat(l.style.getPropertyValue("--v-body-scroll-y")), d = l.style.scrollBehavior;
      l.style.scrollBehavior = "auto", l.style.removeProperty("--v-body-scroll-x"), l.style.removeProperty("--v-body-scroll-y"), l.style.removeProperty("--v-scrollbar-offset"), l.classList.remove("v-overlay-scroll-blocked"), l.scrollLeft = -c, l.scrollTop = -u, l.style.scrollBehavior = d;
    }), a && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Gm(e, t, n) {
  let s = !1, o = -1, a = -1;
  function i(l) {
    Fm(() => {
      var u, d;
      const r = performance.now();
      (d = (u = e.updateLocation).value) == null || d.call(u, l), s = (performance.now() - r) / (1e3 / 60) > 2;
    });
  }
  a = (typeof requestIdleCallback > "u" ? (l) => l() : requestIdleCallback)(() => {
    n.run(() => {
      Ec(e.targetEl.value ?? e.contentEl.value, (l) => {
        s ? (cancelAnimationFrame(o), o = requestAnimationFrame(() => {
          o = requestAnimationFrame(() => {
            i(l);
          });
        })) : i(l);
      });
    });
  }), Ke(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(a), cancelAnimationFrame(o);
  });
}
function Ec(e, t) {
  const n = [document, ...ws(e)];
  n.forEach((s) => {
    s.addEventListener("scroll", t, {
      passive: !0
    });
  }), Ke(() => {
    n.forEach((s) => {
      s.removeEventListener("scroll", t);
    });
  });
}
const Go = Symbol.for("vuetify:v-menu"), Ym = F({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function Xm(e, t) {
  let n = () => {
  };
  function s(i) {
    n == null || n();
    const l = Number(i ? e.openDelay : e.closeDelay);
    return new Promise((r) => {
      n = Du(l, () => {
        t == null || t(i), r(i);
      });
    });
  }
  function o() {
    return s(!0);
  }
  function a() {
    return s(!1);
  }
  return {
    clearDelay: n,
    runOpenDelay: o,
    runCloseDelay: a
  };
}
const Km = F({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...Ym()
}, "VOverlay-activator");
function Qm(e, t) {
  let {
    isActive: n,
    isTop: s,
    contentEl: o
  } = t;
  const a = ke("useActivator"), i = J();
  let l = !1, r = !1, c = !0;
  const u = S(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = S(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !u.value), {
    runOpenDelay: m,
    runCloseDelay: v
  } = Xm(e, (_) => {
    _ === (e.openOnHover && l || u.value && r) && !(e.openOnHover && n.value && !s.value) && (n.value !== _ && (c = !0), n.value = _);
  }), f = J(), h = {
    onClick: (_) => {
      _.stopPropagation(), i.value = _.currentTarget || _.target, n.value || (f.value = [_.clientX, _.clientY]), n.value = !n.value;
    },
    onMouseenter: (_) => {
      var L;
      (L = _.sourceCapabilities) != null && L.firesTouchEvents || (l = !0, i.value = _.currentTarget || _.target, m());
    },
    onMouseleave: (_) => {
      l = !1, v();
    },
    onFocus: (_) => {
      Nu(_.target, ":focus-visible") !== !1 && (r = !0, _.stopPropagation(), i.value = _.currentTarget || _.target, m());
    },
    onBlur: (_) => {
      r = !1, _.stopPropagation(), v();
    }
  }, y = S(() => {
    const _ = {};
    return d.value && (_.onClick = h.onClick), e.openOnHover && (_.onMouseenter = h.onMouseenter, _.onMouseleave = h.onMouseleave), u.value && (_.onFocus = h.onFocus, _.onBlur = h.onBlur), _;
  }), b = S(() => {
    const _ = {};
    if (e.openOnHover && (_.onMouseenter = () => {
      l = !0, m();
    }, _.onMouseleave = () => {
      l = !1, v();
    }), u.value && (_.onFocusin = () => {
      r = !0, m();
    }, _.onFocusout = () => {
      r = !1, v();
    }), e.closeOnContentClick) {
      const L = be(Go, null);
      _.onClick = () => {
        n.value = !1, L == null || L.closeParents();
      };
    }
    return _;
  }), C = S(() => {
    const _ = {};
    return e.openOnHover && (_.onMouseenter = () => {
      c && (l = !0, c = !1, m());
    }, _.onMouseleave = () => {
      l = !1, v();
    }), _;
  });
  ne(s, (_) => {
    var L;
    _ && (e.openOnHover && !l && (!u.value || !r) || u.value && !r && (!e.openOnHover || !l)) && !((L = o.value) != null && L.contains(document.activeElement)) && (n.value = !1);
  }), ne(n, (_) => {
    _ || setTimeout(() => {
      f.value = void 0;
    });
  }, {
    flush: "post"
  });
  const A = Co();
  Wt(() => {
    A.value && et(() => {
      i.value = A.el;
    });
  });
  const w = Co(), P = S(() => e.target === "cursor" && f.value ? f.value : w.value ? w.el : Pc(e.target, a) || i.value), O = S(() => Array.isArray(P.value) ? void 0 : P.value);
  let T;
  return ne(() => !!e.activator, (_) => {
    _ && Le ? (T = Ko(), T.run(() => {
      Zm(e, a, {
        activatorEl: i,
        activatorEvents: y
      });
    })) : T && T.stop();
  }, {
    flush: "post",
    immediate: !0
  }), Ke(() => {
    T == null || T.stop();
  }), {
    activatorEl: i,
    activatorRef: A,
    target: P,
    targetEl: O,
    targetRef: w,
    activatorEvents: y,
    contentEvents: b,
    scrimEvents: C
  };
}
function Zm(e, t, n) {
  let {
    activatorEl: s,
    activatorEvents: o
  } = n;
  ne(() => e.activator, (r, c) => {
    if (c && r !== c) {
      const u = l(c);
      u && i(u);
    }
    r && et(() => a());
  }, {
    immediate: !0
  }), ne(() => e.activatorProps, () => {
    a();
  }), Ke(() => {
    i();
  });
  function a() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : l(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    r && Wu(r, ce(o.value, c));
  }
  function i() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : l(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    r && ju(r, ce(o.value, c));
  }
  function l() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const c = Pc(r, t);
    return s.value = (c == null ? void 0 : c.nodeType) === Node.ELEMENT_NODE ? c : void 0, s.value;
  }
}
function Pc(e, t) {
  var s, o;
  if (!e) return;
  let n;
  if (e === "parent") {
    let a = (o = (s = t == null ? void 0 : t.proxy) == null ? void 0 : s.$el) == null ? void 0 : o.parentNode;
    for (; a != null && a.hasAttribute("data-no-activator"); )
      a = a.parentNode;
    n = a;
  } else typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
function Jm() {
  if (!Le) return ee(!1);
  const {
    ssr: e
  } = nr();
  if (e) {
    const t = ee(!1);
    return Ft(() => {
      t.value = !0;
    }), t;
  } else
    return ee(!0);
}
const nl = Symbol.for("vuetify:stack"), _n = ht([]);
function eh(e, t, n) {
  const s = ke("useStack"), o = !n, a = be(nl, void 0), i = ht({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Be(nl, i);
  const l = ee(+t.value);
  jn(e, () => {
    var d;
    const u = (d = _n.at(-1)) == null ? void 0 : d[1];
    l.value = u ? u + 10 : +t.value, o && _n.push([s.uid, l.value]), a == null || a.activeChildren.add(s.uid), Ke(() => {
      if (o) {
        const m = fe(_n).findIndex((v) => v[0] === s.uid);
        _n.splice(m, 1);
      }
      a == null || a.activeChildren.delete(s.uid);
    });
  });
  const r = ee(!0);
  o && Wt(() => {
    var d;
    const u = ((d = _n.at(-1)) == null ? void 0 : d[0]) === s.uid;
    setTimeout(() => r.value = u);
  });
  const c = S(() => !i.activeChildren.size);
  return {
    globalTop: Qo(r),
    localTop: c,
    stackStyles: S(() => ({
      zIndex: l.value
    }))
  };
}
function th(e) {
  return {
    teleportTarget: S(() => {
      const n = e();
      if (n === !0 || !Le) return;
      const s = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (s == null) {
        Mn(`Unable to locate target ${n}`);
        return;
      }
      let o = [...s.children].find((a) => a.matches(".v-overlay-container"));
      return o || (o = document.createElement("div"), o.className = "v-overlay-container", s.appendChild(o)), o;
    })
  };
}
function nh() {
  return !0;
}
function Ac(e, t, n) {
  if (!e || Oc(e, n) === !1) return !1;
  const s = Ll(t);
  if (typeof ShadowRoot < "u" && s instanceof ShadowRoot && s.host === e.target) return !1;
  const o = (typeof n.value == "object" && n.value.include || (() => []))();
  return o.push(t), !o.some((a) => a == null ? void 0 : a.contains(e.target));
}
function Oc(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || nh)(e);
}
function sh(e, t, n) {
  const s = typeof n.value == "function" ? n.value : n.value.handler;
  e.shadowTarget = e.target, t._clickOutside.lastMousedownWasOutside && Ac(e, t, n) && setTimeout(() => {
    Oc(e, n) && s && s(e);
  }, 0);
}
function sl(e, t) {
  const n = Ll(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const oh = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (o) => sh(o, e, t), s = (o) => {
      e._clickOutside.lastMousedownWasOutside = Ac(o, e, t);
    };
    sl(e, (o) => {
      o.addEventListener("click", n, !0), o.addEventListener("mousedown", s, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: s
    };
  },
  beforeUnmount(e, t) {
    e._clickOutside && (sl(e, (n) => {
      var a;
      if (!n || !((a = e._clickOutside) != null && a[t.instance.$.uid])) return;
      const {
        onClick: s,
        onMousedown: o
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", s, !0), n.removeEventListener("mousedown", o, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function ah(e) {
  const {
    modelValue: t,
    color: n,
    ...s
  } = e;
  return g(_t, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && g("div", ce({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, s), null)]
  });
}
const Tc = F({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: !0
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: !0
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...Km(),
  ...ue(),
  ...mn(),
  ...dr(),
  ...Mm(),
  ...Wm(),
  ...Me(),
  ...Jl()
}, "VOverlay"), ol = te()({
  name: "VOverlay",
  directives: {
    ClickOutside: oh
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...Tc()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: n,
      attrs: s,
      emit: o
    } = t;
    const a = ke("VOverlay"), i = J(), l = J(), r = J(), c = it(e, "modelValue"), u = S({
      get: () => c.value,
      set: (B) => {
        B && e.disabled || (c.value = B);
      }
    }), {
      themeClasses: d
    } = Re(e), {
      rtlClasses: m,
      isRtl: v
    } = Ot(), {
      hasContent: f,
      onAfterLeave: h
    } = fr(e, u), y = Wn(S(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: b,
      localTop: C,
      stackStyles: A
    } = eh(u, Q(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: w,
      activatorRef: P,
      target: O,
      targetEl: T,
      targetRef: _,
      activatorEvents: L,
      contentEvents: I,
      scrimEvents: k
    } = Qm(e, {
      isActive: u,
      isTop: C,
      contentEl: r
    }), {
      teleportTarget: p
    } = th(() => {
      var D, q, le;
      const B = e.attach || e.contained;
      if (B) return B;
      const N = ((D = w == null ? void 0 : w.value) == null ? void 0 : D.getRootNode()) || ((le = (q = a.proxy) == null ? void 0 : q.$el) == null ? void 0 : le.getRootNode());
      return N instanceof ShadowRoot ? N : !1;
    }), {
      dimensionStyles: E
    } = hn(e), z = Jm(), {
      scopeId: W
    } = ha();
    ne(() => e.disabled, (B) => {
      B && (u.value = !1);
    });
    const {
      contentStyles: U,
      updateLocation: K
    } = Rm(e, {
      isRtl: v,
      contentEl: r,
      target: O,
      isActive: u
    });
    jm(e, {
      root: i,
      contentEl: r,
      targetEl: T,
      isActive: u,
      updateLocation: K
    });
    function G(B) {
      o("click:outside", B), e.persistent ? M() : u.value = !1;
    }
    function Y(B) {
      return u.value && b.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || B.target === l.value || B instanceof MouseEvent && B.shadowTarget === l.value);
    }
    Le && ne(u, (B) => {
      B ? window.addEventListener("keydown", R) : window.removeEventListener("keydown", R);
    }, {
      immediate: !0
    }), tt(() => {
      Le && window.removeEventListener("keydown", R);
    });
    function R(B) {
      var N, D;
      B.key === "Escape" && b.value && (e.persistent ? M() : (u.value = !1, (N = r.value) != null && N.contains(document.activeElement) && ((D = w.value) == null || D.focus())));
    }
    const x = Bd();
    jn(() => e.closeOnBack, () => {
      Md(x, (B) => {
        b.value && u.value ? (B(!1), e.persistent ? M() : u.value = !1) : B();
      });
    });
    const V = J();
    ne(() => u.value && (e.absolute || e.contained) && p.value == null, (B) => {
      if (B) {
        const N = dd(i.value);
        N && N !== document.scrollingElement && (V.value = N.scrollTop);
      }
    });
    function M() {
      e.noClickAnimation || r.value && Jt(r.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Ss
      });
    }
    function H() {
      o("afterEnter");
    }
    function $() {
      h(), o("afterLeave");
    }
    return ie(() => {
      var B;
      return g(Ye, null, [(B = n.activator) == null ? void 0 : B.call(n, {
        isActive: u.value,
        targetRef: _,
        props: ce({
          ref: P
        }, L.value, e.activatorProps)
      }), z.value && f.value && g(Jc, {
        disabled: !p.value,
        to: p.value
      }, {
        default: () => [g("div", ce({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": u.value,
            "v-overlay--contained": e.contained
          }, d.value, m.value, e.class],
          style: [A.value, {
            "--v-overlay-opacity": e.opacity,
            top: se(V.value)
          }, e.style],
          ref: i
        }, W, s), [g(ah, ce({
          color: y,
          modelValue: u.value && !!e.scrim,
          ref: l
        }, k.value), null), g($t, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: O.value,
          onAfterEnter: H,
          onAfterLeave: $
        }, {
          default: () => {
            var N;
            return [ct(g("div", ce({
              ref: r,
              class: ["v-overlay__content", e.contentClass],
              style: [E.value, U.value]
            }, I.value, e.contentProps), [(N = n.default) == null ? void 0 : N.call(n, {
              isActive: u
            })]), [[un, u.value], [Nn("click-outside"), {
              handler: G,
              closeConditional: Y,
              include: () => [w.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: w,
      scrimEl: l,
      target: O,
      animateClick: M,
      contentEl: r,
      globalTop: b,
      localTop: C,
      updateLocation: K
    };
  }
}), ih = F({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...Ds(Tc({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: qd
    }
  }), ["absolute"])
}, "VMenu"), lh = te()({
  name: "VMenu",
  props: ih(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const s = it(e, "modelValue"), {
      scopeId: o
    } = ha(), {
      isRtl: a
    } = Ot(), i = Hn(), l = S(() => e.id || `v-menu-${i}`), r = J(), c = be(Go, null), u = ee(/* @__PURE__ */ new Set());
    Be(Go, {
      register() {
        u.value.add(i);
      },
      unregister() {
        u.value.delete(i);
      },
      closeParents(y) {
        setTimeout(() => {
          var b;
          !u.value.size && !e.persistent && (y == null || (b = r.value) != null && b.contentEl && !Hu(y, r.value.contentEl)) && (s.value = !1, c == null || c.closeParents());
        }, 40);
      }
    }), tt(() => c == null ? void 0 : c.unregister()), cl(() => s.value = !1);
    async function d(y) {
      var A, w, P;
      const b = y.relatedTarget, C = y.target;
      await et(), s.value && b !== C && ((A = r.value) != null && A.contentEl) && // We're the topmost menu
      ((w = r.value) != null && w.globalTop) && // It isn't the document or the menu body
      ![document, r.value.contentEl].includes(C) && // It isn't inside the menu body
      !r.value.contentEl.contains(C) && ((P = ps(r.value.contentEl)[0]) == null || P.focus());
    }
    ne(s, (y) => {
      y ? (c == null || c.register(), document.addEventListener("focusin", d, {
        once: !0
      })) : (c == null || c.unregister(), document.removeEventListener("focusin", d));
    });
    function m(y) {
      c == null || c.closeParents(y);
    }
    function v(y) {
      var b, C, A, w, P;
      if (!e.disabled)
        if (y.key === "Tab" || y.key === "Enter" && !e.closeOnContentClick) {
          if (y.key === "Enter" && (y.target instanceof HTMLTextAreaElement || y.target instanceof HTMLInputElement && y.target.closest("form"))) return;
          y.key === "Enter" && y.preventDefault(), Ol(ps((b = r.value) == null ? void 0 : b.contentEl, !1), y.shiftKey ? "prev" : "next", (T) => T.tabIndex >= 0) || (s.value = !1, (A = (C = r.value) == null ? void 0 : C.activatorEl) == null || A.focus());
        } else e.submenu && y.key === (a.value ? "ArrowRight" : "ArrowLeft") && (s.value = !1, (P = (w = r.value) == null ? void 0 : w.activatorEl) == null || P.focus());
    }
    function f(y) {
      var C;
      if (e.disabled) return;
      const b = (C = r.value) == null ? void 0 : C.contentEl;
      b && s.value ? y.key === "ArrowDown" ? (y.preventDefault(), y.stopImmediatePropagation(), En(b, "next")) : y.key === "ArrowUp" ? (y.preventDefault(), y.stopImmediatePropagation(), En(b, "prev")) : e.submenu && (y.key === (a.value ? "ArrowRight" : "ArrowLeft") ? s.value = !1 : y.key === (a.value ? "ArrowLeft" : "ArrowRight") && (y.preventDefault(), En(b, "first"))) : (e.submenu ? y.key === (a.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(y.key)) && (s.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => f(y))));
    }
    const h = S(() => ce({
      "aria-haspopup": "menu",
      "aria-expanded": String(s.value),
      "aria-owns": l.value,
      onKeydown: f
    }, e.activatorProps));
    return ie(() => {
      const y = ol.filterProps(e);
      return g(ol, ce({
        ref: r,
        id: l.value,
        class: ["v-menu", e.class],
        style: e.style
      }, y, {
        modelValue: s.value,
        "onUpdate:modelValue": (b) => s.value = b,
        absolute: !0,
        activatorProps: h.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": m,
        onKeydown: v
      }, o), {
        activator: n.activator,
        default: function() {
          for (var b = arguments.length, C = new Array(b), A = 0; A < b; A++)
            C[A] = arguments[A];
          return g(Te, {
            root: "VMenu"
          }, {
            default: () => {
              var w;
              return [(w = n.default) == null ? void 0 : w.call(n, ...C)];
            }
          });
        }
      });
    }), ir({
      id: l,
      ΨopenChildren: u
    }, r);
  }
}), rh = /* @__PURE__ */ Bt("img", {
  class: "w-full",
  src: du,
  alt: "logo"
}, null, -1), uh = /* @__PURE__ */ cn({
  __name: "Uni",
  props: {
    lossNo: {}
  },
  setup(e) {
    const t = wl("action", "vehicle");
    return (n, s) => (Qe(), Lt(Jv, { class: "h-full" }, {
      default: j(() => [
        (Qe(), Lt(om, { key: 0 }, {
          prepend: j(() => [
            g(im, null, {
              default: j(() => [
                rh
              ]),
              _: 1
            })
          ]),
          default: j(() => [
            g(lm, null, {
              default: j(() => [
                g(Ao, {
                  modelValue: ge(t),
                  "onUpdate:modelValue": s[0] || (s[0] = (o) => rt(t) ? t.value = o : null)
                }, {
                  default: j(() => [
                    g(qe, { value: "vehicle" }, {
                      default: j(() => [
                        ae(" 定型")
                      ]),
                      _: 1
                    }),
                    g(qe, { value: "graph" }, {
                      default: j(() => [
                        ae(" 图形点选")
                      ]),
                      _: 1
                    }),
                    g(qe, { value: "loss" }, {
                      default: j(() => [
                        ae("损失项 ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            g(xs, null, {
              default: j(() => [
                g(Ze, { density: "default" }, {
                  prepend: j(() => [
                    g(Ie, { icon: "mdi-school" })
                  ]),
                  default: j(() => [
                    ae(" 操作指引 ")
                  ]),
                  _: 1
                }),
                g(Ze, { density: "default" }, {
                  prepend: j(() => [
                    g(Ie, { icon: "mdi-help" })
                  ]),
                  default: j(() => [
                    ae(" 帮助 ")
                  ]),
                  _: 1
                }),
                g(lh, { position: "br" }, {
                  activator: j(({ props: o }) => [
                    g(Ze, eu(tu(o)), {
                      prepend: j(() => [
                        g(Ie, { icon: "mdi-cog" })
                      ]),
                      default: j(() => [
                        ae(" 设置 ")
                      ]),
                      _: 2
                    }, 1040)
                  ]),
                  default: j(() => [
                    g($m, null, {
                      default: j(() => [
                        g(Pn, null, {
                          default: j(() => [
                            g(vs, null, {
                              default: j(() => [
                                ae("list-item-title-1")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(Pn, null, {
                          default: j(() => [
                            g(vs, null, {
                              default: j(() => [
                                ae("list-item-title-2")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        g(Pn, null, {
                          default: j(() => [
                            g(vs, null, {
                              default: j(() => [
                                ae("list-item-title-3")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })),
        g(Lm, { style: { height: "calc(100% - 64px)" } }, {
          default: j(() => [
            g(Ps, {
              modelValue: ge(t),
              "onUpdate:modelValue": s[1] || (s[1] = (o) => rt(t) ? t.value = o : null),
              class: "h-full"
            }, {
              default: j(() => [
                g(Ge, { value: "vehicle" }, {
                  default: j(() => [
                    g(pu)
                  ]),
                  _: 1
                }),
                g(Ge, {
                  value: "graph",
                  class: "h-full"
                }, {
                  default: j(() => [
                    g(Uv)
                  ]),
                  _: 1
                }),
                g(Ge, {
                  value: "loss",
                  class: "h-full"
                }, {
                  default: j(() => [
                    g(Af)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
});
export {
  uh as JyUni
};
