import Vue from "vue";
import AvatarViewerContainer from "./../AvatarViewerContainer.vue";
import { Wrapper, shallowMount } from "@vue/test-utils";
import { User } from "../../domains/users/User";
import { flushPromises } from "../../utils/flushPromises";
import { hasher } from "../../utils/hasher";
import { debounce } from "../../utils/debounce";
import { GravatarRepository } from "../../domains/gravatar/repositories/GravatarRepository";

describe("AvatarViewerContainer", () => {
  let wrapper: Wrapper<Vue>;
  let gravatarRepositoryMock: GravatarRepository;
  let debounceMock: typeof debounce;
  let hasherMock: typeof hasher;

  beforeEach(() => {
    hasherMock = jest.fn();
    debounceMock = jest.fn((func: Function) => () => func());
    gravatarRepositoryMock = {
      getUserByEmailHash: jest
        .fn()
        .mockReturnValue(Promise.resolve(new User("foo")))
    };

    wrapper = shallowMount(AvatarViewerContainer, {
      provide: {
        gravatarRepository: gravatarRepositoryMock,
        debounce: debounceMock,
        hasher: hasherMock
      }
    });
  });

  it("should call gravatarRepository when email changes", async () => {
    const userFormComponent = wrapper.find({ name: "UserFormComponent" });

    userFormComponent.vm.$emit("on-email-change", "foo@foo.com");
    await flushPromises();

    expect(gravatarRepositoryMock.getUserByEmailHash).toHaveBeenCalled();
  });

  it("should debounce call when email changes", async () => {
    const userFormComponent = wrapper.find({ name: "UserFormComponent" });

    userFormComponent.vm.$emit("on-email-change", "foo@foo.com");
    await flushPromises();

    expect(debounceMock).toHaveBeenCalled();
  });

  it("should set user to AvatarComponent", async () => {
    const userFormComponent = wrapper.find({ name: "UserFormComponent" });
    const avatarComponent = wrapper.find({ name: "AvatarComponent" });

    userFormComponent.vm.$emit("on-email-change", "foo@foo.com");
    await flushPromises();

    expect(avatarComponent.props("user").photo).toBe("foo");
  });

  it("should use the hasher", async () => {
    expect.assertions(1);

    const userFormComponent = wrapper.find({ name: "UserFormComponent" });

    userFormComponent.vm.$emit("on-email-change", "foo@foo.com");
    await flushPromises();

    expect(hasherMock).toHaveBeenCalledWith("foo@foo.com");
  });
});
