<script lang="ts">
  import { Node, NodeIoType, NodeIoValue } from "./Node";
  import type { NodeIoListValues } from "./Node";
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";

  type $$Props = NodeProps;

  export let isConnectable: $$Props["isConnectable"];

  type TIn = { a: NodeIoType; c: NodeIoType };
  type TOut = { b: NodeIoType; d: NodeIoType };
  class SampleNode extends Node<TIn, TOut> {
    public name: string = "SampleNode";

    public apply(input: NodeIoListValues<TIn>): NodeIoListValues<TOut> {
      return {
        b: new NodeIoValue(new NodeIoType(), input.a.value),
        d: new NodeIoValue(new NodeIoType(), input.c.value),
      };
    }
  }
  const inputs = { a: new NodeIoType(), c: new NodeIoType() };
  const outputs = { b: new NodeIoType(), d: new NodeIoType() };

  const n = new SampleNode({ inputs, outputs });
</script>

{#each Object.keys(n.typeIn) as key, i}
  {key}
  <Handle
    type="target"
    id={key}
    position={Position.Left}
    style="top: {20 +
      (80 * i) / Object.keys(n.typeIn).length}%; background: #555;"
    {isConnectable}
  />
{/each}

<div>{n.name}</div>
{#each Object.keys(n.typeOut) as key, i}
  <Handle
    type="source"
    id={key}
    position={Position.Right}
    style="top: {20 +
      (80 * i) /
        Object.keys(n.typeIn).length}%; background: #555;background: #555;"
    {isConnectable}
  />
{/each}
