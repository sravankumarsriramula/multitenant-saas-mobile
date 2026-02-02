# Dark Mode & Light Mode Implementation

## Overview
This mobile app now supports **Light Mode**, **Dark Mode**, and **Auto Mode** (follows system settings).

## Features

### Theme Modes
- **Light Mode**: Clean, bright interface with light backgrounds
- **Dark Mode**: Eye-friendly dark interface with reduced brightness
- **Auto Mode**: Automatically switches between light and dark based on system settings

### Implementation Details

#### Files Created/Modified

**New Files:**
1. `src/constants/theme.ts` - Theme color definitions and theme getter
2. `src/store/themeStore.ts` - Zustand store for theme state management
3. `src/components/ThemeSelector.tsx` - UI component for theme selection

**Modified Files:**
1. `app.json` - Changed `userInterfaceStyle` to `"automatic"`
2. `src/navigation/AppNavigator.tsx` - Made theme-aware
3. `src/screens/ProfileScreen.tsx` - Added ThemeSelector and theme support
4. `src/screens/ShipmentsScreen.tsx` - Made theme-aware

#### Theme Store
The theme store (`themeStore.ts`) provides:
- `mode`: Current theme mode ('light' | 'dark' | 'auto')
- `theme`: Active theme object with all colors
- `setThemeMode()`: Function to change theme mode
- `initializeTheme()`: Initializes theme from storage and listens to system changes

#### Theme Colors
Each theme includes:
- Background colors (primary, secondary, tertiary)
- Text colors (primary, secondary, tertiary, inverse)
- UI element colors (borders, shadows, overlays)
- Component-specific colors (tab bar, header, cards, inputs)

## Usage

### Accessing Theme in Components
```typescript
import { useThemeStore } from '../store/themeStore';

const MyComponent = () => {
  const { theme } = useThemeStore();
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>Hello</Text>
    </View>
  );
};
```

### Changing Theme Mode
```typescript
const { setThemeMode } = useThemeStore();

// Set to light mode
setThemeMode('light');

// Set to dark mode
setThemeMode('dark');

// Set to auto (follow system)
setThemeMode('auto');
```

### Theme Selector Component
The `ThemeSelector` component is already integrated into the Profile screen. Users can:
1. Navigate to Profile tab
2. See the Theme section
3. Tap on Light, Dark, or Auto to switch themes

## Persistence
Theme preferences are automatically saved to AsyncStorage and restored when the app restarts.

## System Integration
When in Auto mode, the app automatically detects and responds to system theme changes in real-time.

## Customization

### Adding New Colors
Edit `src/constants/theme.ts` and add new color properties to both `lightTheme` and `darkTheme` objects.

### Modifying Existing Colors
Update the color values in `lightTheme` and `darkTheme` in `src/constants/theme.ts`.

## Best Practices
1. Always use theme colors instead of hardcoded values
2. Use inline styles with theme colors: `style={{ color: theme.text }}`
3. Combine with StyleSheet: `style={[styles.text, { color: theme.text }]}`
4. Test both light and dark modes during development
