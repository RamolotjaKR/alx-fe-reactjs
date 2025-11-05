# alx-react-app-props

This is a duplicated project from `alx-react-app-new` with a Context API refactor applied (no prop drilling).

How to run (PowerShell on Windows):

1. Open PowerShell as Administrator if you hit execution policy errors.
2. (Optional) Allow script execution once if needed:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

3. Install dependencies and run the dev server:

```powershell
cd "c:\Users\kr14r\OneDrive\Desktop\React_vite\alx-react-app-props"
npm install
npm run dev
```

Files of interest:
- `src/UserContext.js` — React context provider/export.
- `src/App.jsx` — wraps `ProfilePage` with `UserContext.Provider`.
- `src/ProfilePage.jsx`, `src/UserInfo.jsx`, `src/UserDetails.jsx` — refactored components using context.
- `src/index.jsx` — app entry.
- `src/components/*` — copied UI components from the original project.

If you'd like, I can install dependencies and attempt to start the dev server here (I may encounter PowerShell execution policy issues).