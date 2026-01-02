# Day 2: State Control Panel


**JavaScript state mastery**—pure DOM manipulation, render-from-state pattern, localStorage persistence

## ✨ Features
- `Increase` / `Decrease` counter (allows negatives per spec)
- `Reset` to 0
- **localStorage** persists across sessions
- Day 1 theme consistency (light/dark toggle)
- Responsive design

## 🧪 Testing (PDF Spec)
| Action | Expected |
|--------|----------|
| Click + | Count increases |
| Click - | Count decreases (to negative) |
| Click Reset | Count = 0 |
| Refresh | State persists |

## 📁 Series Structure

Day 1: Smart Profile UI (DOM basics)
Day 2: State Control ← Pure state logic
Day 3: Storage + APIs


## 🚀 Deploy
1. Netlify drag-drop folder
2. Add deploy badge above to README

## Code Pattern
js
let state = 0;  // Single truth
function render() { /* DOM = state */ }
button.onclick = () => { state++; render(); }

**Zero to Infinity Full-Stack Series** | SarlaYash Intern Training 

## Commit + Push
bash
cd projects/day2-state-control-panel/
git add .
git commit -m "Day 2: State Control Panel - spec exact w/ persistence"
git push

