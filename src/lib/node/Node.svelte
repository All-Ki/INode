<script lang="ts">
  class Node<TIn, TOut> {
    public countIn: number = 3;
    public countOut: number = 4;
    public name: string = "node";
    public apply(input: TIn): void {}
  }

  class NodeIoType {
    public typeName: string = "type";
    public value: any;
  }

  class NodeIoValue<T extends NodeIoType> {}

  let n = new Node<number, number>();
</script>

<span>
  <h1>{n.name}</h1>
  <ul>
    {#each { length: n.countIn }}
      <li>itesm</li>
    {/each}
  </ul>

  <ul>
    {#each { length: n.countOut }}
      <li>item</li>
    {/each}
  </ul>
</span>
