<template>
  <div><slot /></div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { GravatarRepositoryFactory } from "./../domains/gravatar/repositories/GravatarRepositoryFactory";
import { GravatarRepository } from "./../domains/gravatar/repositories/GravatarRepository";
import { debounce } from "./../utils/debounce";
import { hasher } from "./../utils/hasher";

@Component
export default class ProviderFactory extends Vue {
  @Provide()
  gravatarRepository: GravatarRepository = GravatarRepositoryFactory.photo();

  @Provide()
  debounce: typeof debounce = debounce;

  @Provide()
  hasher: typeof hasher = hasher;
}
</script>
