<template>
  <ProviderFactory> <AvatarViewerContainer /> </ProviderFactory>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AvatarViewerContainer from "./components/AvatarViewerContainer.vue";
import ProviderFactory from "./components/ProviderFactory.vue";

@Component({
  components: {
    AvatarViewerContainer,
    ProviderFactory
  }
})
export default class App extends Vue {}
</script>
