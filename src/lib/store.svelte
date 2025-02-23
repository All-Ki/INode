<script lang="ts" module>
  import { writable } from "svelte/store";
  import type { Node, Edge, NodeTypes } from "@xyflow/svelte";
  import FlowNode from "@/lib/node/FlowNode.svelte";
  import ColorSelectorNode from "@/lib/node/ColorSelectorNode.svelte";
  // Background color store
  export const bgColor = writable("#1A192B");

  export const nodeTypes = $state<NodeTypes>({
    baseNode: FlowNode,
    selectorNode: ColorSelectorNode,
  });
  // Nodes store
  export const nodes = writable<Node[]>([
    {
      id: "1",
      type: "input",
      data: { label: "An input node" },
      position: { x: 0, y: 50 },
    },
    {
      id: "2",
      type: "baseNode",
      data: { color: bgColor },
      style: "border: 1px solid #777; padding: 10px;",
      position: { x: 300, y: 50 },
    },
    {
      id: "3",
      type: "output",
      data: { label: "Output A" },
      position: { x: 650, y: 25 },
    },
    {
      id: "5",
      type: "baseNode",
      data: { color: bgColor },
      style: "border: 1px solid #777; padding: 10px;",
      position: { x: 300, y: 50 },
    },
  ]);

  // Edges store
  export const edges = writable<Edge[]>([]);
</script>
