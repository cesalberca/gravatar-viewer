<template>
  <section class="viewer">
    <UserFormComponent @on-email-change="updateEmail" />
    <AvatarComponent :user="user" />
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch, Inject } from "vue-property-decorator";
import { GravatarRepository } from "../domains/gravatar/repositories/GravatarRepository";
import UserFormComponent from "./UserFormComponent.vue";
import AvatarComponent from "./AvatarComponent.vue";
import { User } from "../domains/users/User";
import { debounce } from "../utils/debounce";
import { hasher } from "../utils/hasher";

@Component({
  components: {
    AvatarComponent,
    UserFormComponent
  }
})
export default class AvatarViewerContainer extends Vue {
  email: string = "";
  user: User = User.empty();

  @Inject()
  gravatarRepository!: GravatarRepository;

  @Inject()
  debounce!: typeof debounce;

  @Inject()
  hasher!: typeof hasher;

  debouncedQueryEmail!: () => void;

  created() {
    this.debouncedQueryEmail = this.debounce(this.queryEmail, 1000);
  }

  @Watch("email")
  onEmailChange() {
    this.debouncedQueryEmail();
  }

  updateEmail(email: string) {
    this.email = email;
  }

  async queryEmail() {
    const hash = this.hasher(this.email);
    const user = await this.gravatarRepository.getUserByEmailHash(hash);
    this.user = user;
  }
}
</script>
<style scoped>
.viewer {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
