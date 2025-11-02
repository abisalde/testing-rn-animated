import { renderHook } from "@testing-library/react-hooks";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Button, View } from "react-native";
import Animated, {
  getAnimatedStyle,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  sharedValue: SharedValue<number>;
}

const AnimatedSharedValueComponent = (props: Props) => {
  const widthSV = props.sharedValue;

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(widthSV.value, { duration: 500 }),
    };
  });

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Animated.View
        style={[
          { backgroundColor: "black", height: 80, margin: 30, width: 0 },
          style,
        ]}
        testID="view"
      />
      <Button
        testID="button"
        title="toggle"
        onPress={() => {
          widthSV.set(100);
        }}
      />
    </View>
  );
};

const AnimatedComponent = () => {
  return <AnimatedSharedValueComponent sharedValue={useSharedValue(0)} />;
};

const getDefaultStyle = () => ({
  backgroundColor: "black",
  height: 80,
  margin: 30,
  width: 0,
});

describe("Tests of animations", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("withTiming animation", () => {
    const style = getDefaultStyle();

    render(<AnimatedComponent />);
    const view = screen.getByTestId("view");
    const button = screen.getByTestId("button");
    expect(view.props.style).toEqual([getDefaultStyle(), { width: 0 }]);
    expect(view).toHaveAnimatedStyle(style);
    fireEvent.press(button);
    jest.advanceTimersByTime(600);
    style.width = 100;
    expect(view).toHaveAnimatedStyle(style);
    const rendered = render(<AnimatedComponent />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test("withTiming animation, get animated style", () => {
    render(<AnimatedComponent />);
    const view = screen.getByTestId("view");
    const button = screen.getByTestId("button");
    fireEvent.press(button);
    jest.advanceTimersByTime(600);
    const style = getAnimatedStyle(view);
    expect(style.width).toBe(100);
    const rendered = render(<AnimatedComponent />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test("withTiming animation, width in a middle of animation", () => {
    const style = getDefaultStyle();

    render(<AnimatedComponent />);
    const view = screen.getByTestId("view");
    const button = screen.getByTestId("button");

    expect(view.props.style).toEqual([getDefaultStyle(), { width: 0 }]);
    expect(view).toHaveAnimatedStyle(style);

    fireEvent.press(button);
    jest.advanceTimersByTime(250);

    style.width = 50; // value of component width after 150ms of animation
    expect(view).toHaveAnimatedStyle(style);
    const rendered = render(<AnimatedComponent />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test("withTiming animation, compare all styles", () => {
    const style = getDefaultStyle();

    render(<AnimatedComponent />);
    const view = screen.getByTestId("view");
    const button = screen.getByTestId("button");

    fireEvent.press(button);
    jest.advanceTimersByTime(250);
    style.width = 50; // value of component width after 250ms of animation
    expect(view).toHaveAnimatedStyle(style, { shouldMatchAllProps: true });
    const rendered = render(<AnimatedComponent />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test("withTiming animation, define shared value outside component", () => {
    let sharedValue: SharedValue<number>;
    renderHook(() => {
      sharedValue = useSharedValue(0);
    });
    render(
      // @ts-expect-error TypeScript doesn't understand that renderHook defined sharedValue;
      <AnimatedSharedValueComponent sharedValue={sharedValue} />
    );
    const view = screen.getByTestId("view");
    const button = screen.getByTestId("button");

    fireEvent.press(button);
    jest.advanceTimersByTime(600);
    expect(view).toHaveAnimatedStyle({ width: 100 });
    const rendered = render(
      // @ts-expect-error TypeScript doesn't understand that renderHook defined sharedValue;
      <AnimatedSharedValueComponent sharedValue={sharedValue} />
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test("withTiming animation, change shared value outside component", () => {
    let sharedValue: SharedValue<number>;
    renderHook(() => {
      sharedValue = useSharedValue(0);
    });
    render(
      // @ts-expect-error TypeScript doesn't understand that renderHook defined sharedValue;
      <AnimatedSharedValueComponent sharedValue={sharedValue} />
    );
    const view = screen.getByTestId("view");
    // @ts-expect-error TypeScript doesn't understand that renderHook defined sharedValue;
    sharedValue.value = 50;
    jest.advanceTimersByTime(600);
    expect(view).toHaveAnimatedStyle({ width: 50 });
    const rendered = render(
      // @ts-expect-error TypeScript doesn't understand that renderHook defined sharedValue;
      <AnimatedSharedValueComponent sharedValue={sharedValue} />
    ).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
