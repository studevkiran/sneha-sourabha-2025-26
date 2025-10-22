# Home Page Registration Integration Guide

## Overview
The registration type selection has been integrated directly into the home page with a fun "earthquake" animation effect that guides users to select their registration type.

## How It Works

### 1. Initial State
- Home page displays with "Register Now" button prominently
- No registration types visible yet
- User sees the tagline: "Join the district's grand celebration — be part of the legacy"

### 2. First Click - "Earthquake" Effect! 🌍
**When user clicks "Register Now" without selecting a type:**
- The entire registration panel shakes with an earthquake animation (0.6 seconds)
- After the shake, registration type selection appears automatically
- Message displays: "👇 Please select your registration type"
- 11 registration type buttons appear in a responsive grid

### 3. Type Selection
**User selects their registration type:**
- All 11 types displayed as compact buttons:
  - Rotarian
  - Rotarian with Spouse
  - Ann
  - Annet
  - Guest
  - Rotaractor
  - Silver Donor
  - Silver Sponsor
  - Gold Sponsor
  - Platinum Sponsor
  - Patron Sponsor

**Visual Feedback:**
- Selected button: Amber background, black text, ring glow, slightly scaled up
- Unselected buttons: Semi-transparent white background, white text

### 4. Dynamic Details Display
**Below the button grid, details appear automatically:**
- Icon representing the registration type
- Type name in bold
- **Price in large amber text** (₹2,000 to ₹100,000)
- Benefits description
- Styled in a dark bordered panel with amber accent

### 5. Proceed to Registration
**Button text changes based on state:**
- Initial: "Register Now"
- After types shown + type selected: "Continue"

**Click behavior:**
- If no type selected: Another earthquake shake (warning)
- If type selected: Navigate to `/register/details?type={selectedType}`

## Animation Details

### Earthquake Keyframes
```css
@keyframes earthquake {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  10% { transform: translate(-8px, 2px) rotate(-1deg); }
  20% { transform: translate(8px, -2px) rotate(1deg); }
  30% { transform: translate(-8px, -3px) rotate(-1deg); }
  40% { transform: translate(8px, 3px) rotate(1deg); }
  50% { transform: translate(-6px, -2px) rotate(-0.5deg); }
  60% { transform: translate(6px, 2px) rotate(0.5deg); }
  70% { transform: translate(-4px, -1px) rotate(-0.5deg); }
  80% { transform: translate(4px, 1px) rotate(0.5deg); }
  90% { transform: translate(-2px, -1px) rotate(0deg); }
}
```

**Effect:** Rapid shaking with slight rotation, easing back to original position

## User Experience Flow

1. **Land on home page** → See "Register Now"
2. **Click "Register Now"** → 🌍 Panel shakes
3. **Shake ends** → Type selection grid appears
4. **User reads options** → Clicks one type button
5. **Type selected** → Details (price + benefits) appear below
6. **Review details** → Click "Continue" button
7. **Navigate** → Go to details form with type pre-selected

## Technical Implementation

### State Management
```typescript
const [selectedType, setSelectedType] = useState<RegType | null>(null);
const [showTypeSelection, setShowTypeSelection] = useState(false);
const [shake, setShake] = useState(false);
```

### Click Handler Logic
```typescript
const handleRegisterClick = () => {
  if (!showTypeSelection) {
    // First click: trigger earthquake and show types
    setShake(true);
    setTimeout(() => {
      setShake(false);
      setShowTypeSelection(true);
    }, 600);
  } else if (!selectedType) {
    // Warning shake if no type selected
    setShake(true);
    setTimeout(() => setShake(false), 600);
  } else {
    // Navigate to details with selected type
    router.push(`/register/details?type=${selectedType}`);
  }
};
```

### Responsive Grid
- Mobile (< 640px): 2 columns
- Tablet (≥ 640px): 3 columns
- All buttons remain accessible and tappable

## Benefits of This Approach

✅ **Single Page Flow** - No need for separate type selection page
✅ **Fun Interaction** - Earthquake effect is memorable and engaging
✅ **Clear Guidance** - Visual cues guide users through the process
✅ **Instant Feedback** - Dynamic price and benefits display
✅ **Mobile Friendly** - Responsive design works on all screen sizes
✅ **Reduced Clicks** - One less page to navigate through

## Files Modified

- **`app/page.tsx`** - Main home page with integrated type selection
- **`app/page_old_backup.tsx`** - Backup of original home page
- **`app/register/type/page.tsx`** - Now deprecated (can be removed or kept as fallback)

## Server Status
- Dev server running on: **http://127.0.0.1:3002**
- Compiled successfully with new home page
- All routes functional

## Next Steps (Optional)
- Remove `/register/type` route completely if not needed
- Add analytics to track which types are most popular
- Consider adding a "Reset Selection" button
- Add smooth scroll to type selection after earthquake
