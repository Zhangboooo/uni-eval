import { d as de, o as $t, c as De, a as V, b as ut, h as lo, r as tn, n as uo, w as Tt, e as _n, u as xt, f as ls, g as po, i as ho, j as us, k as re, l as jt, m as ds, p as fo, q as lt, s as Xt, t as H, v as ps, x as en, y as mo, z as vo, A as nn, B as yo, C as sn, D as bo, E as go, F as xo, G as _o, H as So, I as wo } from "./vue.runtime.esm-bundler-XCawJVyy.js";
const Sn = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, o] of e)
    n[s] = o;
  return n;
}, zo = {};
function Co(t, e) {
  return "定型";
}
const Po = /* @__PURE__ */ Sn(zo, [["render", Co]]), Oo = {};
function ko(t, e) {
  return "损失部位";
}
const $o = /* @__PURE__ */ Sn(Oo, [["render", ko]]), Mo = /* @__PURE__ */ de({
  __name: "VehicleView",
  setup(t) {
    return (e, n) => ($t(), De("div", null, [
      V(Po),
      ut(" ---- "),
      V($o)
    ]));
  }
}), Eo = {
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
      return this.panes.reduce((t, e) => (t[e.id] = e) && t, {});
    }
  },
  methods: {
    updatePaneComponents() {
      this.panes.forEach((t) => {
        t.update && t.update({
          [this.horizontal ? "height" : "width"]: `${this.indexedPanes[t.id].size}%`
        });
      });
    },
    bindEvents() {
      document.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), document.addEventListener("mouseup", this.onMouseUp), "ontouchstart" in window && (document.addEventListener("touchmove", this.onMouseMove, { passive: !1 }), document.addEventListener("touchend", this.onMouseUp));
    },
    unbindEvents() {
      document.removeEventListener("mousemove", this.onMouseMove, { passive: !1 }), document.removeEventListener("mouseup", this.onMouseUp), "ontouchstart" in window && (document.removeEventListener("touchmove", this.onMouseMove, { passive: !1 }), document.removeEventListener("touchend", this.onMouseUp));
    },
    onMouseDown(t, e) {
      this.bindEvents(), this.touch.mouseDown = !0, this.touch.activeSplitter = e;
    },
    onMouseMove(t) {
      this.touch.mouseDown && (t.preventDefault(), this.touch.dragging = !0, this.calculatePanesSize(this.getCurrentMouseDrag(t)), this.$emit("resize", this.panes.map((e) => ({ min: e.min, max: e.max, size: e.size }))));
    },
    onMouseUp() {
      this.touch.dragging && this.$emit("resized", this.panes.map((t) => ({ min: t.min, max: t.max, size: t.size }))), this.touch.mouseDown = !1, setTimeout(() => {
        this.touch.dragging = !1, this.unbindEvents();
      }, 100);
    },
    onSplitterClick(t, e) {
      "ontouchstart" in window && (t.preventDefault(), this.dblClickSplitter && (this.splitterTaps.splitter === e ? (clearTimeout(this.splitterTaps.timeoutId), this.splitterTaps.timeoutId = null, this.onSplitterDblClick(t, e), this.splitterTaps.splitter = null) : (this.splitterTaps.splitter = e, this.splitterTaps.timeoutId = setTimeout(() => {
        this.splitterTaps.splitter = null;
      }, 500)))), this.touch.dragging || this.$emit("splitter-click", this.panes[e]);
    },
    onSplitterDblClick(t, e) {
      let n = 0;
      this.panes = this.panes.map((s, o) => (s.size = o === e ? s.max : s.min, o !== e && (n += s.min), s)), this.panes[e].size -= n, this.$emit("pane-maximize", this.panes[e]), this.$emit("resized", this.panes.map((s) => ({ min: s.min, max: s.max, size: s.size })));
    },
    onPaneClick(t, e) {
      this.$emit("pane-click", this.indexedPanes[e]);
    },
    getCurrentMouseDrag(t) {
      const e = this.container.getBoundingClientRect(), { clientX: n, clientY: s } = "ontouchstart" in window && t.touches ? t.touches[0] : t;
      return {
        x: n - e.left,
        y: s - e.top
      };
    },
    getCurrentDragPercentage(t) {
      t = t[this.horizontal ? "y" : "x"];
      const e = this.container[this.horizontal ? "clientHeight" : "clientWidth"];
      return this.rtl && !this.horizontal && (t = e - t), t * 100 / e;
    },
    calculatePanesSize(t) {
      const e = this.touch.activeSplitter;
      let n = {
        prevPanesSize: this.sumPrevPanesSize(e),
        nextPanesSize: this.sumNextPanesSize(e),
        prevReachedMinPanes: 0,
        nextReachedMinPanes: 0
      };
      const s = 0 + (this.pushOtherPanes ? 0 : n.prevPanesSize), o = 100 - (this.pushOtherPanes ? 0 : n.nextPanesSize), c = Math.max(Math.min(this.getCurrentDragPercentage(t), o), s);
      let i = [e, e + 1], a = this.panes[i[0]] || null, r = this.panes[i[1]] || null;
      const d = a.max < 100 && c >= a.max + n.prevPanesSize, l = r.max < 100 && c <= 100 - (r.max + this.sumNextPanesSize(e + 1));
      if (d || l) {
        d ? (a.size = a.max, r.size = Math.max(100 - a.max - n.prevPanesSize - n.nextPanesSize, 0)) : (a.size = Math.max(100 - r.max - n.prevPanesSize - this.sumNextPanesSize(e + 1), 0), r.size = r.max);
        return;
      }
      if (this.pushOtherPanes) {
        const u = this.doPushOtherPanes(n, c);
        if (!u)
          return;
        ({ sums: n, panesToResize: i } = u), a = this.panes[i[0]] || null, r = this.panes[i[1]] || null;
      }
      a !== null && (a.size = Math.min(Math.max(c - n.prevPanesSize - n.prevReachedMinPanes, a.min), a.max)), r !== null && (r.size = Math.min(Math.max(100 - c - n.nextPanesSize - n.nextReachedMinPanes, r.min), r.max));
    },
    doPushOtherPanes(t, e) {
      const n = this.touch.activeSplitter, s = [n, n + 1];
      return e < t.prevPanesSize + this.panes[s[0]].min && (s[0] = this.findPrevExpandedPane(n).index, t.prevReachedMinPanes = 0, s[0] < n && this.panes.forEach((o, c) => {
        c > s[0] && c <= n && (o.size = o.min, t.prevReachedMinPanes += o.min);
      }), t.prevPanesSize = this.sumPrevPanesSize(s[0]), s[0] === void 0) ? (t.prevReachedMinPanes = 0, this.panes[0].size = this.panes[0].min, this.panes.forEach((o, c) => {
        c > 0 && c <= n && (o.size = o.min, t.prevReachedMinPanes += o.min);
      }), this.panes[s[1]].size = 100 - t.prevReachedMinPanes - this.panes[0].min - t.prevPanesSize - t.nextPanesSize, null) : e > 100 - t.nextPanesSize - this.panes[s[1]].min && (s[1] = this.findNextExpandedPane(n).index, t.nextReachedMinPanes = 0, s[1] > n + 1 && this.panes.forEach((o, c) => {
        c > n && c < s[1] && (o.size = o.min, t.nextReachedMinPanes += o.min);
      }), t.nextPanesSize = this.sumNextPanesSize(s[1] - 1), s[1] === void 0) ? (t.nextReachedMinPanes = 0, this.panes[this.panesCount - 1].size = this.panes[this.panesCount - 1].min, this.panes.forEach((o, c) => {
        c < this.panesCount - 1 && c >= n + 1 && (o.size = o.min, t.nextReachedMinPanes += o.min);
      }), this.panes[s[0]].size = 100 - t.prevPanesSize - t.nextReachedMinPanes - this.panes[this.panesCount - 1].min - t.nextPanesSize, null) : { sums: t, panesToResize: s };
    },
    sumPrevPanesSize(t) {
      return this.panes.reduce((e, n, s) => e + (s < t ? n.size : 0), 0);
    },
    sumNextPanesSize(t) {
      return this.panes.reduce((e, n, s) => e + (s > t + 1 ? n.size : 0), 0);
    },
    findPrevExpandedPane(t) {
      return [...this.panes].reverse().find((e) => e.index < t && e.size > e.min) || {};
    },
    findNextExpandedPane(t) {
      return this.panes.find((e) => e.index > t + 1 && e.size > e.min) || {};
    },
    checkSplitpanesNodes() {
      Array.from(this.container.children).forEach((t) => {
        const e = t.classList.contains("splitpanes__pane"), n = t.classList.contains("splitpanes__splitter");
        !e && !n && (t.parentNode.removeChild(t), console.warn("Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed."));
      });
    },
    addSplitter(t, e, n = !1) {
      const s = t - 1, o = document.createElement("div");
      o.classList.add("splitpanes__splitter"), n || (o.onmousedown = (c) => this.onMouseDown(c, s), typeof window < "u" && "ontouchstart" in window && (o.ontouchstart = (c) => this.onMouseDown(c, s)), o.onclick = (c) => this.onSplitterClick(c, s + 1)), this.dblClickSplitter && (o.ondblclick = (c) => this.onSplitterDblClick(c, s + 1)), e.parentNode.insertBefore(o, e);
    },
    removeSplitter(t) {
      t.onmousedown = void 0, t.onclick = void 0, t.ondblclick = void 0, t.parentNode.removeChild(t);
    },
    redoSplitters() {
      const t = Array.from(this.container.children);
      t.forEach((n) => {
        n.className.includes("splitpanes__splitter") && this.removeSplitter(n);
      });
      let e = 0;
      t.forEach((n) => {
        n.className.includes("splitpanes__pane") && (!e && this.firstSplitter ? this.addSplitter(e, n, !0) : e && this.addSplitter(e, n), e++);
      });
    },
    requestUpdate({ target: t, ...e }) {
      const n = this.indexedPanes[t._.uid];
      Object.entries(e).forEach(([s, o]) => n[s] = o);
    },
    onPaneAdd(t) {
      let e = -1;
      Array.from(t.$el.parentNode.children).some((o) => (o.className.includes("splitpanes__pane") && e++, o === t.$el));
      const n = parseFloat(t.minSize), s = parseFloat(t.maxSize);
      this.panes.splice(e, 0, {
        id: t._.uid,
        index: e,
        min: isNaN(n) ? 0 : n,
        max: isNaN(s) ? 100 : s,
        size: t.size === null ? null : parseFloat(t.size),
        givenSize: t.size,
        update: t.update
      }), this.panes.forEach((o, c) => o.index = c), this.ready && this.$nextTick(() => {
        this.redoSplitters(), this.resetPaneSizes({ addedPane: this.panes[e] }), this.$emit("pane-add", { index: e, panes: this.panes.map((o) => ({ min: o.min, max: o.max, size: o.size })) });
      });
    },
    onPaneRemove(t) {
      const e = this.panes.findIndex((s) => s.id === t._.uid), n = this.panes.splice(e, 1)[0];
      this.panes.forEach((s, o) => s.index = o), this.$nextTick(() => {
        this.redoSplitters(), this.resetPaneSizes({ removedPane: { ...n, index: e } }), this.$emit("pane-remove", { removed: n, panes: this.panes.map((s) => ({ min: s.min, max: s.max, size: s.size })) });
      });
    },
    resetPaneSizes(t = {}) {
      !t.addedPane && !t.removedPane ? this.initialPanesSizing() : this.panes.some((e) => e.givenSize !== null || e.min || e.max < 100) ? this.equalizeAfterAddOrRemove(t) : this.equalize(), this.ready && this.$emit("resized", this.panes.map((e) => ({ min: e.min, max: e.max, size: e.size })));
    },
    equalize() {
      const t = 100 / this.panesCount;
      let e = 0;
      const n = [], s = [];
      this.panes.forEach((o) => {
        o.size = Math.max(Math.min(t, o.max), o.min), e -= o.size, o.size >= o.max && n.push(o.id), o.size <= o.min && s.push(o.id);
      }), e > 0.1 && this.readjustSizes(e, n, s);
    },
    initialPanesSizing() {
      let t = 100;
      const e = [], n = [];
      let s = 0;
      this.panes.forEach((c) => {
        t -= c.size, c.size !== null && s++, c.size >= c.max && e.push(c.id), c.size <= c.min && n.push(c.id);
      });
      let o = 100;
      t > 0.1 && (this.panes.forEach((c) => {
        c.size === null && (c.size = Math.max(Math.min(t / (this.panesCount - s), c.max), c.min)), o -= c.size;
      }), o > 0.1 && this.readjustSizes(t, e, n));
    },
    equalizeAfterAddOrRemove({ addedPane: t, removedPane: e } = {}) {
      let n = 100 / this.panesCount, s = 0;
      const o = [], c = [];
      t && t.givenSize !== null && (n = (100 - t.givenSize) / (this.panesCount - 1)), this.panes.forEach((i) => {
        s -= i.size, i.size >= i.max && o.push(i.id), i.size <= i.min && c.push(i.id);
      }), !(Math.abs(s) < 0.1) && (this.panes.forEach((i) => {
        t && t.givenSize !== null && t.id === i.id || (i.size = Math.max(Math.min(n, i.max), i.min)), s -= i.size, i.size >= i.max && o.push(i.id), i.size <= i.min && c.push(i.id);
      }), s > 0.1 && this.readjustSizes(s, o, c));
    },
    readjustSizes(t, e, n) {
      let s;
      t > 0 ? s = t / (this.panesCount - e.length) : s = t / (this.panesCount - n.length), this.panes.forEach((o, c) => {
        if (t > 0 && !e.includes(o.id)) {
          const i = Math.max(Math.min(o.size + s, o.max), o.min), a = i - o.size;
          t -= a, o.size = i;
        } else if (!n.includes(o.id)) {
          const i = Math.max(Math.min(o.size + s, o.max), o.min), a = i - o.size;
          t -= a, o.size = i;
        }
        o.update({
          [this.horizontal ? "height" : "width"]: `${this.indexedPanes[o.id].size}%`
        });
      }), Math.abs(t) > 0.1 && this.$nextTick(() => {
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
    dblClickSplitter(t) {
      [...this.container.querySelectorAll(".splitpanes__splitter")].forEach((e, n) => {
        e.ondblclick = t ? (s) => this.onSplitterDblClick(s, n) : void 0;
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
    return lo(
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
}, Ao = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, o] of e)
    n[s] = o;
  return n;
}, Ro = {
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
    update(t) {
      this.style = t;
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
    sizeNumber(t) {
      this.requestUpdate({ target: this, size: t });
    },
    minSizeNumber(t) {
      this.requestUpdate({ target: this, min: t });
    },
    maxSizeNumber(t) {
      this.requestUpdate({ target: this, max: t });
    }
  }
};
function No(t, e, n, s, o, c) {
  return $t(), De("div", {
    class: "splitpanes__pane",
    onClick: e[0] || (e[0] = (i) => c.onPaneClick(i, t._.uid)),
    style: uo(t.style)
  }, [
    tn(t.$slots, "default")
  ], 4);
}
const Vn = /* @__PURE__ */ Ao(Ro, [["render", No]]);
function hs(t) {
  return po() ? (ho(t), !0) : !1;
}
function on(t) {
  return typeof t == "function" ? t() : xt(t);
}
const To = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function Do(t) {
  return us();
}
function Io(t, e = !0, n) {
  Do() ? ls(t, n) : e ? t() : _n(t);
}
function Ho(t, e, n) {
  const s = Tt(t, (...o) => (_n(() => s()), e(...o)), n);
  return s;
}
function Kt(t) {
  var e;
  const n = on(t);
  return (e = n == null ? void 0 : n.$el) != null ? e : n;
}
const fs = To ? window : void 0;
function Lo() {
  const t = jt(!1), e = us();
  return e && ls(() => {
    t.value = !0;
  }, e), t;
}
function Vo(t) {
  const e = Lo();
  return re(() => (e.value, !!t()));
}
function Uo(t, e, n = {}) {
  const { window: s = fs, ...o } = n;
  let c;
  const i = Vo(() => s && "ResizeObserver" in s), a = () => {
    c && (c.disconnect(), c = void 0);
  }, r = re(() => Array.isArray(t) ? t.map((u) => Kt(u)) : [Kt(t)]), d = Tt(
    r,
    (u) => {
      if (a(), i.value && s) {
        c = new ResizeObserver(e);
        for (const f of u)
          f && c.observe(f, o);
      }
    },
    { immediate: !0, flush: "post" }
  ), l = () => {
    a(), d();
  };
  return hs(l), {
    isSupported: i,
    stop: l
  };
}
function Bo(t, e = { width: 0, height: 0 }, n = {}) {
  const { window: s = fs, box: o = "content-box" } = n, c = re(() => {
    var u, f;
    return (f = (u = Kt(t)) == null ? void 0 : u.namespaceURI) == null ? void 0 : f.includes("svg");
  }), i = jt(e.width), a = jt(e.height), { stop: r } = Uo(
    t,
    ([u]) => {
      const f = o === "border-box" ? u.borderBoxSize : o === "content-box" ? u.contentBoxSize : u.devicePixelContentBoxSize;
      if (s && c.value) {
        const v = Kt(t);
        if (v) {
          const p = v.getBoundingClientRect();
          i.value = p.width, a.value = p.height;
        }
      } else if (f) {
        const v = Array.isArray(f) ? f : [f];
        i.value = v.reduce((p, { inlineSize: m }) => p + m, 0), a.value = v.reduce((p, { blockSize: m }) => p + m, 0);
      } else
        i.value = u.contentRect.width, a.value = u.contentRect.height;
    },
    n
  );
  Io(() => {
    const u = Kt(t);
    u && (i.value = "offsetWidth" in u ? u.offsetWidth : e.width, a.value = "offsetHeight" in u ? u.offsetHeight : e.height);
  });
  const d = Tt(
    () => Kt(t),
    (u) => {
      i.value = u ? e.width : 0, a.value = u ? e.height : 0;
    }
  );
  function l() {
    r(), d();
  }
  return {
    width: i,
    height: a,
    stop: l
  };
}
/*!
  * vue-router v4.4.3
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
var Un;
(function(t) {
  t.pop = "pop", t.push = "push";
})(Un || (Un = {}));
var Bn;
(function(t) {
  t.back = "back", t.forward = "forward", t.unknown = "";
})(Bn || (Bn = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var jn;
(function(t) {
  t[t.aborted = 4] = "aborted", t[t.cancelled = 8] = "cancelled", t[t.duplicated = 16] = "duplicated";
})(jn || (jn = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const jo = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), qo = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function Fo() {
  return ds(jo);
}
function Wo(t) {
  return ds(qo);
}
const Xe = /* @__PURE__ */ new WeakMap();
function ms(t, e, n = {}) {
  const {
    mode: s = "replace",
    route: o = Wo(),
    router: c = Fo(),
    transform: i = (u) => u
  } = n;
  Xe.has(c) || Xe.set(c, /* @__PURE__ */ new Map());
  const a = Xe.get(c);
  let r = o.query[t];
  hs(() => {
    r = void 0;
  });
  let d;
  const l = fo((u, f) => (d = f, {
    get() {
      return u(), i(r !== void 0 ? r : on(e));
    },
    set(v) {
      r !== v && (r = v === e || v === null ? void 0 : v, a.set(t, v === e || v === null ? void 0 : v), f(), _n(() => {
        if (a.size === 0)
          return;
        const p = Object.fromEntries(a.entries());
        a.clear();
        const { params: m, query: P, hash: w } = o;
        c[on(s)]({
          params: m,
          query: { ...P, ...p },
          hash: w
        });
      }));
    }
  }));
  return Tt(
    () => o.query[t],
    (u) => {
      r = u, d();
    },
    { flush: "sync" }
  ), l;
}
const Ko = (t) => (mo("data-v-fd66bd13"), t = t(), vo(), t), Zo = /* @__PURE__ */ Ko(() => /* @__PURE__ */ nn("div", null, "已添加配件", -1)), Yo = /* @__PURE__ */ de({
  __name: "LossView",
  setup(t) {
    const e = jt(), { height: n } = Bo(e), s = re(() => Math.floor(5600 / n.value)), o = re(() => 50), c = jt(0);
    Ho(s, (r) => c.value = r);
    const i = ms("items", "part"), a = jt("part");
    return Tt(i, (r) => a.value = r), (r, d) => {
      const l = lt("a-tab-pane"), u = lt("a-tabs"), f = lt("icon-up"), v = lt("a-button"), p = lt("icon-down");
      return $t(), Xt(xt(Eo), {
        ref_key: "splitRef",
        ref: e,
        class: "default-theme",
        horizontal: ""
      }, {
        default: H(() => [
          V(xt(Vn), {
            size: 100 - c.value
          }, {
            default: H(() => [
              V(u, {
                class: "tabs",
                justify: "",
                animation: "",
                "active-key": xt(i),
                "onUpdate:activeKey": d[0] || (d[0] = (m) => ps(i) ? i.value = m : null)
              }, {
                extra: H(() => []),
                default: H(() => [
                  V(l, {
                    key: "part",
                    title: "配件"
                  }, {
                    default: H(() => [
                      ut(" Content of Tab Panel 1 ")
                    ]),
                    _: 1
                  }),
                  V(l, {
                    key: "hour",
                    title: "工时"
                  }, {
                    default: H(() => [
                      ut(" Content of Tab Panel 2 ")
                    ]),
                    _: 1
                  }),
                  V(l, {
                    key: "mate",
                    title: "辅料"
                  }, {
                    default: H(() => [
                      ut(" Content of Tab Panel 2 ")
                    ]),
                    _: 1
                  }),
                  V(l, {
                    key: "outer",
                    title: "外修"
                  }, {
                    default: H(() => [
                      ut(" Content of Tab Panel 2 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["active-key"])
            ]),
            _: 1
          }, 8, ["size"]),
          V(xt(Vn), {
            "min-size": s.value,
            "max-size": o.value,
            size: c.value,
            "onUpdate:size": d[4] || (d[4] = (m) => c.value = m)
          }, {
            default: H(() => [
              V(u, {
                class: "tabs",
                justify: "",
                animation: "",
                "active-key": a.value,
                "onUpdate:activeKey": d[3] || (d[3] = (m) => a.value = m)
              }, {
                extra: H(() => [
                  c.value === s.value ? ($t(), Xt(v, {
                    key: 0,
                    onClick: d[1] || (d[1] = (m) => c.value = o.value)
                  }, {
                    default: H(() => [
                      ut(" 展开 "),
                      V(f)
                    ]),
                    _: 1
                  })) : en("", !0),
                  c.value === o.value ? ($t(), Xt(v, {
                    key: 1,
                    onClick: d[2] || (d[2] = (m) => c.value = s.value)
                  }, {
                    default: H(() => [
                      ut(" 收起 "),
                      V(p)
                    ]),
                    _: 1
                  })) : en("", !0)
                ]),
                default: H(() => [
                  V(l, { disabled: "" }, {
                    title: H(() => [
                      Zo
                    ]),
                    _: 1
                  }),
                  V(l, {
                    key: "part",
                    title: "配件"
                  }, {
                    default: H(() => [
                      ut(" Content of Tab Panel 1 ")
                    ]),
                    _: 1
                  }),
                  V(l, {
                    key: "hour",
                    title: "工时"
                  }, {
                    default: H(() => [
                      ut(" Content of Tab Panel 2 ")
                    ]),
                    _: 1
                  }),
                  V(l, {
                    key: "mate",
                    title: "辅料"
                  }, {
                    default: H(() => [
                      ut(" Content of Tab Panel 2 ")
                    ]),
                    _: 1
                  }),
                  V(l, {
                    key: "outer",
                    title: "外修"
                  }, {
                    default: H(() => [
                      ut(" Content of Tab Panel 2 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["active-key"])
            ]),
            _: 1
          }, 8, ["min-size", "max-size", "size"])
        ]),
        _: 1
      }, 512);
    };
  }
}), Xo = /* @__PURE__ */ Sn(Yo, [["__scopeId", "data-v-fd66bd13"]]);
/*!
 * OverlayScrollbars
 * Version: 2.10.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const yt = (t, e) => {
  const { o: n, i: s, u: o } = t;
  let c = n, i;
  const a = (l, u) => {
    const f = c, v = l, p = u || (s ? !s(f, v) : f !== v);
    return (p || o) && (c = v, i = f), [c, p, i];
  };
  return [e ? (l) => a(e(c, i), l) : a, (l) => [c, !!l, i]];
}, Go = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, vt = Go ? window : {}, vs = Math.max, Qo = Math.min, cn = Math.round, ke = Math.abs, qn = Math.sign, ys = vt.cancelAnimationFrame, wn = vt.requestAnimationFrame, $e = vt.setTimeout, rn = vt.clearTimeout, Ie = (t) => typeof vt[t] < "u" ? vt[t] : void 0, Jo = Ie("MutationObserver"), Fn = Ie("IntersectionObserver"), Me = Ie("ResizeObserver"), ze = Ie("ScrollTimeline"), zn = (t) => t === void 0, He = (t) => t === null, Mt = (t) => typeof t == "number", pe = (t) => typeof t == "string", Cn = (t) => typeof t == "boolean", wt = (t) => typeof t == "function", Et = (t) => Array.isArray(t), Ee = (t) => typeof t == "object" && !Et(t) && !He(t), Pn = (t) => {
  const e = !!t && t.length, n = Mt(e) && e > -1 && e % 1 == 0;
  return Et(t) || !wt(t) && n ? e > 0 && Ee(t) ? e - 1 in t : !0 : !1;
}, Ae = (t) => !!t && t.constructor === Object, Re = (t) => t instanceof HTMLElement, Le = (t) => t instanceof Element;
function X(t, e) {
  if (Pn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && X(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const bs = (t, e) => t.indexOf(e) >= 0, ae = (t, e) => t.concat(e), nt = (t, e, n) => (!pe(e) && Pn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), Vt = (t) => Array.from(t || []), On = (t) => Et(t) ? t : !pe(t) && Pn(t) ? Vt(t) : [t], an = (t) => !!t && !t.length, ln = (t) => Vt(new Set(t)), _t = (t, e, n) => {
  X(t, (o) => o ? o.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, gs = "paddingTop", xs = "paddingRight", _s = "paddingLeft", Ss = "paddingBottom", ws = "marginLeft", zs = "marginRight", Cs = "marginBottom", Ps = "overflowX", Os = "overflowY", Ve = "width", Ue = "height", Ht = "visible", Bt = "hidden", Jt = "scroll", tc = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, Be = (t, e, n, s) => {
  if (t && e) {
    let o = !0;
    return X(n, (c) => {
      const i = t[c], a = e[c];
      i !== a && (o = !1);
    }), o;
  }
  return !1;
}, ks = (t, e) => Be(t, e, ["w", "h"]), Ce = (t, e) => Be(t, e, ["x", "y"]), ec = (t, e) => Be(t, e, ["t", "r", "b", "l"]), qt = () => {
}, E = (t, ...e) => t.bind(0, ...e), Zt = (t) => {
  let e;
  const n = t ? $e : wn, s = t ? rn : ys;
  return [(o) => {
    s(e), e = n(() => o(), wt(t) ? t() : t);
  }, () => s(e)];
}, un = (t, e) => {
  const { _: n, v: s, p: o, S: c } = e || {};
  let i, a, r, d, l = qt;
  const u = function(P) {
    l(), rn(i), d = i = a = void 0, l = qt, t.apply(this, P);
  }, f = (m) => c && a ? c(a, m) : m, v = () => {
    l !== qt && u(f(r) || r);
  }, p = function() {
    const P = Vt(arguments), w = wt(n) ? n() : n;
    if (Mt(w) && w >= 0) {
      const j = wt(s) ? s() : s, S = Mt(j) && j >= 0, $ = w > 0 ? $e : wn, M = w > 0 ? rn : ys, L = f(P) || P, A = u.bind(0, L);
      let x;
      l(), o && !d ? (A(), d = !0, x = $(() => d = void 0, w)) : (x = $(A, w), S && !i && (i = $e(v, j))), l = () => M(x), a = r = L;
    } else
      u(P);
  };
  return p.m = v, p;
}, $s = (t, e) => Object.prototype.hasOwnProperty.call(t, e), zt = (t) => t ? Object.keys(t) : [], K = (t, e, n, s, o, c, i) => {
  const a = [e, n, s, o, c, i];
  return (typeof t != "object" || He(t)) && !wt(t) && (t = {}), X(a, (r) => {
    X(r, (d, l) => {
      const u = r[l];
      if (t === u)
        return !0;
      const f = Et(u);
      if (u && Ae(u)) {
        const v = t[l];
        let p = v;
        f && !Et(v) ? p = [] : !f && !Ae(v) && (p = {}), t[l] = K(p, u);
      } else
        t[l] = f ? u.slice() : u;
    });
  }), t;
}, Ms = (t, e) => X(K({}, t), (n, s, o) => {
  n === void 0 ? delete o[s] : n && Ae(n) && (o[s] = Ms(n));
}), kn = (t) => !zt(t).length, Es = (t, e, n) => vs(t, Qo(e, n)), Ft = (t) => ln((Et(t) ? t : (t || "").split(" ")).filter((e) => e)), $n = (t, e) => t && t.getAttribute(e), Wn = (t, e) => t && t.hasAttribute(e), Rt = (t, e, n) => {
  X(Ft(e), (s) => {
    t && t.setAttribute(s, String(n || ""));
  });
}, Pt = (t, e) => {
  X(Ft(e), (n) => t && t.removeAttribute(n));
}, je = (t, e) => {
  const n = Ft($n(t, e)), s = E(Rt, t, e), o = (c, i) => {
    const a = new Set(n);
    return X(Ft(c), (r) => {
      a[i](r);
    }), Vt(a).join(" ");
  };
  return {
    O: (c) => s(o(c, "delete")),
    $: (c) => s(o(c, "add")),
    C: (c) => {
      const i = Ft(c);
      return i.reduce((a, r) => a && n.includes(r), i.length > 0);
    }
  };
}, As = (t, e, n) => (je(t, e).O(n), E(Mn, t, e, n)), Mn = (t, e, n) => (je(t, e).$(n), E(As, t, e, n)), Ne = (t, e, n, s) => (s ? Mn : As)(t, e, n), En = (t, e, n) => je(t, e).C(n), Rs = (t) => je(t, "class"), Ns = (t, e) => {
  Rs(t).O(e);
}, An = (t, e) => (Rs(t).$(e), E(Ns, t, e)), Ts = (t, e) => {
  const n = e ? Le(e) && e : document;
  return n ? Vt(n.querySelectorAll(t)) : [];
}, nc = (t, e) => {
  const n = e ? Le(e) && e : document;
  return n && n.querySelector(t);
}, dn = (t, e) => Le(t) && t.matches(e), Ds = (t) => dn(t, "body"), pn = (t) => t ? Vt(t.childNodes) : [], le = (t) => t && t.parentElement, Yt = (t, e) => Le(t) && t.closest(e), hn = (t) => document.activeElement, sc = (t, e, n) => {
  const s = Yt(t, e), o = t && nc(n, s), c = Yt(o, e) === s;
  return s && o ? s === t || o === t || c && Yt(Yt(t, n), e) !== s : !1;
}, te = (t) => {
  X(On(t), (e) => {
    const n = le(e);
    e && n && n.removeChild(e);
  });
}, bt = (t, e) => E(te, t && e && X(On(e), (n) => {
  n && t.appendChild(n);
})), Gt = (t) => {
  const e = document.createElement("div");
  return Rt(e, "class", t), e;
}, Is = (t) => {
  const e = Gt();
  return e.innerHTML = t.trim(), X(pn(e), (n) => te(n));
}, Kn = (t, e) => t.getPropertyValue(e) || t[e] || "", Hs = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Se = (t) => Hs(parseFloat(t || "")), fn = (t) => Math.round(t * 1e4) / 1e4, Ls = (t) => `${fn(Hs(t))}px`;
function ue(t, e) {
  t && e && X(e, (n, s) => {
    try {
      const o = t.style, c = He(n) || Cn(n) ? "" : Mt(n) ? Ls(n) : n;
      s.indexOf("--") === 0 ? o.setProperty(s, c) : o[s] = c;
    } catch {
    }
  });
}
function Dt(t, e, n) {
  const s = pe(e);
  let o = s ? "" : {};
  if (t) {
    const c = vt.getComputedStyle(t, n) || t.style;
    o = s ? Kn(c, e) : Vt(e).reduce((i, a) => (i[a] = Kn(c, a), i), o);
  }
  return o;
}
const Zn = (t, e, n) => {
  const s = e ? `${e}-` : "", o = n ? `-${n}` : "", c = `${s}top${o}`, i = `${s}right${o}`, a = `${s}bottom${o}`, r = `${s}left${o}`, d = Dt(t, [c, i, a, r]);
  return {
    t: Se(d[c]),
    r: Se(d[i]),
    b: Se(d[a]),
    l: Se(d[r])
  };
}, oc = (t, e) => `translate${Ee(t) ? `(${t.x},${t.y})` : `Y(${t})`}`, cc = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), ic = {
  w: 0,
  h: 0
}, qe = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : ic, rc = (t) => qe("inner", t || vt), Qt = E(qe, "offset"), Vs = E(qe, "client"), Te = E(qe, "scroll"), Rn = (t) => {
  const e = parseFloat(Dt(t, Ve)) || 0, n = parseFloat(Dt(t, Ue)) || 0;
  return {
    w: e - cn(e),
    h: n - cn(n)
  };
}, Ge = (t) => t.getBoundingClientRect(), ac = (t) => !!t && cc(t), mn = (t) => !!(t && (t[Ue] || t[Ve])), Us = (t, e) => {
  const n = mn(t);
  return !mn(e) && n;
}, Yn = (t, e, n, s) => {
  X(Ft(e), (o) => {
    t && t.removeEventListener(o, n, s);
  });
}, J = (t, e, n, s) => {
  var o;
  const c = (o = s && s.H) != null ? o : !0, i = s && s.I || !1, a = s && s.A || !1, r = {
    passive: c,
    capture: i
  };
  return E(_t, Ft(e).map((d) => {
    const l = a ? (u) => {
      Yn(t, d, l, i), n && n(u);
    } : n;
    return t && t.addEventListener(d, l, r), E(Yn, t, d, l, i);
  }));
}, Bs = (t) => t.stopPropagation(), vn = (t) => t.preventDefault(), js = (t) => Bs(t) || vn(t), Ot = (t, e) => {
  const { x: n, y: s } = Mt(e) ? {
    x: e,
    y: e
  } : e || {};
  Mt(n) && (t.scrollLeft = n), Mt(s) && (t.scrollTop = s);
}, gt = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), qs = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), lc = (t, e) => {
  const { D: n, M: s } = t, { w: o, h: c } = e, i = (u, f, v) => {
    let p = qn(u) * v, m = qn(f) * v;
    if (p === m) {
      const P = ke(u), w = ke(f);
      m = P > w ? 0 : m, p = P < w ? 0 : p;
    }
    return p = p === m ? 0 : p, [p + 0, m + 0];
  }, [a, r] = i(n.x, s.x, o), [d, l] = i(n.y, s.y, c);
  return {
    D: {
      x: a,
      y: d
    },
    M: {
      x: r,
      y: l
    }
  };
}, Xn = ({ D: t, M: e }) => {
  const n = (s, o) => s === 0 && s <= o;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, Gn = ({ D: t, M: e }, n) => {
  const s = (o, c, i) => Es(0, 1, (o - i) / (o - c) || 0);
  return {
    x: s(t.x, e.x, n.x),
    y: s(t.y, e.y, n.y)
  };
}, yn = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, Qn = (t, e) => {
  X(On(e), t);
}, bn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (c, i) => {
    if (c) {
      const a = e.get(c);
      Qn((r) => {
        a && a[r ? "delete" : "clear"](r);
      }, i);
    } else
      e.forEach((a) => {
        a.clear();
      }), e.clear();
  }, s = (c, i) => {
    if (pe(c)) {
      const d = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, d), Qn((l) => {
        wt(l) && d.add(l);
      }, i), E(n, c, i);
    }
    Cn(i) && i && n();
    const a = zt(c), r = [];
    return X(a, (d) => {
      const l = c[d];
      l && nt(r, s(d, l));
    }), E(_t, r);
  }, o = (c, i) => {
    X(Vt(e.get(c)), (a) => {
      i && !an(i) ? a.apply(0, i) : a();
    });
  };
  return s(t || {}), [s, n, o];
}, Jn = (t) => JSON.stringify(t, (e, n) => {
  if (wt(n))
    throw 0;
  return n;
}), ts = (t, e) => t ? `${e}`.split(".").reduce((n, s) => n && $s(n, s) ? n[s] : void 0, t) : void 0, uc = {
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
}, Fs = (t, e) => {
  const n = {}, s = ae(zt(e), zt(t));
  return X(s, (o) => {
    const c = t[o], i = e[o];
    if (Ee(c) && Ee(i))
      K(n[o] = {}, Fs(c, i)), kn(n[o]) && delete n[o];
    else if ($s(e, o) && i !== c) {
      let a = !0;
      if (Et(c) || Et(i))
        try {
          Jn(c) === Jn(i) && (a = !1);
        } catch {
        }
      a && (n[o] = i);
    }
  }), n;
}, es = (t, e, n) => (s) => [ts(t, s), n || ts(e, s) !== void 0], ne = "data-overlayscrollbars", Pe = "os-environment", we = `${Pe}-scrollbar-hidden`, Qe = `${ne}-initialize`, Oe = "noClipping", ns = `${ne}-body`, Lt = ne, dc = "host", Nt = `${ne}-viewport`, pc = Ps, hc = Os, fc = "arrange", Ws = "measuring", mc = "scrolling", Ks = "scrollbarHidden", vc = "noContent", gn = `${ne}-padding`, ss = `${ne}-content`, Nn = "os-size-observer", yc = `${Nn}-appear`, bc = `${Nn}-listener`, gc = "os-trinsic-observer", xc = "os-theme-none", St = "os-scrollbar", _c = `${St}-rtl`, Sc = `${St}-horizontal`, wc = `${St}-vertical`, Zs = `${St}-track`, Tn = `${St}-handle`, zc = `${St}-visible`, Cc = `${St}-cornerless`, os = `${St}-interaction`, cs = `${St}-unusable`, xn = `${St}-auto-hide`, is = `${xn}-hidden`, rs = `${St}-wheel`, Pc = `${Zs}-interactive`, Oc = `${Tn}-interactive`;
let Ys;
const kc = () => Ys, $c = (t) => {
  Ys = t;
};
let Je;
const Mc = () => {
  const t = (S, $, M) => {
    bt(document.body, S), bt(document.body, S);
    const N = Vs(S), L = Qt(S), A = Rn($);
    return M && te(S), {
      x: L.h - N.h + A.h,
      y: L.w - N.w + A.w
    };
  }, e = (S) => {
    let $ = !1;
    const M = An(S, we);
    try {
      $ = Dt(S, "scrollbar-width") === "none" || Dt(S, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return M(), $;
  }, n = `.${Pe}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Pe} div{width:200%;height:200%;margin:10px 0}.${we}{scrollbar-width:none!important}.${we}::-webkit-scrollbar,.${we}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = Is(`<div class="${Pe}"><div></div><style>${n}</style></div>`)[0], c = o.firstChild, i = o.lastChild, a = kc();
  a && (i.nonce = a);
  const [r, , d] = bn(), [l, u] = yt({
    o: t(o, c),
    i: Ce
  }, E(t, o, c, !0)), [f] = u(), v = e(o), p = {
    x: f.x === 0,
    y: f.y === 0
  }, m = {
    elements: {
      host: null,
      padding: !v,
      viewport: (S) => v && Ds(S) && S,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, P = K({}, uc), w = E(K, {}, P), D = E(K, {}, m), j = {
    T: f,
    k: p,
    R: v,
    V: !!ze,
    L: E(r, "r"),
    U: D,
    P: (S) => K(m, S) && D(),
    N: w,
    q: (S) => K(P, S) && w(),
    B: K({}, m),
    F: K({}, P)
  };
  if (Pt(o, "style"), te(o), J(vt, "resize", () => {
    d("r", []);
  }), wt(vt.matchMedia) && !v && (!p.x || !p.y)) {
    const S = ($) => {
      const M = vt.matchMedia(`(resolution: ${vt.devicePixelRatio}dppx)`);
      J(M, "change", () => {
        $(), S($);
      }, {
        A: !0
      });
    };
    S(() => {
      const [$, M] = l();
      K(j.T, $), d("r", [M]);
    });
  }
  return j;
}, At = () => (Je || (Je = Mc()), Je), Xs = (t, e) => wt(e) ? e.apply(0, t) : e, Ec = (t, e, n, s) => {
  const o = zn(s) ? n : s;
  return Xs(t, o) || e.apply(0, t);
}, Gs = (t, e, n, s) => {
  const o = zn(s) ? n : s, c = Xs(t, o);
  return !!c && (Re(c) ? c : e.apply(0, t));
}, Ac = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: s } = e || {}, { k: o, R: c, U: i } = At(), { nativeScrollbarsOverlaid: a, body: r } = i().cancel, d = n ?? a, l = zn(s) ? r : s, u = (o.x || o.y) && d, f = t && (He(l) ? !c : l);
  return !!u || !!f;
}, Dn = /* @__PURE__ */ new WeakMap(), Rc = (t, e) => {
  Dn.set(t, e);
}, Nc = (t) => {
  Dn.delete(t);
}, Qs = (t) => Dn.get(t), Tc = (t, e, n) => {
  let s = !1;
  const o = n ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    s = !0;
  }, i = (a) => {
    if (o && n) {
      const r = n.map((d) => {
        const [l, u] = d || [];
        return [u && l ? (a || Ts)(l, t) : [], u];
      });
      X(r, (d) => X(d[0], (l) => {
        const u = d[1], f = o.get(l) || [];
        if (t.contains(l) && u) {
          const p = J(l, u, (m) => {
            s ? (p(), o.delete(l)) : e(m);
          });
          o.set(l, nt(f, p));
        } else
          _t(f), o.delete(l);
      }));
    }
  };
  return i(), [c, i];
}, as = (t, e, n, s) => {
  let o = !1;
  const { j: c, X: i, Y: a, W: r, J: d, G: l } = s || {}, u = un(() => o && n(!0), {
    _: 33,
    v: 99
  }), [f, v] = Tc(t, u, a), p = c || [], m = i || [], P = ae(p, m), w = (j, S) => {
    if (!an(S)) {
      const $ = d || qt, M = l || qt, N = [], L = [];
      let A = !1, x = !1;
      if (X(S, (g) => {
        const { attributeName: R, target: T, type: B, oldValue: F, addedNodes: q, removedNodes: Z } = g, Y = B === "attributes", W = B === "childList", st = t === T, y = Y && R, b = y && $n(T, R || ""), _ = pe(b) ? b : null, z = y && F !== _, h = bs(m, R) && z;
        if (e && (W || !st)) {
          const O = Y && z, C = O && r && dn(T, r), U = (C ? !$(T, R, F, _) : !Y || O) && !M(g, !!C, t, s);
          X(q, (G) => nt(N, G)), X(Z, (G) => nt(N, G)), x = x || U;
        }
        !e && st && z && !$(T, R, F, _) && (nt(L, R), A = A || h);
      }), v((g) => ln(N).reduce((R, T) => (nt(R, Ts(g, T)), dn(T, g) ? nt(R, T) : R), [])), e)
        return !j && x && n(!1), [!1];
      if (!an(L) || A) {
        const g = [ln(L), A];
        return !j && n.apply(0, g), g;
      }
    }
  }, D = new Jo(E(w, !1));
  return [() => (D.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: P,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (f(), D.disconnect(), o = !1);
  }), () => {
    if (o)
      return u.m(), w(!0, D.takeRecords());
  }];
}, Js = {}, to = {}, Dc = (t) => {
  X(t, (e) => X(e, (n, s) => {
    Js[s] = e[s];
  }));
}, eo = (t, e, n) => zt(t).map((s) => {
  const { static: o, instance: c } = t[s], [i, a, r] = n || [], d = n ? c : o;
  if (d) {
    const l = n ? d(i, a, e) : d(e);
    return (r || to)[s] = l;
  }
}), he = (t) => to[t], Ic = "__osOptionsValidationPlugin", Hc = "__osSizeObserverPlugin", Lc = (t, e) => {
  const { k: n } = e, [s, o] = t("showNativeOverlaidScrollbars");
  return [s && n.x && n.y, o];
}, ee = (t) => t.indexOf(Ht) === 0, Vc = (t, e) => {
  const n = (o, c, i, a) => {
    const r = o === Ht ? Bt : o.replace(`${Ht}-`, ""), d = ee(o), l = ee(i);
    return !c && !a ? Bt : d && l ? Ht : d ? c && a ? r : c ? Ht : Bt : c ? r : l && a ? Ht : Bt;
  }, s = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    K: s,
    Z: {
      x: s.x === Jt,
      y: s.y === Jt
    }
  };
}, no = "__osScrollbarsHidingPlugin", Uc = "__osClickScrollPlugin", so = (t, e, n) => {
  const { dt: s } = n || {}, o = he(Hc), [c] = yt({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], r = Is(`<div class="${Nn}"><div class="${bc}"></div></div>`)[0], d = r.firstChild, l = (u) => {
      const f = u instanceof ResizeObserverEntry;
      let v = !1, p = !1;
      if (f) {
        const [m, , P] = c(u.contentRect), w = mn(m);
        p = Us(m, P), v = !p && !w;
      } else
        p = u === !0;
      v || e({
        ft: !0,
        dt: p
      });
    };
    if (Me) {
      const u = new Me((f) => l(f.pop()));
      u.observe(d), nt(i, () => {
        u.disconnect();
      });
    } else if (o) {
      const [u, f] = o(d, l, s);
      nt(i, ae([An(r, yc), J(r, "animationstart", u)], f));
    } else
      return qt;
    return E(_t, nt(i, bt(t, r)));
  };
}, Bc = (t, e) => {
  let n;
  const s = (r) => r.h === 0 || r.isIntersecting || r.intersectionRatio > 0, o = Gt(gc), [c] = yt({
    o: !1
  }), i = (r, d) => {
    if (r) {
      const l = c(s(r)), [, u] = l;
      return u && !d && e(l) && [l];
    }
  }, a = (r, d) => i(d.pop(), r);
  return [() => {
    const r = [];
    if (Fn)
      n = new Fn(E(a, !1), {
        root: t
      }), n.observe(o), nt(r, () => {
        n.disconnect();
      });
    else {
      const d = () => {
        const l = Qt(o);
        i(l);
      };
      nt(r, so(o, d)()), d();
    }
    return E(_t, nt(r, bt(t, o)));
  }, () => n && a(!0, n.takeRecords())];
}, jc = (t, e, n, s) => {
  let o, c, i, a, r, d;
  const l = `[${Lt}]`, u = `[${Nt}]`, f = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: v, ht: p, ot: m, gt: P, bt: w, nt: D, wt: j, yt: S, St: $, Ot: M } = t, N = (h) => Dt(h, "direction") === "rtl", L = {
    $t: !1,
    ct: N(v)
  }, A = At(), x = he(no), [g] = yt({
    i: ks,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const h = x && x.tt(t, e, L, A, n).ut, C = !(j && D) && En(p, Lt, Oe), k = !D && S(fc), U = k && gt(P), G = U && M(), ct = $(Ws, C), tt = k && h && h()[0], dt = Te(m), I = Rn(m);
    return tt && tt(), Ot(P, U), G && G(), C && ct(), {
      w: dt.w + I.w,
      h: dt.h + I.h
    };
  }), R = un(s, {
    _: () => o,
    v: () => c,
    S(h, O) {
      const [C] = h, [k] = O;
      return [ae(zt(C), zt(k)).reduce((U, G) => (U[G] = C[G] || k[G], U), {})];
    }
  }), T = (h) => {
    const O = N(v);
    K(h, {
      Ct: d !== O
    }), K(L, {
      ct: O
    }), d = O;
  }, B = (h, O) => {
    const [C, k] = h, U = {
      xt: k
    };
    return K(L, {
      $t: C
    }), !O && s(U), U;
  }, F = ({ ft: h, dt: O }) => {
    const k = !(h && !O) && A.R ? R : s, U = {
      ft: h || O,
      dt: O
    };
    T(U), k(U);
  }, q = (h, O) => {
    const [, C] = g(), k = {
      Ht: C
    };
    return T(k), C && !O && (h ? s : R)(k), k;
  }, Z = (h, O, C) => {
    const k = {
      Et: O
    };
    return T(k), O && !C && R(k), k;
  }, [Y, W] = w ? Bc(p, B) : [], st = !D && so(p, F, {
    dt: !0
  }), [y, b] = as(p, !1, Z, {
    X: f,
    j: f
  }), _ = D && Me && new Me((h) => {
    const O = h[h.length - 1].contentRect;
    F({
      ft: !0,
      dt: Us(O, r)
    }), r = O;
  }), z = un(() => {
    const [, h] = g();
    s({
      Ht: h
    });
  }, {
    _: 222,
    p: !0
  });
  return [() => {
    _ && _.observe(p);
    const h = st && st(), O = Y && Y(), C = y(), k = A.L((U) => {
      U ? R({
        zt: U
      }) : z();
    });
    return () => {
      _ && _.disconnect(), h && h(), O && O(), a && a(), C(), k();
    };
  }, ({ It: h, At: O, Dt: C }) => {
    const k = {}, [U] = h("update.ignoreMutation"), [G, ct] = h("update.attributes"), [tt, dt] = h("update.elementEvents"), [I, pt] = h("update.debounce"), ft = dt || ct, rt = O || C, ht = (ot) => wt(U) && U(ot);
    if (ft) {
      i && i(), a && a();
      const [ot, it] = as(w || m, !0, q, {
        j: ae(f, G || []),
        Y: tt,
        W: l,
        G: (Q, et) => {
          const { target: at, attributeName: mt } = Q;
          return (!et && mt && !D ? sc(at, l, u) : !1) || !!Yt(at, `.${St}`) || !!ht(Q);
        }
      });
      a = ot(), i = it;
    }
    if (pt)
      if (R.m(), Et(I)) {
        const ot = I[0], it = I[1];
        o = Mt(ot) && ot, c = Mt(it) && it;
      } else Mt(I) ? (o = I, c = !1) : (o = !1, c = !1);
    if (rt) {
      const ot = b(), it = W && W(), Q = i && i();
      ot && K(k, Z(ot[0], ot[1], rt)), it && K(k, B(it[0], rt)), Q && K(k, q(Q[0], rt));
    }
    return T(k), k;
  }, L];
}, qc = (t, e, n, s) => {
  const o = "--os-viewport-percent", c = "--os-scroll-percent", i = "--os-scroll-direction", { U: a } = At(), { scrollbars: r } = a(), { slot: d } = r, { vt: l, ht: u, ot: f, Mt: v, gt: p, wt: m, nt: P } = e, { scrollbars: w } = v ? {} : t, { slot: D } = w || {}, j = [], S = [], $ = [], M = Gs([l, u, f], () => P && m ? l : u, d, D), N = (y) => {
    if (ze) {
      const b = new ze({
        source: p,
        axis: y
      });
      return {
        kt: (z) => {
          const h = z.Tt.animate({
            clear: ["left"],
            [c]: [0, 1]
          }, {
            timeline: b
          });
          return () => h.cancel();
        }
      };
    }
  }, L = {
    x: N("x"),
    y: N("y")
  }, A = () => {
    const { Rt: y, Vt: b } = n, _ = (z, h) => Es(0, 1, z / (z + h) || 0);
    return {
      x: _(b.x, y.x),
      y: _(b.y, y.y)
    };
  }, x = (y, b, _) => {
    const z = _ ? An : Ns;
    X(y, (h) => {
      z(h.Tt, b);
    });
  }, g = (y, b) => {
    X(y, (_) => {
      const [z, h] = b(_);
      ue(z, h);
    });
  }, R = (y, b, _) => {
    const z = Cn(_), h = z ? _ : !0, O = z ? !_ : !0;
    h && x(S, y, b), O && x($, y, b);
  }, T = () => {
    const y = A(), b = (_) => (z) => [z.Tt, {
      [o]: fn(_) + ""
    }];
    g(S, b(y.x)), g($, b(y.y));
  }, B = () => {
    if (!ze) {
      const { Lt: y } = n, b = Gn(y, gt(p)), _ = (z) => (h) => [h.Tt, {
        [c]: fn(z) + ""
      }];
      g(S, _(b.x)), g($, _(b.y));
    }
  }, F = () => {
    const { Lt: y } = n, b = Xn(y), _ = (z) => (h) => [h.Tt, {
      [i]: z ? "0" : "1"
    }];
    g(S, _(b.x)), g($, _(b.y));
  }, q = () => {
    if (P && !m) {
      const { Rt: y, Lt: b } = n, _ = Xn(b), z = Gn(b, gt(p)), h = (O) => {
        const { Tt: C } = O, k = le(C) === f && C, U = (G, ct, tt) => {
          const dt = ct * G;
          return Ls(tt ? dt : -dt);
        };
        return [k, k && {
          transform: oc({
            x: U(z.x, y.x, _.x),
            y: U(z.y, y.y, _.y)
          })
        }];
      };
      g(S, h), g($, h);
    }
  }, Z = (y) => {
    const b = y ? "x" : "y", z = Gt(`${St} ${y ? Sc : wc}`), h = Gt(Zs), O = Gt(Tn), C = {
      Tt: z,
      Ut: h,
      Pt: O
    }, k = L[b];
    return nt(y ? S : $, C), nt(j, [bt(z, h), bt(h, O), E(te, z), k && k.kt(C), s(C, R, y)]), C;
  }, Y = E(Z, !0), W = E(Z, !1), st = () => (bt(M, S[0].Tt), bt(M, $[0].Tt), E(_t, j));
  return Y(), W(), [{
    Nt: T,
    qt: B,
    Bt: F,
    Ft: q,
    jt: R,
    Xt: {
      Yt: S,
      Wt: Y,
      Jt: E(g, S)
    },
    Gt: {
      Yt: $,
      Wt: W,
      Jt: E(g, $)
    }
  }, st];
}, Fc = (t, e, n, s) => (o, c, i) => {
  const { ht: a, ot: r, nt: d, gt: l, Kt: u, Ot: f } = e, { Tt: v, Ut: p, Pt: m } = o, [P, w] = Zt(333), [D, j] = Zt(444), S = (N) => {
    wt(l.scrollBy) && l.scrollBy({
      behavior: "smooth",
      left: N.x,
      top: N.y
    });
  }, $ = () => {
    const N = "pointerup pointercancel lostpointercapture", L = `client${i ? "X" : "Y"}`, A = i ? Ve : Ue, x = i ? "left" : "top", g = i ? "w" : "h", R = i ? "x" : "y", T = (F, q) => (Z) => {
      const { Rt: Y } = n, W = Qt(p)[g] - Qt(m)[g], y = q * Z / W * Y[R];
      Ot(l, {
        [R]: F + y
      });
    }, B = [];
    return J(p, "pointerdown", (F) => {
      const q = Yt(F.target, `.${Tn}`) === m, Z = q ? m : p, Y = t.scrollbars, W = Y[q ? "dragScroll" : "clickScroll"], { button: st, isPrimary: y, pointerType: b } = F, { pointers: _ } = Y;
      if (st === 0 && y && W && (_ || []).includes(b)) {
        _t(B), j();
        const h = !q && (F.shiftKey || W === "instant"), O = E(Ge, m), C = E(Ge, p), k = (et, at) => (et || O())[x] - (at || C())[x], U = cn(Ge(l)[A]) / Qt(l)[g] || 1, G = T(gt(l)[R], 1 / U), ct = F[L], tt = O(), dt = C(), I = tt[A], pt = k(tt, dt) + I / 2, ft = ct - dt[x], rt = q ? 0 : ft - pt, ht = (et) => {
          _t(Q), Z.releasePointerCapture(et.pointerId);
        }, ot = q || h, it = f(), Q = [J(u, N, ht), J(u, "selectstart", (et) => vn(et), {
          H: !1
        }), J(p, N, ht), ot && J(p, "pointermove", (et) => G(rt + (et[L] - ct))), ot && (() => {
          const et = gt(l);
          it();
          const at = gt(l), mt = {
            x: at.x - et.x,
            y: at.y - et.y
          };
          (ke(mt.x) > 3 || ke(mt.y) > 3) && (f(), Ot(l, et), S(mt), D(it));
        })];
        if (Z.setPointerCapture(F.pointerId), h)
          G(rt);
        else if (!q) {
          const et = he(Uc);
          if (et) {
            const at = et(G, rt, I, (mt) => {
              mt ? it() : nt(Q, it);
            });
            nt(Q, at), nt(B, E(at, !0));
          }
        }
      }
    });
  };
  let M = !0;
  return E(_t, [J(m, "pointermove pointerleave", s), J(v, "pointerenter", () => {
    c(os, !0);
  }), J(v, "pointerleave pointercancel", () => {
    c(os, !1);
  }), !d && J(v, "mousedown", () => {
    const N = hn();
    (Wn(N, Nt) || Wn(N, Lt) || N === document.body) && $e(E(yn, r), 25);
  }), J(v, "wheel", (N) => {
    const { deltaX: L, deltaY: A, deltaMode: x } = N;
    M && x === 0 && le(v) === a && S({
      x: L,
      y: A
    }), M = !1, c(rs, !0), P(() => {
      M = !0, c(rs);
    }), vn(N);
  }, {
    H: !1,
    I: !0
  }), J(v, "pointerdown", E(J, u, "click", js, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), $(), w, j]);
}, Wc = (t, e, n, s, o, c) => {
  let i, a, r, d, l, u = qt, f = 0;
  const v = (y) => y.pointerType === "mouse", [p, m] = Zt(), [P, w] = Zt(100), [D, j] = Zt(100), [S, $] = Zt(() => f), [M, N] = qc(t, o, s, Fc(e, o, s, (y) => v(y) && Z())), { ht: L, Qt: A, wt: x } = o, { jt: g, Nt: R, qt: T, Bt: B, Ft: F } = M, q = (y, b) => {
    if ($(), y)
      g(is);
    else {
      const _ = E(g, is, !0);
      f > 0 && !b ? S(_) : _();
    }
  }, Z = () => {
    (r ? !i : !d) && (q(!0), P(() => {
      q(!1);
    }));
  }, Y = (y) => {
    g(xn, y, !0), g(xn, y, !1);
  }, W = (y) => {
    v(y) && (i = r, r && q(!0));
  }, st = [$, w, j, m, () => u(), J(L, "pointerover", W, {
    A: !0
  }), J(L, "pointerenter", W), J(L, "pointerleave", (y) => {
    v(y) && (i = !1, r && q(!1));
  }), J(L, "pointermove", (y) => {
    v(y) && a && Z();
  }), J(A, "scroll", (y) => {
    p(() => {
      T(), Z();
    }), c(y), F();
  })];
  return [() => E(_t, nt(st, N())), ({ It: y, Dt: b, Zt: _, tn: z }) => {
    const { nn: h, sn: O, en: C, cn: k } = z || {}, { Ct: U, dt: G } = _ || {}, { ct } = n, { k: tt } = At(), { K: dt, rn: I } = s, [pt, ft] = y("showNativeOverlaidScrollbars"), [rt, ht] = y("scrollbars.theme"), [ot, it] = y("scrollbars.visibility"), [Q, et] = y("scrollbars.autoHide"), [at, mt] = y("scrollbars.autoHideSuspend"), [se] = y("scrollbars.autoHideDelay"), [fe, me] = y("scrollbars.dragScroll"), [ve, Ut] = y("scrollbars.clickScroll"), [Wt, Fe] = y("overflow"), We = G && !b, Ke = I.x || I.y, Ze = h || O || k || U || b, Ct = C || it || Fe, Ye = pt && tt.x && tt.y, oe = (ce, It, ye) => {
      const ie = ce.includes(Jt) && (ot === Ht || ot === "auto" && It === Jt);
      return g(zc, ie, ye), ie;
    };
    if (f = se, We && (at && Ke ? (Y(!1), u(), D(() => {
      u = J(A, "scroll", E(Y, !0), {
        A: !0
      });
    })) : Y(!0)), ft && g(xc, Ye), ht && (g(l), g(rt, !0), l = rt), mt && !at && Y(!0), et && (a = Q === "move", r = Q === "leave", d = Q === "never", q(d, !0)), me && g(Oc, fe), Ut && g(Pc, !!ve), Ct) {
      const ce = oe(Wt.x, dt.x, !0), It = oe(Wt.y, dt.y, !1);
      g(Cc, !(ce && It));
    }
    Ze && (T(), R(), F(), k && B(), g(cs, !I.x, !0), g(cs, !I.y, !1), g(_c, ct && !x));
  }, {}, M];
}, Kc = (t) => {
  const e = At(), { U: n, R: s } = e, { elements: o } = n(), { padding: c, viewport: i, content: a } = o, r = Re(t), d = r ? {} : t, { elements: l } = d, { padding: u, viewport: f, content: v } = l || {}, p = r ? t : d.target, m = Ds(p), P = p.ownerDocument, w = P.documentElement, D = () => P.defaultView || vt, j = E(Ec, [p]), S = E(Gs, [p]), $ = E(Gt, ""), M = E(j, $, i), N = E(S, $, a), L = (I) => {
    const pt = Qt(I), ft = Te(I), rt = Dt(I, Ps), ht = Dt(I, Os);
    return ft.w - pt.w > 0 && !ee(rt) || ft.h - pt.h > 0 && !ee(ht);
  }, A = M(f), x = A === p, g = x && m, R = !x && N(v), T = !x && A === R, B = g ? w : A, F = g ? B : p, q = !x && S($, c, u), Z = !T && R, Y = [Z, B, q, F].map((I) => Re(I) && !le(I) && I), W = (I) => I && bs(Y, I), st = !W(B) && L(B) ? B : p, y = g ? w : B, _ = {
    vt: p,
    ht: F,
    ot: B,
    ln: q,
    bt: Z,
    gt: y,
    Qt: g ? P : B,
    an: m ? w : st,
    Kt: P,
    wt: m,
    Mt: r,
    nt: x,
    un: D,
    yt: (I) => En(B, Nt, I),
    St: (I, pt) => Ne(B, Nt, I, pt),
    Ot: () => Ne(y, Nt, mc, !0)
  }, { vt: z, ht: h, ln: O, ot: C, bt: k } = _, U = [() => {
    Pt(h, [Lt, Qe]), Pt(z, Qe), m && Pt(w, [Qe, Lt]);
  }];
  let G = pn([k, C, O, h, z].find((I) => I && !W(I)));
  const ct = g ? z : k || C, tt = E(_t, U);
  return [_, () => {
    const I = D(), pt = hn(), ft = (Q) => {
      bt(le(Q), pn(Q)), te(Q);
    }, rt = (Q) => J(Q, "focusin focusout focus blur", js, {
      I: !0,
      H: !1
    }), ht = "tabindex", ot = $n(C, ht), it = rt(pt);
    return Rt(h, Lt, x ? "" : dc), Rt(O, gn, ""), Rt(C, Nt, ""), Rt(k, ss, ""), x || (Rt(C, ht, ot || "-1"), m && Rt(w, ns, "")), bt(ct, G), bt(h, O), bt(O || h, !x && C), bt(C, k), nt(U, [it, () => {
      const Q = hn(), et = W(C), at = et && Q === C ? z : Q, mt = rt(at);
      Pt(O, gn), Pt(k, ss), Pt(C, Nt), m && Pt(w, ns), ot ? Rt(C, ht, ot) : Pt(C, ht), W(k) && ft(k), et && ft(C), W(O) && ft(O), yn(at), mt();
    }]), s && !x && (Mn(C, Nt, Ks), nt(U, E(Pt, C, Nt))), yn(!x && m && pt === z && I.top === I ? C : pt), it(), G = 0, tt;
  }, tt];
}, Zc = ({ bt: t }) => ({ Zt: e, _n: n, Dt: s }) => {
  const { xt: o } = e || {}, { $t: c } = n;
  t && (o || s) && ue(t, {
    [Ue]: c && "100%"
  });
}, Yc = ({ ht: t, ln: e, ot: n, nt: s }, o) => {
  const [c, i] = yt({
    i: ec,
    o: Zn()
  }, E(Zn, t, "padding", ""));
  return ({ It: a, Zt: r, _n: d, Dt: l }) => {
    let [u, f] = i(l);
    const { R: v } = At(), { ft: p, Ht: m, Ct: P } = r || {}, { ct: w } = d, [D, j] = a("paddingAbsolute");
    (p || f || (l || m)) && ([u, f] = c(l));
    const $ = !s && (j || P || f);
    if ($) {
      const M = !D || !e && !v, N = u.r + u.l, L = u.t + u.b, A = {
        [zs]: M && !w ? -N : 0,
        [Cs]: M ? -L : 0,
        [ws]: M && w ? -N : 0,
        top: M ? -u.t : 0,
        right: M ? w ? -u.r : "auto" : 0,
        left: M ? w ? "auto" : -u.l : 0,
        [Ve]: M && `calc(100% + ${N}px)`
      }, x = {
        [gs]: M ? u.t : 0,
        [xs]: M ? u.r : 0,
        [Ss]: M ? u.b : 0,
        [_s]: M ? u.l : 0
      };
      ue(e || n, A), ue(n, x), K(o, {
        ln: u,
        dn: !M,
        rt: e ? x : K({}, A, x)
      });
    }
    return {
      fn: $
    };
  };
}, Xc = (t, e) => {
  const n = At(), { ht: s, ln: o, ot: c, nt: i, Qt: a, gt: r, wt: d, St: l, un: u } = t, { R: f } = n, v = d && i, p = E(vs, 0), m = {
    display: () => !1,
    direction: (b) => b !== "ltr",
    flexDirection: (b) => b.endsWith("-reverse"),
    writingMode: (b) => b !== "horizontal-tb"
  }, P = zt(m), w = {
    i: ks,
    o: {
      w: 0,
      h: 0
    }
  }, D = {
    i: Ce,
    o: {}
  }, j = (b) => {
    l(Ws, !v && b);
  }, S = (b) => {
    if (!P.some((ct) => {
      const tt = b[ct];
      return tt && m[ct](tt);
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
    j(!0);
    const z = gt(r), h = l(vc, !0), O = J(a, Jt, (ct) => {
      const tt = gt(r);
      ct.isTrusted && tt.x === z.x && tt.y === z.y && Bs(ct);
    }, {
      I: !0,
      A: !0
    });
    Ot(r, {
      x: 0,
      y: 0
    }), h();
    const C = gt(r), k = Te(r);
    Ot(r, {
      x: k.w,
      y: k.h
    });
    const U = gt(r);
    Ot(r, {
      x: U.x - C.x < 1 && -k.w,
      y: U.y - C.y < 1 && -k.h
    });
    const G = gt(r);
    return Ot(r, z), wn(() => O()), {
      D: C,
      M: G
    };
  }, $ = (b, _) => {
    const z = vt.devicePixelRatio % 1 !== 0 ? 1 : 0, h = {
      w: p(b.w - _.w),
      h: p(b.h - _.h)
    };
    return {
      w: h.w > z ? h.w : 0,
      h: h.h > z ? h.h : 0
    };
  }, [M, N] = yt(w, E(Rn, c)), [L, A] = yt(w, E(Te, c)), [x, g] = yt(w), [R] = yt(D), [T, B] = yt(w), [F] = yt(D), [q] = yt({
    i: (b, _) => Be(b, _, P),
    o: {}
  }, () => ac(c) ? Dt(c, P) : {}), [Z, Y] = yt({
    i: (b, _) => Ce(b.D, _.D) && Ce(b.M, _.M),
    o: qs()
  }), W = he(no), st = (b, _) => `${_ ? pc : hc}${tc(b)}`, y = (b) => {
    const _ = (h) => [Ht, Bt, Jt].map((O) => st(O, h)), z = _(!0).concat(_()).join(" ");
    l(z), l(zt(b).map((h) => st(b[h], h === "x")).join(" "), !0);
  };
  return ({ It: b, Zt: _, _n: z, Dt: h }, { fn: O }) => {
    const { ft: C, Ht: k, Ct: U, dt: G, zt: ct } = _ || {}, tt = W && W.tt(t, e, z, n, b), { it: dt, ut: I, _t: pt } = tt || {}, [ft, rt] = Lc(b, n), [ht, ot] = b("overflow"), it = ee(ht.x), Q = ee(ht.y), et = !0;
    let at = N(h), mt = A(h), se = g(h), fe = B(h);
    rt && f && l(Ks, !ft);
    {
      En(s, Lt, Oe) && j(!0);
      const [Hn] = I ? I() : [], [be] = at = M(h), [ge] = mt = L(h), xe = Vs(c), _e = v && rc(u()), ao = {
        w: p(ge.w + be.w),
        h: p(ge.h + be.h)
      }, Ln = {
        w: p((_e ? _e.w : xe.w + p(xe.w - ge.w)) + be.w),
        h: p((_e ? _e.h : xe.h + p(xe.h - ge.h)) + be.h)
      };
      Hn && Hn(), fe = T(Ln), se = x($(ao, Ln), h);
    }
    const [me, ve] = fe, [Ut, Wt] = se, [Fe, We] = mt, [Ke, Ze] = at, [Ct, Ye] = R({
      x: Ut.w > 0,
      y: Ut.h > 0
    }), oe = it && Q && (Ct.x || Ct.y) || it && Ct.x && !Ct.y || Q && Ct.y && !Ct.x, ce = O || U || ct || Ze || We || ve || Wt || ot || rt || et, It = Vc(Ct, ht), [ye, ie] = F(It.K), [oo, co] = q(h), In = U || G || co || Ye || h, [io, ro] = In ? Z(S(oo), h) : Y();
    return ce && (ie && y(It.K), pt && dt && ue(c, pt(It, z, dt(It, Fe, Ke)))), j(!1), Ne(s, Lt, Oe, oe), Ne(o, gn, Oe, oe), K(e, {
      K: ye,
      Vt: {
        x: me.w,
        y: me.h
      },
      Rt: {
        x: Ut.w,
        y: Ut.h
      },
      rn: Ct,
      Lt: lc(io, Ut)
    }), {
      en: ie,
      nn: ve,
      sn: Wt,
      cn: ro || Wt,
      vn: In
    };
  };
}, Gc = (t) => {
  const [e, n, s] = Kc(t), o = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: !1,
    rt: {
      [zs]: 0,
      [Cs]: 0,
      [ws]: 0,
      [gs]: 0,
      [xs]: 0,
      [Ss]: 0,
      [_s]: 0
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
      x: Bt,
      y: Bt
    },
    rn: {
      x: !1,
      y: !1
    },
    Lt: qs()
  }, { vt: c, gt: i, nt: a, Ot: r } = e, { R: d, k: l } = At(), u = !d && (l.x || l.y), f = [Zc(e), Yc(e, o), Xc(e, o)];
  return [n, (v) => {
    const p = {}, P = u && gt(i), w = P && r();
    return X(f, (D) => {
      K(p, D(v, p) || {});
    }), Ot(i, P), w && w(), !a && Ot(c, 0), p;
  }, o, e, s];
}, Qc = (t, e, n, s, o) => {
  let c = !1;
  const i = es(e, {}), [a, r, d, l, u] = Gc(t), [f, v, p] = jc(l, d, i, (S) => {
    j({}, S);
  }), [m, P, , w] = Wc(t, e, p, d, l, o), D = (S) => zt(S).some(($) => !!S[$]), j = (S, $) => {
    if (n())
      return !1;
    const { pn: M, Dt: N, At: L, hn: A } = S, x = M || {}, g = !!N || !c, R = {
      It: es(e, x, g),
      pn: x,
      Dt: g
    };
    if (A)
      return P(R), !1;
    const T = $ || v(K({}, R, {
      At: L
    })), B = r(K({}, R, {
      _n: p,
      Zt: T
    }));
    P(K({}, R, {
      Zt: T,
      tn: B
    }));
    const F = D(T), q = D(B), Z = F || q || !kn(x) || g;
    return c = !0, Z && s(S, {
      Zt: T,
      tn: B
    }), Z;
  };
  return [() => {
    const { an: S, gt: $, Ot: M } = l, N = gt(S), L = [f(), a(), m()], A = M();
    return Ot($, N), A(), E(_t, L);
  }, j, () => ({
    gn: p,
    bn: d
  }), {
    wn: l,
    yn: w
  }, u];
}, kt = (t, e, n) => {
  const { N: s } = At(), o = Re(t), c = o ? t : t.target, i = Qs(c);
  if (e && !i) {
    let a = !1;
    const r = [], d = {}, l = (x) => {
      const g = Ms(x), R = he(Ic);
      return R ? R(g, !0) : g;
    }, u = K({}, s(), l(e)), [f, v, p] = bn(), [m, P, w] = bn(n), D = (x, g) => {
      w(x, g), p(x, g);
    }, [j, S, $, M, N] = Qc(t, u, () => a, ({ pn: x, Dt: g }, { Zt: R, tn: T }) => {
      const { ft: B, Ct: F, xt: q, Ht: Z, Et: Y, dt: W } = R, { nn: st, sn: y, en: b, cn: _ } = T;
      D("updated", [A, {
        updateHints: {
          sizeChanged: !!B,
          directionChanged: !!F,
          heightIntrinsicChanged: !!q,
          overflowEdgeChanged: !!st,
          overflowAmountChanged: !!y,
          overflowStyleChanged: !!b,
          scrollCoordinatesChanged: !!_,
          contentMutation: !!Z,
          hostMutation: !!Y,
          appear: !!W
        },
        changedOptions: x || {},
        force: !!g
      }]);
    }, (x) => D("scroll", [A, x])), L = (x) => {
      Nc(c), _t(r), a = !0, D("destroyed", [A, x]), v(), P();
    }, A = {
      options(x, g) {
        if (x) {
          const R = g ? s() : {}, T = Fs(u, K(R, l(x)));
          kn(T) || (K(u, T), S({
            pn: T
          }));
        }
        return K({}, u);
      },
      on: m,
      off: (x, g) => {
        x && g && P(x, g);
      },
      state() {
        const { gn: x, bn: g } = $(), { ct: R } = x, { Vt: T, Rt: B, K: F, rn: q, ln: Z, dn: Y, Lt: W } = g;
        return K({}, {
          overflowEdge: T,
          overflowAmount: B,
          overflowStyle: F,
          hasOverflow: q,
          scrollCoordinates: {
            start: W.D,
            end: W.M
          },
          padding: Z,
          paddingAbsolute: Y,
          directionRTL: R,
          destroyed: a
        });
      },
      elements() {
        const { vt: x, ht: g, ln: R, ot: T, bt: B, gt: F, Qt: q } = M.wn, { Xt: Z, Gt: Y } = M.yn, W = (y) => {
          const { Pt: b, Ut: _, Tt: z } = y;
          return {
            scrollbar: z,
            track: _,
            handle: b
          };
        }, st = (y) => {
          const { Yt: b, Wt: _ } = y, z = W(b[0]);
          return K({}, z, {
            clone: () => {
              const h = W(_());
              return S({
                hn: !0
              }), h;
            }
          });
        };
        return K({}, {
          target: x,
          host: g,
          padding: R || T,
          viewport: T,
          content: B || T,
          scrollOffsetElement: F,
          scrollEventElement: q,
          scrollbarHorizontal: st(Z),
          scrollbarVertical: st(Y)
        });
      },
      update: (x) => S({
        Dt: x,
        At: !0
      }),
      destroy: E(L, !1),
      plugin: (x) => d[zt(x)[0]]
    };
    return nt(r, [N]), Rc(c, A), eo(Js, kt, [A, f, d]), Ac(M.wn.wt, !o && t.cancel) ? (L(!0), A) : (nt(r, j()), D("initialized", [A]), A.update(), A);
  }
  return i;
};
kt.plugin = (t) => {
  const e = Et(t), n = e ? t : [t], s = n.map((o) => eo(o, kt)[0]);
  return Dc(n), e ? s : s[0];
};
kt.valid = (t) => {
  const e = t && t.elements, n = wt(e) && e();
  return Ae(n) && !!Qs(n.target);
};
kt.env = () => {
  const { T: t, k: e, R: n, V: s, B: o, F: c, U: i, P: a, N: r, q: d } = At();
  return K({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: s,
    staticDefaultInitialization: o,
    staticDefaultOptions: c,
    getDefaultInitialization: i,
    setDefaultInitialization: a,
    getDefaultOptions: r,
    setDefaultOptions: d
  });
};
kt.nonce = $c;
const Jc = () => {
  if (typeof window > "u") {
    const d = () => {
    };
    return [d, d];
  }
  let t, e;
  const n = window, s = typeof n.requestIdleCallback == "function", o = n.requestAnimationFrame, c = n.cancelAnimationFrame, i = s ? n.requestIdleCallback : o, a = s ? n.cancelIdleCallback : c, r = () => {
    a(t), c(e);
  };
  return [
    (d, l) => {
      r(), t = i(
        s ? () => {
          r(), e = o(d);
        } : d,
        typeof l == "object" ? l : { timeout: 2233 }
      );
    },
    r
  ];
}, ti = (t) => {
  let e = null, n, s, o;
  const c = sn(t || {}), [i, a] = Jc();
  return Tt(
    () => {
      var r;
      return xt((r = c.value) == null ? void 0 : r.defer);
    },
    (r) => {
      o = r;
    },
    { deep: !0, immediate: !0 }
  ), Tt(
    () => {
      var r;
      return xt((r = c.value) == null ? void 0 : r.options);
    },
    (r) => {
      n = r, kt.valid(e) && e.options(n || {}, !0);
    },
    { deep: !0, immediate: !0 }
  ), Tt(
    () => {
      var r;
      return xt((r = c.value) == null ? void 0 : r.events);
    },
    (r) => {
      s = r, kt.valid(e) && e.on(
        /* c8 ignore next */
        s || {},
        !0
      );
    },
    { deep: !0, immediate: !0 }
  ), xo(() => {
    a(), e == null || e.destroy();
  }), [
    (r) => {
      if (kt.valid(e))
        return e;
      const d = () => e = kt(r, n || {}, s || {});
      o ? i(d, o) : d();
    },
    () => e
  ];
}, ei = /* @__PURE__ */ de({
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
  setup(t, { expose: e, emit: n }) {
    const s = t, o = {
      initialized: "osInitialized",
      updated: "osUpdated",
      destroyed: "osDestroyed",
      scroll: "osScroll"
    }, { element: c, options: i, events: a, defer: r } = yo(s), d = sn(null), l = sn(null), u = jt(), [f, v] = ti({ options: i, events: u, defer: r });
    return e({
      osInstance: v,
      getElement: () => d.value
    }), bo((p) => {
      const { value: m } = d, { value: P } = l;
      m && (f(
        c.value === "body" ? {
          target: m,
          cancel: {
            body: null
          }
        } : {
          target: m,
          elements: {
            viewport: P,
            content: P
          }
        }
      ), p(() => {
        var w;
        return (w = v()) == null ? void 0 : w.destroy();
      }));
    }), Tt(
      () => xt(a),
      (p) => {
        const m = p || {};
        u.value = Object.keys(o).reduce((P, w) => {
          const D = m[w];
          return P[w] = [
            (...j) => n(
              o[w],
              ...j
            ),
            ...(Array.isArray(D) ? D : [D]).filter(Boolean)
          ], P;
        }, {});
      },
      { deep: !0, immediate: !0 }
    ), (p, m) => ($t(), Xt(go(xt(c)), {
      "data-overlayscrollbars-initialize": "",
      ref_key: "elementRef",
      ref: d
    }, {
      default: H(() => [
        xt(c) === "body" ? tn(p.$slots, "default", { key: 0 }) : ($t(), De("div", {
          key: 1,
          "data-overlayscrollbars-contents": "",
          ref_key: "slotRef",
          ref: l
        }, [
          tn(p.$slots, "default")
        ], 512))
      ]),
      _: 3
    }, 512));
  }
}), ni = /* @__PURE__ */ de({
  __name: "GraphView",
  setup(t) {
    return (e, n) => {
      const s = lt("a-layout-sider"), o = lt("a-layout-content"), c = lt("a-layout");
      return $t(), Xt(c, { class: "h-full" }, {
        default: H(() => [
          V(s, null, {
            default: H(() => [
              ut("Sider")
            ]),
            _: 1
          }),
          V(o, { class: "overflow-y-hidden" }, {
            default: H(() => [
              V(xt(ei), {
                class: "h-full",
                defer: ""
              }, {
                default: H(() => [
                  ($t(), De(So, null, _o(500, (i) => nn("p", { key: i }, [
                    nn("span", null, wo(i), 1)
                  ])), 64))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const oi = /* @__PURE__ */ de({
  __name: "Uni",
  props: {
    lossNo: {}
  },
  setup(t) {
    const e = ms("action", "vehicle");
    return (n, s) => {
      const o = lt("icon-launch"), c = lt("a-button"), i = lt("icon-settings"), a = lt("a-doption"), r = lt("a-dropdown"), d = lt("a-layout-header"), l = lt("a-space"), u = lt("a-tab-pane"), f = lt("a-tabs"), v = lt("a-layout-content"), p = lt("a-layout");
      return $t(), Xt(p, { class: "h-full" }, {
        default: H(() => [
          en("", !0),
          V(v, { class: "overflow-y-hidden" }, {
            default: H(() => [
              V(f, {
                size: "large",
                type: "card",
                "active-key": xt(e),
                "onUpdate:activeKey": s[0] || (s[0] = (m) => ps(e) ? e.value = m : null),
                justify: "",
                animation: ""
              }, {
                extra: H(() => [
                  V(l, null, {
                    default: H(() => [
                      V(c, null, {
                        icon: H(() => [
                          V(o)
                        ]),
                        default: H(() => [
                          ut(" 帮助 ")
                        ]),
                        _: 1
                      }),
                      V(r, { position: "br" }, {
                        content: H(() => [
                          V(a, null, {
                            default: H(() => [
                              ut("Option 1")
                            ]),
                            _: 1
                          }),
                          V(a, null, {
                            default: H(() => [
                              ut("Option 2")
                            ]),
                            _: 1
                          }),
                          V(a, null, {
                            default: H(() => [
                              ut("Option 3")
                            ]),
                            _: 1
                          })
                        ]),
                        default: H(() => [
                          V(c, null, {
                            icon: H(() => [
                              V(i)
                            ]),
                            default: H(() => [
                              ut(" 设置 ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      V(c, { type: "primary" }, {
                        default: H(() => [
                          ut(" 提交 ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                default: H(() => [
                  V(u, {
                    key: "vehicle",
                    title: "定型"
                  }, {
                    default: H(() => [
                      V(Mo)
                    ]),
                    _: 1
                  }),
                  V(u, {
                    key: "graph",
                    title: "图形点选"
                  }, {
                    default: H(() => [
                      V(ni)
                    ]),
                    _: 1
                  }),
                  V(u, {
                    key: "loss",
                    title: "损失项"
                  }, {
                    default: H(() => [
                      V(Xo)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["active-key"])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
export {
  oi as JyUni
};
