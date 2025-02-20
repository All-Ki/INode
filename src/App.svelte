<script lang="ts">
  import { writable } from "svelte/store";
  import {
    SvelteFlow,
    Background,
    Controls,
    MiniMap,
    Position,
    type Node,
    type Edge,
  } from "@xyflow/svelte";

  import ColorSelectorNode from "./lib/node/ColorSelectorNode.svelte";

  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";

  const nodeTypes = {
    selectorNode: ColorSelectorNode,
  };

  const bgColor = writable("#1A192B");

  const initialNodes: Node[] = [
    {
      id: "1",
      type: "input",
      data: { label: "An input node" },
      position: { x: 0, y: 50 },
      sourcePosition: Position.Right,
    },
    {
      id: "2",
      type: "selectorNode",
      data: { color: bgColor },
      style: "border: 1px solid #777; padding: 10px;",
      position: { x: 300, y: 50 },
    },
    {
      id: "3",
      type: "output",
      data: { label: "Output A" },
      position: { x: 650, y: 25 },
      targetPosition: Position.Left,
    },
    {
      id: "4",
      type: "output",
      data: { label: "Output B" },
      position: { x: 650, y: 100 },
      targetPosition: Position.Left,
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: "stroke: #fff;",
    },
    {
      id: "e2a-3",
      source: "2",
      target: "3",
      sourceHandle: "a",
      animated: true,
      style: "stroke: #fff;",
    },
    {
      id: "e2b-4",
      source: "2",
      target: "4",
      sourceHandle: "b",
      animated: true,
      style: "stroke: #fff;",
    },
  ];

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable(initialEdges);
</script>

<main>
  <div style="height:100vh; width:100vw">
    <SvelteFlow
      {nodes}
      {edges}
      {nodeTypes}
      style="background: {$bgColor}"
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </SvelteFlow>
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
