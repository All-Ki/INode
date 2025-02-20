<script lang="ts">
  class NodeIoType {
    public typeName: string = "type";
    public isSameType(other: NodeIoType): boolean {
      return this.typeName === other.typeName;
    }
  }

  class NodeIoValue<T extends NodeIoType = NodeIoType> {
    public type: T;
    public value: any;
    public constructor(type: T, value: any) {
      this.type = type;
      this.value = value;
    }
    public isSameType(other: NodeIoValue): boolean {
      return this.type.isSameType(other.type);
    }
  }

  type NodeIoList = { [name: string]: NodeIoType };
  type NodeIoListValues<T extends NodeIoList> = {
    [K in keyof T]: NodeIoValue<T[K]>;
  };

  abstract class Node<TIn extends NodeIoList, TOut extends NodeIoList> {
    public typeIn: TIn;
    public typeOut: TOut;
    public id: string = crypto.randomUUID();

    public get countIn(): number {
      return Object.keys(this.typeIn).length;
    }
    public get countOut(): number {
      return Object.keys(this.typeOut).length;
    }

    public constructor(typeIn: TIn, typeOut: TOut) {
      this.typeIn = typeIn;
      this.typeOut = typeOut;
    }
    public name: string = "node";

    public abstract apply(input: NodeIoListValues<TIn>): NodeIoListValues<TOut>;
  }

  class SampleNode extends Node<{ a: NodeIoType }, { b: NodeIoType }> {
    public name: string = "SampleNode";

    public apply(
      input: NodeIoListValues<{ a: NodeIoType }>
    ): NodeIoListValues<{ b: NodeIoType }> {
      return { b: new NodeIoValue(new NodeIoType(), input.a.value) };
    }
  }

  const n = new SampleNode({ a: new NodeIoType() }, { b: new NodeIoType() });
</script>

<span class="flex flex-col">
  <span>{n.name}</span>
  <div class="flex flex-row">
    <ul>
      {#each Object.keys(n.typeIn) as key}
        <li>{key}</li>
      {/each}
    </ul>

    <ul>
      {#each Object.keys(n.typeOut) as key}
        <li>{key}</li>
      {/each}
    </ul>
  </div>
</span>
