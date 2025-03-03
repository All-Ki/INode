export class NodeIoType {
  public typeName: string = "type";
  public isSameType(other: NodeIoType): boolean {
    return this.typeName === other.typeName;
  }
}

export class NodeIoValue<T extends NodeIoType = NodeIoType> {
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

export type NodeIoList = { [name: string]: NodeIoType };
export type NodeIoListValues<T extends NodeIoList> = {
  [K in keyof T]: NodeIoValue<T[K]>;
};

export abstract class Node<TIn extends NodeIoList, TOut extends NodeIoList> {
  public typeIn: TIn;
  public typeOut: TOut;
  public id: string = crypto.randomUUID();

  public get countIn(): number {
    return Object.keys(this.typeIn).length;
  }
  public get countOut(): number {
    return Object.keys(this.typeOut).length;
  }

  public constructor(data: { inputs: TIn; outputs: TOut }) {
    this.typeIn = data.inputs;
    this.typeOut = data.outputs;
  }
  public name: string = "node";

  public abstract apply(
    input: NodeIoListValues<TIn>
  ): Promise<NodeIoListValues<TOut>>;
}
