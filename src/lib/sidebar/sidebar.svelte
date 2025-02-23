<script lang="ts">
  import { writable } from "svelte/store";
  import { nodes, edges, bgColor, nodeTypes } from "@/lib/store.svelte"; // Update path as needed
  import { v4 as uuidv4 } from "uuid";
  const isSidebarVisible = writable(true);
  const nodeType = writable("baseNode");

  function toggleSidebar() {
    isSidebarVisible.update((visible) => !visible);
  }

  function addNode() {
    nodes.update((currentNodes) => [
      ...currentNodes,
      {
        id: uuidv4(),
        type: $nodeType,
        data: { color: bgColor },
        position: { x: 200, y: 200 },
        style: "border: 1px solid #777; padding: 10px;",
      },
    ]);
  }

  function resetFlow() {
    nodes.set([]);
    edges.set([]);
  }
</script>

<button
  class="absolute top-1/2 transform -translate-y-1/2 z-50 bg-gray-700 text-white p-2 rounded-full flex items-center justify-center w-10 h-10 transition-all duration-300"
  class:left-48={$isSidebarVisible}
  on:click={toggleSidebar}
>
  <svg
    class="w-6 h-6 transition-transform duration-300"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    class:rotate-180={!$isSidebarVisible}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 19l-7-7 7-7"
    />
  </svg>
</button>
<aside
  class="fixed left-0 top-0 w-48 h-full bg-gray-800 text-white p-4 flex flex-col gap-2 z-40 transition-transform duration-300"
  class:translate-x-[-100%]={!$isSidebarVisible}
>
  <label class="flex flex-col gap-1">
    <span>Node Type:</span>
    <select bind:value={$nodeType} class="bg-gray-600 text-white p-2 rounded">
      {#each Object.entries(nodeTypes) as [key, v]}
        <option value={key}>{key}</option>
      {/each}
    </select>
  </label>
  <h2 class="text-lg font-bold">Flow Controls</h2>
  <button
    class="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded"
    on:click={addNode}
  >
    Add Node
  </button>
  <button
    class="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
    on:click={resetFlow}
  >
    Reset Flow
  </button>
  <label class="flex flex-col gap-1">
    <span>Background Color:</span>
    <input type="color" bind:value={$bgColor} class="w-full" />
  </label>
</aside>
