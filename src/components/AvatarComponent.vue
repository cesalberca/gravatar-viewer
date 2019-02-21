<template>
  <div v-if="showUser">
    <h3>User</h3>
    <img :src="user.photo" alt="User image" />
  </div>
</template>
<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { User } from "../domains/users/User";

@Component
export default class AvatarComponent extends Vue {
  @Prop({ type: Object, default: () => User.empty() })
  user!: User;

  get showUser() {
    return this.user.exists();
  }
}
</script>
