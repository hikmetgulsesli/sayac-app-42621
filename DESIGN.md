```markdown
# Design System Document: The Monolithic Counter

## 1. Overview & Creative North Star
**Creative North Star: "Tactile Void"**
This design system moves away from the "app-in-a-box" aesthetic toward a cinematic, editorial experience. The goal is to make a simple utility feel like a high-end physical instrument. We achieve this through "Tactile Void"—a philosophy where the interface feels carved out of deep space. By utilizing high-contrast typography against a monochromatic hierarchy of blacks and grays, we create a sense of infinite depth. We break the template look by prioritizing massive, asymmetric typography and avoiding all traditional structural lines, relying instead on tonal shifts and light to define space.

---

## 2. Colors & Surface Philosophy
The palette is rooted in absolute depth, using the `surface` tokens to create a sophisticated, layered environment.

### The "No-Line" Rule
Explicitly prohibited: 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` section sitting on a `surface` background provides all the separation needed. If you feel the urge to draw a line, use white space instead.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Base Layer:** `surface` (#0e0e0e)
- **Nested Content:** Use `surface_container` (#1a1a1a) or `surface_container_high` (#20201f) to lift content.
- **Floating Elements:** Use `surface_bright` (#2c2c2c) to denote the highest level of interaction.

### The "Glass & Gradient" Rule
To escape a "flat" feel, use Glassmorphism for overlays. 
- **Floating Modals/Drawers:** Apply `surface_container` at 70% opacity with a `24px` backdrop-blur. 
- **Signature Textures:** For the primary increment action, do not use a flat fill. Apply a subtle linear gradient from `primary` (#3fff8b) to `primary_container` (#13ea79) at a 135-degree angle. This provides a "glow" that feels liquid and premium.

---

## 3. Typography
We use **Inter** as a variable font to create a hierarchy that feels authoritative yet breathable.

- **The Hero (Display-LG):** The counter itself. Use `display-lg` (3.5rem) or larger. Set to `Font-Weight: 800` (Bold/Extra Bold) with `letter-spacing: -0.04em`. This is the soul of the app.
- **Headlines:** Use `headline-sm` for section headers. Always in `on_surface_variant` (#adaaaa) to keep focus on the data.
- **Labels:** `label-md` should be used for button descriptors, set in all-caps with `0.1em` tracking to provide an editorial, "technical" feel.

---

## 4. Elevation & Depth
In this system, light is the architect, not lines.

- **The Layering Principle:** Depth is achieved by stacking. A `surface_container_highest` card placed on a `surface_dim` background creates a natural lift.
- **Ambient Shadows:** For floating action buttons, use an extra-diffused shadow: `offset: 0 24px`, `blur: 48px`, `color: rgba(0, 0, 0, 0.5)`. Never use harsh, tight shadows.
- **The "Ghost Border" Fallback:** If a layout requires a boundary for accessibility, use the `outline_variant` token at 15% opacity. It should be felt, not seen.
- **Glassmorphism:** Navigation bars or "Reset" panels should use a semi-transparent `surface_container_low` with a heavy backdrop-blur to allow the vibrant `primary` or `secondary` colors to bleed through as the user scrolls.

---

## 5. Components

### The Primary Action (Increment)
- **Visuals:** Use `primary` (#3fff8b) for the background. 
- **Shape:** `Roundedness: xl` (1.5rem). 
- **Interaction:** On press, scale the button to 95% and increase the `primary_dim` glow.

### The Secondary Action (Decrement)
- **Visuals:** Use `secondary_container` (#a00118) for the background with `secondary` (#ff716c) for the icon. 
- **Style:** A more "muted" presence than the increment button to prevent accidental resets of progress.

### The Utility (Reset)
- **Visuals:** Tertiary styling. Use `surface_container_highest` with `on_tertiary` text. 
- **Style:** Ghost button appearance. No fill, just a `label-md` text style.

### The Counter Display
- **Visuals:** No container. The number floats directly on `surface`. 
- **Detail:** Use `primary` color for the number when it's increasing, and `secondary` briefly when decreasing (a 300ms color transition).

### Lists & History
- **Rule:** Forbid dividers. Separate "Historical Counts" using `vertical spacing` (1.5rem) and subtle background shifts (alternating `surface` and `surface_container_low`).

---

## 6. Do’s and Don’ts

### Do:
- **Embrace Negative Space:** Let the counter breathe. The larger the empty space, the more premium the "Hero" number feels.
- **Use Haptic Transitions:** Colors should bleed and fade (300ms Ease-Out), never "snap" instantly.
- **Contextual Tinting:** Let the `on_surface_variant` text take on a slight hint of `primary` when the counter is high.

### Don't:
- **No 1px Borders:** This is the quickest way to make a high-end system look like a generic framework.
- **No Pure White:** Use `on_surface` (#ffffff) sparingly. For secondary text, always drop to `on_surface_variant` or `on_tertiary_fixed_variant`.
- **No Centered-Only Layouts:** Experiment with placing the counter off-center (asymmetric) to create a more editorial, modern composition.

---

## 7. Spacing Scale
Utilize a strict 8pt grid but apply it loosely to layout:
- **Inner Padding:** `md` (0.75rem)
- **Container Gaps:** `xl` (1.5rem)
- **Hero Margin:** `2xl+` (3rem+) to isolate the counter from the controls.```