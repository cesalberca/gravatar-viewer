<template>
  <section class="viewer">
    <header>
      <h1>Gravatar Viewer</h1>
      <label for="email">Email</label>
      <input name="email" type="email" v-model="email" class="email" />
    </header>

    <main v-if="showUser">
      <h3>User</h3>
      <img :src="user.photo" alt="User image" />
    </main>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch, Inject } from "vue-property-decorator";
import { GravatarRepository } from "../domains/gravatar/repositories/GravatarRepository";
import { User } from "../domains/users/User";
import md5 from "md5";
import { debounce } from "../utils/debounce";

@Component
export default class UserComponent extends Vue {
  email: string = "";
  user: User = User.empty();

  @Inject()
  gravatarRepository!: GravatarRepository;

  debouncedQueryEmail!: () => void;

  created() {
    this.debouncedQueryEmail = debounce(this.queryEmail, 1000);
  }

  get showUser() {
    return this.user.exists();
  }

  @Watch("email")
  onEmailChange() {
    this.debouncedQueryEmail();
  }

  async queryEmail() {
    const hash = md5(this.email);
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

.email {
  margin-left: 8px;
}
</style>
