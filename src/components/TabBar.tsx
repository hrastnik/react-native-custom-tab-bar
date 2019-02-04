import React, { SFC } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import posed from "react-native-pose";

const windowWidth = Dimensions.get("window").width;

const Scaler = posed.View({
  active: { scale: 1.25 },
  inactive: { scale: 1 }
});

const S = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 52,
    elevation: 2,
    alignItems: "center"
  },
  spotlightInner: { width: 48, height: 48, borderRadius: 24 },
  tabButton: { flex: 1 },
  scaler: { flex: 1, alignItems: "center", justifyContent: "center" }
});

type Props = {
  tabColors: string[];
  renderIcon: SFC<{
    route: any;
    focused: boolean;
    tintColor: string;
  }>;
  activeTintColor: string;
  inactiveTintColor: string;
  onTabPress: ({ route: any }) => void;
  onTabLongPress: ({ route: any }) => void;
  getAccessibilityLabel: ({ route: any }) => string;
  navigation: any;
};

class TabBar extends React.Component<Props, {}> {
  SpotLight = undefined;
  spotlightStyle = undefined;
  Inner = undefined;

  constructor(props) {
    super(props);
    this.init();
  }

  componentDidUpdate(prevProps) {
    const numTabs = this.props.navigation.state.routes.length;
    const prevNumTabs = prevProps.navigation.state.routes.length;
    if (numTabs !== prevNumTabs) {
      this.init();
    }
  }

  init() {
    const numTabs = this.props.navigation.state.routes.length;

    const tabWidth = windowWidth / numTabs;

    const poses = Array.from({ length: numTabs }).reduce((poses, _, index) => {
      return { ...poses, [`route${index}`]: { x: tabWidth * index } };
    }, {});

    const styles = StyleSheet.create({
      spotlight: {
        width: tabWidth,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      }
    });

    this.SpotLight = posed.View(poses);
    this.spotlightStyle = styles.spotlight;

    const { tabColors } = this.props;

    this.Inner = posed.View({
      passive: {
        backgroundColor: [
          "x",
          {
            inputRange: Array.from({ length: numTabs }).map(
              (_, i) => i * tabWidth
            ),
            outputRange: tabColors
          },
          true
        ]
      }
    });
  }

  render() {
    const {
      renderIcon,
      activeTintColor,
      inactiveTintColor,
      onTabPress,
      onTabLongPress,
      getAccessibilityLabel,
      navigation
    } = this.props;

    const { routes, index: activeRouteIndex } = navigation.state;

    const { SpotLight, spotlightStyle, Inner } = this;

    return (
      <View style={S.container}>
        <View style={StyleSheet.absoluteFillObject}>
          <SpotLight style={spotlightStyle} pose={`route${activeRouteIndex}`}>
            <Inner style={S.spotlightInner} />
          </SpotLight>
        </View>

        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          return (
            <TouchableOpacity
              key={routeIndex}
              style={S.tabButton}
              onPress={() => {
                onTabPress({ route });
              }}
              onLongPress={() => {
                onTabLongPress({ route });
              }}
              accessibilityLabel={getAccessibilityLabel({ route })}
            >
              <Scaler
                pose={isRouteActive ? "active" : "inactive"}
                style={S.scaler}
              >
                {renderIcon({ route, focused: isRouteActive, tintColor })}
              </Scaler>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default TabBar;
