@echo off
cd /d c:\Users\kr14r\OneDrive\Desktop\React_vite\recipe-sharing-app
echo.
echo ========================================
echo Recipe Sharing App - Startup Script
echo ========================================
echo.
echo Current Directory:
cd
echo.
echo Checking dependencies...
node -e "const pkg = require('./package.json'); console.log('✅ React version: ' + pkg.dependencies.react); console.log('✅ React Router: ' + pkg.dependencies['react-router-dom']); console.log('✅ Zustand: ' + pkg.dependencies.zustand);"
echo.
echo Starting dev server...
echo.
npm run dev
pause
