import { StyleSheet } from 'react-native';

const colors = {
  primary: 'rgb(247,68,68)',
  secondary: '#FF9999',
  other: 'purple'
}

const globals = {
  drawerStyles: { 
    drawer: {
      marginTop: 1
    },
    main: {
      marginTop: 1,
      backgroundColor: "yellow"
    },
    colors: colors
  }
}

const headerStyles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    backgroundColor: colors.primary
  },
  viewRow: {
    flexDirection: 'row'
  },
  viewHamburger: {
    marginLeft: "auto"
  },
  logo: {
    paddingTop: 12,
    paddingLeft: 16
  },
  logoText: {
    paddingTop: 15,
    paddingLeft: 8,
    fontSize: 17,
    color: "white"
  },
  hamburger: {
    marginLeft: "auto",
    paddingTop: 12,
    paddingRight: 16
  }
});

const componentStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    marginTop: 30,
    zIndex: 0
  },
  frontPageBody: {
    backgroundColor: colors.secondary
  },
  standardImg: {
    width: '100%'
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
    padding: 10
  },
  body: {
    marginTop: 0
  },
  headerButton: {
    paddingRight: 0,
    marginRight: 0
  },
  introImage: {
    width: 50,
    height: 50
  },
  textStyles: {
    marginTop: 1
  },
  gridLeft: {
    marginTop: 0
  },
  appMainHeader: {
    backgroundColor: colors.other
  }
})

export { globals, componentStyles, headerStyles }