<script>
  import { Stage, Layer, Star } from "svelte-konva";
  let width = window.innerWidth;
  let height = window.innerHeight;
</script>

<Stage config={{ width, height }}>
  <Layer></Layer>
</Stage>
