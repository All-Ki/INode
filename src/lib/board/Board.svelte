<script lang="ts">
  import FlowNode from "@/lib/node/FlowNode.svelte";
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

  import ColorSelectorNode from "@/lib/node/ColorSelectorNode.svelte";
  import { edges, nodes, nodeTypes } from "../store.svelte";
  import Sidebar from "../sidebar/sidebar.svelte";

  const bgColor = writable("#1A192B");
</script>

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
    <Sidebar />
  </SvelteFlow>
</div>
