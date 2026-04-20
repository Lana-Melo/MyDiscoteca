import {
  NG_VALUE_ACCESSOR
} from "./chunk-I44HUIFA.js";
import "./chunk-WXBQKAHA.js";
import "./chunk-NSZ6RCVS.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  InjectionToken,
  NgModule,
  Optional,
  Renderer2,
  forwardRef,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵlistener,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-LH3QRAJT.js";
import {
  BehaviorSubject
} from "./chunk-KUW5KNZA.js";

// node_modules/@porsche-design-system/components-js/esm/index.mjs
var e = "porscheDesignSystem";
function t() {
  return document[e] || (document[e] = {}), document[e];
}
function n({ script: n2, version: s2, prefix: o2 }) {
  const c2 = (function(e2) {
    const n3 = t(), { [e2]: s3 } = n3;
    if (!s3) {
      let t2 = () => {
      };
      const s4 = new Promise(((e3) => t2 = e3));
      n3[e2] = { isInjected: false, isReady: () => s4, readyResolve: t2, prefixes: [], registerCustomElements: null };
    }
    return n3[e2];
  })(s2), { isInjected: r2, prefixes: i2 = [], registerCustomElements: d2 } = c2, [m2] = Object.entries(t()).filter((([e2, t2]) => e2 !== s2 && "object" == typeof t2 && t2.prefixes.includes(o2)));
  if (m2) throw new Error(`[Porsche Design System v${s2}] prefix '${o2}' is already registered with version '${m2[0]}' of the Porsche Design System. Please use a different one.
Take a look at document.${e} for more details.`);
  r2 || ((function(e2) {
    const t2 = document.createElement("script");
    t2.src = e2, t2.setAttribute("crossorigin", ""), document.body.appendChild(t2);
  })(n2), c2.isInjected = true), i2.includes(o2) || (i2.push(o2), d2 && d2(o2));
}
var s = (e2 = {}) => {
  const t2 = "PORSCHE_DESIGN_SYSTEM_CDN";
  window[t2] = e2.cdn || window[t2] || (window.location.origin.match(/\.cn$/) ? "cn" : "auto");
  const s2 = "porscheDesignSystem";
  document[s2] || (document[s2] = {}), document[s2].cdn = { url: "https://cdn.ui.porsche." + ("cn" === window[t2] ? "cn" : "com"), prefixes: [] }, n({ version: "3.34.0", script: document[s2].cdn.url + "/porsche-design-system/components/porsche-design-system.v3.34.0.c67c99701bfcb095918b.js", prefix: e2.prefix || "" });
};
var o = { loading: 0, interactive: 1, complete: 2 };
var c = (e2 = document.body, t2 = "complete") => {
  let n2;
  const s2 = new Promise(((e3) => n2 = e3)), o2 = () => {
    i().then((() => d(e2, n2)));
  };
  if (r(t2)) o2();
  else {
    const e3 = "readystatechange", n3 = () => {
      r(t2) && (document.removeEventListener(e3, n3), o2());
    };
    document.addEventListener(e3, n3);
  }
  return s2;
};
var r = (e2) => o[document.readyState] >= o[e2];
var i = () => {
  if (document.porscheDesignSystem?.["3.34.0"]?.isReady) return document.porscheDesignSystem["3.34.0"].isReady();
  let e2;
  const t2 = new Promise(((t3) => e2 = t3)), n2 = { set(t3, n3, s2) {
    return "3.34.0" === n3 && s2.isReady().then(e2), Reflect.set(...arguments);
  } };
  return document.porscheDesignSystem = new Proxy(document.porscheDesignSystem || {}, n2), t2;
};
var d = (e2, t2) => {
  const n2 = m(e2);
  Promise.all(n2).then(((e3) => t2(e3.length))).catch(((e3) => console.error("[Porsche Design System]", e3)));
};
var m = (e2) => {
  const t2 = [], n2 = [e2];
  for (; n2.length > 0; ) {
    const e3 = n2.pop();
    e3.nodeType === Node.ELEMENT_NODE && (p(e3) && t2.push(e3.componentOnReady()), n2.push(...Array.from(e3.children)));
  }
  return t2;
};
var u = /^(.*-)?P-(.*)$/;
var p = (e2) => u.test(e2.tagName) && "function" == typeof e2.componentOnReady;

// node_modules/@porsche-design-system/components-angular/fesm2022/porsche-design-system-components-angular.mjs
var _c0 = ["*"];
var THEME_TOKEN = new InjectionToken("pdsTheme");
var BaseComponent = class _BaseComponent {
  el;
  constructor(cdr, elementRef) {
    cdr.detach();
    this.el = elementRef.nativeElement;
  }
  ngOnChanges(props) {
    for (const prop in props) {
      this.el[prop] = props[prop].currentValue;
    }
  }
  static ɵfac = function BaseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseComponent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _BaseComponent,
    selectors: [["ng-component"]],
    features: [ɵɵNgOnChangesFeature],
    decls: 0,
    vars: 0,
    template: function BaseComponent_Template(rf, ctx) {
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseComponent, [{
    type: Component,
    args: [{
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: ElementRef
  }], null);
})();
var BaseComponentWithTheme = class _BaseComponentWithTheme extends BaseComponent {
  theme;
  themeSubscription = inject(THEME_TOKEN).subscribe((theme) => {
    this.el.theme = this.theme || theme;
  });
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵBaseComponentWithTheme_BaseFactory;
    return function BaseComponentWithTheme_Factory(__ngFactoryType__) {
      return (ɵBaseComponentWithTheme_BaseFactory || (ɵBaseComponentWithTheme_BaseFactory = ɵɵgetInheritedFactory(_BaseComponentWithTheme)))(__ngFactoryType__ || _BaseComponentWithTheme);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _BaseComponentWithTheme,
    selectors: [["ng-component"]],
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function BaseComponentWithTheme_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseComponentWithTheme, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], null, null);
})();
var PAccordion = class _PAccordion extends BaseComponentWithTheme {
  compact;
  heading;
  headingTag;
  open;
  size;
  sticky;
  /** @deprecated */
  tag;
  theme;
  /** @deprecated */
  accordionChange = new EventEmitter();
  update = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPAccordion_BaseFactory;
    return function PAccordion_Factory(__ngFactoryType__) {
      return (ɵPAccordion_BaseFactory || (ɵPAccordion_BaseFactory = ɵɵgetInheritedFactory(_PAccordion)))(__ngFactoryType__ || _PAccordion);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PAccordion,
    selectors: [["p-accordion"], ["", "p-accordion", ""]],
    inputs: {
      compact: "compact",
      heading: "heading",
      headingTag: "headingTag",
      open: "open",
      size: "size",
      sticky: "sticky",
      tag: "tag",
      theme: "theme"
    },
    outputs: {
      accordionChange: "accordionChange",
      update: "update"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PAccordion_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PAccordion, [{
    type: Component,
    args: [{
      selector: "p-accordion,[p-accordion]",
      template: "<ng-content />",
      inputs: ["compact", "heading", "headingTag", "open", "size", "sticky", "tag", "theme"],
      outputs: ["accordionChange", "update"],
      standalone: false
    }]
  }], null, null);
})();
var PBanner = class _PBanner extends BaseComponentWithTheme {
  description;
  dismissButton;
  heading;
  headingTag;
  open;
  /** @deprecated */
  persistent;
  state;
  theme;
  /** @deprecated */
  width;
  dismiss = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPBanner_BaseFactory;
    return function PBanner_Factory(__ngFactoryType__) {
      return (ɵPBanner_BaseFactory || (ɵPBanner_BaseFactory = ɵɵgetInheritedFactory(_PBanner)))(__ngFactoryType__ || _PBanner);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PBanner,
    selectors: [["p-banner"], ["", "p-banner", ""]],
    inputs: {
      description: "description",
      dismissButton: "dismissButton",
      heading: "heading",
      headingTag: "headingTag",
      open: "open",
      persistent: "persistent",
      state: "state",
      theme: "theme",
      width: "width"
    },
    outputs: {
      dismiss: "dismiss"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PBanner_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PBanner, [{
    type: Component,
    args: [{
      selector: "p-banner,[p-banner]",
      template: "<ng-content />",
      inputs: ["description", "dismissButton", "heading", "headingTag", "open", "persistent", "state", "theme", "width"],
      outputs: ["dismiss"],
      standalone: false
    }]
  }], null, null);
})();
var PButton = class _PButton extends BaseComponentWithTheme {
  aria;
  compact;
  disabled;
  form;
  hideLabel;
  icon;
  iconSource;
  loading;
  name;
  theme;
  type;
  value;
  variant;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPButton_BaseFactory;
    return function PButton_Factory(__ngFactoryType__) {
      return (ɵPButton_BaseFactory || (ɵPButton_BaseFactory = ɵɵgetInheritedFactory(_PButton)))(__ngFactoryType__ || _PButton);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PButton,
    selectors: [["p-button"], ["", "p-button", ""]],
    inputs: {
      aria: "aria",
      compact: "compact",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      icon: "icon",
      iconSource: "iconSource",
      loading: "loading",
      name: "name",
      theme: "theme",
      type: "type",
      value: "value",
      variant: "variant"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PButton_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PButton, [{
    type: Component,
    args: [{
      selector: "p-button,[p-button]",
      template: "<ng-content />",
      inputs: ["aria", "compact", "disabled", "form", "hideLabel", "icon", "iconSource", "loading", "name", "theme", "type", "value", "variant"],
      standalone: false
    }]
  }], null, null);
})();
var PButtonGroup = class _PButtonGroup extends BaseComponent {
  direction;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPButtonGroup_BaseFactory;
    return function PButtonGroup_Factory(__ngFactoryType__) {
      return (ɵPButtonGroup_BaseFactory || (ɵPButtonGroup_BaseFactory = ɵɵgetInheritedFactory(_PButtonGroup)))(__ngFactoryType__ || _PButtonGroup);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PButtonGroup,
    selectors: [["p-button-group"], ["", "p-button-group", ""]],
    inputs: {
      direction: "direction"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PButtonGroup_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PButtonGroup, [{
    type: Component,
    args: [{
      selector: "p-button-group,[p-button-group]",
      template: "<ng-content />",
      inputs: ["direction"],
      standalone: false
    }]
  }], null, null);
})();
var PButtonPure = class _PButtonPure extends BaseComponentWithTheme {
  active;
  alignLabel;
  aria;
  disabled;
  form;
  hideLabel;
  icon;
  iconSource;
  loading;
  name;
  size;
  stretch;
  theme;
  type;
  underline;
  value;
  /** @deprecated */
  weight;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPButtonPure_BaseFactory;
    return function PButtonPure_Factory(__ngFactoryType__) {
      return (ɵPButtonPure_BaseFactory || (ɵPButtonPure_BaseFactory = ɵɵgetInheritedFactory(_PButtonPure)))(__ngFactoryType__ || _PButtonPure);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PButtonPure,
    selectors: [["p-button-pure"], ["", "p-button-pure", ""]],
    inputs: {
      active: "active",
      alignLabel: "alignLabel",
      aria: "aria",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      icon: "icon",
      iconSource: "iconSource",
      loading: "loading",
      name: "name",
      size: "size",
      stretch: "stretch",
      theme: "theme",
      type: "type",
      underline: "underline",
      value: "value",
      weight: "weight"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PButtonPure_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PButtonPure, [{
    type: Component,
    args: [{
      selector: "p-button-pure,[p-button-pure]",
      template: "<ng-content />",
      inputs: ["active", "alignLabel", "aria", "disabled", "form", "hideLabel", "icon", "iconSource", "loading", "name", "size", "stretch", "theme", "type", "underline", "value", "weight"],
      standalone: false
    }]
  }], null, null);
})();
var PButtonTile = class _PButtonTile extends BaseComponent {
  align;
  aria;
  aspectRatio;
  background;
  compact;
  description;
  disabled;
  gradient;
  icon;
  iconSource;
  label;
  loading;
  size;
  type;
  weight;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPButtonTile_BaseFactory;
    return function PButtonTile_Factory(__ngFactoryType__) {
      return (ɵPButtonTile_BaseFactory || (ɵPButtonTile_BaseFactory = ɵɵgetInheritedFactory(_PButtonTile)))(__ngFactoryType__ || _PButtonTile);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PButtonTile,
    selectors: [["p-button-tile"], ["", "p-button-tile", ""]],
    inputs: {
      align: "align",
      aria: "aria",
      aspectRatio: "aspectRatio",
      background: "background",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      gradient: "gradient",
      icon: "icon",
      iconSource: "iconSource",
      label: "label",
      loading: "loading",
      size: "size",
      type: "type",
      weight: "weight"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PButtonTile_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PButtonTile, [{
    type: Component,
    args: [{
      selector: "p-button-tile,[p-button-tile]",
      template: "<ng-content />",
      inputs: ["align", "aria", "aspectRatio", "background", "compact", "description", "disabled", "gradient", "icon", "iconSource", "label", "loading", "size", "type", "weight"],
      standalone: false
    }]
  }], null, null);
})();
var PCanvas = class _PCanvas extends BaseComponentWithTheme {
  sidebarEndOpen;
  sidebarStartOpen;
  theme;
  sidebarEndDismiss = new EventEmitter();
  sidebarStartUpdate = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPCanvas_BaseFactory;
    return function PCanvas_Factory(__ngFactoryType__) {
      return (ɵPCanvas_BaseFactory || (ɵPCanvas_BaseFactory = ɵɵgetInheritedFactory(_PCanvas)))(__ngFactoryType__ || _PCanvas);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PCanvas,
    selectors: [["p-canvas"], ["", "p-canvas", ""]],
    inputs: {
      sidebarEndOpen: "sidebarEndOpen",
      sidebarStartOpen: "sidebarStartOpen",
      theme: "theme"
    },
    outputs: {
      sidebarEndDismiss: "sidebarEndDismiss",
      sidebarStartUpdate: "sidebarStartUpdate"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PCanvas_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PCanvas, [{
    type: Component,
    args: [{
      selector: "p-canvas,[p-canvas]",
      template: "<ng-content />",
      inputs: ["sidebarEndOpen", "sidebarStartOpen", "theme"],
      outputs: ["sidebarEndDismiss", "sidebarStartUpdate"],
      standalone: false
    }]
  }], null, null);
})();
var PCarousel = class _PCarousel extends BaseComponentWithTheme {
  activeSlideIndex;
  alignControls;
  alignHeader;
  aria;
  description;
  /** @deprecated */
  disablePagination;
  focusOnCenterSlide;
  gradientColor;
  heading;
  headingSize;
  intl;
  pagination;
  rewind;
  skipLinkTarget;
  slidesPerPage;
  theme;
  trimSpace;
  width;
  /** @deprecated */
  wrapContent;
  /** @deprecated */
  carouselChange = new EventEmitter();
  update = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPCarousel_BaseFactory;
    return function PCarousel_Factory(__ngFactoryType__) {
      return (ɵPCarousel_BaseFactory || (ɵPCarousel_BaseFactory = ɵɵgetInheritedFactory(_PCarousel)))(__ngFactoryType__ || _PCarousel);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PCarousel,
    selectors: [["p-carousel"], ["", "p-carousel", ""]],
    inputs: {
      activeSlideIndex: "activeSlideIndex",
      alignControls: "alignControls",
      alignHeader: "alignHeader",
      aria: "aria",
      description: "description",
      disablePagination: "disablePagination",
      focusOnCenterSlide: "focusOnCenterSlide",
      gradientColor: "gradientColor",
      heading: "heading",
      headingSize: "headingSize",
      intl: "intl",
      pagination: "pagination",
      rewind: "rewind",
      skipLinkTarget: "skipLinkTarget",
      slidesPerPage: "slidesPerPage",
      theme: "theme",
      trimSpace: "trimSpace",
      width: "width",
      wrapContent: "wrapContent"
    },
    outputs: {
      carouselChange: "carouselChange",
      update: "update"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PCarousel_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PCarousel, [{
    type: Component,
    args: [{
      selector: "p-carousel,[p-carousel]",
      template: "<ng-content />",
      inputs: ["activeSlideIndex", "alignControls", "alignHeader", "aria", "description", "disablePagination", "focusOnCenterSlide", "gradientColor", "heading", "headingSize", "intl", "pagination", "rewind", "skipLinkTarget", "slidesPerPage", "theme", "trimSpace", "width", "wrapContent"],
      outputs: ["carouselChange", "update"],
      standalone: false
    }]
  }], null, null);
})();
var PCheckbox = class _PCheckbox extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  checked;
  compact;
  disabled;
  form;
  hideLabel;
  indeterminate;
  label;
  loading;
  message;
  name;
  required;
  state;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  /** @deprecated */
  update = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "checked", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PCheckbox_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PCheckbox)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PCheckbox,
    selectors: [["p-checkbox"], ["", "p-checkbox", ""]],
    hostBindings: function PCheckbox_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("change", function PCheckbox_change_HostBindingHandler($event) {
          return ctx._onChange($event.target.checked);
        })("blur", function PCheckbox_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      checked: "checked",
      compact: "compact",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      indeterminate: "indeterminate",
      label: "label",
      loading: "loading",
      message: "message",
      name: "name",
      required: "required",
      state: "state",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      update: "update"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PCheckbox),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PCheckbox_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PCheckbox, [{
    type: Component,
    args: [{
      selector: "p-checkbox,[p-checkbox]",
      template: "<ng-content />",
      inputs: ["checked", "compact", "disabled", "form", "hideLabel", "indeterminate", "label", "loading", "message", "name", "required", "state", "theme", "value"],
      outputs: ["blur", "change", "update"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PCheckbox),
        multi: true
      }],
      host: {
        "(change)": "_onChange($event.target.checked)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PCheckboxWrapper = class _PCheckboxWrapper extends BaseComponentWithTheme {
  hideLabel;
  label;
  loading;
  message;
  state;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPCheckboxWrapper_BaseFactory;
    return function PCheckboxWrapper_Factory(__ngFactoryType__) {
      return (ɵPCheckboxWrapper_BaseFactory || (ɵPCheckboxWrapper_BaseFactory = ɵɵgetInheritedFactory(_PCheckboxWrapper)))(__ngFactoryType__ || _PCheckboxWrapper);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PCheckboxWrapper,
    selectors: [["p-checkbox-wrapper"], ["", "p-checkbox-wrapper", ""]],
    inputs: {
      hideLabel: "hideLabel",
      label: "label",
      loading: "loading",
      message: "message",
      state: "state",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PCheckboxWrapper_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PCheckboxWrapper, [{
    type: Component,
    args: [{
      selector: "p-checkbox-wrapper,[p-checkbox-wrapper]",
      template: "<ng-content />",
      inputs: ["hideLabel", "label", "loading", "message", "state", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PContentWrapper = class _PContentWrapper extends BaseComponentWithTheme {
  /** @deprecated */
  backgroundColor;
  /** @deprecated */
  theme;
  width;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPContentWrapper_BaseFactory;
    return function PContentWrapper_Factory(__ngFactoryType__) {
      return (ɵPContentWrapper_BaseFactory || (ɵPContentWrapper_BaseFactory = ɵɵgetInheritedFactory(_PContentWrapper)))(__ngFactoryType__ || _PContentWrapper);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PContentWrapper,
    selectors: [["p-content-wrapper"], ["", "p-content-wrapper", ""]],
    inputs: {
      backgroundColor: "backgroundColor",
      theme: "theme",
      width: "width"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PContentWrapper_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PContentWrapper, [{
    type: Component,
    args: [{
      selector: "p-content-wrapper,[p-content-wrapper]",
      template: "<ng-content />",
      inputs: ["backgroundColor", "theme", "width"],
      standalone: false
    }]
  }], null, null);
})();
var PCrest = class _PCrest extends BaseComponent {
  aria;
  href;
  target;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPCrest_BaseFactory;
    return function PCrest_Factory(__ngFactoryType__) {
      return (ɵPCrest_BaseFactory || (ɵPCrest_BaseFactory = ɵɵgetInheritedFactory(_PCrest)))(__ngFactoryType__ || _PCrest);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PCrest,
    selectors: [["p-crest"], ["", "p-crest", ""]],
    inputs: {
      aria: "aria",
      href: "href",
      target: "target"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PCrest_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PCrest, [{
    type: Component,
    args: [{
      selector: "p-crest,[p-crest]",
      template: "<ng-content />",
      inputs: ["aria", "href", "target"],
      standalone: false
    }]
  }], null, null);
})();
var PDisplay = class _PDisplay extends BaseComponentWithTheme {
  align;
  color;
  ellipsis;
  size;
  tag;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPDisplay_BaseFactory;
    return function PDisplay_Factory(__ngFactoryType__) {
      return (ɵPDisplay_BaseFactory || (ɵPDisplay_BaseFactory = ɵɵgetInheritedFactory(_PDisplay)))(__ngFactoryType__ || _PDisplay);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PDisplay,
    selectors: [["p-display"], ["", "p-display", ""]],
    inputs: {
      align: "align",
      color: "color",
      ellipsis: "ellipsis",
      size: "size",
      tag: "tag",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PDisplay_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PDisplay, [{
    type: Component,
    args: [{
      selector: "p-display,[p-display]",
      template: "<ng-content />",
      inputs: ["align", "color", "ellipsis", "size", "tag", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PDivider = class _PDivider extends BaseComponentWithTheme {
  color;
  direction;
  /** @deprecated */
  orientation;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPDivider_BaseFactory;
    return function PDivider_Factory(__ngFactoryType__) {
      return (ɵPDivider_BaseFactory || (ɵPDivider_BaseFactory = ɵɵgetInheritedFactory(_PDivider)))(__ngFactoryType__ || _PDivider);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PDivider,
    selectors: [["p-divider"], ["", "p-divider", ""]],
    inputs: {
      color: "color",
      direction: "direction",
      orientation: "orientation",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PDivider_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PDivider, [{
    type: Component,
    args: [{
      selector: "p-divider,[p-divider]",
      template: "<ng-content />",
      inputs: ["color", "direction", "orientation", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PDrilldown = class _PDrilldown extends BaseComponentWithTheme {
  activeIdentifier;
  aria;
  open;
  theme;
  dismiss = new EventEmitter();
  update = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPDrilldown_BaseFactory;
    return function PDrilldown_Factory(__ngFactoryType__) {
      return (ɵPDrilldown_BaseFactory || (ɵPDrilldown_BaseFactory = ɵɵgetInheritedFactory(_PDrilldown)))(__ngFactoryType__ || _PDrilldown);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PDrilldown,
    selectors: [["p-drilldown"], ["", "p-drilldown", ""]],
    inputs: {
      activeIdentifier: "activeIdentifier",
      aria: "aria",
      open: "open",
      theme: "theme"
    },
    outputs: {
      dismiss: "dismiss",
      update: "update"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PDrilldown_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PDrilldown, [{
    type: Component,
    args: [{
      selector: "p-drilldown,[p-drilldown]",
      template: "<ng-content />",
      inputs: ["activeIdentifier", "aria", "open", "theme"],
      outputs: ["dismiss", "update"],
      standalone: false
    }]
  }], null, null);
})();
var PDrilldownItem = class _PDrilldownItem extends BaseComponent {
  cascade;
  identifier;
  label;
  primary;
  secondary;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPDrilldownItem_BaseFactory;
    return function PDrilldownItem_Factory(__ngFactoryType__) {
      return (ɵPDrilldownItem_BaseFactory || (ɵPDrilldownItem_BaseFactory = ɵɵgetInheritedFactory(_PDrilldownItem)))(__ngFactoryType__ || _PDrilldownItem);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PDrilldownItem,
    selectors: [["p-drilldown-item"], ["", "p-drilldown-item", ""]],
    inputs: {
      cascade: "cascade",
      identifier: "identifier",
      label: "label",
      primary: "primary",
      secondary: "secondary"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PDrilldownItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PDrilldownItem, [{
    type: Component,
    args: [{
      selector: "p-drilldown-item,[p-drilldown-item]",
      template: "<ng-content />",
      inputs: ["cascade", "identifier", "label", "primary", "secondary"],
      standalone: false
    }]
  }], null, null);
})();
var PDrilldownLink = class _PDrilldownLink extends BaseComponent {
  active;
  aria;
  download;
  href;
  rel;
  target;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPDrilldownLink_BaseFactory;
    return function PDrilldownLink_Factory(__ngFactoryType__) {
      return (ɵPDrilldownLink_BaseFactory || (ɵPDrilldownLink_BaseFactory = ɵɵgetInheritedFactory(_PDrilldownLink)))(__ngFactoryType__ || _PDrilldownLink);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PDrilldownLink,
    selectors: [["p-drilldown-link"], ["", "p-drilldown-link", ""]],
    inputs: {
      active: "active",
      aria: "aria",
      download: "download",
      href: "href",
      rel: "rel",
      target: "target"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PDrilldownLink_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PDrilldownLink, [{
    type: Component,
    args: [{
      selector: "p-drilldown-link,[p-drilldown-link]",
      template: "<ng-content />",
      inputs: ["active", "aria", "download", "href", "rel", "target"],
      standalone: false
    }]
  }], null, null);
})();
var PFieldset = class _PFieldset extends BaseComponentWithTheme {
  aria;
  label;
  labelSize;
  message;
  required;
  state;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPFieldset_BaseFactory;
    return function PFieldset_Factory(__ngFactoryType__) {
      return (ɵPFieldset_BaseFactory || (ɵPFieldset_BaseFactory = ɵɵgetInheritedFactory(_PFieldset)))(__ngFactoryType__ || _PFieldset);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PFieldset,
    selectors: [["p-fieldset"], ["", "p-fieldset", ""]],
    inputs: {
      aria: "aria",
      label: "label",
      labelSize: "labelSize",
      message: "message",
      required: "required",
      state: "state",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PFieldset_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PFieldset, [{
    type: Component,
    args: [{
      selector: "p-fieldset,[p-fieldset]",
      template: "<ng-content />",
      inputs: ["aria", "label", "labelSize", "message", "required", "state", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PFieldsetWrapper = class _PFieldsetWrapper extends BaseComponentWithTheme {
  label;
  labelSize;
  message;
  required;
  state;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPFieldsetWrapper_BaseFactory;
    return function PFieldsetWrapper_Factory(__ngFactoryType__) {
      return (ɵPFieldsetWrapper_BaseFactory || (ɵPFieldsetWrapper_BaseFactory = ɵɵgetInheritedFactory(_PFieldsetWrapper)))(__ngFactoryType__ || _PFieldsetWrapper);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PFieldsetWrapper,
    selectors: [["p-fieldset-wrapper"], ["", "p-fieldset-wrapper", ""]],
    inputs: {
      label: "label",
      labelSize: "labelSize",
      message: "message",
      required: "required",
      state: "state",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PFieldsetWrapper_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PFieldsetWrapper, [{
    type: Component,
    args: [{
      selector: "p-fieldset-wrapper,[p-fieldset-wrapper]",
      template: "<ng-content />",
      inputs: ["label", "labelSize", "message", "required", "state", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PFlag = class _PFlag extends BaseComponent {
  aria;
  name;
  size;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPFlag_BaseFactory;
    return function PFlag_Factory(__ngFactoryType__) {
      return (ɵPFlag_BaseFactory || (ɵPFlag_BaseFactory = ɵɵgetInheritedFactory(_PFlag)))(__ngFactoryType__ || _PFlag);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PFlag,
    selectors: [["p-flag"], ["", "p-flag", ""]],
    inputs: {
      aria: "aria",
      name: "name",
      size: "size"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PFlag_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PFlag, [{
    type: Component,
    args: [{
      selector: "p-flag,[p-flag]",
      template: "<ng-content />",
      inputs: ["aria", "name", "size"],
      standalone: false
    }]
  }], null, null);
})();
var PFlex = class _PFlex extends BaseComponent {
  alignContent;
  alignItems;
  direction;
  inline;
  justifyContent;
  wrap;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPFlex_BaseFactory;
    return function PFlex_Factory(__ngFactoryType__) {
      return (ɵPFlex_BaseFactory || (ɵPFlex_BaseFactory = ɵɵgetInheritedFactory(_PFlex)))(__ngFactoryType__ || _PFlex);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PFlex,
    selectors: [["p-flex"], ["", "p-flex", ""]],
    inputs: {
      alignContent: "alignContent",
      alignItems: "alignItems",
      direction: "direction",
      inline: "inline",
      justifyContent: "justifyContent",
      wrap: "wrap"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PFlex_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PFlex, [{
    type: Component,
    args: [{
      selector: "p-flex,[p-flex]",
      template: "<ng-content />",
      inputs: ["alignContent", "alignItems", "direction", "inline", "justifyContent", "wrap"],
      standalone: false
    }]
  }], null, null);
})();
var PFlexItem = class _PFlexItem extends BaseComponent {
  alignSelf;
  flex;
  grow;
  offset;
  shrink;
  width;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPFlexItem_BaseFactory;
    return function PFlexItem_Factory(__ngFactoryType__) {
      return (ɵPFlexItem_BaseFactory || (ɵPFlexItem_BaseFactory = ɵɵgetInheritedFactory(_PFlexItem)))(__ngFactoryType__ || _PFlexItem);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PFlexItem,
    selectors: [["p-flex-item"], ["", "p-flex-item", ""]],
    inputs: {
      alignSelf: "alignSelf",
      flex: "flex",
      grow: "grow",
      offset: "offset",
      shrink: "shrink",
      width: "width"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PFlexItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PFlexItem, [{
    type: Component,
    args: [{
      selector: "p-flex-item,[p-flex-item]",
      template: "<ng-content />",
      inputs: ["alignSelf", "flex", "grow", "offset", "shrink", "width"],
      standalone: false
    }]
  }], null, null);
})();
var PFlyout = class _PFlyout extends BaseComponentWithTheme {
  aria;
  backdrop;
  disableBackdropClick;
  footerBehavior;
  open;
  position;
  theme;
  dismiss = new EventEmitter();
  motionHiddenEnd = new EventEmitter();
  motionVisibleEnd = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPFlyout_BaseFactory;
    return function PFlyout_Factory(__ngFactoryType__) {
      return (ɵPFlyout_BaseFactory || (ɵPFlyout_BaseFactory = ɵɵgetInheritedFactory(_PFlyout)))(__ngFactoryType__ || _PFlyout);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PFlyout,
    selectors: [["p-flyout"], ["", "p-flyout", ""]],
    inputs: {
      aria: "aria",
      backdrop: "backdrop",
      disableBackdropClick: "disableBackdropClick",
      footerBehavior: "footerBehavior",
      open: "open",
      position: "position",
      theme: "theme"
    },
    outputs: {
      dismiss: "dismiss",
      motionHiddenEnd: "motionHiddenEnd",
      motionVisibleEnd: "motionVisibleEnd"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PFlyout_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PFlyout, [{
    type: Component,
    args: [{
      selector: "p-flyout,[p-flyout]",
      template: "<ng-content />",
      inputs: ["aria", "backdrop", "disableBackdropClick", "footerBehavior", "open", "position", "theme"],
      outputs: ["dismiss", "motionHiddenEnd", "motionVisibleEnd"],
      standalone: false
    }]
  }], null, null);
})();
var PGrid = class _PGrid extends BaseComponent {
  direction;
  /** @deprecated */
  gutter;
  wrap;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPGrid_BaseFactory;
    return function PGrid_Factory(__ngFactoryType__) {
      return (ɵPGrid_BaseFactory || (ɵPGrid_BaseFactory = ɵɵgetInheritedFactory(_PGrid)))(__ngFactoryType__ || _PGrid);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PGrid,
    selectors: [["p-grid"], ["", "p-grid", ""]],
    inputs: {
      direction: "direction",
      gutter: "gutter",
      wrap: "wrap"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PGrid_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PGrid, [{
    type: Component,
    args: [{
      selector: "p-grid,[p-grid]",
      template: "<ng-content />",
      inputs: ["direction", "gutter", "wrap"],
      standalone: false
    }]
  }], null, null);
})();
var PGridItem = class _PGridItem extends BaseComponent {
  offset;
  size;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPGridItem_BaseFactory;
    return function PGridItem_Factory(__ngFactoryType__) {
      return (ɵPGridItem_BaseFactory || (ɵPGridItem_BaseFactory = ɵɵgetInheritedFactory(_PGridItem)))(__ngFactoryType__ || _PGridItem);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PGridItem,
    selectors: [["p-grid-item"], ["", "p-grid-item", ""]],
    inputs: {
      offset: "offset",
      size: "size"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PGridItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PGridItem, [{
    type: Component,
    args: [{
      selector: "p-grid-item,[p-grid-item]",
      template: "<ng-content />",
      inputs: ["offset", "size"],
      standalone: false
    }]
  }], null, null);
})();
var PHeading = class _PHeading extends BaseComponentWithTheme {
  align;
  color;
  ellipsis;
  size;
  tag;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPHeading_BaseFactory;
    return function PHeading_Factory(__ngFactoryType__) {
      return (ɵPHeading_BaseFactory || (ɵPHeading_BaseFactory = ɵɵgetInheritedFactory(_PHeading)))(__ngFactoryType__ || _PHeading);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PHeading,
    selectors: [["p-heading"], ["", "p-heading", ""]],
    inputs: {
      align: "align",
      color: "color",
      ellipsis: "ellipsis",
      size: "size",
      tag: "tag",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PHeading_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PHeading, [{
    type: Component,
    args: [{
      selector: "p-heading,[p-heading]",
      template: "<ng-content />",
      inputs: ["align", "color", "ellipsis", "size", "tag", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PHeadline = class _PHeadline extends BaseComponentWithTheme {
  align;
  color;
  ellipsis;
  tag;
  theme;
  variant;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPHeadline_BaseFactory;
    return function PHeadline_Factory(__ngFactoryType__) {
      return (ɵPHeadline_BaseFactory || (ɵPHeadline_BaseFactory = ɵɵgetInheritedFactory(_PHeadline)))(__ngFactoryType__ || _PHeadline);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PHeadline,
    selectors: [["p-headline"], ["", "p-headline", ""]],
    inputs: {
      align: "align",
      color: "color",
      ellipsis: "ellipsis",
      tag: "tag",
      theme: "theme",
      variant: "variant"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PHeadline_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PHeadline, [{
    type: Component,
    args: [{
      selector: "p-headline,[p-headline]",
      template: "<ng-content />",
      inputs: ["align", "color", "ellipsis", "tag", "theme", "variant"],
      standalone: false
    }]
  }], null, null);
})();
var PIcon = class _PIcon extends BaseComponentWithTheme {
  aria;
  color;
  /** @deprecated */
  lazy;
  name;
  size;
  source;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPIcon_BaseFactory;
    return function PIcon_Factory(__ngFactoryType__) {
      return (ɵPIcon_BaseFactory || (ɵPIcon_BaseFactory = ɵɵgetInheritedFactory(_PIcon)))(__ngFactoryType__ || _PIcon);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PIcon,
    selectors: [["p-icon"], ["", "p-icon", ""]],
    inputs: {
      aria: "aria",
      color: "color",
      lazy: "lazy",
      name: "name",
      size: "size",
      source: "source",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PIcon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PIcon, [{
    type: Component,
    args: [{
      selector: "p-icon,[p-icon]",
      template: "<ng-content />",
      inputs: ["aria", "color", "lazy", "name", "size", "source", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PInlineNotification = class _PInlineNotification extends BaseComponentWithTheme {
  actionIcon;
  actionLabel;
  actionLoading;
  description;
  dismissButton;
  heading;
  headingTag;
  /** @deprecated */
  persistent;
  state;
  theme;
  action = new EventEmitter();
  dismiss = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPInlineNotification_BaseFactory;
    return function PInlineNotification_Factory(__ngFactoryType__) {
      return (ɵPInlineNotification_BaseFactory || (ɵPInlineNotification_BaseFactory = ɵɵgetInheritedFactory(_PInlineNotification)))(__ngFactoryType__ || _PInlineNotification);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PInlineNotification,
    selectors: [["p-inline-notification"], ["", "p-inline-notification", ""]],
    inputs: {
      actionIcon: "actionIcon",
      actionLabel: "actionLabel",
      actionLoading: "actionLoading",
      description: "description",
      dismissButton: "dismissButton",
      heading: "heading",
      headingTag: "headingTag",
      persistent: "persistent",
      state: "state",
      theme: "theme"
    },
    outputs: {
      action: "action",
      dismiss: "dismiss"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInlineNotification_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInlineNotification, [{
    type: Component,
    args: [{
      selector: "p-inline-notification,[p-inline-notification]",
      template: "<ng-content />",
      inputs: ["actionIcon", "actionLabel", "actionLoading", "description", "dismissButton", "heading", "headingTag", "persistent", "state", "theme"],
      outputs: ["action", "dismiss"],
      standalone: false
    }]
  }], null, null);
})();
var PInputDate = class _PInputDate extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  label;
  loading;
  max;
  message;
  min;
  name;
  readOnly;
  required;
  state;
  step;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputDate_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputDate)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputDate,
    selectors: [["p-input-date"], ["", "p-input-date", ""]],
    hostBindings: function PInputDate_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputDate_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputDate_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      loading: "loading",
      max: "max",
      message: "message",
      min: "min",
      name: "name",
      readOnly: "readOnly",
      required: "required",
      state: "state",
      step: "step",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputDate),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputDate_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputDate, [{
    type: Component,
    args: [{
      selector: "p-input-date,[p-input-date]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "description", "disabled", "form", "hideLabel", "label", "loading", "max", "message", "min", "name", "readOnly", "required", "state", "step", "theme", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputDate),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PInputEmail = class _PInputEmail extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  indicator;
  label;
  loading;
  maxLength;
  message;
  minLength;
  multiple;
  name;
  pattern;
  placeholder;
  readOnly;
  required;
  state;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputEmail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputEmail)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputEmail,
    selectors: [["p-input-email"], ["", "p-input-email", ""]],
    hostBindings: function PInputEmail_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputEmail_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputEmail_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      indicator: "indicator",
      label: "label",
      loading: "loading",
      maxLength: "maxLength",
      message: "message",
      minLength: "minLength",
      multiple: "multiple",
      name: "name",
      pattern: "pattern",
      placeholder: "placeholder",
      readOnly: "readOnly",
      required: "required",
      state: "state",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputEmail),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputEmail_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputEmail, [{
    type: Component,
    args: [{
      selector: "p-input-email,[p-input-email]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "description", "disabled", "form", "hideLabel", "indicator", "label", "loading", "maxLength", "message", "minLength", "multiple", "name", "pattern", "placeholder", "readOnly", "required", "state", "theme", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputEmail),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PInputMonth = class _PInputMonth extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  label;
  loading;
  max;
  message;
  min;
  name;
  readOnly;
  required;
  state;
  step;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputMonth_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputMonth)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputMonth,
    selectors: [["p-input-month"], ["", "p-input-month", ""]],
    hostBindings: function PInputMonth_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputMonth_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputMonth_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      loading: "loading",
      max: "max",
      message: "message",
      min: "min",
      name: "name",
      readOnly: "readOnly",
      required: "required",
      state: "state",
      step: "step",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputMonth),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputMonth_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputMonth, [{
    type: Component,
    args: [{
      selector: "p-input-month,[p-input-month]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "description", "disabled", "form", "hideLabel", "label", "loading", "max", "message", "min", "name", "readOnly", "required", "state", "step", "theme", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputMonth),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PInputNumber = class _PInputNumber extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  controls;
  description;
  disabled;
  form;
  hideLabel;
  label;
  loading;
  max;
  message;
  min;
  name;
  placeholder;
  readOnly;
  required;
  state;
  step;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputNumber_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputNumber)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputNumber,
    selectors: [["p-input-number"], ["", "p-input-number", ""]],
    hostBindings: function PInputNumber_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputNumber_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputNumber_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      controls: "controls",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      loading: "loading",
      max: "max",
      message: "message",
      min: "min",
      name: "name",
      placeholder: "placeholder",
      readOnly: "readOnly",
      required: "required",
      state: "state",
      step: "step",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputNumber),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputNumber_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputNumber, [{
    type: Component,
    args: [{
      selector: "p-input-number,[p-input-number]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "controls", "description", "disabled", "form", "hideLabel", "label", "loading", "max", "message", "min", "name", "placeholder", "readOnly", "required", "state", "step", "theme", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputNumber),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PInputPassword = class _PInputPassword extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  label;
  loading;
  maxLength;
  message;
  minLength;
  name;
  placeholder;
  readOnly;
  required;
  state;
  theme;
  toggle;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputPassword_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputPassword)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputPassword,
    selectors: [["p-input-password"], ["", "p-input-password", ""]],
    hostBindings: function PInputPassword_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputPassword_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputPassword_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      loading: "loading",
      maxLength: "maxLength",
      message: "message",
      minLength: "minLength",
      name: "name",
      placeholder: "placeholder",
      readOnly: "readOnly",
      required: "required",
      state: "state",
      theme: "theme",
      toggle: "toggle",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputPassword),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputPassword_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputPassword, [{
    type: Component,
    args: [{
      selector: "p-input-password,[p-input-password]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "description", "disabled", "form", "hideLabel", "label", "loading", "maxLength", "message", "minLength", "name", "placeholder", "readOnly", "required", "state", "theme", "toggle", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputPassword),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PInputSearch = class _PInputSearch extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  clear;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  indicator;
  label;
  loading;
  maxLength;
  message;
  minLength;
  name;
  placeholder;
  readOnly;
  required;
  state;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputSearch_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputSearch)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputSearch,
    selectors: [["p-input-search"], ["", "p-input-search", ""]],
    hostBindings: function PInputSearch_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputSearch_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputSearch_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      clear: "clear",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      indicator: "indicator",
      label: "label",
      loading: "loading",
      maxLength: "maxLength",
      message: "message",
      minLength: "minLength",
      name: "name",
      placeholder: "placeholder",
      readOnly: "readOnly",
      required: "required",
      state: "state",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputSearch),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputSearch_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputSearch, [{
    type: Component,
    args: [{
      selector: "p-input-search,[p-input-search]",
      template: "<ng-content />",
      inputs: ["autoComplete", "clear", "compact", "description", "disabled", "form", "hideLabel", "indicator", "label", "loading", "maxLength", "message", "minLength", "name", "placeholder", "readOnly", "required", "state", "theme", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputSearch),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PInputTel = class _PInputTel extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  indicator;
  label;
  loading;
  maxLength;
  message;
  minLength;
  name;
  pattern;
  placeholder;
  readOnly;
  required;
  state;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputTel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputTel)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputTel,
    selectors: [["p-input-tel"], ["", "p-input-tel", ""]],
    hostBindings: function PInputTel_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputTel_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputTel_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      indicator: "indicator",
      label: "label",
      loading: "loading",
      maxLength: "maxLength",
      message: "message",
      minLength: "minLength",
      name: "name",
      pattern: "pattern",
      placeholder: "placeholder",
      readOnly: "readOnly",
      required: "required",
      state: "state",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputTel),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputTel_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputTel, [{
    type: Component,
    args: [{
      selector: "p-input-tel,[p-input-tel]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "description", "disabled", "form", "hideLabel", "indicator", "label", "loading", "maxLength", "message", "minLength", "name", "pattern", "placeholder", "readOnly", "required", "state", "theme", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputTel),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PInputText = class _PInputText extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  counter;
  description;
  disabled;
  form;
  hideLabel;
  label;
  loading;
  maxLength;
  message;
  minLength;
  name;
  placeholder;
  readOnly;
  required;
  spellCheck;
  state;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputText_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputText)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputText,
    selectors: [["p-input-text"], ["", "p-input-text", ""]],
    hostBindings: function PInputText_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputText_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputText_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      counter: "counter",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      loading: "loading",
      maxLength: "maxLength",
      message: "message",
      minLength: "minLength",
      name: "name",
      placeholder: "placeholder",
      readOnly: "readOnly",
      required: "required",
      spellCheck: "spellCheck",
      state: "state",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputText),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputText_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputText, [{
    type: Component,
    args: [{
      selector: "p-input-text,[p-input-text]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "counter", "description", "disabled", "form", "hideLabel", "label", "loading", "maxLength", "message", "minLength", "name", "placeholder", "readOnly", "required", "spellCheck", "state", "theme", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputText),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PInputTime = class _PInputTime extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  label;
  loading;
  max;
  message;
  min;
  name;
  readOnly;
  required;
  state;
  step;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputTime_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputTime)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputTime,
    selectors: [["p-input-time"], ["", "p-input-time", ""]],
    hostBindings: function PInputTime_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputTime_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputTime_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      loading: "loading",
      max: "max",
      message: "message",
      min: "min",
      name: "name",
      readOnly: "readOnly",
      required: "required",
      state: "state",
      step: "step",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputTime),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputTime_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputTime, [{
    type: Component,
    args: [{
      selector: "p-input-time,[p-input-time]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "description", "disabled", "form", "hideLabel", "label", "loading", "max", "message", "min", "name", "readOnly", "required", "state", "step", "theme", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputTime),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PInputUrl = class _PInputUrl extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  indicator;
  label;
  loading;
  maxLength;
  message;
  minLength;
  name;
  pattern;
  placeholder;
  readOnly;
  required;
  state;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputUrl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputUrl)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputUrl,
    selectors: [["p-input-url"], ["", "p-input-url", ""]],
    hostBindings: function PInputUrl_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputUrl_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputUrl_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      indicator: "indicator",
      label: "label",
      loading: "loading",
      maxLength: "maxLength",
      message: "message",
      minLength: "minLength",
      name: "name",
      pattern: "pattern",
      placeholder: "placeholder",
      readOnly: "readOnly",
      required: "required",
      state: "state",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputUrl),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputUrl_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputUrl, [{
    type: Component,
    args: [{
      selector: "p-input-url,[p-input-url]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "description", "disabled", "form", "hideLabel", "indicator", "label", "loading", "maxLength", "message", "minLength", "name", "pattern", "placeholder", "readOnly", "required", "state", "theme", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputUrl),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PInputWeek = class _PInputWeek extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  label;
  loading;
  max;
  message;
  min;
  name;
  readOnly;
  required;
  state;
  step;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PInputWeek_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PInputWeek)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PInputWeek,
    selectors: [["p-input-week"], ["", "p-input-week", ""]],
    hostBindings: function PInputWeek_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PInputWeek_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PInputWeek_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      loading: "loading",
      max: "max",
      message: "message",
      min: "min",
      name: "name",
      readOnly: "readOnly",
      required: "required",
      state: "state",
      step: "step",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PInputWeek),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PInputWeek_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PInputWeek, [{
    type: Component,
    args: [{
      selector: "p-input-week,[p-input-week]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "description", "disabled", "form", "hideLabel", "label", "loading", "max", "message", "min", "name", "readOnly", "required", "state", "step", "theme", "value"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PInputWeek),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PLink = class _PLink extends BaseComponentWithTheme {
  aria;
  compact;
  download;
  hideLabel;
  href;
  icon;
  iconSource;
  rel;
  target;
  theme;
  variant;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPLink_BaseFactory;
    return function PLink_Factory(__ngFactoryType__) {
      return (ɵPLink_BaseFactory || (ɵPLink_BaseFactory = ɵɵgetInheritedFactory(_PLink)))(__ngFactoryType__ || _PLink);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PLink,
    selectors: [["p-link"], ["", "p-link", ""]],
    inputs: {
      aria: "aria",
      compact: "compact",
      download: "download",
      hideLabel: "hideLabel",
      href: "href",
      icon: "icon",
      iconSource: "iconSource",
      rel: "rel",
      target: "target",
      theme: "theme",
      variant: "variant"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PLink_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PLink, [{
    type: Component,
    args: [{
      selector: "p-link,[p-link]",
      template: "<ng-content />",
      inputs: ["aria", "compact", "download", "hideLabel", "href", "icon", "iconSource", "rel", "target", "theme", "variant"],
      standalone: false
    }]
  }], null, null);
})();
var PLinkPure = class _PLinkPure extends BaseComponentWithTheme {
  active;
  alignLabel;
  aria;
  download;
  hideLabel;
  href;
  icon;
  iconSource;
  rel;
  size;
  stretch;
  target;
  theme;
  underline;
  /** @deprecated */
  weight;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPLinkPure_BaseFactory;
    return function PLinkPure_Factory(__ngFactoryType__) {
      return (ɵPLinkPure_BaseFactory || (ɵPLinkPure_BaseFactory = ɵɵgetInheritedFactory(_PLinkPure)))(__ngFactoryType__ || _PLinkPure);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PLinkPure,
    selectors: [["p-link-pure"], ["", "p-link-pure", ""]],
    inputs: {
      active: "active",
      alignLabel: "alignLabel",
      aria: "aria",
      download: "download",
      hideLabel: "hideLabel",
      href: "href",
      icon: "icon",
      iconSource: "iconSource",
      rel: "rel",
      size: "size",
      stretch: "stretch",
      target: "target",
      theme: "theme",
      underline: "underline",
      weight: "weight"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PLinkPure_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PLinkPure, [{
    type: Component,
    args: [{
      selector: "p-link-pure,[p-link-pure]",
      template: "<ng-content />",
      inputs: ["active", "alignLabel", "aria", "download", "hideLabel", "href", "icon", "iconSource", "rel", "size", "stretch", "target", "theme", "underline", "weight"],
      standalone: false
    }]
  }], null, null);
})();
var PLinkSocial = class _PLinkSocial extends BaseComponentWithTheme {
  compact;
  hideLabel;
  href;
  icon;
  iconSource;
  rel;
  target;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPLinkSocial_BaseFactory;
    return function PLinkSocial_Factory(__ngFactoryType__) {
      return (ɵPLinkSocial_BaseFactory || (ɵPLinkSocial_BaseFactory = ɵɵgetInheritedFactory(_PLinkSocial)))(__ngFactoryType__ || _PLinkSocial);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PLinkSocial,
    selectors: [["p-link-social"], ["", "p-link-social", ""]],
    inputs: {
      compact: "compact",
      hideLabel: "hideLabel",
      href: "href",
      icon: "icon",
      iconSource: "iconSource",
      rel: "rel",
      target: "target",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PLinkSocial_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PLinkSocial, [{
    type: Component,
    args: [{
      selector: "p-link-social,[p-link-social]",
      template: "<ng-content />",
      inputs: ["compact", "hideLabel", "href", "icon", "iconSource", "rel", "target", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PLinkTile = class _PLinkTile extends BaseComponent {
  align;
  aria;
  aspectRatio;
  background;
  compact;
  description;
  download;
  gradient;
  href;
  label;
  rel;
  size;
  target;
  weight;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPLinkTile_BaseFactory;
    return function PLinkTile_Factory(__ngFactoryType__) {
      return (ɵPLinkTile_BaseFactory || (ɵPLinkTile_BaseFactory = ɵɵgetInheritedFactory(_PLinkTile)))(__ngFactoryType__ || _PLinkTile);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PLinkTile,
    selectors: [["p-link-tile"], ["", "p-link-tile", ""]],
    inputs: {
      align: "align",
      aria: "aria",
      aspectRatio: "aspectRatio",
      background: "background",
      compact: "compact",
      description: "description",
      download: "download",
      gradient: "gradient",
      href: "href",
      label: "label",
      rel: "rel",
      size: "size",
      target: "target",
      weight: "weight"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PLinkTile_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PLinkTile, [{
    type: Component,
    args: [{
      selector: "p-link-tile,[p-link-tile]",
      template: "<ng-content />",
      inputs: ["align", "aria", "aspectRatio", "background", "compact", "description", "download", "gradient", "href", "label", "rel", "size", "target", "weight"],
      standalone: false
    }]
  }], null, null);
})();
var PLinkTileModelSignature = class _PLinkTileModelSignature extends BaseComponent {
  aspectRatio;
  description;
  heading;
  headingTag;
  linkDirection;
  model;
  weight;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPLinkTileModelSignature_BaseFactory;
    return function PLinkTileModelSignature_Factory(__ngFactoryType__) {
      return (ɵPLinkTileModelSignature_BaseFactory || (ɵPLinkTileModelSignature_BaseFactory = ɵɵgetInheritedFactory(_PLinkTileModelSignature)))(__ngFactoryType__ || _PLinkTileModelSignature);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PLinkTileModelSignature,
    selectors: [["p-link-tile-model-signature"], ["", "p-link-tile-model-signature", ""]],
    inputs: {
      aspectRatio: "aspectRatio",
      description: "description",
      heading: "heading",
      headingTag: "headingTag",
      linkDirection: "linkDirection",
      model: "model",
      weight: "weight"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PLinkTileModelSignature_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PLinkTileModelSignature, [{
    type: Component,
    args: [{
      selector: "p-link-tile-model-signature,[p-link-tile-model-signature]",
      template: "<ng-content />",
      inputs: ["aspectRatio", "description", "heading", "headingTag", "linkDirection", "model", "weight"],
      standalone: false
    }]
  }], null, null);
})();
var PLinkTileProduct = class _PLinkTileProduct extends BaseComponentWithTheme {
  aspectRatio;
  description;
  heading;
  href;
  likeButton;
  liked;
  price;
  priceOriginal;
  rel;
  target;
  theme;
  like = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPLinkTileProduct_BaseFactory;
    return function PLinkTileProduct_Factory(__ngFactoryType__) {
      return (ɵPLinkTileProduct_BaseFactory || (ɵPLinkTileProduct_BaseFactory = ɵɵgetInheritedFactory(_PLinkTileProduct)))(__ngFactoryType__ || _PLinkTileProduct);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PLinkTileProduct,
    selectors: [["p-link-tile-product"], ["", "p-link-tile-product", ""]],
    inputs: {
      aspectRatio: "aspectRatio",
      description: "description",
      heading: "heading",
      href: "href",
      likeButton: "likeButton",
      liked: "liked",
      price: "price",
      priceOriginal: "priceOriginal",
      rel: "rel",
      target: "target",
      theme: "theme"
    },
    outputs: {
      like: "like"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PLinkTileProduct_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PLinkTileProduct, [{
    type: Component,
    args: [{
      selector: "p-link-tile-product,[p-link-tile-product]",
      template: "<ng-content />",
      inputs: ["aspectRatio", "description", "heading", "href", "likeButton", "liked", "price", "priceOriginal", "rel", "target", "theme"],
      outputs: ["like"],
      standalone: false
    }]
  }], null, null);
})();
var PMarque = class _PMarque extends BaseComponent {
  aria;
  href;
  size;
  target;
  trademark;
  variant;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPMarque_BaseFactory;
    return function PMarque_Factory(__ngFactoryType__) {
      return (ɵPMarque_BaseFactory || (ɵPMarque_BaseFactory = ɵɵgetInheritedFactory(_PMarque)))(__ngFactoryType__ || _PMarque);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PMarque,
    selectors: [["p-marque"], ["", "p-marque", ""]],
    inputs: {
      aria: "aria",
      href: "href",
      size: "size",
      target: "target",
      trademark: "trademark",
      variant: "variant"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PMarque_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PMarque, [{
    type: Component,
    args: [{
      selector: "p-marque,[p-marque]",
      template: "<ng-content />",
      inputs: ["aria", "href", "size", "target", "trademark", "variant"],
      standalone: false
    }]
  }], null, null);
})();
var PModal = class _PModal extends BaseComponentWithTheme {
  aria;
  backdrop;
  disableBackdropClick;
  /** @deprecated */
  disableCloseButton;
  dismissButton;
  fullscreen;
  /** @deprecated */
  heading;
  open;
  theme;
  /** @deprecated */
  close = new EventEmitter();
  dismiss = new EventEmitter();
  motionHiddenEnd = new EventEmitter();
  motionVisibleEnd = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPModal_BaseFactory;
    return function PModal_Factory(__ngFactoryType__) {
      return (ɵPModal_BaseFactory || (ɵPModal_BaseFactory = ɵɵgetInheritedFactory(_PModal)))(__ngFactoryType__ || _PModal);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PModal,
    selectors: [["p-modal"], ["", "p-modal", ""]],
    inputs: {
      aria: "aria",
      backdrop: "backdrop",
      disableBackdropClick: "disableBackdropClick",
      disableCloseButton: "disableCloseButton",
      dismissButton: "dismissButton",
      fullscreen: "fullscreen",
      heading: "heading",
      open: "open",
      theme: "theme"
    },
    outputs: {
      close: "close",
      dismiss: "dismiss",
      motionHiddenEnd: "motionHiddenEnd",
      motionVisibleEnd: "motionVisibleEnd"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PModal_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PModal, [{
    type: Component,
    args: [{
      selector: "p-modal,[p-modal]",
      template: "<ng-content />",
      inputs: ["aria", "backdrop", "disableBackdropClick", "disableCloseButton", "dismissButton", "fullscreen", "heading", "open", "theme"],
      outputs: ["close", "dismiss", "motionHiddenEnd", "motionVisibleEnd"],
      standalone: false
    }]
  }], null, null);
})();
var PModelSignature = class _PModelSignature extends BaseComponentWithTheme {
  color;
  fetchPriority;
  lazy;
  model;
  safeZone;
  size;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPModelSignature_BaseFactory;
    return function PModelSignature_Factory(__ngFactoryType__) {
      return (ɵPModelSignature_BaseFactory || (ɵPModelSignature_BaseFactory = ɵɵgetInheritedFactory(_PModelSignature)))(__ngFactoryType__ || _PModelSignature);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PModelSignature,
    selectors: [["p-model-signature"], ["", "p-model-signature", ""]],
    inputs: {
      color: "color",
      fetchPriority: "fetchPriority",
      lazy: "lazy",
      model: "model",
      safeZone: "safeZone",
      size: "size",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PModelSignature_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PModelSignature, [{
    type: Component,
    args: [{
      selector: "p-model-signature,[p-model-signature]",
      template: "<ng-content />",
      inputs: ["color", "fetchPriority", "lazy", "model", "safeZone", "size", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PMultiSelect = class _PMultiSelect extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  compact;
  description;
  disabled;
  dropdownDirection;
  form;
  hideLabel;
  label;
  message;
  name;
  required;
  state;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  toggle = new EventEmitter();
  /** @deprecated */
  update = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PMultiSelect_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PMultiSelect)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PMultiSelect,
    selectors: [["p-multi-select"], ["", "p-multi-select", ""]],
    hostBindings: function PMultiSelect_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("change", function PMultiSelect_change_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PMultiSelect_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      compact: "compact",
      description: "description",
      disabled: "disabled",
      dropdownDirection: "dropdownDirection",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      message: "message",
      name: "name",
      required: "required",
      state: "state",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      toggle: "toggle",
      update: "update"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PMultiSelect),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PMultiSelect_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PMultiSelect, [{
    type: Component,
    args: [{
      selector: "p-multi-select,[p-multi-select]",
      template: "<ng-content />",
      inputs: ["compact", "description", "disabled", "dropdownDirection", "form", "hideLabel", "label", "message", "name", "required", "state", "theme", "value"],
      outputs: ["blur", "change", "toggle", "update"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PMultiSelect),
        multi: true
      }],
      host: {
        "(change)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PMultiSelectOption = class _PMultiSelectOption extends BaseComponent {
  disabled;
  value;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPMultiSelectOption_BaseFactory;
    return function PMultiSelectOption_Factory(__ngFactoryType__) {
      return (ɵPMultiSelectOption_BaseFactory || (ɵPMultiSelectOption_BaseFactory = ɵɵgetInheritedFactory(_PMultiSelectOption)))(__ngFactoryType__ || _PMultiSelectOption);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PMultiSelectOption,
    selectors: [["p-multi-select-option"], ["", "p-multi-select-option", ""]],
    inputs: {
      disabled: "disabled",
      value: "value"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PMultiSelectOption_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PMultiSelectOption, [{
    type: Component,
    args: [{
      selector: "p-multi-select-option,[p-multi-select-option]",
      template: "<ng-content />",
      inputs: ["disabled", "value"],
      standalone: false
    }]
  }], null, null);
})();
var POptgroup = class _POptgroup extends BaseComponent {
  disabled;
  label;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPOptgroup_BaseFactory;
    return function POptgroup_Factory(__ngFactoryType__) {
      return (ɵPOptgroup_BaseFactory || (ɵPOptgroup_BaseFactory = ɵɵgetInheritedFactory(_POptgroup)))(__ngFactoryType__ || _POptgroup);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _POptgroup,
    selectors: [["p-optgroup"], ["", "p-optgroup", ""]],
    inputs: {
      disabled: "disabled",
      label: "label"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function POptgroup_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(POptgroup, [{
    type: Component,
    args: [{
      selector: "p-optgroup,[p-optgroup]",
      template: "<ng-content />",
      inputs: ["disabled", "label"],
      standalone: false
    }]
  }], null, null);
})();
var PPagination = class _PPagination extends BaseComponentWithTheme {
  activePage;
  /** @deprecated */
  allyLabel;
  /** @deprecated */
  allyLabelNext;
  /** @deprecated */
  allyLabelPage;
  /** @deprecated */
  allyLabelPrev;
  intl;
  itemsPerPage;
  /** @deprecated */
  maxNumberOfPageLinks;
  showLastPage;
  theme;
  totalItemsCount;
  /** @deprecated */
  pageChange = new EventEmitter();
  update = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPPagination_BaseFactory;
    return function PPagination_Factory(__ngFactoryType__) {
      return (ɵPPagination_BaseFactory || (ɵPPagination_BaseFactory = ɵɵgetInheritedFactory(_PPagination)))(__ngFactoryType__ || _PPagination);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PPagination,
    selectors: [["p-pagination"], ["", "p-pagination", ""]],
    inputs: {
      activePage: "activePage",
      allyLabel: "allyLabel",
      allyLabelNext: "allyLabelNext",
      allyLabelPage: "allyLabelPage",
      allyLabelPrev: "allyLabelPrev",
      intl: "intl",
      itemsPerPage: "itemsPerPage",
      maxNumberOfPageLinks: "maxNumberOfPageLinks",
      showLastPage: "showLastPage",
      theme: "theme",
      totalItemsCount: "totalItemsCount"
    },
    outputs: {
      pageChange: "pageChange",
      update: "update"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PPagination_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PPagination, [{
    type: Component,
    args: [{
      selector: "p-pagination,[p-pagination]",
      template: "<ng-content />",
      inputs: ["activePage", "allyLabel", "allyLabelNext", "allyLabelPage", "allyLabelPrev", "intl", "itemsPerPage", "maxNumberOfPageLinks", "showLastPage", "theme", "totalItemsCount"],
      outputs: ["pageChange", "update"],
      standalone: false
    }]
  }], null, null);
})();
var PPinCode = class _PPinCode extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  label;
  length;
  loading;
  message;
  name;
  required;
  state;
  theme;
  type;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  /** @deprecated */
  update = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PPinCode_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PPinCode)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PPinCode,
    selectors: [["p-pin-code"], ["", "p-pin-code", ""]],
    hostBindings: function PPinCode_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("change", function PPinCode_change_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PPinCode_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      length: "length",
      loading: "loading",
      message: "message",
      name: "name",
      required: "required",
      state: "state",
      theme: "theme",
      type: "type",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      update: "update"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PPinCode),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PPinCode_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PPinCode, [{
    type: Component,
    args: [{
      selector: "p-pin-code,[p-pin-code]",
      template: "<ng-content />",
      inputs: ["compact", "description", "disabled", "form", "hideLabel", "label", "length", "loading", "message", "name", "required", "state", "theme", "type", "value"],
      outputs: ["blur", "change", "update"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PPinCode),
        multi: true
      }],
      host: {
        "(change)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PPopover = class _PPopover extends BaseComponentWithTheme {
  aria;
  description;
  direction;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPPopover_BaseFactory;
    return function PPopover_Factory(__ngFactoryType__) {
      return (ɵPPopover_BaseFactory || (ɵPPopover_BaseFactory = ɵɵgetInheritedFactory(_PPopover)))(__ngFactoryType__ || _PPopover);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PPopover,
    selectors: [["p-popover"], ["", "p-popover", ""]],
    inputs: {
      aria: "aria",
      description: "description",
      direction: "direction",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PPopover_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PPopover, [{
    type: Component,
    args: [{
      selector: "p-popover,[p-popover]",
      template: "<ng-content />",
      inputs: ["aria", "description", "direction", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PRadioButtonWrapper = class _PRadioButtonWrapper extends BaseComponentWithTheme {
  hideLabel;
  label;
  loading;
  message;
  state;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPRadioButtonWrapper_BaseFactory;
    return function PRadioButtonWrapper_Factory(__ngFactoryType__) {
      return (ɵPRadioButtonWrapper_BaseFactory || (ɵPRadioButtonWrapper_BaseFactory = ɵɵgetInheritedFactory(_PRadioButtonWrapper)))(__ngFactoryType__ || _PRadioButtonWrapper);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PRadioButtonWrapper,
    selectors: [["p-radio-button-wrapper"], ["", "p-radio-button-wrapper", ""]],
    inputs: {
      hideLabel: "hideLabel",
      label: "label",
      loading: "loading",
      message: "message",
      state: "state",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PRadioButtonWrapper_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PRadioButtonWrapper, [{
    type: Component,
    args: [{
      selector: "p-radio-button-wrapper,[p-radio-button-wrapper]",
      template: "<ng-content />",
      inputs: ["hideLabel", "label", "loading", "message", "state", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PRadioGroup = class _PRadioGroup extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  compact;
  description;
  direction;
  disabled;
  form;
  hideLabel;
  label;
  loading;
  message;
  name;
  required;
  state;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PRadioGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PRadioGroup)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PRadioGroup,
    selectors: [["p-radio-group"], ["", "p-radio-group", ""]],
    hostBindings: function PRadioGroup_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("change", function PRadioGroup_change_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PRadioGroup_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      compact: "compact",
      description: "description",
      direction: "direction",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      loading: "loading",
      message: "message",
      name: "name",
      required: "required",
      state: "state",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PRadioGroup),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PRadioGroup_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PRadioGroup, [{
    type: Component,
    args: [{
      selector: "p-radio-group,[p-radio-group]",
      template: "<ng-content />",
      inputs: ["compact", "description", "direction", "disabled", "form", "hideLabel", "label", "loading", "message", "name", "required", "state", "theme", "value"],
      outputs: ["blur", "change"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PRadioGroup),
        multi: true
      }],
      host: {
        "(change)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PRadioGroupOption = class _PRadioGroupOption extends BaseComponent {
  disabled;
  label;
  loading;
  value;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPRadioGroupOption_BaseFactory;
    return function PRadioGroupOption_Factory(__ngFactoryType__) {
      return (ɵPRadioGroupOption_BaseFactory || (ɵPRadioGroupOption_BaseFactory = ɵɵgetInheritedFactory(_PRadioGroupOption)))(__ngFactoryType__ || _PRadioGroupOption);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PRadioGroupOption,
    selectors: [["p-radio-group-option"], ["", "p-radio-group-option", ""]],
    inputs: {
      disabled: "disabled",
      label: "label",
      loading: "loading",
      value: "value"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PRadioGroupOption_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PRadioGroupOption, [{
    type: Component,
    args: [{
      selector: "p-radio-group-option,[p-radio-group-option]",
      template: "<ng-content />",
      inputs: ["disabled", "label", "loading", "value"],
      standalone: false
    }]
  }], null, null);
})();
var PScroller = class _PScroller extends BaseComponentWithTheme {
  alignScrollIndicator;
  aria;
  /** @deprecated */
  gradientColor;
  /** @deprecated */
  gradientColorScheme;
  /** @deprecated */
  scrollIndicatorPosition;
  scrollToPosition;
  scrollbar;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPScroller_BaseFactory;
    return function PScroller_Factory(__ngFactoryType__) {
      return (ɵPScroller_BaseFactory || (ɵPScroller_BaseFactory = ɵɵgetInheritedFactory(_PScroller)))(__ngFactoryType__ || _PScroller);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PScroller,
    selectors: [["p-scroller"], ["", "p-scroller", ""]],
    inputs: {
      alignScrollIndicator: "alignScrollIndicator",
      aria: "aria",
      gradientColor: "gradientColor",
      gradientColorScheme: "gradientColorScheme",
      scrollIndicatorPosition: "scrollIndicatorPosition",
      scrollToPosition: "scrollToPosition",
      scrollbar: "scrollbar",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PScroller_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PScroller, [{
    type: Component,
    args: [{
      selector: "p-scroller,[p-scroller]",
      template: "<ng-content />",
      inputs: ["alignScrollIndicator", "aria", "gradientColor", "gradientColorScheme", "scrollIndicatorPosition", "scrollToPosition", "scrollbar", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PSegmentedControl = class _PSegmentedControl extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  /** @deprecated */
  backgroundColor;
  columns;
  compact;
  description;
  disabled;
  form;
  hideLabel;
  label;
  message;
  name;
  noWrap;
  required;
  state;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  /** @deprecated */
  segmentedControlChange = new EventEmitter();
  /** @deprecated */
  update = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PSegmentedControl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PSegmentedControl)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PSegmentedControl,
    selectors: [["p-segmented-control"], ["", "p-segmented-control", ""]],
    hostBindings: function PSegmentedControl_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("change", function PSegmentedControl_change_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PSegmentedControl_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      backgroundColor: "backgroundColor",
      columns: "columns",
      compact: "compact",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      message: "message",
      name: "name",
      noWrap: "noWrap",
      required: "required",
      state: "state",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      segmentedControlChange: "segmentedControlChange",
      update: "update"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PSegmentedControl),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PSegmentedControl_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PSegmentedControl, [{
    type: Component,
    args: [{
      selector: "p-segmented-control,[p-segmented-control]",
      template: "<ng-content />",
      inputs: ["backgroundColor", "columns", "compact", "description", "disabled", "form", "hideLabel", "label", "message", "name", "noWrap", "required", "state", "theme", "value"],
      outputs: ["blur", "change", "segmentedControlChange", "update"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PSegmentedControl),
        multi: true
      }],
      host: {
        "(change)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PSegmentedControlItem = class _PSegmentedControlItem extends BaseComponent {
  aria;
  disabled;
  icon;
  iconSource;
  label;
  value;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPSegmentedControlItem_BaseFactory;
    return function PSegmentedControlItem_Factory(__ngFactoryType__) {
      return (ɵPSegmentedControlItem_BaseFactory || (ɵPSegmentedControlItem_BaseFactory = ɵɵgetInheritedFactory(_PSegmentedControlItem)))(__ngFactoryType__ || _PSegmentedControlItem);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PSegmentedControlItem,
    selectors: [["p-segmented-control-item"], ["", "p-segmented-control-item", ""]],
    inputs: {
      aria: "aria",
      disabled: "disabled",
      icon: "icon",
      iconSource: "iconSource",
      label: "label",
      value: "value"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PSegmentedControlItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PSegmentedControlItem, [{
    type: Component,
    args: [{
      selector: "p-segmented-control-item,[p-segmented-control-item]",
      template: "<ng-content />",
      inputs: ["aria", "disabled", "icon", "iconSource", "label", "value"],
      standalone: false
    }]
  }], null, null);
})();
var PSelect = class _PSelect extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  compact;
  description;
  disabled;
  dropdownDirection;
  filter;
  form;
  hideLabel;
  label;
  message;
  name;
  required;
  state;
  theme;
  value;
  blur = new EventEmitter();
  change = new EventEmitter();
  toggle = new EventEmitter();
  /** @deprecated */
  update = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PSelect_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PSelect)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PSelect,
    selectors: [["p-select"], ["", "p-select", ""]],
    hostBindings: function PSelect_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("change", function PSelect_change_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PSelect_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      compact: "compact",
      description: "description",
      disabled: "disabled",
      dropdownDirection: "dropdownDirection",
      filter: "filter",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      message: "message",
      name: "name",
      required: "required",
      state: "state",
      theme: "theme",
      value: "value"
    },
    outputs: {
      blur: "blur",
      change: "change",
      toggle: "toggle",
      update: "update"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PSelect),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PSelect_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PSelect, [{
    type: Component,
    args: [{
      selector: "p-select,[p-select]",
      template: "<ng-content />",
      inputs: ["compact", "description", "disabled", "dropdownDirection", "filter", "form", "hideLabel", "label", "message", "name", "required", "state", "theme", "value"],
      outputs: ["blur", "change", "toggle", "update"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PSelect),
        multi: true
      }],
      host: {
        "(change)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PSelectOption = class _PSelectOption extends BaseComponent {
  disabled;
  value;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPSelectOption_BaseFactory;
    return function PSelectOption_Factory(__ngFactoryType__) {
      return (ɵPSelectOption_BaseFactory || (ɵPSelectOption_BaseFactory = ɵɵgetInheritedFactory(_PSelectOption)))(__ngFactoryType__ || _PSelectOption);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PSelectOption,
    selectors: [["p-select-option"], ["", "p-select-option", ""]],
    inputs: {
      disabled: "disabled",
      value: "value"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PSelectOption_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PSelectOption, [{
    type: Component,
    args: [{
      selector: "p-select-option,[p-select-option]",
      template: "<ng-content />",
      inputs: ["disabled", "value"],
      standalone: false
    }]
  }], null, null);
})();
var PSelectWrapper = class _PSelectWrapper extends BaseComponentWithTheme {
  description;
  dropdownDirection;
  filter;
  hideLabel;
  label;
  message;
  native;
  state;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPSelectWrapper_BaseFactory;
    return function PSelectWrapper_Factory(__ngFactoryType__) {
      return (ɵPSelectWrapper_BaseFactory || (ɵPSelectWrapper_BaseFactory = ɵɵgetInheritedFactory(_PSelectWrapper)))(__ngFactoryType__ || _PSelectWrapper);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PSelectWrapper,
    selectors: [["p-select-wrapper"], ["", "p-select-wrapper", ""]],
    inputs: {
      description: "description",
      dropdownDirection: "dropdownDirection",
      filter: "filter",
      hideLabel: "hideLabel",
      label: "label",
      message: "message",
      native: "native",
      state: "state",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PSelectWrapper_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PSelectWrapper, [{
    type: Component,
    args: [{
      selector: "p-select-wrapper,[p-select-wrapper]",
      template: "<ng-content />",
      inputs: ["description", "dropdownDirection", "filter", "hideLabel", "label", "message", "native", "state", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PSheet = class _PSheet extends BaseComponentWithTheme {
  aria;
  disableBackdropClick;
  dismissButton;
  open;
  theme;
  dismiss = new EventEmitter();
  motionHiddenEnd = new EventEmitter();
  motionVisibleEnd = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPSheet_BaseFactory;
    return function PSheet_Factory(__ngFactoryType__) {
      return (ɵPSheet_BaseFactory || (ɵPSheet_BaseFactory = ɵɵgetInheritedFactory(_PSheet)))(__ngFactoryType__ || _PSheet);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PSheet,
    selectors: [["p-sheet"], ["", "p-sheet", ""]],
    inputs: {
      aria: "aria",
      disableBackdropClick: "disableBackdropClick",
      dismissButton: "dismissButton",
      open: "open",
      theme: "theme"
    },
    outputs: {
      dismiss: "dismiss",
      motionHiddenEnd: "motionHiddenEnd",
      motionVisibleEnd: "motionVisibleEnd"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PSheet_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PSheet, [{
    type: Component,
    args: [{
      selector: "p-sheet,[p-sheet]",
      template: "<ng-content />",
      inputs: ["aria", "disableBackdropClick", "dismissButton", "open", "theme"],
      outputs: ["dismiss", "motionHiddenEnd", "motionVisibleEnd"],
      standalone: false
    }]
  }], null, null);
})();
var PSpinner = class _PSpinner extends BaseComponentWithTheme {
  aria;
  size;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPSpinner_BaseFactory;
    return function PSpinner_Factory(__ngFactoryType__) {
      return (ɵPSpinner_BaseFactory || (ɵPSpinner_BaseFactory = ɵɵgetInheritedFactory(_PSpinner)))(__ngFactoryType__ || _PSpinner);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PSpinner,
    selectors: [["p-spinner"], ["", "p-spinner", ""]],
    inputs: {
      aria: "aria",
      size: "size",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PSpinner_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PSpinner, [{
    type: Component,
    args: [{
      selector: "p-spinner,[p-spinner]",
      template: "<ng-content />",
      inputs: ["aria", "size", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PStepperHorizontal = class _PStepperHorizontal extends BaseComponentWithTheme {
  size;
  theme;
  /** @deprecated */
  stepChange = new EventEmitter();
  update = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPStepperHorizontal_BaseFactory;
    return function PStepperHorizontal_Factory(__ngFactoryType__) {
      return (ɵPStepperHorizontal_BaseFactory || (ɵPStepperHorizontal_BaseFactory = ɵɵgetInheritedFactory(_PStepperHorizontal)))(__ngFactoryType__ || _PStepperHorizontal);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PStepperHorizontal,
    selectors: [["p-stepper-horizontal"], ["", "p-stepper-horizontal", ""]],
    inputs: {
      size: "size",
      theme: "theme"
    },
    outputs: {
      stepChange: "stepChange",
      update: "update"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PStepperHorizontal_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PStepperHorizontal, [{
    type: Component,
    args: [{
      selector: "p-stepper-horizontal,[p-stepper-horizontal]",
      template: "<ng-content />",
      inputs: ["size", "theme"],
      outputs: ["stepChange", "update"],
      standalone: false
    }]
  }], null, null);
})();
var PStepperHorizontalItem = class _PStepperHorizontalItem extends BaseComponent {
  disabled;
  state;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPStepperHorizontalItem_BaseFactory;
    return function PStepperHorizontalItem_Factory(__ngFactoryType__) {
      return (ɵPStepperHorizontalItem_BaseFactory || (ɵPStepperHorizontalItem_BaseFactory = ɵɵgetInheritedFactory(_PStepperHorizontalItem)))(__ngFactoryType__ || _PStepperHorizontalItem);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PStepperHorizontalItem,
    selectors: [["p-stepper-horizontal-item"], ["", "p-stepper-horizontal-item", ""]],
    inputs: {
      disabled: "disabled",
      state: "state"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PStepperHorizontalItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PStepperHorizontalItem, [{
    type: Component,
    args: [{
      selector: "p-stepper-horizontal-item,[p-stepper-horizontal-item]",
      template: "<ng-content />",
      inputs: ["disabled", "state"],
      standalone: false
    }]
  }], null, null);
})();
var PSwitch = class _PSwitch extends BaseComponentWithTheme {
  alignLabel;
  checked;
  compact;
  disabled;
  hideLabel;
  loading;
  stretch;
  theme;
  /** @deprecated */
  switchChange = new EventEmitter();
  update = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPSwitch_BaseFactory;
    return function PSwitch_Factory(__ngFactoryType__) {
      return (ɵPSwitch_BaseFactory || (ɵPSwitch_BaseFactory = ɵɵgetInheritedFactory(_PSwitch)))(__ngFactoryType__ || _PSwitch);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PSwitch,
    selectors: [["p-switch"], ["", "p-switch", ""]],
    inputs: {
      alignLabel: "alignLabel",
      checked: "checked",
      compact: "compact",
      disabled: "disabled",
      hideLabel: "hideLabel",
      loading: "loading",
      stretch: "stretch",
      theme: "theme"
    },
    outputs: {
      switchChange: "switchChange",
      update: "update"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PSwitch_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PSwitch, [{
    type: Component,
    args: [{
      selector: "p-switch,[p-switch]",
      template: "<ng-content />",
      inputs: ["alignLabel", "checked", "compact", "disabled", "hideLabel", "loading", "stretch", "theme"],
      outputs: ["switchChange", "update"],
      standalone: false
    }]
  }], null, null);
})();
var PTable = class _PTable extends BaseComponentWithTheme {
  caption;
  compact;
  layout;
  theme;
  /** @deprecated */
  sortingChange = new EventEmitter();
  update = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTable_BaseFactory;
    return function PTable_Factory(__ngFactoryType__) {
      return (ɵPTable_BaseFactory || (ɵPTable_BaseFactory = ɵɵgetInheritedFactory(_PTable)))(__ngFactoryType__ || _PTable);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTable,
    selectors: [["p-table"], ["", "p-table", ""]],
    inputs: {
      caption: "caption",
      compact: "compact",
      layout: "layout",
      theme: "theme"
    },
    outputs: {
      sortingChange: "sortingChange",
      update: "update"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTable_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTable, [{
    type: Component,
    args: [{
      selector: "p-table,[p-table]",
      template: "<ng-content />",
      inputs: ["caption", "compact", "layout", "theme"],
      outputs: ["sortingChange", "update"],
      standalone: false
    }]
  }], null, null);
})();
var PTableBody = class _PTableBody extends BaseComponent {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTableBody_BaseFactory;
    return function PTableBody_Factory(__ngFactoryType__) {
      return (ɵPTableBody_BaseFactory || (ɵPTableBody_BaseFactory = ɵɵgetInheritedFactory(_PTableBody)))(__ngFactoryType__ || _PTableBody);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTableBody,
    selectors: [["p-table-body"], ["", "p-table-body", ""]],
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTableBody_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTableBody, [{
    type: Component,
    args: [{
      selector: "p-table-body,[p-table-body]",
      template: "<ng-content />",
      standalone: false
    }]
  }], null, null);
})();
var PTableCell = class _PTableCell extends BaseComponent {
  multiline;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTableCell_BaseFactory;
    return function PTableCell_Factory(__ngFactoryType__) {
      return (ɵPTableCell_BaseFactory || (ɵPTableCell_BaseFactory = ɵɵgetInheritedFactory(_PTableCell)))(__ngFactoryType__ || _PTableCell);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTableCell,
    selectors: [["p-table-cell"], ["", "p-table-cell", ""]],
    inputs: {
      multiline: "multiline"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTableCell_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTableCell, [{
    type: Component,
    args: [{
      selector: "p-table-cell,[p-table-cell]",
      template: "<ng-content />",
      inputs: ["multiline"],
      standalone: false
    }]
  }], null, null);
})();
var PTableHead = class _PTableHead extends BaseComponent {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTableHead_BaseFactory;
    return function PTableHead_Factory(__ngFactoryType__) {
      return (ɵPTableHead_BaseFactory || (ɵPTableHead_BaseFactory = ɵɵgetInheritedFactory(_PTableHead)))(__ngFactoryType__ || _PTableHead);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTableHead,
    selectors: [["p-table-head"], ["", "p-table-head", ""]],
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTableHead_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTableHead, [{
    type: Component,
    args: [{
      selector: "p-table-head,[p-table-head]",
      template: "<ng-content />",
      standalone: false
    }]
  }], null, null);
})();
var PTableHeadCell = class _PTableHeadCell extends BaseComponent {
  hideLabel;
  multiline;
  sort;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTableHeadCell_BaseFactory;
    return function PTableHeadCell_Factory(__ngFactoryType__) {
      return (ɵPTableHeadCell_BaseFactory || (ɵPTableHeadCell_BaseFactory = ɵɵgetInheritedFactory(_PTableHeadCell)))(__ngFactoryType__ || _PTableHeadCell);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTableHeadCell,
    selectors: [["p-table-head-cell"], ["", "p-table-head-cell", ""]],
    inputs: {
      hideLabel: "hideLabel",
      multiline: "multiline",
      sort: "sort"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTableHeadCell_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTableHeadCell, [{
    type: Component,
    args: [{
      selector: "p-table-head-cell,[p-table-head-cell]",
      template: "<ng-content />",
      inputs: ["hideLabel", "multiline", "sort"],
      standalone: false
    }]
  }], null, null);
})();
var PTableHeadRow = class _PTableHeadRow extends BaseComponent {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTableHeadRow_BaseFactory;
    return function PTableHeadRow_Factory(__ngFactoryType__) {
      return (ɵPTableHeadRow_BaseFactory || (ɵPTableHeadRow_BaseFactory = ɵɵgetInheritedFactory(_PTableHeadRow)))(__ngFactoryType__ || _PTableHeadRow);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTableHeadRow,
    selectors: [["p-table-head-row"], ["", "p-table-head-row", ""]],
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTableHeadRow_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTableHeadRow, [{
    type: Component,
    args: [{
      selector: "p-table-head-row,[p-table-head-row]",
      template: "<ng-content />",
      standalone: false
    }]
  }], null, null);
})();
var PTableRow = class _PTableRow extends BaseComponent {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTableRow_BaseFactory;
    return function PTableRow_Factory(__ngFactoryType__) {
      return (ɵPTableRow_BaseFactory || (ɵPTableRow_BaseFactory = ɵɵgetInheritedFactory(_PTableRow)))(__ngFactoryType__ || _PTableRow);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTableRow,
    selectors: [["p-table-row"], ["", "p-table-row", ""]],
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTableRow_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTableRow, [{
    type: Component,
    args: [{
      selector: "p-table-row,[p-table-row]",
      template: "<ng-content />",
      standalone: false
    }]
  }], null, null);
})();
var PTabs = class _PTabs extends BaseComponentWithTheme {
  activeTabIndex;
  /** @deprecated */
  gradientColor;
  /** @deprecated */
  gradientColorScheme;
  size;
  theme;
  weight;
  /** @deprecated */
  tabChange = new EventEmitter();
  update = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTabs_BaseFactory;
    return function PTabs_Factory(__ngFactoryType__) {
      return (ɵPTabs_BaseFactory || (ɵPTabs_BaseFactory = ɵɵgetInheritedFactory(_PTabs)))(__ngFactoryType__ || _PTabs);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTabs,
    selectors: [["p-tabs"], ["", "p-tabs", ""]],
    inputs: {
      activeTabIndex: "activeTabIndex",
      gradientColor: "gradientColor",
      gradientColorScheme: "gradientColorScheme",
      size: "size",
      theme: "theme",
      weight: "weight"
    },
    outputs: {
      tabChange: "tabChange",
      update: "update"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTabs_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTabs, [{
    type: Component,
    args: [{
      selector: "p-tabs,[p-tabs]",
      template: "<ng-content />",
      inputs: ["activeTabIndex", "gradientColor", "gradientColorScheme", "size", "theme", "weight"],
      outputs: ["tabChange", "update"],
      standalone: false
    }]
  }], null, null);
})();
var PTabsBar = class _PTabsBar extends BaseComponentWithTheme {
  activeTabIndex;
  /** @deprecated */
  gradientColor;
  /** @deprecated */
  gradientColorScheme;
  size;
  theme;
  weight;
  /** @deprecated */
  tabChange = new EventEmitter();
  update = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTabsBar_BaseFactory;
    return function PTabsBar_Factory(__ngFactoryType__) {
      return (ɵPTabsBar_BaseFactory || (ɵPTabsBar_BaseFactory = ɵɵgetInheritedFactory(_PTabsBar)))(__ngFactoryType__ || _PTabsBar);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTabsBar,
    selectors: [["p-tabs-bar"], ["", "p-tabs-bar", ""]],
    inputs: {
      activeTabIndex: "activeTabIndex",
      gradientColor: "gradientColor",
      gradientColorScheme: "gradientColorScheme",
      size: "size",
      theme: "theme",
      weight: "weight"
    },
    outputs: {
      tabChange: "tabChange",
      update: "update"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTabsBar_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTabsBar, [{
    type: Component,
    args: [{
      selector: "p-tabs-bar,[p-tabs-bar]",
      template: "<ng-content />",
      inputs: ["activeTabIndex", "gradientColor", "gradientColorScheme", "size", "theme", "weight"],
      outputs: ["tabChange", "update"],
      standalone: false
    }]
  }], null, null);
})();
var PTabsItem = class _PTabsItem extends BaseComponent {
  label;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTabsItem_BaseFactory;
    return function PTabsItem_Factory(__ngFactoryType__) {
      return (ɵPTabsItem_BaseFactory || (ɵPTabsItem_BaseFactory = ɵɵgetInheritedFactory(_PTabsItem)))(__ngFactoryType__ || _PTabsItem);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTabsItem,
    selectors: [["p-tabs-item"], ["", "p-tabs-item", ""]],
    inputs: {
      label: "label"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTabsItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTabsItem, [{
    type: Component,
    args: [{
      selector: "p-tabs-item,[p-tabs-item]",
      template: "<ng-content />",
      inputs: ["label"],
      standalone: false
    }]
  }], null, null);
})();
var PTag = class _PTag extends BaseComponentWithTheme {
  /** @deprecated */
  color;
  compact;
  icon;
  iconSource;
  theme;
  variant;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTag_BaseFactory;
    return function PTag_Factory(__ngFactoryType__) {
      return (ɵPTag_BaseFactory || (ɵPTag_BaseFactory = ɵɵgetInheritedFactory(_PTag)))(__ngFactoryType__ || _PTag);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTag,
    selectors: [["p-tag"], ["", "p-tag", ""]],
    inputs: {
      color: "color",
      compact: "compact",
      icon: "icon",
      iconSource: "iconSource",
      theme: "theme",
      variant: "variant"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTag_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTag, [{
    type: Component,
    args: [{
      selector: "p-tag,[p-tag]",
      template: "<ng-content />",
      inputs: ["color", "compact", "icon", "iconSource", "theme", "variant"],
      standalone: false
    }]
  }], null, null);
})();
var PTagDismissible = class _PTagDismissible extends BaseComponentWithTheme {
  aria;
  color;
  compact;
  label;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTagDismissible_BaseFactory;
    return function PTagDismissible_Factory(__ngFactoryType__) {
      return (ɵPTagDismissible_BaseFactory || (ɵPTagDismissible_BaseFactory = ɵɵgetInheritedFactory(_PTagDismissible)))(__ngFactoryType__ || _PTagDismissible);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTagDismissible,
    selectors: [["p-tag-dismissible"], ["", "p-tag-dismissible", ""]],
    inputs: {
      aria: "aria",
      color: "color",
      compact: "compact",
      label: "label",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTagDismissible_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTagDismissible, [{
    type: Component,
    args: [{
      selector: "p-tag-dismissible,[p-tag-dismissible]",
      template: "<ng-content />",
      inputs: ["aria", "color", "compact", "label", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PText = class _PText extends BaseComponentWithTheme {
  align;
  color;
  ellipsis;
  size;
  tag;
  theme;
  weight;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPText_BaseFactory;
    return function PText_Factory(__ngFactoryType__) {
      return (ɵPText_BaseFactory || (ɵPText_BaseFactory = ɵɵgetInheritedFactory(_PText)))(__ngFactoryType__ || _PText);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PText,
    selectors: [["p-text"], ["", "p-text", ""]],
    inputs: {
      align: "align",
      color: "color",
      ellipsis: "ellipsis",
      size: "size",
      tag: "tag",
      theme: "theme",
      weight: "weight"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PText_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PText, [{
    type: Component,
    args: [{
      selector: "p-text,[p-text]",
      template: "<ng-content />",
      inputs: ["align", "color", "ellipsis", "size", "tag", "theme", "weight"],
      standalone: false
    }]
  }], null, null);
})();
var PTextFieldWrapper = class _PTextFieldWrapper extends BaseComponentWithTheme {
  actionIcon;
  actionLoading;
  description;
  hideLabel;
  label;
  message;
  /** @deprecated */
  showCharacterCount;
  showCounter;
  showPasswordToggle;
  state;
  submitButton;
  theme;
  unit;
  unitPosition;
  action = new EventEmitter();
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTextFieldWrapper_BaseFactory;
    return function PTextFieldWrapper_Factory(__ngFactoryType__) {
      return (ɵPTextFieldWrapper_BaseFactory || (ɵPTextFieldWrapper_BaseFactory = ɵɵgetInheritedFactory(_PTextFieldWrapper)))(__ngFactoryType__ || _PTextFieldWrapper);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTextFieldWrapper,
    selectors: [["p-text-field-wrapper"], ["", "p-text-field-wrapper", ""]],
    inputs: {
      actionIcon: "actionIcon",
      actionLoading: "actionLoading",
      description: "description",
      hideLabel: "hideLabel",
      label: "label",
      message: "message",
      showCharacterCount: "showCharacterCount",
      showCounter: "showCounter",
      showPasswordToggle: "showPasswordToggle",
      state: "state",
      submitButton: "submitButton",
      theme: "theme",
      unit: "unit",
      unitPosition: "unitPosition"
    },
    outputs: {
      action: "action"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTextFieldWrapper_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTextFieldWrapper, [{
    type: Component,
    args: [{
      selector: "p-text-field-wrapper,[p-text-field-wrapper]",
      template: "<ng-content />",
      inputs: ["actionIcon", "actionLoading", "description", "hideLabel", "label", "message", "showCharacterCount", "showCounter", "showPasswordToggle", "state", "submitButton", "theme", "unit", "unitPosition"],
      outputs: ["action"],
      standalone: false
    }]
  }], null, null);
})();
var PTextList = class _PTextList extends BaseComponentWithTheme {
  /** @deprecated */
  listType;
  /** @deprecated */
  orderType;
  theme;
  type;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTextList_BaseFactory;
    return function PTextList_Factory(__ngFactoryType__) {
      return (ɵPTextList_BaseFactory || (ɵPTextList_BaseFactory = ɵɵgetInheritedFactory(_PTextList)))(__ngFactoryType__ || _PTextList);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTextList,
    selectors: [["p-text-list"], ["", "p-text-list", ""]],
    inputs: {
      listType: "listType",
      orderType: "orderType",
      theme: "theme",
      type: "type"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTextList_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTextList, [{
    type: Component,
    args: [{
      selector: "p-text-list,[p-text-list]",
      template: "<ng-content />",
      inputs: ["listType", "orderType", "theme", "type"],
      standalone: false
    }]
  }], null, null);
})();
var PTextListItem = class _PTextListItem extends BaseComponent {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTextListItem_BaseFactory;
    return function PTextListItem_Factory(__ngFactoryType__) {
      return (ɵPTextListItem_BaseFactory || (ɵPTextListItem_BaseFactory = ɵɵgetInheritedFactory(_PTextListItem)))(__ngFactoryType__ || _PTextListItem);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTextListItem,
    selectors: [["p-text-list-item"], ["", "p-text-list-item", ""]],
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTextListItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTextListItem, [{
    type: Component,
    args: [{
      selector: "p-text-list-item,[p-text-list-item]",
      template: "<ng-content />",
      standalone: false
    }]
  }], null, null);
})();
var PTextarea = class _PTextarea extends BaseComponentWithTheme {
  _renderer;
  _elementRef;
  _cdr;
  autoComplete;
  compact;
  counter;
  description;
  disabled;
  form;
  hideLabel;
  label;
  maxLength;
  message;
  minLength;
  name;
  placeholder;
  readOnly;
  required;
  resize;
  rows;
  spellCheck;
  state;
  theme;
  value;
  wrap;
  blur = new EventEmitter();
  change = new EventEmitter();
  input = new EventEmitter();
  constructor(_renderer, _elementRef, _cdr) {
    super(_cdr, _elementRef);
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._cdr = _cdr;
  }
  _onChange = () => {
  };
  _onTouched = () => {
  };
  writeValue(value) {
    this._renderer.setProperty(this._elementRef.nativeElement, "value", value);
  }
  registerOnChange(fn) {
    this._onChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  static ɵfac = function PTextarea_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PTextarea)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _PTextarea,
    selectors: [["p-textarea"], ["", "p-textarea", ""]],
    hostBindings: function PTextarea_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function PTextarea_input_HostBindingHandler($event) {
          return ctx._onChange($event.target.value);
        })("blur", function PTextarea_blur_HostBindingHandler() {
          return ctx._onTouched();
        });
      }
    },
    inputs: {
      autoComplete: "autoComplete",
      compact: "compact",
      counter: "counter",
      description: "description",
      disabled: "disabled",
      form: "form",
      hideLabel: "hideLabel",
      label: "label",
      maxLength: "maxLength",
      message: "message",
      minLength: "minLength",
      name: "name",
      placeholder: "placeholder",
      readOnly: "readOnly",
      required: "required",
      resize: "resize",
      rows: "rows",
      spellCheck: "spellCheck",
      state: "state",
      theme: "theme",
      value: "value",
      wrap: "wrap"
    },
    outputs: {
      blur: "blur",
      change: "change",
      input: "input"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _PTextarea),
      multi: true
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTextarea_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTextarea, [{
    type: Component,
    args: [{
      selector: "p-textarea,[p-textarea]",
      template: "<ng-content />",
      inputs: ["autoComplete", "compact", "counter", "description", "disabled", "form", "hideLabel", "label", "maxLength", "message", "minLength", "name", "placeholder", "readOnly", "required", "resize", "rows", "spellCheck", "state", "theme", "value", "wrap"],
      outputs: ["blur", "change", "input"],
      standalone: false,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PTextarea),
        multi: true
      }],
      host: {
        "(input)": "_onChange($event.target.value)",
        "(blur)": "_onTouched()"
      }
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], null);
})();
var PTextareaWrapper = class _PTextareaWrapper extends BaseComponentWithTheme {
  description;
  hideLabel;
  label;
  message;
  /** @deprecated */
  showCharacterCount;
  showCounter;
  state;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPTextareaWrapper_BaseFactory;
    return function PTextareaWrapper_Factory(__ngFactoryType__) {
      return (ɵPTextareaWrapper_BaseFactory || (ɵPTextareaWrapper_BaseFactory = ɵɵgetInheritedFactory(_PTextareaWrapper)))(__ngFactoryType__ || _PTextareaWrapper);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PTextareaWrapper,
    selectors: [["p-textarea-wrapper"], ["", "p-textarea-wrapper", ""]],
    inputs: {
      description: "description",
      hideLabel: "hideLabel",
      label: "label",
      message: "message",
      showCharacterCount: "showCharacterCount",
      showCounter: "showCounter",
      state: "state",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PTextareaWrapper_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PTextareaWrapper, [{
    type: Component,
    args: [{
      selector: "p-textarea-wrapper,[p-textarea-wrapper]",
      template: "<ng-content />",
      inputs: ["description", "hideLabel", "label", "message", "showCharacterCount", "showCounter", "state", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var PToast = class _PToast extends BaseComponentWithTheme {
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPToast_BaseFactory;
    return function PToast_Factory(__ngFactoryType__) {
      return (ɵPToast_BaseFactory || (ɵPToast_BaseFactory = ɵɵgetInheritedFactory(_PToast)))(__ngFactoryType__ || _PToast);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PToast,
    selectors: [["p-toast"], ["", "p-toast", ""]],
    inputs: {
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PToast_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PToast, [{
    type: Component,
    args: [{
      selector: "p-toast,[p-toast]",
      template: "<ng-content />",
      inputs: ["theme"],
      standalone: false
    }]
  }], null, null);
})();
var PWordmark = class _PWordmark extends BaseComponentWithTheme {
  aria;
  href;
  size;
  target;
  theme;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPWordmark_BaseFactory;
    return function PWordmark_Factory(__ngFactoryType__) {
      return (ɵPWordmark_BaseFactory || (ɵPWordmark_BaseFactory = ɵɵgetInheritedFactory(_PWordmark)))(__ngFactoryType__ || _PWordmark);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _PWordmark,
    selectors: [["p-wordmark"], ["", "p-wordmark", ""]],
    inputs: {
      aria: "aria",
      href: "href",
      size: "size",
      target: "target",
      theme: "theme"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function PWordmark_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PWordmark, [{
    type: Component,
    args: [{
      selector: "p-wordmark,[p-wordmark]",
      template: "<ng-content />",
      inputs: ["aria", "href", "size", "target", "theme"],
      standalone: false
    }]
  }], null, null);
})();
var DECLARATIONS = [PAccordion, PBanner, PButton, PButtonGroup, PButtonPure, PButtonTile, PCanvas, PCarousel, PCheckbox, PCheckboxWrapper, PContentWrapper, PCrest, PDisplay, PDivider, PDrilldown, PDrilldownItem, PDrilldownLink, PFieldset, PFieldsetWrapper, PFlag, PFlex, PFlexItem, PFlyout, PGrid, PGridItem, PHeading, PHeadline, PIcon, PInlineNotification, PInputDate, PInputEmail, PInputMonth, PInputNumber, PInputPassword, PInputSearch, PInputTel, PInputText, PInputTime, PInputUrl, PInputWeek, PLink, PLinkPure, PLinkSocial, PLinkTile, PLinkTileModelSignature, PLinkTileProduct, PMarque, PModal, PModelSignature, PMultiSelect, PMultiSelectOption, POptgroup, PPagination, PPinCode, PPopover, PRadioButtonWrapper, PRadioGroup, PRadioGroupOption, PScroller, PSegmentedControl, PSegmentedControlItem, PSelect, PSelectOption, PSelectWrapper, PSheet, PSpinner, PStepperHorizontal, PStepperHorizontalItem, PSwitch, PTable, PTableBody, PTableCell, PTableHead, PTableHeadCell, PTableHeadRow, PTableRow, PTabs, PTabsBar, PTabsItem, PTag, PTagDismissible, PText, PTextFieldWrapper, PTextList, PTextListItem, PTextarea, PTextareaWrapper, PToast, PWordmark];
var DefaultConfig = class {
  prefix = "";
  theme;
  // since theme exists on almost every component, it is defined here kind of like a global prop
};
var PorscheDesignSystemModule = class _PorscheDesignSystemModule {
  theme$ = inject(THEME_TOKEN);
  constructor(configParam) {
    const configs = configParam || [new DefaultConfig()];
    this.theme$.next(configs[0].theme || "light");
    configs.forEach(s);
  }
  static load(config) {
    return {
      ngModule: _PorscheDesignSystemModule,
      providers: [{
        provide: DefaultConfig,
        multi: true,
        // to support multiple prefixes in same module
        useValue: config
      }]
    };
  }
  static ɵfac = function PorscheDesignSystemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PorscheDesignSystemModule)(ɵɵinject(DefaultConfig, 8));
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _PorscheDesignSystemModule,
    declarations: [PAccordion, PBanner, PButton, PButtonGroup, PButtonPure, PButtonTile, PCanvas, PCarousel, PCheckbox, PCheckboxWrapper, PContentWrapper, PCrest, PDisplay, PDivider, PDrilldown, PDrilldownItem, PDrilldownLink, PFieldset, PFieldsetWrapper, PFlag, PFlex, PFlexItem, PFlyout, PGrid, PGridItem, PHeading, PHeadline, PIcon, PInlineNotification, PInputDate, PInputEmail, PInputMonth, PInputNumber, PInputPassword, PInputSearch, PInputTel, PInputText, PInputTime, PInputUrl, PInputWeek, PLink, PLinkPure, PLinkSocial, PLinkTile, PLinkTileModelSignature, PLinkTileProduct, PMarque, PModal, PModelSignature, PMultiSelect, PMultiSelectOption, POptgroup, PPagination, PPinCode, PPopover, PRadioButtonWrapper, PRadioGroup, PRadioGroupOption, PScroller, PSegmentedControl, PSegmentedControlItem, PSelect, PSelectOption, PSelectWrapper, PSheet, PSpinner, PStepperHorizontal, PStepperHorizontalItem, PSwitch, PTable, PTableBody, PTableCell, PTableHead, PTableHeadCell, PTableHeadRow, PTableRow, PTabs, PTabsBar, PTabsItem, PTag, PTagDismissible, PText, PTextFieldWrapper, PTextList, PTextListItem, PTextarea, PTextareaWrapper, PToast, PWordmark],
    exports: [PAccordion, PBanner, PButton, PButtonGroup, PButtonPure, PButtonTile, PCanvas, PCarousel, PCheckbox, PCheckboxWrapper, PContentWrapper, PCrest, PDisplay, PDivider, PDrilldown, PDrilldownItem, PDrilldownLink, PFieldset, PFieldsetWrapper, PFlag, PFlex, PFlexItem, PFlyout, PGrid, PGridItem, PHeading, PHeadline, PIcon, PInlineNotification, PInputDate, PInputEmail, PInputMonth, PInputNumber, PInputPassword, PInputSearch, PInputTel, PInputText, PInputTime, PInputUrl, PInputWeek, PLink, PLinkPure, PLinkSocial, PLinkTile, PLinkTileModelSignature, PLinkTileProduct, PMarque, PModal, PModelSignature, PMultiSelect, PMultiSelectOption, POptgroup, PPagination, PPinCode, PPopover, PRadioButtonWrapper, PRadioGroup, PRadioGroupOption, PScroller, PSegmentedControl, PSegmentedControlItem, PSelect, PSelectOption, PSelectWrapper, PSheet, PSpinner, PStepperHorizontal, PStepperHorizontalItem, PSwitch, PTable, PTableBody, PTableCell, PTableHead, PTableHeadCell, PTableHeadRow, PTableRow, PTabs, PTabsBar, PTabsItem, PTag, PTagDismissible, PText, PTextFieldWrapper, PTextList, PTextListItem, PTextarea, PTextareaWrapper, PToast, PWordmark]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [{
      provide: THEME_TOKEN,
      useValue: new BehaviorSubject("light")
    }]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PorscheDesignSystemModule, [{
    type: NgModule,
    args: [{
      declarations: DECLARATIONS,
      exports: DECLARATIONS,
      providers: [{
        provide: THEME_TOKEN,
        useValue: new BehaviorSubject("light")
      }]
    }]
  }], () => [{
    type: DefaultConfig,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var ToastManager = class _ToastManager {
  addMessage(message) {
    const toast = document.body.querySelector("p-toast,[p-toast]");
    customElements.whenDefined(toast.tagName.toLowerCase()).then(() => toast.addMessage(message));
  }
  static ɵfac = function ToastManager_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastManager)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ToastManager,
    factory: _ToastManager.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
export {
  DECLARATIONS,
  PAccordion,
  PBanner,
  PButton,
  PButtonGroup,
  PButtonPure,
  PButtonTile,
  PCanvas,
  PCarousel,
  PCheckbox,
  PCheckboxWrapper,
  PContentWrapper,
  PCrest,
  PDisplay,
  PDivider,
  PDrilldown,
  PDrilldownItem,
  PDrilldownLink,
  PFieldset,
  PFieldsetWrapper,
  PFlag,
  PFlex,
  PFlexItem,
  PFlyout,
  PGrid,
  PGridItem,
  PHeading,
  PHeadline,
  PIcon,
  PInlineNotification,
  PInputDate,
  PInputEmail,
  PInputMonth,
  PInputNumber,
  PInputPassword,
  PInputSearch,
  PInputTel,
  PInputText,
  PInputTime,
  PInputUrl,
  PInputWeek,
  PLink,
  PLinkPure,
  PLinkSocial,
  PLinkTile,
  PLinkTileModelSignature,
  PLinkTileProduct,
  PMarque,
  PModal,
  PModelSignature,
  PMultiSelect,
  PMultiSelectOption,
  POptgroup,
  PPagination,
  PPinCode,
  PPopover,
  PRadioButtonWrapper,
  PRadioGroup,
  PRadioGroupOption,
  PScroller,
  PSegmentedControl,
  PSegmentedControlItem,
  PSelect,
  PSelectOption,
  PSelectWrapper,
  PSheet,
  PSpinner,
  PStepperHorizontal,
  PStepperHorizontalItem,
  PSwitch,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
  PTabs,
  PTabsBar,
  PTabsItem,
  PTag,
  PTagDismissible,
  PText,
  PTextFieldWrapper,
  PTextList,
  PTextListItem,
  PTextarea,
  PTextareaWrapper,
  PToast,
  PWordmark,
  PorscheDesignSystemModule,
  THEME_TOKEN,
  ToastManager,
  c as componentsReady
};
//# sourceMappingURL=@porsche-design-system_components-angular.js.map
