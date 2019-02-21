import Vue from "vue";
import AvatarComponent from "./../AvatarComponent.vue";
import { Wrapper, shallowMount } from "@vue/test-utils";
import { User } from "./../../domains/users/User";

describe("AvatarComponent", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    wrapper = shallowMount(AvatarComponent);
  });

  it("should hide if the user doesn't exist", () => {
    wrapper.setProps({ user: User.empty() });

    expect(wrapper.html()).toBeUndefined();
  });

  it("should show if the user exists", () => {
    wrapper.setProps({ user: new User("foo") });

    expect(wrapper.html()).toBeDefined();
  });

  it("should set the image url with the user's photo", () => {
    wrapper.setProps({ user: new User("foo") });

    const image = wrapper.find("img");
    expect(image.attributes("src")).toEqual("foo");
  });
});
