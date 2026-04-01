Snake Game Technical Specification (Snake-114 Final)1. Core Game Mechanics
This project uses a Grid-based logic implementation. The map size is $30 \times 30$, each cell is selected via DOM using data-x and data-y. Key features include edge wrapping: when the snake head goes beyond the boundary, it appears from the other side (e.g., $x < 0 \rightarrow x = 29$). Dynamic difficulty: each time food is eaten, speed decreases by 2ms (minimum speed capped at 10ms), increasing challenge. Buffered turning (NextDirection): uses nextDirection to buffer input, preventing 180-degree suicidal turns within the same tick.2. Data Structures and Variables
Variable Name | Data Type | Description
---|---|---
snake | Array<{x, y}> | Stores snake body coordinates, snake[0] is the head.
direction | Object {x, y} | Current physical movement direction.
nextDirection | Object {x, y} | User's next keypress intended direction.
food | Object {x, y} | Current food coordinates.
speed | Number | Game loop interval time (ms).3. Advanced Logic Analysis
Coordinate Wrapping Formula (Wrap Logic)
To allow the snake to wrap around boundaries, the wrapPosition function is used:
$$x_{wrapped} = (x + GRID\_SIZE) \pmod{GRID\_SIZE}$$
(Note: The code uses if statements to achieve the same effect.)

Self-Collision Detection
Uses JavaScript's .some() method to check if the new head coordinates already exist in the snake array:
```javascript
function isCollision({ x, y }) {
  return snake.some(seg => seg.x === x && seg.y === y);
}
```
4. Implementation Progress (Final Review)
[x] Planning: Development planning completed.
[x] Data Structures: Successfully used arrays to manage snake body.
[x] Map Rendering: Used CSS Grid with data-attributes for precise rendering.
[x] Movement Controls: Implemented smooth direction key switching with safeguards.
[x] Food System: Implemented random generation and automatic speed increase after eating.
[x] Death Judgment: Collision with self triggers Game Over.
[x] UI Binding: Implemented "Start" and "Pause" toggle logic.
[x] Code Stability: Code structure is clear, high modularity.5. Learning Insights (Reverse Engineering)
Through this reverse engineering exercise, I learned:
Separation of DOM and Data: Keep the snake array as the single source of truth, the draw() function only renders based on data.
Game Loop Optimization: Achieve game acceleration through dynamic switching of clearInterval and setInterval.
CSS Variable Usage: Use :root variables to make theme changes easier.