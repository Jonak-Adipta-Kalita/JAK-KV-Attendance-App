# JAK KV Attendance App

## Thoughts:

- Is expo-dev-client needed to be removed for production? or is it done automatically? What about the package being in package.json? Does it need to be uninstalled?

## Roadmap for Optimizing:

### Auth Optimizing

- SignIn wierd button opacity transition (due to new rn-animated version?)
- ✅ Logout Button acting very odd and wierd | Reason: Syncronized onPress
- ✅ SignIn screen not showing when logging out automatically | Reason: Time lag for signing out

### HomeScreen Optimizing

- Probably use SQL instead of the metadata.json - expo-sqlite (check the expo-rn videos in my playlist) - host the db somewhere too
- Slow buttons for selecting attendance state, coz of rerendering? or coz of the zustand store getting heavy? split the storage somehow?
- Slow searches? Taking a lot of time to render? Probably cache or memoize the components (header)?
- Optimize the Flatlist showing the student cards

### General Optimizing - helps in the above sections

- Use a backend rest api for handling complex algorithms?
- Use Debugging Tools: https://docs.expo.dev/debugging/tools/
- PLEASE USE THE REACT DEV TOOLS SOMEHOW ;-; I want to Profile and check for Rerenders using it...
