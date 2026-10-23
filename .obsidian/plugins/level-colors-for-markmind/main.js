"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => LevelColorsForMarkMind
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var CONTENT_SELECTOR = ".mm-mindmap-content";
var NODE_SELECTOR = ":scope > .mm-node";
var LEVEL_ATTRIBUTE = "data-lcfm-level";
var FIRST_UNDERLINE_DEPTH = 2;
var VISUAL_LEVEL_COUNT = 24;
var REAPPLY_DELAY_MS = 160;
var MAX_ENDPOINT_NODE_DISTANCE = 90;
var LevelColorsForMarkMind = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.timer = null;
    this.observer = null;
  }
  onload() {
    this.registerEvent(this.app.workspace.on("layout-change", () => this.schedule()));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.schedule()));
    this.observer = new MutationObserver((records) => {
      const shouldReapply = records.some((record) => this.affectsMindMap(record));
      if (shouldReapply) {
        this.schedule();
      }
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["d", "class"]
    });
    this.register(() => {
      var _a;
      return (_a = this.observer) == null ? void 0 : _a.disconnect();
    });
    this.addCommand({
      id: "reapply-level-colors",
      name: "Re-apply markmind level colours",
      callback: () => this.apply(true)
    });
    this.addCommand({
      id: "copy-level-color-diagnostics",
      name: "Copy level colors diagnostics",
      callback: async () => {
        const report = this.makeDiagnostics();
        try {
          await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
          new import_obsidian.Notice("Level colors diagnostics copied");
        } catch (e) {
          new import_obsidian.Notice("Could not copy diagnostics to clipboard");
        }
      }
    });
    this.schedule();
  }
  onunload() {
    var _a;
    (_a = this.observer) == null ? void 0 : _a.disconnect();
    this.observer = null;
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    this.clearAppliedLevels(document);
  }
  schedule() {
    if (this.timer !== null) {
      return;
    }
    this.timer = window.setTimeout(() => {
      this.timer = null;
      this.apply(false);
    }, REAPPLY_DELAY_MS);
  }
  affectsMindMap(record) {
    const target = record.target.nodeType === 1 ? record.target : record.target.parentElement;
    if (target == null ? void 0 : target.closest(CONTENT_SELECTOR)) {
      return true;
    }
    if (record.type === "attributes") {
      return record.attributeName === "class" && target !== null && target.querySelector(CONTENT_SELECTOR) !== null;
    }
    return Array.from(record.addedNodes).some((node) => {
      if (node.nodeType !== 1) {
        return false;
      }
      const element = node;
      return element.matches(CONTENT_SELECTOR) || element.querySelector(CONTENT_SELECTOR) !== null;
    });
  }
  apply(showNotice) {
    const host = document;
    const totals = {
      nodes: 0,
      branches: 0,
      underlines: 0,
      expectedUnderlines: 0,
      actualUnderlines: 0
    };
    for (const content of this.queryAll(host, CONTENT_SELECTOR)) {
      const stats = this.applyToMindMap(content);
      totals.nodes += stats.nodes;
      totals.branches += stats.branches;
      totals.underlines += stats.underlines;
      totals.expectedUnderlines += stats.expectedUnderlines;
      totals.actualUnderlines += stats.actualUnderlines;
    }
    if (showNotice) {
      const underlineStatus = totals.expectedUnderlines === totals.actualUnderlines && totals.underlines === totals.actualUnderlines ? "exact" : "incomplete mapping (unmatched underlines left uncoloured)";
      new import_obsidian.Notice(
        `Level Colors for MarkMind: ${totals.nodes} nodes, ${totals.branches} branches, ${totals.underlines} underlines; underline mapping ${underlineStatus}.`
      );
    }
  }
  applyToMindMap(content) {
    var _a;
    const stale = new Set(this.queryAll(content, `[${LEVEL_ATTRIBUTE}]`));
    const mark = (element, depth) => {
      this.assignVisualLevel(element, depth);
      stale.delete(element);
    };
    const finish = (stats) => {
      for (const element of stale) {
        element.removeAttribute(LEVEL_ATTRIBUTE);
      }
      return stats;
    };
    const empty = {
      nodes: 0,
      branches: 0,
      underlines: 0,
      expectedUnderlines: 0,
      actualUnderlines: 0
    };
    const nodes = this.queryAll(content, NODE_SELECTOR);
    const svg = this.findMainBranchSvg(content);
    const paths = svg ? this.queryAll(svg, "path") : [];
    const lines = svg ? this.queryAll(svg, "line") : [];
    const root = this.findRootNode(nodes);
    if (root === null) {
      return finish({ ...empty, actualUnderlines: lines.length });
    }
    const rects = new Map(
      nodes.map((node) => [node, node.getBoundingClientRect()])
    );
    const graphState = this.buildGraph(nodes, paths, rects);
    const treeState = this.orientTree(root, graphState, paths);
    const traversal = this.preorderTraversal(root, treeState.children);
    for (const node of traversal) {
      const nodeDepth = treeState.depth.get(node);
      if (nodeDepth === void 0) {
        continue;
      }
      mark(node, nodeDepth);
      const bar = node.querySelector(".mm-node-bar");
      if (bar !== null) {
        const children = (_a = treeState.children.get(node)) != null ? _a : [];
        const firstChild = children[0];
        const childDepth = firstChild !== void 0 ? treeState.depth.get(firstChild) : void 0;
        if (childDepth !== void 0) {
          mark(bar, childDepth);
        } else {
          bar.removeAttribute(LEVEL_ATTRIBUTE);
        }
      }
    }
    let branchCount = 0;
    for (const path of paths) {
      const edge = graphState.pathEdges.get(path);
      if (edge === void 0) {
        continue;
      }
      const oriented = this.resolveOrientedEdge(
        edge,
        treeState.parent,
        treeState.depth
      );
      if (oriented === null) {
        continue;
      }
      const childDepth = treeState.depth.get(oriented.child);
      if (childDepth === void 0) {
        continue;
      }
      mark(path, childDepth);
      branchCount++;
    }
    const underlineNodes = traversal.filter(
      (node) => {
        var _a2;
        return ((_a2 = treeState.depth.get(node)) != null ? _a2 : -1) >= FIRST_UNDERLINE_DEPTH;
      }
    );
    const mappingComplete = traversal.length === nodes.length && branchCount === paths.length && lines.length === underlineNodes.length;
    const pairCount = mappingComplete ? lines.length : 0;
    for (let index = 0; index < pairCount; index++) {
      const nodeDepth = treeState.depth.get(underlineNodes[index]);
      if (nodeDepth !== void 0) {
        mark(lines[index], nodeDepth);
      }
    }
    return finish({
      nodes: traversal.length,
      branches: branchCount,
      underlines: pairCount,
      expectedUnderlines: underlineNodes.length,
      actualUnderlines: lines.length
    });
  }
  buildGraph(nodes, paths, rects) {
    var _a, _b;
    const graph = new Map(
      nodes.map((node) => [node, /* @__PURE__ */ new Set()])
    );
    const pathEdges = /* @__PURE__ */ new Map();
    for (const path of paths) {
      const endpoints = this.getPathEndpoints(path);
      if (endpoints === null) {
        continue;
      }
      const first = this.findNearestNode(endpoints[0], nodes, rects);
      const second = this.findNearestNode(endpoints[1], nodes, rects);
      if (first.node === null || second.node === null || first.node === second.node || first.distance > MAX_ENDPOINT_NODE_DISTANCE || second.distance > MAX_ENDPOINT_NODE_DISTANCE) {
        continue;
      }
      (_a = graph.get(first.node)) == null ? void 0 : _a.add(second.node);
      (_b = graph.get(second.node)) == null ? void 0 : _b.add(first.node);
      pathEdges.set(path, [first.node, second.node]);
    }
    return { graph, pathEdges };
  }
  orientTree(root, graphState, paths) {
    var _a, _b;
    const depth = /* @__PURE__ */ new Map([[root, 0]]);
    const parent = /* @__PURE__ */ new Map([[root, null]]);
    const queue = [root];
    for (let index = 0; index < queue.length; index++) {
      const current = queue[index];
      const currentDepth = depth.get(current);
      if (currentDepth === void 0) {
        continue;
      }
      for (const next of (_a = graphState.graph.get(current)) != null ? _a : []) {
        if (depth.has(next)) {
          continue;
        }
        depth.set(next, currentDepth + 1);
        parent.set(next, current);
        queue.push(next);
      }
    }
    const children = new Map(
      [...graphState.graph.keys()].map((node) => [node, []])
    );
    const seenChildren = /* @__PURE__ */ new Set();
    for (const path of paths) {
      const edge = graphState.pathEdges.get(path);
      if (edge === void 0) {
        continue;
      }
      const oriented = this.resolveOrientedEdge(edge, parent, depth);
      if (oriented === null || seenChildren.has(oriented.child)) {
        continue;
      }
      (_b = children.get(oriented.parent)) == null ? void 0 : _b.push(oriented.child);
      seenChildren.add(oriented.child);
    }
    return { depth, parent, children };
  }
  resolveOrientedEdge(edge, parent, depth) {
    const [first, second] = edge;
    if (parent.get(first) === second) {
      return { parent: second, child: first };
    }
    if (parent.get(second) === first) {
      return { parent: first, child: second };
    }
    const firstDepth = depth.get(first);
    const secondDepth = depth.get(second);
    if (firstDepth === void 0 || secondDepth === void 0 || firstDepth === secondDepth) {
      return null;
    }
    return firstDepth < secondDepth ? { parent: first, child: second } : { parent: second, child: first };
  }
  preorderTraversal(root, children) {
    var _a;
    const output = [];
    const stack = [root];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node === void 0) {
        break;
      }
      output.push(node);
      const nodeChildren = (_a = children.get(node)) != null ? _a : [];
      for (let index = nodeChildren.length - 1; index >= 0; index--) {
        stack.push(nodeChildren[index]);
      }
    }
    return output;
  }
  assignVisualLevel(element, depth) {
    const visualLevel = this.visualLevelForDepth(depth);
    const value = String(visualLevel);
    if (element.getAttribute(LEVEL_ATTRIBUTE) !== value) {
      element.setAttribute(LEVEL_ATTRIBUTE, value);
    }
  }
  visualLevelForDepth(depth) {
    return Math.max(depth, 0) % VISUAL_LEVEL_COUNT;
  }
  clearAppliedLevels(root) {
    for (const element of this.queryAll(
      root,
      `[${LEVEL_ATTRIBUTE}]`
    )) {
      element.removeAttribute(LEVEL_ATTRIBUTE);
    }
  }
  findMainBranchSvg(content) {
    const svgs = this.queryAll(content, ":scope > svg");
    if (svgs.length === 0) {
      return null;
    }
    let best = svgs[0];
    let bestCount = -1;
    for (const svg of svgs) {
      const count = svg.querySelectorAll("path,line").length;
      if (count > bestCount) {
        best = svg;
        bestCount = count;
      }
    }
    return best;
  }
  findRootNode(nodes) {
    var _a, _b;
    return (_b = (_a = nodes.find(
      (node) => !node.classList.contains("mm-node-left") && !node.classList.contains("mm-node-right")
    )) != null ? _a : nodes[0]) != null ? _b : null;
  }
  getPathEndpoints(path) {
    try {
      const length = path.getTotalLength();
      if (!Number.isFinite(length) || length <= 0) {
        return null;
      }
      const start = this.pathPointToScreen(path, path.getPointAtLength(0));
      const end = this.pathPointToScreen(path, path.getPointAtLength(length));
      return start !== null && end !== null ? [start, end] : null;
    } catch (e) {
      return null;
    }
  }
  pathPointToScreen(path, point) {
    const svg = path.ownerSVGElement;
    const ctm = path.getScreenCTM();
    if (svg === null || ctm === null) {
      return null;
    }
    try {
      const svgPoint = svg.createSVGPoint();
      svgPoint.x = point.x;
      svgPoint.y = point.y;
      const transformed = svgPoint.matrixTransform(ctm);
      return { x: transformed.x, y: transformed.y };
    } catch (e) {
      return null;
    }
  }
  findNearestNode(point, nodes, rects) {
    let bestNode = null;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const node of nodes) {
      const rect = rects.get(node);
      if (rect === void 0) {
        continue;
      }
      const distance = this.pointToRectDistance(point, rect);
      if (distance < bestDistance) {
        bestNode = node;
        bestDistance = distance;
      }
    }
    return { node: bestNode, distance: bestDistance };
  }
  pointToRectDistance(point, rect) {
    const dx = Math.max(rect.left - point.x, 0, point.x - rect.right);
    const dy = Math.max(rect.top - point.y, 0, point.y - rect.bottom);
    return Math.hypot(dx, dy);
  }
  makeDiagnostics() {
    var _a;
    const host = document;
    const reports = [];
    for (const content of this.queryAll(host, CONTENT_SELECTOR)) {
      const nodes = this.queryAll(content, NODE_SELECTOR);
      const svg = this.findMainBranchSvg(content);
      const paths = svg ? this.queryAll(svg, "path") : [];
      const lines = svg ? this.queryAll(svg, "line") : [];
      if (nodes.length === 0 || svg === null) {
        reports.push({
          nodes: nodes.length,
          branchSVGPaths: paths.length,
          svgLines: lines.length,
          error: "No complete MarkMind tree found"
        });
        continue;
      }
      const root = this.findRootNode(nodes);
      if (root === null) {
        reports.push({
          nodes: nodes.length,
          branchSVGPaths: paths.length,
          svgLines: lines.length,
          error: "Root node not found"
        });
        continue;
      }
      const rects = new Map(
        nodes.map((node) => [node, node.getBoundingClientRect()])
      );
      const graphState = this.buildGraph(nodes, paths, rects);
      const treeState = this.orientTree(root, graphState, paths);
      const traversal = this.preorderTraversal(root, treeState.children);
      const underlineNodes = traversal.filter(
        (node) => {
          var _a2;
          return ((_a2 = treeState.depth.get(node)) != null ? _a2 : -1) >= FIRST_UNDERLINE_DEPTH;
        }
      );
      const nodeLevels = {};
      for (const depth of treeState.depth.values()) {
        const key = String(depth);
        nodeLevels[key] = ((_a = nodeLevels[key]) != null ? _a : 0) + 1;
      }
      reports.push({
        nodes: nodes.length,
        reachedNodesFromRoot: treeState.depth.size,
        branchSVGPaths: paths.length,
        matchedPaths: graphState.pathEdges.size,
        svgLines: lines.length,
        expectedUnderlineNodes: underlineNodes.length,
        lineCountMatches: lines.length === underlineNodes.length,
        nodeLevels,
        nodeSamples: traversal.slice(0, 20).map((node) => {
          var _a2, _b, _c, _d, _e;
          const bar = node.querySelector(".mm-node-bar");
          const children = (_a2 = treeState.children.get(node)) != null ? _a2 : [];
          return {
            depth: (_b = treeState.depth.get(node)) != null ? _b : null,
            visualLevel: node.getAttribute(LEVEL_ATTRIBUTE),
            junctionVisualLevel: (_c = bar == null ? void 0 : bar.getAttribute(LEVEL_ATTRIBUTE)) != null ? _c : null,
            hasChildren: children.length > 0,
            text: (_e = (_d = node.textContent) == null ? void 0 : _d.trim().replace(/\s+/g, " ").slice(0, 80)) != null ? _e : null,
            computedColor: getComputedStyle(node).color,
            junctionColor: bar !== null ? getComputedStyle(bar).backgroundColor : null
          };
        }),
        pathSamples: paths.slice(0, 20).map((path, index) => ({
          index,
          visualLevel: path.getAttribute(LEVEL_ATTRIBUTE),
          computedStroke: getComputedStyle(path).stroke
        })),
        lineSamples: lines.slice(0, 20).map((line, index) => {
          var _a2;
          return {
            index,
            visualLevel: line.getAttribute(LEVEL_ATTRIBUTE),
            expectedNodeDepth: underlineNodes[index] ? (_a2 = treeState.depth.get(underlineNodes[index])) != null ? _a2 : null : null,
            computedStroke: getComputedStyle(line).stroke
          };
        })
      });
    }
    return reports;
  }
  queryAll(root, selector) {
    return Array.from(root.querySelectorAll(selector));
  }
};

/* nosourcemap */