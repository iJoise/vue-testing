import App from "@/App.vue";
import { mount } from "@vue/test-utils";

// запустить отладчик
// node --inspect-brk ./node_modules/jest-cli/bin/jest.js
// в консоли браузера можно дебажить в рантайме

describe("Counter", () => {
  let wrapper;

  const createComponent = () => {
    wrapper = mount(App);
  };

  const findButtonByText = (buttonText) =>
    wrapper.findAll("button").wrappers.find((w) => w.text() === buttonText);

  afterEach(() => {
    wrapper.destroy();
  });

  it("when shows 0 when initialized", () => {
    //Arrange
    createComponent();
    //Act
    // ----
    //Assert
    expect(wrapper.text()).toContain("0");
  });

  it.each`
    buttonText | change                 | expectedResult
    ${"+"}     | ${"increments by one"} | ${"1"}
    ${"-"}     | ${"decrements by one"} | ${"-1"}
  `(
    "$change when $buttonText button clicked",
    async ({ buttonText, expectedResult }) => {
      createComponent();

      await findButtonByText(buttonText).trigger("click");
      expect(wrapper.text()).toContain(expectedResult);
    }
  );

  const RESET_BTN = "Reset";

  it("shows reset button when counter is below zer", async () => {
    createComponent();
    await findButtonByText("-").trigger("click");
    expect(wrapper.text()).toContain("-1");

    // console.log(wrapper.html());
    // expect(wrapper.find("[data-test-id=reset]").exists()).toBe(true);
    expect(findButtonByText(RESET_BTN).exists()).toBe(true);
  });

  it("does not show reset button when counter is not below zer", async () => {
    createComponent();
    // console.log(wrapper.html());
    // expect(wrapper.find("[data-test-id=reset]").exists()).toBe(true);
    expect(findButtonByText(RESET_BTN)).toBe(undefined);
  });
});
