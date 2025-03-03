<script lang="ts">
  import { writable, type Writable } from "svelte/store";
  import {
    SvelteFlow,
    Background,
    Controls,
    type Node,
    type Edge,
  } from "@xyflow/svelte";

  import { nodeTypes } from "../store.svelte";
  import Sidebar from "../sidebar/sidebar.svelte";
  import { serialize } from "v8";
  interface props {
    edges: Writable<Edge[]>;
    nodes: Writable<Node[]>;
  }
  let { edges, nodes }: props = $props();
  if (!nodes) {
    nodes = writable<Node[]>([]);
  }
  if (!edges) {
    edges = writable<Edge[]>([]);
  }
  const bgColor = writable("#1A192B");

    
  }
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
    <Sidebar {nodes} {edges} />
  </SvelteFlow>
</div>
